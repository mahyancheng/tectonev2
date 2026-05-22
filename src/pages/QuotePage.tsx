import React from "react";
import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import ContactSection from "@/components/ContactSection";
import CatalogAccordion from "@/components/CatalogAccordion";
import Reveal from "@/components/Reveal";

const QuotePage: React.FC = () => {
  const canonical = "https://tectonesteel.com/quote";

  return (
    <>
      <Head>
        <title>Get a Quote · Insect Screen &amp; Mosquito Net Singapore | Tectone Renex Steel</title>
        <meta
          name="description"
          content="Configure your Singapore insect screen, mosquito net or window mesh in 3 steps. Drop your mm dimensions, leave your number — quote PDF in your inbox within minutes."
        />
        <meta
          name="keywords"
          content="insect screen quote Singapore, mosquito net quote, window mesh quote, HDB insect screen pricing, BTO mosquito net cost, mosquito mesh price Singapore"
        />

        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="en-SG" href={canonical} />

        {/* OG */}
        <meta property="og:title" content="Get a Quote · Insect Screen & Mosquito Net Singapore | Tectone" />
        <meta
          property="og:description"
          content="Configure your insect screen or mosquito net for any HDB, condo or landed opening in Singapore. PDF quote in minutes."
        />
        <meta property="og:site_name" content="Tectone Renex Steel Pte Ltd" />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_SG" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Get a Quote · Insect Screen & Mosquito Net Singapore | Tectone" />
        <meta
          name="twitter:description"
          content="Instant quote for Singapore insect screens, mosquito nets and window mesh — HDB, BTO, condo or landed. PDF in your inbox in minutes."
        />
      </Head>

      {/* ════════════════════════════════════════════════════
          INTRO — editorial header. Mirrors HomePage § 02.
          ════════════════════════════════════════════════════ */}
      <section className="cv-auto py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div className="max-w-2xl">
              <Reveal>
                <div className="num-tag mb-6">§ Quote · 07 systems</div>
              </Reveal>
              <Reveal delay={100}>
                <h1 className="display-xl mb-6">
                  Configure your
                  <br />
                  <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>opening.</span>
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-white/65 leading-relaxed">
                  Tap a row to expand the configurator for that system. Drop your dimensions,
                  leave a number — a real PDF lands in your inbox within minutes. No commitment, no upsell.
                </p>
              </Reveal>
            </div>
            <Reveal delay={260}>
              <div className="num-tag md:text-right">
                <span className="live-dot" />
                AVG REPLY · 8 MIN · BUSINESS HOURS
              </div>
            </Reveal>
          </div>

          <CatalogAccordion />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          HELP CTA — direct line for the impatient
          ════════════════════════════════════════════════════ */}
      <section className="cv-auto py-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Reveal>
              <div className="num-tag mb-6">§ Direct · skip the form</div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="display-xl mb-6">
                Rather just
                <br />
                <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>talk?</span>
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="text-white/65 mb-8 leading-relaxed">
                Our team will pick up the line during business hours and answer measurement
                questions in plain English. No queue tickets, no agents reading scripts.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+6596771199" className="btn-square">
                  Call · +65 9677 1199
                </a>
                <a href="mailto:tectone777@gmail.com" className="btn-square-outline">
                  Email Us ↗
                </a>
                <Link to="/contact-us" className="btn-square-outline">
                  Site Survey ↗
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="cv-auto">
        <ContactSection />
      </section>
    </>
  );
};

export default QuotePage;
