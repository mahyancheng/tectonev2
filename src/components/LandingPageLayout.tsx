import React, { useEffect } from "react";
import { Phone } from "lucide-react";
import { initMetaPixel, trackEvent } from "@/lib/metaPixel";
import WhatsAppChatWidget from "@/components/WhatsAppFloatButton";
import headerIcon from "@/images/tectone-logo-white.jpg";

const WA_PHONE = "6596771199";
const TEL_PHONE = "+6596771199";

function waUrl(message = "Hi! I saw your ad and want a quote for security insect screens."): string {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
}

export function handleWhatsAppClick(message?: string): void {
  trackEvent("Contact", { method: "whatsapp", source: "lp_security_screen" });
  window.open(waUrl(message), "_blank", "noopener,noreferrer");
}

export function handleCallClick(): void {
  trackEvent("Contact", { method: "phone", source: "lp_security_screen" });
  window.location.href = `tel:${TEL_PHONE}`;
}

interface LandingPageLayoutProps {
  children: React.ReactNode;
}

const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({ children }) => {
  useEffect(() => {
    initMetaPixel();
  }, []);

  // Match site-wide scroll-reveal so `.animate-on-scroll` elements fade in.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reveal = () => {
      document.querySelectorAll<HTMLElement>(".animate-on-scroll").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight - 50 && r.bottom > 0) {
          el.classList.add("animated");
        }
      });
    };
    const raf = requestAnimationFrame(() => requestAnimationFrame(reveal));
    window.addEventListener("scroll", reveal, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", reveal);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* ───── Brand bar (dark, matches site Navbar) ───── */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center" aria-label="Tectone Renex Steel">
            <img
              src={headerIcon}
              alt="Tectone Renex Steel Pte Ltd"
              width={48}
              height={48}
              className="h-10 w-auto"
              decoding="async"
            />
          </a>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCallClick}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              <Phone className="h-4 w-4" />
              9677 1199
            </button>
            <button
              type="button"
              onClick={() => handleWhatsAppClick()}
              className="btn-primary text-sm"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow pb-20 lg:pb-0">{children}</main>

      {/* ───── Mobile sticky CTA ───── */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-black/95 backdrop-blur-xl border-t border-white/10">
        <div className="grid grid-cols-2 gap-2 p-3">
          <button
            type="button"
            onClick={handleCallClick}
            className="btn-outline flex items-center justify-center gap-2 py-2.5"
          >
            <Phone className="h-4 w-4" />
            Call
          </button>
          <button
            type="button"
            onClick={() => handleWhatsAppClick("Hi! I want a free quote.")}
            className="btn-primary py-2.5"
          >
            Get Free Quote
          </button>
        </div>
      </div>

      {/* ───── Minimal legal footer ───── */}
      <footer className="bg-black text-white/40 text-xs py-6 border-t border-white/10">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Tectone Renex Steel Pte Ltd</span>
          <span>11 Woodlands Cl, #04-40 Woodlands 11, Singapore 737853</span>
        </div>
      </footer>

      {/* ───── Persistent floating WhatsApp chat widget (site standard) ───── */}
      <WhatsAppChatWidget phoneE164={WA_PHONE} />
    </div>
  );
};

export default LandingPageLayout;
