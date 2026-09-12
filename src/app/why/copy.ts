/**
 * The long argument that used to be the middle of the homepage — moved here
 * on 2026-09-11, when the homepage became the short front door.
 *
 * ⚠️ BYTE FOR BYTE WHAT JOSH WROTE, WITH THE NOTES THAT GUARD IT. Every
 * constant below was cut out of src/app/page.tsx by script, not retyped, and
 * its ⚠️ notes came with it. They still apply. The "§" numbers inside them
 * refer to the homepage's old section order; the rules they state do not
 * depend on it.
 *
 * One string changed, because moving it made it false: ADS.pointA said "The
 * report at the top of this page", and the report stayed on the homepage. It
 * now says so, and /why links it to /#report.
 */

export const PROBLEM = {
  lines: [
    'Your hours are wrong on Google.',
    'Your menu is a photo from three years ago.',
    'The phone rings while your hands are full.',
  ],
  strong: "So I build the part you don't have time for.",
};

export const CHECKS_STAND =
  'Every one of these takes about two minutes to check on your own phone. Do it standing behind your own counter before you talk to anybody, me included.';

export const APPS_STAND =
  "You already know about the commission. So I'll skip that part and go to the ones that cost you more.";

export const FUNNEL_STAND =
  "There are four steps, and every one of them is a place you can lose somebody. Each one is simple on its own. It's just usually nobody's job.";

export const JARGON = {
  lead: 'Those four words an ad guy will say at you.',
  para: "Awareness, consideration, conversion, retention. That's all they mean. You already run most of it in your head every service. You just don't have anything set up to keep doing it while you're on the line.",
};

/**
 * ⚠️ `honesty` is the single most valuable paragraph on the site. Verbatim,
 * first, and at the top of its block. Do not soften it, do not move it to the
 * end, do not shorten it.
 */
export const ADS = {
  label: 'Where I actually am with ads',
  honesty:
    "I don't run ads. I got certified by Meta in marketing this month, and a certificate is not a track record — I still haven't managed a dollar of anybody else's ad spend. When that changes I'll put it on this page.",
  why: "Here's why I'm telling you instead of quietly leaving it off. An ad is a bill you pay to send people somewhere. If the place you're sending them doesn't open the menu or take an order, the ad just buys you a faster way to lose them. Steps two, three and four are the thing an ad lands on, and that's the part I build. Get those right and step one turns into a decision you make later with real numbers, instead of a guess you pay for every month.",
  /** One sentence, split only so the first half can link back up to the box. */
  pointA: 'The free report on the homepage grades you on the first two steps.',
  pointB: 'Takes about ten seconds.',
};

/** docs/site-content-2026-09-03.md — "Five things I check first." */
export const CHECKS = [
  {
    n: '01',
    title: 'Your menu is a picture.',
    body: "A PDF, or a photo of the printed menu taped onto a page. Google can't read the words inside either one, so the dishes in it don't come up when somebody searches for them by name. And a customer holding a phone at a red light has to pinch and drag around a page that was laid out for paper. Most of them give up and order somewhere else.",
    check: 'Check it: open your menu on your phone and try to read a price without zooming.',
  },
  {
    n: '02',
    title: "Google doesn't know when you're open.",
    body: `Blank hours, or hours that were right two years ago. Someone drives fifteen minutes across town on a Sunday and finds the lights off. You lost that customer and you'll probably read about it in a review. There's a quieter cost too. With no hours on file you fall out of Google's "Open now" filter, so you don't come up at all for the person searching at 9pm for somewhere still serving.`,
    check: 'Check it: search your own name on your phone. The hours sit right under it. Look at the holidays as well.',
  },
  {
    n: '03',
    title: 'Nobody can tap to call you.',
    body: "Your number sits on the page as plain text. On a phone that means copying it by hand and pasting it into the dialer. Sounds like nothing. It's the easiest thing a hungry person can do and your site makes them work for it.",
    check: "Check it: pull your site up on your phone and tap the number. If nothing happens, there's your answer.",
  },
  {
    n: '04',
    title: 'Every online order goes through an app.',
    body: "DoorDash, Uber Eats, Grubhub, Slice. If the only order button on your site sends people to one of those, a cut of every ticket leaves the building before you've paid for the chicken. The bigger loss is quieter. The app knows who ordered and how to reach them. You don't, so you can't text that person about Tuesday.",
    check: 'Check it: tap your own order button and see whose logo you land on.',
  },
  {
    n: '05',
    title: 'The site loads fine at your desk and nowhere else.',
    body: "On your office wifi it opens instantly. On a phone with two bars in a parking lot it's a white screen for six seconds, and people don't wait out white screens. When I check a site I count anything past three seconds as a problem, and if it hasn't loaded in eight I treat it as down. It's almost always one enormous background photo nobody ever resized.",
    check: 'Check it: turn wifi off on your phone and count out loud while your own site loads.',
  },
] as const;

