import type { Metadata } from "next";
import Link from "next/link";
import { CAL, EMAIL, LOCATION, PHONE, WORDMARK } from "@/config/brand";

/**
 * Privacy policy.
 *
 * Restyled 2026-09-03 from hand-written CSS to Tailwind utilities. The old
 * markup leaned on `.nav`, `.section`, `.heading`, `.mono`, `.privacy-content`
 * and `.footer` — `.nav` never existed in globals.css at all, and the rest was
 * deleted in the same change this page was rewritten for. It also painted two
 * links with a "--white" custom property that nothing declares.
 *
 * The LEGAL TEXT is unchanged in substance. Every clause, list item and the
 * "Last updated" date carry over verbatim; only headings were set to sentence
 * case, the wordmark lowercased, and the scheduling vendor corrected to the one
 * `CAL` in config/brand.ts actually points at. Presentation, not policy.
 *
 * ── 2026-09-03: disclosure pass ────────────────────────────────────────────
 * The policy described a brochure site. The site now runs an instant report and
 * a phone capture, and neither appeared anywhere in it. Every clause that was
 * here is still here — nothing was softened, the ownership section is untouched
 * — but the following were ADDED, each traced to the code rather than guessed:
 *
 *   - Google Places        api/report/route.ts → lib/report/places.ts
 *   - The server-side fetch of the visitor's own site → lib/report/site-checks.ts
 *   - The model call        lib/report/generate.ts (REPORT_MODEL, via AI Gateway)
 *   - 30-day report + facts caches   api/report/route.ts CACHE_TTL_MS
 *   - Telegram on EVERY report run, not just captures  → lib/notify.ts
 *   - The phone capture and its three sinks → api/lead/route.ts
 *   - IP-keyed rate limiting in both routes
 *
 * Two corrections, not additions:
 *   - The date was four months behind features that post-date it.
 *   - "Basic analytics … through Vercel Analytics" described something the site
 *     does not do. `@vercel/analytics` is not a dependency and no <Analytics/>
 *     is mounted in layout.tsx. What actually exists is ordinary host request
 *     logging, so that is what it now says. "No cookies. No personal tracking."
 *     carried over verbatim — the promise was true, the mechanism was not.
 *
 * Supabase and n8n are described as WIRED BUT NOT CONNECTED, because that is
 * the true state: getSupabase() returns null without SUPABASE_URL, and
 * fireLeadWebhook returns not_configured without N8N_LEAD_WEBHOOK_URL.
 *
 * ⚠️ THOSE TWO SENTENCES ARE A CLAIM ABOUT PRODUCTION ENV VARS, NOT ABOUT CODE.
 * "Nothing is stored there" stops being true the moment SUPABASE_URL and
 * SUPABASE_SERVICE_ROLE_KEY are set in Vercel — no deploy required, no line of
 * this file changes, and the policy silently starts under-disclosing a database
 * that now holds visitors' phone numbers. Same for N8N_LEAD_WEBHOOK_URL. So
 * setting either variable is a documentation change too: come back here first.
 * The only routes that reach the model or the database are /api/report and
 * /api/lead; /api/chat and /dashboard both notFound() when process.env.VERCEL
 * is set, which is why the "all of them" claim under Third-party services holds.
 *
 * Reachable from every page via the footer, so the header and footer here match
 * the homepage pattern in spec §2.1 and §2.11.
 */

export const metadata: Metadata = {
  title: `Privacy — ${WORDMARK.text}`,
  description: `How ${WORDMARK.text} handles your data. Plain English, no legalese.`,
};

/** One measure for the whole page, so the header, prose and footer share a left edge. */
const MEASURE = "mx-auto w-full max-w-[65ch] px-6";

/** Black, 2px, offset — the accessibility floor for every interactive element. */
const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

const LINK = `underline underline-offset-2 decoration-hairline hover:decoration-ink ${FOCUS}`;

/**
 * Standalone links — header nav and the footer row — carry the 44px tap floor.
 *
 * Links *inside a sentence* deliberately do not: WCAG 2.5.8 exempts inline
 * links in a block of text, and padding one to 44px would blow a hole in the
 * paragraph around it. So the two mailto links in the body keep LINK.
 */
const NAV_LINK = `inline-flex min-h-11 items-center ${LINK}`;

/**
 * For links that sit *inside* a sentence.
 *
 * WCAG 2.5.8 exempts inline links from the 44px target floor, but the floor is
 * still reachable without touching the layout: on a plain inline element,
 * vertical padding grows the hit box and does NOT grow the line box. So `py-3`
 * takes a 20px link to 44px of tappable height while the paragraph around it
 * stays exactly where it was. The link has no background or border, so nothing
 * about it looks different either.
 */
