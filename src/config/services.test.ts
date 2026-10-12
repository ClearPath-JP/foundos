/**
 * Checks the prices in services.ts, the one price source for the site.
 *
 *     npm run test:services
 *
 * Runs on Node 24's built-in type stripping and test runner — no packages. If a number here fails, either a price
 * changed on purpose (update this table with Josh's approval) or something broke.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { NEXT_STEPS, SERVICES, TERMS } from './services.ts';

const bySlug = (slug: string) => {
  const s = SERVICES.find((x) => x.slug === slug);
  assert.ok(s, slug);
  return s;
};

test('prices are the confirmed numbers (Josh, 2026-10-12)', () => {
  assert.deepEqual(bySlug('website-care').price, { kind: 'monthly', monthly: 299, setup: 0 });
  assert.deepEqual(bySlug('growth').price, { kind: 'monthly', monthly: 499, setup: 0 });
  assert.deepEqual(bySlug('direct-ordering').price, { kind: 'from', oneTime: 1500 });
});

test('Growth is stated as the total, not an add-on', () => {
  assert.match(bySlug('growth').priceNote, /total/i);
});

test('the retired 2026-10-11 draft prices are gone', () => {
  const all = JSON.stringify(SERVICES);
  for (const n of [/\b150\b/, /\b125\b/, /\b850\b/, /\b300\b/, /\b400\b/]) assert.ok(!n.test(all), `found ${n}`);
});

test('no minimum term, no ranking guarantee, no launch-date promise', () => {
  const text = JSON.stringify({ SERVICES, TERMS, NEXT_STEPS }).toLowerCase();
  for (const bad of ['12-month', 'month term', 'minimum term', 'guaranteed ranking', 'rank #1', 'live in']) {
    assert.ok(!text.includes(bad), `found "${bad}"`);
  }
});
