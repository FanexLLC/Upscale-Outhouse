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

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('gallery'), href: '/gallery' },
    { name: t('weddings'), href: '/events/weddings' },
    { name: t('corporate'), href: '/events/corporate' },
    { name: t('birthdaysGraduations'), href: '/events/birthday-graduation' },
    { name: t('festivalsConcerts'), href: '/events/festivals' },
    { name: t('quinceaneras'), href: '/events/quinceanera' },
    { name: t('quote'), href: '/quote' },
    { name: t('contact'), href: '/contact' },
  ];

  return (
    <div
      className={`fixed inset-0 z-[60] bg-bg-primary/98 transition-all duration-300 md:hidden ${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-label="Mobile navigation"
    >
      {/* Close button */}
      <button
        type="button"
        className="absolute top-4 right-4 text-gold-primary p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
        onClick={onClose}
        aria-label="Close menu"
      >
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Content */}
      <div
        className={`flex flex-col items-center justify-center h-full px-6 transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-4'
        }`}
      >
        {/* Logo */}
        <Image
          src="/images/gallery/Logo-black.jpg"
          alt="Upscale Outhouse logo"
          width={64}
          height={64}
          className="h-16 w-16 object-contain mb-6"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Gold accent line */}
        <div
          className="h-px w-24 mb-8"
          style={{ background: 'var(--gradient-gold)' }}
          aria-hidden="true"
        />

        {/* Nav links */}
        <nav className="flex flex-col items-center gap-5 mb-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl font-display text-white hover:text-gold-primary transition-colors"
              onClick={onClose}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Language toggle */}
        <div className="mb-6">
          <LanguageToggle />
        </div>

        {/* Gold divider */}
        <div
          className="h-px w-32 my-6"
          style={{ background: 'var(--gradient-gold)' }}
          aria-hidden="true"
        />

        {/* Phone */}
        <a
          href="tel:+15596630356"
          className="flex items-center gap-2 text-gold-primary text-lg font-medium mb-6"
          onClick={onClose}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
          </svg>
          (559) 663-0356
        </a>

        {/* GET QUOTE button */}
        <Button variant="primary" size="lg" href="/quote" className="w-full max-w-xs" onClick={onClose}>
          {t('getQuote')}
        </Button>
      </div>
    </div>
  );
}
