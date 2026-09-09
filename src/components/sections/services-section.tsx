import { getTranslations } from 'next-intl/server';
import { Bath, ChefHat, HardHat } from 'lucide-react';

import { services } from '@/lib/site-config';
import { ServiceCard } from '@/components/sections/service-card';

const SERVICE_ICONS = {
  'kitchen-remodeling': ChefHat,
  'bathroom-remodeling': Bath,
  'home-renovation': HardHat
} as const;

export async function ServicesSection() {
  const t = await getTranslations('Home');
  const tServices = await getTranslations('Services');

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {t('servicesTitle')}
        </h2>
        <p className="mt-2 text-muted-foreground">{t('servicesSubtitle')}</p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.slug}
            slug={service.slug}
            icon={SERVICE_ICONS[service.slug]}
            title={tServices(`${service.slug}.title`)}
            description={tServices(`${service.slug}.description`)}
          />
        ))}
      </div>
    </section>
  );
}
