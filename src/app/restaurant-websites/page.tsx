import type { Metadata } from 'next';
import Link from 'next/link';

import { Rule, SHELL, LedgerHead } from '@/components/site';
import { ServicePage, serviceMetadata } from '@/components/service';

/**
 * /restaurant-websites — what a food business's site actually has to do.
 *
 * ── SOURCE: src/lib/report/findings.ts, AND THAT IS THE POINT ─────────────
 *
 * The ten checks below are not a content-marketing list. They are the checks
 * the instant report on the homepage really runs, with the real thresholds:
 *
 *   TIMEOUT_MS = 8000            site-checks.ts   → check 02
 *   SLOW_MS    = 3000            findings.ts:18   → check 03
 *   site.https                   findings.ts      → check 04
 *   site.hasViewportMeta         findings.ts      → check 05
 *   site.hasTelLink              findings.ts      → check 06
 *   site.menuIsPdfOrImage        findings.ts      → check 07
 *   site.marketplaceLinks vs
 *     site.directOrderingLinks   findings.ts      → check 08
 *   site.hasLocalBusinessSchema  findings.ts      → check 09
 *   site.copyrightYear           findings.ts      → check 10
 *   place.website                findings.ts      → check 01
 *
 * The consequence line under several of them is Josh's own string from the
 * CONSEQUENCE map in that file, quoted rather than rewritten. That is the whole
 * credibility of this page: a reader can run the report on the homepage and
 * watch the same ten checks happen to his own site in about ten seconds. If the
 * code's thresholds ever change, these numbers change with them — a page that
 * quotes a threshold the tool no longer uses is worse than one with no numbers.
 *
 * ⚠️ THE LISTING-SIDE FINDINGS DELIBERATELY ARE NOT HERE. no_hours, low_rating,
 * few_reviews, listing_flags_missing and not_reservable are all in findings.ts
 * too, and all five belong to /google-business-profile. Splitting them that way
 * is what keeps these two pages from being one page written twice — which is
 * the failure mode this whole family exists to avoid. Do not "complete the
 * list" by pulling them in here.
 *
 * ⚠️ CHECK 11 IS A LIMIT, NOT A CHECK. The audit reads the first HTTP response
 * and does not execute JavaScript (lib/report/site-checks.ts fetches and parses
 * HTML). Saying that out loud, in the section headed "what I do not check", is
 * worth more than an eleventh green tick — it is the one thing on the page an
 * owner with a developer friend could catch us on.
 */

export const metadata: Metadata = serviceMetadata({
  slug: 'restaurant-websites',
  title: 'What a restaurant website has to do — foundos',
  description:
    'Ten things I measure on a food business website, the threshold for each one, and what it costs you when it fails. Plus the checks I deliberately skip.',
  shareTitle: 'What a restaurant website has to do',
  shareDescription:
    'Ten things I measure on a food business website, the threshold for each one, and what it costs you when it fails.',
});

/* ── copy ─────────────────────────────────────────────────────────────────
   In constants so no apostrophe ever has to be escaped and a copy change shows
   up in a diff as a copy change. Same reason as the homepage. */

const HEAD = {
  label: 'Websites',
  h1: 'A website for a food business has one job.',
  stand: "Not to win anything. To open on a phone, in a parking lot, in under three seconds, and let somebody read the menu and order without thinking about it. That is checkable, so here is the check.",
};

const OPENER = {
  lede: 'Nobody has ever chosen where to eat because a website was beautiful.',
  paras: [
    "They chose it because they could read a price at a red light, tap the number without copying it out, and see that you were open. A site does not make anybody want your food. It stops you losing the people who already do — and that is a smaller job than most people selling websites will admit, which is exactly why it can be measured instead of admired.",
    "So this is the list my own report runs when somebody types their name into the box on the front page. Ten checks, the threshold each one is measured against, and what it costs when it fails. You can run it on yourself in about ten seconds and never speak to me.",
  ],
};

