import React, { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

interface CountUpProps {
  /** Target number — supports decimals (e.g. 4.9). */
  to: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Decimal places to display. Auto-detected from `to` if omitted. */
  decimals?: number;
  /** String prepended after the number — e.g. "+", "★", "K". */
  suffix?: string;
  /** Use thousands separator (5,124). */
  separator?: boolean;
  className?: string;
}

/**
 * Tick a numeral up from 0 to the target value when first scrolled into
 * view. Respects prefers-reduced-motion — renders the final value instantly.
 */
const CountUp: React.FC<CountUpProps> = ({
  to,
  duration = 1.6,
  decimals,
  suffix = "",
  separator = true,
  className,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [played, setPlayed] = useState(false);
  const reduced = useReducedMotion();

  const fixed = decimals ?? (Number.isInteger(to) ? 0 : 1);
  const format = (n: number) => {
    const s = n.toFixed(fixed);
    if (!separator || fixed > 0) return s;
    return Number(s).toLocaleString("en-US");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const node = ref.current;
    if (!node) return;

    if (reduced) {
      node.textContent = format(to);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) {
          setPlayed(true);
          const controls = animate(0, to, {
            duration,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (value) => {
              if (node) node.textContent = format(value);
            },
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, duration, played, reduced]);

  return (
    <span className={className}>
      <span ref={ref}>{reduced ? format(to) : "0"}</span>
      {suffix}
    </span>
  );
};

export default CountUp;
