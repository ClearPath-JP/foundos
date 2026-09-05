import type { Metadata } from 'next';

import { Rule, SHELL, LedgerHead } from '@/components/site';
import { ServicePage, serviceMetadata } from '@/components/service';

/**
 * /google-business-profile — hours, photos, categories, reviews.
 *
 * ── SOURCES, AND WHAT WAS LEFT OUT OF THEM ────────────────────────────────
 *
 * The field list and the checks come from two places, and the split matters:
 *
 *   src/lib/report/findings.ts — the listing-side findings the instant report
 *   really produces: no_hours, low_rating (LOW_RATING = 4.3), few_reviews
 *   (LOW_REVIEWS = 25), listing_flags_missing, not_reservable, no_website. The
 *   two thresholds are quoted here AS HIS OWN LINES, not as research, because
 *   that is exactly what they are — constants he chose in his own code.
 *
 *   PlaceFacts in src/lib/report/types.ts — takeout, delivery, dineIn,
 *   reservable, curbsidePickup, each of which is `boolean | null`, with the
 *   comment "null means Google did not report it, which is not the same as
 *   false". That distinction is the most useful sentence on this page and it
 *   comes straight off the type.
 *
 *   knowledge/local-marketing/ — google-maps-seo-7-tricks-tim-richard.md and
 *   local-seo-2026-sterling-sky.md, for the field-by-field mechanics: the
 *   primary category as the biggest controllable lever, checking what the
 *   businesses ranking above you are filed under, review recency mattering
 *   rather than only volume, pointing the website link at the page that
 *   matches the search.
 *
 * ⚠️ EVERY STATISTIC IN THOSE TWO NOTES IS DELIBERATELY ABSENT. "46% of Google
 * searches are local", "more than 50% click the map pack", "9-to-5 hours cost
 * you about 30% of business", the +54% / +40% / +89% traffic lifts — all of it
 * is second-hand YouTube sourcing with no primary citation, and the site's
 * standing rule is that a number has to be checkable by the owner reading it.
 * The two numbers on this page (4.3 and 25) survive only because they are
 * labelled as Josh's own thresholds and are in his own repo. Do not add a
 * third from a video.
 *
 * ⚠️ THE GEOTAGGING TRICK FROM THE TIM RICHARD NOTE IS ALSO ABSENT, ON
 * PURPOSE. Running photos through a geotagger before upload is widely repeated
 * and not something anybody here has evidence for. A page that tells owners to
 * do busywork on no evidence is spending the same credibility as a fake
 * statistic.
 *
 * ⚠️ RELEVANCE / DISTANCE / PROMINENCE IS GOOGLE'S OWN PUBLISHED LIST, from
 * its Business Profile help documentation on local ranking. It is quoted here
 * because it is first-party and checkable in thirty seconds, and because it is
 * the honest answer to "can you get me to number one".
 */

export const metadata: Metadata = serviceMetadata({
  slug: 'google-business-profile',
  title: 'Your Google listing, fixed — foundos',
  description:
    'Hours, categories, the attributes people filter on, photos and reviews — what each field actually does, and the ranking factor nobody can sell you.',
  shareTitle: 'Your Google listing, fixed',
  shareDescription:
    'What each field on a Google Business Profile actually does, and the one local ranking factor nobody can sell you.',
});

/* ── copy ───────────────────────────────────────────────────────────────── */

const HEAD = {
  label: 'Google listing',
  h1: 'For a lot of people, your listing is the whole visit.',
  stand: 'Name, stars, a photo, open or closed, a call button, directions. They never tap through to your website. Here is what is in that block, what each part of it does, and the one piece nobody can sell you.',
};

const WHY = {
  lede: 'Somebody two miles away searches for lunch on their phone.',
  paras: [
    'What comes back is a block with your name in it, a star rating, one photograph, the word Open or the word Closed, a button that calls you and a button that drives them to you. They can ring, drive over, or scroll straight past, and your website never enters into it. For that search, the listing is the storefront.',
    'It is also the piece almost everybody sets up once, in an afternoon, years ago, and has not opened since. That is the good news. Nearly everything wrong with a listing is free to fix, needs no code written, and can be done from a phone in the time it takes to drink a coffee.',
  ],
};

