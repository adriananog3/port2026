#!/usr/bin/env python3
"""Gera web/prompts.html: Banco de Prompts gratuito (acesso liberado depois do formulário).

Para adicionar prompts, edite content/prompts.json (categorias > prompts: titulo, objetivo, prompt)
e rode:  python3 tools/genprompts.py && python3 tools/gensearch.py
O formulário é do Tally: o ID fica em content/prompts.json ("tally_form").
"""
import html
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import leadforms  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://adriana-nogueira.com"
e = html.escape

data = json.loads((ROOT / "content/prompts.json").read_text(encoding="utf-8"))
cats = data["categorias"]
total = sum(len(c["prompts"]) for c in cats)
form_id = data.get("tally_form") or "68GedB"

faq = (ROOT / "web/faq.html").read_text(encoding="utf-8")
BASE_CSS = faq[faq.index("<style>") + 7: faq.index("</style>")]
LEGAL = re.search(r'<p class="legal">.*?</p>', (ROOT / "web/404.html").read_text(encoding="utf-8"), re.S).group(0)
NAV = re.search(r"<nav>.*?</nav>", (ROOT / "web/rag.html").read_text(encoding="utf-8"), re.S).group(0)

CSS = BASE_CSS + """
.bp-hero{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:32px;align-items:start}
.bp-stats{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0 6px}.bp-stats span{border:1px solid var(--linha);border-radius:999px;padding:6px 14px;font-size:13.5px;color:var(--champagne)}.bp-stats b{color:var(--dourado)}
.gate{background:linear-gradient(160deg,#0e0b07,#000);border:1px solid var(--dourado);border-radius:18px;padding:22px}
.gate h2{font-size:22px;margin-bottom:6px}.gate p.s{font-size:14px;color:var(--cinza);margin-bottom:10px}
.gate iframe{display:block;width:100%;min-height:430px;border:0;background:transparent}
.gate .nota{font-size:12.5px;color:var(--cinza);line-height:1.5;margin-top:8px}.gate .nota a{color:var(--dourado);text-decoration:underline}
.bp-cats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.bp-cat{background:var(--card);border:1px solid var(--linha);border-radius:14px;padding:16px 18px}
.bp-cat h3{font-size:16px;color:var(--champagne);margin-bottom:4px}.bp-cat p{font-size:14px;color:var(--cinza)}.bp-cat small{display:block;margin-top:8px;color:var(--dourado);font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase}
.bp-cat ul{list-style:none;margin-top:8px}.bp-cat li{font-size:13.5px;color:var(--platinum);padding:3px 0 3px 16px;position:relative}.bp-cat li::before{content:"🔒";position:absolute;left:0;font-size:10px;top:6px}
html.bp-ok .bp-cat li::before{content:"✓";color:var(--dourado);font-size:12px;top:3px}
.lib{display:none}html.bp-ok .lib{display:block}html.bp-ok .gate-box{display:none}
.lib-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:16px}
.lib-bar button{border:1px solid var(--linha);background:transparent;color:var(--platinum);border-radius:999px;padding:7px 13px;font:inherit;font-size:13.5px;cursor:pointer}
.lib-bar button[aria-pressed=true]{background:var(--dourado);color:#000;border-color:var(--dourado);font-weight:700}
.lib-bar input{flex:1;min-width:200px;background:#000;border:1px solid var(--linha);border-radius:999px;padding:9px 16px;color:var(--champagne);font:inherit;font-size:14.5px}
.lib-bar input:focus{outline:2px solid var(--dourado);outline-offset:1px}
.pc{background:var(--card);border:1px solid var(--linha);border-radius:14px;padding:18px 20px;margin-bottom:12px}
.pc header{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;padding:0;border:0;background:none}
.pc h3{font-size:17px;color:var(--champagne)}.pc .cat{font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--dourado);font-weight:700;margin-bottom:4px}
.pc .obj{font-size:14px;color:var(--cinza);margin:4px 0 10px}
.pc pre{white-space:pre-wrap;word-wrap:break-word;background:#000;border:1px solid var(--linha);border-radius:10px;padding:14px 16px;font:14px/1.6 'Open Sans',system-ui,sans-serif;color:var(--platinum)}
.pc .copiar{flex-shrink:0;border:1px solid var(--dourado);background:transparent;color:var(--dourado);border-radius:999px;padding:7px 14px;font:inherit;font-size:13px;font-weight:700;cursor:pointer}
.pc .copiar:hover,.pc .copiar:focus-visible{background:var(--dourado);color:#000}
.lib-vazio{color:var(--cinza);font-size:14.5px}
.bp-aviso{margin-top:18px;padding:16px 20px;border-left:3px solid var(--dourado);background:#15110a;border-radius:0 12px 12px 0;font-size:14px;color:var(--platinum)}
@media(max-width:900px){.bp-hero{grid-template-columns:1fr}.bp-cats{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.bp-cats{grid-template-columns:1fr}.gate iframe{min-height:470px}}
""" + leadforms.CSS + ".gate .nl-form{gap:9px}\n"