const PROSE_LINK = `py-3 ${LINK}`;

/**
 * The size WORDMARK.dotSize and WORDMARK.dotGap are specified against — "9px
 * circle at desktop wordmark size, 6px right of the last letter." The dot
 * scales proportionally from here, so the footer's smaller mark keeps the same
 * ratio instead of wearing a 9px dot next to 15px type.
 */
const WORDMARK_BASE_PX = 22;

/**
 * The mark: lowercase `foundos` and a green dot. Dot geometry comes from
 * config/brand.ts rather than literals so the two can't fork.
 *
 * The dot is a plain inline-block: an empty one takes its bottom margin edge as
 * its baseline, which is exactly the "sits on the baseline" the spec asks for.
 */
function Wordmark({ size = WORDMARK_BASE_PX, className = "" }: { size?: number; className?: string }) {
  const ratio = size / WORDMARK_BASE_PX;

  return (
    <span className={`font-semibold whitespace-nowrap ${className}`} style={{ fontSize: size }}>
      {WORDMARK.text}
      <span
        aria-hidden="true"
        className="inline-block rounded-full bg-dot"
        style={{
          width: WORDMARK.dotSize * ratio,
          height: WORDMARK.dotSize * ratio,
          marginLeft: WORDMARK.dotGap * ratio,
        }}
      />
    </span>
  );
}

