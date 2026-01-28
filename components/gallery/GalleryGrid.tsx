'use client';

import Image from 'next/image';
import { GalleryImage } from './galleryData';

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

/** Derive a short caption from alt text: take the first meaningful chunk. */
function deriveLabel(alt: string): string {
  // Strip leading "Front showcase view of the ..." style prefixes
  const cleaned = alt
    .replace(/^(front|side|rear|entry|elegant|interior|floor)\s+/i, '')
    .replace(/\s+of the upscale outhouse.*$/i, '')
    .replace(/\s+of the luxury.*$/i, '')
    .replace(/\s+showing.*$/i, '')
    .replace(/\s+highlighting.*$/i, '')
    .replace(/\s+with.*$/i, '')
    .replace(/\s+layout.*$/i, '');
  // Capitalize first letter
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
      {images.map((image, index) => (
        <button
          key={image.src}
          onClick={() => onImageClick(index)}
          className={`group relative rounded-2xl overflow-hidden border border-charcoal/10 shadow-sm hover:shadow-lg hover:scale-[1.01] transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 text-left ${
            image.featured ? 'lg:col-span-2' : ''
          }`}
          aria-label={`View ${image.alt} fullscreen`}
        >
          {/* Image wrapper with aspect ratio */}
          <div className={`relative w-full ${
            image.featured ? 'aspect-[4/3] lg:aspect-[16/9]' : 'aspect-[4/3]'
          }`}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes={
                image.featured
                  ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw'
                  : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              }
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
          </div>

          {/* Caption strip */}
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-charcoal/80">
              <span className="uppercase tracking-wide text-xs text-charcoal/50">{image.category}</span>
              {' \u2014 '}
              {deriveLabel(image.alt)}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
