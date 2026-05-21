import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before this Reveal starts animating. Use to stagger siblings. */
  delay?: number;
  /** Pixels of translateY before reveal. Defaults to 24. */
  y?: number;
  /** Once true, never un-reveals when scrolled out (default true). */
  once?: boolean;
  /** Lower threshold = triggers earlier. 0.0-1.0. */
  threshold?: number;
  /** Render as a different element for semantics. */
  as?: "div" | "section" | "article" | "header" | "main";
}

/**
 * Lightweight IntersectionObserver wrapper — fades children in with a small
 * upward translate when first scrolled into view. Honours prefers-reduced-motion.
 *
 * Used everywhere a section's content should feel "deliberate" rather than
 * popping in instantly.
 */
const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  threshold = 0.12,
  as = "div",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  const MotionTag = motion[as] as React.ElementType;

  return (
    <MotionTag
      ref={ref}
      initial={reduced ? false : { opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : reduced ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
