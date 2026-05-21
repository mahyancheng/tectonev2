import React, { useState } from "react";
import { Head } from "vite-react-ssg";
import { ChevronDown } from "lucide-react";
import LandingPageLayout, {
  handleWhatsAppClick,
} from "@/components/LandingPageLayout";
import FieldReviews from "@/components/FieldReviews";
import Reveal from "@/components/Reveal";
import MeshWeave from "@/components/visuals/MeshWeave";
import CountUp from "@/components/visuals/CountUp";
import { trackEvent } from "@/lib/metaPixel";
import { useToast } from "@/hooks/use-toast";

import lpHero from "@/images/lp/hero-living-room.jpg";
import lpExterior from "@/images/lp/gallery-exterior-villa.jpg";
import lpGarden from "@/images/lp/gallery-garden.jpg";
import lpDetail from "@/images/lp/gallery-detail.jpg";
import lpBalcony from "@/images/lp/gallery-balcony.jpg";
import install1 from "@/images/install1.webp";
import install2 from "@/images/install2.webp";

const specRows = [
  { metric: "Mesh", us: "SS304 stainless · 11×11", them: "Painted MS · welded grille" },
  { metric: "Frame", us: "6063-T6 aluminium · matte", them: "Mild steel · rust over time" },
  { metric: "Impact load", us: "100kg dynamic · tested", them: "Not rated" },
  { metric: "Visual obstruction", us: "<5% · disappears in daylight", them: "Full crosshatch · always seen" },
  { metric: "Install time", us: "2–4 hrs · dust-controlled", them: "Half day · drilling" },
  { metric: "Warranty", us: "5 years · written", them: "1 year · verbal" },
];

const faqs = [
  {
    q: "How much does a security insect screen cost in Singapore?",
    a: "Sizing dictates the number. Most HDB / condo sliding doors fall in the SGD 800–1,500 per panel range; landed varies more. WhatsApp us your dimensions or a photo for a same-day estimate.",
  },
  {
    q: "How long does installation take?",
    a: "Order confirmation to install is typically 14–21 days. The on-site fit itself takes 2–4 hours per door, dust-controlled.",
  },
  {
    q: "Will the mesh block my view or airflow?",
    a: "No. Fine stainless steel in a matte powder-coat — visually recedes in daylight, airflow essentially unchanged.",
  },
  {
    q: "Is it really strong enough to stop break-ins?",
    a: "Yes. The mesh is woven from security-grade stainless steel in a 6063-T6 aluminium frame, multi-point locked. Certified to international knife-shear and impact standards.",
  },
  {
    q: "Do you serve HDB / Condo / Landed?",
    a: "All three. Installations across every district. Send your address on WhatsApp and we'll confirm coverage instantly.",
  },
];

const galleryImgs = [
  { src: lpExterior, alt: "Tectone exterior — landed home", code: "LH-001" },
  { src: lpGarden, alt: "Tectone garden view", code: "LH-002" },
  { src: lpDetail, alt: "Stainless-steel mesh detail", code: "MX-007" },
  { src: lpBalcony, alt: "Tectone balcony — apartment", code: "AP-014" },
  { src: install1, alt: "Tectone installation 1", code: "INS-21" },
  { src: install2, alt: "Tectone installation 2", code: "INS-23" },
];

