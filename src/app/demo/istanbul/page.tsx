import Image from "next/image";
import {
  BIZ, LIVE_SPOT, REVIEWS, DELIVERY_MARKUP, DELIVERY_PLATFORMS, CATERING,
  APP_PRICES_CHECKED, PRICES_VERIFIED, money, markupPct, markupDelta,
} from "./data";
import Menu from "./menu";
import OpenNow from "./open-now";

/** Their truck has "Shawarma · Empanadas · Tequeños · Burgers" painted down the
 *  side. Three of the four reference sites run a scrolling ticker; ours is
 *  already written, by them. Duplicated once so the loop is seamless.
 *  ⚠️ "Pastelitos" removed 2026-08-18 — they're no longer on the printed menu. */
const TICKER = ["Shawarma", "Empanadas", "Tequeños", "Burgers", "Tacos", "Lavash Wraps"];

function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...TICKER, ...TICKER].map((word, i) => (
          <span key={i} className="display-md text-[1.5rem]">
            {word} <span className="text-[var(--gold)]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Organic edge between colour fields, the way Gorilla and Bon Me break
 *  sections — never a straight rule. */
function Wave({ className = "" }: { className?: string }) {
  return (
    <svg className={`wave-top ${className}`} viewBox="0 0 1200 26" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,26 C180,0 320,26 520,13 C720,0 880,26 1080,10 L1200,4 L1200,26 Z" fill="currentColor" />
    </svg>
  );
}

/**
 * `searchParams` is read here, on the server, and the result is passed down to
 * <Menu/>. It used to be read in a useEffect inside the client component, which
 * tripped React's "no synchronous setState in an effect" rule and meant the
 * first paint was always the default state before correcting itself. Reading it
 * server-side removes the effect, the cascading render and the flash.
 */
export default async function TasteOfIstanbulPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Photos are the page. `?photos=0` asks for the bare board.
  const showPhotos = (await searchParams).photos !== "0";

  /** Lead with the biggest DOLLAR difference, not the biggest percentage.
   *  By percentage the winner is the Ayran — a 33% markup on a $3 can, which
   *  is arithmetically true and rhetorically useless. Three dollars on a
   *  burger is the number an owner and a customer both feel. */
  const biggest = DELIVERY_MARKUP.reduce((a, b) =>
    markupDelta(b.window, b.app) > markupDelta(a.window, a.app) ? b : a
  );
  const pcts = DELIVERY_MARKUP.map((r) => markupPct(r.window, r.app));
  const spread = { lo: Math.min(...pcts), hi: Math.max(...pcts) };

  return (
    <main className="min-h-screen bg-[var(--cream)]">
      {/* ── hero ──────────────────────────────────────────────────────────
          Bon Me's move: a real photo, with a hard-bordered box sitting on it
          carrying the name at maximum scale.                               */}
      <header className="relative">
        {/* Capped in vh on desktop. At 720px fixed, a 801px-tall laptop saw
            nothing but photo above the fold — no name, no hours, no CTA. */}
        <div className="relative h-[300px] sm:h-[380px] lg:h-[52vh] lg:max-h-[560px] lg:min-h-[360px]">
          <Image
            src="/demo/istanbul/optimized/truck-night.jpg"
            alt="The Taste of Istanbul food truck at night, staff serving from the window in Marietta, Georgia"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[38%_38%]"
          />
        </div>

        <div className="relative mx-auto -mt-14 w-full max-w-[620px] px-4 sm:px-6 lg:max-w-[1180px] lg:px-8">
          <div className="card p-5 sm:p-7 lg:max-w-[720px]">
            <div className="mb-3">
              <OpenNow />
            </div>

            {/* aria-label because the <br/> between the two spans produces no
                word boundary in the accessible name — screen readers and Google
                were both being handed "Taste ofIstanbul" as one word. */}
            <h1
              aria-label={BIZ.name}
              className="display display-hero text-[3.5rem] text-[var(--ink)] sm:text-[5rem]"
            >
              Taste of
              <br />
              <span className="text-[var(--truck)]">Istanbul</span>
            </h1>

            <p className="body-lg mt-4 max-w-[36ch]">{BIZ.tagline}</p>

            <a href="#menu" className="btn btn-primary mt-5 flex w-full items-center justify-center">
              See the menu
            </a>
          </div>
        </div>
      </header>

      <div className="mt-10">
        <Marquee />
      </div>

      <div className="mx-auto w-full max-w-[620px] px-4 sm:px-6 lg:max-w-[1180px] lg:px-8">
        {/* ── where we are ───────────────────────────────────────────────── */}
        <section className="relative mt-12">
          <div className="photo-frame h-[190px]">
            {/* JP's own daylight shot, 2026-08-18: the red truck at the pumps
                with the Chevron sign in frame. It does the job the old
                Instagram pull was doing, but it actually proves the location. */}
            <Image
              src="/demo/istanbul/optimized/truck-chevron-day.jpg"
              alt="The Taste of Istanbul truck parked at the Chevron on Windy Hill Road in Marietta, service window open"
              fill
              sizes="(max-width: 620px) 100vw, 620px"
              className="object-cover object-[46%_54%]"
            />
          </div>

          {/* Anchored to the photo's top-right corner. It used to be pinned at
              top-[126px] to straddle the photo/card seam, which worked at wide
              breakpoints and covered the card's eyebrow text at 390px. */}
          <div className="sticker absolute right-3 top-3 z-10">
            <span className="display-md text-[0.84rem] leading-[1.1]">
              Open
              <br />
              till
              <br />
              midnight
            </span>
          </div>

          <div className="card card-live -mt-6 p-5">
            {/* Was "Tonight we're at" — which promises a truck that moves and
                a page that gets updated daily. JP confirmed 2026-08-18 she's at
                this Chevron every single day, so the reliable version is both
                truer and a better reason to drive over.
                max-w matches the h2 below it: the sticker roundel is absolutely
                positioned over this row, and the first attempt at this line ran
                straight underneath it. Anything in this card stays inside 70%. */}
            <p className="eyebrow max-w-[66%]">Parked every day</p>
            <h2 className="display-md mt-1.5 max-w-[70%] text-[2.1rem] text-[var(--ink)]">
              {LIVE_SPOT.name}
            </h2>
            <p className="mt-1.5 text-[0.98rem] text-[var(--ink-dim)]">{LIVE_SPOT.street}</p>
            <p className="mt-0.5 text-[0.88rem] text-[var(--ink-faint)]">{LIVE_SPOT.note}</p>

            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              <a
                className="btn btn-primary flex flex-1 items-center justify-center px-4"
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  LIVE_SPOT.name + ", " + LIVE_SPOT.street
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Directions
              </a>
              <a
                className="btn btn-ghost flex flex-1 items-center justify-center px-4"
                href={BIZ.phoneHref}
              >
                Call
              </a>
            </div>
          </div>
        </section>

        {/* ── menu ─────────────────────────────────────────────────────── */}
        <div id="menu" className="mt-16 scroll-mt-4">
          <Menu showPhotos={showPhotos} />
        </div>
      </div>

      {/* ── order direct ─────────────────────────────────────────────────
          A solid gold field, Gorilla-style, so the pitch reads as its own
          place rather than another card on the same background.

          ⚠️ The entire section depends on knowing her WINDOW price, and as of
          2026-08-18 we don't — see PRICES_VERIFIED in data.ts. A markup table
          built on a menu we can't date is the one thing on this page the owner
          could disprove while holding the phone, so it does not render at all
          until someone photographs the board. Everything needed to bring it
          back is still in DELIVERY_MARKUP; flip the switch.                */}
      {PRICES_VERIFIED && (
      <section className="mt-10">
        <div className="text-[var(--gold)]">
          <Wave />
        </div>
        <div className="field-gold pb-12 pt-8">
          <div className="mx-auto w-full max-w-[620px] px-4 sm:px-6 lg:max-w-[1180px] lg:px-8">
            <h2 className="display text-[2.6rem] text-[var(--ink)] sm:text-[3.4rem]">
              Order here,
              <br />
              not there
            </h2>
            <p className="mt-4 text-[1.02rem] font-light leading-relaxed text-[var(--ink)] lg:max-w-[64ch]">
              {/* The spread is computed from the table below, never typed in by
                  hand — the previous copy claimed "9% to 50%" against a table
                  whose real range was 9% to 33%, which is the one thing on this
                  page an owner can check in four seconds. */}
              Order through an app and you pay their markup on top. It runs from{" "}
              {spread.lo}% to {spread.hi}% depending on the dish — the{" "}
              {biggest.item.toLowerCase()} is{" "}
              <strong className="font-bold text-[var(--truck)]">
                {money(markupDelta(biggest.window, biggest.app))} more
              </strong>{" "}
              on {DELIVERY_PLATFORMS.value[0]} than at this window.
            </p>

            <div className="card mt-6 overflow-hidden">
              {/* 14px floor — these were 0.7rem ≈ 11.2px, unreadable at a truck
                  window in sunlight. */}
              <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_5.5rem_5rem] gap-x-4 border-b-2 border-[var(--ink)] px-4 py-2.5 text-[0.875rem] font-bold uppercase tracking-[0.12em] text-[var(--ink-dim)]">
                <span>Item</span>
                <span className="text-right">Window</span>
                <span className="text-right">App</span>
              </div>
              {DELIVERY_MARKUP.map((row) => (
                <div
                  key={row.item}
                  className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_5.5rem_5rem] items-center gap-x-4 border-b border-[var(--line)] px-4 py-3 last:border-0"
                >
                  <span className="text-[0.92rem] text-[var(--ink)]">{row.item}</span>
                  <span className="display-md text-right text-[1.3rem] text-[var(--truck)]">
                    {money(row.window)}
                  </span>
                  <span className="text-right text-[0.92rem] text-[var(--ink-faint)] line-through">
                    {money(row.app)}
                  </span>
                </div>
              ))}
            </div>

            {/* The number the owner will challenge first. It has to be sourced. */}
            {/* This line is what makes the markup table credible, and it was the
                least legible text on the page: 13.6px at 3.56:1 on gold. Ink,
                14px — same move already made on the gold-band prices. */}
            <p className="mt-3 text-[0.875rem] text-[var(--ink)]">
              Window prices from their own printed menu. App prices from{" "}
              {DELIVERY_PLATFORMS.value.join(" and ")}, checked {APP_PRICES_CHECKED}.
            </p>
          </div>
        </div>
        <div className="rotate-180 text-[var(--gold)]">
          <Wave />
        </div>
      </section>
      )}

      {/* ── catering ──────────────────────────────────────────────────────
          Their printed menu leads its top-left corner with "WE SERVE COMPANIES
          AND FACTORIES" and closes with "CALL FOR EVENT & PARTIES". They
          advertise a whole second revenue line on a piece of paper that only
          people already standing at the window ever read. This section is the
          single clearest thing the site does that the menu board cannot.     */}
      <section className="mt-16">
        <div className="mx-auto w-full max-w-[620px] px-4 sm:px-6 lg:max-w-[1180px] lg:px-8">
          <div className="photo-frame h-[220px] sm:h-[280px]">
            <Image
              src="/demo/istanbul/optimized/truck-team.jpg"
              alt="The Taste of Istanbul crew standing in front of their truck in Marietta, Georgia"
              fill
              sizes="(max-width: 620px) 100vw, 940px"
              className="object-cover object-[50%_38%]"
            />
          </div>

          <div className="card -mt-6 p-5 sm:p-7">
            <p className="eyebrow eyebrow-istanbul">Catering</p>
            <h2 className="display mt-1.5 text-[2.2rem] text-[var(--ink)] sm:text-[2.8rem]">
              {CATERING.headline.value}
            </h2>
            <p className="mt-3 text-[1rem] font-light leading-relaxed text-[var(--ink-dim)]">
              Feeding a shift, a shop floor, a birthday or a wedding — the spit
              travels. {CATERING.sub.value}.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <a
                className="btn btn-primary flex flex-1 items-center justify-center px-4"
                href={BIZ.phoneHref}
              >
                Call {BIZ.phone.value}
              </a>
              <a
                className="btn btn-ghost flex flex-1 items-center justify-center px-4"
                href={`mailto:${BIZ.email.value}?subject=${encodeURIComponent("Catering enquiry")}`}
              >
                Email us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews sit on a green field — the third truck colour finally carrying
          a full section instead of only tinting eyebrows. */}
      <section className="band-green mt-16 py-12">
        <div className="mx-auto w-full max-w-[620px] px-4 sm:px-6 lg:max-w-[1180px] lg:px-8">
          {/* "What people say" is the one heading here that would sit on any
              template. Every other section is named after a place or an act —
              "The Chevron on Windy Hill", "Order here, not there", "Find the
              window". This one wasn't. */}
          <h2 className="display text-[2.4rem] text-[var(--ink)]">Word gets around</h2>
          {/* items-start, not the grid default of stretch. Three cards forced to
              the tallest one's height left the two-line empanada quote in a box
              more than half empty — the single spot on the page where a loop
              was visibly filling space it had nothing for. */}
          <div className="mt-6 space-y-5 lg:grid lg:grid-cols-3 lg:items-start lg:gap-5 lg:space-y-0">
            {REVIEWS.map((r) => (
              <blockquote key={r.text} className="card p-4 text-[1rem] font-light leading-relaxed text-[var(--ink-dim)]">
                &ldquo;{r.text}&rdquo;
              </blockquote>
            ))}
          </div>
          {/* The quotes and the score come from DIFFERENT places — the text is
              Atly's (see REVIEWS in data.ts), the rating is Google's. Printed as
              one block it read as three Google reviews, which they are not. */}
          <p className="mt-5 text-[0.875rem] text-[var(--ink-dim)]">
            Quotes via Atly. {BIZ.rating.value.score}/{BIZ.rating.value.outOf} from{" "}
            {BIZ.rating.value.count}+ reviews on {BIZ.rating.value.source}.
          </p>
        </div>
      </section>

      {/* ── footer ───────────────────────────────────────────────────────── */}
      <footer>
        <div className="text-[var(--green-deep)]">
          <Wave />
        </div>
        <div className="field-green pb-12 pt-6">
          <div className="mx-auto w-full max-w-[620px] px-4 sm:px-6 lg:max-w-[1180px] lg:px-8">
            <h2 className="display text-[2.8rem] text-[var(--cream)]">Find the window</h2>
            <dl className="mt-5 text-[0.96rem]">
              {/* Was plain text, while the identical information higher up the
                  page was a working Directions link. Anyone reaching the footer
                  first found the one address on the site they couldn't tap. */}
              <div className="flex items-center justify-between gap-4 border-b border-[rgba(253,246,236,0.2)]">
                <dt className="text-[var(--gold)]">Where</dt>
                <dd className="text-right">
                  <a
                    className="flex min-h-[44px] items-center underline-offset-4 hover:underline"
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      LIVE_SPOT.name + ", " + LIVE_SPOT.street
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {LIVE_SPOT.street}
                  </a>
                </dd>
              </div>
              <div className="flex min-h-[44px] items-center justify-between gap-4 border-b border-[rgba(253,246,236,0.2)]">
                <dt className="text-[var(--gold)]">Hours</dt>
                <dd className="text-right">{BIZ.hours.value.label}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-[rgba(253,246,236,0.2)]">
                <dt className="text-[var(--gold)]">Phone</dt>
                <dd>
                  <a className="flex min-h-[44px] items-center underline-offset-4 hover:underline" href={BIZ.phoneHref}>
                    {BIZ.phone.value}
                  </a>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-[rgba(253,246,236,0.2)]">
                <dt className="text-[var(--gold)]">Instagram</dt>
                <dd>
                  <a
                    className="flex min-h-[44px] items-center underline-offset-4 hover:underline"
                    href={BIZ.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {BIZ.instagram.value}
                  </a>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[var(--gold)]">Email</dt>
                <dd>
                  <a
                    className="flex min-h-[44px] items-center underline-offset-4 hover:underline"
                    href={`mailto:${BIZ.email.value}`}
                  >
                    {BIZ.email.value}
                  </a>
                </dd>
              </div>
            </dl>

            <p className="mt-8 text-[0.84rem] font-light leading-relaxed text-[rgba(253,246,236,0.6)]">
              Menu, prices and dish descriptions taken from the truck&rsquo;s own
              printed menu, 18 August 2026. Food photographs taken at the truck
              the same day.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
