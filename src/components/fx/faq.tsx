import { PLAN_TERMS, TERM_MONTHS } from '@/config/offer';

import type { Qa } from './cards';

/**
 * FAQ copy from the offer doc §7, plus the term and ownership questions every
 * owner asks before a 12-month commitment. Nothing here promises rankings,
 * orders or 24-hour coverage — the doc rules all three out.
 */
const DIFFERENCE: Qa = {
  q: 'What’s the difference between the plans?',
  a: 'Digital Care keeps your website and core digital information maintained. Growth adds twice the update time and one working system: table booking with a host stand, online ordering with a kitchen screen, or catering and event follow-up.',
};

const SETUP_FEE: Qa = {
  q: 'Is there a setup fee?',
  a: `Not for the website. The build is paid for over the first ${TERM_MONTHS} months of the plan instead of up front, then the plan continues month to month with 30 days’ notice to cancel. Booking and ordering are the exceptions. Each has a one-time setup that includes the staff tablet and stand: the Booking Launch builds your real floor plan into the system, and the Direct Ordering Launch enters your menu and sets up the kitchen screen. Both include training your team.`,
};

const ORDERING: Qa = {
  q: 'How does online ordering work, and what does it cost?',
  a: 'Ordering runs on the Growth plan, plus the one-time Direct Ordering Launch: your menu and tax set up, a kitchen tablet and stand supplied, and your team trained. Customers order pickup from your website and pay at pickup. There is no commission or per-order fee. Delivery and online card payment aren’t included.',
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
  ORDERING,
  SETUP_FEE,
  { q: 'When do I pay, and when does billing start?', a: PLAN_TERMS.firstPayment },
  OWNERSHIP,
  GUARANTEE,
  SECOND_LOCATION,
  DASHBOARD,
];
