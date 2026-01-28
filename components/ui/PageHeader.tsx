import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  variant?: 'light' | 'dark';
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function PageHeader({
  title,
  subtitle,
  variant = 'dark',
  primaryCta,
  secondaryCta,
}: PageHeaderProps) {
  const isDark = variant === 'dark';
  const hasCtas = primaryCta || secondaryCta;

  return (
    <section
      className={
        isDark
          ? 'py-16 md:py-24 bg-gradient-to-b from-charcoal-dark to-charcoal'
          : 'py-16 md:py-24 bg-cream'
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {hasCtas ? (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1
                className={`text-4xl md:text-5xl font-extrabold tracking-tight ${
                  isDark ? 'text-gold' : 'text-charcoal-dark'
                }`}
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  className={`mt-4 text-base md:text-lg leading-relaxed max-w-2xl ${
                    isDark ? 'text-cream/80' : 'text-charcoal/70'
                  }`}
                >
                  {subtitle}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center bg-gold text-charcoal-dark px-6 py-4 rounded-lg text-lg font-semibold hover:bg-gold-light shadow-lg hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className={`inline-flex items-center justify-center px-6 py-4 rounded-lg text-lg font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
                    isDark
                      ? 'border-2 border-cream/80 text-cream hover:bg-cream hover:text-charcoal-dark'
                      : 'border-2 border-charcoal/20 text-charcoal-dark hover:bg-charcoal/5'
                  }`}
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h1
              className={`text-4xl md:text-5xl font-extrabold tracking-tight ${
                isDark ? 'text-gold' : 'text-charcoal-dark'
              }`}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={`mt-4 text-base md:text-lg leading-relaxed max-w-2xl mx-auto ${
                  isDark ? 'text-cream/80' : 'text-charcoal/70'
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
