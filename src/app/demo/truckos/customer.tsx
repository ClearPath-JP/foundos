"use client";

import { useMemo, useState } from "react";
import { BAKERY_HOURS, BUSINESSES, isOpenAt, money, type Item } from "./data";
import { Photo } from "./photo";
import { useStore } from "./store";

/** What the customer sees on their phone. Same engine for both businesses. */
export function CustomerView() {
  const s = useStore();
  const biz = BUSINESSES[s.business];
  const [checkout, setCheckout] = useState(false);

  // Items promoted into the rail above the menu. Sold-out weekly items are
  // deliberately excluded so they fall back into the menu and still read as
  // "sold out" rather than disappearing.
  const freshShown = useMemo(
    () => s.currentItems.filter((i) => i.fresh && !i.soldOut),
    [s.currentItems],
  );
  const freshIds = useMemo(
    () => new Set(freshShown.map((i) => i.id)),
    [freshShown],
  );

  // Don't list anything the rail is already showing.
  const sections = useMemo(() => {
    const map = new Map<string, Item[]>();
    biz.sections.forEach((sec) => {
      const list = s.currentItems.filter(
        (i) => i.section === sec && !freshIds.has(i.id),
      );
      if (list.length) map.set(sec, list);
    });
    return [...map.entries()];
  }, [s.currentItems, biz.sections, freshIds]);

  return (
    <div className="min-h-screen bg-[#0f0b0a] pb-32 text-white">
      <OrderTracker />

      {/* ── Hero ─────────────────────────────────────── */}
      <div className="relative">
        <Photo
          src={biz.heroSrc}
          seed={s.business === "truck" ? "truck-hero" : "bakery-hero"}
          glyph={s.business === "truck" ? "burger" : "bread"}
          className="h-56 w-full sm:h-72"
          rounded="rounded-none"
          sizes="100vw"
          priority
          scrim={false}
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#0f0b0a] via-[#0f0b0a]/50 to-transparent p-5">
          <span
            className="mb-2 w-fit rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{ background: biz.accent, color: "#fff" }}
          >
            {biz.kind}
          </span>
          <h1 className="text-3xl font-black leading-none tracking-tight sm:text-4xl">
            {biz.name}
          </h1>
          <p className="mt-1.5 text-sm text-white/60">{biz.tagline}</p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4">
        {biz.mobile ? <LocationCard /> : <StoreCard />}
        {biz.mobile ? <WeekSchedule /> : <HoursCard />}

        <FreshRail items={freshShown} />

        {/* ── Menu ───────────────────────────────────── */}
        {sections.map(([name, list]) => (
          <section key={name} className="mt-8">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              {name}
            </h2>
            <div className="space-y-2.5">
              {list.map((item) => (
                <MenuRow key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}

        <TextSignup />

        <p className="mt-10 pb-4 text-center text-[11px] leading-relaxed text-white/25">
          Demo build · foundos.ai — sample photography and menu.
          <br />
          Your build uses your food and your words.
        </p>
      </div>

      <CartBar onCheckout={() => setCheckout(true)} />
      {checkout ? <CheckoutSheet onClose={() => setCheckout(false)} /> : null}
    </div>
  );
}

/* ── Live location (truck) ─────────────────────────── */
function LocationCard() {
  const s = useStore();
  const biz = BUSINESSES[s.business];
  return (
    <div
      className="-mt-4 rounded-2xl border p-4 shadow-xl"
      style={{
        background: "#191110",
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
            style={{ background: biz.accent }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ background: biz.accent }}
          />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
          Today · we&apos;re parked at
        </span>
        {/*
          The stamp the whole location feature is for. A customer checking at
          11:40 needs to know this line is from today and not from a website
          nobody has touched since March — so the moment the owner sets the
          spot, the site says when.

          Deliberately absent until they do: `spotAge` is null on a cold load,
          which is also the state public/work/truck.png is captured in, so the
          card renders exactly as it did before.
        */}
        {s.spotAge !== null ? (
          <span
            className="ml-auto text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ color: biz.accent }}
          >
            Updated {s.spotAge === 0 ? "just now" : `${s.spotAge} min ago`}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-xl font-bold leading-tight">{s.spot.name}</p>
      {/* Typed-in spots can arrive with no street address. Don't leave a gap. */}
      {s.spot.address ? (
        <p className="mt-0.5 text-sm text-white/50">{s.spot.address}</p>
      ) : null}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className="rounded-lg px-2.5 py-1.5 text-sm font-semibold"
          style={{ background: biz.accentSoft, color: biz.accent }}
        >
          {s.spot.window}
        </span>
        <button
          type="button"
          onClick={() => s.showToast("Opens Google Maps on a real build.")}
          className="rounded-lg border border-white/15 px-3 py-1.5 text-sm font-semibold text-white/80 transition hover:bg-white/5"
        >
          Directions →
        </button>
      </div>
    </div>
  );
}

/* ── Fixed storefront (bakery) ─────────────────────── */
function StoreCard() {
  const s = useStore();
  const biz = BUSINESSES[s.business];
  return (
    <div
      className="-mt-4 rounded-2xl border p-4 shadow-xl"
      style={{ background: "#191110", borderColor: "rgba(255,255,255,0.1)" }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
            Open today
          </p>
          <p className="mt-1.5 text-xl font-bold leading-tight">8:00am – 9:00pm</p>
          {/* Invented address on a real road, same rule as SPOTS in data.ts —
              believable enough to read as a real bakery, attached to nobody. */}
          <p className="mt-0.5 text-sm text-white/50">
            884 Cobb Pkwy S · Marietta, GA
          </p>
        </div>
        <span
          className="rounded-lg px-2.5 py-1.5 text-xs font-bold"
          style={{ background: biz.accentSoft, color: biz.accent }}
        >
          Fresh bread 7am · 1pm · 5pm
        </span>
      </div>
    </div>
  );
}

/* ── The week ahead (truck) ────────────────────────── */
function WeekSchedule() {
  const s = useStore();
  const biz = BUSINESSES[s.business];

  return (
    <section className="mt-5 rounded-2xl border border-white/10 bg-[#191110] p-4">
      <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
        Where we&apos;ll be this week
      </h2>
      <div className="space-y-1">
        {s.week.map((d, i) => {
          const spot = s.spotById(d.spotId);
          const today = s.todayIndex === i;
          return (
            <div
              key={d.day}
              className="flex items-baseline gap-3 rounded-lg px-2 py-1.5"
              style={today ? { background: biz.accentSoft } : undefined}
            >
              <span
                className="w-9 shrink-0 text-[11px] font-bold uppercase tracking-wider"
                style={{ color: today ? biz.accent : "rgba(255,255,255,0.35)" }}
              >
                {d.short}
              </span>
              {spot ? (
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-[13px] leading-tight ${
                      today ? "font-bold text-white" : "text-white/70"
                    }`}
                  >
                    {spot.name}
                  </p>
                  <p className="text-[11px] text-white/35">{spot.window}</p>
                </div>
              ) : (
                <span className="flex-1 text-[13px] text-white/25">Not out</span>
              )}
              {today ? (
                <span
                  className="shrink-0 text-[9px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: biz.accent }}
                >
                  Today
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-white/25">
        Plans change — the text list always gets the real answer first.
      </p>
    </section>
  );
}

/* ── Full week hours (bakery) ──────────────────────── */
function HoursCard() {
  const s = useStore();
  const biz = BUSINESSES[s.business];

  return (
    <section className="mt-5 rounded-2xl border border-white/10 bg-[#191110] p-4">
      <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
        Hours
      </h2>
      <div className="space-y-0.5">
        {BAKERY_HOURS.map((h, i) => {
          const today = s.todayIndex === i;
          const openNow =
            today && s.nowMinutes !== null && !h.closed
              ? isOpenAt(h.open, h.close, s.nowMinutes)
              : false;
          return (
            <div
              key={h.day}
              className="flex items-center gap-3 rounded-lg px-2 py-1.5"
              style={today ? { background: biz.accentSoft } : undefined}
            >
              <span
                className="w-9 shrink-0 text-[11px] font-bold uppercase tracking-wider"
                style={{ color: today ? biz.accent : "rgba(255,255,255,0.35)" }}
              >
                {h.short}
              </span>
              <span
                className={`flex-1 text-[13px] ${
                  today ? "font-bold text-white" : "text-white/70"
                }`}
              >
                {h.closed ? "Closed" : `${h.open} – ${h.close}`}
              </span>
              {openNow ? (
                <span
                  className="shrink-0 text-[9px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: biz.accent }}
                >
                  ● Open now
                </span>
              ) : today ? (
                <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.12em] text-white/30">
                  Today
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Fresh this week rail (bakery) ─────────────────── */
function FreshRail({ items }: { items: Item[] }) {
  const s = useStore();
  const biz = BUSINESSES[s.business];
  if (!items.length) return null;

  return (
    <section className="mt-7">
      {/* The gap between the words and the badge is flex `gap-2` — a visual gap,
          not a character. Without the explicit space JSX joins the two text
          nodes and a screen reader announces the heading as "Fresh this
          weeknew". `{" "}` is the separator the accessible name needs. */}
      <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
        Fresh this week{" "}
        <span
          className="rounded-full px-2 py-0.5 text-[9px] tracking-[0.12em]"
          style={{ background: biz.accent, color: "#fff" }}
        >
          new
        </span>
      </h2>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="w-44 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#191110]"
          >
            <Photo
              src={item.src}
              seed={item.seed}
              glyph={item.glyph}
              className="h-24 w-full"
              rounded="rounded-none"
              sizes="176px"
            />
            <div className="p-3">
              <p className="text-sm font-bold leading-tight">{item.name}</p>
              <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/45">
                {item.desc}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-bold">{money(item.price)}</span>
                <button
                  type="button"
                  onClick={() => s.addToCart(item.id)}
                  className="rounded-lg px-2.5 py-1 text-xs font-bold text-white transition active:scale-95"
                  style={{ background: biz.accent }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── One menu row ──────────────────────────────────── */
function MenuRow({ item }: { item: Item }) {
  const s = useStore();
  const biz = BUSINESSES[s.business];
  const inCart = s.currentCart.find((l) => l.id === item.id)?.qty ?? 0;
  const low = item.countLeft !== null && item.countLeft > 0 && item.countLeft <= 12;

  return (
    <div
      className={`flex gap-3 rounded-xl border p-2.5 transition ${
        item.soldOut ? "border-white/5 opacity-45" : "border-white/10"
      }`}
      style={{ background: "#191110" }}
    >
      <Photo
        src={item.src}
        seed={item.seed}
        glyph={item.glyph}
        className={`h-20 w-20 shrink-0 ${item.soldOut ? "grayscale" : ""}`}
        sizes="80px"
        scrim={false}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p
            className={`text-[15px] font-bold leading-tight ${
              item.soldOut ? "line-through decoration-white/40" : ""
            }`}
          >
            {item.name}
          </p>
          <span className="shrink-0 text-[15px] font-bold">{money(item.price)}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-xs leading-snug text-white/45">
          {item.desc}
        </p>

        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex min-h-[26px] items-center gap-1.5">
            {item.soldOut ? (
              <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/70">
                Sold out today
              </span>
            ) : low ? (
              <span
                className="rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider"
                style={{ background: biz.accentSoft, color: biz.accent }}
              >
                Only {item.countLeft} left
              </span>
            ) : item.preOrder ? (
              <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">
                48hr notice
              </span>
            ) : null}
          </div>

          {item.soldOut ? null : inCart > 0 ? (
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                aria-label={`Remove one ${item.name}`}
                onClick={() => s.removeFromCart(item.id)}
                className="h-7 w-7 rounded-lg border border-white/15 text-base font-bold leading-none text-white/80 transition active:scale-90"
              >
                −
              </button>
              <span className="w-4 text-center text-sm font-bold tabular-nums">
                {inCart}
              </span>
              <button
                type="button"
                aria-label={`Add one ${item.name}`}
                onClick={() => s.addToCart(item.id)}
                className="h-7 w-7 rounded-lg text-base font-bold leading-none text-white transition active:scale-90"
                style={{ background: biz.accent }}
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => s.addToCart(item.id)}
              className="rounded-lg px-3 py-1.5 text-xs font-bold text-white transition active:scale-95"
              style={{ background: biz.accent }}
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Text list signup — how they capture the customer ── */
function TextSignup() {
  const s = useStore();
  const biz = BUSINESSES[s.business];
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="mt-9 rounded-2xl border border-white/10 bg-[#191110] p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
        {biz.mobile ? "Never miss us again" : "Know before it sells out"}
      </p>
      <h3 className="mt-2 text-lg font-bold leading-tight">
        {biz.mobile
          ? "Get our spot texted to you each morning."
          : "Get a text when the fresh bread comes out."}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-white/45">
        {biz.mobile
          ? "One text a day. Where we're parked, what's on, when we sell out."
          : "One text a week. What's new, what's warm, what's about to be gone."}
      </p>

      {done ? (
        <div
          className="mt-4 rounded-xl p-3.5 text-sm font-semibold"
          style={{ background: biz.accentSoft, color: biz.accent }}
        >
          You&apos;re in. {s.subscribers[s.business].toLocaleString()} people get this text.
        </div>
      ) : (
        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (phone.trim().length < 7) return;
            s.subscribe();
            setDone(true);
          }}
        >
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(770) 555-0134"
            className="min-w-0 flex-1 rounded-xl border border-white/15 bg-black/30 px-3.5 py-3 text-sm text-white placeholder:text-white/25 focus:border-white/40 focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl px-4 py-3 text-sm font-bold text-white transition active:scale-95"
            style={{ background: biz.accent }}
          >
            Join
          </button>
        </form>
      )}

      <p className="mt-3 text-[11px] leading-relaxed text-white/25">
        Or scan the code at the window. Texting {biz.listKeyword} does the same thing.
        This list belongs to the business — not to Instagram.
      </p>
    </section>
  );
}

/* ── Sticky cart ───────────────────────────────────── */
function CartBar({ onCheckout }: { onCheckout: () => void }) {
  const s = useStore();
  const biz = BUSINESSES[s.business];
  if (s.cartCount === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0f0b0a]/95 p-3 backdrop-blur-lg">
      <div className="mx-auto flex max-w-2xl items-center gap-3">
        <div className="flex-1">
          <p className="text-[11px] uppercase tracking-wider text-white/40">
            {s.cartCount} item{s.cartCount > 1 ? "s" : ""}
          </p>
          <p className="text-lg font-bold leading-tight">{money(s.cartTotal)}</p>
        </div>
        <button
          type="button"
          onClick={onCheckout}
          className="rounded-xl px-6 py-3.5 text-sm font-bold text-white transition active:scale-95"
          style={{ background: biz.accent }}
        >
          {biz.pickupLabel}
        </button>
      </div>
    </div>
  );
}

/* ── Checkout sheet ────────────────────────────────── */
function CheckoutSheet({ onClose }: { onClose: () => void }) {
  const s = useStore();
  const biz = BUSINESSES[s.business];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-2xl border border-white/10 bg-[#191110] p-5 sm:rounded-2xl">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold">Pickup order</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 -mt-1 rounded-lg p-2 text-white/40 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-2 border-y border-white/10 py-3">
          {s.currentCart.map((line) => {
            const item = s.itemById(line.id);
            if (!item) return null;
            return (
              <div key={line.id} className="flex justify-between text-sm">
                <span className="text-white/70">
                  {line.qty}× {item.name}
                </span>
                <span className="font-semibold tabular-nums">
                  {money(item.price * line.qty)}
                </span>
              </div>
            );
          })}
          <div className="flex justify-between pt-2 text-base font-bold">
            <span>Total</span>
            <span className="tabular-nums">{money(s.cartTotal)}</span>
          </div>
        </div>

        <form
          className="mt-4 space-y-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            s.placeOrder(name, phone);
            onClose();
          }}
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-xl border border-white/15 bg-black/30 px-3.5 py-3 text-sm text-white placeholder:text-white/25 focus:border-white/40 focus:outline-none"
          />
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Mobile — we text you when it's ready"
            className="w-full rounded-xl border border-white/15 bg-black/30 px-3.5 py-3 text-sm text-white placeholder:text-white/25 focus:border-white/40 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition active:scale-[0.98]"
            style={{ background: biz.accent }}
          >
            Send order to the {biz.mobile ? "truck" : "counter"}
          </button>
          <p className="pt-1 text-center text-[11px] text-white/30">
            Card payment goes here on a live build. Nothing is charged in this demo.
          </p>
        </form>
      </div>
    </div>
  );
}

/* ── Order status tracker ──────────────────────────── */
function OrderTracker() {
  const s = useStore();
  const biz = BUSINESSES[s.business];
  const order = s.myOrder;
  if (!order || order.status === "picked-up") return null;

  const steps = [
    { key: "new", label: "Sent" },
    { key: "making", label: biz.mobile ? "On the griddle" : "Boxing it up" },
    { key: "ready", label: "Ready" },
  ];
  const activeIndex = steps.findIndex((st) => st.key === order.status);
  const ready = order.status === "ready";

  return (
    <div
      className="sticky top-0 z-30 border-b px-4 py-3"
      style={{
        background: ready ? biz.accent : "#191110",
        borderColor: ready ? "transparent" : "rgba(255,255,255,0.1)",
      }}
    >
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
              Order {order.ref}
            </p>
            <p className="truncate text-sm font-bold">
              {ready
                ? `${order.name} — it's ready at the window`
                : steps[Math.max(0, activeIndex)]?.label}
            </p>
          </div>
          <div className="flex shrink-0 gap-1">
            {steps.map((st, i) => (
              <span
                key={st.key}
                className="h-1.5 w-7 rounded-full transition"
                style={{
                  background:
                    i <= activeIndex ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>

        {ready ? (
          <div className="mt-2.5 rounded-lg bg-black/25 p-2.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">
              Text sent to {order.phone}
            </p>
            <p className="mt-1 text-sm leading-snug text-white/95">
              “{biz.name}: Hi {order.name} — order {order.ref} is boxed and ready.
              We&apos;ll hold it for 30 min. See you soon!”
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
