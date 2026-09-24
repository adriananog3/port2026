#!/usr/bin/env python3
"""Gera web/prompts.html: Banco de Prompts gratuito (acesso liberado depois do formulário).

Fonte: web/banco-prompts.json (edite direto nele: categorias > prompts com titulo, objetivo, metodo,
papel, contexto, tarefa, entrega e checagem; as regras comuns ficam em "regras"). A biblioteca é carregada pelo navegador
depois do cadastro; a página mostra só categorias, títulos e objetivos.
Depois: python3 tools/genprompts.py && python3 tools/gensearch.py
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

data = json.loads((ROOT / "web/banco-prompts.json").read_text(encoding="utf-8"))
cats = data["categorias"]
total = sum(len(c["prompts"]) for c in cats)
form_id = data.get("tally_form") or "68GedB"

faq = (ROOT / "web/faq.html").read_text(encoding="utf-8")
BASE_CSS = faq[faq.index("<style>") + 7: faq.index("</style>")]
LEGAL = (ROOT / "tools/snippets/aviso-legal.html").read_text(encoding="utf-8").strip()
NAV = '<nav><div class="wrap"><a class="brand" href="/">Adriana Nogueira <i>Portfólio</i></a><div class="links"><a href="/#topo">Sobre</a><a href="/#cases">Portfólio</a><a href="/#servicos">Serviços</a><a href="/newsletter">Newsletter</a><a href="/prompts">Banco de Prompts</a><a href="/faq">FAQ</a><a href="/#contato">Contato</a></div></div></nav>'

CSS = BASE_CSS + """
.bp-hero{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:32px;align-items:start}
.bp-stats{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0 6px}.bp-stats span{border:1px solid var(--linha);border-radius:999px;padding:6px 14px;font-size:13.5px;color:var(--champagne)}.bp-stats b{color:var(--dourado)}
.gate{background:linear-gradient(160deg,#0e0b07,#000);border:1px solid var(--dourado);border-radius:18px;padding:22px}
.gate h2{font-size:22px;margin-bottom:6px}.gate p.s{font-size:14px;color:var(--cinza);margin-bottom:10px}
.gate iframe{display:block;width:100%;min-height:520px;border:0;background:transparent}
.gate-tally{background:#FDFBF7;border-radius:12px;padding:6px;margin-top:6px}
.gate .nota{font-size:12.5px;color:var(--cinza);line-height:1.5;margin-top:8px}.gate .nota a{color:var(--dourado);text-decoration:underline}
.bp-car{position:relative}
.bp-car-nav{display:flex;justify-content:flex-end;align-items:center;gap:10px;margin-bottom:12px}
.bp-car-nav span{font-size:13px;color:var(--platinum);letter-spacing:.04em;margin-right:4px}
.car-btn{width:42px;height:42px;border-radius:50%;border:1px solid var(--dourado);background:transparent;color:var(--dourado);font-size:20px;line-height:1;cursor:pointer;transition:background .2s,color .2s,opacity .2s}
.car-btn:hover:not(:disabled),.car-btn:focus-visible{background:var(--dourado);color:#000}.car-btn:disabled{opacity:.3;cursor:default}
.bp-cats{display:grid;grid-auto-flow:column;grid-auto-columns:calc((100% - 28px)/3.15);gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;scrollbar-width:none;padding-bottom:4px;overscroll-behavior-x:contain}
.bp-cats::-webkit-scrollbar{display:none}.bp-cats>.bp-cat{scroll-snap-align:start}
.bp-cats:focus-visible{outline:2px solid var(--dourado);outline-offset:4px;border-radius:14px}
.car-seta{position:absolute;right:-6px;top:calc(50% + 20px);transform:translateY(-50%);width:52px;height:52px;border-radius:50%;border:0;background:var(--dourado);color:#000;font-size:24px;font-weight:700;cursor:pointer;box-shadow:0 6px 24px rgba(0,0,0,.6);transition:opacity .2s,transform .2s;z-index:2}
.car-seta:hover{transform:translateY(-50%) translateX(3px)}.car-seta[hidden]{display:none}
.bp-car::after{content:"";position:absolute;right:0;top:54px;bottom:4px;width:70px;background:linear-gradient(90deg,transparent,#000);pointer-events:none;transition:opacity .2s}.bp-car.fim::after{opacity:0}
.bp-cat{background:#161513;border:1px solid #3a3328;border-radius:14px;padding:16px 18px;display:flex;flex-direction:column}
.bp-assinar{margin-top:auto;display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 16px;border-radius:999px;background:var(--dourado);color:#000;font-weight:800;font-size:14.5px;letter-spacing:.02em;text-decoration:none;box-shadow:0 6px 20px rgba(201,169,110,.25);transition:transform .2s,box-shadow .2s,background .2s}.bp-assinar svg{width:18px;height:18px;flex:none}button.bp-assinar{border:0;cursor:pointer;font-family:inherit;width:100%}html.bp-ok .bp-assinar{display:none}.bp-assinar:hover,.bp-assinar:focus-visible{background:#FDFBF7;transform:translateY(-2px);box-shadow:0 10px 28px rgba(201,169,110,.4)}.bp-cat small{margin-bottom:14px}.bp-cat{transition:border-color .2s,transform .2s}.bp-cat:hover{border-color:var(--dourado);transform:translateY(-3px)}
.bp-venda{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px 24px;margin:0 0 18px;padding:18px 22px;border:1px solid var(--dourado);border-radius:14px;background:linear-gradient(120deg,#1c1812,#0c0c0c)}.bp-venda p{margin:0;color:var(--champagne);font-size:16px;line-height:1.5;flex:1 1 420px;max-width:600px}.bp-venda p b{color:var(--dourado)}.bp-venda .bp-assinar{margin:0;padding:13px 22px}
.bp-cat h3{font-size:16px;color:#FFFFFF;margin-bottom:4px}.bp-cat p{font-size:14px;color:var(--platinum)}.bp-cat small{display:block;margin-top:8px;color:var(--dourado);font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase}
.bp-cat ul{list-style:none;margin-top:8px}.bp-cat li{font-size:13.5px;color:var(--champagne);padding:3px 0 3px 16px;position:relative}.bp-cat li::before{content:"🔒";position:absolute;left:0;font-size:10px;top:6px}
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
.pc .io{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:0 0 12px}.pc .io-b{border:1px solid #3a3328;border-radius:10px;padding:12px 14px;background:#161513}.pc .io-t{font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--dourado);font-weight:700;margin-bottom:6px}.pc .io-b p,.pc .io-b li{font-size:14px;color:var(--champagne);line-height:1.55}.pc .io-b ul{margin:0;padding-left:18px}@media(max-width:700px){.pc .io{grid-template-columns:1fr}}
.pc .obj{font-size:14px;color:var(--cinza);margin:4px 0 10px}
.pc pre{white-space:pre-wrap;word-wrap:break-word;background:#000;border:1px solid var(--linha);border-radius:10px;padding:14px 16px;font:14px/1.6 'Open Sans',system-ui,sans-serif;color:var(--platinum)}
.pc .copiar{flex-shrink:0;border:1px solid var(--dourado);background:transparent;color:var(--dourado);border-radius:999px;padding:7px 14px;font:inherit;font-size:13px;font-weight:700;cursor:pointer}
.pc .copiar:hover,.pc .copiar:focus-visible{background:var(--dourado);color:#000}
.lib-vazio{color:var(--cinza);font-size:14.5px}
.bp-aviso{margin-top:18px;padding:16px 20px;border-left:3px solid var(--dourado);background:#15110a;border-radius:0 12px 12px 0;font-size:14px;color:var(--platinum)}
@media(max-width:900px){.bp-hero{grid-template-columns:1fr}.bp-cats{grid-auto-columns:calc((100% - 14px)/2.15)}}
@media(max-width:600px){.bp-cats{grid-auto-columns:86%}.car-seta{right:-4px;width:44px;height:44px}.gate iframe{min-height:470px}}
.bp-cta{display:inline-flex;align-items:center;gap:10px;margin-top:16px;background:var(--dourado);color:#000;font-weight:800;border:0;border-radius:999px;padding:14px 24px;font:inherit;font-size:16px;font-weight:800;cursor:pointer;text-decoration:none}
.bp-cta:hover,.bp-cta:focus-visible{background:#b8965b}
html.bp-ok .bp-cta.abrir{display:none}
.bp-dif{margin-top:18px;display:grid;gap:8px}.bp-dif p{font-size:14.5px;color:var(--platinum)}.bp-dif b{color:var(--champagne)}
.bp-anat{background:var(--card);border:1px solid var(--linha);border-radius:14px;padding:18px 20px}
.bp-anat h2{font-size:18px;margin-bottom:10px}.bp-anat ol{margin-left:20px;font-size:14px;color:var(--platinum)}.bp-anat li{margin-bottom:6px}.bp-anat b{color:var(--champagne)}
.bp-lock{position:relative;border:1px dashed var(--dourado);border-radius:14px;padding:22px;text-align:center;background:#0a0806}
.bp-lock p{color:var(--platinum);margin-bottom:6px}
html.bp-ok .bp-lock{display:none}
.pc .met{display:inline-block;margin-left:8px;font-size:11px;letter-spacing:.06em;color:var(--champagne);border:1px solid var(--linha);border-radius:999px;padding:2px 8px;text-transform:none;font-weight:600}
dialog.gate-dlg{margin:auto;inset:0;border:1px solid var(--dourado);border-radius:18px;padding:0;background:linear-gradient(160deg,#0e0b07,#000);color:var(--champagne);width:min(460px,calc(100vw - 32px));max-height:calc(100vh - 32px);overflow:auto}
dialog.gate-dlg::backdrop{background:rgba(0,0,0,.82);backdrop-filter:blur(4px)}
.gate-dlg .gate{border:0;background:none;position:relative}
.gate-x{position:absolute;top:10px;right:12px;background:none;border:1px solid var(--linha);color:var(--platinum);border-radius:999px;width:34px;height:34px;font-size:18px;line-height:1;cursor:pointer}
.gate-x:hover,.gate-x:focus-visible{border-color:var(--dourado);color:var(--dourado)}
.gate h2{padding-right:40px}
""" + leadforms.CSS + ".gate .nl-form{gap:9px}\n"

cat_cards = "".join(
    f'<div class="bp-cat"><h3>{e(c["nome"])}</h3><p>{e(c["descricao"])}</p><ul>'
    + "".join(f"<li>{e(p['titulo'])}</li>" for p in c["prompts"])
    + f'</ul><small>{len(c["prompts"])} prompts</small>'
    + '<button type="button" class="bp-assinar" data-abrir-gate aria-label="Desbloquear os prompts de ' + e(c["nome"]) + '">Desbloquear estes prompts →</button></div>\n'
    for c in cats)

iframe_src = f"https://tally.so/embed/{form_id}?alignLeft=1&amp;hideTitle=1&amp;dynamicHeight=1&amp;origem=banco-de-prompts"

ld = {"@context": "https://schema.org", "@type": "CreativeWork", "name": "Banco de Prompts gratuito",
      "description": f"{total} prompts estruturados em português para estratégia de marca, copy, e-mail, redes, SEO/GEO, mídia paga, mercado financeiro e IA generativa, com regras de compliance.",
      "url": f"{SITE}/prompts", "inLanguage": "pt-BR", "isAccessibleForFree": True,
      "author": {"@type": "Person", "name": "Adriana Nogueira", "url": f"{SITE}/"},
      "dateModified": data.get("atualizado", "")}

JS = r"""(function(){
  var cr=document.getElementById('bp-cats'),car=document.getElementById('bp-car');
  if(cr&&car){
    var pos=document.getElementById('car-pos'),seta=car.querySelector('.car-seta'),bts=car.querySelectorAll('[data-car]');
    var passo=function(){var c=cr.querySelector('.bp-cat');return c?c.getBoundingClientRect().width+14:cr.clientWidth;};
    var upd=function(){var n=cr.children.length,w=passo(),ini=Math.round(cr.scrollLeft/w)+1,vis=Math.max(1,Math.floor((cr.clientWidth+14)/w)),fim=cr.scrollLeft+cr.clientWidth>=cr.scrollWidth-4;
      pos.textContent=ini+'–'+Math.min(n,ini+vis-1)+' de '+n;
      bts.forEach(function(b){b.disabled=(b.dataset.car==='-1')?cr.scrollLeft<=4:fim;});
      seta.hidden=fim;car.classList.toggle('fim',fim);};
    bts.forEach(function(b){b.addEventListener('click',function(){cr.scrollBy({left:passo()*(+b.dataset.car),behavior:'smooth'});});});
    cr.addEventListener('keydown',function(ev){if(ev.key==='ArrowRight'||ev.key==='ArrowLeft'){ev.preventDefault();cr.scrollBy({left:passo()*(ev.key==='ArrowRight'?1:-1),behavior:'smooth'});}});
    cr.addEventListener('scroll',function(){window.requestAnimationFrame(upd);},{passive:true});
    window.addEventListener('resize',upd);upd();
  }
var h=document.documentElement,dlg=document.getElementById('gate'),carregado=false,cards=[],cat='';
function abrir(){if(h.classList.contains('bp-ok')||!dlg)return;if(dlg.showModal){if(!dlg.open)dlg.showModal();}else dlg.setAttribute('open','');}
function fechar(){if(!dlg)return;if(dlg.close&&dlg.open)dlg.close();else dlg.removeAttribute('open');}
function ok(){h.classList.add('bp-ok');try{localStorage.setItem('bp_ok','1');}catch(e){}fechar();carregar(true);}
try{if(localStorage.getItem('bp_ok')==='1')h.classList.add('bp-ok');}catch(e){}
document.addEventListener('click',function(e){if(e.target.closest('[data-abrir-gate]')){e.preventDefault();abrir();}if(e.target.closest('[data-fechar-gate]')){e.preventDefault();fechar();}});
if(dlg)dlg.addEventListener('click',function(e){if(e.target===dlg)fechar();});
document.addEventListener('lead:ok',ok);
window.addEventListener('message',function(ev){if(ev.origin!=='https://tally.so')return;var d=ev.data;if(typeof d==='string'){try{d=JSON.parse(d);}catch(x){return;}}if(d&&d.event==='Tally.FormSubmitted')ok();});
function el(t,c,x){var n=document.createElement(t);if(c)n.className=c;if(x!=null)n.textContent=x;return n;}
function texto(p,R){return 'PAPEL\n'+p.papel+'\n\nCONTEXTO (troque o que está entre colchetes)\n'+p.contexto.map(function(x){return '- '+x;}).join('\n')+'\n\nTAREFA\n'+p.tarefa.map(function(x,i){return (i+1)+'. '+x;}).join('\n')+'\n\nFORMATO DE ENTREGA\n'+p.entrega+'\n\nANTES DE ENTREGAR, CONFIRA\n'+p.checagem+'\n\nREGRAS\n'+R;}
var st=document.getElementById('lib-st'),q=document.getElementById('lib-q'),bar=document.querySelector('.lib-bar'),lista=document.getElementById('lib-lista');
function norm(s){return (s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();}
function filtrar(){var t=norm(q.value.trim()),n=0;cards.forEach(function(c){var v=(!cat||c.getAttribute('data-cat')===cat)&&(!t||norm(c.textContent).indexOf(t)>=0);c.hidden=!v;if(v)n++;});st.textContent=n+(n===1?' prompt':' prompts')+(t?' para “'+q.value.trim()+'”':'')+'.';}
function render(d){var n=0;d.categorias.forEach(function(c){var b=el('button',null,c.nome);b.type='button';b.setAttribute('aria-pressed','false');b.setAttribute('data-cat',c.id);bar.insertBefore(b,q.previousElementSibling);
 c.prompts.forEach(function(p){n++;var a=el('article','pc');a.setAttribute('data-cat',c.id);var hd=el('header'),dv=el('div'),k=el('p','cat',c.nome),m=el('span','met',p.metodo);k.appendChild(m);var t=el('h3',null,p.titulo);t.id='p'+n+'-t';a.setAttribute('aria-labelledby',t.id);dv.appendChild(k);dv.appendChild(t);
 var bt=el('button','copiar','Copiar prompt');bt.type='button';bt.setAttribute('data-alvo','p'+n+'-p');hd.appendChild(dv);hd.appendChild(bt);a.appendChild(hd);a.appendChild(el('p','obj',p.objetivo));var io=el('div','io'),en=el('div','io-b'),sa=el('div','io-b');en.appendChild(el('p','io-t','Entrada · você preenche'));var ul=el('ul');p.contexto.forEach(function(x){ul.appendChild(el('li',null,x));});en.appendChild(ul);sa.appendChild(el('p','io-t','Saída · você recebe'));sa.appendChild(el('p',null,p.entrega));io.appendChild(en);io.appendChild(sa);a.appendChild(io);var pre=el('pre',null,texto(p,d.regras));pre.id='p'+n+'-p';a.appendChild(pre);lista.appendChild(a);cards.push(a);});});
 st.textContent=n+' prompts.';}
function carregar(foco){if(carregado||!h.classList.contains('bp-ok'))return;carregado=true;st.textContent='Carregando a biblioteca…';
 fetch('/banco-prompts.json',{credentials:'same-origin'}).then(function(r){return r.json();}).then(function(d){render(d);if(foco){var l=document.getElementById('biblioteca');if(l){l.scrollIntoView({behavior:'smooth'});var tt=document.getElementById('lib-t');if(tt)tt.focus();}}})
 .catch(function(){carregado=false;st.textContent='Não foi possível carregar agora. Atualize a página.';});}
if(bar){bar.addEventListener('click',function(e){var b=e.target.closest('button[data-cat]');if(!b)return;cat=b.getAttribute('data-cat');[].forEach.call(bar.querySelectorAll('button[data-cat]'),function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});filtrar();});q.addEventListener('input',filtrar);}
document.addEventListener('click',function(e){var b=e.target.closest('.copiar');if(!b)return;var pre=document.getElementById(b.getAttribute('data-alvo'));if(!pre)return;
 function feito(){var o=b.textContent;b.textContent='Copiado ✓';st.textContent='Prompt copiado.';setTimeout(function(){b.textContent=o;},1800);}
 if(navigator.clipboard){navigator.clipboard.writeText(pre.textContent).then(feito,function(){});}else{var r=document.createRange();r.selectNodeContents(pre);var s=getSelection();s.removeAllRanges();s.addRange(r);}});
if(h.classList.contains('bp-ok'))carregar(false);else setTimeout(abrir,900);
})();"""

page = f"""<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Banco de Prompts gratuito para marketing e copy | Adriana Nogueira</title>
<meta name="description" content="{total} prompts estruturados em português, com papel, contexto, etapas, formato de entrega e regras de compliance: marca, copy, e-mail, redes, SEO/GEO, mídia paga, mercado financeiro e IA generativa. Acesso gratuito.">
<link rel="canonical" href="{SITE}/prompts">
<meta property="og:type" content="website"><meta property="og:title" content="Banco de Prompts gratuito | Adriana Nogueira"><meta property="og:description" content="{total} prompts estruturados para marketing, copy e IA generativa, com compliance desde o início."><meta property="og:url" content="{SITE}/prompts"><meta property="og:image" content="{SITE}/assets/adriana-nogueira-og.jpg"><meta property="og:locale" content="pt_BR">
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
    <p class="lead">{total} prompts estruturados para marca, copy, e-mail, redes, SEO/GEO, mídia paga, mercado financeiro e IA generativa. Não é uma lista de frases prontas: cada prompt funciona como um briefing completo, com método de copywriting e regras de compliance embutidas.</p>
    <div class="bp-stats"><span><b>{total}</b> prompts</span><span><b>{len(cats)}</b> categorias</span><span>Atualizado com frequência</span></div>
    <button type="button" class="bp-cta abrir" data-abrir-gate>Acessar gratuitamente →</button>
    <div class="bp-dif">
      <p><b>O que não é:</b> uma coleção de comandos genéricos de uma linha, do tipo “escreva um post sobre X”, que devolvem textos iguais aos de todo mundo.</p>
      <p><b>O que é:</b> prompts com papel, contexto, tarefa em etapas, formato de entrega e checagem final, baseados em métodos como níveis de consciência de Schwartz, os 3 cérebros, ethos, pathos e logos, e comunicação dual-tier para varejo e alta renda.</p>
    </div>
  </div>
  <aside class="bp-anat" aria-labelledby="h-anat">
    <h2 id="h-anat">Como cada prompt é construído</h2>
    <ol>
      <li><b>Papel:</b> quem a IA deve ser.</li>
      <li><b>Contexto:</b> marca, público, provas, com espaços entre colchetes para você preencher.</li>
      <li><b>Tarefa em etapas:</b> o raciocínio que um especialista seguiria.</li>
      <li><b>Formato de entrega:</b> tabela, roteiro, texto pronto.</li>
      <li><b>Checagem final:</b> a IA revisa o próprio resultado antes de entregar.</li>
      <li><b>Regras:</b> sem promessa de rentabilidade, sem urgência falsa, sem dado inventado; o que não tem fonte fica marcado como [VERIFICAR].</li>
    </ol>
  </aside></div>
</div></header>

<section aria-labelledby="h-cats"><div class="wrap">
  <h2 id="h-cats">O que você <em>encontra aqui</em></h2>
  <div class="rule"></div>
  <div class="bp-car" id="bp-car">
    <div class="bp-car-nav"><span id="car-pos" aria-live="polite"></span><button type="button" class="car-btn" data-car="-1" aria-label="Categorias anteriores" disabled>←</button><button type="button" class="car-btn" data-car="1" aria-label="Próximas categorias">→</button></div>
    <div class="bp-cats" id="bp-cats" tabindex="0" role="region" aria-label="Categorias do Banco de Prompts, deslize para a direita">
{cat_cards}    </div>
    <button type="button" class="car-seta" data-car="1" aria-label="Ver mais categorias">→</button>
  </div>
  <div class="bp-lock" style="margin-top:18px"><p>A biblioteca completa abre na hora, depois de um cadastro rápido.</p><button type="button" class="bp-cta" data-abrir-gate>Desbloquear os {total} prompts →</button></div>
</div></section>

<section class="lib" id="biblioteca" aria-labelledby="lib-t"><div class="wrap">
  <h2 id="lib-t" tabindex="-1">Sua <em>biblioteca</em></h2>
  <div class="rule"></div>
  <div class="lib-bar" role="group" aria-label="Filtrar por categoria"><button type="button" aria-pressed="true" data-cat="">Todas</button><label class="sr" for="lib-q">Buscar prompt</label><input id="lib-q" type="search" placeholder="Buscar por tema, canal ou técnica…" autocomplete="off"></div>
  <p class="lib-vazio" id="lib-st" role="status" aria-live="polite">{total} prompts.</p>
  <div id="lib-lista"></div>
  <p class="bp-aviso"><b>Como usar:</b> troque o que está entre colchetes pelos seus dados e revise o resultado com olhar humano antes de publicar. Os prompts são um ponto de partida, não substituem revisão profissional nem de compliance, e os resultados variam conforme o público e o contexto.</p>
</div></section>
</main>

<dialog class="gate-dlg" id="gate" aria-labelledby="gate-t">
  <div class="gate">
    <button type="button" class="gate-x" data-fechar-gate aria-label="Fechar">×</button>
    <h2 id="gate-t">Acesso gratuito ao Banco de Prompts</h2>
    <p class="s">Preencha o formulário abaixo. Assim que enviar, a biblioteca abre na hora.</p>
    <div class="gate-tally"><iframe src="{iframe_src}" title="Formulário de acesso ao Banco de Prompts" width="100%" height="520" loading="eager"></iframe></div>
    <p class="nota">Seus dados liberam o acesso e ficam guardados com segurança. <a href="/politica-de-privacidade">Política de Privacidade</a></p>
  </div>
</dialog>
<footer><div class="wrap">{LEGAL}<p>© Adriana Nogueira | Portfólio · Comunicação &amp; Marketing · CEA · GAIPC™ · São Paulo · <a href="/politica-de-privacidade">Política de Privacidade</a> · <a href="#aviso-legal">Aviso legal</a></p></div></footer>
<script>
{JS}
</script>
<script>
{leadforms.JS}</script>
</body></html>
"""
(ROOT / "web/prompts.html").write_text(page, encoding="utf-8")
print("web/prompts.html", len(page), f"{total} prompts, form {form_id}")
