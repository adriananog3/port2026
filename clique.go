package main

// Rastreio de cliques para o WhatsApp: /ir/whatsapp?origem=<botão>.
// Registra só a origem do clique no log do servidor (sem IP, sem dados pessoais) e
// redireciona para o WhatsApp. Para ver os cliques: logs da Vercel, filtro "clique".

import (
	"log/slog"
	"net/http"
	"strings"
)

const whatsappURL = "https://wa.me/qr/2XEF52R64MEEF1"

func origemLimpa(s string) string {
	s = strings.ToLower(strings.TrimSpace(s))
	var b strings.Builder
	for _, c := range s {
		if (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c == '-' {
			b.WriteRune(c)
		}
		if b.Len() >= 48 {
			break
		}
	}
	if b.Len() == 0 {
		return "sem-origem"
	}
	return b.String()
}

func handleIrWhatsapp(w http.ResponseWriter, r *http.Request) {
	o := origemLimpa(r.URL.Query().Get("origem"))
	slog.Info("clique", "destino", "whatsapp", "origem", o)
	w.Header().Set("Cache-Control", "no-store")
	w.Header().Set("X-Robots-Tag", "noindex, nofollow")
	w.Header().Set("Referrer-Policy", "no-referrer")
	http.Redirect(w, r, whatsappURL, http.StatusFound)
}
