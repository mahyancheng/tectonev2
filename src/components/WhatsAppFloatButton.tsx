import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  phoneE164: string; // 例如 6591234567（不要加 +）
  defaultMessage?: string;
};

export default function WhatsAppChatWidget({
  phoneE164,
  defaultMessage = "Hi! I’d like to get an instant quote.",
}: Props) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(defaultMessage);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const waUrl = useMemo(
    () => `https://wa.me/${phoneE164}?text=${encodeURIComponent(msg)}`,
    [phoneE164, msg]
  );

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-5 right-5 z-[9999]">
      {/* ✅ 弹窗用 absolute 挂在按钮上面：不会影响按钮位置 */}
      {open && (
        <div className="absolute bottom-full right-0 mb-3 w-[320px] rounded-2xl shadow-2xl border border-white/15 bg-black/95 backdrop-blur-xl overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-[#25D366] text-white flex justify-between items-center">
            <div>
              <div className="text-sm font-semibold">Tectone Renex Steel</div>
              <div className="text-xs opacity-90">Sales Team • Typically replies fast</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="h-8 w-8 grid place-items-center rounded-full text-white hover:bg-white/15"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="mb-3 text-sm text-white/85 bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 inline-block">
              Hi 👋 How can we help you?
            </div>

            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={3}
              className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-[#25D366]/40 transition-colors"
            />

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white py-2.5 text-sm font-semibold hover:opacity-90"
            >
              Continue on WhatsApp
            </a>

            <div className="mt-2 text-[11px] text-white/45">
              Opens WhatsApp Web / App
            </div>
          </div>
        </div>
      )}

      {/* ✅ 按钮永远固定在这里，不会被弹窗影响 */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl grid place-items-center hover:opacity-90"
        aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.93.57 3.82 1.65 5.43L2 22l4.8-1.74a9.86 9.86 0 0 0 5.24 1.5h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Z"
          />
        </svg>
      </button>
    </div>,
    document.body
  );
}
