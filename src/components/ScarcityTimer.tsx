import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { trackPixel } from "@/lib/pixel";

const STORAGE_KEY = "checkout_reservation_expires_at";
const RESERVATION_MINUTES = 15;

function getOrCreateExpiry(): number {
  if (typeof window === "undefined") return Date.now() + RESERVATION_MINUTES * 60_000;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (raw) {
    const n = Number(raw);
    if (!Number.isNaN(n) && n > Date.now()) return n;
  }
  const next = Date.now() + RESERVATION_MINUTES * 60_000;
  sessionStorage.setItem(STORAGE_KEY, String(next));
  return next;
}

export function ScarcityTimer() {
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const [expiredFired, setExpiredFired] = useState(false);

  useEffect(() => {
    setExpiresAt(getOrCreateExpiry());
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!expiresAt) return null;
  const ms = Math.max(0, expiresAt - now);
  const expired = ms === 0;

  if (expired && !expiredFired) {
    setExpiredFired(true);
    trackPixel("ReservationExpired", {
      content_name: "CheerDots 2",
    });
  }

  const total = Math.floor(ms / 1000);
  const m = String(Math.floor(total / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");

  if (expired) {
    return (
      <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 text-xs text-amber-200 flex items-start gap-2">
        <Clock className="w-4 h-4 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-100">Reserva expirada</p>
          <p className="mt-0.5 text-amber-200/80">
            Recarregue a página para garantir o lote promocional novamente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/30 p-3 text-xs text-indigo-200 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-indigo-300" />
        <span className="font-inter font-medium">Reserva expira em</span>
      </div>
      <span className="num-display text-base text-white tabular-nums">
        {m}:{s}
      </span>
    </div>
  );
}
