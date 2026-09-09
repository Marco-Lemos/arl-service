import { getTranslations } from 'next-intl/server';
import { Camera } from 'lucide-react';

import { createSupabasePublicClient } from '@/lib/supabase';
import { BeforeAfterSlider } from '@/components/sections/before-after-slider';

export async function PortfolioSection() {
  const t = await getTranslations('Home');
  const supabase = createSupabasePublicClient();

  const { data: projects } = await supabase
    .from('portfolio')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  return (
    <section className="bg-secondary/40 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {t('portfolioTitle')}
        </h2>

        {projects && projects.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <p className="text-sm text-muted-foreground">{project.location}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-16 text-center">
            <Camera className="size-6 text-muted-foreground" aria-hidden="true" />
            <p className="font-semibold text-foreground">{t('portfolioEmptyTitle')}</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              {t('portfolioEmptyBody')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
