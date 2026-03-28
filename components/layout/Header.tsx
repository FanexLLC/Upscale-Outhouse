'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import MobileMenu from './MobileMenu';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [ctaPulse, setCtaPulse] = useState(false);
  const eventsRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('gallery'), href: '/gallery' },
    { name: t('events'), href: '#', hasDropdown: true },
    { name: t('quote'), href: '/quote' },
    { name: t('contact'), href: '/contact' },
  ];

  const eventsDropdown = [
    { name: t('weddings'), href: '/events/weddings' },
    { name: t('corporate'), href: '/events/corporate' },
    { name: t('birthdaysGraduations'), href: '/events/birthday-graduation' },
    { name: t('festivalsConcerts'), href: '/events/festivals' },
    { name: t('quinceaneras'), href: '/events/quinceanera' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Gold pulse on GET QUOTE every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      setCtaPulse(true);
      setTimeout(() => setCtaPulse(false), 1000);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Close events dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (eventsRef.current && !eventsRef.current.contains(e.target as Node)) {
        setEventsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg-primary/95 backdrop-blur-md border-b border-gold-primary/20'
            : 'bg-transparent'
        }`}
      >
        <nav
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex h-16 md:h-[72px] items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image
                src="/images/gallery/Logo-black.jpg"
                alt="Upscale Outhouse logo"
                width={48}
                height={48}
                className="h-10 w-10 md:h-12 md:w-12 object-contain"
                style={{ mixBlendMode: 'screen' }}
                priority
              />
              <span className="text-lg font-bold text-white hidden sm:block font-display">
                Upscale Outhouse
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-6">
              {navLinks.map((item) =>
                item.hasDropdown ? (
                  <div
                    key={item.name}
                    ref={eventsRef}
                    className="relative"
                    onMouseEnter={() => setEventsOpen(true)}
                    onMouseLeave={() => setEventsOpen(false)}
                  >
                    <button
                      className="text-sm font-medium text-white hover:text-gold-primary transition-colors font-body flex items-center gap-1"
                      onClick={() => setEventsOpen(!eventsOpen)}
                      aria-expanded={eventsOpen}
                      aria-haspopup="true"
                    >
                      {item.name}
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${eventsOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>

                    {/* Dropdown wrapper — pt-4 creates a hover bridge so cursor can travel from button to menu */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 w-56 transition-all duration-200 ${
                        eventsOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="rounded-lg bg-bg-elevated border border-gold-primary/20 shadow-card py-2">
                        {eventsDropdown.map((event) => (
                          <Link
                            key={event.name}
                            href={event.href}
                            className="block px-4 py-2.5 text-sm text-text-secondary hover:text-gold-primary hover:bg-bg-primary/50 transition-colors font-body"
                          >
                            {event.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-white hover:text-gold-primary transition-colors font-body"
                  >
                    {item.name}
                  </Link>
                )
              )}

              {/* Divider */}
              <span className="hidden lg:inline-block w-px h-5 bg-gold-primary/30" aria-hidden="true" />

              {/* Phone */}
              <a
                href="tel:+15596630356"
                className="hidden lg:flex items-center gap-2 text-gold-primary hover:text-gold-light text-sm font-medium transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                (559) 663-0356
              </a>

              {/* GET QUOTE CTA */}
              <Button
                variant="primary"
                size="sm"
                href="/quote"
                className={ctaPulse ? 'animate-pulse shadow-gold' : ''}
              >
                {t('getQuote')}
              </Button>

              {/* Language toggle */}
              <span className="hidden xl:block">
                <LanguageToggle />
              </span>
            </div>

            {/* Mobile: phone icon + hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href="tel:+15596630356"
                className="text-gold-primary p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Call (559) 663-0356"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </a>
              <button
                type="button"
                className="text-white hover:text-gold-primary p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={() => setMobileMenuOpen(true)}
                aria-expanded={mobileMenuOpen}
                aria-label="Open menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
}
