// Pré-renderiza os 5 cases (SEO): abre cada /cases/<case> no servidor Go local,
// espera o React montar a página e grava web/cases/<case>.html com o HTML pronto.
// Uso: PORT=8090 go run . &  depois  node tools/prerender.mjs http://127.0.0.1:8090
import fs from 'node:fs';
import path from 'node:path';
const PW = process.env.PLAYWRIGHT_PATH || 'playwright';
const { chromium } = await import(PW);
const base = process.argv[2] || 'http://127.0.0.1:8090';
const web = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'web');
const tpl = fs.readFileSync(path.join(web, 'cases-app', 'template.html'), 'utf8');
const SITE = 'https://adriana-nogueira.com';
const cases = {
  bee4: 'BEE4', itau: 'Itaú Unibanco', guide: 'Guide Investimentos', modal: 'Banco Modal (modalmais)', empiricus: 'Empiricus Research',
};
const faq = JSON.parse(fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), 'faq.json'), 'utf8'));
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
fs.mkdirSync(path.join(web, 'cases'), { recursive: true });
const b = await chromium.launch();
for (const [slug, org] of Object.entries(cases)) {
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.goto(`${base}/cases/${slug}`, { waitUntil: 'load' });
  await p.waitForTimeout(1500);
  // rola a página para disparar as animações de entrada (conteúdo visível no HTML final)
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 500) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(90); }
  await p.waitForTimeout(1200);
  const data = await p.evaluate(() => {
    const root = document.getElementById('root');
    root.querySelectorAll('[style*="opacity: 0"]').forEach(e => { e.style.opacity = ''; e.style.transform = ''; });
    return {
      html: root.innerHTML,
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.content || '',
      h1: document.querySelector('h1')?.textContent?.trim() || '',
      img: [...document.images].map(i => i.src).find(u => /\/images\/logos\//.test(u)) || '',
    };
  });
  const url = `${SITE}/cases/${slug}`;
  const title = data.title && !/^Case \|/.test(data.title) ? data.title : `${org} | Case de Adriana Nogueira`;
  const desc = data.desc || `Case ${org}: estratégia, conteúdo e resultados de Adriana Nogueira, especialista em comunicação e marketing (CEA ANBIMA).`;
  const ld = {
    '@context': 'https://schema.org', '@type': 'CreativeWork', name: title, headline: data.h1 || org,
    description: desc, url, inLanguage: 'pt-BR',
    author: { '@type': 'Person', name: 'Adriana Nogueira', url: SITE + '/', sameAs: ['https://www.linkedin.com/in/adriana-nogueira-cea-marketing3/'] },
    about: { '@type': 'Organization', name: org },
    isPartOf: { '@type': 'WebSite', name: 'Adriana Nogueira | Portfólio', url: SITE + '/' },
  };
  const seo = [
    `<meta name="description" content="${esc(desc)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta property="og:type" content="article" /><meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:title" content="${esc(title)}" /><meta property="og:description" content="${esc(desc)}" />`,
    `<meta property="og:url" content="${url}" /><meta property="og:image" content="${SITE}/assets/ovelha-og.png" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(ld)}</script>`,
    ...(faq[slug] ? [`<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faq[slug].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    }).replace(/</g, '\\u003c')}</script>`] : []),
  ].join('\n');
  let out = tpl.replace('<!--SEO-->', seo)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace('<div id="root"></div>', `<div id="root">${data.html}</div>`);
  fs.writeFileSync(path.join(web, 'cases', `${slug}.html`), out);
  console.log(slug, '|', title, '|', Math.round(out.length / 1024) + ' KB');
  await p.close();
}
await b.close();
