import type { Metadata } from 'next';
import OverlineLabel from '@/components/ui/OverlineLabel';
import Card from '@/components/ui/Card';
import SectionDivider from '@/components/ui/SectionDivider';
import ContactForm from '@/components/contact/ContactForm';
import ServiceAreaMap from '@/components/ui/ServiceAreaMap';

export const metadata: Metadata = {
  title: 'Contact Us | Upscale Outhouse — Luxury Restroom Trailer Rentals',
  description:
    'Contact Upscale Outhouse for luxury restroom trailer rentals in Fresno & Central California. Call (559) 663-0356 or fill out our form. We respond within 2 hours.',
  openGraph: {
    title: 'Contact Us | Upscale Outhouse — Luxury Restroom Trailer Rentals',
    description: 'Contact Upscale Outhouse for luxury restroom trailer rentals in Fresno & Central California. Call (559) 663-0356 or fill out our form. We respond within 2 hours.',
    url: 'https://www.upscaleouthouse.com/contact',
    siteName: 'Upscale Outhouse',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Contact Upscale Outhouse for luxury restroom trailer rentals' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Upscale Outhouse — Luxury Restroom Trailer Rentals',
    description: 'Contact Upscale Outhouse for luxury restroom trailer rentals in Fresno & Central California. Call (559) 663-0356 or fill out our form. We respond within 2 hours.',
    images: ['/twitter-image.png'],
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg-primary pt-32 md:pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OverlineLabel>GET IN TOUCH</OverlineLabel>
          <h1 className="font-display text-h1 text-white mt-md mb-lg max-w-3xl">
            Let&apos;s Make Your Event Unforgettable
          </h1>
          <p className="text-text-secondary text-body max-w-2xl leading-relaxed">
            Questions? Need a custom quote? We&apos;d love to hear about your event.
          </p>
        </div>
      </section>

      {/* Two-column: Contact Methods + Form */}
      <section className="bg-bg-primary pb-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left — Contact Methods */}
            <div className="space-y-8">
              {/* Call Us */}
              <Card hover={false} className="p-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gold-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-overline font-accent uppercase tracking-[0.2em] text-gold-primary mb-xs">
                      CALL US
                    </p>
                    <a
                      href="tel:+15596630356"
                      className="text-gold-primary text-h3 font-display hover:text-gold-light transition-colors"
                    >
                      (559) 663-0356
                    </a>
                    <p className="text-text-muted text-small mt-xs">
                      Available 7 days a week
                    </p>
                  </div>
                </div>
              </Card>

              <SectionDivider />

              {/* Email Us */}
              <Card hover={false} className="p-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gold-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-overline font-accent uppercase tracking-[0.2em] text-gold-primary mb-xs">
                      EMAIL US
                    </p>
                    <a
                      href="mailto:upscaleouthouse@gmail.com"
                      className="text-gold-primary text-body font-body hover:text-gold-light transition-colors break-all"
                    >
                      upscaleouthouse@gmail.com
                    </a>
                    <p className="text-text-muted text-small mt-xs">
                      We respond within 2 hours
                    </p>
                  </div>
                </div>
              </Card>

              <SectionDivider />

              {/* Based In */}
              <Card hover={false} className="p-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gold-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-overline font-accent uppercase tracking-[0.2em] text-gold-primary mb-xs">
                      BASED IN
                    </p>
                    <p className="text-white text-body font-body">
                      Fresno, California
                    </p>
                    <p className="text-text-muted text-small mt-xs">
                      Serving the entire Central Valley
                    </p>
                  </div>
                </div>
              </Card>

              <SectionDivider />

              {/* Follow Us */}
              <Card hover={false} className="p-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gold-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-overline font-accent uppercase tracking-[0.2em] text-gold-primary mb-xs">
                      FOLLOW US
                    </p>
                    <a
                      href="https://www.instagram.com/upscale_outhouse/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-primary text-body font-body hover:text-gold-light transition-colors"
                    >
                      Instagram: @upscale_outhouse
                    </a>
                    <p className="text-text-muted text-small mt-xs">
                      Facebook &amp; TikTok: Coming soon
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right — Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      <section className="bg-bg-primary py-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-bg-secondary h-[400px] rounded-card overflow-hidden">
            <ServiceAreaMap />
          </div>
          <p className="text-gold-primary text-center mt-lg text-body">
            Free delivery within 50 miles of Fresno
          </p>
        </div>
      </section>
    </>
  );
}