/**
 * The ten. `line` is the measured threshold, set in mono under the paragraph —
 * the same device as the homepage's "Check it:" instruction, doing the job the
 * report's `metric` field does on screen.
 */
const CHECKS = [
  {
    n: '01',
    h3: 'Whether your listing points anywhere at all.',
    p: "I start at your Google listing rather than at your site, because that is where most people start. If there is no website on it, everybody who looks you up lands on somebody else's page instead of yours — an app, an aggregator, a directory that scraped your menu wrong in 2019 and never came back.",
    line: 'A website on the listing, or nothing else on this list applies.',
  },
  {
    n: '02',
    h3: 'Whether it loads at all.',
    p: "I ask for the page the way a phone would and I wait. If nothing has come back in eight seconds I stop waiting and treat the site as down, because that is what a customer does. A site that is up on your office wifi and dead on a phone with two bars is down.",
    line: 'Eight seconds, then I call it down.',
  },
  {
    n: '03',
    h3: 'How long it takes when it does load.',
    p: "Anything past three seconds counts against you. That number is mine, not a study — I picked it because it is roughly where somebody in a parking lot decides you are broken and goes back to the search results. It is almost always one enormous background photograph that nobody ever resized.",
    line: 'Three seconds for the page to arrive.',
  },
  {
    n: '04',
    h3: 'Whether it loads securely.',
    p: 'If the site still runs on plain http, the browser puts a warning in front of it before anybody sees your name. People do not read that warning. They leave, and they do not tell you why.',
    line: 'https, or it fails.',
  },
  {
    n: '05',
    h3: 'Whether it knows it is on a phone.',
    p: 'One line in the page tells a phone to lay itself out at phone width. Without it, the phone shrinks the desktop version to a postage stamp and everybody pinches and drags. Most of your visitors are on a phone, so that is exactly where it breaks.',
    line: 'The mobile viewport tag is either there or it is not.',
  },
  {
    n: '06',
    h3: 'Whether anybody can tap to call you.',
    p: "A number typed on the page as plain text is a number a customer has to copy by hand and paste into the dialer. It should be a link that opens the phone. The easiest thing a hungry person can do is call you, and a lot of sites make them work for it.",
    line: 'At least one tap-to-call link somewhere on the site.',
  },
  {
    n: '07',
    h3: 'Whether your menu is a page or a picture.',
    p: "A PDF, or a photograph of the printed menu taped onto the page. Neither one is a page. Google reads them badly if at all, so your own dishes do not come up when somebody searches for them by name, and on a phone the customer is dragging around a layout that was designed for paper.",
    line: 'The menu is real text, not a PDF and not an image.',
  },
  {
    n: '08',
    h3: 'Where your order button actually goes.',
    p: "I follow the outbound links and see whose logo you land on. If every path to ordering ends on a marketplace, a cut of every one of those tickets leaves the building before you have paid for the chicken — and the customer's number stays with the app rather than with you.",
    line: 'Is there any way to order that belongs to you?',
  },
  {
    n: '09',
    h3: 'Whether the page tells Google what you are.',
    p: 'A short block of machine-readable markup states your name, address, phone, hours and category outright, so Google is not inferring them from your layout. Most food business sites do not have it. It is an afternoon of work and it never has to be done again.',
    line: 'Business markup present, or Google is guessing.',
  },
  {
    n: '10',
    h3: 'What year the bottom of the page says.',
    p: "If the copyright line in the footer is two years old, a first-time visitor reads it as a business that might have closed. It is the cheapest thing on this list to fix and it is the one nobody ever fixes, because nobody scrolls to the bottom of their own website.",
    line: 'Older than last year and it counts against you.',
  },
] as const;

