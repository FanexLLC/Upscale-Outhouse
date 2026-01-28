'use client';

import { useState, useMemo, useCallback } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Lightbox from '@/components/gallery/Lightbox';
import { galleryImages, GalleryImage } from '@/components/gallery/galleryData';

const categories = ['All', 'Exterior', 'Interior', 'Floorplan'] as const;
type Category = (typeof categories)[number];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Exterior');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages = useMemo<GalleryImage[]>(() => {
    if (activeCategory === 'All') return galleryImages;
    return galleryImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  }, [filteredImages.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  }, [filteredImages.length]);

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="A look at our luxury trailer, inside and out."
        primaryCta={{ label: 'Get an Instant Quote', href: '/quote' }}
      />

      {/* Filter Pills + Grid */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
                  activeCategory === cat
                    ? 'bg-charcoal-dark text-cream'
                    : 'bg-white border border-charcoal/20 text-charcoal hover:bg-charcoal/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* White Panel */}
          <div className="mt-8 bg-white rounded-2xl border border-charcoal/10 shadow-md p-4 sm:p-6 lg:p-8">
            <GalleryGrid
              images={filteredImages}
              onImageClick={openLightbox}
            />
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

      {/* Bottom CTA */}
      <section className="py-24 bg-charcoal-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-6">
            Like What You See?
          </h2>
          <p className="text-base md:text-lg text-cream/80 leading-relaxed mb-8">
            Get an instant quote for your upcoming event.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/quote"
              className="inline-block bg-gold text-charcoal-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gold-light shadow-lg hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-dark"
            >
              Get Your Free Quote
            </a>
            <a
              href="tel:+1XXXXXXXXXX"
              className="inline-block text-gold border border-gold/40 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gold/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-dark"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        images={filteredImages}
        startIndex={currentIndex}
        onClose={closeLightbox}
        onPrevious={goToPrevious}
        onNext={goToNext}
      />
    </>
  );
}
