import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";
import WhatsAppChatWidget from "@/components/WhatsAppFloatButton";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  const handleScrollAnimations = () => {
    if (typeof window === "undefined") return;
    const elements = document.querySelectorAll<HTMLElement>(".animate-on-scroll");
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
        el.classList.add("animated");
      }
    });
  };

  useEffect(() => {
    // Double rAF ensures React hydration is fully complete before adding classes
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        handleScrollAnimations();
      });
    });
    window.addEventListener("scroll", handleScrollAnimations, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", handleScrollAnimations);
    };
  }, []);

  // ✅ 可选：你不想某些页面出现 WhatsApp，就在这里控制
  const hideWhatsAppRoutes = ["/thank-you"];
  const showWhatsApp = !hideWhatsAppRoutes.includes(pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* ✅ 用 pt-16 一次性把 Breadcrumb + main 往下推，避免被 fixed Navbar 遮住 */}
      <div className="pt-16 flex-grow">
        <Breadcrumb />
        <main>{children}</main>
      </div>

      <Footer />

      {/* ✅ 轻量 WhatsApp（全站浮动，不依赖 Elfsight） */}
      {showWhatsApp && (
        <WhatsAppChatWidget phoneE164="6596771199" />
      )}
    </div>
  );
};

export default Layout;
