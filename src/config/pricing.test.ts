/**
 * Proves the cart maths lands on the package prices in pricing/01-pricing.md.
 *
 *     npm run test:pricing
 *
 * Runs on Node 24's built-in type stripping and test runner — no packages.
 * The acceptance table is copied from pricing/04-shop-and-cart-spec.md; if a
 * row here fails, either the price changed on purpose (update both) or the
 * maths broke (fix the maths, never the table).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  BASE_MINIMUM_MONTHS,
  EVERY_SYSTEM,
  MINIMUM_MONTHS,
  PACKAGES,
  SERVICES,
  SYSTEMS,
  quote,
} from './pricing.ts';

type Row = { name: string; systems: readonly string[]; setup: number; monthly: number };

const ACCEPTANCE: readonly Row[] = [
  { name: 'Website only', systems: [], setup: 400, monthly: 97 },
  { name: 'Truck Starter', systems: ['truck-tracker'], setup: 800, monthly: 149 },
  { name: 'Truck Pro', systems: ['truck-tracker', 'online-ordering', 'catering-leads'], setup: 1250, monthly: 209 },
  {
    name: 'Truck Full',
    systems: ['truck-tracker', 'online-ordering', 'catering-leads', 'review-booster', 'text-club'],
    setup: 1500,
    monthly: 279,
  },
  { name: 'Restaurant Starter', systems: ['online-ordering'], setup: 900, monthly: 159 },
  { name: 'Restaurant Pro', systems: ['online-ordering', 'review-booster', 'google-boost'], setup: 1200, monthly: 249 },
  {
    name: 'Restaurant Full',
    systems: ['online-ordering', 'review-booster', 'google-boost', 'catering-leads', 'missed-call-text-back', 'text-club'],
    setup: 1550,
    monthly: 329,
  },
  {
    name: 'Restaurant Full + AI',
    systems: ['online-ordering', 'review-booster', 'google-boost', 'catering-leads', 'ai-receptionist', 'text-club'],
    setup: 1850,
    monthly: 449,
  },
  {
    name: 'Restaurant + Truck',
    systems: ['truck-tracker', 'online-ordering', 'catering-leads', 'review-booster', 'google-boost', 'text-club'],
    setup: 1750,
    monthly: 339,
  },
  {
    name: 'Restaurant + Truck + Second Location',
    systems: [
      'truck-tracker',
      'online-ordering',
      'catering-leads',
      'review-booster',
      'google-boost',
      'text-club',
      'second-location',
    ],
    setup: 1950,
    monthly: 369,
  },
  { name: 'Website + Text-Back', systems: ['missed-call-text-back'], setup: 550, monthly: 129 },
  { name: 'Website + AI Receptionist', systems: ['ai-receptionist'], setup: 1000, monthly: 249 },
  {
    name: 'Every system except the Second Location add-on (Text-Back auto-removed)',
    systems: EVERY_SYSTEM.filter((s) => s !== 'second-location'),
    setup: 2150,
    monthly: 489,
  },
  { name: 'Second Location without Ordering', systems: ['second-location'], setup: 400, monthly: 97 },
];

for (const row of ACCEPTANCE) {
  test(`${row.name}: $${row.setup} + $${row.monthly}/mo`, () => {
    const q = quote(row.systems);
    assert.equal(q.price.setup, row.setup);
    assert.equal(q.price.monthly, row.monthly);
  });
}

/** Each package card must show exactly what its systems cost added one at a time. */
const PACKAGE_PRICES: Record<string, { setup: number; monthly: number; fullSetup: number; fullMonthly: number }> = {
  'truck-starter': { setup: 800, monthly: 149, fullSetup: 800, fullMonthly: 147 },
  'truck-pro': { setup: 1250, monthly: 209, fullSetup: 1600, fullMonthly: 237 },
  'truck-full': { setup: 1500, monthly: 279, fullSetup: 2200, fullMonthly: 327 },
  'restaurant-starter': { setup: 900, monthly: 159, fullSetup: 900, fullMonthly: 157 },
  'restaurant-pro': { setup: 1200, monthly: 249, fullSetup: 1500, fullMonthly: 272 },
  'restaurant-full': { setup: 1550, monthly: 329, fullSetup: 2250, fullMonthly: 382 },
  'restaurant-full-ai': { setup: 1850, monthly: 449, fullSetup: 2700, fullMonthly: 502 },
  'restaurant-truck': { setup: 1750, monthly: 339, fullSetup: 2500, fullMonthly: 402 },
  'restaurant-truck-two': { setup: 1950, monthly: 369, fullSetup: 2700, fullMonthly: 432 },
};

test('every package in the spec exists, and nothing else does', () => {
  assert.deepEqual(PACKAGES.map((p) => p.slug).sort(), Object.keys(PACKAGE_PRICES).sort());
});

for (const pkg of PACKAGES) {
  test(`package ${pkg.name} matches the price sheet, full and discounted`, () => {
    const want = PACKAGE_PRICES[pkg.slug];
    const q = quote(pkg.systems);
    assert.equal(q.price.setup, want.setup);
    assert.equal(q.price.monthly, want.monthly);
    assert.equal(q.full.setup, want.fullSetup);
    assert.equal(q.full.monthly, want.fullMonthly);
  });

  test(`package ${pkg.name} is the same price in any order`, () => {
    const forward = quote(pkg.systems);
    const backward = quote([...pkg.systems].reverse());
    assert.deepEqual(backward.price, forward.price);
  });
}

