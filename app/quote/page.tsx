import type { Metadata } from 'next';
import QuoteForm from './QuoteForm';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Get a Quote',
  description: 'Get an instant quote for luxury bathroom trailer rental. $450/day with free delivery within 50 miles of Fresno. Book online in minutes.',
};

export default function QuotePage() {
  return (
    <>
      <PageHeader
        title="Get Your Instant Quote"
        subtitle="Fill out the details below to receive your personalized quote"
      />
      {/* Trust Strip */}
      <div className="bg-charcoal border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs sm:text-sm text-cream/70">
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
              Veteran-owned
            </span>
            <span className="text-gold/30 hidden sm:inline" aria-hidden="true">&bull;</span>
            <span>Free delivery within 50 miles</span>
            <span className="text-gold/30 hidden sm:inline" aria-hidden="true">&bull;</span>
            <span>Climate controlled</span>
            <span className="text-gold/30 hidden sm:inline" aria-hidden="true">&bull;</span>
            <span>Professional Setup</span>
          </div>
        </div>
      </div>

      <section className="py-12 md:py-20 bg-charcoal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12">
            {/* Form */}
            <QuoteForm />

            {/* Trust Sidebar */}
            <aside className="order-first lg:order-last">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="rounded-2xl p-8 border border-gold/20 bg-charcoal shadow-md">
                  <h3 className="text-xl font-semibold text-gold mb-6">
                    Why Choose Upscale Outhouse
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <svg className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                      <div>
                        <p className="text-cream font-medium">Veteran-Owned</p>
                        <p className="text-cream/60 text-sm">Military precision and reliability for every event</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                      <div>
                        <p className="text-cream font-medium">Free Delivery Within 50 Miles</p>
                        <p className="text-cream/60 text-sm">Setup and pickup included at no extra cost</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                      </svg>
                      <div>
                        <p className="text-cream font-medium">Climate Controlled</p>
                        <p className="text-cream/60 text-sm">Air conditioning and heating for year-round comfort</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                      </svg>
                      <div>
                        <p className="text-cream font-medium">Running Water</p>
                        <p className="text-cream/60 text-sm">Full plumbing with flushing toilets and sinks</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                      <div>
                        <p className="text-cream font-medium">Fast Response</p>
                        <p className="text-cream/60 text-sm">Quotes in minutes, not days</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Quick contact */}
                <div className="rounded-2xl p-6 border border-gold/20 bg-charcoal shadow-md text-center">
                  <p className="text-cream/70 text-sm mb-3">Prefer to talk to someone?</p>
                  <a
                    href="tel:+15596630356"
                    className="inline-flex items-center justify-center gap-2.5 text-gold font-semibold text-lg px-5 py-3 rounded-xl border border-gold/30 hover:bg-gold/10 hover:text-gold-light transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    (559) 663-0356
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
