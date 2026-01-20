import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Get a Quote | Upscale Outhouse',
  description: 'Get an instant quote for luxury bathroom trailer rental for your event in Fresno and Central California.',
};

export default function QuotePage() {
  return (
    <section className="py-20 bg-charcoal-dark min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gold mb-6">
          Get a Quote
        </h1>
        <p className="text-xl text-cream/80 mb-8">
          Our instant quote calculator is coming soon!
        </p>

        <div className="bg-charcoal p-8 rounded-lg border border-gold/20 mb-8">
          <div className="text-gold text-6xl mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gold mb-4">
            Phase 4 Coming Soon
          </h2>
          <p className="text-cream/70 mb-6">
            The online quote calculator will allow you to:
          </p>
          <ul className="text-cream/70 space-y-2 text-left max-w-sm mx-auto">
            <li className="flex items-center gap-2">
              <span className="text-gold">&#10003;</span>
              Select your event dates
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gold">&#10003;</span>
              Enter your event location
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gold">&#10003;</span>
              Get instant pricing
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gold">&#10003;</span>
              Book and pay online
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-cream/80 text-lg">
            In the meantime, contact us directly for a quote:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15591234567"
              className="bg-gold text-charcoal-dark px-6 py-3 rounded font-semibold hover:bg-gold-light transition-colors"
            >
              Call (559) 123-4567
            </a>
            <a
              href="mailto:info@upscaleouthouse.com"
              className="border-2 border-gold text-gold px-6 py-3 rounded font-semibold hover:bg-gold hover:text-charcoal-dark transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
