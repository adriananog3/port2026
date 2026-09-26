// gennews gera as páginas da Newsletter Exponencial Future a partir de content/*.json.
//
//	go run ./tools/gennews
//
// Saída: web/newsletter/index.html (lista de edições) e web/newsletter/edicao-N.html (texto completo).
// O HTML do corpo das edições passa por uma lista de tags permitidas antes de ser publicado.
package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/url"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
	"time"
)

const site = "https://adriana-nogueira.com"
const tally = "https://tally.so/r/68GedB"
const whatsapp = "/ir/whatsapp?origem=newsletter"
const linkedin = "https://www.linkedin.com/in/adriana-nogueira-cea-marketing3/"

type item struct {
	Icon  string `json:"icon"`
	Title string `json:"title"`
	Text  string `json:"text"`
}

// listBlock aceita itens como texto simples ou como objeto {icon,title,text}.
type listBlock struct {
	Title string
	Plain []string
	Rich  []item
}

func (l *listBlock) UnmarshalJSON(b []byte) error {
	var raw struct {
		Title string            `json:"title"`
		Items []json.RawMessage `json:"items"`
	}
	if err := json.Unmarshal(b, &raw); err != nil {
		return err
	}
	l.Title = raw.Title
	for _, it := range raw.Items {
		var s string
		if json.Unmarshal(it, &s) == nil {
			l.Plain = append(l.Plain, s)
			continue
		}
		var o item
		if err := json.Unmarshal(it, &o); err != nil {
			return err
		}
		l.Rich = append(l.Rich, o)
	}
	return nil
}

type edition struct {
	Number   int      `json:"number"`
	Title    string   `json:"title"`
	Subtitle string   `json:"subtitle"`
	Date     string   `json:"date"`
	ReadTime int      `json:"readTime"`
	Tags     []string `json:"tags"`
	Summary  string   `json:"summary"`
	Content  *struct {
		Hero struct {
			Title    string `json:"title"`
			Subtitle string `json:"subtitle"`
		} `json:"hero"`
		Body            string    `json:"body"`
		Highlights      listBlock `json:"highlights"`
		QuickReads      listBlock `json:"quickReads"`
		Thoughts        listBlock `json:"thoughts"`
		Recommendations listBlock `json:"recommendations"`
		Quote           struct {
			Text   string `json:"text"`
			Author string `json:"author"`
		} `json:"quote"`
	} `json:"content"`
	Published bool   `json:"published"`
	Slug      string `json:"slug"`     // artigos avulsos: /newsletter/<slug>
	Label     string `json:"label"`    // ex.: "Artigo" (edições usam "Edição #N")
	BodyRaw   string `json:"bodyHTML"` // corpo de artigos avulsos
	// Texto curto do card na home (opcional; sem ele, usa título, resumo e tags)
	HomeTitle   string   `json:"homeTitle"`
	HomeSummary string   `json:"homeSummary"`
	HomeTags    []string `json:"homeTags"`
	AISummary   []string `json:"aiSummary"` // resumo gerado com IA e revisado pela autora
	Destaque    bool     `json:"destaque"`  // aparece entre os 3 textos da home

	Related []*edition
	Cat     string
	Cover   int

	Full     bool
	BodyHTML template.HTML
	DateBR   string
	URL      string
	Path     string
	Img      string
	ImgAlt   string
	ImgBy    string
	ImgPage  string
}

type external struct {
	Label   string   `json:"label"`
	Title   string   `json:"title"`
	Date    string   `json:"date"`
	Tags    []string `json:"tags"`
	URL     string   `json:"url"`
	Summary string   `json:"summary"`
	DateBR  string
}

// ---------- saneamento do HTML do corpo ----------

var (
	reScript  = regexp.MustCompile(`(?is)<(script|style|iframe|object|embed)[^>]*>.*?</\s*(script|style|iframe|object|embed)\s*>`)
	reTag     = regexp.MustCompile(`(?s)<(/?)([a-zA-Z0-9]+)([^>]*)>`)
	reHref    = regexp.MustCompile(`(?i)href\s*=\s*"(https?://[^"]+)"`)
	allowTags = map[string]bool{"p": true, "strong": true, "em": true, "b": true, "i": true, "h2": true, "h3": true,
		"ul": true, "ol": true, "li": true, "blockquote": true, "a": true, "br": true, "div": true}
)

