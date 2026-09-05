import type { Metadata } from 'next';

import { Rule, SHELL, LedgerHead } from '@/components/site';
import { ServicePage, serviceMetadata } from '@/components/service';
import { DEMO_LINE, DEMO_LINE_PRETTY } from '@/config/brand';

/**
 * /ai-phone-answering — what it does, what it cannot do, and what it costs to
 * keep running.
 *
 * ── THE SHAPE OF THIS PAGE IS THE ARGUMENT ────────────────────────────────
 *
 * Every other page about AI phone agents on the internet is a capability list.
 * This one spends more words on the limits than on the capabilities, on purpose,
 * because the limits are the part an owner cannot find anywhere else and the
 * capabilities are the part he will not believe from a stranger anyway. If a
 * future edit balances the two sections out, the page loses the only thing that
 * makes it worth reading.
 *
 * ⚠️ THE DEMO LINE IS NOT THE CALL TO ACTION AND MUST NOT BECOME ONE. It sits
 * in a note near the foot of the page with an explicit "if it does not pick up,
 * it is switched off rather than broken" beside it, because nobody has
 * confirmed today that the Vapi line is still answering. A page whose main ask
 * is "call this number" dies silently the day that number stops answering, and
 * the visitor's conclusion is not "the demo lapsed", it is "this guy is fake".
 * The ask on this page is the same as every other page on the site: the free
 * report, or a text.
 *
 * ── SOURCES ───────────────────────────────────────────────────────────────
 *
 * knowledge/ai-services/restaurant-ai-voice-agents.md — the architecture note
 * behind four independent builds. Specifically: the knowledge base is what the
 * agent answers FAQs from; a booking is located by name + phone + datetime
 * rather than by a reservation ID the agent will mis-hear; handover rules for
 * the calls it should not take; recorded and transcribed calls.
 *
 * ⚠️ THAT FILE'S "MARKET CONTEXT / STATS" BLOCK IS NOT USED HERE AND MUST NOT
 * BE. "Restaurants get 30-100+ calls a day", "cut labor ~17%", "79% of
 * restaurants use some AI, 34% use voice" are second-hand YouTube figures with
 * no primary source attached. Every number on this site has to be checkable by
 * the owner reading it, and none of those are. The only figure on this page is
 * the demo phone number.
 *
 * The per-minute running cost is stated as a fact of the category without a
 * rate attached, deliberately: voice platforms bill per minute and that is
 * published, but the actual number depends on the platform, the model and the
 * telephony, and quoting one here would be inventing a price.
 */

export const metadata: Metadata = serviceMetadata({
  slug: 'ai-phone-answering',
  title: 'AI phone answering for restaurants — foundos',
  description:
    'What an AI phone line does on a real call, what it gets wrong, what it costs to run, and how to catch its mistakes in the first week.',
  shareTitle: 'AI phone answering for restaurants',
  shareDescription:
    'What an AI phone line does on a real call, what it gets wrong, and how to catch its mistakes in the first week.',
});

/* ── copy ───────────────────────────────────────────────────────────────── */

const HEAD = {
  label: 'AI phone',
  h1: 'A line that answers while your hands are full.',
  stand: 'It picks up on the first ring, on four calls at once, at ten past eleven. It also gets things wrong, and this page spends more words on that half than on the first one.',
};

const WHAT = {
  lede: 'Take the word AI off it and here is what you are actually buying.',
  paras: [
    'A phone number. When somebody rings it, something picks up straight away and talks. It has been given your menu and your prices, your hours for every day of the week, the holidays you close, which location has the parking, whether you take reservations, and what is in the sauce. It listens, it answers, it writes down what it heard, and it sends that where your orders already go.',
    'It does not get tired at nine on a Friday. It does not put anybody on hold while it goes to ask somebody else. It can be on four calls at the same time and none of those callers knows about the other three.',
    'That is the whole of it. Everything below is a qualification.',
  ],
};

const CALL = {
  label: 'On a real call',
  h2: 'What it does while the phone is ringing and you are plating.',
  rows: [
    {
      lead: 'The questions you answer forty times a day',
      rest: 'What time do you close, where exactly are you, is there parking, do you have anything without pork, are you doing lunch today. All of it is in front of it in writing before it ever picks up.',
    },
    {
      lead: 'A pickup order',
      rest: 'Items, add-ons, the name, the time. It reads the whole thing back before it commits to it, and then it goes where your tickets already print.',
    },
    {
      lead: 'A catering enquiry',
      rest: 'The date, the headcount, roughly what they want and a number to call back on. That is the biggest ticket of your month and it is the one most likely to ring out at four on a Tuesday.',
    },
    {
      lead: 'A table, if you seat people',
      rest: "It checks what is free, books it, and can move or cancel it later. It finds an existing booking by the name, the number and the time — never by reading a reservation code back to somebody driving.",
    },
    {
      lead: 'The calls it should not touch',
      rest: 'A complaint, a refund, a wedding, anything nobody told it about. Those go to a person, and deciding exactly where that line sits is part of the build rather than something discovered later.',
    },
    {
      lead: 'A written record of all of it',
      rest: 'Every call recorded and transcribed, so you can read what was actually said instead of arguing about what was probably said.',
    },
  ],
};

