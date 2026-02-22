import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import headerIcon from "../images/header02.webp";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 min-h-[320px]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              {/* ✅ CLS 修复：明确 width/height，让浏览器提前保留空间 */}
              <img
                src={headerIcon}
                alt="Tectone Renex Steel Pte Ltd"
                width={40}
                height={40}

                className="h-10 w-auto mb-4 object-contain"
                decoding="async"
              />
            </Link>

            <p className="text-gray-300 mb-4 text-justify text-xs sm:text-sm md:text-base">
              Tectone Renex Steel Pte Ltd
              <br />
              Premium insect screens and security screens for doors and windows,
              designed with elegance for modern Singapore homes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm sm:text-base md:text-xl font-semibold mb-2 md:mb-4 text-tectone-gold">
              Quick Links
            </h3>
            <ul className="space-y-2 list-none p-0 m-0">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-tectone-gold transition-colors text-xs sm:text-sm md:text-base"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about-insect-screen-supplier"
                  className="text-gray-300 hover:text-tectone-gold transition-colors text-xs sm:text-sm md:text-base"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/our-product"
                  className="text-gray-300 hover:text-tectone-gold transition-colors text-xs sm:text-sm md:text-base"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-tectone-gold transition-colors text-xs sm:text-sm md:text-base"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-gray-300 hover:text-tectone-gold transition-colors text-xs sm:text-sm md:text-base"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-tectone-gold">
              Contact Us
            </h3>

            <ul className="space-y-3 list-none p-0 m-0">
              {/* Address */}
              <li className="flex items-start">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-tectone-gold mr-2 mt-0.5 shrink-0" />
                <a
                  href="https://www.google.com/maps/place/Tectone+Renex+Steel+PTE.LTD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-tectone-gold transition-colors text-xs sm:text-sm md:text-base"
                >
                  11 Woodlands Cl, #04-40 Woodlands 11, Singapore 737853
                </a>
              </li>

              {/* Email */}
              <li className="flex items-center">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-tectone-gold mr-2 mt-0.5 shrink-0" />
                <a
                  href="mailto:tectone777@gmail.com"
                  className="text-gray-300 hover:text-tectone-gold transition-colors text-xs sm:text-sm md:text-base"
                >
                  tectone777@gmail.com
                </a>
              </li>

              {/* Phone Numbers */}
              <li className="flex flex-col">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-tectone-gold mr-2 mt-0.5 shrink-0" />
                  <a
                    href="tel:+6596771199"
                    className="text-gray-300 hover:text-tectone-gold transition-colors text-xs sm:text-sm md:text-base"
                  >
                    +65-9677 1199 (Charlie)
                  </a>
                </div>

                <div className="pl-7 mt-1">
                  <a
                    href="tel:+6580330428"
                    className="text-gray-300 hover:text-tectone-gold transition-colors text-xs sm:text-sm md:text-base"
                  >
                    +65-8033 0428 (John)
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-tectone-gold">
              Business Hours
            </h3>

            <ul className="space-y-2 list-none p-0 m-0">
              <li className="text-gray-300 text-xs sm:text-sm md:text-base">
                <span className="font-semibold">Monday - Friday:</span> 9am – 6pm
              </li>
              <li className="text-gray-300 text-xs sm:text-sm md:text-base">
                <span className="font-semibold">Sunday & Public Holidays:</span>{" "}
                Closed
              </li>
            </ul>

            <Link
              to="/quote"
              className="inline-block mt-4 btn-primary hover:bg-tectone-gold/90 px-5 py-2 rounded transition-all font-semibold"
            >
              Get A Quote
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-5 text-center text-slate-500 text-xs sm:text-sm">
          <p>© {currentYear} Tectone Renex Steel Pte Ltd. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
