import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CatalogAccordion from "@/components/CatalogAccordion";
import BuyingProcessRoadmap from "../components/BuyingProcessRoadmap";
import { Shield, Check, Wrench, AlertTriangle, Sun, Eye } from "lucide-react";
import ContactSection from "@/components/ContactSection";
import productPicture from "../images/productPicture.webp";
import { Head } from "vite-react-ssg";
import Reveal from "@/components/Reveal";


const features = [
  {
    title: 'Fine Stainless-Steel Mesh',
    desc: "Ultra-tight weave blocks mosquitoes and tiny insects while allowing natural light and breeze to pass through effortlessly.",
    icon: Shield,
  },
  {
    title: 'Corrosion & Weather Resistant',
    desc: "Built for Singapore’s humid climate with rust-resistant coatings and durable aluminium frames for year-round performance.",
    icon: Check,
  },
  {
    title: 'Custom Fit & Easy Operation',
    desc: "Each screen is precisely measured for your doors and windows, with smooth sliding or hinged options for convenient daily use.",
    icon: Wrench,
  },
  {
    title: 'Low-Maintenance Durability',
    desc: "High-quality materials resist wear and tear, requiring only a simple wipe-down to stay clean and clear.",
    icon: AlertTriangle,
  },
  {
    title: 'UV & Glare Protection',
    desc: "Filters harsh sunlight to reduce heat and protect furnishings, all while maintaining clear outdoor views.",
    icon: Sun,
  },
  {
    title: 'Sleek, Grille-Free Aesthetics',
    desc: "Minimalist frames remain virtually invisible from a distance, complementing contemporary interiors without bulky bars or grilles.",
    icon: Eye,
  },
];

const applications = [
  { title: 'Entry Doors' },
  { title: 'Sliding Doors' },
  { title: 'Windows' },
  { title: 'Balconies' },
];

const faqs = [
  {
    question: 'How strong are your insect screens?',
    answer:
      'Our insect screens exceed industry standards for impact resistance, knife shear tests, and pull tests. They’re designed to withstand significant force while maintaining their structural integrity.',
  },
  {
    question: 'Do insect screens block the view?',
    answer:
      'No, our insect screens use a special mesh design that allows clear visibility from inside while making it difficult to see in from outside during daylight hours.',
  },
  {
    question: 'How long do insect screens last?',
    answer:
      'With proper maintenance, our insect screens can last 15–20 years or more, making them a worthwhile investment for your home’s security and comfort.',
  },
  {
    question: 'Are your insect screens fire-resistant?',
    answer:
      'Yes, our insect screens have been tested for fire resistance and include emergency release mechanisms for quick evacuation if needed.',
  },
  {
    question: 'Do you offer warranties?',
    answer:
      'Yes, all our insect screens come with a 10-year warranty covering manufacturing defects and structural integrity under normal use conditions.',
  },
];

const SecurityScreenPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <Head>
        <title>
          Insect Screen &amp; Mosquito Net Singapore · 7 Window Mesh Systems | Tectone Renex Steel
        </title>
        <meta
          name="description"
          content="Singapore's full catalog of stainless-steel insect screens, mosquito nets and window mesh — swing, folding, sliding doors plus casement, sliding, fixed and top-hung window systems. SS304 weave, 10-year warranty."
        />
        <meta
          name="keywords"
          content="insect screen Singapore, mosquito net Singapore, window mesh Singapore, sliding mosquito net, casement window mesh, insect mesh, HDB mosquito screen, BTO insect screen, magnetic insect screen alternative"
        />
        <meta property="og:title" content="Insect Screen & Mosquito Net Singapore · 7 Systems | Tectone Renex Steel" />
        <meta property="og:description" content="Seven SS304 insect screen + mosquito net systems for Singapore homes — sized to your opening, installed in 14 days, 10-year warranty." />
        <meta property="og:image" content="https://tectonesteel.com/og-image.webp" />
        <meta property="og:locale" content="en_SG" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://tectonesteel.com/our-product" />
        <link rel="alternate" hrefLang="en-SG" href="https://tectonesteel.com/our-product" />
        <link
          rel="preload"
          as="image"
          href={productPicture}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Head>
      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Premium Insect Screen Solutions
              </h1>
              <p className="text-white/55 mb-6">
                Our comprehensive range of <b>aluminium insect screens</b> offers elegant, grille-free protection from mosquitoes
                and pests while enhancing the look of modern homes and businesses in Singapore.
              </p>
              <p className="text-white/55 mb-6">
                Each screen is <b>custom-manufactured to your exact door and window dimensions</b>, ensuring a seamless fit and lasting durability.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/quote" className="btn-primary">
                  Request a Quote
                </Link>
                <Link to="/contact-us" className="btn-outline">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="aspect-[4/3] bg-white/[0.06] rounded-lg overflow-hidden">
                <img
                  src={productPicture}
                  alt="Insect screen installation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CATALOG — seven systems · accordion configurator
          Same UX as HomePage § 02: tap a row to expand the
          inline calculator pre-loaded for that product, ↗
          opens the full detail page.
          ════════════════════════════════════════════════════ */}
      <section className="cv-auto py-20 md:py-28 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div className="max-w-2xl">
              <Reveal>
                <div className="num-tag mb-6">§ Products · 07 systems</div>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="display-xl mb-6">
                  Seven openings,
                  <br />
                  <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>one workshop.</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-white/65 leading-relaxed">
                  Tap a row to configure. Drop your dimensions, leave a number — a real PDF
                  lands in your inbox. The <span className="font-mono text-white/85 text-sm">↗</span> opens the
                  full spec sheet for that system.
                </p>
              </Reveal>
            </div>
            <Reveal delay={260}>
              <Link to="/quote" className="btn-square-outline self-start md:self-end">
                Open Configurator ↗
              </Link>
            </Reveal>
          </div>

          <CatalogAccordion />
        </div>
      </section>

      {/* Features */}
      <section className="cv-auto py-16 bg-white/[0.03]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Key Features
            </h2>
            <p className="text-white/55 max-w-3xl mx-auto">
              Our aluminium insect screens blend elegant design with advanced engineering to keep pests out and fresh air
              flowing—perfect for Singapore’s modern homes and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="border border-border rounded-lg p-6 transition-all hover:border-white/40 hover:shadow-md bg-card animate-on-scroll"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="h-14 w-14 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/55">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Buying Process Roadmap */}
      <section className="cv-auto">
        <BuyingProcessRoadmap />
      </section>
      {/* FAQ */}
      <section className="cv-auto py-16 bg-white/[0.03]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-white/55 max-w-3xl mx-auto">
              Find answers to common questions about our insect screen solutions.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-white/[0.03] rounded-lg shadow-sm overflow-hidden animate-on-scroll group"
                open={activeIndex === index}
                onClick={(e) => {
                  e.preventDefault();
                  toggleFAQ(index);
                }}
              >
                <summary
                  className="w-full text-left p-6 cursor-pointer flex justify-between items-center list-none [&::-webkit-details-marker]:hidden"
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <span className="ml-2 text-white text-xl">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </summary>
                <div className="px-6 pb-6 text-white/55">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cv-auto py-16 bg-tectone-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <b>Ready to Protect Your Home from Pests?</b>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Contact our team today for a free consultation and custom quote on <b>premium aluminium
              insect screens</b> designed for Singapore’s climate and style.

          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/quote" className="btn-primary bg-white/[0.03] hover:bg-white/10/90">
              Request a Quote
            </Link>
            <Link to="/contact-us" className="btn-outline border-white text-white hover:bg-white/[0.03] hover:text-tectone-black">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      <section className="cv-auto">
        <ContactSection />
      </section>
    </>
  );
};

export default SecurityScreenPage;
