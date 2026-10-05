/**
 * Audit accuracy regression tests (2026-10-04).
 *
 *     node --test src/lib/report/report.test.ts
 *
 * Node 24's built-in runner and type stripping, no packages. fetch is replaced with a local fake, sites are
 * addressed by public IP literals so no DNS lookup happens, and Google Places is never called: PlaceFacts are
 * built by hand. The one DNS case uses the reserved .invalid domain, which never resolves.
 *
 * The bug these pin down: a real diner's host answered our checker with 403, and the scan then marked Website,
 * Mobile, Local search and Direct ordering "Missing". A refused automated fetch is not proof customers can't open a
 * site, so it must come back "Unable to verify", never as a pile of failures, and the score must not count it.
 */
import { afterEach, describe, test } from 'node:test';
import assert from 'node:assert/strict';

import { siteDiscoveries } from './discoveries.ts';
import { deriveFindings } from './findings.ts';
import { growthScore, MIN_VERIFIED } from './score.ts';
import { checkSite } from './site-checks.ts';
import { failureKindForStatus } from './site-status.ts';
import type { Facts, PlaceFacts, SiteFacts } from './types';

const SITE = 'https://93.184.216.34/';
const realFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = realFetch;
});

type Route = (url: URL, init?: RequestInit) => Response | Promise<Response>;

/** Every request goes to `homepage` for the root, `other` for anything else (link checks). */
function fakeFetch(homepage: Route, other: Route = () => new Response('ok', { status: 200 })) {
  const calls: string[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url);
    calls.push(`${init?.method ?? 'GET'} ${url.href}`);
    return url.pathname === '/' ? homepage(url, init) : other(url, init);
  }) as typeof fetch;
  return calls;
}

function html(body: string, head = '<meta name="viewport" content="width=device-width">'): string {
  // Enough real text to count as a readable page (site-checks needs 300+ characters).
  const filler =
    'Family owned since 1998. Breakfast all day, fresh pies every morning, and the same booth you sat in last ' +
    'week. Stop in for lunch specials, coffee refills and the best patty melt in Cobb County, served with a smile. ';
  return `<!doctype html><html><head><title>Diner</title>${head}</head><body><p>${filler}${filler}</p>${body}</body></html>`;
}

function place(over: Partial<PlaceFacts> = {}): PlaceFacts {
  return {
    id: 'p1',
    name: 'Test Diner',
    address: '1 Main St, Marietta, GA',
    category: 'restaurant',
    primaryType: 'restaurant',
    googleTypes: ['restaurant'],
    website: SITE,
    phone: '+1 770 555 0100',
    rating: 4.5,
    reviewCount: 800,
    hoursSet: true,
    businessStatus: 'OPERATIONAL',
    takeout: true,
    delivery: false,
    dineIn: true,
    reservable: false,
    curbsidePickup: null,
    googlePhotoCount: 10,
    ...over,
  };
}

const facts = (site: SiteFacts, over: Partial<PlaceFacts> = {}): Facts => ({ place: place(over), site, answers: {} });
const status = (f: Facts, key: string) => growthScore(f).areas.find((a) => a.key === key)?.status;
const codes = (f: Facts) => deriveFindings(f).map((x) => x.code);

const SITE_DEPENDENT_CODES = [
  'site_unreachable',
  'no_viewport',
  'no_tel',
  'no_schema',
  'no_ordering_at_all',
  'marketplace_only',
  'menu_not_readable',
  'few_photos',
];

