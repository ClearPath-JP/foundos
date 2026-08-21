import Image from 'next/image';
import InstantReport from '@/components/report/InstantReport';
import {
  CAL,
  DEMO_LINE,
  DEMO_LINE_PRETTY,
  DEMOS,
  PHONE,
  PHONE_PRETTY,
} from '@/lib/contact';
import { services } from './explore/content';

/**
 * foundos.ai homepage — the card-scan landing (spec: docs/superpowers/specs/
 * 2026-07-28-homepage-instant-report-design.md).
 *
 * The QR on the back of JP's v2 card encodes the bare root, so this page *is*
 * the after-handshake moment, and the photo confirms the face they just met.
 * Light skin on white with violet accents to match the card's front.
 *
 * ⚠️ The card's back reads "Scan to see exactly what I'd build for your
 * business →". That sentence WAS the H1; as of 2026-08-21 the page leads with
 * what JP does and a phone number instead (a card-holder already has the
 * number, but a stranger needs to know what he sells). The card's promise is
 * now kept verbatim by the #report section's H2 — do not reword that H2 while
 * v2 cards are still in circulation.
 *
 * The old Aurora design is still browsable at /explore/aurora. There is
 * deliberately no numbered process section — see §4.7 of the spec.
 */

/**
 * LocalBusiness markup. The report tells other businesses that missing markup
 * makes Google guess at their details — this site had none of its own.
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

export default function HomePage() {
  return (
    <div className="cs">
      <style>{CSS}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      <nav className="cs-nav">
        <a className="cs-mark" href="#top">
          foundos<span>.ai</span>
        </a>
        <a className="cs-nav-cta" href={`sms:${PHONE}`}>
          Text me
        </a>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <header className="cs-hero" id="top">
        <div className="cs-glow" aria-hidden="true">
          <span />
        </div>
        <div className="cs-wrap">
          <h1 className="cs-h1">
            I build and run the online side of local businesses in Atlanta.
          </h1>
          <p className="cs-sub">
            Websites, online ordering, booking, AI phone answering, reviews. I build
            it, I run it, and I keep it growing — you don&apos;t have to learn any of
            it.
          </p>

          <div className="cs-actions cs-hero-actions">
            <a className="cs-btn" href={`sms:${PHONE}`}>
              Text me — {PHONE_PRETTY}
            </a>
            <a className="cs-btn-2" href={`tel:${PHONE}`}>
              Or call
            </a>
          </div>
          <p className="cs-fine">
            A text is fine. Tell me what business you run and I&apos;ll tell you
            straight whether I can help.
          </p>

          <div className="cs-byline">
            <Image
              src="/josh.jpg"
              alt="Josh Potesta"
              width={52}
              height={52}
              className="cs-avatar"
              priority
            />
            <p>
              I&apos;m Josh. I build and run the online side of local businesses here in
              Atlanta.
            </p>
          </div>

          {/* Three claims the About section already makes, surfaced where a
              first-time visitor actually decides whether to keep reading. */}
          <ul className="cs-trust">
            <li>Atlanta</li>
            <li>One person, not an agency</li>
            <li>You own everything I build</li>
          </ul>
        </div>
      </header>

      {/* ── What I build ──────────────────────────────────────────────── */}
      <section className="cs-sec">
        <div className="cs-wrap">
          <p className="cs-kick">What I build</p>
          <h2 className="cs-h2">
            I build it, I run it, and I keep it growing — you don&apos;t have to learn any
            of it.
          </h2>
          <ul className="cs-grid">
            {services.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Instant report ────────────────────────────────────────────────
          The v2 card's back reads "Scan to see exactly what I'd build for your
          business →" and its QR encodes the bare root. That promise is kept by
          this section's H2, verbatim — a card-scanner finds it one scroll down.
          The `report` id means a future card can point the QR at /#report and
          land on it directly, without a reprint changing anything else. */}
      <section className="cs-sec cs-reportsec" id="report">
        <div className="cs-wrap">
          <p className="cs-kick">See it on your own business</p>
          <h2 className="cs-h2">See exactly what I&apos;d build for your business.</h2>
          <p className="cs-lede">
            Type your business name. I&apos;ll show you what&apos;s costing you customers
            right now — and what I&apos;d do about it.
          </p>

          <div className="cs-report">
            <InstantReport />
          </div>
        </div>
      </section>

      {/* ── Proof ─────────────────────────────────────────────────────── */}
      <section className="cs-sec cs-dark">
        <div className="cs-wrap">
          <p className="cs-kick cs-kick-l">Proof, not promises</p>
          <h2 className="cs-h2 cs-h2-l">
            Don&apos;t take my word for it — call the AI and hear it work.
          </h2>

          <a className="cs-demo" href={`tel:${DEMO_LINE}`}>
            <span className="cs-demo-k">Tap to call the AI receptionist</span>
            <span className="cs-demo-n">{DEMO_LINE_PRETTY}</span>
            <span className="cs-demo-f">
              Order a slab of ribs out loud. It&apos;ll take the order — and tell you
              it&apos;s AI.
            </span>
          </a>

          <p className="cs-builds-k">Working demos you can open right now</p>
          <ul className="cs-builds">
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
        </div>
      </section>

      {/* ── Who I am ──────────────────────────────────────────────────── */}
      <section className="cs-sec">
        <div className="cs-wrap cs-about">
          <div className="cs-portrait">
            <Image
              src="/josh.png"
              alt="Josh Potesta, founder of foundos.ai"
              width={420}
              height={650}
              sizes="(max-width: 720px) 100vw, 420px"
            />
          </div>
          <div className="cs-about-copy">
            <p className="cs-kick">Who you&apos;re dealing with</p>
            <h2 className="cs-h2">Josh Potesta</h2>
            <p>
              I&apos;m one person in Atlanta, not an agency with a ticket queue. You work
              with me directly — the same person who builds it and answers when
              something breaks.
            </p>
            <p>
              I started foundos because I kept meeting great owners trapped inside
              their own business, doing by hand what a decent system should handle on
              its own.
            </p>
            <p>
              You own everything I build — your domain, your site, your data. If you
              ever leave, you take all of it with you.
            </p>
            <p className="cs-cred">
              Founder, foundos.ai LLC · KSU AI Automation Certificate
            </p>
          </div>
        </div>
      </section>

      {/* ── Book ──────────────────────────────────────────────────────── */}
      <section className="cs-sec cs-book">
        <div className="cs-wrap">
          <p className="cs-kick">Next step</p>
          <h2 className="cs-h2">Text me and you&apos;ll know today whether I can help.</h2>

          <div className="cs-actions">
            <a className="cs-btn" href={`sms:${PHONE}`}>
              Text me — {PHONE_PRETTY}
            </a>
            <a className="cs-btn-2" href={`tel:${PHONE}`}>
              Or call
            </a>
          </div>
          <p className="cs-fine">
            No pitch, no obligation. If I can&apos;t help you, I&apos;ll say so.
          </p>
          <a className="cs-btn-alt cs-alt-block" href={CAL} target="_blank" rel="noreferrer">
            Or book twenty minutes instead
          </a>
        </div>
      </section>

      <footer className="cs-foot">
        <div className="cs-wrap">
          <span>foundos.ai LLC · Atlanta, GA</span>
          <a href="/privacy">Privacy</a>
        </div>
      </footer>

      {/* Phone-only sticky bar. The page is ~9000px tall on a phone; without
          this the number is only reachable at the very top or the very bottom.
          The footer carries matching bottom padding so it never covers text. */}
      <div className="cs-dock" aria-hidden="false">
        <a className="cs-dock-btn" href={`sms:${PHONE}`}>
          Text me — {PHONE_PRETTY}
        </a>
        <a className="cs-dock-call" href={`tel:${PHONE}`} aria-label="Call Josh">
          Call
        </a>
      </div>
    </div>
  );
}