const KNOWS = {
  label: 'How it knows anything',
  h2: 'It cannot guess, and it should never be allowed to try.',
  paras: [
    'Everything it knows, a person typed. The menu with the prices, the sides, the sauces and what comes with what. The hours for all seven days and the holidays you close. Both locations and which one is easier to park at. Whether you do gluten free and what you actually mean by that. What happens when a party of eight calls.',
    'This is the unglamorous half of the build and it is the half that decides whether the thing is any good. An agent that has been told nothing still answers, and it answers confidently. That is worse than a busy signal, because a busy signal has never quoted anybody the wrong price.',
    'It also means that the day something changes, somebody has to tell it. New special, chicken up fifty cents, closed Monday for a funeral. That is a large part of what a monthly is actually for. If you would rather do it yourself, I will show you where it lives and you can.',
  ],
};

/**
 * ⚠️ THE SECTION THE PAGE EXISTS FOR. Seven limits, and the last two are the
 * ones nobody else writes down: it costs money by the minute, and answering
 * every call means the kitchen gets handed more tickets than it had before.
 * Both are arguments against buying, printed on the page selling it, and they
 * are why the rest of the page is believable. Do not trim this to make room.
 */
const CANNOT = {
  h2: 'What it cannot do.',
  stand: 'Seven of these. Two of them are reasons not to buy it.',
  items: [
    {
      h3: 'It tells people it is AI.',
      p: 'It says so out loud. I am not interested in building a robot that pretends to be your niece, and your customer is not interested in finding out thirty seconds in that it was.',
    },
    {
      h3: 'It mishears.',
      p: 'Long strings of numbers most of all, which is exactly why a booking gets found by a name and a phone number and a time instead of by a code read back to somebody who is driving. A bad line, a loud dining room, an accent it has not heard much of — all of that is the same problem you already have on that phone, and it is not immune to any of it.',
    },
    {
      h3: 'It cannot fix anything.',
      p: 'It cannot comp a meal, remake an order or calm somebody down who is genuinely angry. Those calls need a person, and the line should be handing them over quickly rather than having a go.',
    },
    {
      h3: 'It only knows what it was told.',
      p: 'If nobody updated it, it will answer wrongly and it will sound completely certain doing it. That is the failure to watch for. It is not silence, it is confidence.',
    },
    {
      h3: 'It is not a member of staff.',
      p: 'It cannot go and look, walk to the back, check whether the tray came out, or tell you that the man who called on Tuesday sounded upset. It handles the shape of call that repeats, which is most of them, and nothing outside that shape.',
    },
    {
      h3: 'It costs money every minute it is talking.',
      p: 'Voice lines bill by the minute. That is a running cost rather than a build cost, which is why it lives in the monthly and not in the one-time number, and a line taking a lot of long calls costs more to run than one taking a few short ones. You should hear that from me before you sign anything rather than off a statement in month three.',
    },
    {
      h3: 'It will hand your kitchen more tickets.',
      p: 'A phone that answers every call during a rush is a phone that takes orders you were previously missing. That is the point of it. It is also the thing to think about honestly before you switch it on, because the bottleneck moves to the pass and nothing here makes food faster.',
    },
  ],
};

const CHECKING = {
  label: 'How you check it',
  h2: 'Catch it in week one. Do not start trusting it in week six.',
  stand: 'It is a thing that talks to your customers when you are not listening, so the first fortnight matters more than the build did.',
  steps: [
    {
      n: '01',
      h3: 'Call it yourself and try to break it.',
      p: 'Order something that is not on the menu. Ask for a table for twelve. Talk over it. Whatever you can think of to do to it, somebody will do to it by Friday, and it is better that you find it first.',
    },
    {
      n: '02',
      h3: 'Read the transcripts.',
      p: 'Every call is written down. Ten minutes with them on a Sunday will tell you more about the line than any dashboard, and it is where you will see the one question it keeps fumbling.',
    },
    {
      n: '03',
      h3: 'Keep your own number in play.',
      p: 'This is a line that answers when nobody can, not a wall put up in front of you. Anybody who wants a person should be able to get one, and that route should never be hidden.',
    },
    {
      n: '04',
      h3: 'Tell me what it got wrong.',
      p: 'Most fixes are one sentence added to what it knows and take a few minutes. The ones that are not, I will tell you are not.',
    },
  ],
};

