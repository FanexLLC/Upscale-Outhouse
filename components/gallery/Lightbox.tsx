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
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Image counter — top-left */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
        <span className="font-body text-sm text-text-muted">
          {startIndex + 1} / {images.length}
        </span>
      </div>

      {/* Close button — top-right */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-11 h-11 flex items-center justify-center text-gold-primary hover:text-gold-light rounded-full bg-bg-elevated/60 hover:bg-bg-elevated transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary"
        aria-label="Close lightbox"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrevious(); }}
        className="absolute left-3 sm:left-6 z-10 w-12 h-12 flex items-center justify-center text-gold-primary hover:text-gold-light rounded-full bg-bg-elevated/60 hover:bg-bg-elevated transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary"
        aria-label="Previous image"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 sm:right-6 z-10 w-12 h-12 flex items-center justify-center text-gold-primary hover:text-gold-light rounded-full bg-bg-elevated/60 hover:bg-bg-elevated transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary"
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
        <div className="relative w-full max-h-[75vh] aspect-[4/3] sm:aspect-[16/10] rounded-card overflow-hidden">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1120px"
            priority
          />
        </div>
        {/* Caption */}
        <div className="mt-4 text-center">
          <p className="font-display text-lg text-text-primary">{current.title}</p>
          {current.description && (
            <p className="font-body text-sm text-text-secondary mt-1">{current.description}</p>
          )}
          <span className="inline-block mt-2 font-body text-[10px] uppercase tracking-[0.15em] text-gold-primary">
            {current.category}
          </span>
        </div>
      </div>
    </div>
  );
}
