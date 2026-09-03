'use client';

import React from 'react';
import Link from 'next/link';

/* Gallery index for the 7 foundos.ai landing-page design explorations.
   Each card links to the live route under /explore/<slug>. Thumbnails are
   full-page screenshots saved to /public/explore-thumbs/. */

type Dir = {
  slug: string;
  name: string;
  vibe: string;
  blurb: string;
  tag: string;
};

const directions: Dir[] = [
  {
    slug: 'aurora',
    name: 'Aurora',
    tag: 'Light · Stripe-style',
    vibe: 'Soft liquid gradient + angled hero',
    blurb: 'Your pick — now Stripe-ified. The soft "liquid" gradient we built washes through an angled hero (the signature Stripe diagonal), then clean white sections with frosted-glass cards and a live agent console. Light, premium, alive.',
  },
  {
    slug: 'midnight',
    name: 'Midnight',
    tag: 'Dark · AI product',
    vibe: 'Command center',
    blurb: 'Near-black with indigo/cyan glow and a dotted grid. The agent is shown as a live terminal streaming decisions. Reads like a serious AI/dev product (Linear × Vercel).',
  },
  {
    slug: 'editorial',
    name: 'Editorial',
    tag: 'Paper · typographic',
    vibe: 'Swiss / brutalist',
    blurb: 'Type-led and confident. Huge headline, oversized 01–04 numerals, hairline rules, one cobalt accent. Feels like a high-end design studio — expensive without effects.',
  },
  {
    slug: 'warm',
    name: 'Warm',
    tag: 'Cream · human',
    vibe: 'Founder-led & personal',
    blurb: 'The anti-corporate take. Warm paper, terracotta + amber, friendly serif, a hand-scribbled underline, your photo up top. Feels like a real person who\'ll just handle it.',
  },
  {
    slug: 'bento',
    name: 'Bento',
    tag: 'Light · product grid',
    vibe: 'It looks like a product',
    blurb: 'The page is a grid of tiles — a mini revenue dashboard, an agent activity feed, stat tiles, integrations. Makes foundos feel like a real operating system you can see.',
  },
  {
    slug: 'spectrum',
    name: 'Spectrum',
    tag: 'Bold · high energy',
    vibe: 'Launch-day gradient',
    blurb: 'A big living blue→violet→pink→orange gradient hero, then clean white sections with vibrant accents. Exciting, modern, fast-growing-startup energy. Tasteful, not garish.',
  },
  {
    slug: 'ledger',
    name: 'Ledger',
    tag: 'White · data-forward',
    vibe: 'See your numbers',
    blurb: 'Conversion-first. An interactive ROI calculator headlines the page; numbers everywhere; the agent shows "decisions that made money." Built to make a skeptic say "this pays for itself."',
  },
];

export default function ExploreGallery() {
  return (
    <div className="exg-root">
      <style>{CSS}</style>

      <header className="exg-head">
        <p className="exg-eyebrow">foundos.ai · design exploration</p>
        <h1 className="exg-title">Seven directions for your homepage.</h1>
        <p className="exg-sub">
          Built overnight from the components you dropped in <code>inspo1</code>. Each one uses your
          real offer and pricing — only the <em>design</em> changes. Click any card to open it live,
          then tell me which one (or which pieces of which) feels like foundos.
        </p>
        <p className="exg-note">
          Tip: your current live homepage is untouched at <code>/</code>. These all live under <code>/explore/…</code>.
        </p>
      </header>

      <main className="exg-grid">
        {directions.map((d, i) => (
          <Link key={d.slug} href={`/explore/${d.slug}`} className="exg-card">
            <div className="exg-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/explore-thumbs/${d.slug}.png`} alt={`${d.name} direction preview`} loading="lazy" />
            </div>
            <div className="exg-meta">
              <div className="exg-meta-top">
                <span className="exg-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="exg-tag">{d.tag}</span>
              </div>
              <h2 className="exg-name">{d.name}</h2>
              <p className="exg-vibe">{d.vibe}</p>
              <p className="exg-blurb">{d.blurb}</p>
              <span className="exg-open">Open live →</span>
            </div>
          </Link>
        ))}
      </main>

      <footer className="exg-foot">
        <p>7 directions · built from <code>inspo1</code> · same offer, different design</p>
      </footer>
    </div>
  );
}

const CSS = `
.exg-root{min-height:100vh;background:#0b0b12;color:#e9e8f0;font-family:var(--font-inter),system-ui,sans-serif;-webkit-font-smoothing:antialiased;padding:0 24px 80px;}
.exg-head{max-width:900px;margin:0 auto;padding:80px 0 48px;text-align:center;}
.exg-eyebrow{font-family:var(--font-geist-mono),monospace;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#8b8ba8;margin-bottom:20px;}
.exg-title{font-size:clamp(34px,5.5vw,58px);font-weight:800;letter-spacing:-.035em;line-height:1.05;background:linear-gradient(90deg,#a5b4fc,#c4b5fd,#f0abfc);-webkit-background-clip:text;background-clip:text;color:transparent;}
.exg-sub{font-size:18px;line-height:1.65;color:#b6b5c8;max-width:680px;margin:22px auto 0;}
.exg-sub em{color:#e9e8f0;font-style:italic;}
.exg-note{font-size:14px;color:#74738c;margin-top:16px;}
.exg-root code{font-family:var(--font-geist-mono),monospace;font-size:.88em;background:rgba(255,255,255,.07);padding:2px 7px;border-radius:6px;color:#c7c6da;}

.exg-grid{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:repeat(2,1fr);gap:24px;}
.exg-card{display:flex;flex-direction:column;background:#13131d;border:1px solid rgba(255,255,255,.08);border-radius:20px;overflow:hidden;text-decoration:none;color:inherit;transition:transform .2s,border-color .2s,box-shadow .2s;}
.exg-card:hover{transform:translateY(-4px);border-color:rgba(165,180,252,.45);box-shadow:0 24px 60px rgba(0,0,0,.45);}
.exg-shot{height:320px;overflow:hidden;background:#1a1a26;border-bottom:1px solid rgba(255,255,255,.06);}
.exg-shot img{width:100%;height:auto;display:block;object-fit:cover;object-position:top;}
.exg-meta{padding:24px 26px 26px;}
.exg-meta-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
.exg-num{font-family:var(--font-geist-mono),monospace;font-size:13px;color:#6f6e88;letter-spacing:.1em;}
.exg-tag{font-family:var(--font-geist-mono),monospace;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#a5b4fc;background:rgba(165,180,252,.12);padding:5px 11px;border-radius:999px;}
.exg-name{font-size:27px;font-weight:800;letter-spacing:-.02em;}
.exg-vibe{font-size:15px;font-weight:600;color:#c4b5fd;margin-top:3px;}
.exg-blurb{font-size:14.5px;line-height:1.6;color:#9b9ab0;margin-top:12px;}
.exg-open{display:inline-block;margin-top:18px;font-size:14px;font-weight:700;color:#a5b4fc;}
.exg-card:hover .exg-open{color:#c4b5fd;}

.exg-foot{max-width:1240px;margin:56px auto 0;text-align:center;color:#5f5e76;font-size:13px;}

@media(max-width:880px){
  .exg-grid{grid-template-columns:1fr;}
  .exg-shot{height:260px;}
}
`;
