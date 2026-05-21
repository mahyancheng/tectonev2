import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * LockScrollVideo
 * A small looping video clip of the Tectone insect-screen lock mechanism.
 * Behaviour:
 *  – Only plays while scrolled into view (IntersectionObserver pause/resume),
 *    so we don't burn CPU on a 100fps loop the user can't see.
 *  – Scroll position drives a subtle opacity + Y translate (the "scroll
 *    animation" feel) — without re-encoding the clip or scrubbing frames.
 *  – Honours `prefers-reduced-motion` — the clip is paused and the scroll
 *    coupling is dropped.
 *  – Sources order is MP4 → WebM. MP4 is the smaller, more compatible asset
 *    in our encode; WebM is a backup.
 *
 * The video itself stays at its source 100fps; we only downres'd the spatial
 * resolution (480p short edge) during encoding.
 */

interface LockScrollVideoProps {
  mp4Src: string;
  webmSrc?: string;
  /** Tailwind classes for the framed wrapper (size + position). */
  className?: string;
  /** Show the corner mono caption. Defaults true. */
  caption?: string | false;
}

const LockScrollVideo: React.FC<LockScrollVideoProps> = ({
  mp4Src,
  webmSrc,
  className = "",
  caption = "LOCK · RT-MECH · 100 FPS",
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  // Scroll-coupled feel: as the wrapper scrolls through the viewport, the
  // clip subtly drifts up and fades. Range is [enter, leave] expressed
  // relative to the viewport.
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Pause when off-screen
  useEffect(() => {
    const v = videoRef.current;
    const wrap = wrapRef.current;
    if (!v || !wrap) return;

    if (reduced) {
      v.pause();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          v.play().catch(() => {
            /* autoplay blocked — ignore */
          });
        } else {
          v.pause();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <motion.div
      ref={wrapRef}
      style={reduced ? undefined : { y, opacity }}
      className={`relative overflow-hidden border border-white/15 bg-black/40 backdrop-blur-sm ${className}`}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        // We control play/pause via IntersectionObserver above, but autoPlay
        // also helps Safari prime the decoder for in-viewport playback.
        autoPlay
        preload="metadata"
        aria-hidden="true"
        className="block w-full h-full object-cover"
      >
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        <source src={mp4Src} type="video/mp4" />
      </video>

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
