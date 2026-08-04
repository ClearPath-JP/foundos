'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CAL, EMAIL, integrations } from '../content';

/* Direction — "Ember": warm dark command center. Near-black warm field with a
   soft coral/amber sunset glow + faint grid. The star is a live agent console
   streaming the brand's 24/7 decisions. Money-forward, brand-framed, de-AI'd.
   Built to become the foundos.ai homepage; self-contained copy so the shared
   content.ts (and other /explore variants) stay untouched. */

const brand = { name: 'foundos', tld: '.ai' };

const heroRotating = ['books clients', 'answers the phone', 'follows up', 'wins members back', 'never sleeps'];

const hero = {
  eyebrow: 'The system behind brands that scale',
  subA: 'Your online presence is your brand — and it should be ready to respond the moment someone reaches out.',
  subB: 'I build the system behind it: a website that sells, booking that runs itself, and a receptionist that answers every call. Your brand, always on — so you can show up and do what you’re great at.',
  ctaPrimary: 'Book a 20-min call',
  ctaSecondary: 'See how it works',
  reassure: 'No pitch. No commitment. I’ll tell you honestly if it’s a fit.',
  trustLabel: 'Works with the tools you already use',
};

const problem = {
  kicker: 'The trap',
  title: 'You didn’t start your business to become its employee.',
  body: [
    'You own the place, so it all lands on you — every booking, every missed call, every follow-up, every no-show. You’re working 60-hour weeks doing by hand what should run on its own.',
    'You’re paying for five tools that don’t talk to each other. Your booking doesn’t trigger your texts. Your payments don’t trigger your follow-ups. Nothing’s connected — so you’re the glue holding it together.',
  ],
  punch: 'You work more, earn less than you should, and your brand goes quiet the moment you step away.',
  fix: 'All of it is fixable — without ripping out what you already use.',
};

type Step = { n: string; title: string; short: string; body: string };
const steps: Step[] = [
  { n: '01', title: 'Audit', short: 'I find what’s leaking.',
    body: 'I map your tools and your day, then put real numbers on it — the missed calls, the lost follow-ups, the hours. You get a report, not a guess.' },
  { n: '02', title: 'Connect', short: 'I make your tools talk.',
    body: 'No rip-and-replace. Your booking, payments, and messaging finally work as one system — the stack you already pay for, working together.' },
  { n: '03', title: 'Automate', short: 'I put your brand on autopilot.',
    body: 'Bookings, reminders, follow-ups, win-backs, and a receptionist that answers every call — running 24/7, so your brand responds the instant someone reaches out.' },
  { n: '04', title: 'Optimize', short: 'I double down on what makes money.',
    body: 'You get a dashboard of real results. Every month I cut what isn’t working and scale what is. Revenue, not vibes.' },
];

type Log = { ts: string; cat: 'lead' | 'winback' | 'call' | 'fill'; text: string };
const agentLogs: Log[] = [
  { ts: '23:47', cat: 'lead', text: 'New lead texted after hours — replied, answered her question, booked her for Saturday.' },
  { ts: '08:12', cat: 'call', text: 'Caller asked about pricing while you were with a client — answered and booked a consult.' },
  { ts: '11:30', cat: 'winback', text: 'Client hasn’t shown in 3 weeks — sent a personal win-back offer.' },
  { ts: '14:05', cat: 'fill', text: 'Wednesday’s 6pm class was at 60% — sent a bring-a-friend invite to fill it.' },
];
const CAT_LABEL: Record<Log['cat'], string> = { lead: 'booked', call: 'answered', winback: 'sent', fill: 'sent' };

type Tier = { name: string; build: string; mo: string; blurb: string; maps: string; popular?: boolean };
const tiers: Tier[] = [
  { name: 'Launch', build: '$2,000', mo: '+ $200/mo', blurb: 'Get online, look pro, stop the leaks.', maps: 'Solo & getting started' },
  { name: 'Complete', build: '$3,500', mo: '+ $350/mo', blurb: 'Your brand sells and answers the phone for you.', maps: 'Most businesses', popular: true },
  { name: 'Growth', build: '$5,000+', mo: '+ $500+/mo', blurb: 'Fill the calendar, not just save time.', maps: 'Ready to scale hard' },
];

type Feat = { label: string; on: [boolean, boolean, boolean] };
const feats: Feat[] = [
  { label: 'Custom website', on: [true, true, true] },
  { label: 'Online booking', on: [true, true, true] },
  { label: 'Reminders, follow-ups & review requests', on: [true, true, true] },
  { label: 'Unified dashboard', on: [true, true, true] },
  { label: 'Sell online (ordering, class packs, memberships)', on: [false, true, true] },
  { label: 'AI receptionist — answers every call 24/7', on: [false, true, true] },
  { label: 'Two-way texting', on: [false, true, true] },
  { label: 'Retention, win-back & referral campaigns', on: [false, false, true] },
  { label: 'Paid ads, built & managed', on: [false, false, true] },
  { label: 'Monthly strategy call with me', on: [false, false, true] },
];

