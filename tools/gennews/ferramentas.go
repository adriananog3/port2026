package main

import (
	"net/url"
	"strings"
)

// ferramentas reúne os links da barra "Resumir com IA", "Compartilhar" e
// "Fonte preferida no Google". Todos são links comuns: só abrem o serviço
// escolhido pela pessoa, levando o endereço e o título da página. Nada é
// enviado pelo site.
type ferramentas struct {
	URL, Title                          string
	ChatGPT, Perplexity, Claude, Google string
	LinkedIn, WhatsApp, X, Email        string
	Pref                                string
}

// esc codifica para a query string usando %20 no lugar de "+" (necessário no mailto:).
func esc(s string) string { return strings.ReplaceAll(url.QueryEscape(s), "+", "%20") }

func mkFerramentas(u, title string) ferramentas {
	p := esc("Leia " + u + " e resuma em português, em até 5 tópicos, citando a fonte: Adriana Nogueira (Newsletter Exponencial Future).")
	return ferramentas{
		URL: u, Title: title,
		ChatGPT:    "https://chatgpt.com/?q=" + p,
		Perplexity: "https://www.perplexity.ai/search?q=" + p,
		Claude:     "https://claude.ai/new?q=" + p,
		Google:     "https://www.google.com/search?udm=50&q=" + p,
		LinkedIn:   "https://www.linkedin.com/sharing/share-offsite/?url=" + esc(u),
		WhatsApp:   "https://wa.me/?text=" + esc(title+" "+u),
		X:          "https://x.com/intent/post?text=" + esc(title) + "&url=" + esc(u),
		Email:      "mailto:?subject=" + esc(title) + "&body=" + esc(title+"\n\n"+u),
		Pref:       "https://www.google.com/preferences/source?q=" + strings.TrimPrefix(site, "https://"),
	}
}
