import { categorize } from './category';
import type { PlaceCandidate, PlaceFacts } from './types';

/**
 * Google Places API (New) client.
 *
 * Field masks are minimal and fixed — the mask is what drives billing, so
 * adding a field here changes cost. `rating` + `userRatingCount` already put
 * Place Details on the Enterprise SKU (1,000 free calls/month); don't widen
 * this without re-reading §6 of the spec.
 */

const BASE = 'https://places.googleapis.com/v1';

const SEARCH_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.primaryType',
].join(',');

const DETAILS_MASK = [
  'id',
  'displayName',
  'formattedAddress',
  'primaryType',
  'types',
  'websiteUri',
  'nationalPhoneNumber',
  'rating',
  'userRatingCount',
  'regularOpeningHours',
  'businessStatus',
  'takeout',
  'delivery',
  'dineIn',
  'reservable',
  'curbsidePickup',
].join(',');

export class PlacesUnavailableError extends Error {}

type RawPlace = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  primaryType?: string;
  types?: string[];
  websiteUri?: string;
  nationalPhoneNumber?: string;
  rating?: number;
  userRatingCount?: number;
  regularOpeningHours?: { periods?: unknown[]; weekdayDescriptions?: string[] };
  businessStatus?: string;
  takeout?: boolean;
  delivery?: boolean;
  dineIn?: boolean;
  reservable?: boolean;
  curbsidePickup?: boolean;
};

function apiKey(): string {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) throw new PlacesUnavailableError('GOOGLE_PLACES_API_KEY is not set');
  return key;
}

/**
 * Resolve free text to up to 3 candidates. We never guess between multiple
 * matches — showing the wrong business is worse than one extra tap.
 */
export async function searchBusiness(query: string): Promise<PlaceCandidate[]> {
  let res: Response;
  try {
    res = await fetch(`${BASE}/places:searchText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey(),
        'X-Goog-FieldMask': SEARCH_MASK,
      },
      // Bias toward JP's market without excluding anywhere else.
      body: JSON.stringify({ textQuery: query, languageCode: 'en', maxResultCount: 3 }),
      signal: AbortSignal.timeout(8000),
    });
  } catch (err) {
    throw new PlacesUnavailableError(
      err instanceof Error ? err.message : 'Places search failed'
    );
  }

  if (!res.ok) {
    throw new PlacesUnavailableError(`Places search returned ${res.status}`);
  }

  const data = (await res.json()) as { places?: RawPlace[] };
  const places = data.places ?? [];

  return places
    .filter((p): p is RawPlace & { id: string } => Boolean(p.id))
    .slice(0, 3)
    .map((p) => ({
      id: p.id,
      name: p.displayName?.text ?? 'Unnamed business',
      address: p.formattedAddress ?? null,
      primaryType: p.primaryType ?? null,
    }));
}

export async function placeDetails(placeId: string): Promise<PlaceFacts> {
  let res: Response;
  try {
    res = await fetch(`${BASE}/places/${encodeURIComponent(placeId)}`, {
      headers: {
        'X-Goog-Api-Key': apiKey(),
        'X-Goog-FieldMask': DETAILS_MASK,
      },
      signal: AbortSignal.timeout(8000),
    });
  } catch (err) {
    throw new PlacesUnavailableError(
      err instanceof Error ? err.message : 'Place details failed'
    );
  }

  if (!res.ok) {
    throw new PlacesUnavailableError(`Place details returned ${res.status}`);
  }

  const p = (await res.json()) as RawPlace;
  const types = p.types ?? [];

  return {
    id: p.id ?? placeId,
    name: p.displayName?.text ?? 'Your business',
    address: p.formattedAddress ?? null,
    category: categorize(p.primaryType, types),
    primaryType: p.primaryType ?? null,
    googleTypes: types,
    website: p.websiteUri ?? null,
    phone: p.nationalPhoneNumber ?? null,
    rating: typeof p.rating === 'number' ? p.rating : null,
    reviewCount: typeof p.userRatingCount === 'number' ? p.userRatingCount : null,
    hoursSet: Boolean(p.regularOpeningHours?.periods?.length),
    businessStatus: p.businessStatus ?? null,
    takeout: p.takeout ?? null,
    delivery: p.delivery ?? null,
    dineIn: p.dineIn ?? null,
    reservable: p.reservable ?? null,
    curbsidePickup: p.curbsidePickup ?? null,
  };
}
