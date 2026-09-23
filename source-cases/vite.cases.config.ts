import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
const r = (p: string) => path.resolve(import.meta.dirname, p);
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/cases-app/",
  resolve: {
    alias: [
      { find: /^react-dom\/client$/, replacement: "/tmp/claude-0/pre/node_modules/preact/compat/client.mjs" },
      { find: /^react-dom$/, replacement: "/tmp/claude-0/pre/node_modules/preact/compat/dist/compat.module.js" },
      { find: /^react$/, replacement: "/tmp/claude-0/pre/node_modules/preact/compat/dist/compat.module.js" },
      { find: /^react\/jsx-runtime$/, replacement: "/tmp/claude-0/pre/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js" },
      { find: /^react\/jsx-dev-runtime$/, replacement: "/tmp/claude-0/pre/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js" },
      { find: /^framer-motion$/, replacement: r("client/src/cases-app/motion-lite.tsx") },
      { find: "@/components/Footer", replacement: r("client/src/cases-app/FooterStub.tsx") },
      { find: "@", replacement: r("client/src") },
      { find: "@shared", replacement: r("shared") },
    ],
  },
  root: r("client"),
  publicDir: false,
  build: { outDir: process.env.STANDALONE ? "/tmp/claude-0/cases-single" : "/tmp/claude-0/cases-build", emptyOutDir: true, rollupOptions: { input: r("client/cases-app.html"), output: process.env.STANDALONE ? { inlineDynamicImports: true } : { manualChunks(id) {
    if (id.includes("node_modules")) {
      if (id.includes("preact") || id.includes("wouter") || id.includes("regexparam") || id.includes("use-sync-external")) return "v-core";
      if (id.includes("framer-motion") || id.includes("motion-dom") || id.includes("motion-utils")) return "v-motion";
      if (id.includes("lucide")) return "v-icons";
      return "v-core";
    }
    const m = id.match(/pages\/(\w+)\.tsx$/); if (m) return "p-" + m[1].toLowerCase();
  } } } },
});
