/**
 * The four service pages, in one list.
 *
 * ⚠️ WHY THERE ARE FOUR AND NOT THIRTY. The obvious version of this file is a
 * matrix — five services times six metro-Atlanta towns — and it is the single
 * worst thing that could be done to this domain. Thirty pages that differ by a
 * town name are a doorway-page set: Google's own spam policy names them, and
 * the penalty lands on the whole site, not on the thirty. So the rule this file
 * exists to hold is:
 *
 *   A PAGE GOES IN THIS LIST WHEN THERE ARE 400+ WORDS THAT ARE TRUE OF THAT
 *   SERVICE AND OF NOTHING ELSE ON THE SITE. No city variants, ever. No page
 *   that is another page with the nouns swapped. If the fifth idea can only be
 *   written by rewording one of these four, it is not a fifth page.
 *
 * The service area is handled the honest way instead: it is a sentence in the
 * copy of each page (he is in Atlanta, he drives out) and structured data on
 * the route. It is not thirty landing pages and it is not a fake local anecdote.
 *
 * `note` is the one-line description used in the cross-link block at the foot of
 * every service page. It is what that page teaches, not a pitch — a reader who
 * has just read one of these is deciding whether the next one is worth their
 * time, and a sales line there reads as a menu of upsells.
 */

export type ServiceSlug =
  | 'online-ordering'
  | 'restaurant-websites'
  | 'ai-phone-answering'
  | 'google-business-profile';

export type Service = {
  slug: ServiceSlug;
  /** The mono ledger label at the top of the page, and the cross-link title. */
  label: string;
  /** One line, in the cross-link block. What the page teaches. */
  note: string;
};

export const SERVICES: readonly Service[] = [
  {
    slug: 'online-ordering',
    label: 'Online ordering',
    note: 'Why marking a plate up on the app raises the fee with it, and what your own order page has to do to be worth having.',
  },
  {
    slug: 'restaurant-websites',
    label: 'Websites',
    note: 'The ten things I measure on a food business site, the thresholds I measure them against, and what each one costs you.',
  },
  {
    slug: 'ai-phone-answering',
    label: 'AI phone',
    note: 'What an AI phone line does on a real call, what it gets wrong, and how to catch it getting things wrong in week one.',
  },
  {
    slug: 'google-business-profile',
    label: 'Google listing',
    note: 'Hours, categories, the attributes people filter on, photos and reviews — and the one ranking factor nobody can sell you.',
  },
] as const;

/** Everything except the page you are on. Used for the cross-link block. */
export function otherServices(current: ServiceSlug): readonly Service[] {
  return SERVICES.filter((s) => s.slug !== current);
}
