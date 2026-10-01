import { PLAN_TERMS, TERM_MONTHS } from '@/config/offer';

import type { Qa } from './cards';

/**
 * FAQ copy from the offer doc §7, plus the term and ownership questions every
 * owner asks before a 12-month commitment. Nothing here promises rankings,
 * orders or 24-hour coverage — the doc rules all three out.
 */
const DIFFERENCE: Qa = {
  q: 'What’s the difference between the plans?',
  a: 'Digital Care keeps your website and core digital information maintained. Growth adds more update time and up to two standard follow-up workflows, such as catering inquiries or review requests.',
};

const SETUP_FEE: Qa = {
  q: 'Why is there no setup fee?',
  a: `The website build is paid for over the first ${TERM_MONTHS} months of the plan instead of up front. After that first term, the plan continues month to month and you can cancel with 30 days’ notice.`,
};

const ORDERING: Qa = {
  q: 'Does direct ordering come with my monthly plan?',
  a: 'Direct Ordering Launch is a separate project. Your monthly plan keeps the ordering link on your website working, but equipment, ordering software and day-to-day ordering support are separate.',
};

const GUARANTEE: Qa = {
  q: 'Will you guarantee more orders or better search rankings?',
  a: 'No. I improve the information, customer paths and follow-up your business uses. Results depend on demand, your offer and your operations, so I don’t guarantee rankings or sales.',
};

const DASHBOARD: Qa = {
  q: 'Can I see my website and request updates?',
  a: 'Yes. At launch you get your live website link, and you send changes by text, email or the request form. A client dashboard for requests and reports is planned, but it isn’t live yet.',
};

const OWNERSHIP: Qa = { q: 'Who owns my website and accounts?', a: PLAN_TERMS.ownership };

const SECOND_LOCATION: Qa = { q: 'I have more than one location.', a: PLAN_TERMS.location };

export const HOME_FAQ: readonly Qa[] = [DIFFERENCE, SETUP_FEE, ORDERING, GUARANTEE, DASHBOARD, OWNERSHIP];

export const PLANS_FAQ: readonly Qa[] = [
  DIFFERENCE,
  SETUP_FEE,
  { q: 'When do I pay, and when does billing start?', a: PLAN_TERMS.firstPayment },
  OWNERSHIP,
  GUARANTEE,
  SECOND_LOCATION,
  DASHBOARD,
];
