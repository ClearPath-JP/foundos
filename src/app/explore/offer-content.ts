/**
 * Shared, single-source-of-truth copy for the foundos.ai homepage redesign
 * (done-for-you service framing). Design variants import this so the *offer*
 * stays identical while the *look* changes. Locked 2026-07-09.
 */

export const brand = { name: 'foundos', tld: '.ai' };

export const heroRotating = [
  'books clients', 'answers the phone', 'follows up', 'wins members back', 'never sleeps',
];

export const hero = {
  eyebrow: 'The system behind brands that scale',
  subA: 'Your online presence is your brand — and it should be ready to respond the moment someone reaches out.',
  subB: 'I build the system behind it: a website that sells, booking that runs itself, and a receptionist that answers every call. Your brand, always on — so you can show up and do what you’re great at.',
  ctaPrimary: 'Book a 20-min call',
  ctaSecondary: 'See how it works',
  reassure: 'No pitch. No commitment. I’ll tell you honestly if it’s a fit.',
  trustLabel: 'Works with the tools you already use',
};

export const problem = {
  kicker: 'The trap',
  title: 'You didn’t start your business to become its employee.',
  body: [
    'You own the place, so it all lands on you — every booking, every missed call, every follow-up, every no-show. You’re working 60-hour weeks doing by hand what should run on its own.',
    'You’re paying for five tools that don’t talk to each other. Your booking doesn’t trigger your texts. Your payments don’t trigger your follow-ups. Nothing’s connected — so you’re the glue holding it together.',
  ],
  punch: 'You work more, earn less than you should, and your brand goes quiet the moment you step away.',
  fix: 'All of it is fixable — without ripping out what you already use.',
};

export type Step = { n: string; title: string; short: string; body: string };
export const steps: Step[] = [
  { n: '01', title: 'Audit', short: 'I find what’s leaking.',
    body: 'I map your tools and your day, then put real numbers on it — the missed calls, the lost follow-ups, the hours. You get a report, not a guess.' },
  { n: '02', title: 'Connect', short: 'I make your tools talk.',
    body: 'No rip-and-replace. Your booking, payments, and messaging finally work as one system — the stack you already pay for, working together.' },
  { n: '03', title: 'Automate', short: 'I put your brand on autopilot.',
    body: 'Bookings, reminders, follow-ups, win-backs, and a receptionist that answers every call — running 24/7, so your brand responds the instant someone reaches out.' },
  { n: '04', title: 'Optimize', short: 'I double down on what makes money.',
    body: 'You get a dashboard of real results. Every month I cut what isn’t working and scale what is. Revenue, not vibes.' },
];

export type Log = { ts: string; cat: 'lead' | 'winback' | 'call' | 'fill'; text: string };
export const agentLogs: Log[] = [
  { ts: '23:47', cat: 'lead', text: 'New lead texted after hours — replied, answered her question, booked her for Saturday.' },
  { ts: '08:12', cat: 'call', text: 'Caller asked about pricing while you were with a client — answered and booked a consult.' },
  { ts: '11:30', cat: 'winback', text: 'Client hasn’t shown in 3 weeks — sent a personal win-back offer.' },
  { ts: '14:05', cat: 'fill', text: 'Wednesday’s 6pm class was at 60% — sent a bring-a-friend invite to fill it.' },
];
export const CAT_LABEL: Record<Log['cat'], string> = { lead: 'booked', call: 'answered', winback: 'sent', fill: 'sent' };

export type Tier = { name: string; build: string; mo: string; blurb: string; maps: string; popular?: boolean };
export const tiers: Tier[] = [
  { name: 'Launch', build: '$2,000', mo: '+ $200/mo', blurb: 'Get online, look pro, stop the leaks.', maps: 'Solo & getting started' },
  { name: 'Complete', build: '$3,500', mo: '+ $350/mo', blurb: 'Your brand sells and answers the phone for you.', maps: 'Most businesses', popular: true },
  { name: 'Growth', build: '$5,000+', mo: '+ $500+/mo', blurb: 'Fill the calendar, not just save time.', maps: 'Ready to scale hard' },
];

export type Feat = { label: string; on: [boolean, boolean, boolean] };
export const feats: Feat[] = [
  { label: 'Custom website', on: [true, true, true] },
  { label: 'Online booking', on: [true, true, true] },
  { label: 'Reminders, follow-ups & review requests', on: [true, true, true] },
  { label: 'Unified dashboard', on: [true, true, true] },
  { label: 'Sell online (ordering, class packs, memberships)', on: [false, true, true] },
  { label: 'AI receptionist — answers every call 24/7', on: [false, true, true] },
  { label: 'Two-way texting', on: [false, true, true] },
  { label: 'Retention, win-back & referral campaigns', on: [false, false, true] },
  { label: 'Paid ads, built & managed', on: [false, false, true] },
  { label: 'Monthly strategy call with me', on: [false, false, true] },
];

export const startupLine =
  'Just starting out? I’ll build the whole thing from zero — name, logo, colors, and the systems that run it — so on day one, all you do is show up.';

export const about = {
  kicker: 'The builder',
  name: 'Josh',
  lines: [
    'I build the systems that run local service businesses — the website, the booking, the follow-ups, and the receptionist that never sleeps.',
    'I started foundos because I kept seeing the same thing: great owners trapped inside their own business, doing by hand what a good system should handle — watching their brand go quiet every time they stepped away.',
    'So I build the system, connect what you already use, and put your brand on autopilot. You show up and do what you’re great at. The rest runs itself.',
  ],
  kicker2: 'Your business should work for you — not the other way around.',
  signoff: '— Josh',
};

export const trust = {
  eyebrow: 'Why work with me now',
  title: 'I’m taking a handful of founding clients — and being early is the advantage.',
  scarcity: 'Taking 5 founding clients this quarter',
  sub: 'foundos is new, and that’s the edge: founding clients get more of my time, founding pricing locked in for good, and someone who treats your results like his reputation depends on it. Because it does.',
  promises: [
    { title: 'A real guarantee', body: 'If our first call doesn’t surface something worth building, we part as friends — no pitch, no pressure.' },
    { title: 'Live in about two weeks', body: 'I handle the whole build — the audit, the setup, the automations — while you keep running your business.' },
    { title: 'You own everything', body: 'Your website, your data, your systems are yours. Cancel anytime and you keep what we built.' },
    { title: 'Direct access to me', body: 'No tickets, no offshore team. You work with Josh — the person who builds and runs it.' },
  ],
};

export const closing = {
  vision: 'The owners still doing it all by hand get left behind. The ones who systematize their brand scale it.',
  title: 'Let’s build the system — so your brand runs, and grows, without you.',
  sub: 'A 20-minute call. I’ll tell you exactly what I’d build first — no pitch.',
  cta: 'Book your free 20-min call',
  reassure: 'No pitch. No obligation. If I can’t help, I’ll tell you.',
};