func sanitize(h string) template.HTML {
	h = reScript.ReplaceAllString(h, "")
	h = reTag.ReplaceAllStringFunc(h, func(t string) string {
		m := reTag.FindStringSubmatch(t)
		name := strings.ToLower(m[2])
		if !allowTags[name] {
			return ""
		}
		if m[1] == "/" {
			return "</" + name + ">"
		}
		if name == "a" {
			if hm := reHref.FindStringSubmatch(m[3]); hm != nil {
				return `<a href="` + template.HTMLEscapeString(hm[1]) + `" target="_blank" rel="noopener">`
			}
			return "<a>"
		}
		return "<" + name + ">"
	})
	return template.HTML(h)
}

var meses = []string{"janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"}

func dateBR(iso string) string {
	if iso == "" {
		return ""
	}
	t, err := dateParse(iso)
	if err != nil {
		return iso
	}
	return fmt.Sprintf("%02d de %s de %d", t.Day(), meses[t.Month()-1], t.Year())
}

func dateParse(iso string) (time.Time, error) { return time.Parse("2006-01-02", iso) }

func main() {
	root := "."
	var data struct {
		Editions []*edition `json:"editions"`
	}
	mustJSON(filepath.Join(root, "content", "editions.json"), &data)
	var extra struct {
		Partial  []*edition  `json:"partial"`
		External []*external `json:"external"`
	}
	mustJSON(filepath.Join(root, "content", "newsletter-extra.json"), &extra)

	var all []*edition
	for _, e := range data.Editions {
		if !e.Published || e.Content == nil {
			continue
		}
		e.Full = true
		e.BodyHTML = sanitize(e.Content.Body)
		all = append(all, e)
	}
	all = append(all, extra.Partial...)
	md, err := loadMarkdownEditions(filepath.Join(root, "content", "edicoes"))
	if err != nil {
		log.Fatalf("edição nova recusada: %v", err)
	}
	seen := map[int]bool{}
	for _, e := range all {
		seen[e.Number] = true
	}
	for _, e := range md {
		if seen[e.Number] {
			log.Fatalf("edição nova recusada: já existe uma Edição #%d", e.Number)
		}
		seen[e.Number] = true
		e.BodyHTML = sanitize(e.BodyRaw)
		all = append(all, e)
	}
	var arts struct {
		Articles []*edition `json:"articles"`
	}
	mustJSON(filepath.Join(root, "content", "articles.json"), &arts)
	for _, a := range arts.Articles {
		a.Full = true
		a.BodyHTML = sanitize(a.BodyRaw)
	}
	for _, e := range all {
		e.Path = fmt.Sprintf("/newsletter/edicao-%d", e.Number)
	}
	for _, a := range arts.Articles {
		a.Path = "/newsletter/" + a.Slug
	}
	all = append(all, arts.Articles...)
	for _, e := range all {
		if c, ok := coverImages[e.Path]; ok {
			e.Img, e.ImgAlt, e.ImgBy, e.ImgPage = c.URL, c.Alt, c.Credit, c.Page
		}
	}
	for _, e := range all {
		e.DateBR = dateBR(e.Date)
		e.URL = site + e.Path
	}
	sort.SliceStable(all, func(i, j int) bool {
		if all[i].Date == all[j].Date {
			return all[i].Number > all[j].Number
		}
		return all[i].Date > all[j].Date
	})
	for _, x := range extra.External {
		x.DateBR = dateBR(x.Date)
	}
	for i, e := range all {
		e.Cover = i % 4
		if len(e.Tags) > 0 {
			e.Cat = e.Tags[0]
		}
	}
	for _, e := range all {
		e.Related = related(e, all, 3)
	}

	out := filepath.Join(root, "web", "newsletter")
	must(os.MkdirAll(out, 0o755))
	old, _ := filepath.Glob(filepath.Join(out, "*.html")) // recria do zero: página removida do conteúdo sai do site
	for _, f := range old {
		must(os.Remove(f))
	}
	tpl := template.Must(template.New("").Funcs(template.FuncMap{
		"json":  func(v any) template.JS { b, _ := json.Marshal(v); return template.JS(b) },
		"join":  strings.Join,
		"urlq":  url.QueryEscape,
		"badge": badgeOf,
		"short": func(e *edition) string {
			if e.Label != "" {
				return e.Label
			}
			return fmt.Sprintf("#%d", e.Number)
		},
	}).Parse(pageTpl + homeCardsTpl))

	for _, e := range all {
		f, err := os.Create(filepath.Join(out, strings.TrimPrefix(e.Path, "/newsletter/")+".html"))
		must(err)
		must(tpl.ExecuteTemplate(f, "edition", map[string]any{"E": e, "Site": site, "Tally": tally, "LD": articleLD(e), "LinkedIn": linkedin, "WhatsApp": whatsapp, "Ferr": mkFerramentas(e.URL, e.Title)}))
		f.Close()
	}
	f, err := os.Create(filepath.Join(out, "index.html"))
	must(err)
	var feat *edition
	var side, rest []*edition
	for i, e := range all {
		switch {
		case i == 0:
			feat = e
		case i <= 4:
			side = append(side, e)
		default:
			rest = append(rest, e)
		}
	}
	cards := buildCards(all, extra.External)
	var featCard *nlCard
	var dest []nlCard
	for i := range cards { // destaque principal: o texto mais recente publicado no próprio site
		if !cards[i].External && featCard == nil {
			featCard = &cards[i]
			continue
		}
		if len(dest) < 3 {
			dest = append(dest, cards[i])
		}
	}
	_, _, _ = feat, side, rest
	must(tpl.ExecuteTemplate(f, "index", map[string]any{"All": all, "Feat": featCard, "Dest": dest, "Cards": cards, "Sections": buildSections(cards), "ExtCards": extCards(cards), "Ext": extra.External, "Ferr": mkFerramentas(site+"/newsletter", "Newsletter Exponencial Future | Adriana Nogueira"), "Site": site, "Tally": tally, "LinkedIn": linkedin}))
	f.Close()
	must(updateHome(root, tpl, all, extra.External))
	fmt.Printf("newsletter: %d páginas (%d edições novas em Markdown, %d artigos) + página inicial, cards da home e sitemap\n", len(all), len(md), len(arts.Articles))
}

