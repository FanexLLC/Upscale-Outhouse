import Link from 'next/link';
import FeaturesCarousel from '@/components/ui/FeaturesCarousel';
import TestimonialsCarousel from '@/components/ui/TestimonialsCarousel';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Upscale Outhouse',
  description: 'Premium luxury bathroom trailer rentals for weddings, corporate events, and special occasions in Fresno and Central California.',
  url: 'https://upscaleouthouse.com',
  telephone: '+15596630356',
  email: 'upscaleouthouse@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Fresno',
    addressRegion: 'CA',
    postalCode: '93704',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 36.7378,
      longitude: -119.7871,
    },
    geoRadius: '241000', // 150 miles in meters
  },
  priceRange: '$450/day',
  image: 'https://upscaleouthouse.com/images/gallery/hero-bg.jpg',
};


export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative bg-charcoal-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left: Headline and CTAs */}
            <div>
              <p className="text-gold-light uppercase tracking-[0.25em] text-sm font-medium mb-4">
                Veteran-Owned &bull; Fresno, CA
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
                <span className="text-gold">Luxury Restrooms</span>
                <br />
                <span className="text-cream">for Unforgettable</span>
                <br />
                <span className="text-cream">Events</span>
              </h1>
              <p className="text-lg md:text-xl text-cream/80 mb-10 max-w-lg leading-relaxed">
                Premium bathroom trailer rentals for weddings, corporate events,
                and special occasions throughout Central California.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quote"
                  className="bg-gold text-charcoal-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gold-light transition-all shadow-lg hover:shadow-xl text-center"
                >
                  Get an Instant Quote
                </Link>
                <Link
                  href="/gallery"
                  className="border-2 border-cream/80 text-cream px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cream hover:text-charcoal-dark transition-all text-center"
                >
                  View Gallery
                </Link>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative">
              <div className="aspect-[3/2] rounded-2xl overflow-hidden border border-gold/20 shadow-2xl">
                <img
                  src="/images/gallery/hero-bg.jpg"
                  alt="Luxury bathroom trailer at an event venue"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-dark mb-4">
              Why Choose Upscale Outhouse?
            </h2>
            <p className="text-charcoal/80 text-lg max-w-2xl mx-auto">
              We provide more than just portable restrooms. We deliver a luxury experience
              that elevates your event.
            </p>
          </div>

          <FeaturesCarousel />
        </div>
      </section>

      {/* Trailer Overview Section */}
      <section className="py-20 bg-charcoal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gold mb-6">
                Experience True Luxury
              </h2>
              <p className="text-cream text-lg mb-6">
                Our premium bathroom trailer features everything your guests need for a
                comfortable, upscale experience:
              </p>
              <ul className="space-y-3 text-cream">
                <li className="flex items-center gap-3">
                  <span className="text-gold">&#10003;</span>
                  Multiple private restroom stalls
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold">&#10003;</span>
                  Flushing porcelain toilets
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold">&#10003;</span>
                  Hot and cold running water
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold">&#10003;</span>
                  Vanity with mirrors and lighting
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold">&#10003;</span>
                  Climate control (A/C and heat)
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gold">&#10003;</span>
                  Bluetooth sound system
                </li>
              </ul>
              <Link
                href="/gallery"
                className="inline-block mt-8 text-gold hover:text-gold-light transition-colors font-semibold"
              >
                See more in our gallery &rarr;
              </Link>
            </div>
            <div className="relative rounded-lg aspect-video overflow-hidden border border-gold/20">
              <img
                src="/images/gallery/exterior-1.jpg"
                alt="Upscale Outhouse luxury bathroom trailer"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-dark mb-4">
              What Our Clients Say
            </h2>
            <p className="text-charcoal/70 text-lg">
              Don&apos;t just take our word for it. Hear from our satisfied customers.
            </p>
          </div>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-20 bg-charcoal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">
            Serving Central California
          </h2>
          <p className="text-cream text-lg max-w-2xl mx-auto mb-8">
            Based in Fresno, we proudly serve events within 150 miles, including
            Bakersfield, Visalia, Merced, Modesto, and the entire Central Valley.
          </p>
          <p className="text-gold-light font-medium">
            Free delivery within 50 miles of Fresno
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal-dark mb-6">
            Ready to Elevate Your Event?
          </h2>
          <p className="text-charcoal/70 text-lg mb-8">
            Get an instant quote in seconds. No obligation, no hassle.
          </p>
          <Link
            href="/quote"
            className="inline-block bg-gold text-charcoal-dark px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gold-light transition-all shadow-lg hover:shadow-xl"
          >
            Get Your Free Quote
          </Link>
          <p className="mt-6 text-charcoal/60">
            Or call us at{' '}
            <a href="tel:+15596630356" className="text-gold hover:text-gold-olive font-medium">
              (559) 663-0356
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
