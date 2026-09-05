import { Archivo, Chivo, Chivo_Mono } from 'next/font/google';

/**
 * The three faces, declared once for the whole design system.
 *
 * ── WHY THEY ARE HERE AND NOT IN THE ROOT LAYOUT ──────────────────────────
 *
 * next/font scopes a face to the module that loads it and emits a `<link
 * rel="preload">` for every route that pulls that module in. Putting these in
 * src/app/layout.tsx would put three woff2 files on the critical path of
 * /privacy and of every client demo, none of which render a glyph of them —
 * see the long note on Inter in that file, which is the same argument. So the
 * faces live with the stylesheet that uses them, and a route pays for them by
 * importing this module.
 *
 * ── WHY THEY ARE HERE AND NOT IN page.tsx ─────────────────────────────────
 *
 * They were in page.tsx, and a second page built on this system had exactly
 * two options: import them across from a page file, or re-declare them. The
 * second is the one that would have happened, and a re-declaration is how the
 * axes list or the `display` value drifts between two pages that are supposed
 * to be the same site.
 *
 * ⚠️ THE OPTIONS BELOW ARE THE PUBLIC INTERFACE, NOT AN IMPLEMENTATION
 * DETAIL. next/font hashes the GENERATED CSS to build the `__variable_xxxxxx`
 * class names (next-font-loader/index.js: getHashDigest over the css buffer),
 * so a change to `axes`, `display`, `subsets` or the variable name renames the
 * class on every page at once. That is fine. What is not fine is changing one
 * of them to suit one page.
 *
 * Archivo carries a real WIDTH axis (wdth 62-125), which is why it is here
 * instead of a second family: `font-stretch: 86%` gives display type a
 * genuinely narrower cut so a 78-character sentence can be set enormously
 * without running to seven lines on a phone. One family, two very different
 * voices.
 *
 * Deliberately NOT used: Bebas Neue, Oswald, Montserrat, Poppins, Lato. All
 * free, all the default of every canned restaurant template — which is the
 * exact category these pages cannot be mistaken for.
 */
const display = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-eb-display',
});

const body = Chivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-eb-body',
});

const mono = Chivo_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-eb-mono',
});

/**
 * The three `.variable` classes, space-joined, for the page's root element.
 *
 * They only declare the custom properties — `--font-eb-display` and friends —
 * which SITE_CSS then reads through `--f-display`, `--f-body` and `--f-mono`.
 * Nothing here sets a font-family by itself, so this string is inert without
 * the `eb` class beside it:
 *
 *     <div className={`eb ${siteFontClass}`} id="top">
 *
 * ⚠️ ORDER IS DISPLAY, BODY, MONO and it is worth keeping — not because the
 * cascade needs it (three disjoint custom properties cannot collide) but
 * because this string lands in the class attribute of the live page, and a
 * reordered class list is a diff on every page at once for no reason.
 */
export const siteFontClass = `${display.variable} ${body.variable} ${mono.variable}`;
