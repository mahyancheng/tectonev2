import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MeshWeaveProps {
  /** Width × height in pixels. Defaults to a wide hero banner ratio. */
  width?: number;
  height?: number;
  /** Cell size of the weave in px (smaller = denser). */
  cell?: number;
  /** Opacity of the static mesh strokes. */
  opacity?: number;
  className?: string;
}

/**
 * Hairline SS304 weave visualization. Each strand is a thin horizontal/vertical
 * stroke. A subtle "scan" gradient sweeps across to suggest dynamic measurement —
 * like a CAD diagram coming alive.
 */
const MeshWeave: React.FC<MeshWeaveProps> = ({
  width = 1200,
  height = 320,
  cell = 16,
  opacity = 0.22,
  className,
}) => {
  const reduced = useReducedMotion();

  // Generate strand positions
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const verticals = Array.from({ length: cols + 1 }, (_, i) => i * cell);
  const horizontals = Array.from({ length: rows + 1 }, (_, i) => i * cell);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Vignette so strands fade near the edges — keeps it from looking like a hard wallpaper */}
        <radialGradient id="mw-fade" cx="50%" cy="50%" r="62%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="70%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>

        {/* Scan sweep — gradient that we'll animate across via translateX */}
        <linearGradient id="mw-scan" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        <mask id="mw-mask">
          <rect width={width} height={height} fill="url(#mw-fade)" />
        </mask>
      </defs>

      {/* Static weave */}
      <g mask="url(#mw-mask)" stroke="white" strokeWidth="0.6" opacity={opacity}>
        {verticals.map((x) => (
          <line key={`v${x}`} x1={x} y1={0} x2={x} y2={height} />
        ))}
        {horizontals.map((y) => (
          <line key={`h${y}`} x1={0} y1={y} x2={width} y2={y} />
        ))}
      </g>

      {/* Animated scan sweep — pure CSS-like motion, kept subtle */}
      {!reduced && (
        <motion.rect
          x={-width * 0.4}
          y={0}
          width={width * 0.4}
          height={height}
          fill="url(#mw-scan)"
          mask="url(#mw-mask)"
          opacity={0.18}
          animate={{ x: [-width * 0.4, width] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 4,
          }}
        />
      )}
    </svg>
  );
};

export default MeshWeave;
