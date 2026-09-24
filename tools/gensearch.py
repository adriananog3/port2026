#!/usr/bin/env python3
"""Gera o índice da busca do site (texto e voz) e grava em web/busca.json (a home carrega o arquivo quando a busca é aberta).
Rodar depois de mudar textos da home, da página de RAG, do FAQ ou da newsletter:
    python3 tools/gensearch.py
"""
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WEB = ROOT / "web"


def txt(s):
    s = re.sub(r"<(script|style|svg)\b.*?</\1>", " ", s, flags=re.S)
    s = re.sub(r"<[^>]+>", " ", s)
    return re.sub(r"\s+", " ", html.unescape(s)).strip()


def cut(s, n=180):
    s = s.strip()
    return s if len(s) <= n else s[: n - 1].rsplit(" ", 1)[0] + "…"


items = []


def add(t, d, u, cat, extra=""):
    t, d = txt(t), txt(d)
    if t and u:
        items.append({"t": t, "d": cut(d), "u": u, "c": cat, "k": cut(txt(extra), 600)})


home = (WEB / "index.html").read_text(encoding="utf-8")

# Seções da home (h2 + primeiro parágrafo)
for m in re.finditer(r'<section class="blk[^"]*" id="([^"]+)"[^>]*>(.*?)</section>', home, re.S):
    sid, body = m.group(1), m.group(2)
    h2 = re.search(r"<h2[^>]*>(.*?)</h2>", body, re.S)
    p = re.search(r"<p(?: class=\"(?:lead|muted|direct)\")?>(.*?)</p>", body, re.S)
    if h2:
        add(h2.group(1), p.group(1) if p else "", "/#" + sid, "Início", body[:3000])

# Serviços (cards)
for m in re.finditer(r'<div class="c"><p class="n">(\d+)</p><h3>(.*?)</h3><p>(.*?)</p>', home, re.S):
    add(m.group(2), m.group(3), "/#servicos", "Serviços")

# Cases (cards do portfólio)
for m in re.finditer(r'<div class="pcard"[^>]*>(.*?)(?=<div class="pcard"|</div>\s*<button type="button" class="pcar-nav pcar-next")', home, re.S):
    b = m.group(1)
    h = re.search(r"<h3[^>]*>(.*?)</h3>", b, re.S)
    d = re.search(r'<p class="pdesc">(.*?)</p>', b, re.S)
    link = re.search(r'aria-controls="(case-[a-z0-9]+)"', b)
    ext = re.search(r'<a class="pbtn" href="([^"]+)"', b)
    u = "/cases/" + link.group(1)[5:] if link else (ext.group(1) if ext else "/#cases")
    if h:
        add(h.group(1), d.group(1) if d else "", u, "Cases")

# Página de RAG
rag = (WEB / "rag.html").read_text(encoding="utf-8")
h1 = re.search(r"<h1[^>]*>(.*?)</h1>", rag, re.S)
lead = re.search(r'<p class="lead">(.*?)</p>', rag, re.S)
add(h1.group(1), lead.group(1) if lead else "", "/rag", "RAG")
for m in re.finditer(r'<h2 id="([^"]+)">(.*?)</h2>(.*?)(?=<h2 |</main>)', rag, re.S):
    hid, h, rest = m.groups()
    p = re.search(r"<p[^>]*>(.*?)</p>", rest, re.S)
    li = " ".join(re.findall(r"<(?:b|dt|th scope=\"row\")>(.*?)</(?:b|dt|th)>", rest))
    add(h, p.group(1) if p else li, "/rag#" + hid, "RAG", li + " " + rest[:2500])

# FAQ (perguntas e respostas)
faq = (WEB / "faq.html").read_text(encoding="utf-8")
for m in re.finditer(r"<details class=\"q\"[^>]*><summary><span>(.*?)</span>.*?<div class=\"a\">(.*?)</div></details>", faq, re.S):
    add(m.group(1), m.group(2), "/faq#perguntas", "FAQ", m.group(2))

# Newsletter
for f in sorted((WEB / "newsletter").glob("*.html")):
    if f.name == "index.html":
        continue
    s = f.read_text(encoding="utf-8")
    t = re.search(r"<h1[^>]*>(.*?)</h1>", s, re.S)
    d = re.search(r'<meta name="description" content="([^"]*)"', s)
    tags = " ".join(re.findall(r'<span class="tag">(.*?)</span>', s))
    if t:
        add(t.group(1), d.group(1) if d else "", "/newsletter/" + f.stem, "Newsletter", tags)

# Banco de Prompts
_bp = json.loads((ROOT / "web/banco-prompts.json").read_text(encoding="utf-8"))
add("Banco de Prompts gratuito", "Prompts em português para copy, e-mail, landing pages, funis e SEO/GEO, com regras de compliance. Acesso gratuito.", "/prompts", "Prompts", " ".join(c["nome"] + " " + " ".join(q["titulo"] for q in c["prompts"]) for c in _bp["categorias"]))
for _c in _bp["categorias"]:
    add(_c["nome"], _c["descricao"], "/prompts", "Prompts", " ".join(q["titulo"] + " " + q["objetivo"] for q in _c["prompts"]))

# Páginas institucionais
add("Política de Privacidade e Cookies", "Como seus dados são tratados, com quem são compartilhados e como exercer seus direitos (LGPD).", "/politica-de-privacidade", "Privacidade", "lgpd dados cookies privacidade direitos operadores")
add("Contato e Diagnóstico gratuito", "Formulário para pedir o diagnóstico gratuito, e-mail, WhatsApp e LinkedIn.", "/#contato", "Contato", "diagnóstico gratuito contato whatsapp email linkedin formulário")

(WEB / "busca.json").write_text(json.dumps(items, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
print(f"busca: {len(items)} itens indexados em web/busca.json")
