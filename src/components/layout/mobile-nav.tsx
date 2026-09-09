'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { services } from '@/lib/site-config';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { LanguageSwitcher } from '@/components/layout/language-switcher';

export function MobileNav() {
  const t = useTranslations('Nav');
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label={t('openMenu')}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-xs">
        <SheetHeader>
          <SheetTitle>{t('menu')}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          <MobileLink href="/" onNavigate={() => setOpen(false)}>
            {t('home')}
          </MobileLink>
          {services.map((service) => (
            <MobileLink
              key={service.slug}
              href={`/services/${service.slug}`}
              onNavigate={() => setOpen(false)}
            >
              {t(service.nameKey)}
            </MobileLink>
          ))}
          <MobileLink href="/portfolio" onNavigate={() => setOpen(false)}>
            {t('portfolio')}
          </MobileLink>
          <MobileLink href="/contact" onNavigate={() => setOpen(false)}>
            {t('contact')}
          </MobileLink>
        </nav>
        <div className="mt-auto flex flex-col gap-3 border-t border-border p-4">
          <LanguageSwitcher label={t('language')} />
          <Button asChild size="lg" onClick={() => setOpen(false)}>
            <Link href="/contact">{t('getEstimate')}</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MobileLink({
  href,
  onNavigate,
  children
}: {
  href: string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="rounded-md px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
    >
      {children}
    </Link>
  );
}
