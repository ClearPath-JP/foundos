'use client';

import React, { useState, useEffect } from 'react';
import { CAL, EMAIL, brand, trust, pricing } from '../explore/content';

/* /studios — industry funnel page (dance / yoga / fitness studios).
   Same "velvet" brand as the homepage (near-black + violet + gold), but every
   word is tailored to a studio owner: the money leaks, the full system/process
   (ManyChat, one dashboard, the academy partnership, retention, local ads,
   custom builds), the ROI math, and the partnership. Self-contained + pure-CSS
   reveals so nothing can render invisible. */

const S = {
  eyebrow: 'Built for studios',
  h1a: 'Fill every class. Keep every member.',
  h1b: 'Earn while you sleep.',
  sub: 'I build dance, yoga, and fitness studios one system that captures every lead the second they DM you, runs your booking, wins back members before they quit — and turns your classes into an online academy that earns around the clock.',
  whoFor: ['Dance', 'Yoga', 'Pilates', 'Fitness', 'Martial arts', 'Barre'],
  ctaPrimary: 'Book a 20-min call',
  ctaSecondary: 'See how it works',
  reassure: "No pitch. No commitment. I'll tell you honestly if it's a fit.",
};

const leaks = [
  {
    title: 'Your DMs are the front desk — and they’re losing',
    body: 'New students find you on Instagram and message “how do I start?” If the reply comes hours later, mid-class, half are already gone. A membership isn’t $150 — it’s $1,800+ in lifetime value walking away.',
  },
  {
    title: 'Empty spots you never get back',
    body: 'Booking is manual, so people wait, forget, or flake. Every class that runs half-full is revenue you can’t recover — the room only pays when it’s full.',
  },
  {
    title: 'Members drift away in silence',
    body: 'A regular quietly stops coming for three weeks. No flag, no win-back, no “we miss you” — just churn steadily bleeding the recurring revenue your studio runs on.',
  },
  {
    title: 'Your teaching is trapped in the room',
    body: 'Everything you know only earns money when bodies are physically present. No on-demand library means a whole second income stream left on the table.',
  },
];

type Showcase = { tag: string; title: string; body: string; mock: 'chat' | 'dash' | 'academy' };
const showcases: Showcase[] = [
  {
    tag: 'ManyChat',
    title: 'Every lead captured — the second they DM you',
    body: 'The moment someone messages you on Instagram, ManyChat replies instantly, 24/7 — answers their questions, sends your schedule and pricing, and drops a booking link right in the chat. No lead ever goes cold again.',
    mock: 'chat',
  },
  {
    tag: 'Mindbody · Vagaro · Square',
    title: 'Your whole studio on one screen',
    body: 'Keep the tools you love — I connect your scheduling, payments, and email into a single dashboard. Sign-ups, revenue, attendance, and who’s about to churn, all in one place instead of five logins.',
    mock: 'dash',
  },
  {
    tag: 'On your site · you own it',
    title: 'Your classes, sold on-demand — while you sleep',
    body: 'We build your online academy right on your website. You film and structure your classes following a proven layout I give you; I build the whole thing. You earn beyond the room, reach students anywhere, and own all of it.',
    mock: 'academy',
  },
];

const more = [
  { title: 'Booking on autopilot', body: '24/7 self-serve booking synced to your calendar, with reminders that cut no-shows.' },
  { title: 'Keep every member', body: 'Automatic win-backs, welcomes, and package nudges — retention handled for you.' },
  { title: 'Fill the room', body: 'Google review requests plus local Instagram & Google ads targeting dancers near you.' },
  { title: 'Anything custom', body: 'Need a system nobody else has? I custom build it around how you actually run.' },
];

const math = [
  { lever: 'Win-backs', move: 'Recover 5 drifting members × $150', impact: '+$750/mo' },
  { lever: 'Instant DM capture', move: 'A couple more intros convert to members', impact: '+$300/mo, compounding' },
  { lever: 'Online academy', move: '40 students × $99 launch, then a $19/mo tier', impact: '+$4k once, then recurring' },
];

const ICON = {
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
};
const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const Reveal = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <div className={className ? `stu-rev ${className}` : 'stu-rev'} style={delay ? { animationDelay: `${delay}s` } : undefined}>
    {children}
  </div>
);

// Hand-built branded UI mockups — the "product shots" that give the premium,
// mamboguild-style editorial feel (a visual beside every headline claim).
const MockBar = ({ label }: { label: string }) => (
  <div className="stu-mock-bar">
    <span className="stu-mock-dot" /><span className="stu-mock-dot" /><span className="stu-mock-dot" />
    <span className="stu-mock-label">{label}</span>
  </div>
);

