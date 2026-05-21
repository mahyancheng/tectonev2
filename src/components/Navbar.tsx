import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import headerIcon from "../images/tectone-logo-white.jpg";

const productLinks = [
  { to: "/our-product/product/107-security-swing-door", label: "Swing Door", code: "RT-107" },
  { to: "/our-product/product/104-security-folding-door", label: "Folding Door", code: "RT-104" },
  { to: "/our-product/product/105-security-sliding-door", label: "Sliding Door", code: "RT-105" },
  { to: "/our-product/product/103-security-casement-window", label: "Casement Window", code: "RT-103" },
  { to: "/our-product/product/106-security-sliding-window", label: "Sliding Window", code: "RT-106" },
  { to: "/our-product/product/102-fixed-screen", label: "Fixed Screen", code: "RT-102" },
  { to: "/our-product/product/108-security-top-hung", label: "Top Hung", code: "RT-108" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isDesktopProductsOpen, setIsDesktopProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [now, setNow] = useState(new Date());

  const hoverCloseDelay = 200;
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    const tick = window.setInterval(() => setNow(new Date()), 60_000);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearInterval(tick);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const openDesktopProducts = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsDesktopProductsOpen(true);
  };
  const scheduleCloseDesktopProducts = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setIsDesktopProductsOpen(false);
    }, hoverCloseDelay) as unknown as number;
  };
  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsProductsOpen(false);
    setIsDesktopProductsOpen(false);
  };

  const navLinkBase =
    "font-mono text-[11px] uppercase tracking-[0.18em] text-white/65 hover:text-white transition-colors";

  // Date/time stamp like aerospace telemetry
  const stamp = `${now.toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" })} · ${now
    .toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Singapore" })} SGT`;

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* ───── Top telemetry strip ───── */}
      <div className="bg-black border-b border-white/10">
        <div className="container mx-auto px-4 h-7 flex items-center justify-between text-[10px] sm:text-[11px]">
          <div className="telemetry flex items-center">
            <span className="hidden sm:inline">
              <span className="live-dot" />SYS · TECTONE-DESIGN · SG
            </span>
            <span className="sm:hidden">
              <span className="live-dot" />NOMINAL
            </span>
            <span className="hidden md:inline">{stamp}</span>
            <span className="hidden lg:inline text-white/85">ALL SYSTEMS NOMINAL</span>
          </div>
          <div className="telemetry flex items-center">
            <span className="hidden md:inline">QUEUE · 14 DAYS</span>
            <span>FREE SITE SURVEY</span>
          </div>
        </div>
      </div>

      {/* ───── Main nav ───── */}
      <div
        className={`transition-all duration-300 backdrop-blur-xl ${
          isScrolled ? "bg-black/90 py-3 border-b border-white/10" : "bg-black/70 py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center" onClick={closeAllMenus}>
            <img
              src={headerIcon}
              alt="Tectone Renex Steel Pte Ltd"
              width={48}
              height={48}
              className="h-10 w-auto"
              decoding="async"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            <Link to="/" className={navLinkBase} onClick={closeAllMenus}>
              <span className="text-white/35 mr-2">01</span>Home
            </Link>

            <div
              className="relative"
              onMouseEnter={openDesktopProducts}
              onMouseLeave={scheduleCloseDesktopProducts}
            >
              <Link
                to="/our-product"
                className={`flex items-center ${navLinkBase}`}
                onClick={closeAllMenus}
              >
                <span className="text-white/35 mr-2">02</span>Catalog
                <ChevronDown className="ml-1 h-3 w-3" />
              </Link>

              <div
                className={`absolute left-0 right-0 h-3 top-full ${
                  isDesktopProductsOpen ? "" : "pointer-events-none"
                }`}
                onMouseEnter={openDesktopProducts}
                onMouseLeave={scheduleCloseDesktopProducts}
              />

              <div
                className={`absolute left-0 top-full mt-3 w-80 overflow-hidden transform transition-all duration-150 origin-top-left z-10
                  bg-black/95 backdrop-blur-xl border border-white/15 shadow-2xl
                  ${
                    isDesktopProductsOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }
                `}
                onMouseEnter={openDesktopProducts}
                onMouseLeave={scheduleCloseDesktopProducts}
              >
                <div className="px-4 pt-4 pb-2 num-tag">Product catalog · 07 units</div>
                {productLinks.map((p) => (
                  <Link
                    key={p.to}
                    to={p.to}
                    className="block px-4 py-3 hover:bg-white/[0.06] transition-colors border-t border-white/5"
                    onClick={closeAllMenus}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-medium text-white tracking-tight">{p.label}</span>
                      <span className="font-mono text-[10px] tracking-[0.14em] text-white/40">{p.code}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/about-insect-screen-supplier" className={navLinkBase} onClick={closeAllMenus}>
              <span className="text-white/35 mr-2">03</span>Manifest
            </Link>
            <Link to="/blog" className={navLinkBase} onClick={closeAllMenus}>
              <span className="text-white/35 mr-2">04</span>Field Notes
            </Link>

            <Link to="/quote" className="btn-square ml-4" onClick={closeAllMenus}>
              Configure → Quote
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={closeAllMenus}
          />
          <nav className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 py-6 px-4 animate-fade-in relative z-10">
            <div className="flex flex-col">
              {[
                { to: "/", n: "01", label: "Home" },
                { to: "/about-insect-screen-supplier", n: "03", label: "Manifest" },
                { to: "/blog", n: "04", label: "Field Notes" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="py-3.5 text-white/85 hover:text-white text-base font-medium border-b border-white/5 flex items-baseline gap-4"
                  onClick={closeAllMenus}
                >
                  <span className="font-mono text-[11px] text-white/40 tracking-[0.18em]">{l.n}</span>
                  {l.label}
                </Link>
              ))}

              <div className="relative border-b border-white/5">
                <button
                  className="w-full py-3.5 text-white/85 hover:text-white text-base font-medium flex items-center justify-between"
                  onClick={() => setIsProductsOpen((v) => !v)}
                  aria-expanded={isProductsOpen}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] text-white/40 tracking-[0.18em]">02</span>
                    Catalog
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isProductsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProductsOpen && (
                  <div className="pb-3">
                    {productLinks.map((p) => (
                      <Link
                        key={p.to}
                        to={p.to}
                        className="flex items-baseline justify-between px-4 py-2.5 text-sm text-white/70 hover:text-white"
                        onClick={closeAllMenus}
                      >
                        <span>{p.label}</span>
                        <span className="font-mono text-[10px] text-white/35 tracking-[0.14em]">{p.code}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/quote"
                className="btn-square mt-6 text-center"
                onClick={closeAllMenus}
              >
                Configure → Quote
              </Link>
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Navbar;