const FIELDS = {
  label: 'The fields',
  h2: 'What each part of it actually does.',
  rows: [
    {
      lead: 'The primary category',
      rest: 'One category, and it decides which searches you are eligible to turn up in at all. Pick the one that names what you actually are, then go and look at what the two places ranking above you are filed under.',
    },
    {
      lead: 'The other categories',
      rest: 'A short list, not everything you have ever sold. A profile claiming eleven categories mostly tells Google you are not sure what you are.',
    },
    {
      lead: 'Hours, and the holidays',
      rest: 'Wrong hours cost you twice. Somebody drives across town and finds the lights off, and somebody searching at nine at night never sees you at all because you dropped out of the open-now filter.',
    },
    {
      lead: 'The attributes',
      rest: 'Takeout, delivery, dine-in, curbside, reservable. These are not decoration, they are the filters people tap. My report reads them straight off your listing, and unset is not the same as no — unset means you get left out of both answers.',
    },
    {
      lead: 'Photos',
      rest: 'Yours, recent, of the food, of the room, and of the front of the building so somebody can recognise it from a moving car. Not the stock plate of pasta the template came with.',
    },
    {
      lead: 'The website link',
      rest: 'Point it at the page that answers the search. If people are finding you looking for catering, the catering page is a better landing than the front page is.',
    },
    {
      lead: 'The description',
      rest: 'Plain sentences about what you cook, where you are and what you are known for. It is not a keyword bin, and stuffing it reads to a customer exactly like stuffing it.',
    },
    {
      lead: 'Replies to reviews',
      rest: 'All of them, the bad ones especially, short and without arguing. It is the one part of a listing that future customers read as a personality test.',
    },
  ],
};

const REVIEWS = {
  label: 'Reviews',
  h2: 'The only thing that moves the number is new reviews.',
  paras: [
    'There is no other lever, and it is worth being blunt about that. You cannot have a review taken down because you disagree with it, and neither can anybody who offers to do it for money. Buying them breaks the rules, is detectable, and I will not do it. What is left is asking — at the moment somebody is happiest, which is not three days later in an email nobody opens.',
    'Two numbers from my own audit, and they are mine rather than research. Below about 4.3 stars I flag the rating, because that is roughly where people stop reading and scroll to the next result. Under twenty-five reviews I flag the count, because that is not enough weight to hold up beside a busier place two streets over. Those are the lines I chose. Somebody else would draw them somewhere slightly different and would not be wrong.',
    'Recency does as much work as the pile does. Forty reviews with the newest one from 2023 reads worse than fifteen with three from this month, to a person and probably to Google as well. A steady trickle beats one good push, which is why the ask has to be something that runs on its own rather than something you remember to do.',
  ],
};

/**
 * ⚠️ THE SECTION THAT MAKES THE PAGE WORTH TRUSTING. Four things nobody can
 * promise, printed on the page selling the service. The first is the important
 * one: distance is one third of Google's own published local ranking list and
 * it is not for sale, which is the honest answer to "can you get me to number
 * one" and the reason anybody offering a guaranteed ranking is worth walking
 * away from. Do not soften this into a benefits list.
 */
const LIMITS = {
  h2: 'What nobody can promise you.',
  items: [
    {
      h3: 'Distance is not for sale.',
      p: 'Google publishes what it weighs for local results: relevance, distance and prominence. You can move relevance by filling the profile in properly, and prominence by earning reviews and getting mentioned in real places. Nobody can move distance. Your restaurant cannot be made nearer to somebody standing four towns away, so anybody selling you a guaranteed number one is selling you the one of the three that was never for sale.',
    },
    {
      h3: 'There is no schedule.',
      p: 'Things change when Google decides they change. The work is an afternoon; whether it shows in a week or in two months is not up to me, and anybody who gives you a date for it is guessing at you.',
    },
    {
      h3: 'A correct listing gets you looked at, not chosen.',
      p: 'It puts you in the results with the right hours and a photograph that is actually yours. What happens next is your food, your prices and your reviews, and none of those are a settings screen.',
    },
    {
      h3: 'I cannot make a bad review disappear.',
      p: 'What I can do is set up the asking, so the bad one you already have stops being a fifth of your rating. That is arithmetic rather than a favour, and it takes months rather than a weekend.',
    },
  ],
};

/**
 * The five checks. Same device as the homepage's "Check it:" line and the ten
 * checks on /restaurant-websites: a thing to do, a reason, and a mono line
 * saying what you are looking for. Every one of the five is free, takes about a
 * minute, and does not involve me — which is the point of the section.
 */
