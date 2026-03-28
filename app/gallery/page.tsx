'use client';

import { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import OverlineLabel from '@/components/ui/OverlineLabel';
import SectionDivider from '@/components/ui/SectionDivider';
import Button from '@/components/ui/Button';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Lightbox from '@/components/gallery/Lightbox';
import { galleryImages, GalleryImage } from '@/components/gallery/galleryData';

const ThreeDViewer = dynamic(
  () => import('@/components/gallery/ThreeDViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-video max-w-4xl mx-auto rounded-card bg-bg-secondary flex items-center justify-center">
        <div className="text-gold-primary animate-pulse">Loading 3D viewer...</div>
      </div>
    ),
  }
);

const categories = ['All', 'Exterior', 'Interior', 'Events', 'Floorplan'] as const;
type Category = (typeof categories)[number];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
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
      {/* Hero / Header */}
      <section className="pt-32 md:pt-40 pb-8 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <OverlineLabel>See For Yourself</OverlineLabel>
          <h1 className="font-display text-h1 text-text-primary mt-4">
            The Upscale Outhouse Experience
          </h1>
          <p className="font-body text-body text-text-secondary mt-4 max-w-2xl mx-auto">
            Every detail designed for your guests&apos; comfort.
          </p>
        </div>
      </section>

      {/* Filter Tabs + Gallery Grid */}
      <section className="pb-16 md:pb-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2.5 font-body text-sm uppercase tracking-wide transition-colors duration-200 min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary ${
                  activeCategory === cat
                    ? 'text-gold-primary'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gold-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <GalleryGrid images={filteredImages} onImageClick={openLightbox} />
        </div>
      </section>

      {/* Video Tour Section */}
      <SectionDivider className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />
      <section className="py-16 md:py-24 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <OverlineLabel>Take a Tour</OverlineLabel>
          <h2 className="font-display text-h2 text-text-primary mt-4">
            Walk Through Our Luxury Trailer
          </h2>

          {/* Video embed */}
          <div className="mt-10 mx-auto max-w-sm">
            <div className="relative aspect-[9/16] rounded-card overflow-hidden border border-[rgba(201,168,76,0.15)] bg-bg-secondary shadow-card">
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

      {/* 3D Viewer Placeholder */}
      <SectionDivider className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />
      <section className="py-16 md:py-24 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <OverlineLabel>Explore in 3D</OverlineLabel>
          <h2 className="font-display text-h2 text-text-primary mt-4">
            Interactive Trailer Tour
          </h2>

          <div className="mt-10">
            <ThreeDViewer />
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
