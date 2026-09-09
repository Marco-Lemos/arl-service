import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import { SERVICE_SLUGS } from '@/lib/services-content';

const SITE_URL = 'https://arlservice.online';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', '/services', '/portfolio', '/contact'];
  const servicePaths = SERVICE_SLUGS.map((slug) => `/services/${slug}`);
  const paths = [...staticPaths, ...servicePaths];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`])
        )
      }
    }))
  );
}
