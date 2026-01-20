export default function Home() {
  return (
    <main className="min-h-screen bg-charcoal-dark flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gold mb-4">
          Upscale Outhouse
        </h1>
        <p className="text-xl md:text-2xl text-gold-light mb-8">
          Luxury Bathroom Trailer Rentals
        </p>
        <div className="w-24 h-0.5 bg-gold mx-auto mb-8"></div>
        <p className="text-2xl md:text-3xl text-cream mb-12">
          Coming Soon
        </p>
        <p className="text-gold-light text-lg">
          Serving Fresno &amp; Central California
        </p>
        <p className="text-cream mt-4 text-lg">
          <a href="tel:+15591234567" className="hover:text-gold transition-colors">
            (559) 123-4567
          </a>
        </p>
      </div>
    </main>
  );
}
