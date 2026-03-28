'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import OverlineLabel from '@/components/ui/OverlineLabel';
import SectionDivider from '@/components/ui/SectionDivider';
import Accordion from '@/components/ui/Accordion';

export interface EventPageProps {
  eventType: string;
  overline: string;
  headline: string;
  subtext: string;
  heroImage?: string;
  whyReasons: { title: string; description: string; icon?: string }[];
  features: { title: string; description: string }[];
  testimonials: { quote: string; name: string; event: string; city: string }[];
  faqs: { question: string; answer: string }[];
  ctaHeadline: string;
  jsonLd: Record<string, unknown>;
}

const iconMap: Record<string, JSX.Element> = {
  star: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  check: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  sparkles: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  heart: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  shield: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  users: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  bolt: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  building: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  ),
  cake: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12 8.25c.74 0 1.343-.6 1.343-1.342A2.908 2.908 0 0112 4.5a2.908 2.908 0 00-1.343 2.408c0 .742.603 1.342 1.343 1.342z" />
    </svg>
  ),
  music: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
    </svg>
  ),
  crown: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L6 6l4.5 6L12 3l1.5 9L18 6l3.75 12H2.25z" />
    </svg>
  ),
};

function getIcon(iconName?: string) {
  if (!iconName || !iconMap[iconName]) return iconMap.star;
  return iconMap[iconName];
}

export default function EventPageTemplate({
  eventType,
  overline,
  headline,
  subtext,
  heroImage,
  whyReasons,
  features,
  testimonials,
  faqs,
  ctaHeadline,
  jsonLd,
}: EventPageProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-bg-primary pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <OverlineLabel className="mb-4 block">{overline}</OverlineLabel>
              <h1 className="font-display text-h1 text-text-primary mt-4 mb-6">
                {headline}
              </h1>
              <p className="font-body text-body text-text-secondary max-w-xl mb-8">
                {subtext}
              </p>
              <Button href="/quote" size="lg">
                GET YOUR QUOTE
              </Button>
            </div>
            {/* TODO: Replace with real hero image for each event type */}
            <div className="relative bg-bg-secondary rounded-2xl aspect-[4/3] overflow-hidden">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={`Luxury restroom trailer for ${eventType}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-text-muted text-small">
                    {eventType} Hero Image
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="flourish" />

      {/* Why Section */}
      <section className="bg-bg-primary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <OverlineLabel>
              WHY LUXURY RESTROOMS FOR YOUR {eventType.toUpperCase()}
            </OverlineLabel>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyReasons.map((reason, i) => (
              <Card key={i} className="text-center p-8">
                <div className="text-gold-primary mb-4 flex justify-center">
                  {getIcon(reason.icon)}
                </div>
                <h3 className="font-display text-h4 text-text-primary mb-3">
                  {reason.title}
                </h3>
                <p className="text-text-secondary text-body">
                  {reason.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Feature Highlights */}
      <section className="bg-bg-primary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <OverlineLabel>THE UPSCALE EXPERIENCE</OverlineLabel>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="p-8">
                <h3 className="font-display text-h4 text-gold-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-body">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="flourish" />

      {/* Social Proof / Testimonials */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className={i > 0 ? 'mt-12' : ''}>
              <div className="text-center">
                <span className="font-display text-[4rem] leading-none text-gold-primary opacity-40">
                  &ldquo;
                </span>
                <blockquote className="font-accent italic text-h3 text-text-primary -mt-8 mb-6">
                  {testimonial.quote}
                </blockquote>
                <p className="text-gold-primary font-body font-semibold">
                  {testimonial.name}
                </p>
                <p className="text-text-muted text-small">
                  {testimonial.event} &middot; {testimonial.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Photo Gallery */}
      <section className="bg-bg-primary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <OverlineLabel>{eventType.toUpperCase()} GALLERY</OverlineLabel>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* TODO: Replace with real {eventType} photos */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-bg-secondary rounded-2xl aspect-[4/3] flex items-center justify-center"
              >
                <span className="text-text-muted text-small">
                  {eventType} Photo {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="flourish" />

      {/* FAQ Section */}
      <section className="bg-bg-primary py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <OverlineLabel>COMMON QUESTIONS</OverlineLabel>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>

      <SectionDivider />

      {/* Final CTA */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <OverlineLabel className="mb-4 block">
            READY TO ELEVATE YOUR {eventType.toUpperCase()}?
          </OverlineLabel>
          <h2 className="font-display text-h2 text-text-primary mt-4 mb-8">
            {ctaHeadline}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/quote" size="lg">
              GET YOUR FREE QUOTE
            </Button>
            <Button href="tel:+15596630356" variant="phone" size="lg">
              (559) 663-0356
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