const startupLine =
  'Just starting out? I’ll build the whole thing from zero — name, logo, colors, and the systems that run it — so on day one, all you do is show up.';

const about = {
  kicker: 'The builder',
  name: 'Josh',
  lines: [
    'I build the systems that run local service businesses — the website, the booking, the follow-ups, and the receptionist that never sleeps.',
    'I started foundos because I kept seeing the same thing: great owners trapped inside their own business, doing by hand what a good system should handle — watching their brand go quiet every time they stepped away.',
    'So I build the system, connect what you already use, and put your brand on autopilot. You show up and do what you’re great at. The rest runs itself.',
  ],
  kicker2: 'Your business should work for you — not the other way around.',
  signoff: '— Josh',
};

const trust = {
  eyebrow: 'Why work with me now',
  title: 'I’m taking a handful of founding clients — and being early is the advantage.',
  scarcity: 'Taking 5 founding clients this quarter',
  sub: 'foundos is new, and that’s the edge: founding clients get more of my time, founding pricing locked in for good, and someone who treats your results like his reputation depends on it. Because it does.',
  promises: [
    { title: 'A real guarantee', body: 'If our first call doesn’t surface something worth building, we part as friends — no pitch, no pressure.' },
    { title: 'Live in about two weeks', body: 'I handle the whole build — the audit, the setup, the automations — while you keep running your business.' },
    { title: 'You own everything', body: 'Your website, your data, your systems are yours. Cancel anytime and you keep what we built.' },
    { title: 'Direct access to me', body: 'No tickets, no offshore team. You work with Josh — the person who builds and runs it.' },
  ],
};

