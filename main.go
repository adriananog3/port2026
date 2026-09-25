// Servidor do portfólio adriana-nogueira.com.
//
// Um único binário Go, sem dependências externas, que embute o site estático
// e o serve no Google Cloud Run com:
//   - 301 dos domínios antigos (adrianaport.vip) e do www para o domínio canônico;
//   - redirecionamento das rotas do site antigo para as âncoras da página nova (preserva SEO);
//   - URLs limpas (/politica-de-privacidade → politica-de-privacidade.html);
//   - cabeçalhos de segurança (CSP com hashes calculados na inicialização, HSTS etc.);
//   - gzip, ETag e cache por tipo de arquivo;
//   - /healthz para o Cloud Run e desligamento gracioso.
package main

import (
	"bytes"
	"compress/gzip"
	"context"
	"crypto/sha256"
	"embed"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
	"io/fs"
	"log/slog"
	"mime"
	"net/http"
	"os"
	"os/exec"
	"os/signal"
	"path"
	"regexp"
	"runtime"
	"sort"
	"strings"
	"syscall"
	"time"
)

//go:embed all:web
var webFS embed.FS

// CanonicalHost é o domínio oficial. Pode ser trocado por variável de ambiente.
var CanonicalHost = envOr("CANONICAL_HOST", "adriana-nogueira.com")

// hostsToRedirect recebem 301 para o domínio canônico, preservando caminho e query.
var hostsToRedirect = map[string]bool{
	"adrianaport.vip":          true,
	"www.adrianaport.vip":      true,
	"www.adriana-nogueira.com": true,
}

// legacyRoutes mapeia as rotas do site antigo (indexadas no Google) para a página nova.
var legacyRoutes = map[string]string{
	"/cases":                           "/#cases",
	"/rag":                             "/#assessoria-ia",
	"/projetos/bee4":                   "/cases/bee4",
	"/projetos/itau":                   "/cases/itau",
	"/projetos/guide":                  "/cases/guide",
	"/projetos/modal":                  "/cases/modal",
	"/projetos/empiricus":              "/cases/empiricus",
	"/sobre":                           "/#topo",
	"/adriana-nogueira-cea-marketing3": "/#topo",
	"/adriana-nogueira-cea-marketing3/portfolio": "/#cases",
	"/dri-cea-marketing3":                        "/#topo",
	"/servicos":                                  "/#servicos",
	"/servicos/faq":                              "/faq",
	"/habilidadeseservicos":                      "/#servicos",
	"/habilidadeseservicos/faq":                  "/faq",
	"/artigos":                                   "/newsletter",
	"/blog":                                      "/newsletter",
	"/blog/marketing-insights":                   "/newsletter",
	"/blog/finance-insights":                     "/newsletter",
	"/comunidade":                                "/#newsletter",
	"/politica-de-cookies":                       "/politica-de-privacidade#cookies",
	"/contato":                                   "/#contato",
}

// ---------- arquivos pré-processados em memória ----------

type asset struct {
	body     []byte
	gz       []byte // nil quando não compensa comprimir
	ctype    string
	etag     string
	cacheCtl string
}

type site struct {
	files    map[string]*asset // chave: caminho absoluto, ex. "/index.html"
	csp      string
	cspLocal string // pré-visualização em http://localhost (sem upgrade para https)
}

// caseRoute são as páginas dos cases (componentes originais do portfólio, pré-renderizados em web/cases/).
var caseRoute = regexp.MustCompile(`^/cases/(bee4|itau|guide|modal|empiricus)$`)

// oldCaseApp é o endereço provisório usado antes; redireciona para /cases/<case>.
var oldCaseApp = regexp.MustCompile(`^/cases-app/(bee4|itau|guide|modal|empiricus)$`)

var inlineScriptRe = regexp.MustCompile(`(?s)<script(\s[^>]*)?>(.*?)</script>`)

