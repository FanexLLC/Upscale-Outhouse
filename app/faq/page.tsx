import type { Metadata } from "next";
import { faqData } from "@/lib/faq-data";
import OverlineLabel from "@/components/ui/OverlineLabel";
import Button from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";
import FAQContent from "./FAQContent";

export const metadata: Metadata = {
  title: "FAQ — Luxury Restroom Trailer Rental Questions | Upscale Outhouse",
  description:
    "Get answers to common questions about luxury restroom trailer rentals. Pricing, delivery, setup, capacity, and more. Serving Fresno & Central California.",
  openGraph: {
    title: 'FAQ — Luxury Restroom Trailer Rental Questions | Upscale Outhouse',
    description: 'Get answers to common questions about luxury restroom trailer rentals. Pricing, delivery, setup, capacity, and more. Serving Fresno & Central California.',
    url: 'https://www.upscaleouthouse.com/faq',
    siteName: 'Upscale Outhouse',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ — Luxury Restroom Trailer Rental Questions | Upscale Outhouse',
    description: 'Get answers to common questions about luxury restroom trailer rentals. Pricing, delivery, setup, capacity, and more. Serving Fresno & Central California.',
  },
};

function generateFAQSchema() {
  const questions = faqData.flatMap((category) =>
    category.items.map((item) => ({
      "@type": "Question" as const,
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: item.answer,
      },
    }))
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions,
  };
}

export default function FAQPage() {
  const faqSchema = generateFAQSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-bg-primary">
        {/* Header */}
        <section className="pt-32 md:pt-40 pb-8 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <OverlineLabel>Common Questions</OverlineLabel>
            <h1 className="font-display text-h1 text-white">
              Everything You Need to Know
            </h1>
            <p className="text-text-secondary text-body max-w-2xl mx-auto">
              Can&apos;t find your answer? We&apos;re always happy to help.
            </p>
            <Button variant="ghost" href="/contact">
              Contact Us
            </Button>
          </div>
        </section>

        {/* FAQ Content (client component for interactivity) */}
        <FAQContent categories={faqData} />

        {/* CTA */}
        <SectionDivider className="max-w-4xl mx-auto" />
        <section className="py-section px-6">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="font-display text-h2 text-white">
              Still Have Questions?
            </h2>
            <p className="text-text-secondary text-body">
              We&apos;re here to help. Reach out and we&apos;ll get back to you
              quickly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" href="/contact">
                Contact Us
              </Button>
              <Button variant="phone" href="tel:+15592230796">
                (559) 223-0796
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
