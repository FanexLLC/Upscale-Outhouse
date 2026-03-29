'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import OverlineLabel from '@/components/ui/OverlineLabel';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { scaleUp, staggerContainer } from '@/lib/animations';

const eventData = [
  {
    key: 'weddings' as const,
    href: '/events/weddings',
    image: '/images/gallery/evt-winery-pavilion-roses.jpg',
    imageAlt: 'Upscale Outhouse trailer at a winery wedding with roses and pavilion',
  },
  {
    key: 'corporate' as const,
    href: '/events/corporate',
    image: '/images/gallery/gallery-exterior-side-01.jpg',
    imageAlt: 'Luxury restroom trailer at a professional venue on manicured lawn',
  },
  {
    key: 'birthdays' as const,
    href: '/events/birthday-graduation',
    image: '/images/gallery/gallery-exterior-doors-01.jpg',
    imageAlt: 'Upscale Outhouse trailer at a residential celebration with palm trees',
  },
  {
    key: 'festivals' as const,
    href: '/events/festivals',
    image: '/images/gallery/evt-winery-evening-front.jpg',
    imageAlt: 'Upscale Outhouse trailer at an evening outdoor festival event',
  },
  {
    key: 'quinceaneras' as const,
    href: '/events/quinceanera',
    image: '/images/gallery/gallery-exterior-showcase-01.jpeg',
    imageAlt: 'Luxury restroom trailer setup for an elegant backyard celebration',
  },
];

function EventCard({ event, learnMore }: { event: { name: string; href: string; image: string; imageAlt: string }; learnMore: string }) {
  return (
    <Link href={event.href} className="group">
      <div className="relative aspect-[3/4] rounded-card overflow-hidden bg-bg-secondary border border-[rgba(201,168,76,0.15)] transition-all duration-300 group-hover:border-[rgba(201,168,76,0.4)] group-hover:shadow-gold">
        <Image
          src={event.image}
          alt={event.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 260px, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-lg">
          <h3 className="font-display text-h4 text-white mb-xs">
            {event.name}
          </h3>
          <span className="font-body text-gold-primary text-small group-hover:underline">
            {learnMore}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function EventTypesGrid() {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations('eventTypes');

  const eventTypes = eventData.map((e) => ({
    name: t(e.key),
    href: e.href,
    image: e.image,
    imageAlt: e.imageAlt,
  }));

  const learnMore = t('learnMore');

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

        {/* Mobile horizontal scroll */}
        <div className="flex md:hidden gap-md overflow-x-auto pb-md snap-x snap-mandatory -mx-4 px-4">
          {eventTypes.map((event) => (
            <Link
              key={event.href}
              href={event.href}
              className="flex-none w-[260px] snap-start group"
            >
              <div className="relative aspect-[3/4] rounded-card overflow-hidden bg-bg-secondary border border-[rgba(201,168,76,0.15)] transition-all duration-300 group-hover:border-[rgba(201,168,76,0.4)]">
                <Image
                  src={event.image}
                  alt={event.imageAlt}
                  fill
                  className="object-cover"
                  sizes="260px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-lg">
                  <h3 className="font-display text-h4 text-white mb-xs">
                    {event.name}
                  </h3>
                  <span className="font-body text-gold-primary text-small">
                    {learnMore}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden md:block">
          {prefersReducedMotion ? (
            <>
              <div className="grid grid-cols-3 gap-lg mb-lg">
                {eventTypes.slice(0, 3).map((event) => (
                  <EventCard key={event.href} event={event} learnMore={learnMore} />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-lg">
                <div />
                {eventTypes.slice(3).map((event) => (
                  <EventCard key={event.href} event={event} learnMore={learnMore} />
                ))}
              </div>
            </>
          ) : (
            <>
              <motion.div
                className="grid grid-cols-3 gap-lg mb-lg"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                {eventTypes.slice(0, 3).map((event) => (
                  <motion.div key={event.href} variants={scaleUp}>
                    <EventCard event={event} learnMore={learnMore} />
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                className="grid grid-cols-3 gap-lg"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                <div />
                {eventTypes.slice(3).map((event) => (
                  <motion.div key={event.href} variants={scaleUp}>
                    <EventCard event={event} learnMore={learnMore} />
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}