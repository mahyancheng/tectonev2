import React from "react";
import EnhancedQuoteCalculator from "../components/EnhancedQuoteCalculator";
import ContactSection from "@/components/ContactSection";
import { Head } from "vite-react-ssg";

const QuotePage: React.FC = () => {
  const canonical = "https://tectonesteel.com/quote";

  return (
    <>
      <Head>
        <title>Get An Instant Quote | Tectone Renex Steel</title>
        <meta
          name="description"
          content="Get an instant quote for premium aluminium insect screens in Singapore. Submit your measurements and details in 3 simple steps."
        />

        <link rel="canonical" href={canonical} />

        {/* OG */}
        <meta property="og:title" content="Get An Instant Quote | Tectone Renex Steel" />
        <meta
          property="og:description"
          content="Submit your details to receive a custom quotation for insect screen installation."
        />
        <meta property="og:site_name" content="Tectone Renex Steel Pte Ltd" />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Get An Instant Quote | Tectone Renex Steel" />
        <meta
          name="twitter:description"
          content="Get an instant quote for premium aluminium insect screens in Singapore."
        />
      </Head>

      {/* Header / Intro */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Your Custom Quote</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Calculate your solution cost in just 3 simple steps. Our team will contact you with a
              detailed proposal.
            </p>
          </div>

          {/* Calculator (首屏重点：不要 cv-auto) */}
          <div className="max-w-3xl mx-auto">
            <EnhancedQuoteCalculator />
          </div>

          {/* Help CTA */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-semibold mb-3">Need Help?</h2>
            <p className="text-gray-600 mb-6">
              Our experts are here to help you choose the perfect insect screen solution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+6596771199" className="btn-primary">
                Call Us: +65 9677 1199
              </a>
              <a href="mailto:tectone777@gmail.com" className="btn-outline">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section（如果它很长/很多内容 ✅适合 cv-auto） */}
      <section className="cv-auto">
        <ContactSection />
      </section>
    </>
  );
};

export default QuotePage;
