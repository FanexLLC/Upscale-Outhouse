import Link from 'next/link';
import Image from 'next/image';
import FeaturesGrid from '@/components/ui/FeaturesGrid';
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
              <p className="text-lg md:text-xl text-cream/80 mb-6 max-w-lg leading-relaxed">
                Premium bathroom trailer rentals for weddings, corporate events,
                and special occasions throughout Central California.
              </p>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-cream/60 mb-8">
                <li className="flex items-center gap-1.5">
                  <span className="text-gold">&#10003;</span> Veteran-Owned
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-gold">&#10003;</span> Free Delivery Within 50 Miles
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-gold">&#10003;</span> Climate Controlled
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-gold">&#10003;</span> Hot &amp; Cold Running Water
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quote"
                  className="bg-gold text-charcoal-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gold-light transition-all shadow-lg hover:shadow-xl text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-dark"
                >
                  Get an Instant Quote
                </Link>
                <Link
                  href="/gallery"
                  className="border-2 border-cream/80 text-cream px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cream hover:text-charcoal-dark transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-dark"
                >
                  View Gallery
                </Link>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative">
              <div className="relative aspect-[3/2] rounded-2xl overflow-hidden border border-gold/20 shadow-2xl">
                <Image
                  src="/images/gallery/hero-bg.jpg"
                  alt="Luxury bathroom trailer at an event venue"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-cream">
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

          <FeaturesGrid />
        </div>
      </section>

      {/* Trailer Overview Section */}
      <section className="py-28 bg-charcoal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">
                Experience True Luxury
              </h2>
              <p className="text-cream text-lg mb-6">
                Our premium bathroom trailer features everything your guests need for a
                comfortable, upscale experience:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-cream">
                <li className="flex items-center gap-3">
                  <span className="flex-none w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm">&#10003;</span>
                  Multiple private restroom stalls
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex-none w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm">&#10003;</span>
                  Flushing porcelain toilets
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex-none w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm">&#10003;</span>
                  Hot and cold running water
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex-none w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm">&#10003;</span>
                  Vanity with mirrors and lighting
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex-none w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm">&#10003;</span>
                  Climate control (A/C and heat)
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex-none w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm">&#10003;</span>
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
              <Image
                src="/images/gallery/exterior-1.jpg"
                alt="Upscale Outhouse luxury bathroom trailer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-dark mb-4">
              What Our Clients Say
            </h2>
            <p className="text-charcoal/70 text-lg mb-2">
              Don&apos;t just take our word for it. Hear from our satisfied customers.
            </p>
            <p className="text-gold font-semibold text-sm tracking-wide">
              &#9733;&#9733;&#9733;&#9733;&#9733; Rated 5/5 by every client
            </p>
          </div>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-28 bg-charcoal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">
              Serving Central California
            </h2>
            <p className="text-cream text-lg max-w-2xl mx-auto">
              Based in Fresno, we proudly serve events within 150 miles
              throughout the Central Valley and beyond.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <h3 className="text-cream/60 text-sm uppercase tracking-widest text-center mb-6">
              Cities We Serve
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 text-cream text-center">
              <li>Fresno</li>
              <li>Clovis</li>
              <li>Visalia</li>
              <li>Bakersfield</li>
              <li>Merced</li>
              <li>Modesto</li>
              <li>Madera</li>
              <li>Hanford</li>
              <li>Tulare</li>
            </ul>
            <p className="text-cream/50 text-sm text-center mt-6">
              Don&apos;t see your city? We likely serve your area too &mdash;{' '}
              <Link href="/contact" className="text-gold hover:text-gold-light transition-colors underline underline-offset-2">
                get in touch
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal-dark mb-4">
            Ready to Elevate Your Event?
          </h2>
          <p className="text-charcoal/70 text-lg mb-8">
            Get an instant quote in seconds. No obligation, no hassle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-block bg-gold text-charcoal-dark px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gold-light transition-all shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              Get Your Free Quote
            </Link>
            <a
              href="tel:+15596630356"
              className="inline-block border-2 border-charcoal-dark text-charcoal-dark px-10 py-4 rounded-lg text-lg font-semibold hover:bg-charcoal-dark hover:text-cream transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-dark focus-visible:ring-offset-2"
            >
              Call (559) 663-0356
            </a>
          </div>
          <p className="mt-6 text-charcoal/50 text-sm">
            No obligation &bull; Fast response
          </p>
        </div>
      </section>
    </>
  );
}
