import { getTranslations } from 'next-intl/server';
import { ShieldCheck } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/lib/site-config';
import { Button } from '@/components/ui/button';

export async function HeroSection() {
  const t = await getTranslations('Home');

  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-20 sm:px-6 md:py-28">
        <h1 className="max-w-3xl text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {t('heroTitle')}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">{t('heroSubtitle')}</p>

        <div className="mt-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button asChild size="lg">
            <Link href="#get-estimate">{t('heroCta')}</Link>
          </Button>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
            {siteConfig.license.label} · {siteConfig.address.city}, {siteConfig.address.state}
          </p>
        </div>
      </div>

      <RowhouseSilhouette />
    </section>
  );
}

/**
 * A simple, hand-drawn skyline of Philadelphia-style flat-roofed rowhouses —
 * a decorative accent grounded in the actual local architecture, not a
 * stock photo standing in for real project photography we don't have yet.
 */
function RowhouseSilhouette() {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="block h-16 w-full text-primary/10 sm:h-20"
    >
      <rect x="0" y="40" width="90" height="80" fill="currentColor" />
      <rect x="90" y="55" width="70" height="65" fill="currentColor" opacity="0.7" />
      <rect x="160" y="30" width="100" height="90" fill="currentColor" />
      <rect x="260" y="60" width="60" height="60" fill="currentColor" opacity="0.7" />
      <rect x="320" y="45" width="85" height="75" fill="currentColor" />
      <rect x="405" y="20" width="95" height="100" fill="currentColor" opacity="0.85" />
      <rect x="500" y="55" width="70" height="65" fill="currentColor" opacity="0.7" />
      <rect x="570" y="35" width="100" height="85" fill="currentColor" />
      <rect x="670" y="50" width="65" height="70" fill="currentColor" opacity="0.7" />
      <rect x="735" y="25" width="90" height="95" fill="currentColor" opacity="0.85" />
      <rect x="825" y="55" width="75" height="65" fill="currentColor" />
      <rect x="900" y="40" width="95" height="80" fill="currentColor" opacity="0.7" />
      <rect x="995" y="20" width="85" height="100" fill="currentColor" />
      <rect x="1080" y="55" width="70" height="65" fill="currentColor" opacity="0.7" />
      <rect x="1150" y="45" width="50" height="75" fill="currentColor" />
    </svg>
  );
}
