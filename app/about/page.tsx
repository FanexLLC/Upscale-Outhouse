import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Accordion from '@/components/ui/Accordion';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Upscale Outhouse — a veteran-owned luxury bathroom trailer rental company serving Fresno and Central California. Quality, reliability, and service.',
};

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking at least 2-4 weeks in advance, especially during peak wedding season (April-October). However, we can sometimes accommodate last-minute requests depending on availability.',
  },
  {
    question: 'What is included in the rental?',
    answer: 'Your rental includes delivery, setup, all supplies (toilet paper, hand soap, paper towels), and pickup. We also provide a fresh water tank and waste tank service.',
  },
  {
    question: 'Do I need a water hookup?',
    answer: 'No, our trailer comes with a fresh water tank that provides water for your event. However, if you have a water hookup available, we can connect to it for extended events.',
  },
  {
    question: 'How much space is needed for the trailer?',
    answer: 'The trailer requires a flat, level surface approximately 25 feet long and 10 feet wide. We need vehicle access for delivery and pickup.',
  },
  {
    question: 'What is your service area?',
    answer: 'We serve events within 150 miles of Fresno, California. This includes Bakersfield, Visalia, Merced, Modesto, Madera, and the entire Central Valley region.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'The $100 deposit is non-refundable. For cancellations, please contact us directly to discuss rescheduling options. We understand plans change and will work with you when possible.',
  },
  {
    question: 'How many guests can the trailer accommodate?',
    answer: 'Our luxury trailer comfortably serves events with up to 250+ guests. For larger events or multi-day festivals, please contact us to discuss additional units.',
  },
  {
    question: 'Is the trailer climate controlled?',
    answer: 'Yes! Our trailer features both air conditioning and heating, ensuring your guests are comfortable regardless of the weather.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Upscale Outhouse"
        subtitle="Veteran-owned and operated, bringing luxury and dignity to outdoor events throughout Central California."
        primaryCta={{ label: 'Get an Instant Quote', href: '/quote' }}
        secondaryCta={{ label: 'Call (559) 663-0356', href: 'tel:+15596630356' }}
      />

      {/* Story Section */}
      <section className="py-24 bg-charcoal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">Our Story</h2>
              <div className="space-y-4 text-cream/80">
                <p>
                  Upscale Outhouse was founded with a simple mission: to provide event guests
                  with restroom facilities that match the quality and elegance of the events
                  they attend.
                </p>
                <p>
                  Started by three friends who grew up right here in the Central Valley,
                  we saw firsthand that outdoor events deserved a better bathroom option.
                  As a veteran-owned business, we bring that same discipline and attention
                  to detail to every rental.
                </p>
                <p>
                  Based in Fresno, we proudly serve the entire Central Valley region,
                  bringing luxury restroom trailers to weddings, corporate events, private
                  parties, and special occasions of all kinds.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl border border-charcoal/10 shadow-lg overflow-hidden aspect-[4/3]">
              <Image
                src="/images/about-us.jpg"
                alt="The Upscale Outhouse team"
                fill
                className="object-cover object-[center_25%]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-28 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-12 text-center">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl p-8 border border-charcoal/10 shadow-md hover:shadow-lg transition text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gold mb-2">Quality</h3>
              <p className="text-cream/70">
                Immaculate trailers maintained to the highest standards for every event.
              </p>
            </div>
            <div className="rounded-2xl p-8 border border-charcoal/10 shadow-md hover:shadow-lg transition text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gold mb-2">Reliability</h3>
              <p className="text-cream/70">
                On-time delivery and pickup so your event stays on schedule.
              </p>
            </div>
            <div className="rounded-2xl p-8 border border-charcoal/10 shadow-md hover:shadow-lg transition text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gold mb-2">Service</h3>
              <p className="text-cream/70">
                Friendly, professional service from booking to pickup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-24 bg-charcoal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">Service Area</h2>
          <p className="text-cream/80 text-lg mb-8">
            Based in Fresno, California, we serve events within a 150-mile radius,
            covering the entire Central Valley and beyond.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Fresno', 'Clovis', 'Visalia', 'Bakersfield', 'Merced', 'Modesto', 'Madera', 'Hanford'].map((city) => (
              <span
                key={city}
                className="px-4 py-2 rounded-full border border-gold/20 text-cream/80 text-sm"
              >
                {city}
              </span>
            ))}
          </div>
          <span className="inline-block bg-gold/10 text-gold border border-gold/30 px-5 py-2 rounded-full text-sm font-semibold">
            Free delivery within 50 miles of Fresno
          </span>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-28 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-charcoal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">
            Ready to Book?
          </h2>
          <p className="text-lg text-cream/80 mb-8 max-w-2xl mx-auto">
            Get an instant quote for your upcoming event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-gold text-charcoal-dark px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gold-light shadow-lg hover:shadow-xl transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              Get Your Free Quote
            </Link>
            <a
              href="tel:+15596630356"
              className="border-2 border-cream/80 text-cream px-10 py-4 rounded-lg text-lg font-semibold hover:bg-cream hover:text-charcoal-dark transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              Call (559) 663-0356
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
