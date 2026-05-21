import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface GlyphProps {
  active?: boolean;
  className?: string;
}

/**
 * Hairline white-on-black product schematics. Each one has a small mechanism
 * animation that plays on hover OR when `active` is true (used by the
 * configurator preview).
 */

const STROKE = "white";
const STROKE_OP = 0.85;
const SW = 1.25;
const ease = [0.22, 1, 0.36, 1] as const;

/** Wrapper that supplies viewBox + grid + the mesh fill behind the mechanism. */
function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* faint corner crops + grid tick */}
      <g stroke={STROKE} strokeWidth="0.6" strokeOpacity="0.25" fill="none">
        <path d="M 6 0 L 0 0 L 0 6" />
        <path d="M 114 0 L 120 0 L 120 6" />
        <path d="M 0 114 L 0 120 L 6 120" />
        <path d="M 120 114 L 120 120 L 114 120" />
      </g>
      {children}
    </svg>
  );
}

/** Reusable woven-mesh fill for the door / window panes. */
function MeshFill({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const lines: React.ReactNode[] = [];
  const step = 3;
  for (let i = step; i < w; i += step) {
    lines.push(<line key={`v${i}`} x1={x + i} y1={y} x2={x + i} y2={y + h} stroke={STROKE} strokeWidth="0.25" strokeOpacity="0.45" />);
  }
  for (let i = step; i < h; i += step) {
    lines.push(<line key={`h${i}`} x1={x} y1={y + i} x2={x + w} y2={y + i} stroke={STROKE} strokeWidth="0.25" strokeOpacity="0.45" />);
  }
  return <g>{lines}</g>;
}

/* ─────────────────────────────────────────────────────────── */
/* RT-107 — Swing Door: leaf hinges open on the right         */
/* ─────────────────────────────────────────────────────────── */
export const GlyphSwingDoor: React.FC<GlyphProps> = ({ active, className }) => {
  const reduced = useReducedMotion();
  return (
    <Frame className={className}>
      {/* frame */}
      <rect x="20" y="14" width="80" height="92" stroke={STROKE} strokeOpacity={STROKE_OP} strokeWidth={SW} fill="none" />
      {/* leaf — pivots around the left hinge (x=22) */}
      <motion.g
        style={{ transformOrigin: "22px 60px" }}
        animate={reduced ? false : active ? { rotateY: -35 } : { rotateY: 0 }}
        transition={{ duration: 1.6, ease }}
      >
        <rect x="22" y="16" width="76" height="88" stroke={STROKE} strokeOpacity={STROKE_OP} strokeWidth={SW} fill="none" />
        <MeshFill x={22} y={16} w={76} h={88} />
        {/* handle */}
        <line x1="90" y1="56" x2="90" y2="68" stroke={STROKE} strokeWidth={SW} strokeOpacity={STROKE_OP} />
        {/* hinge dots */}
        <circle cx="22" cy="28" r="1.4" fill={STROKE} fillOpacity={STROKE_OP} />
        <circle cx="22" cy="92" r="1.4" fill={STROKE} fillOpacity={STROKE_OP} />
      </motion.g>
    </Frame>
  );
};

/* ─────────────────────────────────────────────────────────── */
/* RT-104 — Folding Door: 3 leaves accordion right             */
/* ─────────────────────────────────────────────────────────── */
export const GlyphFoldingDoor: React.FC<GlyphProps> = ({ active, className }) => {
  const reduced = useReducedMotion();
  const closedX = [20, 47, 74];
  const openX = [20, 35, 50];
  return (
    <Frame className={className}>
      <rect x="20" y="14" width="80" height="92" stroke={STROKE} strokeOpacity={STROKE_OP} strokeWidth={SW} fill="none" />
      {/* track */}
      <line x1="20" y1="14" x2="100" y2="14" stroke={STROKE} strokeWidth="0.6" strokeOpacity="0.5" strokeDasharray="2 2" />
      {[0, 1, 2].map((i) => (
        <motion.g
          key={i}
          animate={reduced ? false : active ? { x: openX[i] - closedX[i] } : { x: 0 }}
          transition={{ duration: 1.4, ease, delay: i * 0.08 }}
        >
          <rect x={closedX[i]} y="16" width="26" height="88" stroke={STROKE} strokeOpacity={STROKE_OP} strokeWidth={SW} fill="none" />
          <MeshFill x={closedX[i]} y={16} w={26} h={88} />
        </motion.g>
      ))}
    </Frame>
  );
};

/* ─────────────────────────────────────────────────────────── */
/* RT-105 — Sliding Door: right leaf slides behind left        */
/* ─────────────────────────────────────────────────────────── */
export const GlyphSlidingDoor: React.FC<GlyphProps> = ({ active, className }) => {
  const reduced = useReducedMotion();
  return (
    <Frame className={className}>
      <rect x="14" y="14" width="92" height="92" stroke={STROKE} strokeOpacity={STROKE_OP} strokeWidth={SW} fill="none" />
      <line x1="14" y1="14" x2="106" y2="14" stroke={STROKE} strokeWidth="0.6" strokeOpacity="0.5" strokeDasharray="2 2" />
      <line x1="14" y1="106" x2="106" y2="106" stroke={STROKE} strokeWidth="0.6" strokeOpacity="0.5" strokeDasharray="2 2" />
      {/* left leaf */}
      <g>
        <rect x="14" y="16" width="44" height="88" stroke={STROKE} strokeOpacity={STROKE_OP} strokeWidth={SW} fill="none" />
        <MeshFill x={14} y={16} w={44} h={88} />
      </g>
      {/* right leaf — slides left to overlap */}
      <motion.g
        animate={reduced ? false : active ? { x: -32 } : { x: 0 }}
        transition={{ duration: 1.6, ease }}
      >
        <rect x="62" y="16" width="44" height="88" stroke={STROKE} strokeOpacity={STROKE_OP} strokeWidth={SW} fill="none" />
        <MeshFill x={62} y={16} w={44} h={88} />
      </motion.g>
    </Frame>
  );
};

/* ─────────────────────────────────────────────────────────── */
/* RT-103 — Casement Window: pane swings open at top hinge     */
/* ─────────────────────────────────────────────────────────── */
export const GlyphCasementWindow: React.FC<GlyphProps> = ({ active, className }) => {
  const reduced = useReducedMotion();
  return (
    <Frame className={className}>
      <rect x="22" y="22" width="76" height="76" stroke={STROKE} strokeOpacity={STROKE_OP} strokeWidth={SW} fill="none" />
      {/* mullion */}
      <line x1="60" y1="22" x2="60" y2="98" stroke={STROKE} strokeWidth="0.6" strokeOpacity="0.4" />
      <line x1="22" y1="60" x2="98" y2="60" stroke={STROKE} strokeWidth="0.6" strokeOpacity="0.4" />
      {/* right pane pivots — left edge as hinge */}
      <motion.g
        style={{ transformOrigin: "60px 60px" }}
        animate={reduced ? false : active ? { rotateY: 40 } : { rotateY: 0 }}
        transition={{ duration: 1.6, ease }}
      >
        <rect x="60" y="22" width="38" height="76" stroke={STROKE} strokeOpacity={STROKE_OP} strokeWidth={SW} fill="none" />
        <MeshFill x={60} y={22} w={38} h={76} />
      </motion.g>
      {/* left pane stays put */}
      <MeshFill x={22} y={22} w={38} h={76} />
    </Frame>
  );
};

/* ─────────────────────────────────────────────────────────── */
/* RT-106 — Sliding Window: horizontal sash slides             */
/* ─────────────────────────────────────────────────────────── */
export const GlyphSlidingWindow: React.FC<GlyphProps> = ({ active, className }) => {
  const reduced = useReducedMotion();
  return (
    <Frame className={className}>
      <rect x="14" y="34" width="92" height="52" stroke={STROKE} strokeOpacity={STROKE_OP} strokeWidth={SW} fill="none" />
      <line x1="14" y1="34" x2="106" y2="34" stroke={STROKE} strokeWidth="0.6" strokeOpacity="0.5" strokeDasharray="2 2" />
      <line x1="14" y1="86" x2="106" y2="86" stroke={STROKE} strokeWidth="0.6" strokeOpacity="0.5" strokeDasharray="2 2" />
      <g>
        <rect x="14" y="36" width="44" height="48" stroke={STROKE} strokeOpacity={STROKE_OP} strokeWidth={SW} fill="none" />
        <MeshFill x={14} y={36} w={44} h={48} />
      </g>
      <motion.g
        animate={reduced ? false : active ? { x: -32 } : { x: 0 }}
        transition={{ duration: 1.6, ease }}
      >
        <rect x="62" y="36" width="44" height="48" stroke={STROKE} strokeOpacity={STROKE_OP} strokeWidth={SW} fill="none" />
        <MeshFill x={62} y={36} w={44} h={48} />
      </motion.g>
    </Frame>
  );
};

/* ─────────────────────────────────────────────────────────── */
/* RT-102 — Fixed Screen: mesh draws itself in                 */
/* ─────────────────────────────────────────────────────────── */
export const GlyphFixedScreen: React.FC<GlyphProps> = ({ active, className }) => {
  const reduced = useReducedMotion();
  return (
    <Frame className={className}>
      <rect x="20" y="20" width="80" height="80" stroke={STROKE} strokeOpacity={STROKE_OP} strokeWidth={SW} fill="none" />
      <motion.g
        animate={reduced ? false : active ? { opacity: [0, 1] } : { opacity: 1 }}
        transition={{ duration: 1.4, ease }}
      >
        <MeshFill x={20} y={20} w={80} h={80} />
      </motion.g>
      {/* fixed corner brackets */}
      {[
        [22, 22], [98, 22], [22, 98], [98, 98],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.4" fill={STROKE} fillOpacity={STROKE_OP} />
      ))}
    </Frame>
  );
};

