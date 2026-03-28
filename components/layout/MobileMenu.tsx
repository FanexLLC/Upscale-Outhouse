'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import LanguageToggle from './LanguageToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations('nav');

  const mainLinks = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('gallery'), href: '/gallery' },
    { name: t('quote'), href: '/quote' },
    { name: t('contact'), href: '/contact' },
  ];

  const eventLinks = [
    { name: t('weddings'), href: '/events/weddings' },
    { name: t('corporate'), href: '/events/corporate' },
    { name: t('birthdaysGraduations'), href: '/events/birthday-graduation' },
    { name: t('festivalsConcerts'), href: '/events/festivals' },
    { name: t('quinceaneras'), href: '/events/quinceanera' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[59] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 z-[60] h-full w-[85%] max-w-sm bg-bg-primary border-l border-gold-primary/15 shadow-2xl transition-transform duration-300 ease-out md:hidden overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Image
              src="/images/gallery/Logo-black.jpg"
              alt="Upscale Outhouse logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              style={{ mixBlendMode: 'screen' }}
            />
            <span className="font-display text-white text-lg">Upscale Outhouse</span>
          </div>
          <button
            type="button"
            className="text-text-muted hover:text-gold-primary p-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-6">
          {/* Main nav links */}
          <nav className="space-y-1 mb-6">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center px-3 py-3 rounded-lg text-white hover:bg-white/5 hover:text-gold-primary transition-colors font-body text-base"
                onClick={onClose}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Events section */}
          <div className="mb-6">
            <p className="px-3 text-xs uppercase tracking-widest text-gold-primary/60 font-semibold mb-2">
              Events
            </p>
            <nav className="space-y-1">
              {eventLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center px-3 py-2.5 rounded-lg text-text-secondary hover:bg-white/5 hover:text-gold-primary transition-colors font-body text-sm"
                  onClick={onClose}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5 mx-3 mb-6" aria-hidden="true" />

          {/* Phone */}
          <a
            href="tel:+15596630356"
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-gold-primary hover:bg-gold-primary/5 transition-colors mb-4"
            onClick={onClose}
          >
            <svg className="h-5 w-5 flex-none" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <span className="font-medium">(559) 663-0356</span>
          </a>

          {/* CTA */}
          <Button variant="primary" size="lg" href="/quote" className="w-full" onClick={onClose}>
            {t('getQuote')}
          </Button>

          {/* Language toggle */}
          <div className="flex justify-center mt-6">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </>
  );
}
