import React from "react";
import Reveal from "./Reveal";
import { fieldReviews, reviewStats, type FieldReview } from "@/data/reviews";

/**
 * FieldReviews
 * Editorial review grid in the Balenciaga × SpaceX vocabulary used site-wide:
 *   – serif italic quote (Fraunces)
 *   – mono uppercase attribution (NAME · MONTHS AGO · VERIFIED GOOGLE)
 *   – hairline dividers
 *   – mono star pip
 *
 * Replaces the third-party Elfsight Google Reviews widget. Source data lives in
 * src/data/reviews.ts so the page stays fully static and renderable at build time.
 */

const Stars: React.FC<{ rating: 1 | 2 | 3 | 4 | 5 }> = ({ rating }) => (
  <span
    className="telemetry tracking-[0.18em] text-white/85"
    aria-label={`${rating} out of 5 stars`}
  >
    {"★".repeat(rating)}
    <span className="text-white/20">{"★".repeat(5 - rating)}</span>
  </span>
);

const ReviewCard: React.FC<{ r: FieldReview; index: number }> = ({ r, index }) => {
  const num = String(index + 1).padStart(2, "0");
  return (
    <Reveal delay={index * 60} className="h-full">
      <article className="relative h-full flex flex-col border border-white/10 bg-white/[0.02] p-6 md:p-8 hover:border-white/25 transition-colors">
        {/* corner index */}
        <div className="absolute top-3 left-3 num-tag">REV · {num}</div>
        <div className="absolute top-3 right-3">
          <Stars rating={r.rating} />
        </div>

        {/* quote */}
        <blockquote className="mt-12 mb-8 font-serif italic text-white/92 text-[19px] md:text-[21px] leading-[1.45] tracking-[-0.01em]">
          “{r.quote}”
        </blockquote>

        <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-serif text-base text-white">{r.name}</span>
            {r.tag && <span className="status-pill">{r.tag}</span>}
          </div>
          <div className="telemetry flex flex-wrap items-center gap-x-3 gap-y-1">
            {r.reviewerMeta && <span>{r.reviewerMeta}</span>}
            <span>{r.date.toUpperCase()}</span>
            <span className="text-white/85">
              <span className="live-dot" />
              VERIFIED · GOOGLE
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  );
};

const FieldReviews: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={className}>
      {/* aggregate strip */}
      <Reveal>
        <div className="mb-10 md:mb-12 border-y border-white/10 py-5 grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 items-end">
          <div>
            <div className="num-tag mb-1">AGGREGATE · GOOGLE</div>
            <div className="font-serif text-3xl md:text-4xl text-white tracking-[-0.01em]">
              {reviewStats.rating.toFixed(1)}
              <span className="text-white/40"> / 5</span>
            </div>
          </div>
          <div>
            <div className="num-tag mb-1">REVIEWS · COUNT</div>
            <div className="font-serif text-3xl md:text-4xl text-white tracking-[-0.01em]">
              {reviewStats.count}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="num-tag mb-1">DISTRIBUTION</div>
            <div className="telemetry text-white/80">5★ · {fieldReviews.length} OF {fieldReviews.length} SHOWN</div>
          </div>
          <div className="text-left md:text-right">
            <div className="num-tag mb-1">SOURCE</div>
            <div className="telemetry text-white/80">
              <span className="live-dot" />
              {reviewStats.source.toUpperCase()}
            </div>
          </div>
        </div>
      </Reveal>

      {/* grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
        {fieldReviews.map((r, i) => (
          <div key={r.id} className="bg-black">
            <ReviewCard r={r} index={i} />
          </div>
        ))}
      </div>

      <Reveal>
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[10px] sm:text-[11px] telemetry">
          <span>
            <span className="live-dot" />
            ALL REVIEWS · UNEDITED · TRANSCRIBED FROM GOOGLE BUSINESS PROFILE
          </span>
          <a
            href="https://www.google.com/search?q=Tectone+Renex+Steel+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white underline underline-offset-4 decoration-white/30"
          >
            VIEW ALL ON GOOGLE ↗
          </a>
        </div>
      </Reveal>
    </div>
  );
};

export default FieldReviews;
