"use client";

import { useState } from "react";
import {
  BAKERY_HOURS,
  BUSINESSES,
  SPOTS,
  WEEKLY_CANDIDATES,
  isOpenAt,
  money,
  type Order,
} from "./data";
import { useStore } from "./store";

/**
 * The owner's screen — a tablet propped by the window or the register.
 * Deliberately light and big-buttoned: bright environments, flour on hands.
 */
export function StaffView() {
  const s = useStore();
  const biz = BUSINESSES[s.business];

  const waiting = s.currentOrders.filter(
    (o) => o.status === "new" || o.status === "making",
  ).length;
  const soldOutCount = s.currentItems.filter((i) => i.soldOut).length;

  return (
    <div className="min-h-screen bg-[#f3f1ef] pb-16 text-[#1a1210]">
      {/* ── Bar ─────────────────────────────────────── */}
      <div className="border-b border-black/10 bg-white px-4 py-3.5">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/40">
              {biz.staffTitle}
            </p>
            <p className="truncate text-base font-bold leading-tight">{biz.name}</p>
          </div>
          <div
            className="flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5"
            style={{ background: biz.accentSoft }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: biz.accent }}
            />
            <span className="text-xs font-bold" style={{ color: biz.accent }}>
              Open
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-4 px-4 pt-4">
        {/* ── At a glance ───────────────────────────── */}
        <div className="grid grid-cols-3 gap-2.5">
          <Stat label="Orders waiting" value={String(waiting)} accent={biz.accent} />
          <Stat
            label="On the text list"
            value={s.subscribers[s.business].toLocaleString()}
          />
          <Stat label="Sold out" value={String(soldOutCount)} />
        </div>

        {biz.mobile ? <SpotPicker /> : null}
        {biz.mobile ? <WeekEditor /> : <HoursPanel />}
        <OrdersPanel />
        <SoldOutBoard />
        {!biz.mobile ? <WeeklyBread /> : null}
        <BlastComposer />

        <p className="pt-2 text-center text-[11px] leading-relaxed text-black/30">
          Everything on this screen updates the customer website the instant you tap it.
        </p>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-black/8 bg-white p-3">
      <p
        className="text-2xl font-black leading-none tabular-nums"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </p>
      <p className="mt-1.5 text-[10px] font-semibold uppercase leading-tight tracking-wider text-black/40">
        {label}
      </p>
    </div>
  );
}

