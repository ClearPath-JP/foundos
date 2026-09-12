import { SITE_URL } from '@/app/site';
import { PACKAGES, SERVICES, SYSTEMS, WEBSITE, quote, type SystemStatus } from '@/config/pricing';

import { PACKAGE_COPY, SERVICE_COPY, SYSTEM_COPY, WEBSITE_COPY } from './catalog';

/**
 * Structured data for the two shop pages: an OfferCatalog per page, one Offer
 * per thing for sale, each carrying its setup and monthly price.
 *
 * ⚠️ NOTHING HERE MAY CLAIM ANYTHING THE PAGE DOES NOT — the rule the
 * homepage's graph lives by. Every price comes from quote() or the catalog,
 * the same source the visible page reads, so the markup cannot drift from what
 * a visitor sees. A coming-soon system is marked PreOrder, not InStock.
 *
 * The provider points at the homepage's `#business` node rather than
 * describing the company a second time. It carries a name and url as well so
 * the node still means something to a consumer that does not follow the @id.
 */

const PROVIDER = { '@type': 'ProfessionalService', '@id': `${SITE_URL}/#business`, name: 'foundos', url: SITE_URL };
const AREA = { '@type': 'City', name: 'Atlanta', containedInPlace: { '@type': 'State', name: 'Georgia' } };

function offer(name: string, description: string, url: string, setup: number, monthly: number, status: SystemStatus) {
  return {
    '@type': 'Offer',
    name,
    description,
    url,
    price: setup,
    priceCurrency: 'USD',
    priceSpecification: [
      { '@type': 'UnitPriceSpecification', name: 'Setup', price: setup, priceCurrency: 'USD' },
      {
        '@type': 'UnitPriceSpecification',
        name: 'Monthly',
        price: monthly,
        priceCurrency: 'USD',
        referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
      },
    ],
    availability: status === 'live' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
    areaServed: AREA,
    seller: PROVIDER,
  };
}

/**
 * A service's offer. Only the prices it actually has are stated: a one-time job
 * carries no monthly spec, and an ask-only service is left out of the graph
 * entirely rather than published with a price of zero.
 */
function serviceOffer(slug: string, url: string) {
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s || s.ask) return null;
  const copy = SERVICE_COPY[slug];
  const specs = [];
  if (s.oneTime !== undefined) {
    specs.push({ '@type': 'UnitPriceSpecification', name: 'One time', price: s.oneTime, priceCurrency: 'USD' });
  }
  if (s.monthly !== undefined) {
    specs.push({
      '@type': 'UnitPriceSpecification',
      name: 'Monthly',
      price: s.monthly,
      priceCurrency: 'USD',
      referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
    });
  }
  return {
    '@type': 'Offer',
    name: s.name,
    description: copy?.headline ? `${copy.headline} ${s.note}` : s.note,
    url: `${url}#${s.slug}`,
    price: s.oneTime ?? s.monthly,
    priceCurrency: 'USD',
    priceSpecification: specs,
    availability: s.status === 'live' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
    areaServed: AREA,
    seller: PROVIDER,
  };
}

export function systemsJsonLd() {
  const url = `${SITE_URL}/systems`;
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${url}#catalog`,
    name: 'foundos systems for food trucks and restaurants',
    url,
    provider: PROVIDER,
    itemListElement: [
      offer(WEBSITE.name, WEBSITE_COPY.headline, `${url}#website`, WEBSITE.setup, WEBSITE.monthly, 'live'),
      ...SYSTEMS.map((s) =>
        offer(
          s.name,
          `${SYSTEM_COPY[s.slug].headline} Added on top of the website.`,
          `${url}#${s.slug}`,
          s.setup,
          s.monthly,
          s.status,
        ),
      ),
      ...SERVICES.map((s) => serviceOffer(s.slug, url)).filter((o) => o !== null),
    ],
  };
}

export function pricingJsonLd() {
  const url = `${SITE_URL}/pricing`;
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    '@id': `${url}#catalog`,
    name: 'foundos packages for food trucks and restaurants',
    url,
    provider: PROVIDER,
    itemListElement: PACKAGES.map((p) => {
      const q = quote(p.systems);
      const names = q.lines.map((l) => l.name).join(', ');
      return offer(
        p.name,
        `${PACKAGE_COPY[p.slug]} Includes: ${names}.`,
        `${url}#${p.slug}`,
        q.price.setup,
        q.price.monthly,
        q.hasComingSoon ? 'coming_soon' : 'live',
      );
    }),
  };
}

/** Serialised for a <script> tag. Escaping "<" stops a string ever closing the tag early. */
export function ldScript(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
