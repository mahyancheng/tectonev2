import React, { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Head } from "vite-react-ssg";
import EnhancedQuoteCalculator from "../components/EnhancedQuoteCalculator";
import { Shield, Lock, Wrench, Check } from "lucide-react";
import ContactSection from "@/components/ContactSection";
import { productDetails } from "../components/ProductData";
import YouMightLikeSection from "@/components/YouMightLikeSection";
import InstallationsGallery from "@/components/InstallationsGallery";
import UseCasesSection from "@/components/UseCasesSection";
import NotFound from "./NotFound";
const features = [
  {
    Icon: Shield,
    title: "Maximum Security",
    desc: "Reinforced designs and locking mechanisms provide unmatched protection for your property.",
  },
  {
    Icon: Lock,
    title: "Advanced Locking",
    desc: "Multi-point systems and emergency exits ensure both safety and security.",
  },
  {
    Icon: Wrench,
    title: "Professional Installation",
    desc: "Installed by certified technicians to guarantee lasting quality and performance.",
  },
];



const MAX_DESC = 160;
const buildMetaDescription = (title: string, raw?: string) => {
  const base =
    raw?.replace(/\s+/g, " ").trim() ||
    `Premium ${title} for Singapore homes. Get an instant quote now.`;
  return base.length > MAX_DESC ? `${base.slice(0, MAX_DESC - 1)}…` : base;
};

const ProductDetailPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { productId } = useParams();
  const product = productDetails.find((p) => p.id === productId);

  if (!product) {
    return <NotFound />;
  }
  const pageTitle = `${product.title} | Get an Instant Quote Now | Tectone Renex Steel`;
  const metaDescription = buildMetaDescription(product.title, product.description);

  return (
    <>
      {/* ✅ Helmet: 动态 SEO */}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />

        {/* OG / Twitter */}
        <meta property="og:title" content={`${product.title} | Tectone Renex Steel`} />
        <meta property="og:description" content={`Discover specifications, features, and installation details for ${product.title}.`} />
        <meta property="og:site_name" content="Tectone Renex Steel Pte Ltd" />

        {product.image && <meta property="og:image" content={product.image} />}
        <meta property="og:type" content="product" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {product.image && <meta name="twitter:image" content={product.image} />}
        <link
          rel="preload"
          as="image"
          href={product.image}
        />

        {/* 可选：canonical（如有产品详情固定 URL 结构，可打开） */}
        <link rel="canonical" href={`https://tectonesteel.com/our-product/product/${productId}`} />
      </Head>

      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* 左侧：信息 */}
            <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col min-h-0">
              <header className="space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                    {product.title}
                </h1>
<div className="text-sm sm:text-base md:text-base text-white/55 leading-relaxed whitespace-pre-line max-w-[65ch]">
                  {product.description}
                </div>
              </header>

              {/* 信息区块 */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {product.securityStyle && product.securityStyle.length > 0 && (
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 shadow-sm">
                    <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2 md:mb-3">
                      {(() => {
                        switch (productId) {
                          case "sliding-door":
                            return "For Singapore Home";
                          case "security-swing-door":
                            return "Usage Info";
                          case "casement-window":
                            return "Engineered for Singapore Homes";
                          case "sliding-window":
                          case "fixed-security-screen":
                          case "top-hung":
                          case "security-swing-window":
                            return "Made for Singapore Living";
                          default:
                            return "Usage Info";
                        }
                      })()}
                    </h2>
                    <ul className="space-y-2">
                      {product.securityStyle.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-2 h-1.5 w-1.5 rounded-full bg-white/[0.03] border border-white/10" aria-hidden />
                          <span className="text-xs sm:text-sm md:text-base text-white/85 leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.perfectFor && product.perfectFor.length > 0 && (
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 shadow-sm">
                    <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Perfect For</h2>
                    <ul className="space-y-2">
                      {product.perfectFor.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40 flex-shrink-0" aria-hidden />
                          <span className="text-sm md:text-base text-white/85 leading-snug break-words">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.features && product.features.length > 0 && (
                  <div className="md:col-span-2 bg-white/[0.03] border border-white/10 rounded-xl p-5 shadow-sm">
                    <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Key Features</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                      {product.features.map((feature: string, i: number) => (
                        <li
                          key={i}
                          className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 hover:bg-white/[0.05] transition min-w-0"
                        >
                          <Check className="h-4 w-4 text-white/70 mt-0.5 flex-shrink-0" aria-hidden />
                          <span className="text-sm md:text-base text-white/85 leading-snug break-words min-w-0">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* 右侧：图片 + 按钮（按钮在图片下方） */}
            <div className="order-1 lg:order-2 lg:col-span-5">
              <div className="sticky top-24">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-white/[0.03]">
                  <img
                    src={product.image || "https://via.placeholder.com/800x600"}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {/* CTA 放到图片下方 */}
                <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                  <Link to="/quote" className="btn-primary w-full sm:w-auto">
                    Get Quote
                  </Link>
                  <Link to="/contact-us" className="btn-outline w-full sm:w-auto">
                    Contact Us
                  </Link>
                </div>
                {/* 若不想按钮跟着 sticky 一起固定，把上面这个按钮块移到 sticky div 外面 */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      {product.specifications && product.specifications.length > 0 && (
        <section className="cv-auto py-16 md:py-20 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p className="eyebrow mb-3 text-center">Specs</p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-10 text-center">Technical Specifications</h2>
              <div className="surface-card overflow-hidden">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
                  {product.specifications.map(
                    (spec: { label: string; value: string }, index: number) => (
                      <div key={index} className="bg-background px-5 py-4">
                        <dt className="eyebrow mb-1">{spec.label}</dt>
                        <dd className="text-sm md:text-base text-white/90 break-words">{spec.value}</dd>
                      </div>
                    )
                  )}
                </dl>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quote Calculator */}
      <section className="py-16 md:py-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="eyebrow mb-3 text-center">Quote</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-8 text-center">Get Your Custom Quote</h2>
            <EnhancedQuoteCalculator />
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="cv-auto py-16 md:py-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14 max-w-2xl mx-auto">
            <p className="eyebrow mb-3">Why Tectone</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight">
              Why Choose Our {product.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {features.map(({ Icon, title, desc }, index) => (
              <div
                key={title}
                className="bg-background p-6 md:p-8 animate-on-scroll"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="feature-icon mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base md:text-lg font-medium tracking-tight mb-2 break-words">{title}</h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed break-words">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="cv-auto">
        <UseCasesSection productName={product.title} />
      </section>

      <section className="cv-auto">
        <InstallationsGallery productName={product.title} />
      </section>

      <section className="cv-auto">
        <YouMightLikeSection currentProductId={productId} />
      </section>

      <section className="cv-auto">
        <ContactSection />
      </section>
    </>
  );
};

export default ProductDetailPage;
