import { getTranslations } from 'next-intl/server';

import { LeadForm } from '@/components/forms/lead-form';

export async function GetEstimateSection() {
  const t = await getTranslations('Home');

  return (
    <section id="get-estimate" className="scroll-mt-20 bg-secondary/40 py-16 md:py-24">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {t('estimateTitle')}
        </h2>
        <p className="mt-2 text-muted-foreground">{t('estimateSubtitle')}</p>
      </div>
      <div className="mx-auto mt-8 max-w-xl px-4 sm:px-6">
        <LeadForm />
      </div>
    </section>
  );
}