cat_cards = "".join(
    f'<div class="bp-cat"><h3>{e(c["nome"])}</h3><p>{e(c["descricao"])}</p><ul>'
    + "".join(f"<li>{e(p['titulo'])}</li>" for p in c["prompts"])
    + f'</ul><small>{len(c["prompts"])} prompts</small></div>\n'
    for c in cats)

filtros = '<button type="button" aria-pressed="true" data-cat="">Todas</button>' + "".join(
    f'<button type="button" aria-pressed="false" data-cat="{e(c["id"])}">{e(c["nome"])}</button>' for c in cats)

cards = []
n = 0
for c in cats:
    for p in c["prompts"]:
        n += 1
        pid = f"p{n}"
        cards.append(
            f'<article class="pc" data-cat="{e(c["id"])}" aria-labelledby="{pid}-t"><header><div><p class="cat">{e(c["nome"])}</p>'
            f'<h3 id="{pid}-t">{e(p["titulo"])}</h3></div><button type="button" class="copiar" data-alvo="{pid}-p">Copiar prompt</button></header>'
            f'<p class="obj">{e(p["objetivo"])}</p><pre id="{pid}-p">{e(p["prompt"])}</pre></article>')

iframe_src = f"https://tally.so/embed/{form_id}?alignLeft=1&amp;hideTitle=1&amp;transparentBackground=1&amp;dynamicHeight=1&amp;origem=banco-de-prompts"

ld = {"@context": "https://schema.org", "@type": "CreativeWork", "name": "Banco de Prompts gratuito",
      "description": f"{total} prompts em português para copy, conteúdo, e-mail, SEO/GEO e funis, com regras de compliance para o mercado financeiro.",
      "url": f"{SITE}/prompts", "inLanguage": "pt-BR", "isAccessibleForFree": True,
      "author": {"@type": "Person", "name": "Adriana Nogueira", "url": f"{SITE}/"},
      "dateModified": data.get("atualizado", "")}

JS = r"""(function(){
var h=document.documentElement;
function ok(){h.classList.add('bp-ok');try{localStorage.setItem('bp_ok','1');}catch(e){}}
try{if(localStorage.getItem('bp_ok')==='1')h.classList.add('bp-ok');}catch(e){}
document.addEventListener('lead:ok',function(){ok();setTimeout(function(){var l=document.getElementById('biblioteca');if(l){l.scrollIntoView({behavior:'smooth'});var t=document.getElementById('lib-t');if(t)t.focus();}},400);});
window.addEventListener('message',function(ev){if(ev.origin!=='https://tally.so')return;var d=ev.data;if(typeof d==='string'){try{d=JSON.parse(d);}catch(x){return;}}
 if(d&&d.event==='Tally.FormSubmitted'){ok();setTimeout(function(){var l=document.getElementById('biblioteca');if(l){l.scrollIntoView({behavior:'smooth'});var t=document.getElementById('lib-t');if(t)t.focus();}},500);}});
var bar=document.querySelector('.lib-bar'),q=document.getElementById('lib-q'),cards=[].slice.call(document.querySelectorAll('.pc')),st=document.getElementById('lib-st'),cat='';
function norm(s){return (s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();}
function filtrar(){var t=norm(q.value.trim()),n=0;cards.forEach(function(c){var v=(!cat||c.getAttribute('data-cat')===cat)&&(!t||norm(c.textContent).indexOf(t)>=0);c.hidden=!v;if(v)n++;});st.textContent=n+(n===1?' prompt':' prompts')+(t?' para “'+q.value.trim()+'”':'')+'.';}
if(bar){bar.addEventListener('click',function(e){var b=e.target.closest('button[data-cat]');if(!b)return;cat=b.getAttribute('data-cat');[].forEach.call(bar.querySelectorAll('button[data-cat]'),function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});filtrar();});q.addEventListener('input',filtrar);}
document.addEventListener('click',function(e){var b=e.target.closest('.copiar');if(!b)return;var pre=document.getElementById(b.getAttribute('data-alvo'));if(!pre)return;
 function feito(){var o=b.textContent;b.textContent='Copiado ✓';st.textContent='Prompt copiado.';setTimeout(function(){b.textContent=o;},1800);}
 if(navigator.clipboard){navigator.clipboard.writeText(pre.textContent).then(feito,function(){});}else{var r=document.createRange();r.selectNodeContents(pre);var s=getSelection();s.removeAllRanges();s.addRange(r);}});
})();"""

