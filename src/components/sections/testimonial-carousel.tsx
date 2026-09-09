'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export type Testimonial = {
  id: string;
  authorName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  projectType?: string;
};

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const current = testimonials[index];
  const go = (delta: number) =>
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);

  return (
    <div className="mx-auto max-w-2xl text-center">
      <Quote className="mx-auto size-8 text-primary/40" aria-hidden="true" />
      <div className="mt-2 flex justify-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'size-4',
              i < current.rating ? 'fill-primary text-primary' : 'text-muted'
            )}
          />
        ))}
      </div>
      <p className="mt-4 text-lg text-foreground">“{current.quote}”</p>
      <p className="mt-4 text-sm font-semibold text-foreground">
        {current.authorName}
        {current.projectType ? (
          <span className="font-normal text-muted-foreground"> · {current.projectType}</span>
        ) : null}
      </p>

      {testimonials.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </Button>
          <div className="flex gap-1.5">
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.id}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  'size-1.5 rounded-full',
                  i === index ? 'bg-primary' : 'bg-muted'
                )}
              />
            ))}
          </div>
          <Button variant="ghost" size="icon" onClick={() => go(1)} aria-label="Next testimonial">
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