/**
 * THE COST OF DOING NOTHING — the beat the page was missing.
 *
 * It named the pain in five checks and then went straight to the delivery
 * apps, so a reader could finish §05 agreeing that all five things were true
 * about his place and still have no reason to do anything about it this month.
 *
 * ⚠️ NOT ONE INVENTED NUMBER, AND THAT IS THE WHOLE CONSTRAINT. There is no
 * "restaurants lose 30% of…" here and there must never be one. The page's
 * credibility rests on the fact that every figure on it is checkable — §06
 * ends by telling the owner to go find his own commission rate "before you
 * believe anybody's math about your place. Mine included." A fabricated
 * multiplier in this block would spend that, four screens before it is earned.
 *
 * So every clause in `paras[1]` is a restatement of a consequence the page has
 * ALREADY argued directly above it, with no multiplier attached:
 *   • the locked door is check 02 ("finds the lights off")
 *   • the dishes not coming up is check 01 ("don't come up when somebody
 *     searches for them by name")
 *   • the number the app has and you don't is check 04 ("The app knows who
 *     ordered and how to reach them. You don't.")
 * The only new idea is the FRAME: these are not events, they are a rate. That
 * is an argument, not a statistic, and a reader can check it himself.
 *
 * ⚠️ `paras[2]` IS NOT OPTIONAL. Take it out and this becomes fear-selling,
 * which would undo §06 — the section that earns the trust — from four screens
 * away. "Plenty of places run like this for years and do fine" is the line
 * that keeps the whole block honest. Do not cut it to tighten the section.
 *
 * It renders as prose with no heading, like the tail of §06 and for the same
 * reason: §05 above it and §06 below it are both label / h2 / rule / standfirst
 * / enumerated list, and a third one between them would make the page texture
 * instead of chapters.
 */
export const WAIT = {
  lede: "None of those five breaks. That's the whole problem with them.",
  paras: [
    "A fryer that quits, you fix the same day. A menu that's a photo doesn't quit. Wrong hours don't quit. A phone that rang while your hands were full never tells you it rang. Nothing on that list sets off an alarm, so it sits there, working exactly the same way tomorrow as it did today.",
    "Which is why I can't hand you one number for what it costs. It isn't a bill. It's a rate. Every week the hours stay wrong is another week of people driving over to a locked door. Every week the menu is a picture is another week your own dishes don't come up when somebody searches them by name. Every order that goes through the app is one more regular whose number the app has and you don't.",
    "I'm not telling you the sky is falling. Plenty of places run like this for years and do fine. I'm telling you it's the one cost that never shows up on a statement, and it keeps running whether anybody looks at it or not.",
  ],
} as const;

/** docs/site-content-2026-09-03.md — "About the delivery apps", part one. */
export const APPS_BEFORE = [
  {
    lead: 'Your app price is the only price a lot of people have ever seen',
    paras: [
      'When the apps take their cut, most owners do the sensible thing and raise the price on the app to cover it. Nothing wrong with that. But think about who is actually reading that number.',
      'Somebody who found you on DoorDash has never stood at your counter. They have never seen the menu on your wall. They have no second number to compare against. That is just what your food costs, as far as they know.',
      'There is a Jamaican place near me here in Atlanta. Oxtail runs $31.99 on DoorDash. The same plate is around $18 at the counter. I checked both in August 2026. Nobody in that kitchen is overcharging anyone, and the owner is the one printing the cheaper number. But plenty of people scrolling that app have quietly filed him under expensive, and he will never hear about it. That is the loss. It does not show up on any statement.',
    ],
  },
  {
    lead: 'Marking it up gets you less back than it looks like',
    paras: [
      'This is the part I would want to know if it were my place. The commission comes off the subtotal on the app, and the subtotal is your marked up price, not your counter price. So the markup raises the fee along with it.',
    ],
  },
] as const;

/**
 * The four numbers the wood band turns on, pulled out of the prose and set as a
 * ledger above it.
 *
 * ⚠️ THE PARAGRAPHS BELOW ARE UNCHANGED AND THIS DOES NOT REPLACE THEM. An
 * audit called the arithmetic the best content on the page and said it was
 * buried in three paragraphs of prose — on a phone, four dollar figures and two
 * percentages arrive inside 120 words of running text and a 55-year-old has to
 * hold all six in his head to see the point. The table gives him the comparison
 * in one glance; the paragraphs still carry the argument, which is the half a
 * table cannot do. Every number here also appears verbatim below.
 *
 * The labels are the only new words in this block and they are deliberately
 * flat — no claim, no adjective, nothing that is not already true two sentences
 * later. Do not add a fifth row; the fifth number in this argument is the
 * commission rate itself, and §APPS_AFTER's whole point is that the owner has
 * to go and look his own rate up rather than take one from this page.
 */
export const APPS_FIGURES = [
  { k: 'Your counter price', v: '$18' },
  { k: 'Listed on the app', v: '$24' },
  { k: 'You keep on the 30% plan', v: '$16.80' },
  { k: 'You keep on the 15% plan', v: '$20.40' },
] as const;

/**
 * The worked arithmetic. Set on the wood field — the one place a saturated
 * field carries running text, at 21px/700 so it is WCAG large-scale. It is the
 * most teachable thing on the page; keep all three.
 */
