'use client';

import Image from 'next/image';
import { GalleryImage } from './galleryData';

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {images.map((image, index) => (
        <button
          key={image.src}
          onClick={() => onImageClick(index)}
          className={`group relative rounded-2xl overflow-hidden border border-charcoal/10 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
            image.featured ? 'lg:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
          }`}
          aria-label={`View ${image.alt} fullscreen`}
        >
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
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

          {/* Category badge */}
          <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white/90 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase">
            {image.category}
          </span>

          {/* View hint */}
          <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white/80 px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            View
          </div>
        </button>
      ))}
    </div>
  );
}
