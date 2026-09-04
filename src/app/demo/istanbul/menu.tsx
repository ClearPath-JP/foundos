"use client";

import { useState } from "react";
import Image from "next/image";
import {
  SECTIONS, itemsIn, priceLabel, money, hasPhoto, photoSrc, isPriced,
  ORDERING_ENABLED, BIZ,
  type MenuItem,
} from "./data";

/**
 * Two states of the same menu.
 *
 *   A — "Today"      no food photography at all, and no empty slots. A clean
 *                    board of names and prices, which is what a real truck menu
 *                    is. It has to look finished, not like it's waiting.
 *   B — "After a shoot"  the same page with their photographs in place.
 *
 * The previous version reserved a dashed slot for every un-shot dish. Both the
 * grader and JP's auditor landed on the same verdict: 17 of them ran to roughly
 * half the scroll, and the layout was demanding a photo then degrading to a
 * hole without one. Flipping between two finished states makes the same
 * argument without ever showing the owner an unfinished page.
 */

const alt = (item: MenuItem) => `${item.name} at Taste of Istanbul, Marietta`;

/**
 * The price slot, for the two big treatments.
 *
 * A verified price is short ("$13.99") and belongs at display scale in the
 * accent. The unverified fallback is a five-word sentence, and setting THAT in
 * 1.7rem Anton inside a `shrink-0` span made it 204px wide — it could not
 * shrink, so it pushed 4px past a 390px viewport and failed the overflow gate
 * in the no-photo state. BoardLine already switched treatments for the unpriced
 * case; these two never did. Same rule everywhere now: big accent for a number,
 * quiet italic that is allowed to shrink for "ask".
 */
function PriceSlot({ item, size }: { item: MenuItem; size: string }) {
  return isPriced(item) ? (
    <span className={`display-md shrink-0 ${size} text-[var(--truck)]`}>
      {priceLabel(item)}
    </span>
  ) : (
    <span className="min-w-0 text-right text-[0.8rem] italic leading-snug text-[var(--ink-dim)]">
      {priceLabel(item)}
    </span>
  );
}

/**
 * "Order ahead" was a <button> with no handler — a customer could build a $17
 * cart and tap the largest control on the page into nothing, on a page whose
 * meta description promises "order ahead for pickup."
 *
 * A truck has no POS and no kitchen display, so the honest v1 is an SMS to the
 * window with the order pre-filled. `?&body=` is the form that works on iOS and
 * on most Android SMS handlers.
 */
function smsHref(order: MenuItem[], total: number) {
  const counts = new Map<string, number>();
  order.forEach((i) => counts.set(i.name, (counts.get(i.name) ?? 0) + 1));
  const lines = [...counts].map(([name, n]) => `${n}x ${name}`).join(", ");
  // A "Total $0" in a text message to the owner is worse than no total at all,
  // which is exactly what happens while prices are unverified.
  const totalPart = total > 0 ? ` Total ${money(total)}.` : "";
  const body = `Hi! Pickup order please: ${lines}.${totalPart} Thank you!`;
  return `sms:+19542030133?&body=${encodeURIComponent(body)}`;
}

/* ── a dish with a photograph ─────────────────────────────────────────────── */
function PhotoDish({
  item, onAdd, lead = false,
}: { item: MenuItem; onAdd: (i: MenuItem) => void; lead?: boolean }) {
  return (
    <article>
      <div
        className={`photo-frame ${
          lead
            ? "h-[320px] sm:h-[380px] lg:h-[440px]"
            : "h-[240px] sm:h-[300px] lg:h-[300px]"
        }`}
      >
        <Image
          src={photoSrc(item.photo!)}
          alt={alt(item)}
          fill
          sizes={
            lead
              ? "(max-width: 620px) 100vw, (max-width: 1024px) 620px, 1120px"
              : "(max-width: 620px) 100vw, (max-width: 1024px) 620px, 560px"
          }
          className="object-cover"
          style={{ objectPosition: item.focal ?? "center" }}
        />
      </div>
      {lead && (
        <p className="eyebrow eyebrow-istanbul mt-3">What they&rsquo;re known for</p>
      )}
      <div className={`flex items-start justify-between gap-4 ${lead ? "mt-1.5" : "mt-3"}`}>
        <h3
          className={`display min-w-0 text-[var(--ink)] ${
            lead ? "text-[2.5rem] sm:text-[2.9rem]" : "text-[2.1rem]"
          }`}
        >
          {item.name}
        </h3>
        <PriceSlot item={item} size={lead ? "text-[2.1rem]" : "text-[1.8rem]"} />
      </div>
      {item.blurb && (
        <p className="mt-1.5 text-[0.95rem] font-light leading-relaxed text-[var(--ink-dim)]">
          {item.blurb}
        </p>
      )}
      {ORDERING_ENABLED && (
        <button onClick={() => onAdd(item)} className="btn btn-primary mt-4 w-full">
          Add to order
        </button>
      )}
    </article>
  );
}

