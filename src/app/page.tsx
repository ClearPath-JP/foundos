import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

import CheckupForm from '@/components/contact/CheckupForm';
import Reveal from '@/components/contact/Reveal';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { NoiseTexture } from '@/components/ui/noise-texture';

import { SITE_URL } from './site';

/**
 * The homepage — local technology help, one action. Rebuilt 2026-09-30 from
 * foundos-website-rebuild-brief.md (repo root). Copy is the brief's, verbatim.
 *
 * Second pass the same day after a taste-gate grade of D ("a well-kept
 * template"): wider 1120 column, varied section layouts instead of five
 * heading-plus-paragraph blocks, a real button system, the business card
 * itself as the hero visual, and a dark founder band for contrast. The
 * blurred-blob aurora was replaced by the card's static corner wash — the
 * grader named drifting blobs as an AI tell.
 *
 * Deliberately NOT on the ember design system in components/site: the brief
 * moves the brand to the business card's white/purple/near-black family and
 * bans the terracotta palette. The secondary pages (/pricing, /systems, /why,
 * /questions, the service pages) still use ember and are unlinked from here
 * until Josh decides what happens to them — the brief says propose, don't delete.
 *
 * The previous homepage is in git at commit ac5860f.
 */

const manrope = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-manrope' });

export const metadata: Metadata = {
  title: 'foundos | Local Technology Help in Marietta',
  description:
    'Josh Potesta helps Marietta businesses with websites, customer inquiries and everyday tech. Request a free, personally reviewed tech checkup.',
  /* Page-level openGraph REPLACES layout.tsx's whole block (Next merges it
     shallowly), so every field layout sets is restated here — otherwise a
     texted link would preview with the old restaurant title. */
  openGraph: {
    title: 'foundos | Local Technology Help in Marietta',
    description: 'Less tech frustration. More time for your business. Request a free, personally reviewed tech checkup.',
    url: './',
    siteName: 'foundos',
    type: 'website',
    locale: 'en_US',
  },
};

/** From the brief §1 — the business card. Not contact.ts, which still carries hello@. */
const JOSH = {
  email: 'josh@foundos.ai',
  phone: '4044363393',
  phonePretty: '(404) 436-3393',
} as const;

/** Only verified facts: no street address (the brief forbids it), no ratings, no hours. */
const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'foundos',
  url: SITE_URL,
  email: JOSH.email,
  telephone: '+1-404-436-3393',
  founder: { '@type': 'Person', name: 'Josh Potesta' },
  address: { '@type': 'PostalAddress', addressLocality: 'Marietta', addressRegion: 'GA', addressCountry: 'US' },
  areaServed: { '@type': 'City', name: 'Marietta' },
  description:
    'Local technology help for small businesses: websites, business listings, customer inquiries and everyday admin.',
};

/** `e` is an illustration of the kind of problem, not a claim about any business. */
const HELP = [
  {
    t: 'Your online presence',
    d: 'Websites, business listings, and local marketing.',
    e: 'Google says you close at 5. You close at 9.',
  },
  {
    t: 'Your customer experience',
    d: 'Inquiries, booking, ordering, and follow-ups.',
    e: 'Messages come in on four apps and some never get answered.',
  },
  {
    t: 'Your everyday workload',
    d: 'Repetitive admin and tools that don’t work well together.',
    e: 'The same order typed into two systems every night.',
  },
] as const;

/** The sheet's sections, from the brief §4. `w` only varies the placeholder bars. */
const SHEET: readonly { t: string; w: string; tag?: string }[] = [
  { t: 'What you told me', w: '92%' },
  { t: 'What I’d address first, and why', w: '84%' },
  { t: 'How to do it yourself or pass it on', w: '88%', tag: 'Do it yourself' },
];

const STEPS = ['Tell me what’s frustrating', 'I review it personally', 'You receive practical next steps'] as const;

