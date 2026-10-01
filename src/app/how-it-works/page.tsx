import type { Metadata } from 'next';

import { CloseBand } from '@/components/fx/cards';
import Shell from '@/components/fx/Shell';
import { PLAN_TERMS, TERM_MONTHS } from '@/config/offer';

const TITLE = 'How it works | foundos';
const DESCRIPTION =
  'How a foundos plan or project goes: a conversation, onboarding, your approval, then ongoing care. What you send, what you get, and when.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: './how-it-works',
    siteName: 'foundos',
    type: 'website',
    locale: 'en_US',
  },
};

/** Doc §6 "How it works" and the §8 onboarding checklist, in owner language. */
const STEPS = [
  {
    t: 'Tell me about your restaurant',
    d: 'Pick a plan or project, or just describe what’s not working. I confirm it fits before anything is billed.',
  },
  {
    t: 'Sign and send what I need',
    d: 'The agreement, then your menu, prices, logo, photos, hours and access to your accounts. You keep ownership of all of them.',
  },
  {
    t: 'Approve the work',
    d: 'You see your site before it goes live and get two rounds of changes. Nothing launches without your OK.',
  },
  {
    t: 'I keep it right',
    d: 'Send changes by text or email. You get a short summary every month of what changed and how the site did.',
  },
] as const;

const AFTER = [
  {
    t: 'Asking for a change',
    d: 'Text, email or use the contact form. Small edits like hours, prices and photos come out of your monthly update time.',
  },
  {
    t: 'Your monthly summary',
    d: 'Visits and actions like calls and form sends, plus what was changed that month. Growth adds how inquiries and follow-ups went.',
  },
  {
    t: 'When something breaks',
    d: `${PLAN_TERMS.hours} Requests are acknowledged within 2 business days on Digital Care and 1 on Growth.`,
  },
  {
    t: 'If you leave',
    d: `After the ${TERM_MONTHS}-month first term, cancel with 30 days’ notice. ${PLAN_TERMS.ownership}`,
  },
] as const;

export default function HowItWorksPage() {
  return (
    <Shell current="how">
      <section className="fx-phead">
        <div className="fx-wash" aria-hidden="true" />
        <div className="fx-wrap">
          <p className="fx-eyebrow">How it works</p>
          <h1 className="fx-h1">Four steps, and you approve every one.</h1>
          <p className="fx-lede">
            Your website usually launches 15 to 20 business days after I have everything I need. After that, it’s
            maintained for as long as you’re on a plan.
          </p>
        </div>
      </section>

      <section className="fx-sec fx-sec--join" aria-label="Steps">
        <div className="fx-wrap">
          <ol className="fx-steps" role="list">
            {STEPS.map((s) => (
              <li key={s.t}>
                <p className="fx-step-t">{s.t}</p>
                <p className="fx-step-d">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="fx-sec fx-sec--tint" aria-labelledby="after-h">
        <div className="fx-wrap">
          <p className="fx-kicker">After launch</p>
          <h2 className="fx-h2" id="after-h">
            What being a client looks like
          </h2>
          <ul className="fx-handles" role="list">
            {AFTER.map((a) => (
              <li key={a.t} className="fx-help-item">
                <p className="fx-help-t">{a.t}</p>
                <p className="fx-help-d">{a.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CloseBand
        title="Start with step one."
        body="Tell me about your restaurant. It takes two minutes, and I read every message myself."
      />
    </Shell>
  );
}
