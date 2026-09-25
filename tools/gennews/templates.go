package main

const pageTpl = `
{{define "head"}}<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
<meta name="theme-color" content="#000000">
<style>
:root{--preto:#000;--champ:#FDFBF7;--ouro:#C9A96E;--plat:#D9D9D9;--cinza:#898989;--texto:#2B2B2B;--dourado:#C9A96E;--champagne:#FDFBF7;--platinum:#D9D9D9;--linha:#241f18}
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
footer{background:#000;color:#BDBDBD;text-align:center;font-size:14px;padding:26px 16px;margin-top:60px}footer a{color:var(--ouro)}footer .legal{max-width:820px;margin:0 auto 14px;font-size:12.5px;line-height:1.6;color:#9a9a9a;text-align:left}footer .legal strong{color:#BDBDBD}
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
.cover .cafe-cup{position:relative;z-index:1;flex:0 0 52px}.cover .cafe-li{position:absolute;top:12px;left:14px;z-index:1}
@media(max-width:640px){.cover .cafe-cup{width:30px;height:30px;flex-basis:30px}.cover .cafe-li{width:16px;height:16px;top:8px;left:10px}.cover .cafe-t{font-size:9.5px;letter-spacing:.12em}}
.cover::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(135deg,rgba(201,169,110,.07) 0 2px,transparent 2px 22px)}
.cover img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.5}.cover b,.cover span{position:relative;z-index:1}
.hfig{margin:26px 0 0}.hfig img{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:6px}.hfig figcaption{margin-top:8px;font-size:12px;color:#B9B2A4}.hfig a{color:#C9A96E}
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
.row .d{font-size:13px;color:#666}
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
/* Identidade visual: Archivo (títulos, nome da página, botões) · Cormorant Garamond (assinatura e frases editoriais) · Open Sans (texto) */
h1,h2,h3,h4,.brand,.brand-txt,.slab,.cover b,.resumo summary,button,.btn,.cta,.cta a,.pbtn,.news-btn,.entry-submit{font-family:'Archivo','Open Sans',system-ui,sans-serif!important}
h1 em,h2 em,h3 em,.brand-txt i,.brand small,blockquote p,.quote p{font-family:'Cormorant Garamond',Georgia,serif!important;font-style:italic;font-weight:600}
h1 em,h2 em{font-size:1.1em;letter-spacing:0}
.nl-form{display:flex;flex-direction:column;gap:10px;text-align:left}
.nl-field{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #cfc8bb;border-radius:4px;padding:0 14px;min-height:54px}
.nl-field:focus-within{border-color:#7A5C22;box-shadow:0 0 0 2px rgba(201,169,110,.45)}
.nl-field svg{width:22px;height:22px;flex-shrink:0;color:#7A5C22}
.nl-field input{flex:1;min-width:0;border:0;background:transparent;font:inherit;font-size:16px;color:#141414;padding:14px 0;outline:none}
.nl-field input::placeholder{color:#6b645b}
.nl-form .nl-go{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;min-height:54px;border:0;border-radius:4px;background:var(--dourado);color:#000;font-weight:800;font-size:17px;cursor:pointer}
.nl-form .nl-go:hover,.nl-form .nl-go:focus-visible{background:#b8965b}.nl-form .nl-go:disabled{opacity:.6;cursor:default}
.nl-form .nl-go svg{width:22px;height:22px}
.nl-ok{display:flex;gap:8px;align-items:flex-start;font-size:13px;line-height:1.45;color:#6b645b}
.nl-ok input{margin-top:3px;accent-color:#7A5C22;width:16px;height:16px;flex-shrink:0}
.nl-st{min-height:18px;font-size:14px;color:#3d6b2a;font-weight:600}
.subs-sug{margin-top:6px;font-weight:600;color:var(--dourado)}.nl-sugf textarea{width:100%;min-height:84px;resize:vertical;padding:12px 14px;border:1px solid var(--linha);border-radius:4px;background:#000;color:var(--champagne);font:inherit;font-size:15px}.nl-sugf textarea::placeholder{color:#8a8a8a}.nl-sugf textarea:focus{outline:2px solid var(--dourado);outline-offset:1px}.nl-st.erro{color:#a1261b}
.hp{position:absolute!important;left:-9999px!important;width:1px;height:1px;opacity:0}
.nl-dark .nl-field{background:#000;border-color:var(--linha)}.nl-dark .nl-field input{color:var(--champagne)}.nl-dark .nl-field input::placeholder{color:#8a8a8a}.nl-dark .nl-field svg{color:var(--dourado)}
.nl-dark .nl-ok{color:var(--cinza)}.nl-dark .nl-ok input{accent-color:var(--dourado)}.nl-dark .nl-st{color:var(--dourado)}.nl-dark .nl-st.erro{color:#ff8a7a}
.nl-dark .nl-field:focus-within{border-color:var(--dourado)}
.nl-fb{font-size:14px}.nl-fb a{color:#7A5C22;font-weight:700;text-decoration:underline}.nl-dark .nl-fb a{color:var(--dourado)}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}
.cta-form{max-width:460px;margin:16px auto 0}.subs .cta-form{margin:16px 0 0}
</style>{{end}}


{{define "i-wa"}}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3z"/></svg>{{end}}
{{define "i-fb"}}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4.1A23 23 0 0 0 14.3 4c-2.5 0-4.1 1.5-4.1 4.2v2.4H7.4v3.2h2.8V22z"/></svg>{{end}}
{{define "i-x"}}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z"/></svg>{{end}}
{{define "i-share"}}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 16.1a2.9 2.9 0 0 0-2 .8l-7.1-4.1a3.3 3.3 0 0 0 0-1.6l7-4.1A3 3 0 1 0 15 5a3 3 0 0 0 .1.8l-7 4.1a3 3 0 1 0 0 4.3l7.1 4.2a2.8 2.8 0 0 0-.1.7 2.9 2.9 0 1 0 2.9-3z"/></svg>{{end}}
{{define "i-in"}}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zm7 0h3.8v1.6h.1a4.2 4.2 0 0 1 3.8-2c4 0 4.8 2.6 4.8 6.1V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/></svg>{{end}}
{{define "cover"}}<div class="cover cv{{.Cover}}" aria-hidden="true">{{if .Img}}<img src="{{.Img}}" alt="" loading="lazy" decoding="async">{{end}}<b{{if .Label}} class="lbl"{{end}}>{{short .}}</b>{{if not .Label}}<span>Exponencial Future</span>{{end}}</div>{{end}}
{{define "top"}}<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header class="top"><div class="in"><a class="brand" href="/">Adriana Nogueira<small>PORTFÓLIO</small></a>
<nav aria-label="Navegação"><a href="/">Início</a><a href="/#portfolio">Cases</a><a href="/newsletter">Newsletter</a><a href="/prompts">Banco de Prompts</a></nav></div></header>{{end}}

{{define "foot"}}<footer><div class="aviso-legal" id="aviso-legal" role="note" aria-label="Aviso legal e mídia incorporada"><style>.aviso-legal{max-width:980px;margin:0 auto 20px;padding:0;text-align:left;font-family:'Open Sans',system-ui,sans-serif;font-size:13px;line-height:1.65;color:#D9D9D9}.aviso-legal p,.aviso-legal li{margin:0 0 8px;font-size:13px;line-height:1.65;color:#D9D9D9;font-family:inherit}.aviso-legal .av-t{margin-bottom:10px;font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#C9A96E}.aviso-legal b{color:#FDFBF7;font-weight:700}.aviso-legal ol{margin:0 0 8px 20px;padding:0}.aviso-legal li{margin-bottom:2px}.aviso-legal .av-base{color:#9A9A9A}.aviso-legal a{color:#C9A96E;text-decoration:underline;text-underline-offset:2px}</style>
<p class="av-t">Aviso legal e mídia incorporada</p>
<p>Este site representa meu portfólio de carreira e meu atual projeto pessoal. Alguns conteúdos, marcas, logotipos e materiais exibidos são propriedade intelectual das respectivas empresas e instituições para as quais foram desenvolvidos. A reprodução desses materiais aqui tem caráter exclusivamente demonstrativo e profissional. Todos os direitos sobre marcas e conteúdos de terceiros pertencem aos seus respectivos titulares e não a mim.</p>
<p>Este site descreve serviços de preparação de documentos, materiais, comunicação e estratégia. Não constitui recomendação de investimento, consultoria jurídica, contábil ou de valores mobiliários, e não garante resultados financeiros. Serviços regulados são conduzidos por profissionais habilitados do cliente. Conteúdo produzido sob supervisão humana, com fact-checking e conformidade LGPD + EU AI Act.</p>
<p><b>Premissas fundamentais:</b></p>
<ol><li>Fact-checking obrigatório em toda informação.</li><li>Supervisão e curadoria humana: soberania humana antes de publicar ou finalizar.</li><li>Compliance desde o início: conformidade incorporada na origem, não no fim.</li></ol>
<p class="av-base"><b>Base normativa:</b> Guia de IA do TCU · LGPD (Lei 13.709/2018) · Marco Civil da Internet · PL 2.338/2023 · EU AI Act · ISO/IEC 38507 e 23894 · CVM · BACEN · ANBIMA · ANCORD · CMN · CONAR · CF/1988 · CC · CLT · CP · CTN · Lei 8.906/94 (OAB) · Lei 7.492/86 (crimes contra o sistema financeiro) · Lei 9.613/98 (lavagem de dinheiro) · ECA Digital (Lei 15.211/2025).</p>
<p class="av-base">Dados pessoais enviados pelos formulários são tratados conforme a <a href="/politica-de-privacidade">Política de Privacidade</a>. Resumos e trechos assistidos por IA são identificados como tais e revisados por Adriana Nogueira antes da publicação (EU AI Act, art. 50).</p>
</div><p>© Adriana Nogueira · Comunicação &amp; Marketing · CEA · GAIPC™ · <a href="/politica-de-privacidade">Privacidade</a> · <a href="/faq">FAQ</a></p></footer>
<script>
(function(){
  /* Formulários de cadastro direto (newsletter e Banco de Prompts): envia para /api/lead (Brevo).
     Se o Brevo não estiver configurado, mostra o formulário alternativo (Tally) sem perder o contato. */
  function st(f,msg,erro){var s=f.querySelector('.nl-st');if(s){s.textContent=msg;s.classList.toggle('erro',!!erro);}}
  document.addEventListener('submit',function(e){
    var f=e.target.closest('form.nl-form');if(!f)return;e.preventDefault();
    var dados={tipo:f.getAttribute('data-tipo')||'newsletter',origem:f.getAttribute('data-origem')||''};
    var campos=f.querySelectorAll('input[name]');
    for(var i=0;i<campos.length;i++){var c=campos[i];dados[c.name]=c.type==='checkbox'?c.checked:c.value.trim();}
    for(var j=0;j<campos.length;j++){var x=campos[j];if(x.required&&(x.type==='checkbox'?!x.checked:!x.value.trim())){x.focus();st(f,x.type==='checkbox'?'Marque a caixa de consentimento para continuar.':'Preencha '+(x.getAttribute('data-nome')||'este campo')+'.',true);return;}}
    var b=f.querySelector('button[type=submit]');if(b)b.disabled=true;st(f,'Enviando…');
    fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(dados)})
      .then(function(r){return r.json().catch(function(){return {ok:false,fallback:true};});})
      .then(function(j){
        if(b)b.disabled=false;
        if(j&&j.ok){var sg=f.querySelector('[name=sugestao]'),tx=sg?sg.value.trim():'';if(tx){var d=new URLSearchParams({nome:'Leitor(a) da newsletter',email:dados.email||'',mensagem:'Sugestão de pauta: '+tx,origem:'sugestao-pauta',consentimento:'sim'});fetch('/api/contato',{method:'POST',headers:{'X-Requested-With':'fetch','Content-Type':'application/x-www-form-urlencoded'},body:d.toString()}).catch(function(){});}st(f,f.getAttribute('data-ok')||j.mensagem||'Pronto!');f.reset();f.classList.add('nl-feito');f.dispatchEvent(new CustomEvent('lead:ok',{bubbles:true}));return;}
        st(f,(j&&j.mensagem)||'Não foi possível concluir agora.',true);
        if(j&&j.fallback){var fb=document.getElementById(f.getAttribute('data-fallback')||'');if(fb){fb.hidden=false;var ifr=fb.querySelector('iframe[data-src]');if(ifr&&!ifr.src)ifr.src=ifr.getAttribute('data-src');fb.scrollIntoView({behavior:'smooth',block:'nearest'});}}
        if(j&&j.campo){var el=f.querySelector('[name='+j.campo+']');if(el)el.focus();}
      })
      .catch(function(){if(b)b.disabled=false;st(f,'Sem conexão agora. Tente de novo em instantes.',true);});
  });
})();
</script>
<script src="/assets/brevo-chat-v1.js" defer></script>
</body></html>{{end}}

{{define "edition"}}{{template "head"}}
<title>{{.E.Title}} | Newsletter Exponencial Future</title>
<meta name="description" content="{{if .E.Subtitle}}{{.E.Subtitle}}{{else}}{{.E.Summary}}{{end}}">
<link rel="canonical" href="{{.E.URL}}">
{{if not .E.Full}}<meta name="robots" content="noindex, follow">{{end}}
<meta property="og:type" content="article"><meta property="og:locale" content="pt_BR">
<meta property="og:title" content="{{.E.Title}}"><meta property="og:url" content="{{.E.URL}}">
<meta property="og:description" content="{{if .E.Subtitle}}{{.E.Subtitle}}{{else}}{{.E.Summary}}{{end}}">
<meta property="og:image" content="{{.Site}}/assets/adriana-nogueira-og.jpg"><meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">{{json .LD}}</script>
</head><body>{{template "top"}}
<section class="hero" aria-label="Apresentação da edição"><div class="in">
<p class="eyebrow">Newsletter Exponencial Future · {{if .E.Label}}{{.E.Label}}{{else}}Edição #{{.E.Number}}{{end}}</p>
<h1>{{.E.Title}}</h1>
{{if .E.Subtitle}}<p class="sub">{{.E.Subtitle}}</p>{{end}}
<div class="meta">{{if .E.DateBR}}<span>{{.E.DateBR}} ·</span>{{end}}{{if .E.ReadTime}}<span>{{.E.ReadTime}} min de leitura ·</span>{{end}}<span>Por Adriana Nogueira</span></div>
<div class="tags">{{range .E.Tags}}<span class="tag">{{.}}</span>{{end}}</div>
{{if .E.Img}}<figure class="hfig"><img src="{{.E.Img}}" alt="{{.E.ImgAlt}}" width="1200" height="675" decoding="async"><figcaption>Imagem: <a href="{{.E.ImgPage}}" target="_blank" rel="noopener">{{.E.ImgBy}} / Unsplash</a></figcaption></figure>{{end}}
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
<div class="cta-form"><form class="nl-form" data-tipo="newsletter" data-origem="newsletter-texto" data-fallback="fb-newsletter-texto" novalidate><label class="nl-field"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg><span class="sr-only">Seu e-mail</span><input type="email" name="email" placeholder="Seu e-mail" autocomplete="email" required data-nome="seu e-mail"></label><input class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><button type="submit" class="nl-go">Quero receber <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button><label class="nl-ok"><input type="checkbox" name="consentimento" required> <span>Quero receber a Newsletter Exponencial Future por e-mail. Posso cancelar quando quiser (LGPD).</span></label><p class="nl-st" role="status" aria-live="polite"></p><p class="nl-fb" id="fb-newsletter-texto" hidden><a href="/?origem=newsletter-{{if .E.Slug}}{{.E.Slug}}{{else}}edicao-{{.E.Number}}{{end}}#form-contato">Concluir a inscrição pelo formulário →</a></p></form></div></section>
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
<title>Newsletter Exponencial Future | Adriana Nogueira</title>
<meta name="description" content="Todas as edições da Newsletter Exponencial Future: marketing, IA, branding, regulação e mercado de capitais, por Adriana Nogueira (CEA ANBIMA).">
<link rel="canonical" href="{{.Site}}/newsletter">
<meta property="og:type" content="website"><meta property="og:title" content="Newsletter Exponencial Future"><meta property="og:url" content="{{.Site}}/newsletter"><meta property="og:image" content="{{.Site}}/assets/adriana-nogueira-og.jpg">
</head><body>{{template "top"}}
<main class="mag" id="conteudo">
<h1 class="skip">Newsletter Exponencial Future</h1>
<p class="eyebrow" style="color:#7A5F2C;margin:0 0 14px">Newsletter Exponencial Future · marketing, IA, branding e regulação do mercado financeiro</p>
<div class="mag-top">
{{with .Feat}}<a class="feat" href="{{.Path}}">{{template "cover" .}}<div><p class="cat">{{if .Cat}}{{.Cat}}{{else}}{{badge .}}{{end}}</p><h2 class="slab">{{.Title}}</h2><p>{{if .HomeSummary}}{{.HomeSummary}}{{else if .Summary}}{{.Summary}}{{else}}{{.Subtitle}}{{end}}</p></div></a>{{end}}
<div class="side">{{range .Side}}<a class="mini" href="{{.Path}}">{{template "cover" .}}<p class="cat" style="margin-top:10px">{{if .Cat}}{{.Cat}}{{else}}{{badge .}}{{end}}</p><h3 class="slab">{{.Title}}</h3></a>{{end}}</div>
</div>
<h2 class="stitle slab">Últimas publicadas</h2>
<div class="rows">{{range .All}}<a class="row" href="{{.Path}}">{{template "cover" .}}<div><p class="cat">{{badge .}}{{if .Cat}} · {{.Cat}}{{end}}</p><h3 class="slab">{{.Title}}</h3><p>{{if .HomeSummary}}{{.HomeSummary}}{{else if .Summary}}{{.Summary}}{{else}}{{.Subtitle}}{{end}}</p>{{if .DateBR}}<span class="d">{{.DateBR}}{{if .ReadTime}} · {{.ReadTime}} min de leitura{{end}}</span>{{end}}</div></a>{{end}}</div>
{{if .Ext}}<h2 class="stitle slab">Café com Caos no LinkedIn</h2>
<div class="rows">{{range .Ext}}<a class="row" href="{{.URL}}" target="_blank" rel="noopener"><div class="cover cv3" aria-hidden="true"><svg viewBox="0 0 64 64" class="cafe-cup" width="52" height="52" fill="none" stroke="#C9A96E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 6c-3 4 3 6 0 10M32 6c-3 4 3 6 0 10M42 6c-3 4 3 6 0 10"/><path d="M10 24h42v14a16 16 0 0 1-16 16h-10A16 16 0 0 1 10 38z"/><path d="M52 28h3a7 7 0 0 1 0 14h-4"/><path d="M6 58h50"/></svg><svg viewBox="0 0 24 24" class="cafe-li" width="20" height="20" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#0A66C2"/><path fill="#fff" d="M7.1 9.5H4.6V19h2.5V9.5zM5.9 5.2a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9zM19.4 13.6c0-2.6-.6-4.3-3.5-4.3-1.4 0-2.3.5-2.7 1.3V9.5h-2.4V19h2.5v-4.7c0-1.2.2-2.4 1.8-2.4 1.5 0 1.5 1.4 1.5 2.5V19h2.5v-5.4z"/></svg><span class="cafe-t">Café com Caos</span></div><div><p class="cat">{{.Label}}</p><h3 class="slab">{{.Title}}</h3><p>{{.Summary}}</p><span class="d">{{.DateBR}} · Leia o texto completo ↗</span></div></a>{{end}}</div>{{end}}
<div class="subs"><div><h2 class="slab">Receba as próximas edições</h2><p>Que tal garantir leituras objetivas e de fontes confiáveis por meio de fact-checking para ajudar nas suas decisões?</p><p class="subs-sug">Mande sugestões de pautas que você gostaria de ler!</p><div class="cta-form"><form class="nl-form nl-dark" data-tipo="newsletter" data-origem="newsletter-pagina" data-fallback="fb-newsletter-pagina" data-ok="Obrigado, você já está inscrito(a)!" novalidate><label class="nl-field"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg><span class="sr-only">Seu e-mail</span><input type="email" name="email" placeholder="Seu e-mail" autocomplete="email" required data-nome="seu e-mail"></label><input class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><label class="nl-sugf"><span class="sr-only">Sugestão de pauta (opcional)</span><textarea name="sugestao" rows="3" maxlength="1500" placeholder="Sua sugestão de pauta (opcional)"></textarea></label><label class="nl-ok"><input type="checkbox" name="consentimento" required> <span>Quero receber a Newsletter Exponencial Future por e-mail. Posso cancelar quando quiser (LGPD).</span></label><button type="submit" class="nl-go">Quero me inscrever <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button><p class="nl-st" role="status" aria-live="polite"></p><p class="nl-fb" id="fb-newsletter-pagina" hidden><a href="mailto:contato-assessoria@adriana-nogueira.com?subject=Quero%20receber%20a%20newsletter">Concluir a inscrição por e-mail →</a></p></form></div></div>
<div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn" style="background:#0A66C2;color:#fff;box-shadow:none" href="{{.LinkedIn}}" target="_blank" rel="noopener">Seguir no LinkedIn</a></div></div>
<a class="back" href="/">← Voltar ao início</a>
</main>
{{template "foot"}}{{end}}
`

const homeCardsTpl = `{{define "homecards"}}{{range .}}      <a class="ncard" href="{{.Href}}"{{if .External}} target="_blank" rel="noopener"{{end}} aria-label="Ler artigo: {{.Title}}">
        <div class="ncover">{{if .Img}}<img src="{{.Img}}" alt="" loading="lazy" decoding="async">{{end}}<span class="nbadge">{{.Badge}}</span></div>
        <div class="nbody">{{if .DateBR}}<p class="ndate">{{.DateBR}}</p>{{end}}<div class="ntags">{{range .Tags}}<span class="ntag">{{.}}</span>{{end}}</div><h3>{{.Title}}</h3><p>{{.Summary}}</p><span class="more">Leia o texto completo →</span></div>
      </a>
{{end}}{{end}}`
