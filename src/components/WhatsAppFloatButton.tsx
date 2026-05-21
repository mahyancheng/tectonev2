import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

/**
 * FloatingCTA — bottom-centered two-button bar inspired by the Kova site.
 *
 * Replaces the previous WhatsApp green-bubble floater. Two pills:
 *   1. Configure  →  /quote  (drives users into the catalog configurator)
 *   2. Contact us →  WhatsApp deep link (keeps the original conversion path)
 *
 * The file still exports `WhatsAppChatWidget` so existing call sites
 * (Layout.tsx, LandingPageLayout.tsx) keep working without import changes.
 * The `phoneE164` prop is preserved for the same reason — only its usage
 * has changed (now wired into the "Contact us" pill).
 */

type Props = {
  /** Singapore phone in E.164 without the +, e.g. "6596771199". */
  phoneE164: string;
  /** Pre-fills the WhatsApp message. */
  defaultMessage?: string;
};

export default function WhatsAppChatWidget({
  phoneE164,
  defaultMessage = "Hi! I'd like to get a quote.",
}: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const waUrl = `https://wa.me/${phoneE164}?text=${encodeURIComponent(defaultMessage)}`;

  return createPortal(
    <div
      // Fixed, bottom-centered, lifts above iOS home indicator with safe-area.
      // pointer-events-none on the wrapper so the empty horizontal gutter
      // stays click-through; the bar itself re-enables pointer events.
      className="fixed inset-x-0 bottom-5 md:bottom-7 z-[9999] flex justify-center pointer-events-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div
        role="navigation"
        aria-label="Quick actions"
        className="pointer-events-auto flex items-center gap-2 p-1 rounded-full border border-white/15 bg-black/80 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
      >
        {/* Configure — primary (filled white pill) */}
        <Link
          to="/quote"
          className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-5 md:px-6 py-2.5 text-[12px] md:text-[13px] font-mono tracking-[0.18em] uppercase hover:bg-white/90 transition-colors"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-black/80" />
          Configure
          <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
        </Link>

        {/* Contact us — secondary (ghost pill, links to WhatsApp) */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
          className="group inline-flex items-center gap-2 rounded-full bg-transparent text-white px-5 md:px-6 py-2.5 text-[12px] md:text-[13px] font-mono tracking-[0.18em] uppercase hover:bg-white/[0.08] transition-colors"
        >
          {/* tiny telemetry dot in brand-white instead of WhatsApp green */}
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/85" />
          Contact us
          <span aria-hidden className="ml-1 text-white/55 group-hover:text-white/85 transition-colors">↗</span>
        </a>
      </div>
    </div>,
    document.body
  );
}
