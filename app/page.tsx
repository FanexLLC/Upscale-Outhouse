import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import SocialProofSection from "@/components/home/SocialProofSection";
import EventTypesGrid from "@/components/home/EventTypesGrid";
import ServiceAreaSection from "@/components/home/ServiceAreaSection";
import FinalCTASection from "@/components/home/FinalCTASection";
import SectionDivider from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "Luxury Restroom Trailer Rental Fresno CA | Upscale Outhouse",
  description:
    "Premium luxury bathroom trailer rental for weddings, corporate events & parties in Fresno & Central California. Veteran-owned. Free delivery within 50 miles. Get an instant quote.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Upscale Outhouse",
  description:
    "Premium luxury bathroom trailer rentals for weddings, corporate events, and special occasions in Fresno and Central California.",
  url: "https://www.upscaleouthouse.com",
  telephone: "+15596630356",
  email: "upscaleouthouse@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Fresno",
    addressRegion: "CA",
    postalCode: "93704",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 36.7378,
      longitude: -119.7871,
    },
    geoRadius: "241000", // 150 miles in meters
  },
  priceRange: "$450/day",
  image: "https://www.upscaleouthouse.com/images/gallery/hero-bg.jpg",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Upscale Outhouse",
  url: "https://www.upscaleouthouse.com",
  logo: "https://www.upscaleouthouse.com/branding/logo.png",
  sameAs: ["https://www.instagram.com/upscale_outhouse/"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />

      <HeroSection />
      <SectionDivider variant="flourish" />
      <ExperienceSection />
      <SectionDivider />
      <HowItWorksSection />
      <SocialProofSection />
      <SectionDivider />
      <EventTypesGrid />
      <SectionDivider variant="flourish" />
      <ServiceAreaSection />
      <SectionDivider />
      <FinalCTASection />
    </>
  );
}
