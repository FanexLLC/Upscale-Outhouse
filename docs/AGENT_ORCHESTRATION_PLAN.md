# Agent Orchestration Plan — Upscale Outhouse Redesign

> Generated: 2026-03-27
> Lead AI Engineer: Claude Opus 4.6
> Reference: [UPSCALE_OUTHOUSE_REDESIGN_PLAN.md](./UPSCALE_OUTHOUSE_REDESIGN_PLAN.md)

## Decisions Made

| Decision | Answer |
|----------|--------|
| Animation approach | Phased — CSS transitions first, Framer Motion/GSAP later, Three.js last |
| New pages | All at once — redesign existing + build new pages simultaneously |
| i18n (Spanish) | Deferred to later phase — English-only redesign first |
| Backend scope | Full stack — frontend redesign + backend changes where needed |

---

## Phase 1 — Foundation (Sequential)

### Agent 1: `design-system-architect`

**Scope:** Rip out the current styling foundation and replace it with the luxury design system.

**Tasks:**
- [ ] Update `tailwind.config.ts` — new color palette (all CSS variables from plan Section 1.2), fonts, spacing scale, type scale
- [ ] Rewrite `globals.css` — CSS custom properties, font imports (Playfair Display, Outfit, Cormorant Garamond), gold shimmer keyframes, global resets
- [ ] Install Phase 1 dependencies: `embla-carousel-react`, `react-hook-form`, `zod`, `sharp`
- [ ] Create base UI component primitives:
  - `components/ui/Button.tsx` (Primary/Secondary/Ghost/Phone CTA variants)
  - `components/ui/Card.tsx` (dark card with gold border glow on hover)
  - `components/ui/SectionDivider.tsx` (gold gradient line)
  - `components/ui/OverlineLabel.tsx` (all caps, accent font, gold, letter-spaced)
  - `components/ui/GoldShimmer.tsx` (shimmer loading skeleton)
- [ ] Set up font loading strategy with `next/font/google` or Google Fonts CDN with `font-display: swap`

**Dependencies:** None — this is the foundation.
**Blocks:** Phase 2, Phase 3

---

## Phase 2 — Layout Shell + Backend (Parallel, 2 agents)

### Agent 2: `layout-engineer`

**Scope:** Rebuild the global layout components that wrap every page.

**Tasks:**
- [ ] **Header.tsx** — Full rewrite:
  - Transparent-on-load → solid `#0A0A0A` with backdrop-blur on scroll (after 100px)
  - 72px height desktop, 64px mobile
  - Logo + nav links (Home, About, Gallery, Events▾, Quote, Contact)
  - "Events" dropdown submenu → 5 event landing pages
  - Phone number always visible on desktop, icon-only on mobile
  - "GET QUOTE" gold CTA button with subtle pulse every 30s
  - ES/EN toggle placeholder (top-right)
  - Z-index: always on top
- [ ] **Footer.tsx** — Full rewrite:
  - 3-column layout: Quick Links | Events | Contact
  - Logo + business description + "Veteran-Owned Business" badge
  - Social icons: Instagram (linked), Facebook, TikTok, Google Business (placeholders)
  - Gold divider line
  - Copyright + Privacy Policy | Terms of Service links
  - LocalBusiness JSON-LD schema markup
- [ ] **MobileMenu.tsx** — New component:
  - Full-screen overlay
  - Gold accent line animation on open
  - All nav links + phone + quote CTA
- [ ] **Sticky Mobile CTA Bar** — New component:
  - Fixed to bottom of screen on mobile only
  - Two buttons: [CALL] [GET QUOTE]
  - Always accessible
- [ ] Update `app/layout.tsx`:
  - New fonts (Playfair Display, Outfit, Cormorant Garamond)
  - New global metadata
  - New Header/Footer components

### Agent 3: `backend-engineer`

**Scope:** Add missing API routes, models, and backend infrastructure.

