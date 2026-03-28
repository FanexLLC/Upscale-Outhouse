export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: "Exterior" | "Interior" | "Events" | "Floorplan";
  description?: string;
  featured?: boolean;
};

export const galleryImages: GalleryImage[] = [
  {
    id: "ext-showcase-01",
    src: "/images/gallery/gallery-exterior-showcase-01.jpeg",
    alt: "Front showcase view of the Upscale Outhouse luxury bathroom trailer",
    title: "Luxury Trailer Showcase",
    category: "Exterior",
    description: "Our flagship luxury restroom trailer ready for your event.",
    featured: true,
  },
  {
    id: "ext-side-01",
    src: "/images/gallery/gallery-exterior-side-01.jpg",
    alt: "Side profile of the luxury trailer showing clean exterior lines",
    title: "Clean Exterior Lines",
    category: "Exterior",
    description: "Sleek side profile designed to complement any venue.",
  },
  {
    id: "ext-doors-01",
    src: "/images/gallery/gallery-exterior-doors-01.jpg",
    alt: "Entry doors of the luxury bathroom trailer",
    title: "Grand Entry Doors",
    category: "Exterior",
    description: "Welcoming entry with premium hardware and finishes.",
  },
  {
    id: "ext-rear-01",
    src: "/images/gallery/gallery-exterior-rear-01.jpeg",
    alt: "Rear view of the trailer highlighting the premium build quality",
    title: "Premium Build Quality",
    category: "Exterior",
    description: "Built to the highest standards with attention to every detail.",
  },
  {
    id: "ext-night-01",
    src: "/images/gallery/gallery-exterior-night-01.jpg",
    alt: "Luxury trailer illuminated at night with warm ambient lighting",
    title: "Evening Ambiance",
    category: "Exterior",
    description: "Warm LED lighting creates an inviting atmosphere after dark.",
    featured: true,
  },
  {
    id: "int-womens-01",
    src: "/images/gallery/gallery-interior-womens-01.jpg",
    alt: "Elegant women's restroom interior with upscale finishes and vanity mirrors",
    title: "Women's Suite",
    category: "Interior",
    description: "Elegant vanity area with premium mirrors and lighting.",
    featured: true,
  },
  {
    id: "int-doors-01",
    src: "/images/gallery/gallery-interior-doors-01.jpg",
    alt: "Interior door detail showing premium hardware and trim",
    title: "Premium Interior Details",
    category: "Interior",
    description: "Quality hardware and trim throughout.",
  },
  {
    id: "fp-01",
    src: "/images/gallery/gallery-floorplan-01.jpg",
    alt: "Floor plan layout of the luxury bathroom trailer",
    title: "Trailer Floor Plan",
    category: "Floorplan",
    description: "Thoughtfully designed layout maximizing comfort and flow.",
  },
  /* TODO: Add real event photos once available */
];
