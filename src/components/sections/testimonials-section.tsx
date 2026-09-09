import { getTranslations } from 'next-intl/server';
import { MessageSquareText } from 'lucide-react';

import { createSupabasePublicClient } from '@/lib/supabase';
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel';

export async function TestimonialsSection() {
  const t = await getTranslations('Home');
  const supabase = createSupabasePublicClient();

  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  const testimonials = (data ?? []).map((row) => ({
    id: row.id,
    authorName: row.author_name,
    rating: row.rating as 1 | 2 | 3 | 4 | 5,
    quote: row.quote,
    projectType: row.project_type ?? undefined
  }));

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
        {t('testimonialsTitle')}
      </h2>

      <div className="mt-8">
        {testimonials.length > 0 ? (
          <TestimonialCarousel testimonials={testimonials} />
        ) : (
          <div className="mx-auto flex max-w-sm flex-col items-center gap-3 text-center">
            <MessageSquareText className="size-6 text-muted-foreground" aria-hidden="true" />
            <p className="font-semibold text-foreground">{t('testimonialsEmptyTitle')}</p>
            <p className="text-sm text-muted-foreground">{t('testimonialsEmptyBody')}</p>
          </div>
        )}
      </div>
    </section>
  );
}
