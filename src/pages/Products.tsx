import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EnhancedQuoteCalculator from "../components/EnhancedQuoteCalculator";
import BuyingProcessRoadmap from "../components/BuyingProcessRoadmap";
import { Shield, Check, Wrench, AlertTriangle, Sun, Eye, ArrowRight } from "lucide-react";
import ContactSection from "@/components/ContactSection";
import productPicture from "../images/productPicture.webp"
import SlidingDoor from "../images/SldingDoor.webp";
import CasementWindow from "../images/CasementWindow.webp";
import SlidingWindow from "../images/SlidingWindow.webp";
import FixedScene from "../images/FixedScreen.webp"
import TongHung from "../images/TopHung.webp"
import SwingDoor from "../images/SwingDoor.webp"
import FoldingDoor from "../images/FoldingDoor.webp"
import { Head } from "vite-react-ssg";


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

const securityProducts = [
  {
    id: "107-security-swing-door",
    title: "Insect Screen Swing Door",
    image: SwingDoor,
    description: "The Tectone Insect Screen Swing Door is designed to provide premium security without compromising on airflow, natural light, or modern design",
    features: [
      "Smooth track system",
      "Multi-point locking",
      "Space-saving design",
      "Easy operation"]
  },
  {
    id: "104-security-folding-door",
    title: "Insect Screen Folding Door",
    image: FoldingDoor,
    description: "The Tectone Insect Screen Folding Door is the ideal choice for wider openings that require both maximum access and strong security",
    features: [
      "High-Tensile Stainless Steel Mesh (SS304)",
      "Powder-Coated Aluminium Frame",
      "Folding Panel Mechanism",
      "Multi-Point Locking System",
      "Custom Configuration",
      "Pet and Child Friendly",
    ]
  },
  {
    id: "105-security-sliding-door",
    title: "Insect Screen Sliding Door",
    image: SlidingDoor,
    description: "The Tectone Insect Screen Sliding Door is built for homeowners who value both security and seamless design",
    features: [
      "Stainless Steel Mesh (SS304)",
      "Heavy-Duty Aluminium Frame",
      "Smooth Sliding System",
      "Multi-Point Locking",
      "Clean and Modern Aesthetic",
      "Custom-Built for Precision Fit",

    ]
  },
  {
    id: "103-security-casement-window",
    title: "Casement Window",
    image: CasementWindow,
    description: "The Tectone Insect Screen Casement Window offers the perfect combination of natural ventilation, clear visibility, and robust protection.",
    features: [
      "Stainless Steel Mesh (SS304)",
      "Heavy-Duty Aluminium Frame",
      "Outward Opening Compatibility",
      "Secure Locking System",
      "Slim, Modern Profile",
      "Child and Pet Safe"
    ],
  },
  {
    id: "106-security-sliding-window",
    title: "Insect Screen Sliding Window",
    image: SlidingWindow,
    description: "The Tectone Insect Screen Sliding Window is designed for modern homes that require strong protection without sacrificing airflow or visibility",
    features: [
      "SS304 Stainless Steel Mesh",
      "Smooth Sliding Track System",
      "Durable Aluminium Frame",
      "Discreet, Minimalist Design",
      "Multi-Point Locking Option",
      "Child and Pet Friendly",
    ],
  },
  {
    id: "102-fixed-screen",
    title: "Fixed Insect Screen",
    image: FixedScene,
    description: "The Tectone Fixed Mosquito Screen offers a simple, durable, and cost-effective solution for areas that require continuous insect protection",
    features: [
      "Stainless Steel Mesh (SS304)",
      "Durable Aluminium Frame",
      "Clean, Minimalist Appearance",
      "Excellent Ventilation",
      "Cost-Effective Design",
      "Custom-Made to Fit",
    ],
  },
  {
    id: "108-security-top-hung",
    title: "Top Hung Window",
    description: "The Tectone Insect Screen Top Hung Window is specially designed for ventilation with added security",
    image: TongHung,
    features: [
      "SS304 Stainless Steel Mesh",
      "Durable Aluminium Frame",
      "Compatible with Top-Hung Window Designs",
      "Water-Tolerant Ventilation",
      "Low Maintenance",
      "Safe for Homes with Children or Elderly",
    ],
  }
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
          Mosquito Netting | Insect Screen Products | Get a Quote Now | Tectone Renex Steel
        </title>
        <meta
          name="description"
          content="High-quality insect screens and mosquito netting solutions in Singapore. Get an instant quote today!"
        />
        <meta property="og:title" content="Mosquito Netting & Insect Screen Products | Get a Quote Now | Tectone Renex Steel" />
        <meta property="og:description" content="Browse our high-quality insect screen and mosquito net products designed for Singapore homes." />
        <meta property="og:image" content="https://tectonesteel.com/og-image.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://tectonesteel.com/our-product" />
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

      {/* Product Quote Calculator */}
      <section className="py-16 bg-white/[0.03]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Get a Quick Quote</h2>
            <EnhancedQuoteCalculator />
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="cv-auto py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Insect Screen Product Range
            </h2>
            <p className="text-white/55 max-w-3xl mx-auto">
              Discover our comprehensive collection of <b>premium aluminium insect screens</b>, crafted for modern Singapore homes and businesses.
              Each design keeps mosquitoes and pests out while maintaining sleek, grille-free aesthetics and lasting durability.

            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityProducts.map((product) => (
              <Link
                to={`/our-product/product/${product.id}`}
                key={product.id}
                className="group block bg-white/[0.03] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="p-6 flex flex-col justify-between min-h-[360px]">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                    <p className="text-white/55 mb-4">{product.description}</p>
                    <ul className="text-sm text-white/45">
                      {product.features.map((f, i) => (
                        <li key={i} className="flex items-center mb-1">
                          <Check className="h-4 w-4 text-white mr-2" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Read More section */}
                  <div className="pt-4">
                    <p className="text-sm font-semibold text-white hover:text-white/40 transition-colors duration-200">
                      Read More &gt;
                    </p>

                  </div>
                </div>
              </Link>
            ))}
          </div>
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
