import { useState } from "react";
import { ArrowLeft, ExternalLink, TrendingUp, Users, BarChart3, Mail, Zap, Video, Award, ChevronDown, ChevronUp, Download } from "lucide-react";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { MetricCard } from "@/components/MetricCard";
import { useSEO } from "@/hooks/useSEO";
import AnimatedSection from "@/components/AnimatedSection";

export default function ProjectItau() {
  useSEO({
    title: "Itaú Unibanco | Analista Sênior de Comunicação & Marketing | Adriana Nogueira",
    description: "Case Itaú Unibanco: Campanhas de alto impacto (+R$ 1MM com 1 e-mail), comunicação para Itaú e íon, estratégias de marketing para Key Position. Experiência em comunicação corporativa e marketing financeiro.",
    canonical: "/cases/itau",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Cases", url: "/#cases-empresas" },
      { name: "Itaú Unibanco", url: "/cases/itau" }
    ],
    ogImage: "/assets/ovelha-og.jpg",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": "Case Itaú Unibanco - Comunicação & Marketing",
        "author": { "@type": "Person", "name": "Adriana Nogueira" },
        "about": { "@type": "Organization", "name": "Itaú Unibanco" },
        "description": "Campanhas de alto impacto, comunicação para Itaú e íon, estratégias de marketing."
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adrianaport.vip" },
          { "@type": "ListItem", "position": 2, "name": "Cases", "item": "https://adrianaport.vip/cases" },
          { "@type": "ListItem", "position": 3, "name": "Itaú Unibanco", "item": "https://adrianaport.vip/cases/itau" }
        ]
      }
    ]
  });

  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  return (
    <div className="min-h-screen text-foreground selection:bg-secondary selection:text-secondary-foreground flex flex-col" style={{ background: 'var(--gray-950)', fontFamily: "'Open Sans', sans-serif" }}>
      {/* Skip to content - Accessibility */}
      <a 
        href="#itau-main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--itau-primary)] focus:text-white focus:rounded-md focus:text-sm focus:font-semibold"
      >
        Pular para o conteúdo principal
      </a>

      {/* ========== BLOCO 1: SOBRE A EMPRESA ========== */}
      <section 
        id="itau-main-content" 
        aria-label="Sobre o Itaú" 
        className="pt-6 md:pt-8 pb-12 md:pb-20 relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at center, #4a2800 0%, #2a1600 40%, var(--itau-bg) 70%, var(--gray-950) 100%)' }}
      >
        {/* Geometric decorations */}
        <div className="hidden md:block absolute top-0 right-[10%] w-[1px] h-[40%] bg-[var(--itau-yellow)] opacity-[0.15]"></div>
        <div className="hidden md:block absolute bottom-[10%] left-[5%] w-24 h-24 rounded-full border border-[var(--itau-primary)] opacity-[0.08]"></div>
        <div className="hidden md:block absolute top-[60%] right-0 w-[6%] h-[1px] bg-[var(--itau-yellow)] opacity-[0.12]"></div>

        <div className="container relative z-10">


          {/* Logo + Company Name */}
          <div className="flex flex-col items-center text-center mb-8 md:mb-16">
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/eFsqwbMfuTuRcdtV.png" 
              alt="Logo do Itaú Unibanco" 
              className="w-24 h-24 object-contain mb-6" 
            />
            <h1 className="text-[32px] md:text-[42px] font-light tracking-wide text-white" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Itaú Unibanco
            </h1>
            <div className="mt-2 mb-4 h-[2px] w-[400px] max-w-full mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #898989, #FF6D00 50%, #898989, transparent)' }} />
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[15px] md:text-[17px] font-semibold tracking-[0.02em]" style={{ fontFamily: "'Open Sans', sans-serif", color: 'rgba(255,255,255,0.7)' }}>Analista Sênior de Comunicação & Marketing (Key Position) | Jul 2022 – Jun 2024</span>
            </div>
            <div className="flex gap-2 flex-wrap justify-center mt-4">
              {["Itaú", "íon", "Personnalité", "Uniclass", "Renda Variável", "Renda Fixa", "Criptoativos", "B2C", "B2B"].map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-[var(--itau-yellow)]/10 text-[var(--itau-yellow)] text-xs font-medium border border-[var(--itau-yellow)]/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sobre a empresa */}
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-8 text-center md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>Sobre o Itaú Unibanco</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--itau-yellow)]"></span>
              </span>
            </h2>
            </AnimatedSection>

            <div className="space-y-6 text-[16px] text-gray-300 leading-relaxed">
              <p>
                O <strong className="text-white">Itaú Unibanco</strong> é o maior banco privado do Brasil e da América Latina, com mais de 100 anos de história e atuação em diversos segmentos financeiros. No universo de investimentos, o grupo conta com a <strong className="text-white">Itaú Corretora</strong>, o <strong className="text-white">íon Itaú</strong>, <strong className="text-white">Uniclass</strong>, <strong className="text-white">Personnalité</strong> e o <strong className="text-white">Itaú Private Bank</strong>, que, em conjunto, atendem desde investidores iniciantes, passando pelos clientes de alta renda, e traders experientes.
              </p>
            </div>

            {/* Legal Disclaimer */}
            <div className="mt-8 bg-[var(--gray-900)] p-4 rounded-lg border-l-4 border-[var(--itau-primary)]">
              <p className="text-[14px] md:text-[15px] text-gray-300 leading-relaxed">
                <strong className="text-gray-300 font-bold">Nota:</strong> os resultados apresentados refletem o trabalho colaborativo dentro da equipe de comunicação e demais áreas como produtos, research e Inteligência Financeira do Itaú Unibanco, com minha participação direta nas estratégias e execução dos projetos.
              </p>
            </div>

            {/* Botão Ver pitch */}
            <div className="mt-8 flex justify-center">
              <a 
                href="https://acesse.one/AKcwz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-[16px] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,152,0,0.4)] shadow-lg"
                style={{ background: 'linear-gradient(135deg, #FF6D00 0%, #FF6D00 50%, #EF6C00 100%)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                Ver pitch em 1 minuto
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[#E8740C] to-transparent opacity-60"></div>

      {/* ========== BLOCO 2: OBJETIVO - ÍON FOR ADVISORS ========== */}
      <section className="py-12 md:py-20 bg-[var(--gray-950)] relative overflow-hidden">
        <div className="hidden md:block absolute right-[5%] top-[10%] w-[1px] h-[30%] bg-[var(--itau-primary)] opacity-[0.06]"></div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-12 text-center md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>Minhas principais contribuições</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--itau-yellow)]"></span>
              </span>
            </h2>
            </AnimatedSection>

            {/* Contribuições card */}
            <div className="rounded-2xl p-5 md:p-10 mb-8" style={{ background: 'linear-gradient(160deg, var(--itau-primary) 0%, var(--itau-accent) 40%, var(--itau-primary) 100%)', boxShadow: '0 20px 60px rgba(236, 112, 0, 0.4), 0 0 40px rgba(255, 204, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)' }}>
              <div className="space-y-4 text-[14px] md:text-[16px] text-gray-900 leading-relaxed">
                <p>
                  Em 2022, assumi uma posição estratégica como <strong className="font-bold text-black">"Key Position"</strong> na área de Assessoria de Produtos de Investimentos. Fui responsável por liderar e estruturar a Proposta de Valor, comunicação e narrativa, gerando propósito e engajamento para a expansão da rede de assessoria de <strong className="font-bold text-black">1.100 para 1.700 e, posteriormente, para quase 3k de assessores</strong>.
                </p>
                <p>
                  O projeto era um MVP de app e plataforma desenvolvido para oferecer informações de forma mais eficiente e ágil, atendendo às necessidades dos assessores no suporte aos seus clientes. Meu objetivo foi garantir que o <strong className="font-bold text-black">"Íon for Advisors"</strong> fosse uma solução digital clara e intuitiva, facilitando o dia a dia de todos os profissionais vinculados à marca Íon Itaú no Brasil.
                </p>
                <p>
                  Durante esse ciclo, estabeleci padrões de <strong className="font-bold text-black">governança em comunicação</strong>, desenvolvendo kits de mídia, trilhas educacionais, playbooks e treinamentos com o time de assessoria. Esse período foi crucial para aprender na prática sobre Marketing de Produtos, implementando estratégias como <strong className="font-bold text-black">Sales Enablement</strong> - que visa preparar e equipar o time com conhecimentos, habilidades, processos e ferramentas necessários para maximizar eficiência e resultados.
                </p>
              </div>
            </div>
            
            {/* íon for Advisors images - two side by side, same height */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-center">
              <div className="rounded-2xl shadow-lg overflow-hidden">
                <img
                  src="/manus-storage/Gemini_Generated_Image_8rn3j68rn3j68rn3_e8cced0d.webp" 
                  alt="íon for Advisors - Plataforma para assessores Itaú" 
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>
              <div className="rounded-2xl shadow-lg overflow-hidden">
                <img
                  src="/manus-storage/download(4)_8c67f365.webp" 
                  alt="íon for Advisors - Multi-device mockup" 
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>
            </div>

            {/* Destaques Estratégicos - B2B */}
            <div className="bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-2xl p-6 md:p-10 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-[var(--itau-yellow)]" />
                <h3 className="text-[19px] md:text-[24px] md:text-[32px] font-normal text-white">Destaques Estratégicos</h3>
              </div>
              <div className="space-y-4 text-[16px] text-gray-300 leading-relaxed">
                <p>
                  Liderança na definição da narrativa e propósito da plataforma <strong className="text-white">íon for Advisors</strong>, garantindo que a comunicação fosse clara e funcional na jornada, impactando cerca de <strong className="text-white">quase 3 mil assessores e 320 escritórios</strong>.
                </p>
                <p>
                  Após alcançar resultados significativos no íon for Advisors, fui migrada para a área de <strong className="text-white">Comunicação B2C</strong>, focando em clientes investidores. O objetivo era potencializar a rentabilização e engajar clientes, especialmente os sofisticados e avançados, para que investissem e conhecessem melhor os produtos disponíveis no Itaú. Nessa etapa, produzi conteúdo para <strong className="text-white">Itaú Varejo, Íon, Uniclass e Personnalité</strong>.
                </p>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[#E8740C] to-transparent opacity-60"></div>

      {/* ========== BLOCO 3: RESULTADOS ========== */}
      <section className="py-12 md:py-20 bg-[var(--gray-950)] relative overflow-hidden">
        <div className="hidden md:block absolute top-[20%] left-0 w-[4%] h-[1px] bg-[var(--itau-primary)] opacity-[0.08]"></div>

        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-4 text-center md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>Resultados Gerais</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--itau-yellow)]"></span>
              </span>
            </h2>
            </AnimatedSection>
            <p className="text-[16px] md:text-[18px] italic text-gray-400 text-center mb-16">Atuação Key Position e membro da Squad de Rentabilização de Investidores</p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
              {[
                { value: "+3K", label: "Clientes ativados", sublabel: "com campanhas personalizadas (12 meses)", color: "var(--itau-primary)", icon: <Users className="w-5 h-5" /> },
                { value: "88%", label: "Conversão via PCMs", sublabel: "Estratégia 'voz do assessor' (e-mail e pushs)", color: "var(--itau-accent)", icon: <BarChart3 className="w-5 h-5" /> },
                { value: "+55%", label: "Alcance íOn Trader", sublabel: "YouTube: +3.5K novos seguidores no lançamento", color: "var(--itau-primary)", icon: <Video className="w-5 h-5" /> },
                { value: "32-64%", label: "Taxa de abertura de e-mail", sublabel: "Macroeconomia e Produtos", color: "var(--itau-accent)", icon: <Mail className="w-5 h-5" /> },
                { value: "+R$ 1 MM", label: "Receita gerada", sublabel: "com apenas 1 e-mail 🏅", color: "var(--itau-primary)", icon: <Zap className="w-5 h-5" /> },
                { value: "+3K", label: "Assessores impactados", sublabel: "Expansão da rede de assessoria", color: "var(--itau-accent)", icon: <TrendingUp className="w-5 h-5" /> },
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
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[#E8740C] to-transparent opacity-60"></div>

      {/* ========== BLOCO 4: AMOSTRAGEM DE TEXTOS E E-MAILS ========== */}
      <section className="py-12 md:py-20 bg-[var(--gray-950)] relative overflow-hidden">
        <div className="hidden md:block absolute top-0 left-[8%] w-[1px] h-[25%] bg-[var(--itau-primary)] opacity-[0.06]"></div>

        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-4 text-center md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>Amostragem de comunicação</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--itau-yellow)]"></span>
              </span>
            </h2>
            </AnimatedSection>
            <p className="text-[17px] text-gray-400 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              Os e-mails abaixo fazem parte de longas réguas de relacionamento e rentabilização de clientes B2C, com taxas de abertura entre <strong className="text-white">30% e 64%</strong>, acima da média do mercado, dependendo da segmentação do público e do material enviado. A estratégia <strong className="text-[var(--itau-yellow)]">"Levantada de Mão"</strong> foi a que deu mais certo, gerando em 1 e-mail, <strong className="text-white">+ de R$ 1MM em Operações Estruturadas</strong>.
            </p>

            {/* Campanhas & Projetos */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[
                { title: "Hora de recalcular a sua rota financeira!", badge: "64% de impacto", desc: (<>Comunicação semestral com impacto de <strong className="font-bold text-white">64% para público segmentado</strong> de meio milhão de clientes investidores com perfil ativo.</>), detail: "Live com Nicholas McCarthy, CIO do Itaú Unibanco, e três estrategistas do Itaú BBA analisando mudanças no cenário macroeconômico e oportunidades de investimento.", pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/EDYvvvrvoHvrLjBW.pdf", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/qVWOyjCVdLSuEFOY.png" },
                { title: "Boletim Trader", badge: "Editoria recorrente", desc: "Editoria dedicada ao público trader com estratégia de alavancar textos no app íon Itaú e canal íon Trader no YouTube.", detail: "Seções: 'Para ficar por dentro', 'Oportunidades da Semana', 'Reflexão da semana'. Integração com 'Dominando a Bolsa' e 'Giro de Mercado'. Edição especial: 'Vem aí, Futuro de Bitcoin pela B3'.", pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/tqqPXYquYmTCTZnF.pdf", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/geYjErpbQmHtIQrE.png" },
                { title: "Day Trade com Bitcoin (BIT)", badge: "Inédito no Brasil", desc: "Lançamento da disponibilização de BIT na Itaú Corretora com comunicação dirigida e conteúdo educacional.", detail: "Conteúdo educacional: 'Como funciona o contrato futuro de Bitcoin (BIT)?', 'Como operar Futuro de Bitcoin (BIT)?'. Estratégia de texto no feed de notícias no íon Itaú app.", pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/ghHySQrkPxFTqmbY.pdf", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/QDbimynGpFfOmRqF.png" },
                { title: "Renda Fixa & Crédito Privado", badge: "55% penetração", desc: "Campanha 'Seu investimento está prestes a vencer! Não deixe seu dinheiro parado' com quase 55% de penetração no público-alvo.", detail: "Editoria recorrente sobre Crédito Privado, mercado secundário e opções de Renda Fixa para investir.", pdf: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/KYBUiYzpHPgiyAsk.pdf", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/TeEwSXtsYidhBusl.png" },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-[var(--gray-900)] rounded-xl p-6 border border-[var(--gray-800)] hover:border-[var(--itau-primary)]/30 hover:shadow-[0_0_20px_rgba(236,112,0,0.08)] transition-all duration-300 flex flex-col"
                >
                  {card.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <span className="inline-block px-3 py-1 rounded-full bg-[var(--itau-primary)]/10 text-[var(--itau-primary)] text-xs font-semibold mb-4">
                    {card.badge}
                  </span>
                  <h4 className="font-bold text-[18px] text-white mb-3">{card.title}</h4>
                  <p className="text-[17px] text-gray-400 mb-4 leading-relaxed flex-1">
                    {typeof card.desc === 'string' ? card.desc : card.desc}
                  </p>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedCards[`itau-${i}`] ? 'max-h-96' : 'max-h-0'}`}>
                    <p className="text-[17px] text-gray-400 mb-3 leading-relaxed">{card.detail}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-auto pt-4">
                    <button 
                      onClick={() => toggleCard(`itau-${i}`)}
                      className="text-[var(--itau-yellow)] text-sm font-medium hover:underline flex items-center gap-1"
                    >
                      {expandedCards[`itau-${i}`] ? 'Ver menos' : 'Continuar lendo'}
                      {expandedCards[`itau-${i}`] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {card.pdf && (
                      <a 
                        href={card.pdf} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--itau-primary)] text-white text-sm font-medium hover:bg-[var(--itau-primary)]/80 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Ver PDF
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Nota autoral */}
            <div className="bg-[var(--gray-900)] p-4 rounded-lg border-l-4 border-[var(--itau-yellow)] mb-16">
              <p className="text-[14px] md:text-[15px] text-gray-200 leading-relaxed">
                <strong className="text-gray-300 font-bold">*</strong> Material totalmente autoral. Muito pouco se usava IA para produção de textos nesse período, já que ela estava muito suscetível a erros - o que não pode acontecer na comunicação de um banco.
              </p>
            </div>

            {/* Criptoativos - com imagem */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 bg-gradient-to-br from-[#E8740C] to-[#FF6D00] rounded-2xl overflow-hidden">
              <div className="overflow-hidden">
                <img
                  src="/manus-storage/pasted_file_B7Lkxk_image_6abc2e6f.png" 
                  alt="5 motivos para investir em Criptoativos - Samir Kerbage, CIO global da Hashdex" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="text-white/90 mb-4">
                  <Video className="w-10 h-10" />
                </div>
                <h4 className="font-bold text-[20px] text-white mb-4">Criptoativos</h4>
                <p className="text-[17px] text-white/90 leading-relaxed mb-4">
                  Conteúdo sobre investimento em criptoativos com Samir Kerbage, CIO global da Hashdex. "5 motivos para investir em Criptoativos" - estratégia interessante para quem busca diversificar carteira, no Instagram @itaupersonnalite.
                </p>
                <p className="text-[17px] text-white/80 italic mb-6">Dê play e confira!</p>
                <div className="flex items-center gap-4">
                  <span className="text-[14px] text-white/80">@itaupersonnalite</span>
                  <a 
                    href="https://www.instagram.com/hashdex.crypto/reel/CsJ65sqp2zK/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-[var(--itau-yellow)] text-black font-bold text-[14px] rounded-full hover:bg-yellow-400 transition-colors"
                  >
                    Quero Ver
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Ficha Técnica */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {[
                { label: "Role", value: "Analista Sênior de Comunicação & Marketing (Key Position)" },
                { label: "Foco", value: "Jornada íon Itaú, Rentabilização B2C, Sales Enablement" },
                { label: "Canais", value: "íon Itaú App, E-mail, YouTube, Redes Sociais" },
                { label: "Impacto", value: "+R$ 1MM com 1 e-mail" },
              ].map((item, i) => (
                <div key={i} className="bg-[var(--gray-900)] p-4 md:p-6 rounded-xl border border-[var(--gray-800)]">
                  <span className="block text-[12px] text-gray-400 font-semibold uppercase mb-2 tracking-widest">{item.label}</span>
                  <span className="font-bold text-white text-[14px] md:text-[17px]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ - PERGUNTAS SOBRE O PROJETO ========== */}
      <section className="py-12 md:py-20 bg-[var(--gray-950)] relative overflow-hidden">
        <div className="hidden md:block absolute top-[20%] right-[5%] w-[1px] h-[30%] bg-[var(--itau-primary)] opacity-[0.06]"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fadeUp" duration={0.8}>
            <h2 className="text-[24px] md:text-[32px] font-normal text-white mb-4 text-center md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>FAQ</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--itau-yellow)]"></span>
              </span>
            </h2>
            </AnimatedSection>
            <p className="text-[17px] text-gray-400 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              Respostas detalhadas sobre minha atuação no projeto <strong className="text-white">íon for Advisors</strong> e na área de comunicação do Itaú Unibanco.
            </p>

            <div className="space-y-3">
              {[
                { q: "Como era exatamente a rotina desse projeto de MVP no dia a dia?", a: "Liderava a construção de comunicações para os próprios assessores de investimento do Itaú para que testassem o produto, realizando conteúdos sobre o novo produto (one-pagers, decks, cases, battlecards, templates), metodologia e playbooks (mensagens, objeções, etapas do funil, discovery), treinamento (onboarding, certificações, role plays), ferramentas e operações (Microsoft, cadências, automações, sales engagement), inteligência e métricas (win/loss, análise de pipeline, qualidade de leads), governança de narrativa (proposta de valor, posicionamento, ICP/personas) com objetivo de reduzir ramp-up de novos assessores, aumentar win rate, ticket e previsibilidade e viabilidade no uso da nova solução." },
                { q: "Qual foi a decisão mais importante que você tomou sozinha nesse projeto?", a: "Somente sobre minhas prioridades de entrega. O banco é muito burocrático e decisões, até mesmo de gestores, são elevadas ao nível hierárquico mais alto de cada área, portanto, não havia autonomia para gerenciar qualquer mudança sem aprovação de muitas pessoas envolvidas no processo." },
                { q: "Em que momentos você destravava o trabalho dos outros times?", a: "Quando o time de apoio de comunicação em outra área poderia me ajudar com arte e designers. Se fosse hoje, eu mesma faria, mas no período não era possível produzir esses materiais sem depender de um designer." },
                { q: "Qual foi o maior problema real que o íon for Advisors resolveu na prática?", a: "Previsibilidade e rápida informação ao acesso histórico de dados de investimentos dos clientes íon que, na prática, já tinham uma jornada de conta no Itaú." },
                { q: "Você teve contato direto com os assessores? Como coletava feedback?", a: "Sim, era tudo feito e documentado via Teams porque não era possível priorizar CRM para campanhas internas. Foi tudo muito feito manualmente, com entrevistas, página no SharePoint, criação de grupo, focus group, etc." },
                { q: "Como você sabia que a experiência (UX/comunicação) estava funcionando?", a: "Essa pesquisa era feita por liberação de features do produto. Se após treinamento da plataforma houvesse muitas dúvidas, havia revisão da parte de UX de determinada feature." },
                { q: "Você não podia usar CRM… o que fez diferente por causa disso?", a: "Criei os manuais, a governança de narrativa e método de coleta com entrevistas, treinamentos, focus group e warroom. Uma metodologia própria para compensar a falta de CRM." },
                { q: "Como funcionava a Trilha Educacional (IOX) para gerar insights?", a: "Assim como uma universidade interna de cursos, a IOX serve para atualizar cursos obrigatórios como Prevenção à Lavagem de Dinheiro, treinamentos diversos, Ética, cultura da empresa entre outros temas. Para analisar números de acesso e comentários, havia um login especial para quem criava trilhas de aprendizagem." },
                { q: "No trabalho com dados: você só recebia análises prontas ou participava da construção?", a: "Recebia os dados brutos e trabalhava junto ao time na análise." },
                { q: "Sobre as campanhas: quantas rodava por mês? Cuidava ponta a ponta?", a: "Era treinamentos, conversas, entrevistas - um fluxo de treinamento end-to-end para treinar os assessores. Tivemos 'lançamentos' de cada etapa liberando para mais usuários, dependendo das entregas de features do time de produtos. 'Agora vamos abrir o teste para mais 100 assessores, o Beta X' - inventava um nome para a etapa de experimentação para engajar os assessores." },
                { q: "Qual canal performava melhor e por quê?", a: "A plataforma de conhecimento do banco, IOX. Foram gravados vídeos de treinamentos de cada feature com o time de produtos, no qual eu preparei todos os roteiros. O banco tem uma política séria quanto à inclusão, então já praticava design instrucional, auto-descrição, antes mesmo de virar prática do mercado." },
                { q: "Na estratégia de 'levantada de mão': o que te fez ter essa ideia?", a: "A ideia foi colocar mais pontos de contato nas comunicações, como um botão para acionar o especialista sem precisar entrar no app do banco. Isso fez com que a interação pudesse ter um 'atalho'. Inicialmente pensado para comunicação de produtos que dependiam de mesa de operações, mas depois que vimos que deu certo, passamos a aplicar em comunicações comuns de oferta de produtos." },
                { q: "Sobre os resultados: o que era considerado 'sucesso'? Superou as metas?", a: "Superei muitas metas. Sucesso era conversão de produto e engajamento no conteúdo. Preparei materiais com taxa de abertura que chegou a mais de 64% no banco. Além de sempre trazer tendências e ideias novas, passei a escrever diretamente em nome de analistas grandes do banco que operavam com estratégias mais complexas de trading." },
                { q: "Algum resultado seu influenciou numa decisão maior do time?", a: "Quando passei a atuar mais B2C, na área de comunicação, entrei para uma squad de rentabilização de clientes - acredito pelos meus resultados positivos. Na squad, a priorização vinha de cima, mas me colocaram em projetos mais complexos, como atuação com analistas de trading, justamente pelos resultados alcançados." },
                { q: "Você criou algum material que continuou sendo usado depois que saiu?", a: "Sim, o canal íon Trader e programa Dominando a Bolsa, com identidade e conceito criado por mim, inclusive o lançamento, estão no ar até hoje." },
                { q: "Na prática, o que fazia você ser considerada 'Key Position'?", a: "Fui contratada para essa posição pois na prática era alguém que seria um ponto focal em projetos cross com outras áreas do banco. Eu era uma pessoa que fazia esse cross quando havia necessidade de desempenhar projetos com times diferentes da área que atuava." },
              ].map((item, i) => (
                <div key={i} className="bg-[var(--gray-900)] rounded-xl border border-[var(--gray-800)] overflow-hidden">
                  <button
                    onClick={() => toggleCard(`faq-${i}`)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-[var(--gray-800)]/30 transition-colors"
                  >
                    <span className="text-[17px] md:text-[16px] font-medium text-white pr-4">{item.q}</span>
                    {expandedCards[`faq-${i}`] ? (
                      <ChevronUp className="w-5 h-5 text-[var(--itau-yellow)] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
                    )}
                  </button>
                  {expandedCards[`faq-${i}`] && (
                    <div className="px-5 md:px-6 pb-5 md:pb-6">
                      <p className="text-[14px] md:text-[17px] text-gray-300 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[#E8740C] to-transparent opacity-60"></div>

      {/* ========== NAVEGAÇÃO ENTRE PROJETOS ========== */}
      <section className="py-12 md:py-20 bg-[var(--gray-950)]">
        <div className="container">
{/* Voltar ao início (substitui "Conheça outros projetos") */}
          <div className="text-center py-4 md:py-6">
            <a href="/#cases" data-voltar="1" className="inline-flex items-center gap-2 text-[#C9A96E] hover:text-white font-semibold text-[16px] md:text-[17px] underline underline-offset-4 decoration-[#C9A96E]/60 transition-colors">
              ← Voltar ao início
            </a>
          </div>


        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <Footer />
    </div>
  );
}
