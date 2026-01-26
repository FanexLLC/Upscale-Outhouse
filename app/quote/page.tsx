import type { Metadata } from 'next';
import QuoteForm from './QuoteForm';

export const metadata: Metadata = {
  title: 'Get a Quote',
  description: 'Get an instant quote for luxury bathroom trailer rental. $450/day with free delivery within 50 miles of Fresno. Book online in minutes.',
};

export default function QuotePage() {
  return (
    <section className="py-12 md:py-20 bg-charcoal-dark min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gold mb-3">
            Get Your Instant Quote
          </h1>
          <p className="text-cream/70">
            Fill out the details below to receive your personalized quote
          </p>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
