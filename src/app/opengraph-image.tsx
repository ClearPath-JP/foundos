import { ImageResponse } from 'next/og';
import { DESCRIPTION, WORDMARK } from '@/config/brand';

/**
 * The share card. 1200x630, generated at build time, no photography, no asset
 * files, no budget.
 *
 * Until this file existed every foundos.ai link pasted into iMessage, WhatsApp
 * or a Facebook owner group previewed as a grey box, which is the single most
 * expensive missing tag on a site whose distribution is a man texting people.
 *
 * ONE FILE COVERS BOTH NETWORKS. Next merges a file-convention
 * `opengraph-image` into `openGraph.images`, and its metadata post-pass copies
 * `openGraph.images` onto `twitter.images` whenever the twitter block does not
 * declare its own (mergeStaticMetadata + postProcessMetadata in
 * next/dist/lib/metadata/resolve-metadata.js). So there is deliberately no
 * `twitter-image.tsx` beside this — it would render the same PNG twice. The
 * card TYPE still has to be stated, and it is, in layout.tsx.
 *
 * ⚠️ This image cascades to every route that does not declare its own. That is
 * correct for the concept demos, which are foundos's own work — but any route
 * built for a REAL business must declare `openGraph.images` itself or a client
 * link previews as foundos lead-gen copy. src/app/demo/istanbul/layout.tsx
 * already does exactly that and says so.
 *
 * WHAT IT DRAWS: the top of the actual page, at OG scale. The ink header band
 * with the wordmark and its green dot, then the ember field with the h1. No
 * new composition, no stock anything, nothing invented.
 */

export const alt =
  'foundos — I build and run the online side of restaurants and food businesses in Atlanta.';

export const size = { width: 1200, height: 630 };

export const contentType = 'image/png';

/* ── palette ───────────────────────────────────────────────────────────────
   The same five values as page.tsx, plus the logo green. Written as literals
   because Satori resolves no CSS custom properties and no color-mix(). */
const INK = '#1a1a1a';
const EMBER = '#d94f2b';
const BONE = '#f0e7d4';
const DOT = '#1D9E75';

/**
 * The page's `--dim` on the ink ground, pre-computed.
 * color-mix(in srgb, #f0e7d4 58%, #1a1a1a):
 *   R .58*240 + .42*26 = 150   G .58*231 + .42*26 = 145   B .58*212 + .42*26 = 134
 * Not a sixth hue — it is a mix of two palette values, exactly as the page
 * makes it at runtime.
 */
const DIM = '#969186';

/**
 * The headline. Imported, not retyped: `DESCRIPTION` in config/brand.ts is the
 * same sentence as the page's `HERO.h1`, byte for byte, and that file exists so
 * the two cannot drift. If the hero sentence changes, this card follows.
 */
const HEADLINE = DESCRIPTION;

/** Mono, uppercase, +0.06em — the page's label voice. */
const LABEL = 'FOUNDOS.AI';

/* ── wordmark geometry ─────────────────────────────────────────────────────
   brand.ts states the dot as 9px across with a 6px gap at a 22px wordmark. The
   header renders that as ems so it scales; here it is arithmetic at 56px. */
const MARK_PX = 56;
const DOT_PX = Math.round((MARK_PX * WORDMARK.dotSize) / 22); // 23
const GAP_PX = Math.round((MARK_PX * WORDMARK.dotGap) / 22); // 15

/**
 * Fetch one Google font as a TTF, subset to the glyphs actually drawn.
 *
 * Two things here are load-bearing:
 *
 *  1. THE USER-AGENT. Sent a modern UA, fonts.googleapis.com answers with
 *     woff2, which Satori cannot parse — next/og accepts ttf, otf and woff
 *     only. An ancient UA string gets the legacy truetype stylesheet back.
 *
 *  2. THE `text=` PARAMETER. Google returns a font containing only the
 *     requested glyphs. Archivo cut to this headline is about 4KB against
 *     roughly 90KB for the whole face, which keeps the route far under
 *     next/og's 500KB bundle ceiling.
 *
 * Runs once, at build time, because nothing in this route is request-time.
 * Returns null rather than throwing: a card in next/og's fallback face still
 * beats the grey box this file exists to kill, and a font CDN hiccup must not
 * fail the build.
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

type LoadedFont = {
  name: string;
  data: ArrayBuffer;
  weight: 500 | 700;
  style: 'normal';
};

export default async function OpenGraphImage() {
  const [archivo, chivoMono] = await Promise.all([
    // Archivo 700 is the display face. The header's 86% width axis is not
    // reproducible here — Satori has no font-stretch — so the mark and the
    // headline are the normal cut, which is the same face, slightly wider.
    subsetFont('Archivo:wght@700', HEADLINE + WORDMARK.text),
    subsetFont('Chivo Mono:wght@500', LABEL),
  ]);

  const fonts: LoadedFont[] = [];
  if (archivo) fonts.push({ name: 'Archivo', data: archivo, weight: 700, style: 'normal' });
  if (chivoMono) {
    fonts.push({ name: 'Chivo Mono', data: chivoMono, weight: 500, style: 'normal' });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: EMBER,
          fontFamily: 'Archivo',
        }}
      >
        {/* The ink spine, exactly as the page wears it: mark left, label right.
            The only radius in the whole image is the dot, and that is the rule
            — radius zero is about the layout and does not reach the logo. */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 132,
            paddingLeft: 64,
            paddingRight: 64,
            backgroundColor: INK,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <div
              style={{
                display: 'flex',
                fontSize: MARK_PX,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: BONE,
              }}
            >
              {WORDMARK.text}
            </div>
            <div
              style={{
                width: DOT_PX,
                height: DOT_PX,
                marginLeft: GAP_PX,
                borderRadius: '50%',
                backgroundColor: DOT,
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Chivo Mono',
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: '0.06em',
              color: DIM,
            }}
          >
            {LABEL}
          </div>
        </div>

        {/* The ember field. Sub-1.0 leading and negative tracking, per the
            display rule. Bone on ember is the page's own reversed pairing and
            the size here is far past the 3:1 large-text threshold. */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            paddingLeft: 64,
            paddingRight: 64,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 86,
              fontWeight: 700,
              lineHeight: 0.96,
              letterSpacing: '-0.035em',
              color: BONE,
            }}
          >
            {HEADLINE}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined },
  );
}
