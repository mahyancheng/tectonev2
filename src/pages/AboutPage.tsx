import React from "react";
import ContactSection from "@/components/ContactSection";
import ScreneSolution from "../images/ScreneSolution.webp";
import { Head } from "vite-react-ssg";

/* Stat strip — three numbers that tell the company story */
const stats = [
  { num: "10+", label: "Years in Singapore" },
  { num: "5,000+", label: "Homes secured" },
  { num: "4.8", label: "Google rating" },
];

/* Core principles — short, declarative */
const principles = [
  {
    title: "Quality, not compromise",
    desc: "Marine-grade alloys and certified mesh on every job. We don't ship a screen that wouldn't survive a Singapore monsoon.",
  },
  {
    title: "Designed to disappear",
    desc: "A screen should protect what's already beautiful — not announce itself. Slim frames, fine mesh, hidden hardware.",
  },
  {
    title: "Plain dealing",
    desc: "Honest measurements, honest pricing, honest timelines. If something's wrong, we come back and fix it.",
  },
  {
    title: "Singapore-first",
    desc: "Specced for the climate. Cut for HDB, condo, and landed dimensions. Installed by people who live here.",
  },
];

/* How it actually works — four steps, no fluff */
const process = [
  {
    number: "01",
    title: "Consultation",
    desc: "We talk through your space, security needs, and the look you're after. By phone, WhatsApp, or in person.",
  },
  {
    number: "02",
    title: "On-site measurement",
    desc: "A precise site survey of every opening. Free, no obligation.",
  },
  {
    number: "03",
    title: "Custom fabrication",
    desc: "Your screens are built to your dimensions in our Woodlands workshop — typically two to three weeks.",
  },
  {
    number: "04",
    title: "Installation",
    desc: "A clean install in a few hours, dust-controlled, with a five-year warranty walked through on the day.",
  },
];

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>
          About · Singapore's Insect Screen, Mosquito Net &amp; Window Mesh Specialist | Tectone Renex Steel
        </title>
        <meta
          name="description"
          content="Singapore-based specialist in stainless-steel insect screens, mosquito nets and window mesh. Ten years on the ground, 5,000+ HDB / condo / landed installs, SS304 weave, written 10-year warranty."
        />
        <meta
          name="keywords"
          content="insect screen Singapore, mosquito net Singapore, window mesh Singapore, Tectone Renex Steel, SS304 insect screen, Singapore insect screen specialist, mosquito mesh"
        />
        <meta property="og:title" content="About · Tectone Renex Steel — Singapore Insect Screen Specialist" />
        <meta
          property="og:description"
          content="Ten years engineering insect screens, mosquito nets and security mesh for Singapore HDB, condo and landed homes."
        />
        <meta property="og:image" content="https://tectonesteel.com/og-image.webp" />
        <meta property="og:locale" content="en_SG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content="Tectone Renex Steel Pte Ltd" />
        <link rel="canonical" href="https://tectonesteel.com/about-insect-screen-supplier" />
        <link rel="alternate" hrefLang="en-SG" href="https://tectonesteel.com/about-insect-screen-supplier" />
        <link rel="preload" as="image" href={ScreneSolution} />
      </Head>

      {/* ════════════ HERO ════════════ */}
      <section className="cv-auto py-24 md:py-32 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <span className="eyebrow-rule mb-6 block">About Tectone</span>
              <h1 className="font-serif text-4xl md:text-6xl font-medium leading-[1.0] tracking-tight mb-8">
                Singapore's <span className="em-italic">Premium</span> Screen Solutions
              </h1>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-5">
                Tectone Renex Steel makes the insect and security screens that
                Singapore homes were missing — grille-free, precisely fitted,
                quietly engineered.
              </p>
              <p className="text-base md:text-lg text-white/60 leading-relaxed">
                Our team has spent over a decade refining one thing: a screen
                that protects your home without changing how it looks. Designed
                here, fabricated in our Woodlands workshop, installed in homes
                from Bukit Timah to Punggol.
              </p>
            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="surface-card overflow-hidden">
                <div className="aspect-[4/3] bg-black">
                  <img
                    src={ScreneSolution}
                    alt="Tectone Renex Steel Pte Ltd"
                    className="w-full h-full object-cover opacity-90"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ STAT STRIP ════════════ */}
      <section className="border-b border-white/5">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-3 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ PRINCIPLES ════════════ */}
      <section className="cv-auto py-24 md:py-32 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-14">
            <span className="eyebrow-rule mb-5 block">Principles</span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-[1.05]">
              What we <span className="em-italic">believe</span>
            </h2>
            <p className="text-white/65 text-lg leading-relaxed">
              Four ideas that decide every product, every site visit, every
              warranty call.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className="bg-background p-8 md:p-10 animate-on-scroll"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <p className="eyebrow mb-3">0{i + 1}</p>
                <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-3">
                  {p.title}
                </h3>
                <p className="text-white/60 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ PROCESS ════════════ */}
      <section className="cv-auto py-24 md:py-32 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-14">
            <span className="eyebrow-rule mb-5 block">How it works</span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-[1.05]">
              From first call to <span className="em-italic">final install</span>
            </h2>
            <p className="text-white/65 text-lg leading-relaxed">
              Roughly three weeks, end to end. No surprises, no chasing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {process.map((p, i) => (
              <div
                key={p.number}
                className="bg-background p-8 md:p-10 animate-on-scroll"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <p className="font-serif text-3xl text-white/30 tracking-tight mb-4">
                  {p.number}
                </p>
                <h3 className="text-base md:text-lg font-medium tracking-tight mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CONTACT ════════════ */}
      <section className="cv-auto">
        <ContactSection />
      </section>
    </>
  );
};

export default AboutPage;
