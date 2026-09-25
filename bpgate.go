package main

// Trava do Banco de Prompts: /banco-prompts.json só é entregue para quem enviou o formulário.
//
// Ao cadastrar com sucesso em /api/lead (tipo "prompts"), o servidor grava o cookie bp_acesso
// (HttpOnly, assinado com HMAC). Sem esse cookie, /banco-prompts.json responde 403.
//
// Enquanto BREVO_API_KEY não estiver configurada, o cadastro acontece pelo Tally (formulário
// alternativo) e /api/prompts/tally libera o cookie depois do envio. Assim que a chave do Brevo
// entra na Vercel, essa rota deixa de liberar e só o formulário próprio do site dá acesso.
//
// Segredo da assinatura: BP_SECRET (recomendado) ou, na falta dele, BREVO_API_KEY / TALLY_SIGNING_SECRET.

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

const bpCookie = "bp_acesso"

func bpSecret() []byte {
	for _, k := range []string{"BP_SECRET", "BREVO_API_KEY", "TALLY_SIGNING_SECRET"} {
		if v := os.Getenv(k); v != "" {
			return []byte("bp:" + v)
		}
	}
	return []byte("bp:adriana-nogueira.com:sem-segredo")
}

func bpSign(exp int64) string {
	m := hmac.New(sha256.New, bpSecret())
	m.Write([]byte(strconv.FormatInt(exp, 10)))
	return hex.EncodeToString(m.Sum(nil))
}

func issueBPCookie(w http.ResponseWriter) {
	exp := time.Now().Add(365 * 24 * time.Hour).Unix()
	http.SetCookie(w, &http.Cookie{
		Name:     bpCookie,
		Value:    strconv.FormatInt(exp, 10) + "." + bpSign(exp),
		Path:     "/",
		MaxAge:   365 * 24 * 3600,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
	})
}

func validBPCookie(r *http.Request) bool {
	c, err := r.Cookie(bpCookie)
	if err != nil {
		return false
	}
	exp, sig, ok := strings.Cut(c.Value, ".")
	if !ok {
		return false
	}
	n, err := strconv.ParseInt(exp, 10, 64)
	if err != nil || time.Now().Unix() > n {
		return false
	}
	return hmac.Equal([]byte(sig), []byte(bpSign(n)))
}

// handleBPTally libera o acesso depois do envio pelo Tally, só enquanto o Brevo não está configurado.
func handleBPTally(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", "no-store")
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", "POST")
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte(`{"ok":false}`))
		return
	}
	if os.Getenv("BREVO_API_KEY") != "" {
		w.WriteHeader(http.StatusForbidden)
		w.Write([]byte(`{"ok":false,"mensagem":"Use o formulário do site para liberar o acesso."}`))
		return
	}
	issueBPCookie(w)
	w.Write([]byte(`{"ok":true}`))
}
