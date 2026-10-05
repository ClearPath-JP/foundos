/**
 * Third-party commission figures for the "commission math" section. Only figures taken from each company's own
 * merchant pricing page are used here (checked 2026-10-03). Full research, sources and the unverified figures
 * that were deliberately left out: knowledge/sales/third-party-commissions-2026-10.md. Re-check before quoting
 * to an owner; platforms change these often.
 */

import { PLANS, PROJECTS, type LiveProject } from './offer';

export const COMMISSION_CHECKED = 'October 2026';

export const PLATFORM_FEES: readonly { platform: string; kind: string; fee: string; source: string }[] = [
  { platform: 'DoorDash', kind: 'Delivery orders', fee: '15%, 25% or 30% of each order, by plan', source: 'https://merchants.doordash.com/en-us/pricing' },
  { platform: 'DoorDash', kind: 'Pickup orders', fee: '6% of each order', source: 'https://merchants.doordash.com/en-us/pricing' },
  { platform: 'Uber Eats', kind: 'Delivery orders', fee: '20%, 25% or 30% of each order, by plan', source: 'https://merchants.ubereats.com/us/en/pricing/' },
  { platform: 'Uber Eats', kind: 'Pickup orders', fee: '7% of each order', source: 'https://merchants.ubereats.com/us/en/pricing/' },
];

const growth = PLANS[1];
const launch = PROJECTS.find((p): p is LiveProject => p.slug === 'direct-ordering-launch' && p.status === 'live');

/** foundos ordering in year one: the plan plus the one-time setup spread over 12 months. */
export const FOUNDOS_YEAR_ONE_MONTHLY = growth.monthly + Math.round((launch?.price ?? 0) / 12);
