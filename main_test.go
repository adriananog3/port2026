package main

import (
	"context"
	"fmt"
	"io/fs"
	"net/http"
	"net/http/httptest"
	"net/url"
	"regexp"
	"strings"
	"testing"
	"time"
)

func newSite(t *testing.T) *site {
	t.Helper()
	sub, err := fs.Sub(webFS, "web")
	if err != nil {
		t.Fatal(err)
	}
	s, err := loadSite(sub)
	if err != nil {
		t.Fatal(err)
	}
	return s
}

var testReqN int

func do(s *site, method, host, target string, hdr map[string]string) *httptest.ResponseRecorder {
	r := httptest.NewRequest(method, target, nil)
	r.Host = host
	// Navegador comum e IP distinto a cada chamada (o escudo barra requisições sem User-Agent e limita a taxa por IP).
	testReqN++
	r.Header.Set("User-Agent", "Mozilla/5.0 (teste)")
	r.Header.Set("X-Forwarded-For", fmt.Sprintf("198.51.100.%d, 10.0.0.1", testReqN%250))
	for k, v := range hdr {
		r.Header.Set(k, v)
	}
	w := httptest.NewRecorder()
	s.ServeHTTP(w, r)
	return w
}

const canon = "adriana-nogueira.com"

func TestRedirecionaDominiosAntigos(t *testing.T) {
	s := newSite(t)
	cases := []struct{ host, path, want string }{
		{"adrianaport.vip", "/", "https://adriana-nogueira.com/"},
		{"adrianaport.vip", "/cases/itau", "https://adriana-nogueira.com/cases/itau"},
		{"www.adrianaport.vip", "/sobre", "https://adriana-nogueira.com/#topo"},
		{"www.adriana-nogueira.com", "/politica-de-privacidade?x=1", "https://adriana-nogueira.com/politica-de-privacidade?x=1"},
		{"adrianaport.vip:443", "/llms.txt", "https://adriana-nogueira.com/llms.txt"},
	}
	for _, c := range cases {
		w := do(s, "GET", c.host, c.path, nil)
		if w.Code != http.StatusMovedPermanently || w.Header().Get("Location") != c.want {
			t.Errorf("%s%s: got %d %q, want 301 %q", c.host, c.path, w.Code, w.Header().Get("Location"), c.want)
		}
	}
}

func TestRotasLegadas(t *testing.T) {
	s := newSite(t)
	for from, to := range legacyRoutes {
		w := do(s, "GET", canon, from, nil)
		if w.Code != 301 || w.Header().Get("Location") != to {
			t.Errorf("%s: got %d %q, want 301 %q", from, w.Code, w.Header().Get("Location"), to)
		}
	}
}

func TestHomeECabecalhos(t *testing.T) {
	s := newSite(t)
	w := do(s, "GET", canon, "/", nil)
	if !strings.Contains(w.Header().Get("Content-Security-Policy"), "upgrade-insecure-requests") {
		t.Error("produção deve ter upgrade-insecure-requests")
	}
	if w.Code != 200 || !strings.HasPrefix(w.Header().Get("Content-Type"), "text/html") {
		t.Fatalf("home: %d %s", w.Code, w.Header().Get("Content-Type"))
	}
	for _, h := range []string{"Content-Security-Policy", "Strict-Transport-Security", "X-Content-Type-Options",
		"X-Frame-Options", "Referrer-Policy", "Permissions-Policy", "ETag"} {
		if w.Header().Get(h) == "" {
			t.Errorf("cabeçalho ausente: %s", h)
		}
	}
	csp := w.Header().Get("Content-Security-Policy")
	if strings.Contains(csp, "'unsafe-inline' https://tally.so;") && !strings.Contains(csp, "sha256-") {
		t.Error("CSP sem hashes de script")
	}
	if strings.Contains(strings.Split(csp, "style-src")[0], "unsafe-inline") {
		t.Error("script-src não pode ter unsafe-inline")
	}
	body := w.Body.String()
	for _, must := range []string{"Acessar LinkedIn", "photo-cap", "form-contato"} {
		if !strings.Contains(body, must) {
			t.Errorf("home sem %q", must)
		}
	}
	for _, never := range []string{"manus.space", "manuscdn", "script.google.com"} {
		if strings.Contains(body, never) {
			t.Errorf("home ainda contém %q", never)
		}
	}
}

