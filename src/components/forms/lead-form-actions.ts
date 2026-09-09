'use server';

import { Resend } from 'resend';

import { createSupabaseServerClient } from '@/lib/supabase';
import { siteConfig } from '@/lib/site-config';
import { leadFormSchema } from './lead-form-schema';

export type LeadFormState = {
  status: 'idle' | 'success' | 'error';
  errorMessage?: string;
};

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const parsed = leadFormSchema.safeParse({
    serviceType: formData.get('serviceType'),
    timeline: formData.get('timeline'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    zipCode: formData.get('zipCode'),
    message: formData.get('message') ?? ''
  });

  if (!parsed.success) {
    return { status: 'error', errorMessage: 'invalid' };
  }

  const lead = parsed.data;
  const phoneDigits = lead.phone.replace(/\D/g, '');

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('leads').insert({
    name: lead.name,
    email: lead.email,
    phone: `(${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6)}`,
    service_type: lead.serviceType,
    timeline: lead.timeline,
    zip_code: lead.zipCode,
    message: lead.message || null
  });

  if (error) {
    console.error('[submitLead] Supabase insert failed:', error.message);
    return { status: 'error', errorMessage: 'server' };
  }

  // Best-effort notification -- the lead is already saved, so a failure
  // here must never surface as an error to the person who just submitted.
  await notifyNewLead(lead).catch((err) =>
    console.error('[submitLead] notification failed:', err)
  );

  return { status: 'success' };
}

async function notifyNewLead(lead: typeof leadFormSchema._output) {
  const summaryLines = [
    `Service: ${lead.serviceType}`,
    `Timeline: ${lead.timeline}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `ZIP: ${lead.zipCode}`,
    lead.message ? `Message: ${lead.message}` : null
  ].filter(Boolean);

  if (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFICATION_EMAIL_TO) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: `${siteConfig.name} <notifications@${siteConfig.domain}>`,
      to: process.env.LEAD_NOTIFICATION_EMAIL_TO,
      subject: `New estimate request: ${lead.serviceType}`,
      text: summaryLines.join('\n')
    });
  }

  if (process.env.LEAD_NOTIFICATION_WEBHOOK_URL) {
    await fetch(process.env.LEAD_NOTIFICATION_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    });
  }
}