export default function PrivacyPage() {
  return (
    <div className="bg-paper text-ink">
      <header className="sticky top-0 z-50 border-b border-hairline bg-paper">
        <div className={`${MEASURE} flex items-center justify-between py-4`}>
          <Link
            href="/"
            className={`inline-flex min-h-11 items-center ${FOCUS}`}
            aria-label={`${WORDMARK.text} — home`}
          >
            <Wordmark />
          </Link>

          <nav className="flex items-center gap-6 text-[15px]">
            <a href={`sms:${PHONE}`} className={NAV_LINK}>
              Text me
            </a>
            {/* Not NAV_LINK: that carries `inline-flex`, and pairing it with
                `hidden` puts two display utilities on one element, where the
                winner depends on Tailwind's output order rather than intent.
                So this one spells out the parts and lets `sm:` supply display. */}
            <a
              href={CAL}
              className={`hidden min-h-11 items-center sm:inline-flex ${LINK}`}
            >
              Book 20 minutes
            </a>
          </nav>
        </div>
      </header>

      <main className={`${MEASURE} pt-16 pb-24`}>
        <h1 className="text-[26px] font-semibold md:text-[32px]">Privacy policy</h1>
        <p className="mt-3 text-[14px] text-muted">Last updated: September 3, 2026</p>

        <div className="mt-12 text-[17px] leading-[1.6] md:text-[18px]">
          <h2 className="mb-3 text-[17px] font-semibold md:text-[18px]">Who we are</h2>
          <p>
            {WORDMARK.text} is a web design and development studio run by Josh Potesta in{" "}
            {LOCATION.city}, {LOCATION.region}. When this policy says &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our,&rdquo; it means {WORDMARK.text}.
          </p>

          <h2 className="mt-12 mb-3 text-[17px] font-semibold md:text-[18px]">
            What we collect
          </h2>
          <p>
            We keep data collection minimal. What we get depends on which part of the site
            you use.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold">The audit box asks for nothing</strong>{" "}&mdash;
              type a business name, get a report. No email, no account, no sign-up. Under the
              report there&apos;s a separate box where you can leave a phone number if you want
              us to follow up. That one is optional, and it&apos;s the only thing on this site
              that asks you for anything.
            </li>
            <li>
              <strong className="font-semibold">Contact information</strong>{" "}&mdash; your name,
              email, and phone number when you book a call, fill out a form, or reach out
              directly. Booking a call runs on Calendly, and Calendly&apos;s form is the one
              that asks for a name and an email. That happens on their page, not this one.
            </li>
            <li>
              <strong className="font-semibold">Server logs</strong>{" "}&mdash; Vercel hosts this
              site, and like any web host it records the basics of each request: the page, the
              time, the browser, and the IP address it came from. There is no analytics script
              on the site. No cookies. No personal tracking.
            </li>
            <li>
              <strong className="font-semibold">A short-lived request count</strong>{" "}&mdash; the
              audit box and the phone box each cap how many times one visitor can use them in
              an hour, so neither can be flooded. That count sits in the server&apos;s memory
              against your IP address for one hour and then it&apos;s gone. It isn&apos;t written
              to a database and it isn&apos;t attached to your report.
            </li>
            <li>
              <strong className="font-semibold">Project files</strong>{" "}&mdash; content, images,
              and copy you provide for your website project. We use these solely to build and
              maintain your site.
            </li>
          </ul>

          <h2 className="mt-12 mb-3 text-[17px] font-semibold md:text-[18px]">
            What happens when you use the audit box
          </h2>
          <p>You type a business name. Here is every place it goes.</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold">Google</strong>{" "}&mdash; we send what you typed
              to Google&apos;s Places API to find the listing. If more than one business matches,
              you pick which one. Google sends back what&apos;s already public on the listing:
              address, category, rating, review count, phone number, website, and hours.
            </li>
            <li>
              <strong className="font-semibold">The website on that listing</strong>{" "}&mdash; if
              there is one, our server opens it once and reads the page, the same way a browser
              would. It&apos;s a public page, and the request identifies itself as coming from
              {" "}{WORDMARK.text}. We don&apos;t fill anything in and we don&apos;t sign in to
              anything.
            </li>
            <li>
              <strong className="font-semibold">A language model</strong>{" "}&mdash; the wording of
              the report is written by Claude, a model built by Anthropic, reached through
              Vercel&apos;s AI Gateway. It gets the business name, the public listing details
              above, and what we measured on the site. It does not get your phone number
              &mdash; the report is written before you&apos;re ever asked for one.
            </li>
            <li>
              <strong className="font-semibold">A message to Josh</strong>{" "}&mdash; every report
              that runs sends a Telegram alert to Josh&apos;s phone with the business name and
              what the report found. That&apos;s the point of the box: it tells him someone is
              looking. It happens whether or not you leave a number.
            </li>
          </ul>
          <p className="mt-3">
            The finished report stays in the server&apos;s memory for up to 30 days, filed under
            the Google listing&apos;s id, so running the same business again comes back instantly
            instead of re-doing the lookups. The listing details and the site measurements are
            kept the same way for the same 30 days. That&apos;s memory on a running server, not
            a database &mdash; it clears itself whenever the server recycles. None of it is tied
            to you. It&apos;s filed under the business, with no visitor attached.
          </p>

          <h2 className="mt-12 mb-3 text-[17px] font-semibold md:text-[18px]">
            If you leave your phone number
          </h2>
          <p>
            The box under the report is optional. The report is yours either way. Here is
            exactly what your number does today:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold">It goes to Josh&apos;s phone</strong>{" "}&mdash; as
              a Telegram message carrying your number, the business name, and what the report
              found. That&apos;s the whole mechanism. You left a number so he can text you back,
              and it lands on the phone he&apos;ll be texting you from.
            </li>
            <li>
              <strong className="font-semibold">It is not saved to a database</strong>{" "}&mdash;
              there&apos;s one planned, Supabase, and the code for it is written, but no database
              is connected yet. So today nothing is stored there. If that changes, this page
              changes first.
            </li>
            <li>
              <strong className="font-semibold">Nothing automatic fires on it</strong>{" "}&mdash;
              there&apos;s a wire out to an automation tool, n8n, for the same reason, and
              nothing is connected on the other end of it yet. No sequence, no autoresponder,
              no robot call.
            </li>
          </ul>
          <p className="mt-3">
            Josh texts you himself. Your number doesn&apos;t go on a list and it doesn&apos;t go
            to anyone else. If you&apos;d rather we didn&apos;t have it, email{" "}
            <a href={`mailto:${EMAIL}`} className={PROSE_LINK}>
              {EMAIL}
            </a>{" "}
            and it&apos;s gone.
          </p>

          <h2 className="mt-12 mb-3 text-[17px] font-semibold md:text-[18px]">
            What we don&apos;t collect
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>We don&apos;t use tracking cookies or third-party ad scripts.</li>
            <li>We don&apos;t sell, rent, or share your data with anyone.</li>
            <li>
              We don&apos;t store payment card details &mdash; payments are processed securely
              through Stripe.
            </li>
            <li>
              We don&apos;t ask for an email to run the audit box, and nothing on this site makes
              you create an account.
            </li>
          </ul>

          <h2 className="mt-12 mb-3 text-[17px] font-semibold md:text-[18px]">
            How we use your information
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>To communicate with you about your project.</li>
            <li>To build and maintain your website.</li>
            <li>To send you updates if you opt in (you can opt out anytime).</li>
            <li>To text you back, if you left a number under a report.</li>
          </ul>

          <h2 className="mt-12 mb-3 text-[17px] font-semibold md:text-[18px]">
            Your website and your data
          </h2>
          <p>When we build a website for you, here&apos;s how ownership works:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold">Domain name</strong>{" "}&mdash; registered in your
              name. You own it. We help you set it up and manage DNS, but the domain is yours.
            </li>
            <li>
              <strong className="font-semibold">Website content</strong>{" "}&mdash; your photos,
              copy, menus, and branding are yours. We never reuse client content without
              permission.
            </li>
            <li>
              <strong className="font-semibold">Hosting</strong>{" "}&mdash; your site runs on
              Vercel, a secure, enterprise-grade platform. If we part ways, we transfer
              everything to you.
            </li>
          </ul>

          <h2 className="mt-12 mb-3 text-[17px] font-semibold md:text-[18px]">Security</h2>
          <p>
            All {WORDMARK.text}{" "}sites are served over HTTPS. We use secure, industry-standard
            infrastructure (Vercel, GitHub, Stripe). We don&apos;t store passwords or sensitive
            credentials in plain text.
          </p>
          <p className="mt-3">
            When the audit box opens a website, it only ever fetches ordinary public web
            addresses. It&apos;s blocked from reaching anything on a private network, and it
            stops reading a page after a fixed size and a fixed number of seconds.
          </p>

          <h2 className="mt-12 mb-3 text-[17px] font-semibold md:text-[18px]">
            Third-party services
          </h2>
          <p>
            These are the outside services the site uses, all of them, by name. Nothing else
            touches your data.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="font-semibold">Vercel</strong>{" "}&mdash; hosting, and the AI
              Gateway the report&apos;s model call is routed through
            </li>
            <li>
              <strong className="font-semibold">Google Places</strong>{" "}&mdash; looking up the
              business you typed into the audit box
            </li>
            <li>
              <strong className="font-semibold">Anthropic</strong>{" "}&mdash; the model that writes
              the report&apos;s wording
            </li>
            <li>
              <strong className="font-semibold">Telegram</strong>{" "}&mdash; how a lead alert
              reaches Josh&apos;s phone, so his messages pass through Telegram&apos;s servers
            </li>
            <li>
              <strong className="font-semibold">Supabase</strong>{" "}&mdash; the planned database
              for leads. Not connected yet, so nothing is stored there today
            </li>
            <li>
              <strong className="font-semibold">n8n</strong>{" "}&mdash; the planned follow-up
              automation. Not connected yet, so nothing fires today
            </li>
            <li>
              <strong className="font-semibold">Stripe</strong>{" "}&mdash; payment processing
            </li>
            <li>
              <strong className="font-semibold">Calendly</strong>{" "}&mdash; appointment scheduling
            </li>
            <li>
              <strong className="font-semibold">Google Workspace</strong>{" "}&mdash; email (
              {EMAIL})
            </li>
          </ul>
          <p className="mt-3">
            Each of these has their own privacy policy. We only use services we trust. They are
            how the site runs &mdash; not people we hand your data to, and nobody buys anything
            from us.
          </p>

          <h2 className="mt-12 mb-3 text-[17px] font-semibold md:text-[18px]">Your rights</h2>
          <p>You can:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Ask what data we have about you.</li>
            <li>Request we delete your data.</li>
            <li>Opt out of any communications.</li>
            <li>
              Have the number you left under a report deleted. Right now that means deleting a
              message on Josh&apos;s phone, so say the word and it&apos;s done.
            </li>
          </ul>
          <p className="mt-3">
            Just email{" "}
            <a href={`mailto:${EMAIL}`} className={PROSE_LINK}>
              {EMAIL}
            </a>{" "}
            and we&apos;ll handle it.
          </p>

          <h2 className="mt-12 mb-3 text-[17px] font-semibold md:text-[18px]">Changes</h2>
          <p>
            If we update this policy, we&apos;ll update the date at the top. No surprises.
          </p>

          <h2 className="mt-12 mb-3 text-[17px] font-semibold md:text-[18px]">Contact</h2>
          <p>
            Questions? Reach out:
            <br />
            <a href={`mailto:${EMAIL}`} className={PROSE_LINK}>
              {EMAIL}
            </a>
          </p>
        </div>
      </main>

      <footer className="border-t border-hairline">
        <div className={`${MEASURE} py-8`}>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-muted">
            <Wordmark size={15} className="text-ink" />
            <span aria-hidden="true">·</span>
            <a href={`mailto:${EMAIL}`} className={NAV_LINK}>
              {EMAIL}
            </a>
            <span aria-hidden="true">·</span>
            <span>
              {LOCATION.city}, {LOCATION.region}
            </span>
            <span aria-hidden="true">·</span>
            <Link href="/privacy" aria-current="page" className={NAV_LINK}>
              Privacy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