func TestTodosScriptsInlineCobertosPelaCSP(t *testing.T) {
	s := newSite(t)
	for p, a := range s.files {
		if !strings.HasSuffix(p, ".html") {
			continue
		}
		if strings.Contains(string(a.body), " on") && strings.Contains(string(a.body), "onclick=") {
			t.Errorf("%s tem handler inline (bloqueado pela CSP)", p)
		}
	}
}

func TestURLsLimpasE404(t *testing.T) {
	s := newSite(t)
	if w := do(s, "GET", canon, "/politica-de-privacidade", nil); w.Code != 200 {
		t.Errorf("privacidade: %d", w.Code)
	}
	if w := do(s, "GET", canon, "/politica-de-privacidade.html", nil); w.Code != 301 || w.Header().Get("Location") != "/politica-de-privacidade" {
		t.Errorf(".html: %d %s", w.Code, w.Header().Get("Location"))
	}
	if w := do(s, "GET", canon, "/index.html", nil); w.Header().Get("Location") != "/" {
		t.Errorf("index.html: %s", w.Header().Get("Location"))
	}
	w := do(s, "GET", canon, "/nao-existe", nil)
	if w.Code != 404 || !strings.Contains(w.Body.String(), "mudou de endereço") {
		t.Errorf("404: %d", w.Code)
	}
	if w := do(s, "GET", canon, "/../../etc/passwd", nil); w.Code != 404 {
		t.Errorf("path traversal: %d", w.Code)
	}
}

func TestGzipETagMetodo(t *testing.T) {
	s := newSite(t)
	w := do(s, "GET", canon, "/", map[string]string{"Accept-Encoding": "gzip, br"})
	if w.Header().Get("Content-Encoding") != "gzip" {
		t.Error("home deveria sair em gzip")
	}
	etag := w.Header().Get("ETag")
	if w := do(s, "GET", canon, "/", map[string]string{"If-None-Match": etag}); w.Code != 304 {
		t.Errorf("ETag: %d", w.Code)
	}
	if w := do(s, "POST", canon, "/", nil); w.Code != 405 {
		t.Errorf("POST: %d", w.Code)
	}
	if w := do(s, "HEAD", canon, "/robots.txt", nil); w.Code != 200 || w.Body.Len() != 0 {
		t.Errorf("HEAD: %d len=%d", w.Code, w.Body.Len())
	}
}

func TestArquivosSEO(t *testing.T) {
	s := newSite(t)
	for _, p := range []string{"/robots.txt", "/sitemap.xml", "/llms.txt", "/llms-full.txt", "/.well-known/security.txt", "/assets/adriana-nogueira-og.jpg", "/healthz"} {
		if w := do(s, "GET", canon, p, nil); w.Code != 200 {
			t.Errorf("%s: %d", p, w.Code)
		}
	}
	if w := do(s, "GET", canon, "/assets/adriana-nogueira-og.jpg", nil); !strings.Contains(w.Header().Get("Cache-Control"), "immutable") {
		t.Error("assets sem cache longo")
	}
}