export const APPS_MATH = [
  'Say a plate is $18 at your counter and you list it at $24 on the app to cover the cut. On the 30% plan you keep $16.80 of that $24. The customer paid six dollars more than your regular price, and you finished a dollar twenty under it.',
  'Run the same plate on the 15% plan and you keep $20.40. Now you are $2.40 ahead and the markup did its job.',
  'Same menu, same markup, opposite outcome. The plans run from about 15% up to 30% depending on which one you signed, so that one number decides whether any of this works.',
] as const;

/** "About the delivery apps", part two. */
export const APPS_AFTER = [
  {
    lead: 'You never get the phone number',
    paras: [
      'On a delivery order you get a first name and a masked number that stops working once the driver is gone. No email you can write to. No number you can text on a slow Tuesday.',
      'The app has all of it.',
      'So a regular you earned through the app still has to be bought back from the app on the next order, and the one after that, for as long as they keep eating your food. You did the work of turning a stranger into a regular. You are renting them back by the plate.',
    ],
  },
  {
    lead: 'Two things worth checking on your own phone tonight',
    paras: [
      'Both are free and neither one involves me.',
      'Pull up your own listing on the app and set it next to your printed menu. Read down the two columns. I would bet you set those app prices once when you signed up and have not looked at them side by side since.',
      "Then open your merchant portal and find your actual commission rate. Not what you think it is. The number on the plan you are on right now. Everything above runs on that one figure, so find it before you believe anybody's math about your place. Mine included.",
    ],
  },
  {
    lead: "I'm not going to tell you to leave the apps",
    paras: [
      'They put you in front of people who have never heard of you, which nothing else does as cheaply. Somebody scrolls past your photo at nine at night and orders. Keep that.',
      "What I build is the other lane. Ordering that lives on your own site, at your counter prices. The kitchen ticket prints the same way it does now. The customer's name and number land somewhere you own.",
      'Then the people who already love you have a door that does not take a cut of every plate. And the app goes back to the job it is genuinely good at, which is introducing you to strangers.',
    ],
  },
] as const;

/**
 * The last of those blocks is pulled out and rendered differently from the
 * other two, and that is the fix for the worst structural problem on the page.
 *
 * Six consecutive sections were built from one skeleton — mono label, display
 * h2, full-bleed rule, dim standfirst, enumerated set — so a reader scrolling
 * fast saw list, list, list, list, list, list. One section had to run as
 * argument instead, and this is the passage that earns it: the concession
 * ("keep the apps, they are good at the thing they are good at") is the most
 * human writing here, and h3-ing it into a labelled sub-block was the thing
 * flattening it. It now runs as paragraphs with no heading above them.
 *
 * The lead is a sentence, not a title, so it needs a full stop. It is added
 * here at render rather than in the string so the copy above stays byte-for-
 * byte as written — and normalised first, so a copy edit that supplies its own
 * period can never produce two.
 */
export const APPS_TAIL = APPS_AFTER[APPS_AFTER.length - 1];

export const asSentence = (s: string) => `${s.replace(/[.\s]+$/, '')}.`;

/** docs/site-content-2026-09-03.md — "How a stranger becomes a regular." */
export const FUNNEL = [
  {
    n: '01',
    lead: 'Somebody two miles from you is hungry right now and has never heard of you.',
    para: "They're not comparing you to anybody. They don't know you exist. Before you spend a dollar telling them, the free version has to be working: whether your Google listing is right, whether the hours are right, whether the photos are yours and recent, whether you're even filed under the right category. That's what somebody two miles out sees first. It costs nothing but the work, so it's where I start.",
  },
  {
    n: '02',
    lead: "They found you, and now they're picking between you and the place next door.",
    para: "This happens on a phone and it's over in seconds. They look at your photos. They check how many stars you've got. They tap the menu and find out whether it opens or whether it's a PDF that loads sideways. Nothing about your cooking is involved yet, which is the frustrating part, because the cooking is the thing you're actually good at. So I rebuild the menu as a real page, get current photos on it, and set the review requests to go out on their own so your rating isn't just whoever was annoyed enough to type something.",
  },
  {
    n: '03',
    lead: 'They want it. Ordering is the last thing in the way.',
    para: "Ten seconds or three minutes. That's the whole difference, and it gets decided by things that sound too small to matter. A checkout that demands an account. A phone number that doesn't dial when you tap it. An app taking a cut of a ticket your own site could have taken for free. I put ordering and payment on your site so the order comes to you and the money stays yours. If they'd rather talk to somebody, the AI picks up, takes the order, and nobody sits on hold.",
  },
  {
    n: '04',
    lead: 'They came once. Can you reach them again?',
    para: "You already paid to get them in the door. Getting them back costs almost nothing by comparison, and it's still the step that gets put off, because nothing breaks when you skip it. So here's the plain version of the question. Do you have their number? If somebody ordered from you in March and hasn't been back since, is there anything at all that reminds them you exist? I set up the review ask and the win-back text, and the list that makes either of them possible.",
  },
] as const;