func loadSite(fsys fs.FS) (*site, error) {
	s := &site{files: map[string]*asset{}}
	hashes := map[string]bool{}

	err := fs.WalkDir(fsys, ".", func(p string, d fs.DirEntry, err error) error {
		if err != nil || d.IsDir() {
			return err
		}
		b, err := fs.ReadFile(fsys, p)
		if err != nil {
			return err
		}
		ext := path.Ext(p)
		ct := mime.TypeByExtension(ext)
		if ct == "" {
			ct = "text/plain; charset=utf-8"
		}
		if ext == ".txt" || ext == ".xml" {
			ct = strings.Split(ct, ";")[0] + "; charset=utf-8"
		}
		sum := sha256.Sum256(b)
		a := &asset{body: b, ctype: ct, etag: `"` + hex.EncodeToString(sum[:8]) + `"`}

		switch {
		case strings.HasPrefix(p, "assets/"):
			a.cacheCtl = "public, max-age=31536000, immutable"
		case ext == ".html":
			a.cacheCtl = "public, max-age=0, must-revalidate"
		default:
			a.cacheCtl = "public, max-age=86400"
		}

		if isCompressible(ct) && len(b) > 1024 {
			var buf bytes.Buffer
			zw, _ := gzip.NewWriterLevel(&buf, gzip.BestCompression)
			zw.Write(b)
			zw.Close()
			if buf.Len() < len(b) {
				a.gz = buf.Bytes()
			}
		}

		if ext == ".html" {
			for _, m := range inlineScriptRe.FindAllSubmatch(b, -1) {
				attrs := string(m[1])
				if strings.Contains(attrs, "src=") || strings.Contains(attrs, "ld+json") {
					continue
				}
				h := sha256.Sum256(m[2])
				hashes["'sha256-"+base64.StdEncoding.EncodeToString(h[:])+"'"] = true
			}
		}
		s.files["/"+p] = a
		return nil
	})
	if err != nil {
		return nil, err
	}
	if _, ok := s.files["/index.html"]; !ok {
		return nil, errors.New("web/index.html ausente")
	}
	addFavicons(s)
	// Imagem de compartilhamento (Open Graph) servida com nome neutro.
	if a, ok := s.files["/assets/ovelha-og.jpg"]; ok {
		s.files["/assets/adriana-nogueira-og.jpg"] = a
		delete(s.files, "/assets/ovelha-og.jpg")
	}
	s.csp = buildCSP(hashes)
	s.cspLocal = strings.Replace(s.csp, "; upgrade-insecure-requests", "", 1)
	return s, nil
}

func buildCSP(hashes map[string]bool) string {
	hs := make([]string, 0, len(hashes))
	for h := range hashes {
		hs = append(hs, h)
	}
	sort.Strings(hs)
	return strings.Join([]string{
		"default-src 'self'",
		"script-src 'self' https://conversations-widget.brevo.com " + strings.Join(hs, " "),
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://conversations-widget.brevo.com",
		"font-src 'self' https://fonts.gstatic.com https://conversations-widget.brevo.com data:",
		"img-src 'self' data: https:",
		"frame-src 'self' https://tally.so https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://conversations-widget.brevo.com",
		"media-src 'self' https:",
		"connect-src 'self' https://*.brevo.com wss://*.brevo.com",
		"form-action 'self'",
		"base-uri 'self'",
		"object-src 'none'",
		"frame-ancestors 'self'",
		"upgrade-insecure-requests",
	}, "; ")
}

func isCompressible(ct string) bool {
	return strings.HasPrefix(ct, "text/") || strings.Contains(ct, "xml") ||
		strings.Contains(ct, "json") || strings.Contains(ct, "javascript") || strings.Contains(ct, "svg")
}

// ---------- HTTP ----------

func (s *site) securityHeaders(h http.Header, local bool) {
	if local {
		h.Set("Content-Security-Policy", s.cspLocal)
	} else {
		h.Set("Content-Security-Policy", s.csp)
		h.Set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")
	}
	h.Set("X-Content-Type-Options", "nosniff")
	h.Set("X-Frame-Options", "SAMEORIGIN")
	h.Set("Referrer-Policy", "strict-origin-when-cross-origin")
	h.Set("Permissions-Policy", "camera=(), microphone=(self), geolocation=(), payment=(), usb=(), interest-cohort=()")
	h.Set("Cross-Origin-Opener-Policy", "same-origin-allow-popups")
}

