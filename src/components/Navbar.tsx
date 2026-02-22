import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import headerIcon from "../images/header02.webp";

const Navbar: React.FC = () => {
  // Mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 主菜单（手机）
  const [isProductsOpen, setIsProductsOpen] = useState(false); // 二级菜单（手机）

  // Desktop
  const [isDesktopProductsOpen, setIsDesktopProductsOpen] = useState(false); // 二级菜单（桌面）
  const [isScrolled, setIsScrolled] = useState(false);

  // 延迟关闭（桌面 hover）
  const hoverCloseDelay = 200; // 150~300ms 之间都可以
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
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

  // 统一关闭
  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsProductsOpen(false);
    setIsDesktopProductsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/90 py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center" onClick={closeAllMenus}>
          {/* ✅ CLS 修复：明确 width/height，让浏览器提前保留空间 */}
          <img
            src={headerIcon}
            alt="Tectone Renex Steel Pte Ltd"
            width={48}
            height={48}
            className="h-12 w-auto"
            decoding="async"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            to="/"
            className="font-semibold text-gray-800 hover:text-tectone-gold transition-colors"
            onClick={closeAllMenus}
          >
            Home
          </Link>

          <Link
            to="/about-insect-screen-supplier"
            className="font-semibold text-gray-800 hover:text-tectone-gold transition-colors"
            onClick={closeAllMenus}
          >
            About Us
          </Link>

          {/* Desktop Products — hover 打开 | 延迟关闭 | 透明缓冲桥 */}
          <div
            className="relative"
            onMouseEnter={openDesktopProducts}
            onMouseLeave={scheduleCloseDesktopProducts}
          >
            <Link
              to="/our-product"
              className="flex items-center font-semibold text-gray-800 hover:text-tectone-gold transition-colors"
              onClick={closeAllMenus}
            >
              Products <ChevronDown className="ml-1 h-4 w-4" />
            </Link>

            {/* 缓冲桥：消除 trigger 与 dropdown 之间的空隙 */}
            <div
              className={`absolute left-0 right-0 h-3 top-full ${
                isDesktopProductsOpen ? "" : "pointer-events-none"
              }`}
              onMouseEnter={openDesktopProducts}
              onMouseLeave={scheduleCloseDesktopProducts}
            />

            <div
              className={`absolute left-0 top-full w-56 bg-white shadow-lg rounded-md overflow-hidden transform transition-all duration-150 origin-top-left z-10
                ${
                  isDesktopProductsOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }
              `}
              onMouseEnter={openDesktopProducts}
              onMouseLeave={scheduleCloseDesktopProducts}
            >
              <Link
                to="/our-product/product/107-security-swing-door"
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-tectone-gold hover:text-white"
                onClick={closeAllMenus}
              >
                Insect Screen Swing Door
              </Link>
              <Link
                to="/our-product/product/104-security-folding-door"
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-tectone-gold hover:text-white"
                onClick={closeAllMenus}
              >
                Insect Screen Folding Door
              </Link>
              <Link
                to="/our-product/product/105-security-sliding-door"
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-tectone-gold hover:text-white"
                onClick={closeAllMenus}
              >
                Insect Screen Sliding Door
              </Link>
              <Link
                to="/our-product/product/103-security-casement-window"
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-tectone-gold hover:text-white"
                onClick={closeAllMenus}
              >
                Casement Window
              </Link>
              <Link
                to="/our-product/product/106-security-sliding-window"
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-tectone-gold hover:text-white"
                onClick={closeAllMenus}
              >
                Insect Screen Sliding Window
              </Link>
              <Link
                to="/our-product/product/102-fixed-screen"
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-tectone-gold hover:text-white"
                onClick={closeAllMenus}
              >
                Fixed Insect Screen
              </Link>
              <Link
                to="/our-product/product/108-security-top-hung"
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-tectone-gold hover:text-white"
                onClick={closeAllMenus}
              >
                Top Hung
              </Link>
            </div>
          </div>

          <Link
            to="/blog"
            className="font-semibold text-gray-800 hover:text-tectone-gold transition-colors"
            onClick={closeAllMenus}
          >
            Blog
          </Link>

          <Link
            to="/contact-us"
            className="font-semibold text-gray-800 hover:text-tectone-gold transition-colors"
            onClick={closeAllMenus}
          >
            Contact Us
          </Link>

          <Link to="/quote" className="btn-primary" onClick={closeAllMenus}>
            Get A Quote
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <>
          {/* 背景遮罩（点空白处关闭） */}
          <div className="fixed inset-0 bg-black/30 lg:hidden" onClick={closeAllMenus} />

          <nav className="lg:hidden bg-white border-t py-4 px-4 shadow-lg animate-fade-in relative z-10">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="font-semibold text-gray-800 hover:text-tectone-gold"
                onClick={closeAllMenus}
              >
                Home
              </Link>
              <Link
                to="/about-insect-screen-supplier"
                className="font-semibold text-gray-800 hover:text-tectone-gold"
                onClick={closeAllMenus}
              >
                About Us
              </Link>

              {/* Mobile Products */}
              <div className="relative">
                <button
                  className="flex items-center font-semibold text-gray-800 hover:text-tectone-gold w-full justify-between"
                  onClick={() => setIsProductsOpen((v) => !v)}
                  aria-expanded={isProductsOpen}
                  aria-controls="mobile-products"
                >
                  Products{" "}
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${
                      isProductsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProductsOpen && (
                  <div
                    id="mobile-products"
                    className="pl-4 mt-2 space-y-2 border-l-2 border-tectone-gold animate-fade-in"
                  >
                    <Link
                      to="/our-product/product/107-security-swing-door"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-tectone-gold hover:text-white rounded-md"
                      onClick={closeAllMenus}
                    >
                      Security Swing Door
                    </Link>
                    <Link
                      to="/our-product/product/104-security-folding-door"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-tectone-gold hover:text-white rounded-md"
                      onClick={closeAllMenus}
                    >
                      Security Folding Door
                    </Link>
                    <Link
                      to="/our-product/product/105-security-sliding-door"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-tectone-gold hover:text-white rounded-md"
                      onClick={closeAllMenus}
                    >
                      Security Sliding Door
                    </Link>
                    <Link
                      to="/our-product/product/103-security-casement-window"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-tectone-gold hover:text-white rounded-md"
                      onClick={closeAllMenus}
                    >
                      Casement Window
                    </Link>
                    <Link
                      to="/our-product/product/106-security-sliding-window"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-tectone-gold hover:text-white rounded-md"
                      onClick={closeAllMenus}
                    >
                      Sliding Window
                    </Link>
                    <Link
                      to="/our-product/product/102-fixed-screen"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-tectone-gold hover:text-white rounded-md"
                      onClick={closeAllMenus}
                    >
                      Fixed Security Screen
                    </Link>
                    <Link
                      to="/our-product/product/108-security-top-hung"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-tectone-gold hover:text-white rounded-md"
                      onClick={closeAllMenus}
                    >
                      Top Hung
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/blog"
                className="font-semibold text-gray-800 hover:text-tectone-gold"
                onClick={closeAllMenus}
              >
                Blog
              </Link>
              <Link
                to="/contact-us"
                className="font-semibold text-gray-800 hover:text-tectone-gold"
                onClick={closeAllMenus}
              >
                Contact Us
              </Link>
              <Link
                to="/quote"
                className="btn-primary text-center"
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
