import type { LucideIcon } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import type { ServiceSlug } from '@/lib/site-config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ServiceCardProps = {
  slug: ServiceSlug;
  icon: LucideIcon;
  title: string;
  description: string;
};

export function ServiceCard({ slug, icon: Icon, title, description }: ServiceCardProps) {
  return (
    <Link href={`/services/${slug}`} className="group block h-full">
      <Card className="h-full gap-3 py-5 transition-colors group-hover:border-primary/50">
        <CardHeader>
          <div className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <CardTitle className="pt-3 text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
