import React from "react";
import { Link } from "react-router-dom";
import ContactSection from "@/components/ContactSection";
import homepage from "../images/HomePage.webp";
import productPicture from "../images/productPicture.webp";
import installImg from "../images/install2.webp";
import beforeGrille from "../images/install3.webp";
import lockGif from "../images/hero/lock.gif";
import FieldReviews from "@/components/FieldReviews";
import { Head } from "vite-react-ssg";
import Reveal from "@/components/Reveal";
import MeshWeave from "@/components/visuals/MeshWeave";
import CountUp from "@/components/visuals/CountUp";
import LockScrollVideo from "@/components/visuals/LockScrollVideo";
import CatalogAccordion from "@/components/CatalogAccordion";
import BTOPackages from "@/components/BTOPackages";

const manifestLines = [
  { idx: "I", title: "No bars. Ever.", body: "Stainless-steel weave does the work of a grille without the visual prison. Open windows are the brief — security is the bonus." },
  { idx: "II", title: "Engineered, not assembled.", body: "Every system is fabricated in our Woodlands workshop to the millimetre of your opening. No off-the-shelf compromise." },
  { idx: "III", title: "Built for this climate.", body: "Marine-grade alloys, certified mesh, decade-proof against monsoon and salt air. Survives Singapore on the first install." },
  { idx: "IV", title: "Honest pricing.", body: "Fixed quote on-site, written warranty, no upsell. The number you see at the survey is the number you pay." },
];

