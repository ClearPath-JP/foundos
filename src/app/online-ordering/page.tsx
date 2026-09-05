import type { Metadata } from 'next';

import { Rule, SHELL, LedgerHead } from '@/components/site';
import { ServicePage, serviceMetadata } from '@/components/service';

/**
 * /online-ordering — the strongest of the four, because the material behind it
 * is the deepest thing on this site.
 *
 * ── WHERE EVERY NUMBER ON THIS PAGE COMES FROM ────────────────────────────
 *
 * There are seven figures here and not one of them is decoration. A reader can
 * check all seven, which is the only reason the page is allowed to use any:
 *
 *   $18 / $24        a hypothetical plate, labelled as one. Not anybody's books.
 *   30% / 15%        the published range of US marketplace commission plans.
 *                    DoorDash publishes three partnership tiers; the range is
 *                    also in reference_market_pricing.md as verified-and-safe.
 *   $16.80 / $20.40  arithmetic. 24 x .70 and 24 x .85.
 *   $1.20 / $2.40    arithmetic. 18 - 16.80 and 20.40 - 18.
 *   2.9% + 30c       Stripe's published US online card rate, and the page tells
 *                    the reader to go and check it rather than take it here.
 *   $17.18           arithmetic. 18 - (18 x .029 + .30) = 17.178.
 *   38c              arithmetic. 17.18 - 16.80.
 *
 * ⚠️ THE HOMEPAGE MAKES THE SAME ARGUMENT AND THIS PAGE DOES NOT REPEAT ITS
 * SENTENCES. Every paragraph here is written fresh. That is not politeness
 * about copy — two URLs on one domain carrying the same 400 words is the
 * duplicate-content problem, and the fix is not a canonical tag, it is writing
 * the second one properly. This page also goes somewhere the homepage does not:
 * the card-processing side of the comparison, the eight operational things an
 * order page has to do, the consent rule on the text list, and the five things
 * it will not do. If a future edit finds itself pasting from page.tsx, the
 * right move is to cut this page instead.
 *
 * ⚠️ THE WORD "STEALING" DOES NOT APPEAR AND MUST NOT. The apps are not the
 * villain here: the markup is called the sensible move, the commission is a
 * published rate the owner agreed to, and the last section tells him to keep
 * the apps for what they are good at. Naming a villain loses the room — it is
 * flagged in the source content file and in Josh's own notes as the single
 * framing that costs him the conversation.
 */

export const metadata: Metadata = serviceMetadata({
  slug: 'online-ordering',
  title: 'Online ordering on your own site — foundos',
  description:
    'The app markup raises the commission with it. Here is the arithmetic on an $18 plate, and what an order page of your own has to do to be worth building.',
  shareTitle: 'Online ordering on your own site',
  shareDescription:
    'The app markup raises the commission with it. The arithmetic on an $18 plate, and what an order page of your own has to do.',
});

/* ── copy ─────────────────────────────────────────────────────────────────
   Held in constants, not inline in JSX, for the reason the homepage's copy is:
   an apostrophe inside JSX text has to be escaped, and the cheapest way to dodge
   that is to expand the contraction — "you're" becomes "you are". Do it six
   times and the page stops sounding like a person. In a plain string nothing
   needs escaping, so what is below is exactly what ships. */

const HEAD = {
  label: 'Online ordering',
  h1: 'Take the order on your own site, at your own prices.',
  stand: 'The apps are the cheapest way to meet somebody who has never heard of you. They are an expensive way to serve the people who already know your name. This page is about that second lane, and what it has to do to be worth building.',
};

const MARKUP = {
  label: 'The bit that surprises people',
  h2: 'Marking the plate up raises the fee with it.',
  paras: [
    'You already know the apps take a cut. Most owners have done the sensible thing about it and raised the price on the app so the cut comes out of the order instead of out of the kitchen. Nothing wrong with that. It is the obvious move and I would make it too.',
    'Here is the part that catches people. The commission is charged on the subtotal as it appears on the app, and that subtotal is the price you raised. The markup does not sit outside the fee. It sits inside it, and it drags the fee up along with it.',
    'So the same markup can be a win or a loss, and which one it is comes down to a single number you agreed to when you signed up and have probably not looked at since.',
  ],
};