const closing = {
  vision: 'The owners still doing it all by hand get left behind. The ones who systematize their brand scale it.',
  title: 'Let’s build the system — so your brand runs, and grows, without you.',
  sub: 'A 20-minute call. I’ll tell you exactly what I’d build first — no pitch.',
  cta: 'Book your free 20-min call',
  reassure: 'No pitch. No obligation. If I can’t help, I’ll tell you.',
};

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default function Ember() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [wi, setWi] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWi((p) => (p + 1) % heroRotating.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="emb-root">
      <style>{CSS}</style>

      {/* warm background field */}
      <div aria-hidden className="emb-bg">
        <div className="emb-grid" />
        <span className="emb-glow emb-glow-coral" />
        <span className="emb-glow emb-glow-amber" />
        <div className="emb-vignette" />
      </div>

      {/* nav */}
      <nav className="emb-nav">
        <div className="emb-wrap emb-nav-inner">
          <span className="emb-logo">
            <span className="emb-logo-mark" />
            {brand.name}<span className="emb-logo-dot">{brand.tld}</span>
          </span>
          <div className="emb-nav-links">
            <a href="#trap">Why</a>
            <a href="#system">System</a>
            <a href="#console">Live agent</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="emb-nav-right">
            <a href={CAL} className="emb-btn emb-btn-sm">Book a call</a>
            <button className="emb-nav-toggle" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu" aria-expanded={menuOpen}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="emb-mobile-menu">
            <a href="#trap" onClick={() => setMenuOpen(false)}>Why</a>
            <a href="#system" onClick={() => setMenuOpen(false)}>System</a>
            <a href="#console" onClick={() => setMenuOpen(false)}>Live agent</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          </div>
        )}
      </nav>

      <main className="emb-wrap">
        {/* hero */}
        <section className="emb-hero">
          <p className="emb-eyebrow emb-rise" style={{ animationDelay: '0s' }}>
            <span className="emb-eyebrow-dot" />{hero.eyebrow}
          </p>

          <h1 className="emb-h1 emb-rise" style={{ animationDelay: '.06s' }}>
            More <span className="emb-grad">bookings.</span><br />
            Fewer missed calls. Less busywork.
          </h1>

          <div className="emb-hero-rot emb-rise" style={{ animationDelay: '.12s' }}>
            <span className="emb-hero-rot-label">Your brand</span>
            <span className="emb-hero-rot-word">
              <motion.span
                key={wi}
                initial={{ opacity: 0.4, y: 6, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="emb-grad"
              >
                {heroRotating[wi]}
              </motion.span>
            </span>
            <span className="emb-hero-rot-label">— 24/7.</span>
          </div>

          <p className="emb-sub emb-rise" style={{ animationDelay: '.18s' }}>
            {hero.subA} {hero.subB}
          </p>

          <div className="emb-cta-row emb-rise" style={{ animationDelay: '.24s' }}>
            <a href={CAL} className="emb-btn emb-btn-lg">{hero.ctaPrimary} →</a>
            <a href="#system" className="emb-btn emb-btn-ghost emb-btn-lg">{hero.ctaSecondary}</a>
          </div>

          <p className="emb-reassure emb-rise" style={{ animationDelay: '.3s' }}>{hero.reassure}</p>
        </section>

        {/* trust strip */}
        <section className="emb-trust-strip">
          <p className="emb-trust-strip-label">{hero.trustLabel}</p>
          <div className="emb-chips">
            {integrations.map((t) => <span key={t} className="emb-chip">{t}</span>)}
          </div>
        </section>

        {/* the trap */}
        <section id="trap" className="emb-section">
          <div className="emb-panel emb-trap">
            <p className="emb-kicker">{problem.kicker}</p>
            <h2 className="emb-h2">{problem.title}</h2>
            {problem.body.map((b, i) => <p key={i} className="emb-p">{b}</p>)}
            <p className="emb-punch">{problem.punch}</p>
            <p className="emb-fix">{problem.fix}</p>
          </div>
        </section>

        {/* how it works */}
        <section id="system" className="emb-section">
          <div className="emb-section-head">
            <p className="emb-kicker">How it works</p>
            <h2 className="emb-h2">Four steps to a business that runs itself</h2>
          </div>
          <div className="emb-grid-2">
            {steps.map((s) => (
              <div key={s.n} className="emb-panel emb-step">
                <span className="emb-step-n">{s.n}</span>
                <h3 className="emb-step-title">{s.title}</h3>
                <p className="emb-step-short">{s.short}</p>
                <p className="emb-step-body">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* live agent console — the star */}
        <section id="console" className="emb-section">
          <div className="emb-section-head">
            <p className="emb-kicker">Your invisible employee</p>
            <h2 className="emb-h2">Your brand, making smart calls 24/7</h2>
          </div>
          <div className="emb-console">
            <div className="emb-console-bar">
              <span className="emb-tl emb-tl-r" /><span className="emb-tl emb-tl-y" /><span className="emb-tl emb-tl-g" />
              <span className="emb-console-title">foundos agent · live</span>
              <span className="emb-console-live"><span className="emb-live-dot" />working</span>
            </div>
            <div className="emb-console-body">
              <div className="emb-log emb-log-sys">
                <span className="emb-ts">00:00</span>
                <span className="emb-log-text"><span className="emb-prompt">$</span> agent online · watching your booking, phone & messages</span>
              </div>
              {agentLogs.map((m, i) => (
                <div key={i} className="emb-log">
                  <span className="emb-ts">{m.ts}</span>
                  <span className={`emb-log-cat emb-cat-${m.cat}`} />
                  <span className="emb-log-text">{m.text}</span>
                  <span className="emb-log-done">✓ {CAT_LABEL[m.cat]}</span>
                </div>
              ))}
              <div className="emb-log emb-log-cursor">
                <span className="emb-ts">now</span>
                <span className="emb-log-text"><span className="emb-prompt">›</span> scanning this week’s calendar for gaps to fill<span className="emb-cursor" /></span>
              </div>
            </div>
          </div>
        </section>

        {/* video slot — founder intro placeholder */}
        <section className="emb-section">
          <div className="emb-video">
            <div className="emb-video-inner">
              <button className="emb-video-play" aria-label="Play intro (coming soon)">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
              </button>
              <p className="emb-video-kicker">Meet the builder</p>
              <p className="emb-video-cap">A 60-second intro — who I am and how I build. Coming soon.</p>
            </div>
          </div>
        </section>

        {/* pricing */}
        <section id="pricing" className="emb-section">
          <div className="emb-section-head">
            <p className="emb-kicker">Pricing</p>
            <h2 className="emb-h2">Build it once. A simple monthly runs it.</h2>
            <p className="emb-p emb-section-sub">Every build includes your website. Pick where you start — move up anytime.</p>
          </div>

          {/* desktop comparison table */}
          <div className="emb-ptable">
            <div className="emb-pt-row emb-pt-head">
              <div className="emb-pt-cell emb-pt-corner" />
              {tiers.map((t) => (
                <div key={t.name} className={`emb-pt-cell emb-pt-th ${t.popular ? 'emb-pt-pop' : ''}`}>
                  {t.popular && <span className="emb-pt-badge">Most popular</span>}
                  <span className="emb-pt-name">{t.name}</span>
                  <span className="emb-pt-price">{t.build}</span>
                  <span className="emb-pt-mo">{t.mo}</span>
                  <span className="emb-pt-blurb">{t.blurb}</span>
                  <a href={CAL} className={`emb-btn ${t.popular ? '' : 'emb-btn-ghost'} emb-pt-cta`}>Book a call →</a>
                </div>
              ))}
            </div>
            {feats.map((f) => (
              <div key={f.label} className="emb-pt-row">
                <div className="emb-pt-cell emb-pt-label">{f.label}</div>
                {f.on.map((v, i) => (
                  <div key={i} className={`emb-pt-cell emb-pt-checkcell ${tiers[i].popular ? 'emb-pt-pop' : ''}`}>
                    {v ? <span className="emb-pt-check"><Check /></span> : <span className="emb-pt-dash">—</span>}
                  </div>
                ))}
              </div>
            ))}
            <div className="emb-pt-row emb-pt-foot">
              <div className="emb-pt-cell emb-pt-label" />
              {tiers.map((t, i) => (
                <div key={i} className={`emb-pt-cell emb-pt-maps ${t.popular ? 'emb-pt-pop' : ''}`}>{t.maps}</div>
              ))}
            </div>
          </div>

          {/* mobile cards */}
          <div className="emb-pcards">
            {tiers.map((t, i) => (
              <div key={t.name} className={`emb-panel emb-pcard ${t.popular ? 'emb-pcard-pop' : ''}`}>
                {t.popular && <span className="emb-pt-badge">Most popular</span>}
                <span className="emb-pt-name">{t.name}</span>
                <div className="emb-pcard-price">{t.build}<span className="emb-pt-mo">{t.mo}</span></div>
                <p className="emb-pt-blurb">{t.blurb}</p>
                <ul className="emb-pcard-feats">
                  {feats.filter((f) => f.on[i]).map((f) => (
                    <li key={f.label}><span className="emb-pt-check"><Check /></span>{f.label}</li>
                  ))}
                </ul>
                <a href={CAL} className={`emb-btn ${t.popular ? '' : 'emb-btn-ghost'} emb-pcard-cta`}>Book a call →</a>
              </div>
            ))}
          </div>

          <p className="emb-startup">{startupLine}</p>
        </section>

        {/* about */}
        <section className="emb-section">
          <div className="emb-panel emb-about">
            <div className="emb-about-photo">
              <Image src="/josh.png" alt="Josh, founder of foundos.ai" fill sizes="200px" className="emb-about-img" />
              <span className="emb-about-ring" />
            </div>
            <div className="emb-about-copy">
              <p className="emb-kicker">{about.kicker}</p>
              <h2 className="emb-h2">Hey, I&apos;m {about.name}.</h2>
              {about.lines.map((l, i) => <p key={i} className="emb-p">{l}</p>)}
              <p className="emb-about-kicker">{about.kicker2}</p>
              <p className="emb-hand">{about.signoff}</p>
            </div>
          </div>
        </section>

        {/* why now — trust band */}
        <section className="emb-section">
          <div className="emb-section-head">
            <p className="emb-kicker">{trust.eyebrow}</p>
            <h2 className="emb-h2">{trust.title}</h2>
            <span className="emb-scarcity"><span className="emb-scarcity-dot" />{trust.scarcity}</span>
            <p className="emb-p emb-section-sub">{trust.sub}</p>
          </div>
          <div className="emb-promises">
            {trust.promises.map((pr) => (
              <div key={pr.title} className="emb-panel emb-promise">
                <span className="emb-promise-check"><Check /></span>
                <h3 className="emb-promise-title">{pr.title}</h3>
                <p className="emb-promise-body">{pr.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* vision + final cta */}
        <section className="emb-section emb-final">
          <p className="emb-vision">{closing.vision}</p>
          <h2 className="emb-final-title">{closing.title}</h2>
          <p className="emb-final-sub">{closing.sub}</p>
          <a href={CAL} className="emb-btn emb-btn-lg">{closing.cta} →</a>
          <p className="emb-reassure">{closing.reassure}</p>
        </section>

        {/* footer */}
        <footer className="emb-footer">
          <div className="emb-footer-brand">
            <span className="emb-logo emb-logo-foot">{brand.name}<span className="emb-logo-dot">{brand.tld}</span></span>
            <p className="emb-footer-tag">The system behind brands that scale.</p>
          </div>
          <div className="emb-footer-links">
            <a href="#system">System</a>
            <a href="#pricing">Pricing</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={CAL} className="emb-btn emb-btn-sm">Book a call</a>
          </div>
          <span className="emb-foot-meta">© 2026 foundos.ai · Built by Josh</span>
        </footer>
      </main>
    </div>
  );
}

const CSS = `
.emb-root{--bg:#0e0a08;--coral:#ff6a3d;--coral2:#ff8a4c;--amber:#ffb24d;--hi:#fbf2ea;--tx:#c9bcb2;--dim:#94867c;--line:rgba(255,180,140,.1);--panel1:rgba(255,175,130,.06);--panel2:rgba(255,175,130,.02);position:relative;min-height:100vh;background:var(--bg);color:var(--tx);font-family:var(--font-inter),system-ui,sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;}
.emb-wrap{max-width:1140px;margin:0 auto;padding:0 24px;}

/* background */
.emb-bg{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(120% 90% at 50% -8%,#1a0f0a 0%,#0e0a08 58%);overflow:hidden;}
.emb-grid{position:absolute;inset:0;background-image:radial-gradient(rgba(255,200,170,.05) 1px,transparent 1px);background-size:34px 34px;-webkit-mask-image:radial-gradient(110% 80% at 50% 0%,#000 30%,transparent 75%);mask-image:radial-gradient(110% 80% at 50% 0%,#000 30%,transparent 75%);}
.emb-glow{position:absolute;border-radius:50%;filter:blur(120px);}
.emb-glow-coral{width:56vw;height:56vw;left:-12vw;top:-20vw;background:radial-gradient(circle,rgba(255,106,61,.4),transparent 64%);}
.emb-glow-amber{width:50vw;height:50vw;right:-14vw;top:26vw;background:radial-gradient(circle,rgba(255,168,72,.24),transparent 66%);}
.emb-vignette{position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,10,8,0) 55%,rgba(14,10,8,.9) 100%);}

/* nav */
.emb-nav{position:sticky;top:0;z-index:40;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);background:rgba(14,10,8,.62);border-bottom:1px solid var(--line);}
.emb-nav-inner{display:flex;align-items:center;justify-content:space-between;height:66px;}
.emb-logo{display:inline-flex;align-items:center;gap:9px;font-weight:800;font-size:20px;letter-spacing:-.03em;color:var(--hi);}
.emb-logo-mark{width:18px;height:18px;border-radius:6px;background:linear-gradient(135deg,#ff6a3d,#ffb24d);box-shadow:0 0 16px rgba(255,106,61,.6);}
.emb-logo-dot{background:linear-gradient(90deg,#ff8a4c,#ffb24d);-webkit-background-clip:text;background-clip:text;color:transparent;}
.emb-nav-links{display:flex;gap:30px;}
.emb-nav-links a{font-size:14px;color:var(--dim);text-decoration:none;font-weight:500;transition:color .15s;}
.emb-nav-links a:hover{color:var(--hi);}
.emb-nav-right{display:flex;align-items:center;gap:10px;}
.emb-nav-toggle{display:none;align-items:center;justify-content:center;width:44px;height:44px;border-radius:11px;background:rgba(255,175,130,.06);border:1px solid var(--line);color:var(--tx);cursor:pointer;}
.emb-nav-toggle svg{width:22px;height:22px;}
.emb-mobile-menu{display:flex;flex-direction:column;gap:2px;padding:8px 20px 16px;background:rgba(14,10,8,.96);backdrop-filter:blur(16px);border-bottom:1px solid var(--line);}
.emb-mobile-menu a{padding:13px 8px;font-size:16px;font-weight:600;color:var(--hi);text-decoration:none;border-radius:8px;}

main.emb-wrap{position:relative;z-index:1;}

/* buttons */
.emb-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:linear-gradient(180deg,#ff7a45,#f2571f);color:#1a0d06;font-weight:700;font-size:15px;padding:13px 24px;border-radius:11px;text-decoration:none;border:1px solid rgba(255,190,150,.28);box-shadow:0 10px 30px rgba(242,87,31,.34),0 0 40px rgba(255,106,61,.2);transition:transform .15s,box-shadow .15s;cursor:pointer;}
.emb-btn:hover{transform:translateY(-2px);box-shadow:0 14px 38px rgba(242,87,31,.46),0 0 56px rgba(255,106,61,.32);}
.emb-btn-sm{padding:9px 17px;font-size:13.5px;border-radius:9px;}
.emb-btn-lg{padding:16px 30px;font-size:16px;}
.emb-btn-ghost{background:rgba(255,175,130,.05);color:var(--hi);border:1px solid rgba(255,180,140,.22);box-shadow:none;backdrop-filter:blur(6px);}
.emb-btn-ghost:hover{border-color:rgba(255,180,140,.4);background:rgba(255,175,130,.09);box-shadow:0 0 24px rgba(255,140,90,.1);}

/* hero */
.emb-hero{text-align:center;padding:92px 0 30px;max-width:880px;margin:0 auto;}
.emb-eyebrow{display:inline-flex;align-items:center;gap:9px;font-family:var(--font-geist-mono),monospace;font-size:12.5px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--amber);padding:7px 15px;border:1px solid var(--line);border-radius:999px;background:rgba(255,175,130,.05);margin-bottom:28px;}
.emb-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:#ff6a3d;box-shadow:0 0 10px #ff6a3d;}
.emb-h1{font-size:clamp(40px,6.4vw,76px);font-weight:800;line-height:1.05;letter-spacing:-.04em;margin-bottom:18px;color:var(--hi);}
.emb-grad{display:inline-block;background:linear-gradient(90deg,#ff8a4c,#ff6a3d 42%,#ffb24d);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 24px rgba(255,120,60,.4));}
.emb-hero-rot{display:inline-flex;align-items:baseline;gap:9px;flex-wrap:wrap;justify-content:center;font-family:var(--font-geist-mono),monospace;font-size:clamp(15px,2vw,18px);color:var(--dim);margin-bottom:24px;}
.emb-hero-rot-word{display:inline-block;min-width:170px;text-align:left;font-weight:700;}
.emb-sub{font-size:18.5px;line-height:1.62;color:var(--tx);max-width:660px;margin:0 auto 32px;}
.emb-cta-row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
.emb-reassure{font-size:13.5px;color:var(--dim);margin-top:18px;}
.emb-rise{opacity:0;animation:embRise .6s cubic-bezier(.22,1,.36,1) both;}
@keyframes embRise{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}

/* trust strip */
.emb-trust-strip{padding:8px 0 40px;text-align:center;}
.emb-trust-strip-label{font-family:var(--font-geist-mono),monospace;font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);margin-bottom:18px;}
.emb-chips{display:flex;flex-wrap:wrap;gap:9px;justify-content:center;}
.emb-chip{font-family:var(--font-geist-mono),monospace;font-size:12.5px;padding:7px 14px;border-radius:8px;background:rgba(255,175,130,.05);border:1px solid var(--line);color:var(--tx);}

/* sections */
.emb-section{padding:58px 0;}
.emb-section-head{text-align:center;max-width:720px;margin:0 auto 40px;}
.emb-section-sub{margin-left:auto;margin-right:auto;}
.emb-kicker{font-family:var(--font-geist-mono),monospace;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--coral);margin-bottom:14px;}
.emb-h2{font-size:clamp(28px,3.9vw,44px);font-weight:800;letter-spacing:-.032em;line-height:1.12;color:var(--hi);}
.emb-p{font-size:16px;line-height:1.72;color:var(--tx);margin-top:14px;}

/* panels */
.emb-panel{background:linear-gradient(180deg,var(--panel1),var(--panel2));border:1px solid var(--line);border-radius:20px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}
.emb-trap{padding:48px;max-width:820px;margin:0 auto;text-align:center;}
.emb-punch{font-size:18.5px;font-weight:700;color:var(--amber);margin-top:24px;line-height:1.5;}
.emb-fix{font-size:21px;font-weight:800;margin-top:10px;background:linear-gradient(90deg,#ff8a4c,#ffb24d);-webkit-background-clip:text;background-clip:text;color:transparent;}

/* steps */
.emb-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
.emb-step{padding:32px;transition:border-color .2s,transform .2s;}
.emb-step:hover{border-color:rgba(255,140,90,.4);transform:translateY(-3px);}
.emb-step-n{display:inline-block;font-family:var(--font-geist-mono),monospace;font-size:30px;font-weight:800;letter-spacing:-.02em;background:linear-gradient(135deg,#ff8a4c,#ffb24d);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 18px rgba(255,140,70,.5));}
.emb-step-title{font-size:23px;font-weight:800;letter-spacing:-.02em;margin-top:6px;color:var(--hi);}
.emb-step-short{font-size:15px;font-weight:600;color:var(--coral2);margin-top:6px;}
.emb-step-body{font-size:14.5px;line-height:1.66;color:var(--dim);margin-top:12px;}

/* console */
.emb-console{max-width:840px;margin:0 auto;border-radius:16px;overflow:hidden;border:1px solid rgba(255,150,100,.14);background:#120b08;box-shadow:0 0 0 1px rgba(255,106,61,.14),0 30px 80px rgba(0,0,0,.6),0 0 90px rgba(255,106,61,.14);}
.emb-console-bar{display:flex;align-items:center;gap:8px;padding:13px 16px;background:#17100b;border-bottom:1px solid rgba(255,150,100,.1);}
.emb-tl{width:11px;height:11px;border-radius:50%;}
.emb-tl-r{background:#ff5f57;}.emb-tl-y{background:#febc2e;}.emb-tl-g{background:#28c840;}
.emb-console-title{margin-left:10px;font-family:var(--font-geist-mono),monospace;font-size:12.5px;color:var(--dim);}
.emb-console-live{margin-left:auto;display:inline-flex;align-items:center;gap:7px;font-family:var(--font-geist-mono),monospace;font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#ffb24d;}
.emb-live-dot{width:7px;height:7px;border-radius:50%;background:#ffb24d;box-shadow:0 0 10px #ffb24d;animation:embPulse 1.6s ease-in-out infinite;}
.emb-console-body{padding:14px 8px;font-family:var(--font-geist-mono),monospace;}
.emb-log{display:flex;align-items:flex-start;gap:13px;padding:13px 16px;border-radius:10px;line-height:1.5;}
.emb-log:hover{background:rgba(255,150,100,.03);}
.emb-ts{flex-shrink:0;font-size:12px;color:#7a6155;padding-top:1px;min-width:46px;}
.emb-log-cat{flex-shrink:0;width:8px;height:8px;border-radius:50%;margin-top:5px;}
.emb-cat-lead{background:#ff6a3d;box-shadow:0 0 8px rgba(255,106,61,.7);}
.emb-cat-call{background:#ffb24d;box-shadow:0 0 8px rgba(255,178,77,.7);}
.emb-cat-winback{background:#ff8a4c;box-shadow:0 0 8px rgba(255,138,76,.7);}
.emb-cat-fill{background:#ffd07a;box-shadow:0 0 8px rgba(255,208,122,.6);}
.emb-log-text{flex:1;font-size:13.5px;color:#e9dcd2;}
.emb-log-sys .emb-log-text{color:var(--dim);}
.emb-prompt{color:#ff8a4c;margin-right:8px;}
.emb-log-done{flex-shrink:0;font-size:11px;font-weight:700;letter-spacing:.04em;color:#ffb24d;background:rgba(255,178,77,.1);border:1px solid rgba(255,178,77,.24);padding:4px 9px;border-radius:7px;white-space:nowrap;align-self:center;text-transform:lowercase;}
.emb-cursor{display:inline-block;width:8px;height:15px;margin-left:4px;vertical-align:text-bottom;background:#ff8a4c;box-shadow:0 0 8px #ff8a4c;animation:embBlink 1.05s step-end infinite;}
@keyframes embBlink{0%,49%{opacity:1;}50%,100%{opacity:.25;}}
@keyframes embPulse{0%,100%{opacity:1;}50%{opacity:.4;}}

/* video */
.emb-video{max-width:840px;margin:0 auto;}
.emb-video-inner{position:relative;border-radius:20px;border:1px solid var(--line);background:linear-gradient(180deg,rgba(255,140,90,.08),rgba(255,140,90,.02));aspect-ratio:16/8;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px;overflow:hidden;}
.emb-video-inner::after{content:"";position:absolute;inset:0;background:radial-gradient(60% 60% at 50% 40%,rgba(255,106,61,.14),transparent 70%);pointer-events:none;}
.emb-video-play{position:relative;z-index:1;width:74px;height:74px;border-radius:50%;border:1px solid rgba(255,190,150,.3);background:linear-gradient(180deg,#ff7a45,#f2571f);color:#1a0d06;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 12px 34px rgba(242,87,31,.4),0 0 44px rgba(255,106,61,.3);transition:transform .15s;}
.emb-video-play:hover{transform:scale(1.06);}
.emb-video-play svg{width:30px;height:30px;margin-left:3px;}
.emb-video-kicker{position:relative;z-index:1;margin-top:20px;font-family:var(--font-geist-mono),monospace;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--coral);}
.emb-video-cap{position:relative;z-index:1;margin-top:8px;font-size:15px;color:var(--tx);}

/* pricing table (desktop) */
.emb-ptable{max-width:960px;margin:0 auto;border:1px solid var(--line);border-radius:20px;overflow:hidden;background:linear-gradient(180deg,var(--panel1),var(--panel2));}
.emb-pt-row{display:grid;grid-template-columns:1.7fr 1fr 1fr 1fr;}
.emb-pt-cell{padding:13px 18px;display:flex;align-items:center;}
.emb-pt-row + .emb-pt-row .emb-pt-cell{border-top:1px solid var(--line);}
.emb-pt-head .emb-pt-cell{align-items:stretch;}
.emb-pt-corner{background:transparent;}
.emb-pt-th{flex-direction:column;align-items:center;text-align:center;gap:5px;padding:26px 16px 22px;position:relative;}
.emb-pt-pop{background:rgba(255,106,61,.07);}
.emb-pt-badge{position:absolute;top:-11px;left:50%;transform:translateX(-50%);background:linear-gradient(90deg,#ff6a3d,#ffb24d);color:#1a0d06;font-size:10.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:5px 13px;border-radius:999px;white-space:nowrap;box-shadow:0 0 20px rgba(255,140,70,.5);}
.emb-pt-name{font-family:var(--font-geist-mono),monospace;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:var(--coral2);}
.emb-pt-price{font-size:30px;font-weight:800;letter-spacing:-.03em;color:var(--hi);margin-top:2px;}
.emb-pt-mo{font-size:13px;font-weight:600;color:var(--dim);}
.emb-pt-blurb{font-size:13px;line-height:1.45;color:var(--tx);margin-top:6px;min-height:38px;}
.emb-pt-cta{margin-top:8px;width:100%;}
.emb-pt-label{font-size:14px;color:var(--tx);}
.emb-pt-checkcell{justify-content:center;}
.emb-pt-check{display:inline-flex;color:#ff8a4c;}
.emb-pt-check svg{width:19px;height:19px;}
.emb-pt-dash{color:#5c4a40;font-size:15px;}
.emb-pt-foot .emb-pt-cell{border-top:1px solid var(--line);}
.emb-pt-maps{justify-content:center;text-align:center;font-family:var(--font-geist-mono),monospace;font-size:11.5px;letter-spacing:.04em;color:var(--dim);padding-top:16px;padding-bottom:18px;}

/* pricing cards (mobile) */
.emb-pcards{display:none;grid-template-columns:1fr;gap:16px;max-width:440px;margin:0 auto;}
.emb-pcard{padding:26px 22px;position:relative;display:flex;flex-direction:column;gap:12px;}
.emb-pcard-pop{border-color:rgba(255,140,90,.5);box-shadow:0 0 0 1px rgba(255,106,61,.3),0 18px 56px rgba(242,87,31,.2);}
.emb-pcard-price{font-size:30px;font-weight:800;letter-spacing:-.03em;color:var(--hi);display:flex;align-items:baseline;gap:8px;}
.emb-pcard-feats{list-style:none;display:flex;flex-direction:column;gap:10px;margin:4px 0;}
.emb-pcard-feats li{display:flex;gap:10px;align-items:flex-start;font-size:14px;line-height:1.45;color:var(--tx);}
.emb-pcard-feats .emb-pt-check svg{width:17px;height:17px;flex-shrink:0;margin-top:1px;}
.emb-pcard-cta{margin-top:6px;justify-content:center;}
.emb-startup{max-width:680px;margin:26px auto 0;text-align:center;font-size:15px;line-height:1.6;color:var(--dim);border:1px dashed var(--line);border-radius:14px;padding:18px 22px;}

/* about */
.emb-about{display:grid;grid-template-columns:200px 1fr;gap:42px;padding:46px;align-items:center;}
.emb-about-photo{position:relative;width:200px;height:200px;border-radius:20px;overflow:hidden;flex-shrink:0;box-shadow:0 14px 44px rgba(0,0,0,.5);}
.emb-about-img{object-fit:cover;object-position:center 28%;}
.emb-about-ring{position:absolute;inset:0;border-radius:20px;border:1px solid rgba(255,140,90,.4);box-shadow:inset 0 0 30px rgba(255,106,61,.22);pointer-events:none;}
.emb-about-kicker{font-size:18px;font-weight:700;color:var(--hi);margin-top:22px;line-height:1.45;}
.emb-hand{font-family:var(--font-caveat),cursive;font-size:30px;margin-top:12px;background:linear-gradient(90deg,#ff8a4c,#ffb24d);-webkit-background-clip:text;background-clip:text;color:transparent;}

/* trust band */
.emb-scarcity{display:inline-flex;align-items:center;gap:8px;margin-top:16px;font-size:13px;font-weight:600;color:var(--amber);background:rgba(255,178,77,.08);border:1px solid rgba(255,178,77,.2);padding:8px 16px;border-radius:999px;}
.emb-scarcity-dot{width:7px;height:7px;border-radius:50%;background:#ffb24d;box-shadow:0 0 0 0 rgba(255,178,77,.5);animation:embRing 2s ease-out infinite;}
@keyframes embRing{0%{box-shadow:0 0 0 0 rgba(255,178,77,.5);}70%{box-shadow:0 0 0 7px rgba(255,178,77,0);}100%{box-shadow:0 0 0 0 rgba(255,178,77,0);}}
.emb-promises{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
.emb-promise{padding:26px 22px;}
.emb-promise-check{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:rgba(255,106,61,.12);color:#ff8a4c;}
.emb-promise-check svg{width:17px;height:17px;}
.emb-promise-title{font-size:17.5px;font-weight:800;letter-spacing:-.01em;margin-top:14px;color:var(--hi);}
.emb-promise-body{font-size:14px;line-height:1.6;color:var(--dim);margin-top:8px;}

/* final */
.emb-final{text-align:center;max-width:760px;margin:0 auto;}
.emb-vision{font-size:16px;line-height:1.6;color:var(--amber);max-width:600px;margin:0 auto 18px;font-weight:600;}
.emb-final-title{font-size:clamp(30px,4.8vw,52px);font-weight:800;letter-spacing:-.035em;line-height:1.1;color:var(--hi);}
.emb-final-sub{font-size:18px;color:var(--tx);margin:18px auto 30px;max-width:540px;line-height:1.6;}

/* footer */
.emb-footer{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;padding:40px 0 60px;margin-top:24px;border-top:1px solid var(--line);}
.emb-footer-brand{display:flex;flex-direction:column;gap:8px;}
.emb-logo-foot{font-size:18px;}
.emb-footer-tag{font-size:13px;color:var(--dim);}
.emb-footer-links{display:flex;align-items:center;gap:8px 20px;flex-wrap:wrap;}
.emb-footer-links a{font-size:13.5px;color:var(--tx);text-decoration:none;transition:color .15s;}
.emb-footer-links a:hover{color:var(--hi);}
.emb-footer-links a.emb-btn{color:#1a0d06;}
.emb-foot-meta{font-family:var(--font-geist-mono),monospace;font-size:12px;color:var(--dim);width:100%;padding-top:8px;border-top:1px solid var(--line);}

@media(prefers-reduced-motion:reduce){
  .emb-live-dot,.emb-scarcity-dot,.emb-cursor{animation:none;}
  .emb-rise{opacity:1;transform:none;animation:none;}
}
@media(max-width:980px){
  .emb-promises{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:860px){
  .emb-nav-links{display:none;}
  .emb-nav-toggle{display:inline-flex;}
  .emb-grid-2{grid-template-columns:1fr;}
  .emb-ptable{display:none;}
  .emb-pcards{display:grid;}
  .emb-about{grid-template-columns:1fr;text-align:center;justify-items:center;}
  .emb-trap{padding:34px 24px;}
}
@media(max-width:560px){
  .emb-promises{grid-template-columns:1fr;max-width:420px;margin:0 auto;}
  .emb-cta-row{flex-direction:column;}
  .emb-btn-lg{width:100%;}
  .emb-hero{padding:64px 0 26px;}
  .emb-footer{flex-direction:column;align-items:flex-start;}
}
`;
