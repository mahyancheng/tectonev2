import React from "react";
import { Head } from "vite-react-ssg";

const TermsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Terms of Service | Tectone Renex Steel</title>
        <meta
          name="description"
          content="Terms of Service for Tectone Renex Steel Pte Ltd. Read our terms and conditions for using our website and services."
        />
        <link rel="canonical" href="https://tectonesteel.com/terms" />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: 1 January 2025
          </p>

          <div className="prose prose-gray max-w-none space-y-6 text-foreground">
            <h2 className="text-xl font-semibold mt-8 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using the website at{" "}
              <a
                href="https://tectonesteel.com"
                className="text-tectone-gold underline"
              >
                tectonesteel.com
              </a>{" "}
              ("Site"), you agree to be bound by these Terms of Service. If you
              do not agree, please do not use the Site.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              2. Company Information
            </h2>
            <p>
              This Site is operated by Tectone Renex Steel Pte Ltd, a company
              registered in Singapore. Our registered address is 11 Woodlands
              Cl, #04-40 Woodlands 11, Singapore 737853.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              3. Products & Services
            </h2>
            <p>
              We provide insect screen and security screen products and
              installation services. Product images, descriptions, and
              specifications on the Site are for general reference only. Actual
              products may vary slightly in colour, dimensions, or finish.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              4. Quotations & Pricing
            </h2>
            <p>
              Quotations provided through the Site are estimates only and do not
              constitute a binding offer. Final pricing will be confirmed after
              an on-site assessment by our team. All prices are in Singapore
              Dollars (SGD) unless otherwise stated.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              5. Warranty
            </h2>
            <p>
              Our insect screen products come with a 10-year warranty covering
              manufacturing defects and structural integrity under normal use
              conditions. The warranty does not cover damage caused by misuse,
              unauthorised modifications, or natural disasters.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              6. Intellectual Property
            </h2>
            <p>
              All content on this Site — including text, images, logos, graphics,
              and design — is the property of Tectone Renex Steel Pte Ltd and is
              protected by applicable intellectual property laws. You may not
              reproduce, distribute, or use any content without our prior
              written consent.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Tectone Renex Steel Pte
              Ltd shall not be liable for any indirect, incidental, or
              consequential damages arising from your use of the Site or our
              products and services.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              8. Third-Party Links
            </h2>
            <p>
              The Site may contain links to third-party websites. We are not
              responsible for the content, privacy practices, or terms of any
              third-party sites.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              9. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the Republic of Singapore. Any disputes shall be
              subject to the exclusive jurisdiction of the courts of Singapore.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              10. Changes to These Terms
            </h2>
            <p>
              We reserve the right to update these Terms at any time. Changes
              will be posted on this page with an updated revision date.
              Continued use of the Site constitutes acceptance of the revised
              Terms.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              11. Contact Us
            </h2>
            <p>
              If you have questions about these Terms of Service, please contact
              us at:
            </p>
            <p>
              <strong>Tectone Renex Steel Pte Ltd</strong>
              <br />
              11 Woodlands Cl, #04-40 Woodlands 11, Singapore 737853
              <br />
              Email:{" "}
              <a
                href="mailto:tectone777@gmail.com"
                className="text-tectone-gold underline"
              >
                tectone777@gmail.com
              </a>
              <br />
              Phone:{" "}
              <a
                href="tel:+6596771199"
                className="text-tectone-gold underline"
              >
                +65 9677 1199
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsPage;