**Tasks:**
- [ ] `POST /api/contact/route.ts` — Contact form handler
  - Zod validation (name, email, phone, event type, date, message)
  - Store submission in database
  - Send admin email notification (Resend)
  - Send admin SMS notification (Twilio integration)
  - Return success response
- [ ] Add Prisma schema updates if needed (Contact model or reuse leads)
- [ ] Blog infrastructure:
  - MDX setup with `@next/mdx` or raw MDX parsing
  - Create `/content/blog/` directory
  - Write 2-3 initial blog posts as MDX
  - Blog data fetching utilities
- [ ] FAQ data structure:
  - `/content/faq.json` or `/lib/faq-data.ts`
  - Organized by category (General, Booking, Delivery, Trailer, Events)
  - All questions from plan Section 3.7
- [ ] `lib/notifications.ts` — Add Twilio SMS support
- [ ] `lib/recaptcha.ts` — reCAPTCHA v3 verification utility
- [ ] `lib/security.ts` — Honeypot field validation + rate limiting middleware
- [ ] Update `app/sitemap.ts` — Include all new pages (events/*, faq, blog)
- [ ] Update `app/robots.ts` — Ensure /api/ routes are disallowed

**Dependencies:** Phase 1 (design system)
**Blocks:** Phase 3 (pages need API routes and data)

---

## Phase 3 — All Pages (Parallel, 6 agents)

### Agent 4: `homepage-engineer`

**Scope:** Complete rewrite of `app/page.tsx` — the flagship page.

**Sections to build (in order):**
- [ ] Hero section (static Phase 1 version):
  - Full-screen dark bg
  - Centered gold logo
  - Headline: "LUXURY RESTROOMS FOR UNFORGETTABLE EVENTS" (Playfair Display)
  - Overline: "VETERAN-OWNED • FRESNO, CALIFORNIA" (Cormorant Garamond, gold)
  - Scroll indicator (gold chevron)
  - Two CTAs: [GET YOUR INSTANT QUOTE →] [VIEW THE TRAILER →]
  - Stat counters: "250+ GUESTS SERVED PER EVENT" | "5★ RATED" | "VETERAN OWNED"
  - Mobile: simplified layout, stacked CTAs including tap-to-call
- [ ] "The Experience" section:
  - Overline: WHAT SETS US APART
  - 2-column grid: large interior image (left) + feature list with icons (right)
  - Features: Separate Entrances, Climate Controlled, Flushing Toilets, LED Mirrors, Bluetooth Sound
- [ ] "How It Works" section:
  - 3-step process: Get Quote → We Deliver → Enjoy Your Event
  - Gold numbers, icons, connecting gold line (horizontal desktop, vertical mobile)
- [ ] Social Proof section:
  - Stats bar (light background contrast break): Veteran Owned, Free Delivery, 5.0 Rated, 250+ Events, Climate Controlled, Running Water
  - Testimonial carousel (embla-carousel-react): dark bg, gold quotation marks, Cormorant Garamond text, auto-rotate 6s
- [ ] Event Types Grid:
  - 5 cards linking to event landing pages
  - Dark cards, full-bleed images with dark gradient overlay
  - Hover: zoom + gold border
  - Mobile: horizontal scroll or 2-column grid
- [ ] Service Area section:
  - Dark-themed Google Map embed with 150-mile radius
  - City list: Fresno, Clovis, Visalia, Bakersfield, Merced, Modesto, etc.
  - CTA: "Don't see your city? Contact us →"
- [ ] Final CTA section:
  - "Ready to Elevate Your Event?" + "Get Your Instant Quote"
  - Two buttons: [GET YOUR FREE QUOTE →] [CALL (559) 663-0356]
  - "Veteran-owned • Free delivery within 50 miles"

### Agent 5: `quote-redesign-engineer`

**Scope:** Transform the quote calculator into a multi-step luxury configurator.

**Tasks:**
- [ ] Create `QuoteWizard.tsx` — orchestrates the 4-step flow
- [ ] Step 1 — Event Details:
  - `EventTypeSelector.tsx` — Visual cards with icons (wedding, corporate, birthday, festival, quinceañera)
  - `GuestCountSlider.tsx` — Large slider with gold handle, number display above
  - `DurationSelector.tsx` — Single/multi-day toggle + day counter
- [ ] Step 2 — Date & Location:
  - `AvailabilityCalendar.tsx` — Custom dark-themed calendar, gold accents, green=available, red=booked
  - `LocationInput.tsx` — Google Places autocomplete, auto-distance calculation
- [ ] Step 3 — Your Information (Lead Gate):
  - Name, email, phone (required), "How did you hear about us?" (optional)
  - Privacy notice
  - Honeypot field (hidden)
  - reCAPTCHA v3
- [ ] Step 4 — Your Quote (`PriceReveal.tsx`):
  - Price breakdown: base rental + delivery fee + duration
  - Estimated total range
  - [CONFIRM BOOKING REQUEST →] + [CALL TO DISCUSS →]
- [ ] Gold progress bar at top (Step 1/2/3/4)
- [ ] Wire all steps into existing `/api/quote` backend
- [ ] Update `app/quote/page.tsx` to use new wizard

### Agent 6: `about-contact-engineer`

**Scope:** Redesign About and Contact pages.

**Tasks:**
- [ ] **About page** (`app/about/page.tsx`):
  - Page header: "Built on Service. Driven by Excellence."
  - Origin Story — 2-column (photo left, story right)
  - "Why We're Different" — 3 value cards (Military Precision, Community Roots, No Compromises)
  - By The Numbers — animated counters (Events Served, Star Rating, Service Radius, Guest Capacity)
  - Meet the Team — conditional section (skip if no photos)
  - Final CTA block
- [ ] **Contact page** (`app/contact/page.tsx`):
  - Page header: "Let's Make Your Event Unforgettable"
  - Two-column: contact methods (left) + contact form (right)
  - Contact methods: phone, email, address, social links
  - Form: name, email, phone, event type, event date, message → POST /api/contact
  - Success state: gold checkmark + "We'll be in touch within 2 hours!"
  - Below: dark-themed Google Map with 150-mile radius circle, gold marker

### Agent 7: `gallery-engineer`

**Scope:** Transform gallery into a luxury portfolio experience.

**Tasks:**
- [ ] Rewrite `app/gallery/page.tsx`:
  - Page header: "The Upscale Outhouse Experience"
  - Filter tabs: ALL | EXTERIOR | INTERIOR | EVENTS | FLOORPLAN (gold underline on active)
  - Masonry-style gallery grid (varied image sizes)
  - Each image: dark card, subtle border, caption (location, event type, date)
- [ ] Redesigned `Lightbox.tsx`:
  - Full-screen with swipe navigation
  - Pinch-to-zoom on mobile
  - Caption overlay at bottom
  - Keyboard navigation (arrows, Escape)
- [ ] Video section:
  - "Take a Tour" / "Walk Through Our Luxury Trailer"
  - `lite-youtube-embed` for YouTube videos (performance)
  - Space for 2-3 videos
- [ ] 3D viewer placeholder:
  - "Explore in 3D" / "Interactive Trailer Tour"
  - Auto-rotating photo carousel with "3D Tour Coming Soon" badge
- [ ] Update `galleryData.ts` with proper categorization by filter type

### Agent 8: `event-pages-engineer`

**Scope:** Build all 5 event landing pages from scratch.

**Tasks:**
- [ ] Create shared template: `components/events/EventPageTemplate.tsx`
  - Hero (full-width image + overline + headline + subtext + CTA)
  - "Why" section (3-4 reasons unique to event type)
  - Feature highlights (reframed for context)
  - Social proof (filtered testimonials)
  - Photo gallery (3-6 photos filtered by type)
  - FAQ accordion (4-6 unique questions)
  - CTA ("Ready to book for your [event type]?")
- [ ] `/events/weddings/page.tsx`:
  - Headline: "Your Wedding Deserves Better Than a Porta Potty"
  - SEO: "luxury restroom trailer wedding Fresno"
  - Unique FAQ, copy, imagery direction
- [ ] `/events/corporate/page.tsx`:
  - Headline: "Professional Facilities for Professional Events"
  - SEO: "corporate event restroom rental Fresno"
- [ ] `/events/birthday-graduation/page.tsx`:
  - Headline: "Make Your Celebration Truly Complete"
  - SEO: "party bathroom rental Fresno"
- [ ] `/events/festivals/page.tsx`:
  - Headline: "Festival-Ready. Crowd-Proven. Always Clean."
  - SEO: "festival restroom trailer rental"
- [ ] `/events/quinceanera/page.tsx`:
  - Headline: "Celebra con Elegancia" / "Celebrate in Elegance"
  - SEO: bilingual keywords
  - Spanish SEO meta tags
  - Bilingual emphasis throughout
- [ ] Per-page Service JSON-LD schema markup
- [ ] Per-page unique `<title>`, `<meta description>`, OG tags

### Agent 9: `faq-blog-engineer`

**Scope:** Build FAQ page, Blog system, and 404 page.

**Tasks:**
- [ ] **FAQ page** (`app/faq/page.tsx`):
  - Page header: "Everything You Need to Know"
  - Category tabs: General, Booking & Pricing, Delivery & Setup, The Trailer, Events
  - Accordion component with gold +/× rotation animation
  - All questions from plan Section 3.7
  - FAQPage JSON-LD schema markup
- [ ] **Blog index** (`app/blog/page.tsx`):
  - Grid of blog post cards (image, title, excerpt, date, read time)
  - Category filters: Tips, Events, Behind the Scenes, Industry
  - Pagination (10 posts per page)
- [ ] **Blog post template** (`app/blog/[slug]/page.tsx`):
  - Full-width hero image
  - Title (H1), date, read time, category
  - MDX content rendering
  - Author bio section
  - Related posts
  - CTA banner mid-article + end: "Planning an event? Get your instant quote →"
- [ ] Write 2-3 initial blog posts:
  - "Luxury Restroom Trailer vs. Porta Potty: What's the Real Difference?"
  - "How Many Portable Restrooms Do I Need for My Wedding?"
  - "What to Expect When You Rent a Luxury Restroom Trailer"
- [ ] **404 page** (`app/not-found.tsx`):
  - On-brand dark/gold design
  - Witty copy
  - CTA back to homepage

---

## Phase 4 — SEO & Analytics (After Phase 3)

### Agent 10: `seo-analytics-engineer`

**Scope:** Comprehensive SEO and tracking across all pages.

**Tasks:**
- [ ] Unique meta tags per page: `<title>` (max 60 chars), `<meta description>` (max 155 chars), OG, Twitter cards
- [ ] LocalBusiness JSON-LD on every page (in layout)
- [ ] FAQPage schema on `/faq`
- [ ] Service schema on all `/events/*` pages
- [ ] Image SEO: audit all alt text, verify naming conventions
- [ ] Update `sitemap.ts` — all new pages, blog posts
- [ ] Update `robots.ts` — disallow /api/ routes
- [ ] Google Analytics 4 setup:
  - Page views, scroll depth, button clicks
  - Custom events: `hero_cta_clicked`, `quote_step_completed`, `quote_submitted`, `phone_number_clicked`, `gallery_image_viewed`, `gallery_video_played`, `event_page_viewed`, `blog_post_read`, `faq_expanded`
  - Conversion tracking: quote submissions as primary conversion
- [ ] Performance audit:
  - LCP < 2.5s, FID < 100ms, CLS < 0.1
  - Font loading optimization
  - Image optimization (WebP, srcset, lazy loading)
  - JS bundle analysis and code splitting

---

## Phase 5 — Animations (After Phase 3)

### Agent 11: `animation-engineer`

**Scope:** Layer premium motion design onto all pages.

**Dependencies:** `npm install framer-motion gsap`

**Tasks:**
- [ ] Page transitions: fade + slight upward slide (300ms, ease-out)
- [ ] Section reveal on scroll: fade up from 30px, stagger children by 100ms
- [ ] Hero parallax (GSAP ScrollTrigger):
  - Pin sections during scroll
  - Background image: blur(20px) → sharp on scroll
  - Parallax movement (moves slower than scroll)
  - Gold gradient sweep left-to-right
- [ ] Image reveal: clip-path animation (reveal from left or bottom)
- [ ] Animated number counters: count up from 0 when scrolled into view
- [ ] Gold shimmer: CSS @keyframes gradient slide on gold elements
- [ ] Testimonial carousel auto-rotation (6s)
- [ ] Quote wizard step transitions
- [ ] Accordion expand/collapse animations
- [ ] Button hover animations: scale(1.02), shimmer effect
- [ ] Card hover: border glow, image zoom
- [ ] `prefers-reduced-motion`: disable ALL animations when set
- [ ] Mobile: no parallax (performance), simple fade transitions only

---

## Phase 6 — i18n / Spanish Translation (After Phase 4)

### Agent 12: `i18n-engineer`

**Scope:** Full Spanish translation infrastructure.

**Dependencies:** `npm install next-intl`

**Tasks:**
- [ ] Configure `next-intl` — default locale `en`, supported `en`/`es`
- [ ] URL strategy: same URLs with language toggle (no `/es/` prefix)
- [ ] Create `/content/translations/en.json` — all UI strings
- [ ] Create `/content/translations/es.json` — Spanish translations
- [ ] `LanguageToggle.tsx` component in header
- [ ] Cookie-based language persistence
- [ ] Wrap all UI text in translation hooks across all pages
- [ ] Quinceañera page: full bilingual content priority
- [ ] Spanish SEO meta tags on quinceañera page
- [ ] Blog posts remain English-only initially

---

## Dependency Graph

```
Phase 1: [Agent 1: Design System] ─────────────────────────────┐
                                                                 │
Phase 2: [Agent 2: Layout] ──────┐                              │
         [Agent 3: Backend] ─────┤  (parallel, after Phase 1)   │
                                  │                              │
Phase 3: [Agent 4: Homepage]  ───┤                              │
         [Agent 5: Quote]     ───┤                              │
         [Agent 6: About/Contact]┤  (parallel, after Phase 2)   │
         [Agent 7: Gallery]   ───┤                              │
         [Agent 8: Events x5] ───┤                              │
         [Agent 9: FAQ+Blog]  ───┘                              │
                                                                 │
Phase 4: [Agent 10: SEO+Analytics] ── (after Phase 3)          │
Phase 5: [Agent 11: Animations] ───── (after Phase 3)          │
Phase 6: [Agent 12: i18n] ─────────── (after Phase 4)          │
```

## Execution Summary

| Phase | Agents | Parallelism | Complexity |
|-------|--------|-------------|------------|
| 1     | 1      | Sequential  | Medium     |
| 2     | 2      | Parallel    | Medium each |
| 3     | 6      | Parallel    | High (homepage, quote), Medium (others) |
| 4     | 1      | Sequential  | Medium     |
| 5     | 1      | Sequential  | High       |
| 6     | 1      | Sequential  | Medium     |

**Total: 12 specialized agents across 6 phases.**

---

## Key Rules for All Agents

1. **Do NOT touch admin pages** — `/admin/*` routes are off-limits
2. **Do NOT modify existing API logic** that works — only add new routes
3. **Do NOT delete the Prisma schema** — only extend it
4. **All components must be mobile-first** (design mobile → scale to desktop)
5. **Touch targets:** minimum 44x44px on all interactive elements
6. **Accessibility:** semantic HTML, ARIA labels, keyboard navigation, focus styles
7. **Mark all placeholder content** with `{/* TODO: Replace with real content */}` comments
8. **Use existing image assets** in `/public/images/` and `/public/branding/`
9. **Follow the copy style guide** from plan Section 14
10. **No i18n wrapping** — that's deferred to Phase 6

---

*End of Orchestration Plan — v1.0*
