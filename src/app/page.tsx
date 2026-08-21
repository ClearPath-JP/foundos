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
        <div className="cs-glow" aria-hidden="true" />
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
    </div>
  );
}

const CSS = `
.cs { --v:#7433e2; --v2:#8a54f4; --pink:#d92473; --ink:#15131f; --ink2:#403c54;
  --mut:#5b5870; --dim:#8f8ca3; --line:rgba(21,19,31,.10); --soft:#faf9fe;
  color:var(--ink); }
.cs-wrap { width:100%; max-width:680px; margin:0 auto; padding:0 20px; }

/* nav */
.cs-nav { position:sticky; top:0; z-index:20; display:flex; align-items:center;
  justify-content:space-between; gap:16px; padding:14px 20px;
  background:rgba(255,255,255,.86); backdrop-filter:blur(12px);
  border-bottom:1px solid var(--line); }
.cs-mark { font-size:1.06rem; font-weight:800; letter-spacing:-.03em; color:var(--ink);
  text-decoration:none; display:inline-flex; align-items:center; min-height:44px; }
.cs-mark span { color:var(--v); }
.cs-nav-cta { font-size:.86rem; font-weight:650; color:var(--v); text-decoration:none;
  padding:0 16px; border:1.5px solid rgba(116,51,226,.28); border-radius:999px;
  transition:all .18s; white-space:nowrap; display:inline-flex; align-items:center;
  min-height:44px; }
.cs-nav-cta:hover { background:var(--v); border-color:var(--v); color:#fff; }

/* hero */
.cs-hero { position:relative; padding:40px 0 52px; overflow:hidden; }
.cs-glow { position:absolute; top:-180px; left:50%; transform:translateX(-50%);
  width:min(760px,150vw); height:420px; pointer-events:none;
  background:radial-gradient(ellipse at center, rgba(139,92,246,.17), rgba(219,39,119,.07) 45%, transparent 72%);
  filter:blur(18px); }
.cs-h1 { position:relative; font-size:clamp(2rem,8.6vw,3rem); font-weight:850;
  letter-spacing:-.045em; line-height:1.04; }
.cs-sub { position:relative; margin-top:14px; font-size:clamp(1rem,4vw,1.12rem);
  line-height:1.55; color:var(--mut); max-width:34ch; }
.cs-report { position:relative; margin-top:26px; }
.cs-byline { display:flex; align-items:center; gap:12px; margin-top:26px; padding-top:20px;
  border-top:1px solid var(--line); }
.cs-avatar { border-radius:50%; object-fit:cover; flex:0 0 52px; }
.cs-byline p { font-size:.9rem; line-height:1.45; color:var(--mut); }

/* sections */
.cs-sec { padding:52px 0; border-top:1px solid var(--line); }
.cs-kick { font-size:.73rem; font-weight:700; text-transform:uppercase; letter-spacing:.13em;
  color:var(--v); margin-bottom:12px; }
.cs-kick-l { color:var(--v2); }
.cs-h2 { font-size:clamp(1.4rem,5.4vw,1.85rem); font-weight:800; letter-spacing:-.035em;
  line-height:1.16; }
.cs-h2-l { color:#fff; }

.cs-grid { list-style:none; margin-top:26px; display:grid; gap:12px;
  grid-template-columns:1fr; }
.cs-grid li { padding:18px; background:var(--soft); border:1px solid var(--line);
  border-radius:14px; }
.cs-grid h3 { font-size:1rem; font-weight:700; letter-spacing:-.015em; }
.cs-grid p { margin-top:6px; font-size:.91rem; line-height:1.55; color:var(--mut); }

/* proof */
.cs-dark { background:var(--ink); border-top-color:transparent; }
.cs-demo { display:flex; flex-direction:column; gap:4px; margin-top:24px; padding:20px;
  text-decoration:none; background:rgba(255,255,255,.05);
  border:1.5px solid rgba(139,92,246,.34); border-radius:16px; transition:all .18s; }
.cs-demo:hover { background:rgba(139,92,246,.14); border-color:var(--v2); }
.cs-demo-k { font-size:.82rem; font-weight:650; color:#c3bfe0; }
.cs-demo-n { font-size:clamp(1.6rem,7vw,2.1rem); font-weight:850; letter-spacing:-.03em;
  color:#fff; }
.cs-demo-f { font-size:.86rem; line-height:1.5; color:#9a98ab; }
.cs-builds-k { margin-top:30px; font-size:.73rem; font-weight:700; text-transform:uppercase;
  letter-spacing:.13em; color:#6b6784; }
.cs-builds { list-style:none; margin-top:12px; display:flex; flex-direction:column; gap:8px; }
.cs-builds a { display:flex; flex-direction:column; gap:2px; padding:14px 16px;
  text-decoration:none; background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.09); border-radius:12px; transition:all .18s; }
.cs-builds a:hover { border-color:var(--v2); background:rgba(139,92,246,.1); }
.cs-builds strong { font-size:.97rem; font-weight:650; color:#fff; }
.cs-builds span { font-size:.83rem; color:#9a98ab; }

/* about */
.cs-about { display:flex; flex-direction:column; gap:24px; }
.cs-portrait { position:relative; width:100%; max-width:300px; border-radius:18px;
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
  border-radius:12px; text-decoration:none; transition:all .18s; }
.cs-btn:hover { background:var(--v); transform:translateY(-1px); }
.cs-btn-alt { padding:16px 4px; font-size:.94rem; font-weight:620; color:var(--v);
  text-decoration:none; }
.cs-btn-alt:hover { text-decoration:underline; text-underline-offset:3px; }
/* Outline sibling to .cs-btn — a real second button, not a text link, so the
   phone gets two equally tappable targets. */
.cs-btn-2 { padding:16px 26px; font-size:1rem; font-weight:660; color:var(--ink);
  background:#fff; border:1.5px solid var(--line); border-radius:12px;
  text-decoration:none; transition:all .18s; }
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
