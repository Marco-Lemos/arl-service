import { getTranslations } from 'next-intl/server';
import { FileCheck, Hammer, MapPin, ShieldCheck, Star } from 'lucide-react';

import { siteConfig } from '@/lib/site-config';

export async function TrustBadges() {
  const t = await getTranslations('TrustBadges');

  const badges = [
    {
      icon: ShieldCheck,
      label: t('licensedInsured'),
      sublabel: siteConfig.license.label
    },
    {
      icon: Hammer,
      label: t('qualityCraftsmanship'),
      sublabel: t('qualityCraftsmanshipSub'),
      stars: true
    },
    {
      icon: FileCheck,
      label: t('freeEstimates'),
      sublabel: t('freeEstimatesSub')
    },
    {
      icon: MapPin,
      label: t('servingPhiladelphia'),
      sublabel: t('servingPhiladelphiaSub')
    }
  ];

  return (
    <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {badges.map((badge) => (
        <li key={badge.label} className="flex flex-col items-center gap-2 text-center">
          <badge.icon className="size-6 text-primary" aria-hidden="true" />
          {badge.stars ? (
            <div className="flex gap-0.5 text-primary" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
          ) : null}
          <p className="text-sm font-semibold text-foreground">{badge.label}</p>
          <p className="text-xs text-muted-foreground">{badge.sublabel}</p>
        </li>
      ))}
    </ul>
  );
}
