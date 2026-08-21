import InstantReport from '@/components/report/InstantReport';
import {
  CAL,
  DEMO_LINE,
  DEMO_LINE_PRETTY,
  DEMOS,
  PHONE,
  PHONE_PRETTY,
} from '@/lib/contact';

/**
 * foundos.ai homepage — "the letter" (2026-08-21).
 *
 * The QR on the back of JP's v2 card encodes the bare root, so this page is
 * the after-handshake moment. It is deliberately a page of WORDS: white,
 * unornamented, short lines with room to breathe, the way you'd read a note
 * rather than scan a brochure. Every service the old six-card grid listed is
 * still here, rewritten as a line you can read in one breath.
 *
 * ⚠️ The card's back reads "Scan to see exactly what I'd build for your
 * business →". That sentence is kept verbatim as the #report section's H2 —
 * do not reword it while v2 cards are still in circulation.
 *
 * ⚠️ JP's photo was deliberately removed on 2026-08-21 at his direction. It
 * previously "confirmed the face they just met" on a card scan; if trust ever
 * reads thin, the 52px avatar is the thing to put back, not the portrait.
 *
 * Earlier directions are still browsable at /explore/aurora and
 * /explore/nocturne. The WebGL liquid background lives at
 * components/GradientBackground.tsx and is intentionally unused — it gates
 * itself to min-width 768px, so it never runs on the phones prospects hold.
 */

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'foundos.ai',
  description:
    'Websites, online ordering, booking systems and AI phone answering for local businesses in Atlanta.',
  url: 'https://foundos.ai',
  telephone: `+1${PHONE}`,
  email: 'hello@foundos.ai',
  areaServed: { '@type': 'City', name: 'Atlanta' },
  address: { '@type': 'PostalAddress', addressLocality: 'Atlanta', addressRegion: 'GA', addressCountry: 'US' },
  founder: { '@type': 'Person', name: 'Josh Potesta' },
  sameAs: ['https://instagram.com/josh.potesta'],
};

/** A violet-weighted word. The accent is the only colour on the page. */
function V({ children }: { children: React.ReactNode }) {
  return <em className="lt-v">{children}</em>;
}