/**
 * ⚠️ THE DEMO LINE, AND THE CAVEAT IS THE POINT OF THE BLOCK. It is a demo
 * rather than a service line, and the copy says outright that a line which does
 * not answer is switched off rather than broken. That sentence is what keeps a
 * lapsed demo from reading as a lie. Do not remove it, and do not promote this
 * number to a button.
 */
const DEMO = {
  lead: 'There is a line you can call.',
  before:
    'I keep one running so people can hear one rather than read about one. Order a slab of ribs out loud and it will take the order, and tell you it is AI while it does. The number is',
  after:
    'It is a demo and not a service line, so if it does not pick up it is switched off rather than broken — text me and I will put it back up. Either way, do not decide anything about your own phone on the strength of whether a demo answered on a Tuesday.',
};

const AREA =
  'I work across metro Atlanta out of Marietta. For this one the visit matters more than usual — an hour standing next to your phone during a rush tells me which calls you are actually losing, and that is what the line gets built around.';

const CLOSE = 'Tell me how many calls you miss on a Friday and I will tell you whether this is worth it.';

export default function AiPhoneAnsweringPage() {
  return (
    <ServicePage
      slug="ai-phone-answering"
      label={HEAD.label}
      h1={HEAD.h1}
      stand={HEAD.stand}
      close={CLOSE}
    >
      {/* ── What it is — prose, no label ─────────────────────────────────── */}
      <section aria-label="What it is">
        <div className={`${SHELL} eb-sec`}>
          <p className="eb-lede">{WHAT.lede}</p>
          <div className="eb-mt">
            {WHAT.paras.map((p) => (
              <p key={p} className="eb-p">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>
      <Rule />

      {/* ── On a real call ───────────────────────────────────────────────── */}
      <section>
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={CALL.label} />
          <h2 className="eb-d eb-h2">{CALL.h2}</h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          <ul className="sv-rows" role="list">
            {CALL.rows.map((r) => (
              <li key={r.lead} className="sv-row">
                <span className="sv-row-l">{r.lead}</span>
                <span className="sv-row-r">{r.rest}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Rule />

      {/* ── How it knows anything ────────────────────────────────────────── */}
      <section>
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={KNOWS.label} />
          <h2 className="eb-d eb-h2">{KNOWS.h2}</h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          {KNOWS.paras.map((p) => (
            <p key={p} className="eb-p">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ── What it cannot do, on the cream field ────────────────────────
          The one light ground on the page, and it belongs to the honest
          section rather than to a sales one. Bone carries body copy safely;
          ember and wood do not, which is the constraint that decided this. */}
      <Rule />
      <section className="eb-g-bone">
        <div className={`${SHELL} eb-sec`}>
          <h2 className="eb-d eb-h2">{CANNOT.h2}</h2>
          <p className="eb-stand eb-stand--flush">{CANNOT.stand}</p>
          {CANNOT.items.map((item) => (
            <div key={item.h3} className="sv-block">
              <h3 className="eb-h3">{item.h3}</h3>
              <p className="eb-p">{item.p}</p>
            </div>
          ))}
        </div>
      </section>
      <Rule />

      {/* ── The first fortnight ──────────────────────────────────────────
          ⚠️ role="list" and unhidden numerals — `list-style:none` makes Safari
          and VoiceOver drop list semantics, and a hidden numeral leaves a
          screen-reader user with an uncounted run of paragraphs. */}
      <section>
        <div className={`${SHELL} eb-sec`}>
          <LedgerHead label={CHECKING.label} />
          <h2 className="eb-d eb-h2">{CHECKING.h2}</h2>
        </div>
        <Rule />
        <div className={`${SHELL} eb-sec--after-rule`}>
          <p className="eb-stand">{CHECKING.stand}</p>
          <ol className="sv-list" role="list">
            {CHECKING.steps.map((s) => (
              <li key={s.n} className="sv-item">
                <span className="sv-n eb-mono">{s.n}</span>
                <div className="sv-body">
                  <h3 className="eb-h3">{s.h3}</h3>
                  <p className="eb-p">{s.p}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* The demo line. A note, not a call to action — see the constant. */}
          <div className="sv-note">
            <p className="sv-note-p">{DEMO.lead}</p>
            <p className="eb-p">
              {DEMO.before}{' '}
              <a className="sv-a eb-num" href={`tel:${DEMO_LINE}`}>
                {DEMO_LINE_PRETTY}
              </a>
              . {DEMO.after}
            </p>
          </div>

          <p className="eb-p eb-mt">{AREA}</p>
        </div>
      </section>
      <Rule />
    </ServicePage>
  );
}
