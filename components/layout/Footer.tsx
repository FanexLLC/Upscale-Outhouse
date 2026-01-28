import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-dark border-t border-gold/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Brand */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gold mb-3">Upscale Outhouse</h3>
          <p className="text-cream/80 text-sm max-w-md leading-relaxed">
            Luxury bathroom trailer rentals for weddings, corporate events,
            and special occasions in Fresno and Central California.
          </p>
          <p className="text-gold-light text-sm mt-3">
            Veteran-Owned Business
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-cream/80 hover:text-gold text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream/80 hover:text-gold text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-cream/80 hover:text-gold text-sm transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-cream/80 hover:text-gold text-sm transition-colors">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream/80 hover:text-gold text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Area */}
          <div>
            <h4 className="text-gold font-semibold mb-4">Service Area</h4>
            <ul className="space-y-2 text-sm text-cream/80">
              <li>Fresno</li>
              <li>Bakersfield</li>
              <li>Visalia</li>
              <li>Merced</li>
              <li>Modesto</li>
              <li className="text-cream/60 pt-1">+ all of Central California</li>
            </ul>
            <p className="text-gold-light/80 text-xs mt-3">
              Free delivery within 50 miles
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+15596630356" className="text-cream/80 hover:text-gold transition-colors">
                  (559) 663-0356
                </a>
              </li>
              <li>
                <a href="mailto:upscaleouthouse@gmail.com" className="text-cream/80 hover:text-gold transition-colors">
                  upscaleouthouse@gmail.com
                </a>
              </li>
              <li className="text-cream/80">
                Fresno, California
              </li>
              <li className="pt-2">
                <a
                  href="https://www.instagram.com/upscale_outhouse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @upscale_outhouse
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gold/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-cream/60 text-sm">
            &copy; {currentYear} Upscale Outhouse. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-cream/60 hover:text-gold text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-cream/60 hover:text-gold text-sm transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
