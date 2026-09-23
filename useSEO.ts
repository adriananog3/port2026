import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  breadcrumbs?: { name: string; url: string }[];
}

/**
 * Hook para gerenciar SEO dinâmico em páginas SPA.
 * Atualiza title, meta description, Open Graph, Twitter Cards e JSON-LD.
 */
export function useSEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  keywords,
  jsonLd,
  breadcrumbs,
}: SEOProps) {
  useEffect(() => {
    const BASE_URL = "https://adriana-nogueira.com";
    const DEFAULT_OG_IMAGE = `${BASE_URL}/assets/ovelha-og.jpg`;

    // Save originals
    const originalTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc?.getAttribute("content") || "";

    // Update title
    document.title = title;

    // Update meta description
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    }

    // Helper to set or create meta tag
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (el) {
        el.setAttribute(attr, value);
      } else {
        el = document.createElement("meta");
        const selectorMatch = selector.match(/\[(.+?)="(.+?)"\]/);
        if (selectorMatch) {
          el.setAttribute(selectorMatch[1], selectorMatch[2]);
        }
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
    };

    // Update meta keywords
    if (keywords) {
      setMeta('meta[name="keywords"]', "content", keywords);
    }

    // Open Graph - locale and site_name
    setMeta('meta[property="og:locale"]', "content", "pt_BR");
    setMeta('meta[property="og:site_name"]', "content", "Portfólio & Consultoria | Adriana Nogueira");
    setMeta('meta[property="og:title"]', "content", ogTitle || title);
    setMeta('meta[property="og:description"]', "content", ogDescription || description);
    setMeta('meta[property="og:type"]', "content", ogType);
    if (canonical) {
      setMeta('meta[property="og:url"]', "content", `${BASE_URL}${canonical}`);
    }
    if (ogImage) {
      setMeta('meta[property="og:image"]', "content", ogImage);
    } else {
      setMeta('meta[property="og:image"]', "content", DEFAULT_OG_IMAGE);
    }

    // Twitter Cards
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", ogTitle || title);
    setMeta('meta[name="twitter:description"]', "content", ogDescription || description);
    if (ogImage) {
      setMeta('meta[name="twitter:image"]', "content", ogImage);
    }

    // Canonical URL
    if (canonical) {
      let canonicalEl = document.querySelector('link[rel="canonical"]');
      if (canonicalEl) {
        canonicalEl.setAttribute("href", `${BASE_URL}${canonical}`);
      }
    }

    // JSON-LD (supports single object or array of schemas)
    const jsonLdScripts: HTMLScriptElement[] = [];
    
    // Remove existing dynamic JSON-LD scripts
    document.querySelectorAll('script[data-dynamic-jsonld]').forEach(el => el.remove());
    
    const allSchemas: Record<string, unknown>[] = [];
    
    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      allSchemas.push(...schemas);
    }
    
    // BreadcrumbList schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      allSchemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": crumb.name,
          "item": `${BASE_URL}${crumb.url}`
        }))
      });
    }
    
    allSchemas.forEach((schema, idx) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-dynamic-jsonld", String(idx));
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
      jsonLdScripts.push(script);
    });

    // Cleanup
    return () => {
      document.title = originalTitle;
      if (metaDesc) metaDesc.setAttribute("content", originalDesc);
      jsonLdScripts.forEach(s => s.remove());
    };
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, ogType, keywords, jsonLd, breadcrumbs]);
}
