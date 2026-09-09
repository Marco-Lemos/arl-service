import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Points explicitly at src/i18n/request.ts (auto-detection also finds this,
// but being explicit keeps the wiring obvious for the next engineer).
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    // Requirement #3: every image is served as WebP/AVIF via next/image.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        // Portfolio before/after photos live in Supabase Storage.
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**'
      }
    ]
  }
};

export default withNextIntl(nextConfig);
