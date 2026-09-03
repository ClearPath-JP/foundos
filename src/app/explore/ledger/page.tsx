'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CAL, EMAIL, IG_HANDLE, brand, heroline, problem, steps, agentMessages,
  integrations, plans, about, closing,
} from '../content';

/* Direction — "Ledger": data-forward, conversion-optimized. Clean white,
   cool slate grays, one trustworthy emerald accent. The hero is a live ROI
   calculator; numbers everywhere; built to make a skeptical owner think
   "this pays for itself." */

/* ---------- small animated count-up (no external deps) ---------- */
function useCountUp(target: number, duration = 1100) {
  const [val, setVal] = useState(target); // start populated so it's never 0 on load
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const from = val;
    const delta = target - from;
    if (delta === 0) return;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setVal(from + delta * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);
  return val;
}

const fmtMoney = (n: number) =>
  '$' + Math.round(n).toLocaleString('en-US');
const fmtHours = (n: number) =>
  Math.round(n).toLocaleString('en-US');

/* ---------- tiny inline icons ---------- */
function ArrowUp({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 19V5M12 5l-6 6M12 5l6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Check({ className }: { className?: string }) {
  return (
    <svg className={className} width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Spark({ className }: { className?: string }) {
  // a small upward sparkline drawn as SVG polyline
  return (
    <svg className={className} viewBox="0 0 120 40" preserveAspectRatio="none" aria-hidden>
      <polyline
        points="0,34 18,30 34,32 52,22 70,24 88,14 104,9 120,3"
        fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
      />
      <polyline
        points="0,40 0,34 18,30 34,32 52,22 70,24 88,14 104,9 120,3 120,40"
        fill="currentColor" opacity="0.10" stroke="none"
      />
    </svg>
  );
}

/* ---------- ROI calculator (hero centerpiece) ---------- */
function Calculator() {
  const [members, setMembers] = useState(150);
  const [value, setValue] = useState(120);
  const [admin, setAdmin] = useState(15);

  // believable formulas
  const recovered = useMemo(
    () => members * value * 0.08, // ~8% reactivation / upsell lift
    [members, value],
  );
  const hoursSaved = useMemo(
    () => admin * 0.6 * 4.3, // ~60% of weekly admin hours, monthly
    [admin],
  );
  const yearly = recovered * 12;

  const recAnim = useCountUp(recovered);
  const hrsAnim = useCountUp(hoursSaved);
  const yrAnim = useCountUp(yearly, 1300);

  // bar heights for the little projection viz (12 months ramp)
  const bars = useMemo(() => {
    const peak = recovered;
    return Array.from({ length: 12 }, (_, i) => {
      const ramp = 0.35 + (i / 11) * 0.65; // grows over the year
      return Math.max(6, Math.round(ramp * 100));
    });
  }, [recovered]);

  return (
    <div className="lgr-calc">
      <div className="lgr-calc-head">
        <span className="lgr-calc-tag">
          <span className="lgr-live-dot" /> Live estimate
        </span>
        <span className="lgr-calc-sub">Drag the sliders — see what you&apos;re leaving on the table.</span>
      </div>

      {/* the big numbers */}
      <div className="lgr-calc-numbers">
        <div className="lgr-num lgr-num-primary">
          <span className="lgr-num-label">Revenue recovered / month</span>
          <span className="lgr-num-val">{fmtMoney(recAnim)}</span>
          <span className="lgr-num-foot">
            <ArrowUp className="lgr-up" /> {fmtMoney(yrAnim)} a year
          </span>
        </div>
        <div className="lgr-num">
          <span className="lgr-num-label">Hours saved / month</span>
          <span className="lgr-num-val lgr-num-val-sm">{fmtHours(hrsAnim)}<span className="lgr-num-unit">hrs</span></span>
          <span className="lgr-num-foot lgr-num-foot-muted">
            ~{Math.round(hoursSaved / 4.3)} hrs back every week
          </span>
        </div>
      </div>

      {/* projection bars */}
      <div className="lgr-bars" aria-hidden>
        {bars.map((h, i) => (
          <span key={i} className="lgr-bar" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="lgr-bars-axis"><span>Mo 1</span><span>Mo 12</span></div>

      {/* sliders */}
      <div className="lgr-sliders">
        <label className="lgr-slider">
          <span className="lgr-slider-top">
            <span className="lgr-slider-name">Active members / clients</span>
            <span className="lgr-slider-val">{members}</span>
          </span>
          <input
            type="range" min={20} max={600} step={5}
            value={members} onChange={(e) => setMembers(+e.target.value)}
            style={{ ['--pct' as string]: `${((members - 20) / (600 - 20)) * 100}%` }}
          />
        </label>

        <label className="lgr-slider">
          <span className="lgr-slider-top">
            <span className="lgr-slider-name">Avg monthly value</span>
            <span className="lgr-slider-val">${value}</span>
          </span>
          <input
            type="range" min={40} max={400} step={5}
            value={value} onChange={(e) => setValue(+e.target.value)}
            style={{ ['--pct' as string]: `${((value - 40) / (400 - 40)) * 100}%` }}
          />
        </label>

        <label className="lgr-slider">
          <span className="lgr-slider-top">
            <span className="lgr-slider-name">Hours / week on admin</span>
            <span className="lgr-slider-val">{admin} hrs</span>
          </span>
          <input
            type="range" min={2} max={50} step={1}
            value={admin} onChange={(e) => setAdmin(+e.target.value)}
            style={{ ['--pct' as string]: `${((admin - 2) / (50 - 2)) * 100}%` }}
          />
        </label>
      </div>

      <a href={CAL} className="lgr-btn lgr-btn-full">
        Recover this revenue <Arrow className="lgr-btn-ico" />
      </a>
      <p className="lgr-calc-note">Estimate only — based on ~8% reactivation/upsell and 60% admin automation. We put real numbers on your business in the audit.</p>
    </div>
  );
}

/* ---------- rotating hero verb (always inked) ---------- */
function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % words.length), 2300);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span className="lgr-rot">
      <motion.span
        key={i}
        initial={{ opacity: 0.55, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="lgr-rot-word"
      >
        {words[i]}
      </motion.span>
    </span>
  );
}

export default function Ledger() {
  // derive two "cost of doing nothing" headline stats from the same logic
  const sampleMembers = 150, sampleValue = 120, sampleAdmin = 15;
  const lostPerYear = Math.round(sampleMembers * sampleValue * 0.08 * 12);
  const hoursPerYear = Math.round(sampleAdmin * 0.6 * 4.3 * 12);

  const agentTags = ['+$420', '+$540', '+$280', '+$1,180'];

  return (
    <div className="lgr-root">
      <style>{CSS}</style>

      {/* nav */}
      <nav className="lgr-nav">
        <div className="lgr-wrap lgr-nav-inner">
          <span className="lgr-logo">{brand.name}<span className="lgr-logo-dot">{brand.tld}</span></span>
          <div className="lgr-nav-links">
            <a href="#numbers">The math</a>
            <a href="#system">System</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
          </div>
          <a href={CAL} className="lgr-btn lgr-btn-sm">Book a call</a>
        </div>
      </nav>

      <main className="lgr-wrap">
        {/* hero */}
        <section className="lgr-hero">
          <div className="lgr-hero-copy">
            <motion.p
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} className="lgr-eyebrow"
            >
              <span className="lgr-eyebrow-dot" />{heroline.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }} className="lgr-h1"
            >
              Your business{' '}
              <RotatingWord words={heroline.rotating} />
              <br />while you live your life.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }} className="lgr-sub"
            >
              {heroline.sub}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }} className="lgr-cta-row"
            >
              <a href={CAL} className="lgr-btn lgr-btn-lg">{heroline.ctaPrimary} <Arrow className="lgr-btn-ico" /></a>
              <a href="#system" className="lgr-btn lgr-btn-ghost lgr-btn-lg">{heroline.ctaSecondary}</a>
            </motion.div>
            <p className="lgr-reassure"><Check className="lgr-reassure-ico" />{heroline.reassure}</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }} className="lgr-hero-calc"
          >
            <Calculator />
          </motion.div>
        </section>

        {/* integrations / trust */}
        <section className="lgr-trust">
          <p className="lgr-trust-label">Connects the tools you already run — no rip-and-replace</p>
          <div className="lgr-logos">
            {integrations.map((t) => (
              <span key={t} className="lgr-logo-chip">{t}</span>
            ))}
          </div>
        </section>

        {/* problem — the cost of doing nothing */}
        <section id="numbers" className="lgr-section">
          <div className="lgr-section-head">
            <p className="lgr-kicker">The cost of doing nothing</p>
            <h2 className="lgr-h2">{problem.title}</h2>
          </div>

          <div className="lgr-stats">
            <div className="lgr-stat">
              <span className="lgr-stat-val">{fmtMoney(lostPerYear)}</span>
              <span className="lgr-stat-label">left on the table / year</span>
              <span className="lgr-stat-note">No reminders, no upsells, no win-backs.</span>
            </div>
            <div className="lgr-stat lgr-stat-mid">
              <span className="lgr-stat-val">{hoursPerYear}<span className="lgr-stat-unit">hrs</span></span>
              <span className="lgr-stat-label">of your year, on admin</span>
              <span className="lgr-stat-note">Doing by hand what should be automatic.</span>
            </div>
            <div className="lgr-stat">
              <span className="lgr-stat-val">5+<span className="lgr-stat-unit">tools</span></span>
              <span className="lgr-stat-label">that don&apos;t talk to each other</span>
              <span className="lgr-stat-note">Paying for software that stays disconnected.</span>
            </div>
          </div>

          <div className="lgr-problem-body">
            <div className="lgr-problem-col">
              <p className="lgr-p">{problem.body[0]}</p>
              <p className="lgr-p">{problem.body[1]}</p>
            </div>
            <div className="lgr-problem-col">
              <p className="lgr-p">{problem.body[2]}</p>
              <p className="lgr-punch">{problem.punch}</p>
              <p className="lgr-fix">{problem.fix} <Spark className="lgr-fix-spark" /></p>
            </div>
          </div>
        </section>

        {/* system — 4 steps */}
        <section id="system" className="lgr-section">
          <div className="lgr-section-head">
            <p className="lgr-kicker">How it works</p>
            <h2 className="lgr-h2">Four steps to a business that runs itself</h2>
          </div>
          <div className="lgr-steps">
            {steps.map((s, i) => (
              <div key={s.n} className="lgr-step">
                <div className="lgr-step-rail">
                  <span className="lgr-step-n">{s.n}</span>
                  {i < steps.length - 1 && <span className="lgr-step-line" />}
                </div>
                <div className="lgr-step-body">
                  <h3 className="lgr-step-title">{s.title}</h3>
                  <p className="lgr-step-short">{s.short}</p>
                  <p className="lgr-step-text">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* agent — decisions that made money */}
        <section className="lgr-section">
          <div className="lgr-section-head">
            <p className="lgr-kicker">Your invisible employee</p>
            <h2 className="lgr-h2">Decisions that made money — while you slept</h2>
          </div>
          <div className="lgr-ledger">
            <div className="lgr-ledger-head">
              <span>Today&apos;s activity</span>
              <span className="lgr-ledger-total">
                <ArrowUp className="lgr-up" /> +$2,420 recovered
              </span>
            </div>
            {agentMessages.map((m, i) => (
              <div key={i} className="lgr-ledger-row">
                <span className="lgr-ledger-ico" aria-hidden>{m.icon}</span>
                <span className="lgr-ledger-text">{m.text}</span>
                <span className="lgr-ledger-amt">
                  <ArrowUp className="lgr-up-sm" />{agentTags[i]}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* pricing */}
        <section id="pricing" className="lgr-section">
          <div className="lgr-section-head">
            <p className="lgr-kicker">Pricing</p>
            <h2 className="lgr-h2">Simple monthly pricing. Your website included.</h2>
            <p className="lgr-section-sub">One flat monthly rate. Cancel anytime. It should pay for itself.</p>
          </div>
          <div className="lgr-plans">
            {plans.map((p) => (
              <div key={p.name} className={`lgr-plan ${p.popular ? 'lgr-plan-pop' : ''}`}>
                {p.popular && <span className="lgr-plan-badge">Most popular</span>}
                <p className="lgr-plan-name">{p.name}</p>
                <p className="lgr-plan-price">{p.price}<span className="lgr-plan-cad">{p.cadence}</span></p>
                <p className="lgr-plan-tag">{p.tagline}</p>
                <ul className="lgr-plan-feats">
                  {p.features.map((f) => (
                    <li key={f}><Check className="lgr-plan-check" />{f}</li>
                  ))}
                </ul>
                <span className="lgr-plan-best">{p.best}</span>
                <a href={CAL} className={`lgr-btn ${p.popular ? '' : 'lgr-btn-ghost'} lgr-plan-cta`}>{p.cta} <Arrow className="lgr-btn-ico" /></a>
              </div>
            ))}
          </div>
        </section>

        {/* about */}
        <section id="about" className="lgr-section">
          <div className="lgr-about">
            <div className="lgr-about-photo">
              <Image src={about.photo} alt={`${about.name}, founder of ${brand.full}`} fill sizes="220px" className="lgr-about-img" />
            </div>
            <div className="lgr-about-copy">
              <p className="lgr-kicker">The founder</p>
              <h2 className="lgr-h2">Hey, I&apos;m {about.name}.</h2>
              {about.lines.map((l, i) => <p key={i} className="lgr-p">{l}</p>)}
              <p className="lgr-about-kicker">{about.kicker}</p>
              <p className="lgr-hand">{about.signoff}</p>
            </div>
          </div>
        </section>

        {/* final cta */}
        <section className="lgr-final">
          <h2 className="lgr-final-title">{closing.title}</h2>
          <p className="lgr-final-sub">{closing.sub}</p>
          <a href={CAL} className="lgr-btn lgr-btn-lg">{closing.cta} <Arrow className="lgr-btn-ico" /></a>
          <p className="lgr-reassure lgr-reassure-center"><Check className="lgr-reassure-ico" />{closing.reassure}</p>
        </section>

        {/* footer */}
        <footer className="lgr-footer">
          <span className="lgr-logo lgr-logo-foot">{brand.name}<span className="lgr-logo-dot">{brand.tld}</span></span>
          <div className="lgr-footer-links">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <span className="lgr-foot-sep">·</span>
            <Link href={CAL}>{IG_HANDLE}</Link>
          </div>
          <span className="lgr-footer-copy">© {new Date().getFullYear()} {brand.full}</span>
        </footer>
      </main>
    </div>
  );
}

const CSS = `
.lgr-root{position:relative;min-height:100vh;background:#ffffff;color:#0f172a;font-family:var(--font-inter),system-ui,sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;}
.lgr-wrap{max-width:1180px;margin:0 auto;padding:0 24px;}
.lgr-root ::selection{background:rgba(5,150,105,.16);}

/* nav */
.lgr-nav{position:sticky;top:0;z-index:30;background:rgba(255,255,255,.82);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid #e2e8f0;}
.lgr-nav-inner{display:flex;align-items:center;justify-content:space-between;height:64px;}
.lgr-logo{font-weight:800;font-size:20px;letter-spacing:-.03em;color:#0f172a;}
.lgr-logo-dot{color:#059669;}
.lgr-nav-links{display:flex;gap:28px;}
.lgr-nav-links a{font-size:14px;color:#475569;text-decoration:none;font-weight:500;transition:color .15s;}
.lgr-nav-links a:hover{color:#0f172a;}

/* buttons */
.lgr-btn{display:inline-flex;align-items:center;gap:7px;background:#059669;color:#fff;font-weight:600;font-size:15px;padding:12px 22px;border-radius:11px;text-decoration:none;box-shadow:0 6px 18px rgba(5,150,105,.22);transition:transform .15s,box-shadow .15s,background .15s;border:1px solid transparent;}
.lgr-btn:hover{background:#047857;transform:translateY(-1px);box-shadow:0 10px 26px rgba(5,150,105,.30);}
.lgr-btn-ico{flex-shrink:0;}
.lgr-btn-sm{padding:9px 16px;font-size:13.5px;border-radius:9px;}
.lgr-btn-lg{padding:15px 28px;font-size:16px;}
.lgr-btn-full{width:100%;justify-content:center;margin-top:6px;}
.lgr-btn-ghost{background:#fff;color:#0f172a;border:1px solid #cbd5e1;box-shadow:none;}
.lgr-btn-ghost:hover{background:#f8fafc;border-color:#94a3b8;box-shadow:0 4px 12px rgba(15,23,42,.05);}

main.lgr-wrap{position:relative;z-index:1;}

/* hero */
.lgr-hero{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;padding:72px 0 64px;}
.lgr-hero-copy{max-width:560px;}
.lgr-eyebrow{display:inline-flex;align-items:center;gap:9px;font-size:12.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#047857;background:rgba(5,150,105,.08);border:1px solid rgba(5,150,105,.18);padding:7px 14px;border-radius:999px;margin-bottom:22px;}
.lgr-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:#059669;box-shadow:0 0 0 3px rgba(5,150,105,.18);}
.lgr-h1{font-size:clamp(36px,4.6vw,58px);font-weight:800;line-height:1.06;letter-spacing:-.035em;margin-bottom:22px;color:#0f172a;}
.lgr-rot{display:inline-block;position:relative;}
.lgr-rot-word{display:inline-block;color:#059669;}
.lgr-rot-word::after{content:'';}
.lgr-sub{font-size:17.5px;line-height:1.62;color:#475569;margin-bottom:28px;}
.lgr-cta-row{display:flex;gap:12px;flex-wrap:wrap;}
.lgr-reassure{display:flex;align-items:center;gap:8px;font-size:13.5px;color:#64748b;margin-top:18px;}
.lgr-reassure-ico{color:#059669;flex-shrink:0;}
.lgr-reassure-center{justify-content:center;}

/* calculator */
.lgr-hero-calc{position:relative;}
.lgr-calc{position:relative;background:#fff;border:1px solid #e2e8f0;border-radius:22px;padding:26px;box-shadow:0 24px 60px rgba(15,23,42,.10),0 2px 6px rgba(15,23,42,.04);}
.lgr-calc::before{content:'';position:absolute;inset:0;border-radius:22px;padding:1px;background:linear-gradient(160deg,rgba(5,150,105,.35),transparent 40%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;}
.lgr-calc-head{display:flex;flex-direction:column;gap:6px;margin-bottom:18px;}
.lgr-calc-tag{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#047857;}
.lgr-live-dot{width:8px;height:8px;border-radius:50%;background:#10b981;box-shadow:0 0 0 0 rgba(16,185,129,.5);animation:lgrPulse 2s infinite;}
@keyframes lgrPulse{0%{box-shadow:0 0 0 0 rgba(16,185,129,.5);}70%{box-shadow:0 0 0 7px rgba(16,185,129,0);}100%{box-shadow:0 0 0 0 rgba(16,185,129,0);}}
.lgr-calc-sub{font-size:13.5px;color:#64748b;}

.lgr-calc-numbers{display:grid;grid-template-columns:1.3fr 1fr;gap:14px;margin-bottom:18px;}
.lgr-num{display:flex;flex-direction:column;gap:4px;padding:18px 18px;border-radius:14px;background:#f8fafc;border:1px solid #e2e8f0;}
.lgr-num-primary{background:linear-gradient(165deg,rgba(5,150,105,.10),rgba(5,150,105,.03));border-color:rgba(5,150,105,.22);}
.lgr-num-label{font-size:11.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#64748b;}
.lgr-num-val{font-size:38px;font-weight:800;letter-spacing:-.03em;color:#0f172a;font-variant-numeric:tabular-nums;line-height:1;}
.lgr-num-primary .lgr-num-val{color:#047857;}
.lgr-num-val-sm{font-size:32px;}
.lgr-num-unit{font-size:16px;font-weight:700;color:#64748b;margin-left:3px;}
.lgr-num-foot{display:inline-flex;align-items:center;gap:5px;font-size:13px;font-weight:700;color:#059669;margin-top:2px;}
.lgr-num-foot-muted{color:#94a3b8;font-weight:600;}
.lgr-up{color:#059669;}
.lgr-up-sm{color:#059669;width:11px;height:11px;}

/* projection bars */
.lgr-bars{display:flex;align-items:flex-end;gap:5px;height:62px;padding:0 2px;}
.lgr-bar{flex:1;background:linear-gradient(180deg,#10b981,#059669);border-radius:4px 4px 2px 2px;min-height:6px;opacity:.92;transition:height .5s cubic-bezier(.22,1,.36,1);}
.lgr-bar:last-child{background:linear-gradient(180deg,#34d399,#059669);box-shadow:0 0 0 1px rgba(5,150,105,.25);}
.lgr-bars-axis{display:flex;justify-content:space-between;font-size:10.5px;color:#94a3b8;margin-top:6px;margin-bottom:18px;font-family:var(--font-geist-mono),monospace;}

/* sliders */
.lgr-sliders{display:flex;flex-direction:column;gap:16px;margin-bottom:18px;}
.lgr-slider{display:flex;flex-direction:column;gap:9px;}
.lgr-slider-top{display:flex;justify-content:space-between;align-items:baseline;}
.lgr-slider-name{font-size:13.5px;font-weight:500;color:#475569;}
.lgr-slider-val{font-size:15px;font-weight:800;color:#0f172a;font-variant-numeric:tabular-nums;}
.lgr-slider input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:999px;background:linear-gradient(90deg,#059669 var(--pct,50%),#e2e8f0 var(--pct,50%));outline:none;cursor:pointer;}
.lgr-slider input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;border:2px solid #059669;box-shadow:0 2px 6px rgba(5,150,105,.35);cursor:pointer;transition:transform .12s;}
.lgr-slider input[type=range]::-webkit-slider-thumb:hover{transform:scale(1.12);}
.lgr-slider input[type=range]::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#fff;border:2px solid #059669;box-shadow:0 2px 6px rgba(5,150,105,.35);cursor:pointer;}
.lgr-slider input[type=range]::-moz-range-track{height:6px;border-radius:999px;background:#e2e8f0;}

.lgr-calc-note{font-size:11.5px;line-height:1.5;color:#94a3b8;margin-top:12px;}

/* trust / integrations */
.lgr-trust{padding:8px 0 56px;text-align:center;}
.lgr-trust-label{font-size:12.5px;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8;font-weight:600;margin-bottom:18px;}
.lgr-logos{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;}
.lgr-logo-chip{padding:8px 16px;border-radius:9px;background:#f8fafc;border:1px solid #e2e8f0;font-size:13.5px;font-weight:600;color:#475569;}

/* sections */
.lgr-section{padding:58px 0;border-top:1px solid #f1f5f9;}
.lgr-section-head{max-width:680px;margin:0 auto 44px;text-align:center;}
.lgr-kicker{font-size:12px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#059669;margin-bottom:12px;}
.lgr-h2{font-size:clamp(27px,3.4vw,40px);font-weight:800;letter-spacing:-.03em;line-height:1.12;color:#0f172a;}
.lgr-section-sub{font-size:16.5px;color:#64748b;margin-top:14px;line-height:1.6;}
.lgr-p{font-size:16px;line-height:1.7;color:#475569;margin-top:14px;}

/* cost-of-doing-nothing stats */
.lgr-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-bottom:44px;}
.lgr-stat{padding:30px 26px;border-radius:18px;background:#f8fafc;border:1px solid #e2e8f0;display:flex;flex-direction:column;gap:8px;position:relative;overflow:hidden;}
.lgr-stat::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#059669;}
.lgr-stat-mid::before{background:#0f172a;}
.lgr-stat-val{font-size:46px;font-weight:800;letter-spacing:-.035em;line-height:1;color:#0f172a;font-variant-numeric:tabular-nums;}
.lgr-stat-unit{font-size:20px;font-weight:700;color:#94a3b8;margin-left:4px;}
.lgr-stat-label{font-size:15px;font-weight:700;color:#0f172a;}
.lgr-stat-note{font-size:13.5px;color:#64748b;line-height:1.5;}

.lgr-problem-body{display:grid;grid-template-columns:1fr 1fr;gap:40px;max-width:980px;margin:0 auto;}
.lgr-problem-col .lgr-p:first-child{margin-top:0;}
.lgr-punch{font-size:19px;font-weight:700;color:#0f172a;margin-top:20px;line-height:1.5;}
.lgr-fix{display:flex;align-items:center;gap:12px;font-size:22px;font-weight:800;color:#047857;margin-top:12px;}
.lgr-fix-spark{width:64px;height:24px;color:#059669;flex-shrink:0;}

/* steps */
.lgr-steps{display:flex;flex-direction:column;gap:0;max-width:860px;margin:0 auto;}
.lgr-step{display:grid;grid-template-columns:auto 1fr;gap:26px;}
.lgr-step-rail{display:flex;flex-direction:column;align-items:center;}
.lgr-step-n{flex-shrink:0;width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;font-family:var(--font-geist-mono),monospace;color:#047857;background:rgba(5,150,105,.08);border:1px solid rgba(5,150,105,.22);}
.lgr-step-line{flex:1;width:2px;background:linear-gradient(180deg,rgba(5,150,105,.3),rgba(5,150,105,.05));margin:6px 0;}
.lgr-step-body{padding-bottom:34px;}
.lgr-step-title{font-size:22px;font-weight:800;letter-spacing:-.02em;color:#0f172a;}
.lgr-step-short{font-size:15px;font-weight:600;color:#059669;margin-top:5px;}
.lgr-step-text{font-size:15.5px;line-height:1.66;color:#475569;margin-top:11px;max-width:620px;}

/* agent ledger */
.lgr-ledger{max-width:820px;margin:0 auto;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 12px 40px rgba(15,23,42,.06);}
.lgr-ledger-head{display:flex;align-items:center;justify-content:space-between;padding:16px 22px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#64748b;}
.lgr-ledger-total{display:inline-flex;align-items:center;gap:6px;color:#047857;letter-spacing:.02em;}
.lgr-ledger-row{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:16px;padding:18px 22px;border-bottom:1px solid #f1f5f9;transition:background .15s;}
.lgr-ledger-row:last-child{border-bottom:none;}
.lgr-ledger-row:hover{background:#f8fafc;}
.lgr-ledger-ico{font-size:20px;line-height:1;}
.lgr-ledger-text{font-size:15px;line-height:1.5;color:#334155;}
.lgr-ledger-amt{display:inline-flex;align-items:center;gap:4px;font-size:15px;font-weight:800;color:#047857;font-variant-numeric:tabular-nums;background:rgba(5,150,105,.08);padding:6px 12px;border-radius:999px;white-space:nowrap;}

/* pricing */
.lgr-plans{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;align-items:start;}
.lgr-plan{position:relative;display:flex;flex-direction:column;gap:13px;padding:26px 22px;border-radius:18px;background:#fff;border:1px solid #e2e8f0;box-shadow:0 4px 16px rgba(15,23,42,.04);}
.lgr-plan-pop{border:1.5px solid #059669;box-shadow:0 16px 44px rgba(5,150,105,.16);transform:translateY(-6px);}
.lgr-plan-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#059669;color:#fff;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;padding:5px 14px;border-radius:999px;white-space:nowrap;box-shadow:0 4px 12px rgba(5,150,105,.3);}
.lgr-plan-name{font-size:12.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#059669;}
.lgr-plan-price{font-size:34px;font-weight:800;letter-spacing:-.03em;color:#0f172a;line-height:1;}
.lgr-plan-cad{font-size:13px;font-weight:600;color:#94a3b8;margin-left:4px;letter-spacing:-.01em;}
.lgr-plan-tag{font-size:14px;color:#475569;line-height:1.45;}
.lgr-plan-feats{list-style:none;display:flex;flex-direction:column;gap:9px;flex:1;padding:6px 0;border-top:1px solid #f1f5f9;margin-top:2px;}
.lgr-plan-feats li{display:flex;gap:9px;font-size:13.5px;line-height:1.45;color:#475569;}
.lgr-plan-check{color:#059669;flex-shrink:0;margin-top:2px;}
.lgr-plan-best{font-size:12.5px;line-height:1.5;color:#94a3b8;font-style:italic;}
.lgr-plan-cta{justify-content:center;}

/* about */
.lgr-about{display:grid;grid-template-columns:220px 1fr;gap:44px;align-items:start;max-width:920px;margin:0 auto;}
.lgr-about-photo{position:relative;width:220px;height:260px;border-radius:20px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 14px 40px rgba(15,23,42,.12);background:#f1f5f9;}
.lgr-about-img{object-fit:cover;object-position:center 25%;}
.lgr-about-copy .lgr-kicker{text-align:left;}
.lgr-about-copy .lgr-h2{text-align:left;}
.lgr-about-kicker{font-size:18px;font-weight:700;color:#0f172a;margin-top:20px;line-height:1.45;}
.lgr-hand{font-family:var(--font-caveat),cursive;font-size:30px;margin-top:10px;color:#047857;}

/* final cta */
.lgr-final{text-align:center;max-width:640px;margin:0 auto;padding:72px 0 60px;border-top:1px solid #f1f5f9;}
.lgr-final-title{font-size:clamp(30px,4.4vw,50px);font-weight:800;letter-spacing:-.03em;line-height:1.08;color:#0f172a;}
.lgr-final-sub{font-size:17.5px;color:#475569;margin:16px auto 28px;max-width:500px;line-height:1.6;}

/* footer */
.lgr-footer{display:flex;flex-direction:column;align-items:center;gap:12px;padding:40px 0 56px;border-top:1px solid #f1f5f9;text-align:center;}
.lgr-logo-foot{font-size:18px;}
.lgr-footer-links{display:flex;align-items:center;gap:12px;font-size:14px;}
.lgr-footer-links a{color:#475569;text-decoration:none;font-weight:500;}
.lgr-footer-links a:hover{color:#059669;}
.lgr-foot-sep{color:#cbd5e1;}
.lgr-footer-copy{font-size:12.5px;color:#94a3b8;}

/* responsive */
@media(max-width:980px){
  .lgr-hero{grid-template-columns:1fr;gap:40px;padding:52px 0 48px;}
  .lgr-hero-copy{max-width:640px;}
  .lgr-stats{grid-template-columns:1fr;}
  .lgr-problem-body{grid-template-columns:1fr;gap:8px;}
  .lgr-plans{grid-template-columns:1fr 1fr;}
  .lgr-plan-pop{transform:none;}
  .lgr-about{grid-template-columns:1fr;justify-items:center;text-align:center;gap:28px;}
  .lgr-about-copy .lgr-kicker,.lgr-about-copy .lgr-h2{text-align:center;}
  .lgr-nav-links{display:none;}
}
@media(max-width:560px){
  .lgr-plans{grid-template-columns:1fr;}
  .lgr-cta-row{flex-direction:column;}
  .lgr-cta-row .lgr-btn-lg{width:100%;justify-content:center;}
  .lgr-calc{padding:20px;}
  .lgr-calc-numbers{grid-template-columns:1fr;}
  .lgr-num-val{font-size:34px;}
  .lgr-stat-val{font-size:38px;}
}
`;
