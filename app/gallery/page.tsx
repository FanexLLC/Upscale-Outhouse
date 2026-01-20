'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from '@/components/ui/Lightbox';

const galleryImages = [
  { src: '/images/gallery/exterior-1.jpg', alt: 'Luxury bathroom trailer exterior view' },
  { src: '/images/gallery/exterior-2.jpg', alt: 'Trailer setup at event venue' },
  { src: '/images/gallery/exterior-3.jpg', alt: 'Premium trailer exterior' },
  { src: '/images/gallery/womens-interior.jpg', alt: 'Elegant women\'s interior' },
  { src: '/images/gallery/layout.jpg', alt: 'Spacious interior layout' },
  { src: '/images/gallery/hero-bg.jpg', alt: 'Trailer overview' },
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
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
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
