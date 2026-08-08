import type { BizCategory } from './types';

/**
 * Map a Google Places `primaryType` / `types[]` onto the five check sets.
 * `other` runs universal checks only, which is the honest default — guessing a
 * category we can't support produces checks that don't apply.
 */

const RESTAURANT = new Set([
  'restaurant', 'bakery', 'bar', 'cafe', 'coffee_shop', 'fast_food_restaurant',
  'meal_delivery', 'meal_takeaway', 'pizza_restaurant', 'sandwich_shop',
  'ice_cream_shop', 'juice_shop', 'dessert_shop', 'bar_and_grill',
  'breakfast_restaurant', 'brunch_restaurant', 'diner', 'food_court',
  'steak_house', 'sushi_restaurant', 'barbecue_restaurant', 'deli',
  'caribbean_restaurant', 'american_restaurant', 'mexican_restaurant',
  'italian_restaurant', 'chinese_restaurant', 'indian_restaurant',
  'thai_restaurant', 'vietnamese_restaurant', 'seafood_restaurant',
  'vegan_restaurant', 'vegetarian_restaurant', 'wine_bar', 'pub',
]);

const STUDIO = new Set([
  'gym', 'fitness_center', 'yoga_studio', 'dance_school', 'martial_arts_school',
  'pilates_studio', 'sports_club', 'sports_coaching', 'swimming_school',
  'beauty_salon', 'hair_salon', 'nail_salon', 'barber_shop', 'spa',
  'massage', 'skin_care_clinic', 'tanning_studio', 'wellness_center',
  'physiotherapist', 'school', 'music_school', 'art_school',
]);

const SHOP = new Set([
  'store', 'clothing_store', 'shoe_store', 'jewelry_store', 'book_store',
  'furniture_store', 'gift_shop', 'grocery_store', 'convenience_store',
  'hardware_store', 'home_goods_store', 'pet_store', 'sporting_goods_store',
  'electronics_store', 'florist', 'liquor_store', 'supermarket',
  'auto_parts_store', 'bicycle_store', 'market',
]);

const SERVICE = new Set([
  'plumber', 'electrician', 'roofing_contractor', 'general_contractor',
  'painter', 'moving_company', 'storage', 'car_repair', 'car_wash',
  'laundry', 'dry_cleaner', 'locksmith', 'lawyer', 'accounting',
  'insurance_agency', 'real_estate_agency', 'travel_agency', 'veterinary_care',
  'dentist', 'doctor', 'hvac_contractor', 'landscaper', 'pest_control_service',
  'cleaning_service', 'photographer', 'consultant', 'tutor_service',
]);

function classifyOne(type: string): BizCategory | null {
  if (RESTAURANT.has(type)) return 'restaurant';
  if (STUDIO.has(type)) return 'studio';
  if (SHOP.has(type)) return 'shop';
  if (SERVICE.has(type)) return 'service';
  return null;
}

export function categorize(
  primaryType: string | null | undefined,
  types: string[] = []
): BizCategory {
  if (primaryType) {
    const direct = classifyOne(primaryType);
    if (direct) return direct;
  }
  for (const t of types) {
    const hit = classifyOne(t);
    if (hit) return hit;
  }
  // Broad Google buckets, checked last so a specific type always wins.
  if (types.includes('food')) return 'restaurant';
  if (types.includes('health') || types.includes('sports_complex')) return 'studio';
  if (types.includes('shopping_mall') || types.includes('store')) return 'shop';
  return 'other';
}

/** Human label for the report header. Falls back to nothing rather than a guess. */
export function categoryLabel(primaryType: string | null | undefined): string | null {
  if (!primaryType) return null;
  return primaryType
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
