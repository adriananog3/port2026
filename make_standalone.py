"""Gera a versão arquivo-único da home (abre direto do computador, sem servidor).
Os cases usam o mesmo app compilado (web/cases-app), embutido e carregado em iframes srcdoc."""
import base64, glob, io, os, re
from PIL import Image
W = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'web')
s = open(f'{W}/index.html', encoding='utf-8').read()
SINGLE = '/tmp/claude-0/cases-single/assets'  # build sem divisão em partes (STANDALONE=1 vite build)
js = open(glob.glob(f'{SINGLE}/*.js')[0], encoding='utf-8').read()
css = open(glob.glob(f'{SINGLE}/*.css')[0], encoding='utf-8').read()

def data_uri(path):
    im = Image.open(path)
    if im.mode not in ('RGB', 'RGBA'): im = im.convert('RGBA')
    im.thumbnail((1100, 1100))
    b = io.BytesIO(); im.save(b, 'WEBP', quality=82)
    return 'data:image/webp;base64,' + base64.b64encode(b.getvalue()).decode()

# imagens da home (web/images/home) voltam a ser data URI no arquivo único
for p in sorted(set(re.findall(r'/images/home/[0-9a-f]+\.[a-z]+', s))):
    raw = open(W + p, 'rb').read(); ext = p.rsplit('.', 1)[1]
    s = s.replace(p, f'data:image/{ {"jpg": "jpeg", "svg": "svg+xml"}.get(ext, ext) };base64,' + base64.b64encode(raw).decode())

# imagens locais do app viram data URI dentro do JS
for p in sorted(set(re.findall(r'"(/(?:images/[^"]+|[a-z0-9-]+\.(?:png|jpe?g|webp)))"', js))):
    f = W + p
    if os.path.isfile(f):
        js = js.replace(f'"{p}"', '"' + data_uri(f) + '"')

def as_text_block(i, content):  # guarda o código sem executar
    return f'<script type="text/plain" id="{i}">' + content.replace('</script', '<\\/script') + '</script>'

loader = '''<script>
(function(){
  var jsU,cssU;
  function urls(){ if(jsU) return; 
    var t=function(id){return document.getElementById(id).textContent.replace(/<\\\\\\/script/g,'</script');};
    jsU=URL.createObjectURL(new Blob([t('cases-js')],{type:'text/javascript'}));
    cssU=URL.createObjectURL(new Blob([t('cases-css')],{type:'text/css'})); }
  function load(panel){
    var f=panel&&panel.querySelector('iframe.case-frame'); if(!f||f.dataset.ok) return; f.dataset.ok=1;
    var slug=(f.getAttribute('data-src').match(/cases\\/([a-z0-9]+)/)||[])[1]; urls();
    f.removeAttribute('src');
    f.srcdoc='<!doctype html><html lang="pt-BR" class="embed"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
      '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap">'+
      '<link rel="stylesheet" href="'+cssU+'"><style>html.embed,html.embed body{background:transparent}html.embed body{overflow:hidden}img.img-indisponivel{display:none!important}</style>'+
      '<script>window.__CASE__="'+slug+'"<\\/script></head><body><div id="root"></div><script type="module" src="'+jsU+'"><\\/script></body></html>';
  }
  document.querySelectorAll('.pcase-btn').forEach(function(b){b.addEventListener('click',function(){load(document.getElementById(b.getAttribute('aria-controls')));});});
  if(location.hash.indexOf('#case-')===0) load(document.getElementById(location.hash.slice(1)));
})();
</script>'''
# no arquivo único, o iframe não usa src (não há servidor): o carregador acima assume
s = s.replace('<iframe class="case-frame" data-src=', '<iframe class="case-frame" data-standalone="1" data-src=')
s = s.replace("function load(panel){var f=panel&&panel.querySelector('iframe.case-frame');if(f&&!f.getAttribute('src'))",
              "function load(panel){var f=panel&&panel.querySelector('iframe.case-frame');if(f&&!f.dataset.standalone&&!f.getAttribute('src'))")
# mensagens vindas de srcdoc têm origem "null": aceitar pela identidade do iframe
s = s.replace("if(e.origin!==location.origin||!e.data)return;",
              "if(!e.data)return;var own=[].some.call(document.querySelectorAll('iframe.case-frame'),function(f){return f.contentWindow===e.source;});if(!own&&e.origin!==location.origin)return;")
s = s.replace('</body>', as_text_block('cases-js', js) + as_text_block('cases-css', css) + loader + '\n</body>', 1)
# páginas da newsletter embutidas: abrem num leitor em tela cheia (sem servidor)
news = {}
for f in sorted(glob.glob(f'{W}/newsletter/*.html')):
    name = os.path.basename(f)[:-5]
    news['/newsletter' if name == 'index' else '/newsletter/' + name] = open(f, encoding='utf-8').read()
import json as _json
reader = as_text_block('news-pages', _json.dumps(news, ensure_ascii=False)) + """<script>
(function(){
  var pages=JSON.parse(document.getElementById('news-pages').textContent.replace(/<\\\\\/script/g,'</script'));
  var ov=null, fr=null;
  function close(hash){ if(ov){ov.remove();ov=null;document.body.style.overflow='';} if(hash){ var t=document.querySelector(hash); if(t) t.scrollIntoView({behavior:'smooth'}); } }
  function open(path){
    var html=pages[path]; if(!html) return false;
    if(!ov){ ov=document.createElement('div'); ov.setAttribute('role','dialog'); ov.setAttribute('aria-label','Newsletter Café com Marketing');
      ov.style.cssText='position:fixed;inset:0;z-index:10000;background:#FDFBF7';
      var x=document.createElement('button'); x.type='button'; x.textContent='✕ Fechar'; x.setAttribute('aria-label','Fechar a newsletter');
      x.style.cssText='position:fixed;top:12px;right:16px;z-index:10001;background:#C9A96E;color:#000;border:0;border-radius:999px;padding:9px 16px;font-weight:800;cursor:pointer';
      x.onclick=function(){close();}; fr=document.createElement('iframe'); fr.title='Newsletter'; fr.style.cssText='border:0;width:100%;height:100%';
      ov.appendChild(fr); ov.appendChild(x); document.body.appendChild(ov); document.body.style.overflow='hidden';
      document.addEventListener('keydown',function k(e){ if(e.key==='Escape'&&ov){close();} }); }
    fr.onload=function(){ var d=fr.contentDocument; d.addEventListener('click',function(e){ var a=e.target.closest('a'); if(!a) return; var h=a.getAttribute('href')||'';
        if(h.indexOf('/newsletter')===0){ e.preventDefault(); open(h.split('#')[0]); }
        else if(h==='/'||h.indexOf('/#')===0){ e.preventDefault(); close(h.length>2?h.slice(1):'#topo'); }
        else if(h.charAt(0)==='/'){ e.preventDefault(); } }, true); };
    fr.srcdoc=html; return true;
  }
  document.addEventListener('click',function(e){ var a=e.target.closest('a'); if(!a) return; var h=a.getAttribute('href')||'';
    if(h.indexOf('/newsletter')===0 && open(h.split('#')[0])) e.preventDefault(); }, true);
})();
</script>"""
i = s.rfind('</body>')
s = s[:i] + reader + '\n' + s[i:]
out = os.path.join(os.path.dirname(W), 'dist-standalone', 'home-adriana-nogueira.html')
os.makedirs(os.path.dirname(out), exist_ok=True)
open(out, 'w', encoding='utf-8').write(s)
print(out, round(len(s.encode()) / 1e6, 2), 'MB')
