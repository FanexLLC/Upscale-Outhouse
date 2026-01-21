import Link from 'next/link';

const features = [
  {
    title: 'Climate Controlled',
    description: 'Air conditioning and heating for year-round comfort at any event.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: 'Running Water',
    description: 'Full plumbing with hot and cold running water for a true luxury experience.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33" />
      </svg>
    ),
  },
  {
    title: 'Elegant Interior',
    description: 'Hardwood floors, granite countertops, and premium fixtures throughout.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    title: 'Spacious Design',
    description: 'Multiple private stalls with full-length mirrors and ample space.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    ),
  },
  {
    title: 'Professional Setup',
    description: 'We handle delivery, setup, and pickup so you can focus on your event.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    title: 'Veteran Owned',
    description: 'Proudly veteran-owned and operated with military precision and care.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    quote: "Upscale Outhouse made our wedding day perfect. Our guests couldn't stop talking about how nice the facilities were!",
    author: "Sarah M.",
    event: "Wedding",
  },
  {
    quote: "Professional service from start to finish. The trailer was immaculate and our corporate event was elevated because of it.",
    author: "Michael T.",
    event: "Corporate Event",
  },
  {
    quote: "We've used Upscale Outhouse for three events now. Always reliable, always spotless. Highly recommend!",
    author: "Jennifer L.",
    event: "Birthday Party",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* Background Image - positioned to show trailer centered */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/images/gallery/hero-bg.jpg')",
            backgroundPosition: "center 40%"
          }}
        />
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-dark/60 via-charcoal-dark/40 to-charcoal-dark/70" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gold">Luxury Restrooms</span>
            <br />
            <span className="text-cream">for Unforgettable Events</span>
          </h1>
          <p className="text-xl md:text-2xl text-cream/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Premium bathroom trailer rentals for weddings, corporate events, and special
            occasions throughout Central California.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-gold text-charcoal-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gold-light transition-all shadow-lg hover:shadow-xl"
            >
              Get an Instant Quote
            </Link>
            <Link
              href="/gallery"
              className="border-2 border-cream/80 text-cream px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cream hover:text-charcoal-dark transition-all"
            >
              View Gallery
            </Link>
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
              We provide more than just portable restrooms — we deliver a luxury experience
              that elevates your event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gold/10"
              >
                <div className="text-gold mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-charcoal-dark mb-2">{feature.title}</h3>
                <p className="text-charcoal/70">{feature.description}</p>
              </div>
            ))}
          </div>
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
              Don&apos;t just take our word for it — hear from our satisfied customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md"
              >
                <div className="text-gold text-4xl mb-4">&ldquo;</div>
                <p className="text-charcoal/80 mb-6 italic">{testimonial.quote}</p>
                <div>
                  <p className="text-charcoal-dark font-semibold">{testimonial.author}</p>
                  <p className="text-charcoal/60 text-sm">{testimonial.event}</p>
                </div>
              </div>
            ))}
          </div>
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
