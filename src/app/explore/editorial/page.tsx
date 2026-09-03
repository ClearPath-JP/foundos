'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  CAL, EMAIL, IG_HANDLE, brand, heroline, problem, steps,
  agentMessages, integrations, plans, about, closing,
} from '../content';

/* Direction — "Editorial": Swiss / brutalist newspaper. Paper #f4f1ea, ink
   #16140f, one cobalt accent #1f3df0. Typography IS the design — giant left
   headline against a narrow right meta column, hairline rules, oversized
   step numerals, mono labels. No gradients, no glass, sharp corners only. */

const YEAR = new Date().getFullYear();

export default function Editorial() {
  const words = heroline.rotating;
  const [wi, setWi] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWi((p) => (p + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, [words.length]);

  const fade = (d: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="edi-root">
      <style>{CSS}</style>

      {/* ── NAV ───────────────────────────────────────────────── */}
      <nav className="edi-nav">
        <div className="edi-wrap edi-nav-inner">
          <a href="#top" className="edi-logo">
            {brand.name}<span className="edi-logo-tld">{brand.tld}</span>
          </a>
          <div className="edi-nav-mid">
            <a href="#problem">The Problem</a>
            <a href="#system">The System</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">Josh</a>
          </div>
          <a href={CAL} className="edi-nav-cta">
            Book a call
            <Arrow />
          </a>
        </div>
      </nav>

      <main id="top" className="edi-wrap">

        {/* ── HERO ────────────────────────────────────────────── */}
        <section className="edi-hero">
          <div className="edi-hero-grid">
            <div className="edi-hero-main">
              <motion.p {...fade(0)} className="edi-eyebrow">
                <span className="edi-eyebrow-no">№ 01</span>
                {heroline.eyebrow}
              </motion.p>

              <motion.h1 {...fade(0.06)} className="edi-h1">
                Your business
                <br />
                <span className="edi-rot-line">
                  <span className="edi-rot">
                    <motion.span
                      key={wi}
                      initial={{ opacity: 0.55, y: '0.18em' }}
                      animate={{ opacity: 1, y: '0em' }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="edi-rot-word"
                    >
                      {words[wi]}
                    </motion.span>
                  </span>
                </span>
                <span className="edi-h1-tail">— while you live your life.</span>
              </motion.h1>
            </div>

            {/* narrow editorial meta column */}
            <motion.aside {...fade(0.18)} className="edi-meta">
              <dl className="edi-meta-list">
                <div className="edi-meta-row">
                  <dt>What it is</dt>
                  <dd>An AI operating system that runs the repetitive work of your business 24/7.</dd>
                </div>
                <div className="edi-meta-row">
                  <dt>Who it&rsquo;s for</dt>
                  <dd>Gyms, studios, salons &amp; coaches doing the work by hand.</dd>
                </div>
                <div className="edi-meta-row">
                  <dt>Since</dt>
                  <dd>{brand.full} · est. {YEAR}</dd>
                </div>
              </dl>
            </motion.aside>
          </div>

          <div className="edi-rule edi-rule-thick" />

          <motion.div {...fade(0.24)} className="edi-hero-foot">
            <p className="edi-lede">{heroline.sub}</p>
            <div className="edi-cta-block">
              <div className="edi-cta-row">
                <a href={CAL} className="edi-btn edi-btn-fill">
                  {heroline.ctaPrimary}
                  <Arrow />
                </a>
                <a href="#system" className="edi-btn edi-btn-line">
                  {heroline.ctaSecondary}
                </a>
              </div>
              <p className="edi-reassure">{heroline.reassure}</p>
            </div>
          </motion.div>
        </section>

        {/* ── INTEGRATIONS / TRUST STRIP ──────────────────────── */}
        <section className="edi-strip">
          <div className="edi-rule" />
          <div className="edi-strip-inner">
            <p className="edi-label edi-strip-label">
              Connects the tools<br />you already run
            </p>
            <ul className="edi-integrations">
              {integrations.map((t, i) => (
                <li key={t} className="edi-integration">
                  <span className="edi-integration-no">{String(i + 1).padStart(2, '0')}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="edi-rule" />
        </section>

        {/* ── THE PROBLEM ─────────────────────────────────────── */}
        <section id="problem" className="edi-section">
          <div className="edi-sec-grid">
            <div className="edi-sec-aside">
              <p className="edi-label">№ 02 — The Problem</p>
            </div>
            <div className="edi-sec-body">
              <h2 className="edi-h2">{problem.title}</h2>
              <div className="edi-prose-cols">
                {problem.body.map((para, i) => (
                  <p key={i} className="edi-prose">
                    {i === 0 && <span className="edi-dropcap">{para.charAt(0)}</span>}
                    {i === 0 ? para.slice(1) : para}
                  </p>
                ))}
              </div>
              <div className="edi-rule edi-rule-tight" />
              <p className="edi-punch">{problem.punch}</p>
              <p className="edi-fix">
                {problem.fix}
                <span className="edi-fix-bar" aria-hidden />
              </p>
            </div>
          </div>
        </section>

        {/* ── THE SYSTEM (4 steps) ────────────────────────────── */}
        <section id="system" className="edi-section">
          <div className="edi-rule edi-rule-thick" />
          <header className="edi-sec-head">
            <p className="edi-label">№ 03 — The System</p>
            <h2 className="edi-h2 edi-h2-wide">Four steps to a business that runs itself.</h2>
          </header>

          <ol className="edi-steps">
            {steps.map((s) => (
              <li key={s.n} className="edi-step">
                <span className="edi-step-no">{s.n}</span>
                <div className="edi-step-copy">
                  <h3 className="edi-step-title">{s.title}</h3>
                  <p className="edi-step-short">{s.short}</p>
                  <p className="edi-step-body">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── THE AGENT ───────────────────────────────────────── */}
        <section className="edi-section">
          <div className="edi-rule edi-rule-thick" />
          <div className="edi-sec-grid">
            <div className="edi-sec-aside">
              <p className="edi-label">№ 04 — The Agent</p>
              <p className="edi-aside-note">
                Your invisible employee. It reads the situation and makes the call &mdash; around the clock, without you.
              </p>
            </div>
            <div className="edi-sec-body">
              <h2 className="edi-h2">The agent makes smart calls, 24/7.</h2>
              <ul className="edi-wire">
                {agentMessages.map((m, i) => (
                  <li key={i} className="edi-wire-item">
                    <span className="edi-wire-meta">
                      <span className="edi-wire-dot" aria-hidden />
                      <span className="edi-wire-tag">LIVE · {String(i + 1).padStart(2, '0')}</span>
                    </span>
                    <span className="edi-wire-icon" aria-hidden>{m.icon}</span>
                    <span className="edi-wire-text">{m.text}</span>
                    <span className="edi-wire-status">Done</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── PRICING ─────────────────────────────────────────── */}
        <section id="pricing" className="edi-section">
          <div className="edi-rule edi-rule-thick" />
          <header className="edi-sec-head">
            <p className="edi-label">№ 05 — Pricing</p>
            <h2 className="edi-h2 edi-h2-wide">Simple monthly pricing. Your website included.</h2>
          </header>

          <div className="edi-price-grid">
            {plans.map((p) => (
              <article key={p.name} className={`edi-plan${p.popular ? ' edi-plan-pop' : ''}`}>
                <div className="edi-plan-top">
                  <p className="edi-plan-name">
                    {p.name}
                    {p.popular && <span className="edi-plan-flag">Recommended</span>}
                  </p>
                  <p className="edi-plan-price">{p.price}</p>
                  <p className="edi-plan-cad">{p.cadence}</p>
                  <p className="edi-plan-tag">{p.tagline}</p>
                </div>
                <ul className="edi-plan-feats">
                  {p.features.map((f) => (
                    <li key={f}>
                      <span className="edi-plan-tick" aria-hidden>+</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="edi-plan-best">{p.best}</p>
                <a href={CAL} className={`edi-btn edi-plan-cta${p.popular ? ' edi-btn-fill' : ' edi-btn-line'}`}>
                  {p.cta}
                  <Arrow />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ── ABOUT JOSH ──────────────────────────────────────── */}
        <section id="about" className="edi-section">
          <div className="edi-rule edi-rule-thick" />
          <div className="edi-about">
            <figure className="edi-about-fig">
              <div className="edi-about-frame">
                <Image
                  src={about.photo}
                  alt={`${about.name}, founder of ${brand.full}`}
                  fill
                  sizes="(max-width:780px) 100vw, 320px"
                  className="edi-about-img"
                />
              </div>
              <figcaption className="edi-about-cap">
                {about.name} — Founder, {brand.full}
              </figcaption>
            </figure>

            <div className="edi-about-copy">
              <p className="edi-label">№ 06 — The Founder</p>
              <h2 className="edi-h2">Hey, I&rsquo;m {about.name}.</h2>
              {about.lines.map((l, i) => (
                <p key={i} className="edi-about-line">{l}</p>
              ))}
              <p className="edi-about-kicker">&ldquo;{about.kicker}&rdquo;</p>
              <p className="edi-sign">{about.signoff}</p>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ───────────────────────────────────────── */}
        <section className="edi-section edi-final">
          <div className="edi-rule edi-rule-thick" />
          <div className="edi-final-grid">
            <div>
              <p className="edi-label">№ 07 — Get Started</p>
              <h2 className="edi-final-title">{closing.title}</h2>
            </div>
            <div className="edi-final-side">
              <p className="edi-final-sub">{closing.sub}</p>
              <a href={CAL} className="edi-btn edi-btn-fill edi-btn-big">
                {closing.cta}
                <Arrow />
              </a>
              <p className="edi-reassure">{closing.reassure}</p>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────── */}
        <footer className="edi-footer">
          <div className="edi-rule" />
          <div className="edi-footer-inner">
            <span className="edi-footer-logo">{brand.name}<span className="edi-logo-tld">{brand.tld}</span></span>
            <div className="edi-footer-links">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <span className="edi-footer-sep">·</span>
              <a href={CAL}>Book a call</a>
              <span className="edi-footer-sep">·</span>
              <span>{IG_HANDLE}</span>
            </div>
            <span className="edi-footer-copy">© {YEAR} {brand.full}</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* ── inline mark ─────────────────────────────────────────── */
function Arrow() {
  return (
    <svg className="edi-arrow" width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden>
      <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

const CSS = `
.edi-root{
  --paper:#f4f1ea; --ink:#16140f; --cobalt:#1f3df0;
  --ink-60:#5a564c; --ink-40:#8a8579; --line:rgba(22,20,15,.18);
  position:relative;min-height:100vh;background:var(--paper);color:var(--ink);
  font-family:var(--font-inter),system-ui,sans-serif;
  -webkit-font-smoothing:antialiased;overflow-x:hidden;
}
.edi-root *{box-sizing:border-box;}
.edi-wrap{max-width:1240px;margin:0 auto;padding:0 40px;}
.edi-mono{font-family:var(--font-geist-mono),ui-monospace,monospace;}

/* hairline rules */
.edi-rule{height:1px;width:100%;background:var(--line);}
.edi-rule-thick{height:2px;background:var(--ink);}
.edi-rule-tight{margin:24px 0;}

/* labels */
.edi-label{
  font-family:var(--font-geist-mono),ui-monospace,monospace;
  font-size:11px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;
  color:var(--ink-60);
}

/* ── NAV ── */
.edi-nav{position:sticky;top:0;z-index:40;background:var(--paper);border-bottom:1px solid var(--line);}
.edi-nav-inner{display:flex;align-items:center;justify-content:space-between;height:68px;}
.edi-logo{font-size:21px;font-weight:800;letter-spacing:-.04em;color:var(--ink);text-decoration:none;}
.edi-logo-tld{color:var(--cobalt);}
.edi-nav-mid{display:flex;gap:30px;}
.edi-nav-mid a{
  font-family:var(--font-geist-mono),ui-monospace,monospace;
  font-size:11px;letter-spacing:.16em;text-transform:uppercase;
  color:var(--ink-60);text-decoration:none;transition:color .15s;
}
.edi-nav-mid a:hover{color:var(--ink);}
.edi-nav-cta{
  display:inline-flex;align-items:center;gap:10px;
  font-size:13px;font-weight:600;letter-spacing:-.01em;color:var(--ink);
  text-decoration:none;border-bottom:1.5px solid var(--ink);padding-bottom:2px;
  transition:color .15s,border-color .15s;
}
.edi-nav-cta:hover{color:var(--cobalt);border-color:var(--cobalt);}
.edi-arrow{flex-shrink:0;transition:transform .2s ease;}
.edi-nav-cta:hover .edi-arrow,.edi-btn:hover .edi-arrow{transform:translateX(4px);}

/* ── HERO ── */
.edi-hero{padding:72px 0 56px;}
.edi-hero-grid{display:grid;grid-template-columns:minmax(0,1.62fr) minmax(0,1fr);gap:56px;align-items:start;}
.edi-eyebrow{
  display:flex;align-items:baseline;gap:16px;flex-wrap:wrap;
  font-family:var(--font-geist-mono),ui-monospace,monospace;
  font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-60);
  margin-bottom:30px;
}
.edi-eyebrow-no{color:var(--cobalt);font-weight:600;}
.edi-h1{
  font-size:clamp(48px,8.4vw,112px);font-weight:900;line-height:.93;
  letter-spacing:-.045em;margin:0;
}
.edi-rot-line{display:block;}
.edi-rot{display:inline-block;position:relative;overflow:hidden;vertical-align:top;color:var(--cobalt);}
.edi-rot-word{display:inline-block;}
.edi-h1-tail{
  display:block;font-size:clamp(22px,3.1vw,40px);font-weight:600;
  letter-spacing:-.03em;line-height:1.05;margin-top:.22em;color:var(--ink);
}

.edi-meta{padding-top:10px;}
.edi-meta-list{margin:0;display:flex;flex-direction:column;}
.edi-meta-row{padding:18px 0;border-top:1px solid var(--line);}
.edi-meta-row:last-child{border-bottom:1px solid var(--line);}
.edi-meta-row dt{
  font-family:var(--font-geist-mono),ui-monospace,monospace;
  font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-40);
  margin-bottom:8px;
}
.edi-meta-row dd{margin:0;font-size:15px;line-height:1.45;color:var(--ink);font-weight:450;}

.edi-hero-foot{display:grid;grid-template-columns:minmax(0,1.62fr) minmax(0,1fr);gap:56px;padding-top:36px;align-items:start;}
.edi-lede{font-size:clamp(17px,1.5vw,20px);line-height:1.55;color:var(--ink-60);max-width:30em;margin:0;}
.edi-cta-block{display:flex;flex-direction:column;gap:16px;}
.edi-cta-row{display:flex;gap:14px;flex-wrap:wrap;}
.edi-reassure{
  font-family:var(--font-geist-mono),ui-monospace,monospace;
  font-size:11px;letter-spacing:.04em;color:var(--ink-40);line-height:1.5;margin:0;
}

/* ── buttons ── */
.edi-btn{
  display:inline-flex;align-items:center;gap:12px;
  font-size:14px;font-weight:600;letter-spacing:-.01em;
  padding:14px 22px;text-decoration:none;border-radius:0;
  border:1.5px solid var(--ink);transition:background .18s,color .18s,border-color .18s;
}
.edi-btn-fill{background:var(--cobalt);border-color:var(--cobalt);color:#fff;}
.edi-btn-fill:hover{background:var(--ink);border-color:var(--ink);}
.edi-btn-line{background:transparent;color:var(--ink);}
.edi-btn-line:hover{background:var(--ink);color:var(--paper);}
.edi-btn-big{padding:18px 28px;font-size:15.5px;}

/* ── INTEGRATIONS STRIP ── */
.edi-strip{padding:0;}
.edi-strip-inner{display:grid;grid-template-columns:minmax(0,200px) 1fr;gap:48px;padding:34px 0;align-items:start;}
.edi-strip-label{line-height:1.6;}
.edi-integrations{
  list-style:none;margin:0;padding:0;
  display:grid;grid-template-columns:repeat(4,1fr);gap:18px 28px;
}
.edi-integration{
  display:flex;align-items:baseline;gap:9px;
  font-size:16px;font-weight:600;letter-spacing:-.02em;color:var(--ink);
}
.edi-integration-no{
  font-family:var(--font-geist-mono),ui-monospace,monospace;
  font-size:10px;letter-spacing:.1em;color:var(--ink-40);font-weight:400;
}

/* ── SECTION SCAFFOLD ── */
.edi-section{padding:64px 0;}
.edi-sec-grid{display:grid;grid-template-columns:minmax(0,260px) minmax(0,1fr);gap:56px;align-items:start;}
.edi-sec-aside{position:sticky;top:96px;}
.edi-aside-note{margin-top:18px;font-size:14px;line-height:1.55;color:var(--ink-60);max-width:22em;}
.edi-sec-body{min-width:0;}
.edi-sec-head{padding:30px 0 44px;display:flex;flex-direction:column;gap:18px;}

.edi-h2{font-size:clamp(28px,3.9vw,46px);font-weight:800;letter-spacing:-.035em;line-height:1.04;margin:0;max-width:16em;}
.edi-h2-wide{max-width:18em;}

/* problem prose */
.edi-prose-cols{margin-top:30px;column-count:2;column-gap:44px;}
.edi-prose{font-size:16px;line-height:1.66;color:var(--ink-60);margin:0 0 18px;break-inside:avoid;}
.edi-dropcap{
  float:left;font-size:62px;line-height:.78;font-weight:900;
  color:var(--cobalt);padding:6px 10px 0 0;letter-spacing:-.04em;
}
.edi-punch{font-size:clamp(18px,1.9vw,23px);font-weight:700;line-height:1.4;letter-spacing:-.02em;color:var(--ink);margin:0;max-width:24em;}
.edi-fix{position:relative;display:inline-block;font-size:clamp(22px,2.6vw,32px);font-weight:900;letter-spacing:-.03em;color:var(--cobalt);margin:20px 0 0;}
.edi-fix-bar{display:block;height:3px;width:100%;background:var(--cobalt);margin-top:8px;}

/* ── STEPS ── */
.edi-steps{list-style:none;margin:0;padding:0;}
.edi-step{
  display:grid;grid-template-columns:minmax(0,260px) minmax(0,1fr);gap:56px;
  padding:38px 0;border-top:1px solid var(--line);align-items:start;
}
.edi-step:last-child{border-bottom:1px solid var(--line);}
.edi-step-no{
  font-size:clamp(64px,9vw,118px);font-weight:900;line-height:.82;
  letter-spacing:-.06em;color:var(--ink);
  -webkit-text-fill-color:transparent;-webkit-text-stroke:1.4px var(--ink);
}
.edi-step:hover .edi-step-no{-webkit-text-fill-color:var(--cobalt);-webkit-text-stroke-color:var(--cobalt);}
.edi-step-copy{min-width:0;padding-top:6px;}
.edi-step-title{font-size:clamp(24px,2.6vw,32px);font-weight:800;letter-spacing:-.03em;margin:0;}
.edi-step-short{font-size:15px;font-weight:600;color:var(--cobalt);margin:8px 0 0;letter-spacing:-.01em;}
.edi-step-body{font-size:16px;line-height:1.66;color:var(--ink-60);margin:14px 0 0;max-width:40em;}

/* ── AGENT WIRE ── */
.edi-wire{list-style:none;margin:30px 0 0;padding:0;}
.edi-wire-item{
  display:grid;grid-template-columns:auto auto 1fr auto;gap:18px;align-items:center;
  padding:20px 0;border-top:1px solid var(--line);
}
.edi-wire-item:last-child{border-bottom:1px solid var(--line);}
.edi-wire-meta{display:flex;align-items:center;gap:8px;}
.edi-wire-dot{width:7px;height:7px;border-radius:50%;background:var(--cobalt);flex-shrink:0;}
.edi-wire-tag{
  font-family:var(--font-geist-mono),ui-monospace,monospace;
  font-size:10px;letter-spacing:.14em;color:var(--ink-40);white-space:nowrap;
}
.edi-wire-icon{font-size:18px;line-height:1;}
.edi-wire-text{font-size:16px;line-height:1.5;color:var(--ink);letter-spacing:-.01em;min-width:0;}
.edi-wire-status{
  font-family:var(--font-geist-mono),ui-monospace,monospace;
  font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--cobalt);
  border:1px solid var(--cobalt);padding:4px 9px;white-space:nowrap;
}

/* ── PRICING ── */
.edi-price-grid{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line);}
.edi-plan{
  display:flex;flex-direction:column;padding:34px 26px;
  border-left:1px solid var(--line);
}
.edi-plan:first-child{border-left:none;}
.edi-plan-pop{background:var(--cobalt);color:#fff;border-left-color:var(--cobalt);margin-top:-1px;}
.edi-plan-pop .edi-plan-cad,.edi-plan-pop .edi-plan-tag,.edi-plan-pop .edi-plan-feats li,.edi-plan-pop .edi-plan-best{color:rgba(255,255,255,.84);}
.edi-plan-pop .edi-plan-tick{color:#fff;}
.edi-plan-top{min-height:142px;}
.edi-plan-name{
  display:flex;align-items:center;gap:10px;flex-wrap:wrap;
  font-family:var(--font-geist-mono),ui-monospace,monospace;
  font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;margin:0 0 18px;
}
.edi-plan-flag{
  font-size:9px;letter-spacing:.1em;background:#fff;color:var(--cobalt);
  padding:3px 7px;border-radius:0;
}
.edi-plan-price{font-size:42px;font-weight:900;letter-spacing:-.045em;line-height:1;margin:0;}
.edi-plan-cad{font-size:12.5px;color:var(--ink-40);margin:6px 0 0;}
.edi-plan-tag{font-size:14px;line-height:1.45;color:var(--ink-60);margin:14px 0 0;}
.edi-plan-feats{
  list-style:none;margin:24px 0 0;padding:24px 0 0;border-top:1px solid var(--line);
  display:flex;flex-direction:column;gap:12px;flex:1;
}
.edi-plan-pop .edi-plan-feats{border-top-color:rgba(255,255,255,.28);}
.edi-plan-feats li{display:flex;gap:9px;font-size:13.5px;line-height:1.45;color:var(--ink-60);}
.edi-plan-tick{color:var(--cobalt);font-weight:700;flex-shrink:0;}
.edi-plan-best{font-size:12.5px;font-style:italic;line-height:1.5;color:var(--ink-40);margin:22px 0 22px;}
.edi-plan-cta{justify-content:space-between;width:100%;}
.edi-plan-pop .edi-btn-fill{background:#fff;border-color:#fff;color:var(--cobalt);}
.edi-plan-pop .edi-btn-fill:hover{background:var(--ink);border-color:var(--ink);color:#fff;}

/* ── ABOUT ── */
.edi-about{display:grid;grid-template-columns:minmax(0,320px) minmax(0,1fr);gap:56px;padding-top:48px;align-items:start;}
.edi-about-fig{margin:0;}
.edi-about-frame{position:relative;width:100%;aspect-ratio:4/5;border:1px solid var(--ink);overflow:hidden;background:#e6e2d8;}
.edi-about-img{object-fit:cover;object-position:center 22%;filter:grayscale(1) contrast(1.04);}
.edi-about-cap{
  font-family:var(--font-geist-mono),ui-monospace,monospace;
  font-size:11px;letter-spacing:.08em;color:var(--ink-40);
  margin-top:12px;padding-top:12px;border-top:1px solid var(--line);
}
.edi-about-copy{min-width:0;display:flex;flex-direction:column;gap:0;}
.edi-about-copy .edi-h2{margin:14px 0 24px;}
.edi-about-line{font-size:16.5px;line-height:1.68;color:var(--ink-60);margin:0 0 16px;max-width:42em;}
.edi-about-kicker{font-size:clamp(19px,2vw,25px);font-weight:800;letter-spacing:-.03em;line-height:1.32;color:var(--ink);margin:14px 0 0;max-width:18em;}
.edi-sign{font-family:var(--font-caveat),cursive;font-size:34px;color:var(--cobalt);margin:18px 0 0;line-height:1;}

/* ── FINAL ── */
.edi-final{padding-bottom:40px;}
.edi-final-grid{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:56px;padding-top:48px;align-items:start;}
.edi-final-title{font-size:clamp(38px,6vw,80px);font-weight:900;letter-spacing:-.045em;line-height:.95;margin:18px 0 0;}
.edi-final-side{display:flex;flex-direction:column;gap:18px;padding-top:8px;}
.edi-final-sub{font-size:17px;line-height:1.55;color:var(--ink-60);margin:0;max-width:30em;}
.edi-final-side .edi-btn-big{align-self:flex-start;}

/* ── FOOTER ── */
.edi-footer{margin-top:24px;}
.edi-footer-inner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;padding:28px 0 48px;}
.edi-footer-logo{font-size:17px;font-weight:800;letter-spacing:-.04em;}
.edi-footer-links{display:flex;align-items:center;gap:12px;flex-wrap:wrap;}
.edi-footer-links a,.edi-footer-links span{
  font-family:var(--font-geist-mono),ui-monospace,monospace;
  font-size:11px;letter-spacing:.06em;color:var(--ink-60);text-decoration:none;
}
.edi-footer-links a:hover{color:var(--cobalt);}
.edi-footer-sep{color:var(--ink-40);}
.edi-footer-copy{
  font-family:var(--font-geist-mono),ui-monospace,monospace;
  font-size:11px;letter-spacing:.06em;color:var(--ink-40);
}

/* ── RESPONSIVE ── */
@media(max-width:960px){
  .edi-wrap{padding:0 28px;}
  .edi-nav-mid{display:none;}
  .edi-hero-grid,.edi-hero-foot{grid-template-columns:1fr;gap:34px;}
  .edi-meta{padding-top:0;}
  .edi-sec-grid{grid-template-columns:1fr;gap:28px;}
  .edi-sec-aside{position:static;}
  .edi-prose-cols{column-count:1;}
  .edi-step{grid-template-columns:1fr;gap:14px;}
  .edi-step-no{font-size:72px;}
  .edi-price-grid{grid-template-columns:1fr 1fr;}
  .edi-plan{border-top:1px solid var(--line);}
  .edi-plan:nth-child(-n+2){border-top:none;}
  .edi-plan:nth-child(odd){border-left:none;}
  .edi-plan-pop{margin-top:0;}
  .edi-plan-top{min-height:0;}
  .edi-about,.edi-final-grid{grid-template-columns:1fr;gap:32px;}
  .edi-about-frame{max-width:300px;}
}
@media(max-width:560px){
  .edi-wrap{padding:0 20px;}
  .edi-hero{padding:48px 0 40px;}
  .edi-section{padding:48px 0;}
  .edi-integrations{grid-template-columns:1fr 1fr;}
  .edi-price-grid{grid-template-columns:1fr;}
  .edi-plan{border-left:none !important;border-top:1px solid var(--line);}
  .edi-plan:first-child{border-top:none;}
  .edi-wire-item{grid-template-columns:1fr auto;grid-template-areas:"meta status" "text text";gap:10px 14px;}
  .edi-wire-meta{grid-area:meta;}
  .edi-wire-status{grid-area:status;justify-self:end;}
  .edi-wire-icon{display:none;}
  .edi-wire-text{grid-area:text;}
  .edi-cta-row{flex-direction:column;align-items:stretch;}
  .edi-btn{justify-content:center;}
}
`;
