package main

// Edições novas escritas em Markdown: content/edicoes/<numero>.md
//
// Regra do site: só entra edição com texto completo. Arquivo sem corpo (ou curto
// demais) faz o gerador parar com erro, em vez de publicar um card vazio.

import (
	"fmt"
	"html"
	"os"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
)

const minPalavras = 150 // abaixo disso a edição é considerada incompleta

var (
	reBold   = regexp.MustCompile(`\*\*(.+?)\*\*`)
	reItal   = regexp.MustCompile(`(^|[^*])\*([^*\s][^*]*?)\*`)
	reLink   = regexp.MustCompile(`\[([^\]]+)\]\((https?://[^)\s]+)\)`)
	reOL     = regexp.MustCompile(`^\d+[.)]\s+`)
	reNumArq = regexp.MustCompile(`^(\d+)\.md$`)
)

func inline(s string) string {
	s = html.EscapeString(s)
	s = reLink.ReplaceAllString(s, `<a href="$2">$1</a>`)
	s = reBold.ReplaceAllString(s, `<strong>$1</strong>`)
	s = reItal.ReplaceAllString(s, `$1<em>$2</em>`)
	return s
}

// mdToHTML converte o Markdown básico: ## e ### títulos, parágrafos, listas (- ou 1.),
// citações (>), **negrito**, *itálico* e [links](https://...).
func mdToHTML(md string) string {
	var b strings.Builder
	var para []string
	list := ""
	flush := func() {
		if len(para) > 0 {
			b.WriteString("<p>" + inline(strings.Join(para, " ")) + "</p>\n")
			para = nil
		}
	}
	closeList := func() {
		if list != "" {
			b.WriteString("</" + list + ">\n")
			list = ""
		}
	}
	openList := func(t string) {
		if list != t {
			closeList()
			b.WriteString("<" + t + ">")
			list = t
		}
	}
	for _, raw := range strings.Split(strings.ReplaceAll(md, "\r\n", "\n"), "\n") {
		l := strings.TrimSpace(raw)
		switch {
		case l == "":
			flush()
			closeList()
		case strings.HasPrefix(l, "### "):
			flush()
			closeList()
			b.WriteString("<h3>" + inline(l[4:]) + "</h3>\n")
		case strings.HasPrefix(l, "## "):
			flush()
			closeList()
			b.WriteString("<h2>" + inline(l[3:]) + "</h2>\n")
		case strings.HasPrefix(l, "- ") || strings.HasPrefix(l, "* "):
			flush()
			openList("ul")
			b.WriteString("<li>" + inline(l[2:]) + "</li>")
		case reOL.MatchString(l):
			flush()
			openList("ol")
			b.WriteString("<li>" + inline(reOL.ReplaceAllString(l, "")) + "</li>")
		case strings.HasPrefix(l, ">"):
			flush()
			closeList()
			b.WriteString("<blockquote><p>" + inline(strings.TrimSpace(l[1:])) + "</p></blockquote>\n")
		default:
			closeList()
			para = append(para, l)
		}
	}
	flush()
	closeList()
	return b.String()
}

// loadMarkdownEditions lê content/edicoes/*.md (arquivos que começam com "_" são modelos e ficam de fora).
func loadMarkdownEditions(dir string) ([]*edition, error) {
	files, _ := filepath.Glob(filepath.Join(dir, "*.md"))
	var out []*edition
	for _, f := range files {
		name := filepath.Base(f)
		if strings.HasPrefix(name, "_") {
			continue
		}
		b, err := os.ReadFile(f)
		if err != nil {
			return nil, err
		}
		e, err := parseEdition(string(b))
		if err != nil {
			return nil, fmt.Errorf("%s: %w", name, err)
		}
		if m := reNumArq.FindStringSubmatch(name); m != nil {
			if n, _ := strconv.Atoi(m[1]); n != e.Number {
				return nil, fmt.Errorf("%s: o nome do arquivo diz edição %d, mas o campo numero diz %d", name, n, e.Number)
			}
		}
		out = append(out, e)
	}
	return out, nil
}

func parseEdition(src string) (*edition, error) {
	src = strings.TrimPrefix(strings.ReplaceAll(src, "\r\n", "\n"), "\uFEFF")
	if !strings.HasPrefix(src, "---\n") {
		return nil, fmt.Errorf("falta o cabeçalho entre --- no início do arquivo")
	}
	end := strings.Index(src[4:], "\n---")
	if end < 0 {
		return nil, fmt.Errorf("cabeçalho sem o --- de fechamento")
	}
	head, body := src[4:4+end], strings.TrimSpace(src[4+end+4:])
	meta := map[string]string{}
	for _, l := range strings.Split(head, "\n") {
		if k, v, ok := strings.Cut(l, ":"); ok {
			meta[strings.TrimSpace(strings.ToLower(k))] = strings.Trim(strings.TrimSpace(v), `"`)
		}
	}
	e := &edition{Title: meta["titulo"], Subtitle: meta["subtitulo"], Date: meta["data"], Summary: meta["resumo"], Published: true, Full: true}
	n, err := strconv.Atoi(meta["numero"])
	if err != nil || n <= 0 {
		return nil, fmt.Errorf("campo numero ausente ou inválido")
	}
	e.Number = n
	if e.Title == "" || e.Summary == "" {
		return nil, fmt.Errorf("titulo e resumo são obrigatórios")
	}
	if _, err := dateParse(e.Date); err != nil {
		return nil, fmt.Errorf("data deve estar no formato AAAA-MM-DD (ex.: 2026-10-07)")
	}
	for _, t := range strings.Split(meta["tags"], ",") {
		if t = strings.TrimSpace(t); t != "" {
			e.Tags = append(e.Tags, t)
		}
	}
	words := len(strings.Fields(body))
	if words < minPalavras {
		return nil, fmt.Errorf("texto incompleto (%d palavras; mínimo %d). Só edições completas vão para o site", words, minPalavras)
	}
	e.ReadTime = (words + 199) / 200
	if rt, err := strconv.Atoi(meta["tempo_leitura"]); err == nil && rt > 0 {
		e.ReadTime = rt
	}
	for _, k := range []string{"resumo_ia_1", "resumo_ia_2", "resumo_ia_3"} {
		if v := meta[k]; v != "" {
			e.AISummary = append(e.AISummary, v)
		}
	}
	e.Destaque = strings.EqualFold(meta["destaque"], "sim")
	e.BodyRaw = mdToHTML(body)
	return e, nil
}