test('one recommended package per group', () => {
  for (const group of ['truck', 'restaurant', 'both'] as const) {
    assert.equal(PACKAGES.filter((p) => p.group === group && p.recommended).length, 1, group);
  }
});

test('adding AI Receptionist removes Text-Back and says so', () => {
  const q = quote(['missed-call-text-back', 'ai-receptionist']);
  assert.deepEqual(q.systems, ['ai-receptionist']);
  assert.equal(q.notes.length, 1);
  assert.match(q.notes[0], /Missed Call Text-Back was removed/);
});

test('Second Location without Online Ordering is removed and says so', () => {
  const q = quote(['second-location', 'google-boost']);
  assert.deepEqual(q.systems, ['google-boost']);
  assert.equal(q.notes.length, 1);
  assert.match(q.notes[0], /needs Online Ordering/);
});

test('duplicates, unknown slugs and the website itself are ignored', () => {
  const clean = quote(['online-ordering']);
  const messy = quote(['online-ordering', 'online-ordering', 'website', 'site', 'not-a-system']);
  assert.deepEqual(messy.systems, clean.systems);
  assert.deepEqual(messy.price, clean.price);
});

test('every build has a minimum: the base one, or the longer one with a discount', () => {
  assert.equal(quote([]).minimumMonths, BASE_MINIMUM_MONTHS);
  assert.equal(quote(['online-ordering']).minimumMonths, BASE_MINIMUM_MONTHS);
  assert.equal(quote(['online-ordering']).discounted, false);
  assert.equal(quote(['online-ordering', 'google-boost']).minimumMonths, MINIMUM_MONTHS);
  assert.equal(quote(['online-ordering', 'google-boost']).discounted, true);
  assert.ok(MINIMUM_MONTHS > BASE_MINIMUM_MONTHS);
});

test('Second Location never counts toward the discount tier', () => {
  const q = quote(['online-ordering', 'second-location']);
  assert.equal(q.tier.setupPercentOff, 0);
  assert.equal(q.discounted, false);
});

test('the AI Receptionist has a minutes cap, and every minute over it is billed above cost', () => {
  const ai = SYSTEMS.find((s) => s.slug === 'ai-receptionist');
  assert.ok(ai, 'AI Receptionist is in the catalog');
  assert.ok((ai.includedMinutes ?? 0) > 0, 'minutes are capped');
  // Vapi's worst-case all-in cost is ~25¢/min (reference_market_pricing, 2026-08-02).
  assert.ok((ai.overageCentsPerMinute ?? 0) > 25, 'overage covers the worst-case cost');
  // Included minutes at worst-case cost must stay under the monthly price.
  assert.ok(((ai.includedMinutes ?? 0) * 25) / 100 < ai.monthly, 'the allowance cannot cost more than it earns');
});

test('services never enter the cart, priced or not', () => {
  assert.ok(SERVICES.length > 0);
  const withServices = quote(['online-ordering', ...SERVICES.map((s) => s.slug)]);
  assert.deepEqual(withServices.price, quote(['online-ordering']).price);
  assert.deepEqual(withServices.systems, ['online-ordering']);
});

test('a service never changes the discount tier or the minimum', () => {
  const plain = quote(['online-ordering']);
  const withServices = quote(['online-ordering', 'social-content', 'menu-design']);
  assert.equal(withServices.tier.setupPercentOff, plain.tier.setupPercentOff);
  assert.equal(withServices.minimumMonths, plain.minimumMonths);
});

test('the advertised ceiling counts systems only, so a labour service cannot inflate it', () => {
  const everySystem = quote(EVERY_SYSTEM);
  const monthlyServices = SERVICES.reduce((sum, s) => sum + (s.monthly ?? 0), 0);
  assert.ok(monthlyServices > 0, 'at least one service bills monthly');
  assert.equal(quote([...EVERY_SYSTEM, ...SERVICES.map((s) => s.slug)]).price.monthly, everySystem.price.monthly);
});

test('every service is priced or explicitly ask-only, never both and never neither', () => {
  for (const s of SERVICES) {
    const priced = s.oneTime !== undefined || s.monthly !== undefined;
    assert.ok(priced !== !!s.ask, `${s.slug}: either a price or ask-only`);
  }
});

test('ads carry no price until the site stops saying he has never run them', () => {
  const ads = SERVICES.find((s) => s.slug === 'ads');
  assert.ok(ads, 'ads is on the list');
  assert.equal(ads.oneTime, undefined);
  assert.equal(ads.monthly, undefined);
  assert.equal(ads.ask, true);
});

test('savings are never negative', () => {
  for (const pkg of PACKAGES) {
    const q = quote(pkg.systems);
    assert.ok(q.saves.setup >= 0 && q.saves.monthly >= 0, pkg.slug);
  }
  const single = quote(['missed-call-text-back']);
  assert.equal(single.saves.monthly, 0);
});

/**
 * Not in the spec's table, and worth pinning because 01-pricing.md calls
 * $2,150 + $489 the "largest possible build". It is the largest without the
 * Second Location add-on; with it, the ceiling is this.
 */
test('the true ceiling, with Second Location: $2,350 + $519/mo', () => {
  const q = quote(EVERY_SYSTEM);
  assert.equal(q.price.setup, 2350);
  assert.equal(q.price.monthly, 519);
});
