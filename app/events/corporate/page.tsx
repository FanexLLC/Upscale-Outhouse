import type { Metadata } from 'next';
import EventPageTemplate from '@/components/events/EventPageTemplate';

export const metadata: Metadata = {
  title: 'Corporate Event Restroom Trailer Rental | Professional Facilities | Upscale Outhouse',
  description:
    'Professional luxury restroom trailers for corporate events, retreats, and conferences. Climate-controlled, immaculate facilities. Serving Central California.',
  openGraph: {
    title: 'Corporate Event Restroom Trailer Rental | Professional Facilities | Upscale Outhouse',
    description: 'Professional luxury restroom trailers for corporate events, retreats, and conferences. Climate-controlled, immaculate facilities. Serving Central California.',
    url: 'https://www.upscaleouthouse.com/events/corporate',
    siteName: 'Upscale Outhouse',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corporate Event Restroom Trailer Rental | Professional Facilities | Upscale Outhouse',
    description: 'Professional luxury restroom trailers for corporate events, retreats, and conferences. Climate-controlled, immaculate facilities. Serving Central California.',
  },
};

const whyReasons = [
  {
    title: 'Reflects Company Standards',
    description:
      'Your event represents your brand. A luxury restroom trailer shows clients and employees that you care about every detail — even the ones most people overlook.',
    icon: 'building',
  },
  {
    title: 'Impress Clients & VIPs',
    description:
      'When important stakeholders attend your outdoor corporate event, the restroom facilities should meet the same standard as the rest of your hospitality.',
    icon: 'star',
  },
  {
    title: 'No Detail Overlooked',
    description:
      'From granite countertops to premium hand soap, our trailers deliver a polished, professional experience that leaves a lasting impression.',
    icon: 'check',
  },
  {
    title: 'Employee & Guest Comfort',
    description:
      'Climate-controlled interiors, real flushing toilets, and running water ensure everyone stays comfortable throughout multi-hour events.',
    icon: 'users',
  },
];

const features = [
  {
    title: 'Climate-Controlled Comfort',
    description:
      'Air conditioning and heating keep your team and clients comfortable during outdoor company events, regardless of weather conditions.',
  },
  {
    title: 'Real Flushing Toilets',
    description:
      'Professional-grade facilities with real flushing toilets — no chemical odors or compromises on the standards your company upholds.',
  },
  {
    title: 'Hot & Cold Running Water',
    description:
      'Full vanity sinks with hot and cold water let attendees freshen up between sessions, meetings, or networking events.',
  },
  {
    title: 'Elegant LED Lighting',
    description:
      'Well-lit interiors with ambient LED lighting create a clean, modern atmosphere that aligns with a professional setting.',
  },
  {
    title: 'Bluetooth Sound System',
    description:
      'Subtle background music maintains a refined atmosphere, or play your company\'s branded audio throughout the restroom facility.',
  },
  {
    title: 'Spacious Interiors',
    description:
      'Roomy layouts accommodate business attire comfortably and provide an inviting, non-cramped experience for all attendees.',
  },
];

const testimonials = [
  {
    quote:
      'Professional from start to finish. The trailer was spotless and added a touch of luxury to our corporate retreat. Our executive team was genuinely impressed.',
    name: 'David K.',
    event: 'Corporate Retreat',
    city: 'Visalia',
  },
];

const faqs = [
  {
    question: 'Do you accommodate multi-day corporate retreats?',
    answer:
      'Yes! We regularly serve multi-day corporate events. We can arrange daily servicing to keep the trailer fresh and fully stocked throughout your entire retreat or conference.',
  },
  {
    question: 'Can we add company branding or signage to the trailer?',
    answer:
      'You\'re welcome to place branded signage, banners, or decor around the trailer exterior. We ask that nothing is permanently attached to the trailer itself, but free-standing signage works perfectly.',
  },
  {
    question: 'What about large conferences with high attendance?',
    answer:
      'For large events, we can provide multiple trailer units to handle higher traffic. We\'ll work with your event planner to determine the right number of units based on guest count and event duration.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Setup typically takes 30 to 60 minutes. We arrive well in advance of your event start time to ensure everything is in place, tested, and immaculate before your first attendee arrives.',
  },
  {
    question: 'Do you provide attendant service?',
    answer:
      'Attendant service is available for corporate events. An on-site attendant ensures the trailer stays clean, stocked, and welcoming throughout your event — an extra level of professionalism your guests will notice.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Luxury Restroom Trailer Rental for Corporate Events',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Upscale Outhouse',
    telephone: '+15596630356',
  },
  areaServed: 'Central California',
  description:
    'Professional luxury restroom trailer rental for corporate events, retreats, and conferences in Central California. Climate-controlled, immaculate facilities.',
};

export default function CorporatePage() {
  return (
    <EventPageTemplate
      eventType="Corporate Event"
      overline="LUXURY RESTROOMS FOR CORPORATE EVENTS"
      headline="Professional Facilities for Professional Events"
      heroImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop"
      subtext="Your corporate event deserves facilities that reflect your company's standards. Our luxury restroom trailers deliver a polished, professional experience for clients, executives, and employees alike."
      whyReasons={whyReasons}
      features={features}
      testimonials={testimonials}
      faqs={faqs}
      ctaHeadline="Ready to Book for Your Corporate Event?"
      jsonLd={jsonLd}
    />
  );
}