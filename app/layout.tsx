import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const siteUrl = "https://upscaleouthouse.com";

export const metadata: Metadata = {
  title: {
    default: "Upscale Outhouse | Luxury Bathroom Trailer Rentals",
    template: "%s | Upscale Outhouse",
  },
  description: "Premium luxury bathroom trailer rentals for weddings, corporate events, and special occasions in Fresno and Central California. Veteran-owned, serving within 150 miles.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Upscale Outhouse",
    title: "Upscale Outhouse | Luxury Bathroom Trailer Rentals",
    description: "Premium luxury bathroom trailer rentals for weddings, corporate events, and special occasions in Fresno and Central California.",
    images: [
      {
        url: "/images/gallery/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Upscale Outhouse luxury bathroom trailer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Upscale Outhouse | Luxury Bathroom Trailer Rentals",
    description: "Premium luxury bathroom trailer rentals for weddings, corporate events, and special occasions in Fresno and Central California.",
    images: ["/images/gallery/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-cream min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
