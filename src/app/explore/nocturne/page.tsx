'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import GradientBackgroundDark from '@/components/GradientBackgroundDark';
import { CAL, EMAIL, integrations } from '../content';
import {
  brand, heroRotating, hero, problem, steps, agentLogs, CAT_LABEL,
  tiers, feats, startupLine, about, trust, closing,
} from '../offer-content';

/* Direction — "Nocturne": Aurora's soul, gone dark. A slow violet/indigo WebGL
   aurora fills the hero, then a solid near-black body slides up under it on the
   Stripe diagonal. Purple on black, white type, real scroll motion. Built to be
   attractive + information-dense without reading "generic AI". */

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// below-the-fold scroll reveal
const Reveal = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 26 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function Nocturne() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [wi, setWi] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWi((p) => (p + 1) % heroRotating.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="noc-root">
      <style>{CSS}</style>

      {/* violet aurora — fixed, behind everything */}
      <GradientBackgroundDark />

      {/* nav */}
      <nav className="noc-nav">
        <div className="noc-wrap noc-nav-inner">
          <span className="noc-logo">
            <span className="noc-logo-mark" />
            {brand.name}<span className="noc-logo-dot">{brand.tld}</span>
          </span>
          <div className="noc-nav-links">
            <a href="#trap">Why</a>
            <a href="#system">System</a>
            <a href="#console">Live agent</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="noc-nav-right">
            <a href={CAL} className="noc-btn noc-btn-sm">Book a call</a>
            <button className="noc-nav-toggle" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu" aria-expanded={menuOpen}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="noc-mobile-menu">
            <a href="#trap" onClick={() => setMenuOpen(false)}>Why</a>
            <a href="#system" onClick={() => setMenuOpen(false)}>System</a>
            <a href="#console" onClick={() => setMenuOpen(false)}>Live agent</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          </div>
        )}
      </nav>

      <main>
        {/* hero — sits over the aurora */}
        <div className="noc-hero-wrap">
          <div aria-hidden className="noc-hero-grid" />
          <section className="noc-hero noc-wrap">
            <p className="noc-eyebrow noc-rise" style={{ animationDelay: '0s' }}>
              <span className="noc-eyebrow-dot" />{hero.eyebrow}
            </p>
            <h1 className="noc-h1 noc-rise" style={{ animationDelay: '.06s' }}>
              More <span className="noc-grad">bookings.</span><br />
              Fewer missed calls. Less busywork.
            </h1>
            <div className="noc-hero-rot noc-rise" style={{ animationDelay: '.12s' }}>
              <span className="noc-hero-rot-label">Your brand</span>
              <span className="noc-hero-rot-word">
                <motion.span
                  key={wi}
                  initial={{ opacity: 0.35, y: 6, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="noc-grad"
                >
                  {heroRotating[wi]}
                </motion.span>
              </span>
              <span className="noc-hero-rot-label">— 24/7.</span>
            </div>
            <p className="noc-sub noc-rise" style={{ animationDelay: '.18s' }}>{hero.subA} {hero.subB}</p>
            <div className="noc-cta-row noc-rise" style={{ animationDelay: '.24s' }}>
              <a href={CAL} className="noc-btn noc-btn-lg">{hero.ctaPrimary} →</a>
              <a href="#system" className="noc-btn noc-btn-ghost noc-btn-lg">{hero.ctaSecondary}</a>
            </div>
            <p className="noc-reassure noc-rise" style={{ animationDelay: '.3s' }}>{hero.reassure}</p>
          </section>
        </div>

        {/* solid dark body slides up under the hero on the diagonal */}
        <div className="noc-body">
          <div className="noc-wrap">

            {/* trust strip */}
            <section className="noc-trust-strip">
              <p className="noc-trust-strip-label">{hero.trustLabel}</p>
              <div className="noc-chips">
                {integrations.map((t) => <span key={t} className="noc-chip">{t}</span>)}
              </div>
            </section>

            {/* the trap */}
            <section id="trap" className="noc-section">
              <Reveal className="noc-panel noc-trap">
                <p className="noc-kicker">{problem.kicker}</p>
                <h2 className="noc-h2">{problem.title}</h2>
                {problem.body.map((b, i) => <p key={i} className="noc-p">{b}</p>)}
                <p className="noc-punch">{problem.punch}</p>
                <p className="noc-fix">{problem.fix}</p>
              </Reveal>
            </section>

            {/* how it works */}
            <section id="system" className="noc-section">
              <Reveal className="noc-section-head">
                <p className="noc-kicker">How it works</p>
                <h2 className="noc-h2">Four steps to a business that runs itself</h2>
              </Reveal>
              <div className="noc-grid-2">
                {steps.map((s, i) => (
                  <Reveal key={s.n} delay={i * 0.06} className="noc-panel noc-step">
                    <span className="noc-step-n">{s.n}</span>
                    <h3 className="noc-step-title">{s.title}</h3>
                    <p className="noc-step-short">{s.short}</p>
                    <p className="noc-step-body">{s.body}</p>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* live agent console */}
            <section id="console" className="noc-section">
              <Reveal className="noc-section-head">
                <p className="noc-kicker">Your invisible employee</p>
                <h2 className="noc-h2">Your brand, making smart calls 24/7</h2>
              </Reveal>
              <Reveal className="noc-console">
                <div className="noc-console-bar">
                  <span className="noc-tl noc-tl-r" /><span className="noc-tl noc-tl-y" /><span className="noc-tl noc-tl-g" />
                  <span className="noc-console-title">foundos agent · live</span>
                  <span className="noc-console-live"><span className="noc-live-dot" />working</span>
                </div>
                <div className="noc-console-body">
                  <div className="noc-log noc-log-sys">
                    <span className="noc-ts">00:00</span>
                    <span className="noc-log-text"><span className="noc-prompt">$</span> agent online · watching your booking, phone &amp; messages</span>
                  </div>
                  {agentLogs.map((m, i) => (
                    <div key={i} className="noc-log">
                      <span className="noc-ts">{m.ts}</span>
                      <span className={`noc-log-cat noc-cat-${m.cat}`} />
                      <span className="noc-log-text">{m.text}</span>
                      <span className="noc-log-done">✓ {CAT_LABEL[m.cat]}</span>
                    </div>
                  ))}
                  <div className="noc-log noc-log-cursor">
                    <span className="noc-ts">now</span>
                    <span className="noc-log-text"><span className="noc-prompt">›</span> scanning this week’s calendar for gaps to fill<span className="noc-cursor" /></span>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* video slot */}
            <section className="noc-section">
              <Reveal className="noc-video">
                <div className="noc-video-inner">
                  <button className="noc-video-play" aria-label="Play intro (coming soon)">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
                  </button>
                  <p className="noc-video-kicker">Meet the builder</p>
                  <p className="noc-video-cap">A 60-second intro — who I am and how I build. Coming soon.</p>
                </div>
              </Reveal>
            </section>

            {/* pricing */}
            <section id="pricing" className="noc-section">
              <Reveal className="noc-section-head">
                <p className="noc-kicker">Pricing</p>
                <h2 className="noc-h2">Build it once. A simple monthly runs it.</h2>
                <p className="noc-p noc-section-sub">Every build includes your website. Pick where you start — move up anytime.</p>
              </Reveal>

              <Reveal className="noc-ptable">
                <div className="noc-pt-row noc-pt-head">
                  <div className="noc-pt-cell noc-pt-corner" />
                  {tiers.map((t) => (
                    <div key={t.name} className={`noc-pt-cell noc-pt-th ${t.popular ? 'noc-pt-pop' : ''}`}>
                      {t.popular && <span className="noc-pt-badge">Most popular</span>}
                      <span className="noc-pt-name">{t.name}</span>
                      <span className="noc-pt-price">{t.build}</span>
                      <span className="noc-pt-mo">{t.mo}</span>
                      <span className="noc-pt-blurb">{t.blurb}</span>
                      <a href={CAL} className={`noc-btn ${t.popular ? '' : 'noc-btn-ghost'} noc-pt-cta`}>Book a call →</a>
                    </div>
                  ))}
                </div>
                {feats.map((f) => (
                  <div key={f.label} className="noc-pt-row">
                    <div className="noc-pt-cell noc-pt-label">{f.label}</div>
                    {f.on.map((v, i) => (
                      <div key={i} className={`noc-pt-cell noc-pt-checkcell ${tiers[i].popular ? 'noc-pt-pop' : ''}`}>
                        {v ? <span className="noc-pt-check"><Check /></span> : <span className="noc-pt-dash">—</span>}
                      </div>
                    ))}
                  </div>
                ))}
                <div className="noc-pt-row noc-pt-foot">
                  <div className="noc-pt-cell noc-pt-label" />
                  {tiers.map((t, i) => (
                    <div key={i} className={`noc-pt-cell noc-pt-maps ${t.popular ? 'noc-pt-pop' : ''}`}>{t.maps}</div>
                  ))}
                </div>
              </Reveal>

              <div className="noc-pcards">
                {tiers.map((t, i) => (
                  <div key={t.name} className={`noc-panel noc-pcard ${t.popular ? 'noc-pcard-pop' : ''}`}>
                    {t.popular && <span className="noc-pt-badge">Most popular</span>}
                    <span className="noc-pt-name">{t.name}</span>
                    <div className="noc-pcard-price">{t.build}<span className="noc-pt-mo">{t.mo}</span></div>
                    <p className="noc-pt-blurb">{t.blurb}</p>
                    <ul className="noc-pcard-feats">
                      {feats.filter((f) => f.on[i]).map((f) => (
                        <li key={f.label}><span className="noc-pt-check"><Check /></span>{f.label}</li>
                      ))}
                    </ul>
                    <a href={CAL} className={`noc-btn ${t.popular ? '' : 'noc-btn-ghost'} noc-pcard-cta`}>Book a call →</a>
                  </div>
                ))}
              </div>

              <Reveal><p className="noc-startup">{startupLine}</p></Reveal>
            </section>

            {/* about */}
            <section className="noc-section">
              <Reveal className="noc-panel noc-about">
                <div className="noc-about-photo">
                  <Image src="/josh.png" alt="Josh, founder of foundos.ai" fill sizes="200px" className="noc-about-img" />
                  <span className="noc-about-ring" />
                </div>
                <div className="noc-about-copy">
                  <p className="noc-kicker">{about.kicker}</p>
                  <h2 className="noc-h2">Hey, I&apos;m {about.name}.</h2>
                  {about.lines.map((l, i) => <p key={i} className="noc-p">{l}</p>)}
                  <p className="noc-about-kicker">{about.kicker2}</p>
                  <p className="noc-hand">{about.signoff}</p>
                </div>
              </Reveal>
            </section>

            {/* why now */}
            <section className="noc-section">
              <Reveal className="noc-section-head">
                <p className="noc-kicker">{trust.eyebrow}</p>
                <h2 className="noc-h2">{trust.title}</h2>
                <span className="noc-scarcity"><span className="noc-scarcity-dot" />{trust.scarcity}</span>
                <p className="noc-p noc-section-sub">{trust.sub}</p>
              </Reveal>
              <div className="noc-promises">
                {trust.promises.map((pr, i) => (
                  <Reveal key={pr.title} delay={i * 0.05} className="noc-panel noc-promise">
                    <span className="noc-promise-check"><Check /></span>
                    <h3 className="noc-promise-title">{pr.title}</h3>
                    <p className="noc-promise-body">{pr.body}</p>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* vision + final cta */}
            <section className="noc-section noc-final">
              <Reveal>
                <p className="noc-vision">{closing.vision}</p>
                <h2 className="noc-final-title">{closing.title}</h2>
                <p className="noc-final-sub">{closing.sub}</p>
                <a href={CAL} className="noc-btn noc-btn-lg">{closing.cta} →</a>
                <p className="noc-reassure">{closing.reassure}</p>
              </Reveal>
            </section>

          </div>{/* /noc-wrap */}

          {/* footer */}
          <footer className="noc-footer">
            <div className="noc-wrap noc-footer-inner">
              <div className="noc-footer-brand">
                <span className="noc-logo noc-logo-foot">{brand.name}<span className="noc-logo-dot">{brand.tld}</span></span>
                <p className="noc-footer-tag">The system behind brands that scale.</p>
              </div>
              <div className="noc-footer-links">
                <a href="#system">System</a>
                <a href="#pricing">Pricing</a>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <a href={CAL} className="noc-btn noc-btn-sm">Book a call</a>
              </div>
            </div>
            <div className="noc-wrap noc-footer-bottom">
              <span>© 2026 foundos.ai</span>
              <span>Built by Josh.</span>
            </div>
          </footer>
        </div>{/* /noc-body */}
      </main>
    </div>
  );
}

const CSS = `
.noc-root{--body:#0b0a14;--ink:#f5f3fc;--tx:#bcb7d4;--dim:#827da0;--line:rgba(160,140,255,.13);--v1:#8b5cf6;--v2:#a855f7;--ind:#818cf8;--panel1:rgba(150,130,255,.06);--panel2:rgba(150,130,255,.02);position:relative;min-height:100vh;background:transparent;color:var(--tx);font-family:var(--font-inter),system-ui,sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;}
.noc-wrap{max-width:1140px;margin:0 auto;padding:0 24px;}
.noc-grad{display:inline-block;background:linear-gradient(90deg,#818cf8,#a855f7 52%,#ec4899);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 26px rgba(139,92,246,.42));}

/* nav */
.noc-nav{position:sticky;top:0;z-index:40;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);background:rgba(9,8,15,.55);border-bottom:1px solid var(--line);}
.noc-nav-inner{display:flex;align-items:center;justify-content:space-between;height:66px;}
.noc-logo{display:inline-flex;align-items:center;gap:9px;font-weight:800;font-size:20px;letter-spacing:-.03em;color:var(--ink);}
.noc-logo-mark{width:18px;height:18px;border-radius:6px;background:linear-gradient(135deg,#818cf8,#a855f7);box-shadow:0 0 16px rgba(139,92,246,.65);}
.noc-logo-dot{background:linear-gradient(90deg,#a855f7,#ec4899);-webkit-background-clip:text;background-clip:text;color:transparent;}
.noc-nav-links{display:flex;gap:30px;}
.noc-nav-links a{font-size:14px;color:var(--dim);text-decoration:none;font-weight:500;transition:color .15s;}
.noc-nav-links a:hover{color:var(--ink);}
.noc-nav-right{display:flex;align-items:center;gap:10px;}
.noc-nav-toggle{display:none;align-items:center;justify-content:center;width:44px;height:44px;border-radius:11px;background:rgba(150,130,255,.06);border:1px solid var(--line);color:var(--tx);cursor:pointer;}
.noc-nav-toggle svg{width:22px;height:22px;}
.noc-mobile-menu{display:flex;flex-direction:column;gap:2px;padding:8px 20px 16px;background:rgba(9,8,15,.96);backdrop-filter:blur(16px);border-bottom:1px solid var(--line);}
.noc-mobile-menu a{padding:13px 8px;font-size:16px;font-weight:600;color:var(--ink);text-decoration:none;border-radius:8px;}

/* buttons */
.noc-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:linear-gradient(180deg,#8b5cf6,#6d28d9);color:#fff;font-weight:600;font-size:15px;padding:13px 24px;border-radius:11px;text-decoration:none;border:1px solid rgba(190,160,255,.28);box-shadow:0 10px 30px rgba(109,40,217,.45),0 0 40px rgba(139,92,246,.25);transition:transform .15s,box-shadow .15s;cursor:pointer;}
.noc-btn:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(109,40,217,.55),0 0 60px rgba(139,92,246,.4);}
.noc-btn-sm{padding:9px 17px;font-size:13.5px;border-radius:9px;}
.noc-btn-lg{padding:16px 30px;font-size:16px;}
.noc-btn-ghost{background:rgba(150,130,255,.06);color:#e7e3f8;border:1px solid rgba(180,160,255,.22);box-shadow:none;backdrop-filter:blur(6px);}
.noc-btn-ghost:hover{border-color:rgba(180,160,255,.42);background:rgba(150,130,255,.1);box-shadow:0 0 24px rgba(139,92,246,.14);}

/* hero over aurora */
.noc-hero-wrap{position:relative;z-index:1;overflow:hidden;padding-bottom:150px;}
.noc-hero-wrap::after{content:"";position:absolute;inset:0;background:radial-gradient(58% 58% at 50% 30%,transparent,rgba(8,7,13,.5) 92%);pointer-events:none;}
.noc-hero-grid{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.045) 1px,transparent 1px);background-size:34px 34px;-webkit-mask-image:radial-gradient(100% 70% at 50% 0%,#000 30%,transparent 72%);mask-image:radial-gradient(100% 70% at 50% 0%,#000 30%,transparent 72%);}
.noc-hero{position:relative;z-index:1;text-align:center;padding:96px 24px 40px;max-width:900px;}
.noc-eyebrow{display:inline-flex;align-items:center;gap:9px;font-family:var(--font-geist-mono),monospace;font-size:12.5px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:#c7b6ff;padding:7px 15px;border:1px solid rgba(180,160,255,.22);border-radius:999px;background:rgba(139,92,246,.1);margin-bottom:28px;}
.noc-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:#a855f7;box-shadow:0 0 10px #a855f7;}
.noc-h1{font-size:clamp(40px,6.6vw,78px);font-weight:800;line-height:1.04;letter-spacing:-.04em;margin-bottom:18px;color:#fff;text-shadow:0 2px 40px rgba(0,0,0,.4);}
.noc-hero-rot{display:inline-flex;align-items:baseline;gap:9px;flex-wrap:wrap;justify-content:center;font-family:var(--font-geist-mono),monospace;font-size:clamp(15px,2vw,18px);color:#cfc9e8;margin-bottom:24px;}
.noc-hero-rot-word{display:inline-block;min-width:172px;text-align:left;font-weight:700;}
.noc-sub{font-size:18.5px;line-height:1.62;color:#d3cfe6;max-width:668px;margin:0 auto 32px;}
.noc-cta-row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
.noc-reassure{font-size:13.5px;color:#a49fc0;margin-top:18px;}
.noc-rise{opacity:0;animation:nocRise .6s cubic-bezier(.22,1,.36,1) both;}
@keyframes nocRise{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}

/* body slides up under hero on the diagonal */
.noc-body{position:relative;z-index:2;background:var(--body);margin-top:-90px;clip-path:polygon(0 90px,100% 0,100% 100%,0 100%);padding-top:16px;box-shadow:0 -40px 120px rgba(0,0,0,.5);}

/* trust strip */
.noc-trust-strip{padding:44px 0 8px;text-align:center;}
.noc-trust-strip-label{font-family:var(--font-geist-mono),monospace;font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);margin-bottom:18px;}
.noc-chips{display:flex;flex-wrap:wrap;gap:9px;justify-content:center;}
.noc-chip{font-family:var(--font-geist-mono),monospace;font-size:12.5px;padding:7px 14px;border-radius:8px;background:rgba(150,130,255,.05);border:1px solid var(--line);color:var(--tx);}

/* sections */
.noc-section{padding:56px 0;}
.noc-section-head{text-align:center;max-width:720px;margin:0 auto 40px;}
.noc-section-sub{margin-left:auto;margin-right:auto;}
.noc-kicker{font-family:var(--font-geist-mono),monospace;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--v2);margin-bottom:14px;}
.noc-h2{font-size:clamp(28px,3.9vw,44px);font-weight:800;letter-spacing:-.032em;line-height:1.12;color:var(--ink);}
.noc-p{font-size:16px;line-height:1.72;color:var(--tx);margin-top:14px;}

.noc-panel{background:linear-gradient(180deg,var(--panel1),var(--panel2));border:1px solid var(--line);border-radius:20px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}
.noc-trap{padding:48px;max-width:820px;margin:0 auto;text-align:center;}
.noc-punch{font-size:18.5px;font-weight:700;color:#c4b5fd;margin-top:24px;line-height:1.5;}
.noc-fix{font-size:21px;font-weight:800;margin-top:10px;background:linear-gradient(90deg,#a855f7,#ec4899);-webkit-background-clip:text;background-clip:text;color:transparent;}

/* steps */
.noc-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
.noc-step{padding:32px;transition:border-color .2s,transform .2s;}
.noc-step:hover{border-color:rgba(168,85,247,.4);transform:translateY(-3px);}
.noc-step-n{display:inline-block;font-family:var(--font-geist-mono),monospace;font-size:30px;font-weight:800;letter-spacing:-.02em;background:linear-gradient(135deg,#818cf8,#a855f7);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 18px rgba(139,92,246,.5));}
.noc-step-title{font-size:23px;font-weight:800;letter-spacing:-.02em;margin-top:6px;color:var(--ink);}
.noc-step-short{font-size:15px;font-weight:600;color:#c4b5fd;margin-top:6px;}
.noc-step-body{font-size:14.5px;line-height:1.66;color:var(--dim);margin-top:12px;}

/* console */
.noc-console{max-width:840px;margin:0 auto;border-radius:16px;overflow:hidden;border:1px solid rgba(168,85,247,.16);background:#0a0912;box-shadow:0 0 0 1px rgba(139,92,246,.14),0 30px 80px rgba(0,0,0,.6),0 0 90px rgba(139,92,246,.14);}
.noc-console-bar{display:flex;align-items:center;gap:8px;padding:13px 16px;background:#120f1d;border-bottom:1px solid rgba(168,85,247,.12);}
.noc-tl{width:11px;height:11px;border-radius:50%;}
.noc-tl-r{background:#ff5f57;}.noc-tl-y{background:#febc2e;}.noc-tl-g{background:#28c840;}
.noc-console-title{margin-left:10px;font-family:var(--font-geist-mono),monospace;font-size:12.5px;color:var(--dim);}
.noc-console-live{margin-left:auto;display:inline-flex;align-items:center;gap:7px;font-family:var(--font-geist-mono),monospace;font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#c4b5fd;}
.noc-live-dot{width:7px;height:7px;border-radius:50%;background:#a855f7;box-shadow:0 0 10px #a855f7;animation:nocPulse 1.6s ease-in-out infinite;}
.noc-console-body{padding:14px 8px;font-family:var(--font-geist-mono),monospace;}
.noc-log{display:flex;align-items:flex-start;gap:13px;padding:13px 16px;border-radius:10px;line-height:1.5;}
.noc-log:hover{background:rgba(150,130,255,.04);}
.noc-ts{flex-shrink:0;font-size:12px;color:#6b6390;padding-top:1px;min-width:46px;}
.noc-log-cat{flex-shrink:0;width:8px;height:8px;border-radius:50%;margin-top:5px;}
.noc-cat-lead{background:#818cf8;box-shadow:0 0 8px rgba(129,140,248,.7);}
.noc-cat-call{background:#a855f7;box-shadow:0 0 8px rgba(168,85,247,.7);}
.noc-cat-winback{background:#ec4899;box-shadow:0 0 8px rgba(236,72,153,.7);}
.noc-cat-fill{background:#c4b5fd;box-shadow:0 0 8px rgba(196,181,253,.6);}
.noc-log-text{flex:1;font-size:13.5px;color:#ddd7f0;}
.noc-log-sys .noc-log-text{color:var(--dim);}
.noc-prompt{color:#a855f7;margin-right:8px;}
.noc-log-done{flex-shrink:0;font-size:11px;font-weight:700;letter-spacing:.04em;color:#c4b5fd;background:rgba(168,85,247,.12);border:1px solid rgba(168,85,247,.26);padding:4px 9px;border-radius:7px;white-space:nowrap;align-self:center;text-transform:lowercase;}
.noc-cursor{display:inline-block;width:8px;height:15px;margin-left:4px;vertical-align:text-bottom;background:#a855f7;box-shadow:0 0 8px #a855f7;animation:nocBlink 1.05s step-end infinite;}
@keyframes nocBlink{0%,49%{opacity:1;}50%,100%{opacity:.25;}}
@keyframes nocPulse{0%,100%{opacity:1;}50%{opacity:.4;}}

/* video */
.noc-video{max-width:840px;margin:0 auto;}
.noc-video-inner{position:relative;border-radius:20px;border:1px solid var(--line);background:linear-gradient(180deg,rgba(139,92,246,.1),rgba(139,92,246,.02));aspect-ratio:16/8;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px;overflow:hidden;}
.noc-video-inner::after{content:"";position:absolute;inset:0;background:radial-gradient(60% 60% at 50% 40%,rgba(139,92,246,.16),transparent 70%);pointer-events:none;}
.noc-video-play{position:relative;z-index:1;width:74px;height:74px;border-radius:50%;border:1px solid rgba(190,160,255,.32);background:linear-gradient(180deg,#8b5cf6,#6d28d9);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 12px 34px rgba(109,40,217,.45),0 0 44px rgba(139,92,246,.34);transition:transform .15s;}
.noc-video-play:hover{transform:scale(1.06);}
.noc-video-play svg{width:30px;height:30px;margin-left:3px;}
.noc-video-kicker{position:relative;z-index:1;margin-top:20px;font-family:var(--font-geist-mono),monospace;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--v2);}
.noc-video-cap{position:relative;z-index:1;margin-top:8px;font-size:15px;color:var(--tx);}

/* pricing table */
.noc-ptable{max-width:960px;margin:0 auto;border:1px solid var(--line);border-radius:20px;overflow:hidden;background:linear-gradient(180deg,var(--panel1),var(--panel2));}
.noc-pt-row{display:grid;grid-template-columns:1.7fr 1fr 1fr 1fr;}
.noc-pt-cell{padding:13px 18px;display:flex;align-items:center;}
.noc-pt-row + .noc-pt-row .noc-pt-cell{border-top:1px solid var(--line);}
.noc-pt-head .noc-pt-cell{align-items:stretch;}
.noc-pt-th{flex-direction:column;align-items:center;text-align:center;gap:5px;padding:26px 16px 22px;position:relative;}
.noc-pt-pop{background:rgba(168,85,247,.09);}
.noc-pt-badge{position:absolute;top:-11px;left:50%;transform:translateX(-50%);background:linear-gradient(90deg,#a855f7,#ec4899);color:#fff;font-size:10.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:5px 13px;border-radius:999px;white-space:nowrap;box-shadow:0 0 20px rgba(168,85,247,.55);}
.noc-pt-name{font-family:var(--font-geist-mono),monospace;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#c4b5fd;}
.noc-pt-price{font-size:30px;font-weight:800;letter-spacing:-.03em;color:var(--ink);margin-top:2px;}
.noc-pt-mo{font-size:13px;font-weight:600;color:var(--dim);}
.noc-pt-blurb{font-size:13px;line-height:1.45;color:var(--tx);margin-top:6px;min-height:38px;}
.noc-pt-cta{margin-top:8px;width:100%;}
.noc-pt-label{font-size:14px;color:var(--tx);}
.noc-pt-checkcell{justify-content:center;}
.noc-pt-check{display:inline-flex;color:#a855f7;}
.noc-pt-check svg{width:19px;height:19px;}
.noc-pt-dash{color:#4d4668;font-size:15px;}
.noc-pt-foot .noc-pt-cell{border-top:1px solid var(--line);}
.noc-pt-maps{justify-content:center;text-align:center;font-family:var(--font-geist-mono),monospace;font-size:11.5px;letter-spacing:.04em;color:var(--dim);padding-top:16px;padding-bottom:18px;}

/* pricing cards (mobile) */
.noc-pcards{display:none;grid-template-columns:1fr;gap:16px;max-width:440px;margin:0 auto;}
.noc-pcard{padding:26px 22px;position:relative;display:flex;flex-direction:column;gap:12px;}
.noc-pcard-pop{border-color:rgba(168,85,247,.5);box-shadow:0 0 0 1px rgba(168,85,247,.3),0 18px 56px rgba(109,40,217,.28);}
.noc-pcard-price{font-size:30px;font-weight:800;letter-spacing:-.03em;color:var(--ink);display:flex;align-items:baseline;gap:8px;}
.noc-pcard-feats{list-style:none;display:flex;flex-direction:column;gap:10px;margin:4px 0;}
.noc-pcard-feats li{display:flex;gap:10px;align-items:flex-start;font-size:14px;line-height:1.45;color:var(--tx);}
.noc-pcard-feats .noc-pt-check svg{width:17px;height:17px;flex-shrink:0;margin-top:1px;}
.noc-pcard-cta{margin-top:6px;justify-content:center;}
.noc-startup{max-width:680px;margin:26px auto 0;text-align:center;font-size:15px;line-height:1.6;color:var(--dim);border:1px dashed var(--line);border-radius:14px;padding:18px 22px;}

/* about */
.noc-about{display:grid;grid-template-columns:200px 1fr;gap:42px;padding:46px;align-items:center;}
.noc-about-photo{position:relative;width:200px;height:200px;border-radius:20px;overflow:hidden;flex-shrink:0;box-shadow:0 14px 44px rgba(0,0,0,.5);}
.noc-about-img{object-fit:cover;object-position:center 28%;}
.noc-about-ring{position:absolute;inset:0;border-radius:20px;border:1px solid rgba(168,85,247,.4);box-shadow:inset 0 0 30px rgba(139,92,246,.24);pointer-events:none;}
.noc-about-kicker{font-size:18px;font-weight:700;color:var(--ink);margin-top:22px;line-height:1.45;}
.noc-hand{font-family:var(--font-caveat),cursive;font-size:30px;margin-top:12px;background:linear-gradient(90deg,#a855f7,#ec4899);-webkit-background-clip:text;background-clip:text;color:transparent;}

/* why now */
.noc-scarcity{display:inline-flex;align-items:center;gap:8px;margin-top:16px;font-size:13px;font-weight:600;color:#c4b5fd;background:rgba(168,85,247,.1);border:1px solid rgba(168,85,247,.22);padding:8px 16px;border-radius:999px;}
.noc-scarcity-dot{width:7px;height:7px;border-radius:50%;background:#a855f7;box-shadow:0 0 0 0 rgba(168,85,247,.5);animation:nocRing 2s ease-out infinite;}
@keyframes nocRing{0%{box-shadow:0 0 0 0 rgba(168,85,247,.5);}70%{box-shadow:0 0 0 7px rgba(168,85,247,0);}100%{box-shadow:0 0 0 0 rgba(168,85,247,0);}}
.noc-promises{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
.noc-promise{padding:26px 22px;}
.noc-promise-check{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:rgba(168,85,247,.14);color:#c4b5fd;}
.noc-promise-check svg{width:17px;height:17px;}
.noc-promise-title{font-size:17.5px;font-weight:800;letter-spacing:-.01em;margin-top:14px;color:var(--ink);}
.noc-promise-body{font-size:14px;line-height:1.6;color:var(--dim);margin-top:8px;}

/* final */
.noc-final{text-align:center;max-width:760px;margin:0 auto;}
.noc-vision{font-size:16px;line-height:1.6;color:#c4b5fd;max-width:600px;margin:0 auto 18px;font-weight:600;}
.noc-final-title{font-size:clamp(30px,4.8vw,52px);font-weight:800;letter-spacing:-.035em;line-height:1.1;color:var(--ink);}
.noc-final-sub{font-size:18px;color:var(--tx);margin:18px auto 30px;max-width:540px;line-height:1.6;}

/* footer */
.noc-footer{border-top:1px solid var(--line);padding:44px 0 40px;margin-top:24px;}
.noc-footer-inner{display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:20px;}
.noc-footer-brand{display:flex;flex-direction:column;gap:8px;}
.noc-logo-foot{font-size:18px;}
.noc-footer-tag{font-size:13px;color:var(--dim);}
.noc-footer-links{display:flex;align-items:center;gap:8px 20px;flex-wrap:wrap;}
.noc-footer-links a{font-size:13.5px;color:var(--tx);text-decoration:none;transition:color .15s;}
.noc-footer-links a:hover{color:var(--ink);}
.noc-footer-links a.noc-btn{color:#fff;}
.noc-footer-bottom{display:flex;justify-content:space-between;margin-top:22px;padding-top:18px;border-top:1px solid var(--line);font-size:12.5px;color:var(--dim);}

@media(prefers-reduced-motion:reduce){
  .noc-live-dot,.noc-scarcity-dot,.noc-cursor{animation:none;}
  .noc-rise{opacity:1;transform:none;animation:none;}
}
@media(max-width:980px){
  .noc-promises{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:860px){
  .noc-nav-links{display:none;}
  .noc-nav-toggle{display:inline-flex;}
  .noc-grid-2{grid-template-columns:1fr;}
  .noc-ptable{display:none;}
  .noc-pcards{display:grid;}
  .noc-about{grid-template-columns:1fr;text-align:center;justify-items:center;}
  .noc-trap{padding:34px 24px;}
}
@media(max-width:560px){
  .noc-promises{grid-template-columns:1fr;max-width:420px;margin:0 auto;}
  .noc-cta-row{flex-direction:column;}
  .noc-btn-lg{width:100%;}
  .noc-hero{padding:64px 20px 30px;}
  .noc-footer-bottom{flex-direction:column;gap:6px;}
}
`;
