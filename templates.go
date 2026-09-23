package main

const pageTpl = `
{{define "head"}}<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Roboto+Slab:wght@500;700&display=swap" rel="stylesheet">
<meta name="theme-color" content="#000000">
<style>
:root{--preto:#000;--champ:#FDFBF7;--ouro:#C9A96E;--plat:#D9D9D9;--cinza:#898989;--texto:#2B2B2B}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--champ);color:var(--texto);font:400 18px/1.75 "Open Sans",system-ui,sans-serif}
a{color:#7A5F2C;text-underline-offset:3px}a:focus-visible,.btn:focus-visible{outline:3px solid var(--ouro);outline-offset:3px}
.skip{position:absolute;left:-9999px;top:8px;background:var(--ouro);color:#000;padding:8px 14px;z-index:9}.skip:focus{left:8px}
.top{background:#000;border-bottom:1px solid #1f1f1f}
.top .in{max-width:1080px;margin:0 auto;padding:16px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.brand{color:#FDFBF7;text-decoration:none;font-weight:800;line-height:1.1}.brand small{display:block;color:var(--ouro);font-size:11px;letter-spacing:.2em;font-style:italic}
.top nav a{color:#D9D9D9;text-decoration:none;font-size:15px;margin-left:18px}.top nav a:hover{color:var(--ouro)}
.hero{background:radial-gradient(120% 90% at 20% 0%,#2a2213 0%,#000 60%);color:#FDFBF7}
.hero .in{max-width:860px;margin:0 auto;padding:56px 16px 48px}
.eyebrow{color:var(--ouro);font-size:13px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;margin:0 0 14px}
.hero h1{font-size:clamp(30px,4.6vw,46px);line-height:1.15;margin:0 0 14px;font-weight:800}
.hero .sub{color:#D9D9D9;font-size:19px;margin:0 0 18px}
.meta{color:#BDBDBD;font-size:14px;display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center}
.tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.tag{font-size:12.5px;font-weight:700;padding:4px 11px;border-radius:999px;background:rgba(201,169,110,.14);border:1px solid rgba(201,169,110,.45);color:#E6CFA0}
main{max-width:860px;margin:0 auto;padding:40px 16px 20px}
.box{background:#fff;border:1px solid var(--plat);border-left:5px solid var(--ouro);border-radius:14px;padding:22px 26px;margin:0 0 34px;box-shadow:0 10px 30px rgba(0,0,0,.05)}
.box h2{font-size:14px;letter-spacing:.14em;color:#7A5F2C;margin:0 0 10px}
.box ul{margin:0;padding-left:20px}.box li{margin:6px 0}
.body h2{font-size:28px;line-height:1.25;color:#000;margin:44px 0 12px}
.body h3{font-size:22px;color:#000;margin:32px 0 10px}
.body p{margin:0 0 18px}.body strong{color:#000}
.body blockquote{margin:24px 0;padding:14px 22px;border-left:4px solid var(--ouro);background:#fff;font-style:italic;color:#333}
.sec{margin:46px 0 0}.sec>h2{font-size:15px;letter-spacing:.14em;color:#7A5F2C;border-bottom:2px solid var(--ouro);display:inline-block;padding-bottom:6px;margin:0 0 18px}
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.card{background:#fff;border:1px solid var(--plat);border-radius:14px;padding:18px 20px}
.card h3{font-size:17px;color:#000;margin:0 0 6px;line-height:1.35}.card p{margin:0;font-size:16px;line-height:1.6}
.data li{margin:8px 0}.data{padding-left:20px}
.quote{margin:48px 0 0;background:#000;color:#FDFBF7;border-radius:18px;padding:30px 32px}
.quote p{font-size:23px;line-height:1.45;font-style:italic;margin:0 0 10px}.quote cite{color:var(--ouro);font-style:normal;font-weight:700;font-size:14px}
.notice{background:#fff;border:1px dashed var(--ouro);border-radius:14px;padding:22px 26px;margin:24px 0}
.cta{margin:52px 0 10px;background:#fff;border:1px solid var(--plat);border-top:5px solid var(--ouro);border-radius:18px;padding:30px;text-align:center}
.cta h2{margin:0 0 8px;font-size:24px;color:#000}.cta p{margin:0 0 18px;color:#444}
.btn{display:inline-block;background:var(--ouro);color:#000;font-weight:800;text-decoration:none;padding:13px 26px;border-radius:999px;box-shadow:0 8px 22px rgba(201,169,110,.3)}
.btn:hover{background:#D9BE88}
.back{display:inline-block;margin:26px 0 0;font-weight:700}
.list{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:10px}
.ed{display:flex;flex-direction:column;background:#fff;border:1px solid var(--plat);border-top:4px solid var(--ouro);border-radius:16px;padding:22px;text-decoration:none;color:var(--texto);transition:.2s}
.ed:hover{box-shadow:0 16px 40px rgba(0,0,0,.08);transform:translateY(-3px)}
.ed .lab{align-self:flex-start;background:var(--ouro);color:#000;font-size:12px;font-weight:800;padding:3px 10px;border-radius:999px;margin-bottom:12px}
.ed .d{font-size:13.5px;color:#666;margin:0 0 6px}.ed h3{font-size:19px;line-height:1.3;color:#000;margin:0 0 8px}
.ed p{font-size:15.5px;line-height:1.6;margin:0 0 14px;flex:1}.ed .go{font-weight:800;color:#7A5F2C}
footer{background:#000;color:#BDBDBD;text-align:center;font-size:14px;padding:26px 16px;margin-top:60px}footer a{color:var(--ouro)}
@media(max-width:860px){.list{grid-template-columns:repeat(2,1fr)}}
@media(max-width:620px){.grid,.list{grid-template-columns:1fr}.top nav a{margin-left:12px}body{font-size:17px}.quote p{font-size:20px}}
/* ---- revista (inspirado em portais editoriais) ---- */
.slab{font-family:"Roboto Slab",Georgia,serif}
.cat{display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#7A5F2C;margin:0 0 6px}
.cat::before{content:"";width:8px;height:8px;background:var(--ouro);display:inline-block}
.cover{position:relative;display:flex;align-items:flex-end;justify-content:space-between;aspect-ratio:16/10;border-radius:4px;overflow:hidden;color:#FDFBF7;padding:14px 16px;background:#000}
.cover b.lbl{font-size:clamp(22px,2.6vw,34px)}
.cover b{font-family:"Roboto Slab",Georgia,serif;font-size:clamp(34px,5vw,64px);line-height:1;color:var(--ouro)}
.cover span{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#D9D9D9;text-align:right;max-width:60%}
.cv0{background:radial-gradient(120% 120% at 15% 10%,#3a2d14 0%,#000 65%)}
.cv1{background:linear-gradient(135deg,#0d0d0d 0%,#2b2417 100%)}
.cv2{background:radial-gradient(120% 120% at 90% 0%,#4a3a1a 0%,#111 60%)}
.cv3{background:linear-gradient(160deg,#1c1c1c 0%,#000 55%,#3a2d14 100%)}
.cover::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(135deg,rgba(201,169,110,.07) 0 2px,transparent 2px 22px)}
.mag{max-width:1180px;margin:0 auto;padding:28px 16px 10px}
.mag-top{display:grid;grid-template-columns:1.35fr 1fr;gap:22px}
.feat{display:grid;grid-template-columns:1fr 1.05fr;gap:22px;background:#EFEBE3;padding:22px;text-decoration:none;color:var(--texto);border-radius:4px}
.feat h2{font-size:clamp(26px,3vw,38px);line-height:1.2;color:#000;margin:4px 0 12px}
.feat p{font-size:16px;line-height:1.6;color:#555;margin:0;display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;overflow:hidden}
.side{display:grid;grid-template-columns:1fr 1fr;gap:18px 18px;align-content:start}
.mini{text-decoration:none;color:#000}.mini .cover{aspect-ratio:16/10}.mini .cover b{font-size:30px}
.mini h3{font-size:16.5px;line-height:1.3;margin:4px 0 0;color:#000}
.feat:hover h2,.mini:hover h3,.row:hover h3{color:#7A5F2C;text-decoration:underline;text-decoration-thickness:2px}
.stitle{display:flex;align-items:center;gap:12px;font-size:26px;color:#000;margin:46px 0 18px}
.stitle::before{content:"";width:56px;height:5px;background:var(--ouro)}
.rows{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.row{display:grid;grid-template-columns:200px 1fr;gap:18px;text-decoration:none;color:var(--texto);background:#fff;border:1px solid #E6E1D6;padding:14px;border-radius:4px}
.row h3{font-size:19px;line-height:1.3;color:#000;margin:2px 0 6px}.row p{font-size:15px;line-height:1.55;margin:0 0 6px;color:#555;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.row .d{font-size:13px;color:#888}
.subs{display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between;background:#000;color:#FDFBF7;padding:26px 28px;border-radius:4px;margin:46px 0 0}
.subs h2{margin:0;font-size:24px}.subs p{margin:4px 0 0;color:#BDBDBD;font-size:15px}
/* ---- página da edição ---- */
.art{max-width:1180px;margin:0 auto;padding:30px 16px 10px;display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:48px}
.share{display:flex;gap:10px;align-items:center;margin:0 0 20px;flex-wrap:wrap}
.share span{font-size:13px;color:#666;margin-right:4px}
.share a,.share button{width:36px;height:36px;border-radius:4px;display:inline-flex;align-items:center;justify-content:center;color:#fff}
.share a svg,.share button svg{width:19px;height:19px;fill:currentColor}
.sh-wa{background:#25D366}.sh-in{background:#0A66C2}.sh-sh{background:#000;border:0;cursor:pointer}.sh-msg{font-size:14px;color:#2e7d32}
.share a:hover,.share button:hover{filter:brightness(1.12)}
.resumo{background:#F2EFE9;border-radius:6px;padding:4px 26px;margin:0 0 30px}
.resumo summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:10px;padding:18px 0;font-family:"Roboto Slab",Georgia,serif;font-weight:700;font-size:19px;color:#222}
.resumo summary::-webkit-details-marker{display:none}
.resumo summary::after{content:"";margin-left:auto;width:10px;height:10px;border-right:2px solid #333;border-bottom:2px solid #333;transform:rotate(-135deg);transition:.2s}
.resumo:not([open]) summary::after{transform:rotate(45deg)}
.resumo summary svg{width:22px;height:22px;stroke:#333;fill:none;stroke-width:1.6}
.resumo p{font-size:17px;line-height:1.7;margin:0 0 16px}
.resumo .sup{font-weight:700;font-size:15px}
.aside h2{font-weight:400;font-size:30px;color:#333;margin:0 0 20px;padding-top:14px;border-top:6px solid #8FA3A6;display:inline-block}
.aside h2{border-top-color:var(--ouro)}
.rel{display:grid;grid-template-columns:1fr 120px;gap:14px;align-items:center;background:#000;border-left:4px solid var(--ouro);padding:18px;margin:0 0 18px;text-decoration:none;box-shadow:0 8px 22px rgba(0,0,0,.18)}
.rel .cat{color:var(--ouro)}.rel .cat::before{display:none}
.rel h3{color:#FDFBF7;font-size:17px;line-height:1.35;margin:0;font-weight:600}
.rel:hover h3{color:var(--ouro)}
.rel .cover{aspect-ratio:1/1;padding:8px}.rel .cover b{font-size:26px}.rel .cover span{display:none}
.follow{display:flex;gap:12px;align-items:center;background:#fff;border:1px solid #E6E1D6;border-radius:4px;padding:16px;margin-top:6px;text-decoration:none;color:#000;font-weight:700}
.follow svg{width:28px;height:28px;fill:#0A66C2;flex:none}.follow small{display:block;font-weight:400;color:#666}
@media(max-width:1000px){.mag-top,.art{grid-template-columns:1fr}.rows{grid-template-columns:1fr}}
@media(max-width:620px){.feat{grid-template-columns:1fr}.side{grid-template-columns:1fr 1fr}.row{grid-template-columns:120px 1fr}.row p{display:none}}
</style>{{end}}


{{define "i-wa"}}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3z"/></svg>{{end}}
{{define "i-fb"}}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4.1A23 23 0 0 0 14.3 4c-2.5 0-4.1 1.5-4.1 4.2v2.4H7.4v3.2h2.8V22z"/></svg>{{end}}
{{define "i-x"}}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z"/></svg>{{end}}
{{define "i-share"}}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 16.1a2.9 2.9 0 0 0-2 .8l-7.1-4.1a3.3 3.3 0 0 0 0-1.6l7-4.1A3 3 0 1 0 15 5a3 3 0 0 0 .1.8l-7 4.1a3 3 0 1 0 0 4.3l7.1 4.2a2.8 2.8 0 0 0-.1.7 2.9 2.9 0 1 0 2.9-3z"/></svg>{{end}}
{{define "i-in"}}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zm7 0h3.8v1.6h.1a4.2 4.2 0 0 1 3.8-2c4 0 4.8 2.6 4.8 6.1V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/></svg>{{end}}
{{define "cover"}}<div class="cover cv{{.Cover}}" aria-hidden="true"><b{{if .Label}} class="lbl"{{end}}>{{short .}}</b>{{if not .Label}}<span>Café com Marketing</span>{{end}}</div>{{end}}
{{define "top"}}<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header class="top"><div class="in"><a class="brand" href="/">Adriana Nogueira<small>PORTFÓLIO</small></a>
<nav aria-label="Navegação"><a href="/">Início</a><a href="/#portfolio">Cases</a><a href="/newsletter">Newsletter</a></nav></div></header>{{end}}

{{define "foot"}}<footer>© Adriana Nogueira · Comunicação &amp; Marketing Financeiro · CEA · GAIPC™ · <a href="/politica-de-privacidade">Privacidade</a></footer>
</body></html>{{end}}

{{define "edition"}}{{template "head"}}
<title>{{.E.Title}} | Newsletter Café com Marketing</title>
<meta name="description" content="{{if .E.Subtitle}}{{.E.Subtitle}}{{else}}{{.E.Summary}}{{end}}">
<link rel="canonical" href="{{.E.URL}}">
{{if not .E.Full}}<meta name="robots" content="noindex, follow">{{end}}
<meta property="og:type" content="article"><meta property="og:locale" content="pt_BR">
<meta property="og:title" content="{{.E.Title}}"><meta property="og:url" content="{{.E.URL}}">
<meta property="og:description" content="{{if .E.Subtitle}}{{.E.Subtitle}}{{else}}{{.E.Summary}}{{end}}">
<meta property="og:image" content="{{.Site}}/assets/ovelha-og.jpg"><meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">{{json .LD}}</script>
</head><body>{{template "top"}}
<section class="hero"><div class="in">
<p class="eyebrow">Newsletter Café com Marketing · {{if .E.Label}}{{.E.Label}}{{else}}Edição #{{.E.Number}}{{end}}</p>
<h1>{{.E.Title}}</h1>
{{if .E.Subtitle}}<p class="sub">{{.E.Subtitle}}</p>{{end}}
<div class="meta">{{if .E.DateBR}}<span>{{.E.DateBR}} ·</span>{{end}}{{if .E.ReadTime}}<span>{{.E.ReadTime}} min de leitura ·</span>{{end}}<span>Por Adriana Nogueira</span></div>
<div class="tags">{{range .E.Tags}}<span class="tag">{{.}}</span>{{end}}</div>
</div></section>
<div class="art"><main id="conteudo">
<div class="share">
<a class="sh-in" href="{{.LinkedIn}}" target="_blank" rel="noopener" aria-label="LinkedIn de Adriana Nogueira">{{template "i-in"}}</a>
<a class="sh-wa" href="{{.WhatsApp}}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">{{template "i-wa"}}</a>
<button type="button" class="sh-sh" id="compartilhar" data-url="{{.E.URL}}" data-title="{{.E.Title}}" aria-label="Compartilhar esta edição">{{template "i-share"}}</button>
<span class="sh-msg" id="sh-msg" role="status" aria-live="polite"></span></div>
{{if .E.AISummary}}<details class="resumo" open><summary><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3l1.6 4.4L15 9l-4.4 1.6L9 15l-1.6-4.4L3 9l4.4-1.6zM18 13l.9 2.1L21 16l-2.1.9L18 19l-.9-2.1L15 16l2.1-.9zM17 3l.6 1.4L19 5l-1.4.6L17 7l-.6-1.4L15 5l1.4-.6z"/></svg>Resumo</summary>
{{range .E.AISummary}}<p>{{.}}</p>{{end}}<p class="sup">Resumo gerado com IA e supervisionado por Adriana Nogueira.</p></details>{{end}}
{{if .E.Full}}{{with .E.Content}}
{{if .Highlights.Plain}}<aside class="box" aria-label="{{.Highlights.Title}}"><h2>{{.Highlights.Title}}</h2><ul>{{range .Highlights.Plain}}<li>{{.}}</li>{{end}}</ul></aside>{{end}}
<article class="body">{{$.E.BodyHTML}}</article>
{{if .QuickReads.Rich}}<section class="sec"><h2>{{.QuickReads.Title}}</h2><div class="grid">{{range .QuickReads.Rich}}<div class="card"><h3>{{.Icon}} {{.Title}}</h3><p>{{.Text}}</p></div>{{end}}</div></section>{{end}}
{{if .Thoughts.Plain}}<section class="sec"><h2>{{.Thoughts.Title}}</h2><ul class="data">{{range .Thoughts.Plain}}<li>{{.}}</li>{{end}}</ul></section>{{end}}
{{if .Recommendations.Rich}}<section class="sec"><h2>{{.Recommendations.Title}}</h2><div class="grid">{{range .Recommendations.Rich}}<div class="card"><h3>{{.Title}}</h3><p>{{.Text}}</p></div>{{end}}</div></section>{{end}}
{{if .Quote.Text}}<blockquote class="quote"><p>“{{.Quote.Text}}”</p><cite>{{.Quote.Author}}</cite></blockquote>{{end}}
{{else}}<article class="body">{{$.E.BodyHTML}}</article>{{end}}{{end}}
<section class="cta"><h2>Receba as próximas edições</h2><p>Marketing, IA, branding e regulação do mercado financeiro, com fonte e sem ruído.</p>
<a class="btn" href="/?origem=newsletter-{{if .E.Slug}}{{.E.Slug}}{{else}}edicao-{{.E.Number}}{{end}}#form-contato">Assinar a Newsletter Café com Marketing</a></section>
<a class="back" href="/newsletter">← Todas as edições</a>
</main>
<aside class="aside" aria-label="Matérias relacionadas"><h2>Matérias relacionadas</h2>
{{range .E.Related}}<a class="rel" href="{{.Path}}"><div><p class="cat">{{if .Cat}}{{.Cat}}{{else}}{{badge .}}{{end}}</p><h3>{{.Title}}</h3></div>{{template "cover" .}}</a>{{end}}
<a class="follow" href="{{.LinkedIn}}" target="_blank" rel="noopener">{{template "i-in"}}<span>Siga Adriana Nogueira no LinkedIn<small>Novas edições e análises toda semana</small></span></a>
</aside></div>
<script>
(function(){var b=document.getElementById('compartilhar'),m=document.getElementById('sh-msg');if(!b)return;
b.addEventListener('click',function(){var u=b.getAttribute('data-url'),t=b.getAttribute('data-title');
if(navigator.share){navigator.share({title:t,url:u}).catch(function(){});return;}
if(navigator.clipboard){navigator.clipboard.writeText(u).then(function(){m.textContent='Link copiado.';setTimeout(function(){m.textContent='';},2500);});}
else{window.prompt('Copie o link:',u);}});})();
</script>
{{template "foot"}}{{end}}

{{define "index"}}{{template "head"}}
<title>Newsletter Café com Marketing | Adriana Nogueira</title>
<meta name="description" content="Todas as edições da Newsletter Café com Marketing: marketing, IA, branding, regulação e mercado de capitais, por Adriana Nogueira (CEA ANBIMA).">
<link rel="canonical" href="{{.Site}}/newsletter">
<meta property="og:type" content="website"><meta property="og:title" content="Newsletter Café com Marketing"><meta property="og:url" content="{{.Site}}/newsletter"><meta property="og:image" content="{{.Site}}/assets/ovelha-og.jpg">
</head><body>{{template "top"}}
<h1 class="skip">Newsletter Café com Marketing</h1>
<div class="mag" id="conteudo">
<p class="eyebrow" style="color:#7A5F2C;margin:0 0 14px">Newsletter Café com Marketing · marketing, IA, branding e regulação do mercado financeiro</p>
<div class="mag-top">
{{with .Feat}}<a class="feat" href="{{.Path}}">{{template "cover" .}}<div><p class="cat">{{if .Cat}}{{.Cat}}{{else}}{{badge .}}{{end}}</p><h2 class="slab">{{.Title}}</h2><p>{{if .HomeSummary}}{{.HomeSummary}}{{else if .Summary}}{{.Summary}}{{else}}{{.Subtitle}}{{end}}</p></div></a>{{end}}
<div class="side">{{range .Side}}<a class="mini" href="{{.Path}}">{{template "cover" .}}<p class="cat" style="margin-top:10px">{{if .Cat}}{{.Cat}}{{else}}{{badge .}}{{end}}</p><h3 class="slab">{{.Title}}</h3></a>{{end}}</div>
</div>
<h2 class="stitle slab">Últimas publicadas</h2>
<div class="rows">{{range .All}}<a class="row" href="{{.Path}}">{{template "cover" .}}<div><p class="cat">{{badge .}}{{if .Cat}} · {{.Cat}}{{end}}</p><h3 class="slab">{{.Title}}</h3><p>{{if .HomeSummary}}{{.HomeSummary}}{{else if .Summary}}{{.Summary}}{{else}}{{.Subtitle}}{{end}}</p>{{if .DateBR}}<span class="d">{{.DateBR}}{{if .ReadTime}} · {{.ReadTime}} min de leitura{{end}}</span>{{end}}</div></a>{{end}}</div>
{{if .Ext}}<h2 class="stitle slab">Café com Caos no LinkedIn</h2>
<div class="rows">{{range .Ext}}<a class="row" href="{{.URL}}" target="_blank" rel="noopener"><div class="cover cv3" aria-hidden="true"><b style="font-size:26px">☕</b><span>LinkedIn</span></div><div><p class="cat">{{.Label}}</p><h3 class="slab">{{.Title}}</h3><p>{{.Summary}}</p><span class="d">{{.DateBR}} · Leia o texto completo ↗</span></div></a>{{end}}</div>{{end}}
<div class="subs"><div><h2 class="slab">Receba as próximas edições</h2><p>Uma leitura objetiva, com fonte, direto no seu e-mail.</p></div>
<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="/?origem=newsletter-pagina#form-contato">Assinar a newsletter</a><a class="btn" style="background:#0A66C2;color:#fff;box-shadow:none" href="{{.LinkedIn}}" target="_blank" rel="noopener">Seguir no LinkedIn</a></div></div>
<a class="back" href="/">← Voltar ao início</a>
</div>
{{template "foot"}}{{end}}
`

const homeCardsTpl = `{{define "homecards"}}{{range .}}      <a class="ncard" href="{{.Href}}"{{if .External}} target="_blank" rel="noopener"{{end}} aria-label="Ler artigo: {{.Title}}">
        <div class="ncover"><span class="nbadge">{{.Badge}}</span></div>
        <div class="nbody">{{if .DateBR}}<p class="ndate">{{.DateBR}}</p>{{end}}<div class="ntags">{{range .Tags}}<span class="ntag">{{.}}</span>{{end}}</div><h3>{{.Title}}</h3><p>{{.Summary}}</p><span class="more">Leia o texto completo →</span></div>
      </a>
{{end}}{{end}}`
