import type { Metadata } from 'next';
import Link from 'next/link';
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
      />

      {/* Story Section */}
      <section className="py-24 bg-charcoal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gold mb-6">Our Story</h2>
              <div className="space-y-4 text-cream/80">
                <p>
                  Upscale Outhouse was founded with a simple mission: to provide event guests
                  with restroom facilities that match the quality and elegance of the events
                  they attend.
                </p>
                <p>
                  As a veteran-owned business, we bring military precision, reliability, and
                  attention to detail to every rental. We understand that your event is
                  important, and we treat it that way.
                </p>
                <p>
                  Based in Fresno, we proudly serve the entire Central Valley region,
                  bringing luxury restroom trailers to weddings, corporate events, private
                  parties, and special occasions of all kinds.
                </p>
              </div>
            </div>
            <div className="bg-charcoal rounded-2xl aspect-square flex items-center justify-center border border-gold/20 shadow-md">
              <p className="text-cream/50 text-center px-8">
                [Owner/Team Photo Placeholder]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-28 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-16 text-center">
            What We Believe
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl p-8 border border-gold/20 shadow-md hover:shadow-lg transition text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gold mb-2">Cleanliness</h3>
              <p className="text-cream/70">
                Immaculate trailers maintained to the highest standards for every event.
              </p>
            </div>
            <div className="rounded-2xl p-8 border border-gold/20 shadow-md hover:shadow-lg transition text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gold mb-2">Reliability</h3>
              <p className="text-cream/70">
                On-time delivery and pickup, every time. Your event runs on schedule.
              </p>
            </div>
            <div className="rounded-2xl p-8 border border-gold/20 shadow-md hover:shadow-lg transition text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gold mb-2">Guest Experience</h3>
              <p className="text-cream/70">
                Friendly, professional service from booking to pickup — your guests deserve the best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-24 bg-charcoal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-6">Service Area</h2>
          <p className="text-cream/80 text-lg mb-8">
            Based in Fresno, California, we serve events within a 150-mile radius,
            covering the entire Central Valley and beyond.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-cream/70">
            <div>Fresno</div>
            <div>Clovis</div>
            <div>Visalia</div>
            <div>Bakersfield</div>
            <div>Merced</div>
            <div>Modesto</div>
            <div>Madera</div>
            <div>Hanford</div>
          </div>
          <p className="mt-8 text-gold-light">
            Free delivery within 50 miles
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-28 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-16 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-charcoal-dark p-8 rounded-2xl border border-gold/20 shadow-md"
              >
                <h3 className="text-lg font-semibold text-gold mb-2">
                  {faq.question}
                </h3>
                <p className="text-cream/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-charcoal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-6">
            Ready to Book?
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-cream/80 mb-8 max-w-2xl mx-auto">
            Get an instant quote for your upcoming event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-block bg-gold text-charcoal-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gold-light shadow-lg hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              Get Your Free Quote
            </Link>
            <a
              href="tel:+15596630356"
              className="inline-block border-2 border-cream/80 text-cream px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cream hover:text-charcoal-dark transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
