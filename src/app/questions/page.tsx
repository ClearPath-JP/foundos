import type { Metadata } from 'next';
import Link from 'next/link';

import { SHELL } from '@/components/site';
import { ServicePage, serviceMetadata } from '@/components/service';
import { DEMO_LINE_PRETTY } from '@/config/brand';
import { BASE_MINIMUM_MONTHS, MINIMUM_MONTHS, WEBSITE, usd } from '@/config/pricing';

import { SITE_URL } from '../site';
import { ADS } from '../why/copy';

/**
 * /questions — the objections, answered short. Added 2026-09-11 when the
 * homepage became the short front door.
 *
 * ⚠️ EVERY ANSWER IS A THING THE SITE ALREADY SAYS. Nothing here is a new
 * promise; each answer is assembled from a sentence published elsewhere, and
 * the source is noted beside it. If an answer ever needs something the site
 * does not already commit to, it goes on the page it belongs to first.
 * Prices and minimums are read from config/pricing.ts, never typed.
 *
 * Native <details>: closed by default, so a phone shows a list of questions a
 * visitor can scan in one screen, and opens with JavaScript off.
 */

export const metadata: Metadata = serviceMetadata({
  slug: 'questions',
  title: 'Questions about working with foundos',
  description:
    'Short answers for Atlanta food trucks and restaurants: contracts, cancelling, the delivery apps, the AI phone, photos, and what happens if you are not a tech person.',
  shareTitle: 'Questions, answered short',
  shareDescription: 'Contracts, cancelling, the delivery apps, the AI phone, and what happens if you are not a tech person.',
});

const HEAD = {
  label: 'Questions',
  h1: 'The questions worth asking first.',
  stand: 'Short answers. Tap a question to open it.',
};

type QA = { q: string; a: readonly string[]; link?: { href: string; label: string } };

const QUESTIONS: readonly QA[] = [
  {
    // Source: /why, the closing passage of the delivery-apps section.
    q: 'I already have DoorDash. Why would I need this?',
    a: [
      'Keep it. The apps put you in front of people who have never heard of you, and nothing else does that as cheaply.',
      "What I build is the other lane: ordering on your own site, at your counter prices, for the people who already know your name. Their name and number land somewhere you own instead of with the app.",
    ],
    link: { href: '/why#apps', label: 'What marking up on the app really costs' },
  },
  {
    // Source: config/pricing.ts via /pricing.
    q: 'What does it cost?',
    a: [
      `Every system has a setup price and a monthly price, the same for everybody. A site on its own is ${usd(WEBSITE.setup)}, then ${usd(WEBSITE.monthly)} a month. Build more than one system at once and the setup drops.`,
    ],
    link: { href: '/pricing', label: 'The full price list' },
  },
  {
    // Source: /pricing terms.
    q: 'Is there a contract?',
    a: [
      `A minimum, not a long contract: ${BASE_MINIMUM_MONTHS} months on any build, ${MINIMUM_MONTHS} on a build with a package discount. You pay half the setup to start and half when it launches.`,
    ],
  },
  {
    // Source: /pricing terms + the homepage's old build tail ("You own all of it").
    q: 'What happens if I cancel?',
    a: [
      'After the minimum, cancel any month and you keep the site. Your domain is bought in your name, not mine, so if you ever leave, you take it with you.',
    ],
  },
  {
    // Source: the homepage's "After you say yes" + /pricing rollout term.
    q: 'How long does it take?',
    a: [
      'Seven days from your payment to the site being live. Miss it and your first month is free.',
      'Anything on top of the site rolls out one system at a time after that, one every two to four weeks, so each one is working before the next goes in.',
    ],
  },
  {
    // Source: homepage ABOUT ("You text me, I answer") + fulfilment step 04 + /systems website FAQ.
    q: "I'm not a tech person.",
    a: [
      "You don't have to be. You text me, I answer. No account manager, no ticket system.",
      'When it goes live you get a sixty-second video showing you how to change a menu item yourself. Anything bigger, text me the change and I make it.',
    ],
  },
  {
    // Source: /systems website card ("No photos? I will take them.").
    q: "I don't have good photos.",
    a: ['Send what you have. If you have none, I will take them.'],
  },
  {
    // Source: /systems AI Receptionist card.
    q: 'Will the AI phone annoy my customers?',
    a: [
      'It answers the calls you miss, not every call. It says it is your virtual assistant, handles the common questions — hours, location, menu — and passes anything it cannot handle to you.',
      `Hear it before you decide: call the demo line at ${DEMO_LINE_PRETTY}.`,
    ],
    link: { href: '/ai-phone-answering', label: 'What it gets wrong, and how to catch it' },
  },
  {
    // Source: /systems Online Ordering card.
    q: 'Are there card fees?',
    a: ['Yes — standard card processing, the same as any card reader, and they are yours. The money goes to your account.'],
  },
  {
    // Source: the two services on /systems. Coming soon, and said as such.
    q: 'Can you run my Instagram and Facebook?',
    a: [
      'Soon, and in two pieces. Setting the profiles up so they match your storefront — photo, bio, and the same hours, address and phone as your Google listing — is a one-time job. Posting for you is a monthly one: I come and shoot at your place once a month, then write and schedule eight to twelve posts.',
      'Neither is switched on yet, and both are priced on the systems page so you know what they will cost when they are. You would add me through Meta Business Suite — I never need your password.',
    ],
    link: { href: '/systems#social-content', label: 'What the posting service includes' },
  },
  {
    // ⚠️ Source: the ads-honesty paragraph, verbatim. The most valuable sentence
    // on the site; it is quoted, not paraphrased, and it stays whole.
    q: 'Do you run ads?',
    a: [ADS.honesty],
    link: { href: '/why#funnel', label: 'Why I would fix the rest first' },
  },
  {
    // Source: homepage ABOUT.
    q: 'Who am I actually dealing with?',
    a: [
      "One person, in Atlanta. I build it, I run it, and you text me directly. If I can't help you, I'll tell you that too.",
    ],
  },
];

