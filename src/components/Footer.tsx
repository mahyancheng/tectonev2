import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import headerIcon from "../images/tectone-logo-white.jpg";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about-insect-screen-supplier", label: "About Us" },
  { to: "/our-product", label: "Products" },
  { to: "/blog", label: "Blog" },
  { to: "/contact-us", label: "Contact Us" },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const linkBase = "text-white/55 hover:text-white transition-colors text-sm";
  const headingBase =
    "eyebrow mb-4";

  return (
    <footer className="relative bg-black text-white pt-20 pb-10 border-t border-white/10">
      {/* subtle mesh background — references the actual product */}
      <div className="absolute inset-0 pointer-events-none mesh-bg opacity-50" />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          {/* Company */}
          <div>
            <Link to="/" className="inline-flex items-center mb-5">
              <img
                src={headerIcon}
                alt="Tectone Renex Steel Pte Ltd"
                width={40}
                height={40}
                className="h-10 w-auto object-contain"
                decoding="async"
              />
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              Tectone Renex Steel Pte Ltd — Premium insect screens and security
              screens for doors and windows, designed with elegance for modern
              Singapore homes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={headingBase}>Quick Links</h3>
            <ul className="space-y-3 list-none p-0 m-0">
              {quickLinks.map((q) => (
                <li key={q.to}>
                  <Link to={q.to} className={linkBase}>
                    {q.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={headingBase}>Contact Us</h3>
            <ul className="space-y-4 list-none p-0 m-0">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-white/70 mt-0.5 shrink-0" />
                <a
                  href="https://www.google.com/maps/place/Tectone+Renex+Steel+PTE.LTD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkBase}
                >
                  11 Woodlands Cl, #04-40 Woodlands 11, Singapore 737853
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-white/70 mt-0.5 shrink-0" />
                <a href="mailto:tectone777@gmail.com" className={linkBase}>
                  tectone777@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-white/70 mt-0.5 shrink-0" />
                  <a href="tel:+6596771199" className={linkBase}>
                    +65-9677 1199 (Charlie)
                  </a>
                </div>
                <div className="pl-7 mt-1.5">
                  <a href="tel:+6580330428" className={linkBase}>
                    +65-8033 0428 (John)
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className={headingBase}>Business Hours</h3>
            <ul className="space-y-2 list-none p-0 m-0 text-sm">
              <li className="text-white/55">
                <span className="text-white/85 font-medium">Monday – Friday:</span> 9am – 6pm
              </li>
              <li className="text-white/55">
                <span className="text-white/85 font-medium">Sunday & PH:</span> Closed
              </li>
            </ul>

            <Link to="/quote" className="btn-primary text-sm mt-6">
              Get A Quote
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {currentYear} Tectone Renex Steel Pte Ltd. All Rights Reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white/70 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
