import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EnhancedQuoteCalculator from "./EnhancedQuoteCalculator";
import { glyphFor } from "./visuals/ProductGlyph";

/** Small util: detect pointer support — we only enable hover-to-open on
 *  devices with a real pointer (mouse / trackpad). Touch / coarse pointers
 *  fall back to click-to-toggle so taps don't leave rows stuck open. */
function useHasHover() {
  const [hasHover, setHasHover] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHasHover(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return hasHover;
}

/* ─────────────────────────────────────────────────────────────────
   CatalogAccordion
   Single source of truth for the "click-to-configure" product list.
   Rendered identically on HomePage § 02, /our-product, /quote, and
   the security route pages.

   Each row:
   – RT-code · spec
   – animated ProductGlyph
   – right-side ↗ that hard-redirects to the product detail page
     (stops propagation so it doesn't toggle the accordion)
   – chevron toggles inline EnhancedQuoteCalculator (compact)
     pre-loaded for that product.

   Only one row can be open at a time.
   ───────────────────────────────────────────────────────────────── */

export type CatalogProduct = {
  /** Bare three-digit id, e.g. "107". Used for glyph lookup. */
  id: string;
  /** RT code shown in the row meta line, e.g. "RT-107". */
  code: string;
  /** Display name, e.g. "Insect Screen Swing Door". */
  name: string;
  /** Short spec line — fits next to the code in the row header. */
  spec: string;
};

/** The canonical seven openings — keep in sync with ProductData.tsx. */
export const PRODUCT_CATALOG: CatalogProduct[] = [
  { id: "107", code: "RT-107", name: "Insect Screen Swing Door", spec: "SS304 · 11mm × 11mm" },
  { id: "104", code: "RT-104", name: "Insect Screen Folding Door", spec: "Multi-leaf · folds flush" },
  { id: "105", code: "RT-105", name: "Insect Screen Sliding Door", spec: "Track system · soft-close" },
  { id: "103", code: "RT-103", name: "Casement Window", spec: "Side-hinged · max airflow" },
  { id: "106", code: "RT-106", name: "Insect Screen Sliding Window", spec: "Horizontal · concealed track" },
  { id: "102", code: "RT-102", name: "Fixed Insect Screen", spec: "Frame-fixed · permanent" },
  { id: "108", code: "RT-108", name: "Top Hung", spec: "Top-pivot · awning type" },
];

const SLUG_BY_ID: Record<string, string> = {
  "107": "security-swing-door",
  "104": "security-folding-door",
  "105": "security-sliding-door",
  "103": "security-casement-window",
  "106": "security-sliding-window",
  "102": "fixed-screen",
  "108": "security-top-hung",
};

export const productRoute = (id: string) =>
  `/our-product/product/${id}-${SLUG_BY_ID[id] ?? "security-swing-door"}`;
export const productFullId = (id: string) =>
  `${id}-${SLUG_BY_ID[id] ?? "security-swing-door"}`;

type GlyphComp = React.FC<{ active?: boolean; className?: string }>;

interface CatalogRowProps {
  to: string;
  fullId: string;
  idx: number;
  name: string;
  code: string;
  spec: string;
  Glyph: GlyphComp;
  isOpen: boolean;
  isPinned: boolean;
  hoverMode: boolean;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
  /** Called when the row header is clicked or activated via keyboard.
   *  Acts as a manual toggle (esp. for touch / coarse pointers). */
  onHeaderActivate: () => void;
  /** Called for any click inside the expanded body — pins this row open. */
  onContentInteract: () => void;
}

const CatalogRow: React.FC<CatalogRowProps> = ({
  to,
  fullId,
  idx,
  name,
  code,
  spec,
  Glyph,
  isOpen,
  isPinned,
  hoverMode,
  onHoverEnter,
  onHoverLeave,
  onHeaderActivate,
  onContentInteract,
}) => {
  return (
    <div
      className={`border-b border-white/10 ${isOpen ? "bg-white/[0.02]" : ""}`}
      onMouseEnter={hoverMode ? onHoverEnter : undefined}
      onMouseLeave={hoverMode ? onHoverLeave : undefined}
    >
      <div
        className="group grid grid-cols-[36px_56px_1fr_auto_auto] items-center gap-3 md:gap-6 py-5 md:py-6 px-1 hover:bg-white/[0.02] transition-colors cursor-pointer"
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={onHeaderActivate}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onHeaderActivate();
          }
        }}
      >
        <span className="font-mono text-[11px] text-white/50 tracking-[0.10em]">
          {String(idx).padStart(2, "0")}
        </span>
        <div className="h-12 w-12 -mx-1.5">
          <Glyph active={isOpen} className="w-full h-full" />
        </div>
        <span
          className={`font-serif font-medium tracking-tight text-white text-lg md:text-2xl ${
            isOpen
              ? "underline underline-offset-[6px] decoration-1"
              : "group-hover:underline group-hover:underline-offset-[6px] group-hover:decoration-1"
          }`}
        >
          {name}
        </span>
        <span className="hidden md:inline font-mono text-[11px] text-white/55 tracking-[0.10em] uppercase whitespace-nowrap text-right">
          {code} · {spec}
          {isPinned && (
            <span className="ml-3 inline-flex items-center gap-1 text-white/85">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/85" />
              PINNED
            </span>
          )}
        </span>
        <div className="flex items-center gap-2">
          <Link
            to={to}
            aria-label={`Open detail page for ${name}`}
            onClick={(e) => e.stopPropagation()}
            className="h-9 w-9 inline-flex items-center justify-center border border-white/15 hover:border-white/60 hover:bg-white/[0.06] transition-colors group/btn"
            title="Open product detail page"
          >
            <ArrowUpRight className="h-4 w-4 text-white/70 group-hover/btn:text-white" />
          </Link>
          <span
            aria-hidden
            className={`h-9 w-9 inline-flex items-center justify-center border border-white/15 transition-transform ${
              isOpen ? "rotate-180 bg-white/[0.04]" : ""
            }`}
          >
            <ChevronDown className="h-4 w-4 text-white/70" />
          </span>
        </div>
      </div>

      {/* Mobile-only meta line — hidden in row above on small screens */}
      <div className="md:hidden -mt-3 pb-2 pl-[100px] font-mono text-[10px] tracking-[0.12em] uppercase text-white/40">
        {code} · {spec}
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="py-8 md:py-10 grid grid-cols-1 sm:grid-cols-[minmax(200px,35%)_1fr] gap-6 sm:gap-8 md:gap-12 items-start"
              // Any pointer down or focus inside the expanded body pins this
              // row open — so the user can interact with the calculator
              // without the row collapsing when their cursor wanders.
              onPointerDownCapture={onContentInteract}
              onFocusCapture={onContentInteract}
            >
              <div className="relative aspect-square w-full max-w-[360px] mx-auto sm:mx-0 border border-white/10 bg-black/40">
                <Glyph active className="w-full h-full" />
                <div className="corner-mark left-3 top-3">{code}</div>
                <div className="corner-mark right-3 bottom-3 text-right max-w-[60%] leading-tight">
                  {spec}
                </div>
              </div>

              <div className="flex flex-col min-w-0">
                <EnhancedQuoteCalculator initialProductId={fullId} compact />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface CatalogAccordionProps {
  /** Optional id to open by default. */
  defaultOpenId?: string | null;
  /** Custom product list — defaults to the canonical seven. */
  items?: CatalogProduct[];
  className?: string;
}

