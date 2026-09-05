/**
 * The service-page family — four routes that share chrome, a stylesheet and a
 * next step, and share nothing else.
 *
 * A page is:
 *
 *     import { ServicePage } from '@/components/service';
 *
 *     export const metadata: Metadata = { … };   // its own, distinct
 *     export default function Page() {
 *       return (
 *         <ServicePage slug="…" label="…" h1="…" stand="…" close="…">
 *           …sections…
 *         </ServicePage>
 *       );
 *     }
 *
 * ⚠️ THIS BARREL PULLS THE THREE FONTS IN WITH IT, through '@/components/site'.
 * That is correct for a page built on this design system and wrong for a route
 * that wants one piece of it — see the note at the top of components/site/index.ts.
 *
 * ⚠️ WHY THIS FOLDER EXISTS INSTEAD OF FOUR MORE FILES IN components/site/.
 * Everything in components/site is on the live, signed-off homepage. Nothing in
 * here is. Keeping the two apart means a change to a service page can never
 * reach src/app/page.tsx by accident, which is the property that matters most
 * about this whole family.
 */
export { SERVICE_CSS } from './css';
export { serviceMetadata, type ServiceMetadataInput } from './metadata';
export { ServicePage, type ServicePageProps } from './ServicePage';
export { SERVICES, otherServices, type Service, type ServiceSlug } from './services';
