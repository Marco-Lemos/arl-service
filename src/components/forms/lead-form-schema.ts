import { z } from 'zod';

export const leadFormSchema = z.object({
  serviceType: z.enum([
    'kitchen-remodeling',
    'bathroom-remodeling',
    'home-renovation',
    'other'
  ]),
  timeline: z.enum(['immediately', '1-3-months', '3-6-months', 'researching']),
  name: z.string().trim().min(2).max(200),
  email: z.email(),
  // Stored as typed: "(215) 555-0100" -- normalized to 10 digits before insert.
  phone: z.string().refine((val) => val.replace(/\D/g, '').length === 10, {
    message: 'Enter a 10-digit US phone number.'
  }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Enter a valid US ZIP code.'),
  message: z.string().trim().max(2000).optional().or(z.literal(''))
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const SERVICE_OPTIONS = [
  'kitchen-remodeling',
  'bathroom-remodeling',
  'home-renovation',
  'other'
] as const;

export const TIMELINE_OPTIONS = [
  'immediately',
  '1-3-months',
  '3-6-months',
  'researching'
] as const;
