package main

import (
	"strings"
	"testing"
)

func md(body string) string {
	return "---\nnumero: 9\ntitulo: Teste\ndata: 2026-10-07\ntags: IA, SEO\nresumo: Resumo.\n---\n" + body
}

func TestEdicaoIncompletaRecusada(t *testing.T) {
	if _, err := parseEdition(md("Só um parágrafo curto.")); err == nil || !strings.Contains(err.Error(), "incompleto") {
		t.Fatalf("texto curto deveria ser recusado: %v", err)
	}
	if _, err := parseEdition(md("")); err == nil {
		t.Fatal("edição sem corpo deveria ser recusada")
	}
}

func TestEdicaoCompletaAceita(t *testing.T) {
	corpo := "## Seção\n\n" + strings.Repeat("palavra ", 200) + "**forte** e [link](https://exemplo.com)\n\n- a\n- b\n\n> citação\n\n<script>alert(1)</script>"
	e, err := parseEdition(md(corpo))
	if err != nil {
		t.Fatal(err)
	}
	h := string(sanitize(e.BodyRaw))
	for _, want := range []string{"<h2>Seção</h2>", "<strong>forte</strong>", `<a href="https://exemplo.com" target="_blank" rel="noopener">`, "<ul><li>a</li><li>b</li></ul>", "<blockquote>"} {
		if !strings.Contains(h, want) {
			t.Errorf("faltou %q em %s", want, h)
		}
	}
	if strings.Contains(h, "<script") {
		t.Error("script não pode passar")
	}
	if e.Number != 9 || len(e.Tags) != 2 || e.ReadTime < 1 {
		t.Errorf("metadados errados: %+v", e)
	}
}
