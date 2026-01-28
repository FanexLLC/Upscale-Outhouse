import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Upscale Outhouse for luxury bathroom trailer rentals in Fresno and Central California. Call (559) 663-0356 or get an instant online quote.',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Have questions? We're here to help. Reach out anytime."
      />

      {/* Contact Info Section */}
      <section className="py-24 bg-charcoal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gold mb-8">Get In Touch</h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gold mb-1">Phone</h3>
                    <a
                      href="tel:+15596630356"
                      className="text-cream/80 hover:text-gold transition-colors text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
                    >
                      (559) 663-0356
                    </a>
                    <p className="text-cream/60 text-sm mt-1">
                      Call or text anytime
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gold mb-1">Email</h3>
                    <a
                      href="mailto:upscaleouthouse@gmail.com"
                      className="text-cream/80 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
                    >
                      upscaleouthouse@gmail.com
                    </a>
                    <p className="text-cream/60 text-sm mt-1">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gold mb-1">Location</h3>
                    <p className="text-cream/80">
                      Fresno, California
                    </p>
                    <p className="text-cream/60 text-sm mt-1">
                      Serving within 150 miles
                    </p>
                  </div>
                </div>

                {/* Social */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="h-6 w-6 text-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gold mb-1">Instagram</h3>
                    <a
                      href="https://www.instagram.com/upscale_outhouse/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cream/80 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
                    >
                      @upscale_outhouse
                    </a>
                    <p className="text-cream/60 text-sm mt-1">
                      Follow us for updates and photos
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Quote CTA */}
            <div>
              <div className="bg-charcoal p-8 rounded-2xl border border-gold/20 shadow-md">
                <h2 className="text-2xl font-bold text-gold mb-4">
                  Ready to Book?
                </h2>
                <p className="text-cream/80 mb-6">
                  Get an instant quote for your event in just a few clicks. Our online
                  quote calculator will show you exactly what your rental will cost.
                </p>
                <Link
                  href="/quote"
                  className="inline-block w-full bg-gold text-charcoal-dark px-6 py-4 rounded-lg text-lg font-semibold hover:bg-gold-light shadow-lg hover:shadow-xl transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                >
                  Get an Instant Quote
                </Link>
                <p className="text-cream/60 text-sm mt-4 text-center">
                  No obligation &bull; Response within 24 hours
                </p>
              </div>

              {/* Business Hours */}
              <div className="mt-8 bg-charcoal p-8 rounded-2xl border border-gold/20 shadow-md">
                <h3 className="text-xl font-bold text-gold mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2 text-cream/80">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>By appointment</span>
                  </div>
                </div>
                <p className="text-cream/60 text-sm mt-4">
                  Deliveries and pickups available 7 days a week
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-28 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-6">Service Area</h2>
          <div className="aspect-video bg-charcoal-dark rounded-2xl border border-gold/20 shadow-md flex items-center justify-center">
            <div className="text-cream/50 text-center p-8">
              <svg className="h-12 w-12 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
              <p className="text-lg mb-2">Service Area Map</p>
              <p className="text-sm">
                We serve events within 150 miles of Fresno, CA
                <br />
                including Bakersfield, Visalia, Merced, and Modesto
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
