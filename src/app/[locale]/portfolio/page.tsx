import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Camera } from 'lucide-react';

import { createSupabasePublicClient } from '@/lib/supabase';
import { BeforeAfterSlider } from '@/components/sections/before-after-slider';
import { GetEstimateSection } from '@/components/sections/get-estimate-section';

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Portfolio' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/portfolio`,
      languages: { en: '/en/portfolio', pt: '/pt/portfolio', es: '/es/portfolio' }
    }
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Portfolio');
  const supabase = createSupabasePublicClient();

  const { data: projects } = await supabase
    .from('portfolio')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(24);

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
        {projects && projects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id}>
                <BeforeAfterSlider
                  beforeImageUrl={project.before_image_url}
                  afterImageUrl={project.after_image_url}
                  beforeLabel="Before"
                  afterLabel="After"
                  alt={project.title}
                />
                <p className="mt-3 font-semibold text-foreground">{project.title}</p>
                {project.description ? (
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                ) : null}
                <p className="text-sm text-muted-foreground">{project.location}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-20 text-center">
            <Camera className="size-6 text-muted-foreground" aria-hidden="true" />
            <p className="font-semibold text-foreground">{t('emptyTitle')}</p>
            <p className="max-w-sm text-sm text-muted-foreground">{t('emptyBody')}</p>
          </div>
        )}
      </section>

      <GetEstimateSection />
    </main>
  );
}