func (s *site) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// 0) Robôs maliciosos, varreduras e excesso de requisições (botshield.go).
	if shield(w, r) {
		return
	}
	host := strings.ToLower(r.Host)
	if i := strings.IndexByte(host, ':'); i >= 0 {
		host = host[:i]
	}

	// 1) Domínios antigos e www → domínio canônico (301).
	if hostsToRedirect[host] {
		target := "https://" + CanonicalHost + r.URL.Path
		if dest, ok := legacyRoutes[strings.TrimSuffix(r.URL.Path, "/")]; ok {
			target = "https://" + CanonicalHost + dest
		} else if r.URL.RawQuery != "" {
			target += "?" + r.URL.RawQuery
		}
		http.Redirect(w, r, target, http.StatusMovedPermanently)
		return
	}

	s.securityHeaders(w.Header(), host == "localhost" || host == "127.0.0.1")

	if r.URL.Path == "/healthz" {
		w.Header().Set("Cache-Control", "no-store")
		w.Write([]byte("ok"))
		return
	}
	if r.URL.Path == "/api/contato" {
		handleContato(w, r)
		return
	}
	if r.URL.Path == "/api/lead" {
		handleLead(w, r)
		return
	}
	if r.URL.Path == "/api/tally" {
		handleTally(w, r)
		return
	}
	if r.URL.Path == "/ir/whatsapp" {
		handleIrWhatsapp(w, r)
		return
	}
	if r.URL.Path == "/api/prompts/tally" {
		handleBPTally(w, r)
		return
	}
	if r.URL.Path == "/banco-prompts.json" && !validBPCookie(r) {
		w.Header().Set("Cache-Control", "no-store")
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(http.StatusForbidden)
		w.Write([]byte(`{"ok":false,"mensagem":"Preencha o formulário para liberar o Banco de Prompts."}`))
		return
	}
	if r.Method != http.MethodGet && r.Method != http.MethodHead {
		w.Header().Set("Allow", "GET, HEAD")
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	p := path.Clean("/" + r.URL.Path)

	// 2) Rotas do site antigo → âncoras da página nova (301).
	if dest, ok := legacyRoutes[p]; ok {
		http.Redirect(w, r, dest, http.StatusMovedPermanently)
		return
	}
	if m := oldCaseApp.FindStringSubmatch(p); m != nil {
		http.Redirect(w, r, "/cases/"+m[1], http.StatusMovedPermanently)
		return
	}
	// O modelo interno do app dos cases não é uma página pública.
	if strings.HasPrefix(p, "/cases-app/template") {
		s.serve(w, r, s.files["/404.html"], http.StatusNotFound)
		return
	}
	// 3) URLs limpas: /x.html e /index.html → /x e /
	if strings.HasSuffix(p, ".html") && p != "/404.html" {
		clean := strings.TrimSuffix(p, ".html")
		if clean == "/index" {
			clean = "/"
		}
		http.Redirect(w, r, clean, http.StatusMovedPermanently)
		return
	}
	// 4) Barra final → sem barra.
	if p != "/" && strings.HasSuffix(r.URL.Path, "/") {
		http.Redirect(w, r, p, http.StatusMovedPermanently)
		return
	}

	// Imagens antigas do Manus: servidas de /images/cases/ quando o arquivo existir.
	if strings.HasPrefix(p, "/manus-storage/") {
		if a, ok := s.files["/images/cases/"+strings.TrimPrefix(p, "/manus-storage/")]; ok {
			s.serve(w, r, a, http.StatusOK)
			return
		}
	}

	key := p
	if key == "/" {
		key = "/index.html"
	}
	a, ok := s.files[key]
	if !ok {
		a, ok = s.files[key+".html"]
	}
	if !ok {
		a, ok = s.files[key+"/index.html"] // ex.: /newsletter → newsletter/index.html
	}
	// Case sem versão pré-renderizada: usa o modelo do app (renderiza no navegador).
	if !ok && caseRoute.MatchString(p) {
		a, ok = s.files["/cases-app/template.html"]
	}
	if !ok || key == "/404.html" {
		s.serve(w, r, s.files["/404.html"], http.StatusNotFound)
		return
	}
	s.serve(w, r, a, http.StatusOK)
}

