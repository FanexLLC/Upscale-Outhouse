'use client';

import Image from 'next/image';
import { GalleryImage } from './galleryData';

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5 lg:gap-6">
      {images.map((image, index) => (
        <button
          key={image.id}
          onClick={() => onImageClick(index)}
          className="group relative w-full mb-4 md:mb-5 lg:mb-6 break-inside-avoid rounded-card overflow-hidden border border-[rgba(201,168,76,0.15)] bg-bg-secondary shadow-card hover:border-[rgba(201,168,76,0.4)] hover:shadow-card-hover transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary text-left block"
          aria-label={`View ${image.title} fullscreen`}
        >
          <div className={`relative w-full ${image.featured ? 'aspect-[4/3]' : 'aspect-[3/4] sm:aspect-[4/3]'}`}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Dark gradient overlay for caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Caption overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="font-body text-[10px] uppercase tracking-[0.15em] text-gold-primary">
                {image.category}
              </span>
              <p className="font-body text-sm text-text-primary mt-1 leading-snug">
                {image.title}
              </p>
              {image.description && (
                <p className="font-body text-xs text-text-secondary mt-0.5 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.description}
                </p>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
