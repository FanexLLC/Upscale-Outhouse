import type { Metadata } from 'next';
import EventPageTemplate from '@/components/events/EventPageTemplate';

export const metadata: Metadata = {
  title: 'Wedding Restroom Trailer Rental Fresno | Luxury Portable Bathroom | Upscale Outhouse',
  description:
    'Elevate your wedding with a luxury restroom trailer. Climate-controlled, running water, LED lighting. Serving Fresno, Clovis, Visalia & Central CA. Free quote.',
  openGraph: {
    title: 'Wedding Restroom Trailer Rental Fresno | Luxury Portable Bathroom | Upscale Outhouse',
    description: 'Elevate your wedding with a luxury restroom trailer. Climate-controlled, running water, LED lighting. Serving Fresno, Clovis, Visalia & Central CA. Free quote.',
    url: 'https://www.upscaleouthouse.com/events/weddings',
    siteName: 'Upscale Outhouse',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Luxury restroom trailer rental for weddings in Fresno and Central California' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Restroom Trailer Rental Fresno | Luxury Portable Bathroom | Upscale Outhouse',
    description: 'Elevate your wedding with a luxury restroom trailer. Climate-controlled, running water, LED lighting. Serving Fresno, Clovis, Visalia & Central CA. Free quote.',
    images: ['/twitter-image.png'],
  },
};

const whyReasons = [
  {
    title: 'Guest Experience Matters',
    description:
      'Your wedding day is the most important celebration of your life. Every detail matters — including the restrooms. Give your guests an experience that matches the elegance of your venue.',
    icon: 'heart',
  },
  {
    title: 'Matches Your Venue',
    description:
      'Our trailers feature wood-grain interiors, granite countertops, and warm lighting that complement any wedding aesthetic, from rustic barn to elegant garden.',
    icon: 'sparkles',
  },
  {
    title: 'Photo-Worthy Facilities',
    description:
      'Full-length mirrors, premium lighting, and spacious interiors mean your guests look their best when they step back out to celebrate with you.',
    icon: 'star',
  },
  {
    title: 'Stress-Free Hosting',
    description:
      'We handle delivery, setup, and breakdown. Our team ensures the trailer is immaculate before your first guest arrives, so you can focus on saying "I do."',
    icon: 'shield',
  },
];

const features = [
  {
    title: 'Climate-Controlled Comfort',
    description:
      'Air conditioning and heating keep your guests comfortable whether your wedding is under the summer sun or autumn stars.',
  },
  {
    title: 'Real Flushing Toilets',
    description:
      'No chemical smells, no pumps. Our trailers feature actual flushing toilets with fresh water — just like at home.',
  },
  {
    title: 'Hot & Cold Running Water',
    description:
      'Vanity sinks with hot and cold running water so guests can freshen up before hitting the dance floor.',
  },
  {
    title: 'Elegant LED Lighting',
    description:
      'Warm, ambient LED lighting creates a welcoming atmosphere that feels more like a boutique hotel than a portable restroom.',
  },
  {
    title: 'Bluetooth Sound System',
    description:
      'Play soft background music in the restroom trailer to maintain the ambiance of your special day.',
  },
  {
    title: 'Spacious Interiors',
    description:
      'Generous floor plans give wedding guests room to adjust attire, touch up makeup, and move comfortably — even in formal wear.',
  },
];

const testimonials = [
  {
    quote:
      'The trailer was absolutely stunning. Our wedding guests couldn\'t believe it was a portable restroom. It matched our vineyard venue perfectly.',
    name: 'Sarah M.',
    event: 'Wedding',
    city: 'Fresno',
  },
];

const faqs = [
  {
    question: 'Can the trailer be decorated to match my wedding theme?',
    answer:
      'Absolutely! Our trailers have a neutral, elegant interior that pairs well with any wedding theme. You\'re welcome to add floral arrangements, signage, or other decor elements to personalize the space.',
  },
  {
    question: 'How far from the reception should the trailer be placed?',
    answer:
      'We recommend placing the trailer within a short, comfortable walk from your reception area — typically 50 to 150 feet. We\'ll work with you and your venue coordinator to find the perfect spot with level ground and access for our delivery truck.',
  },
  {
    question: 'Do you offer bridal suite features?',
    answer:
      'Our luxury trailers include full-length mirrors, premium lighting, and spacious interiors that double as an excellent bridal touch-up area. Many brides use the trailer as a quick refresh station throughout the reception.',
  },
  {
    question: 'How far in advance should I book for my wedding?',
    answer:
      'We recommend booking at least 2–3 months in advance, especially for peak wedding season (April through October). Popular dates fill up quickly, so the earlier you reserve, the better.',
  },
  {
    question: 'What\'s included in a wedding rental?',
    answer:
      'Every rental includes delivery, full setup, fresh water and waste tanks, premium toiletries, paper products, and post-event breakdown and removal. We arrive early to ensure everything is spotless before your guests arrive.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Luxury Restroom Trailer Rental for Weddings',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Upscale Outhouse',
    telephone: '+15596630356',
  },
  areaServed: 'Central California',
  description:
    'Luxury portable restroom trailer rental for weddings in Fresno, Clovis, Visalia, and Central California. Climate-controlled, flushing toilets, hot water, LED lighting.',
};

export default function WeddingsPage() {
  return (
    <EventPageTemplate
      eventType="Wedding"
      overline="LUXURY RESTROOMS FOR WEDDINGS"
      headline="Your Wedding Deserves Better Than a Porta Potty"
      heroImage="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=600&fit=crop"
      subtext="Elevate your special day with a luxury restroom trailer that matches the elegance of your celebration. Climate-controlled, beautifully appointed, and delivered right to your venue across Central California."
      whyReasons={whyReasons}
      features={features}
      testimonials={testimonials}
      faqs={faqs}
      ctaHeadline="Ready to Elevate Your Wedding Day?"
      jsonLd={jsonLd}
    />
  );
}
