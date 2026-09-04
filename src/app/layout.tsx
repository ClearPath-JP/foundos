import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DESCRIPTION, LOCATION, WORDMARK } from "@/config/brand";
import "./globals.css";

/**
 * One family for the whole site — 400 for body, 600 for headings and buttons.
 *
 * No `weight` is passed on purpose. Inter is a variable font, and passing a
 * weight array switches next/font to static instances: more files, and 400 and
 * 600 stop coming out of a single download.
 *
 * This is the only font the root loads. A route that needs its own face
 * declares it in its own nested layout (see src/app/demo/istanbul/layout.tsx),
 * which keeps a client demo from paying for type it doesn't use.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://foundos.ai";

/**
 * The wordmark is `foundos` with no ".ai" — the domain carries that part — so
 * the tab title starts with the mark, not the domain. Mark and city both come
 * from config/brand.ts so a change there can't leave a stale copy sitting here.
 */
const TITLE = `${WORDMARK.text} — the online side of restaurants and food businesses in ${LOCATION.city}`;

export const metadata: Metadata = {
  /**
   * Without this Next warns on every build and guesses an origin when it
   * resolves social image URLs — localhost in dev, the Vercel preview host in
   * CI. Setting it pins every relative metadata URL to the real domain.
   */
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  /** The hero's own sentence, from one constant, so the two can never drift. */
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: WORDMARK.text,
    type: "website",
  },
  /**
   * There is deliberately no `twitter` block. We have no OG image, and
   * `summary_large_image` without one renders as an empty grey slab in every
   * client that honours it.
   *
   * Omitting it is not the same as having no card: when `openGraph` is set and
   * `twitter` is absent, Next fills twitter:title and twitter:description from
   * openGraph and derives the card itself — `summary` when there are no images,
   * which is exactly the card we want. Adding `twitter: { card: 'summary' }`
   * would produce identical tags with a line to maintain, so it stays out.
   *
   * Routes that DO have art still declare their own twitter block, or they
   * inherit these tags — see the note in src/app/demo/istanbul/layout.tsx.
   */
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
