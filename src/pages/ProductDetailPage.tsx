import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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

  // Build a REV-style code from the product id ("107-security-swing-door" → "RT-107")
  const productCode = `RT-${(productId || "").split("-")[0]}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={`${product.title} | Tectone Renex Steel`} />
        <meta property="og:description" content={`Discover specifications, features, and installation details for ${product.title}.`} />
        <meta property="og:site_name" content="Tectone Renex Steel Pte Ltd" />
        {product.image && <meta property="og:image" content={product.image} />}
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {product.image && <meta name="twitter:image" content={product.image} />}
        <link rel="preload" as="image" href={product.image} />
        <link rel="canonical" href={`https://tectonesteel.com/our-product/product/${productId}`} />
      </Head>

      {/* ═════════════ HERO — spec-sheet layout ═════════════ */}
      <section className="relative cv-auto py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Document header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14 pb-6 border-b border-white/10">
            <div className="num-tag">
              {productCode} · SPEC SHEET · REV.03<br />
              <span className="text-white/35">TECTONE-DESIGN · 2026.Q2</span>
            </div>
            <div className="num-tag md:text-right">
              FAB · WOODLANDS · SG<br />
              <span className="text-white/35">SURVEY → INSTALL · 14d</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Info column */}
            <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col">
              <h1 className="display-xl mb-6">
                {product.title}
              </h1>
              <div className="text-base md:text-lg text-white/65 leading-relaxed whitespace-pre-line max-w-[60ch] mb-10">
                {product.description}
              </div>

              {/* Status pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="status-pill"><span className="live-dot" />IN PRODUCTION</span>
                <span className="status-pill">SS304 · 11×11</span>
                <span className="status-pill">5YR · WARRANTY</span>
              </div>

              {/* Inline data block */}
              {product.securityStyle && product.securityStyle.length > 0 && (
                <div className="mb-10">
                  <div className="num-tag mb-4">§ Field notes</div>
                  <ul className="space-y-2.5">
                    {product.securityStyle.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-4 text-sm md:text-base text-white/80 leading-snug">
                        <span className="font-mono text-[10px] text-white/40 mt-1 tracking-[0.10em] min-w-[24px]">{String(i + 1).padStart(2, "0")}</span>
                        <span className="break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Visual column */}
            <div className="order-1 lg:order-2 lg:col-span-5">
              <div className="sticky top-32">
                <div className="relative aspect-[4/3] overflow-hidden border border-white/15 bg-black">
                  <img
                    src={product.image || "https://via.placeholder.com/800x600"}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 frame-grid opacity-20 pointer-events-none" />
                  <div className="corner-readout left-3 top-3">FIELD · {productCode}</div>
                  <div className="corner-readout right-3 bottom-3 text-right">MATERIAL · SS304</div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link to="/quote" className="btn-square w-full">
                    Configure → Quote
                  </Link>
                  <Link to="/contact-us" className="btn-square-outline w-full">
                    Channels ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════ APPLICATIONS + KEY FEATURES ═════════════ */}
      <section className="cv-auto py-20 md:py-28 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10">
          {product.perfectFor && product.perfectFor.length > 0 && (
            <div>
              <div className="num-tag mb-6">§ Applications</div>
              <ul className="space-y-3">
                {product.perfectFor.map((item: string, i: number) => (
                  <li key={i} className="flex items-baseline gap-4 py-3 border-b border-white/10">
                    <span className="font-mono text-[10px] text-white/40 tracking-[0.10em] min-w-[28px]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-lg md:text-xl text-white tracking-tight leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <div>
              <div className="num-tag mb-6">§ Key Features</div>
              <ul className="space-y-3">
                {product.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-baseline gap-4 py-3 border-b border-white/10">
                    <Check className="h-3.5 w-3.5 text-white/55 mt-1 flex-shrink-0" aria-hidden />
                    <span className="font-serif text-lg md:text-xl text-white tracking-tight leading-snug break-words">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ═════════════ SPECIFICATIONS ═════════════ */}
      {product.specifications && product.specifications.length > 0 && (
        <section className="cv-auto py-24 md:py-32 border-t border-white/5">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="num-tag mb-6">§ Technical sheet · {productCode}</div>
            <h2 className="display-xl mb-12">
              Technical <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>specifications.</span>
            </h2>
            <div className="border border-white/10">
              {product.specifications.map(
                (spec: { label: string; value: string }, index: number) => (
                  <div key={index} className="grid grid-cols-3 md:grid-cols-12 border-b border-white/10 last:border-b-0">
                    <div className="col-span-1 md:col-span-1 p-5 font-mono text-[10px] text-white/40 tracking-[0.12em]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="col-span-1 md:col-span-4 p-5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/55 break-words">
                      {spec.label}
                    </div>
                    <div className="col-span-1 md:col-span-7 p-5 font-serif text-base md:text-xl text-white tracking-tight break-words">
                      {spec.value}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═════════════ CONFIGURATOR ═════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="num-tag mb-6">§ Configurator · {productCode}</div>
          <h2 className="display-xl mb-4">
            Configure → <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>quote</span>.
          </h2>
          <p className="text-white/65 leading-relaxed max-w-xl mb-10">
            Pre-loaded with {product.title.toLowerCase()}. Add dimensions, leave your number — quote PDF in your inbox.
          </p>
          <EnhancedQuoteCalculator initialProductId={product.id} compact />
        </div>
      </section>

      {/* ═════════════ WHY TECTONE ═════════════ */}
      <section className="cv-auto py-24 md:py-32 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="mb-12 md:mb-16 max-w-3xl">
            <div className="num-tag mb-6">§ Engineering choices</div>
            <h2 className="display-xl">
              Why this <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>{product.title.toLowerCase()}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {features.map(({ Icon, title, desc }, index) => (
              <div
                key={title}
                className="bg-background p-8 md:p-10 animate-on-scroll"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="num-tag mb-6">0{index + 1}</div>
                <Icon className="h-6 w-6 text-white mb-5" />
                <h3 className="font-serif text-xl md:text-2xl tracking-tight mb-3 break-words">{title}</h3>
                <p className="text-sm md:text-base text-white/60 leading-relaxed break-words">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-auto border-t border-white/5"><UseCasesSection productName={product.title} /></section>
      <section className="cv-auto border-t border-white/5"><InstallationsGallery productName={product.title} /></section>
      <section className="cv-auto border-t border-white/5"><YouMightLikeSection currentProductId={productId} /></section>
      <section className="cv-auto border-t border-white/5"><ContactSection /></section>
    </>
  );
};

export default ProductDetailPage;