function Card({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-black/8 bg-white p-4">
      <div className="mb-3">
        <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-black/70">
          {title}
        </h2>
        {hint ? (
          <p className="mt-1 text-xs leading-snug text-black/40">{hint}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

/* ── Where are you parked today ────────────────────── */
function SpotPicker() {
  const s = useStore();
  const biz = BUSINESSES[s.business];

  return (
    <Card
      title="Where are you today?"
      hint="Tap a spot. The website changes before you put the phone down."
    >
      <div className="grid gap-2 sm:grid-cols-2">
        {SPOTS.map((spot) => {
          const active = s.spot.id === spot.id;
          return (
            <button
              key={spot.id}
              type="button"
              onClick={() => s.setSpot(spot)}
              className="rounded-xl border-2 p-3 text-left transition active:scale-[0.98]"
              style={{
                borderColor: active ? biz.accent : "rgba(0,0,0,0.09)",
                background: active ? biz.accentSoft : "#fff",
              }}
            >
              <p className="text-sm font-bold leading-tight">{spot.name}</p>
              <p className="mt-0.5 text-xs text-black/45">{spot.window}</p>
              {active ? (
                <p
                  className="mt-1.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: biz.accent }}
                >
                  ● Live on the site
                </p>
              ) : null}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() =>
          s.sendBlast(
            `${biz.name}: We're at ${s.spot.name} today, ${s.spot.window}. Come hungry 🔥`,
          )
        }
        className="mt-3 w-full rounded-xl py-3.5 text-sm font-bold text-white transition active:scale-[0.99]"
        style={{ background: biz.accent }}
      >
        Text today&apos;s spot to {s.subscribers[s.business].toLocaleString()} regulars
      </button>
    </Card>
  );
}

/* ── Set the week ahead ────────────────────────────── */
function WeekEditor() {
  const s = useStore();
  const biz = BUSINESSES[s.business];
  // null = not out that day, then each spot in turn.
  const cycle: (string | null)[] = [null, ...SPOTS.map((sp) => sp.id)];

  return (
    <Card
      title="This week"
      hint="Tap a day to cycle through your spots. Customers see this on the site."
    >
      <div className="space-y-1.5">
        {s.week.map((d, i) => {
          const spot = SPOTS.find((sp) => sp.id === d.spotId);
          const today = s.todayIndex === i;
          return (
            <button
              key={d.day}
              type="button"
              onClick={() => {
                const at = cycle.indexOf(d.spotId ?? null);
                s.setDayStop(i, cycle[(at + 1) % cycle.length]);
              }}
              className="flex w-full items-center gap-3 rounded-xl border-2 px-3 py-2.5 text-left transition active:scale-[0.98]"
              style={{
                borderColor: today ? biz.accent : "rgba(0,0,0,0.09)",
                background: today ? biz.accentSoft : "#fff",
              }}
            >
              <span
                className="w-9 shrink-0 text-xs font-bold uppercase tracking-wider"
                style={{ color: today ? biz.accent : "rgba(0,0,0,0.4)" }}
              >
                {d.short}
              </span>
              {spot ? (
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold leading-tight">
                    {spot.name}
                  </span>
                  <span className="block text-[11px] text-black/45">
                    {spot.window}
                  </span>
                </span>
              ) : (
                <span className="flex-1 text-sm text-black/30">Not out</span>
              )}
              <span className="shrink-0 text-lg text-black/20">›</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

/* ── Storefront hours ──────────────────────────────── */
function HoursPanel() {
  const s = useStore();
  const biz = BUSINESSES[s.business];

  return (
    <Card
      title="Hours"
      hint="What the website and your Google listing both show. Change it once, it changes everywhere."
    >
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
              className="flex items-center gap-3 rounded-lg px-2 py-2"
              style={today ? { background: biz.accentSoft } : undefined}
            >
              <span
                className="w-10 shrink-0 text-xs font-bold uppercase tracking-wider"
                style={{ color: today ? biz.accent : "rgba(0,0,0,0.4)" }}
              >
                {h.short}
              </span>
              <span
                className={`flex-1 text-sm ${today ? "font-bold" : "text-black/65"}`}
              >
                {h.closed ? "Closed" : `${h.open} – ${h.close}`}
              </span>
              {openNow ? (
                <span
                  className="shrink-0 text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: biz.accent }}
                >
                  ● Open now
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ── Incoming orders ───────────────────────────────── */
function OrdersPanel() {
  const s = useStore();
  const biz = BUSINESSES[s.business];
  const live = s.currentOrders.filter((o) => o.status !== "picked-up");

  return (
    <Card
      title="Orders"
      hint={`Paid ahead. Box it, tap Ready, they get a text. ${biz.mobile ? "No line at the window." : "No one waiting at the counter."}`}
    >
      {live.length === 0 ? (
        <p className="py-6 text-center text-sm text-black/35">
          Nothing waiting. Place one from the customer view to see it land here.
        </p>
      ) : (
        <div className="space-y-2.5">
          {live.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </div>
      )}
    </Card>
  );
}

function OrderRow({ order }: { order: Order }) {
  const s = useStore();
  const biz = BUSINESSES[s.business];

  const cta =
    order.status === "new"
      ? "Start"
      : order.status === "making"
        ? "Ready →"
        : "Picked up";

  const statusLabel =
    order.status === "new"
      ? "New"
      : order.status === "making"
        ? biz.mobile
          ? "On the griddle"
          : "Boxing"
        : "Ready — texted";

  return (
    <div
      className="rounded-xl border-2 p-3"
      style={{
        borderColor: order.status === "new" ? biz.accent : "rgba(0,0,0,0.09)",
        background: order.status === "ready" ? "#f0f7f0" : "#fff",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-black">{order.ref}</span>
            <span className="text-sm font-semibold text-black/70">{order.name}</span>
            {order.isDemo ? (
              <span
                className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                style={{ background: biz.accentSoft, color: biz.accent }}
              >
                just now
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-black/50">
            {order.lines.map((l) => `${l.qty}× ${l.name}`).join(" · ")}
          </p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-black/35">
            {statusLabel} · {order.age === 0 ? "just now" : `${order.age} min`} ·{" "}
            {money(order.total)}
          </p>
        </div>
        <button
          type="button"
          disabled={order.status === "ready"}
          onClick={() => s.advanceOrder(order.id)}
          className="shrink-0 rounded-xl px-4 py-3 text-sm font-bold text-white transition active:scale-95 disabled:opacity-40"
          style={{
            background: order.status === "ready" ? "#4a7c4a" : biz.accent,
          }}
        >
          {cta}
        </button>
      </div>
    </div>
  );
}

/* ── The sold-out board — the feature that sells it ── */
function SoldOutBoard() {
  const s = useStore();
  const biz = BUSINESSES[s.business];
  const tracked = s.currentItems;

  return (
    <Card
      title="Sold out board"
      hint="Ran out? Tap it. It greys out on the website immediately and nobody can order it."
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {tracked.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => s.toggleSoldOut(item.id)}
            className="rounded-xl border-2 p-3 text-left transition active:scale-[0.97]"
            style={{
              borderColor: item.soldOut ? "rgba(0,0,0,0.12)" : biz.accent,
              background: item.soldOut ? "rgba(0,0,0,0.05)" : "#fff",
            }}
          >
            <p
              className={`text-[13px] font-bold leading-tight ${
                item.soldOut ? "text-black/35 line-through" : ""
              }`}
            >
              {item.name}
            </p>
            <p
              className="mt-1.5 text-[10px] font-bold uppercase tracking-wider"
              style={{ color: item.soldOut ? "rgba(0,0,0,0.35)" : biz.accent }}
            >
              {item.soldOut
                ? "Sold out"
                : item.countLeft !== null
                  ? `${item.countLeft} left`
                  : "Available"}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-3 rounded-xl bg-black/[0.03] p-3">
        <p className="text-[11px] leading-relaxed text-black/45">
          Counted items tick down on their own as orders come in. The ones marked
          &ldquo;Available&rdquo; you just flip by hand when the tray&apos;s empty.
        </p>
      </div>
    </Card>
  );
}

/* ── Weekly bread — one entry, three places ────────── */
function WeeklyBread() {
  const s = useStore();
  const biz = BUSINESSES[s.business];
  const [open, setOpen] = useState(false);
  const live = s.currentItems.filter((i) => i.fresh);
  const available = WEEKLY_CANDIDATES.filter(
    (c) => !s.currentItems.some((i) => i.id === c.id),
  );

  return (
    <Card
      title="This week's bread"
      hint="Add it once. It shows on the website, in ordering, and in your counts — same entry."
    >
      {live.length > 0 ? (
        <div className="mb-3 space-y-2">
          {live.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-black/8 p-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-bold leading-tight">{item.name}</p>
                <p className="mt-0.5 text-xs text-black/45">
                  {money(item.price)} ·{" "}
                  {item.countLeft !== null ? `${item.countLeft} in the case` : "Available"}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => s.restock(item.id, -6)}
                  className="h-9 w-9 rounded-lg border border-black/10 text-lg font-bold leading-none transition active:scale-90"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => s.restock(item.id, 6)}
                  className="h-9 w-9 rounded-lg border border-black/10 text-lg font-bold leading-none transition active:scale-90"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => s.removeItem(item.id)}
                  className="ml-1 rounded-lg px-2.5 py-2 text-xs font-semibold text-black/40 transition hover:text-black/70"
                >
                  End
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {open ? (
        <div className="space-y-2">
          {available.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                s.addWeeklyItem(c.id);
                setOpen(false);
              }}
              className="w-full rounded-xl border-2 border-black/8 p-3 text-left transition active:scale-[0.98]"
            >
              <p className="text-sm font-bold leading-tight">{c.name}</p>
              <p className="mt-0.5 text-xs text-black/45">
                {c.desc} · {money(c.price)}
              </p>
            </button>
          ))}
          {available.length === 0 ? (
            <p className="py-3 text-center text-sm text-black/35">
              All of this week&apos;s options are already live.
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full py-2 text-xs font-semibold text-black/40"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition active:scale-[0.99]"
          style={{ background: biz.accent }}
        >
          + Add this week&apos;s bread
        </button>
      )}
    </Card>
  );
}

/* ── Text blast ────────────────────────────────────── */
function BlastComposer() {
  const s = useStore();
  const biz = BUSINESSES[s.business];
  const preset = biz.mobile
    ? "Rainy day — we're closing at 2. Last call on birria 🌧️"
    : "Pan de elote is out of the oven. Still warm. 🍞";
  const [body, setBody] = useState(preset);

  return (
    <Card
      title="Text your regulars"
      hint={`${s.subscribers[s.business].toLocaleString()} people gave you their number. This is the asset — it's yours, not Instagram's.`}
    >
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        className="w-full resize-none rounded-xl border border-black/10 bg-[#faf9f8] p-3 text-sm leading-relaxed focus:border-black/30 focus:outline-none"
      />
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="text-[11px] text-black/35">{body.length} characters</span>
        <button
          type="button"
          onClick={() => s.sendBlast(body)}
          disabled={body.trim().length === 0}
          className="rounded-xl px-5 py-3 text-sm font-bold text-white transition active:scale-95 disabled:opacity-40"
          style={{ background: biz.accent }}
        >
          Send
        </button>
      </div>

      {s.blasts.length > 0 ? (
        <div className="mt-3 space-y-2 border-t border-black/8 pt-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-black/35">
            Sent today
          </p>
          {s.blasts.slice(0, 3).map((b) => (
            <div key={b.id} className="rounded-lg bg-black/[0.03] p-2.5">
              <p className="text-xs leading-snug text-black/65">{b.body}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-black/30">
                Delivered to {b.sent.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </Card>
  );
}
