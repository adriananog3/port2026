import { useState } from "react";
import { ArrowLeft, ExternalLink, TrendingUp, Users, BarChart3, Mail, Phone, Video, Award, ChevronDown, ChevronUp, Download, HeartHandshake, MessageSquare } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { MetricCard } from "@/components/MetricCard";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import AnimatedSection from "@/components/AnimatedSection";

export default function ProjectEmpiricus() {
  useSEO({
    title: "Empiricus Research | Copywriter & Conteúdo Financeiro | Adriana Nogueira",
    description: "Case Empiricus Research: Copywriting de resposta direta, produção de conteúdo financeiro, campanhas de vendas e estratégias de marketing para casa de análise de investimentos.",
    canonical: "/cases/empiricus",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Cases", url: "/#cases-empresas" },
      { name: "Empiricus Research", url: "/cases/empiricus" }
    ],
    ogImage: "/assets/ovelha-og.jpg",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": "Case Empiricus Research - Copywriting & Conteúdo",
        "author": { "@type": "Person", "name": "Adriana Nogueira" },
        "about": { "@type": "Organization", "name": "Empiricus Research" },
        "description": "Copywriting de resposta direta, produção de conteúdo financeiro e campanhas de vendas."
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adrianaport.vip" },
          { "@type": "ListItem", "position": 2, "name": "Cases", "item": "https://adrianaport.vip/cases" },
          { "@type": "ListItem", "position": 3, "name": "Empiricus Research", "item": "https://adrianaport.vip/cases/empiricus" }
        ]
      }
    ]
  });

  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  // Empiricus brand colors - using CSS variables
  const brand = {
    primary: "var(--empiricus-primary)",
    primaryDark: "var(--empiricus-dark)",
    accent: "var(--empiricus-accent)",
    dark: "var(--navy-primary)",
  };

  return (
    <div className="min-h-screen text-foreground selection:bg-secondary selection:text-secondary-foreground flex flex-col" style={{ background: '#000000', fontFamily: "'Open Sans', sans-serif" }}>
      {/* Skip to content - Accessibility */}
      <a 
        href="#empiricus-main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--empiricus-primary)] focus:text-white focus:rounded-md focus:text-sm focus:font-semibold"
      >
        Pular para o conteúdo principal
      </a>

      {/* ========== BLOCO 1: SOBRE A EMPRESA ========== */}
      <section 
        id="empiricus-main-content" 
        aria-label="Sobre a Empiricus" 
        className="pt-6 md:pt-8 pb-12 md:pb-20 relative overflow-hidden"
        style={{ background: '#0A0A0A' }}
      >
        {/* Geometric decorations - hidden on mobile */}
        <div className="hidden md:block absolute top-0 right-[10%] w-[1px] h-[40%] bg-[var(--empiricus-primary)] opacity-[0.15]"></div>
        <div className="hidden md:block absolute bottom-[10%] left-[5%] w-24 h-24 rounded-full border border-[var(--empiricus-primary)] opacity-[0.08]"></div>
        <div className="hidden md:block absolute top-[60%] right-0 w-[6%] h-[1px] bg-[var(--empiricus-primary)] opacity-[0.12]"></div>

        <div className="container relative z-10">


          {/* Logo + Company Name */}
          <div
            className="flex flex-col items-center text-center mb-8 md:mb-16"
          >
            <img 
              src="/images/logos/empiricus.png" 
              alt="Logo da Empiricus Research" 
              className="w-24 h-24 object-contain mb-6 bg-black p-2 rounded-2xl" 
            />
            <h1 className="text-[32px] md:text-[42px] font-light tracking-wide text-[#D9D9D9]" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Empiricus Research
            </h1>
            <div className="mt-2 mb-4 h-[2px] w-[400px] max-w-full mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #898989, #C9A96E 50%, #898989, transparent)' }} />
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[15px] md:text-[17px] font-semibold tracking-[0.02em]" style={{ fontFamily: "'Open Sans', sans-serif", color: '#D9D9D9' }}>Consultora e Assistente de Conteúdo</span>
            </div>
            <div className="flex gap-2 flex-wrap justify-center mt-4">
              {["Copywriting Financeiro", "Retenção de Investidores", "CRM", "Educação Financeira", "Research", "Marketing", "Renda Fixa & Variável", "Blockchain & Criptoativos"].map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-white/90 text-black text-xs font-medium border border-white/30">
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
            <h2 className="text-[24px] md:text-[32px] font-normal text-[#D9D9D9] mb-8 text-center md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>Sobre a Empiricus Research</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-red)]"></span>
              </span>
            </h2>
            </AnimatedSection>

            <div className="space-y-6 text-[16px] md:text-[18px] text-[#D9D9D9] leading-relaxed">
              <p>
                A <strong className="font-bold text-white">Empiricus Research</strong> é uma das maiores casas de análise independente do Brasil, oferecendo recomendações de investimentos, análises de mercado e educação financeira para investidores de todos os perfis. Com foco em conteúdo premium e análises aprofundadas, a Empiricus atende milhares de assinantes em todo o país.
              </p>
              <p>
                Atuei no <strong className="font-bold text-white">atendimento, consultoria educacional de investidores e assistente de conteúdo</strong>, auxiliando na compreensão de temas como renda fixa, renda variável, day trade, blockchain, criptoativos e previdência privada. Monitorei publicações de analistas de research, garantindo qualidade, consistência das informações e cumprimento de prazos. Gerenciei solicitações e registros via CRM, assegurando fluxo eficiente de informações entre clientes e equipe de análise.
              </p>
              <p>
                Obtive resultados como a retenção de aproximadamente 60% de investidores que não tinham intenção de renovar assinatura, por meio de atendimento consultivo e construção de relacionamento; desenvolvimento de competências em marketing e copywriting financeiro aplicadas em testes internos; e obtenção da certificação CEA (ANBIMA) em 2019, validando conhecimento técnico em investimentos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px] bg-[var(--empiricus-primary)] opacity-30"></div>

      {/* ========== BLOCO 2: OBJETIVO E DESAFIOS ========== */}
      <section className="py-12 md:py-20 bg-[#000000] relative overflow-hidden">
        <div className="hidden md:block absolute right-[5%] top-[10%] w-[1px] h-[30%] bg-[var(--empiricus-primary)] opacity-[0.06]"></div>
        <div className="hidden md:block absolute left-[3%] bottom-[20%] w-16 h-16 rounded-full border border-[var(--empiricus-primary)] opacity-[0.04]"></div>

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
                className="bg-[#000000] rounded-xl p-6 md:p-8 border border-[#333333]"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--empiricus-primary)]/10 flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 text-[var(--empiricus-primary)]" />
                </div>
                <h3 className="text-[19px] md:text-[24px] font-bold text-white mb-4">Objetivo</h3>
                <p className="text-[16px] md:text-[18px] text-gray-300 leading-relaxed">
                  Oferecer atendimento consultivo de excelência para assinantes, garantindo compreensão das recomendações, suporte na tomada de decisões de investimento e maximização do valor percebido das assinaturas. Foco em retenção e satisfação do cliente.
                </p>
              </div>

              <div
                className="bg-[#000000] rounded-xl p-6 md:p-8 border border-[#333333]"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--empiricus-primary)]/10 flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-[var(--empiricus-primary)]" />
                </div>
                <h3 className="text-[19px] md:text-[24px] font-bold text-white mb-4">Desafios</h3>
                <p className="text-[16px] md:text-[18px] text-gray-300 leading-relaxed">
                  Atender investidores com diferentes níveis de conhecimento, explicar recomendações complexas de forma acessível, gerenciar expectativas em momentos de volatilidade do mercado e equilibrar volume de atendimento com qualidade consultiva.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px] bg-[var(--empiricus-primary)] opacity-30"></div>

      {/* ========== BLOCO 3: RESULTADOS ========== */}
      <section className="py-12 md:py-20 bg-[#000000] relative overflow-hidden">
        <div className="hidden md:block absolute top-[20%] left-0 w-[4%] h-[1px] bg-[var(--empiricus-primary)] opacity-[0.08]"></div>
        <div className="hidden md:block absolute bottom-[15%] right-[8%] w-20 h-20 rounded-full border border-[var(--empiricus-primary)] opacity-[0.04]"></div>

        <div className="container relative z-10">
          <div
            className="max-w-5xl mx-auto"
          >
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-4 text-center md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>Resultados</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-red)]"></span>
              </span>
            </h2>
            </AnimatedSection>
            <p className="text-[16px] md:text-[18px] italic text-gray-400 text-center mb-16">Excelência em atendimento e retenção</p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
              {[
                { value: "4.8/5.0", label: "Satisfação do cliente", sublabel: "Avaliação média em pesquisas de NPS", color: "var(--empiricus-primary)", icon: <Award className="w-5 h-5" /> },
                { value: "+500", label: "Atendimentos mensais", sublabel: "Suporte consultivo e educacional", color: "var(--empiricus-accent)", icon: <Phone className="w-5 h-5" /> },
                { value: "~74%", label: "Retenção", sublabel: "Investidores sem intenção de renovar", color: "var(--empiricus-primary)", icon: <HeartHandshake className="w-5 h-5" /> },
                { value: "< 2h", label: "Tempo médio de resposta", sublabel: "Atendimento via e-mail e telefone", color: "var(--empiricus-accent)", icon: <MessageSquare className="w-5 h-5" /> },
                { value: "+200", label: "Casos complexos resolvidos", sublabel: "Suporte técnico e análise de carteiras", color: "var(--empiricus-primary)", icon: <BarChart3 className="w-5 h-5" /> },
                { value: "Top 10%", label: "Performance da equipe", sublabel: "Ranking interno de consultores", color: "var(--empiricus-accent)", icon: <TrendingUp className="w-5 h-5" /> },
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

      {/* Divider */}
      <div className="h-[1px] bg-[var(--empiricus-primary)] opacity-30"></div>

      {/* ========== BLOCO 4: CONTEÚDOS DE DESTAQUE ========== */}
      <section className="py-12 md:py-20 bg-[#000000] relative overflow-hidden">
        <div className="hidden md:block absolute top-0 left-[8%] w-[1px] h-[25%] bg-[var(--empiricus-primary)] opacity-[0.06]"></div>
        <div className="hidden md:block absolute bottom-[5%] right-[3%] w-12 h-12 rounded-full border border-[var(--empiricus-primary)] opacity-[0.04]"></div>

        <div className="container relative z-10">
          <div
            className="max-w-5xl mx-auto"
          >
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-12 text-center md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>Áreas de Atuação</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--primary-red)]"></span>
              </span>
            </h2>
            </AnimatedSection>

            {/* Áreas de Atuação */}
            <h3 className="text-[18px] md:text-[24px] font-semibold text-[var(--empiricus-primary)] mb-8">Atividades & Responsabilidades</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[
                { title: "Atendimento Consultivo", badge: "Core da função", desc: "Suporte personalizado para assinantes via telefone, e-mail e chat, esclarecendo dúvidas sobre recomendações, estratégias e produtos.", detail: "Análise de perfil do investidor, explicação de recomendações complexas, suporte na tomada de decisões, orientação sobre alocação de carteira e acompanhamento de resultados. Foco em construir relacionamento de longo prazo." },
                { title: "Educação Financeira", badge: "Capacitação contínua", desc: "Orientação educacional para assinantes sobre conceitos de investimentos, análise fundamentalista, análise técnica e gestão de risco.", detail: "Explicação de conceitos como valuation, múltiplos, análise de balanços, estratégias de trading, diversificação e gestão de patrimônio. Adaptação da linguagem ao nível de conhecimento do investidor." },
                { title: "Retenção de Clientes", badge: "~74% de retenção", desc: "Retenção de aproximadamente 74% de investidores que não tinham intenção de renovar assinatura, por meio de estratégias focadas em demonstrar valor e resolver insatisfações.", detail: "Identificação de clientes em risco de cancelamento, abordagem proativa, resolução de objeções, demonstração de resultados e benefícios, e acompanhamento pós-renovação." },

                { title: "Análise de Carteiras", badge: "Suporte técnico", desc: "Revisão de carteiras de investimentos dos assinantes, identificando oportunidades de melhoria e alinhamento com recomendações.", detail: "Análise de composição de carteira, identificação de concentração de risco, sugestões de diversificação, alinhamento com perfil de risco e objetivos financeiros do investidor." },
                { title: "Gestão de CRM", badge: "Organização e follow-up", desc: "Registro detalhado de interações, histórico de atendimentos, preferências dos clientes e follow-up de casos complexos.", detail: "Atualização de sistema de CRM, categorização de atendimentos, identificação de padrões, geração de relatórios e feedback para áreas de produto e conteúdo." },
                { title: "Suporte em Volatilidade", badge: "Gestão de crises", desc: "Atendimento especializado em momentos de alta volatilidade do mercado, gerenciando expectativas e oferecendo perspectiva de longo prazo.", detail: "Comunicação empática, explicação de contexto macroeconômico, reforço de estratégias de longo prazo, gestão de ansiedade dos investidores e prevenção de decisões emocionais." },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-[#000000] rounded-xl p-6 border border-[#333333] hover:border-[var(--empiricus-primary)]/30 hover:shadow-[0_0_20px_rgba(232,66,40,0.08)] transition-all duration-300"
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-[var(--empiricus-primary)]/10 text-[var(--empiricus-primary)] text-xs font-semibold mb-4">
                    {card.badge}
                  </span>
                  <h4 className="font-bold text-[18px] text-white mb-3">{card.title}</h4>
                  <p className="text-[17px] text-gray-400 mb-4 leading-relaxed">
                    {card.desc}
                  </p>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedCards[`empiricus-${i}`] ? 'max-h-96' : 'max-h-0'}`}>
                    <p className="text-[17px] text-gray-400 mb-3 leading-relaxed">{card.detail}</p>
                  </div>
                  <button 
                    onClick={() => toggleCard(`empiricus-${i}`)}
                    className="text-[var(--empiricus-primary)] text-sm font-medium hover:underline flex items-center gap-1"
                  >
                    {expandedCards[`empiricus-${i}`] ? 'Ver menos' : 'Continuar lendo'}
                    {expandedCards[`empiricus-${i}`] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>

            {/* Destaques do Projeto */}
            <h3 className="text-[18px] md:text-[24px] font-semibold text-[var(--empiricus-primary)] mb-8">Destaques da Atuação</h3>
            <div className="space-y-8 mb-16">
              {[
                { num: "01", title: "Excelência em Atendimento", desc: "Avaliação média de 4.8/5.0 em pesquisas de satisfação (NPS), com destaque para qualidade consultiva, empatia e capacidade de explicar conceitos complexos de forma acessível. Performance no Top 10% da equipe." },
                { num: "02", title: "Alta Taxa de Retenção", desc: "Retenção de aproximadamente 74% de investidores que não tinham intenção de renovar assinatura, resultado de atendimento consultivo de qualidade, demonstração consistente de valor e construção de relacionamento de longo prazo com os assinantes." },
                { num: "03", title: "Volume e Qualidade", desc: "Média de +500 atendimentos mensais mantendo alto padrão de qualidade, tempo médio de resposta < 2h e resolução de +200 casos complexos envolvendo análise de carteiras e suporte técnico avançado." },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#000000] border border-[#333333] rounded-xl p-6 md:p-8"
                >
                  <h4 className="text-[19px] font-bold text-white mb-4 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-[var(--empiricus-primary)]/10 text-[var(--empiricus-primary)] flex items-center justify-center text-sm font-mono font-bold">{item.num}</span>
                    {item.title}
                  </h4>
                  <p className="text-[16px] text-gray-300 leading-relaxed pl-0 md:pl-13">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Ficha Técnica */}
            <h3 className="text-[18px] md:text-[24px] font-semibold text-[var(--empiricus-primary)] mb-8">Ficha Técnica</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {[
                { label: "Role", value: "Consultora e Assistente de Conteúdo" },
                { label: "Foco", value: "Atendimento, Retenção, Educação" },
                { label: "Canais", value: "Telefone, E-mail, Chat, CRM" },
                { label: "Impacto", value: "4.8/5.0 satisfação, ~74% retenção" },
              ].map((item, i) => (
                <div key={i} className="bg-[#000000] p-4 md:p-6 rounded-xl border border-[#333333]">
                  <span className="block text-xs text-gray-500 uppercase mb-2 tracking-widest">{item.label}</span>
                  <span className="font-bold text-white text-[14px] md:text-[17px]">{item.value}</span>
                </div>
              ))}
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
