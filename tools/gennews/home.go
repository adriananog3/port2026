package main

// Atualiza sozinho os cards da newsletter na home e as URLs no sitemap,
// entre os marcadores <!-- NEWS:START --> e <!-- NEWS:END -->.

import (
	"bytes"
	"fmt"
	"html/template"
	"os"
	"path/filepath"
	"strings"
)

type card struct {
	Href, Badge, DateBR, Date, Title, Summary string
	Tags                                      []string
	External                                  bool
	Img                                       string
}

// Imagens de banco de imagens (Unsplash, licença gratuita) por texto da newsletter.
type coverImg struct{ URL, Alt, Credit, Page string }

var coverImages = map[string]coverImg{
	"/newsletter/edicao-1":                         {"https://images.unsplash.com/photo-1745848413078-f85af10e5bf2?auto=format&fit=crop&w=1200&q=70", "Celular com a pasta de aplicativos de redes sociais aberta", "dlxmedia.hu", "https://unsplash.com/photos/Jrz9YXN1Vwc"},
	"/newsletter/edicao-2":                         {"https://images.unsplash.com/photo-1762330467475-a565d04e1808?auto=format&fit=crop&w=1200&q=70", "Tela de celular com a interface de um assistente de inteligência artificial", "Zulfugar Karimov", "https://unsplash.com/photos/BlWbfrQrI5k"},
	"/newsletter/edicao-3":                         {"https://images.unsplash.com/photo-1676911809788-5b9ee7f145fe?auto=format&fit=crop&w=1200&q=70", "Composição abstrata de cubos laranja e brancos, que remete a blocos e tokenização", "Shubham Dhage", "https://unsplash.com/photos/km9umcj61Ow"},
	"/newsletter/branding-mercado-financeiro-2026": {"https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1200&q=70", "Pessoa usando celular e notebook, em referência a serviços financeiros digitais", "Austin Distel", "https://unsplash.com/photos/EMPZ7yRZoGw"},
}

func updateHome(root string, tpl *template.Template, all []*edition, ext []*external) error {
	// Home mostra só 3 textos: os marcados como destaque e, se faltar, os mais recentes do site.
	var top []*edition
	for _, e := range all {
		if e.Destaque && len(top) < 3 {
			top = append(top, e)
		}
	}
	for _, e := range all {
		if len(top) >= 3 {
			break
		}
		if !e.Destaque {
			top = append(top, e)
		}
	}
	var cards []card
	for _, e := range top {
		cards = append(cards, card{e.Path, badgeOf(e), e.DateBR, e.Date, firstNonEmpty(e.HomeTitle, e.Title), firstNonEmpty(e.HomeSummary, e.Summary, e.Subtitle), first(orTags(e.HomeTags, e.Tags), 2), false, e.Img})
	}
	_ = ext
	var buf bytes.Buffer
	if err := tpl.ExecuteTemplate(&buf, "homecards", cards); err != nil {
		return err
	}
	if err := replaceBetween(filepath.Join(root, "web", "index.html"), "\n"+buf.String()); err != nil {
		return err
	}
	var sm strings.Builder
	sm.WriteString("\n  <url><loc>" + site + "/newsletter</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>\n")
	for _, e := range all {
		lm := ""
		if e.Date != "" {
			lm = "<lastmod>" + e.Date + "</lastmod>"
		}
		sm.WriteString("  <url><loc>" + e.URL + "</loc>" + lm + "<changefreq>yearly</changefreq><priority>0.6</priority></url>\n")
	}
	return replaceBetween(filepath.Join(root, "web", "sitemap.xml"), sm.String()+"  ")
}

func replaceBetween(path, content string) error {
	b, err := os.ReadFile(path)
	if err != nil {
		return err
	}
	s := string(b)
	i := strings.Index(s, "<!-- NEWS:START")
	j := strings.Index(s, "<!-- NEWS:END -->")
	if i < 0 || j < i {
		return fmt.Errorf("%s: marcadores NEWS:START/NEWS:END não encontrados", path)
	}
	i += strings.Index(s[i:], "-->") + 3
	return os.WriteFile(path, []byte(s[:i]+content+s[j:]), 0o644)
}

func first(t []string, n int) []string {
	if len(t) > n {
		return t[:n]
	}
	return t
}

func orTags(a, b []string) []string {
	if len(a) > 0 {
		return a
	}
	return b
}

func badgeOf(e *edition) string {
	if e.Label != "" {
		return e.Label
	}
	return fmt.Sprintf("Edição #%d", e.Number)
}