const Mock = ({ type }: { type: 'chat' | 'dash' | 'academy' }) => {
  if (type === 'chat') {
    return (
      <div className="stu-mock stu-mock-chat">
        <MockBar label="Instagram · DMs" />
        <div className="stu-chat">
          <div className="stu-msg stu-msg-in">Hey! How do I start salsa classes?</div>
          <div className="stu-msg stu-msg-out">Welcome! Here’s this week’s schedule and our intro offer 👇</div>
          <div className="stu-msg stu-msg-out stu-msg-card">
            <span className="stu-msg-card-t">Intro class · beginner-friendly</span>
            <span className="stu-msg-btn">Book my spot →</span>
          </div>
          <div className="stu-chat-tag">⚡ Auto-replied in 3 seconds</div>
        </div>
      </div>
    );
  }
  if (type === 'dash') {
    return (
      <div className="stu-mock stu-mock-dash">
        <MockBar label="Your dashboard" />
        <div className="stu-dash">
          <div className="stu-dash-stats">
            <div className="stu-stat"><span className="stu-stat-n">24</span><span className="stu-stat-l">New leads</span></div>
            <div className="stu-stat"><span className="stu-stat-n">312</span><span className="stu-stat-l">Members</span></div>
            <div className="stu-stat"><span className="stu-stat-n stu-stat-g">$18.4k</span><span className="stu-stat-l">This month</span></div>
            <div className="stu-stat stu-stat-alert"><span className="stu-stat-n">5</span><span className="stu-stat-l">At-risk</span></div>
          </div>
          <div className="stu-dash-chart">
            {[46, 62, 54, 78, 70, 92, 84].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="stu-mock stu-mock-academy">
      <MockBar label="yourstudio.com / academy" />
      <div className="stu-academy">
        <div className="stu-lesson"><span className="stu-lesson-play">▶</span><span className="stu-lesson-t">Level 1 · Foundations</span><span className="stu-lesson-done">✓</span></div>
        <div className="stu-lesson"><span className="stu-lesson-play">▶</span><span className="stu-lesson-t">Level 2 · Partnerwork</span><span className="stu-lesson-done">✓</span></div>
        <div className="stu-lesson stu-lesson-active"><span className="stu-lesson-play">▶</span><span className="stu-lesson-t">Level 3 · Styling &amp; musicality</span><span className="stu-lesson-prog">62%</span></div>
        <div className="stu-lesson stu-lesson-lock"><span className="stu-lesson-play">◆</span><span className="stu-lesson-t">Level 4 · Performance</span></div>
        <div className="stu-academy-tag">Earning while you sleep · you own it</div>
      </div>
    </div>
  );
};

/* ---- Coded animated explainer (the "video"): auto-advancing branded scenes ---- */
const VIDEO_SCENES: { kind: string; d: number }[] = [
  { kind: 'hook', d: 3600 },
  { kind: 'leaks', d: 5400 },
  { kind: 'turn', d: 3200 },
  { kind: 'chat', d: 5000 },
  { kind: 'dash', d: 4600 },
  { kind: 'academy', d: 4800 },
  { kind: 'money', d: 5200 },
  { kind: 'close', d: 6500 },
];

const VideoScene = ({ kind }: { kind: string }) => {
  if (kind === 'hook') return (
    <div className="stu-vs stu-vs-center">
      <p className="stu-vs-eyebrow">For studio owners</p>
      <h3 className="stu-vs-big">You didn’t open your studio<br />to live in your <span className="stu-grad">DMs</span>.</h3>
    </div>
  );
  if (kind === 'leaks') return (
    <div className="stu-vs">
      <p className="stu-vs-kick">Right now, money’s leaking out</p>
      <ul className="stu-vs-leaks">
        <li>Missed DMs → lost members</li>
        <li>Empty class spots you never get back</li>
        <li>Members drifting away in silence</li>
        <li>Your teaching stuck in the room</li>
      </ul>
    </div>
  );
  if (kind === 'turn') return (
    <div className="stu-vs stu-vs-center">
      <h3 className="stu-vs-big">So I build you <span className="stu-grad">one system</span><br />that runs it all.</h3>
    </div>
  );
  if (kind === 'chat') return (
    <div className="stu-vs stu-vs-split">
      <div className="stu-vs-copy"><span className="stu-step-tag">ManyChat</span><h3 className="stu-vs-mid">Every lead captured — the second they DM you.</h3><p className="stu-vs-sub">Answered, and booked. 24/7.</p></div>
      <div className="stu-vs-visual"><Mock type="chat" /></div>
    </div>
  );
  if (kind === 'dash') return (
    <div className="stu-vs stu-vs-split">
      <div className="stu-vs-copy"><span className="stu-step-tag">One dashboard</span><h3 className="stu-vs-mid">Your whole studio on one screen.</h3><p className="stu-vs-sub">Every tool you use, finally connected.</p></div>
      <div className="stu-vs-visual"><Mock type="dash" /></div>
    </div>
  );
  if (kind === 'academy') return (
    <div className="stu-vs stu-vs-split">
      <div className="stu-vs-copy"><span className="stu-step-tag">Your academy</span><h3 className="stu-vs-mid">Your classes, sold on-demand.</h3><p className="stu-vs-sub">You earn — while you sleep.</p></div>
      <div className="stu-vs-visual"><Mock type="academy" /></div>
    </div>
  );
  if (kind === 'money') return (
    <div className="stu-vs stu-vs-center">
      <p className="stu-vs-kick">The math on a studio like yours</p>
      <div className="stu-vs-money">
        <span className="stu-vs-chip">+$750/mo win-backs</span>
        <span className="stu-vs-chip">2 more intros a month</span>
        <span className="stu-vs-chip">a new online income stream</span>
      </div>
      <p className="stu-vs-total">~<span className="stu-grad">$4,000+</span> / month recovered</p>
    </div>
  );
  return (
    <div className="stu-vs stu-vs-center">
      <h3 className="stu-vs-big">Your studio <span className="stu-grad">runs itself.</span></h3>
      <p className="stu-vs-sub">Let’s build it — the first call’s free.</p>
      <a href={CAL} className="stu-btn stu-btn-lg stu-vs-cta">Book a free call →</a>
    </div>
  );
};

const StudioVideo = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) { setI(0); setPlaying(true); setDone(false); }
  }, [open]);

  useEffect(() => {
    if (!open || !playing || done) return;
    const t = setTimeout(() => {
      setI((p) => {
        if (p + 1 >= VIDEO_SCENES.length) { setDone(true); return p; }
        return p + 1;
      });
    }, VIDEO_SCENES[i].d);
    return () => clearTimeout(t);
  }, [open, playing, done, i]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="stu-vid-overlay" onClick={onClose}>
      <div className="stu-vid" onClick={(e) => e.stopPropagation()}>
        <div className="stu-vid-progress">
          {VIDEO_SCENES.map((s, k) => (
            <span key={k} className="stu-vid-seg">
              {(k < i || done) ? <i className="stu-vid-fill stu-vid-fill-full" />
                : k === i ? <i className="stu-vid-fill" style={{ animationDuration: `${s.d}ms`, animationPlayState: playing ? 'running' : 'paused' }} />
                  : null}
            </span>
          ))}
        </div>
        <button className="stu-vid-close" onClick={onClose} aria-label="Close video">✕</button>

        <div className="stu-vid-stage" key={done ? 'end' : i}>
          {done ? (
            <div className="stu-vs stu-vs-center">
              <p className="stu-vs-kick">That’s the whole system</p>
              <h3 className="stu-vs-big">Ready to fill <span className="stu-grad">your studio?</span></h3>
              <a href={CAL} className="stu-btn stu-btn-lg stu-vs-cta">Book a free call →</a>
              <button className="stu-vid-replay" onClick={() => { setI(0); setDone(false); setPlaying(true); }}>↺ Replay</button>
            </div>
          ) : <VideoScene kind={VIDEO_SCENES[i].kind} />}
        </div>

        {!done && (
          <button className="stu-vid-playpause" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? '❚❚' : '▶'}
          </button>
        )}
      </div>
    </div>
  );
};

