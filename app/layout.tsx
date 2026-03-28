import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { Playfair_Display, Outfit, Cormorant_Garamond } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-accent",
  display: "swap",
});

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
    apple: "/branding/logo.png",
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
  themeColor: '#0A0A0A',
  alternates: {
    canonical: siteUrl,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${playfairDisplay.variable} ${outfit.variable} ${cormorantGaramond.variable}`}>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <GoogleAnalytics />
          <Header />
          <main className="flex-grow pb-20 md:pb-0">
            {children}
          </main>
          <Footer />
          <StickyMobileCTA />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
