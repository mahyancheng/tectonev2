import React, { useState } from "react";
import { Head } from "vite-react-ssg";
import {
  Shield,
  Eye,
  Wind,
  Wrench,
  CheckCircle2,
  Star,
  ChevronDown,
} from "lucide-react";
import LandingPageLayout, {
  handleWhatsAppClick,
} from "@/components/LandingPageLayout";
import GoogleReviewsWidget from "@/components/GoogleReviewsWidget";
import { trackEvent } from "@/lib/metaPixel";
import { useToast } from "@/hooks/use-toast";

// Real Tectone installation photos from the existing site library.
import lpHero from "@/images/HomePage.webp"; // mosquito-on-mesh, Singapore landed-house view
import lpProductDetail from "@/images/productPicture.webp"; // showroom shot + mesh detail callout
import lpExterior from "@/images/DSC09182.jpg"; // exterior of home with mesh + tropical plants
import lpInteriorView from "@/images/DSC09293.jpg"; // Singapore living room window with greenery
import lpHDBView from "@/images/Tectone SG 001-09338.png"; // HDB rooftop view through screen
import install1 from "@/images/install1.webp";
import install2 from "@/images/install2.webp";
import install3 from "@/images/install3.webp";
import install4 from "@/images/install4.webp";

const features = [
  {
    icon: <Shield size={20} />,
    title: "Security-Grade Mesh",
    desc: (
      <>
        Stainless-steel mesh resists tampering, cuts, and impact —{" "}
        <strong>exceeds international safety standards</strong>.
      </>
    ),
  },
  {
    icon: <Eye size={20} />,
    title: "Near-Invisible View",
    desc: (
      <>
        Fine, dark mesh lets you keep your view of the city, garden, or skyline —{" "}
        <strong>no clunky grilles</strong>.
      </>
    ),
  },
  {
    icon: <Wind size={20} />,
    title: "Real Airflow",
    desc: (
      <>
        Open your sliding doors fully and let breeze in.{" "}
        <strong>No more mosquitoes, lizards, or rats</strong>.
      </>
    ),
  },
  {
    icon: <Wrench size={20} />,
    title: "Custom-Fit & Installed",
    desc: (
      <>
        We measure on-site, manufacture to size, and{" "}
        <strong>install in hours</strong> — minimal disruption.
      </>
    ),
  },
];

const trustStrip = [
  { num: "10+", label: "Years in Singapore" },
  { num: "5,000+", label: "Homes secured" },
  { num: "5-Year", label: "Warranty" },
  { num: "★ 4.9", label: "Google reviews" },
];

const faqs = [
  {
    q: "How much does a security insect screen cost in Singapore?",
    a: "Pricing depends on the door / window size and frame configuration. Most HDB and condo sliding doors are in the SGD 800–1,500 range per panel; landed-home installations vary more. WhatsApp us your dimensions or a photo for a same-day quote.",
  },
  {
    q: "How long does installation take?",
    a: "From confirmed order to installation is typically 2–3 weeks. The on-site install itself takes 2–4 hours per door for a clean, dust-controlled job.",
  },
  {
    q: "Will the mesh block my view or airflow?",
    a: "No. We use fine stainless-steel mesh in a dark powder-coat — it visually recedes when you look outwards, especially in daylight. Airflow is essentially unaffected.",
  },
  {
    q: "Is it really strong enough to stop break-ins?",
    a: "Yes — that's the point. The mesh is woven from security-grade stainless steel, mounted in a 6063-T6 aluminium frame, and locked with a multi-point latch. It's certified to international knife-shear and impact standards.",
  },
  {
    q: "Do you serve HDB / Condo / Landed?",
    a: "All three. We've installed in HDB BTOs in Tengah, condos along the East Coast, and landed homes in Bukit Timah. WhatsApp us your address and we'll confirm coverage instantly.",
  },
];