func TestCasesApp(t *testing.T) {
	s := newSite(t)
	for _, c := range []string{"bee4", "itau", "guide", "modal", "empiricus"} {
		w := do(s, "GET", canon, "/cases/"+c, nil)
		if w.Code != 200 || !strings.Contains(w.Body.String(), `id="root"`) {
			t.Errorf("/cases/%s: %d", c, w.Code)
		}
		if o := do(s, "GET", canon, "/cases-app/"+c, nil); o.Code != 301 || o.Header().Get("Location") != "/cases/"+c {
			t.Errorf("/cases-app/%s deveria redirecionar: %d", c, o.Code)
		}
	}
	if w := do(s, "GET", canon, "/cases-app/template.html", nil); w.Code != 404 {
		t.Errorf("modelo interno exposto: %d", w.Code)
	}
	w := do(s, "GET", canon, "/", nil)
	csp := w.Header().Get("Content-Security-Policy")
	for _, must := range []string{"frame-ancestors 'self'", "https://www.youtube.com", "https://player.vimeo.com"} {
		if !strings.Contains(csp, must) {
			t.Errorf("CSP sem %q", must)
		}
	}
	if w.Header().Get("X-Frame-Options") != "SAMEORIGIN" {
		t.Error("X-Frame-Options deveria ser SAMEORIGIN")
	}
	if l := do(s, "GET", "localhost:8080", "/", nil); strings.Contains(l.Header().Get("Content-Security-Policy"), "upgrade-insecure") || l.Header().Get("Strict-Transport-Security") != "" {
		t.Error("pré-visualização local não deve forçar https")
	}
}

func TestNewsletter(t *testing.T) {
	s := newSite(t)
	w := do(s, "GET", canon, "/newsletter", nil)
	if w.Code != 200 || !strings.Contains(w.Body.String(), "Newsletter Exponencial Future") {
		t.Fatalf("/newsletter: %d", w.Code)
	}
	for _, n := range []string{"1", "2", "3"} {
		w := do(s, "GET", canon, "/newsletter/edicao-"+n, nil)
		if w.Code != 200 || !strings.Contains(w.Body.String(), `"@type":"Article"`) || strings.Contains(w.Body.String(), "noindex") {
			t.Errorf("edição %s: %d", n, w.Code)
		}
	}
	// regra: todo card da newsletter abre o texto completo (página própria, indexável, com corpo)
	idx := do(s, "GET", canon, "/newsletter", nil).Body.String() + do(s, "GET", canon, "/", nil).Body.String()
	links := regexp.MustCompile(`href="(/newsletter/[a-z0-9-]+)"`).FindAllStringSubmatch(idx, -1)
	if len(links) < 8 {
		t.Errorf("poucos links de edição encontrados: %d", len(links))
	}
	for _, m := range links {
		w := do(s, "GET", canon, m[1], nil)
		b := w.Body.String()
		if w.Code != 200 || strings.Contains(b, "noindex") || !strings.Contains(b, `<article class="body">`) || len(b) < 4000 {
			t.Errorf("%s não abre o texto completo: %d", m[1], w.Code)
		}
	}
	if w := do(s, "GET", canon, "/newsletter/branding-mercado-financeiro-2026", nil); w.Code != 200 || !strings.Contains(w.Body.String(), "O caso Nubank") {
		t.Errorf("artigo de branding: %d", w.Code)
	}
	ed := do(s, "GET", canon, "/newsletter/edicao-2", nil).Body.String()
	for _, must := range []string{"/ir/whatsapp?origem=newsletter", "https://www.linkedin.com/in/adriana-nogueira-cea-marketing3/", `class="fb fcopy"`, "linkedin.com/sharing/share-offsite", "chatgpt.com/?q=", "google.com/preferences/source?q=adriana-nogueira.com"} {
		if !strings.Contains(ed, must) {
			t.Errorf("barra da edição sem %s", must)
		}
	}
	for _, never := range []string{"facebook.com/sharer", "twitter.com/intent"} {
		if strings.Contains(ed, never) {
			t.Errorf("barra da edição ainda tem %s", never)
		}
	}
	if w := do(s, "GET", canon, "/artigos", nil); w.Header().Get("Location") != "/newsletter" {
		t.Errorf("/artigos deveria ir para /newsletter")
	}
	e3 := do(s, "GET", canon, "/newsletter/edicao-3", nil).Body.String()
	if i, j := strings.Index(e3, `<article class="body">`), strings.Index(e3, "</article>"); i < 0 || j < i || strings.Contains(e3[i:j], "<script") {
		t.Error("corpo da edição não pode ter script executável")
	}
}

