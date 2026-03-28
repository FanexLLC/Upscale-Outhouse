import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Luxury Restroom Trailer Photos & Videos | Upscale Outhouse',
  description: 'See our luxury restroom trailer inside and out. Browse photos of our climate-controlled trailer with flushing toilets, LED lighting, and premium finishes.',
  openGraph: {
    title: 'Gallery | Luxury Restroom Trailer Photos & Videos | Upscale Outhouse',
    description: 'See our luxury restroom trailer inside and out. Browse photos of our climate-controlled trailer with flushing toilets, LED lighting, and premium finishes.',
    url: 'https://www.upscaleouthouse.com/gallery',
    siteName: 'Upscale Outhouse',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Upscale Outhouse luxury restroom trailer photo gallery' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery | Luxury Restroom Trailer Photos & Videos | Upscale Outhouse',
    description: 'See our luxury restroom trailer inside and out. Browse photos of our climate-controlled trailer with flushing toilets, LED lighting, and premium finishes.',
    images: ['/twitter-image.png'],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
