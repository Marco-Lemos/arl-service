import { setRequestLocale } from 'next-intl/server';

import { siteConfig } from '@/lib/site-config';
import { HeroSection } from '@/components/sections/hero-section';
import { TrustBadges } from '@/components/sections/trust-badges';
import { ServicesSection } from '@/components/sections/services-section';
import { PortfolioSection } from '@/components/sections/portfolio-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { GetEstimateSection } from '@/components/sections/get-estimate-section';

// The portfolio query needs `cookies()` (via the Supabase server client),
// which otherwise forces this page to fully dynamic (server-rendered on
// every request). ISR keeps it effectively static for Core Web Vitals while
// still picking up new portfolio projects within the hour, no redeploy needed.
export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const generalContractorJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone.href.replace('tel:', ''),
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country
    },
    areaServed: { '@type': 'City', name: siteConfig.address.city },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00'
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generalContractorJsonLd) }}
      />

      <HeroSection />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <TrustBadges />
      </section>

      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <GetEstimateSection />
    </main>
  );
}
