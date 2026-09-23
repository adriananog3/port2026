import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ExternalLink, TrendingUp, Users, BarChart3, Megaphone, Video, Award, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Tv, Mic, Newspaper, Globe, Play, Radio } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import AnimatedSection from "@/components/AnimatedSection";

export default function ProjectGuide() {
  useSEO({
    title: "Guide Investimentos | Analista de Marketing Sênior | Adriana Nogueira",
    description: "Case Guide Investimentos: Estratégias de marketing, conteúdo e comunicação para corretora de investimentos. Campanhas de aquisição, branding e posicionamento no mercado financeiro.",
    canonical: "/cases/guide",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Cases", url: "/#cases-empresas" },
      { name: "Guide Investimentos", url: "/cases/guide" }
    ],
    ogImage: "/assets/ovelha-og.jpg",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": "Case Guide Investimentos - Marketing & Comunicação",
        "author": { "@type": "Person", "name": "Adriana Nogueira" },
        "about": { "@type": "Organization", "name": "Guide Investimentos" },
        "description": "Estratégias de marketing, conteúdo e comunicação para corretora de investimentos."
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adrianaport.vip" },
          { "@type": "ListItem", "position": 2, "name": "Cases", "item": "https://adrianaport.vip/cases" },
          { "@type": "ListItem", "position": 3, "name": "Guide Investimentos", "item": "https://adrianaport.vip/cases/guide" }
        ]
      }
    ]
  });

  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [playingVideo, setPlayingVideo] = useState(false);

  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  // Guide brand colors - using CSS variables
  const colors = {
    bgDark: "var(--guide-bg-dark)",
    bgMid: "var(--guide-bg-mid)",
    bgCard: "var(--guide-bg-card)",
    green: "var(--guide-green)",
    greenMuted: "var(--guide-green-muted)",
    pink: "var(--guide-pink)",
    pinkMuted: "var(--guide-pink-muted)",
    teal: "var(--guide-teal)",
    white: "var(--guide-white)",
  };

  return (
    <div className="min-h-screen text-foreground selection:bg-secondary selection:text-secondary-foreground flex flex-col" style={{ background: colors.bgDark, fontFamily: "'Open Sans', sans-serif" }}>
      {/* Skip to content */}
      <a 
        href="#guide-main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--guide-green)] focus:text-black focus:rounded-md focus:text-sm focus:font-semibold"
      >
        Pular para o conteúdo principal
      </a>

      {/* ========== BLOCO 1: SOBRE A EMPRESA ========== */}
      <section 
        id="guide-main-content" 
        aria-label="Sobre a Guide" 
        className="pt-6 md:pt-8 pb-12 md:pb-20 relative overflow-hidden"
        style={{ background: `radial-gradient(ellipse at center, var(--guide-teal) 0%, ${colors.bgMid} 30%, ${colors.bgDark} 70%, #091e1d 100%)` }}
      >
        {/* Candlestick decorative elements */}
        <div className="hidden md:block absolute top-[5%] right-[12%] w-[2px] h-[80px] bg-[var(--guide-green)] opacity-[0.25]"></div>
        <div className="hidden md:block absolute top-[5%] right-[12%] translate-y-[20px] w-[8px] h-[40px] bg-[var(--guide-green)] opacity-[0.15] -translate-x-[3px]"></div>
        <div className="hidden md:block absolute top-[15%] right-[8%] w-[2px] h-[60px] bg-[var(--guide-pink)] opacity-[0.25]"></div>
        <div className="hidden md:block absolute top-[15%] right-[8%] translate-y-[10px] w-[8px] h-[40px] bg-[var(--guide-pink)] opacity-[0.15] -translate-x-[3px]"></div>
        <div className="hidden md:block absolute bottom-[10%] left-[5%] w-[2px] h-[70px] bg-[var(--guide-green)] opacity-[0.15]"></div>
        <div className="hidden md:block absolute top-[60%] right-0 w-[6%] h-[1px] bg-[var(--guide-green)] opacity-[0.08]"></div>

        <div className="container relative z-10">


          {/* Logo + Company Name */}
          <div
            className="flex flex-col items-center text-center mb-8 md:mb-16"
          >
            <img 
              src="/images/logos/guide-icon.jpg" 
              alt="Logo da Guide Investimentos" 
              className="w-24 h-24 object-contain mb-6 rounded-xl" 
            />
            <h1 className="text-[32px] md:text-[42px] font-light tracking-wide text-white" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Guide Investimentos
            </h1>
            <div className="mt-2 mb-4 h-[2px] w-[400px] max-w-full mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #898989, #C9A96E 50%, #898989, transparent)' }} />
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[15px] md:text-[17px] font-semibold tracking-[0.02em]" style={{ fontFamily: "'Open Sans', sans-serif", color: 'rgba(255,255,255,0.7)' }}>Analista Sênior de Marketing</span>
            </div>
            <p className="text-[14px] text-white/50 mb-4">Abril 2021 - Julho 2022</p>
            <div className="flex gap-2 flex-wrap justify-center mt-4">
              {["Guide Trader", "O Guia Financeiro", "PR & Imprensa", "Campanhas", "SEO", "Storytelling", "Redes Sociais", "B2C", "YouTube", "Podcasts"].map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-medium border" style={{ backgroundColor: `${colors.pink}15`, color: colors.pink, borderColor: `${colors.pink}30` }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sobre a empresa */}
          <div
            className="max-w-4xl mx-auto"
          >
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-8 text-center md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>Sobre a Guide Investimentos</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-red)]"></span>
              </span>
            </h2>
            </AnimatedSection>

            <div className="space-y-6 text-[16px] md:text-[18px] text-white leading-relaxed">
              <p>
                A <strong className="font-bold text-white">Guide</strong> era uma corretora de valores brasileira focada em democratizar o acesso ao mercado de capitais, oferecendo plataformas digitais para investimentos em ações, fundos, renda fixa e outros ativos. Depois, foi adquirida e incorporada pelo <strong className="font-bold text-white">Banco Safra</strong> e <strong className="font-bold text-white">Safra Asset</strong>.
              </p>
              <p>
                Atuei como <strong className="font-bold text-white">Analista Sênior de Marketing</strong>, responsável pela comunicação de ponta a ponta e lançamento do segmento <strong className="font-bold text-white">"Guide Trader"</strong>, coordenando estratégias de PR para ampliar a presença da marca na mídia especializada e construir autoridade no segmento de trading.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <a 
                href="/manus-storage/case-guide-investimentos_317cabf4.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ backgroundColor: colors.pink, color: '#ffffff' }}
              >
                <ExternalLink className="w-5 h-5" />
                Ver pitch completo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px]" style={{ backgroundColor: colors.green, opacity: 0.3 }}></div>

      {/* ========== BLOCO 2: LANÇAMENTOS DE PRODUTO ========== */}
      <section className="py-12 md:py-20 relative overflow-hidden" style={{ background: colors.bgDark }}>
        <div className="hidden md:block absolute right-[5%] top-[10%] w-[2px] h-[50px] bg-[var(--guide-green)] opacity-[0.1]"></div>

        <div className="container relative z-10">
          <div
            className="max-w-5xl mx-auto"
          >
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-4 text-center">
              <span className="relative inline-block pb-2">
                <span>Lançamentos de Produto</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-red)]"></span>
              </span>
            </h2>
            </AnimatedSection>
            <p className="text-[16px] italic text-white/90 text-center mb-12">Dois grandes lançamentos que marcaram o período</p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* O Guia Financeiro */}
              <div
                className="rounded-xl p-6 md:p-8 border flex flex-col" style={{ backgroundColor: colors.bgCard, borderColor: `${colors.green}15` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src="/manus-storage/guia-financeiro-logo_ed85cafb.png" alt="O Guia Financeiro" className="w-12 h-12 object-contain" />
                  <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${colors.green}15`, color: colors.green }}>Agosto 2021</span>
                </div>
                <h3 className="text-[19px] md:text-[24px] font-bold text-white mb-4">O Guia Financeiro</h3>
                <p className="text-[16px] text-white leading-relaxed mb-4">
                  Primeira <strong className="font-bold text-white">plataforma de streaming de educação financeira do Brasil</strong>. Lançada com 20 séries, 100 episódios, playlists recomendadas e relatórios exclusivos. Meta declarada: 200 mil assinantes.
                </p>
                <div className="space-y-3 text-[17px] text-white/90 leading-relaxed mb-4">
                  <p>Plataforma disponível em web + app iOS/Android, com questionário de perfil no primeiro acesso e jornada personalizada para iniciantes, intermediários e avançados.</p>
                  <p>Incluía mentorias exclusivas com turmas reduzidas e conteúdos em múltiplos formatos e durações. Projeto liderado por Loni Batist, Diretora da Guide Life.</p>
                </div>
                <div className="mt-auto pt-4">
                  <p className="text-[15px] text-white/70 uppercase tracking-wider font-semibold mb-2">Cobertura na imprensa:</p>
                  <div className="space-y-2">
                    <a href="https://einvestidor.estadao.com.br/educacao-financeira/plataforma-de-streaming-de-financas/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--guide-pink)] underline-offset-4 hover:underline transition-colors">
                      <ExternalLink className="w-3 h-3 flex-shrink-0" /> <span><strong className="font-semibold" style={{ color: "#C9A96E" }}>E-Investidor (Estadão)</strong> <span className="text-white/70">· Jul/2021</span></span>
                    </a>
                    <a href="https://www.cnnbrasil.com.br/viagemegastronomia/branded-content/viagem/guide-investimentos-lanca-primeiro-streaming-de-educacao-financeira/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--guide-pink)] underline-offset-4 hover:underline transition-colors">
                      <ExternalLink className="w-3 h-3 flex-shrink-0" /> <span><strong className="font-semibold" style={{ color: "#C9A96E" }}>CNN Brasil</strong> <span className="text-white/70">· Ago/2021</span></span>
                    </a>
                    <a href="https://www.panoramadenegocios.com.br/guide-investimentos-lanca-plataforma-de-streaming-de-educacao-financeira/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--guide-pink)] underline-offset-4 hover:underline transition-colors">
                      <ExternalLink className="w-3 h-3 flex-shrink-0" /> <span><strong className="font-semibold" style={{ color: "#C9A96E" }}>Panorama de Negócios</strong> <span className="text-white/70">· Set/2021</span></span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Guide Trader */}
              <div
                className="rounded-xl border overflow-hidden flex flex-col" style={{ backgroundColor: colors.bgCard, borderColor: `${colors.pink}15` }}
              >
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.pink}15` }}>
                      <TrendingUp className="w-6 h-6" style={{ color: colors.pink }} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${colors.pink}15`, color: colors.pink }}>Maio 2022</span>
                  </div>
                  <h3 className="text-[19px] md:text-[24px] font-bold text-white mb-4">Guide Trader</h3>
                  <p className="text-[16px] text-white leading-relaxed mb-4">
                    <strong className="font-bold text-white">Conta exclusiva para o mercado de day trade</strong>, com ferramentas de monitoramento em tempo real, equipe especializada e Sala de Trade ao Vivo diária com Cris Natividade (9h–12h).
                  </p>
                  <a href="https://www.figma.com/design/0uXOWD9C3ta0MDc79Q1itC/LP_Daytrade?node-id=314-1364&p=f" target="_blank" rel="noopener noreferrer" className="block rounded-lg overflow-hidden border mb-4 transition-transform duration-300 hover:scale-[1.02]" style={{ borderColor: `${colors.pink}30` }} aria-label="Ver a landing page do Guide Trader no Figma">
                    <img
                      src="/images/guide-trader-lp.webp"
                      alt="Landing page de lançamento do Guide Trader: tela de negociação com gráfico de candles e botões Buy e Sell, título Mais rapidez e eficiência no gerenciamento de risco e botão Quero entrar na lista de espera"
                      width={1192} height={857} loading="lazy"
                      className="w-full h-auto block"
                    />
                  </a>
                  <p className="text-[13px] text-white/60 -mt-2 mb-4">Landing page de lançamento com lista de espera (2022).</p>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedCards['guide-trader'] ? 'max-h-[600px]' : 'max-h-0'}`}>
                    <div className="space-y-3 text-[17px] text-white/90 leading-relaxed mb-4">
                      <p>Promoção de lançamento com cashback de R$200 para clientes que operassem na plataforma. Head de Renda Variável: Rogério Manente. Influenciador principal: Cris Natividade (professor, analista CNPI-T).</p>
                      <p>Conta separada das demais aplicações, com cursos de educação financeira integrados e suporte especializado para traders.</p>
                      <div className="mt-4 space-y-2">
                        <p className="text-[15px] text-white/70 uppercase tracking-wider font-semibold mb-2">Cobertura na imprensa:</p>
                        <a href="https://valor.globo.com/conteudo-de-marca/guide-investimentos/noticia/2022/05/30/guide-investimentos-lanca-conta-exclusiva-para-o-mercado-de-trading.ghtml" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--guide-pink)] underline-offset-4 hover:underline transition-colors">
                          <ExternalLink className="w-3 h-3 flex-shrink-0" /> <span><strong className="font-semibold" style={{ color: "#C9A96E" }}>Valor Econômico</strong> <span className="text-white/70">· Mai/2022</span></span>
                        </a>
                        <a href="https://br.investing.com/analysis/nome-na-lista-nova-conta-exclusiva-para-traders-surpreende-e-tem-fila-de-espera-200450132" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--guide-pink)] underline-offset-4 hover:underline transition-colors">
                          <ExternalLink className="w-3 h-3 flex-shrink-0" /> <span><strong className="font-semibold" style={{ color: "#C9A96E" }}>Investing.com</strong> <span className="text-white/70">· Jun/2022</span></span>
                        </a>
                        <a href="https://crcnews.com.br/corporativo/guide-oferece-r-200-em-cashback-para-clientes-que-operarem-em-plataforma-de-trading/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--guide-pink)] underline-offset-4 hover:underline transition-colors">
                          <ExternalLink className="w-3 h-3 flex-shrink-0" /> <span><strong className="font-semibold" style={{ color: "#C9A96E" }}>CRC News</strong> <span className="text-white/70">· Ago/2022</span></span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-auto pt-4">
                    <button 
                      onClick={() => toggleCard('guide-trader')}
                      className="text-sm font-medium hover:underline flex items-center gap-1" style={{ color: colors.pink }}
                    >
                      {expandedCards['guide-trader'] ? 'Ver menos' : 'Continuar lendo'}
                      {expandedCards['guide-trader'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <a 
                      href="https://www.figma.com/design/0uXOWD9C3ta0MDc79Q1itC/LP_Daytrade?node-id=314-1364&p=f" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: colors.pink, color: '#ffffff' }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Acessar projeto
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px]" style={{ backgroundColor: colors.pink, opacity: 0.3 }}></div>

      {/* ========== BLOCO 3: CAMPANHAS DE MARKETING ========== */}
      <section className="py-12 md:py-20 relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${colors.bgDark} 0%, var(--guide-bg) 100%)` }}>
        <div className="container relative z-10">
          <div
            className="max-w-5xl mx-auto"
          >
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-4 text-center">
              <span className="relative inline-block pb-2">
                <span>Campanhas de Marketing</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-red)]"></span>
              </span>
            </h2>
            </AnimatedSection>
            <p className="text-[16px] italic text-white/90 text-center mb-12">Desenvolvidas pela agência Ana Couto</p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: '"Você investe na vida, a Guide faz render"',
                  date: "Maio 2021",
                  desc: "3 filmes publicitários com narração de Milhem Cortaz (Tropa de Elite). Direção de Felipe Briso, produtora bigBonsai. Programetes com especialistas em TV e rádio.",
                  channels: "TV paga, rádio, portais, mídias digitais",
                  link: "https://revistalivemarketing.com.br/guide-lanca-campanha-para-reforcar-marca-como-guia-na-vida-do-investidor/",
                  linkLabel: "Revista Live Marketing",
                  color: colors.green,
                },
                {
                  title: "Black Friday Guide - CDB 250% do CDI",
                  date: "Novembro 2021",
                  desc: "CDB pagando 250% do CDI como produto-âncora. Campanha apoiada por influenciadores como Rodaika e Daniel Carraretto.",
                  channels: "Digital, redes sociais, influenciadores",
                  link: "https://marcaspelomundo.com.br/agencias/ana-couto-apresenta-campanha-de-black-friday-para-a-guide/",
                  linkLabel: "Marcas pelo Mundo",
                  color: colors.pink,
                },
                {
                  title: '"Ideias que Guiam"',
                  date: "2020–2021",
                  desc: "Continuação da campanha institucional com ações de combate à covid-19 e tira-dúvidas com hashtag #QueroumGuia, impactando milhões de pessoas.",
                  channels: "Redes sociais",
                  link: "",
                  linkLabel: "",
                  color: colors.green,
                },
                {
                  title: "CDB Pré-fixado 16% a.a.",
                  date: "Maio 2022",
                  desc: "Produto promocional exclusivo para novos clientes com ampla cobertura na imprensa financeira especializada.",
                  channels: "Digital, imprensa",
                  link: "https://www.seudinheiro.com/2022/renda-fixa/guide-lanca-cdb-pre-fixado-que-rende-16-ao-ano-para-novos-clientes-mas-a-oferta-e-limitada-confira-os-detalhes-e-prazos-lvit/",
                  linkLabel: "Seu Dinheiro",
                  color: colors.pink,
                },
              ].map((campaign, i) => (
                <div
                  key={i}
                  className="rounded-xl p-6 border hover:shadow-lg transition-all duration-300 flex flex-col"
                  style={{ backgroundColor: colors.bgCard, borderColor: `${campaign.color}15`, }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${campaign.color}15`, color: campaign.color }}>
                      {campaign.date}
                    </span>
                  </div>
                  <h4 className="font-bold text-[17px] text-white mb-3">{campaign.title}</h4>
                  <p className="text-[17px] text-white/90 mb-3 leading-relaxed">{campaign.desc}</p>
                  <p className="text-[15px] text-white/70 mb-4">
                    <span className="font-semibold">Canais:</span> {campaign.channels}
                  </p>
                  <div className="mt-auto pt-2">
                    {campaign.link ? (
                      <a 
                        href={campaign.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium hover:underline transition-colors"
                        style={{ color: campaign.color }}
                      >
                        <ExternalLink className="w-3 h-3" />
                        {campaign.linkLabel}
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: colors.pink, opacity: 0.7 }}>
                        Sem link disponível
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Vídeo da Campanha */}
            <div className="mt-12">
              <h3 className="text-[19px] font-semibold text-white mb-4 text-center">Vídeo da Campanha</h3>
              <div className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/10">
                {!playingVideo ? (
                  <div 
                    className="relative cursor-pointer group"
                    onClick={() => setPlayingVideo(true)}
                  >
                    <img 
                      src="https://img.youtube.com/vi/amh-IqvVCTo/maxresdefault.jpg" 
                      alt="Campanha Guide Investimentos - Você investe na vida, a Guide faz render"
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#E84228] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" className="ml-1">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm md:text-base font-semibold drop-shadow-lg">"Você investe na vida, a Guide faz render" - Campanha com Milhem Cortaz</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/amh-IqvVCTo?autoplay=1"
                      title="Campanha Guide Investimentos"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px]" style={{ backgroundColor: colors.green, opacity: 0.3 }}></div>

      {/* ========== BLOCO 4: CONTEÚDO YOUTUBE ========== */}
      <section className="py-12 md:py-20 relative overflow-hidden" style={{ background: colors.bgDark }}>
        <div className="container relative z-10">
          <div
            className="max-w-5xl mx-auto"
          >
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-4 text-center">
              <span className="relative inline-block pb-2">
                <span>Conteúdo em Vídeo - YouTube</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-red)]"></span>
              </span>
            </h2>
            </AnimatedSection>
            <p className="text-[16px] italic text-white/90 text-center mb-4">
              Canal <a href="https://www.youtube.com/@GuideInvestimentosCorretora" target="_blank" rel="noopener noreferrer" className="text-[var(--guide-pink)] underline underline-offset-4 hover:opacity-80 transition-colors">@GuideInvestimentosCorretora</a> - 33,6 mil inscritos
            </p>
            <p className="text-[16px] text-white text-center mb-12">
              Produção estimada de <strong className="font-bold text-white text-[20px]">+800 vídeos</strong> no período
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: <Play className="w-5 h-5" />, title: "Morning Call", freq: "Diário (seg–sex)", desc: "Análises matinais do mercado, a partir das 8h30", link: "https://m.youtube.com/playlist?list=PLV7w39MBe4Y-FWWBdKfjrRp-iKpcKeK-k", color: colors.green },
                { icon: <BarChart3 className="w-5 h-5" />, title: "Fechamento de Mercado", freq: "Diário (seg–sex)", desc: "Resumo do pregão e perspectivas para o dia seguinte", link: "https://www.youtube.com/playlist?list=PLV7w39MBe4Y_P60dVh-VedFkYlPqqMpVR", color: colors.green },
                { icon: <Video className="w-5 h-5" />, title: "Sala ao Vivo", freq: "Diário (a partir de Abr/2022)", desc: "Day trade ao vivo com Cris Natividade, 9h–12h", link: "https://www.youtube.com/watch?v=OF49zKPwlu0", color: colors.pink },
                { icon: <TrendingUp className="w-5 h-5" />, title: "Upgrade de Carteira", freq: "Semanal", desc: "Conteúdo educacional sobre investimentos", link: "", color: colors.green },
                { icon: <Megaphone className="w-5 h-5" />, title: 'Guide 60"', freq: "Regular", desc: "Análises rápidas de 1 minuto sobre temas do mercado", link: "", color: colors.pink },
                { icon: <Award className="w-5 h-5" />, title: "Carteiras Recomendadas", freq: "Mensal", desc: "FIIs, Ações, BDRs, Small Caps, Dividendos", link: "", color: colors.green },
              ].map((serie, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5 border hover:border-opacity-50 transition-all duration-300 flex flex-col"
                  style={{ backgroundColor: colors.bgCard, borderColor: `${serie.color}15` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${serie.color}15`, color: serie.color }}>
                      {serie.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-[17px] text-white">{serie.title}</h4>
                      <span className="text-[12px] text-white/70">{serie.freq}</span>
                    </div>
                  </div>
                  <p className="text-[14px] text-white/90 leading-relaxed mb-3 flex-1">{serie.desc}</p>
                  {serie.link ? (
                    <a 
                      href={serie.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium hover:underline transition-colors mt-auto"
                      style={{ color: colors.pink }}
                    >
                      <ExternalLink className="w-3 h-3" /> Assistir
                    </a>
                  ) : (
                    <span className="text-[11px] mt-auto" style={{ color: colors.pink }}>Sem link disponível</span>
                  )}
                </div>
              ))}
            </div>

            {/* Retrospectiva */}
            <div
              className="mt-6 rounded-xl p-5 border flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
              style={{ backgroundColor: colors.bgCard, borderColor: `${colors.green}15` }}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${colors.green}15` }}>
                  <Video className="w-5 h-5" style={{ color: colors.green }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[17px] text-white">Retrospectiva 2021</h4>
                  <p className="text-[14px] text-white/90 leading-snug">Vídeo especial resumindo o cenário econômico do ano</p>
                </div>
              </div>
              <a href="https://www.youtube.com/watch?v=apLeIEmLqpM" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium hover:underline transition-colors self-start sm:self-center flex-shrink-0 ml-13 sm:ml-0" style={{ color: colors.pink }}>
                <ExternalLink className="w-3 h-3" /> Assistir
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px]" style={{ backgroundColor: colors.pink, opacity: 0.3 }}></div>

      {/* ========== BLOCO 5: COBERTURA NA IMPRENSA ========== */}
      <section className="py-12 md:py-20 relative overflow-hidden" style={{ background: `linear-gradient(180deg, var(--guide-bg) 0%, ${colors.bgDark} 100%)` }}>
        <div className="container relative z-10">
          <div
            className="max-w-5xl mx-auto"
          >
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-4 text-center">
              <span className="relative inline-block pb-2">
                <span>Cobertura na Imprensa</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-red)]"></span>
              </span>
            </h2>
            </AnimatedSection>
            <p className="text-[16px] italic text-white/90 text-center mb-12">Matérias publicadas em veículos especializados</p>

            <div className="space-y-3">
              {[
                { veiculo: "Valor Investe", data: "Jan/2021", titulo: "Guide planeja dobrar número de agentes autônomos em 2021", tema: "Expansão comercial", link: "" },
                { veiculo: "Reuters/UOL", data: "Fev/2021", titulo: "Fosun fará nova injeção de capital na Guide de olho em IPO em 3 anos", tema: "Investimento do controlador", link: "" },
                { veiculo: "E-Investidor (Estadão)", data: "Jul/2021", titulo: "Guide lança plataforma de streaming de educação financeira", tema: "Guia Financeiro", link: "https://einvestidor.estadao.com.br/educacao-financeira/plataforma-de-streaming-de-financas/" },
                { veiculo: "CNN Brasil", data: "Ago/2021", titulo: "Guide Investimentos lança primeiro streaming de educação financeira", tema: "Guia Financeiro", link: "https://www.cnnbrasil.com.br/viagemegastronomia/branded-content/viagem/guide-investimentos-lanca-primeiro-streaming-de-educacao-financeira/" },
                { veiculo: "Money Times", data: "Dez/2021", titulo: "Guide Investimentos abre programa de estágio para 2022 com 21 vagas", tema: "Employer branding", link: "" },
                { veiculo: "Valor Econômico", data: "Mai/2022", titulo: "Guide Investimentos lança conta exclusiva para o mercado de trading", tema: "Guide Trader", link: "https://valor.globo.com/conteudo-de-marca/guide-investimentos/noticia/2022/05/30/guide-investimentos-lanca-conta-exclusiva-para-o-mercado-de-trading.ghtml" },
                { veiculo: "Investing.com", data: "Jun/2022", titulo: "Nova Conta Exclusiva para Traders Surpreende e Tem Fila de Espera", tema: "Guide Trader", link: "https://br.investing.com/analysis/nome-na-lista-nova-conta-exclusiva-para-traders-surpreende-e-tem-fila-de-espera-200450132" },
                { veiculo: "Seu Dinheiro", data: "Mai/2022", titulo: "Guide lança CDB pré-fixado que rende 16% ao ano para novos clientes", tema: "Produto", link: "https://www.seudinheiro.com/2022/renda-fixa/guide-lanca-cdb-pre-fixado-que-rende-16-ao-ano-para-novos-clientes-mas-a-oferta-e-limitada-confira-os-detalhes-e-prazos-lvit/" },
              ].map((materia, i) => (
                <div
                  key={i}
                  className="rounded-lg p-4 md:p-5 border flex flex-col md:flex-row md:items-center gap-3 md:gap-6 hover:border-opacity-50 transition-all duration-300"
                  style={{ backgroundColor: colors.bgCard, borderColor: `${colors.green}08` }}
                >
                  <div className="flex items-center gap-3 md:w-[180px] flex-shrink-0">
                    <Newspaper className="w-4 h-4 flex-shrink-0" style={{ color: colors.green }} />
                    <div>
                      <span className="text-[15px] font-semibold text-white block">{materia.veiculo}</span>
                      <span className="text-[12px] text-white/70">{materia.data}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-white leading-relaxed">{materia.titulo}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-medium" style={{ backgroundColor: `${colors.pink}15`, color: colors.pink }}>
                      {materia.tema}
                    </span>
                    {materia.link && (
                      <a href={materia.link} target="_blank" rel="noopener noreferrer" className="text-[var(--guide-pink)] hover:opacity-80 transition-colors" aria-label="Abrir matéria">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px]" style={{ backgroundColor: colors.green, opacity: 0.3 }}></div>

      {/* ========== BLOCO 6: PODCASTS & REDES SOCIAIS ========== */}
      <section className="py-12 md:py-20 relative overflow-hidden" style={{ background: colors.bgDark }}>
        <div className="container relative z-10">
          <div
            className="max-w-5xl mx-auto"
          >
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-12 text-center">
              <span className="relative inline-block pb-2">
                <span>Podcasts & Redes Sociais</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-red)]"></span>
              </span>
            </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Podcasts */}
              <div>
                <h3 className="text-[20px] font-semibold mb-6 flex items-center gap-2" style={{ color: colors.green }}>
                  <Mic className="w-5 h-5" /> Podcasts
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "O Guia Financeiro", platform: "Spotify", desc: "Conversas com líderes do mercado sobre educação financeira", link: "https://open.spotify.com/show/2kKT9UvT1Q8gpQGu07EQ85" },
                    { title: "Guide Investimentos", platform: "Spotify", desc: "Podcast institucional com análises e entrevistas", link: "https://open.spotify.com/show/3pbpZP5z62ExAqDAUKAmuH" },
                    { title: "Educação Financeira para todos", platform: "SoundCloud", desc: "Playlist educacional", link: "https://soundcloud.com/guideinvestimentos/sets/educacao-financeira-para-todos" },
                  ].map((pod, i) => (
                    <a 
                      key={i}
                      href={pod.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block rounded-lg p-4 border hover:border-opacity-50 transition-all duration-300 group"
                      style={{ backgroundColor: colors.bgCard, borderColor: `${colors.green}15` }}
                    >
                      <div className="flex items-start gap-3">
                        <Radio className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" style={{ color: colors.green }} />
                        <div>
                          <h4 className="font-bold text-[14px] text-white mb-1 group-hover:text-[var(--guide-green)] transition-colors">{pod.title}</h4>
                          <p className="text-[12px] text-white/70 mb-1">{pod.platform}</p>
                          <p className="text-[15px] text-white/90">{pod.desc}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Redes Sociais */}
              <div>
                <h3 className="text-[20px] font-semibold mb-6 flex items-center gap-2" style={{ color: colors.pink }}>
                  <Globe className="w-5 h-5" /> Redes Sociais
                </h3>
                <div className="space-y-4">
                  {[
                    { rede: "Instagram", perfil: "@guideinvestimentos", seguidores: "65 mil seguidores", posts: "1.409 posts", nota: 'Bio atual: "Agora somos Banco Safra!"' },
                    { rede: "YouTube", perfil: "@GuideInvestimentosCorretora", seguidores: "33,6 mil inscritos", posts: "2.500 vídeos", nota: "" },
                    { rede: "Facebook", perfil: "/guideinvestimentos", seguidores: "", posts: "Posts regulares", nota: "Recomendações de carteiras e produtos" },
                    { rede: "Twitter/X", perfil: "@guideinvest", seguidores: "", posts: "Campanhas com influenciadores", nota: "" },
                  ].map((rede, i) => (
                    <div 
                      key={i}
                      className="rounded-lg p-4 border"
                      style={{ backgroundColor: colors.bgCard, borderColor: `${colors.pink}15` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-[14px] text-white">{rede.rede}</h4>
                        {rede.seguidores && (
                          <span className="text-[12px] font-semibold" style={{ color: colors.pink }}>{rede.seguidores}</span>
                        )}
                      </div>
                      <p className="text-[15px] text-white/90">{rede.perfil}</p>
                      <p className="text-[12px] text-white/70 mt-1">{rede.posts}{rede.nota ? ` · ${rede.nota}` : ''}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px]" style={{ backgroundColor: colors.pink, opacity: 0.3 }}></div>

      {/* ========== BLOCO 7: LANDING PAGES ========== */}
      <section className="py-12 md:py-20 relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${colors.bgDark} 0%, var(--guide-bg) 100%)` }}>
        <div className="container relative z-10">
          <div
            className="max-w-5xl mx-auto"
          >
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-4 text-center">
              <span className="relative inline-block pb-2">
                <span>Landing Pages & Campanhas Digitais</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-red)]"></span>
              </span>
            </h2>
            </AnimatedSection>


            <LPCarousel colors={colors} items={[
                { name: "Realize Seu Sonho", path: "realizeseusonho/", period: "2021" },
                { name: "Mais Vida no Seu Dinheiro", path: "maisvidanoseudinheiro/", period: "2021" },
                { name: "Black Friday", path: "blackfriday/", period: "Nov/2021" },
                { name: "CDB 250", path: "cdb-250/", period: "Out–Nov/2021" },
                { name: "Conta Guia", path: "conta-guia/", period: "2021" },
                { name: "Newsletter Guide Trader", path: "newsletter-guide-trader/", period: "Jul/2022" },
                { name: "Promoção CDB Pré-fixado", path: "promocao-cdb-prefixado/", period: "2022" },
                { name: "Day Trade", path: "daytrade", period: "Mai/2022" },
                { name: "Agenda de Lives", path: "agendadelives/", period: "2021" },
                { name: "App Guia Financeiro", path: "app-guia-financeiro/", period: "2021" },
              ]} />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px]" style={{ backgroundColor: colors.pink, opacity: 0.3 }}></div>

      {/* ========== FAQ ========== */}
      <section className="py-12 md:py-20 bg-[var(--guide-bg-dark)] relative overflow-hidden">
        <div className="hidden md:block absolute top-[20%] right-[5%] w-[1px] h-[30%] bg-[var(--guide-green)] opacity-[0.06]"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-4 text-center">
              <span className="relative inline-block pb-2">
                <span>FAQ</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--guide-green)]"></span>
              </span>
            </h2>
            </AnimatedSection>
            <p className="text-[17px] text-white/90 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              Respostas detalhadas sobre minha atuação na <strong className="text-white">Guide Investimentos</strong> como Analista Sênior de Marketing.
            </p>

            <div className="space-y-3">
              {[
                { q: "Como era sua rotina real nessa função?", a: "Aqui era uma empresa sólida. Foi onde aprendi muita coisa por pegar as tarefas e assumi-las. Até então, por exemplo, não tinha conhecimento de escrita com releases, atuação com jornalistas ou PR como um todo, pois não sou formada em jornalismo - aprendi fazendo, praticando, perguntando para profissionais que já estavam há mais tempo na área." },
                { q: "Sobre o lançamento do Guide Trader: qual problema de negócio esse novo segmento resolvia?", a: "Me escolheram para esse projeto pelo mesmo motivo que me escolheram no Itaú para atuar no íon Trader: eu vim de um banco onde fui júnior e pleno que era desse segmento - o Banco Modal era dedicado a traders. Já tinha expertise nesse tipo de estratégia e lançamento de produtos com essa especificidade. Já havia escrito para um dos maiores traders do Brasil, o Leandro Martins. Isso contou muito nas experiências tanto da Guide quanto do Itaú." },
                { q: "Como você definiu o público-alvo desse segmento?", a: "Esse é um nicho de operações estratégicas do mercado financeiro. Ser Trader ou praticar day trade significa sair e entrar em operações com ações, dólar ou outras moedas no mesmo dia. Até então, a Guide atuava muito mais com modelo de assessoria para esse tipo de operação, e não havia como investidores arrojados realizarem esse tipo de operação no app da corretora. Percebeu-se um gap com a falta desse serviço, e me colocaram no projeto para atuar tanto na concepção do produto - quando nem havia cursos de product marketing no Brasil direito, eu já fazia isso sem saber - quanto no lançamento de campanha e depois criação de cursos, editorias e canais de distribuição." },
                { q: "Sobre a captação de ~4 mil clientes: qual canal foi mais responsável?", a: "Isso foi aquisição no lançamento: 4 mil traders, investidores com perfis arrojados, captados através de campanha integrada multicanal." },
                { q: "Você acompanhava o funil completo ou só topo (awareness)?", a: "Funil completo." },
                { q: "No trabalho com PR: como era a dinâmica com as agências?", a: "Era troca bem dinâmica de ambos os lados, com sugestões feitas das duas partes. A diferença é que a agência já ia atrás dos jornalistas ou programas certos que alinhamos estrategicamente. Comigo como ponto focal na Guide nessa frente." },
                { q: "Já teve alguma pauta recusada ou crise de comunicação?", a: "Pauta recusada é comum - alguém achar que não é o momento de comunicar certo assunto. Crise nunca teve. Fazia gestão reputacional e atuava previamente já alertando certos riscos em alinhamento com a agência." },
                { q: "Alguma matéria gerou impacto direto em tráfego ou clientes?", a: "Sim, na época para o site e lançamento de campanhas, ajudava muito. Relações Públicas era sempre mais prioritário como canal estratégico." },
                { q: "Sobre media training: quantos executivos você treinou?", a: "Cerca de 12 a 18 executivos. Não atuei em situações de crise, apenas treinamentos e acompanhamento presencial em entrevistas e podcasts." },
                { q: "No conteúdo multiplataforma: como funcionava a produção?", a: "Houve O Guia Financeiro, plataforma de educação da corretora, em que produzia conteúdos educacionais e artigos para blog. O Guia Financeiro deixou de existir após a compra pelo Safra." },
                { q: "Sobre SEO: o que você fazia na prática para otimizar os conteúdos?", a: "Sempre usei Google Analytics, Google Search Console e Google Trends para pesquisar o que estava sendo buscado em alta. Adicionava sempre os termos correlacionados ao Google em meus conteúdos, pois era a prática muito comum na época." },
                { q: "Quando você fala de discovery e inovação: isso acontecia como?", a: "Discovery é o processo de descobrir como realizar uma demanda ou novo produto a partir de insumos de descoberta. Para isso fazia pesquisas e benchmarking, além de pesquisar melhores práticas para iniciar um projeto que já estivesse em linha com o que o mercado esperava na época ou melhor." },
                { q: "Sobre redes sociais: qual era o objetivo principal?", a: "Awareness e aquisição. Usávamos muito Instagram, Facebook, e tentamos também o TikTok, que por ter um público mais jovem, não abraçou tanto o mercado. Educação e informação sempre ficou a cargo do YouTube. Uma das minhas habilidades enquanto pessoa neurodivergente com TDAH é querer saber de tudo, em todo lugar e ao mesmo tempo - algo que acabava ajudando a pegar o timing certo de testar ou implementar alguma nova campanha." },
                { q: "Você criou algum processo ou playbook que continuou sendo usado?", a: "Fiz muitos, inclusive o método de roteiros de cursos que tínhamos no O Guia Financeiro. Porém, o Safra abandonou tudo que era Guide e hoje se encontra apenas alguns vídeos e notícias do que houve de produtivo naquele período." },
                { q: "O que mudou no seu trabalho depois da aquisição pelo Banco Safra?", a: "Eu saí da Guide um pouco antes do Safra comprar e fui para o Itaú, o que foi uma sorte na época, porque o Safra também trocou as pessoas, tirou quase todo mundo e contratou gente nova." },
                { q: "Se você não estivesse nessa posição, o que provavelmente não teria sido entregue?", a: "Com certeza, não haveria muitos cursos e o Guide Trader, segmento trading da Guide Investimentos." },
              ].map((item, i) => (
                <div key={i} className="bg-[var(--guide-bg-card)] rounded-xl border border-[var(--guide-green)]/10 overflow-hidden">
                  <button
                    onClick={() => toggleCard(`guide-faq-${i}`)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-[var(--guide-green)]/5 transition-colors"
                  >
                    <span className="text-[17px] md:text-[16px] font-medium text-white pr-4">{item.q}</span>
                    {expandedCards[`guide-faq-${i}`] ? (
                      <ChevronUp className="w-5 h-5 text-[var(--guide-green)] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/70 shrink-0" />
                    )}
                  </button>
                  {expandedCards[`guide-faq-${i}`] && (
                    <div className="px-5 md:px-6 pb-5 md:pb-6">
                      <p className="text-[14px] md:text-[17px] text-white leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px]" style={{ backgroundColor: colors.green, opacity: 0.3 }}></div>

      {/* ========== NAVEGAÇÃO ENTRE EMPRESAS ========== */}
      <section className="py-12 md:py-20" style={{ background: colors.bgDark }}>
        <div className="container">
          <div className="max-w-5xl mx-auto">
{/* Voltar ao início (substitui "Conheça outros projetos") */}
          <div className="text-center py-4 md:py-6">
            <a href="/#cases" data-voltar="1" className="inline-flex items-center gap-2 text-[#C9A96E] hover:text-white font-semibold text-[16px] md:text-[17px] underline underline-offset-4 decoration-[#C9A96E]/60 transition-colors">
              ← Voltar ao início
            </a>
          </div>


          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <Footer />
    </div>
  );
}


type LP = { name: string; path: string; period: string };

/** Carrossel deslizante das landing pages: arrastar, rolar ou usar as setas. */
function LPCarousel({ items, colors }: { items: LP[]; colors: Record<string, string> }) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const drag = useRef({ down: false, moved: false, x: 0, left: 0 });
  const update = () => {
    const t = track.current; if (!t) return;
    setEdge({ start: t.scrollLeft < 8, end: t.scrollLeft + t.clientWidth >= t.scrollWidth - 8 });
  };
  useEffect(() => { update(); const t = track.current; t?.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update); return () => { t?.removeEventListener("scroll", update); window.removeEventListener("resize", update); }; }, []);
  const go = (dir: number) => { const t = track.current; if (!t) return; const card = t.querySelector<HTMLElement>("[data-card]"); const step = card ? card.offsetWidth + 16 : t.clientWidth * 0.8; t.scrollBy({ left: dir * step * 2, behavior: "smooth" }); };
  const navBtn = "absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-opacity duration-200 disabled:opacity-0 disabled:pointer-events-none";
  return (
    <div className="relative mt-10">
      <button type="button" aria-label="Landing pages anteriores" onClick={() => go(-1)} disabled={edge.start} className={`${navBtn} -left-3 md:-left-5`} style={{ backgroundColor: colors.pink, color: "#000" }}>
        <ChevronLeft className="w-6 h-6" />
      </button>
      <div
        ref={track}
        tabIndex={0}
        role="region"
        aria-label="Carrossel de landing pages: arraste para o lado ou use as setas"
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); go(1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); } }}
        onPointerDown={(e) => { if (e.pointerType !== "mouse" || e.button !== 0) return; const t = track.current!; drag.current = { down: true, moved: false, x: e.clientX, left: t.scrollLeft }; }}
        onPointerMove={(e) => { const d = drag.current; if (!d.down) return; const dx = e.clientX - d.x; if (Math.abs(dx) > 5) d.moved = true; if (d.moved) { track.current!.style.scrollSnapType = "none"; track.current!.scrollLeft = d.left - dx; } }}
        onPointerUp={() => { drag.current.down = false; if (track.current) track.current.style.scrollSnapType = ""; }}
        onPointerLeave={() => { drag.current.down = false; if (track.current) track.current.style.scrollSnapType = ""; }}
      >
        {items.map((lp, i) => (
          <div
            key={i}
            data-card
            className="snap-start shrink-0 basis-[70%] sm:basis-[42%] md:basis-[30%] lg:basis-[23%] rounded-lg p-4 border text-center transition-all duration-300 flex flex-col items-center"
            style={{ backgroundColor: colors.bgCard, borderColor: `${colors.green}10`, minHeight: "130px" }}
          >
            <Globe className="w-5 h-5 mb-2" style={{ color: colors.green, opacity: 0.6 }} />
            <h4 className="font-semibold text-[14px] text-white mb-1 leading-tight flex-1 flex items-center justify-center">{lp.name}</h4>
            <p className="text-[10px] text-white/70 mb-1 w-full truncate">{lp.path}</p>
            <span className="text-[11px]" style={{ color: colors.pink }}>{lp.period}</span>
          </div>
        ))}
      </div>
      <button type="button" aria-label="Próximas landing pages" onClick={() => go(1)} disabled={edge.end} className={`${navBtn} -right-3 md:-right-5`} style={{ backgroundColor: colors.pink, color: "#000" }}>
        <ChevronRight className="w-6 h-6" />
      </button>
      <p className="text-center text-[13px] text-white/60 mt-2">Arraste para o lado para ver todas →</p>
    </div>
  );
}
