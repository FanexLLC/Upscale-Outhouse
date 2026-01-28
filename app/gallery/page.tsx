'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [paused, setPaused] = useState(false);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

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

  const openLightbox = () => {
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Auto-advance carousel
  useEffect(() => {
    if (paused || lightboxOpen) return;
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [paused, lightboxOpen, goToNext]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!thumbnailsRef.current) return;
    const activeThumb = thumbnailsRef.current.children[currentImageIndex] as HTMLElement;
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentImageIndex]);

  // Keyboard navigation for main carousel
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'Enter') {
        openLightbox();
      }
    },
    [goToPrevious, goToNext]
  );

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-charcoal-dark to-charcoal">
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

      {/* Featured Carousel + Thumbnails */}
      <section className="py-12 md:py-16 bg-charcoal-dark">
        <div
          className="max-w-5xl mx-auto px-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Gallery carousel"
          aria-roledescription="carousel"
        >
          {/* Main Image */}
          <div className="relative rounded-xl overflow-hidden border border-gold/20 shadow-2xl">
            <div className="relative aspect-[16/10] md:aspect-[16/9] bg-charcoal">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Image ${index + 1} of ${galleryImages.length}: ${image.alt}`}
                  aria-hidden={index !== currentImageIndex}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    priority={index === 0}
                  />
                </div>
              ))}

              {/* Click overlay to open lightbox */}
              <button
                onClick={openLightbox}
                className="absolute inset-0 z-20 cursor-pointer group"
                aria-label="Open fullscreen view"
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 bg-black/50 text-white/80 px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                  View fullscreen
                </div>
              </button>
            </div>

            {/* Arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-sm text-white/80 hover:bg-black/60 hover:text-white flex items-center justify-center transition-all"
              aria-label="Previous image"
            >
              <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-sm text-white/80 hover:bg-black/60 hover:text-white flex items-center justify-center transition-all"
              aria-label="Next image"
            >
              <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Counter badge */}
            <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-sm text-white/80 px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div
            ref={thumbnailsRef}
            className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide"
            role="tablist"
            aria-label="Gallery thumbnails"
          >
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                role="tab"
                aria-selected={index === currentImageIndex}
                aria-label={`View ${image.alt}`}
                className={`relative flex-shrink-0 w-20 h-16 md:w-24 md:h-18 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'ring-2 ring-gold ring-offset-2 ring-offset-charcoal-dark opacity-100 scale-105'
                    : 'opacity-50 hover:opacity-80 border border-transparent hover:border-gold/30'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tour Section */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gold mb-6">
            Video Tour
          </h2>
          <p className="text-cream/80 mb-8">
            Take a walkthrough of our luxury trailer.
          </p>
          <div className="mx-auto max-w-sm">
            <div className="relative aspect-[9/16] rounded-xl overflow-hidden border border-gold/20 shadow-2xl bg-charcoal-dark">
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