describe('blocked request (HTTP 403)', () => {
  test('the error page is not read as the homepage', async () => {
    // A bot wall page that happens to mention ordering and DoorDash, and has no viewport tag.
    fakeFetch(() => new Response('<html><body>Access denied. <a href="https://doordash.com/x">Order</a></body></html>', { status: 403 }));
    const site = await checkSite(SITE);
    assert.equal(site.reachable, false);
    assert.equal(site.failureKind, 'blocked');
    assert.equal(site.status, 403);
    assert.equal(site.hasViewportMeta, null);
    assert.equal(site.hasTelLink, null);
    assert.deepEqual(site.marketplaceLinks, []);
    assert.match(site.failureReason ?? '', /turned away our automated check/);
  });

  test('every site-dependent area is "unknown", none is a failure', async () => {
    fakeFetch(() => new Response('denied', { status: 403 }));
    const f = facts(await checkSite(SITE));
    for (const key of ['website', 'mobile', 'seo', 'ordering']) assert.equal(status(f, key), 'unknown', key);
    const fails = growthScore(f).areas.filter((a) => a.status === 'fail');
    assert.deepEqual(fails, []);
  });

  test('the score is withheld with a reason, and the note says customers may be fine', async () => {
    fakeFetch(() => new Response('denied', { status: 403 }));
    const score = growthScore(facts(await checkSite(SITE)));
    assert.equal(score.score, null);
    assert.match(score.withheldReason ?? '', /couldn’t open your website/);
    const website = score.areas.find((a) => a.key === 'website')!;
    assert.match(website.note, /doesn’t mean customers can’t open it/);
  });

  test('no negative findings come from the refused fetch', async () => {
    fakeFetch(() => new Response('denied', { status: 403 }));
    const found = codes(facts(await checkSite(SITE)));
    for (const c of SITE_DEPENDENT_CODES) assert.ok(!found.includes(c), c);
  });

  test('the live discovery line is neutral, not bad news', async () => {
    fakeFetch(() => new Response('denied', { status: 403 }));
    const lines = siteDiscoveries(await checkSite(SITE));
    assert.equal(lines.length, 1);
    assert.equal(lines[0].tone, 'neutral');
  });

  test('429 and 451 are treated as bot walls too', async () => {
    for (const code of [429, 451]) {
      fakeFetch(() => new Response('slow down', { status: code }));
      assert.equal((await checkSite(SITE)).failureKind, 'blocked', String(code));
    }
    // LinkedIn-style 999 can't be built as a Response in Node, so check the mapping itself.
    assert.equal(failureKindForStatus(999), 'blocked');
  });
});

describe('timeout', () => {
  test('a timed-out fetch is inconclusive, not a failure', async () => {
    fakeFetch(() => {
      throw new DOMException('The operation was aborted due to timeout', 'TimeoutError');
    });
    const site = await checkSite(SITE);
    assert.equal(site.failureKind, 'timeout');
    const f = facts(site);
    assert.equal(status(f, 'website'), 'unknown');
    assert.equal(growthScore(f).score, null);
    for (const c of SITE_DEPENDENT_CODES) assert.ok(!codes(f).includes(c), c);
  });

  test('a 5xx is inconclusive too', async () => {
    fakeFetch(() => new Response('oops', { status: 503 }));
    const site = await checkSite(SITE);
    assert.equal(site.failureKind, 'server_error');
    assert.equal(status(facts(site), 'website'), 'unknown');
  });
});

describe('confirmed down', () => {
  test('a homepage 404 is a real problem, reported once', async () => {
    fakeFetch(() => new Response('not found', { status: 404 }));
    const site = await checkSite(SITE);
    assert.equal(site.failureKind, 'not_found');
    const f = facts(site);
    assert.equal(status(f, 'website'), 'fail');
    const found = codes(f);
    assert.ok(found.includes('site_unreachable'));
    // The page was never read, so no "missing tap-to-call" or "no viewport" on top of it.
    assert.ok(!found.includes('no_tel') && !found.includes('no_viewport'));
  });

  test('an address that does not resolve is a real problem', async () => {
    const site = await checkSite('https://this-diner-does-not-exist.invalid/');
    assert.equal(site.failureKind, 'dns');
    assert.equal(status(facts(site, { website: 'https://this-diner-does-not-exist.invalid/' }), 'website'), 'fail');
  });
});

describe('partial results (page built by JavaScript)', () => {
  const shell = '<!doctype html><html><head><meta name="viewport" content="width=device-width"></head><body><div id="root"></div><script src="/app.js"></script></body></html>';

  test('things we could not see are null, not false', async () => {
    fakeFetch(() => new Response(shell, { status: 200 }));
    const site = await checkSite(SITE);
    assert.equal(site.reachable, true);
    assert.equal(site.readable, false);
    assert.equal(site.hasViewportMeta, true);
    assert.equal(site.hasTelLink, null);
    assert.equal(site.hasOrderButton, null);
    assert.equal(site.hasLocalBusinessSchema, null);
    assert.equal(site.photoCount, null);
  });

  test('ordering and search go to Josh by hand; the verified areas still score', async () => {
    fakeFetch(() => new Response(shell, { status: 200 }));
    const f = facts(await checkSite(SITE));
    assert.equal(status(f, 'ordering'), 'manual');
    assert.equal(status(f, 'seo'), 'manual');
    assert.equal(status(f, 'mobile'), 'pass');
    const score = growthScore(f);
    assert.notEqual(score.score, null);
    assert.ok(score.verified >= MIN_VERIFIED);
    const found = codes(f);
    assert.ok(!found.includes('no_tel') && !found.includes('no_ordering_at_all') && !found.includes('no_schema'));
  });
});

