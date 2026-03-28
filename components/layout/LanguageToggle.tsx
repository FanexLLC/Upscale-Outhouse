'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchLocale(newLocale: string) {
    if (newLocale === locale) return;
    document.cookie = `locale=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <span className={`text-xs flex items-center gap-1 ${isPending ? 'opacity-50' : ''}`}>
      <button
        onClick={() => switchLocale('en')}
        className={`transition-colors ${
          locale === 'en'
            ? 'text-gold-primary font-semibold'
            : 'text-text-muted hover:text-gold-primary'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-text-muted" aria-hidden="true">|</span>
      <button
        onClick={() => switchLocale('es')}
        className={`transition-colors ${
          locale === 'es'
            ? 'text-gold-primary font-semibold'
            : 'text-text-muted hover:text-gold-primary'
        }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </span>
  );
}
