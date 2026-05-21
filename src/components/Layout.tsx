import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Breadcrumb from "./Breadcrumb";
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

      {/* Telemetry strip (28px) + main nav (~64-72px) = ~100px clearance */}
      <div className="pt-[100px] flex-grow">
        <Breadcrumb />
        <main>{children}</main>
      </div>

      <Footer />

      {/* Floating CTA — centered Configure + Contact us pills (Kova-style).
          Hidden on /thank-you, where the user has already converted. */}
      {showWhatsApp && (
        <WhatsAppChatWidget phoneE164="6596771199" />
      )}
    </div>
  );
};

export default Layout;
