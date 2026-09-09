'use client';

import { useActionState, useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Bath, ChefHat, HardHat, HelpCircle, Loader2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { formatUsPhone } from '@/lib/format-phone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { submitLead, type LeadFormState } from './lead-form-actions';
import { SERVICE_OPTIONS, TIMELINE_OPTIONS } from './lead-form-schema';

const SERVICE_ICONS: Record<(typeof SERVICE_OPTIONS)[number], LucideIcon> = {
  'kitchen-remodeling': ChefHat,
  'bathroom-remodeling': Bath,
  'home-renovation': HardHat,
  other: HelpCircle
};

const initialState: LeadFormState = { status: 'idle' };

export function LeadForm() {
  const t = useTranslations('LeadForm');
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [serviceType, setServiceType] = useState('');
  const [timeline, setTimeline] = useState('');
  const [phone, setPhone] = useState('');
  const [state, formAction, isPending] = useActionState(submitLead, initialState);

  if (state.status === 'success') {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <h3 className="text-xl font-semibold">{t('successTitle')}</h3>
        <p className="mt-2 text-muted-foreground">{t('successBody')}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
      <ProgressDots step={step} />

      {step === 1 && (
        <fieldset>
          <legend className="text-lg font-semibold text-foreground">
            {t('step1Title')}
          </legend>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {SERVICE_OPTIONS.map((option) => (
              <ChoiceCard
                key={option}
                name="serviceType"
                value={option}
                checked={serviceType === option}
                onChange={setServiceType}
                label={t(`service_${option}`)}
                icon={SERVICE_ICONS[option]}
              />
            ))}
          </div>
          <StepActions>
            <span />
            <Button type="button" disabled={!serviceType} onClick={() => setStep(2)}>
              {t('next')}
            </Button>
          </StepActions>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend className="text-lg font-semibold text-foreground">
            {t('step2Title')}
          </legend>
          <div className="mt-4 flex flex-col gap-2">
            {TIMELINE_OPTIONS.map((option) => (
              <ChoiceRow
                key={option}
                name="timeline"
                value={option}
                checked={timeline === option}
                onChange={setTimeline}
                label={t(`timeline_${option}`)}
              />
            ))}
          </div>
          <StepActions>
            <Button type="button" variant="ghost" onClick={() => setStep(1)}>
              {t('back')}
            </Button>
            <Button type="button" disabled={!timeline} onClick={() => setStep(3)}>
              {t('next')}
            </Button>
          </StepActions>
        </fieldset>
      )}

      {step === 3 && (
        <form action={formAction}>
          <input type="hidden" name="serviceType" value={serviceType} />
          <input type="hidden" name="timeline" value={timeline} />

          <fieldset className="flex flex-col gap-4">
            <legend className="text-lg font-semibold text-foreground">
              {t('step3Title')}
            </legend>

            <Field label={t('nameLabel')} htmlFor="lead-name">
              <Input id="lead-name" name="name" autoComplete="name" required />
            </Field>

            <Field label={t('emailLabel')} htmlFor="lead-email">
              <Input
                id="lead-email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label={t('phoneLabel')} htmlFor="lead-phone">
                <Input
                  id="lead-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(215) 555-0100"
                  maxLength={14}
                  value={phone}
                  onChange={(e) => setPhone(formatUsPhone(e.target.value))}
                  required
                />
              </Field>
              <Field label={t('zipLabel')} htmlFor="lead-zip">
                <Input
                  id="lead-zip"
                  name="zipCode"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="19107"
                  maxLength={10}
                  required
                />
              </Field>
            </div>

            <Field label={t('messageLabel')} htmlFor="lead-message">
              <Textarea id="lead-message" name="message" rows={3} />
            </Field>
          </fieldset>

          {state.status === 'error' && (
            <p role="alert" className="mt-4 text-sm text-destructive">
              {state.errorMessage === 'invalid' ? t('errorInvalid') : t('errorServer')}
            </p>
          )}

          <StepActions>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep(2)}
              disabled={isPending}
            >
              {t('back')}
            </Button>
            <Button type="submit" size="lg" disabled={isPending}>
              {isPending && <Loader2 className="animate-spin" aria-hidden="true" />}
              {isPending ? t('submitting') : t('submit')}
            </Button>
          </StepActions>
        </form>
      )}
    </div>
  );
}

function ProgressDots({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="mb-6 flex items-center gap-2" aria-hidden="true">
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={cn('h-1.5 flex-1 rounded-full', n <= step ? 'bg-primary' : 'bg-muted')}
        />
      ))}
    </div>
  );
}

function StepActions({ children }: { children: ReactNode }) {
  return <div className="mt-6 flex items-center justify-between gap-3">{children}</div>;
}

function Field({
  label,
  htmlFor,
  children
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

function ChoiceCard({
  name,
  value,
  checked,
  onChange,
  label,
  icon: Icon
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <label
      data-checked={checked}
      className="flex cursor-pointer flex-col items-center gap-2 rounded-md border border-input p-4 text-center transition-colors hover:bg-muted data-[checked=true]:border-primary data-[checked=true]:bg-primary/5"
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <Icon className="size-6 text-primary" aria-hidden="true" />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </label>
  );
}

function ChoiceRow({
  name,
  value,
  checked,
  onChange,
  label
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <label
      data-checked={checked}
      className="flex cursor-pointer items-center gap-3 rounded-md border border-input p-3 transition-colors hover:bg-muted data-[checked=true]:border-primary data-[checked=true]:bg-primary/5"
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="size-4 accent-primary"
      />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </label>
  );
}
