import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { ChevronDown } from "lucide-react";
import ContactSection from "@/components/ContactSection";
import BTOPackages from "@/components/BTOPackages";
import Reveal from "@/components/Reveal";

const FAQS = [
  {
    q: "Does the package cover all common HDB BTO window types?",
    a: "Yes — the standard package covers all living-room and bedroom windows at the 850 mm height that is standard across HDB BTO flats from 2019 onward. Casement windows, sliding windows and top-hung windows are all covered by the SS304 mesh + powder-coated aluminium frame system. Toggle the + Service Yard variant if you want the service-yard window included too.",
  },
  {
    q: "Why is Tectone more expensive than the $7–10/sqft magnetic mosquito nets I see online?",
    a: "Cheap magnetic mesh uses fibreglass or PET fabric held on with 3M tape — it stops mosquitoes but tears in a year and provides zero security. Our system is SS304 stainless-steel woven mesh in a 0.6 mm aluminium frame, mechanically fixed to the window frame. It's intrusion-rated, child- and pet-safe, monsoon-proof, and warrantied for 10 years. Different category of product.",
  },
  {
    q: "Will HDB or my BTO contractor object to the installation?",
    a: "No. The system installs onto the existing aluminium window frames — no drilling into the HDB structure, no changes to the window casement itself. It does not affect your HDB defects-liability period or your contractor's warranty.",
  },
  {
    q: "What's the install lead time once I confirm the package?",
    a: "Typically 14 days from confirmed survey to install. The survey itself is on-site, free, and takes ~30 minutes. Install is one afternoon. Both are scheduled at your convenience.",
  },
  {
    q: "Can I add doors (kitchen, balcony, main entry) to the package?",
    a: "Yes. The HDB sets cover windows by default; door systems (swing, folding, sliding) are quoted separately based on opening dimensions. The configurator at /quote handles custom door sizing.",
  },
  {
    q: "Do you serve all of Singapore?",
    a: "Yes — island-wide HDB BTO, resale, condominium and landed coverage. Our workshop is in Woodlands; the install crew operates across all districts.",
  },
];