func articleLD(e *edition) map[string]any {
	ld := map[string]any{
		"@context": "https://schema.org", "@type": "Article", "headline": e.Title, "description": firstNonEmpty(e.Subtitle, e.Summary),
		"inLanguage": "pt-BR", "url": e.URL, "keywords": strings.Join(e.Tags, ", "),
		"author":    map[string]any{"@type": "Person", "name": "Adriana Nogueira", "url": site + "/"},
		"publisher": map[string]any{"@type": "Person", "name": "Adriana Nogueira"},
		"isPartOf":  map[string]any{"@type": "CreativeWorkSeries", "name": "Newsletter Exponencial Future", "url": site + "/newsletter"},
		"image":     site + "/assets/adriana-nogueira-og.jpg",
	}
	if e.Date != "" {
		ld["datePublished"] = e.Date
	}
	return ld
}

func firstNonEmpty(s ...string) string {
	for _, x := range s {
		if strings.TrimSpace(x) != "" {
			return x
		}
	}
	return ""
}

func mustJSON(p string, v any) {
	b, err := os.ReadFile(p)
	must(err)
	must(json.Unmarshal(b, v))
}

func must(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

// related escolhe até n textos do site: primeiro os que dividem tags, depois os mais recentes.
func related(e *edition, all []*edition, n int) []*edition {
	var same, other []*edition
	tags := map[string]bool{}
	for _, t := range e.Tags {
		tags[t] = true
	}
	for _, o := range all {
		if o == e {
			continue
		}
		hit := false
		for _, t := range o.Tags {
			if tags[t] {
				hit = true
				break
			}
		}
		if hit {
			same = append(same, o)
		} else {
			other = append(other, o)
		}
	}
	r := append(same, other...)
	if len(r) > n {
		r = r[:n]
	}
	return r
}
