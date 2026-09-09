import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/lib/site-config';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { ServicesMenu } from '@/components/layout/services-menu';
import { MobileNav } from '@/components/layout/mobile-nav';

export async function Header() {
  const t = await getTranslations('Nav');

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="whitespace-nowrap text-lg font-black tracking-tight text-foreground"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink href="/">{t('home')}</NavLink>
          <ServicesMenu />
          <NavLink href="/portfolio">{t('portfolio')}</NavLink>
          <NavLink href="/contact">{t('contact')}</NavLink>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher label={t('language')} />
          <Button asChild>
            <Link href="/contact">{t('getEstimate')}</Link>
          </Button>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-2 text-[0.95rem] font-medium text-foreground hover:bg-muted"
    >
      {children}
    </Link>
  );
}
