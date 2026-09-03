'use client';

import React, { useState } from 'react';

/* /clahvay — CONCEPT DEMO of the Clahvay online salsa academy.
   A Netflix-style browsing experience (hero feature + horizontal course rows +
   a 7-level skill path), structured like themamboguild.com, branded warm/Cuban.
   This is a pitch/close asset for the Clahvay lunch — "here's your academy,
   already built." Placeholder course names + gradient thumbnails; swap in real
   class footage + Clahvay's true brand colors on the call. Built by foundos.ai. */

type Tile = { name: string; meta: string; prog?: number; g: number };
type Row = { title: string; tiles: Tile[] };

const rows: Row[] = [
  {
    title: 'Continue learning',
    tiles: [
      { name: 'Dile que No', meta: 'Level 1 · 8 min', prog: 62, g: 0 },
      { name: 'Enchufla', meta: 'Level 1 · 11 min', prog: 30, g: 1 },
      { name: 'Basic Timing', meta: 'Level 1 · 6 min', prog: 88, g: 2 },
      { name: 'Vacílala', meta: 'Level 2 · 9 min', prog: 15, g: 3 },
      { name: 'Setenta', meta: 'Level 2 · 12 min', prog: 8, g: 4 },
    ],
  },
  {
    title: 'Start here · The Foundations',
    tiles: [
      { name: 'The Cuban Basic', meta: 'Level 1 · 7 min', g: 2 },
      { name: 'Guapea', meta: 'Level 1 · 9 min', g: 0 },
      { name: 'Dile que No', meta: 'Level 1 · 8 min', g: 4 },
      { name: 'Enchufla', meta: 'Level 1 · 11 min', g: 1 },
      { name: 'Timing & the clave', meta: 'Level 1 · 10 min', g: 3 },
    ],
  },
  {
    title: 'Partnerwork & connection',
    tiles: [
      { name: 'Leading with clarity', meta: 'Level 3 · 10 min', g: 1 },
      { name: 'Following & feel', meta: 'Level 3 · 9 min', g: 3 },
      { name: 'Frame & tension', meta: 'Level 3 · 8 min', g: 0 },
      { name: 'Riding the breaks', meta: 'Level 3 · 11 min', g: 4 },
      { name: 'Hand changes', meta: 'Level 3 · 7 min', g: 2 },
    ],
  },
  {
    title: 'Rueda de Casino',
    tiles: [
      { name: 'Rueda basics', meta: 'Level 4 · 12 min', g: 4 },
      { name: 'Calling the moves', meta: 'Level 4 · 9 min', g: 2 },
      { name: 'Dame', meta: 'Level 4 · 7 min', g: 0 },
      { name: 'Enchufla doble', meta: 'Level 4 · 10 min', g: 3 },
      { name: 'Setenta complicado', meta: 'Level 4 · 13 min', g: 1 },
    ],
  },
];

const GRADS = [
  'linear-gradient(135deg,#f0863f,#e23b4e)',
  'linear-gradient(135deg,#e23b4e,#8e2d6b)',
  'linear-gradient(135deg,#f5b544,#e8622a)',
  'linear-gradient(135deg,#c0392b,#5b1e2a)',
  'linear-gradient(135deg,#e8622a,#b8235a)',
];

const levels = [
  { n: 1, name: 'Foundations', state: 'done' },
  { n: 2, name: 'Turn Patterns', state: 'active' },
  { n: 3, name: 'Partnerwork', state: 'locked' },
  { n: 4, name: 'Rueda de Casino', state: 'locked' },
  { n: 5, name: 'Styling', state: 'locked' },
  { n: 6, name: 'Musicality', state: 'locked' },
  { n: 7, name: 'Performance', state: 'locked' },
];

const Play = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
);

const TileCard = ({ t }: { t: Tile }) => (
  <div className="clv-tile">
    <div className="clv-thumb" style={{ background: GRADS[t.g % GRADS.length] }}>
      <span className="clv-thumb-play"><Play /></span>
      <span className="clv-thumb-name">{t.name}</span>
      {t.prog !== undefined && <span className="clv-thumb-bar"><i style={{ width: `${t.prog}%` }} /></span>}
    </div>
    <div className="clv-tile-meta">{t.meta}</div>
  </div>
);

