'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { GalleryImage } from './galleryData';

interface LightboxProps {
  isOpen: boolean;
  images: GalleryImage[];
  startIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Lightbox({
  isOpen,
  images,
  startIndex,
  onClose,
  onPrevious,
  onNext,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrevious, onNext]
  );

  // Keyboard navigation + disable background scroll
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || images.length === 0) return null;

  const current = images[startIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center text-white/80 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label="Close lightbox"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrevious(); }}
        className="absolute left-3 sm:left-6 z-10 w-11 h-11 flex items-center justify-center text-white/80 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label="Previous image"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 sm:right-6 z-10 w-11 h-11 flex items-center justify-center text-white/80 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label="Next image"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Image + caption */}
      <div
        className="relative w-full max-w-5xl mx-4 sm:mx-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1120px"
            priority
          />
        </div>
        <div className="mt-4 text-center">
          <p className="text-white/80 text-sm">{current.alt}</p>
          <p className="text-white/50 text-xs mt-1">
            {startIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}
