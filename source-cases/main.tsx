// Entrada dedicada: renderiza SOMENTE os 5 cases, com os componentes originais do portfólio.
import { createRoot } from "react-dom/client";
import { Router, Route, Switch } from "wouter";
import "./cases.css";
import { ThemeProvider } from "../contexts/ThemeContext";
import BEE4Case from "../pages/BEE4Case";
import ProjectItau from "../pages/ProjectItau";
import ProjectGuide from "../pages/ProjectGuide";
import ProjectModal from "../pages/ProjectModal";
import ProjectEmpiricus from "../pages/ProjectEmpiricus";

// Modo arquivo único: a página principal injeta o case em window.__CASE__.
const fixedCase = (window as any).__CASE__ as string | undefined;
const pages: Record<string, () => JSX.Element> = {
  bee4: BEE4Case, itau: ProjectItau, guide: ProjectGuide, modal: ProjectModal, empiricus: ProjectEmpiricus,
};
// No iframe do card: esconde elementos de navegação antigos e informa a altura ao card.
const embed = !!fixedCase || new URLSearchParams(location.search).has("embed");
const target = location.origin && location.origin !== "null" ? location.origin : "*";
if (embed) document.documentElement.classList.add("embed");

// Estilo para imagens indisponíveis (vale no site e no arquivo único)
const st = document.createElement("style"); st.id = "img-indisponivel-css";
st.textContent = "img.img-indisponivel{display:none!important}div:has(> img.img-indisponivel:only-child){display:none!important}.grid:has(> div > img.img-indisponivel:only-child){grid-template-columns:1fr!important}";
document.head.appendChild(st);

// Imagem que não carregar some da página (sem ícone de imagem quebrada).
document.addEventListener("error", e => {
  const t = e.target as HTMLElement;
  if (t && t.tagName === "IMG") t.classList.add("img-indisponivel");
}, true);

const FixedPage = fixedCase ? pages[fixedCase] : undefined;
createRoot(document.getElementById("root")!).render(
  FixedPage ? (
    <ThemeProvider defaultTheme="corporate"><FixedPage /></ThemeProvider>
  ) : (
  <ThemeProvider defaultTheme="corporate">
    <Router base="/cases">
      <Switch>
        <Route path="/bee4" component={BEE4Case} />
        <Route path="/itau" component={ProjectItau} />
        <Route path="/guide" component={ProjectGuide} />
        <Route path="/modal" component={ProjectModal} />
        <Route path="/empiricus" component={ProjectEmpiricus} />
      </Switch>
    </Router>
  </ThemeProvider>
  )
);

if (embed) {
  const post = () => parent.postMessage({ type: "case-height", h: document.documentElement.scrollHeight, path: location.pathname }, target);
  new ResizeObserver(post).observe(document.body);
  addEventListener("load", post);
  // links para outros cases abrem no card correspondente da página principal
  document.addEventListener("click", e => {
    const a = (e.target as HTMLElement).closest("a") as HTMLAnchorElement | null;
    if (!a) return;
    if (a.dataset.voltar) { e.preventDefault(); parent.postMessage({ type: "go-top" }, target); return; }
    const m = a.pathname.match(/^\/(?:cases|projetos|cases-app)\/(bee4|itau|guide|modal|empiricus)/);
    if (m && (a.origin === location.origin || a.protocol === "about:" || a.protocol === "file:")) { e.preventDefault(); parent.postMessage({ type: "open-case", slug: m[1] }, target); }
    else if (fixedCase && a.protocol === "file:") { e.preventDefault(); parent.location.hash = a.hash || "#topo"; }
    else if (!fixedCase && a.origin === location.origin && !a.pathname.startsWith("/cases/")) { e.preventDefault(); parent.location.href = a.href; }
  }, true);
}