export default function Clahvay() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="clv-root">
      <style>{CSS}</style>

      {/* nav */}
      <nav className="clv-nav">
        <div className="clv-nav-inner">
          <span className="clv-logo">clahvay</span>
          <div className="clv-nav-links">
            <a href="#" className="clv-active">Browse</a>
            <a href="#path">My Path</a>
            <a href="#">Live</a>
            <a href="#">Community</a>
          </div>
          <div className="clv-nav-right">
            <span className="clv-claves">1,240 <span className="clv-clave-i">claves</span></span>
            <span className="clv-avatar">JP</span>
            <button className="clv-nav-toggle" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu" aria-expanded={menuOpen}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="clv-mobile-menu">
            <a href="#" onClick={() => setMenuOpen(false)}>Browse</a>
            <a href="#path" onClick={() => setMenuOpen(false)}>My Path</a>
            <a href="#" onClick={() => setMenuOpen(false)}>Live</a>
            <a href="#" onClick={() => setMenuOpen(false)}>Community</a>
          </div>
        )}
      </nav>

      {/* hero — featured lesson */}
      <header className="clv-hero">
        <div className="clv-hero-art" aria-hidden>
          <span className="clv-hero-blob clv-hb1" />
          <span className="clv-hero-blob clv-hb2" />
        </div>
        <div className="clv-hero-inner">
          <p className="clv-hero-eyebrow">Cuban Casino · Level 1</p>
          <h1 className="clv-hero-title">The Foundations</h1>
          <p className="clv-hero-desc">Your first steps in Cuban salsa — the timing, the basic step, and your first turns. Every dancer starts here.</p>
          <p className="clv-hero-meta">12 lessons · 2h 15m · Beginner · <span className="clv-hero-rating">★ 5.0</span></p>
          <div className="clv-hero-cta">
            <a href="#" className="clv-btn clv-btn-play"><Play /> Play</a>
            <a href="#" className="clv-btn clv-btn-ghost">+ My List</a>
          </div>
        </div>
      </header>

      <main className="clv-main">
        {/* browse rows */}
        {rows.map((r) => (
          <section key={r.title} className="clv-row">
            <h2 className="clv-row-title">{r.title}</h2>
            <div className="clv-row-scroll">
              {r.tiles.map((t) => <TileCard key={t.name + t.meta} t={t} />)}
            </div>
          </section>
        ))}

        {/* the 7-level path (skill tree) */}
        <section id="path" className="clv-path-sec">
          <div className="clv-path-head">
            <h2 className="clv-row-title">Your path · 7 levels from first step to performance</h2>
            <p className="clv-path-sub">Unlock the next level as you go — earn claves, spend them in the Guild shop.</p>
          </div>
          <div className="clv-path">
            {levels.map((l, i) => (
              <React.Fragment key={l.n}>
                {i > 0 && <span className={`clv-path-link ${levels[i - 1].state === 'locked' ? '' : 'clv-path-link-on'}`} />}
                <div className={`clv-node clv-node-${l.state}`}>
                  <span className="clv-node-n">{l.state === 'done' ? '✓' : l.n}</span>
                  <span className="clv-node-name">{l.name}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* concept banner — this is a demo built by foundos */}
        <section className="clv-demo-banner">
          <p className="clv-demo-eyebrow">Concept demo</p>
          <h2 className="clv-demo-title">This is what your academy could look like.</h2>
          <p className="clv-demo-sub">Netflix-style browsing, a 7-level path, claves and community — built on your own site, from your classes. Real footage and your brand drop in next.</p>
          <span className="clv-demo-by">Built by <b>foundos.ai</b></span>
        </section>
      </main>
    </div>
  );
}