const compareRows = [
  { metric: "Visual obstruction", us: "< 5% (fine mesh)", them: "Full grille pattern" },
  { metric: "Tested impact load", us: "100kg dynamic", them: "Not rated" },
  { metric: "Airflow restriction", us: "Negligible", them: "Significant" },
  { metric: "Re-paint cycle", us: "Powder-coat · 10yr", them: "2–3 years" },
  { metric: "View from inside", us: "Recedes in daylight", them: "Bars in every photo" },
];

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>
          Insect Screen Singapore | Mosquito Net &amp; Window Mesh · SS304 | Tectone Renex Steel
        </title>
        <meta
          name="description"
          content="Singapore's specialist for stainless-steel insect screens, mosquito nets and window mesh systems. SS304 weave in powder-coated aluminium. HDB BTO packages from SGD 1,980. 10-year warranty. Survey + install in 14 days."
        />
        <meta
          name="keywords"
          content="insect screen Singapore, mosquito net Singapore, window mesh Singapore, mosquito mesh, insect mesh, HDB mosquito net, BTO insect screen, magnetic insect screen alternative, invisible grille alternative, stainless steel mosquito net, SS304 insect screen"
        />

        <meta property="og:title" content="Insect Screen Singapore | Mosquito Net & Window Mesh · Tectone Renex Steel" />
        <meta property="og:description" content="Stainless-steel insect screens, mosquito nets and window mesh — engineered in Singapore for HDB, condo and landed homes. From SGD 1,980 for BTO." />
        <meta property="og:image" content="https://tectonesteel.com/og-image.webp" />
        <meta property="og:site_name" content="Tectone Renex Steel Pte Ltd" />
        <meta property="og:url" content="https://tectonesteel.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_SG" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Insect Screen Singapore | Mosquito Net & Window Mesh · Tectone" />
        <meta name="twitter:description" content="SS304 stainless-steel insect screens and window mesh for Singapore homes. HDB BTO packages from SGD 1,980." />

        <link rel="canonical" href="https://tectonesteel.com/" />
        <link rel="alternate" hrefLang="en-SG" href="https://tectonesteel.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://tectonesteel.com/" />
        <link rel="preload" as="image" href={homepage} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://tectonesteel.com/#business",
            name: "Tectone Renex Steel Pte Ltd",
            description:
              "Singapore specialist for stainless-steel insect screens, mosquito nets and window mesh systems. SS304 weave, SGS-tested, 10-year warranty. HDB BTO, condominium and landed installations.",
            url: "https://tectonesteel.com",
            telephone: "+6596771199",
            email: "tectone777@gmail.com",
            image: "https://tectonesteel.com/og-image.webp",
            logo: "https://tectonesteel.com/og-image.webp",
            priceRange: "$$",
            currenciesAccepted: "SGD",
            paymentAccepted: "Cash, PayNow, Bank Transfer",
            areaServed: { "@type": "Country", name: "Singapore" },
            address: {
              "@type": "PostalAddress",
              streetAddress: "11 Woodlands Cl, #04-40 Woodlands 11",
              addressLocality: "Singapore",
              postalCode: "737853",
              addressCountry: "SG",
            },
            geo: { "@type": "GeoCoordinates", latitude: 1.4344, longitude: 103.8024 },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00",
              },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "59",
              bestRating: "5",
            },
            sameAs: ["https://www.facebook.com/share/1FQVZzyYPn/"],
            makesOffer: [
              {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "Insect Screen Installation" },
                areaServed: "Singapore",
              },
              {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "Mosquito Net Installation" },
                areaServed: "Singapore",
              },
              {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "Window Mesh Installation" },
                areaServed: "Singapore",
              },
              {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "HDB BTO Insect Screen Package" },
                areaServed: "Singapore",
                priceCurrency: "SGD",
                price: "1980",
              },
            ],
          })}
        </script>
      </Head>

      {/* ════════════════════════════════════════════════════
          HERO — full-bleed editorial campaign + telemetry chrome
          ════════════════════════════════════════════════════ */}
      <section className="relative bg-black text-white overflow-hidden min-h-[92vh] flex flex-col">
        <img
          src={homepage}
          alt="Tectone Insect Screen — Singapore"
          className="absolute inset-0 z-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        {/* Carousel Slide-1 pattern: left-fade so the photo breathes on the right. */}
        <div className="photo-overlay z-0" />
        <div className="absolute inset-0 z-0 frame-grid opacity-40" />
        {/* Animated stainless-steel mesh scan — the actual product, alive */}
        <MeshWeave className="absolute inset-0 z-0 w-full h-full pointer-events-none" width={1600} height={900} cell={20} />

        {/* Corner readouts — flight-deck overlays */}
        <div className="corner-readout left-4 md:left-8 top-6">
          REV.03<br />
          2026.Q2<br />
          <span className="text-white/35">RT-107 · RT-108</span>
        </div>
        <div className="corner-readout right-4 md:right-8 top-6 text-right">
          BUILD · WOODLANDS · SG<br />
          LAT 1.4344 · LNG 103.8024<br />
          <span className="text-white/35">UNITS DEPLOYED · 5,124</span>
        </div>

        {/* Lock mechanism · scroll-coupled portrait inset
            – Anchored bottom-right of the hero, above the telemetry strip.
            – Plays only when in view (IntersectionObserver inside the component).
            – Scaled progressively from a 110px phone inset up to a 220px
              desktop tile — small enough on mobile that it never crowds
              the headline, but still visible. */}
        <div className="absolute right-4 sm:right-6 lg:right-10 bottom-16 sm:bottom-20 z-10 w-[110px] sm:w-[140px] md:w-[180px] lg:w-[220px] aspect-[9/16] pointer-events-none">
          <LockScrollVideo
            src={lockGif}
            className="w-full h-full"
            caption="LOCK · RT-MECH"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 mt-auto mb-auto pt-32 pb-16">
          <div className="max-w-6xl">
            <Reveal>
              <div className="num-tag mb-8 flex items-center">
                <span className="live-dot" />
                SYS // INSECT-SCREEN-SYSTEMS // SINGAPORE // OPERATIONAL
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="display-xxl mb-10">
                Open windows.<br />
                <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>Zero bars.</span><br />
                Engineered here.
              </h1>
            </Reveal>
            <Reveal delay={280}>
              <p className="max-w-2xl text-white/65 text-lg md:text-xl leading-relaxed mb-12">
                Singapore-built insect &amp; security screen systems. Marine-grade
                stainless-steel weave in a hairline aluminium frame. Custom-fabricated
                to your opening, installed in an afternoon, warrantied for a decade.
              </p>
            </Reveal>
            <Reveal delay={420}>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/quote" className="btn-square">Configure → Quote</Link>
                <Link to="/our-product" className="btn-square-outline">View Products ↗</Link>
                <span className="hidden md:flex items-center gap-2 ml-2 text-white/45">
                  <span className="ticker-divider" />
                  <span className="num-tag">Avg lead time · 14 days</span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom-edge telemetry footer */}
        <div className="absolute bottom-0 inset-x-0 z-10 border-t border-white/10 bg-black/60 backdrop-blur-sm">
          <div className="container mx-auto px-4 h-12 flex items-center justify-between text-[10px] sm:text-[11px]">
            <div className="telemetry flex items-center">
              <span><span className="live-dot" />FAB · WOODLANDS · ONLINE</span>
              <span className="hidden sm:inline">SURVEY → INSTALL · 14–21 DAYS</span>
            </div>
            <div className="telemetry hidden md:flex items-center">
              <span>4.8 ★ · 59 REVIEWS</span>
              <span>5YR WARRANTY</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          § 01 · PROBLEM STATEMENT — Carousel Slide-2 split
          Left: dark + mesh-grid texture + serif eyesore headline.
          Right: desaturated "AFTER — USING MOSQUITO SCREEN" install photo
          with the slide's 0.20 → 0.55 vertical overlay.
          ════════════════════════════════════════════════════ */}
      <section className="relative border-t border-white/5">
        <div className="grid md:grid-cols-2 min-h-[60vh] md:min-h-[70vh]">
          {/* Left: text on dark with mesh-grid */}
          <div className="relative bg-black px-6 md:px-12 lg:px-20 py-20 md:py-28 lg:py-32 flex flex-col justify-center">
            <div className="absolute inset-0 frame-grid opacity-40 pointer-events-none" />
            <Reveal className="relative max-w-xl">
              <div className="num-tag mb-7">§ 01 · The honest part</div>
              <h2 className="display-xl mb-7">
                Most screens
                <br />
                are an eyesore.
                <br />
                <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.85)" }}>Ours aren't.</span>
              </h2>
              <p className="text-white/65 text-lg leading-relaxed">
                Heavy bars. Welded crosshatch. A view chopped into squares —
                the price most homeowners learned to pay for "safe."
                We took the bars off the table.
              </p>
            </Reveal>
          </div>

          {/* Right: full-colour Tectone install with light bottom-bias overlay
              (so the corner readout still reads cleanly). Acts as the visual
              "answer" to the headline above. */}
          <div className="relative overflow-hidden min-h-[320px] md:min-h-0">
            <img
              src={beforeGrille}
              alt="Tectone insect screen install — bars off, view back"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.40))" }}
            />
            {/* hairline divider between halves */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/30 hidden md:block" />
            <div className="corner-readout left-6 bottom-6 text-white/85">
              AFTER — TECTONE INSECT SCREEN
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          MANIFEST — four numbered principles
          (the answer to the problem above)
          ════════════════════════════════════════════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="num-tag mb-6">§ 01b · Our answer</div>
              <h2 className="display-xl mb-6">
                Why grille-free,
                <br />
                <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>without exception.</span>
              </h2>
              <p className="text-white/65 leading-relaxed max-w-md">
                Four principles that decide every product, every site visit, every warranty call.
              </p>
            </div>
            <div className="lg:col-span-8">
              {manifestLines.map((m) => (
                <div key={m.idx} className="grid grid-cols-[40px_1fr] gap-6 md:gap-8 py-8 border-b border-white/10 last:border-b-0">
                  <div className="num-tag pt-1.5">{m.idx}</div>
                  <div>
                    <h3 className="font-serif font-medium text-2xl md:text-3xl tracking-tight mb-3 leading-tight">
                      {m.title}
                    </h3>
                    <p className="text-white/65 leading-relaxed max-w-xl">{m.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SPEC CATALOG — seven product systems · expand to configure
          Each row is an accordion: click to open an inline calculator
          pre-loaded for that product. Right-side ↗ button is the
          separate redirect to the product detail page.
          ════════════════════════════════════════════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div className="max-w-2xl">
              <div className="num-tag mb-6">§ 02 · Products · 07 systems</div>
              <h2 className="display-xl mb-6">
                Seven openings,
                <br />
                <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>one workshop.</span>
              </h2>
              <p className="text-white/65 leading-relaxed">
                Tap a row to configure. Drop your dimensions, leave a number — a real PDF lands in your inbox.
                The <span className="font-mono text-white/85 text-sm">↗</span> button opens the full spec sheet for that system.
              </p>
            </div>
            <Link to="/our-product" className="btn-square-outline self-start md:self-end">
              View All Products ↗
            </Link>
          </div>

          <CatalogAccordion />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          § 02b · HDB BTO PACKAGES — high-volume conversion block
          Linked to the dedicated /hdb-packages SEO landing page.
          ════════════════════════════════════════════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <BTOPackages />
          <Reveal>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <p className="text-white/55 text-sm max-w-xl">
                Bigger floor plan, or HDB resale / condo / landed? Custom-sized
                configurator handles every opening type.
              </p>
              <Link to="/hdb-packages" className="btn-square-outline">
                Full HDB Page ↗
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          COMPARE — us vs traditional grilles
          ════════════════════════════════════════════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-14">
            <div className="num-tag mb-6">§ 03 · Comparison · A vs B</div>
            <h2 className="display-xl">
              On every metric
              <br />
              <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>that matters.</span>
            </h2>
          </div>

          <div className="border border-white/10">
            <div className="grid grid-cols-3 border-b border-white/10 bg-white/[0.02]">
              <div className="p-5 num-tag">Metric</div>
              <div className="p-5 num-tag text-white">TECTONE · SS304</div>
              <div className="p-5 num-tag">Traditional grille</div>
            </div>
            {compareRows.map((r) => (
              <div key={r.metric} className="grid grid-cols-3 border-b border-white/10 last:border-b-0">
                <div className="p-5 font-mono text-xs uppercase tracking-[0.10em] text-white/55">{r.metric}</div>
                <div className="p-5 font-serif text-base md:text-lg text-white tracking-tight">{r.us}</div>
                <div className="p-5 font-mono text-xs text-white/45 uppercase tracking-[0.10em]">{r.them}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CAMPAIGN IMAGE + CAPTION — Balenciaga editorial moment
          ════════════════════════════════════════════════════ */}
      <section className="relative cv-auto border-t border-white/5">
        <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
          <img
            src={productPicture}
            alt="Tectone installation — Singapore landed home"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          {/* Carousel pattern: bottom-fade so the photo reads at top and the caption at the bottom. */}
          <div className="photo-overlay-bottom" />
          <div className="absolute inset-0 frame-grid opacity-20" />
          <div className="corner-readout left-4 md:left-8 top-6">CAMPAIGN · 2026<br /><span className="text-white/35">FIELD · TAMPINES</span></div>
          <div className="corner-readout right-4 md:right-8 top-6 text-right">SS304 · 11×11<br /><span className="text-white/35">MATTE · #0a0a0a</span></div>

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 lg:p-20">
            <div className="container mx-auto">
              <div className="max-w-3xl">
                <p className="field-caption">
                  "Installed in an afternoon. Three monsoons later — no rust,
                  no sagging, no mosquitoes."
                </p>
                <div className="mt-6 num-tag">
                  Mei L. · Bukit Timah landed · 2023 install · Verified Google review
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          REVIEWS WIDGET
          ════════════════════════════════════════════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="num-tag mb-6">§ 04 · Field Reviews</div>
              <h2 className="display-xl">
                4.8 ★ across
                <br />
                <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>fifty-nine</span> verified homes.
              </h2>
            </div>
            <div className="num-tag md:text-right">Verified · Google Business Profile</div>
          </div>
          <FieldReviews />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          ORDER BLOCK — launch sequence CTA
          ════════════════════════════════════════════════════ */}
      <section className="relative cv-auto py-28 md:py-40 border-t border-white/5 overflow-hidden">
        <img
          src={installImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* Carousel Slide-7 CTA pattern: light at top so the photo reads, dark at bottom for CTA legibility. */}
        <div className="photo-overlay-cta" />
        <div className="absolute inset-0 frame-grid opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="num-tag mb-8 flex items-center">
              <span className="live-dot" />
              T-MINUS · 14 DAYS TO INSTALL · BOOK SURVEY
            </div>
            <h2 className="display-xxl mb-10">
              See it in your
              <br />
              <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>own home</span> first.
            </h2>
            <p className="text-white/65 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              Free on-site measurement. Fixed quote on the spot. Install in two
              to three weeks across Singapore.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/quote" className="btn-square">Configure → Quote</Link>
              <Link to="/contact-us" className="btn-square-outline">Talk to Engineering ↗</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CONTACT
          ════════════════════════════════════════════════════ */}
      <section className="cv-auto border-t border-white/5">
        <ContactSection />
      </section>
    </>
  );
};

export default HomePage;