/** The four figures the band turns on, set as a ledger above the argument. */
const FIGURES = [
  { k: 'Your counter price', v: '$18' },
  { k: 'What you list on the app', v: '$24' },
  { k: 'What you keep at 30%', v: '$16.80' },
  { k: 'What you keep at 15%', v: '$20.40' },
] as const;

const MATH = [
  'An eighteen dollar plate, listed at twenty-four to cover the cut. On a thirty percent plan the app keeps $7.20 and hands you $16.80. Your customer paid six dollars over your counter price and you finished a dollar twenty under it.',
  'Same plate, same markup, fifteen percent plan. The app keeps $3.60, you keep $20.40, and now you are $2.40 ahead. The markup did the job you built it to do.',
  "Nothing changed but the rate. The published plans run from about fifteen percent up to about thirty, so the one you are on decides whether your markup is working or quietly running backwards. Open the merchant portal and find yours before you believe my arithmetic or anybody else's.",
] as const;

/**
 * The other lane, run on the same plate.
 *
 * ⚠️ THE CARD FEE IS IN HERE ON PURPOSE AND MUST STAY. Comparing a commission
 * against zero would be a lie by omission — taking a card costs money on your
 * own site too, and an owner who finds that out after the fact stops believing
 * the rest of the page. Naming the published rate and then telling him to go
 * and check it is the only version of this paragraph that survives being
 * fact-checked in front of him.
 */
const LANE = {
  lede: 'Now run the same plate down the other lane.',
  paras: [
    "On your own site the eighteen dollar plate is eighteen dollars, because there is no cut to cover. You still pay to take a card, and I am not going to hide that. Processors publish their rates — Stripe's standard US online card rate is 2.9% plus thirty cents, which on eighteen dollars is about eighty-two cents. Go and check the current number with whoever would be processing yours. Processors move it and I do not watch it for you.",
    'So it comes out like this. Sixteen eighty in your hand on the thirty percent plan, off a ticket your customer paid twenty-four dollars for. Or seventeen eighteen in your hand, off a ticket your customer paid eighteen dollars for. Same plate, same kitchen, same Friday night.',
  ],
  strong: 'The customer paid six dollars less and you kept thirty-eight cents more.',
  tail: 'That gap is the obvious argument for taking your own orders, and it is not the biggest one. The biggest one is further down this page and it has nothing to do with the money on the night.',
};

const SYSTEM = {
  label: 'What it has to do',
  h2: 'An order button is not an ordering system.',
  stand: 'This is what I go through before I build one, and most of it has nothing to do with the customer. It is about the twenty minutes on a Friday when everything goes wrong at once.',
  /**
   * ⚠️ ONE GRAMMAR, EIGHT LENGTHS. Left column is a short noun phrase or clause,
   * right column is complete sentences — the homepage learned the hard way that
   * a lower-case fragment sitting alone in the right column of a two-column grid
   * reads as text that broke rather than as a continuation. The anti-template
   * job is carried by LENGTH instead: these run 26 / 22 / 38 / 27 / 20 / 32 /
   * 27 / 21 words. Evening them out puts the tell back.
   */
  rows: [
    {
      lead: 'It reaches the kitchen',
      rest: 'A thermal printer on the pass, a screen by the phone, or both. If your cooks have to learn something new in the middle of a rush, it has already lost.',
    },
    {
      lead: 'You accept it, and you set the time',
      rest: 'The customer gets twenty-five minutes instead of silence, and you get a second to look at the board before you commit to it.',
    },
    {
      lead: 'You can turn it off',
      rest: 'One tap pauses ordering when the kitchen is buried, and the page says so instead of quietly taking food you cannot cook. It is the first thing an owner asks me about and the last thing most order buttons have.',
    },
    {
      lead: 'You can sell out of something',
      rest: 'One tap marks an item gone until tomorrow, gone until you say otherwise, or off the menu entirely. Without that, the site keeps selling the thing you ran out of at seven.',
    },
    {
      lead: 'The menu knows what time it is',
      rest: 'Lunch that appears at eleven and goes away at three. A weekend section. A catering list that only exists where somebody asked about catering.',
    },
    {
      lead: 'It takes money the way people pay',
      rest: "Card, Apple Pay, Google Pay, and a tip line if you take tips. It pays out to your account on your processor's normal schedule. Your account, in your name, and it stays yours the day you decide you are done with me.",
    },
    {
      lead: 'It can hold an order for Saturday',
      rest: 'The catering order somebody places on a Tuesday for the weekend is the biggest ticket of your week, and it is the exact one a plain order button cannot take.',
    },
    {
      lead: "The ticket reads at arm's length",
      rest: 'Items, add-ons, and a line for whoever bags it to check against. Every wrong bag is a review you have to work back off later.',
    },
  ],
  tail: 'None of that is clever. It is the difference between a button that takes orders and something that survives a Saturday.',
};