const CatalogAccordion: React.FC<CatalogAccordionProps> = ({
  defaultOpenId = null,
  items = PRODUCT_CATALOG,
  className = "",
}) => {
  const hoverMode = useHasHover();

  // The currently expanded row. Driven by hover by default; clicks inside
  // the expanded body promote it to "pinned" (see below) so subsequent
  // mouse-outs don't auto-collapse it.
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  // The row the user has actively engaged with (clicked / focussed
  // inside the body). Pinned rows survive a mouse-leave; they're only
  // displaced when the user explicitly hovers a *different* row.
  //
  // We mirror the state into a ref so the close-timer (which can fire on
  // a stale closure) and the leave handler always read the *latest*
  // pinned value. Without this there's a 1-frame race where the user can
  // click an input (queueing setPinnedId) AND move the mouse off in the
  // same tick — the leave handler closes over the old `null` pinnedId
  // and schedules a close that fires before React re-renders with the
  // pin applied. Reading via ref eliminates the window entirely.
  const [pinnedId, setPinnedIdState] = useState<string | null>(null);
  const pinnedIdRef = useRef<string | null>(null);
  const setPinnedId = useCallback((id: string | null) => {
    pinnedIdRef.current = id;
    setPinnedIdState(id);
  }, []);

  // Debounce for hover-out → close. Cancelled if pointer re-enters
  // another row before it fires — that's the "hover across to another
  // row" case, which we resolve by swapping `openId` to the new row.
  const closeTimer = useRef<number | null>(null);
  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  // Clean up on unmount.
  useEffect(() => () => cancelClose(), [cancelClose]);

  const handleHoverEnter = useCallback(
    (id: string) => {
      cancelClose();
      // Once a row is pinned, hover events on OTHER rows are ignored —
      // the user is in the middle of typing / focusing inside the pinned
      // row, and the cursor passing over a different row's header
      // shouldn't yank their work away. The only way to switch rows
      // from a pinned state is to click the new row's header.
      if (pinnedIdRef.current !== null && pinnedIdRef.current !== id) return;
      if (id !== openId) {
        setOpenId(id);
      }
    },
    [cancelClose, openId]
  );

  const handleHoverLeave = useCallback(
    (id: string) => {
      // Read latest pin via ref (see comment above the useRef).
      if (pinnedIdRef.current === id) return;
      // Pinned elsewhere? Also ignore — another row's pin is holding
      // the accordion state, this leave is irrelevant.
      if (pinnedIdRef.current !== null) return;
      cancelClose();
      closeTimer.current = window.setTimeout(() => {
        // Re-check the pin when the timer fires — the user may have
        // clicked inside the body during the 140ms debounce, which is
        // their signal to "keep this open".
        if (pinnedIdRef.current !== null) {
          closeTimer.current = null;
          return;
        }
        setOpenId((cur) => (cur === id ? null : cur));
        closeTimer.current = null;
      }, 140);
    },
    [cancelClose]
  );

  const handleHeaderActivate = useCallback(
    (id: string) => {
      // Click / Enter / Space on the row header is the explicit gesture
      // that overrides hover-state. Two cases:
      //   – same row clicked → toggle closed (and drop pin)
      //   – different row clicked → switch to it (and drop any pin on
      //     the previous row, since the user explicitly chose to move on)
      cancelClose();
      if (openId === id) {
        if (pinnedIdRef.current === id) setPinnedId(null);
        setOpenId(null);
      } else {
        setPinnedId(null); // explicit switch clears prior pin
        setOpenId(id);
        if (!hoverMode) setPinnedId(id); // touch: header tap pins by default
      }
    },
    [openId, hoverMode, cancelClose, setPinnedId]
  );

  const handleContentInteract = useCallback(
    (id: string) => {
      // Any pointer-down / focus inside the expanded body pins this row open.
      // Also kill any in-flight close timer so we don't lose the row while
      // the user is typing.
      cancelClose();
      setPinnedId(id);
    },
    [cancelClose, setPinnedId]
  );

  return (
    <div className={`border-t border-white/10 ${className}`}>
      {items.map((p, i) => {
        const Glyph = glyphFor(p.id);
        const isOpen = openId === p.id;
        return (
          <CatalogRow
            key={p.id}
            to={productRoute(p.id)}
            fullId={productFullId(p.id)}
            idx={i + 1}
            name={p.name}
            code={p.code}
            spec={p.spec}
            Glyph={Glyph}
            isOpen={isOpen}
            isPinned={pinnedId === p.id}
            hoverMode={hoverMode}
            onHoverEnter={() => handleHoverEnter(p.id)}
            onHoverLeave={() => handleHoverLeave(p.id)}
            onHeaderActivate={() => handleHeaderActivate(p.id)}
            onContentInteract={() => handleContentInteract(p.id)}
          />
        );
      })}
    </div>
  );
};

export default CatalogAccordion;
