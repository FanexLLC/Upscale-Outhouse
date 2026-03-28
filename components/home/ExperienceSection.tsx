'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import OverlineLabel from '@/components/ui/OverlineLabel';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { fadeUp, staggerContainer } from '@/lib/animations';

const featureIcons = [
  <svg key="entrance" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-primary">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>,
  <svg key="climate" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-primary">
    <path d="M12 2v20M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>,
  <svg key="water" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-primary">
    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
  </svg>,
  <svg key="led" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-primary">
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="10" y1="22" x2="14" y2="22" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
  </svg>,
  <svg key="bluetooth" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-primary">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>,
];

const featureKeys = [
  { title: 'feature1Title', desc: 'feature1Desc' },
  { title: 'feature2Title', desc: 'feature2Desc' },
  { title: 'feature3Title', desc: 'feature3Desc' },
  { title: 'feature4Title', desc: 'feature4Desc' },
  { title: 'feature5Title', desc: 'feature5Desc' },
] as const;

export default function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations('experience');

  const features = featureKeys.map((key, i) => ({
    title: t(key.title),
    description: t(key.desc),
    icon: featureIcons[i],
  }));

  return (
    <section className="py-section bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-2xl" variant="fadeUp">
          <OverlineLabel className="mb-md block">{t('overline')}</OverlineLabel>
          <h2 className="font-display text-h2 text-white mt-md">
            {t('headline')}
          </h2>
        </AnimatedSection>

        {/* 2-column grid */}
        <div className="grid md:grid-cols-2 gap-2xl items-start">
          {/* Left: image */}
          <AnimatedSection variant="slideLeft">
            <div className="relative aspect-[4/5] rounded-card overflow-hidden bg-bg-secondary border border-[rgba(201,168,76,0.15)]">
              <Image
                src="/images/gallery/gallery-interior-womens-01.jpg"
                alt="Elegant women's restroom interior with vanity mirrors and premium finishes"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </AnimatedSection>

          {/* Right: feature list */}
          {prefersReducedMotion ? (
            <div className="flex flex-col gap-lg">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-md items-start">
                  <div className="flex-none w-12 h-12 rounded-full bg-bg-elevated flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-body font-bold text-white text-h4 mb-xs">
                      {feature.title}
                    </h3>
                    <p className="font-body text-text-secondary text-body leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className="mt-md">
                <Button variant="ghost" href="/gallery">
                  {t('cta')}
                </Button>
              </div>
            </div>
          ) : (
            <motion.div
              className="flex flex-col gap-lg"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {features.map((feature) => (
                <motion.div key={feature.title} className="flex gap-md items-start" variants={fadeUp}>
                  <div className="flex-none w-12 h-12 rounded-full bg-bg-elevated flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-body font-bold text-white text-h4 mb-xs">
                      {feature.title}
                    </h3>
                    <p className="font-body text-text-secondary text-body leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
              <motion.div className="mt-md" variants={fadeUp}>
                <Button variant="ghost" href="/gallery">
                  {t('cta')}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}