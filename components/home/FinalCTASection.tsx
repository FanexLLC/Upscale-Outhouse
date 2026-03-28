'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import OverlineLabel from '@/components/ui/OverlineLabel';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { fadeUp, staggerContainer } from '@/lib/animations';

export default function FinalCTASection() {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations('cta');

  return (
    <section className="relative py-section bg-bg-secondary overflow-hidden">
      {/* Subtle gold radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <AnimatedSection className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" variant="fadeUp">
        <OverlineLabel className="mb-md block">
          {t('overline')}
        </OverlineLabel>

        <h2 className="font-display text-h2 text-white mt-md mb-md">
          {t('headline')}
        </h2>

        <p className="font-body text-text-secondary text-body mb-2xl max-w-xl mx-auto">
          {t('subtext')}
        </p>

        {prefersReducedMotion ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-lg">
            <Button variant="primary" size="lg" href="/quote">
              {t('getQuote')}
            </Button>
            <Button variant="phone" size="lg" href="tel:+15596630356">
              {t('call')}
            </Button>
          </div>
        ) : (
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-lg"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.div variants={fadeUp}>
              <Button variant="primary" size="lg" href="/quote">
                {t('getQuote')}
              </Button>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Button variant="phone" size="lg" href="tel:+15596630356">
                {t('call')}
              </Button>
            </motion.div>
          </motion.div>
        )}

        <p className="text-text-muted text-small font-body">
          {t('veteranOwned')}
        </p>
      </AnimatedSection>
    </section>
  );
}