'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import OverlineLabel from '@/components/ui/OverlineLabel';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import Button from '@/components/ui/Button';
import { fadeIn, fadeUp, staggerContainer } from '@/lib/animations';

function ScrollIndicator({ label }: { label: string }) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span className="text-text-muted text-small font-body">{label}</span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="text-gold-primary animate-bounce"
        aria-hidden="true"
      >
        <path
          d="M6 9L12 15L18 9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('hero');

  // GSAP parallax — desktop only, respects reduced motion
  useEffect(() => {
    if (prefersReducedMotion) return;

    const initGSAP = async () => {
      if (typeof window === 'undefined' || window.innerWidth <= 768) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const content = contentRef.current;
      const stats = statsRef.current;
      if (!section || !content) return;

      // Content moves up slightly slower than scroll
      gsap.to(content, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Stats fade out as user scrolls
      if (stats) {
        gsap.to(stats, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: '30% top',
            end: '60% top',
            scrub: true,
          },
        });
      }
    };

    initGSAP();

    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      });
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-bg-primary flex flex-col items-center justify-center pt-16 md:pt-[72px] pb-20"
    >
      {/* Hero background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/gallery/gallery-exterior-showcase-01.jpeg"
          alt="Upscale Outhouse luxury restroom trailer at an outdoor event"
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/80 via-bg-primary/60 to-bg-primary" />
      </div>

      <div ref={contentRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Overline */}
        <motion.div
          className="mb-6"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <OverlineLabel>{t('overline')}</OverlineLabel>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display text-hero text-white leading-[1.05] max-w-4xl mx-auto mb-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          {t('headline')}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="font-body text-text-secondary text-body max-w-2xl mx-auto mb-10 leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          {t('subtext')}
        </motion.p>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          className="flex flex-wrap justify-center gap-8 md:gap-12 mb-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.3 }}
        >
          <motion.div variants={fadeUp}>
            <AnimatedCounter value={250} suffix="+" label={t('eventsServed')} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <AnimatedCounter value={5.0} suffix="" prefix="" label={t('starRating')} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <AnimatedCounter value={150} suffix="mi" label={t('serviceRadius')} />
          </motion.div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <Button variant="primary" size="lg" href="/quote">
            {t('ctaQuote')}
          </Button>
          <Button variant="secondary" size="lg" href="/gallery">
            {t('ctaGallery')}
          </Button>
        </motion.div>

        {/* Mobile call button */}
        <div className="sm:hidden mb-6">
          <Button variant="phone" size="md" href="tel:+15596630356">
            {t('callCta')}
          </Button>
        </div>

        {/* Small text */}
        <p className="text-text-muted text-small font-body">
          {t('freeDelivery')}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="relative">
        <ScrollIndicator label={t('scroll')} />
      </div>
    </section>
  );
}
