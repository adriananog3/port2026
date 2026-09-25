package main

// Cadastro direto no site (newsletter e Banco de Prompts) enviado ao Brevo.
//
// POST /api/lead (formulário ou JSON) recebe:
//   tipo          "newsletter" ou "prompts"
//   email         obrigatório
//   nome, empresa, telefone   obrigatórios quando tipo = "prompts"
//   consentimento obrigatório (LGPD, art. 7º, I)
//   origem        opcional (ex.: home, newsletter-edicao-2)
//   website       armadilha para robôs (deve vir vazio)
//
// Variáveis de ambiente (Vercel):
//   BREVO_API_KEY          chave da API v3 do Brevo (sem ela, responde 503 e o site usa o formulário do Tally)
//   BREVO_LIST_NEWSLETTER  ID da lista da newsletter
//   BREVO_LIST_PROMPTS     ID da lista do Banco de Prompts
//   BREVO_LIST_TALLY       ID da lista de leads do Tally (usada por /api/tally)
//
// LGPD: nada é gravado em disco; os logs registram só tipo, origem e resultado.

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"net/mail"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"
	"unicode/utf8"
)

type leadMsg struct {
	Tipo, Nome, Empresa, Email, Telefone, Origem string
}

var leadLimit = &limiter{hits: map[string][]time.Time{}}

// leadSender permite trocar o envio real por um falso nos testes.
var leadSender = func(ctx context.Context, l leadMsg) error { return sendBrevo(ctx, l) }

var errSemBrevo = fmt.Errorf("BREVO_API_KEY não configurada")

var reNaoDigito = regexp.MustCompile(`\D`)

// telefoneE164 normaliza telefones brasileiros para +55DDNÚMERO (10 ou 11 dígitos após o 55).
func telefoneE164(t string) (string, bool) {
	d := reNaoDigito.ReplaceAllString(t, "")
	d = strings.TrimPrefix(d, "00")
	if strings.HasPrefix(d, "55") && (len(d) == 12 || len(d) == 13) {
		d = d[2:]
	}
	d = strings.TrimPrefix(d, "0")
	if len(d) != 10 && len(d) != 11 {
		return "", false
	}
	return "+55" + d, true
}