const CSS = `
html { scroll-behavior:smooth; }

.cs { --v:#7433e2; --v2:#8a54f4; --pink:#d92473; --ink:#15131f; --ink2:#403c54;
  --mut:#5b5870; --dim:#8f8ca3; --line:rgba(21,19,31,.10); --soft:#faf9fe;
  /* Two radii, not six. Anything round is either a control (--r) or a
     surface (--r-lg); pills and circles are shape, not part of the scale. */
  --r:12px; --r-lg:16px;
  /* Bricolage Grotesque is loaded in layout.tsx as --font-display precisely so
     this page isn't Inter-on-Inter. Headings take it; body stays Inter. */
  --display:var(--font-display), var(--font-inter), system-ui, sans-serif;
  color:var(--ink); }
.cs-wrap { width:100%; max-width:680px; margin:0 auto; padding:0 20px; }

/* Scroll-driven settle — no JavaScript.
   ⚠️ TRANSFORM ONLY. Never animate opacity here. With an
   animation-timeline of view(), an element sitting before its range renders at
   the FIRST keyframe, so a 'from { opacity:0 }' leaves everything below the
   fold invisible to any
   renderer that doesn't scroll — screenshots, crawlers, social-preview bots.
   That is exactly how a page "renders invisible". A pure translate keeps every
   word readable at all times and only adds the movement. */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .cs-sec > .cs-wrap {
      animation:cs-settle linear both;
      animation-timeline:view();
      animation-range:entry 0% entry 55%;
    }
  }
}
@keyframes cs-settle {
  from { transform:translateY(14px); }
  to   { transform:none; }
}

/* nav */
.cs-nav { position:sticky; top:0; z-index:20; display:flex; align-items:center;
  justify-content:space-between; gap:16px; padding:14px 20px;
  background:rgba(255,255,255,.86); backdrop-filter:blur(12px);
  border-bottom:1px solid var(--line); }
.cs-mark { font-family:var(--display); font-size:1.1rem; font-weight:800;
  letter-spacing:-.03em; color:var(--ink);
  text-decoration:none; display:inline-flex; align-items:center; min-height:44px; }
.cs-mark span { color:var(--v); }
.cs-nav-cta { font-size:.86rem; font-weight:650; color:var(--v); text-decoration:none;
  padding:0 16px; border:1.5px solid rgba(116,51,226,.28); border-radius:999px;
  transition:all .18s; white-space:nowrap; display:inline-flex; align-items:center;
  min-height:44px; }
.cs-nav-cta:hover { background:var(--v); border-color:var(--v); color:#fff; }

/* hero */
.cs-hero { position:relative; padding:40px 0 52px; overflow:hidden; }
/* Liquid wash — three soft blobs drifting on different clocks.
   Deliberately CSS, not the WebGL version in components/GradientBackground.tsx:
   that one gates itself to min-width 768px, so on the phones every prospect
   actually holds it never runs at all.
   Two rules keep this cheap enough for a mid-range Android:
     1. NO filter: blur(). A radial-gradient is already soft, and a large blur
        filter is one of the most expensive things you can put on a phone GPU.
     2. Transform and opacity only, so each blob stays on the compositor and
        never triggers layout or paint while the page scrolls. */
.cs-glow { position:absolute; inset:-150px 0 -30px 0; pointer-events:none;
  overflow:hidden; }
.cs-glow::before, .cs-glow::after, .cs-glow > span { content:""; position:absolute;
  display:block; border-radius:50%; will-change:transform; }
.cs-glow::before { width:min(620px,128vw); height:min(620px,128vw); top:-14%; left:-26%;
  background:radial-gradient(closest-side, rgba(116,51,226,.30), rgba(116,51,226,0) 100%); }
.cs-glow::after { width:min(520px,106vw); height:min(520px,106vw); top:2%; right:-22%;
  background:radial-gradient(closest-side, rgba(217,36,115,.20), rgba(217,36,115,0) 100%); }
.cs-glow > span { width:min(600px,124vw); height:min(600px,124vw); top:40%; left:10%;
  background:radial-gradient(closest-side, rgba(138,84,244,.24), rgba(138,84,244,0) 100%); }

@media (prefers-reduced-motion: no-preference) {
  .cs-glow::before { animation:cs-blob-a 21s ease-in-out infinite alternate; }
  .cs-glow::after  { animation:cs-blob-b 27s ease-in-out infinite alternate; }
  .cs-glow > span  { animation:cs-blob-c 33s ease-in-out infinite alternate; }
}
@keyframes cs-blob-a {
  from { transform:translate3d(0,0,0) scale(1); }
  to   { transform:translate3d(14%,9%,0) scale(1.16); }
}
@keyframes cs-blob-b {
  from { transform:translate3d(0,0,0) scale(1.08); }
  to   { transform:translate3d(-13%,14%,0) scale(.9); }
}
@keyframes cs-blob-c {
  from { transform:translate3d(0,0,0) scale(.94); opacity:.75; }
  to   { transform:translate3d(-11%,-13%,0) scale(1.2); opacity:1; }
}
.cs-h1 { position:relative; font-family:var(--display); font-size:clamp(2.05rem,8.8vw,3.15rem);
  font-weight:800; letter-spacing:-.035em; line-height:1.05; text-wrap:balance; }
.cs-sub { position:relative; margin-top:14px; font-size:clamp(1rem,4vw,1.12rem);
  line-height:1.55; color:var(--mut); max-width:34ch; }
.cs-report { position:relative; margin-top:26px; }
.cs-byline { display:flex; align-items:center; gap:12px; margin-top:26px; padding-top:20px;
  border-top:1px solid var(--line); }
.cs-avatar { border-radius:50%; object-fit:cover; flex:0 0 52px; }
.cs-byline p { font-size:.9rem; line-height:1.45; color:var(--mut); }

.cs-trust { list-style:none; display:flex; flex-wrap:wrap; gap:7px; margin-top:18px; }
.cs-trust li { font-size:.78rem; font-weight:600; color:var(--ink2); white-space:nowrap;
  padding:6px 11px; border:1px solid var(--line); border-radius:999px;
  background:rgba(116,51,226,.045); }

/* Phone-only dock. Hidden ≥721px, where the page is short enough that the
   header CTA is never far away. */
.cs-dock { position:fixed; left:0; right:0; bottom:0; z-index:30; display:flex; gap:8px;
  padding:10px 16px calc(10px + env(safe-area-inset-bottom));
  background:rgba(255,255,255,.9); backdrop-filter:blur(14px);
  border-top:1px solid var(--line); }
.cs-dock-btn { flex:1; display:inline-flex; align-items:center; justify-content:center;
  min-height:48px; padding:0 16px; font-size:.95rem; font-weight:680; color:#fff;
  background:var(--ink); border-radius:var(--r); text-decoration:none;
  box-shadow:0 8px 20px -12px rgba(21,19,31,.6); }
.cs-dock-call { display:inline-flex; align-items:center; justify-content:center;
  min-width:76px; min-height:48px; padding:0 14px; font-size:.95rem; font-weight:660;
  color:var(--v); background:#fff; border:1.5px solid rgba(116,51,226,.3);
  border-radius:var(--r); text-decoration:none; }
/* The dock floats over the page, so the last section needs room beneath it. */
.cs-foot { padding-bottom:calc(96px + env(safe-area-inset-bottom)) !important; }
@media (min-width:721px) {
  .cs-dock { display:none; }
  .cs-foot { padding-bottom:34px !important; }
}

/* ── Touch feel ───────────────────────────────────────────────────────────
   Two things make a site feel dead on a phone, and this page had both.

   1. Nothing responds to a tap. Every affordance here was hover-only, and a
      phone has no hover — so a tap produced no feedback at all before the
      next page did something. Every control now scales on :active.
   2. Sticky hover. On touch, :hover latches after a tap and stays applied
      until you tap elsewhere, so buttons sat lifted and cards stayed hovered.
      Under (hover: none) the movement is neutralised and :active carries it.

   The default tap highlight goes too — that grey flash is the single most
   "unfinished web page" tell on Android. */
.cs a, .cs button, .cs-dock a { -webkit-tap-highlight-color:transparent; }

.cs-btn:active, .cs-btn-2:active, .cs-dock-btn:active, .cs-dock-call:active,
.cs-nav-cta:active, .cs-demo:active, .cs-builds a:active {
  transform:scale(.972); transition-duration:.06s; }
.cs-grid li:active { transform:scale(.99); transition-duration:.06s; }
.cs-btn-alt:active, .cs-foot a:active { opacity:.55; }

@media (hover: none) {
  .cs-btn:hover, .cs-btn-2:hover, .cs-grid li:hover, .cs-demo:hover,
  .cs-builds a:hover { transform:none; }
  .cs-grid li:hover { box-shadow:none; }
  .cs-nav-cta:hover { background:transparent; color:var(--v);
    border-color:rgba(116,51,226,.28); }
}

/* The dock is the last thing to arrive, so it slides rather than snaps. */
@media (prefers-reduced-motion: no-preference) {
  .cs-dock { animation:cs-dock-in .5s .35s cubic-bezier(.22,1,.36,1) both; }
}
@keyframes cs-dock-in {
  from { transform:translateY(100%); }
  to   { transform:none; }
}

/* sections */
.cs-sec { padding:52px 0; border-top:1px solid var(--line); }
.cs-kick { font-size:.73rem; font-weight:700; text-transform:uppercase; letter-spacing:.13em;
  color:var(--v); margin-bottom:12px; }
.cs-kick-l { color:var(--v2); }
.cs-h2 { font-family:var(--display); font-size:clamp(1.45rem,5.6vw,1.95rem); font-weight:800;
  letter-spacing:-.028em; line-height:1.18; text-wrap:balance; }
.cs-h2-l { color:#fff; }

.cs-grid { list-style:none; margin-top:26px; display:grid; gap:12px;
  grid-template-columns:1fr; }
.cs-grid li { position:relative; padding:20px 18px 18px; background:var(--soft);
  border:1px solid var(--line); border-radius:var(--r); overflow:hidden;
  transition:border-color .2s, transform .2s, box-shadow .2s; }
/* A short violet rule at the top of each card: six bordered boxes read as a
   template, six boxes with a hand-placed accent read as designed. */
.cs-grid li::before { content:""; position:absolute; top:0; left:18px; width:26px; height:3px;
  border-radius:0 0 3px 3px; background:linear-gradient(90deg,var(--v),var(--v2)); }
.cs-grid li:hover { border-color:rgba(116,51,226,.34); transform:translateY(-2px);
  box-shadow:0 10px 26px -14px rgba(21,19,31,.28); }
/* The first service is the one most owners come for — let it lead instead of
   sitting in an even grid. */
.cs-grid li:first-child { background:linear-gradient(160deg,rgba(116,51,226,.06),var(--soft) 62%); }
.cs-grid h3 { font-family:var(--display); font-size:1.04rem; font-weight:700;
  letter-spacing:-.015em; }
.cs-grid p { margin-top:6px; font-size:.91rem; line-height:1.55; color:var(--mut); }

/* proof */
.cs-dark { background:var(--ink); border-top-color:transparent; }
.cs-demo { display:flex; flex-direction:column; gap:4px; margin-top:24px; padding:20px;
  text-decoration:none; background:rgba(255,255,255,.05);
  border:1.5px solid rgba(138,84,244,.34); border-radius:var(--r-lg); transition:all .18s; }
.cs-demo:hover { background:rgba(139,92,246,.14); border-color:var(--v2); }
.cs-demo-k { font-size:.82rem; font-weight:650; color:#c3bfe0; }
.cs-demo-n { font-family:var(--display); font-size:clamp(1.65rem,7.2vw,2.2rem); font-weight:800;
  letter-spacing:-.025em; color:#fff; }
.cs-demo-f { font-size:.86rem; line-height:1.5; color:#9a98ab; }
.cs-builds-k { margin-top:30px; font-size:.73rem; font-weight:700; text-transform:uppercase;
  letter-spacing:.13em; color:#6b6784; }
.cs-builds { list-style:none; margin-top:12px; display:flex; flex-direction:column; gap:8px; }
.cs-builds a { display:flex; flex-direction:column; gap:2px; padding:14px 16px;
  text-decoration:none; background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.09); border-radius:var(--r); transition:all .18s; }
.cs-builds a:hover { border-color:var(--v2); background:rgba(139,92,246,.1); }
.cs-builds strong { font-size:.97rem; font-weight:650; color:#fff; }
.cs-builds span { font-size:.83rem; color:#9a98ab; }

/* about */
.cs-about { display:flex; flex-direction:column; gap:24px; }
.cs-portrait { position:relative; width:100%; max-width:300px; border-radius:var(--r-lg);
  overflow:hidden; background:var(--soft); }
.cs-portrait img { width:100%; height:auto; display:block; }
.cs-about-copy p { margin-top:12px; font-size:.95rem; line-height:1.6; color:var(--mut); }
.cs-about-copy .cs-kick { margin-top:0; }
.cs-cred { margin-top:18px !important; padding-top:14px; border-top:1px solid var(--line);
  font-size:.82rem !important; font-weight:600; color:var(--ink2) !important; }

/* book */
.cs-book { background:var(--soft); }
.cs-actions { margin-top:26px; display:flex; flex-wrap:wrap; gap:10px; align-items:center; }
.cs-btn { padding:16px 26px; font-size:1rem; font-weight:680; color:#fff; background:var(--ink);
  border-radius:var(--r); text-decoration:none; transition:all .2s;
  box-shadow:0 8px 20px -10px rgba(21,19,31,.5); }
.cs-btn:hover { background:var(--v); transform:translateY(-1px); }
.cs-btn-alt { padding:16px 4px; font-size:.94rem; font-weight:620; color:var(--v);
  text-decoration:none; }
.cs-btn-alt:hover { text-decoration:underline; text-underline-offset:3px; }
/* Outline sibling to .cs-btn — a real second button, not a text link, so the
   phone gets two equally tappable targets. */
.cs-btn-2 { padding:16px 26px; font-size:1rem; font-weight:660; color:var(--ink);
  background:#fff; border:1.5px solid var(--line); border-radius:var(--r);
  text-decoration:none; transition:all .2s; }
.cs-btn-2:hover { border-color:var(--v); color:var(--v); transform:translateY(-1px); }
/* Calendly is the third-choice CTA now, but it still has to clear 44px on a
   phone — so it's a block link with real padding, not text inside a <p>. */
.cs-alt-block { display:inline-block; margin-top:2px; padding:14px 4px; }

/* hero actions sit tighter to the sub than a section's actions do */
.cs-hero-actions { margin-top:22px; }
/* the report is now a section, so it needs the lede the hero used to carry */
.cs-lede { margin-top:10px; font-size:clamp(.98rem,3.8vw,1.06rem); line-height:1.55;
  color:var(--mut); }
.cs-reportsec { background:var(--soft); }
.cs-reportsec .cs-report { margin-top:22px; }
.cs-fine { margin-top:14px; font-size:.84rem; color:var(--dim); }

/* footer */
.cs-foot { padding:26px 0 34px; border-top:1px solid var(--line); }
.cs-foot .cs-wrap { display:flex; flex-wrap:wrap; gap:12px; align-items:center;
  justify-content:space-between; font-size:.82rem; color:var(--dim); }
.cs-foot a { color:var(--dim); text-decoration:none; display:inline-flex;
  align-items:center; min-height:44px; padding:0 2px; }
.cs-foot a:hover { color:var(--v); }

/* wider screens */
@media (min-width:721px) {
  .cs-wrap { max-width:760px; }
  .cs-hero { padding:64px 0 72px; }
  .cs-sec { padding:72px 0; }
  .cs-grid { grid-template-columns:1fr 1fr; gap:14px; }
  .cs-about { flex-direction:row; align-items:flex-start; gap:36px; }
  .cs-portrait { flex:0 0 280px; max-width:280px; }
  .cs-sub { font-size:1.16rem; }
}
`;