page = f"""<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Banco de Prompts gratuito para marketing e copy | Adriana Nogueira</title>
<meta name="description" content="{total} prompts em português para copy, headlines, e-mail, landing pages, funis e SEO/GEO, com regras de compliance para o mercado financeiro. Acesso gratuito.">
<link rel="canonical" href="{SITE}/prompts">
<meta property="og:type" content="website"><meta property="og:title" content="Banco de Prompts gratuito | Adriana Nogueira"><meta property="og:description" content="Prompts prontos para copy, conteúdo e marketing, com compliance desde o início."><meta property="og:url" content="{SITE}/prompts"><meta property="og:image" content="{SITE}/assets/adriana-nogueira-og.jpg"><meta property="og:locale" content="pt_BR">
<meta name="theme-color" content="#000000">
<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&amp;family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&amp;family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&amp;display=swap" rel="stylesheet">
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
<style>{CSS}</style></head><body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
{NAV}
<main id="conteudo">
<header><div class="wrap">
  <div class="bp-hero"><div>
    <p class="eyebrow">Recursos gratuitos · Banco de Prompts</p>
    <h1>Banco de <em>Prompts</em> gratuito</h1>
    <p class="lead">Prompts prontos para copy, conteúdo e marketing, pensados para o mercado financeiro e para marcas que precisam de compliance desde o início. Cada prompt traz contexto, formato de entrega e as regras que evitam promessa de rentabilidade e dado sem fonte.</p>
    <div class="bp-stats"><span><b>{total}</b> prompts</span><span><b>{len(cats)}</b> categorias</span><span>Atualizado com frequência</span></div>
    <p style="margin-top:10px;font-size:14.5px;color:var(--cinza)">Preencha o formulário e a biblioteca abre na hora, nesta mesma página.</p>
  </div>
  <div class="gate-box" id="acesso"><div class="gate">
    <h2>Acesso gratuito</h2>
    <p class="s">Nome, empresa, telefone e e-mail. Leva menos de um minuto.</p>
    {leadforms.prompts()}
    <div id="bp-fb" hidden><p class="nota" style="margin:10px 0 6px">Conclua por aqui, é rapidinho:</p><iframe data-src="{iframe_src}" title="Formulário alternativo de acesso ao Banco de Prompts" width="100%" height="430"></iframe></div>
    <p class="nota">Seus dados liberam o acesso e ficam guardados com segurança. <a href="/politica-de-privacidade">Política de Privacidade</a></p>
  </div></div></div>
</div></header>

<section aria-labelledby="h-cats"><div class="wrap">
  <h2 id="h-cats">O que você <em>encontra aqui</em></h2>
  <div class="rule"></div>
  <div class="bp-cats">
{cat_cards}  </div>
</div></section>

<section class="lib" id="biblioteca" aria-labelledby="lib-t"><div class="wrap">
  <h2 id="lib-t" tabindex="-1">Sua <em>biblioteca</em></h2>
  <div class="rule"></div>
  <div class="lib-bar" role="group" aria-label="Filtrar por categoria">{filtros}<label class="sr" for="lib-q">Buscar prompt</label><input id="lib-q" type="search" placeholder="Buscar por tema, canal ou técnica…" autocomplete="off"></div>
  <p class="lib-vazio" id="lib-st" role="status" aria-live="polite">{total} prompts.</p>
{chr(10).join(cards)}
  <p class="bp-aviso"><b>Como usar:</b> troque o que está entre colchetes pelos seus dados e revise o resultado com olhar humano antes de publicar. Os prompts são um ponto de partida, não substituem revisão profissional nem de compliance, e os resultados variam conforme o público e o contexto.</p>
</div></section>
</main>
<footer><div class="wrap">{LEGAL}<p>© Adriana Nogueira | Portfólio · Comunicação &amp; Marketing Financeiro · CEA · GAIPC™ · São Paulo · <a href="/politica-de-privacidade">Política de Privacidade</a> · <a href="/faq#aviso-legal">Aviso legal</a></p></div></footer>
<script>
{JS}
</script>
<script>
{leadforms.JS}</script>
</body></html>
"""
(ROOT / "web/prompts.html").write_text(page, encoding="utf-8")
print("web/prompts.html", len(page), f"{total} prompts, form {form_id}")
