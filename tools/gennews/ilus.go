package main

// Ilustrações das capas da página /newsletter (SVG próprio, na paleta da marca:
// preto, champagne, dourado, bronze e platinum). Cada texto tem uma ilustração
// ligada ao tema; textos novos sem ilustração própria recebem uma composição abstrata.

import (
	"fmt"
	"html/template"
	"sort"
	"strings"
)

const (
	cK = "#000000"
	cC = "#FDFBF7"
	cG = "#C9A96E"
	cB = "#7A5F2C"
	cP = "#D9D9D9"
)

func svgWrap(body string) template.HTML {
	return template.HTML(`<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" role="presentation" focusable="false">` + body + `</svg>`)
}

func steam(x, y int, color string) string {
	var b strings.Builder
	for i := 0; i < 3; i++ {
		xx := x + i*14
		fmt.Fprintf(&b, `<path d="M%d %d q-7 -10 0 -20 q7 -10 0 -20" fill="none" stroke="%s" stroke-width="4" stroke-linecap="round"/>`, xx, y, color)
	}
	return b.String()
}

func cup(x, y int, fill, line string) string {
	return fmt.Sprintf(`<path d="M%d %d h70 v34 a35 35 0 0 1 -70 0z" fill="%s" stroke="%s" stroke-width="5" stroke-linejoin="round"/>`+
		`<path d="M%d %d a14 14 0 0 1 0 28 h-4" fill="none" stroke="%s" stroke-width="5"/>`+
		`<path d="M%d %d h96" stroke="%s" stroke-width="5" stroke-linecap="round"/>`,
		x, y, fill, line, x+70, y+6, line, x-13, y+70, line)
}

func sparkle(cx, cy, r int, color string) string {
	return fmt.Sprintf(`<path d="M%d %d Q%d %d %d %d Q%d %d %d %d Q%d %d %d %d Q%d %d %d %dZ" fill="%s"/>`,
		cx, cy-r, cx, cy, cx+r, cy, cx, cy, cx, cy+r, cx, cy, cx-r, cy, cx, cy, cx, cy-r, color)
}

