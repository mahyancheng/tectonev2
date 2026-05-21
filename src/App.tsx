// src/App.tsx
import React, { Suspense } from "react";
import type { RouteRecord } from "vite-react-ssg";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { ContentProvider } from "@/contexts/ContentContext";

// ✅ Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Products from "./pages/Products";
import ContactPage from "./pages/ContactPage";
import QuotePage from "./pages/QuotePage";
import ThankYouPage from "./pages/ThankYouPage";
import BlogPage from "./pages/BlogPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import NotFound from "./pages/NotFound";

// ✅ Dynamic pages
import ProductDetailPage from "./pages/ProductDetailPage";
import BlogPostDetail from "./pages/BlogPostDetail";

// 🔸 Admin
import AdminDashboard from "./pages/AdminDashboard";

// 🎯 Paid-traffic landing pages (no site chrome)
import SecurityScreenLandingPage from "./pages/SecurityScreenLandingPage";

const queryClient = new QueryClient();

/**
 * ✅ 这些是你目前已经确定存在的产品详情页（来自你的 sitemap）
 * 未来你可以把它移到 src/data/products.ts 统一管理
 */
const PRODUCT_PATHS = [
  "107-security-swing-door",
  "104-security-folding-door",
  "105-security-sliding-door",
  "103-security-casement-window",
  "106-security-sliding-window",
  "102-fixed-screen",
  "108-security-top-hung",
];

/**
 * ✅ Blog slugs（如果你现在还没 blog，就先空数组没问题）
 * 有文章后把 slug 填进来，或改成从本地数据文件导入
 */
const BLOG_SLUGS: string[] = [
  "insect-screen-in-singapore",
  "sliding-door-mosquito-screen-in-singapore",
  "sliding-aluminium-mosquito-net-door-prices",
  "let-the-air-in-keep-the-bugs-out",
  "tectone-renex-steel-singapore-strongest-for-insect-screen-systems",
  "mosquito-netting-in-singapore",
  "mosquito-nets-for-windows-in-singapore",
  "aluminium-mosquito-net"
];

function ProvidersShell() {
  return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ScrollToTop />
          <ContentProvider>
            <Layout>
              <Suspense fallback={<div className="min-h-[40vh]" />}>
                <Outlet />
              </Suspense>

              <Toaster />
              <Sonner />
            </Layout>
          </ContentProvider>
        </TooltipProvider>
      </QueryClientProvider>

  );
}

/**
 * Bare providers shell for paid-traffic landing pages. Skips the site
 * Navbar / Breadcrumb / Footer so the page can drive a single conversion goal.
 */
function LandingShell() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <ContentProvider>
          <Suspense fallback={<div className="min-h-[40vh]" />}>
            <Outlet />
          </Suspense>
          <Toaster />
          <Sonner />
        </ContentProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

// App.tsx（routes 重点片段）
export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <ProvidersShell />,
    children: [
      { index: true, element: <HomePage /> }, // ✅ 首页直接用 HomePage
      { path: "about-insect-screen-supplier", element: <AboutPage /> }, // ✅ 建议加尾斜杠
      { path: "our-product", element: <Products /> },
      { path: "contact-us", element: <ContactPage /> },
      { path: "quote", element: <QuotePage /> },
      { path: "thank-you", element: <ThankYouPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "privacy-policy", element: <PrivacyPolicyPage /> },
      { path: "terms", element: <TermsPage /> },

      {
        path: "our-product/product/:productId",
        element: <ProductDetailPage />,
        getStaticPaths: async () => PRODUCT_PATHS.map((id) => `/our-product/product/${id}`),
      },
      {
        path: "blog/:slug",
        element: <BlogPostDetail />,
        getStaticPaths: async () => BLOG_SLUGS.map((slug) => `/blog/${slug}`),
      },

      { path: "admin", element: <AdminDashboard /> },
      { path: "404", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/lp",
    element: <LandingShell />,
    children: [
      { path: "security-screen", element: <SecurityScreenLandingPage /> },
    ],
  },
];