export default function HomePage() {
  return (
    <div className="lt">
      <style>{CSS}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      {/* ── The mark ──────────────────────────────────────────────────── */}
      <header className="lt-top" id="top">
        <a className="lt-mark" href="#top" aria-label="foundos.ai">
          foundos<span>.ai</span>
        </a>
      </header>

      {/* ── The letter ────────────────────────────────────────────────────
          Stanzas, not sections. Each <p> is one thought, sized so a phone
          holds it without scrolling mid-idea. */}
      <main className="lt-body">
        <h1 className="lt-lead">
          I build and run the <V>online side</V> of local businesses in Atlanta.
        </h1>

        <p>
          You&apos;re good at what you do.
          <br />
          The internet doesn&apos;t show it.
        </p>

        <p className="lt-list">
          Your hours are wrong on Google.
          <br />
          Your menu is a photo from three years ago.
          <br />
          The phone rings while your hands are full.
        </p>

        <p className="lt-turn">So I build the part you don&apos;t have time for.</p>

        <ul className="lt-does">
          <li>
            <span aria-hidden="true">🌐</span>
            <p>
              A <V>website</V> that actually sells — with ordering and payments built
              in, so you stop handing a cut of every ticket to the apps.
            </p>
          </li>
          <li>
            <span aria-hidden="true">📅</span>
            <p>
              <V>Bookings</V> customers make themselves, at midnight, straight into your
              calendar.
            </p>
          </li>
          <li>
            <span aria-hidden="true">📞</span>
            <p>
              An <V>AI that answers every call</V>, takes the order, books the table. A
              ringing phone stops being a lost customer.
            </p>
          </li>
          <li>
            <span aria-hidden="true">⭐</span>
            <p>
              <V>Reviews</V> asked for automatically — and the regulars who drifted away
              quietly brought back.
            </p>
          </li>
          <li>
            <span aria-hidden="true">📍</span>
            <p>
              Your <V>Google listing</V>{' '}
              fixed, so you&apos;re the obvious choice the moment someone searches
              nearby.
            </p>
          </li>
          <li>
            <span aria-hidden="true">📊</span>
            <p>
              Every order, call and dollar on <V>one screen</V>, so you finally see
              what&apos;s working.
            </p>
          </li>
        </ul>

        <p>
          Then I <V>run it</V>.
          <br />
          Every week.
          <br />
          So you never think about it again.
        </p>

        <p>
          You own all of it. Your domain, your site, your data.
          <br />
          If you ever leave, you take it with you.
        </p>

        <p className="lt-close">
          One person in Atlanta. <V>Not an agency.</V>
          <br />
          You text me, I answer.
        </p>

        <div className="lt-cta">
          <a className="lt-btn" href={`sms:${PHONE}`}>
            Text me — {PHONE_PRETTY}
          </a>
          <a className="lt-btn-2" href={`tel:${PHONE}`}>
            Or call
          </a>
        </div>
        <p className="lt-fine">
          Tell me what business you run and I&apos;ll tell you straight whether I can
          help.
        </p>
      </main>

      {/* ── Instant report ────────────────────────────────────────────────
          The card's promise, kept verbatim. See the ⚠️ note at the top. */}
      <section className="lt-sec" id="report">
        <h2 className="lt-h2">See exactly what I&apos;d build for your business.</h2>
        <p className="lt-sub">
          Type your business name. I&apos;ll show you what&apos;s costing you customers
          right now — and what I&apos;d do about it.
        </p>
        <div className="lt-report">
          <InstantReport />
        </div>
      </section>

      {/* ── Proof ─────────────────────────────────────────────────────── */}
      <section className="lt-sec">
        <h2 className="lt-h2">Don&apos;t take my word for it.</h2>
        <p className="lt-sub">
          Call the AI receptionist and order a slab of ribs out loud. It&apos;ll take
          the order — and tell you it&apos;s AI.
        </p>

        <a className="lt-phone" href={`tel:${DEMO_LINE}`}>
          <span aria-hidden="true">📞</span> {DEMO_LINE_PRETTY}
        </a>

        <p className="lt-sub lt-sub-tight">Or open something I&apos;ve built:</p>
        <ul className="lt-demos">
          {DEMOS.map((b) => (
            <li key={b.href}>
              <a
                href={b.href}
                {...(b.href.startsWith('http')
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
              >
                <strong>{b.label}</strong>
                <span>{b.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="lt-foot">
        {/* Stacked, not inline — inline footer links can't clear 44px without
            padding that breaks the line. Three ways to reach one person. */}
        <ul className="lt-ways">
          <li>
            <a href={`sms:${PHONE}`}>Text {PHONE_PRETTY}</a>
          </li>
          <li>
            <a href="mailto:hello@foundos.ai">hello@foundos.ai</a>
          </li>
          <li>
            <a href={CAL} target="_blank" rel="noreferrer">
              Book 20 minutes
            </a>
          </li>
        </ul>
        <p className="lt-foot-fine">
          foundos.ai LLC · Atlanta, GA · <a href="/privacy">Privacy</a>
        </p>
      </footer>

      {/* Phone-only dock — the number is never more than a thumb away. */}
      <div className="lt-dock">
        <a className="lt-dock-btn" href={`sms:${PHONE}`}>
          Text me — {PHONE_PRETTY}
        </a>
        <a className="lt-dock-call" href={`tel:${PHONE}`} aria-label="Call Josh">
          Call
        </a>
      </div>
    </div>
  );
}

const CSS = `
.lt { --v:#7433e2; --ink:#15131f; --mut:#4a4760; --dim:#8f8ca3;
  --line:rgba(21,19,31,.09);
  --display:var(--font-display), var(--font-inter), system-ui, sans-serif;
  background:#fff; color:var(--ink);
  max-width:33rem; margin:0 auto; padding:0 22px; }

.lt a, .lt button { -webkit-tap-highlight-color:transparent; }

/* ── The mark ───────────────────────────────────────────────────────────
   It arrives before the words do. Opacity is safe to animate here because
   this element sits above the fold on every screen, so it always plays. */
.lt-top { padding:52px 0 40px; }
.lt-mark { font-family:var(--display); font-size:1.34rem; font-weight:800;
  letter-spacing:-.035em; color:var(--ink); text-decoration:none;
  display:inline-flex; align-items:center; min-height:44px; }
.lt-mark span { color:var(--v); }
@media (prefers-reduced-motion: no-preference) {
  .lt-mark { animation:lt-in .85s cubic-bezier(.22,1,.36,1) both; }
  .lt-lead { animation:lt-in .85s .18s cubic-bezier(.22,1,.36,1) both; }
}
@keyframes lt-in {
  from { opacity:0; transform:translateY(9px); filter:blur(5px); }
  to   { opacity:1; transform:none; filter:none; }
}

/* ── Stanzas ────────────────────────────────────────────────────────────
   The whole page is one column of text, so the only real design decisions
   are measure, leading and the space between thoughts. */
.lt-body { padding-bottom:8px; }
.lt-body > p { font-size:1.14rem; line-height:1.62; color:var(--mut);
  margin:0 0 30px; text-wrap:pretty; }
.lt-lead { font-family:var(--display); font-size:clamp(1.72rem,7.4vw,2.3rem) !important;
  font-weight:800; letter-spacing:-.032em; line-height:1.22 !important;
  color:var(--ink) !important; margin-bottom:38px !important; text-wrap:balance; }
.lt-list { color:var(--dim) !important; }
.lt-turn { color:var(--ink) !important; font-weight:600; }
.lt-close { color:var(--ink) !important; }

/* The accent is the only colour on the page, so it has to stay rare. */
.lt-v { font-style:normal; font-weight:650; color:var(--v); }

/* ── What I do ──────────────────────────────────────────────────────────
   Not cards. A list with a glyph in the margin, so it still reads as prose. */
.lt-does { list-style:none; margin:0 0 34px; padding:0; }
.lt-does li { display:flex; gap:14px; align-items:flex-start; padding:13px 0;
  border-bottom:1px solid var(--line); }
.lt-does li:first-child { border-top:1px solid var(--line); }
.lt-does li > span { flex:0 0 1.5rem; font-size:1.12rem; line-height:1.6;
  text-align:center; }
.lt-does p { font-size:1.02rem; line-height:1.6; color:var(--mut); margin:0;
  text-wrap:pretty; }

/* ── Buttons ────────────────────────────────────────────────────────── */
.lt-cta { display:flex; flex-direction:column; gap:10px; margin:4px 0 0; }
@media (min-width:430px) { .lt-cta { flex-direction:row; } .lt-btn { flex:1 1 auto; } }
.lt-btn, .lt-btn-2 { display:inline-flex; align-items:center; justify-content:center;
  min-height:52px; padding:0 24px; font-size:1rem; font-weight:670;
  border-radius:12px; text-decoration:none; transition:transform .18s, background .18s,
  border-color .18s, color .18s; }
.lt-btn { color:#fff; background:var(--ink); }
.lt-btn-2 { color:var(--ink); background:#fff; border:1.5px solid var(--line); }
.lt-btn:active, .lt-btn-2:active { transform:scale(.972); transition-duration:.06s; }
@media (hover: hover) {
  .lt-btn:hover { background:var(--v); }
  .lt-btn-2:hover { border-color:var(--v); color:var(--v); }
}
.lt-fine { margin:14px 0 0; font-size:.9rem; line-height:1.5; color:var(--dim); }

/* ── Later sections ─────────────────────────────────────────────────── */
.lt-sec { margin-top:56px; padding-top:44px; border-top:1px solid var(--line); }
.lt-h2 { font-family:var(--display); font-size:clamp(1.36rem,5.4vw,1.7rem);
  font-weight:800; letter-spacing:-.028em; line-height:1.24; text-wrap:balance; }
.lt-sub { margin-top:12px; font-size:1.02rem; line-height:1.58; color:var(--mut);
  text-wrap:pretty; }
.lt-sub-tight { margin-top:30px; font-size:.94rem; color:var(--dim); }
.lt-report { margin-top:22px; }

.lt-phone { display:flex; align-items:center; justify-content:center; gap:10px;
  margin-top:20px; min-height:60px; padding:0 20px;
  font-family:var(--display); font-size:clamp(1.4rem,6.4vw,1.75rem); font-weight:800;
  letter-spacing:-.02em; color:var(--ink); text-decoration:none;
  border:1.5px solid var(--line); border-radius:12px; transition:all .18s; }
.lt-phone:active { transform:scale(.985); transition-duration:.06s; }
@media (hover: hover) { .lt-phone:hover { border-color:var(--v); color:var(--v); } }

.lt-demos { list-style:none; margin:12px 0 0; padding:0; }
.lt-demos li { border-bottom:1px solid var(--line); }
.lt-demos li:first-child { border-top:1px solid var(--line); }
.lt-demos a { display:flex; flex-direction:column; gap:2px; padding:15px 2px;
  text-decoration:none; }
.lt-demos strong { font-size:1rem; font-weight:650; color:var(--ink); }
.lt-demos span { font-size:.9rem; color:var(--dim); }
.lt-demos a:active { opacity:.55; }
@media (hover: hover) { .lt-demos a:hover strong { color:var(--v); } }

/* ── Footer ─────────────────────────────────────────────────────────── */
.lt-foot { margin-top:56px; padding:30px 0 calc(104px + env(safe-area-inset-bottom));
  border-top:1px solid var(--line); font-size:.92rem; line-height:1.7;
  color:var(--dim); }
.lt-foot a { color:var(--mut); text-decoration:none; }
@media (hover: hover) { .lt-foot a:hover { color:var(--v); } }
.lt-ways { list-style:none; margin:0; padding:0; }
.lt-ways a { display:inline-flex; align-items:center; min-height:44px; }
.lt-foot-fine { margin-top:10px; font-size:.84rem; color:var(--dim); }
.lt-foot-fine a { display:inline-flex; align-items:center; min-height:44px; }

/* ── Dock ───────────────────────────────────────────────────────────── */
.lt-dock { position:fixed; left:0; right:0; bottom:0; z-index:30; display:flex; gap:8px;
  padding:10px 16px calc(10px + env(safe-area-inset-bottom));
  background:rgba(255,255,255,.92); backdrop-filter:blur(14px);
  border-top:1px solid var(--line); }
.lt-dock-btn { flex:1; display:inline-flex; align-items:center; justify-content:center;
  min-height:48px; padding:0 12px; font-size:.92rem; font-weight:670; color:#fff;
  white-space:nowrap; background:var(--ink); border-radius:12px; text-decoration:none; }
.lt-dock-call { display:inline-flex; align-items:center; justify-content:center;
  min-width:70px; min-height:48px; padding:0 12px; font-size:.92rem; font-weight:650;
  color:var(--v); background:#fff; border:1.5px solid rgba(116,51,226,.3);
  border-radius:12px; text-decoration:none; }
.lt-dock-btn:active, .lt-dock-call:active { transform:scale(.972); }
@media (prefers-reduced-motion: no-preference) {
  .lt-dock { animation:lt-dock-in .5s .4s cubic-bezier(.22,1,.36,1) both; }
}
@keyframes lt-dock-in {
  from { transform:translateY(100%); }
  to   { transform:none; }
}

/* ── Wider screens ──────────────────────────────────────────────────────
   Same column, a little more air. A letter doesn't need a desktop layout. */
@media (min-width:721px) {
  .lt { max-width:35rem; }
  .lt-top { padding:76px 0 48px; }
  .lt-body > p { font-size:1.2rem; }
  .lt-sec { margin-top:72px; padding-top:56px; }
  .lt-dock { display:none; }
  .lt-foot { padding-bottom:44px; }
}
`;