func handleLead(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", "no-store")
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	reply := func(code int, ok bool, msg string, extra map[string]any) {
		out := map[string]any{"ok": ok, "mensagem": msg}
		for k, v := range extra {
			out[k] = v
		}
		w.WriteHeader(code)
		json.NewEncoder(w).Encode(out)
	}
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", "POST")
		reply(http.StatusMethodNotAllowed, false, "Método não permitido.", nil)
		return
	}
	r.Body = http.MaxBytesReader(w, r.Body, 8<<10)
	vals := map[string]string{}
	if strings.HasPrefix(r.Header.Get("Content-Type"), "application/json") {
		var raw map[string]any
		if err := json.NewDecoder(r.Body).Decode(&raw); err != nil {
			reply(http.StatusBadRequest, false, "Não foi possível ler o formulário.", nil)
			return
		}
		for k, v := range raw {
			switch x := v.(type) {
			case string:
				vals[k] = x
			case bool:
				if x {
					vals[k] = "sim"
				}
			}
		}
	} else {
		if err := r.ParseForm(); err != nil {
			reply(http.StatusBadRequest, false, "Não foi possível ler o formulário.", nil)
			return
		}
		for k := range r.PostForm {
			vals[k] = r.PostForm.Get(k)
		}
	}
	f := func(k string, max int) string {
		v := strings.TrimSpace(vals[k])
		if utf8.RuneCountInString(v) > max {
			v = string([]rune(v)[:max])
		}
		return v
	}
	l := leadMsg{Tipo: f("tipo", 20), Nome: f("nome", 120), Empresa: f("empresa", 160), Email: f("email", 200), Telefone: f("telefone", 40), Origem: f("origem", 60)}
	if l.Tipo != "prompts" {
		l.Tipo = "newsletter"
	}
	if !reOrigem.MatchString(l.Origem) {
		l.Origem = l.Tipo
	}
	if f("website", 200) != "" { // robô
		slog.Info("lead", "resultado", "robo", "tipo", l.Tipo)
		reply(http.StatusOK, true, "Cadastro feito. Obrigada!", nil)
		return
	}
	if a, err := mail.ParseAddress(l.Email); err != nil || a.Address != l.Email {
		reply(http.StatusBadRequest, false, "Confira o e-mail informado.", map[string]any{"campo": "email"})
		return
	}
	if l.Tipo == "prompts" {
		if l.Nome == "" || l.Empresa == "" {
			reply(http.StatusBadRequest, false, "Preencha nome, empresa, telefone e e-mail.", nil)
			return
		}
		tel, ok := telefoneE164(l.Telefone)
		if !ok {
			reply(http.StatusBadRequest, false, "Confira o telefone, com DDD.", map[string]any{"campo": "telefone"})
			return
		}
		l.Telefone = tel
	}
	if vals["consentimento"] == "" {
		reply(http.StatusBadRequest, false, "Para continuar, é preciso concordar com o uso dos dados.", map[string]any{"campo": "consentimento"})
		return
	}
	if !leadLimit.allow(clientIP(r)) {
		reply(http.StatusTooManyRequests, false, "Muitas tentativas seguidas. Tente de novo em alguns minutos.", nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()
	if err := leadSender(ctx, l); err != nil {
		if err == errSemBrevo {
			slog.Info("lead", "resultado", "sem-brevo", "tipo", l.Tipo, "origem", l.Origem)
			reply(http.StatusServiceUnavailable, false, "Use o formulário abaixo para concluir.", map[string]any{"fallback": true})
			return
		}
		slog.Error("lead", "resultado", "falha", "tipo", l.Tipo, "origem", l.Origem, "err", err.Error())
		reply(http.StatusBadGateway, false, "Não foi possível concluir agora. Use o formulário abaixo.", map[string]any{"fallback": true})
		return
	}
	slog.Info("lead", "resultado", "cadastrado", "tipo", l.Tipo, "origem", l.Origem)
	msg := "Pronto! Você vai receber a próxima edição no seu e-mail."
	if l.Tipo == "prompts" {
		msg = "Acesso liberado. Bom proveito!"
	}
	reply(http.StatusOK, true, msg, nil)
}

// sendBrevo cria ou atualiza o contato no Brevo e o coloca na lista do tipo.
// Se o Brevo recusar atributos (por exemplo, telefone já usado por outro contato
// ou atributo ainda não criado na conta), tenta de novo só com o e-mail e o nome.
func sendBrevo(ctx context.Context, l leadMsg) error {
	key := os.Getenv("BREVO_API_KEY")
	if key == "" {
		return errSemBrevo
	}
	listEnv := "BREVO_LIST_NEWSLETTER"
	switch l.Tipo {
	case "prompts":
		listEnv = "BREVO_LIST_PROMPTS"
	case "tally":
		listEnv = "BREVO_LIST_TALLY"
	}
	var lists []int
	if id, err := strconv.Atoi(os.Getenv(listEnv)); err == nil && id > 0 {
		lists = append(lists, id)
	}
	attrs := map[string]any{}
	if l.Nome != "" {
		attrs["FIRSTNAME"] = l.Nome
	}
	full := map[string]any{}
	for k, v := range attrs {
		full[k] = v
	}
	if l.Empresa != "" {
		full["EMPRESA"] = l.Empresa
	}
	if l.Telefone != "" {
		full["SMS"] = l.Telefone
		full["TELEFONE"] = l.Telefone
	}
	full["ORIGEM"] = l.Origem
	post := func(a map[string]any) (int, string, error) {
		body := map[string]any{"email": l.Email, "updateEnabled": true, "attributes": a}
		if len(lists) > 0 {
			body["listIds"] = lists
		}
		b, _ := json.Marshal(body)
		req, err := http.NewRequestWithContext(ctx, http.MethodPost, "https://api.brevo.com/v3/contacts", bytes.NewReader(b))
		if err != nil {
			return 0, "", err
		}
		req.Header.Set("api-key", key)
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("Accept", "application/json")
		res, err := http.DefaultClient.Do(req)
		if err != nil {
			return 0, "", err
		}
		defer res.Body.Close()
		msg, _ := io.ReadAll(io.LimitReader(res.Body, 2048))
		return res.StatusCode, string(msg), nil
	}
	code, msg, err := post(full)
	if err != nil {
		return err
	}
	if code < 300 {
		return nil
	}
	if code == http.StatusBadRequest {
		code2, msg2, err := post(attrs)
		if err != nil {
			return err
		}
		if code2 < 300 {
			slog.Warn("lead", "resultado", "brevo-atributos-recusados", "detalhe", trimMsg(msg))
			return nil
		}
		return fmt.Errorf("brevo: status %d: %s", code2, trimMsg(msg2))
	}
	return fmt.Errorf("brevo: status %d: %s", code, trimMsg(msg))
}

// trimMsg corta a resposta do Brevo para o log sem copiar dados pessoais.
func trimMsg(s string) string {
	var m struct{ Code, Message string }
	if json.Unmarshal([]byte(s), &m) == nil && m.Code != "" {
		return m.Code
	}
	if len(s) > 80 {
		return s[:80]
	}
	return s
}
