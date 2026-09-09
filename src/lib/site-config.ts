/**
 * Single source of truth for ARL Service's business info (NAP), used by the
 * Header, Footer, and later the GeneralContractor JSON-LD block.
 *
 * Every value below marked TODO is a deliberate placeholder, not invented
 * data: `555` is the standard US convention for a non-real phone number
 * (never assigned to a real line), and the bracketed strings are meant to
 * be visibly incomplete rather than a plausible-looking fake fact.
 */
export const siteConfig = {
  name: 'ARL Service',
  domain: 'arlservice.online',
  url: 'https://arlservice.online',

  phone: {
    display: '(215) 555-0100', // TODO: replace with the real business line
    href: 'tel:+12155550100'
  },
  email: 'info@arlservice.online', // TODO: confirm the real inbox to use

  address: {
    street: '[Street address pending]', // TODO
    city: 'Philadelphia',
    state: 'PA',
    zip: '[ZIP pending]', // TODO
    country: 'US'
  },

  // "PA Home Improvement Contractor" is the correct HICPA term (PA Attorney
  // General registration); Philadelphia also requires its own L&I
  // registration. Confirm both before launch.
  license: {
    label: 'PA Home Improvement Contractor',
    number: 'PA[Pending]' // TODO: real registration number, format PA123456
  },

  // TODO: confirm real business hours -- this is a reasonable default for
  // the trade, not a confirmed schedule (same "needs confirmation" status
  // as the fields above, just not bracketed since a wrong schedule is a
  // minor inconvenience rather than a broken/invalid data format).
  hours: [
    { day: 'Mon–Fri', time: '7:00 AM–6:00 PM' },
    { day: 'Sat', time: 'By appointment' },
    { day: 'Sun', time: 'Closed' }
  ]
} as const;

export type ServiceSlug =
  | 'kitchen-remodeling'
  | 'bathroom-remodeling'
  | 'home-renovation';

export const services: { slug: ServiceSlug; nameKey: string }[] = [
  { slug: 'kitchen-remodeling', nameKey: 'kitchenRemodeling' },
  { slug: 'bathroom-remodeling', nameKey: 'bathroomRemodeling' },
  { slug: 'home-renovation', nameKey: 'homeRenovation' }
];
