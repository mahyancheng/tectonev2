import React from "react";
import { Link } from "react-router-dom";
import EnhancedQuoteCalculator from "../components/EnhancedQuoteCalculator";
import { Shield, Zap, Wind, Layers, Settings, MapPin, ArrowRight } from "lucide-react";
import ContactSection from "@/components/ContactSection";
import homepage from "../images/HomePage.webp";
import productPicture from "../images/productPicture.webp";
import GoogleReviewsWidget from "@/components/GoogleReviewsWidget";
import { Head } from "vite-react-ssg";

const features = [
  {
    icon: <Shield size={20} />,
    title: "Elegant Design",
    desc: "Grille-free aluminium frames that recede into the architecture. Not the eyesore you've come to expect from a security screen.",
  },
  {
    icon: <Zap size={20} />,
    title: "Real Protection",
    desc: "Stainless-steel mesh certified to international standards. Stops mosquitoes, lizards, and intruders without compromising the view.",
  },
  {
    icon: <Wind size={20} />,
    title: "Open Windows",
    desc: "Doors and windows can stay open all day. Air moves freely. The mesh is fine enough that you stop noticing it's there.",
  },
  {
    icon: <Layers size={20} />,
    title: "Built for the Climate",
    desc: "Corrosion-resistant for Singapore humidity, salt air, and monsoon rain. Engineered to last a decade outdoors.",
  },
  {
    icon: <Settings size={20} />,
    title: "Made to Measure",
    desc: "Every screen is measured on-site and fabricated to the millimetre. Installed in hours with minimal disruption.",
  },
  {
    icon: <MapPin size={20} />,
    title: "Local Expertise",
    desc: "Designed in Singapore for Singapore homes — HDB, condo, landed. We've installed in every district.",
  },
];

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>
          Insect Screen Singapore | Custom Mosquito Netting | Tectone Renex Steel Pte Ltd
        </title>
        <meta
          name="description"
          content="High-quality insect screens and mosquito netting solutions in Singapore. Get an instant quote today!"
        />
        <meta property="og:title" content="Insect Screen Singapore | Custom Mosquito Netting | Tectone Renex Steel Pte Ltd" />
        <meta property="og:description" content="Premium insect screens with elegant design and superior protection. Get your quote now." />
        <meta property="og:image" content="https://tectonesteel.com/og-image.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://tectonesteel.com/" />
        <link rel="preload" as="image" href={homepage} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Tectone Renex Steel Pte Ltd",
            "url": "https://tectonesteel.com",
            "telephone": "+6596771199",
            "email": "tectone777@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "11 Woodlands Cl, #04-40 Woodlands 11",
              "addressLocality": "Singapore",
              "postalCode": "737853",
              "addressCountry": "SG"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              }
            ],
            "sameAs": ["https://www.facebook.com/share/1FQVZzyYPn/"]
          })}
        </script>
      </Head>

      {/* ════════════ HERO ════════════ */}
      <section className="relative bg-black text-white overflow-hidden">
        <img
          src={homepage}
          alt="Premium insect screen Singapore"
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-35"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
        <div className="absolute inset-0 z-0 mesh-bg opacity-30" />

        <div className="container mx-auto px-4 py-28 md:py-44 relative z-10">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">Tectone Renex Steel · Singapore</p>
            <h1 className="font-serif text-5xl md:text-7xl font-medium leading-[1.05] tracking-tight mb-6">
              Insect Screen Systems Specialist in Singapore
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed">
              Custom-made insect and security screens for Singapore homes.
              Built to disappear into the architecture and last a decade.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/our-product" className="btn-primary">
                Explore Insect Screen Solutions
              </Link>
              <Link to="/quote" className="btn-outline">
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ QUOTE CALCULATOR ════════════ */}
      <section className="py-10 md:py-14 bg-background border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <EnhancedQuoteCalculator />
          </div>
        </div>
      </section>

      {/* ════════════ FEATURES ════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-16">
            <p className="eyebrow mb-4">Why Tectone</p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Choose Us as Your Insect Screen Solution Provider
            </h2>
            <p className="text-white/65 text-lg leading-relaxed">
              Aluminium-framed screens with security-grade stainless-steel mesh.
              Designed in Singapore, fitted to your space, finished to disappear.
              Six reasons clients keep choosing Tectone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background p-8 md:p-10 hover:bg-white/[0.03] transition-colors animate-on-scroll"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="feature-icon mb-5">{feature.icon}</div>
                <h3 className="text-xl font-medium tracking-tight mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <Link to="/about-insect-screen-supplier" className="btn-outline">
              Learn More About Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════ PRODUCT SHOWCASE ════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-16">
            <p className="eyebrow mb-4">Our Solutions</p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Our Insect Screen Solutions
            </h2>
            <p className="text-white/65 text-lg leading-relaxed">
              Seven product families. Swing doors, sliding doors, folding doors,
              and a full range of window systems — every one fabricated to your
              opening and finished to match your space.
            </p>
          </div>

          <Link
            to="/our-product"
            className="group block surface-card overflow-hidden animate-on-scroll"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-72 md:h-96 lg:h-auto lg:min-h-[420px] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${productPicture})` }}
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="eyebrow mb-3">Product range</p>
                <h3 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-4">
                  Insect Screen Solutions
                </h3>
                <p className="text-white/65 leading-relaxed mb-6">
                  Aluminium-framed screens with fine stainless-steel mesh.
                  Grille-free, custom-fitted, and built to disappear into your
                  windows and doors.
                </p>
                <span className="inline-flex items-center font-medium text-white">
                  View All Products
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ════════════ TESTIMONIALS ════════════ */}
      <section className="cv-auto-1200 py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-16">
            <p className="eyebrow mb-4">Testimonials</p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-6">
              What Our Clients Say
            </h2>
            <p className="text-white/65 text-lg leading-relaxed">
              Verified Google reviews from Singapore homeowners — 4.9 across
              five-thousand-plus installations.
            </p>
          </div>

          <GoogleReviewsWidget
            appId="8cd1d32f-8560-4f1b-83e3-1f967e45204a"
            className="surface-card p-6 md:p-8 animate-on-scroll min-h-[520px]"
          />
        </div>
      </section>

      <section className="cv-auto border-t border-white/5">
        <ContactSection />
      </section>
    </>
  );
};

export default HomePage;
