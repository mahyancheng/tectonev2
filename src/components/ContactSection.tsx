  import { MapPin } from "lucide-react";
  import ContactForm from "./ContactForm";

  const ContactSection = () => {
    return (
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LEFT INFO */}
              <div>
                {/* ✅ 正确的 Section 主标题：h2 */}
                <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>

                <p className=" mb-6">
                  Have questions about our products or need a custom solution? Contact us today and
                  our team will be happy to assist you.
                </p>

                <div className="space-y-4">
                  {/* ✅ Address */}
                  <div className="flex items-start">
                    <div className="feature-icon mt-1">
                      <MapPin size={20} />
                    </div>
                    <div>
                      {/* ✅ h3 + 对比度安全颜色 */}
                      <h3 className="font-bold text-base">Our Location</h3>
                      <a
                        href="https://www.google.com/maps/place/Tectone+Renex+Steel+PTE.LTD/@1.4343653,103.8024411,657m/data=!3m3!1e3!4b1!5s0x31da16faf7b0b4bd:0x58393daf6590b2c8!4m6!3m5!1s0x31da1360cb67a2bd:0xec08568965b74b79!8m2!3d1.4343653!4d103.8024411!16s%2Fg%2F11svpxgdvm"
                        className="text-gray-600 hover:text-tectone-gold transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        11 Woodlands Cl, #04-40 Woodlands 11,
                        <br />
                        Singapore 737853
                      </a>
                    </div>
                  </div>

                  {/* ✅ Phone（已移除 li，避免 Lighthouse 错误） */}
                  <div className="flex items-start">
                    <div className="feature-icon mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>

                    <div className="flex flex-col">
                      <h3 className="font-bold text-base">Phone</h3>
                      <a
                        href="tel:+6596771199"
                        className="text-gray-600 hover:text-tectone-gold transition-colors"
                      >
                        +65-9677 1199
                      </a>
                    </div>
                  </div>

                  {/* ✅ Email */}
                  <div className="flex items-start">
                    <div className="feature-icon mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-base">Email</h3>
                      <a
                        href="mailto:tectone777@gmail.com"
                        className="text-gray-600 hover:text-tectone-gold transition-colors"
                      >
                        tectone777@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT FORM */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default ContactSection;