func (s *site) serve(w http.ResponseWriter, r *http.Request, a *asset, status int) {
	h := w.Header()
	if a == nil {
		http.NotFound(w, r)
		return
	}
	h.Set("Content-Type", a.ctype)
	h.Set("Vary", "Accept-Encoding")
	if status == http.StatusOK {
		h.Set("Cache-Control", a.cacheCtl)
		if r.URL.Path == "/banco-prompts.json" {
			h.Set("Cache-Control", "private, no-store")
		}
		h.Set("ETag", a.etag)
		if inm := r.Header.Get("If-None-Match"); inm != "" && strings.Contains(inm, a.etag) {
			w.WriteHeader(http.StatusNotModified)
			return
		}
	} else {
		h.Set("Cache-Control", "no-store")
	}
	body := a.body
	if a.gz != nil && strings.Contains(r.Header.Get("Accept-Encoding"), "gzip") {
		h.Set("Content-Encoding", "gzip")
		body = a.gz
	}
	h.Set("Content-Length", fmt.Sprint(len(body)))
	w.WriteHeader(status)
	if r.Method != http.MethodHead {
		w.Write(body)
	}
}

// logRequests registra método, caminho, status e duração em JSON (Cloud Logging).
// Não registra IP, user-agent nem query string: minimização de dados (LGPD art. 6º, III).
func logRequests(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		rw := &statusWriter{ResponseWriter: w, status: 200}
		next.ServeHTTP(rw, r)
		if r.URL.Path == "/healthz" {
			return
		}
		slog.Info("request", "method", r.Method, "path", r.URL.Path, "status", rw.status,
			"ms", time.Since(start).Milliseconds())
	})
}

type statusWriter struct {
	http.ResponseWriter
	status int
}

func (w *statusWriter) WriteHeader(c int) { w.status = c; w.ResponseWriter.WriteHeader(c) }

func envOr(k, def string) string {
	if v := os.Getenv(k); v != "" {
		return v
	}
	return def
}

func main() {
	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		ReplaceAttr: func(_ []string, a slog.Attr) slog.Attr {
			if a.Key == slog.LevelKey { // Cloud Logging lê "severity"
				a.Key = "severity"
			}
			if a.Key == slog.MessageKey {
				a.Key = "message"
			}
			return a
		},
	})))

	sub, err := fs.Sub(webFS, "web")
	if err != nil {
		slog.Error("fs", "err", err)
		os.Exit(1)
	}
	s, err := loadSite(sub)
	if err != nil {
		slog.Error("carregar site", "err", err)
		os.Exit(1)
	}

	addr := ":" + envOr("PORT", "8080")
	// Fora do Cloud Run e da Vercel = pré-visualização local.
	preview := os.Getenv("K_SERVICE") == "" && os.Getenv("VERCEL") == ""
	if preview {
		addr = "127.0.0.1:" + envOr("PORT", "8080")
	}
	srv := &http.Server{
		Addr:              addr,
		Handler:           logRequests(s),
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       10 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       120 * time.Second,
		MaxHeaderBytes:    16 << 10,
	}

	go func() {
		slog.Info("servidor no ar", "addr", srv.Addr, "arquivos", len(s.files))
		if preview {
			url := "http://" + srv.Addr + "/"
			fmt.Println("\nPré-visualização do site: " + url + "\nPara encerrar, feche esta janela.")
			openBrowser(url)
		}
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			slog.Error("listen", "err", err)
			os.Exit(1)
		}
	}()

	// Cloud Run envia SIGTERM antes de desligar a instância.
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGTERM, os.Interrupt)
	<-stop
	ctx, cancel := context.WithTimeout(context.Background(), 8*time.Second)
	defer cancel()
	srv.Shutdown(ctx)
	slog.Info("desligado")
}

// openBrowser abre a pré-visualização no navegador padrão (só no modo local).
func openBrowser(url string) {
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "windows":
		cmd = exec.Command("rundll32", "url.dll,FileProtocolHandler", url)
	case "darwin":
		cmd = exec.Command("open", url)
	default:
		cmd = exec.Command("xdg-open", url)
	}
	_ = cmd.Start()
}