/**
 * ⚠️ THE SECTION THAT MAKES THE TEN ABOVE BELIEVABLE. Three things the audit
 * deliberately does not do, and one thing it genuinely cannot do. The fourth is
 * the important one and it must not be softened: the checker reads the first
 * HTTP response and does not run JavaScript, so a site that assembles itself in
 * the browser can score worse than it deserves. Saying that before an owner's
 * developer friend says it is the difference between an audit and a sales prop.
 */
const NOT_CHECKED = {
  label: 'What I skip',
  h2: 'Four things I do not check, and one I cannot.',
  items: [
    {
      h3: 'I do not grade your design.',
      p: 'Nobody has ever bought a plate of food because the corners were the right radius. If the menu opens and the number dials, an ugly site beats a beautiful one that does neither.',
    },
    {
      h3: 'I do not hand you a performance score out of a hundred.',
      p: 'Those numbers are produced on a simulated connection and they move five points between two runs. Three seconds on a real phone is a fact. Ninety-four out of a hundred is a mood.',
    },
    {
      h3: 'I do not count keywords.',
      p: "There is no density to optimise. Write the dish names, the prices and the neighbourhood the way you say them out loud, and you are done — that is genuinely all the on-page part is for a business your size.",
    },
    {
      h3: 'And here is what my check cannot see.',
      p: "It reads what your server hands a browser on the first request. It does not run your site's code afterwards. So if your site assembles itself in the browser — a lot of newer builders do — some of these ten will read worse than your site really is. When that happens I say so instead of letting a red mark stand, because a scary report I cannot defend is worth less than no report.",
    },
  ],
};

const BUILD = {
  label: 'What I build instead',
  h2: 'The version of this that is worth paying for.',
  stand: 'Everything on the list above, fixed by building the thing correctly the first time rather than by patching it.',
  rows: [
    {
      lead: 'The menu as a real page',
      rest: 'Every dish is a line of text a phone can read and a search engine can index, with the prices sitting where you can change them.',
    },
    {
      lead: 'The number, tappable, on every screen',
      rest: 'One tap opens the dialer. It is the cheapest fix on the whole list.',
    },
    {
      lead: 'Photographs of your actual food',
      rest: "Taken on the day I come out. Not the stock plate of pasta that shipped with the template, which every customer has already seen on four other websites this month.",
    },
    {
      lead: 'Hours that match your listing',
      rest: 'The same hours in both places, including the holidays, because the two disagreeing is how somebody ends up at a locked door writing a review about it.',
    },
    {
      lead: 'Ordering, if it is worth it for you',
      rest: 'On your own site, at your counter prices, with the order landing where your orders already land. Whether that pays for itself depends on your volume and I will tell you straight.',
    },
    {
      lead: 'The markup underneath',
      rest: 'Name, address, phone, hours and category, written where Google reads them rather than left to be inferred from a layout.',
    },
    {
      lead: 'Your own domain, in your name',
      rest: "Bought on your card so it belongs to you. If you ever decide you are done with me, the site and the domain leave with you and nothing has to be negotiated.",
    },
  ],
};

/**
 * `href` is optional and only the middle item carries one, so the array needs
 * an explicit type — without it TypeScript infers a union of two object shapes
 * and `item.href` stops type-checking on the rows that do not have one.
 */
const LIMITS: {
  h2: string;
  items: readonly { h3: string; p: string; href?: string; hrefLabel?: string }[];
  close: string;
} = {
  h2: 'What a website cannot do for you.',
  items: [
    {
      h3: 'It cannot make anybody want your food.',
      p: 'That part is yours and it always was. Everything above is about not losing the people who already decided.',
    },
    {
      h3: 'It cannot fix your Google listing.',
      p: 'They are two different things and most people find you through the listing first. That is its own job and its own page.',
      href: '/google-business-profile',
      hrefLabel: 'the listing, and what it actually controls',
    },
    {
      h3: 'It cannot be finished once and left.',
      p: 'Prices move, the special changes, you close for a week in July. A site that was right in March and wrong ever since is the same problem as no site, just quieter about it.',
    },
  ],
  close: "I am in Marietta and I work across metro Atlanta. A build starts with me coming out, because I cannot photograph your room or read the handwriting on your specials board over email, and the visit is where half the decisions above get made.",
};

