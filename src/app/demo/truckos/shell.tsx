"use client";

import { BUSINESSES, type BusinessKey } from "./data";
import { CustomerView } from "./customer";
import { StaffView } from "./staff";
import { useStore } from "./store";

/**
 * The one line most visitors read, so it spends itself on the feature being
 * sold rather than the one that's easiest to find.
 *
 * The demo opens on the customer view, and ordering is self-evident there —
 * there's a menu, there's a cart bar, people know what to do with those. The
 * parking spot at the top reads as a static fact unless something says it
 * isn't, and moving the truck from a phone is the whole claim, so that is what
 * the truck's hints point at. The bakery doesn't move; its hints stay on the
 * counter work.
 */
const HINTS: Record<BusinessKey, { customer: string; staff: string }> = {
  truck: {
    customer:
      "That parking spot up top is set from a phone. Open Your screen and move the truck.",
    staff: "Tap a different spot, then Customer view — the site already moved.",
  },
  bakery: {
    customer:
      "Order a few conchas — then switch to Your screen and box them up.",
    staff:
      "Add this week's bread, or sell out the conchas — then check Customer view.",
  },
};

export function Shell() {
  const s = useStore();
  const biz = BUSINESSES[s.business];

  return (
    <div className="min-h-screen bg-[#0f0b0a]">
      {/* ── Demo chrome ─────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f0b0a]/95 backdrop-blur-lg">
        <div className="mx-auto max-w-3xl px-4 py-2.5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">
              foundos<span style={{ color: biz.accent }}>.</span>ai — demo
            </span>
            <div className="flex gap-1 rounded-lg bg-white/8 p-0.5">
              {(Object.keys(BUSINESSES) as BusinessKey[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => s.setBusiness(k)}
                  className="rounded-md px-2.5 py-1.5 text-[11px] font-bold transition"
                  style={{
                    background: s.business === k ? BUSINESSES[k].accent : "transparent",
                    color: s.business === k ? "#fff" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {BUSINESSES[k].kind}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-1 rounded-xl bg-white/8 p-1">
            <button
              type="button"
              onClick={() => s.setView("customer")}
              className="rounded-lg py-2.5 text-xs font-bold transition"
              style={{
                background: s.view === "customer" ? "#fff" : "transparent",
                color: s.view === "customer" ? "#0f0b0a" : "rgba(255,255,255,0.55)",
              }}
            >
              What your customer sees
            </button>
            <button
              type="button"
              onClick={() => s.setView("staff")}
              className="rounded-lg py-2.5 text-xs font-bold transition"
              style={{
                background: s.view === "staff" ? "#fff" : "transparent",
                color: s.view === "staff" ? "#0f0b0a" : "rgba(255,255,255,0.55)",
              }}
            >
              Your screen
            </button>
          </div>

          <p className="mt-2 text-center text-[11px] leading-snug text-white/30">
            {HINTS[s.business][s.view]}
          </p>
        </div>
      </header>

      {s.view === "customer" ? <CustomerView /> : <StaffView />}

      {/* ── Toast ───────────────────────────────────── */}
      {s.toast ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex justify-center px-4">
          <div
            className="rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-2xl"
            style={{ background: biz.accent }}
          >
            {s.toast}
          </div>
        </div>
      ) : null}
    </div>
  );
}
