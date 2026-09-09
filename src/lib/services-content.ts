import { Bath, ChefHat, HardHat, type LucideIcon } from 'lucide-react';
import type { ServiceSlug } from '@/lib/site-config';

/**
 * Numeric cost ranges, kept separate from the translated copy in messages/*.json
 * because they're also used to build Service/Offer JSON-LD (structured data
 * doesn't get localized text, just numbers + a currency code).
 *
 * Sourced from published 2026 Philadelphia-market remodeling cost guides
 * (general market data, not an ARL Service quote) — review periodically.
 */
export const SERVICE_PAGES: Record<
  ServiceSlug,
  { icon: LucideIcon; priceRangeLow: number; priceRangeHigh: number }
> = {
  'kitchen-remodeling': { icon: ChefHat, priceRangeLow: 20000, priceRangeHigh: 60000 },
  'bathroom-remodeling': { icon: Bath, priceRangeLow: 10000, priceRangeHigh: 50000 },
  'home-renovation': { icon: HardHat, priceRangeLow: 40000, priceRangeHigh: 150000 }
};

export const SERVICE_SLUGS: ServiceSlug[] = [
  'kitchen-remodeling',
  'bathroom-remodeling',
  'home-renovation'
];
