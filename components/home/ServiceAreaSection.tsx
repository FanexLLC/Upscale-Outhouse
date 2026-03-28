'use client';

import { useTranslations } from 'next-intl';
import OverlineLabel from '@/components/ui/OverlineLabel';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';

const cities = [
  'Fresno',
  'Clovis',
  'Visalia',
  'Bakersfield',
  'Merced',
  'Modesto',
  'Madera',
  'Hanford',
  'Tulare',
  'Porterville',
  'Stockton',
  'Lemoore',
];

export default function ServiceAreaSection() {
  const t = useTranslations('serviceArea');

  return (
    <section className="py-section bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-2xl" variant="fadeUp">
          <OverlineLabel className="mb-md block">
            {t('overline')}
          </OverlineLabel>
          <h2 className="font-display text-h2 text-white mt-md">
            {t('headline')}
          </h2>
        </AnimatedSection>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-2xl items-start">
          {/* Left: text + cities */}
          <AnimatedSection variant="slideLeft">
            <p className="font-body text-text-secondary text-body leading-relaxed mb-lg">
              {t('description')}
            </p>

            <h3 className="font-body font-bold text-white text-h4 mb-md">
              {t('citiesTitle')}
            </h3>

            <ul className="grid grid-cols-3 gap-x-6 gap-y-3 mb-lg">
              {cities.map((city) => (
                <li
                  key={city}
                  className="font-body text-text-secondary text-body"
                >
                  {city}
                </li>
              ))}
            </ul>

            <p className="text-gold-primary text-body font-body font-semibold mb-lg">
              {t('freeDelivery')}
            </p>

            <p className="text-text-muted text-small font-body mb-md">
              {t('dontSeeCity')}
            </p>

            <Button variant="ghost" href="/contact">
              {t('contactUs')}
            </Button>
          </AnimatedSection>

          {/* Right: map placeholder */}
          <AnimatedSection variant="slideRight">
            <div className="relative rounded-card overflow-hidden bg-bg-secondary border border-[rgba(201,168,76,0.15)] h-[400px] flex items-center justify-center">
              <span className="text-text-muted text-small font-body text-center px-md">
                Map Placeholder
              </span>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}