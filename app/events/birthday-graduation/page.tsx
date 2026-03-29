import type { Metadata } from 'next';
import EventPageTemplate from '@/components/events/EventPageTemplate';

export const metadata: Metadata = {
  title: 'Birthday & Graduation Party Restroom Rental Fresno | Upscale Outhouse',
  description:
    'Luxury portable restroom trailers for birthday parties and graduation celebrations in Fresno, Clovis & Central CA. Upgrade your backyard party. Free quote.',
  openGraph: {
    title: 'Birthday & Graduation Party Restroom Rental Fresno | Upscale Outhouse',
    description: 'Luxury portable restroom trailers for birthday parties and graduation celebrations in Fresno, Clovis & Central CA. Upgrade your backyard party. Free quote.',
    url: 'https://www.upscaleouthouse.com/events/birthday-graduation',
    siteName: 'Upscale Outhouse',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Birthday & Graduation Party Restroom Rental Fresno | Upscale Outhouse',
    description: 'Luxury portable restroom trailers for birthday parties and graduation celebrations in Fresno, Clovis & Central CA. Upgrade your backyard party. Free quote.',
  },
};

const whyReasons = [
  {
    title: 'Backyard Parties Deserve Nice Facilities',
    description:
      'Hosting at home shouldn\'t mean compromising on comfort. A luxury restroom trailer keeps your indoor bathrooms clean and gives guests a memorable experience.',
    icon: 'sparkles',
  },
  {
    title: 'Surprise & Delight Your Guests',
    description:
      'Nothing says "we went all out" like a luxury restroom trailer at a backyard party. It\'s the unexpected detail your guests will talk about for weeks.',
    icon: 'star',
  },
  {
    title: 'Stress-Free Hosting',
    description:
      'No more worrying about your home bathrooms getting overwhelmed by party traffic. We handle everything — delivery, setup, and pickup.',
    icon: 'shield',
  },
  {
    title: 'Works Anywhere',
    description:
      'Backyard, park, rented lot, or open field — our trailers are self-contained and can be placed virtually anywhere with vehicle access.',
    icon: 'check',
  },
];

const features = [
  {
    title: 'Climate-Controlled Comfort',
    description:
      'Whether it\'s a summer birthday bash or a December graduation party, air conditioning and heating keep everyone comfortable.',
  },
  {
    title: 'Real Flushing Toilets',
    description:
      'Forget the stigma of portable restrooms. Our trailers have real flushing toilets — guests won\'t believe it\'s not a permanent bathroom.',
  },
  {
    title: 'Hot & Cold Running Water',
    description:
      'Full vanity sinks with running water mean guests can wash up properly, just like they would at home.',
  },
  {
    title: 'Elegant LED Lighting',
    description:
      'Warm ambient lighting creates a welcoming feel, even for evening celebrations under the stars.',
  },
  {
    title: 'Bluetooth Sound System',
    description:
      'Keep the party vibes going with your favorite playlist playing through the trailer\'s built-in Bluetooth speakers.',
  },
  {
    title: 'Spacious Interiors',
    description:
      'Plenty of room for guests of all ages to use comfortably — from grandma to the little ones.',
  },
];

const testimonials = [
  {
    quote:
      'Our backyard graduation party felt like a real venue thanks to the trailer. Guests were so impressed — it was the talk of the night!',
    name: 'Jennifer T.',
    event: 'Graduation Party',
    city: 'Clovis',
  },
];

const faqs = [
  {
    question: 'Is the trailer suitable for a backyard party?',
    answer:
      'Absolutely. Our trailers are designed to fit in residential settings. We just need vehicle access for delivery and a reasonably level spot. We\'ll work with you to find the best placement in your yard.',
  },
  {
    question: 'Is it worth it for a smaller gathering?',
    answer:
      'Many of our happiest customers host parties of 30 to 50 guests. A luxury trailer keeps your home bathrooms private and clean while giving every guest a premium experience.',
  },
  {
    question: 'What are the power requirements?',
    answer:
      'Our trailers are self-contained with onboard power for lighting. For climate control (A/C or heat), we require access to a standard 20-amp household outlet or we can bring a quiet generator.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Setup typically takes about 30 to 45 minutes. We recommend scheduling delivery at least 2 hours before your party starts so everything is ready and tested well in advance.',
  },
  {
    question: 'How many guests can the trailer handle?',
    answer:
      'A single trailer comfortably serves parties of up to 100–150 guests for a standard event duration. For larger gatherings, we can provide additional units.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Luxury Restroom Trailer Rental for Birthday and Graduation Parties',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Upscale Outhouse',
    telephone: '+15596630356',
  },
  areaServed: 'Central California',
  description:
    'Luxury portable restroom trailer rental for birthday parties and graduation celebrations in Fresno, Clovis, and Central California.',
};

export default function BirthdayGraduationPage() {
  return (
    <EventPageTemplate
      eventType="Celebration"
      overline="LUXURY RESTROOMS FOR CELEBRATIONS"
      headline="Make Your Celebration Truly Complete"
      heroImage="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=600&fit=crop"
      subtext="Birthday milestones and graduation achievements deserve a celebration that goes above and beyond. Upgrade your backyard party with a luxury restroom trailer that surprises and delights every guest."
      whyReasons={whyReasons}
      features={features}
      testimonials={testimonials}
      faqs={faqs}
      ctaHeadline="Ready to Upgrade Your Celebration?"
      jsonLd={jsonLd}
    />
  );
}