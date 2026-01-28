import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import ServiceAreaMap from '@/components/ui/ServiceAreaMap';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Upscale Outhouse for luxury bathroom trailer rentals in Fresno and Central California. Call (559) 663-0356 or get an instant online quote.',
};

export default function ContactPage() {
  return (
    <>
      {/* 1) Premium Header */}
      <PageHeader
        title="Contact"
        subtitle="Get a fast quote or ask a question. We respond quickly."
      />

      {/* Header CTAs */}
      <section className="bg-charcoal-dark pb-16 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/quote"
            className="w-full sm:w-auto bg-gold text-charcoal-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gold-light shadow-lg hover:shadow-xl transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            Get an Instant Quote
          </Link>
          <a
            href="tel:+15596630356"
            className="w-full sm:w-auto border-2 border-gold text-gold px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gold/10 transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            Call (559) 663-0356
          </a>
        </div>
      </section>

      {/* 2) Quick Contact Cards */}
      <section className="py-24 bg-charcoal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Call Us */}
            <div className="rounded-2xl border border-charcoal/10 shadow-md hover:shadow-lg transition bg-charcoal p-8 text-center">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-7 w-7 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gold mb-2">Call Us</h3>
              <a
                href="tel:+15596630356"
                className="text-gold hover:text-gold-light font-medium text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
              >
                (559) 663-0356
              </a>
              <p className="text-cream/50 text-sm mt-2">Tap to call</p>
            </div>

            {/* Email */}
            <div className="rounded-2xl border border-charcoal/10 shadow-md hover:shadow-lg transition bg-charcoal p-8 text-center">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-7 w-7 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gold mb-2">Email</h3>
              <a
                href="mailto:upscaleouthouse@gmail.com"
                className="text-gold hover:text-gold-light font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
              >
                upscaleouthouse@gmail.com
              </a>
              <p className="text-cream/50 text-sm mt-2">Tap to email</p>
            </div>

            {/* Follow Us */}
            <div className="rounded-2xl border border-charcoal/10 shadow-md hover:shadow-lg transition bg-charcoal p-8 text-center">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-7 w-7 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gold mb-2">Follow Us</h3>
              <a
                href="https://www.instagram.com/upscale_outhouse/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
              >
                @upscale_outhouse
              </a>
              <p className="text-cream/50 text-sm mt-2">Follow us for updates and photos</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3) Service Area Map */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-6 text-center">Service Area</h2>
          <p className="text-cream/70 text-center mb-2 max-w-2xl mx-auto">
            Based in Fresno, California. We serve events within 150 miles, including
            Bakersfield, Visalia, Merced, and Modesto.
          </p>
          <p className="text-center mb-8">
            <span className="inline-block bg-gold/10 text-gold text-sm font-medium px-4 py-1.5 rounded-full">
              Free delivery within 50 miles of Fresno
            </span>
          </p>
          <div className="rounded-2xl overflow-hidden border border-charcoal/10 shadow-md">
            <div className="h-[320px] md:h-[420px]">
              <ServiceAreaMap />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
