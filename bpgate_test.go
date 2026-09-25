package main

import (
	"net/http/httptest"
	"testing"
)

func TestBPGate(t *testing.T) {
	t.Setenv("BREVO_API_KEY", "")
	t.Setenv("BP_SECRET", "x")
	r := httptest.NewRequest("GET", "/banco-prompts.json", nil)
	if validBPCookie(r) {
		t.Fatal("sem cookie não pode liberar")
	}
	w := httptest.NewRecorder()
	handleBPTally(w, httptest.NewRequest("POST", "/api/prompts/tally", nil))
	if w.Code != 200 {
		t.Fatalf("tally sem brevo: %d", w.Code)
	}
	c := w.Result().Cookies()
	if len(c) != 1 || !c[0].HttpOnly {
		t.Fatalf("cookie: %+v", c)
	}
	r.AddCookie(c[0])
	if !validBPCookie(r) {
		t.Fatal("cookie válido recusado")
	}
	r2 := httptest.NewRequest("GET", "/banco-prompts.json", nil)
	c[0].Value = c[0].Value[:len(c[0].Value)-1] + "0"
	r2.AddCookie(c[0])
	if validBPCookie(r2) && c[0].Value[len(c[0].Value)-1] != '0' {
		t.Fatal("cookie adulterado aceito")
	}
	t.Setenv("BREVO_API_KEY", "k")
	w = httptest.NewRecorder()
	handleBPTally(w, httptest.NewRequest("POST", "/api/prompts/tally", nil))
	if w.Code != 403 {
		t.Fatalf("tally com brevo deveria recusar: %d", w.Code)
	}
}
