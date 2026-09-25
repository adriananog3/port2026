package main

// Formulário de contato próprio (substitui o Tally).
//
// POST /api/contato recebe: nome, email, empresa, site, mensagem, origem e consentimento.
// O envio é feito pelo Resend (RESEND_API_KEY) ou, se ele não estiver configurado, pelo e-mail
// transacional do Brevo (BREVO_API_KEY), para a caixa definida em CONTACT_TO.
// Sem nenhuma chave, responde 503 com "fallback" e a página oferece e-mail, WhatsApp e Tally.
// LGPD: coleta mínima, consentimento explícito, nada é gravado em disco ou banco;
// os logs registram só a origem e o resultado, nunca nome, e-mail ou mensagem.
//
// Variáveis de ambiente (Cloud Run):
//   RESEND_API_KEY  chave da API do Resend (opcional)
//   BREVO_API_KEY   chave da API do Brevo (usada se não houver Resend)
//   BREVO_SENDER    remetente verificado no Brevo (padrão: contato-assessoria@adriana-nogueira.com)
//   CONTACT_TO      destino (padrão: contato-assessoria@adriana-nogueira.com)
//   CONTACT_FROM    remetente verificado no Resend (padrão: Site <site@adriana-nogueira.com>)

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"net"
	"net/http"
	"net/mail"
	"net/url"
	"os"
	"regexp"
	"strings"
	"sync"
	"time"
	"unicode/utf8"
)

type contactMsg struct {
	Nome, Email, Empresa, Site, Telefone, Mensagem, Origem string
}

// sender permite trocar o envio real por um falso nos testes.
var sender = func(ctx context.Context, m contactMsg) error { return sendContato(ctx, m) }

var reOrigem = regexp.MustCompile(`^[a-z0-9-]{1,60}$`)

type limiter struct {
	mu   sync.Mutex
	hits map[string][]time.Time
}

var contatoLimit = &limiter{hits: map[string][]time.Time{}}

// allow: no máximo 5 envios por IP a cada 10 minutos.
func (l *limiter) allow(ip string) bool {
	l.mu.Lock()
	defer l.mu.Unlock()
	now := time.Now()
	var keep []time.Time
	for _, t := range l.hits[ip] {
		if now.Sub(t) < 10*time.Minute {
			keep = append(keep, t)
		}
	}
	if len(keep) >= 5 {
		l.hits[ip] = keep
		return false
	}
	l.hits[ip] = append(keep, now)
	if len(l.hits) > 10000 { // evita crescer sem limite
		l.hits = map[string][]time.Time{}
	}
	return true
}

func clientIP(r *http.Request) string {
	if f := r.Header.Get("X-Forwarded-For"); f != "" { // Cloud Run preenche este cabeçalho
		return strings.TrimSpace(strings.Split(f, ",")[0])
	}
	h, _, _ := net.SplitHostPort(r.RemoteAddr)
	return h
}

func handleContato(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", "no-store")
	ajax := r.Header.Get("X-Requested-With") == "fetch"
	reply := func(code int, ok bool, msg string) {
		if ajax {
			w.Header().Set("Content-Type", "application/json; charset=utf-8")
			w.WriteHeader(code)
			out := map[string]any{"ok": ok, "mensagem": msg}
			if code == http.StatusServiceUnavailable || code == http.StatusBadGateway {
				out["fallback"] = true
			}
			json.NewEncoder(w).Encode(out)
			return
		}
		st := "erro"
		if ok {
			st = "enviado"
		}
		http.Redirect(w, r, "/?contato="+st+"#contato", http.StatusSeeOther)
	}
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", "POST")
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}
	r.Body = http.MaxBytesReader(w, r.Body, 16<<10)
	if err := r.ParseForm(); err != nil {
		reply(http.StatusBadRequest, false, "Não foi possível ler o formulário.")
		return
	}
	f := func(k string, max int) string {
		v := strings.TrimSpace(r.PostForm.Get(k))
		if utf8.RuneCountInString(v) > max {
			v = string([]rune(v)[:max])
		}
		return v
	}
	origem := f("origem", 60)
	if !reOrigem.MatchString(origem) {
		origem = "contato"
	}
	// Armadilha para robôs: campo invisível que pessoas não preenchem.
	if f("website", 200) != "" {
		slog.Info("contato", "resultado", "robo", "origem", origem)
		reply(http.StatusOK, true, "Mensagem enviada. Obrigada!")
		return
	}
	m := contactMsg{Nome: f("nome", 120), Email: f("email", 200), Empresa: f("empresa", 160), Site: f("site", 200), Telefone: f("telefone", 40), Mensagem: f("mensagem", 8000), Origem: origem}
	if m.Nome == "" || m.Email == "" || m.Mensagem == "" {
		reply(http.StatusBadRequest, false, "Preencha nome, e-mail e mensagem.")
		return
	}
	if a, err := mail.ParseAddress(m.Email); err != nil || a.Address != m.Email {
		reply(http.StatusBadRequest, false, "Confira o e-mail informado.")
		return
	}
	if m.Site != "" {
		s := m.Site
		if !strings.Contains(s, "://") {
			s = "https://" + s
		}
		if u, err := url.Parse(s); err != nil || !strings.Contains(u.Host, ".") {
			reply(http.StatusBadRequest, false, "Confira o site da empresa.")
			return
		}
	}
	if r.PostForm.Get("consentimento") == "" {
		reply(http.StatusBadRequest, false, "Para enviar, é preciso concordar com o uso dos dados para o retorno do contato.")
		return
	}
	if !contatoLimit.allow(clientIP(r)) {
		reply(http.StatusTooManyRequests, false, "Muitas tentativas seguidas. Tente de novo em alguns minutos.")
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()
	if err := sender(ctx, m); err != nil {
		if err == errSemChave {
			slog.Info("contato", "resultado", "sem-provedor", "origem", origem)
			reply(http.StatusServiceUnavailable, false, "O envio automático está indisponível no momento. Use uma das opções abaixo, sua mensagem já está pronta.")
			return
		}
		slog.Error("contato", "resultado", "falha", "origem", origem, "err", err.Error())
		reply(http.StatusBadGateway, false, "Não foi possível enviar agora. Use uma das opções abaixo, sua mensagem já está pronta.")
		return
	}
	slog.Info("contato", "resultado", "enviado", "origem", origem)
	reply(http.StatusOK, true, "Mensagem enviada. Obrigada! Respondo em até 2 dias úteis.")
}

