import { useState } from "react";
import { ArrowLeft, ExternalLink, Newspaper, FileText, Instagram, Linkedin, TrendingUp, Award, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Video, CheckCircle2, Mail } from "lucide-react";
import { Link } from "wouter";

import { motion } from "framer-motion";

import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

export default function BEE4Case() {
  useSEO({
    title: "BEE4 | Mercado de Acesso Regulado pela CVM | Adriana Nogueira",
    description: "Case BEE4: Comunicação estratégica, branding e marketing para o primeiro mercado de acesso regulado pela CVM no Brasil. Projetos de Go-to-Market, PR, conteúdo institucional e campanhas B2B.",
    canonical: "/cases/bee4",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Cases", url: "/#cases-empresas" },
      { name: "BEE4", url: "/cases/bee4" }
    ],
    ogImage: "/assets/ovelha-og.jpg",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": "Case BEE4 - Comunicação & Marketing",
        "author": { "@type": "Person", "name": "Adriana Nogueira" },
        "about": { "@type": "Organization", "name": "BEE4", "description": "Mercado de Acesso Regulado pela CVM" },
        "description": "Comunicação estratégica, branding e marketing para o primeiro mercado de acesso regulado pela CVM no Brasil."
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adrianaport.vip" },
          { "@type": "ListItem", "position": 2, "name": "Cases", "item": "https://adrianaport.vip/cases" },
          { "@type": "ListItem", "position": 3, "name": "BEE4", "item": "https://adrianaport.vip/cases/bee4" }
        ]
      }
    ]
  });

  const [activeTab, setActiveTab] = useState<'linkedin' | 'instagram'>('linkedin');
  const [showAllPress, setShowAllPress] = useState(false);
  const [card1ImageIndex, setCard1ImageIndex] = useState(0);
  const [card2ImageIndex, setCard2ImageIndex] = useState(0);
  const [card3ImageIndex, setCard3ImageIndex] = useState(0);
  const [igCarouselIndex, setIgCarouselIndex] = useState(0);

  const card1Images = [
    { src: '/genial-logo-bee4.webp', alt: 'Genial Investimentos', caption: 'Genial Investimentos - Parceiro Estratégico', hasBorder: false },
    { src: '/images/logos/itau.png', alt: 'Itaú Private Bank', caption: 'Itaú Private Bank - Parceiro Estratégico', hasBorder: false },
    { src: '/app-mockups-bee4.webp', alt: 'Telas do aplicativo', caption: 'Interface do home broker da Genial', hasBorder: true }
  ];

  const card2Images = [
    { src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/UmNPYPErEXpxUkrV.png', alt: 'Brazil Journal', caption: 'Brazil Journal - 11 de abril de 2025', link: 'https://braziljournal.com/bee4-ganha-licencas-e-bolsa-para-pmes-da-mais-um-passo-adiante/' },
    { src: '/seu-dinheiro-bee4.webp', alt: 'Seu Dinheiro', caption: 'Seu Dinheiro - Mercado de Acesso', link: 'https://www.seudinheiro.com/2025/bolsa-dolar/depois-de-negociar-acoes-de-pequenas-e-medias-empresas-brasileiras-bee4-quer-estrear-na-renda-fixa-no-segundo-semestre-mabe/' }
  ];

  const card3Images = [
    { src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/ErgmeYlkbRoOujLU.png', alt: 'CVM', caption: 'CVM - Regime FÁCIL (03/07/2025)', link: 'https://www.gov.br/cvm/pt-br/assuntos/noticias/2025/cvm-cria-regime-facil-para-facilitar-acesso-de-companhias-de-menor-porte-ao-mercado-de-capitais' }
  ];

  // BEE4 brand colors (official palette)
  const brand = {
    darkGray: "#000000",      // Cinza escuro para fundos
    mediumGray: "#898989",    // Cinza médio para textos secundários
    deepBlue: "#060B7A",      // Azul profundo para destaques
    vibrantBlue: "#060B7A",   // Azul vibrante para bordas
    lightBlue: "#2DBCF7",     // Azul claro para elementos interativos
    black: "#000000",         // Preto puro para contraste máximo
  };

  return (
    <div className="min-h-screen text-foreground selection:bg-secondary selection:text-secondary-foreground flex flex-col" style={{ background: '#000000' }}>
      {/* Skip to content - Accessibility */}
      <a 
        href="#bee4-main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#060B7A] focus:text-white focus:rounded-md focus:text-sm focus:font-semibold"
      >
        Pular para o conteúdo principal
      </a>
      {/* ========== BLOCO 1: SOBRE A EMPRESA ========== */}
      <section id="bee4-main-content" aria-label="Sobre a BEE4" className="pt-6 md:pt-8 pb-12 md:pb-20 relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, #0a3d91 0%, #001a4d 40%, #000d33 70%, #000820 100%)' }}>
        {/* Geometric decorations - hidden on mobile */}
        <div className="hidden md:block absolute top-0 right-[10%] w-[1px] h-[40%] bg-[#2DBCF7] opacity-[0.15]"></div>
        <div className="hidden md:block absolute bottom-[10%] left-[5%] w-24 h-24 rounded-full border border-[#060B7A] opacity-[0.08]"></div>
        <div className="hidden md:block absolute top-[60%] right-0 w-[6%] h-[1px] bg-[#2DBCF7] opacity-[0.12]"></div>

        <div className="container relative z-10">


          {/* Logo + Company Name */}
          <div
            className="flex flex-col items-center text-center mb-8 md:mb-16"
          >
            <img 
              src="/images/logos/bee4-logo-new.webp" 
              alt="Logo da BEE4" 
              className="w-28 h-28 object-contain mb-1" 
            />
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[16px] text-white/80 font-light tracking-wide">Consultora & Especialista de Marketing</span>
            </div>
            <div className="flex gap-2 flex-wrap justify-center mt-4">
              {["Mercado de Capitais", "Blockchain", "Regime FÁCIL", "PMEs", "Mercado de Acesso", "DeFi", "DLT"].map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-[#2DBCF7]/10 text-[#2DBCF7] text-xs font-medium border border-[#2DBCF7]/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sobre a empresa */}
          <div
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-[18px] font-normal text-white mb-8 text-center md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>Sobre a BEE4</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#060B7A]"></span>
              </span>
            </h2>

            <div className="space-y-6 text-[16px] text-gray-300 leading-relaxed">
              <p>
                A <a href="https://bee4.com.br" target="_blank" rel="noopener noreferrer" className="text-[#2DBCF7] font-semibold hover:underline">BEE4</a> é um novo mercado regulado pela CVM no Brasil, com foco no <a href="https://bee4.com.br/blog/o-que-e-mercado-de-acesso-bee4/" target="_blank" rel="noopener noreferrer" className="text-[#2DBCF7] font-semibold hover:underline">desenvolvimento do segmento de acesso</a>, com licenças para atuar como <strong className="text-white">Depositária Central (CVM 31)</strong> e <strong className="text-white">Mercado de Balcão Organizado (CVM 135)</strong>, viabilizando o acesso de PMEs brasileiras ao mercado de capitais de forma inovadora, segura e eficiente.
              </p>
              <p>
                Quando iniciei na BEE4, enviei um case para estratégia de conexão com as corretoras. Posteriormente, após minha entrada, utilizamos algumas ideias que estavam nele durante essa etapa de integração com a <strong className="text-white">Genial Investimentos</strong> e o <strong className="text-white">Itaú Private Bank</strong>.
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <a 
                href="https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/jtpRlaiRUfBBZwiY.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 md:gap-3 bg-transparent text-white px-4 py-3 md:px-8 md:py-4 rounded-lg text-[16px] font-semibold hover:bg-white/10 transition-all duration-300 border-2 border-white/80 hover:border-white hover:shadow-lg text-center"
              >
                <FileText className="w-5 h-5 flex-shrink-0" />
                Confira meu Case de entrada na companhia
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
              </a>
            </div>

            {/* Vídeo YouTube */}
            <div className="mt-12 flex justify-center">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-white/10 w-full">
              <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/NeCBmFlLUF8?si=Qdu2VqA-mULLCpAj"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            </div>
            <div className="mt-2 flex justify-center px-4">
              <a 
                href="https://youtu.be/NeCBmFlLUF8?si=ZdOiVZH7aqh8C90H" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#2DBCF7] hover:text-[#2DBCF7]/80 text-[12px] md:text-[14px] font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Caso o vídeo não carregue, assista diretamente no YouTube
              </a>
            </div>

            {/* Segundo Vídeo YouTube */}
            <div className="mt-6 rounded-2xl overflow-hidden shadow-lg border border-white/10">
              <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/ZPm8M5o_3DM"
                  title="BEE4 - Conexão com Corretoras"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="mt-2 flex justify-center px-4">
              <a 
                href="https://www.youtube.com/watch?v=ZPm8M5o_3DM" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#2DBCF7] hover:text-[#2DBCF7]/80 text-[12px] md:text-[14px] font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Caso o vídeo não carregue, assista diretamente no YouTube
              </a>
            </div>

            {/* Roteiro info */}
            <div className="mt-8 bg-[#000000] p-6 rounded-lg border border-[#060B7A]/20">
              <p className="text-gray-300 text-[16px] leading-relaxed">
                Roteiros originais de minha autoria, desenvolvidos diante do desafio de ainda não haver nenhum mercado como esse no Brasil, especialmente focado em PMEs. Isso exigiu estudos aprofundados e algumas tentativas iniciais até chegar ao formato ideal. O resultado foi muito bem recebido, inclusive pela Genial, que aprovou a abordagem proposta. Este vídeo integra o projeto de <strong className="text-white">conexão com as corretoras</strong> <a href="https://www.genialinvestimentos.com.br/" target="_blank" rel="noopener noreferrer" className="text-[#2DBCF7] font-semibold hover:underline">Genial Investimentos</a> e o <strong className="text-white">Itaú Private Bank</strong>.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[2px] bg-[#060B7A] opacity-30"></div>

      {/* ========== BLOCO 2: OBJETIVO E DESAFIOS ========== */}
      <section aria-label="Objetivo e Desafios" className="py-12 md:py-20 bg-[#000000] relative overflow-hidden">
        <div className="hidden md:block absolute right-[5%] top-[10%] w-[1px] h-[30%] bg-[#2DBCF7] opacity-[0.12]"></div>
        <div className="hidden md:block absolute left-[3%] bottom-[20%] w-16 h-16 rounded-full border border-[#060B7A] opacity-[0.08]"></div>

        <div className="container relative z-10">
          <div
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-[18px] font-normal text-white mb-12 text-center md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>Minhas principais contribuições</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#060B7A]"></span>
              </span>
            </h2>

            {/* Contribuições card */}
            <div className="rounded-2xl p-5 md:p-10 mb-6 md:mb-8" style={{ background: 'linear-gradient(160deg, #060B7A 0%, #0D1494 40%, #060B7A 100%)', boxShadow: '0 20px 60px rgba(6, 11, 122, 0.4), 0 0 40px rgba(31, 8, 208, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.08)' }}>
              <div className="space-y-3 md:space-y-4 text-[16px] text-gray-200 leading-relaxed">
                <p>
                  Atuei nos <strong className="font-bold text-white">níveis estratégico, tático e operacional</strong> das estratégias de comunicação da BEE4, trabalhando diretamente ao lado da CMO Fernanda Verlangieri, da cofundadora e CEO, Patricia Stille e do Sócio-cofundador e Presidente do Conselho, Rodrigo Fiszman.
                </p>
                <p>
                  Participei de <strong className="font-bold text-white">projetos de grande relevância institucional</strong>, criando narrativas, direcionamentos e construindo materiais para diferentes públicos do ecossistema financeiro.
                </p>
                <p className="font-bold text-[16px] mt-4 md:mt-6 text-[#2DBCF7]" style={{ textShadow: '0 0 10px rgba(45, 188, 247, 0.5)' }}>Confira!</p>
              </div>
            </div>

            {/* 3 Milestone Cards with Images - Horizontal Layout */}
            <div className="flex flex-col gap-6 mb-8">
              {/* Card 1: Integração corretoras */}
              <div className="relative rounded-2xl overflow-hidden transition-all duration-500 flex flex-col md:flex-row group/card" style={{ background: 'linear-gradient(135deg, #060B7A 0%, #060B7A 100%)', boxShadow: '0 20px 60px rgba(6, 11, 122, 0.4), 0 0 40px rgba(31, 8, 208, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
                <div className="p-4 md:p-8 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0 rounded-full bg-[#2DBCF7] flex items-center justify-center text-white font-bold text-base md:text-lg" style={{ boxShadow: '0 0 20px rgba(45, 188, 247, 0.6), 0 0 40px rgba(45, 188, 247, 0.3)' }}>1</div>
                    <h3 className="text-[16px] font-bold text-white leading-tight">Projeto de integração com corretoras</h3>
                  </div>
                  <p className="text-[16px] text-gray-300 leading-relaxed">
                    Primeira IMF no Brasil além da B3 a conectar com corretoras, redefinindo a experiência de compra/venda de ativos em balcão, trazendo a negociação para tela de home broker muito similar a de Bolsa.
                  </p>
                </div>
                {/* Image section - Carousel */}
                <div className="bg-black/40 p-3 md:p-4 md:w-[340px] flex-shrink-0 relative group flex flex-col items-center justify-center">
                  <div className="overflow-hidden rounded-lg w-full">
                    <img 
                      src={card1Images[card1ImageIndex].src}
                      alt={card1Images[card1ImageIndex].alt}
                      className={`w-full h-32 md:h-40 object-contain transition-transform duration-500 group-hover:scale-110 ${
                        card1Images[card1ImageIndex].hasBorder ? 'border-2 border-[#2DBCF7] rounded-lg' : ''
                      }`}
                    />
                  </div>
                  <p className="text-xs text-gray-400 text-center mt-2">{card1Images[card1ImageIndex].caption}</p>
                  
                  {/* Carousel controls */}
                  {card1Images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCard1ImageIndex((prev) => (prev === 0 ? card1Images.length - 1 : prev - 1))}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-1.5 md:p-2 rounded-full transition-all opacity-100 z-10"
                      >
                        <ChevronDown className="w-3 h-3 md:w-4 md:h-4 rotate-90" />
                      </button>
                      <button
                        onClick={() => setCard1ImageIndex((prev) => (prev === card1Images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-1.5 md:p-2 rounded-full transition-all opacity-100 z-10"
                      >
                        <ChevronDown className="w-4 h-4 -rotate-90" />
                      </button>
                      <div className="flex justify-center gap-1 mt-2">
                        {card1Images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCard1ImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === card1ImageIndex ? 'bg-[#C9A96E] w-4' : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Card 2: Licenças RCVM */}
              <div className="relative rounded-2xl overflow-hidden transition-all duration-500 flex flex-col md:flex-row group/card" style={{ background: 'linear-gradient(135deg, #060B7A 0%, #060B7A 100%)', boxShadow: '0 20px 60px rgba(6, 11, 122, 0.4), 0 0 40px rgba(31, 8, 208, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
                <div className="p-4 md:p-8 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0 rounded-full bg-[#2DBCF7] flex items-center justify-center text-white font-bold text-base md:text-lg" style={{ boxShadow: '0 0 20px rgba(45, 188, 247, 0.6), 0 0 40px rgba(45, 188, 247, 0.3)' }}>2</div>
                    <h3 className="text-[16px] font-bold text-white leading-tight">Licenças RCVM 135 e RCVM 31</h3>
                  </div>
                  <p className="text-[16px] text-gray-300 leading-relaxed mb-3 md:mb-4">
                    A BEE4 foi a primeira iniciativa a sair do Sandbox, recebendo em tempo récorde as licenças definitivas de Depositária Central e Mercado de Balcão Organizado (Ações, Debêntures e Notas Comerciais).
                  </p>
                  <a 
                    href={card2Images[0].link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#2DBCF7] font-semibold text-sm hover:underline transition-colors mt-auto"
                  >
                    Clique aqui e confira!
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                {/* Image section - Single image */}
                <div className="bg-black/40 p-3 md:p-4 md:w-[340px] flex-shrink-0 flex flex-col items-center justify-center">
                  <a 
                    href={card2Images[0].link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full group"
                  >
                    <div className="overflow-hidden rounded-lg">
                      <img 
                        src={card2Images[0].src}
                        alt={card2Images[0].alt}
                        className="w-full h-32 md:h-40 object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                      />
                    </div>
                  </a>
                  <p className="text-xs text-gray-400 text-center mt-2">{card2Images[0].caption}</p>
                </div>
              </div>

              {/* Card 3: Inovação regulatória */}
              <div className="relative rounded-2xl overflow-hidden transition-all duration-500 flex flex-col md:flex-row group/card" style={{ background: 'linear-gradient(135deg, #060B7A 0%, #060B7A 100%)', boxShadow: '0 20px 60px rgba(6, 11, 122, 0.4), 0 0 40px rgba(31, 8, 208, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
                <div className="p-4 md:p-8 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0 rounded-full bg-[#2DBCF7] flex items-center justify-center text-white font-bold text-base md:text-lg" style={{ boxShadow: '0 0 20px rgba(45, 188, 247, 0.6), 0 0 40px rgba(45, 188, 247, 0.3)' }}>3</div>
                    <h3 className="text-[16px] font-bold text-white leading-tight">Inovação regulatória</h3>
                  </div>
                  <p className="text-[16px] text-gray-300 leading-relaxed mb-3 md:mb-4">
                    Colaborando ativamente com CVM e Ministério da Fazenda, a BEE4 ajudou a forjar através do Sandbox uma nova regulamentação para facilitar o acesso de empresas com faturamento anual de até R$ 500MM.
                  </p>
                  <a 
                    href={card3Images[card3ImageIndex].link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#2DBCF7] font-semibold text-sm hover:underline transition-colors mt-auto"
                  >
                    Clique aqui e confira!
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                {/* Image section - Carousel */}
                <div className="bg-black/40 p-3 md:p-4 md:w-[340px] flex-shrink-0 relative group flex flex-col items-center justify-center">
                  <a 
                    href={card3Images[card3ImageIndex].link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <div className="overflow-hidden rounded-lg">
                      <img 
                        src={card3Images[card3ImageIndex].src}
                        alt={card3Images[card3ImageIndex].alt}
                        className="w-full h-32 md:h-40 object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                      />
                    </div>
                  </a>
                  <p className="text-xs text-gray-400 text-center mt-2">{card3Images[card3ImageIndex].caption}</p>
                  
                  {/* Carousel controls */}
                  {card3Images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCard3ImageIndex((prev) => (prev === 0 ? card3Images.length - 1 : prev - 1))}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-1.5 md:p-2 rounded-full transition-all opacity-100 z-10"
                      >
                        <ChevronDown className="w-3 h-3 md:w-4 md:h-4 rotate-90" />
                      </button>
                      <button
                        onClick={() => setCard3ImageIndex((prev) => (prev === card3Images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-1.5 md:p-2 rounded-full transition-all opacity-100 z-10"
                      >
                        <ChevronDown className="w-4 h-4 -rotate-90" />
                      </button>
                      <div className="flex justify-center gap-1 mt-2">
                        {card3Images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCard3ImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === card3ImageIndex ? 'bg-[#C9A96E] w-4' : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[2px] bg-[#060B7A] opacity-30"></div>

      {/* ========== BLOCO 3: RESULTADOS ========== */}
      <section aria-label="Resultados" className="py-12 md:py-20 bg-[#0A1628] relative overflow-hidden">
        <div className="hidden md:block absolute top-0 left-[8%] w-[1px] h-[25%] bg-[#C9A96E] opacity-[0.1]"></div>
        <div className="hidden md:block absolute bottom-[5%] right-[5%] w-20 h-20 rounded-full border border-[#C9A96E] opacity-[0.06]"></div>

        <div className="container relative z-10">
          <div
          >
            <h2 className="text-[18px] font-normal text-white mb-4 text-center md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>Resultados</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#060B7A]"></span>
              </span>
            </h2>
            <p className="text-center text-gray-400 text-[16px] md:text-[18px] italic mb-8 md:mb-16" style={{ fontFamily: "'Open Sans', sans-serif" }}>Crescimento e engajamento mensuráveis</p>
          </div>

          {/* Resultados em formato comparativo (slide style) - Cores BEE4 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
            
            {/* Card 1: Instagram */}
            <div
              className="flex flex-col"
            >
              <div className="flex justify-center mb-2 md:mb-4">
                <span className="inline-flex items-center gap-2 bg-[#060B7A] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[11px] md:text-[14px] font-bold tracking-wide">
                  <Instagram className="w-3 h-3 md:w-4 md:h-4" />
                  INSTAGRAM
                </span>
              </div>
              <p className="text-center text-[10px] md:text-[12px] text-[#2DBCF7] font-semibold mb-4 md:mb-6" style={{ fontFamily: "'Open Sans', sans-serif" }}>ago/24 – ago/25</p>
              <div className="border-l-[2px] md:border-l-[3px] border-[#060B7A] pl-3 md:pl-5 space-y-3 md:space-y-5">
                <div>
                  <p className="text-[20px] md:text-[28px] font-extrabold text-[#2DBCF7] leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>~1K</p>
                  <p className="text-[11px] md:text-[15px] text-gray-400 mt-1 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>Novos seguidores no Instagram em menos de 1 ano.</p>
                </div>
                <div>
                  <p className="text-[18px] md:text-[26px] font-extrabold text-white leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>8,20%</p>
                  <p className="text-[11px] md:text-[15px] text-gray-400 mt-1 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>Engajamento médio.</p>
                  <p className="text-[10px] md:text-[12px] text-[#2DBCF7] font-semibold mt-0.5" style={{ fontFamily: "'Open Sans', sans-serif" }}>(3x acima do benchmark B2B)</p>
                </div>
                <div>
                  <p className="text-[18px] md:text-[26px] font-extrabold text-white leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>956</p>
                  <p className="text-[11px] md:text-[15px] text-gray-400 mt-1 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>Visualizações por post (média).</p>
                </div>
                <div>
                  <p className="text-[18px] md:text-[26px] font-extrabold text-white leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>6.560</p>
                  <p className="text-[11px] md:text-[15px] text-gray-400 mt-1 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>Visualizações ROTA FÁCIL (pico).</p>
                </div>
              </div>
              <p className="text-white font-medium text-[14px] md:text-[15px] mt-5 md:mt-6 leading-relaxed border-l-4 border-[#2DBCF7] bg-[#2DBCF7]/10 rounded-r-xl py-3.5 md:py-4 pl-4 pr-4 shadow-[0_8px_30px_rgba(45,188,247,0.12)]" style={{ fontFamily: "'Open Sans', sans-serif" }}><span className="block text-[11px] md:text-[12px] font-bold uppercase tracking-[0.14em] text-[#2DBCF7] mb-1.5">Resultado</span>Alavanquei o Instagram, alcançando engajamento médio de 8,20%, 3x acima do benchmark B2B. Média de 956 visualizações por post, com picos de mais de 100 interações em comunicações regulatórias e lançamentos estratégicos como o programa Rota FÁCIL (+6,5 mil visualizações).</p>
            </div>

            {/* Card 2: SEO +SGE em Conteúdos BEE4 */}
            <div
              className="flex flex-col"
            >
              <div className="flex justify-center mb-2 md:mb-4">
                <span className="inline-flex items-center gap-1.5 md:gap-2 bg-[#060B7A] text-white px-3 md:px-6 py-2 md:py-2.5 rounded-full text-[9px] md:text-[14px] font-bold tracking-wide text-center leading-tight">
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                  <span>SEO +SGE</span>
                </span>
              </div>
              <p className="text-center text-[10px] md:text-[12px] text-[#2DBCF7] font-semibold mb-4 md:mb-8" style={{ fontFamily: "'Open Sans', sans-serif" }}>2024 vs 2025</p>
              <div className="border-l-[2px] md:border-l-[3px] border-[#2DBCF7] pl-3 md:pl-5 space-y-4 md:space-y-6">
                <div>
                  <p className="text-[20px] md:text-[28px] font-extrabold text-[#2DBCF7] leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>+42%</p>
                  <p className="text-[11px] md:text-[15px] text-gray-400 mt-1 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>Crescimento em impressões orgânicas.</p>
                  <p className="text-[10px] md:text-[12px] text-[#2DBCF7] font-semibold mt-0.5" style={{ fontFamily: "'Open Sans', sans-serif" }}>(88K → +125K)</p>
                </div>
                <div>
                  <p className="text-[18px] md:text-[26px] font-extrabold text-white leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>17,3 → 10,3</p>
                  <p className="text-[11px] md:text-[15px] text-gray-400 mt-1 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>Posição média na SERP.</p>
                </div>
                <div>
                  <p className="text-[18px] md:text-[26px] font-extrabold text-white leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>SGE</p>
                  <p className="text-[11px] md:text-[15px] text-gray-400 mt-1 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>Técnicas implementadas em AI Overviews.</p>
                </div>
              </div>
              <p className="text-white font-medium text-[14px] md:text-[15px] mt-5 md:mt-6 leading-relaxed border-l-4 border-[#2DBCF7] bg-[#2DBCF7]/10 rounded-r-xl py-3.5 md:py-4 pl-4 pr-4 shadow-[0_8px_30px_rgba(45,188,247,0.12)]" style={{ fontFamily: "'Open Sans', sans-serif" }}><span className="block text-[11px] md:text-[12px] font-bold uppercase tracking-[0.14em] text-[#2DBCF7] mb-1.5">Resultado</span>Ampliei +42% as impressões orgânicas e melhorei a posição média de 17,3 para 10,3. Apliquei técnicas de SGE para o ranqueamento em AI Overviews do Google.</p>
            </div>

            {/* Card 3: LinkedIn */}
            <div
              className="flex flex-col"
            >
              <div className="flex justify-center mb-2 md:mb-4">
                <span className="inline-flex items-center gap-2 bg-[#060B7A] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[11px] md:text-[14px] font-bold tracking-wide">
                  <Linkedin className="w-3 h-3 md:w-4 md:h-4" />
                  LINKEDIN
                </span>
              </div>
              <p className="text-center text-[10px] md:text-[12px] text-[#2DBCF7] font-semibold mb-4 md:mb-6" style={{ fontFamily: "'Open Sans', sans-serif" }}>ago/25</p>
              <div className="border-l-[2px] md:border-l-[3px] border-[#060B7A] pl-3 md:pl-5 space-y-3 md:space-y-4">
                <div>
                  <p className="text-[18px] md:text-[26px] font-extrabold text-[#2DBCF7] leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>16K</p>
                  <p className="text-[11px] md:text-[15px] text-gray-400 mt-1 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>Impressões orgânicas.</p>
                </div>
                <div>
                  <p className="text-[18px] md:text-[26px] font-extrabold text-white leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>13,36%</p>
                  <p className="text-[11px] md:text-[15px] text-gray-400 mt-1 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>Engajamento.</p>
                </div>
                <div>
                  <p className="text-[18px] md:text-[26px] font-extrabold text-white leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>1.534</p>
                  <p className="text-[11px] md:text-[15px] text-gray-400 mt-1 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>Cliques (CTR ~9,5%).</p>
                </div>
                <div>
                  <p className="text-[18px] md:text-[26px] font-extrabold text-white leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>+207</p>
                  <p className="text-[11px] md:text-[15px] text-gray-400 mt-1 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>Novos seguidores.</p>
                </div>
              </div>
              <p className="text-white font-medium text-[14px] md:text-[15px] mt-5 md:mt-6 leading-relaxed border-l-4 border-[#2DBCF7] bg-[#2DBCF7]/10 rounded-r-xl py-3.5 md:py-4 pl-4 pr-4 shadow-[0_8px_30px_rgba(45,188,247,0.12)]" style={{ fontFamily: "'Open Sans', sans-serif" }}><span className="block text-[11px] md:text-[12px] font-bold uppercase tracking-[0.14em] text-[#2DBCF7] mb-1.5">Resultado</span>Exemplo com foco em Personal Branding, gerando ~16 mil impressões, 13,36% de engajamento e +207 novos seguidores. Canal consolidado com tom de voz dos fundadores, sem uso de IA nas postagens e seguindo boas práticas de acessibilidade.</p>
            </div>

            {/* Card 4: Imprensa */}
            <div
              className="flex flex-col"
            >
              <div className="flex justify-center mb-2 md:mb-4">
                <span className="inline-flex items-center gap-2 bg-[#060B7A] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[11px] md:text-[14px] font-bold tracking-wide">
                  <Newspaper className="w-3 h-3 md:w-4 md:h-4" />
                  IMPRENSA
                </span>
              </div>

              {/* Janeiro 2024 */}
              <div className="border-l-[2px] md:border-l-[3px] border-gray-500/50 pl-3 md:pl-5 space-y-2 md:space-y-3 mb-4 md:mb-6 opacity-70">
                <p className="text-[11px] md:text-[15px] text-gray-400 font-bold uppercase tracking-wider" style={{ fontFamily: "'Open Sans', sans-serif" }}>Janeiro/24</p>
                <div>
                  <p className="text-[14px] md:text-[18px] font-bold text-gray-400 leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>9</p>
                  <p className="text-[10px] md:text-[12px] text-gray-500 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>Publicações/Links.</p>
                </div>
                <div>
                  <p className="text-[14px] md:text-[18px] font-bold text-gray-400 leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>~64K</p>
                  <p className="text-[10px] md:text-[12px] text-gray-500 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>Visualizações.</p>
                </div>
                <div>
                  <p className="text-[14px] md:text-[18px] font-bold text-gray-400 leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>18MM</p>
                  <p className="text-[10px] md:text-[12px] text-gray-500 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>Projeção de audiência.</p>
                </div>
              </div>

              {/* Seta de evolução */}
              <div className="flex justify-center mb-4 md:mb-6">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-[#2DBCF7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* Outubro 2025 */}
              <div className="border-l-[2px] md:border-l-[3px] border-[#2DBCF7] pl-3 md:pl-5 space-y-2 md:space-y-3">
                <p className="text-[11px] md:text-[15px] text-[#2DBCF7] font-bold uppercase tracking-wider" style={{ fontFamily: "'Open Sans', sans-serif" }}>Outubro/2025</p>
                <div>
                  <p className="text-[16px] md:text-[19px] font-extrabold text-white leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>11</p>
                  <p className="text-[10px] md:text-[12px] text-gray-400 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>Publicações/Links.</p>
                </div>
                <div>
                  <p className="text-[16px] md:text-[19px] font-extrabold text-white leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>+171K</p>
                  <p className="text-[10px] md:text-[12px] text-gray-400 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>Visualizações <span className="text-[#2DBCF7] font-semibold">(+167%)</span>.</p>
                </div>
                <div>
                  <p className="text-[16px] md:text-[19px] font-extrabold text-white leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>64,5MM</p>
                  <p className="text-[10px] md:text-[12px] text-gray-400 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>Projeção de audiência <span className="text-[#2DBCF7] font-semibold">(+258%)</span>.</p>
                </div>
                <div>
                  <p className="text-[16px] md:text-[19px] font-extrabold text-[#2DBCF7] leading-tight" style={{ fontFamily: "'Open Sans', sans-serif" }}>TOP 3</p>
                  <p className="text-[10px] md:text-[12px] text-gray-400 leading-snug" style={{ fontFamily: "'Open Sans', sans-serif" }}>Estadão, EXAME, BlockNews.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[2px] bg-[#060B7A] opacity-30"></div>

      {/* ========== BLOCO: CONTEÚDOS DE DESTAQUE - COBERTURA DE IMPRENSA ========== */}
      <section className="py-12 md:py-20 bg-[#000000] relative overflow-hidden">
        <div className="container relative z-10">
          <div
            className="text-center mb-8"
          >
            <h2 className="text-[18px] font-normal text-white mb-4 md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>Conteúdos de destaque na Imprensa</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#060B7A]"></span>
              </span>
            </h2>
            <p className="text-[16px] text-gray-400 italic">Matérias veiculadas através dos meus releases | 2024-2025</p>
          </div>

          {/* Assessoria info */}
          <div
            className="max-w-5xl mx-auto mb-12 bg-[#000000] border-2 border-[#060B7A]/50 rounded-2xl p-4 md:p-8"
          >
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Texto */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Newspaper className="w-7 h-7 text-[#C9A96E] flex-shrink-0" />
                  <h3 className="font-bold text-lg text-white">Atuação conjunta com agência de assessoria de Imprensa</h3>
                </div>
                <p className="text-[16px] text-gray-300 leading-relaxed mb-4">
                  Os releases eram produzidos internamente, enquanto nossa assessoria de imprensa conduzia de forma estratégica o relacionamento com repórteres e veículos. A maioria das matérias foi publicada reproduzindo, com fidelidade, as informações dos releases que desenvolvi. Também desenvolvi o conteúdo da página Sala de Imprensa com a colaboração da designer do time. Confira!
                </p>
                <p className="text-[14px] text-white/70 italic mb-4">*Selecionar por ano: 2024 e 2025.</p>
              </div>
              {/* Imagem mockup */}
              <div className="md:w-[320px] flex-shrink-0 flex flex-col items-center">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/cKVJrScAGalxLgyF.png" 
                  alt="Sala de Imprensa BEE4 - Desktop e Mobile" 
                  className="w-full rounded-xl"
                />
              </div>
            </div>
            {/* Botões alinhados lado a lado, centralizados */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <a href="https://bee4.com.br/sala-de-imprensa/releases/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#C9A96E] text-[#000000] px-5 py-2.5 rounded-none text-sm font-medium hover:bg-[#b8944f] transition-colors">
                <ExternalLink className="w-4 h-4" /> Acessar Releases/Matérias
              </a>
              <a href="https://bee4.com.br/sala-de-imprensa/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#C9A96E] text-[#000000] px-5 py-2.5 rounded-none text-sm font-medium hover:bg-[#b8944f] transition-colors">
                <ExternalLink className="w-4 h-4" /> Acessar Sala de Imprensa
              </a>
            </div>
          </div>

          {/* Press Cards - Carrossel Horizontal */}
          {(() => {
            const pressItems = [
              { outlet: "Valor Econômico", color: "#1B5E20", title: "BEE4 lança 'Rota Fácil' para subsidiar listagem de empresas menores", date: "Agosto 2025", link: "https://valor.globo.com/financas/noticia/2025/08/27/bee4-lana-rota-fcil-para-subsidiar-listagem-de-empresas-menores.ghtml", cta: "Leia no Valor →" },
              { outlet: "BlockNews", color: "#C9A96E", title: "BEE4 lança programa de subsídio de acesso de 10 PMEs no mercado de capitais", date: "Dezembro 2025", link: "https://www.blocknews.com.br/financas-corporativo/bee4-lanca-programa-de-subsidio-de-acesso-de-10-pmes-no-mercado-de-capitais/", cta: "Leia na BlockNews →" },
              { outlet: "Brazil Journal", color: "#FFC107", title: "BEE4 ganha licenças; Bolsa para PMEs dá mais um passo adiante", date: "Setembro 2025", link: "https://braziljournal.com/bee4-ganha-licencas-e-bolsa-para-pmes-da-mais-um-passo-adiante/", cta: "Leia no Brazil Journal →" },
              { outlet: "Exame", color: "#C9A96E", title: "Alternativa à B3 promete menos custo, mais facilidade e inovação", date: "Setembro 2025", link: "https://exame.com/negocios/bee4-b3-pmes-como-listar-abrir-capital/", cta: "Leia na Exame →" },
              { outlet: "Infomoney", color: "#C9A96E", title: "PMEs na Bolsa: CVM prevê norma para 2025 e BEE4 se prepara", date: "Novembro 2024", link: "https://www.infomoney.com.br/onde-investir/pmes-na-bolsa-cvm-preve-norma-para-2025-e-bee4-se-prepara-para-ser-a-nova-b3/", cta: "Leia no Infomoney →" },
              { outlet: "CNN Money", color: "#C9A96E", title: "Capital Insights entrevista Patricia Stille, CEO da BEE4", date: "Junho 2025", link: "https://www.youtube.com/watch?v=6-tiuiHhSEk", cta: "Assista →" },
            ];
            return (
              <div className="relative max-w-5xl mx-auto">
                <button
                  onClick={() => {
                    const el = document.getElementById('press-carousel');
                    if (el) el.scrollBy({ left: -340, behavior: 'smooth' });
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 w-8 h-8 md:w-10 md:h-10 bg-[#C9A96E] text-white rounded-full flex items-center justify-center hover:bg-[#C9A96E] transition-colors shadow-lg"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <div
                  id="press-carousel"
                  className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {pressItems.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 hover:border-[#2DBCF7]/50 transition-all duration-300 flex-shrink-0 w-[260px] md:w-[320px] shadow-sm hover:shadow-md"
                    >
                      <span className="inline-block px-2 py-1 text-white text-xs font-medium rounded mb-3" style={{ backgroundColor: item.color }}>{item.outlet}</span>
                      <h3 className="font-bold text-lg text-gray-900 mb-3">{item.title}</h3>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-gray-500">{item.date}</span>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-[#0A1628] text-white px-3 py-1 rounded text-xs font-medium hover:bg-[#1a3a5c] transition-colors">
                          {item.cta}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('press-carousel');
                    if (el) el.scrollBy({ left: 340, behavior: 'smooth' });
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 w-8 h-8 md:w-10 md:h-10 bg-[#C9A96E] text-white rounded-full flex items-center justify-center hover:bg-[#C9A96E] transition-colors shadow-lg"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Divider */}
      <div className="h-[2px] bg-[#060B7A] opacity-30"></div>

      {/* ========== BLOCO 4: CONTEÚDOS DE DESTAQUE - BLOG & NEWSLETTER ========== */}
      <section className="py-12 md:py-20 relative overflow-hidden" style={{ background: `linear-gradient(180deg, rgba(10,20,40,0.92) 0%, rgba(10,20,40,0.96) 100%), url('https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/gcuxDmqRNHCcHDVK.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

        <div className="container relative z-10">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-[18px] font-normal text-white mb-4 md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>Conteúdos de destaque</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#060B7A]"></span>
              </span>
            </h2>
<p className="text-[16px] text-gray-400 italic mt-4 max-w-2xl mx-auto">
               O mesmo conteúdo do Blog era postado também no LinkedIn, no BEE4 Explica.
            </p>
            <div className="flex gap-3 justify-center mt-6 flex-wrap">
              <a href="https://bee4.com.br/blog/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#C9A96E] text-[#000000] px-5 py-2.5 rounded-none text-sm font-medium hover:bg-[#b8944f] transition-colors">
                <FileText className="w-4 h-4 flex-shrink-0" /> Blog BEE4
              </a>
              <a href="https://www.linkedin.com/newsletters/bee4-explica-6977626322483200000/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#0077B5] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#005885] transition-colors">
                <Linkedin className="w-4 h-4 flex-shrink-0" /> Newsletter LinkedIn
              </a>
            </div>
          </div>

          {(() => {
            const blogItems = [
              { title: "Tudo muda quando a regulação e a inovação caminham juntas em prol do acesso das PMEs ao mercado de capitais", desc: "Novas regulamentações e tecnologias abrem caminho para PMEs no mercado de capitais. A trajetória da BEE4 desde o Laboratório de Inovação Financeira da CVM.", link: "https://pt.linkedin.com/pulse/tudo-muda-quando-regula%C3%A7%C3%A3o-e-inova%C3%A7%C3%A3o-caminham-juntas-em-prol-ls3ff", date: "Jan 2026" },
              { title: "Rota FÁCIL: descubra os Provedores Estratégicos confirmados na 1ª edição de programa inédito da BEE4", desc: "Toda a rede de provedores estratégicos confirmados para a primeira edição do programa Rota FÁCIL da BEE4.", link: "https://www.linkedin.com/newsletters/bee4-explica-6977626322483200000/", date: "Set 2025" },
              { title: "Rota FÁCIL: BEE4 lança programa para subsidiar listagem de PMEs", desc: "Até 10 PMEs vencedoras serão premiadas com o subsídio para listagem no mercado de acesso da BEE4.", link: "https://www.linkedin.com/newsletters/bee4-explica-6977626322483200000/", date: "Set 2025" },
              { title: "Como preparar sua PME para captar pelo Regime FÁCIL?", desc: "Se a sua empresa fatura até R$500 milhões e está em fase de crescimento, saiba como se preparar para captar pelo Regime FÁCIL.", link: "https://www.linkedin.com/newsletters/bee4-explica-6977626322483200000/", date: "Jul 2025" },
              { title: "Regime 'FÁCIL' reforça modelo pioneiro da BEE4 para PMEs", desc: "A CVM aprovou oficialmente o Regime FÁCIL, que permite que companhias de menor porte acessem o mercado de capitais de forma proporcional.", link: "https://www.linkedin.com/newsletters/bee4-explica-6977626322483200000/", date: "Jul 2025" },
              { title: "O que é o mercado de acesso?", desc: "É a porta de entrada para Pequenas e Médias Empresas (PMEs) no mercado de capitais, permitindo ofertas públicas iniciais (IPOs), emissão de títulos de dívida e negociação secundária de ações e ativos de renda fixa.", link: "https://bee4.com.br/blog/o-que-e-mercado-de-acesso-bee4/" },
            ];
            return (
              <div className="relative max-w-4xl mx-auto">
                <button
                  onClick={() => {
                    const el = document.getElementById('blog-carousel');
                    if (el) el.scrollBy({ left: -340, behavior: 'smooth' });
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 w-8 h-8 md:w-10 md:h-10 bg-[#C9A96E] text-white rounded-full flex items-center justify-center hover:bg-[#C9A96E] transition-colors shadow-lg"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <div
                  id="blog-carousel"
                  className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {blogItems.map((item, i) => (
                    <div
                      key={i}
                      className="bg-[#000000] rounded-xl p-4 md:p-6 border border-[#060B7A] hover:border-[#2DBCF7]/50 transition-colors flex flex-col flex-shrink-0 w-[260px] md:w-[320px]"
                    >
                      {(item as any).date && <span className="text-[12px] text-[#2DBCF7]/70 font-medium uppercase tracking-wider mb-2">{(item as any).date}</span>}
                      <div className="flex items-start gap-3 mb-4">
                        <CheckCircle2 className="w-6 h-6 text-[#2DBCF7] flex-shrink-0 mt-0.5" />
                        <h3 className="text-white font-bold text-lg leading-snug">{item.title}</h3>
                      </div>
                      <div className="flex-grow mb-5" aria-hidden="true" />
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[#2DBCF7] text-[17px] font-semibold hover:underline">
                        Confira!
                      </a>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('blog-carousel');
                    if (el) el.scrollBy({ left: 340, behavior: 'smooth' });
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 w-8 h-8 md:w-10 md:h-10 bg-[#C9A96E] text-white rounded-full flex items-center justify-center hover:bg-[#C9A96E] transition-colors shadow-lg"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            );
          })()}
          <p className="text-[14px] text-white/70 italic mt-6 text-center">*Edições da newsletter BEE4 Explica entre julho de 2025 e janeiro de 2026.</p>

          {/* ===== ARTIGOS INFOMONEY - GHOSTWRITING PARA RODRIGO FISZMAN ===== */}
          <div
            className="mt-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-[18px] font-normal text-white mb-2">
                <span className="relative inline-block pb-2">
                  <span>Artigos que escrevi para o cofundador</span>
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#060B7A]"></span>
                </span>
              </h3>
              <p className="text-[16px] text-gray-400 italic mt-4 max-w-2xl mx-auto">
                Ghostwriting de artigos publicados no InfoMoney, assinados por Rodrigo Fiszman, sócio-cofundador e presidente do conselho da BEE4.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/FUPpCWWechaUPlRO.png",
                  title: "Voc\u00ea compraria a sua pr\u00f3pria empresa hoje?",
                  link: "https://www.infomoney.com.br/colunistas/convidados/voce-compraria-a-sua-propria-empresa-hoje/"
                },
                {
                  image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/nYwTbJPFdlLVfnfF.png",
                  title: "Regime F\u00c1CIL: um novo cap\u00edtulo para o mercado de capitais brasileiro",
                  link: "https://www.infomoney.com.br/colunistas/convidados/regime-facil-novo-capitulo-mercado-de-capitais-brasileiro/"
                },
                {
                  image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/eImCCiRsBDppXCIX.png",
                  title: "De Emiss\u00f5es de D\u00edvida a A\u00e7\u00f5es: entenda as muitas portas que se abrem para PMEs",
                  link: "https://www.infomoney.com.br/colunistas/convidados/de-emissoes-de-divida-a-acoes-entenda-as-muitas-portas-que-se-abrem-para-pmes-que-decidem-abrir-capital-no-brasil/"
                }
              ].map((article, i) => (
                <a
                  key={i}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl overflow-hidden border-2 border-white/10 hover:border-[#2DBCF7]/50 transition-all duration-300 hover:scale-[1.02] block"
                >
                  <div className="aspect-[4/5] relative">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm font-semibold drop-shadow-lg flex items-center gap-1">
                        Ler artigo <ExternalLink className="w-3 h-3" />
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <a
                href="https://www.infomoney.com.br/autor/rodrigo-fiszman/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C9A96E] text-[#000000] px-6 py-3 rounded-none text-sm font-semibold hover:bg-[#b8944f] transition-colors shadow-lg"
              >
                <Newspaper className="w-4 h-4 flex-shrink-0" /> Artigos
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-[2px] bg-[#060B7A] opacity-30"></div>

      {/* ========== BLOCO 5: CONTEÚDOS DE DESTAQUE - REDES SOCIAIS ========== */}
      <section className="py-12 md:py-20 bg-[#000000] relative overflow-hidden">
        <div className="container relative z-10">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-[18px] font-normal text-white mb-4 md:whitespace-nowrap">
              <span className="relative inline-block pb-2">
                <span>Destaques em Redes Sociais</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#060B7A]"></span>
              </span>
            </h2>
            <p className="text-[16px] text-gray-400 italic">2024-2025</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-3 md:gap-4 justify-center mb-8 md:mb-12">
            <a 
              href="https://www.linkedin.com/company/bee4oficial/about/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-full text-sm md:text-base font-semibold transition-colors ${activeTab === 'linkedin' ? 'bg-[#0077B5] text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}
            >
              <Linkedin className="w-4 h-4 flex-shrink-0" /> LinkedIn
            </a>
            <a 
              href="https://www.instagram.com/bee4oficial?igsh=dzBydzd1OHgwMmw5"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-full text-sm md:text-base font-semibold transition-colors ${activeTab === 'instagram' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}
            >
              <Instagram className="w-4 h-4 flex-shrink-0" /> Instagram
            </a>
          </div>

          {/* LinkedIn Content */}
          {activeTab === 'linkedin' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
              {[
                { title: "Token ou Ações Tokenizadas?", img: "/images/linkedin-token-acoes.webp", engagement: "2.5K", link: "https://www.linkedin.com/posts/bee4oficial_token-ou-a%C3%A7%C3%A3o-tokenizada-activity-7345437494764544003-Nb5s" },
                { title: "O Regime FÁCIL vem aí", img: "/images/linkedin-regime-facil.webp", engagement: "3.1K", link: "https://www.linkedin.com/posts/bee4oficial_o-regime-f%C3%A1cil-vem-a%C3%AD-activity-7333580291363553281-v67c" },
                { title: "60% dos empregos no Brasil", img: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/lFkZgxUfNhbRNEwV.png", engagement: "1.8K", link: "https://www.linkedin.com/posts/bee4oficial_voc%C3%AA-sabia-que-as-pmes-representam-cerca-activity-7341817282735583234-rZU4" },
              ].map((post, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 md:p-6 border-2 border-white/20 hover:border-white/50 transition-all duration-300 flex flex-col"
                  style={{ background: 'radial-gradient(ellipse at center, #0a3d91 0%, #001a4d 40%, #000d33 70%, #000820 100%)' }}
                >
                  <Linkedin className="w-6 h-6 text-[#0077B5] mb-4" />
                  <h3 className="font-bold text-lg text-white mb-4">{post.title}</h3>
                  <div className="h-[200px] mb-4 rounded-lg overflow-hidden">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover object-top rounded-lg" />
                  </div>
                  <div className="mt-auto">
                    <p className="text-3xl font-bold text-[#C9A96E] mb-1">{post.engagement}</p>
                    <p className="text-base font-semibold text-white uppercase tracking-wide mb-2">Engajamento</p>
                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-[#2DBCF7] text-sm font-bold hover:underline">Acesse no LinkedIn →</a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Instagram Content */}
          {activeTab === 'instagram' && (() => {
            const igPosts = [
              { title: "A BEE4 é o mercado de acesso brasileiro criado para atravessar gerações", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/HSckqSXKDVbAOuLN.png", link: "https://www.instagram.com/p/DQcoQkCj95r/" },
              { title: "Não é cripto. É Valor Mobiliário Digital.", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/JKvJqnaDjohmYZWM.png", link: "https://www.instagram.com/p/DNk9zQBtrQm/?img_index=1" },
              { title: "Regime FÁCIL é aprovado pela CVM", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/cgMWBvGLfYYASike.png", link: "https://www.instagram.com/p/DLpuQjiRNzT/" },
              { title: "Todo craque do futebol começa na base...", image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663219084238/XORYPjlWRfkNfPWm.png", link: "https://www.instagram.com/p/DM8ev5oPu5l/" },
              { title: "Patricia Stille no Capital Insights CNN", image: "", link: "" },
              { title: "A Sala de Imprensa Oficial da BEE4 está no ar!", image: "", link: "" },
            ];
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            const igItemsPerView = isMobile ? 1 : 3;
            const igMaxIndex = Math.max(0, igPosts.length - igItemsPerView);
            return (
              <div className="relative max-w-5xl mx-auto">
                {/* Left Arrow */}
                <button
                  onClick={() => setIgCarouselIndex(Math.max(0, igCarouselIndex - 1))}
                  className={`absolute -left-2 md:-left-10 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors ${igCarouselIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                  disabled={igCarouselIndex === 0}
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={() => setIgCarouselIndex(Math.min(igMaxIndex, igCarouselIndex + 1))}
                  className={`absolute -right-2 md:-right-10 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors ${igCarouselIndex >= igMaxIndex ? 'opacity-30 cursor-not-allowed' : ''}`}
                  disabled={igCarouselIndex >= igMaxIndex}
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>

                <div className="overflow-hidden">
                  <div
                    className="flex gap-4 transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${igCarouselIndex * (100 / igItemsPerView)}%)` }}
                  >
                    {igPosts.map((post, index) => (
                      <a
                        key={index}
                        href={post.link || undefined}
                        target={post.link ? "_blank" : undefined}
                        rel={post.link ? "noopener noreferrer" : undefined}
                        className="flex-shrink-0 rounded-xl overflow-hidden border-2 border-white/20 hover:border-white/50 hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
                        style={{ width: `calc(${100 / igItemsPerView}% - ${(igItemsPerView - 1) * 16 / igItemsPerView}px)` }}
                      >
                        {post.image ? (
                          <div className="aspect-[4/5] relative">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <p className="text-white text-xs font-medium drop-shadow-lg">{post.title}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="aspect-[4/5] flex items-center justify-center p-6" style={{ background: 'radial-gradient(ellipse at center, #0a3d91 0%, #001a4d 40%, #000d33 70%, #000820 100%)' }}>
                            <p className="text-white text-sm font-medium text-center">{post.title}</p>
                          </div>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ========== NAVEGAÇÃO E CTA ========== */}
      <section className="py-10 md:py-16 bg-[#000000] border-t border-[#060B7A]/30">
        <div className="container">
{/* Voltar ao início (substitui "Conheça outros projetos") */}
          <div className="text-center py-4 md:py-6">
            <a href="/#cases" data-voltar="1" className="inline-flex items-center gap-2 text-[#C9A96E] hover:text-white font-semibold text-[16px] md:text-[17px] underline underline-offset-4 decoration-[#C9A96E]/60 transition-colors">
              ← Voltar ao início
            </a>
          </div>


        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
