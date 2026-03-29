import type { Metadata } from 'next';
import QuoteWizard from '@/components/quote/QuoteWizard';

export const metadata: Metadata = {
  title: 'Get Your Instant Quote | Upscale Outhouse',
  description:
    'Configure your luxury portable restroom trailer rental in minutes. Instant pricing for weddings, corporate events, and celebrations near Fresno, CA. Free delivery within 50 miles.',
  openGraph: {
    title: 'Get Your Instant Quote | Upscale Outhouse',
    description: 'Configure your luxury portable restroom trailer rental in minutes. Instant pricing for weddings, corporate events, and celebrations near Fresno, CA. Free delivery within 50 miles.',
    url: 'https://www.upscaleouthouse.com/quote',
    siteName: 'Upscale Outhouse',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Your Instant Quote | Upscale Outhouse',
    description: 'Configure your luxury portable restroom trailer rental in minutes. Instant pricing for weddings, corporate events, and celebrations near Fresno, CA. Free delivery within 50 miles.',
  },
};

export default function QuotePage() {
  return (
    <div className="bg-bg-primary min-h-screen pt-16 md:pt-[72px]">
      <section className="py-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuoteWizard />
        </div>
      </section>
    </div>
  );
}