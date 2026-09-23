import { useState } from "react";
import { ArrowLeft, ExternalLink, TrendingUp, Users, BarChart3, Mail, Smartphone, Video, Award, ChevronDown, ChevronUp, Download, FileText, GraduationCap, Pen, Layout, Megaphone, BookOpen, Target } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { MetricCard } from "@/components/MetricCard";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import AnimatedSection from "@/components/AnimatedSection";

export default function ProjectModal() {
  useSEO({
    title: "Banco Modal (modalmais) | Especialista em Conteúdo & Marketing | Adriana Nogueira",
    description: "Case Banco Modal (modalmais): Estratégias de conteúdo, copywriting e marketing digital para plataforma de investimentos. Campanhas de aquisição, e-mail marketing e produção de conteúdo financeiro.",
    canonical: "/cases/modal",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Cases", url: "/#cases-empresas" },
      { name: "Banco Modal", url: "/cases/modal" }
    ],
    ogImage: "/assets/ovelha-og.jpg",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": "Case Banco Modal (modalmais) - Conteúdo & Marketing",
        "author": { "@type": "Person", "name": "Adriana Nogueira" },
        "about": { "@type": "Organization", "name": "Banco Modal (modalmais)" },
        "description": "Estratégias de conteúdo, copywriting e marketing digital para plataforma de investimentos."
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adrianaport.vip" },
          { "@type": "ListItem", "position": 2, "name": "Cases", "item": "https://adrianaport.vip/cases" },
          { "@type": "ListItem", "position": 3, "name": "Banco Modal", "item": "https://adrianaport.vip/cases/modal" }
        ]
      }
    ]
  });

  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  // Modal brand colors - using CSS variables
  const brand = {
    primary: "var(--modal-primary)",
    primaryDark: "var(--modal-dark)",
    accent: "var(--modal-accent)",
    dark: "var(--navy-primary)",
  };

  return (
    <div className="min-h-screen text-foreground selection:bg-secondary selection:text-secondary-foreground flex flex-col" style={{ background: 'var(--gray-950)', fontFamily: "'Open Sans', sans-serif" }}>
      {/* Skip to content - Accessibility */}
      <a 
        href="#modal-main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--modal-primary)] focus:text-white focus:rounded-md focus:text-sm focus:font-semibold"
      >
        Pular para o conteúdo principal
      </a>

      {/* ========== BLOCO 1: SOBRE A EMPRESA ========== */}
      <section 
        id="modal-main-content" 
        aria-label="Sobre o Modal" 
        className="pt-6 md:pt-8 pb-12 md:pb-20 relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at center, var(--modal-accent) 0%, var(--modal-dark) 40%, var(--modal-bg) 70%, var(--gray-950) 100%)' }}
      >
        {/* Geometric decorations - hidden on mobile */}
        <div className="hidden md:block absolute top-0 right-[10%] w-[1px] h-[40%] bg-[var(--modal-primary)] opacity-[0.15]"></div>
        <div className="hidden md:block absolute bottom-[10%] left-[5%] w-24 h-24 rounded-full border border-[var(--modal-primary)] opacity-[0.08]"></div>
        <div className="hidden md:block absolute top-[60%] right-0 w-[6%] h-[1px] bg-[var(--modal-primary)] opacity-[0.12]"></div>

        <div className="container relative z-10">


          {/* Logo + Company Name */}
          <div
            className="flex flex-col items-center text-center mb-8 md:mb-16"
          >
            <img 
              src="/images/logos/modal-icon.jpg" 
              alt="Logo do Banco Modal" 
              className="w-24 h-24 object-contain mb-6" 
            />
            <h1 className="text-[32px] md:text-[42px] font-light tracking-wide text-white" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Banco Modal <span className="text-[var(--modal-primary)]">(modalmais)</span>
            </h1>
            <div className="mt-2 mb-4 h-[2px] w-[400px] max-w-full mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #898989, #C9A96E 50%, #898989, transparent)' }} />
            <div className="flex items-center gap-3 mb-2">
              <span className="px-4 py-1 rounded-full text-[15px] md:text-[14px] font-semibold tracking-wide" style={{ background: 'var(--modal-primary)', color: 'var(--gray-950)' }}>
                AGO 2019 – ABR 2021
              </span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[15px] md:text-[17px] font-semibold tracking-[0.02em]" style={{ fontFamily: "'Open Sans', sans-serif", color: 'rgba(255,255,255,0.7)' }}>Analista de Conteúdo Júnior → Pleno</span>
            </div>
            <p className="text-[14px] md:text-[16px] text-gray-300 max-w-2xl mx-auto leading-relaxed mt-2">
              Atuação em <strong className="text-white font-bold italic">conteúdo educacional para aquisição e retenção de investidores</strong>, com foco em traduzir conceitos financeiros complexos em linguagem acessível, contribuindo diretamente para a formação de milhares de alunos e a otimização da jornada do investidor na plataforma.
            </p>
            <div className="flex gap-2 flex-wrap justify-center mt-6">
              {["modalmais", "Conteúdo Educativo", "UX Writing", "Copywriting", "E-mail Marketing", "Redes Sociais", "Mídia Paga", "Blog & SEO", "Cursos", "Rebrand", "SEO & Tráfego Orgânico"].map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-[var(--modal-primary)]/15 text-[var(--modal-primary)] text-xs font-medium border border-[var(--modal-primary)]/50 shadow-[0_0_6px_rgba(77,217,192,0.15)]">
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
                <span>Sobre o Banco Modal (modalmais)</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-red)]"></span>
              </span>
            </h2>
            </AnimatedSection>

            <div className="space-y-6 text-[16px] md:text-[18px] text-gray-300 leading-relaxed">
              <p>
                O <strong className="font-bold text-white">Banco Modal</strong> foi fundado em 1996 como um banco de investimentos. Em 2015, lançou a plataforma <strong className="font-bold text-white">modalmais</strong>, o "Banco Digital dos Investidores", com a missão de quebrar as barreiras do mercado financeiro e oferecer as melhores condições para traders e investidores operarem. A plataforma se consolidou como referência em trading no Brasil, sendo reconhecida como "feita de trader para trader".
              </p>
              <p>
                Em janeiro de 2022, o Banco Modal foi adquirido pela <strong className="font-bold text-white">XP Inc.</strong> em uma operação avaliada em cerca de R$ 3 bilhões, passando a integrar o ecossistema da maior plataforma de investimentos do país. Minha passagem pelo Modal aconteceu no período de forte crescimento da plataforma (2019–2021), quando a empresa investia pesado em educação financeira e democratização do acesso a investimentos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 md:py-16 bg-[var(--gray-950)] relative">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                title="vimeo-player"
                src="https://player.vimeo.com/video/847107645?h=fac56eb519&byline=0&title=0&portrait=0"
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px] bg-[var(--modal-primary)] opacity-30"></div>

      {/* ========== BLOCO 2: OBJETIVO E DESAFIOS ========== */}
      <section className="py-12 md:py-20 bg-[var(--gray-950)] relative overflow-hidden">
        <div className="hidden md:block absolute right-[5%] top-[10%] w-[1px] h-[30%] bg-[var(--modal-primary)] opacity-[0.06]"></div>
        <div className="hidden md:block absolute left-[3%] bottom-[20%] w-16 h-16 rounded-full border border-[var(--modal-primary)] opacity-[0.04]"></div>

        <div className="container relative z-10">
          <div
            className="max-w-4xl mx-auto"
          >
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-12 text-center md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>Objetivo e Desafios</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-red)]"></span>
              </span>
            </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8">
              <div
                className="bg-[var(--gray-900)] rounded-xl p-6 md:p-8 border border-[var(--gray-800)]"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--modal-primary)]/10 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-[var(--modal-primary)]" />
                </div>
                <h3 className="text-[19px] md:text-[24px] font-bold text-white mb-4">Objetivo</h3>
                <p className="text-[16px] md:text-[18px] text-gray-300 leading-relaxed">
                  Produzir conteúdo educacional de alta qualidade para <strong className="text-white">aquisição e retenção de investidores</strong> na plataforma modalmais, traduzindo conceitos complexos do mercado financeiro em linguagem acessível. Contribuir diretamente para a estratégia de crescimento da base de clientes por meio de conteúdo que educa, engaja e converte.
                </p>
              </div>

              <div
                className="bg-[var(--gray-900)] rounded-xl p-6 md:p-8 border border-[var(--gray-800)]"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--modal-primary)]/10 flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-[var(--modal-primary)]" />
                </div>
                <h3 className="text-[19px] md:text-[24px] font-bold text-white mb-4">Desafios</h3>
                <p className="text-[16px] md:text-[18px] text-gray-300 leading-relaxed">
                  Equilibrar volume e qualidade na produção de conteúdo multicanal (blog, e-mails, redes sociais, cursos e mídia paga). Adaptar a comunicação após o <strong className="text-white">rebrand da marca</strong>, implementando melhorias de UX Writing no App e produtos digitais para otimizar a jornada do investidor em um mercado cada vez mais competitivo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px] bg-[var(--modal-primary)] opacity-30"></div>

      {/* ========== BLOCO 3: RESULTADOS ========== */}
      <section className="py-12 md:py-20 bg-[var(--gray-950)] relative overflow-hidden">
        <div className="hidden md:block absolute top-[20%] left-0 w-[4%] h-[1px] bg-[var(--modal-primary)] opacity-[0.08]"></div>
        <div className="hidden md:block absolute bottom-[15%] right-[8%] w-20 h-20 rounded-full border border-[var(--modal-primary)] opacity-[0.04]"></div>

        <div className="container relative z-10">
          <div
            className="max-w-5xl mx-auto"
          >
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-4 text-center md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>Principais Resultados</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-red)]"></span>
              </span>
            </h2>
            </AnimatedSection>
            <p className="text-[16px] md:text-[18px] italic text-gray-400 text-center mb-16">Impacto mensurável em educação financeira e crescimento da plataforma</p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
              {[
                { value: "+7.000", label: "Alunos formados", sublabel: "Curso 'Os Segredos da Melhor Carteira do Brasil' - Leandro Martins, Trader e Analista CNPI", icon: <GraduationCap className="w-5 h-5" />, color: "var(--modal-primary)" },
                { value: "UX Writing", label: "Melhorias no App", sublabel: "Otimização da jornada do investidor nos produtos digitais após rebrand", icon: <Smartphone className="w-5 h-5" />, color: "var(--modal-accent)" },
                { value: "Multi-canal", label: "Produção de conteúdo", sublabel: "Blog, e-mails, redes sociais, cursos, mídia paga e landing pages", icon: <Pen className="w-5 h-5" />, color: "var(--modal-primary)" },
                { value: "Jr → Pleno", label: "Promoção em 1 ano", sublabel: "Evolução de Analista Júnior para Pleno por desempenho e entregas", icon: <Award className="w-5 h-5" />, color: "var(--modal-accent)" },
                { value: "Rebrand", label: "Conteúdo junto ao time interno", sublabel: "Rebrand para modalmais", icon: <Layout className="w-5 h-5" />, color: "var(--modal-primary)" },
                { value: "Educação", label: "Democratização financeira", sublabel: "Conteúdo acessível sobre renda fixa, variável, trading e previdência", icon: <BookOpen className="w-5 h-5" />, color: "var(--modal-accent)" },
                { value: "SEO", label: "Tráfego orgânico", sublabel: "Long-tail keywords, Core Web Vitals, E-A-T, content clusters e featured snippets", icon: <BarChart3 className="w-5 h-5" />, color: "var(--modal-primary)" },
              ].map((metric, i) => (
                <MetricCard
                  key={i}
                  index={i}
                  icon={metric.icon}
                  value={metric.value}
                  label={metric.label}
                  sublabel={metric.sublabel}
                  color={metric.color}
                  bgColor="#0f0f0f"
                  textColor="#9CA3AF"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* App UI Image Section */}
      <section className="py-8 md:py-12 bg-[var(--gray-950)] relative">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-6">
            <img
              src="/manus-storage/pasted_file_9WiwGR_image_3f1e6345.png"
              alt="User Interface - Um novo app modalmais: linha mais simples, acessível e digital"
              className="w-full h-auto"
            />
            <img
              src="/manus-storage/motioncodemodalmais_07e430b8.jpg"
              alt="Verso do cartão Infinite Motion Code Premium - Grafismo proprietário do motion code versão 2.0"
              className="w-full h-auto"
            />
            <img
              src="/manus-storage/modalmais1_dec5441b.jpg"
              alt="Modal Premium - Composição fotográfica, Ads e Social Media com key visual premium"
              className="w-full h-auto"
            />
            <p className="text-center text-xs text-gray-500 italic mt-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              *Conteúdo escrito complementado a criatividade do time visual interno do banco. Consistência da marca evoluiu muito por não depender de terceiros.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px] bg-[var(--modal-primary)] opacity-30"></div>

      {/* ========== BLOCO 4: CONTEÚDOS DE DESTAQUE ========== */}
      <section className="py-12 md:py-20 bg-[var(--gray-950)] relative overflow-hidden">
        <div className="hidden md:block absolute top-0 left-[8%] w-[1px] h-[25%] bg-[var(--modal-primary)] opacity-[0.06]"></div>
        <div className="hidden md:block absolute bottom-[5%] right-[3%] w-12 h-12 rounded-full border border-[var(--modal-primary)] opacity-[0.04]"></div>

        <div className="container relative z-10">
          <div
            className="max-w-5xl mx-auto"
          >
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-4 text-center md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>Conteúdos de Destaque</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-red)]"></span>
              </span>
            </h2>
            </AnimatedSection>
            <p className="text-[16px] md:text-[18px] italic text-gray-400 text-center mb-12">Projetos e responsabilidades que marcaram minha passagem pelo Modal</p>

            {/* Campanhas & Projetos */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[
                { 
                  title: <><em className="italic font-bold">"Os Segredos da Melhor Carteira do Brasil"</em></>, 
                  badge: "+7.000 alunos", 
                  desc: <span>Desenvolvimento de conteúdo para aquisição e retenção do curso ministrado pelo <a href="https://www.instagram.com/lemartinsoficial/" target="_blank" rel="noopener noreferrer" className="text-[var(--modal-primary)] hover:underline">Trader e Analista CNPI, Leandro Martins</a>, vencedor da Carteira Valor várias vezes consecutivas, segundo o jornal Valor Econômico.</span>, 
                  detail: "Produção de materiais de apoio, e-mails de nutrição, landing pages de captação e conteúdo de suporte para o curso que ensinou milhares de investidores a montar carteiras de ações vencedoras. O curso alcançou +7.000 alunos, consolidando a modalmais como referência em educação financeira para traders." 
                },
                { 
                  title: "UX Writing - App e Produtos Digitais", 
                  badge: "Pós-rebrand", 
                  desc: "Implementação de melhorias de UX Writing no aplicativo e produtos digitais da modalmais, otimizando a jornada do investidor após o processo de rebrand da marca.", 
                  detail: "Revisão e reescrita de microcopy, fluxos de onboarding, mensagens de erro, tooltips e CTAs em toda a plataforma. Trabalho colaborativo com times de produto e design para garantir que a nova identidade da marca se refletisse em cada ponto de contato com o usuário, tornando a experiência mais intuitiva e acessível." 
                },
                { 
                  title: "Blog & SEO - Educação Financeira", 
                  badge: "SEO + Produção contínua", 
                  desc: "Produção de artigos educacionais otimizados para SEO sobre investimentos, renda fixa, renda variável, trading, fundos de investimento e previdência para o blog da modalmais.", 
                  detail: "Aplicação das principais estratégias de SEO do período 2021-2022: pesquisa aprofundada de palavras-chave (long-tail keywords), otimização para Core Web Vitals (LCP, FID, CLS), estruturação de content clusters e pillar pages, otimização para featured snippets (posição zero), mobile-first indexing e implementação de schema markup para rich results. Fact-checking rigoroso e linguagem acessível sem perder profundidade técnica, com foco em responder dúvidas frequentes dos investidores e contribuir para o crescimento do tráfego orgânico da plataforma." 
                },
                { 
                  title: "E-mail Marketing & Réguas de Comunicação", 
                  badge: "Segmentação avançada", 
                  desc: "Criação de réguas de comunicação segmentadas por perfil de investidor, com foco em educação, oportunidades de mercado, lançamento de produtos e retenção.", 
                  detail: "Estratégia de e-mail marketing com segmentação por perfil de risco, histórico de investimentos e estágio na jornada do cliente. Produção de newsletters educativas, alertas de mercado, campanhas de lançamento de produtos e fluxos de nurturing para conversão gradual de leads em investidores ativos." 
                },
                { 
                  title: "Redes Sociais & Mídia Paga", 
                  badge: "Multi-plataforma", 
                  desc: "Conteúdo para Instagram, LinkedIn, Facebook e YouTube focado em educação financeira, dicas de investimento, análises de mercado e posicionamento institucional.", 
                  detail: "Calendário editorial, produção de carrosséis educativos, vídeos curtos, stories interativos e gestão de comunidade. Criação de peças para campanhas de mídia paga com foco em aquisição de novos investidores e divulgação de cursos e eventos. Análise de métricas e ajustes de estratégia baseados em performance." 
                },
                { 
                  title: "Copywriting para Campanhas e Produtos", 
                  badge: "Conversão otimizada", 
                  desc: "Textos persuasivos para landing pages, banners, materiais de vendas, campanhas de captação e lançamento de novos produtos e funcionalidades da plataforma.", 
                  detail: "Pesquisa de dores e objeções do público-alvo, estrutura de copywriting baseada em frameworks comprovados (AIDA, PAS), testes de diferentes abordagens e otimização contínua. Produção de materiais ricos como e-books e guias de investimento para geração de leads qualificados." 
                },
                { 
                  title: "SEO & Estratégia de Tráfego Orgânico", 
                  badge: "2021-2022 → Hoje", 
                  desc: "Aplicação das estratégias de SEO predominantes no período 2021-2022 - que hoje mudaram radicalmente com a chegada da IA generativa e dos AI Overviews do Google.", 
                  detail: "No período 2021-2022, as estratégias de SEO que apliquei incluíam: keyword research com foco em long-tail keywords, otimização para Core Web Vitals (métricas de experiência do usuário que se tornaram fator de ranking oficial em 2021), construção de autoridade via E-A-T (Expertise, Authoritativeness, Trustworthiness), content clusters com pillar pages, otimização para featured snippets (posição zero) e mobile-first indexing. Hoje, o cenário mudou drasticamente: o Google adicionou 'Experience' ao framework (E-E-A-T), lançou os AI Overviews (antigo SGE) que aparecem em 47%+ das buscas, e surgiu o GEO (Generative Engine Optimization) como disciplina distinta. Zero-click searches saltaram de 65% para patamares ainda maiores, e a otimização agora precisa ser multi-plataforma (Google, ChatGPT, Perplexity). Essa evolução reforça a importância da base sólida de SEO que construí no Modal, agora complementada pela minha atuação com SGE e AI-first na BEE4." 
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-[var(--gray-900)] rounded-xl p-6 border border-[var(--gray-800)] hover:border-[var(--modal-primary)]/30 hover:shadow-[0_0_20px_rgba(77,217,192,0.08)] transition-all duration-300 flex flex-col"
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-[var(--modal-primary)]/10 text-[var(--modal-primary)] text-xs font-semibold mb-4 self-start">
                    {card.badge}
                  </span>
                  <h4 className="font-bold text-[18px] text-white mb-3">{card.title}</h4>
                  <p className="text-[17px] text-gray-400 mb-4 leading-relaxed flex-1">
                    {card.desc}
                  </p>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedCards[`modal-${i}`] ? 'max-h-96' : 'max-h-0'}`}>
                    <p className="text-[17px] text-gray-400 mb-3 leading-relaxed">{card.detail}</p>
                  </div>
                  <button 
                    onClick={() => toggleCard(`modal-${i}`)}
                    className="text-[var(--modal-primary)] text-sm font-medium hover:underline flex items-center gap-1 mt-auto pt-4"
                  >
                    {expandedCards[`modal-${i}`] ? 'Ver menos' : 'Continuar lendo'}
                    {expandedCards[`modal-${i}`] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>

            {/* Destaques da Trajetória */}
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-4 text-center md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>Destaques da Trajetória</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-red)]"></span>
              </span>
            </h2>
            </AnimatedSection>
            <p className="text-[16px] md:text-[18px] italic text-gray-400 text-center mb-12">Marcos que definiram minha evolução profissional no Modal</p>

            {/* Timeline/Roadmap */}
            <div className="relative mb-16">
              {/* Linha vertical central (desktop) / esquerda (mobile) */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-[1px] top-0 bottom-0 w-[2px] bg-[var(--modal-primary)]/30"></div>
              
              <div className="space-y-8 md:space-y-0">
                {[
                  { period: "2019", title: "+7.000 Investidores formados", summary: <span>Curso <em className="italic font-bold">'Os Segredos da Melhor Carteira do Brasil'</em> — <a href="https://www.instagram.com/lemartinsoficial/" target="_blank" rel="noopener noreferrer" className="text-[var(--modal-primary)] hover:underline">Leandro Martins, CNPI</a></span> },
                  { period: "2020", title: "UX Writing & Rebrand", summary: "Melhorias no app e produtos digitais após rebrand para modalmais" },
                  { period: "2020–21", title: "SEO & Tráfego Orgânico", summary: "Long-tail keywords, Core Web Vitals, E-A-T, content clusters e featured snippets" },
                  { period: "2021", title: "Promoção: Júnior → Pleno", summary: "Reconhecimento por entregas de alta qualidade em menos de 1 ano" },
                ].map((item, i) => (
                  <div key={i} className={`relative flex items-start gap-4 md:gap-0 pl-10 md:pl-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:items-center md:py-6`}>
                    {/* Dot na timeline */}
                    <div className="absolute left-[10px] md:left-1/2 md:-translate-x-1/2 top-1 md:top-1/2 md:-translate-y-1/2 w-5 h-5 rounded-full bg-[var(--modal-primary)] border-[3px] border-[var(--gray-950)] z-10"></div>
                    
                    {/* Content */}
                    <div className={`md:w-[45%] ${i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                      <span className="text-[var(--modal-primary)] text-xs font-mono font-bold uppercase tracking-widest">{item.period}</span>
                      <h4 className="text-[17px] font-bold text-white mt-1">{item.title}</h4>
                      <p className="text-[14px] text-gray-400 mt-1 leading-relaxed">{item.summary}</p>
                    </div>
                    
                    {/* Spacer for alternating sides */}
                    <div className="hidden md:block md:w-[45%]"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ficha Técnica */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {[
                { label: "Role", value: "Analista de Conteúdo Júnior → Pleno" },
                { label: "Foco", value: "Educação Financeira, SEO, UX Writing, Copywriting" },
                { label: "Canais", value: "Blog & SEO, E-mail, App, Redes Sociais, Mídia Paga, Cursos" },
                { label: "Destaque", value: "+7.000 alunos formados em curso de investimentos" },
              ].map((item, i) => (
                <div key={i} className="bg-[var(--gray-900)] p-4 md:p-6 rounded-xl border border-[var(--gray-800)]">
                  <span className="block text-xs text-gray-500 uppercase mb-2 tracking-widest">{item.label}</span>
                  <span className="font-bold text-white text-[14px] md:text-[17px]">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Contexto Importante */}
            <div
              className="bg-[var(--modal-dark)]/30 border border-[var(--modal-primary)]/20 rounded-xl p-6 md:p-8 mb-16"
            >
              <h3 className="text-[19px] font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-[var(--modal-primary)]">💡</span> Contexto Importante
              </h3>
              <p className="text-[16px] text-gray-300 leading-relaxed">
                Minha passagem pelo Banco Modal foi fundamental para a construção do meu repertório em <strong className="text-white">trading, produtos financeiros, SEO e educação para investidores</strong>. As estratégias de SEO que apliquei no período 2021-2022 (Core Web Vitals, E-A-T, content clusters, featured snippets) representam a base do que hoje evoluiu para o <strong className="text-white">E-E-A-T, AI Overviews e GEO</strong> - competências que aprofundei na BEE4 com estratégias SGE AI-first. Os conhecimentos adquiridos aqui foram decisivos para que, na sequência, eu assumisse a liderança técnica do projeto <strong className="text-white">"Guide Trader"</strong> na Guide Investimentos - coordenando desde o planejamento de SEO e UX Writing até o media training de executivos para o lançamento de um novo segmento.
              </p>
            </div>

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
