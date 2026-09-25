package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestIrWhatsapp(t *testing.T) {
	rec := httptest.NewRecorder()
	handleIrWhatsapp(rec, httptest.NewRequest(http.MethodGet, "/ir/whatsapp?origem=Menu-Fale<script>", nil))
	if rec.Code != http.StatusFound || rec.Header().Get("Location") != whatsappURL {
		t.Fatalf("redirecionamento errado: %d %q", rec.Code, rec.Header().Get("Location"))
	}
	if got := origemLimpa("Menu-Fale<script>"); got != "menu-falescript" {
		t.Fatalf("origem: %q", got)
	}
	if origemLimpa("") != "sem-origem" {
		t.Fatal("origem vazia")
	}
}