const KEEP = {
  label: 'The part you keep',
  h2: 'The order arrives with a phone number on it.',
  paras: [
    'On a delivery order you get a first name and a masked number that stops working once the driver is gone. No email. Nothing you can text on a slow Tuesday.',
    'An order placed on your own site arrives with a name, a number, an email if they gave you one, and a record of what they ordered and when. That is not a marketing feature. It is the difference between a customer and a transaction, and it is the one thing you cannot buy back later at any price.',
    'What it lets you do is small and boring and it works. The message that goes to somebody who used to order every week and has not ordered in six. The review ask that goes out while they are still happy rather than three days later. The note about Saturday that reaches two hundred people who have already handed you money once.',
  ],
  /**
   * ⚠️ THIS NOTE IS NOT A DISCLAIMER AND IT IS NOT OPTIONAL. Consent has to be
   * collected at checkout on day one — it cannot be applied backwards to a list
   * already built — so an owner who is not told this at the start ends up a year
   * later with a list he cannot legally use. Saying it here, unprompted, before
   * he has paid anybody, is worth more than the section above it.
   */
  note: {
    lead: 'One thing about that list, and it is not optional.',
    para: 'You can only text people who agreed to be texted. That is not me being careful, it is the law, and the box that gets you the permission has to be on the checkout page from the first day. Permission cannot be added backwards to a list you already built. It costs nothing to do it right at the start and it cannot be repaired later.',
  },
};

/**
 * ⚠️ THE HONEST SECTION, AND IT IS THE REASON THE REST OF THE PAGE IS
 * BELIEVABLE. Five limits, and the fifth one — that the maths does not work at
 * low volume — is an argument against buying, printed on the page selling it.
 * Do not soften it, do not move it above the arithmetic, and do not cut it to
 * tighten the page. A reader who has been told when NOT to hire somebody will
 * believe that person about everything else.
 */
const LIMITS = {
  h2: 'What it will not do.',
  stand: 'Five of these, and one of them is a reason to wait.',
  items: [
    {
      h3: 'It will not introduce you to anybody.',
      p: 'The apps are genuinely good at putting your photo in front of a stranger at nine at night, and I am not going to tell you to drop them. Keep them for exactly that. This is the other lane, for the people who already know your name.',
    },
    {
      h3: 'It will not be busy on the first Friday.',
      p: 'A new order page is a door, not a crowd. What fills it is the sign on the counter, the card in the bag, the text to the list, and you telling people on the phone that there is a faster way now. Skip that part and you have paid for a door nobody knows about.',
    },
    {
      h3: 'It does not deliver.',
      p: 'If delivery matters to you, somebody still has to drive. Either that is you, or you keep an app switched on for delivery and take your own pickup orders alongside it. That is a normal answer and plenty of places land on it.',
    },
    {
      h3: 'It will not rescue food nobody is asking for.',
      p: 'A faster checkout on a menu people are not ordering is a faster checkout. Nothing on this page is a substitute for the part you are actually good at.',
    },
    {
      h3: 'It costs something every month to keep running.',
      p: 'Hosting, the card fees, my monthly. If you are doing four online orders a week, the commission you save does not cover that yet. I would rather say so now than after you have paid me — and if that is your situation, I will tell you on the phone and tell you what to fix first instead.',
    },
  ],
  close: 'I am in Marietta and I drive out. I would rather stand in a kitchen through one service and watch how the orders actually arrive than design an ordering system off a phone call, and that visit is where most of the list above gets decided.',
};

const CLOSE = 'Tell me how your orders come in now and I will tell you whether this is worth doing.';

