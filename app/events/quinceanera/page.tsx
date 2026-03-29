import type { Metadata } from 'next';
import EventPageTemplate from '@/components/events/EventPageTemplate';

export const metadata: Metadata = {
  title: 'Quinceañera Luxury Restroom Rental Fresno | Baño de Lujo | Upscale Outhouse',
  description:
    'Luxury portable restroom trailers for quinceañeras in Fresno and Central California. Renta de baño portátil de lujo para quinceañeras en Fresno y Central California. Free quote.',
  openGraph: {
    title: 'Quinceañera Luxury Restroom Rental Fresno | Baño de Lujo | Upscale Outhouse',
    description: 'Luxury portable restroom trailers for quinceañeras in Fresno and Central California. Renta de baño portátil de lujo para quinceañeras en Fresno y Central California. Free quote.',
    url: 'https://www.upscaleouthouse.com/events/quinceanera',
    siteName: 'Upscale Outhouse',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quinceañera Luxury Restroom Rental Fresno | Baño de Lujo | Upscale Outhouse',
    description: 'Luxury portable restroom trailers for quinceañeras in Fresno and Central California. Renta de baño portátil de lujo para quinceañeras en Fresno y Central California. Free quote.',
  },
};

const whyReasons = [
  {
    title: 'A Milestone Deserves Premium',
    description:
      'Una quinceañera es una celebración única. Your daughter\'s milestone celebration deserves premium facilities that honor the significance of the day.',
    icon: 'crown',
  },
  {
    title: 'Elegant Facilities Match the Occasion',
    description:
      'Instalaciones elegantes para una celebración elegante. Our trailers complement the beauty and formality of a quinceañera — from the ceremony to the last dance.',
    icon: 'sparkles',
  },
  {
    title: 'Comfort for All Ages',
    description:
      'Comodidad para toda la familia. From abuelita to the youngest cousins, our spacious, climate-controlled trailers keep every guest comfortable throughout the celebration.',
    icon: 'heart',
  },
  {
    title: 'Bilingual, Friendly Service',
    description:
      'Servicio amigable y bilingüe. Our team is here to make your planning easy and stress-free. We\'re proud to serve the Central Valley\'s diverse communities.',
    icon: 'users',
  },
];

const features = [
  {
    title: 'Aire Acondicionado y Calefacción — Climate Control',
    description:
      'Keep every guest comfortable, whether your quinceañera is a summer garden party or a cool winter evening reception.',
  },
  {
    title: 'Baños de Verdad — Real Flushing Toilets',
    description:
      'No chemical porta potties. Our luxury trailers have real flushing toilets — just like at home. Dignified facilities for a dignified celebration.',
  },
  {
    title: 'Agua Caliente y Fría — Hot & Cold Running Water',
    description:
      'Full vanity sinks with running water let your guests freshen up before stepping back onto the dance floor.',
  },
  {
    title: 'Iluminación LED Elegante — Elegant LED Lighting',
    description:
      'Warm, inviting lighting creates a beautiful atmosphere inside the trailer — perfect for a last-minute makeup touch-up.',
  },
  {
    title: 'Sistema Bluetooth — Bluetooth Sound System',
    description:
      'Play cumbia, bachata, or your quinceañera\'s favorite playlist through the trailer\'s built-in speakers.',
  },
  {
    title: 'Interiores Espaciosos — Spacious Interiors',
    description:
      'Plenty of room for guests in formal attire to move comfortably, with full-length mirrors for those picture-perfect moments.',
  },
];

const testimonials = [
  {
    quote:
      'The restroom trailer was the perfect touch for my daughter\'s quinceañera. Elegant and immaculate — it felt like part of the venue.',
    name: 'Rosa G.',
    event: 'Quinceañera',
    city: 'Bakersfield',
  },
];

const faqs = [
  {
    question: '¿El tráiler tiene capacidad para fiestas grandes? / Can the trailer handle large parties?',
    answer:
      '¡Sí! A single trailer serves up to 100–150 guests comfortably. For larger quinceañeras, we can provide additional units. Yes! We regularly serve celebrations of all sizes and will help you determine the right setup.',
  },
  {
    question: '¿Cuánto tiempo antes debo reservar? / How far in advance should I book?',
    answer:
      'Recomendamos reservar con 2–3 meses de anticipación, especialmente durante la temporada de primavera y verano. We recommend booking 2–3 months ahead, especially during spring and summer when quinceañera season is busiest.',
  },
  {
    question: '¿Se puede colocar en un patio trasero? / Can it be placed in a backyard?',
    answer:
      '¡Por supuesto! Solo necesitamos acceso vehicular y un lugar razonablemente nivelado. Absolutely — we just need vehicle access for delivery and a reasonably level spot. We\'ll work with you to find the best placement.',
  },
  {
    question: '¿Qué se incluye en la renta? / What\'s included in the rental?',
    answer:
      'Cada renta incluye entrega, instalación, tanques de agua, artículos de tocador premium y retiro después del evento. Every rental includes delivery, setup, fresh water, premium toiletries, paper products, and post-event removal.',
  },
  {
    question: '¿Necesito electricidad? / Do I need electricity?',
    answer:
      'Para la iluminación, el tráiler tiene energía incorporada. Para el aire acondicionado, necesitamos un enchufe de 20 amperios o podemos traer un generador silencioso. The trailer has onboard power for lighting. For A/C, we need a standard 20-amp outlet or can bring a quiet generator.',
  },
  {
    question: '¿Ofrecen servicio bilingüe? / Do you offer bilingual service?',
    answer:
      '¡Sí! Estamos orgullosos de servir a las comunidades diversas del Valle Central. Yes — our team is proud to serve the Central Valley\'s diverse communities and we\'re happy to communicate in English or Spanish.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Luxury Restroom Trailer Rental for Quinceañeras',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Upscale Outhouse',
    telephone: '+15596630356',
  },
  areaServed: 'Central California',
  description:
    'Luxury portable restroom trailer rental for quinceañeras in Fresno, Bakersfield, and Central California. Renta de baño portátil de lujo para quinceañeras.',
};

export default function QuinceaneraPage() {
  return (
    <EventPageTemplate
      eventType="Quinceañera"
      overline="LUXURY RESTROOMS FOR QUINCEAÑERAS"
      headline="Celebra con Elegancia"
      heroImage="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=600&fit=crop"
      subtext="Celebrate in Elegance — Your daughter's quinceañera is a once-in-a-lifetime milestone. Honor the tradition with luxury restroom facilities that match the beauty and importance of the celebration."
      whyReasons={whyReasons}
      features={features}
      testimonials={testimonials}
      faqs={faqs}
      ctaHeadline="¿Lista para Reservar? Ready to Book for Your Quinceañera?"
      jsonLd={jsonLd}
    />
  );
}