const TONIGHT = {
  label: 'Five minutes tonight',
  h2: 'Do these on your own phone before you talk to anybody.',
  stand: 'Me included. All five are free and none of them need an account, a tool or a login you do not already have.',
  steps: [
    {
      n: '01',
      h3: 'Search your own name.',
      p: 'Not on your laptop, on your phone, and not while standing in your own dining room if you can help it. Look at the block that comes back the way a stranger would.',
      line: 'Are the hours right, and is the next holiday set?',
    },
    {
      n: '02',
      h3: 'Tap the website link.',
      p: 'Watch where it lands you. A lot of listings point at a page that was replaced two rebuilds ago, or at a homepage when the search was clearly about one thing.',
      line: 'Is that the page you would have chosen for that search?',
    },
    {
      n: '03',
      h3: 'Scroll the photos.',
      p: 'Go past the first three. Somewhere in there is usually a picture a customer took in 2019 of a dish you stopped making, and it is doing more work than anything you have uploaded.',
      line: 'How many are yours, and when was the newest one taken?',
    },
    {
      n: '04',
      h3: 'Read your last five reviews.',
      p: 'Not the rating, the reviews. Read them the way somebody deciding between you and the place next door would read them, which is quickly and looking for a reason to rule you out.',
      line: 'What is the date on the newest one, and did anybody reply?',
    },
    {
      n: '05',
      h3: 'Look at your primary category.',
      p: 'Then find the two places ranking above you for the search you care about and look at theirs. This is a two-minute job and it is the highest-leverage thing on this list.',
      line: 'Are you filed as the thing people are searching for?',
    },
  ],
};

const AREA =
  'Marietta is home and metro Atlanta is the patch. This is the one piece of the job I could do entirely from a laptop, and I would still rather come out — the photographs on a listing ought to be of your room on a day it looked like itself, and there is no way to take those over email.';

const CLOSE = 'Send me your business name and I will tell you what your listing is missing.';

export default function GoogleBusinessProfilePage() {
  return (
    <ServicePage
      slug="google-business-profile"
      label={HEAD.label}
      h1={HEAD.h1}
      stand={HEAD.stand}
      close={CLOSE}
    >
      {/* ── Why it matters — prose, no label ─────────────────────────────── */}
      <section aria-label="Why the listing matters">
        <div className={`${SHELL} eb-sec`}>
          <p className="eb-lede">{WHY.lede}</p>
          <div className="eb-mt">
            {WHY.paras.map((p) => (
              <p key={p} className="eb-p">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>
      <Rule />

      {/* ── The fields ───────────────────────────────────────────────────── */}
      <section>
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={FIELDS.label} />
          <h2 className="eb-d eb-h2">{FIELDS.h2}</h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          <ul className="sv-rows" role="list">
            {FIELDS.rows.map((r) => (
              <li key={r.lead} className="sv-row">
                <span className="sv-row-l">{r.lead}</span>
                <span className="sv-row-r">{r.rest}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Rule />

      {/* ── Reviews ──────────────────────────────────────────────────────── */}
      <section>
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={REVIEWS.label} />
          <h2 className="eb-d eb-h2">{REVIEWS.h2}</h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          {REVIEWS.paras.map((p) => (
            <p key={p} className="eb-p">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ── What nobody can promise, on the cream field ──────────────────
          The one light ground on this page, and it belongs to the section
          that argues against the whole category of promise this service gets
          sold with. Bone carries body copy safely; ember and wood do not. */}
      <Rule />
      <section className="eb-g-bone">
        <div className={`${SHELL} eb-sec`}>
          <h2 className="eb-d eb-h2">{LIMITS.h2}</h2>
          <div className="eb-mt">
            {LIMITS.items.map((item) => (
              <div key={item.h3} className="sv-block">
                <h3 className="eb-h3">{item.h3}</h3>
                <p className="eb-p">{item.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Rule />

      {/* ── Five minutes tonight ─────────────────────────────────────────
          ⚠️ role="list" and unhidden numerals, for the same two reasons as
          every other list on this site: `list-style:none` makes Safari and
          VoiceOver drop list semantics, and an aria-hidden numeral leaves a
          screen-reader user with an uncounted run of paragraphs underneath a
          heading that just promised five of something. */}
      <section>
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={TONIGHT.label} />
          <h2 className="eb-d eb-h2">{TONIGHT.h2}</h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          <p className="eb-stand">{TONIGHT.stand}</p>
          <ol className="sv-list" role="list">
            {TONIGHT.steps.map((s) => (
              <li key={s.n} className="sv-item">
                <span className="sv-n eb-mono">{s.n}</span>
                <div className="sv-body">
                  <h3 className="eb-h3">{s.h3}</h3>
                  <p className="eb-p">{s.p}</p>
                  <p className="sv-do eb-mono">
                    <span className="sv-do-k">Looking for: </span>
                    {s.line}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="eb-p eb-mt">{AREA}</p>
        </div>
      </section>
      <Rule />
    </ServicePage>
  );
}
