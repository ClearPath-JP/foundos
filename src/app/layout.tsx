import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { SITE_URL } from "./site";
import "./globals.css";

/**
 * One family for the whole site — 400 for body, 600 for headings and buttons.
 *
 * No `weight` is passed on purpose. Inter is a variable font, and passing a
 * weight array switches next/font to static instances: more files, and 400 and
 * 600 stop coming out of a single download.
 *
 * `preload: false` IS DELIBERATE AND IT IS THE POINT. The homepage does not
 * render one glyph of Inter: page.tsx sets `.eb { font-family: var(--f-body) }`,
 * which is Chivo, and names Inter only as the second entry in a fallback chain
 * that never gets reached. Preloading it there put a fourth woff2 on the
 * critical path of the one page anybody is sent to, for a face that draws
 * nothing. With preload off, the browser fetches Inter only when a glyph
 * actually needs it — never on `/`, immediately on /privacy and the demos,
 * which still set it as their body font through globals.css.
 *
 * The cost is honest and small: those routes swap from the system face instead
 * of preloading. `display: 'swap'` was already the behaviour there, so what
 * changes is the fetch priority, not whether text is visible while it loads.
 *
 * If Inter ever becomes the rendered face of the homepage, turn this back on.
 *
 * This is the only font the root loads. A route that needs its own face
 * declares it in its own nested layout (see src/app/demo/istanbul/layout.tsx,
 * and page.tsx for the three ember faces), which keeps a client demo from
 * paying for type it doesn't use.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

/**
 * The wordmark is `foundos` with no ".ai" — the domain carries that part — so
 * the tab title starts with the mark, not the domain. Mark and city both come
 * from config/brand.ts so a change there can't leave a stale copy sitting here.
 */
/* 2026-10-09: the site is the free-audit landing page; these are the defaults every route inherits. */
/* DRAFT — NOT APPROVED FOR PUBLIC USE (2026-10-10): TITLE and META_DESCRIPTION. */
const TITLE = 'Free Digital Experience Audit | FoundOS';

/**
 * The meta description, and it is NOT the h1 any more.
 *
 * It used to be `DESCRIPTION` from config/brand.ts, which is the hero sentence
 * verbatim. That made the search result a duplicate of the headline directly
 * above it and spent all 78 characters on who Josh is, saying nothing about
 * what he sells, and nothing about the one thing on the page a stranger can
 * act on. A description is the only ad copy on a search result that is free.
 *
 * So: the offer, the city, then the free report. 146 characters, inside the
 * ~155 Google renders before it truncates, with the services in the first
 * clause where they survive the cut on a phone.
 *
 * Every claim is on the page and none of it is new copy — ordering, booking
 * and the AI phone line are all in "What I build", and the report is the thing
 * the hero button scrolls to. `DESCRIPTION` stays what it is and stays in use
 * (the JSON-LD, and the headline on the share card); this is a second, narrower
 * string with a different job.
 */
const META_DESCRIPTION =
  "Request a Free Digital Experience Audit from Josh at FoundOS: a personalized Loom video on your offer, how easy you are to reach, and your follow-up.";

export const metadata: Metadata = {
  /**
   * Without this Next warns on every build and guesses an origin when it
   * resolves social image URLs — localhost in dev, the Vercel preview host in
   * CI. Setting it pins every relative metadata URL to the real domain.
   */
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: META_DESCRIPTION,
  /**
   * A SELF-REFERENCING CANONICAL ON EVERY ROUTE, FROM ONE LINE.
   *
   * The obvious version — `canonical: '/'` — would have been a bug. Metadata
   * inherits down the tree, and a relative canonical resolves against
   * `metadataBase`, not against the current path, so every child route would
   * have claimed to be the homepage and /privacy would have quietly dropped
   * out of the index.
   *
   * Passing a URL INSTANCE instead switches Next to a different branch:
   * `resolveAlternateUrl` treats a URL as a base and composes it with the
   * current pathname (next/dist/lib/metadata/resolvers/resolve-basics.js), so
   * `/` gets foundos.ai, /privacy gets foundos.ai/privacy, and a demo route
   * gets its own path. One declaration, correct everywhere.
   *
   * ⚠️ `new URL(SITE_URL)` and `'/'` LOOK interchangeable here and are not.
   * Do not "simplify" this to a string.
   *
   * What it buys: foundos.ai is reachable as a bare Vercel deployment URL and
   * as a preview host, and every one of those is a duplicate of the page being
   * sold. The canonical names the one that counts.
   */
  alternates: {
    canonical: new URL(SITE_URL),
  },
  openGraph: {
    title: TITLE,
    description: META_DESCRIPTION,
    /**
     * `'./'` — NOT the bare origin, and this is the second URL trick in this
     * file that reads like a typo.
     *
     * og:url is how Facebook, WhatsApp and iMessage IDENTIFY a shared page: two
     * links carrying the same og:url are one object to them, and they pool its
     * preview, its share count and its comments. This field was `SITE_URL`,
     * which every route inherited, so a demo link and the homepage were the
     * same object and both previewed as the homepage.
     *
     * A leading-dot path is the one form `resolveAbsoluteUrlWithPathname`
     * composes against the CURRENT pathname rather than against metadataBase
     * (next/dist/lib/metadata/resolvers/resolve-url.js), so this resolves to
     * foundos.ai on / and foundos.ai/privacy on /privacy — matching the
     * canonical above, which is the point.
     *
     * ⚠️ The URL-instance trick used for `canonical` does NOT work here: og:url
     * takes a different resolver, and a URL instance would pass through whole.
     * The two fields need two different shapes to mean the same thing.
     */
    url: "./",
    siteName: "FoundOS",
    type: "website",
    locale: "en_US",
  },
  /**
   * There IS an image now — src/app/opengraph-image.tsx, generated at build
   * time from the brand, no photography involved — which is why this block
   * changed. It used to be a comment explaining that `summary` was correct
   * because we had no art, and it was correct then. Every share was a grey box.
   *
   * `card` is the only field set here, on purpose:
   *   - title and description are filled from `openGraph` by Next's metadata
   *     post-pass, so repeating them would be two more strings to drift.
   *   - `images` is filled the same way, from the file-convention OG image.
   *     There is no twitter-image.tsx and there should not be; it would render
   *     an identical PNG a second time. See the note in opengraph-image.tsx.
   *
   * `summary_large_image` is the 1200x630 card. Without this line the image
   * would still be attached but rendered as a small square thumbnail.
   *
   * Routes built for a REAL business must still declare their own twitter
   * block AND their own openGraph.images, or a client's link previews with
   * foundos's card and foundos's sales copy on it — see the note in
   * src/app/demo/istanbul/layout.tsx, which does this correctly.
   */
  twitter: {
    card: "summary_large_image",
  },
};

/**
 * themeColor lives on `viewport`, not on `metadata` — Next moved it in 13.2 and
 * silently ignores it in the wrong place.
 *
 * #1a1a1a is the ink the sticky header is painted in, so on Android Chrome and
 * on iOS the browser chrome above the page becomes a continuation of the header
 * band instead of a white strip sitting on top of it.
 *
 * One value, no light/dark pair: the page has no light mode. A route with a
 * different ground overrides this with its own `viewport` export, the way
 * src/app/demo/istanbul/layout.tsx does.
 */
export const viewport: Viewport = {
  themeColor: "#1a1a1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