const SecurityScreenLandingPage: React.FC = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    propertyType: "HDB",
  });
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    trackEvent("Lead", {
      content_name: "lp_security_screen_form",
      property_type: form.propertyType,
    });
    const message = `Hi! I'd like a quote.\n\nName: ${form.name}\nPhone: ${form.phone}\nProperty: ${form.propertyType}`;
    const url = `https://wa.me/6596771199?text=${encodeURIComponent(message)}`;
    toast({
      title: "Opening WhatsApp…",
      description: "Send the message — quote within the hour.",
    });
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitting(false);
  };

  return (
    <LandingPageLayout>
      <Head>
        <title>
          Mosquito-Proof Your Home in Singapore | Tectone Security Insect Screens
        </title>
        <meta
          name="description"
          content="Premium stainless-steel security insect screens for Singapore homes. Keep mosquitoes, lizards & intruders out — without losing the view. WhatsApp for a same-day quote."
        />
        <meta property="og:title" content="Mosquito-Proof Your Home — Tectone Security Insect Screens" />
        <meta property="og:description" content="Security-grade stainless-steel mesh. Custom-fitted for HDB, condo and landed homes." />
        <meta property="og:image" content="https://tectonesteel.com/og-image.webp" />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href="https://tectonesteel.com/lp/security-screen" />
      </Head>

      {/* ═════════════ HERO — full-bleed + telemetry ═════════════ */}
      <section className="relative bg-black text-white overflow-hidden min-h-[88vh] flex flex-col">
        <img
          src={lpHero}
          alt="Modern Singapore living room with security insect screen door"
          className="absolute inset-0 z-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/85 via-black/60 to-black/95" />
        <div className="absolute inset-0 z-0 frame-grid opacity-35" />
        <MeshWeave className="absolute inset-0 z-0 w-full h-full pointer-events-none" width={1600} height={900} cell={20} />

        <div className="corner-readout left-4 md:left-8 top-6">
          CAMPAIGN · META-LP<br />
          REV.03 · 2026.Q2<br />
          <span className="text-white/35">RT-105 · SLIDING DOOR</span>
        </div>
        <div className="corner-readout right-4 md:right-8 top-6 text-right">
          BUILD · WOODLANDS · SG<br />
          LAT 1.4344 · LNG 103.8024<br />
          <span className="text-white/35">SURVEY → INSTALL · 14d</span>
        </div>

        <div className="container mx-auto px-4 relative z-10 mt-auto mb-auto pt-32 pb-16">
          <div className="max-w-5xl">
            <Reveal>
              <div className="num-tag mb-7 flex items-center">
                <span className="live-dot" />
                SYS // INSECT-SCREEN-SYSTEMS // SINGAPORE // OPERATIONAL
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="display-xxl mb-10">
                Open the windows.
                <br />
                <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>Zero mosquitoes.</span>
                <br />
                Zero bars.
              </h1>
            </Reveal>
            <Reveal delay={280}>
              <p className="max-w-2xl text-white/70 text-lg md:text-xl leading-relaxed mb-10">
                Singapore-built stainless-steel security insect screens.
                Custom-fabricated to your opening, installed in an afternoon.
                Free site survey · fixed quote on the spot.
              </p>
            </Reveal>
            <Reveal delay={420}>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    handleWhatsAppClick(
                      "Hi! I saw your ad and want a free quote for security insect screens."
                    )
                  }
                  className="btn-square"
                >
                  WhatsApp Engineering → Quote
                </button>
                <a href="#configure" className="btn-square-outline">
                  Spec sheet ↓
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* bottom telemetry */}
        <div className="absolute bottom-0 inset-x-0 z-10 border-t border-white/10 bg-black/65 backdrop-blur-sm">
          <div className="container mx-auto px-4 h-12 flex items-center justify-between text-[10px] sm:text-[11px]">
            <div className="telemetry flex items-center">
              <span><span className="live-dot" />REPLY · ~8 MIN BUSINESS HRS</span>
              <span className="hidden sm:inline">5 YR · WRITTEN WARRANTY</span>
            </div>
            <div className="telemetry hidden md:flex items-center">
              <span>4.8 ★ · 59 REVIEWS</span>
              <span>UNITS · 5,124</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════ TRUST METRIC STRIP ═════════════ */}
      <section className="bg-black border-y border-white/10">
        <div className="container mx-auto px-4 py-10 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { node: <><CountUp to={10} duration={1.4} />+</>, label: "YEARS · SG" },
            { node: <CountUp to={5124} duration={2.2} />, label: "HOMES · DEPLOYED" },
            { node: <CountUp to={4.8} duration={1.6} decimals={1} />, label: "GOOGLE · 59 REVIEWS" },
            { node: <><CountUp to={5} duration={1.2} />YR</>, label: "WRITTEN · WARRANTY" },
          ].map((t, i) => (
            <Reveal key={t.label} delay={i * 80}>
              <div className="stat-num" style={{ fontSize: "clamp(36px, 6vw, 60px)" }}>{t.node}</div>
              <div className="stat-label">{t.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═════════════ MANIFESTO / PROBLEM ═════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="num-tag mb-7">§ 01 · The honest part</div>
            <h2 className="display-xl mb-7">
              Most screens are
              <br />
              <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>an eyesore.</span>
            </h2>
            <p className="text-white/65 text-lg leading-relaxed max-w-xl mb-7">
              Heavy bars. Welded crosshatch. A view chopped into squares — the
              price most homeowners learned to pay for "safe."
            </p>
            <p className="text-white/85 font-serif text-xl md:text-2xl tracking-tight italic max-w-xl mb-9">
              We made the version that doesn't ask you to choose.
            </p>
            <button
              type="button"
              onClick={() =>
                handleWhatsAppClick("Hi! I have a question about security insect screens.")
              }
              className="btn-square"
            >
              Talk to Engineering →
            </button>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5]">
              <img
                src={lpGarden}
                alt="Tectone security screen — garden view"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 frame-grid opacity-30" />
              <div className="corner-readout left-3 top-3">FIELD · LH-002</div>
              <div className="corner-readout right-3 bottom-3 text-right">SS304 · 11×11</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════ SPEC SHEET — us vs grille ═════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <div className="num-tag mb-6">§ 02 · Spec sheet · A vs B</div>
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
            {specRows.map((r) => (
              <div key={r.metric} className="grid grid-cols-3 border-b border-white/10 last:border-b-0">
                <div className="p-5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/55">{r.metric}</div>
                <div className="p-5 font-serif text-base md:text-lg text-white tracking-tight">{r.us}</div>
                <div className="p-5 font-mono text-[11px] text-white/40 uppercase tracking-[0.10em]">{r.them}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════ GALLERY ═════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <div className="num-tag mb-6">§ 03 · Field deployments</div>
            <h2 className="display-xl">
              Installed in <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>real</span>
              <br />Singapore homes.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImgs.map((g) => (
              <div key={g.code} className="relative aspect-square overflow-hidden border border-white/10">
                <img src={g.src} alt={g.alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 frame-grid opacity-15" />
                <div className="absolute left-2 bottom-2 num-tag text-[10px]">{g.code}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════ CONFIGURATOR ═════════════ */}
      <section id="configure" className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto border border-white/15 p-7 md:p-10 bg-white/[0.02]">
            <div className="num-tag mb-6">§ 04 · Direct line to engineering</div>
            <h2 className="display-xl mb-4" style={{ fontSize: "clamp(2rem, 1.5vw + 1.5rem, 3.5rem)" }}>
              Send your details.
              <br />
              <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>Quote in the hour.</span>
            </h2>
            <p className="text-white/65 leading-relaxed mb-8">
              We'll WhatsApp you a price range within the hour — no spam, no
              calls you didn't ask for.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lp-name" className="num-tag mb-1.5 block">Name</label>
                  <input
                    id="lp-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Jason Tan"
                    className="input-field !rounded-none"
                  />
                </div>
                <div>
                  <label htmlFor="lp-phone" className="num-tag mb-1.5 block">WhatsApp number</label>
                  <input
                    id="lp-phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="9123 4567"
                    className="input-field !rounded-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lp-property" className="num-tag mb-1.5 block">Property type</label>
                <select
                  id="lp-property"
                  name="propertyType"
                  value={form.propertyType}
                  onChange={handleChange}
                  className="input-field !rounded-none"
                >
                  <option value="HDB">HDB</option>
                  <option value="Condo">Condo / Apartment</option>
                  <option value="Landed">Landed</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-square w-full text-sm py-4"
              >
                {submitting ? "Opening WhatsApp…" : "Transmit → WhatsApp"}
              </button>

              <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/40 text-center">
                Redirects to WhatsApp · details pre-filled
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ═════════════ REVIEWS ═════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <div className="num-tag mb-6">§ 05 · Field reviews · verified</div>
            <h2 className="display-xl">
              4.8 ★ across
              <br />
              <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>fifty-nine</span> homes.
            </h2>
          </div>
          <FieldReviews />
        </div>
      </section>

      {/* ═════════════ FAQ ═════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="num-tag mb-6">§ 06 · Frequently asked</div>
          <h2 className="display-xl mb-12">
            Honest answers
            <br />
            <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>before</span> you ask.
          </h2>
          <div className="border-t border-white/10">
            {faqs.map((faq, idx) => {
              const open = openFaq === idx;
              return (
                <div key={faq.q} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : idx)}
                    className="w-full grid grid-cols-[36px_1fr_auto] gap-4 items-baseline px-1 py-5 text-left hover:bg-white/[0.02] transition"
                    aria-expanded={open}
                  >
                    <span className="num-tag">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-lg md:text-xl text-white tracking-tight leading-snug">{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-white/50 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <div className="pl-[52px] pr-4 pb-5 text-white/65 leading-relaxed">{faq.a}</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12">
            <button
              type="button"
              onClick={() => handleWhatsAppClick("Hi! I have a question about your security insect screens.")}
              className="btn-square-outline"
            >
              Direct to engineering →
            </button>
          </div>
        </div>
      </section>

      {/* ═════════════ ORDER BLOCK ═════════════ */}
      <section className="relative cv-auto py-28 md:py-40 border-t border-white/5 overflow-hidden">
        <img
          src={install2}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* Carousel Slide-7 CTA pattern. */}
        <div className="photo-overlay-cta" />
        <div className="absolute inset-0 frame-grid opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="num-tag mb-8 flex items-center">
              <span className="live-dot" />
              T-MINUS · 14 DAYS · BOOK SURVEY
            </div>
            <h2 className="display-xxl mb-10">
              See it in your
              <br />
              <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>own home</span> first.
            </h2>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              Free on-site survey. Fixed quote on the spot. Install in two to
              three weeks across Singapore.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  handleWhatsAppClick("Hi! I'm ready to book a free on-site measurement.")
                }
                className="btn-square"
              >
                Book Site Survey →
              </button>
              <a href="#configure" className="btn-square-outline">
                Send specs first ↓
              </a>
            </div>
          </div>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default SecurityScreenLandingPage;
