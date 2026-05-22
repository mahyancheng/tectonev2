import React from "react";
import ContactForm from "../components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Head } from "vite-react-ssg";

type MapCardProps = {
  address: string;
  zoom?: number;
  className?: string;
};

function MapCard({ address, zoom = 16, className = "" }: MapCardProps) {
  const query = encodeURIComponent(address);
  const src = `https://www.google.com/maps?q=${query}&z=${zoom}&output=embed`;

  return (
    <div className={className}>
      <iframe
        title={`map-${address}`}
        src={src}
        className="w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <noscript>
        <div className="w-full h-full flex items-center justify-center bg-white/[0.08]">
          <span className="text-white/55">
            Map (enable JavaScript to view) — {address}
          </span>
        </div>
      </noscript>
    </div>
  );
}

const ContactPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>
          Contact · Insect Screen &amp; Mosquito Net Singapore | Free Site Survey | Tectone Renex Steel
        </title>
        <meta
          name="description"
          content="Speak to Tectone — Singapore's stainless-steel insect screen, mosquito net and window mesh specialist. Book a free on-site survey, call +65 9677 1199 (Charlie), or WhatsApp for an instant quote."
        />
        <meta
          name="keywords"
          content="contact insect screen Singapore, mosquito net Singapore contact, window mesh Singapore survey, insect screen installer Singapore, free site survey mosquito net, Tectone Charlie contact"
        />
        <meta name="geo.region" content="SG" />
        <meta name="geo.placename" content="Singapore" />
        <meta name="geo.position" content="1.4344;103.8024" />
        <meta name="ICBM" content="1.4344, 103.8024" />
        <meta property="og:title" content="Contact · Insect Screen & Mosquito Net Singapore | Free Site Survey | Tectone" />
        <meta
          property="og:description"
          content="Book a free Singapore site survey for stainless-steel insect screens, mosquito nets and window mesh. WhatsApp +65 9677 1199 · Charlie."
        />
        <meta property="og:image" content="https://tectonesteel.com/og-image.webp" />
        <meta property="og:locale" content="en_SG" />
        <meta property="og:url" content="https://tectonesteel.com/contact-us" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tectone Renex Steel Pte Ltd" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact · Insect Screen & Mosquito Net Singapore | Tectone" />
        <meta name="twitter:description" content="Free site survey + instant quote on Singapore insect screens and mosquito nets. WhatsApp Charlie at +65 9677 1199." />
        <link rel="canonical" href="https://tectonesteel.com/contact-us" />
        <link rel="alternate" hrefLang="en-SG" href="https://tectonesteel.com/contact-us" />
      </Head>

      {/* Contact Hero */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Contact · Insect Screen &amp; Mosquito Net Singapore
            </h1>
            <p className="text-white/55 max-w-3xl mx-auto">
              Book a free Singapore site survey, talk to Charlie on WhatsApp, or send a measurement
              over for a no-obligation insect screen, mosquito net or window mesh quote. We reply
              in ~8 minutes during business hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="flex">
              <div className="bg-white/[0.03] rounded-lg shadow-md p-8 flex-1">
                <h2 className="text-2xl font-bold mb-6">Send Us A Message</h2>
                <ContactForm />
              </div>
            </div>

            {/* Contact Info */}
            <div className="animate-fade-in flex">
              <div className="bg-white/[0.03] rounded-lg shadow-md p-8 flex-1">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                <div className="space-y-6">
                  {/* Location */}
                  <div className="flex items-start">
                    <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base mb-1">Our Location</h3>
                      <a
                        href="https://www.google.com/maps/place/Tectone+Renex+Steel+PTE.LTD/@1.4343653,103.8024411,657m/data=!3m3!1e3!4b1!5s0x31da16faf7b0b4bd:0x58393daf6590b2c8!4m6!3m5!1s0x31da1360cb67a2bd:0xec08568965b74b79!8m2!3d1.4343653!4d103.8024411!16s%2Fg%2F11svpxgdvm?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D"
                        className="text-white/55 hover:text-white transition-colors"
                        target="_blank"
                        rel="noreferrer"
                      >
                        11 Woodlands Cl, #04-40 Woodlands 11, Singapore 737853
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base mb-1">Phone Number</h3>
                      <a
                        href="tel:+6596771199"
                        className="text-white/55 hover:text-white transition-colors"
                      >
                        +65 9677 1199
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base mb-1">Email Address</h3>
                      <a
                        href="mailto:tectone777@gmail.com"
                        className="text-white/55 hover:text-white transition-colors"
                      >
                        tectone777@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start">
                    <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center mr-4">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base mb-1">Business Hours</h3>
                      <p className="text-white/55">
                        Monday - Friday: 9am - 6pm
                        <br />
                        Sunday & Public Holidays: Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="font-bold text-base mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.facebook.com/share/1FQVZzyYPn/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <span className="sr-only">Facebook</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (✅ very suitable for cv-auto) */}
      <section className="py-12 bg-white/[0.03] cv-auto">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Visit Our Showroom</h2>
            <p className="text-white/55 max-w-3xl mx-auto">
              See our products in person at our showroom. Our experts are available to
              assist you with any questions you may have.
            </p>
          </div>

          <div className="bg-white/[0.03] rounded-lg shadow-md overflow-hidden animate-on-scroll">
            {/* ✅ one container only */}
            <div className="w-full h-[500px] bg-white/[0.06]">
              <MapCard
                address="Tectone Renex Steel PTE.LTD"
                zoom={17}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
