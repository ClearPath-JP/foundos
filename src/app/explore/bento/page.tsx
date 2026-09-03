'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  CAL, EMAIL, IG_HANDLE, brand, heroline, problem, steps, agentMessages,
  integrations, plans, about, closing,
} from '../content';

/* Direction — "Bento": an operating-system product page built entirely from a
   grid of rounded tiles of varying sizes (Apple / Vercel / Linear style).
   Light #f5f5f7 base, white tiles, with bold indigo + near-black tiles for
   rhythm. Every tile is a self-contained mini-card. */

const StepIcon = ({ n }: { n: string }) => {
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (n === '01') return (<svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>);
  if (n === '02') return (<svg {...common}><path d="M9 12a3 3 0 0 0 3 3h1a3 3 0 0 0 0-6 3 3 0 0 1 0-6h1a3 3 0 0 1 3 3" /><path d="M7 5h.01M7 19h.01" /></svg>);
  if (n === '03') return (<svg {...common}><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="9" cy="10" r="1.3" fill="currentColor" stroke="none" /><circle cx="15" cy="10" r="1.3" fill="currentColor" stroke="none" /><path d="M9 15h6" /></svg>);
  return (<svg {...common}><path d="M4 19V5" /><path d="m7 14 3-3 3 2 4-5" /><path d="M20 19H4" /></svg>);
};

