---
numero: 4
titulo: Título da edição
subtitulo: Uma frase que complementa o título (opcional)
data: 2026-10-07
tags: IA, Branding, Mercado Financeiro
resumo: Duas ou três linhas que aparecem no card da home e na página da newsletter.
tempo_leitura: 6
resumo_ia_1: Primeiro parágrafo do resumo (gerado com IA e revisado por você antes de publicar).
resumo_ia_2: Segundo parágrafo do resumo.
resumo_ia_3: Terceiro parágrafo do resumo.
destaque: sim
---

Primeiro parágrafo do texto completo. Deixe uma linha em branco entre parágrafos.

## Subtítulo de seção

Texto com **negrito**, *itálico* e [link](https://www.exemplo.com.br).

- item de lista
- outro item

1. passo numerado
2. outro passo

> Frase de destaque ou citação.

COMO PUBLICAR
1. Copie este arquivo e renomeie com o número da edição: 4.md, 5.md, 8.md...
2. Preencha o cabeçalho entre os traços e escreva o texto completo embaixo.
3. Rode: go run ./tools/gennews  (cria a página, o card na home e a entrada no sitemap)
4. Rode: go test ./...  e publique.
Arquivos que começam com _ (como este) nunca vão para o site.
Texto com menos de 150 palavras é recusado: só edições completas entram no site.
"destaque: sim" coloca a edição entre os 3 textos da página inicial (apague a linha se não quiser).
Os campos resumo_ia aparecem no quadro "Resumo" com o aviso de IA supervisionada. Revise antes de publicar.