export default function Studios() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="stu-root">
      <style>{CSS}</style>

      <div aria-hidden className="stu-bg">
        <span className="stu-glow stu-glow-v" />
        <span className="stu-glow stu-glow-g" />
        <div className="stu-grid" />
        <div className="stu-vignette" />
      </div>
      <div aria-hidden className="stu-grain" />

      {/* nav */}
      <nav className="stu-nav">
        <div className="stu-wrap stu-nav-inner">
          <a href="/" className="stu-logo">
            <span className="stu-logo-mark" />
            {brand.name}<span className="stu-logo-dot">{brand.tld}</span>
          </a>
          <div className="stu-nav-links">
            <a href="#leaks">Why</a>
            <a href="#system">System</a>
            <a href="#academy">Academy</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="stu-nav-right">
            <a href={CAL} className="stu-btn stu-btn-sm">Book a call</a>
            <button className="stu-nav-toggle" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu" aria-expanded={menuOpen}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="stu-mobile-menu">
            <a href="#leaks" onClick={() => setMenuOpen(false)}>Why</a>
            <a href="#system" onClick={() => setMenuOpen(false)}>System</a>
            <a href="#academy" onClick={() => setMenuOpen(false)}>Academy</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href={CAL} className="stu-btn stu-btn-sm stu-mobile-cta" onClick={() => setMenuOpen(false)}>Book a call</a>
          </div>
        )}
      </nav>

      <main>
        {/* hero */}
        <section className="stu-hero stu-wrap">
          <a href="/" className="stu-eyebrow stu-rise">← <span className="stu-eyebrow-dot" />{S.eyebrow}</a>
          <h1 className="stu-h1 stu-rise" style={{ animationDelay: '.06s' }}>
            {S.h1a}<br /><span className="stu-grad">{S.h1b}</span>
          </h1>
          <p className="stu-sub stu-rise" style={{ animationDelay: '.14s' }}>{S.sub}</p>
          <div className="stu-cta-row stu-rise" style={{ animationDelay: '.2s' }}>
            <a href={CAL} className="stu-btn stu-btn-lg">{S.ctaPrimary} →</a>
            <button type="button" onClick={() => setVideoOpen(true)} className="stu-btn stu-btn-ghost stu-btn-lg stu-vid-trigger"><span className="stu-vid-tri-play">▶</span> Watch it work · 40s</button>
          </div>
          <p className="stu-reassure stu-rise" style={{ animationDelay: '.26s' }}>{S.reassure}</p>
          <div className="stu-whofor stu-rise" style={{ animationDelay: '.32s' }}>
            {S.whoFor.map((w, i) => (
              <React.Fragment key={w}>
                {i > 0 && <span className="stu-whofor-sep" />}
                <span className="stu-whofor-item">{w}</span>
              </React.Fragment>
            ))}
          </div>
        </section>

        <div className="stu-wrap">
          {/* the leaks */}
          <section id="leaks" className="stu-section">
            <Reveal className="stu-section-head">
              <p className="stu-kicker">Where your studio loses money</p>
              <h2 className="stu-h2">Four leaks quietly draining a studio like yours</h2>
            </Reveal>
            <div className="stu-leaks">
              {leaks.map((l, i) => (
                <Reveal key={l.title} delay={(i % 2) * 0.06} className="stu-panel stu-leak">
                  <span className="stu-leak-n">0{i + 1}</span>
                  <h3 className="stu-leak-title">{l.title}</h3>
                  <p className="stu-leak-body">{l.body}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* the system — premium alternating showcases (mamboguild format) */}
          <section id="system" className="stu-section">
            <Reveal className="stu-section-head">
              <p className="stu-kicker">The whole process</p>
              <h2 className="stu-h2">How I turn your studio into a machine that runs itself</h2>
              <p className="stu-p stu-section-sub">The pieces that move the needle — built, connected, and run for you.</p>
            </Reveal>
            <div className="stu-showcases">
              {showcases.map((s, i) => (
                <Reveal key={s.title} className={i % 2 ? 'stu-show stu-show-alt' : 'stu-show'}>
                  <div className="stu-show-copy">
                    <span className="stu-step-tag">{s.tag}</span>
                    <h3 className="stu-show-title">{s.title}</h3>
                    <p className="stu-show-body">{s.body}</p>
                  </div>
                  <div className="stu-show-visual"><Mock type={s.mock} /></div>
                </Reveal>
              ))}
            </div>
            <div className="stu-more">
              {more.map((m, i) => (
                <Reveal key={m.title} delay={(i % 4) * 0.04} className="stu-panel stu-more-item">
                  <h4 className="stu-more-title">{m.title}</h4>
                  <p className="stu-more-body">{m.body}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* partnership — the academy */}
          <section id="academy" className="stu-section">
            <Reveal className="stu-panel stu-partner">
              <p className="stu-kicker">How we build your academy — together</p>
              <h2 className="stu-h2">Your expertise. My blueprint. One academy you own.</h2>
              <p className="stu-p stu-partner-lead">The online academy is the piece no one else offers — and it’s a partnership. You know your art; I know how to package it so it sells and I do the building.</p>
              <div className="stu-partner-split">
                <div className="stu-partner-col">
                  <span className="stu-partner-tag stu-tag-you">You bring</span>
                  <ul className="stu-partner-list">
                    <li><span className="stu-dot" />Your classes, your style, your levels</li>
                    <li><span className="stu-dot" />Filmed your way, on your schedule</li>
                    <li><span className="stu-dot" />The teaching only you can give</li>
                  </ul>
                </div>
                <div className="stu-partner-col">
                  <span className="stu-partner-tag stu-tag-me">I bring</span>
                  <ul className="stu-partner-list">
                    <li><span className="stu-dot stu-dot-g" />A proven course structure that sells</li>
                    <li><span className="stu-dot stu-dot-g" />The full build — on your own website</li>
                    <li><span className="stu-dot stu-dot-g" />You own all of it — no platform cut</li>
                  </ul>
                </div>
              </div>
              <p className="stu-partner-foot">You earn beyond the four walls — students anywhere, income while you sleep.</p>
            </Reveal>
          </section>

          {/* the math */}
          <section className="stu-section">
            <Reveal className="stu-section-head">
              <p className="stu-kicker">Show me the money</p>
              <h2 className="stu-h2">The math on a studio like yours</h2>
              <p className="stu-p stu-section-sub">Illustrative, but this is the shape of it — the system pays for itself many times over.</p>
            </Reveal>
            <Reveal className="stu-panel stu-math">
              <div className="stu-math-head">
                <span>Lever</span><span>The move</span><span>Monthly impact</span>
              </div>
              {math.map((m) => (
                <div key={m.lever} className="stu-math-row">
                  <span className="stu-math-lever">{m.lever}</span>
                  <span className="stu-math-move">{m.move}</span>
                  <span className="stu-math-impact">{m.impact}</span>
                </div>
              ))}
              <div className="stu-math-total">
                <span>Put together</span>
                <span className="stu-math-total-num">~$4,000+/mo recovered <em>+ a brand-new online income stream</em></span>
              </div>
            </Reveal>
          </section>

          {/* pricing */}
          <section id="pricing" className="stu-section">
            <Reveal className="stu-section-head">
              <p className="stu-kicker">{pricing.eyebrow}</p>
              <h2 className="stu-h2">Simple pricing. Everything built and run for you.</h2>
            </Reveal>
            <Reveal className="stu-price">
              <div className="stu-price-glow" aria-hidden />
              <div className="stu-price-head">
                <p className="stu-price-anchor">{pricing.anchor}</p>
                <p className="stu-price-anchor-sub">{pricing.anchorSub}</p>
              </div>
              <p className="stu-price-body">{pricing.body}</p>
              <ul className="stu-price-points">
                {pricing.points.map((pt) => (
                  <li key={pt}><span className="stu-price-check"><Check /></span>{pt}</li>
                ))}
              </ul>
              <a href={CAL} className="stu-btn stu-btn-lg stu-price-cta">{pricing.cta} →</a>
              <p className="stu-price-reassure">{pricing.reassure}</p>
            </Reveal>
          </section>

          {/* founding-client trust */}
          <section className="stu-section">
            <Reveal className="stu-section-head">
              <p className="stu-kicker">{trust.eyebrow}</p>
              <h2 className="stu-h2">{trust.title}</h2>
              <span className="stu-scarcity"><span className="stu-scarcity-dot" />{trust.scarcity}</span>
              <p className="stu-p stu-section-sub">{trust.sub}</p>
            </Reveal>
            <div className="stu-promises">
              {trust.promises.map((pr, i) => (
                <Reveal key={pr.title} delay={i * 0.05} className="stu-panel stu-promise">
                  <span className="stu-promise-check"><Check /></span>
                  <h3 className="stu-promise-title">{pr.title}</h3>
                  <p className="stu-promise-body">{pr.body}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* close */}
          <section className="stu-section stu-final">
            <Reveal>
              <p className="stu-vision">The studios still doing it all by hand get left behind. The ones who systemize fill up — and grow past the room.</p>
              <h2 className="stu-final-title">Ready to fill your studio — and earn beyond it?</h2>
              <p className="stu-final-sub">A 20-minute call. I’ll tell you exactly what I’d build first for your studio — no pitch.</p>
              <a href={CAL} className="stu-btn stu-btn-lg">Book your free 20-min call →</a>
              <p className="stu-reassure">No pitch. No obligation. If I can’t help, I’ll tell you.</p>
            </Reveal>
          </section>
        </div>{/* /wrap */}

        <footer className="stu-footer">
          <div className="stu-wrap stu-footer-inner">
            <div className="stu-footer-brand">
              <a href="/" className="stu-logo stu-logo-foot">
                <span className="stu-logo-mark" />{brand.name}<span className="stu-logo-dot">{brand.tld}</span>
              </a>
              <p className="stu-footer-tag">The done-for-you operating system for studios.</p>
            </div>
            <div className="stu-footer-links">
              <a href="/">Home</a>
              <a href="#system">System</a>
              <a href="#pricing">Pricing</a>
              <a href="/privacy">Privacy</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <a href={CAL} className="stu-btn stu-btn-sm">Book a call</a>
            </div>
          </div>
          <div className="stu-wrap stu-footer-bottom">
            <span>© 2026 {brand.full}</span>
            <span>Built by Josh.</span>
          </div>
        </footer>
      </main>

      <StudioVideo open={videoOpen} onClose={() => setVideoOpen(false)} />
    </div>
  );
}

const CSS = `
.stu-root{
  --body:#0a0812;--ink:#f6f4fc;--tx:#c3bede;--dim:#8b85a8;
  --line:rgba(180,160,255,.12);
  --v1:#8b5cf6;--v2:#a855f7;--vhi:#c4b5fd;
  --gold:#f3b64b;--gold2:#ffd685;
  --panel1:rgba(150,130,255,.055);--panel2:rgba(150,130,255,.015);
  position:relative;min-height:100vh;background:var(--body);color:var(--tx);
  font-family:var(--font-inter),system-ui,sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;
}
.stu-wrap{max-width:1120px;margin:0 auto;padding:0 22px;}
.stu-grad{background:linear-gradient(96deg,#b98bff 0%,#a855f7 34%,#f3b64b 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 30px rgba(168,85,247,.28));}

/* background */
.stu-bg{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(130% 90% at 50% -10%,#160f2b 0%,#0c091a 46%,#0a0812 100%);overflow:hidden;}
.stu-glow{position:absolute;border-radius:50%;filter:blur(120px);}
.stu-glow-v{width:60vw;height:60vw;left:-14vw;top:-22vw;background:radial-gradient(circle,rgba(139,92,246,.42),transparent 62%);}
.stu-glow-g{width:46vw;height:46vw;right:-14vw;top:16vw;background:radial-gradient(circle,rgba(243,182,75,.15),transparent 66%);}
.stu-grid{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);background-size:34px 34px;-webkit-mask-image:radial-gradient(110% 70% at 50% 0%,#000 26%,transparent 72%);mask-image:radial-gradient(110% 70% at 50% 0%,#000 26%,transparent 72%);}
.stu-vignette{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,8,18,0) 60%,rgba(10,8,18,.85) 100%);}
.stu-grain{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.05;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}

main{position:relative;z-index:2;}

/* nav */
.stu-nav{position:sticky;top:0;z-index:40;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);background:rgba(10,8,18,.6);border-bottom:1px solid var(--line);}
.stu-nav-inner{display:flex;align-items:center;justify-content:space-between;height:64px;}
.stu-logo{display:inline-flex;align-items:center;gap:9px;font-family:var(--font-display),var(--font-inter),sans-serif;font-weight:800;font-size:20px;letter-spacing:-.03em;color:var(--ink);text-decoration:none;}
.stu-logo-mark{width:17px;height:17px;border-radius:6px;background:linear-gradient(135deg,#a855f7,#f3b64b);box-shadow:0 0 16px rgba(168,85,247,.55);}
.stu-logo-dot{background:linear-gradient(90deg,#a855f7,#f3b64b);-webkit-background-clip:text;background-clip:text;color:transparent;}
.stu-nav-links{display:flex;gap:28px;}
.stu-nav-links a{font-size:14px;color:var(--dim);text-decoration:none;font-weight:500;transition:color .15s;}
.stu-nav-links a:hover{color:var(--ink);}
.stu-nav-right{display:flex;align-items:center;gap:10px;}
.stu-nav-toggle{display:none;align-items:center;justify-content:center;width:44px;height:44px;border-radius:11px;background:rgba(150,130,255,.06);border:1px solid var(--line);color:var(--tx);cursor:pointer;}
.stu-nav-toggle svg{width:22px;height:22px;}
.stu-mobile-menu{display:flex;flex-direction:column;gap:2px;padding:8px 18px 18px;background:rgba(10,8,18,.97);backdrop-filter:blur(16px);border-bottom:1px solid var(--line);}
.stu-mobile-menu a{padding:14px 8px;font-size:16px;font-weight:600;color:var(--ink);text-decoration:none;border-radius:8px;}
.stu-mobile-cta{justify-content:center;margin-top:8px;color:#fff;}

/* buttons */
.stu-btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:linear-gradient(180deg,#9061f9,#6d28d9);color:#fff;font-weight:600;font-size:15px;padding:13px 24px;border-radius:12px;text-decoration:none;border:1px solid rgba(196,168,255,.3);box-shadow:0 10px 30px rgba(109,40,217,.42),0 0 40px rgba(139,92,246,.22);transition:transform .15s,box-shadow .15s;cursor:pointer;}
.stu-btn:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(109,40,217,.54),0 0 60px rgba(139,92,246,.34);}
.stu-btn-sm{padding:0 18px;min-height:42px;font-size:13.5px;border-radius:10px;}
.stu-btn-lg{padding:16px 30px;font-size:16px;}
.stu-btn-ghost{background:rgba(150,130,255,.06);color:#ece7fb;border:1px solid rgba(190,168,255,.24);box-shadow:none;backdrop-filter:blur(6px);}
.stu-btn-ghost:hover{border-color:rgba(243,182,75,.5);background:rgba(150,130,255,.1);box-shadow:0 0 24px rgba(243,182,75,.14);}

/* hero */
.stu-hero{position:relative;z-index:2;text-align:center;padding:70px 22px 26px;max-width:900px;margin:0 auto;}
.stu-eyebrow{display:inline-flex;align-items:center;gap:9px;font-family:var(--font-geist-mono),monospace;font-size:12px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--gold2);padding:7px 15px;border:1px solid rgba(243,182,75,.24);border-radius:999px;background:rgba(243,182,75,.06);margin-bottom:26px;text-decoration:none;}
.stu-eyebrow:hover{border-color:rgba(243,182,75,.5);}
.stu-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:var(--gold);box-shadow:0 0 10px var(--gold);}
.stu-h1{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:clamp(36px,6.2vw,72px);font-weight:800;line-height:1.04;letter-spacing:-.035em;margin-bottom:22px;color:#fff;text-shadow:0 2px 50px rgba(0,0,0,.4);}
.stu-sub{font-size:18px;line-height:1.62;color:#d3cfe6;max-width:680px;margin:0 auto 30px;}
.stu-cta-row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
.stu-reassure{font-size:13.5px;color:var(--dim);margin-top:18px;}
.stu-whofor{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px 4px;margin-top:36px;padding-top:26px;border-top:1px solid var(--line);max-width:640px;margin-left:auto;margin-right:auto;}
.stu-whofor-item{font-family:var(--font-geist-mono),monospace;font-size:12.5px;letter-spacing:.03em;color:var(--tx);}
.stu-whofor-sep{width:4px;height:4px;border-radius:50%;background:var(--v1);opacity:.55;margin:0 8px;}
.stu-rise{opacity:0;animation:stuRise .62s cubic-bezier(.22,1,.36,1) both;}
@keyframes stuRise{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
.stu-rev{animation:stuRise .6s cubic-bezier(.22,1,.36,1) both;}

/* sections */
.stu-section{padding:52px 0;}
.stu-section-head{text-align:center;max-width:760px;margin:0 auto 38px;}
.stu-section-sub{margin-left:auto;margin-right:auto;}
.stu-kicker{font-family:var(--font-geist-mono),monospace;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:13px;}
.stu-h2{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:clamp(26px,3.9vw,42px);font-weight:800;letter-spacing:-.03em;line-height:1.13;color:var(--ink);}
.stu-p{font-size:16px;line-height:1.72;color:var(--tx);margin-top:14px;}
.stu-panel{background:linear-gradient(180deg,var(--panel1),var(--panel2));border:1px solid var(--line);border-radius:20px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}

/* leaks */
.stu-leaks{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
.stu-leak{padding:30px 32px;transition:border-color .2s,transform .2s;}
.stu-leak:hover{border-color:rgba(243,182,75,.3);transform:translateY(-3px);}
.stu-leak-n{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:22px;font-weight:800;color:var(--gold);}
.stu-leak-title{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:20px;font-weight:800;letter-spacing:-.02em;margin-top:8px;color:var(--ink);line-height:1.2;}
.stu-leak-body{font-size:15px;line-height:1.65;color:var(--dim);margin-top:11px;}

/* premium alternating showcases (mamboguild editorial format) */
.stu-step-tag{display:inline-block;font-family:var(--font-geist-mono),monospace;font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--gold2);background:rgba(243,182,75,.09);border:1px solid rgba(243,182,75,.2);padding:5px 11px;border-radius:999px;}
.stu-showcases{display:flex;flex-direction:column;gap:36px;max-width:1000px;margin:0 auto;}
.stu-show{display:grid;grid-template-columns:1fr 1fr;gap:46px;align-items:center;}
.stu-show-alt .stu-show-copy{order:2;}
.stu-show-copy{display:flex;flex-direction:column;align-items:flex-start;}
.stu-show-title{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:clamp(21px,2.5vw,28px);font-weight:800;letter-spacing:-.02em;line-height:1.16;color:var(--ink);margin-top:14px;}
.stu-show-body{font-size:15.5px;line-height:1.7;color:var(--tx);margin-top:12px;}
.stu-show-visual{display:flex;justify-content:center;}

/* mockup frame */
.stu-mock{width:100%;max-width:400px;border-radius:16px;overflow:hidden;background:#0f0c1b;border:1px solid rgba(168,85,247,.18);box-shadow:0 24px 60px rgba(0,0,0,.5),0 0 0 1px rgba(139,92,246,.08),0 0 60px rgba(139,92,246,.12);}
.stu-mock-bar{display:flex;align-items:center;gap:6px;padding:11px 14px;background:#161125;border-bottom:1px solid rgba(168,85,247,.12);}
.stu-mock-dot{width:9px;height:9px;border-radius:50%;background:rgba(196,181,253,.32);}
.stu-mock-label{margin-left:8px;font-family:var(--font-geist-mono),monospace;font-size:11.5px;color:var(--dim);}

/* chat mockup */
.stu-chat{padding:18px 16px;display:flex;flex-direction:column;gap:10px;}
.stu-msg{max-width:84%;padding:11px 14px;border-radius:14px;font-size:13.5px;line-height:1.45;}
.stu-msg-in{align-self:flex-start;background:rgba(255,255,255,.07);color:#e2ddf2;border-bottom-left-radius:4px;}
.stu-msg-out{align-self:flex-end;background:linear-gradient(180deg,#9061f9,#6d28d9);color:#fff;border-bottom-right-radius:4px;}
.stu-msg-card{display:flex;flex-direction:column;gap:10px;align-items:flex-start;}
.stu-msg-card-t{font-weight:600;font-size:12.5px;opacity:.92;}
.stu-msg-btn{background:var(--gold);color:#1a1206;font-weight:800;font-size:12.5px;padding:8px 14px;border-radius:9px;}
.stu-chat-tag{align-self:center;margin-top:4px;font-family:var(--font-geist-mono),monospace;font-size:11.5px;color:var(--gold2);}

/* dashboard mockup */
.stu-dash{padding:16px;}
.stu-dash-stats{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.stu-stat{background:rgba(150,130,255,.06);border:1px solid var(--line);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:3px;}
.stu-stat-n{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:23px;font-weight:800;color:var(--ink);letter-spacing:-.02em;}
.stu-stat-g{color:var(--gold2);}
.stu-stat-l{font-size:11.5px;color:var(--dim);}
.stu-stat-alert{border-color:rgba(243,182,75,.3);}
.stu-stat-alert .stu-stat-n{color:var(--gold);}
.stu-dash-chart{display:flex;align-items:flex-end;gap:7px;height:60px;margin-top:12px;padding:0 2px;}
.stu-dash-chart span{flex:1;background:linear-gradient(180deg,#a855f7,#6d28d9);border-radius:4px 4px 0 0;min-height:8px;}
.stu-dash-chart span:last-child{background:linear-gradient(180deg,#ffd685,#f3b64b);}

/* academy mockup */
.stu-academy{padding:14px;display:flex;flex-direction:column;gap:8px;}
.stu-lesson{display:flex;align-items:center;gap:11px;padding:12px 13px;border-radius:11px;background:rgba(150,130,255,.05);border:1px solid var(--line);}
.stu-lesson-play{width:26px;height:26px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:8px;background:rgba(139,92,246,.2);color:var(--vhi);font-size:10px;}
.stu-lesson-t{flex:1;font-size:12.5px;color:#e2ddf2;font-weight:600;}
.stu-lesson-done{color:var(--gold);font-weight:800;font-size:13px;}
.stu-lesson-prog{font-family:var(--font-geist-mono),monospace;font-size:11px;color:var(--gold2);}
.stu-lesson-active{border-color:rgba(243,182,75,.3);background:rgba(243,182,75,.06);}
.stu-lesson-lock{opacity:.5;}
.stu-academy-tag{align-self:center;margin-top:4px;font-family:var(--font-geist-mono),monospace;font-size:11px;color:var(--gold2);}

/* "everything else" row */
.stu-more{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;max-width:1000px;margin:42px auto 0;}
.stu-more-item{padding:22px 20px;}
.stu-more-title{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:15.5px;font-weight:800;color:var(--ink);letter-spacing:-.01em;}
.stu-more-body{font-size:13px;line-height:1.55;color:var(--dim);margin-top:7px;}

/* partnership */
.stu-partner{padding:46px;max-width:920px;margin:0 auto;}
.stu-partner-lead{max-width:620px;margin-top:14px;}
.stu-partner-split{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:30px;}
.stu-partner-col{background:rgba(150,130,255,.04);border:1px solid var(--line);border-radius:16px;padding:26px;}
.stu-partner-tag{display:inline-block;font-family:var(--font-geist-mono),monospace;font-size:11.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:6px 13px;border-radius:999px;margin-bottom:16px;}
.stu-tag-you{color:var(--vhi);background:rgba(139,92,246,.14);border:1px solid rgba(168,85,247,.24);}
.stu-tag-me{color:var(--gold2);background:rgba(243,182,75,.1);border:1px solid rgba(243,182,75,.24);}
.stu-partner-list{list-style:none;display:flex;flex-direction:column;gap:12px;}
.stu-partner-list li{display:flex;align-items:flex-start;gap:11px;font-size:15px;line-height:1.5;color:#e2ddf2;}
.stu-dot{flex-shrink:0;width:8px;height:8px;border-radius:50%;margin-top:6px;background:var(--v2);box-shadow:0 0 10px rgba(168,85,247,.6);}
.stu-dot-g{background:var(--gold);box-shadow:0 0 10px rgba(243,182,75,.6);}
.stu-partner-foot{font-size:16px;font-weight:700;margin-top:26px;text-align:center;background:linear-gradient(90deg,#c4b5fd,#f3b64b);-webkit-background-clip:text;background-clip:text;color:transparent;}

/* math */
.stu-math{max-width:820px;margin:0 auto;padding:12px 0 0;overflow:hidden;}
.stu-math-head{display:grid;grid-template-columns:0.9fr 1.5fr 1fr;gap:12px;padding:14px 32px;font-family:var(--font-geist-mono),monospace;font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);}
.stu-math-row{display:grid;grid-template-columns:0.9fr 1.5fr 1fr;gap:12px;padding:18px 32px;border-top:1px solid var(--line);align-items:center;}
.stu-math-lever{font-weight:700;color:var(--ink);font-size:15px;}
.stu-math-move{font-size:14px;color:var(--dim);line-height:1.4;}
.stu-math-impact{font-family:var(--font-display),var(--font-inter),sans-serif;font-weight:800;font-size:16px;color:var(--gold2);text-align:right;}
.stu-math-total{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:22px 32px;margin-top:6px;border-top:1px solid rgba(243,182,75,.24);background:rgba(243,182,75,.05);}
.stu-math-total>span:first-child{font-family:var(--font-geist-mono),monospace;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);}
.stu-math-total-num{font-family:var(--font-display),var(--font-inter),sans-serif;font-weight:800;font-size:clamp(17px,2.4vw,22px);color:#fff;text-align:right;}
.stu-math-total-num em{font-style:normal;background:linear-gradient(90deg,#c4b5fd,#f3b64b);-webkit-background-clip:text;background-clip:text;color:transparent;font-size:.86em;}

/* pricing */
.stu-price{position:relative;max-width:640px;margin:0 auto;background:linear-gradient(180deg,rgba(150,130,255,.08),rgba(150,130,255,.02));border:1px solid rgba(190,168,255,.2);border-radius:24px;padding:46px 44px 40px;text-align:center;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.44);}
.stu-price-glow{position:absolute;top:-40%;left:50%;transform:translateX(-50%);width:80%;height:70%;background:radial-gradient(circle,rgba(168,85,247,.22),transparent 68%);pointer-events:none;}
.stu-price-head{position:relative;padding-bottom:22px;margin-bottom:24px;border-bottom:1px solid var(--line);}
.stu-price-anchor{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:clamp(30px,4.6vw,42px);font-weight:800;letter-spacing:-.03em;color:#fff;line-height:1.04;}
.stu-price-anchor-sub{font-size:16px;font-weight:600;color:var(--gold2);margin-top:9px;}
.stu-price-body{position:relative;font-size:15.5px;line-height:1.65;color:var(--tx);max-width:520px;margin:0 auto;}
.stu-price-points{position:relative;list-style:none;display:flex;flex-direction:column;gap:13px;max-width:480px;margin:24px auto 0;text-align:left;}
.stu-price-points li{display:flex;gap:11px;font-size:14.5px;line-height:1.5;color:#e2ddf2;}
.stu-price-check{flex-shrink:0;display:inline-flex;color:var(--gold);margin-top:1px;}
.stu-price-check svg{width:18px;height:18px;}
.stu-price-cta{position:relative;margin-top:28px;}
.stu-price-reassure{position:relative;font-size:13.5px;color:var(--dim);margin-top:16px;}

/* trust */
.stu-scarcity{display:inline-flex;align-items:center;gap:8px;margin-top:16px;font-size:13px;font-weight:600;color:var(--gold2);background:rgba(243,182,75,.08);border:1px solid rgba(243,182,75,.22);padding:8px 16px;border-radius:999px;}
.stu-scarcity-dot{width:7px;height:7px;border-radius:50%;background:var(--gold);box-shadow:0 0 0 0 rgba(243,182,75,.5);animation:stuRing 2s ease-out infinite;}
@keyframes stuRing{0%{box-shadow:0 0 0 0 rgba(243,182,75,.5);}70%{box-shadow:0 0 0 7px rgba(243,182,75,0);}100%{box-shadow:0 0 0 0 rgba(243,182,75,0);}}
.stu-promises{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
.stu-promise{padding:26px 22px;}
.stu-promise-check{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:rgba(243,182,75,.14);color:var(--gold2);}
.stu-promise-check svg{width:17px;height:17px;}
.stu-promise-title{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:17.5px;font-weight:800;letter-spacing:-.01em;margin-top:14px;color:var(--ink);}
.stu-promise-body{font-size:14px;line-height:1.6;color:var(--dim);margin-top:8px;}

/* final */
.stu-final{text-align:center;max-width:760px;margin:0 auto;}
.stu-vision{font-size:16px;line-height:1.6;color:var(--gold2);max-width:620px;margin:0 auto 18px;font-weight:600;}
.stu-final-title{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:clamp(28px,4.6vw,50px);font-weight:800;letter-spacing:-.035em;line-height:1.1;color:var(--ink);}
.stu-final-sub{font-size:18px;color:var(--tx);margin:18px auto 30px;max-width:540px;line-height:1.6;}

/* footer */
.stu-footer{position:relative;z-index:2;border-top:1px solid var(--line);padding:44px 0 40px;margin-top:22px;background:rgba(8,6,14,.5);}
.stu-footer-inner{display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:22px;}
.stu-footer-brand{display:flex;flex-direction:column;gap:9px;}
.stu-logo-foot{font-size:18px;}
.stu-footer-tag{font-size:13px;color:var(--dim);max-width:280px;line-height:1.5;}
.stu-footer-links{display:flex;align-items:center;gap:8px 20px;flex-wrap:wrap;}
.stu-footer-links a{font-size:13.5px;color:var(--tx);text-decoration:none;transition:color .15s;padding:6px 0;}
.stu-footer-links a:hover{color:var(--ink);}
.stu-footer-links a.stu-btn{color:#fff;padding:0 18px;}
.stu-footer-bottom{display:flex;justify-content:space-between;margin-top:22px;padding-top:18px;border-top:1px solid var(--line);font-size:12.5px;color:var(--dim);}

/* coded animated explainer (the "video") */
.stu-vid-trigger{gap:9px;}
.stu-vid-tri-play{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:var(--gold);color:#1a1206;font-size:8px;}
.stu-vid-overlay{position:fixed;inset:0;z-index:100;background:rgba(6,4,12,.86);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:20px;animation:stuFade .25s ease both;}
@keyframes stuFade{from{opacity:0}to{opacity:1}}
.stu-vid{position:relative;width:100%;max-width:860px;aspect-ratio:16/10;background:radial-gradient(120% 100% at 50% 0%,#1b1233,#0a0812 72%);border:1px solid rgba(168,85,247,.24);border-radius:22px;overflow:hidden;box-shadow:0 40px 120px rgba(0,0,0,.7),0 0 80px rgba(139,92,246,.16);display:flex;flex-direction:column;}
.stu-vid-progress{position:absolute;top:14px;left:16px;right:16px;z-index:3;display:flex;gap:5px;}
.stu-vid-seg{flex:1;height:3px;background:rgba(255,255,255,.16);border-radius:2px;overflow:hidden;}
.stu-vid-fill{display:block;height:100%;width:0;background:linear-gradient(90deg,#a855f7,#f3b64b);}
.stu-vid-fill-full{width:100%;}
.stu-vid-fill:not(.stu-vid-fill-full){animation:stuVidFill linear forwards;}
@keyframes stuVidFill{from{width:0}to{width:100%}}
.stu-vid-close{position:absolute;top:24px;right:18px;z-index:4;display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.08);border:1px solid var(--line);color:var(--ink);cursor:pointer;font-size:13px;}
.stu-vid-close:hover{background:rgba(255,255,255,.16);}
.stu-vid-playpause{position:absolute;bottom:16px;left:18px;z-index:4;display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.08);border:1px solid var(--line);color:var(--ink);cursor:pointer;font-size:10px;}
.stu-vid-playpause:hover{background:rgba(255,255,255,.16);}
.stu-vid-stage{flex:1;display:flex;align-items:center;justify-content:center;padding:46px;text-align:center;overflow:hidden;}
.stu-vid-replay{margin-top:20px;background:none;border:1px solid var(--line);color:var(--tx);padding:9px 18px;border-radius:10px;cursor:pointer;font-size:13px;}
.stu-vid-replay:hover{color:var(--ink);border-color:rgba(243,182,75,.4);}

/* video scenes */
.stu-vs{width:100%;max-width:700px;}
.stu-vs-center{display:flex;flex-direction:column;align-items:center;}
.stu-vs>*{animation:stuVsIn .55s cubic-bezier(.22,1,.36,1) both;}
.stu-vs>*:nth-child(2){animation-delay:.12s;}
.stu-vs>*:nth-child(3){animation-delay:.24s;}
.stu-vs>*:nth-child(4){animation-delay:.34s;}
@keyframes stuVsIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.stu-vs-eyebrow{font-family:var(--font-geist-mono),monospace;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:16px;}
.stu-vs-big{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:clamp(26px,4.4vw,46px);font-weight:800;letter-spacing:-.03em;line-height:1.08;color:#fff;}
.stu-vs-mid{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:clamp(22px,3vw,32px);font-weight:800;letter-spacing:-.02em;line-height:1.14;color:#fff;margin-top:14px;}
.stu-vs-kick{font-family:var(--font-geist-mono),monospace;font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:22px;}
.stu-vs-sub{font-size:16px;color:var(--tx);margin-top:14px;}
.stu-vs-cta{margin-top:24px;}
.stu-vs-leaks{list-style:none;display:flex;flex-direction:column;gap:14px;text-align:left;max-width:480px;margin:0 auto;}
.stu-vs-leaks li{font-size:clamp(16px,2.2vw,21px);font-weight:600;color:#e2ddf2;padding-left:26px;position:relative;animation:stuVsIn .5s cubic-bezier(.22,1,.36,1) both;}
.stu-vs-leaks li::before{content:"–";position:absolute;left:4px;color:var(--gold);}
.stu-vs-leaks li:nth-child(1){animation-delay:.1s}.stu-vs-leaks li:nth-child(2){animation-delay:.3s}.stu-vs-leaks li:nth-child(3){animation-delay:.5s}.stu-vs-leaks li:nth-child(4){animation-delay:.7s}
.stu-vs-split{display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:center;text-align:left;}
.stu-vs-split .stu-vs-visual{display:flex;justify-content:center;}
.stu-vs-split .stu-mock{max-width:330px;}
.stu-vs-money{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:20px;}
.stu-vs-chip{font-size:14px;font-weight:600;color:#e2ddf2;background:rgba(150,130,255,.08);border:1px solid var(--line);padding:9px 15px;border-radius:999px;}
.stu-vs-total{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:clamp(24px,3.6vw,38px);font-weight:800;letter-spacing:-.02em;color:#fff;}

@media(max-width:640px){
  .stu-vid{aspect-ratio:auto;height:86vh;max-width:100%;}
  .stu-vid-stage{padding:34px 22px;}
  .stu-vs-split{grid-template-columns:1fr;gap:18px;text-align:center;}
  .stu-vs-split .stu-vs-visual{order:2;}
  .stu-vs-split .stu-mock{max-width:280px;}
}

@media(prefers-reduced-motion:reduce){
  .stu-scarcity-dot{animation:none;}
  .stu-rise,.stu-rev{opacity:1;transform:none;animation:none;}
  .stu-vs>*,.stu-vs-leaks li{animation:none;opacity:1;transform:none;}
  .stu-vid-overlay{animation:none;}
}
@media(max-width:980px){
  .stu-promises{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:860px){
  .stu-nav-links{display:none;}
  .stu-nav-toggle{display:inline-flex;}
  .stu-leaks{grid-template-columns:1fr;}
  .stu-show{grid-template-columns:1fr;gap:22px;}
  .stu-show-alt .stu-show-copy{order:0;}
  .stu-more{grid-template-columns:1fr 1fr;}
  .stu-partner-split{grid-template-columns:1fr;}
  .stu-partner{padding:34px 24px;}
}
@media(max-width:620px){
  .stu-math-head{display:none;}
  .stu-math-row{grid-template-columns:1fr;gap:4px;padding:16px 22px;}
  .stu-math-impact{text-align:left;color:var(--gold2);}
  .stu-math-total{padding:18px 22px;}
  .stu-math-total-num{text-align:left;}
}
@media(max-width:560px){
  .stu-promises{grid-template-columns:1fr;max-width:420px;margin:0 auto;}
  .stu-more{grid-template-columns:1fr;max-width:420px;margin-left:auto;margin-right:auto;}
  .stu-cta-row{flex-direction:column;}
  .stu-btn-lg{width:100%;}
  .stu-hero{padding:52px 20px 22px;}
  .stu-price{padding:34px 22px 30px;}
  .stu-footer-bottom{flex-direction:column;gap:6px;}
}
`;
