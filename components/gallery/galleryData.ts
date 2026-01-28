export type GalleryImage = {
  src: string;
  alt: string;
  category: "Exterior" | "Interior" | "Floorplan";
  featured?: boolean;
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/gallery-exterior-showcase-01.jpeg",
    alt: "Front showcase view of the Upscale Outhouse luxury bathroom trailer",
    category: "Exterior",
    featured: true,
  },
  {
    src: "/images/gallery/gallery-exterior-side-01.jpg",
    alt: "Side profile of the luxury trailer showing clean exterior lines",
    category: "Exterior",
  },
  {
    src: "/images/gallery/gallery-exterior-doors-01.jpg",
    alt: "Entry doors of the luxury bathroom trailer",
    category: "Exterior",
  },
  {
    src: "/images/gallery/gallery-exterior-rear-01.jpeg",
    alt: "Rear view of the trailer highlighting the premium build quality",
    category: "Exterior",
  },
  {
    src: "/images/gallery/gallery-exterior-night-01.jpg",
    alt: "Luxury trailer illuminated at night with warm ambient lighting",
    category: "Exterior",
  },
  {
    src: "/images/gallery/gallery-interior-womens-01.jpg",
    alt: "Elegant women's restroom interior with upscale finishes and vanity mirrors",
    category: "Interior",
    featured: true,
  },
  {
    src: "/images/gallery/gallery-interior-doors-01.jpg",
    alt: "Interior door detail showing premium hardware and trim",
    category: "Interior",
  },
  {
    src: "/images/gallery/gallery-floorplan-01.jpg",
    alt: "Floor plan layout of the luxury bathroom trailer",
    category: "Floorplan",
  },
];
