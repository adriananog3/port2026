package main

// /api/tally recebe o webhook do Tally (evento FORM_RESPONSE) e cria ou atualiza
// o contato no Brevo, na lista BREVO_LIST_TALLY (se configurada).
//
// Variáveis de ambiente:
//   TALLY_SIGNING_SECRET  segredo de assinatura do webhook (Tally → Integrations → Webhooks).
//                         Sem ele o endpoint responde 503 e não grava nada.
//   BREVO_API_KEY         mesma chave usada por /api/lead
//   BREVO_LIST_TALLY      ID da lista de leads vindos do Tally (opcional)
//
// Segurança: só aceita requisições com a assinatura HMAC-SHA256 (base64) do corpo
// bruto no cabeçalho Tally-Signature. LGPD: nada é gravado em disco; os logs
// registram só o resultado e a origem, nunca nome, e-mail ou telefone.

import (
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"net/mail"
	"os"
	"regexp"
	"strings"
	"time"
	"unicode/utf8"
)

type tallyField struct {
	Label string          `json:"label"`
	Type  string          `json:"type"`
	Value json.RawMessage `json:"value"`
}

type tallyEvent struct {
	EventType string `json:"eventType"`
	Data      struct {
		FormName string       `json:"formName"`
		Fields   []tallyField `json:"fields"`
	} `json:"data"`
}

var reSlug = regexp.MustCompile(`[^a-z0-9]+`)

func tallySignatureOK(secret string, body []byte, sig string) bool {
	m := hmac.New(sha256.New, []byte(secret))
	m.Write(body)
	want := m.Sum(nil)
	got, err := base64.StdEncoding.DecodeString(strings.TrimSpace(sig))
	if err != nil {
		return false
	}
	return hmac.Equal(want, got)
}

// tallyLead extrai nome, empresa, e-mail e telefone das respostas pelo tipo do campo
// ou pelo rótulo da pergunta. Valores que não são texto (escolhas, arquivos) são ignorados.
func tallyLead(ev tallyEvent) leadMsg {
	l := leadMsg{Tipo: "tally"}
	cut := func(s string, max int) string {
		s = strings.TrimSpace(s)
		if utf8.RuneCountInString(s) > max {
			s = string([]rune(s)[:max])
		}
		return s
	}
	for _, f := range ev.Data.Fields {
		var v string
		if json.Unmarshal(f.Value, &v) != nil || strings.TrimSpace(v) == "" {
			continue
		}
		lb := strings.ToLower(f.Label)
		switch {
		case l.Email == "" && (f.Type == "INPUT_EMAIL" || strings.Contains(lb, "e-mail") || strings.Contains(lb, "email")):
			l.Email = cut(v, 200)
		case l.Telefone == "" && (f.Type == "INPUT_PHONE_NUMBER" || strings.Contains(lb, "whats") || strings.Contains(lb, "telefone") || strings.Contains(lb, "celular")):
			l.Telefone = cut(v, 40)
		case l.Empresa == "" && strings.Contains(lb, "empresa"):
			l.Empresa = cut(v, 160)
		case l.Nome == "" && strings.Contains(lb, "nome") && !strings.Contains(lb, "empresa"):
			l.Nome = cut(v, 120)
		}
	}
	if tel, ok := telefoneE164(l.Telefone); ok {
		l.Telefone = tel
	} else {
		l.Telefone = ""
	}
	slug := strings.Trim(reSlug.ReplaceAllString(strings.ToLower(semAcento(ev.Data.FormName)), "-"), "-")
	l.Origem = "tally"
	if slug != "" {
		l.Origem = "tally-" + slug
	}
	if len(l.Origem) > 60 {
		l.Origem = strings.TrimRight(l.Origem[:60], "-")
	}
	return l
}

func semAcento(s string) string {
	r := strings.NewReplacer("á", "a", "à", "a", "â", "a", "ã", "a", "é", "e", "ê", "e", "í", "i", "ó", "o", "ô", "o", "õ", "o", "ú", "u", "ç", "c")
	return r.Replace(s)
}

func handleTally(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", "no-store")
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	reply := func(code int, msg string) {
		w.WriteHeader(code)
		json.NewEncoder(w).Encode(map[string]any{"ok": code < 300, "mensagem": msg})
	}
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", "POST")
		reply(http.StatusMethodNotAllowed, "Método não permitido.")
		return
	}
	secret := os.Getenv("TALLY_SIGNING_SECRET")
	if secret == "" {
		slog.Info("tally", "resultado", "sem-segredo")
		reply(http.StatusServiceUnavailable, "Integração não configurada.")
		return
	}
	body, err := io.ReadAll(http.MaxBytesReader(w, r.Body, 64<<10))
	if err != nil {
		reply(http.StatusRequestEntityTooLarge, "Requisição grande demais.")
		return
	}
	if !tallySignatureOK(secret, body, r.Header.Get("Tally-Signature")) {
		slog.Warn("tally", "resultado", "assinatura-invalida")
		reply(http.StatusUnauthorized, "Assinatura inválida.")
		return
	}
	var ev tallyEvent
	if err := json.Unmarshal(body, &ev); err != nil {
		reply(http.StatusBadRequest, "JSON inválido.")
		return
	}
	if ev.EventType != "FORM_RESPONSE" {
		reply(http.StatusOK, "Evento ignorado.")
		return
	}
	l := tallyLead(ev)
	if a, err := mail.ParseAddress(l.Email); err != nil || a.Address != l.Email {
		// Sem e-mail válido não há contato para criar; 200 evita reenvios inúteis do Tally.
		slog.Info("tally", "resultado", "sem-email", "origem", l.Origem)
		reply(http.StatusOK, "Resposta sem e-mail válido.")
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()
	if err := leadSender(ctx, l); err != nil {
		if err == errSemBrevo {
			slog.Info("tally", "resultado", "sem-brevo", "origem", l.Origem)
			reply(http.StatusServiceUnavailable, "Brevo não configurado.")
			return
		}
		slog.Error("tally", "resultado", "falha", "origem", l.Origem, "err", err.Error())
		reply(http.StatusBadGateway, "Falha ao enviar ao Brevo.")
		return
	}
	slog.Info("tally", "resultado", "cadastrado", "origem", l.Origem)
	reply(http.StatusOK, "Contato enviado ao Brevo.")
}