const CLOSE = 'Text me your business name and I will run all ten of those on your site tonight.';

export default function RestaurantWebsitesPage() {
  return (
    <ServicePage
      slug="restaurant-websites"
      label={HEAD.label}
      h1={HEAD.h1}
      stand={HEAD.stand}
      close={CLOSE}
    >
      {/* ── The opener — prose, no label ─────────────────────────────────
          The two sections after it are both label / h2 / rule / list, so this
          one runs as somebody talking rather than as a third labelled block. */}
      <section aria-label="What the job actually is">
        <div className={`${SHELL} eb-sec`}>
          <p className="eb-lede">{OPENER.lede}</p>
          <div className="eb-mt">
            {OPENER.paras.map((p) => (
              <p key={p} className="eb-p">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>
      <Rule />

      {/* ── The ten checks ───────────────────────────────────────────────
          ⚠️ role="list" AND A VISIBLE, UNHIDDEN NUMERAL. `list-style:none`
          makes Safari and VoiceOver drop list semantics, so role="list" puts
          them back; and the numerals are not aria-hidden, so a screen-reader
          user gets the count the heading just promised him. Same rule as the
          homepage's five checks — do not hide these. */}
      <section>
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label="The checks" />
          <h2 className="eb-d eb-h2">Ten things I measure, and the line I measure them against.</h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          <ol className="sv-list" role="list">
            {CHECKS.map((c) => (
              <li key={c.n} className="sv-item">
                <span className="sv-n eb-mono">{c.n}</span>
                <div className="sv-body">
                  <h3 className="eb-h3">{c.h3}</h3>
                  <p className="eb-p">{c.p}</p>
                  <p className="sv-do eb-mono">
                    <span className="sv-do-k">The line: </span>
                    {c.line}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Rule />

      {/* ── What I skip, on the cream field ──────────────────────────────
          Bone carries body copy safely (rich on bone is about 13:1). It is the
          one light ground on this page and it goes under the section that
          argues against my own tool, not under the section that sells. */}
      <section className="eb-g-bone">
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={NOT_CHECKED.label} />
          <h2 className="eb-d eb-h2">{NOT_CHECKED.h2}</h2>
          {NOT_CHECKED.items.map((item) => (
            <div key={item.h3} className="sv-block">
              <h3 className="eb-h3">{item.h3}</h3>
              <p className="eb-p">{item.p}</p>
            </div>
          ))}
        </div>
      </section>
      <Rule />

      {/* ── What I build ─────────────────────────────────────────────────── */}
      <section>
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={BUILD.label} />
          <h2 className="eb-d eb-h2">{BUILD.h2}</h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          <p className="eb-stand">{BUILD.stand}</p>
          <ul className="sv-rows" role="list">
            {BUILD.rows.map((r) => (
              <li key={r.lead} className="sv-row">
                <span className="sv-row-l">{r.lead}</span>
                <span className="sv-row-r">{r.rest}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Rule />

      {/* ── The limits ───────────────────────────────────────────────────── */}
      <section>
        <div className={`${SHELL} eb-sec`}>
          <h2 className="eb-d eb-h2">{LIMITS.h2}</h2>
          <div className="eb-mt">
            {LIMITS.items.map((item) => (
              <div key={item.h3} className="sv-block">
                <h3 className="eb-h3">{item.h3}</h3>
                <p className="eb-p">
                  {item.p}
                  {item.href ? (
                    <>
                      {' '}
                      <Link className="sv-a" href={item.href}>
                        {item.hrefLabel}
                      </Link>
                      .
                    </>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
          <p className="eb-p eb-mt">{LIMITS.close}</p>
        </div>
      </section>
      <Rule />
    </ServicePage>
  );
}
