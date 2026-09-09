import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { services } from '@/lib/site-config';
import { SERVICE_PAGES } from '@/lib/services-content';
import { ServiceCard } from '@/components/sections/service-card';
import { GetEstimateSection } from '@/components/sections/get-estimate-section';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicesHub' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/services`,
      languages: { en: '/en/services', pt: '/pt/services', es: '/es/services' }
    }
  };
}

export default async function ServicesHubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('ServicesHub');
  const tServices = await getTranslations('Services');

  return (
    <main>
      <section className="border-b border-border bg-secondary/40 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              slug={service.slug}
              icon={SERVICE_PAGES[service.slug].icon}
              title={tServices(`${service.slug}.title`)}
              description={tServices(`${service.slug}.description`)}
            />
          ))}
        </div>
      </section>

      <GetEstimateSection />
    </main>
  );
}
