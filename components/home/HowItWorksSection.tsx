'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import OverlineLabel from '@/components/ui/OverlineLabel';
import Card from '@/components/ui/Card';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { scaleUp, staggerContainer, drawLine } from '@/lib/animations';

const stepIcons = [
  (
    <svg key="quote" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-primary">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="12" y2="14" />
    </svg>
  ),
  (
    <svg key="deliver" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-primary">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  (
    <svg key="enjoy" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-primary">
      <path d="M8 22h8M7 10h10M12 2v2M12 14v2M4.93 4.93l1.41 1.41M17.66 6.34l1.41-1.41" />
      <path d="M7 10a5 5 0 0110 0c0 2-2.5 3.5-2.5 6h-5C9.5 13.5 7 12 7 10z" />
    </svg>
  ),
];

const stepKeys = [
  { number: '01', title: 'step1Title', desc: 'step1Desc' },
  { number: '02', title: 'step2Title', desc: 'step2Desc' },
  { number: '03', title: 'step3Title', desc: 'step3Desc' },
] as const;

export default function HowItWorksSection() {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations('howItWorks');

  const steps = stepKeys.map((key, i) => ({
    number: key.number,
    title: t(key.title),
    description: t(key.desc),
    icon: stepIcons[i],
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

        {/* Steps */}
        {prefersReducedMotion ? (
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-lg">
            <div
              className="hidden md:block absolute top-1/2 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-gold-dark via-gold-primary to-gold-dark"
              aria-hidden="true"
            />
            {steps.map((step) => (
              <Card key={step.number} className="relative text-center z-10">
                <span className="font-display text-h2 text-gold-primary opacity-30 block mb-md">
                  {step.number}
                </span>
                <div className="flex justify-center mb-md">{step.icon}</div>
                <h3 className="font-body font-bold text-white text-h4 mb-sm">
                  {step.title}
                </h3>
                <p className="font-body text-text-secondary text-body leading-relaxed">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div
            className="relative grid grid-cols-1 md:grid-cols-3 gap-lg"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Connecting line with draw animation */}
            <motion.div
              className="hidden md:block absolute top-1/2 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-gold-dark via-gold-primary to-gold-dark origin-left"
              aria-hidden="true"
              variants={drawLine}
            />

            {steps.map((step) => (
              <motion.div key={step.number} variants={scaleUp}>
                <Card className="relative text-center z-10">
                  <span className="font-display text-h2 text-gold-primary opacity-30 block mb-md">
                    {step.number}
                  </span>
                  <div className="flex justify-center mb-md">{step.icon}</div>
                  <h3 className="font-body font-bold text-white text-h4 mb-sm">
                    {step.title}
                  </h3>
                  <p className="font-body text-text-secondary text-body leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
