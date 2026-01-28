'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Lightbox from '@/components/ui/Lightbox';
import PageHeader from '@/components/ui/PageHeader';

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

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  }, []);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  }, []);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="Take a tour of our luxury bathroom trailer and see the quality that sets us apart."
      />

      {/* Image Grid */}
      <section className="py-12 md:py-16 bg-charcoal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/20 shadow-md hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-dark"
                aria-label={`View ${image.alt} fullscreen`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white/80 px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                  View
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tour Section */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-6">
            Video Tour
          </h2>
          <p className="text-base md:text-lg text-cream/80 leading-relaxed mb-8">
            Take a walkthrough of our luxury trailer.
          </p>
          <div className="mx-auto max-w-sm">
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-gold/20 shadow-2xl bg-charcoal-dark">
              <iframe
                src="https://www.youtube.com/embed/HUH7S3XYHLQ"
                title="Upscale Outhouse Video Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-charcoal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-6">
            Like What You See?
          </h2>
          <p className="text-base md:text-lg text-cream/80 leading-relaxed mb-8">
            Get an instant quote for your upcoming event.
          </p>
          <a
            href="/quote"
            className="inline-block bg-gold text-charcoal-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gold-light shadow-lg hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-dark"
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