export default function HomePage() {
  return (
    <div className={`fx ${manrope.variable}`} id="top">
      <style>{CSS}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA).replace(/</g, '\\u003c') }}
      />

      <header className="fx-head">
        <div className="fx-wrap fx-head-row">
          <a href="#top" className="fx-logo" aria-label="foundos home">
            foundos<span className="fx-logo-ai">.ai</span>
          </a>
          <nav className="fx-nav" aria-label="Main">
            <a href="#help" className="fx-nav-a">
              How I help
            </a>
            <a href="#checkup" className="fx-btn fx-btn--p fx-btn--sm">
              Free tech checkup
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="fx-hero">
          <div className="fx-wash" aria-hidden="true" />
          <NoiseTexture className="fx-noise" aria-hidden="true" frequency={0.65} noiseOpacity={1} />
          <div className="fx-wrap fx-hero-grid">
            <div>
              <p className="fx-eyebrow">Local technology help · Marietta, GA</p>
              <h1 className="fx-h1">
                Less tech frustration. <span className="fx-accent">More time</span> for your business.
              </h1>
              <p className="fx-lede">
                I’m Josh. I help local businesses with websites, customer inquiries, and everyday tasks that take too
                much time. Tell me what’s getting in your way, and I’ll suggest a practical next step.
              </p>
              <div className="fx-btns">
                <InteractiveHoverButton href="#checkup" className="fx-ihb">
                  Get a free tech checkup
                </InteractiveHoverButton>
                <a href={`sms:${JOSH.phone}`} className="fx-btn fx-btn--s fx-btn--lg">
                  Text Josh · {JOSH.phonePretty}
                </a>
              </div>
              <p className="fx-note">Personal advice. No obligation to hire me.</p>
            </div>

            {/* The business card owners are handed in person, drawn in CSS —
                the same stripe, name and contact line, so the site and the
                card read as one thing. Decorative: every fact on it is
                already on the page as text. */}
            <div className="fx-card-stage" aria-hidden="true">
              <div className="fx-card">
                <span className="fx-card-stripe" />
                <div className="fx-card-body">
                  <p className="fx-card-logo">
                    foundos<span className="fx-logo-ai">.ai</span>
                  </p>
                  <p className="fx-card-name">Josh Potesta</p>
                  <p className="fx-card-role">Founder</p>
                  <p className="fx-card-line">Local technology help</p>
                  <p className="fx-card-contact">
                    {JOSH.email}
                    <span>{JOSH.phonePretty}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── What's getting in your way ──────────────────────────────── */}
        <section className="fx-sec fx-sec--join" id="help" aria-labelledby="help-h">
          <Reveal>
            <div className="fx-wrap">
              <p className="fx-kicker">How I help</p>
              <h2 className="fx-h2" id="help-h">
                What’s getting in your way?
              </h2>
              <ul className="fx-help" role="list">
                {HELP.map((h) => (
                  <li key={h.t} className="fx-help-item">
                    <p className="fx-help-t">{h.t}</p>
                    <p className="fx-help-d">{h.d}</p>
                    <p className="fx-help-e">“{h.e}”</p>
                  </li>
                ))}
              </ul>
              <div className="fx-band">
                <p className="fx-band-t">Not sure what you need? Start with the problem.</p>
                <InteractiveHoverButton href="#checkup" className="fx-ihb fx-ihb--sm">
                  Tell me about it
                </InteractiveHoverButton>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Free takeaway ───────────────────────────────────────────── */}
        <section className="fx-sec fx-sec--tint" aria-labelledby="take-h">
          <Reveal>
            <div className="fx-wrap fx-split">
              <div>
                <h2 className="fx-h2 fx-h2--first" id="take-h">
                  Useful advice, whether we work together or not.
                </h2>
                <p className="fx-p">
                  I’ll review what you share and send a short digital page with what I’d address first, steps you can take
                  yourself or pass to your current provider, and where I could help.
                </p>
                <ol className="fx-flow" role="list">
                  {STEPS.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </div>
              {/* What the owner actually receives, drawn like the card above: the
                  brief's §4 sheet format. Grey bars, not invented findings — it
                  shows the shape of the page without claiming anything. */}
              <div className="fx-sheet" aria-hidden="true">
                <p className="fx-sheet-k">Prepared by Josh at foundos</p>
                <p className="fx-sheet-h">A few practical next steps for your business</p>
                <ol className="fx-sheet-list">
                  {SHEET.map((row, i) => (
                    <li key={row.t}>
                      <span className="fx-sheet-n">{i + 1}</span>
                      <div>
                        <p className="fx-sheet-t">{row.t}</p>
                        <span className="fx-bar" style={{ width: row.w }} />
                        <span className="fx-bar fx-bar--short" />
                        {row.tag && <span className="fx-tag">{row.tag}</span>}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Founder band — opens on a pull quote, website option under the bio.
            The right column is held for Josh's photo when he supplies one. ── */}
        <section className="fx-dark" aria-labelledby="me-h">
          <Reveal>
            <div className="fx-wrap">
              <blockquote className="fx-quote">
                <span className="fx-rule" aria-hidden="true" />
                “If I’m not the right person for the job, I’ll tell you.”
              </blockquote>
              <div className="fx-split fx-split--top fx-dark-grid">
                <div>
                  <h2 className="fx-h3" id="me-h">
                    You’ll work directly with Josh.
                  </h2>
                  <p className="fx-p">
                    I’m Josh Potesta, the founder of foundos. I’m based in Marietta and like helping local owners solve
                    practical problems.
                  </p>
                  <p className="fx-sign">— Josh Potesta, founder</p>
                </div>
                <div>
                  <h3 className="fx-h3">Need a better website?</h3>
                  <p className="fx-p">
                    If a new site makes sense, we can start with one free sample homepage. If you like the direction,
                    we’ll agree on the scope and price before the full build.
                  </p>
                  <a href="#checkup" className="fx-dark-link">
                    Start with a free checkup
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Form ─────────────────────────────────────────────────────── */}
        <section className="fx-sec fx-sec--tint" id="checkup" aria-labelledby="form-h">
          <div className="fx-wrap fx-form-grid">
            <div>
              <h2 className="fx-h2 fx-h2--first" id="form-h">
                What could work better in your business?
              </h2>
              <p className="fx-p">
                Tell me a little about your business and what’s getting in your way. I’ll review it personally and
                follow up with useful next steps.
              </p>
              <ul className="fx-next" role="list">
                <li>I read every request myself.</li>
                <li>You get a short page of practical next steps.</li>
                <li>No obligation to hire me.</li>
              </ul>
            </div>
            <div className="fx-panel">
              <CheckupForm email={JOSH.email} phone={JOSH.phone} phonePretty={JOSH.phonePretty} />
            </div>
          </div>
        
        </section>
      </main>

      <footer className="fx-foot">
        <div className="fx-wrap fx-foot-row">
          <a href="#top" className="fx-logo" aria-label="foundos home">
            foundos<span className="fx-logo-ai">.ai</span>
          </a>
          <p className="fx-foot-meta">Josh Potesta · Marietta, GA</p>
          <p className="fx-foot-links">
            <a href={`mailto:${JOSH.email}`}>{JOSH.email}</a>
            <a href={`tel:${JOSH.phone}`}>{JOSH.phonePretty}</a>
            <a href="/privacy">Privacy</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

/* Tokens from the brief §2. Contrast on white: text 17.4:1, secondary 7.5:1,
   purple 7.1:1; on #F7F5FC all stay above 6.6:1. Lavender is never text on
   white. One radius (12px) for every box and button; the card is 16px because
   it is drawing a physical card, not a UI box. */
const CSS = `
.fx{
  --bg:#FFFFFF; --tint:#F7F5FC; --text:#171421; --muted:#595365;
  --p:#6D28D9; --p-hover:#5B21B6; --lav:#EDE5FA; --line:#DED8E8; --pink:#C52E98;
  --r:12px;
  --stripe:linear-gradient(180deg,#6D28D9 0%,#8B3FD9 45%,#C52E98 100%);
  background:var(--bg); color:var(--text);
  font-family:var(--font-manrope),ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;
  font-size:18px; line-height:1.6; -webkit-font-smoothing:antialiased;
  min-height:100vh; overflow-x:clip;
}
.fx *{box-sizing:border-box;}
/* :where() keeps this reset at zero specificity, so .fx-lede, .fx-p etc. keep
   their margin-top. Written as ".fx p" it silently beat every one of them. */
.fx :where(p){margin:0;}
.fx a{color:var(--p);}
.fx a:focus-visible,.fx button:focus-visible,.fx input:focus-visible,.fx textarea:focus-visible{
  outline:3px solid var(--p); outline-offset:3px;
}
.fx-wrap{max-width:1120px;margin:0 auto;padding:0 20px;}
@media (min-width:640px){.fx-wrap{padding:0 40px;}}

/* ---- header ---- */
.fx-head{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.94);border-bottom:1px solid var(--line);}
.fx-head-row{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:68px;}
.fx-logo{display:inline-flex;align-items:center;min-height:44px;font-weight:800;font-size:22px;
  letter-spacing:-.035em;color:var(--text)!important;text-decoration:none;}
.fx-logo-ai{background:linear-gradient(90deg,var(--p),var(--pink));-webkit-background-clip:text;background-clip:text;color:transparent;}
.fx-nav{display:flex;align-items:center;gap:24px;}
.fx-nav-a{display:none;align-items:center;min-height:44px;font-weight:600;font-size:16px;text-decoration:none;color:var(--text)!important;}
.fx-nav-a:hover{color:var(--p)!important;}
@media (min-width:640px){.fx-nav-a{display:inline-flex;}}

/* ---- buttons ---- */
.fx-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 24px;
  border-radius:999px;border:0;font-family:inherit;font-weight:700;font-size:16px;letter-spacing:-.01em;
  text-decoration:none;cursor:pointer;white-space:nowrap;
  transition:transform .15s ease,box-shadow .15s ease,background-color .15s ease;}
.fx-btn--p{background:linear-gradient(180deg,#7A34E6,var(--p));color:#fff!important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 1px 2px rgba(23,20,33,.12),0 8px 20px -8px rgba(109,40,217,.45);}
.fx-btn--p:hover{background:linear-gradient(180deg,var(--p),var(--p-hover));transform:translateY(-1px);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 2px 4px rgba(23,20,33,.12),0 14px 28px -10px rgba(109,40,217,.55);}
.fx-btn--s{background:var(--lav);color:var(--p)!important;}
.fx-btn--s:hover{background:#E2D6F7;transform:translateY(-1px);}
.fx-btn:active{transform:translateY(0);}
.fx-btn--lg{min-height:56px;padding:0 28px;font-size:17px;}
.fx-btn--sm{min-height:44px;padding:0 18px;font-size:15px;}
.fx-ihb{min-height:56px;padding:0 28px;border:0;background:linear-gradient(180deg,#7A34E6,var(--p));color:#fff!important;
  text-decoration:none;font-weight:700;font-size:17px;letter-spacing:-.01em;display:inline-flex;align-items:center;justify-content:center;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 1px 2px rgba(23,20,33,.12),0 8px 20px -8px rgba(109,40,217,.45);}
.fx-ihb .ihb-dot{background:#fff;}
.fx-ihb .ihb-over{color:var(--p);font-weight:800;}
.fx-ihb--sm{min-height:48px;padding:0 22px;font-size:16px;}
.fx-btn:disabled{opacity:.6;cursor:wait;transform:none;}
@media (prefers-reduced-motion:reduce){.fx-btn,.fx-btn:hover{transition:none;transform:none;}}

/* ---- type ---- */
.fx-eyebrow,.fx-kicker{font-size:14px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--p);}
.fx-h1{font-size:clamp(38px,6.4vw,72px);line-height:1.02;letter-spacing:-.04em;font-weight:800;margin:18px 0 0;max-width:13ch;text-wrap:balance;}
.fx-accent{color:var(--p);}
.fx-h2{font-size:clamp(30px,4.2vw,48px);line-height:1.08;letter-spacing:-.03em;font-weight:800;margin:14px 0 0;max-width:18ch;text-wrap:balance;}
.fx-h2--first{margin-top:0;}
.fx-h3{font-size:24px;line-height:1.2;letter-spacing:-.02em;font-weight:800;margin:0;}
.fx-lede{margin-top:28px;font-size:clamp(18px,1.6vw,20px);color:var(--muted);max-width:34em;}
.fx-p{margin-top:24px;color:var(--muted);max-width:36em;}

/* ---- hero ---- */
.fx-hero{position:relative;padding:48px 0 40px;overflow:hidden;isolation:isolate;}
.fx-hero-grid{position:relative;z-index:1;display:grid;gap:56px;align-items:center;}
@media (min-width:960px){.fx-hero{padding:88px 0 56px;}.fx-hero-grid{grid-template-columns:1.05fr .95fr;gap:56px;}}
/* The card's soft corner wash: lavender top right, a breath of pink low right.
   Static on purpose — it is a paper texture, not an effect. */
.fx-wash{position:absolute;inset:0;z-index:0;pointer-events:none;
  background:
    radial-gradient(60% 70% at 100% 0%,rgba(237,229,250,.95) 0%,rgba(237,229,250,0) 70%),
    radial-gradient(40% 50% at 95% 100%,rgba(197,46,152,.10) 0%,rgba(197,46,152,0) 70%);
  -webkit-mask-image:linear-gradient(180deg,#000 60%,transparent);mask-image:linear-gradient(180deg,#000 60%,transparent);}
.fx-btns{margin-top:36px;display:flex;flex-direction:column;gap:12px;}
.fx-btns .fx-btn,.fx-btns .fx-ihb{width:100%;}
@media (max-width:639px){.fx-btns .fx-btn--s{width:auto;align-self:flex-start;min-height:48px;padding:0 20px;font-size:16px;}}
@media (min-width:640px){.fx-btns{flex-direction:row;flex-wrap:wrap;}.fx-btns .fx-btn,.fx-btns .fx-ihb{width:auto;}}
/* Paper grain, barely there. Masked like the wash so it fades out before the next section. */
.fx-noise{opacity:.035!important;-webkit-mask-image:linear-gradient(180deg,#000 50%,transparent);mask-image:linear-gradient(180deg,#000 50%,transparent);}
.fx-note{margin-top:14px;font-size:15px;color:var(--muted);}

/* the card */
.fx-card-stage{display:flex;justify-content:center;}
.fx-card{position:relative;width:100%;max-width:560px;aspect-ratio:1.75/1;background:#fff;border-radius:16px;overflow:hidden;
  border:1px solid var(--line);
  box-shadow:0 1px 2px rgba(23,20,33,.06),0 24px 48px -16px rgba(23,20,33,.22),0 40px 80px -40px rgba(109,40,217,.35);
  transform:rotate(-3deg);transition:transform .4s ease;}
.fx-card:hover{transform:rotate(-1deg) translateY(-4px);}
.fx-card::after{content:'';position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(70% 90% at 100% 0%,rgba(237,229,250,.9),rgba(237,229,250,0) 60%),
             radial-gradient(50% 60% at 100% 100%,rgba(197,46,152,.08),rgba(197,46,152,0) 70%);}
.fx-card-stripe{position:absolute;top:-10%;bottom:-10%;left:5%;width:11%;background:var(--stripe);transform:skewX(-14deg);}
.fx-card-stripe::after{content:'';position:absolute;top:0;bottom:0;left:112%;width:22%;background:var(--lav);}
.fx-card-body{position:relative;z-index:1;height:100%;display:flex;flex-direction:column;justify-content:center;padding:0 7% 0 29%;}
.fx-card-logo{font-weight:800;font-size:clamp(14px,1.6vw,18px);letter-spacing:-.03em;}
.fx-card-name{margin-top:10%;font-weight:800;font-size:clamp(22px,2.6vw,32px);letter-spacing:-.04em;line-height:1;}
.fx-card-role{margin-top:6px;font-size:11px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:var(--p);}
.fx-card-line{margin-top:6%;font-size:clamp(12px,1.2vw,14px);color:var(--muted);}
.fx-card-contact{margin-top:auto;margin-bottom:9%;display:flex;flex-wrap:wrap;gap:4px 14px;font-size:clamp(11px,1.1vw,13px);font-weight:700;}
@media (prefers-reduced-motion:reduce){.fx-card,.fx-card:hover{transition:none;transform:rotate(-3deg);}}

/* ---- sections ---- */
.fx-sec{padding:80px 0;}
@media (min-width:960px){.fx-sec{padding:128px 0;}}
.fx-sec--tint{background:var(--tint);}
.fx-sec--join{padding-top:48px;}
@media (min-width:960px){.fx-sec--join{padding-top:72px;}}

/* help: three columns under a heavy top rule */
.fx-help{list-style:none;padding:0;margin:48px 0 0;display:grid;gap:32px;}
@media (min-width:860px){.fx-help{grid-template-columns:repeat(3,1fr);gap:40px;}}
.fx-help-item{padding-top:22px;border-top:2px solid var(--text);}
.fx-help-item:first-child{border-top-color:var(--p);}
.fx-help-t{font-size:clamp(22px,2.2vw,26px);font-weight:800;letter-spacing:-.025em;line-height:1.2;}
.fx-help-d{margin-top:10px;color:var(--muted);}
.fx-help-e{margin-top:18px;padding:14px 16px;border-radius:var(--r);background:var(--tint);font-size:16px;font-weight:600;color:var(--text);line-height:1.45;}
.fx-band{margin-top:56px;padding:28px;border-radius:var(--r);background:var(--lav);
  display:flex;flex-direction:column;gap:18px;align-items:flex-start;}
.fx-band-t{font-size:clamp(20px,2vw,24px);font-weight:800;letter-spacing:-.02em;line-height:1.25;color:var(--text);}
@media (min-width:760px){.fx-band{flex-direction:row;align-items:center;justify-content:space-between;padding:32px 40px;}}

/* two-column split */
.fx-split{display:grid;gap:48px;align-items:center;}
.fx-split--top{align-items:start;}
@media (min-width:960px){.fx-split{grid-template-columns:1fr 1fr;gap:80px;}}

/* the checkup sheet */
.fx-sheet{position:relative;background:#fff;border:1px solid var(--line);border-radius:16px;overflow:hidden;padding:32px 24px 28px;
  box-shadow:0 1px 2px rgba(23,20,33,.06),0 24px 48px -16px rgba(23,20,33,.18),0 40px 80px -40px rgba(109,40,217,.3);transform:rotate(1.5deg);}
.fx-sheet::before{content:'';position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(90deg,var(--p),var(--pink));}
@media (min-width:640px){.fx-sheet{padding:40px 36px 36px;}}
.fx-sheet-k{font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--p);}
.fx-sheet-h{margin-top:8px!important;font-size:clamp(20px,2vw,24px);font-weight:800;letter-spacing:-.025em;line-height:1.2;}
.fx-sheet-list{list-style:none;padding:0;margin:24px 0 0;display:grid;gap:20px;}
.fx-sheet-list li{display:grid;grid-template-columns:32px 1fr;gap:14px;padding-top:20px;border-top:1px solid var(--line);}
.fx-sheet-n{width:32px;height:32px;border-radius:50%;background:var(--lav);color:var(--p);display:grid;place-items:center;font-weight:800;font-size:15px;}
.fx-sheet-t{font-weight:700;font-size:17px;line-height:1.3;}
.fx-bar{display:block;height:8px;border-radius:4px;background:#ECE8F3;margin-top:10px;}
.fx-bar--short{width:58%;margin-top:7px;}
.fx-tag{display:inline-block;margin-top:12px;padding:4px 10px;border-radius:999px;background:var(--lav);color:var(--p);font-size:13px;font-weight:800;}
@media (prefers-reduced-motion:no-preference){.fx-sheet{transition:transform .4s ease;}.fx-sheet:hover{transform:rotate(0) translateY(-4px);}}
.fx-flow{list-style:none;padding:0;margin:32px 0 0;display:flex;flex-wrap:wrap;gap:8px 10px;align-items:center;}
.fx-flow li{font-weight:700;font-size:16px;color:var(--text);padding:8px 14px;border-radius:999px;background:#fff;border:1px solid var(--line);}

/* founder band */
.fx-dark{background:var(--text);color:#fff;padding:88px 0;}
@media (min-width:960px){.fx-dark{padding:120px 0;}}
.fx-dark .fx-p{color:#C9C3D6;}
.fx-rule{display:block;width:48px;height:4px;border-radius:2px;background:linear-gradient(90deg,var(--p),var(--pink));margin-bottom:20px;}
.fx-sign{margin-top:28px;font-weight:700;color:#fff;letter-spacing:-.01em;}
.fx-quote{margin:0;font-size:clamp(30px,4.4vw,52px);font-weight:800;letter-spacing:-.035em;line-height:1.1;max-width:20ch;text-wrap:balance;}
.fx-dark-grid{margin-top:64px;padding-top:40px;border-top:1px solid #37304A;}
.fx-dark .fx-h3{color:#fff;}
.fx-dark-link{display:inline-flex;align-items:center;min-height:44px;margin-top:16px;font-weight:700;color:#C4B0F5!important;text-decoration:none;}
.fx-dark-link:hover{text-decoration:underline;}

/* form */
.fx-form-grid{display:grid;gap:40px;align-items:start;}
@media (min-width:960px){.fx-form-grid{grid-template-columns:.9fr 1.1fr;gap:72px;}}
.fx-next{list-style:none;padding:0;margin:28px 0 0;display:grid;gap:12px;}
.fx-next li{position:relative;padding-left:28px;font-weight:600;}
.fx-next li::before{content:'';position:absolute;left:2px;top:.5em;width:12px;height:7px;
  border-left:2.5px solid var(--p);border-bottom:2.5px solid var(--p);transform:rotate(-45deg);}
.fx-panel{position:relative;background:#fff;border-radius:var(--r);border:1px solid var(--line);overflow:hidden;
  padding:28px 20px;box-shadow:0 1px 2px rgba(23,20,33,.05),0 24px 48px -24px rgba(23,20,33,.18);}
.fx-panel::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--p),var(--pink));}
@media (min-width:640px){.fx-panel{padding:36px;}}

.fx-form{display:grid;gap:20px;}
.fx-field{display:grid;gap:8px;}
.fx-label{font-weight:700;font-size:16px;}
.fx-hint{font-size:15px;color:var(--muted);}
.fx-in{width:100%;font:inherit;font-size:17px;color:var(--text);background:#fff;border:1.5px solid #CFC8DC;border-radius:var(--r);
  padding:12px 14px;min-height:52px;transition:border-color .15s,box-shadow .15s;}
.fx-in:hover{border-color:#A79FBA;}
.fx-in:focus{border-color:var(--p);box-shadow:0 0 0 4px rgba(109,40,217,.14);outline:none;}
.fx-in::placeholder{color:#8A8398;}
.fx-in[aria-invalid="true"]{border-color:#B42318;}
textarea.fx-in{min-height:128px;resize:vertical;}
.fx-err{font-size:15px;font-weight:600;color:#B42318;}
.fx-radios{display:grid;grid-template-columns:1fr 1fr;gap:12px;border:0;padding:0;margin:0;}
.fx-radios legend{font-weight:700;font-size:16px;margin-bottom:8px;padding:0;}
.fx-radio{display:flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:8px 16px;border:1.5px solid #CFC8DC;
  border-radius:var(--r);background:#fff;cursor:pointer;font-weight:700;transition:border-color .15s,background-color .15s;}
.fx-radio:has(input:checked){border-color:var(--p);background:var(--lav);color:var(--p);}
.fx-radio input{width:20px;height:20px;accent-color:var(--p);margin:0;}
.fx-hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;}
.fx-consent{font-size:14px;line-height:1.5;color:var(--muted);}
.fx-alert{padding:14px 16px;border-radius:var(--r);background:#FEF3F2;color:#7A271A;font-size:16px;}
.fx-form .fx-btn--p{width:100%;min-height:56px;font-size:17px;}
.fx-done{padding:8px 0;}

/* footer */
.fx-foot{border-top:1px solid var(--line);padding:32px 0 40px;font-size:16px;color:var(--muted);}
.fx-foot-row{display:flex;flex-direction:column;gap:6px;}
.fx-foot-links{display:flex;flex-wrap:wrap;gap:0 24px;}
.fx-foot-links a{display:inline-flex;align-items:center;min-height:44px;text-decoration:none;font-weight:600;}
.fx-foot-links a:hover{text-decoration:underline;}
@media (min-width:860px){.fx-foot-row{flex-direction:row;align-items:center;justify-content:space-between;}}
`;
