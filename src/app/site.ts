/**
 * The one origin string.
 *
 * It used to live as a local `SITE_URL` inside layout.tsx, which was fine
 * while layout.tsx was the only file that needed it. robots.ts, sitemap.ts and
 * the OG card all need the same value now, and a sitemap that points at a
 * different host than the canonical tag is the exact class of mistake that
 * makes Google pick the wrong URL. So it is declared once, here.
 *
 * No trailing slash. Everything downstream appends its own leading slash.
 *
 * ⚠️ page.tsx still writes 'https://foundos.ai' by hand in its JSON-LD block.
 * That file belongs to another pass; when it is next opened it should import
 * SITE_URL from here instead.
 */
export const SITE_URL = 'https://foundos.ai';
