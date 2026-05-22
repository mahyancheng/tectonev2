import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import VitePluginSitemap from "vite-plugin-sitemap";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5183,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },

  plugins: [
    react(),

    mode === "development" && componentTagger(),

    

    mode === "production" &&
    VitePluginSitemap({
      hostname: "https://tectonesteel.com",
      // The plugin generates sitemap.xml + robots.txt at build time. Keep
      // them in sync with /public/sitemap.xml + /public/robots.txt — both
      // copies exist so the dev server and the deployed static build serve
      // the same URLs.
      readable: true,
      changefreq: "weekly",
      priority: 0.7,
      // Block non-public surfaces from indexing AND from the sitemap.
      robots: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/admin", "/thank-you", "/404", "/lp.html", "/quote?pkg=", "/quote?variant="],
        },
      ],
      exclude: ["/admin", "/thank-you", "/404", "/lp", "/lp.html", "/our-product/product"],
      dynamicRoutes: [
        // ────── PRIMARY ──────
        // ('/' is auto-added by vite-plugin-sitemap from the route table,
        // so we don't list it here to avoid a duplicate <url> entry.)
        "/hdb-packages",                   // BTO volume driver — high priority
        "/our-product",

        // ────── PRODUCT DETAIL ──────
        "/our-product/product/107-security-swing-door",
        "/our-product/product/104-security-folding-door",
        "/our-product/product/105-security-sliding-door",
        "/our-product/product/103-security-casement-window",
        "/our-product/product/106-security-sliding-window",
        "/our-product/product/102-fixed-screen",
        "/our-product/product/108-security-top-hung",

        // ────── CONVERSION ──────
        "/quote",
        "/contact-us",
        "/lp/security-screen",

        // ────── BRAND ──────
        "/about-insect-screen-supplier",

        // ────── BLOG ──────
        "/blog",
        "/blog/insect-screen-in-singapore",
        "/blog/sliding-door-mosquito-screen-in-singapore",
        "/blog/let-the-air-in-keep-the-bugs-out",
        "/blog/sliding-aluminium-mosquito-net-door-prices",
        "/blog/tectone-renex-steel-singapore-strongest-for-insect-screen-systems",
        "/blog/mosquito-netting-in-singapore",
        "/blog/mosquito-nets-for-windows-in-singapore",
        "/blog/aluminium-mosquito-net",

        // ────── POLICY ──────
        "/privacy-policy",
        "/terms",
      ],
    }),

  ].filter(Boolean),

  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },

    // ✅ 关键：避免重复依赖（你 log 里出现 vite-react-ssg 自己带一份 helmet）
    dedupe: ["react", "react-dom", "react-helmet-async"],
  },

  // ✅ 关键：SSG/SSR 阶段把 react-helmet-async 打进 bundle，解决 CJS/ESM import 冲突
  ssr: {
    noExternal: ["react-helmet-async"],
  },

  build: {
    chunkSizeWarningLimit: 1500,
    cssCodeSplit: true,
  },
}));