export default function Bento() {
  const words = heroline.rotating;
  const [wi, setWi] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWi((p) => (p + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.length]);

  // hand-built revenue chart (final = visible/filled state)
  const bars = [44, 58, 51, 70, 64, 82, 96];
  const months = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="bnt-root">
      <style>{CSS}</style>

      {/* nav */}
      <nav className="bnt-nav">
        <div className="bnt-shell bnt-nav-inner">
          <span className="bnt-logo">{brand.name}<span className="bnt-logo-dot">{brand.tld}</span></span>
          <div className="bnt-nav-links">
            <a href="#system">System</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
          </div>
          <a href={CAL} className="bnt-btn bnt-btn-sm">Book a call</a>
        </div>
      </nav>

      <main className="bnt-shell">

        {/* ===== HERO ROW ===== */}
        <section className="bnt-grid bnt-grid-hero">
          {/* hero tile */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bnt-tile bnt-tile-hero bnt-span-hero"
          >
            <span className="bnt-eyebrow">{heroline.eyebrow}</span>
            <h1 className="bnt-h1">
              Your business{' '}
              <span className="bnt-rot">
                <motion.span
                  key={wi}
                  initial={{ opacity: 0.55, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="bnt-rot-word"
                >
                  {words[wi]}
                </motion.span>
              </span>
              {' '}while you live your life.
            </h1>
            <p className="bnt-hero-sub">{heroline.sub}</p>
            <div className="bnt-cta-row">
              <a href={CAL} className="bnt-btn bnt-btn-lg">{heroline.ctaPrimary} →</a>
              <a href="#system" className="bnt-btn bnt-btn-ghost bnt-btn-lg">{heroline.ctaSecondary}</a>
            </div>
            <span className="bnt-reassure">{heroline.reassure}</span>
            <span aria-hidden className="bnt-hero-orb" />
          </motion.div>

          {/* revenue dashboard tile */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="bnt-tile bnt-tile-dash"
          >
            <div className="bnt-tile-head">
              <span className="bnt-tile-label">Revenue · live</span>
              <span className="bnt-pulse">● tracking</span>
            </div>
            <div className="bnt-dash-top">
              <span className="bnt-dash-big">+38%</span>
              <span className="bnt-dash-sm">vs. last month</span>
            </div>
            <div className="bnt-chart">
              {bars.map((h, i) => (
                <div key={i} className="bnt-bar-col">
                  <motion.span
                    className={`bnt-bar ${i === bars.length - 1 ? 'bnt-bar-hot' : ''}`}
                    initial={{ height: '8%' }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <span className="bnt-bar-lbl">{months[i]}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ===== STAT STRIP ===== */}
        <section className="bnt-grid bnt-grid-stats">
          <div className="bnt-tile bnt-tile-stat bnt-tile-dark">
            <span className="bnt-stat-num">24/7</span>
            <span className="bnt-stat-cap">an agent working while you sleep</span>
          </div>
          <div className="bnt-tile bnt-tile-stat">
            <span className="bnt-stat-num bnt-ink-indigo">4-step</span>
            <span className="bnt-stat-cap">system from audit to revenue</span>
          </div>
          <div className="bnt-tile bnt-tile-stat bnt-tile-indigo">
            <span className="bnt-stat-num">from $99<span className="bnt-stat-mo">/mo</span></span>
            <span className="bnt-stat-cap">website included, no rip-and-replace</span>
          </div>
        </section>

        {/* ===== PROBLEM + INTEGRATIONS ===== */}
        <section className="bnt-grid bnt-grid-prob">
          <div className="bnt-tile bnt-tile-prob bnt-span-prob">
            <span className="bnt-tile-label">The problem</span>
            <h2 className="bnt-h2">{problem.title}</h2>
            <p className="bnt-p">{problem.body[0]}</p>
            <p className="bnt-p">{problem.body[1]}</p>
            <div className="bnt-prob-foot">
              <p className="bnt-punch">{problem.punch}</p>
              <p className="bnt-fix">{problem.fix}</p>
            </div>
          </div>

          <div className="bnt-tile bnt-tile-integ">
            <span className="bnt-tile-label">Works with your stack</span>
            <p className="bnt-integ-note">Connects the tools you already pay for.</p>
            <div className="bnt-chips">
              {integrations.map((t) => (
                <span key={t} className="bnt-chip">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SYSTEM — 4 STEPS ===== */}
        <section id="system" className="bnt-band">
          <span className="bnt-kicker">How it works</span>
          <h2 className="bnt-band-title">Four steps to a business that runs itself</h2>
        </section>
        <section className="bnt-grid bnt-grid-steps">
          {steps.map((s) => (
            <div key={s.n} className="bnt-tile bnt-tile-step">
              <div className="bnt-step-top">
                <span className="bnt-step-ico"><StepIcon n={s.n} /></span>
                <span className="bnt-step-n">{s.n}</span>
              </div>
              <h3 className="bnt-step-title">{s.title}</h3>
              <p className="bnt-step-short">{s.short}</p>
              <p className="bnt-step-body">{s.body}</p>
            </div>
          ))}
        </section>

        {/* ===== AGENT ACTIVITY ===== */}
        <section className="bnt-grid bnt-grid-agent">
          <div className="bnt-tile bnt-tile-dark bnt-tile-agentintro">
            <span className="bnt-tile-label bnt-label-light">Your invisible employee</span>
            <h2 className="bnt-h2 bnt-h2-light">The agent makes smart calls 24/7.</h2>
            <p className="bnt-p bnt-p-light">It learns your business and acts on its own — re-engaging quiet members, pitching the right upsell, filling the half-empty class.</p>
            <div className="bnt-agent-meta">
              <span className="bnt-agent-status"><span className="bnt-agent-led" />agent · live</span>
              <span className="bnt-agent-count">{agentMessages.length} actions today</span>
            </div>
          </div>

          <div className="bnt-tile bnt-tile-agentfeed">
            {agentMessages.map((m, i) => (
              <div key={i} className="bnt-msg">
                <span className="bnt-msg-ico">{m.icon}</span>
                <span className="bnt-msg-text">{m.text}</span>
                <span className="bnt-msg-done">done</span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== PRICING ===== */}
        <section id="pricing" className="bnt-band">
          <span className="bnt-kicker">Pricing</span>
          <h2 className="bnt-band-title">Simple monthly pricing. Your website included.</h2>
        </section>
        <section className="bnt-grid bnt-grid-price">
          {plans.map((p) => (
            <div key={p.name} className={`bnt-tile bnt-tile-plan ${p.popular ? 'bnt-tile-dark bnt-plan-pop' : ''}`}>
              {p.popular && <span className="bnt-plan-badge">Most popular</span>}
              <span className={`bnt-plan-name ${p.popular ? 'bnt-label-light' : ''}`}>{p.name}</span>
              <div className="bnt-plan-priceline">
                <span className="bnt-plan-price">{p.price}</span>
                <span className="bnt-plan-cad">{p.cadence}</span>
              </div>
              <p className={`bnt-plan-tag ${p.popular ? 'bnt-p-light' : ''}`}>{p.tagline}</p>
              <ul className="bnt-plan-feats">
                {p.features.map((f) => (
                  <li key={f} className={p.popular ? 'bnt-feat-light' : ''}>
                    <span className="bnt-check">✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href={CAL} className={`bnt-btn bnt-plan-cta ${p.popular ? 'bnt-btn-ondark' : 'bnt-btn-ghost'}`}>{p.cta} →</a>
            </div>
          ))}
        </section>

        {/* ===== ABOUT + FINAL CTA ===== */}
        <section className="bnt-grid bnt-grid-foot">
          <div id="about" className="bnt-tile bnt-tile-about">
            <div className="bnt-about-photo">
              <Image src={about.photo} alt="Josh, founder of foundos.ai" fill sizes="160px" className="bnt-about-img" />
            </div>
            <div className="bnt-about-copy">
              <span className="bnt-tile-label">About</span>
              <h2 className="bnt-h2">Hey, I'm {about.name}.</h2>
              <p className="bnt-p">{about.lines[0]}</p>
              <p className="bnt-p">{about.lines[3]}</p>
              <p className="bnt-about-kicker">{about.kicker}</p>
              <p className="bnt-hand">{about.signoff}</p>
            </div>
          </div>

          <div className="bnt-tile bnt-tile-indigo bnt-tile-final">
            <h2 className="bnt-final-title">{closing.title}</h2>
            <p className="bnt-final-sub">{closing.sub}</p>
            <a href={CAL} className="bnt-btn bnt-btn-onlight bnt-btn-lg">{closing.cta} →</a>
            <span className="bnt-final-reassure">{closing.reassure}</span>
            <span aria-hidden className="bnt-final-orb" />
          </div>
        </section>

        {/* footer line */}
        <footer className="bnt-footer">
          <span className="bnt-logo bnt-logo-sm">{brand.name}<span className="bnt-logo-dot">{brand.tld}</span></span>
          <div className="bnt-footer-links">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <span className="bnt-footer-sep">·</span>
            <a href={CAL}>{IG_HANDLE}</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

const CSS = `
.bnt-root{position:relative;min-height:100vh;background:#f5f5f7;color:#111118;font-family:var(--font-inter),system-ui,sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;}
.bnt-shell{max-width:1200px;margin:0 auto;padding:0 20px;}

/* ---- nav ---- */
.bnt-nav{position:sticky;top:0;z-index:40;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);background:rgba(245,245,247,.78);border-bottom:1px solid rgba(17,17,24,.06);}
.bnt-nav-inner{display:flex;align-items:center;justify-content:space-between;height:62px;}
.bnt-logo{font-weight:800;font-size:20px;letter-spacing:-.03em;color:#111118;}
.bnt-logo-sm{font-size:17px;}
.bnt-logo-dot{color:#4f46e5;}
.bnt-nav-links{display:flex;gap:28px;}
.bnt-nav-links a{font-size:14px;color:#5b5b66;text-decoration:none;font-weight:500;}
.bnt-nav-links a:hover{color:#111118;}

/* ---- buttons ---- */
.bnt-btn{display:inline-flex;align-items:center;gap:6px;background:#4f46e5;color:#fff;font-weight:600;font-size:15px;padding:12px 22px;border-radius:13px;text-decoration:none;box-shadow:0 6px 18px rgba(79,70,229,.26);transition:transform .15s,box-shadow .15s,background .15s;white-space:nowrap;}
.bnt-btn:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(79,70,229,.34);background:#4338ca;}
.bnt-btn-sm{padding:9px 16px;font-size:13.5px;border-radius:11px;}
.bnt-btn-lg{padding:15px 26px;font-size:16px;}
.bnt-btn-ghost{background:#fff;color:#3730a3;border:1px solid rgba(17,17,24,.1);box-shadow:none;}
.bnt-btn-ghost:hover{border-color:#4f46e5;background:#fff;box-shadow:0 6px 16px rgba(79,70,229,.1);}
.bnt-btn-onlight{background:#fff;color:#312e81;box-shadow:0 6px 18px rgba(0,0,0,.14);}
.bnt-btn-onlight:hover{background:#f4f3ff;color:#312e81;}
.bnt-btn-ondark{background:#fff;color:#16161d;box-shadow:none;}
.bnt-btn-ondark:hover{background:#ececff;color:#16161d;}

/* ---- generic tile ---- */
.bnt-grid{display:grid;gap:16px;margin-top:16px;}
.bnt-tile{position:relative;background:#fff;border:1px solid rgba(17,17,24,.07);border-radius:22px;box-shadow:0 1px 2px rgba(17,17,24,.04),0 10px 30px rgba(40,38,80,.05);padding:30px;overflow:hidden;transition:transform .2s,box-shadow .2s;}
.bnt-tile:hover{transform:translateY(-3px);box-shadow:0 2px 4px rgba(17,17,24,.05),0 18px 44px rgba(40,38,80,.1);}
.bnt-tile-dark{background:#111118;border-color:rgba(255,255,255,.08);color:#f3f3f7;}
.bnt-tile-indigo{background:#4f46e5;border-color:rgba(255,255,255,.12);color:#fff;background-image:radial-gradient(120% 120% at 0% 0%,#6d63ff 0%,#4f46e5 55%);}
.bnt-tile-label{font-size:11.5px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#9a9aa7;}
.bnt-label-light{color:rgba(255,255,255,.55);}

.bnt-h2{font-size:clamp(24px,2.9vw,34px);font-weight:800;letter-spacing:-.03em;line-height:1.12;margin-top:14px;}
.bnt-h2-light{color:#fff;}
.bnt-p{font-size:15.5px;line-height:1.65;color:#56565f;margin-top:12px;}
.bnt-p-light{color:rgba(243,243,247,.74);}
.bnt-ink-indigo{color:#4f46e5;}

/* ---- hero row ---- */
.bnt-grid-hero{grid-template-columns:1.55fr 1fr;}
.bnt-tile-hero{display:flex;flex-direction:column;align-items:flex-start;padding:44px;min-height:380px;}
.bnt-eyebrow{font-size:12.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#4f46e5;background:#eeecff;padding:7px 13px;border-radius:999px;}
.bnt-h1{font-size:clamp(34px,4.4vw,56px);font-weight:800;line-height:1.04;letter-spacing:-.035em;margin-top:22px;max-width:14ch;}
.bnt-rot{display:inline-block;position:relative;}
.bnt-rot-word{display:inline-block;color:#4f46e5;}
.bnt-hero-sub{font-size:17px;line-height:1.6;color:#56565f;margin-top:20px;max-width:46ch;}
.bnt-cta-row{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px;}
.bnt-reassure{font-size:13.5px;color:#9a9aa7;margin-top:16px;}
.bnt-hero-orb{position:absolute;right:-90px;bottom:-90px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(79,70,229,.16),transparent 70%);pointer-events:none;}

/* ---- revenue dash ---- */
.bnt-tile-dash{display:flex;flex-direction:column;min-height:380px;}
.bnt-tile-head{display:flex;align-items:center;justify-content:space-between;}
.bnt-pulse{font-size:11.5px;font-weight:700;color:#16a34a;letter-spacing:.04em;}
.bnt-dash-top{display:flex;align-items:baseline;gap:10px;margin-top:18px;}
.bnt-dash-big{font-size:46px;font-weight:800;letter-spacing:-.04em;color:#111118;}
.bnt-dash-sm{font-size:13px;color:#9a9aa7;font-weight:500;}
.bnt-chart{display:flex;align-items:flex-end;justify-content:space-between;gap:10px;flex:1;margin-top:28px;min-height:170px;}
.bnt-bar-col{display:flex;flex-direction:column;align-items:center;gap:9px;flex:1;height:100%;justify-content:flex-end;}
.bnt-bar{display:block;width:100%;max-width:30px;border-radius:8px 8px 4px 4px;background:linear-gradient(180deg,#a5b4fc,#6366f1);min-height:6px;}
.bnt-bar-hot{background:linear-gradient(180deg,#6d63ff,#4f46e5);box-shadow:0 6px 16px rgba(79,70,229,.3);}
.bnt-bar-lbl{font-size:11px;color:#9a9aa7;font-weight:600;font-family:var(--font-geist-mono),monospace;}

/* ---- stat strip ---- */
.bnt-grid-stats{grid-template-columns:repeat(3,1fr);}
.bnt-tile-stat{display:flex;flex-direction:column;justify-content:center;gap:8px;min-height:150px;}
.bnt-stat-num{font-size:clamp(34px,4vw,48px);font-weight:800;letter-spacing:-.04em;line-height:1;}
.bnt-stat-mo{font-size:.42em;font-weight:600;letter-spacing:0;opacity:.85;margin-left:2px;}
.bnt-stat-cap{font-size:14px;line-height:1.45;color:#7a7a85;font-weight:500;max-width:24ch;}
.bnt-tile-dark .bnt-stat-cap,.bnt-tile-indigo .bnt-stat-cap{color:rgba(255,255,255,.75);}

/* ---- problem + integrations ---- */
.bnt-grid-prob{grid-template-columns:1.5fr 1fr;align-items:stretch;}
.bnt-tile-prob{display:flex;flex-direction:column;}
.bnt-prob-foot{margin-top:auto;padding-top:22px;}
.bnt-punch{font-size:17px;font-weight:700;color:#b45309;line-height:1.5;}
.bnt-fix{font-size:19px;font-weight:800;color:#4f46e5;margin-top:8px;}
.bnt-tile-integ{display:flex;flex-direction:column;}
.bnt-integ-note{font-size:15px;color:#56565f;margin-top:12px;line-height:1.5;}
.bnt-chips{display:flex;flex-wrap:wrap;gap:9px;margin-top:20px;}
.bnt-chip{padding:8px 14px;border-radius:11px;background:#f3f3f7;border:1px solid rgba(17,17,24,.06);font-size:13.5px;font-weight:600;color:#3f3f49;}

/* ---- band heading ---- */
.bnt-band{text-align:center;margin-top:48px;}
.bnt-kicker{font-size:12.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#4f46e5;}
.bnt-band-title{font-size:clamp(26px,3.4vw,38px);font-weight:800;letter-spacing:-.03em;line-height:1.12;margin-top:10px;}

/* ---- steps ---- */
.bnt-grid-steps{grid-template-columns:repeat(4,1fr);}
.bnt-tile-step{display:flex;flex-direction:column;min-height:230px;}
.bnt-step-top{display:flex;align-items:center;justify-content:space-between;}
.bnt-step-ico{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:13px;background:#eeecff;color:#4f46e5;}
.bnt-step-n{font-size:13px;font-weight:700;font-family:var(--font-geist-mono),monospace;color:#c3c3cd;letter-spacing:.08em;}
.bnt-step-title{font-size:21px;font-weight:800;letter-spacing:-.02em;margin-top:18px;}
.bnt-step-short{font-size:14px;font-weight:600;color:#4f46e5;margin-top:6px;}
.bnt-step-body{font-size:13.5px;line-height:1.6;color:#65656e;margin-top:12px;}

/* ---- agent ---- */
.bnt-grid-agent{grid-template-columns:1fr 1.35fr;align-items:stretch;}
.bnt-tile-agentintro{display:flex;flex-direction:column;}
.bnt-agent-meta{margin-top:auto;padding-top:26px;display:flex;align-items:center;justify-content:space-between;gap:12px;}
.bnt-agent-status{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:#c7c7d2;font-family:var(--font-geist-mono),monospace;}
.bnt-agent-led{width:8px;height:8px;border-radius:50%;background:#34d399;box-shadow:0 0 0 4px rgba(52,211,153,.18);}
.bnt-agent-count{font-size:12px;color:rgba(255,255,255,.45);font-weight:500;}
.bnt-tile-agentfeed{display:flex;flex-direction:column;gap:11px;justify-content:center;background:#fafafc;}
.bnt-msg{display:flex;align-items:center;gap:14px;padding:16px 18px;border-radius:15px;background:#fff;border:1px solid rgba(17,17,24,.06);box-shadow:0 4px 14px rgba(40,38,80,.04);}
.bnt-msg-ico{font-size:19px;flex-shrink:0;}
.bnt-msg-text{flex:1;font-size:14px;line-height:1.5;color:#3f3f49;}
.bnt-msg-done{font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#16a34a;background:#dcfce7;padding:5px 10px;border-radius:8px;flex-shrink:0;}

/* ---- pricing ---- */
.bnt-grid-price{grid-template-columns:repeat(4,1fr);align-items:stretch;}
.bnt-tile-plan{display:flex;flex-direction:column;gap:6px;padding:26px 24px;}
.bnt-plan-pop{transform:none;}
.bnt-plan-pop:hover{transform:translateY(-3px);}
.bnt-plan-badge{align-self:flex-start;background:#4f46e5;color:#fff;font-size:10.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;padding:5px 12px;border-radius:999px;margin-bottom:6px;}
.bnt-plan-name{font-size:12.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#4f46e5;}
.bnt-plan-priceline{display:flex;align-items:baseline;gap:4px;margin-top:4px;}
.bnt-plan-price{font-size:32px;font-weight:800;letter-spacing:-.03em;}
.bnt-plan-cad{font-size:12.5px;font-weight:500;color:#9a9aa7;}
.bnt-tile-dark .bnt-plan-cad{color:rgba(255,255,255,.55);}
.bnt-plan-tag{font-size:13.5px;color:#65656e;margin-top:2px;min-height:36px;}
.bnt-plan-feats{list-style:none;display:flex;flex-direction:column;gap:9px;flex:1;margin-top:16px;padding:0;}
.bnt-plan-feats li{display:flex;gap:8px;font-size:13px;line-height:1.45;color:#4a4a54;}
.bnt-feat-light{color:rgba(243,243,247,.82)!important;}
.bnt-check{color:#4f46e5;font-weight:800;flex-shrink:0;}
.bnt-tile-dark .bnt-check{color:#a5b4fc;}
.bnt-plan-cta{justify-content:center;margin-top:18px;}

/* ---- about + final ---- */
.bnt-grid-foot{grid-template-columns:1.45fr 1fr;align-items:stretch;}
.bnt-tile-about{display:flex;gap:30px;align-items:center;}
.bnt-about-photo{position:relative;width:160px;height:200px;border-radius:18px;overflow:hidden;flex-shrink:0;box-shadow:0 12px 30px rgba(40,38,80,.14);}
.bnt-about-img{object-fit:cover;object-position:center 28%;}
.bnt-about-copy{flex:1;}
.bnt-about-kicker{font-size:16px;font-weight:700;color:#111118;margin-top:18px;line-height:1.45;}
.bnt-hand{font-family:var(--font-caveat),cursive;font-size:28px;margin-top:8px;color:#4f46e5;}
.bnt-tile-final{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;}
.bnt-final-title{font-size:clamp(26px,3vw,34px);font-weight:800;letter-spacing:-.03em;line-height:1.1;color:#fff;}
.bnt-final-sub{font-size:15.5px;color:rgba(255,255,255,.82);margin:14px 0 24px;line-height:1.55;max-width:34ch;}
.bnt-final-reassure{font-size:13px;color:rgba(255,255,255,.62);margin-top:16px;}
.bnt-final-orb{position:absolute;right:-70px;top:-70px;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.22),transparent 70%);pointer-events:none;}

/* ---- footer ---- */
.bnt-footer{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;margin:40px 0 36px;padding-top:24px;border-top:1px solid rgba(17,17,24,.08);}
.bnt-footer-links{display:flex;align-items:center;gap:12px;font-size:14px;}
.bnt-footer-links a{color:#5b5b66;text-decoration:none;}
.bnt-footer-links a:hover{color:#4f46e5;}
.bnt-footer-sep{color:#c3c3cd;}

/* ---- responsive ---- */
@media(max-width:980px){
  .bnt-nav-links{display:none;}
  .bnt-grid-hero,.bnt-grid-prob,.bnt-grid-agent,.bnt-grid-foot{grid-template-columns:1fr;}
  .bnt-grid-stats,.bnt-grid-steps,.bnt-grid-price{grid-template-columns:1fr 1fr;}
  .bnt-tile-hero,.bnt-tile-dash{min-height:0;}
}
@media(max-width:560px){
  .bnt-tile{padding:24px;}
  .bnt-tile-hero{padding:30px;}
  .bnt-grid-stats,.bnt-grid-steps,.bnt-grid-price{grid-template-columns:1fr;}
  .bnt-cta-row{flex-direction:column;align-items:stretch;}
  .bnt-btn-lg{width:100%;justify-content:center;}
  .bnt-tile-about{flex-direction:column;text-align:center;align-items:center;}
  .bnt-about-copy{display:flex;flex-direction:column;align-items:center;}
}
`;
