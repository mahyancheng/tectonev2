import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import VitePluginSitemap from "vite-plugin-sitemap";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
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

    preloadCssNonBlocking(),

    mode === "production" &&
    VitePluginSitemap({
      hostname: "https://tectonesteel.com",
      dynamicRoutes: [
        // ✅ 核心静态页
        "/",
        "/about-us",
        "/our-product",
        "/quote",
        "/contact-us",
        "/blog",
        "/thank-you",

        // ✅ 产品详情页（真实 URL，对 SEO 非常重要）
        "/our-product/product/102-fixed-screen",
        "/our-product/product/108-security-top-hung",
        "/our-product/product/106-security-sliding-window",
        "/our-product/product/103-security-casement-window",
        "/our-product/product/105-security-sliding-door",
        "/our-product/product/104-security-folding-door",
        "/our-product/product/107-security-swing-door",
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
