import React from "react";
import { Link } from "react-router-dom";
import EnhancedQuoteCalculator from "../components/EnhancedQuoteCalculator";
import ContactForm from "../components/ContactForm";
import { Shield, Zap, Wind, Layers, Settings, MapPin } from "lucide-react";
import ContactSection from "@/components/ContactSection";
import homepage from '../images/HomePage.webp'; // adjust the path if needed
import productPicture from "../images/productPicture.webp"
import GoogleReviewsWidget from "@/components/GoogleReviewsWidget";
import { Head } from "vite-react-ssg";

const features = [
  {
    icon: <Shield size={20} />,
    title: "Elegant Design",
    desc:
      <>
        Grille-free, <strong>sleek aluminum frames</strong> blend seamlessly with contemporary architecture, creating a premium look that elevates any Singapore home or business.
      </>
  },
  {
    icon: <Zap size={20} />,
    title: "Superior Protection",
    desc:
      <>
        Engineered with <strong>security-grade stainless-steel mesh</strong>, our insect screens exceed international safety standards—blocking mosquitoes, flies, and even rodents without compromising style.
      </>
  },
  {
    icon: <Wind size={20} />,
    title: "Optimal Ventilation",
    desc:
      <>
        Let fresh air and natural light flow freely while keeping pests out. The fine <strong>security mesh</strong> ensures comfort and unobstructed views.
      </>
  },
  {
    icon: <Layers size={20} />,
    title: "Built for Singapore’s Climate",
    desc:
      <>
        Crafted from <strong>durable, corrosion-resistant materials</strong>, these screens withstand humidity, heat, and heavy rain for long-lasting performance.
      </>
  },
  {
    icon: <Settings size={20} />,
    title: "Custom-Fit Solutions",
    desc:
      "Every door and window is precisely measured for a perfect fit. Our expert installation team delivers a smooth finish and provides ongoing support.",
  },
  {
    icon: <MapPin size={20} />,
    title: "Local Expertise",
    desc:
      <>
        Designed specifically for <strong>Singaporean homes and businesses</strong>, we combine modern aesthetics with a deep understanding of local architectural and security needs.
      </>
  }
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
        <meta property="og:site_name" content="Tectone Renex Steel Pte Ltd" />
        <link rel="canonical" href="https://tectonesteel.com/" />
        <link
          rel="preload"
          as="image"
          href={homepage}
        />
      </Head>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <img
          src={homepage}
          alt="Premium insect screen Singapore"
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-50"
          loading="eager"
          decoding="async"
        />

        <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Insect Screen Systems Specialist in Singapore
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Your trusted custom made insect screen & mosquito netting
              Provider that keeps your home aesthetic & protected.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/our-product" className="btn-primary">
                Explore Insect Screen Solutions
              </Link>
              <Link to="/quote" className="btn-outline border-white text-white hover:bg-white hover:text-gray-900">
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Calculator Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto min-h-[520px]">
            <EnhancedQuoteCalculator />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="cv-auto py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Us as Your Insect Screen Solution Provider
            </h2>
            <p className="text-slate-700 max-w-4xl mx-auto">
              Experience the perfect balance of style and strength with Tectone Renex Steel Pte Ltd’s <b>aluminium-framed insect screens</b>. <br></br>
              Our <b>security-grade stainless-steel mesh</b> delivers exceptional protection against mosquitoes, flies, and even <br></br>
              rodents—while maintaining a sleek, minimalist look that complements contemporary interiors and commercial spaces.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-4 md:p-6 transition-all hover:border-tectone-gold hover:shadow-md bg-card animate-on-scroll"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center mb-2 md:mb-4">
                  <div className="feature-icon scale-90 md:scale-100">{feature.icon}</div>

                  <h3 className="text-sm sm:text-base md:text-lg font-semibold ml-2">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/about-insect-screen-supplier" className="btn-primary">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="cv-auto py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Insect Screen Solutions
            </h2>
            <p className="text-slate-700 max-w-4xl mx-auto">
              Explore our <strong>comprehensive range of aluminium insect screen doors, windows, and insect screens</strong>—crafted to elevate your property’s safety <strong>and</strong> architectural style.
              Each product features <strong>security-grade stainless-steel mesh</strong> and sleek, grille-free designs that complement modern Singapore homes and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              to="/our-product"
              className="rounded-lg overflow-hidden bg-card shadow-md animate-on-scroll group transition-shadow duration-300 hover:shadow-lg block"
            >
              <div className="h-64 bg-gray-700 relative overflow-hidden">
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out scale-100 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${productPicture})`,
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div> {/* 遮罩 */}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">Insect Screen Solutions</h3>
                <p className="text-slate-700 mb-4">
                  Enjoy fresh air and natural light while keeping mosquitoes and pests out. Tectone Renex Steel Pte Ltd’s <strong>high-quality aluminium insect screens</strong> feature <strong>sleek, grille-free frames</strong> and <strong>fine stainless-steel mesh</strong> that blend seamlessly with modern architecture.

                </p>
                <span className="inline-flex items-center font-semibold text-tectone-gold transition duration-300 group-hover:text-tectone-gold/80">
                  View All Products
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="cv-auto-1200 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-slate-700 max-w-3xl mx-auto">
              Hear from homeowners who have experienced the Tectone Renex Steel Pte Ltd difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[520px]">
            <GoogleReviewsWidget
              appId="8cd1d32f-8560-4f1b-83e3-1f967e45204a"
              className="bg-card p-6 rounded-lg shadow-md animate-on-scroll border border-border col-span-1 md:col-span-3"
            />
          </div>
        </div>
      </section>

      <section className="cv-auto">
        <ContactSection />
      </section>
    </>
  );
};

export default HomePage;
