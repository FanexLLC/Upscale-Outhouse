import type { Metadata } from 'next';
import Image from 'next/image';
import OverlineLabel from '@/components/ui/OverlineLabel';
import Card from '@/components/ui/Card';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import SectionDivider from '@/components/ui/SectionDivider';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About Us — Veteran-Owned Luxury Restroom Rentals | Upscale Outhouse',
  description:
    'Learn about Upscale Outhouse — a veteran-owned luxury bathroom trailer rental company serving Fresno and Central California with military precision and five-star service.',
  openGraph: {
    title: 'About Us — Veteran-Owned Luxury Restroom Rentals | Upscale Outhouse',
    description: 'Learn about Upscale Outhouse — a veteran-owned luxury bathroom trailer rental company serving Fresno and Central California with military precision and five-star service.',
    url: 'https://www.upscaleouthouse.com/about',
    siteName: 'Upscale Outhouse',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'About Upscale Outhouse — veteran-owned luxury restroom trailer company' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us — Veteran-Owned Luxury Restroom Rentals | Upscale Outhouse',
    description: 'Learn about Upscale Outhouse — a veteran-owned luxury bathroom trailer rental company serving Fresno and Central California with military precision and five-star service.',
    images: ['/twitter-image.png'],
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg-primary pt-32 md:pt-40 pb-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OverlineLabel>OUR STORY</OverlineLabel>
          <h1 className="font-display text-h1 text-white mt-md mb-lg max-w-3xl">
            Built on Service. Driven by Excellence.
          </h1>
          <p className="text-text-secondary text-body max-w-2xl leading-relaxed">
            Veteran-owned and operated, bringing luxury and dignity to outdoor
            events throughout Central California.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="bg-bg-primary py-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative bg-bg-secondary aspect-[4/3] rounded-card overflow-hidden">
              <Image
                src="/images/about-us.jpg"
                alt="Upscale Outhouse team"
                fill
                className="object-cover object-[center_25%]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6">
              <p className="text-text-secondary text-body leading-relaxed">
                Upscale Outhouse was born from a simple observation: even at the most
                beautiful outdoor events in the Central Valley, the restroom situation
                was always the weakest link. Guests in cocktail attire, stepping into
                dark, cramped porta-potties — it just didn&apos;t make sense.
              </p>
              <p className="text-text-secondary text-body leading-relaxed">
                Founded by three friends who grew up right here in Fresno, we decided
                to change that. As veterans, we learned that preparation, discipline,
                and attention to detail aren&apos;t optional — they&apos;re the baseline. We
                bring that same mindset to every event we serve. Every trailer is
                delivered on time, immaculately clean, and fully stocked.
              </p>
              <p className="text-text-secondary text-body leading-relaxed">
                We&apos;ve watched brides breathe a sigh of relief, seen corporate event
                planners actually smile when the restrooms arrive, and heard guests say
                &quot;this is nicer than my bathroom at home.&quot; That&apos;s the reaction we work
                for — every single time.
              </p>
              <p className="text-text-secondary text-body leading-relaxed">
                The Central Valley is our home, and its people are our community. We
                take pride in serving the families, businesses, and organizations that
                make this region special. When you book with us, you&apos;re not hiring a
                faceless rental company — you&apos;re partnering with your neighbors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="flourish" className="max-w-7xl mx-auto px-4" />

      {/* Values */}
      <section className="bg-bg-primary py-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-2xl">
            <OverlineLabel>OUR VALUES</OverlineLabel>
            <h2 className="font-display text-h2 text-white mt-md">
              Why We&apos;re Different
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="w-16 h-16 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-lg">
                <svg className="w-8 h-8 text-gold-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="font-display text-h4 text-white mb-sm">
                Military Precision
              </h3>
              <p className="text-text-secondary text-body">
                Every delivery is on time. Every trailer is spotless. Every detail
                is checked twice.
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-lg">
                <svg className="w-8 h-8 text-gold-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className="font-display text-h4 text-white mb-sm">
                Community Roots
              </h3>
              <p className="text-text-secondary text-body">
                Born and raised in the Central Valley. We know this community
                because we ARE this community.
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-gold-primary/10 rounded-full flex items-center justify-center mx-auto mb-lg">
                <svg className="w-8 h-8 text-gold-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <h3 className="font-display text-h4 text-white mb-sm">
                No Compromises
              </h3>
              <p className="text-text-secondary text-body">
                We don&apos;t do &quot;good enough.&quot; Our trailers feature real plumbing,
                real climate control, and real luxury.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* By The Numbers */}
      <section className="bg-bg-light py-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedCounter
              value={100}
              suffix="+"
              label="Events Served"
              className="[&>span:first-child]:text-text-on-light [&>span:last-child]:text-text-on-light/60"
            />
            <AnimatedCounter
              value={5.0}
              label="Star Rating"
              className="[&>span:first-child]:text-text-on-light [&>span:last-child]:text-text-on-light/60"
            />
            <AnimatedCounter
              value={150}
              label="Mile Service Radius"
              className="[&>span:first-child]:text-text-on-light [&>span:last-child]:text-text-on-light/60"
            />
            <AnimatedCounter
              value={250}
              suffix="+"
              label="Guest Capacity"
              className="[&>span:first-child]:text-text-on-light [&>span:last-child]:text-text-on-light/60"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-secondary py-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <OverlineLabel>READY TO ELEVATE YOUR EVENT?</OverlineLabel>
          <h2 className="font-display text-h2 text-white mt-md mb-lg">
            Get Your Instant Quote
          </h2>
          <p className="text-text-secondary text-body mb-2xl max-w-xl mx-auto">
            See transparent pricing for your event in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/quote">
              Get Your Free Quote
            </Button>
            <Button variant="phone" size="lg" href="tel:+15596630356">
              (559) 663-0356
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