/* ── a dish the truck leads with — hierarchy from type, not from a photo ──── */
function FeatureBand({ item, onAdd }: { item: MenuItem; onAdd: (i: MenuItem) => void }) {
  return (
    <article className="rounded-[14px] border-2 border-[var(--ink)] bg-[var(--gold)] p-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="display min-w-0 text-[2rem] text-[var(--ink)]">{item.name}</h3>
        {/* Ink, not red: #c8221c on the gold band is 2.71:1 — the least legible
            prices on the page were the two carrying the most hierarchy. The
            verified branch keeps ink for that reason; PriceSlot's accent is for
            the cream surfaces, so this band overrides it back to ink. */}
        {isPriced(item) ? (
          <span className="display-md shrink-0 text-[1.7rem] text-[var(--ink)]">
            {priceLabel(item)}
          </span>
        ) : (
          <span className="min-w-0 text-right text-[0.82rem] italic leading-snug text-[var(--ink)]">
            {priceLabel(item)}
          </span>
        )}
      </div>
      {item.blurb && (
        <p className="mt-1.5 text-[0.94rem] font-light leading-relaxed text-[var(--ink)]">
          {item.blurb}
        </p>
      )}
      {ORDERING_ENABLED && (
        <button onClick={() => onAdd(item)} className="btn btn-primary mt-4 w-full">
          Add to order
        </button>
      )}
    </article>
  );
}

/* ── the board line — no image, and finished without one ──────────────────── */
function BoardLine({ item, onAdd }: { item: MenuItem; onAdd: (i: MenuItem) => void }) {
  return (
    <div className="flex items-center gap-3 border-b border-[var(--line)] py-3.5 last:border-0">
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="display-md min-w-0 text-[1.4rem] text-[var(--ink)]">{item.name}</h3>
          <span
            className={
              isPriced(item)
                ? "display-md shrink-0 text-[1.3rem] text-[var(--truck)]"
                : "shrink-0 text-[0.8rem] italic text-[var(--ink-dim)]"
            }
          >
            {priceLabel(item)}
          </span>
        </div>
        {item.blurb && (
          <p className="mt-1 text-[0.82rem] font-light leading-snug text-[var(--ink-faint)]">
            {item.blurb}
          </p>
        )}
      </div>
      {ORDERING_ENABLED && (
        <button
          onClick={() => onAdd(item)}
          aria-label={`Add ${item.name} to order`}
          className="btn-add shrink-0"
        >
          Add
        </button>
      )}
    </div>
  );
}

