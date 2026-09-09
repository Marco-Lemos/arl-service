'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import { ChevronsLeftRight } from 'lucide-react';

type BeforeAfterSliderProps = {
  beforeImageUrl: string;
  afterImageUrl: string;
  beforeLabel: string;
  afterLabel: string;
  alt: string;
};

export function BeforeAfterSlider({
  beforeImageUrl,
  afterImageUrl,
  beforeLabel,
  afterLabel,
  alt
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const id = useId();

  return (
    <div className="relative aspect-4/3 w-full select-none overflow-hidden rounded-lg border border-border bg-muted">
      <Image src={afterImageUrl} alt={`${alt} — ${afterLabel}`} fill className="object-cover" />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeImageUrl}
          alt={`${alt} — ${beforeLabel}`}
          fill
          className="object-cover"
        />
      </div>

      <span className="absolute top-3 left-3 rounded bg-foreground/75 px-2 py-1 text-xs font-medium text-background">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 rounded bg-foreground/75 px-2 py-1 text-xs font-medium text-background">
        {afterLabel}
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-background"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background shadow-md">
          <ChevronsLeftRight className="size-4 text-foreground" aria-hidden="true" />
        </div>
      </div>

      <label htmlFor={id} className="sr-only">
        {alt}: {beforeLabel} / {afterLabel} comparison slider
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