var errSemChave = fmt.Errorf("nenhum provedor de e-mail configurado (RESEND_API_KEY ou BREVO_API_KEY)")

func corpoContato(m contactMsg) string {
	return fmt.Sprintf("Nome: %s\nE-mail: %s\nEmpresa: %s\nTelefone: %s\nSite: %s\nOrigem: %s\n\nMensagem:\n%s\n\n—\nEnviado pelo formulário de adriana-nogueira.com com consentimento do titular (LGPD, art. 7º, I).",
		m.Nome, m.Email, dash(m.Empresa), dash(m.Telefone), dash(m.Site), m.Origem, m.Mensagem)
}

// sendContato usa o Resend se houver chave; senão, o Brevo; senão, errSemChave.
func sendContato(ctx context.Context, m contactMsg) error {
	if os.Getenv("RESEND_API_KEY") != "" {
		return sendResend(ctx, m)
	}
	if os.Getenv("BREVO_API_KEY") != "" {
		return sendBrevoEmail(ctx, m)
	}
	return errSemChave
}

func sendBrevoEmail(ctx context.Context, m contactMsg) error {
	to := envOr("CONTACT_TO", "contato-assessoria@adriana-nogueira.com")
	from := envOr("BREVO_SENDER", "contato-assessoria@adriana-nogueira.com")
	payload, _ := json.Marshal(map[string]any{
		"sender":      map[string]string{"name": "Site Adriana Nogueira", "email": from},
		"to":          []map[string]string{{"email": to}},
		"replyTo":     map[string]string{"email": m.Email, "name": m.Nome},
		"subject":     "Contato pelo site: " + m.Nome + empresaSuffix(m.Empresa),
		"textContent": corpoContato(m),
	})
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, "https://api.brevo.com/v3/smtp/email", bytes.NewReader(payload))
	if err != nil {
		return err
	}
	req.Header.Set("api-key", os.Getenv("BREVO_API_KEY"))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	if res.StatusCode >= 300 {
		return fmt.Errorf("brevo e-mail: status %d", res.StatusCode)
	}
	return nil
}

func sendResend(ctx context.Context, m contactMsg) error {
	key := os.Getenv("RESEND_API_KEY")
	if key == "" {
		return errSemChave
	}
	to := envOr("CONTACT_TO", "contato-assessoria@adriana-nogueira.com")
	from := envOr("CONTACT_FROM", "Site Adriana Nogueira <site@adriana-nogueira.com>")
	body := corpoContato(m)
	payload, _ := json.Marshal(map[string]any{
		"from": from, "to": []string{to}, "reply_to": m.Email,
		"subject": "Contato pelo site: " + m.Nome + empresaSuffix(m.Empresa),
		"text":    body,
	})
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, "https://api.resend.com/emails", bytes.NewReader(payload))
	if err != nil {
		return err
	}
	req.Header.Set("Authorization", "Bearer "+key)
	req.Header.Set("Content-Type", "application/json")
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	if res.StatusCode >= 300 {
		return fmt.Errorf("resend: status %d", res.StatusCode)
	}
	return nil
}

func dash(s string) string {
	if s == "" {
		return "—"
	}
	return s
}

func empresaSuffix(e string) string {
	if e == "" {
		return ""
	}
	return " (" + e + ")"
}
