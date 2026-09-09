import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { services, siteConfig } from '@/lib/site-config';

export async function Footer() {
  const t = await getTranslations('Footer');
  const tNav = await getTranslations('Nav');

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="text-lg font-black tracking-tight">{siteConfig.name}</p>
          <p className="mt-3 max-w-[26ch] text-sm text-background/70">
            {t('tagline')}
          </p>
        </div>

        <FooterColumn title={t('servicesHeading')}>
          {services.map((service) => (
            <FooterLink key={service.slug} href={`/services/${service.slug}`}>
              {tNav(service.nameKey)}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title={t('companyHeading')}>
          <FooterLink href="/portfolio">{tNav('portfolio')}</FooterLink>
          <FooterLink href="/contact">{tNav('getEstimate')}</FooterLink>
        </FooterColumn>

        <FooterColumn title={t('contactHeading')}>
          <address className="flex flex-col gap-1.5 text-sm text-background/70 not-italic">
            <a href={siteConfig.phone.href} className="hover:text-background">
              {siteConfig.phone.display}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-background">
              {siteConfig.email}
            </a>
            <span>
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}, {siteConfig.address.state}{' '}
              {siteConfig.address.zip}
            </span>
          </address>
          <ul className="mt-4 flex flex-col gap-1 text-sm text-background/70">
            {siteConfig.hours.map((entry) => (
              <li key={entry.day} className="flex justify-between gap-4">
                <span>{entry.day}</span>
                <span>{entry.time}</span>
              </li>
            ))}
          </ul>
        </FooterColumn>
      </div>

      <div className="border-t border-background/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-background/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            {siteConfig.license.label} {siteConfig.license.number} ·{' '}
            {t('licensedInsured')}
          </p>
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {t('rightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-background">{title}</p>
      <div className="mt-3 flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-background/70 hover:text-background">
      {children}
    </Link>
  );
}
