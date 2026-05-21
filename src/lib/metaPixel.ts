type FbqArgs = unknown[];
declare global {
  interface Window {
    fbq?: (...args: FbqArgs) => void;
    _fbq?: unknown;
  }
}

const PIXEL_ID =
  (typeof import.meta !== "undefined" &&
    (import.meta as ImportMeta & { env: Record<string, string | undefined> }).env
      ?.VITE_META_PIXEL_ID) ||
  "";

let injected = false;

export function initMetaPixel(): void {
  if (typeof window === "undefined" || injected || !PIXEL_ID) return;
  injected = true;

  // Standard Meta Pixel base code.
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (function (f: any, b: Document, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function (...args: FbqArgs) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode?.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable @typescript-eslint/no-explicit-any */

  window.fbq?.("init", PIXEL_ID);
  window.fbq?.("track", "PageView");
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  if (!PIXEL_ID || !window.fbq) return;
  window.fbq("track", name, params);
}