export default function Menu({ showPhotos }: { showPhotos: boolean }) {
  const [order, setOrder] = useState<MenuItem[]>([]);

  const add = (item: MenuItem) => setOrder((o) => [...o, item]);
  const clear = () => setOrder([]);

  // Only verified prices contribute to a total — an unpriced item can never
  // silently count as $0. While PRICES_VERIFIED is false that means NOTHING is
  // priced, so the bar must never render "3 items · $0".
  const priced = order.filter(isPriced);
  const total = priced.reduce((sum, i) => sum + (i.price?.value ?? 0), 0);
  const unpricedCount = order.length - priced.length;
  const countLabel = `${order.length} ${order.length === 1 ? "item" : "items"}`;

  return (
    <>
      {/* NO on-page state control. An inline "show with photos" toggle told the
          viewer a better version existed before they reached a single menu item
          — it undid the premise of the bare state and was itself the
          app-switcher tell. The two states are separate URLs instead:
            /demo/istanbul            the real page, with their photographs
            /demo/istanbul?photos=0   the bare board, no food photography
          Two bookmarks, one tap each, and neither page admits the other exists.
          Default flipped 2026-08-18 — photos are the page now, not the upgrade. */}
      {/* Tier 1's order path, and the honest one: the phone. Replaces the cart
          that used to live here — see ORDERING_ENABLED in data.ts. */}
      <a
        href={BIZ.phoneHref}
        className="mb-6 flex items-center justify-between gap-3 rounded-[14px] border-2 border-[var(--ink)] bg-[var(--gold)] px-4 py-3.5"
      >
        <span className="display-md text-[1.25rem] leading-tight text-[var(--ink)] sm:text-[1.45rem]">
          Call ahead &mdash; we&rsquo;ll have it ready
        </span>
        <span className="display-md shrink-0 text-[1.1rem] text-[var(--ink)] underline underline-offset-4">
          {BIZ.phone.value}
        </span>
      </a>

      {/* Section jump. The board runs ~9,600 CSS px on a phone — someone who
          scrolls to the drinks had eleven swipes to get back to the shawarma and
          no way to shortcut it. Horizontally scrollable so four chips never
          overflow 390px, and it doubles as a progress indicator. */}
      <nav
        aria-label="Menu sections"
        className="sticky top-0 z-30 -mx-4 mb-8 flex gap-2 overflow-x-auto border-y-2 border-[var(--ink)] bg-[var(--cream)] px-4 py-2.5 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="chip shrink-0">
            {s.label}
          </a>
        ))}
      </nav>

      <div className="space-y-14">
        {SECTIONS.map((section) => {
          const items = itemsIn(section.id);
          if (!items.length) return null;

          return (
            <section key={section.id} id={section.id} className="scroll-mt-[52px]">
              {/* Every section now gets its own full-bleed colour band, not just
                  the Venezuelan one. Four identical cream headings down a
                  ~2,000px board read as the same section repeating; red → gold
                  → green → deep green makes each one an event, and it's all the
                  truck's own paint. Colour comes from section.band. */}
              <div
                className={`${section.band} -mx-4 mb-6 px-4 py-6 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8`}
              >
                <h2 className="eyebrow">{section.label}</h2>
                {section.kicker && (
                  <p className="display mt-2 text-[2rem] sm:text-[2.4rem]">
                    {section.kicker}
                  </p>
                )}
              </div>

              {/* Photos only ever ADD to the page — their absence never leaves
                  a hole, it just falls back to the board line.

                  Grouped rather than interleaved, which buys two things.
                  On desktop the photographed dishes run two-up instead of
                  stacking one-per-row for ~5,000px — the single change that
                  stops this reading as a phone page stretched down a laptop.
                  And board lines now always come last in a section, which
                  removes the collision under Cheese Empanada where a divider
                  rule ran into the top edge of the tequeños photograph. */}
              {(() => {
                const shot = (i: MenuItem) => showPhotos && hasPhoto(i.photo);
                // The dish the truck's own bodywork leads with keeps full width.
                const lead = items.find((i) => i.hero) ?? null;
                const rest = items.filter((i) => i !== lead);
                const photos = rest.filter(shot);
                const board = rest.filter((i) => !shot(i));

                return (
                  <>
                    {lead && (
                      <div className="mb-8">
                        {shot(lead) ? (
                          <PhotoDish item={lead} onAdd={add} lead />
                        ) : (
                          <FeatureBand item={lead} onAdd={add} />
                        )}
                      </div>
                    )}

                    {photos.length > 0 && (
                      <div className="mb-8 grid gap-8 lg:grid-cols-2 lg:gap-x-8">
                        {photos.map((item) => (
                          <PhotoDish key={item.id} item={item} onAdd={add} />
                        ))}
                      </div>
                    )}

                    {board.length > 0 && (
                      <div className="lg:grid lg:grid-cols-2 lg:gap-x-10">
                        {board.map((item) =>
                          item.feature ? (
                            <div key={item.id} className="mb-6 lg:col-span-2">
                              <FeatureBand item={item} onAdd={add} />
                            </div>
                          ) : (
                            <BoardLine key={item.id} item={item} onAdd={add} />
                          )
                        )}
                      </div>
                    )}
                  </>
                );
              })()}
            </section>
          );
        })}
      </div>

      {/* Hidden until the first item is added.
          It used to render always, on the theory that an empty bar proved the
          feature existed. At 390px that cost 137px — 17% of the screen — for a
          disabled button and a sentence, and the helper copy wrapped to five
          lines the moment anything was in it. Appearing on first tap IS the
          feedback, and the menu gets ~100px of viewport back.

          One row, no helper sentence. And the label now says what the button
          actually does: it opens the phone's SMS app with the order written
          out. That is a text message, not an ordering system — "order ahead"
          promised something the truck cannot do yet. */}
      {ORDERING_ENABLED && order.length > 0 && (
        <div
          className="sticky bottom-0 z-20 -mx-4 mt-10 flex items-center justify-between gap-3 border-t-2 border-[var(--ink)] bg-[var(--cream)] px-4 py-2.5 sm:-mx-6 sm:px-6"
          aria-live="polite"
        >
          <div className="display-md min-w-0 text-[1.3rem] text-[var(--ink)]">
            {priced.length > 0 ? `${countLabel} · ${money(total)}` : countLabel}
            {unpricedCount > 0 && priced.length > 0 && (
              <span className="ml-1.5 text-[0.7rem] font-normal text-[var(--ink-faint)]">
                +{unpricedCount} at the window
              </span>
            )}
          </div>
          <div className="flex shrink-0 gap-2">
            <button onClick={clear} className="btn-add" aria-label="Clear order">
              Clear
            </button>
            <a href={smsHref(order, total)} className="btn btn-primary flex items-center px-5">
              Text this order
            </a>
          </div>
        </div>
      )}
    </>
  );
}