func TestContato(t *testing.T) {
	s := newSite(t)
	var got []contactMsg
	sender = func(_ context.Context, m contactMsg) error { got = append(got, m); return nil }
	defer func() { sender = func(ctx context.Context, m contactMsg) error { return sendContato(ctx, m) } }()
	contatoLimit = &limiter{hits: map[string][]time.Time{}}
	post := func(v url.Values, ip string) *httptest.ResponseRecorder {
		r := httptest.NewRequest("POST", "/api/contato", strings.NewReader(v.Encode()))
		r.Host = canon
		r.Header.Set("Content-Type", "application/x-www-form-urlencoded")
		r.Header.Set("X-Requested-With", "fetch")
		r.Header.Set("User-Agent", "Mozilla/5.0 (teste)")
		r.Header.Set("X-Forwarded-For", ip)
		w := httptest.NewRecorder()
		s.ServeHTTP(w, r)
		return w
	}
	ok := url.Values{"nome": {"Maria"}, "email": {"maria@empresa.com.br"}, "empresa": {"Gestora X"}, "site": {"gestorax.com.br"}, "mensagem": {"Quero um diagnóstico."}, "origem": {"contato"}, "consentimento": {"sim"}}
	if w := post(ok, "1.1.1.1"); w.Code != 200 || len(got) != 1 || got[0].Empresa != "Gestora X" {
		t.Fatalf("envio válido: %d %s", w.Code, w.Body.String())
	}
	sem := url.Values{}
	for k, v := range ok {
		if k != "consentimento" {
			sem[k] = v
		}
	}
	if w := post(sem, "1.1.1.2"); w.Code != 400 {
		t.Errorf("sem consentimento deveria falhar: %d", w.Code)
	}
	bad := url.Values{"nome": {"A"}, "email": {"nao-e-email"}, "mensagem": {"x"}, "consentimento": {"sim"}}
	if w := post(bad, "1.1.1.3"); w.Code != 400 {
		t.Errorf("e-mail inválido deveria falhar: %d", w.Code)
	}
	robo := url.Values{"website": {"http://spam"}}
	for k, v := range ok {
		robo[k] = v
	}
	if w := post(robo, "1.1.1.4"); w.Code != 200 || len(got) != 1 {
		t.Errorf("robô não deveria gerar e-mail: %d, enviados=%d", w.Code, len(got))
	}
	for i := 0; i < 6; i++ {
		post(ok, "9.9.9.9")
	}
	if w := post(ok, "9.9.9.9"); w.Code != 429 {
		t.Errorf("limite por IP: %d", w.Code)
	}
	// Sem provedor de e-mail: 503 com fallback, sem perder a mensagem (a página monta o mailto).
	sender = func(context.Context, contactMsg) error { return errSemChave }
	if w := post(ok, "1.1.1.9"); w.Code != 503 || !strings.Contains(w.Body.String(), `"fallback":true`) {
		t.Errorf("sem provedor deveria responder 503 com fallback: %d %s", w.Code, w.Body.String())
	}
	if w := do(s, "GET", canon, "/api/contato", nil); w.Code != 405 {
		t.Errorf("GET em /api/contato: %d", w.Code)
	}
	home := do(s, "GET", canon, "/", nil)
	b := home.Body.String()
	// Contato: o Diagnóstico gratuito leva ao briefing em /diagnostico (formulário próprio, via /api/contato).
	for _, must := range []string{`href="/diagnostico"`, `id="aviso-legal"`} {
		if !strings.Contains(b, must) {
			t.Errorf("home sem %s", must)
		}
	}
	if !strings.Contains(home.Header().Get("Content-Security-Policy"), "frame-src 'self' https://tally.so") {
		t.Error("CSP precisa liberar o iframe do Tally")
	}
}

