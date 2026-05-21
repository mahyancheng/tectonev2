import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import headerIcon from "../images/tectone-logo-white.jpg";

const productLinks = [
  { to: "/our-product/product/107-security-swing-door", label: "Insect Screen Swing Door" },
  { to: "/our-product/product/104-security-folding-door", label: "Insect Screen Folding Door" },
  { to: "/our-product/product/105-security-sliding-door", label: "Insect Screen Sliding Door" },
  { to: "/our-product/product/103-security-casement-window", label: "Casement Window" },
  { to: "/our-product/product/106-security-sliding-window", label: "Insect Screen Sliding Window" },
  { to: "/our-product/product/102-fixed-screen", label: "Fixed Insect Screen" },
  { to: "/our-product/product/108-security-top-hung", label: "Top Hung" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isDesktopProductsOpen, setIsDesktopProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const hoverCloseDelay = 200;
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
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
    "text-sm font-medium tracking-tight text-white/75 hover:text-white transition-colors";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/85 backdrop-blur-xl border-b border-white/10 py-3"
          : "bg-black/40 backdrop-blur-md py-4"
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
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className={navLinkBase} onClick={closeAllMenus}>
            Home
          </Link>

          <Link
            to="/about-insect-screen-supplier"
            className={navLinkBase}
            onClick={closeAllMenus}
          >
            About Us
          </Link>

          {/* Desktop Products dropdown */}
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
              Products <ChevronDown className="ml-1 h-3.5 w-3.5" />
            </Link>

            <div
              className={`absolute left-0 right-0 h-3 top-full ${
                isDesktopProductsOpen ? "" : "pointer-events-none"
              }`}
              onMouseEnter={openDesktopProducts}
              onMouseLeave={scheduleCloseDesktopProducts}
            />

            <div
              className={`absolute left-0 top-full mt-2 w-64 rounded-xl overflow-hidden transform transition-all duration-150 origin-top-left z-10
                bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl
                ${
                  isDesktopProductsOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }
              `}
              onMouseEnter={openDesktopProducts}
              onMouseLeave={scheduleCloseDesktopProducts}
            >
              {productLinks.map((p) => (
                <Link
                  key={p.to}
                  to={p.to}
                  className="block px-4 py-2.5 text-sm text-white/75 hover:bg-white/[0.06] hover:text-white transition-colors"
                  onClick={closeAllMenus}
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/blog" className={navLinkBase} onClick={closeAllMenus}>
            Blog
          </Link>

          <Link to="/contact-us" className={navLinkBase} onClick={closeAllMenus}>
            Contact Us
          </Link>

          <Link to="/quote" className="btn-primary text-sm" onClick={closeAllMenus}>
            Get A Quote
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

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={closeAllMenus}
          />
          <nav className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 py-5 px-4 animate-fade-in relative z-10">
            <div className="flex flex-col space-y-1">
              <Link
                to="/"
                className="py-2.5 text-white/85 hover:text-white text-base font-medium"
                onClick={closeAllMenus}
              >
                Home
              </Link>
              <Link
                to="/about-insect-screen-supplier"
                className="py-2.5 text-white/85 hover:text-white text-base font-medium"
                onClick={closeAllMenus}
              >
                About Us
              </Link>

              <div className="relative">
                <button
                  className="flex items-center w-full justify-between py-2.5 text-white/85 hover:text-white text-base font-medium"
                  onClick={() => setIsProductsOpen((v) => !v)}
                  aria-expanded={isProductsOpen}
                >
                  Products
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isProductsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProductsOpen && (
                  <div className="pl-4 mt-1 mb-2 space-y-1 border-l border-white/15 animate-fade-in">
                    {productLinks.map((p) => (
                      <Link
                        key={p.to}
                        to={p.to}
                        className="block px-3 py-2 text-sm text-white/70 hover:text-white"
                        onClick={closeAllMenus}
                      >
                        {p.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/blog"
                className="py-2.5 text-white/85 hover:text-white text-base font-medium"
                onClick={closeAllMenus}
              >
                Blog
              </Link>
              <Link
                to="/contact-us"
                className="py-2.5 text-white/85 hover:text-white text-base font-medium"
                onClick={closeAllMenus}
              >
                Contact Us
              </Link>
              <Link
                to="/quote"
                className="btn-primary mt-3 text-center"
                onClick={closeAllMenus}
              >
                Get A Quote
              </Link>
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Navbar;
