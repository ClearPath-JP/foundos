import { ImageResponse } from 'next/og';

/**
 * The share card. 1200x630, generated at build time, no photography.
 *
 * Redrawn 2026-09-30 with the homepage rebuild: the business card's white /
 * purple / near-black, its diagonal stripe, and the new hero line. The old
 * card (ember field, restaurant headline) is in git history.
 *
 * ONE FILE COVERS BOTH NETWORKS. Next merges a file-convention
 * `opengraph-image` into `openGraph.images`, and its metadata post-pass copies
 * it onto `twitter.images` when the twitter block declares none. So there is
 * deliberately no twitter-image.tsx. The card TYPE is stated in layout.tsx.
 *
 * ⚠️ This image cascades to every route that does not declare its own — any
 * route built for a REAL business must declare `openGraph.images` itself (see
 * src/app/demo/istanbul/layout.tsx).
 */

export const alt = 'FoundOS — Your next inquiry should have a clear next step. Free 3-point digital growth audit, reviewed by Josh.';

export const size = { width: 1200, height: 630 };

export const contentType = 'image/png';

/* Satori resolves no CSS custom properties, so the brief's tokens are literals. */
const TEXT = '#171421';
const MUTED = '#595365';
const PURPLE = '#6D28D9';
const PINK = '#C52E98';
const LAV = '#EDE5FA';

const LABEL = 'FREE 3-POINT DIGITAL GROWTH AUDIT';
const LINE_A = 'Your next inquiry should have a';
const LINE_B = 'clear next step.';
const LINE_C = '';
const MARK = 'Found';
const MARK_AI = 'OS';
const FOOT = 'Free · Reviewed by Josh · foundos.ai';

/**
 * Fetch one Google font as a TTF, subset to the glyphs actually drawn.
 *
 *  1. THE USER-AGENT. Sent a modern UA, fonts.googleapis.com answers with
 *     woff2, which Satori cannot parse. An ancient UA gets truetype back.
 *  2. THE `text=` PARAMETER keeps the font a few KB, far under next/og's
 *     500KB bundle ceiling.
 *
 * Returns null rather than throwing: a card in the fallback face still beats a
 * grey box, and a font CDN hiccup must not fail the build.
 */
async function subsetFont(family: string, glyphs: string): Promise<ArrayBuffer | null> {
  const text = Array.from(new Set(glyphs)).join('');
  const url =
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}` +
    `&text=${encodeURIComponent(text)}`;

  try {
    const sheet = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!sheet.ok) return null;

    const css = await sheet.text();
    const src = /src:\s*url\((https:\/\/[^)]+)\)\s*format\('(?:truetype|opentype)'\)/.exec(css);
    if (!src) return null;

    const file = await fetch(src[1]);
    if (!file.ok) return null;

    return await file.arrayBuffer();
  } catch {
    return null;
  }
}

type LoadedFont = { name: string; data: ArrayBuffer; weight: 600 | 800; style: 'normal' };

export default async function OpenGraphImage() {
  const [bold, semi] = await Promise.all([
    subsetFont('Manrope:wght@800', LINE_A + LINE_B + LINE_C + MARK + MARK_AI),
    subsetFont('Manrope:wght@600', LABEL + FOOT),
  ]);

  const fonts: LoadedFont[] = [];
  if (bold) fonts.push({ name: 'Manrope', data: bold, weight: 800, style: 'normal' });
  if (semi) fonts.push({ name: 'Manrope', data: semi, weight: 600, style: 'normal' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: '#FFFFFF',
          backgroundImage: `radial-gradient(circle at 100% 0%, ${LAV} 0%, rgba(237,229,250,0) 55%)`,
          fontFamily: 'Manrope',
          overflow: 'hidden',
        }}
      >
        {/* The card's diagonal stripe and its lavender companion. */}
        <div
          style={{
            position: 'absolute',
            top: -60,
            left: 70,
            width: 110,
            height: 760,
            transform: 'skewX(-14deg)',
            backgroundImage: `linear-gradient(180deg, ${PURPLE} 0%, #8B3FD9 45%, ${PINK} 100%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -60,
            left: 196,
            width: 26,
            height: 760,
            transform: 'skewX(-14deg)',
            backgroundColor: LAV,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px 72px 56px 300px',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 800, letterSpacing: '-0.035em', color: TEXT }}>
            {MARK}
            <span style={{ color: PURPLE }}>{MARK_AI}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 22, fontWeight: 600, letterSpacing: '0.1em', color: PURPLE }}>
              {LABEL}
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: 20,
                fontSize: 76,
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: '-0.04em',
                color: TEXT,
                maxWidth: 820,
              }}
            >
              <span>{LINE_A}&nbsp;</span>
              <span style={{ color: PURPLE }}>{LINE_B}</span>
              <span>{LINE_C}</span>
            </div>
          </div>

          <div style={{ display: 'flex', fontSize: 24, fontWeight: 600, color: MUTED }}>{FOOT}</div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined },
  );
}
