'use client';

import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

export default function StickyMobileCTA() {
  const t = useTranslations('nav');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-bg-primary border-t border-gold-primary/20 p-3 md:hidden">
      <div className="flex gap-3">
        <Button
          variant="secondary"
          size="sm"
          href="tel:+15596630356"
          className="flex-1 min-h-[44px]"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>
          {t('call')}
        </Button>
        <Button
          variant="primary"
          size="sm"
          href="/quote"
          className="flex-1 min-h-[44px]"
        >
          {t('getQuote')}
        </Button>
      </div>
    </div>
  );
}
