# adriana-nogueira.com: deploy no Google Cloud Run (Go)

## O que é este projeto
- `main.go` é o servidor em Go (só biblioteca padrão, sem dependências). Ele embute a pasta `web/` no binário e cuida de:
  - 301 de `adrianaport.vip`, `www.adrianaport.vip` e `www.adriana-nogueira.com` para `https://adriana-nogueira.com`;
  - 301 de todas as rotas antigas indexadas (`/cases/itau`, `/sobre` etc.) para as âncoras da página nova;
  - cabeçalhos de segurança: CSP com hash de cada script, HSTS, `X-Frame-Options` e outros;
  - gzip, ETag, cache longo para `/assets` e página 404 própria.
- `main_test.go` traz 7 testes (redirecionamentos, cabeçalhos, 404, gzip/ETag, arquivos de SEO e ausência de URLs do Manus).
- `web/` guarda o site: `index.html`, `politica-de-privacidade.html`, `404.html`, `robots.txt`, `sitemap.xml`, `llms*.txt`, `.well-known/security.txt` e `assets/`.
- `Dockerfile` roda os testes e gera o binário. A imagem final é *distroless*, sem shell e com usuário não-root.

## 1. Pré-requisitos (uma vez)
1. Crie um projeto em https://console.cloud.google.com e ative o faturamento. O Cloud Run tem cota gratuita mensal, e um site deste porte costuma ficar dentro dela.
2. Instale o Google Cloud CLI (`gcloud`) e faça login: `gcloud auth login`.
3. Ative as APIs: `gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com`.
4. Ative a **verificação em duas etapas** na conta Google (Política de Segurança, camada 9).

## 2. Publicar
Rode `./deploy.sh SEU_PROJECT_ID`, ou rode o comando equivalente:
```
gcloud run deploy adriana-site --source . --region us-east1 \
  --allow-unauthenticated --min-instances 0 --max-instances 3 \
  --cpu 1 --memory 256Mi --concurrency 80 --project SEU_PROJECT_ID
```
Ao final, o terminal mostra uma URL `https://adriana-site-xxxx.run.app`. **Revise o site nesse endereço antes de mudar o DNS** (portão humano).

> Região: o mapeamento de domínio próprio do Cloud Run não existe em todas as regiões (São Paulo, `southamerica-east1`, não está na lista). Por isso o padrão é `us-east1`. Confirme a lista atual no console antes de escolher. Com o gzip e o cache, a latência para o Brasil fica aceitável.

## 2b. Formulário de contato (Go + Resend)
O formulário do site é próprio (o Tally saiu). Ele pede nome, e-mail, nome da empresa, site da empresa e mensagem, com consentimento LGPD obrigatório, proteção contra robôs e limite de 5 envios por IP a cada 10 minutos. `POST /api/contato` entrega a mensagem por e-mail pelo Resend. Nada é gravado em banco, e os logs não guardam dados pessoais.
1. No Resend, verifique o domínio `adriana-nogueira.com`. Os registros DNS (SPF/DKIM) entram na HostGator **sem apagar os MX do Google Workspace**.
2. Crie uma chave de API no Resend e guarde-a no Secret Manager (uma vez):
```
printf 'SUA_CHAVE' | gcloud secrets create resend-api-key --data-file=- --project SEU_PROJECT_ID
```
3. O `deploy.sh` já passa `RESEND_API_KEY` (do segredo) e `CONTACT_TO=contato-assessoria@adriana-nogueira.com`. Opcional: `CONTACT_FROM` (padrão `Site Adriana Nogueira <site@adriana-nogueira.com>`).
4. Sem a chave, o formulário responde com uma mensagem amigável que indica o e-mail de contato.
Todo botão de diagnóstico, newsletter ou case do site leva a este formulário, com a origem preenchida e uma mensagem inicial sugerida.

## 3. Domínio
1. Verifique o domínio no Google: `gcloud domains verify adriana-nogueira.com`. O Search Console abre e pede um registro TXT: crie esse TXT na HostGator. A mesma verificação já serve para o Search Console depois.
2. Mapeie o domínio e o www:
```
gcloud beta run domain-mappings create --service adriana-site --domain adriana-nogueira.com --region us-east1
gcloud beta run domain-mappings create --service adriana-site --domain www.adriana-nogueira.com --region us-east1
```
3. O comando mostra os registros DNS. Crie **exatamente os que ele mostrar** na zona DNS da HostGator. Normalmente são:
   - `@`: 4 registros **A** (`216.239.32.21`, `216.239.34.21`, `216.239.36.21`, `216.239.38.21`) e 4 registros **AAAA**.
   - `www`: **CNAME** `ghs.googlehosted.com.`
   - Apague o A antigo `162.240.81.81`. **Não mexa nos registros MX, SPF, DKIM e DMARC** do Google Workspace.
4. O certificado HTTPS é emitido sozinho, em cerca de 15 a 60 minutos.
5. `adrianaport.vip`: repita os passos 1 a 3 para esse domínio (e o www) no **mesmo serviço**. O servidor já responde com 301 para o domínio novo.

