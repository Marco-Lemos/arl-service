import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ChevronLeft } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { siteConfig, type ServiceSlug } from '@/lib/site-config';
import { SERVICE_PAGES, SERVICE_SLUGS } from '@/lib/services-content';
import { GetEstimateSection } from '@/components/sections/get-estimate-section';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({ locale, slug }))
  );
}

function isServiceSlug(slug: string): slug is ServiceSlug {
  return (SERVICE_SLUGS as string[]).includes(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isServiceSlug(slug)) return {};

  const t = await getTranslations({ locale, namespace: 'ServicePages' });

  return {
    title: t(`${slug}.title`),
    description: t(`${slug}.metaDescription`),
    alternates: {
      canonical: `/${locale}/services/${slug}`,
      languages: {
        en: `/en/services/${slug}`,
        pt: `/pt/services/${slug}`,
        es: `/es/services/${slug}`
      }
    }
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isServiceSlug(slug)) notFound();

  setRequestLocale(locale);

  const t = await getTranslations('ServicePages');
  const tDetail = await getTranslations('ServiceDetail');
  const { icon: Icon, priceRangeLow, priceRangeHigh } = SERVICE_PAGES[slug];

  const overview = t.raw(`${slug}.overview`) as string[];
  const whatsIncluded = t.raw(`${slug}.whatsIncluded`) as string[];
  const faqs = t.raw(`${slug}.faqs`) as { question: string; answer: string }[];

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: t(`${slug}.title`),
    provider: {
      '@type': 'GeneralContractor',
      name: siteConfig.name,
      telephone: siteConfig.phone.href.replace('tel:', '')
    },
    areaServed: {
      '@type': 'City',
      name: siteConfig.address.city,
      containedInPlace: { '@type': 'State', name: 'Pennsylvania' }
    },
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: priceRangeLow,
        maxPrice: priceRangeHigh,
        priceCurrency: 'USD'
      }
    }
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="border-b border-border bg-secondary/40 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            {tDetail('backToServices')}
          </Link>
          <div className="mt-4 flex size-12 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Icon className="size-6" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            {t(`${slug}.title`)}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t(`${slug}.heroSubtitle`)}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex flex-col gap-4 text-foreground">
            {overview.map((paragraph, i) => (
              <p key={i} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">
            {tDetail('whatsIncludedTitle')}
          </h2>
          <ul className="mt-3 flex flex-col gap-2">
            {whatsIncluded.map((item) => (
              <li key={item} className="text-sm text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {tDetail('faqTitle')}
          </h2>
          <div className="mt-6 flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
            {faqs.map((faq) => (
              <details key={faq.question} className="group p-5">
                <summary className="cursor-pointer list-none font-semibold text-foreground marker:content-none">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <GetEstimateSection />
    </main>
  );
}
