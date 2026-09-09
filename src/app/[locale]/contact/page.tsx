import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Mail, MapPin, Phone } from 'lucide-react';

import { siteConfig } from '@/lib/site-config';
import { LeadForm } from '@/components/forms/lead-form';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { en: '/en/contact', pt: '/pt/contact', es: '/es/contact' }
    }
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Contact');

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

      <section className="mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold text-foreground">{t('infoTitle')}</h2>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={siteConfig.phone.href}
              className="flex items-center gap-3 text-foreground hover:text-primary"
            >
              <Phone className="size-4 text-primary" aria-hidden="true" />
              {siteConfig.phone.display}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 text-foreground hover:text-primary"
            >
              <Mail className="size-4 text-primary" aria-hidden="true" />
              {siteConfig.email}
            </a>
            <p className="flex items-start gap-3 text-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}, {siteConfig.address.state}{' '}
                {siteConfig.address.zip}
              </span>
            </p>
          </div>

          <ul className="mt-6 flex flex-col gap-1 text-sm text-muted-foreground">
            {siteConfig.hours.map((entry) => (
              <li key={entry.day} className="flex justify-between gap-4">
                <span>{entry.day}</span>
                <span>{entry.time}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-sm font-semibold text-foreground">{t('mapTitle')}</h2>
          {/*
            Centered on Philadelphia generally, not a specific pinned address --
            siteConfig.address.street is still a placeholder (see lib/site-config.ts).
            Swap the query below for the real street address once confirmed.
          */}
          <div className="mt-4 aspect-4/3 overflow-hidden rounded-lg border border-border">
            <iframe
              title={t('mapTitle')}
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                `${siteConfig.address.city}, ${siteConfig.address.state}`
              )}&output=embed`}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">{t('formTitle')}</h2>
          <div className="mt-4">
            <LeadForm />
          </div>
        </div>
      </section>
    </main>
  );
}