const HdbPackagesPage: React.FC = () => {
  const canonical = "https://tectonesteel.com/hdb-packages";
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Head>
        <title>
          HDB Mosquito Net Singapore | BTO Insect Screen Packages 3/4/5-Room | Tectone Renex Steel
        </title>
        <meta
          name="description"
          content="All-inclusive insect screen and mosquito net packages for HDB BTO flats in Singapore. SS304 stainless-steel mesh, 10-year warranty, 14-day install. From SGD 1,980 for 3-Room BTO."
        />
        <meta
          name="keywords"
          content="HDB mosquito net Singapore, BTO insect screen, insect screen HDB, mosquito net HDB BTO, 4-room mosquito net, 5-room insect screen, where to buy mosquito net in Singapore, mosquito net installation Singapore, window mesh HDB Singapore"
        />
        {/* Geo */}
        <meta name="geo.region" content="SG" />
        <meta name="geo.placename" content="Singapore" />
        <meta name="geo.position" content="1.4344;103.8024" />
        <meta name="ICBM" content="1.4344, 103.8024" />

        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="en-SG" href={canonical} />
        <link rel="alternate" hrefLang="x-default" href={canonical} />

        {/* OG */}
        <meta property="og:title" content="HDB Mosquito Net Singapore | BTO Insect Screen Packages | Tectone" />
        <meta
          property="og:description"
          content="All-inclusive HDB BTO insect screen sets — SS304 mesh, 10-yr warranty, from SGD 1,980. Singapore-only."
        />
        <meta property="og:site_name" content="Tectone Renex Steel Pte Ltd" />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="product.group" />
        <meta property="og:locale" content="en_SG" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HDB Mosquito Net Singapore | BTO Insect Screen Packages" />
        <meta
          name="twitter:description"
          content="Insect screen + mosquito net packages for HDB BTO flats. SS304 mesh, 10-yr warranty, from SGD 1,980."
        />

        {/* Product / Offer schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "HDB BTO Insect Screen Package",
            description:
              "Stainless-steel insect screen and mosquito net packages designed for HDB BTO 3-Room, 4-Room and 5-Room flats in Singapore.",
            brand: { "@type": "Brand", name: "Tectone Renex Steel" },
            category: "Insect Screen / Mosquito Net",
            areaServed: { "@type": "Country", name: "Singapore" },
            offers: [
              { "@type": "Offer", name: "HDB BTO 3-Room", price: "1980.00", priceCurrency: "SGD", availability: "https://schema.org/InStock", url: canonical },
              { "@type": "Offer", name: "HDB BTO 4-Room", price: "2600.00", priceCurrency: "SGD", availability: "https://schema.org/InStock", url: canonical },
              { "@type": "Offer", name: "HDB BTO 5-Room", price: "3220.00", priceCurrency: "SGD", availability: "https://schema.org/InStock", url: canonical },
            ],
          })}
        </script>

        {/* FAQPage schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          })}
        </script>
      </Head>

      {/* ════════════════════════════════════════════════════
          HERO — editorial flight-deck header
          ════════════════════════════════════════════════════ */}
      <section className="relative cv-auto py-20 md:py-28 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 frame-grid opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <Reveal>
            <div className="num-tag mb-7 flex items-center">
              <span className="live-dot" />
              SG · HDB · BTO · ALL-INCLUSIVE SETS
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display-xxl mb-7 max-w-5xl">
              HDB mosquito-net
              <br />
              <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>
                packages, sized for BTO.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="max-w-2xl text-white/65 text-lg leading-relaxed mb-10">
              All-inclusive insect screen sets for Singapore HDB BTO flats —
              3-Room, 4-Room and 5-Room. SS304 stainless-steel mesh in
              powder-coated aluminium, fabricated to your floor plan, installed in
              one afternoon, warrantied for ten years.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-wrap gap-3">
              <a href="#packages" className="btn-square">View Packages →</a>
              <Link to="/quote" className="btn-square-outline">Custom Sizing ↗</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          PACKAGES — the main commercial block
          ════════════════════════════════════════════════════ */}
      <section id="packages" className="cv-auto py-20 md:py-28 border-b border-white/5">
        <div className="container mx-auto px-4">
          <BTOPackages />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          WHY HDB OWNERS PICK TECTONE
          ════════════════════════════════════════════════════ */}
      <section className="cv-auto py-20 md:py-28 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <Reveal>
              <div className="num-tag mb-6">§ Why Tectone for HDB</div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="display-xl mb-6">
                Cheap mosquito mesh
                <br />
                <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>
                  lasts a year. Ours lasts ten.
                </span>
              </h2>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {[
              {
                t: "SS304 stainless-steel weave",
                b: "Marine-grade mesh. Won't rust through Singapore's monsoon humidity. Won't tear if a child or pet leans into it.",
              },
              {
                t: "Mechanically fixed, not taped",
                b: "0.6 mm aluminium frame screw-fixed to your window opening — not 3M adhesive that fails in 12 months. Removes only when you remove it.",
              },
              {
                t: "Singapore workshop, 14-day lead",
                b: "Fabricated in our Woodlands workshop to the millimetre. Survey to install in 14 days. 10-year written warranty.",
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 80} className="bg-black">
                <div className="p-6 md:p-8 h-full">
                  <div className="num-tag mb-4">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="font-serif text-xl text-white tracking-tight mb-3">{c.t}</h3>
                  <p className="text-white/65 leading-relaxed text-sm">{c.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FAQ — SEO-rich, schema-linked
          ════════════════════════════════════════════════════ */}
      <section className="cv-auto py-20 md:py-28 border-b border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <Reveal>
            <div className="num-tag mb-6">§ FAQ · HDB insect-screen sets</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="display-xl mb-10">
              Common questions, <br />
              <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>
                honest answers.
              </span>
            </h2>
          </Reveal>

          <div className="border-t border-white/10">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full text-left py-5 md:py-6 flex items-center justify-between gap-4 group"
                  >
                    <span className="font-serif text-base md:text-lg tracking-tight text-white">
                      {f.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-white/60 flex-shrink-0 transition-transform ${
                        isOpen ? "rotate-180 text-white" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-6 pr-8 text-white/65 text-sm leading-relaxed">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cv-auto">
        <ContactSection />
      </section>
    </>
  );
};

export default HdbPackagesPage;
