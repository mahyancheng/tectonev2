import React from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";

/**
 * BTOPackages
 * HDB BTO mosquito-screening sets (3-Room / 4-Room / 5-Room).
 * Restyle of a partner site's package block, redone in the Balenciaga ×
 * SpaceX vocabulary the rest of this site uses:
 *   – serif headlines (Fraunces)
 *   – mono telemetry chips
 *   – hairline borders, no rounded gradients
 *   – brand monochrome only (black / grey / white)
 *
 * Each card has a No-Service-Yard / + Service-Yard toggle and a CTA that
 * routes into /quote with the package pre-noted in the URL query for the
 * lead-capture pipeline.
 *
 * SEO note: this block targets "HDB mosquito net Singapore", "BTO insect
 * screen", and the long-tail room-size searches (3-room mosquito net etc).
 */

type Package = {
  id: "3-room" | "4-room" | "5-room";
  glyph: string;
  badge?: string;
  label: string;
  /** Starting price for the set — survey confirms final scope. */
  priceFrom: number;
  /** Bullet list of openings covered by the headline price. Service-yard
   *  windows are quoted as an add-on on survey (no toggle in the UI). */
  includes: string[];
};

const PACKAGES: Package[] = [
  {
    id: "3-room",
    glyph: "01",
    label: "HDB BTO · 3-Room",
    priceFrom: 1980,
    includes: [
      "Living-room windows · 850 mm height",
      "Bedroom windows · 850 mm height",
    ],
  },
  {
    id: "4-room",
    glyph: "02",
    badge: "Most Popular",
    label: "HDB BTO · 4-Room",
    priceFrom: 2600,
    includes: [
      "Living-room windows · 850 mm height",
      "Bedroom windows · 850 mm height",
    ],
  },
  {
    id: "5-room",
    glyph: "03",
    label: "HDB BTO · 5-Room",
    priceFrom: 3220,
    includes: [
      "Living-room windows · 850 mm height",
      "Bedroom windows · 850 mm height",
    ],
  },
];

const FEATURE_CHIPS = [
  "SS304 mesh · 0.6 mm thickness",
  "Pull-up lock system",
  "White & dark-grey frames included",
  "Sliding mesh & casement windows",
];

const formatPrice = (n: number) =>
  n.toLocaleString("en-SG", { style: "currency", currency: "SGD", maximumFractionDigits: 0 });

const Card: React.FC<{ pkg: Package; index: number }> = ({ pkg, index }) => {
  const isFeatured = !!pkg.badge;
  return (
    <Reveal delay={index * 80} className="h-full">
      <article
        className={`relative h-full flex flex-col border bg-black/40 backdrop-blur-sm transition-colors ${
          isFeatured
            ? "border-white/40 bg-white/[0.04]"
            : "border-white/10 hover:border-white/25"
        }`}
      >
        {/* corner index — matches catalog row glyph */}
        <div className="absolute top-3 left-3 num-tag">PKG · {pkg.glyph}</div>
        {pkg.badge && (
          <div className="absolute top-3 right-3 px-2.5 py-0.5 border border-white/30 bg-white text-black text-[10px] font-mono tracking-[0.16em] uppercase">
            {pkg.badge}
          </div>
        )}

        <div className="p-6 md:p-8 pt-14 md:pt-16 flex flex-col flex-1">
          {/* label */}
          <div className="num-tag mb-2 text-white/55">{pkg.label.split(" · ")[0]}</div>
          <h3 className="font-serif text-2xl md:text-3xl tracking-tight text-white mb-8">
            {pkg.label.split(" · ")[1]}
          </h3>

          {/* price */}
          <div className="mb-6">
            <div className="flex items-end gap-3">
              <span className="eyebrow leading-none mb-2">From</span>
              <span className="font-serif text-5xl md:text-6xl text-white tracking-tight tabular-nums leading-none">
                {formatPrice(pkg.priceFrom)}
              </span>
            </div>
            <div className="mt-2 text-[11px] font-mono tracking-[0.10em] uppercase text-white/45">
              Survey confirms · 14-day install · 10 yr warranty
            </div>
          </div>

          {/* includes */}
          <div className="mb-8">
            <div className="num-tag mb-3">Includes</div>
            <ul className="space-y-2">
              {pkg.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/80 leading-snug">
                  <span aria-hidden className="mt-1.5 inline-block h-1 w-1 bg-white/70 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-auto">
            <Link
              to={`/quote?pkg=${pkg.id}`}
              className={isFeatured ? "btn-square w-full justify-center" : "btn-square-outline w-full justify-center"}
            >
              Get a Quote →
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
};

const BTOPackages: React.FC<{ className?: string; showHeader?: boolean }> = ({
  className = "",
  showHeader = true,
}) => {
  return (
    <div className={className}>
      {showHeader && (
        <div className="max-w-3xl mb-12 md:mb-14">
          <Reveal>
            <div className="num-tag mb-6">§ HDB Sets · Singapore</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="display-xl mb-6">
              Sustainable HDB
              <br />
              <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.78)" }}>
                living sets.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-white/65 leading-relaxed">
              All-inclusive insect-screen sets for HDB BTO flats — sized for
              standard openings, fabricated in our Woodlands workshop, installed
              in a single afternoon. Service-yard windows and other extras are
              priced on survey.
            </p>
          </Reveal>
        </div>
      )}

      {/* feature chips */}
      <Reveal delay={260}>
        <div className="flex flex-wrap gap-2 mb-10 md:mb-14">
          {FEATURE_CHIPS.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/15 text-[11px] font-mono tracking-[0.12em] uppercase text-white/75"
            >
              <span className="inline-block h-1.5 w-1.5 bg-white/70" />
              {chip}
            </span>
          ))}
        </div>
      </Reveal>

      {/* package grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
        {PACKAGES.map((pkg, i) => (
          <div key={pkg.id} className="bg-black">
            <Card pkg={pkg} index={i} />
          </div>
        ))}
      </div>

      {/* foot note */}
      <Reveal>
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[10px] sm:text-[11px] telemetry">
          <span>
            <span className="live-dot" />
            PRICES INDICATIVE · FINAL QUOTE AFTER ON-SITE SURVEY · SG ONLY
          </span>
          <Link
            to="/quote"
            className="text-white/70 hover:text-white underline underline-offset-4 decoration-white/30"
          >
            CUSTOM SIZING ↗
          </Link>
        </div>
      </Reveal>
    </div>
  );
};

export default BTOPackages;
