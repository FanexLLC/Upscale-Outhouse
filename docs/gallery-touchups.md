UPSCALE OUTHOUSE GALLERY - NEXT LEVEL PLAN (TASK-BY-TASK FOR CLAUDE)

Purpose
Turn /gallery into a premium, wow page that feels curated and high-end.
Work ONE task at a time. After each task: run locally, verify at 390px / 768px / 1280px, then commit.

Non-negotiable rules for Claude
- One task only. No extra refactors.
- Keep the existing brand palette (gold/charcoal/cream).
- Do not add new dependencies unless the task explicitly permits it.
- Use Next.js Image (next/image) for the gallery tiles.
- Ensure keyboard + mobile usability.

Inputs
Use images in /public/images/gallery/ (filenames listed at end of file).

Target outcome
- Premium header and page rhythm
- Curated sections and filtering
- Polished grid tiles with hover motion
- Clean lightbox overlay with keyboard navigation
- Strong bottom CTA

Design standards (Tailwind)
- Wrapper: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Section padding: py-24 on light backgrounds
- Cards: rounded-2xl border border-charcoal/10 shadow-md hover:shadow-lg transition
- Tile: rounded-2xl overflow-hidden border border-charcoal/10 shadow-sm hover:shadow-xl transition
- Hover: hover:scale-[1.02] transition duration-300 ease-out
- Focus ring: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2

Expected files
- app/gallery/page.tsx
- components/ui/PageHeader.tsx (if present)
- components/gallery/galleryData.ts
- components/gallery/GalleryGrid.tsx
- components/gallery/Lightbox.tsx

TASKS (DO IN ORDER)

TASK G00  Audit current gallery page (NO CODE CHANGES)
Goal
Understand what exists so we replace it cleanly.

Claude steps
1) Open app/gallery/page.tsx and note:
   - current layout
   - current image list source
   - any existing components
2) Output:
   - what should be removed
   - what should be kept

Definition of done
- Audit only. No edits.

CLAUDE PROMPT (TASK G00)
Audit only. Do not edit code.
List current gallery page file path, components used, and how images are sourced.
Stop after the audit.

END PROMPT

TASK G01  Create curated gallery data model (no UI yet)
Goal
Single source of truth for images with categories and alt text.

Claude steps
1) Create: components/gallery/galleryData.ts
2) Export:
   type GalleryImage = { src: string; alt: string; category: "Exterior" | "Interior" | "Floorplan"; featured?: boolean; }
   const galleryImages: GalleryImage[] = [...]
3) Add entries using these paths:
   "/images/gallery/gallery-exterior-showcase-01.jpg"
   "/images/gallery/gallery-exterior-side-01.jpg"
   "/images/gallery/gallery-exterior-doors-01.jpg"
   "/images/gallery/gallery-exterior-rear-01.jpg"
   "/images/gallery/gallery-exterior-night-01.jpg"
   "/images/gallery/gallery-interior-womens-01.jpg"
   "/images/gallery/gallery-interior-doors-01.jpg"
   "/images/gallery/gallery-floorplan-01.jpg"
4) Write real alt text for each.
5) Mark featured true for:
   - showcase
   - womens interior

CLAUDE PROMPT (TASK G01)
Task G01 only: Create components/gallery/galleryData.ts with typed image objects (src, alt, category, featured).
Do not change UI. Output files changed and a diff summary. Stop.

END PROMPT

TASK G02  Create GalleryGrid component (no lightbox yet)
Goal
Premium responsive grid with focusable tiles.

Rules
- 1 col mobile, 2 col tablet, 3 col desktop
- Featured tiles can span 2 columns on desktop
- Use next/image fill inside an aspect ratio wrapper
  - default aspect-[4/3]
  - featured aspect-[16/9] on lg
- Each tile is a <button> for keyboard focus
- Add category badge on each tile

CLAUDE PROMPT (TASK G02)
Task G02 only: Create components/gallery/GalleryGrid.tsx.
- Props: images, onImageClick(index)
- Render responsive premium tiles with next/image fill
- Focus-visible ring and hover polish
No lightbox. Output files changed, diff summary, manual test checklist. Stop.

END PROMPT

TASK G03  Redesign /gallery page layout (header + filter + CTA)
Goal
Curated page with filtering and premium rhythm.

Layout
- Header:
  Title: Gallery
  Subtitle: A look at our luxury trailer, inside and out.
  Primary CTA: Get an Instant Quote -> /quote
- Filter pills:
  All, Exterior, Interior, Floorplan
- Grid:
  GalleryGrid with filtered images
- Bottom CTA block:
  Quote button + phone link

CLAUDE PROMPT (TASK G03)
Task G03 only: Update app/gallery/page.tsx to use galleryImages + filter pills + GalleryGrid + bottom CTA.
No lightbox yet. Output files changed, diff summary, manual test checklist. Stop.

END PROMPT

TASK G04  Add Lightbox overlay
Goal
Click image opens fullscreen overlay with navigation.

Must have
- Close: X, backdrop click, Escape
- Navigate: arrows + keyboard arrow keys
- Caption and counter (example: 3 / 8)
- Disable background scroll when open

CLAUDE PROMPT (TASK G04)
Task G04 only: Create Lightbox.tsx and wire into gallery page.
- Props: isOpen, images, startIndex, onClose
- Nav buttons + keyboard arrows
- Escape closes
- Prevent background scroll
Output files changed, diff summary, manual test checklist. Stop.

END PROMPT

TASK G05  Micro polish
Goal
Make it feel expensive.

Add
- Premium pill styling (rounded-full, subtle border, active state filled)
- Subtle header background gradient
- Optional helper text: Tap an image to enlarge

CLAUDE PROMPT (TASK G05)
Task G05 only: Improve filter pills and header polish. No new dependencies.
Output files changed, diff summary, manual test checklist. Stop.

END PROMPT

IMAGE FILENAMES
- gallery-exterior-showcase-01.jpg
- gallery-exterior-side-01.jpg
- gallery-exterior-doors-01.jpg
- gallery-exterior-rear-01.jpg
- gallery-exterior-night-01.jpg
- gallery-interior-womens-01.jpg
- gallery-interior-doors-01.jpg
- gallery-floorplan-01.jpg