## 4. Depois de no ar
- Search Console: adicione a propriedade `adriana-nogueira.com`, envie `https://adriana-nogueira.com/sitemap.xml` e, na propriedade antiga `adrianaport.vip`, use **Mudança de endereço**.
- Teste os cabeçalhos em https://securityheaders.com e o desempenho em https://pagespeed.web.dev.

## Pré-visualizar no computador (antes de publicar)
- **Windows:** dê dois cliques em `Previa-Site-Adriana-Nogueira.exe`. Uma janela preta se abre e o navegador mostra o site em `http://127.0.0.1:8080`. Para encerrar, feche a janela preta.
  - Na primeira vez, o Windows pode mostrar "O Windows protegeu o computador", porque o programa não é assinado. Clique em **Mais informações → Executar assim mesmo**.
- **Com Go instalado:** rode `go run .` nesta pasta.
- A pré-visualização só aceita acessos do próprio computador (127.0.0.1).

## Cases (conteúdo original)
- Os 5 cases (BEE4, Itaú, Guide, Modal e Empiricus) são os **componentes React originais** do portfólio, compilados só com o necessário (`web/cases-app/assets`). Cada card da página abre o case completo, com imagens, vídeos (YouTube/Vimeo) e resultados.
- **SEO:** cada case é servido pelo Go em `/cases/<case>` (os mesmos endereços que o Google já indexou) como **HTML pré-renderizado** (`web/cases/*.html`). O texto já chega pronto para o Google, com título, descrição, canonical, Open Graph e dados estruturados (CreativeWork; FAQPage no Itaú e na Guide). Os cases também estão no `sitemap.xml`.
- Para atualizar um case: edite o componente no repositório, rode `vite build -c vite.cases.config.ts`, copie `assets/` e `cases-app.html` (como `template.html`) para `web/cases-app/`, suba o servidor (`PORT=8090 go run .`) e rode `node tools/prerender.mjs http://127.0.0.1:8090`.
- O arquivo único para abrir sem servidor é gerado com `python3 make_standalone.py` (saída em `dist-standalone/`).
- Imagens que ficaram no armazenamento do Manus (`/manus-storage/...`) estão faltando. A página esconde imagens que não carregam. Para repor, salve o arquivo original em `web/manus-storage/` com o mesmo nome.

## Newsletter (página própria, gerada em Go)
- Layout de revista: destaque grande, quatro textos ao lado, "Últimas publicadas" e "Café com Caos no LinkedIn". A home mostra só **3 textos** (os marcados com `destaque` ou, na falta deles, os mais recentes).
- Cada edição tem botões de compartilhar (WhatsApp, Facebook, X, LinkedIn), **Resumo** gerado com IA e supervisionado pela autora (campo `aiSummary` no JSON ou `resumo_ia_1..3` no Markdown), "Matérias relacionadas" e o link para seguir no LinkedIn.
- Endereços: `/newsletter` (todas as edições) e `/newsletter/edicao-N` (texto completo). As rotas antigas `/artigos` e `/blog` redirecionam para `/newsletter`.
- As páginas são geradas por `go run ./tools/gennews` a partir de `content/editions.json` (edições com texto completo), `content/articles.json` (artigos avulsos, ex.: `/newsletter/branding-mercado-financeiro-2026`) e `content/newsletter-extra.json` (artigos do LinkedIn e edições pendentes).
- **Nova edição (escrever e publicar):**
  1. Copie `content/edicoes/_modelo.md` para `content/edicoes/<número>.md` (ex.: `4.md`).
  2. Preencha o cabeçalho (numero, titulo, subtitulo, data, tags, resumo) e escreva o **texto completo** em Markdown: `##` subtítulo, `**negrito**`, `*itálico*`, `- lista`, `> citação`, `[link](https://...)`.
  3. Rode `go run ./tools/gennews`. O gerador cria `/newsletter/edicao-N` com o texto completo, põe o card no topo do carrossel da home (com "Leia o texto completo →") e acrescenta a URL no `sitemap.xml`.
  4. Rode `go test ./...` e publique.
- **Regra: só edições completas.** Texto com menos de 150 palavras, sem título, sem resumo ou com data inválida é recusado e nada é publicado. Um teste confere que todo card da newsletter abre uma página com o texto completo.
- Os cards da home ficam entre `<!-- NEWS:START -->` e `<!-- NEWS:END -->` em `web/index.html` e são reescritos pelo gerador; não edite esse trecho à mão.
- Edições #4, #6 e #7 antigas: só havia título e resumo. Estão fora do site (`newsletter-extra.json`, chave `pending`). Se o texto completo aparecer, publique pelo passo acima.
- O HTML do corpo passa por uma lista de tags permitidas (sem scripts nem atributos perigosos).

Edite os arquivos em `web/`, rode `go test ./...` e depois `./deploy.sh SEU_PROJECT_ID`. Os hashes da CSP são recalculados sozinhos na inicialização, então editar um script inline não quebra a política.
