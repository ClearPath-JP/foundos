/**
 * The foundos design system — everything a page on this site shares.
 *
 * A new page is five lines of scaffolding and then its own content:
 *
 *     import {
 *       MobileActionBar, Rule, SHELL, SiteFooter, SiteHeader, siteCss, siteFontClass,
 *     } from '@/components/site';
 *
 *     export default function Page() {
 *       return (
 *         <div className={`eb ${siteFontClass}`} id="top">
 *           <style>{siteCss(PAGE_CSS)}</style>
 *           <SiteHeader />
 *           <main>{...}</main>
 *           <SiteFooter />
 *           <MobileActionBar secondary={{ href: '#…', label: '…' }} />
 *         </div>
 *       );
 *     }
 *
 * Three things are required of that root element and none of them are
 * optional: the `eb` class scopes the entire stylesheet, `siteFontClass`
 * declares the three faces the stylesheet reads, and `id="top"` is what the
 * header's wordmark links back to.
 *
 * ⚠️ THIS BARREL PULLS THE THREE FONTS IN WITH IT. `siteFontClass` is a
 * next/font call, and next/font emits its @font-face CSS — and a preload — for
 * every route whose module graph reaches it. Importing anything from
 * '@/components/site' therefore costs a route three woff2 files whether it
 * draws them or not. That is right for a page built on this design system and
 * wrong for a route that only wants one piece of it: see the long note on
 * Inter in src/app/layout.tsx, which is the same trap one level up. If a route
 * wants Rule without the type, import the leaf — '@/components/site/Rule' —
 * and skip the barrel.
 *
 * ⚠️ WHAT DOES NOT BELONG IN THIS FOLDER. A component here is used by more
 * than one page, or is about to be. The homepage's hero field, its cream
 * order-pad card, its ledger table and its wood arithmetic band are not here
 * and should not be moved here to "tidy up" — they were designed against one
 * argument on one page, and a shared component that only one page renders is a
 * shared component nobody can safely change. See the header of
 * src/app/page.tsx for what that page keeps and why.
 */
export { SITE_CSS, shipCss, siteCss } from './css';
export { NAV, PRESENCE } from './copy';
export { siteFontClass } from './fonts';
export { SHELL } from './shell';
export { LedgerHead } from './LedgerHead';
export { Linked, Marked } from './Marked';
export { MobileActionBar } from './MobileActionBar';
export { Rule } from './Rule';
export { SiteFooter } from './SiteFooter';
export { SiteHeader } from './SiteHeader';
export { TextMeButton } from './TextMeButton';
export { Wordmark } from './Wordmark';
