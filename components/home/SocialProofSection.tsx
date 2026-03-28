'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import { fadeUp, fadeIn, staggerContainer } from '@/lib/animations';

/* ── Testimonials ── */
const testimonials = [
  {
    quote:
      'The trailer was absolutely stunning. Our wedding guests couldn\'t believe it was a portable restroom.',
    name: 'Sarah M.',
    event: 'Wedding',
    city: 'Fresno',
  },
  {
    quote:
      'Professional from start to finish. The trailer was spotless and added a touch of luxury to our corporate retreat.',
    name: 'David K.',
    event: 'Corporate Event',
    city: 'Visalia',
  },
  {
    quote:
      'We\'ve rented from others before, but Upscale Outhouse is in a completely different league.',
    name: 'Maria L.',
    event: 'Quinceañera',
    city: 'Bakersfield',
  },
];

export default function SocialProofSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations('socialProof');

  const stats = [
    { label: t('veteranOwned'), icon: '★' },
    { label: t('freeDelivery'), icon: '🚚' },
    { label: t('rated'), icon: '⭐' },
    { label: t('events'), icon: '🎉' },
    { label: t('climateControlled'), icon: '❄' },
    { label: t('runningWater'), icon: '💧' },
  ];

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Track selected slide
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  const StatsContent = () => (
    <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-2 text-center">
          <span className="text-lg" aria-hidden="true">{stat.icon}</span>
          <span className="font-body font-bold text-text-on-light text-small tracking-wide">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section>
      {/* Stats Bar — light background */}
      <div className="bg-bg-light py-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {prefersReducedMotion ? (
            <StatsContent />
          ) : (
            <motion.div
              className="flex flex-wrap justify-center gap-x-10 gap-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} className="flex items-center gap-2 text-center" variants={fadeUp}>
                  <span className="text-lg" aria-hidden="true">{stat.icon}</span>
                  <span className="font-body font-bold text-text-on-light text-small tracking-wide">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Testimonial Carousel — dark background */}
      <div className="bg-bg-primary py-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {prefersReducedMotion ? (
            <>
              {/* Decorative quote mark */}
              <span
                className="font-accent text-gold-primary text-[6rem] leading-none block mb-[-1rem] opacity-40 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
            </>
          ) : (
            <motion.span
              className="font-accent text-gold-primary text-[6rem] leading-none block mb-[-1rem] opacity-40 select-none"
              aria-hidden="true"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              &ldquo;
            </motion.span>
          )}

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((item, i) => (
                <div key={i} className="flex-[0_0_100%] min-w-0 px-4">
                  <blockquote>
                    <p className="font-accent italic text-h3 text-white leading-relaxed mb-lg">
                      {item.quote}
                    </p>
                    <footer className="font-body text-text-secondary text-body">
                      <strong className="text-gold-primary">{item.name}</strong> &mdash;{' '}
                      {item.event}, {item.city}
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-2xl">
            <button
              onClick={scrollPrev}
              className="w-11 h-11 rounded-full border border-gold-primary text-gold-primary flex items-center justify-center hover:bg-gold-primary hover:text-bg-primary transition-colors"
              aria-label="Previous testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === selectedIndex ? 'bg-gold-primary' : 'bg-text-muted'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="w-11 h-11 rounded-full border border-gold-primary text-gold-primary flex items-center justify-center hover:bg-gold-primary hover:text-bg-primary transition-colors"
              aria-label="Next testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