func TestShield(t *testing.T) {
	s := newSite(t)
	cases := []struct {
		path, ua string
		want     int
	}{
		{"/wp-login.php", "Mozilla/5.0", 404},
		{"/.env", "Mozilla/5.0", 404},
		{"/", "", 403},
		{"/", "sqlmap/1.7", 403},
		{"/", "Mozilla/5.0 (compatible; Bytespider; spider-feedback@bytedance.com)", 403},
		{"/", "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)", 200},
		{"/", "Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)", 200},
		{"/", "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", 200},
		{"/rag", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", 301},
	}
	for _, c := range cases {
		req := httptest.NewRequest("GET", "https://adriana-nogueira.com"+c.path, nil)
		req.Header.Set("User-Agent", c.ua)
		rec := httptest.NewRecorder()
		s.ServeHTTP(rec, req)
		if rec.Code != c.want {
			t.Errorf("%s (%q): status %d, esperado %d", c.path, c.ua, rec.Code, c.want)
		}
	}
	// Limite de taxa por IP.
	var last int
	for i := 0; i < rateMax+5; i++ {
		req := httptest.NewRequest("GET", "https://adriana-nogueira.com/faq", nil)
		req.Header.Set("User-Agent", "Mozilla/5.0")
		req.Header.Set("X-Forwarded-For", "203.0.113.9")
		rec := httptest.NewRecorder()
		s.ServeHTTP(rec, req)
		last = rec.Code
	}
	if last != 429 {
		t.Errorf("limite de taxa: status %d, esperado 429", last)
	}
}

func TestLead(t *testing.T) {
	s := newSite(t)
	var got []leadMsg
	leadSender = func(_ context.Context, l leadMsg) error { got = append(got, l); return nil }
	defer func() { leadSender = func(ctx context.Context, l leadMsg) error { return sendBrevo(ctx, l) } }()
	leadLimit = &limiter{hits: map[string][]time.Time{}}
	post := func(body string) *httptest.ResponseRecorder {
		r := httptest.NewRequest("POST", "/api/lead", strings.NewReader(body))
		r.Host = canon
		r.Header.Set("Content-Type", "application/json")
		r.Header.Set("User-Agent", "Mozilla/5.0 (teste)")
		r.Header.Set("X-Forwarded-For", "203.0.113.50")
		w := httptest.NewRecorder()
		s.ServeHTTP(w, r)
		return w
	}
	if w := post(`{"tipo":"newsletter","email":"ana@empresa.com.br","consentimento":true,"origem":"home"}`); w.Code != 200 || len(got) != 1 {
		t.Fatalf("newsletter: %d %s", w.Code, w.Body.String())
	}
	if w := post(`{"tipo":"prompts","nome":"Ana","empresa":"Gestora X","email":"ana@empresa.com.br","telefone":"(11) 98765-4321","consentimento":true}`); w.Code != 200 || got[1].Telefone != "+5511987654321" {
		t.Fatalf("prompts: %d %s %+v", w.Code, w.Body.String(), got)
	}
	if w := post(`{"tipo":"prompts","nome":"Ana","empresa":"X","email":"ana@empresa.com.br","telefone":"123","consentimento":true}`); w.Code != 400 {
		t.Fatalf("telefone inválido deveria dar 400: %d", w.Code)
	}
	if w := post(`{"tipo":"newsletter","email":"ana@empresa.com.br"}`); w.Code != 400 {
		t.Fatalf("sem consentimento deveria dar 400: %d", w.Code)
	}
	if w := post(`{"tipo":"newsletter","email":"x@y.com","consentimento":true,"website":"http://spam"}`); w.Code != 200 || len(got) != 2 {
		t.Fatalf("robô: %d %d", w.Code, len(got))
	}
	leadSender = func(ctx context.Context, l leadMsg) error { return errSemBrevo }
	if w := post(`{"tipo":"newsletter","email":"b@empresa.com.br","consentimento":true}`); w.Code != 503 || !strings.Contains(w.Body.String(), "fallback") {
		t.Fatalf("sem Brevo deveria pedir fallback: %d %s", w.Code, w.Body.String())
	}
}
