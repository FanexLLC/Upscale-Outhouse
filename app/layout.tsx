import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Upscale Outhouse | Luxury Bathroom Trailer Rentals",
  description: "Premium luxury bathroom trailer rentals for weddings, corporate events, and special occasions in Fresno and Central California.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
