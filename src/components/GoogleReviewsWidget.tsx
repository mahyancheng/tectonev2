import { useEffect, useRef, useState } from "react";

type Props = {
  appId: string;
  className?: string;
};

export default function GoogleReviewsWidget({ appId, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadedRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // ✅ 防止 SSR mismatch
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const loadScript = () => {
      if (loadedRef.current) return;
      loadedRef.current = true;

      if (!document.querySelector('script[data-elfsight-platform="true"]')) {
        const s = document.createElement("script");
        s.src = "https://apps.elfsight.com/p/platform.js";
        s.defer = true;
        s.setAttribute("data-elfsight-platform", "true");

        s.onload = () => {
          if ((window as any).Elfsight) {
            (window as any).Elfsight.init();
          }
        };

        document.body.appendChild(s);
      }
    };

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0].isIntersecting) {
          loadScript();
          obs.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [mounted, appId]);

  const finalClass = appId.startsWith("elfsight-app-")
    ? appId
    : `elfsight-app-${appId}`;

  return (
    <div ref={containerRef} className={className} style={{ minHeight: 200 }}>
      {mounted && <div className={finalClass} />}
    </div>
  );
}
