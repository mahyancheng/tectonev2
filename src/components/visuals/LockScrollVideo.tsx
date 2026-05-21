import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * LockScrollVideo
 * A small looping clip of the Tectone insect-screen lock mechanism.
 *
 * The asset is shipped as an optimized GIF (~700 KB, 180px wide, palette-gen
 * down to 96 colours, 25 fps preserved from source) — rendered via <img>
 * so it behaves exactly like a native GIF in every browser. Previously
 * MP4 + WebM via <video>; that introduced rendering quirks on some
 * devices and locked us out of CSS `image-rendering` tweaks.
 *
 * Behaviour:
 *  – Scroll position drives a subtle Y translate + opacity (the "scroll
 *    animation" feel) via Framer Motion's `useScroll`.
 *  – When off-screen we swap the `src` to an empty data URI so the
 *    browser stops decoding GIF frames — a small CPU/battery win,
 *    equivalent to <video>'s `pause()`.
 *  – Honours `prefers-reduced-motion` — the GIF freezes on its first
 *    frame and the scroll coupling is dropped.
 */

interface LockScrollVideoProps {
  /** Path to the optimized GIF. */
  src: string;
  /** Tailwind classes for the framed wrapper (size + position). */
  className?: string;
  /** Show the corner mono caption. Defaults true. */
  caption?: string | false;
}

// 1×1 transparent GIF — used to release the decoder when the clip leaves
// the viewport without unmounting the element (preserves the wrapper
// dimensions, no layout shift on re-enter).
const BLANK_GIF =
  "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

const LockScrollVideo: React.FC<LockScrollVideoProps> = ({
  src,
  className = "",
  caption = "LOCK · RT-MECH",
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(false);

  // Scroll-coupled feel: the clip subtly drifts up + fades as the wrapper
  // travels through the viewport. Range: [enter top, leave bottom].
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Release the GIF decoder while off-screen.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setInView(entry.isIntersecting);
      },
      { threshold: 0.12 }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <motion.div
      ref={wrapRef}
      style={reduced ? undefined : { y, opacity }}
      className={`relative overflow-hidden border border-white/15 bg-black/40 backdrop-blur-sm ${className}`}
    >
      <img
        src={inView ? src : BLANK_GIF}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="block w-full h-full object-cover"
      />

      {/* hairline frame-grid texture so it sits inside the design system */}
      <div className="absolute inset-0 frame-grid opacity-30 pointer-events-none" />

      {caption !== false && (
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-[0.14em] sm:tracking-[0.18em] uppercase text-white/70 pointer-events-none whitespace-nowrap">
          <span className="truncate">
            <span className="live-dot" />
            {caption}
          </span>
          {/* REV stamp hidden on phone so the main caption gets the room */}
          <span className="hidden sm:inline text-white/40">REV.03</span>
        </div>
      )}
    </motion.div>
  );
};

export default LockScrollVideo;
