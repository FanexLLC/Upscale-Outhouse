import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = "https://www.upscaleouthouse.com";

export const metadata: Metadata = {
  title: {
    default: "Upscale Outhouse | Luxury Bathroom Trailer Rentals",
    template: "%s | Upscale Outhouse",
  },
  description: "Premium luxury bathroom trailer rentals for weddings, corporate events, and special occasions in Fresno and Central California. Veteran-owned, serving within 150 miles.",
  metadataBase: new URL(siteUrl),
  // TODO: Replace placeholder branding assets in /public/branding and /app with final logo/hero images.
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Upscale Outhouse",
    title: "Upscale Outhouse | Luxury Bathroom Trailer Rentals",
    description: "Premium luxury bathroom trailer rentals for weddings, corporate events, and special occasions in Fresno and Central California.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Upscale Outhouse luxury restroom trailer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Upscale Outhouse | Luxury Bathroom Trailer Rentals",
    description: "Premium luxury bathroom trailer rentals for weddings, corporate events, and special occasions in Fresno and Central California.",
    images: ["/twitter-image.png"],
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
      <body className={`${inter.className} antialiased bg-cream min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