/* ─────────────────────────────────────────────────────────── */
/* RT-108 — Top Hung: pane tilts outward from top              */
/* ─────────────────────────────────────────────────────────── */
export const GlyphTopHung: React.FC<GlyphProps> = ({ active, className }) => {
  const reduced = useReducedMotion();
  return (
    <Frame className={className}>
      <rect x="22" y="32" width="76" height="56" stroke={STROKE} strokeOpacity={STROKE_OP} strokeWidth={SW} fill="none" />
      {/* top hinge line */}
      <line x1="22" y1="32" x2="98" y2="32" stroke={STROKE} strokeWidth="0.8" strokeOpacity={STROKE_OP} />
      <motion.g
        style={{ transformOrigin: "60px 32px" }}
        animate={reduced ? false : active ? { rotateX: -32 } : { rotateX: 0 }}
        transition={{ duration: 1.6, ease }}
      >
        <rect x="22" y="32" width="76" height="56" stroke={STROKE} strokeOpacity={STROKE_OP} strokeWidth={SW} fill="none" />
        <MeshFill x={22} y={32} w={76} h={56} />
      </motion.g>
      {/* arm/stay */}
      <line x1="60" y1="88" x2="60" y2="98" stroke={STROKE} strokeWidth="0.6" strokeOpacity="0.55" />
    </Frame>
  );
};

/** Lookup by product id prefix (e.g. "107", "104", etc.) */
export function glyphFor(idPrefix: string): React.FC<GlyphProps> {
  switch (idPrefix) {
    case "107": return GlyphSwingDoor;
    case "104": return GlyphFoldingDoor;
    case "105": return GlyphSlidingDoor;
    case "103": return GlyphCasementWindow;
    case "106": return GlyphSlidingWindow;
    case "102": return GlyphFixedScreen;
    case "108": return GlyphTopHung;
    default: return GlyphFixedScreen;
  }
}