describe('confirmed results on a readable page', () => {
  test('no order button, no tap-to-call, no markup: each is a confirmed finding', async () => {
    fakeFetch(() => new Response(html('<a href="/about">About us</a><a href="/hours">Hours</a>'), { status: 200 }));
    const f = facts(await checkSite(SITE));
    assert.equal(status(f, 'ordering'), 'fail');
    const found = codes(f);
    assert.ok(found.includes('no_ordering_at_all'));
    assert.ok(found.includes('no_tel'));
    assert.ok(found.includes('no_schema'));
    assert.equal(typeof growthScore(f).score, 'number');
  });

  test('direct ordering on a known platform passes', async () => {
    fakeFetch(() => new Response(html('<a href="https://www.toasttab.com/test-diner">Order online</a><a href="tel:7705550100">Call</a>'), { status: 200 }));
    const f = facts(await checkSite(SITE));
    assert.equal(status(f, 'ordering'), 'pass');
  });

  test('an order button to a system we do not recognise goes to Josh, not "missing"', async () => {
    fakeFetch(() => new Response(html('<a href="https://orders.example-pos.net/diner">Order pickup</a>'), { status: 200 }));
    const f = facts(await checkSite(SITE));
    assert.equal(status(f, 'ordering'), 'manual');
    assert.ok(!codes(f).includes('no_ordering_at_all'));
  });

  test('a dead "Order" button is reported', async () => {
    fakeFetch(() => new Response(html('<a href="#">Order Online</a>'), { status: 200 }));
    const f = facts(await checkSite(SITE));
    assert.equal(status(f, 'website'), 'fail');
    assert.ok(codes(f).includes('dead_buttons'));
  });
});

describe('scoring rule', () => {
  const okSite = (over: Partial<SiteFacts> = {}): SiteFacts => ({
    checked: true,
    reachable: true,
    finalUrl: SITE,
    https: true,
    status: 200,
    ttfbMs: 200,
    totalMs: 400,
    bytes: 50_000,
    readable: true,
    hasViewportMeta: true,
    hasTelLink: true,
    hasLocalBusinessSchema: true,
    menuIsPdfOrImage: false,
    hasOrderButton: true,
    marketplaceLinks: [],
    directOrderingLinks: ['Toast'],
    bookingLinks: [],
    hasEcommerce: false,
    copyrightYear: null,
    lastModifiedYear: null,
    photoCount: 8,
    stockPhotoHosts: [],
    deadLinks: [],
    scriptCount: 10,
    linkCount: 20,
    failureReason: null,
    failureKind: null,
    ...over,
  });

  test('unknown and manual areas never pull the score down', () => {
    const score = growthScore(facts(okSite(), { rating: null, reviewCount: null }));
    // Reviews unknown, follow-up manual, everything else passes.
    assert.equal(score.score, 100);
    assert.equal(score.opportunities, 0);
    assert.equal(score.verified, score.total - 2);
  });

  test('a warning is half marks over verified areas only', () => {
    const score = growthScore(facts(okSite({ https: false })));
    // 7 verified areas (website, mobile, photos, google, seo, ordering, reviews); website is a warn.
    assert.equal(score.verified, 7);
    assert.equal(score.score, Math.round((6.5 / 7) * 100));
  });

  test(`fewer than ${MIN_VERIFIED} verified areas withholds the number`, () => {
    // A script-built site (so search and photos can't be checked) and a listing that returns very little.
    const score = growthScore(
      facts(okSite({ readable: false, hasTelLink: null, hasLocalBusinessSchema: null, photoCount: null }), {
        category: 'other',
        rating: null,
        reviewCount: null,
        googlePhotoCount: null,
      })
    );
    assert.ok(score.verified < MIN_VERIFIED);
    assert.equal(score.score, null);
    assert.match(score.withheldReason ?? '', /too few/);
  });
});

describe('claims', () => {
  test('a PDF menu is described by what it does on a phone, not by what Google can read', async () => {
    fakeFetch(() => new Response(html('<a href="/files/menu.pdf">Our Menu</a><a href="tel:1">Call</a>'), { status: 200 }));
    const f = facts(await checkSite(SITE));
    const pdf = deriveFindings(f).find((x) => x.code === 'menu_not_readable');
    assert.ok(pdf);
    assert.doesNotMatch(pdf.fact, /google/i);
    const seo = growthScore(f).areas.find((a) => a.key === 'seo')!;
    assert.doesNotMatch(seo.note, /google can/i);
  });

  test('an old footer year is reported as a fact, never as "closed" or "abandoned"', async () => {
    fakeFetch(() => new Response(html('<footer>© 2019 Test Diner</footer><a href="tel:1">Call</a>'), { status: 200 }));
    const f = facts(await checkSite(SITE));
    const stale = deriveFindings(f).find((x) => x.code === 'stale');
    assert.ok(stale);
    assert.doesNotMatch(stale.fact, /closed|abandon/i);
    for (const a of growthScore(f).areas) assert.doesNotMatch(a.note, /closed|abandon/i);
  });
});