const gallery = [
  { src: lpExterior, alt: "Exterior view of a Singapore home with Tectone security screens" },
  { src: lpHDBView, alt: "Tectone security screen with HDB skyline view" },
  { src: install1, alt: "Tectone window installation in a Singapore home" },
  { src: install2, alt: "Tectone security screen installation" },
  { src: install3, alt: "Tectone insect screen installation" },
  { src: install4, alt: "Tectone insect screen installation" },
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
      description: "Send the message to get your quote within the hour.",
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
        <meta
          property="og:description"
          content="Security-grade stainless-steel mesh. Custom-fitted for HDB, condo and landed homes."
        />
        <meta property="og:image" content="https://tectonesteel.com/og-image.webp" />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href="https://tectonesteel.com/lp/security-screen" />
      </Head>

      {/* ════════════ HERO ════════════ */}
      <section className="relative bg-black text-white overflow-hidden">
        <img
          src={lpHero}
          alt="Modern Singapore living room with security insect screen door"
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-35"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        <div className="absolute inset-0 z-0 mesh-bg opacity-30" />

        <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">Meta Ads · Security Insect Screen</p>
            <h1 className="font-serif text-4xl md:text-6xl font-medium leading-[1.05] tracking-tight mb-6">
              Open your windows.
              <br />
              Zero mosquitoes.
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed">
              Singapore's premium stainless-steel security insect screens.
              Keep mosquitoes, lizards and intruders out — without losing your
              view, breeze, or natural light.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-9 max-w-md text-sm">
              {[
                "Security-grade mesh",
                "Near-invisible from inside",
                "Fits HDB / Condo / Landed",
                "5-year warranty",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-white/75">
                  <CheckCircle2 className="h-4 w-4 text-white/60 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  handleWhatsAppClick(
                    "Hi! I saw your ad and want a free quote for security insect screens."
                  )
                }
                className="btn-primary"
              >
                Get My Free Quote
              </button>
              <a href="#quick-quote" className="btn-outline">
                See How It Works
              </a>
            </div>
            <p className="text-xs text-white/50 mt-5">
              Chat with us on WhatsApp · Reply within the hour · No obligation
            </p>
          </div>
        </div>
      </section>

      {/* ════════════ TRUST STRIP ════════════ */}
      <section className="bg-black border-y border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {trustStrip.map((t) => (
              <div key={t.label}>
                <div className="font-serif text-3xl md:text-4xl font-medium text-white">
                  {t.num}
                </div>
                <div className="text-xs md:text-sm text-white/55 mt-1.5 tracking-wide">
                  {t.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ PROBLEM / PROMISE ════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="section-title mb-8">
                Tired of choosing between fresh air and mosquito bites?
              </h2>
              <p className="text-white/65 text-lg leading-relaxed mb-7">
                Singapore's heat means you want the windows open. The mosquitoes
                and dengue risk mean you keep them shut. Tectone security insect
                screens solve both — and add real break-in protection that
                ordinary mesh can't match.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Sleep with the doors open — no zappers, no sprays",
                  "Pets stay in, lizards and pests stay out",
                  "Same view, same airflow, real security",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-white/60 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleWhatsAppClick("Hi! I have a question about security insect screens.")}
                className="btn-primary"
              >
                Get My Free Quote
              </button>
              <p className="text-xs text-muted-foreground mt-2">
                Opens WhatsApp · Reply within the hour
              </p>
            </div>

            <div className="relative">
              <img
                src={lpInteriorView}
                alt="Tectone security screen letting in light and air"
                className="rounded-lg shadow-xl w-full object-cover aspect-[4/5]"
                loading="lazy"
              />
              <div className="absolute -bottom-5 -left-5 bg-black/90 backdrop-blur-xl border border-white/15 rounded-xl p-4 max-w-[64%] hidden sm:block">
                <div className="flex items-center gap-1 mb-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-white text-white" />
                  ))}
                </div>
                <p className="text-sm text-white/85 italic">
                  "Finally we can leave the sliding door open. Worth every dollar."
                </p>
                <p className="text-xs text-white/45 mt-1">
                  — Mei Lin, Punggol HDB
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FEATURES ════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-14">
            <p className="eyebrow mb-4">Why Tectone</p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Why Singapore homes choose Tectone
            </h2>
            <p className="text-white/65 text-lg leading-relaxed">
              Premium materials, precise fitting, and the only mesh on the
              market that does both pest control and real break-in security.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {features.map((f, index) => (
              <div
                key={f.title}
                className="bg-background p-6 md:p-8 hover:bg-white/[0.03] transition-colors animate-on-scroll"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="feature-icon mb-5">{f.icon}</div>
                <h3 className="text-base md:text-lg font-medium tracking-tight mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <button
              type="button"
              onClick={() =>
                handleWhatsAppClick(
                  "Hi! I'd like a price estimate. My door dimensions are: "
                )
              }
              className="btn-primary"
            >
              Get My Free Quote
            </button>
            <p className="text-xs text-white/45 mt-3">
              Reply within the hour on WhatsApp
            </p>
          </div>
        </div>
      </section>

      {/* ════════════ AESTHETIC / DESIGN ════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="order-2 md:order-1">
              <img
                src={lpProductDetail}
                alt="Tectone screen with mesh detail — slim aluminium frame, near-invisible mesh"
                className="rounded-xl w-full object-cover border border-white/10"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="section-title mb-8">
                Beautiful enough that you'll forget it's there.
              </h2>
              <p className="text-white/65 text-lg leading-relaxed mb-7">
                Most insect screens look like an afterthought — clunky grilles,
                chunky frames, a downgrade to your view. Tectone is designed the
                other way round. Slim aluminium frame, fine dark mesh,
                no visible hardware. From inside, it disappears.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  <><strong className="text-white">Slim 6063-T6 aluminium frame</strong> — matches modern Singapore architecture, BTO to landed.</>,
                  <><strong className="text-white">Fine dark mesh</strong> — recedes visually in daylight, keeps every bit of your view.</>,
                  <><strong className="text-white">Hidden hardware</strong> — flush handles, concealed locks, no clutter on the frame.</>,
                  <><strong className="text-white">Powder-coat finishes</strong> — matte black or custom colour to match your window frames.</>,
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-white/60 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() =>
                  handleWhatsAppClick("Hi! Can you show me the available frame finishes?")
                }
                className="btn-primary"
              >
                See Available Finishes
              </button>
              <p className="text-xs text-white/45 mt-3">
                Opens WhatsApp · We'll send photos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ GALLERY ════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-14">
            <p className="eyebrow mb-4">Gallery</p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-6">
              See it in real Singapore homes
            </h2>
            <p className="text-white/65 text-lg leading-relaxed">
              From HDB sliding doors to landed-home balconies — same premium
              finish, fitted exactly to your space.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {gallery.map((g, idx) => (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-lg ${
                  idx === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                }`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() =>
                handleWhatsAppClick("Hi! Can you share more photos of past installations near my area?")
              }
              className="btn-primary"
            >
              See More Installations
            </button>
            <p className="text-xs text-white/60 mt-2">
              Opens WhatsApp · Reply within the hour
            </p>
          </div>
        </div>
      </section>

      {/* ════════════ GOOGLE REVIEWS — same widget as HomePage ════════════ */}
      <section className="cv-auto-1200 py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-14">
            <p className="eyebrow mb-4">Testimonials</p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-6">
              What our customers say
            </h2>
            <p className="text-white/65 text-lg leading-relaxed">
              5,000+ Singapore homeowners protected. Read what they say on Google.
            </p>
          </div>

          <GoogleReviewsWidget
            appId="8cd1d32f-8560-4f1b-83e3-1f967e45204a"
            className="surface-card p-6 md:p-8 animate-on-scroll min-h-[400px]"
          />

          <div className="mt-14">
            <button
              type="button"
              onClick={() =>
                handleWhatsAppClick("Hi! I'd like a free quote — same as your other customers.")
              }
              className="btn-primary"
            >
              Get My Free Quote
            </button>
            <p className="text-xs text-white/45 mt-3">
              Opens WhatsApp · Reply within the hour
            </p>
          </div>
        </div>
      </section>

      {/* ════════════ QUICK-QUOTE FORM ════════════ */}
      <section id="quick-quote" className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto surface-card p-8 md:p-12">
            <div className="mb-8">
              <p className="eyebrow mb-4">Quick Quote</p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-3">
                Get your quote in under 60 seconds
              </h2>
              <p className="text-white/65">
                Drop your details. We'll WhatsApp you a price range within the hour —
                no spam, no calls you didn't ask for.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lp-name" className="block text-xs font-medium text-white/70 mb-1.5 uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    id="lp-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Jason Tan"
                    className="input-field"
                  />
                </div>
                <div>
                  <label htmlFor="lp-phone" className="block text-xs font-medium text-white/70 mb-1.5 uppercase tracking-wider">
                    WhatsApp Number
                  </label>
                  <input
                    id="lp-phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="9123 4567"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lp-property" className="block text-xs font-medium text-white/70 mb-1.5 uppercase tracking-wider">
                  Property Type
                </label>
                <select
                  id="lp-property"
                  name="propertyType"
                  value={form.propertyType}
                  onChange={handleChange}
                  className="input-field"
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
                className="btn-primary w-full text-base py-3.5 mt-2"
              >
                {submitting ? "Opening WhatsApp…" : "Send Me My Free Quote"}
              </button>

              <p className="text-xs text-center text-white/45">
                You'll be redirected to WhatsApp with your details pre-filled.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ════════════ FAQ ════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-12">
            <p className="eyebrow mb-4">FAQ</p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const open = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="surface-card overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : idx)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left text-base font-medium text-white hover:bg-white/[0.02] transition"
                    aria-expanded={open}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-white/50 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {open && (
                    <div className="px-6 pb-6 text-white/65 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12">
            <p className="text-white/65 mb-4">Still have questions?</p>
            <button
              type="button"
              onClick={() => handleWhatsAppClick("Hi! I have a question about your security insect screens.")}
              className="btn-primary"
            >
              Ask Us on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* ════════════ FINAL CTA ════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-40 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-3xl text-center relative">
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-5">
            Ready to mosquito-proof your home?
          </h2>
          <p className="text-white/70 text-lg mb-10">
            Free on-site measurement. Same-day quote. 5-year warranty on every
            installation across Singapore.
          </p>
          <button
            type="button"
            onClick={() =>
              handleWhatsAppClick("Hi! I'm ready to book a free on-site measurement.")
            }
            className="btn-primary text-base px-8 py-3.5"
          >
            Book Free Measurement
          </button>
          <p className="text-xs text-white/60 mt-3">
            Chat with us on WhatsApp · Average reply 8 min · No obligation
          </p>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default SecurityScreenLandingPage;