const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/questions#faq`,
  about: { '@id': `${SITE_URL}/#business` },
  mainEntity: QUESTIONS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a.join(' ') },
  })),
};

/* The accordion. Body size, bold, never mono — a question is a sentence
   somebody reads, not a label. The whole summary row is the tap target and
   clears 56px. No backticks below — template literal. */
const QA_CSS = `
/* Capped at a measure rather than the full 1080px shell: a one-line question
   stretched across 1440px leaves 400px of empty row to the right of its own
   "+", which reads as a layout that failed rather than a list. 52rem is the
   prose measure this site already sets everything else to. */
.qa{list-style:none;margin:0;padding:0;border-top:1px solid var(--rule);max-width:52rem;}
.qa-i{border-bottom:1px solid var(--rule-soft);}
.qa-q{display:flex;align-items:center;justify-content:space-between;gap:18px;min-height:56px;padding:14px 0;
  cursor:pointer;list-style:none;font-size:var(--t-body);font-weight:700;line-height:1.4;color:var(--strong);}
.qa-q::-webkit-details-marker{display:none;}
.qa-q::after{content:"+";flex:0 0 auto;font-family:var(--f-mono);font-size:var(--t-lede);line-height:1;color:var(--fg);}
.qa-d[open]>.qa-q::after{content:"\\2212";}
.qa-q:hover{color:var(--bone);}
.qa-a{padding:0 0 22px;}
.qa-a .eb-p{max-width:62ch;text-wrap:pretty;}
.qa-a .eb-p+.eb-p{margin-top:12px;}
`;

const CLOSE = "Ask me the one that isn't here.";

export default function QuestionsPage() {
  return (
    <ServicePage slug="questions" label={HEAD.label} h1={HEAD.h1} stand={HEAD.stand} close={CLOSE} css={QA_CSS}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD).replace(/</g, '\\u003c') }}
      />
      <section aria-label="Questions">
        <div className={`${SHELL} eb-sec`}>
          <ul className="qa" role="list">
            {QUESTIONS.map((item) => (
              <li key={item.q} className="qa-i">
                <details className="qa-d">
                  <summary className="qa-q">{item.q}</summary>
                  <div className="qa-a">
                    {item.a.map((p) => (
                      <p key={p} className="eb-p">
                        {p}
                      </p>
                    ))}
                    {item.link && (
                      <p className="eb-p">
                        <Link className="sv-a" href={item.link.href}>
                          {item.link.label}
                        </Link>
                      </p>
                    )}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </ServicePage>
  );
}