export default function OnlineOrderingPage() {
  return (
    <ServicePage
      slug="online-ordering"
      label={HEAD.label}
      h1={HEAD.h1}
      stand={HEAD.stand}
      close={CLOSE}
    >
      {/* ── The markup argument ─────────────────────────────────────────── */}
      <section>
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={MARKUP.label} />
          <h2 className="eb-d eb-h2">{MARKUP.h2}</h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          {MARKUP.paras.map((p) => (
            <p key={p} className="eb-p">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ── The arithmetic, on the wood field ────────────────────────────
          ⚠️ NOTHING IN THIS BAND MAY DROP BELOW 19px/700. Ink on wood is
          4.24:1 — legal for WCAG large-scale text, illegal for body text. The
          ledger goes first because four figures in a table are one glance and
          the same four inside 120 words of prose are a memory test on a phone;
          the paragraphs stay because the table cannot carry the argument. No
          mono in the paragraphs: mono is a texture here, not something anybody
          has to read a sentence in. */}
      <Rule />
      <section aria-label="Worked example" className="eb-g-wood">
        <div className={`${SHELL} sv-math`}>
          <dl className="sv-figs">
            {FIGURES.map((f) => (
              <div key={f.k} className="sv-fig">
                <dt className="sv-fig-k">{f.k}</dt>
                <dd className="sv-fig-v">{f.v}</dd>
              </div>
            ))}
          </dl>
          {MATH.map((p) => (
            <p key={p} className="sv-math-p">
              {p}
            </p>
          ))}
        </div>
      </section>
      <Rule />

      {/* ── The other lane ───────────────────────────────────────────────
          Runs as prose with no label and no heading. The three sections
          around it are label / h2 / rule / list, and a fourth one here would
          turn the page into texture instead of chapters. */}
      <section aria-label="The same plate on your own site">
        <div className={`${SHELL} eb-sec--after-rule`}>
          <p className="eb-lede">{LANE.lede}</p>
          <div className="eb-mt">
            {LANE.paras.map((p) => (
              <p key={p} className="eb-p">
                {p}
              </p>
            ))}
          </div>
          <p className="eb-lede eb-lede--strong eb-mt">{LANE.strong}</p>
          <p className="eb-p eb-mt">{LANE.tail}</p>
        </div>
      </section>
      <Rule />

      {/* ── What an order page has to do ─────────────────────────────────── */}
      <section>
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={SYSTEM.label} />
          <h2 className="eb-d eb-h2">{SYSTEM.h2}</h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          <p className="eb-stand">{SYSTEM.stand}</p>
          <ul className="sv-rows" role="list">
            {SYSTEM.rows.map((r) => (
              <li key={r.lead} className="sv-row">
                <span className="sv-row-l">{r.lead}</span>
                <span className="sv-row-r">{r.rest}</span>
              </li>
            ))}
          </ul>
          <p className="eb-lede eb-lede--strong eb-mt">{SYSTEM.tail}</p>
        </div>
      </section>
      <Rule />

      {/* ── The phone number ─────────────────────────────────────────────── */}
      <section>
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={KEEP.label} />
          <h2 className="eb-d eb-h2">{KEEP.h2}</h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          {KEEP.paras.map((p) => (
            <p key={p} className="eb-p">
              {p}
            </p>
          ))}
          <div className="sv-note">
            <p className="sv-note-p">{KEEP.note.lead}</p>
            <p className="eb-p">{KEEP.note.para}</p>
          </div>
        </div>
      </section>

      {/* ── The limits, on the cream field ───────────────────────────────
          The one light ground on this page, and it is under the section that
          argues against buying. Bone carries body copy safely (rich on bone is
          about 13:1); ember and wood do not, which is why the honest section
          gets the paper and the arithmetic gets the band. */}
      <Rule />
      <section className="eb-g-bone">
        <div className={`${SHELL} eb-sec`}>
          <h2 className="eb-d eb-h2">{LIMITS.h2}</h2>
          <p className="eb-stand eb-stand--flush">{LIMITS.stand}</p>
          {LIMITS.items.map((item) => (
            <div key={item.h3} className="sv-block">
              <h3 className="eb-h3">{item.h3}</h3>
              <p className="eb-p">{item.p}</p>
            </div>
          ))}
          <p className="eb-p eb-mt">{LIMITS.close}</p>
        </div>
      </section>
      <Rule />
    </ServicePage>
  );
}