var ilusByKey = map[string]string{
	// Edição #3 — A Virada: busca sem clique, Meta x Google e tokenização
	"ed3": `<rect width="320" height="200" fill="` + cG + `"/><circle cx="262" cy="46" r="104" fill="` + cK + `"/>` +
		`<rect x="22" y="112" width="132" height="70" rx="10" fill="` + cC + `" transform="rotate(-7 88 147)"/>` +
		`<ellipse cx="70" cy="156" rx="30" ry="9" fill="` + cB + `" stroke="` + cK + `" stroke-width="3"/>` +
		`<ellipse cx="70" cy="144" rx="30" ry="9" fill="` + cB + `" stroke="` + cK + `" stroke-width="3"/>` +
		`<ellipse cx="70" cy="132" rx="30" ry="9" fill="` + cB + `" stroke="` + cK + `" stroke-width="3"/>` +
		`<ellipse cx="70" cy="120" rx="30" ry="9" fill="` + cG + `" stroke="` + cK + `" stroke-width="3"/>` +
		`<path d="M120 158 V104 M108 116 L120 104 L132 116" stroke="` + cK + `" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
		`<circle cx="214" cy="92" r="44" fill="` + cC + `" stroke="` + cG + `" stroke-width="11"/>` +
		`<path d="M246 124 L288 166" stroke="` + cG + `" stroke-width="15" stroke-linecap="round"/>` +
		`<path d="M192 70 L236 114" stroke="` + cK + `" stroke-width="8" stroke-linecap="round"/>`,
	// Edição #2 — Como a IA enxerga sua marca
	"ed2": `<rect width="320" height="200" fill="` + cK + `"/><circle cx="84" cy="118" r="86" fill="` + cC + `"/><circle cx="292" cy="22" r="40" fill="` + cB + `"/>` +
		`<rect x="40" y="82" width="86" height="11" rx="5" fill="` + cK + `"/><rect x="40" y="103" width="64" height="11" rx="5" fill="` + cG + `"/><rect x="40" y="124" width="76" height="11" rx="5" fill="` + cK + `"/>` +
		`<rect x="150" y="44" width="146" height="98" rx="20" fill="` + cG + `"/><path d="M178 140 L168 170 L204 142Z" fill="` + cG + `"/>` +
		`<path d="M178 93 Q223 58 268 93 Q223 128 178 93Z" fill="` + cC + `" stroke="` + cK + `" stroke-width="5"/>` +
		`<circle cx="223" cy="93" r="15" fill="` + cK + `"/><circle cx="229" cy="87" r="4.5" fill="` + cC + `"/>` +
		sparkle(150, 40, 16, cC) + sparkle(292, 160, 11, cG),
	// Edição #1 — Meta vai ultrapassar o Google em Ads
	"ed1": `<rect width="320" height="200" fill="` + cC + `"/><circle cx="60" cy="196" r="112" fill="` + cG + `"/><circle cx="296" cy="14" r="74" fill="` + cK + `"/>` +
		`<path d="M118 36 V168 H292" stroke="` + cK + `" stroke-width="6" fill="none" stroke-linecap="round"/>` +
		`<rect x="136" y="124" width="22" height="44" fill="` + cK + `"/><rect x="162" y="112" width="22" height="56" fill="` + cB + `"/>` +
		`<rect x="196" y="104" width="22" height="64" fill="` + cK + `"/><rect x="222" y="84" width="22" height="84" fill="` + cB + `"/>` +
		`<rect x="256" y="96" width="22" height="72" fill="` + cK + `"/><rect x="282" y="58" width="0" height="0" fill="none"/>` +
		`<path d="M132 104 L184 84 L222 60 L268 38" stroke="` + cG + `" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
		`<path d="M250 32 L270 37 L262 56" stroke="` + cG + `" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
		sparkle(70, 70, 18, cK),
	// Artigo — Branding no mercado financeiro: fintechs e comunidades
	"branding-mercado-financeiro-2026": `<rect width="320" height="200" fill="` + cB + `"/><circle cx="246" cy="112" r="92" fill="` + cC + `"/>` +
		`<path d="M40 86 L118 58 V150 L40 122Z" fill="` + cG + `" stroke="` + cK + `" stroke-width="5" stroke-linejoin="round"/>` +
		`<rect x="18" y="84" width="26" height="40" rx="6" fill="` + cK + `"/><path d="M58 124 L66 162 H84 L78 128" fill="` + cK + `"/>` +
		`<path d="M134 82 q14 22 0 44 M150 70 q24 34 0 68" stroke="` + cC + `" stroke-width="6" fill="none" stroke-linecap="round"/>` +
		`<circle cx="214" cy="84" r="17" fill="` + cK + `"/><path d="M186 136 a28 28 0 0 1 56 0z" fill="` + cK + `"/>` +
		`<circle cx="268" cy="96" r="15" fill="` + cG + `"/><path d="M244 142 a24 24 0 0 1 48 0z" fill="` + cG + `"/>` +
		`<circle cx="238" cy="150" r="12" fill="` + cB + `"/><path d="M218 188 a20 20 0 0 1 40 0z" fill="` + cB + `"/>`,
	// Café com Caos — voltando a colecionar coisas físicas
	"ext-fisicas": `<rect width="320" height="200" fill="` + cP + `"/><circle cx="70" cy="40" r="92" fill="` + cG + `"/>` +
		`<circle cx="246" cy="84" r="62" fill="` + cK + `"/><circle cx="246" cy="84" r="44" fill="none" stroke="#2a2a2a" stroke-width="3"/><circle cx="246" cy="84" r="30" fill="none" stroke="#2a2a2a" stroke-width="3"/><circle cx="246" cy="84" r="17" fill="` + cG + `"/><circle cx="246" cy="84" r="4" fill="` + cK + `"/>` +
		`<g transform="rotate(8 176 150)"><rect x="140" y="106" width="74" height="84" fill="` + cC + `" stroke="` + cK + `" stroke-width="4"/><rect x="149" y="115" width="56" height="50" fill="` + cB + `"/></g>` +
		cup(44, 110, cC, cK) + steam(62, 100, cK),
	// Café com Caos — o dia em que a terra parou
	"ext-terra": `<rect width="320" height="200" fill="` + cK + `"/><circle cx="226" cy="100" r="84" fill="` + cG + `"/>` +
		`<ellipse cx="226" cy="100" rx="38" ry="84" fill="none" stroke="` + cK + `" stroke-width="4"/><path d="M142 100 H310 M156 58 H296 M156 142 H296" stroke="` + cK + `" stroke-width="4"/>` +
		`<rect x="200" y="74" width="18" height="52" rx="4" fill="` + cC + `"/><rect x="234" y="74" width="18" height="52" rx="4" fill="` + cC + `"/>` +
		cup(40, 112, cK, cG) + steam(58, 102, cC),
}

var ilusGeneric = []string{
	`<rect width="320" height="200" fill="` + cG + `"/><circle cx="90" cy="100" r="80" fill="` + cK + `"/><circle cx="240" cy="60" r="44" fill="` + cC + `"/><rect x="190" y="120" width="100" height="50" rx="10" fill="` + cB + `"/>`,
	`<rect width="320" height="200" fill="` + cC + `"/><circle cx="250" cy="120" r="90" fill="` + cG + `"/><rect x="40" y="50" width="110" height="100" rx="14" fill="` + cK + `"/>` + sparkle(95, 100, 26, cG),
	`<rect width="320" height="200" fill="` + cK + `"/><circle cx="70" cy="170" r="90" fill="` + cB + `"/><circle cx="230" cy="90" r="62" fill="` + cG + `"/>` + sparkle(230, 90, 30, cC),
}

func ilusEdition(e *edition) template.HTML {
	key := e.Slug
	if key == "" {
		key = fmt.Sprintf("ed%d", e.Number)
	}
	if s, ok := ilusByKey[key]; ok {
		return svgWrap(s)
	}
	return svgWrap(ilusGeneric[e.Number%len(ilusGeneric)])
}

func ilusExternal(x *external, i int) template.HTML {
	switch {
	case strings.Contains(x.URL, "colecionar") || strings.Contains(x.URL, "voltando"):
		return svgWrap(ilusByKey["ext-fisicas"])
	case strings.Contains(x.URL, "terra-parou"):
		return svgWrap(ilusByKey["ext-terra"])
	}
	return svgWrap(ilusGeneric[i%len(ilusGeneric)])
}

// nlCard é um texto na página /newsletter (edição, artigo ou Café com Caos no LinkedIn).
type nlCard struct {
	Href, Title, Summary, Date, DateBR, Cat, Kind string
	ReadTime                                      int
	External                                      bool
	Tags                                          []string
	Ilus                                          template.HTML
}

type nlSection struct {
	Title string
	Cards []nlCard
}

func buildCards(all []*edition, ext []*external) []nlCard {
	var cs []nlCard
	for _, e := range all {
		kind := badgeOf(e)
		cs = append(cs, nlCard{Href: e.Path, Title: e.Title, Summary: firstNonEmpty(e.HomeSummary, e.Summary, e.Subtitle), Date: e.Date, DateBR: e.DateBR,
			Cat: e.Cat, Kind: kind, ReadTime: e.ReadTime, Tags: e.Tags, Ilus: ilusEdition(e)})
	}
	for i, x := range ext {
		cat := ""
		if len(x.Tags) > 0 {
			cat = x.Tags[0]
		}
		cs = append(cs, nlCard{Href: x.URL, Title: x.Title, Summary: x.Summary, Date: x.Date, DateBR: x.DateBR, Cat: cat, Kind: x.Label,
			External: true, Tags: x.Tags, Ilus: ilusExternal(x, i)})
	}
	sort.SliceStable(cs, func(i, j int) bool { return cs[i].Date > cs[j].Date })
	return cs
}

// Seções por tema (até 4 textos cada, mais recentes primeiro).
func buildSections(cs []nlCard) []nlSection {
	defs := []struct {
		title string
		tags  []string
	}{
		{"Inteligência artificial e busca", []string{"IA", "GEO", "IA Generativa", "LLM", "SEO", "Google AI Mode"}},
		{"Marketing digital e mídia paga", []string{"Marketing Digital", "Meta Ads", "Google Ads", "Mídia Paga", "Marketing", "Retail Media"}},
		{"Branding e mercado financeiro", []string{"Branding", "Fintechs", "Mercado Financeiro", "Comunicação", "Autenticidade"}},
	}
	var out []nlSection
	for _, d := range defs {
		var s nlSection
		s.Title = d.title
		for _, c := range cs {
			if hasAnyTag(c.Tags, d.tags) {
				s.Cards = append(s.Cards, c)
				if len(s.Cards) == 4 {
					break
				}
			}
		}
		if len(s.Cards) >= 2 {
			out = append(out, s)
		}
	}
	return out
}

func hasAnyTag(tags, want []string) bool {
	for _, t := range tags {
		for _, w := range want {
			if strings.EqualFold(t, w) {
				return true
			}
		}
	}
	return false
}

func extCards(cs []nlCard) []nlCard {
	var out []nlCard
	for _, c := range cs {
		if c.External {
			out = append(out, c)
		}
	}
	return out
}
