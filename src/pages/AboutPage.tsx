
import React from "react";
import ContactSection from "@/components/ContactSection";

import ScreneSolution from "../images/ScreneSolution.webp"
import { Head } from "vite-react-ssg";


const CoreValues = [
  {
    title: "Quality",
    desc: "We never compromise on the quality of our materials or workmanship, ensuring long-lasting solutions."
  },
  {
    title: "Innovation",
    desc: "We continuously explore new technologies and designs to provide cutting-edge screen solutions."
  },
  {
    title: "Integrity",
    desc: "We operate with transparency and honesty in all our client interactions and business practices."
  },
  {
    title: "Customer Focus",
    desc: "We put our customers' needs first, providing personalized service and tailored solutions."
  }
]

const Process = [
  {
    number: "1",
    title: "Consultation",
    desc: "We discuss your needs and preferences to understand your requirements fully.",
  },
  {
    number: "2",
    title: "Measurement",
    desc: "Our experts take precise measurements to ensure a perfect fit for your screens."
  },
  {
    number: "3",
    title: "Production",
    desc: "We custom-manufacture your screens using premium materials and precision engineering."
  },
  {
    number: "4",
    title: "Installation",
    desc: "Our professional team installs your screens with care and precision."
  }
]

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>About Us | Tectone Renex Steel</title>
        <meta
          name="description"
          content="High-quality insect screens and mosquito netting solutions in Singapore. Get an instant quote today!"
        />
        <meta property="og:title" content="About Us | Tectone Renex Steel" />
        <meta
          property="og:description"
          content="Learn about our commitment to high-quality insect screens and mosquito netting solutions for Singapore homes."
        />
        <meta property="og:image" content="https://tectonesteel.com/og-image.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content="Tectone Renex Steel Pte Ltd" />
        <link
          rel="canonical"
          href="https://tectonesteel.com/about-insect-screen-supplier"
        />
        <link rel="preload" as="image" href={ScreneSolution} />
      </Head>
      {/* About Us Hero */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                Singapore's Premium Screen Solutions
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mb-5 md:mb-6">
                At Tectone Renex Steel Pte Ltd, we've been enhancing Singapore homes with elegant,
                grille-free protection since our founding. Our mission is to provide
                premium security and insect screens that complement modern architecture
                while offering unmatched protection.
              </p>
<p className="text-sm sm:text-base text-gray-600 mb-5 md:mb-6">
                Our team combines expertise in design, engineering, and installation to
                deliver custom solutions that perfectly fit your home's unique requirements,
                ensuring both aesthetic appeal and functional excellence.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-tectone-gold/10 rounded-full flex items-center justify-center mr-4">
                    <div className="h-6 w-6 bg-tectone-gold rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">10+ Years</h3>
                    <p className="text-sm text-gray-500">Industry Experience</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-tectone-gold/10 rounded-full flex items-center justify-center mr-4">
                    <div className="h-6 w-6 bg-tectone-gold rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">5,000+</h3>
                    <p className="text-sm text-gray-500">Happy Customers</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-tectone-gold/10 rounded-full flex items-center justify-center mr-4">
                    <div className="h-6 w-6 bg-tectone-gold rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">100%</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-5 md:mb-6">Satisfaction Guarantee</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={ScreneSolution}
                  alt="Tectone Renex Steel Pte Ltd office building"
                  className="w-full h-full object-cover opacity-80"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="cv-auto py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-10">
              These principles guide everything we do at Tectone Renex Steel Pte Ltd, from product
              development to customer service.
            </p>
          </div>

          {/* ✅ Move .grid outside of map */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {CoreValues.map((item, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-4 md:p-6 transition-all hover:border-tectone-gold hover:shadow-md bg-card animate-on-scroll"
                style={{ transitionDelay: `${index * 80}ms` }}   // ✅ 取代 delay-${index}
              >
                <div className="h-10 w-10 md:h-12 md:w-12 bg-tectone-gold/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <div className="h-5 w-5 md:h-6 md:w-6 bg-tectone-gold rounded-full"></div>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 md:mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {item.desc}
                </p>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      < section className="cv-auto py-16 bg-gray-100" >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              From consultation to installation, we ensure a smooth and efficient process
              that delivers exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {Process.map((Process, index) =>
              <div
                key={index}
                className="relative animate-on-scroll"
                style={{ transitionDelay: `${index * 80}ms` }}
              >

                <div className="h-12 w-12 md:h-16 md:w-16 bg-tectone-gold rounded-full flex items-center justify-center text-white font-bold text-lg md:text-2xl mb-3 md:mb-4">
                  {Process.number}
                </div>

                <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 md:mb-2">
                  {Process.title}
                </h3>

                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {Process.desc}
                </p>
              </div>
            )}

          </div>
        </div>
      </section >

      {/* Contact Section */}
      < section className="cv-auto py-16" >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Have questions or ready to enhance your home with our premium screens?
              Get in touch with our team today.
            </p>
          </div>

          <section className="cv-auto">
            <ContactSection />
          </section>
        </div>
      </section >
    </>
  );
};

export default AboutPage;
