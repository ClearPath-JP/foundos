/**
 * The shop — /systems and /pricing. Prices live in config/pricing.ts; the words
 * live in ./catalog.ts; this folder only draws them.
 */
export { SHOP_CSS } from './css';
export {
  AdsCard,
  PackageRow,
  ServiceCard,
  SoonMark,
  SoonRow,
  StatusMark,
  SystemCard,
  WebsiteCard,
} from './cards';
export {
  ADS_COPY,
  PACKAGE_COPY,
  SERVICE_COPY,
  STATUS_LABEL,
  SYSTEM_COPY,
  WEBSITE_COPY,
  textAbout,
} from './catalog';
export { ldScript, pricingJsonLd, systemsJsonLd } from './jsonld';
