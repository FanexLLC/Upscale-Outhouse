'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Lightbox from '@/components/ui/Lightbox';

// Placeholder images - replace with actual trailer photos
const galleryImages = [
  { src: '/images/gallery/trailer-exterior-1.jpg', alt: 'Luxury bathroom trailer exterior view' },
  { src: '/images/gallery/trailer-interior-1.jpg', alt: 'Elegant interior with vanity' },
  { src: '/images/gallery/trailer-interior-2.jpg', alt: 'Spacious restroom stalls' },
  { src: '/images/gallery/trailer-interior-3.jpg', alt: 'Premium fixtures and finishes' },
  { src: '/images/gallery/trailer-exterior-2.jpg', alt: 'Trailer at wedding venue' },
  { src: '/images/gallery/trailer-interior-4.jpg', alt: 'Climate controlled comfort' },
];

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-charcoal-dark to-charcoal">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-6">
            Gallery
          </h1>
          <p className="text-xl text-cream/80">
            Take a tour of our luxury bathroom trailer and see the quality
            that sets us apart.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-charcoal-dark">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className="relative aspect-[4/3] bg-charcoal rounded-lg overflow-hidden border border-gold/20 hover:border-gold/40 transition-colors group"
              >
                {/* Placeholder - replace with actual Image component when photos are added */}
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal">
                  <div className="text-center text-cream/50 p-4">
                    <svg className="h-12 w-12 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <p className="text-sm">{image.alt}</p>
                    <p className="text-xs mt-1">Add image to /public/images/gallery/</p>
                  </div>
                </div>
                {/* Uncomment when images are added:
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section Placeholder */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gold mb-6">
            Video Tour
          </h2>
          <p className="text-cream/80 mb-8">
            Coming soon - a complete video walkthrough of our luxury trailer.
          </p>
          <div className="aspect-video bg-charcoal-dark rounded-lg border border-gold/20 flex items-center justify-center">
            <div className="text-cream/50 text-center">
              <svg className="h-16 w-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              <p>Video coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-charcoal-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gold mb-6">
            Like What You See?
          </h2>
          <p className="text-cream/80 text-lg mb-8">
            Get an instant quote for your upcoming event.
          </p>
          <a
            href="/quote"
            className="inline-block bg-gold text-charcoal-dark px-8 py-4 rounded text-lg font-semibold hover:bg-gold-light transition-colors"
          >
            Get Your Free Quote
          </a>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={galleryImages}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      )}
    </>
  );
}
