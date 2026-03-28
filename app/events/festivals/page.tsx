import type { Metadata } from 'next';
import EventPageTemplate from '@/components/events/EventPageTemplate';

export const metadata: Metadata = {
  title: 'Festival & Concert Restroom Trailer Rental Central CA | Upscale Outhouse',
  description:
    'Luxury restroom trailers for festivals, concerts, and outdoor events in Central California. High-capacity, VIP-level facilities. Multi-day service available.',
  openGraph: {
    title: 'Festival & Concert Restroom Trailer Rental Central CA | Upscale Outhouse',
    description: 'Luxury restroom trailers for festivals, concerts, and outdoor events in Central California. High-capacity, VIP-level facilities. Multi-day service available.',
    url: 'https://www.upscaleouthouse.com/events/festivals',
    siteName: 'Upscale Outhouse',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Luxury restroom trailer rental for festivals and concerts' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Festival & Concert Restroom Trailer Rental Central CA | Upscale Outhouse',
    description: 'Luxury restroom trailers for festivals, concerts, and outdoor events in Central California. High-capacity, VIP-level facilities. Multi-day service available.',
    images: ['/twitter-image.png'],
  },
};

const whyReasons = [
  {
    title: 'High-Capacity Handling',
    description:
      'Our trailers are built to handle heavy traffic at festivals and large-scale events. Multiple stalls, durable construction, and efficient flow keep lines moving.',
    icon: 'users',
  },
  {
    title: 'VIP Experience',
    description:
      'Offer your artists, sponsors, and VIP ticket holders restroom facilities that match the premium experience they expect.',
    icon: 'crown',
  },
  {
    title: 'Built for Multi-Day Events',
    description:
      'Rugged enough for a three-day music festival, elegant enough for a wine-tasting event. Our trailers perform day after day with daily servicing available.',
    icon: 'bolt',
  },
  {
    title: 'Always Clean & Stocked',
    description:
      'Optional attendant service and daily restocking mean your facilities stay fresh from opening act to final encore.',
    icon: 'check',
  },
];

const features = [
  {
    title: 'Climate-Controlled Comfort',
    description:
      'Festival-goers get a cool break from the Central Valley heat — or a warm respite during evening events — inside our climate-controlled trailers.',
  },
  {
    title: 'Real Flushing Toilets',
    description:
      'A world apart from standard festival porta potties. Real flushing toilets mean a cleaner, more hygienic experience for every attendee.',
  },
  {
    title: 'Hot & Cold Running Water',
    description:
      'Hand-washing stations with real running water help maintain hygiene at large gatherings where sanitation matters most.',
  },
  {
    title: 'Elegant LED Lighting',
    description:
      'Well-lit interiors ensure safety and comfort during nighttime events, with ambient lighting that sets the right mood.',
  },
  {
    title: 'Bluetooth Sound System',
    description:
      'Pipe in festival audio or ambient music to keep the energy flowing — even in the restroom.',
  },
  {
    title: 'Durable & Spacious',
    description:
      'Heavy-duty construction handles high foot traffic while spacious interiors give festival attendees room to breathe.',
  },
];

const testimonials = [
  {
    quote:
      'Upscale Outhouse kept our festival restrooms impeccable for three straight days. Attendees and artists alike complimented the facilities. A game-changer for outdoor events.',
    name: 'Event Coordinator',
    event: 'Central Valley Festival',
    city: 'Fresno',
  },
];

const faqs = [
  {
    question: 'How many guests can one trailer handle at a festival?',
    answer:
      'A single luxury trailer can serve approximately 150–250 guests over a full-day event. For multi-day festivals with higher attendance, we recommend multiple units and will help you plan the right configuration.',
  },
  {
    question: 'Do you offer attendant service for multi-day events?',
    answer:
      'Yes. Our attendant service is especially popular for festivals. An on-site attendant keeps the trailer clean, stocked, and welcoming throughout each day of your event.',
  },
  {
    question: 'Can the trailer be placed on grass or dirt surfaces?',
    answer:
      'Our trailers can be placed on grass, gravel, or compacted dirt. We use leveling equipment to ensure stability. We just need vehicle access to the placement site for delivery.',
  },
  {
    question: 'Can we rent multiple units for a large festival?',
    answer:
      'Absolutely. We regularly supply multiple trailers for festivals and large concerts. We\'ll work with your event team to determine the optimal number of units and placement strategy.',
  },
  {
    question: 'What about waste management for multi-day events?',
    answer:
      'We coordinate waste tank pumping and restocking on a schedule that matches your event traffic. For multi-day festivals, daily servicing is included to ensure uninterrupted, clean operation.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Luxury Restroom Trailer Rental for Festivals and Concerts',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Upscale Outhouse',
    telephone: '+15596630356',
  },
  areaServed: 'Central California',
  description:
    'Luxury restroom trailer rental for festivals, concerts, and large outdoor events in Central California. High-capacity, multi-day service available.',
};

export default function FestivalsPage() {
  return (
    <EventPageTemplate
      eventType="Festival"
      overline="LUXURY RESTROOMS FOR FESTIVALS & CONCERTS"
      headline="Festival-Ready. Crowd-Proven. Always Clean."
      heroImage="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&h=600&fit=crop"
      subtext="From music festivals to food and wine events, our luxury restroom trailers bring VIP-level comfort to any large-scale outdoor gathering across Central California."
      whyReasons={whyReasons}
      features={features}
      testimonials={testimonials}
      faqs={faqs}
      ctaHeadline="Ready to Elevate Your Festival Experience?"
      jsonLd={jsonLd}
    />
  );
}