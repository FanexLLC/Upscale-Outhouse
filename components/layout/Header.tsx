'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Get a Quote', href: '/quote' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-charcoal-dark/95 backdrop-blur-sm border-b border-gold/20">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/gallery/Logo-black.jpg"
                alt="Upscale Outhouse logo"
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
                style={{ mixBlendMode: 'screen' }}
              />
              <span className="text-xl font-bold text-gold hidden sm:block">
                Upscale Outhouse
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  item.name === 'Get a Quote'
                    ? 'bg-gold text-charcoal-dark px-4 py-2 rounded hover:bg-gold-light'
                    : 'text-cream hover:text-gold'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* Phone CTA - visible on large desktops */}
            <span className="hidden lg:inline-block w-px h-5 bg-gold/30" aria-hidden="true" />
            <a
              href="tel:+15596630356"
              className="hidden lg:flex items-center gap-2 text-gold hover:text-gold-light text-sm font-medium transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              (559) 663-0356
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-cream hover:text-gold p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-base font-medium transition-colors ${
                    item.name === 'Get a Quote'
                      ? 'bg-gold text-charcoal-dark px-4 py-2 rounded text-center hover:bg-gold-light'
                      : 'text-cream hover:text-gold px-4 py-2'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