const CSS = `
.clv-root{
  --bg:#0f0a0c;--ink:#faf4ef;--tx:#cbb9ad;--dim:#8f7d72;
  --amber:#f0863f;--gold:#f5b544;--red:#e23b4e;
  --line:rgba(240,134,63,.14);
  position:relative;min-height:100vh;background:var(--bg);color:var(--tx);
  font-family:var(--font-inter),system-ui,sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;
}

/* nav */
.clv-nav{position:sticky;top:0;z-index:40;background:linear-gradient(180deg,rgba(15,10,12,.96),rgba(15,10,12,.72) 70%,transparent);backdrop-filter:blur(6px);}
.clv-nav-inner{max-width:1400px;margin:0 auto;padding:0 30px;height:66px;display:flex;align-items:center;gap:32px;}
.clv-logo{font-family:var(--font-display),var(--font-inter),sans-serif;font-weight:800;font-size:26px;letter-spacing:-.02em;background:linear-gradient(90deg,#f5b544,#e23b4e);-webkit-background-clip:text;background-clip:text;color:transparent;}
.clv-nav-links{display:flex;gap:26px;flex:1;}
.clv-nav-links a{font-size:14px;color:var(--tx);text-decoration:none;font-weight:500;transition:color .15s;}
.clv-nav-links a:hover{color:var(--ink);}
.clv-nav-links a.clv-active{color:var(--ink);font-weight:700;}
.clv-nav-right{display:flex;align-items:center;gap:16px;margin-left:auto;}
.clv-claves{font-family:var(--font-geist-mono),monospace;font-size:13px;font-weight:700;color:var(--gold);}
.clv-clave-i{color:var(--dim);font-weight:500;}
.clv-avatar{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,#f0863f,#e23b4e);color:#1a0d08;font-weight:800;font-size:13px;}
.clv-nav-toggle{display:none;align-items:center;justify-content:center;width:42px;height:42px;border-radius:10px;background:rgba(240,134,63,.08);border:1px solid var(--line);color:var(--tx);cursor:pointer;}
.clv-nav-toggle svg{width:22px;height:22px;}
.clv-mobile-menu{display:flex;flex-direction:column;gap:2px;padding:6px 24px 16px;background:rgba(15,10,12,.98);}
.clv-mobile-menu a{padding:13px 6px;font-size:16px;font-weight:600;color:var(--ink);text-decoration:none;}

/* hero */
.clv-hero{position:relative;margin-top:-66px;padding:150px 30px 60px;overflow:hidden;border-bottom:1px solid var(--line);}
.clv-hero-art{position:absolute;inset:0;z-index:0;}
.clv-hero-art::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(15,10,12,.96) 30%,rgba(15,10,12,.5) 62%,rgba(15,10,12,.9)),linear-gradient(0deg,var(--bg),transparent 60%);}
.clv-hero-blob{position:absolute;border-radius:50%;filter:blur(70px);}
.clv-hb1{width:44vw;height:44vw;right:-6vw;top:-14vw;background:radial-gradient(circle,rgba(226,59,78,.5),transparent 66%);}
.clv-hb2{width:36vw;height:36vw;right:18vw;top:6vw;background:radial-gradient(circle,rgba(240,134,63,.42),transparent 66%);}
.clv-hero-inner{position:relative;z-index:1;max-width:1400px;margin:0 auto;padding:0;}
.clv-hero-eyebrow{font-family:var(--font-geist-mono),monospace;font-size:12.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:14px;}
.clv-hero-title{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:clamp(40px,7vw,86px);font-weight:800;letter-spacing:-.04em;line-height:.98;color:#fff;text-shadow:0 4px 40px rgba(0,0,0,.5);}
.clv-hero-desc{font-size:clamp(15px,1.8vw,18px);line-height:1.55;color:#e6dad2;max-width:500px;margin:20px 0 0;}
.clv-hero-meta{font-size:14px;color:var(--tx);margin-top:16px;}
.clv-hero-rating{color:var(--gold);font-weight:700;}
.clv-hero-cta{display:flex;gap:13px;margin-top:26px;flex-wrap:wrap;}
.clv-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;font-weight:700;font-size:15px;padding:13px 26px;border-radius:10px;text-decoration:none;cursor:pointer;border:none;transition:transform .15s,box-shadow .15s;}
.clv-btn svg{width:18px;height:18px;}
.clv-btn-play{background:linear-gradient(180deg,#f5b544,#e8622a);color:#1a0d08;box-shadow:0 10px 30px rgba(232,98,42,.4);}
.clv-btn-play:hover{transform:translateY(-2px);box-shadow:0 14px 38px rgba(232,98,42,.52);}
.clv-btn-ghost{background:rgba(250,244,239,.1);color:var(--ink);border:1px solid rgba(250,244,239,.16);backdrop-filter:blur(6px);}
.clv-btn-ghost:hover{background:rgba(250,244,239,.18);}

/* rows */
.clv-main{max-width:1400px;margin:0 auto;padding:30px 0 60px;}
.clv-row{margin:34px 0;}
.clv-row-title{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:20px;font-weight:800;letter-spacing:-.01em;color:var(--ink);margin:0 30px 14px;}
.clv-row-scroll{display:flex;gap:14px;overflow-x:auto;padding:4px 30px 14px;scroll-snap-type:x proximity;scrollbar-width:thin;scrollbar-color:rgba(240,134,63,.3) transparent;}
.clv-row-scroll::-webkit-scrollbar{height:8px;}
.clv-row-scroll::-webkit-scrollbar-thumb{background:rgba(240,134,63,.25);border-radius:8px;}
.clv-tile{flex:0 0 auto;width:230px;scroll-snap-align:start;}
.clv-thumb{position:relative;width:100%;aspect-ratio:16/10;border-radius:12px;overflow:hidden;display:flex;align-items:flex-end;padding:14px;box-shadow:0 10px 30px rgba(0,0,0,.4);transition:transform .18s,box-shadow .18s;}
.clv-thumb::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.55));}
.clv-tile:hover .clv-thumb{transform:translateY(-4px) scale(1.02);box-shadow:0 18px 44px rgba(0,0,0,.55);}
.clv-thumb-name{position:relative;z-index:1;font-family:var(--font-display),var(--font-inter),sans-serif;font-weight:800;font-size:17px;color:#fff;letter-spacing:-.01em;line-height:1.15;text-shadow:0 2px 12px rgba(0,0,0,.5);}
.clv-thumb-play{position:absolute;top:12px;right:12px;z-index:2;display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:rgba(20,10,8,.5);border:1px solid rgba(255,255,255,.3);color:#fff;opacity:0;transition:opacity .18s;}
.clv-thumb-play svg{width:15px;height:15px;margin-left:2px;}
.clv-tile:hover .clv-thumb-play{opacity:1;}
.clv-thumb-bar{position:absolute;left:0;right:0;bottom:0;z-index:2;height:4px;background:rgba(0,0,0,.4);}
.clv-thumb-bar i{display:block;height:100%;background:var(--red);}
.clv-tile-meta{font-size:12.5px;color:var(--dim);margin-top:9px;padding-left:2px;}

/* path */
.clv-path-sec{margin:56px 0 20px;padding:38px 30px;background:linear-gradient(180deg,rgba(240,134,63,.05),transparent);border-top:1px solid var(--line);border-bottom:1px solid var(--line);}
.clv-path-head{margin-bottom:26px;}
.clv-path-sub{font-size:14px;color:var(--dim);margin-top:8px;}
.clv-path{display:flex;align-items:center;gap:0;overflow-x:auto;padding-bottom:10px;}
.clv-path-link{flex:0 0 34px;height:2px;background:rgba(240,134,63,.18);}
.clv-path-link-on{background:linear-gradient(90deg,#f5b544,#e8622a);}
.clv-node{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:9px;width:104px;text-align:center;}
.clv-node-n{display:flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:50%;font-family:var(--font-display),var(--font-inter),sans-serif;font-weight:800;font-size:19px;border:2px solid var(--line);color:var(--dim);background:rgba(255,255,255,.02);}
.clv-node-name{font-size:12.5px;font-weight:600;color:var(--dim);line-height:1.25;}
.clv-node-done .clv-node-n{background:linear-gradient(135deg,#f5b544,#e8622a);border-color:transparent;color:#1a0d08;box-shadow:0 0 24px rgba(240,134,63,.4);}
.clv-node-done .clv-node-name{color:var(--tx);}
.clv-node-active .clv-node-n{border-color:var(--gold);color:var(--gold);box-shadow:0 0 20px rgba(245,181,68,.35);animation:clvPulse 2.4s ease-in-out infinite;}
.clv-node-active .clv-node-name{color:var(--ink);}
@keyframes clvPulse{0%,100%{box-shadow:0 0 20px rgba(245,181,68,.3);}50%{box-shadow:0 0 30px rgba(245,181,68,.55);}}

/* demo banner */
.clv-demo-banner{margin:50px 30px 0;padding:44px;text-align:center;border-radius:22px;background:linear-gradient(135deg,rgba(226,59,78,.12),rgba(240,134,63,.08));border:1px solid var(--line);}
.clv-demo-eyebrow{font-family:var(--font-geist-mono),monospace;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:12px;}
.clv-demo-title{font-family:var(--font-display),var(--font-inter),sans-serif;font-size:clamp(24px,3.4vw,36px);font-weight:800;letter-spacing:-.02em;color:#fff;}
.clv-demo-sub{font-size:16px;line-height:1.6;color:var(--tx);max-width:600px;margin:14px auto 0;}
.clv-demo-by{display:inline-block;margin-top:20px;font-size:13px;color:var(--dim);}
.clv-demo-by b{color:var(--gold);}

@media(prefers-reduced-motion:reduce){
  .clv-node-active .clv-node-n{animation:none;}
}
@media(max-width:820px){
  .clv-nav-links{display:none;}
  .clv-nav-toggle{display:inline-flex;}
  .clv-claves{display:none;}
  .clv-nav-inner{padding:0 20px;gap:14px;}
  .clv-hero{padding:130px 20px 44px;}
  .clv-row-title,.clv-row-scroll{margin-left:20px;margin-right:0;}
  .clv-row-scroll{padding-left:20px;padding-right:20px;}
  .clv-path-sec{padding:32px 20px;}
  .clv-demo-banner{margin:40px 20px 0;padding:34px 24px;}
}
@media(max-width:520px){
  .clv-tile{width:200px;}
  .clv-hero-cta .clv-btn{flex:1;}
}
`;
