import React from "react";
import { Head } from "vite-react-ssg";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Tectone Renex Steel</title>
        <meta
          name="description"
          content="Privacy Policy for Tectone Renex Steel Pte Ltd. Learn how we collect, use, and protect your personal data."
        />
        <link rel="canonical" href="https://tectonesteel.com/privacy-policy" />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: 1 January 2025
          </p>

          <div className="prose prose-gray max-w-none space-y-6 text-foreground">
            <h2 className="text-xl font-semibold mt-8 mb-3">1. Introduction</h2>
            <p>
              Tectone Renex Steel Pte Ltd ("we", "our", or "us") is committed to
              protecting your personal data in accordance with the Personal Data
              Protection Act 2012 (PDPA) of Singapore. This Privacy Policy
              explains how we collect, use, disclose, and protect information
              obtained through our website at{" "}
              <a
                href="https://tectonesteel.com"
                className="text-tectone-gold underline"
              >
                tectonesteel.com
              </a>
              .
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              2. Information We Collect
            </h2>
            <p>We may collect the following types of personal data:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Contact information:</strong> name, email address, phone
                number, and mailing address when you submit a quote request or
                contact form.
              </li>
              <li>
                <strong>Project details:</strong> door/window measurements,
                product preferences, and property type provided during quote
                requests.
              </li>
              <li>
                <strong>Usage data:</strong> pages visited, time spent, browser
                type, device information, and IP address collected automatically
                through cookies and analytics tools.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              3. How We Use Your Information
            </h2>
            <p>Your personal data is used to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Respond to your enquiries and provide quotations</li>
              <li>Schedule consultations and installation appointments</li>
              <li>Improve our website, products, and services</li>
              <li>
                Send marketing communications (only with your consent; you may
                opt out at any time)
              </li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              4. Cookies & Tracking
            </h2>
            <p>
              Our website uses cookies and similar technologies, including Meta
              (Facebook) Pixel, to analyse website traffic and improve your
              browsing experience. You may disable cookies through your browser
              settings, though some features may not function properly.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              5. Data Sharing & Disclosure
            </h2>
            <p>
              We do not sell your personal data. We may share your information
              with:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Trusted service providers who assist with our operations (e.g.
                email services, analytics platforms)
              </li>
              <li>
                Government authorities when required by law or regulation
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              6. Data Security
            </h2>
            <p>
              We implement reasonable security measures to protect your personal
              data from unauthorised access, alteration, disclosure, or
              destruction. However, no method of transmission over the Internet
              is 100% secure.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              7. Data Retention
            </h2>
            <p>
              We retain personal data only for as long as necessary to fulfil
              the purposes for which it was collected, or as required by
              applicable laws.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              8. Your Rights
            </h2>
            <p>
              Under the PDPA, you have the right to access, correct, or
              withdraw consent for the use of your personal data. To exercise
              these rights, please contact us at{" "}
              <a
                href="mailto:tectone777@gmail.com"
                className="text-tectone-gold underline"
              >
                tectone777@gmail.com
              </a>
              .
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated revision date.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data
              practices, please contact us at:
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

export default PrivacyPolicyPage;
