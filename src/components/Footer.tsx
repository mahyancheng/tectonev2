import React from "react";
import { Link } from "react-router-dom";
import headerIcon from "../images/tectone-logo-white.jpg";

const systems = [
  {
    label: "01 · Systems",
    links: [
      { to: "/our-product/product/107-security-swing-door", text: "RT-107 · Swing Door" },
      { to: "/our-product/product/104-security-folding-door", text: "RT-104 · Folding Door" },
      { to: "/our-product/product/105-security-sliding-door", text: "RT-105 · Sliding Door" },
      { to: "/our-product/product/103-security-casement-window", text: "RT-103 · Casement Window" },
      { to: "/our-product/product/106-security-sliding-window", text: "RT-106 · Sliding Window" },
      { to: "/our-product/product/102-fixed-screen", text: "RT-102 · Fixed Screen" },
      { to: "/our-product/product/108-security-top-hung", text: "RT-108 · Top Hung" },
    ],
  },
  {
    label: "02 · Build",
    links: [
      { to: "/quote", text: "Configure → quote" },
      { to: "/our-product", text: "Full catalog" },
      { to: "/about-insect-screen-supplier", text: "Manifest" },
      { to: "/blog", text: "Field notes" },
    ],
  },
  {
    label: "03 · Channels",
    links: [
      { href: "tel:+6596771199", text: "+65 9677 1199 · Charlie" },
      { href: "tel:+6580330428", text: "+65 8033 0428 · John" },
      { href: "mailto:tectone777@gmail.com", text: "tectone777@gmail.com" },
      { to: "/contact-us", text: "Site survey · booking" },
    ],
  },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white border-t border-white/10 overflow-hidden">
      {/* schematic grid */}
      <div className="absolute inset-0 pointer-events-none frame-grid opacity-30" />

      {/* Top telemetry strip — mirror the nav */}
      <div className="border-b border-white/10 relative">
        <div className="container mx-auto px-4 h-10 flex items-center justify-between text-[10px] sm:text-[11px]">
          <div className="telemetry flex items-center">
            <span><span className="live-dot" />FAB · WOODLANDS · ONLINE</span>
            <span className="hidden md:inline">11 WOODLANDS CL · 737853 · SG</span>
          </div>
          <div className="telemetry flex items-center">
            <span className="hidden sm:inline">MON–FRI · 09:00–18:00 SGT</span>
            <span>SUN · OFFLINE</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-16 pb-10 relative">
        {/* Brand mark + tagline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-14 border-b border-white/10">
          <div>
            <Link to="/" className="inline-flex items-center mb-6">
              <img
                src={headerIcon}
                alt="Tectone Renex Steel Pte Ltd"
                width={48}
                height={48}
                className="h-12 w-auto object-contain"
                decoding="async"
              />
            </Link>
            <div className="num-tag mb-2">EST. 2014 · SG-UEN</div>
            <p className="font-serif text-xl md:text-2xl text-white/80 leading-tight max-w-md tracking-tight">
              Insect &amp; security screen <span style={{ fontStyle: "italic" }}>systems</span>, built in
              Singapore for Singapore homes.
            </p>
          </div>
          <Link to="/quote" className="btn-square self-start lg:self-auto">
            Configure → Quote
          </Link>
        </div>

        {/* Three systems columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 py-14 border-b border-white/10">
          {systems.map((col) => (
            <div key={col.label}>
              <div className="num-tag mb-5">{col.label}</div>
              <ul className="space-y-3 list-none p-0 m-0">
                {col.links.map((l) => (
                  <li key={l.text}>
                    {"to" in l && l.to ? (
                      <Link
                        to={l.to}
                        className="text-sm text-white/65 hover:text-white transition-colors"
                      >
                        {l.text}
                      </Link>
                    ) : (
                      <a
                        href={(l as { href: string }).href}
                        className="text-sm text-white/65 hover:text-white transition-colors"
                      >
                        {l.text}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom legal strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span className="font-mono uppercase tracking-[0.12em]">
            © {currentYear} TECTONE RENEX STEEL · RESERVED
          </span>
          <span className="font-mono uppercase tracking-[0.12em] flex items-center">
            <Link to="/privacy-policy" className="hover:text-white/70 transition-colors">
              Privacy
            </Link>
            <span className="ticker-divider" />
            <Link to="/terms" className="hover:text-white/70 transition-colors">
              Terms
            </Link>
            <span className="ticker-divider" />
            <span>v2.0 · 2026.Q2</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
