package main

import (
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestTally(t *testing.T) {
	var got []leadMsg
	leadSender = func(_ context.Context, l leadMsg) error { got = append(got, l); return nil }
	defer func() { leadSender = func(ctx context.Context, l leadMsg) error { return sendBrevo(ctx, l) } }()
	body := `{"eventId":"x","eventType":"FORM_RESPONSE","data":{"formName":"Contato Diagnóstico","fields":[` +
		`{"label":"Seu nome","type":"INPUT_TEXT","value":"Ana Lima"},` +
		`{"label":"Empresa","type":"INPUT_TEXT","value":"ACME"},` +
		`{"label":"E-mail","type":"INPUT_EMAIL","value":"ana@example.com"},` +
		`{"label":"WhatsApp","type":"INPUT_PHONE_NUMBER","value":"+55 (11) 98888-7777"},` +
		`{"label":"Serviços","type":"CHECKBOXES","value":["a","b"]}]}}`
	sign := func(sec, b string) string {
		m := hmac.New(sha256.New, []byte(sec))
		m.Write([]byte(b))
		return base64.StdEncoding.EncodeToString(m.Sum(nil))
	}
	call := func(sig string) int {
		r := httptest.NewRequest("POST", "/api/tally", strings.NewReader(body))
		r.Header.Set("Tally-Signature", sig)
		w := httptest.NewRecorder()
		handleTally(w, r)
		return w.Code
	}
	t.Setenv("TALLY_SIGNING_SECRET", "")
	if c := call(sign("s", body)); c != 503 {
		t.Fatalf("sem segredo: %d", c)
	}
	t.Setenv("TALLY_SIGNING_SECRET", "s")
	if c := call(sign("errado", body)); c != 401 {
		t.Fatalf("assinatura errada: %d", c)
	}
	if len(got) != 0 {
		t.Fatal("não deveria enviar sem assinatura válida")
	}
	if c := call(sign("s", body)); c != 200 {
		t.Fatalf("válido: %d", c)
	}
	want := leadMsg{Tipo: "tally", Nome: "Ana Lima", Empresa: "ACME", Email: "ana@example.com", Telefone: "+5511988887777", Origem: "tally-contato-diagnostico"}
	if len(got) != 1 || got[0] != want {
		t.Fatalf("lead = %+v", got)
	}
}
