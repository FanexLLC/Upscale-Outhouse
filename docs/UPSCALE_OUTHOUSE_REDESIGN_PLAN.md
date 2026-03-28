# UPSCALE OUTHOUSE — Complete Frontend Redesign Plan

## Project Overview

**Business:** Upscale Outhouse — Veteran-owned luxury portable restroom trailer rental  
**Location:** Fresno, California (serves 150-mile radius across Central Valley)  
**Tech Stack:** Next.js 14+ (App Router) on Vercel  
**Brand Identity:** Existing logo (gold laurel wreath "USO" monogram on black) — no changes  
**Target Audience:** Brides/wedding planners, corporate event coordinators, party hosts, festival organizers, quinceañera planners — all equally weighted  
**Timeline:** Full implementation, all pages at once  

### Design Priority Stack (ranked)
1. **Look more premium than every competitor** — this is a luxury brand, the site must feel like a five-star hotel's website, not a rental company
2. **Build trust and credibility fast** — veteran-owned, real reviews, real event photos, transparent pricing
3. **Dominate local SEO** — event-type landing pages, schema markup, blog content engine, Spanish translation
4. **Convert visitors into leads** — interactive quote calculator with lead capture, sticky CTAs, frictionless UX

---

## 1. Design System

### 1.1 Visual Direction: "Bold & Confident Luxury"

The aesthetic is a high-end hotel meets luxury automotive configurator. Think: Rolls-Royce website meets Four Seasons. Dark, commanding backgrounds that make gold accents glow. Every interaction feels intentional and premium. The site should make visitors think "wait, this is for a portable bathroom?" — that dissonance IS the selling point.

### 1.2 Color Palette

```css
:root {
  /* Primary */
  --color-bg-primary: #0A0A0A;         /* Near-black — main background */
  --color-bg-secondary: #111111;       /* Slightly lighter — card backgrounds */
  --color-bg-elevated: #1A1A1A;        /* Elevated surfaces — modals, dropdowns */
  --color-bg-subtle: #0D0D0D;          /* Subtle variation for depth */
  
  /* Gold System — extracted from logo */
  --color-gold-primary: #C9A84C;       /* Primary gold — CTAs, accents */
  --color-gold-light: #E2C972;         /* Light gold — hover states */
  --color-gold-dark: #8B7132;          /* Dark gold — borders, subtle accents */
  --color-gold-gradient: linear-gradient(135deg, #C9A84C 0%, #E2C972 50%, #C9A84C 100%);
  --color-gold-shimmer: linear-gradient(90deg, #C9A84C 0%, #F0E68C 50%, #C9A84C 100%);
  
  /* Text */
  --color-text-primary: #FFFFFF;       /* Headlines, primary text */
  --color-text-secondary: #B8B8B8;     /* Body text on dark */
  --color-text-muted: #6B6B6B;         /* Captions, metadata */
  --color-text-gold: #C9A84C;          /* Accent text */
  
  /* Semantic */
  --color-success: #4CAF50;            /* Available dates, confirmations */
  --color-error: #E53935;              /* Errors, booked dates */
  --color-warning: #F9A825;            /* Warnings, limited availability */
  
  /* Light sections (used sparingly for contrast breaks) */
  --color-bg-light: #F5F0E8;          /* Warm cream — testimonial sections */
  --color-text-on-light: #1A1A1A;     /* Dark text on light backgrounds */
}
```

### 1.3 Typography

Use Google Fonts for performance. Avoid Inter, Roboto, Arial — these are generic AI-slop fonts.

```css
/* Display / Headlines — commanding, luxury feel */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');

/* Body / UI — clean, modern, readable */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

/* Accent / Labels — refined small caps feel */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap');

:root {
  --font-display: 'Playfair Display', serif;    /* H1, H2, hero text */
  --font-body: 'Outfit', sans-serif;             /* Body, UI elements, nav */
  --font-accent: 'Cormorant Garamond', serif;    /* Labels, overlines, quotes */
}
```

**Type Scale:**
```css
--text-hero: clamp(3rem, 8vw, 7rem);       /* Hero headlines */
--text-h1: clamp(2.5rem, 5vw, 4.5rem);     /* Page titles */
--text-h2: clamp(2rem, 4vw, 3.5rem);       /* Section headers */
--text-h3: clamp(1.5rem, 3vw, 2rem);       /* Subsection headers */
--text-h4: clamp(1.125rem, 2vw, 1.5rem);   /* Card headers */
--text-body: clamp(1rem, 1.5vw, 1.125rem); /* Body text */
--text-small: clamp(0.875rem, 1vw, 1rem);  /* Captions, labels */
--text-overline: 0.75rem;                   /* Overline labels — always uppercase, letter-spaced */
```

### 1.4 Spacing System

```css
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-2xl: 3rem;      /* 48px */
--space-3xl: 4rem;      /* 64px */
--space-4xl: 6rem;      /* 96px */
--space-section: 8rem;  /* 128px — between major sections */
```

### 1.5 Component Library

**Buttons:**
- **Primary CTA:** Gold gradient background, dark text, 48px height minimum, rounded corners (8px), gold shimmer animation on hover (gradient slides left-to-right), subtle scale(1.02) on hover
- **Secondary CTA:** Transparent with 1px gold border, gold text, fills gold on hover with dark text
- **Ghost:** No border, gold text, underline animation on hover
- **Phone CTA:** Always shows phone icon + number, gold accent

**Cards:**
- Dark card (`--color-bg-secondary`) with 1px border (`rgba(201, 168, 76, 0.15)`), border glows gold on hover
- Border-radius: 12px
- Padding: 32px
- Subtle box-shadow: `0 4px 24px rgba(0,0,0,0.4)`

**Section Dividers:**
- Thin gold gradient line (1px height, `--color-gold-gradient`)
- Or the ornamental flourish from the logo (the curly wave beneath "UPSCALE")

**Overline Labels:**
- All caps, `--font-accent`, letter-spacing: 0.2em, `--color-gold-primary`, small font size
- Example: `VETERAN-OWNED • FRESNO, CA` above headlines

**Image Treatment:**
- All images get subtle vignette overlay on edges (CSS gradient overlay)
- Hover: slight zoom (scale 1.05) with easing
- Loading: skeleton shimmer in gold gradient

### 1.6 Animation Specifications

**Library:** Framer Motion (primary) + GSAP ScrollTrigger (parallax hero)

**Global Animations:**
```
- Page transitions: Fade + slight upward slide (300ms, ease-out)
- Section reveal on scroll: Fade up from 30px below, stagger children by 100ms
- Image reveal: Clip-path animation (reveal from left-to-right or bottom-to-top)
- Gold shimmer: CSS @keyframes that slides a gradient highlight across gold elements
- Number counters: Animate from 0 to value when scrolled into view (for stats)
```

**Performance Rules:**
- Use `will-change` sparingly and only on actively animating elements
- Prefer `transform` and `opacity` — never animate `width`, `height`, `top`, `left`
- Lazy-load all images below the fold with `next/image` and blur placeholder
- Three.js scene: lazy-load the entire module, show fallback image until loaded
- Target: LCP < 2.5s, FID < 100ms, CLS < 0.1

---

## 2. Complete Sitemap

```
/                           → Homepage
/about                      → About Us (veteran story, team, mission)
/gallery                    → Photo + Video Gallery
/quote                      → Interactive Quote Calculator
/contact                    → Contact Page
/events/weddings            → Wedding Landing Page
/events/corporate           → Corporate Events Landing Page
/events/birthday-graduation → Birthday & Graduation Landing Page
/events/festivals           → Festivals & Concerts Landing Page
/events/quinceanera         → Quinceañera & Cultural Celebrations Landing Page
/faq                        → FAQ Page (schema markup)
/blog                       → Blog Index
/blog/[slug]                → Individual Blog Posts
/privacy                    → Privacy Policy
/terms                      → Terms of Service
```

**Total: 15+ pages** (blog posts will grow over time)

---

## 3. Page-by-Page Specifications

---

### 3.1 HOMEPAGE (`/`)

The homepage is the flagship. It must accomplish five things in under 10 seconds: (1) communicate luxury, (2) show the trailer, (3) establish trust, (4) make the CTA irresistible, (5) be unforgettable.

#### 3.1.1 Sticky Header (Global Component)

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo]    Home  About  Gallery  Events▾  Quote  Contact     │
│                                    [(559) 663-0356] [GET QUOTE] │
└─────────────────────────────────────────────────────────────┘
```

- **Behavior:** Transparent on page load (logo + white text over hero), transitions to solid `--color-bg-primary` with subtle backdrop-blur on scroll (after 100px)
- **Mobile:** Hamburger menu with full-screen overlay, gold accent line animation on open
- **"Events" dropdown:** Hover/tap reveals submenu linking to all 5 event landing pages
- **Phone number:** Always visible on desktop, icon-only on mobile (expands on tap)
- **"GET QUOTE" button:** Primary gold CTA, always visible, pulses subtly every 30 seconds with a gold glow to draw attention
- **Height:** 72px desktop, 64px mobile
- **Z-index:** Always on top
- **Spanish toggle:** Small "ES | EN" toggle in header, top-right corner area

#### 3.1.2 Hero Section — Parallax Trailer Reveal

This is the signature moment. As the user scrolls (or on initial load), the trailer is revealed cinematically.

**Desktop Experience:**
```
[PHASE 1 — Initial Load]
Full-screen dark background with subtle particle/dust effect
Centered gold logo animates in (scale from 0.8 to 1, fade in)
Below logo: "LUXURY RESTROOMS FOR UNFORGETTABLE EVENTS" 
   → Playfair Display, white, animates in word-by-word
Overline: "VETERAN-OWNED • FRESNO, CALIFORNIA"
   → Cormorant Garamond, gold, letter-spaced
Scroll indicator at bottom: animated gold chevron bouncing

[PHASE 2 — On Scroll (parallax layers)]
Background image of the trailer (exterior, best angle) fades in 
   → starts blurred (filter: blur(20px)), sharpens as user scrolls
   → image has parallax movement (moves slower than scroll)
Gold gradient overlay sweeps across from left to right
Stats counter appears:
   "250+ GUESTS SERVED PER EVENT" | "5★ RATED" | "VETERAN OWNED"

[PHASE 3 — Scroll continues]
CTA section locks into view:
   "Experience the Difference"
   [GET YOUR INSTANT QUOTE →]  [VIEW THE TRAILER →]
   Small text: "Free delivery within 50 miles • Climate controlled • Running water"
```

**Mobile Experience:**
```
Full-screen hero image (best exterior shot, pre-optimized WebP)
Logo centered top
Headline: "Luxury Restrooms for Unforgettable Events" (smaller type)
Two stacked CTAs:
   [GET YOUR INSTANT QUOTE →]
   [TAP TO CALL (559) 663-0356]
Scroll indicator at bottom
```

**Technical Implementation:**
- Use GSAP ScrollTrigger for the parallax phases
- Pin sections during scroll for cinematic feel
- Preload hero image with `<link rel="preload">` for LCP optimization
- Video background option: if a video is provided, use `<video>` with poster frame fallback
- Mobile: no parallax (performance), use simple fade transitions instead

#### 3.1.3 "The Experience" Section — Feature Showcase

Overline: `WHAT SETS US APART`  
Headline: `More Than a Restroom. An Experience.`

**Layout:** 2-column grid on desktop, stacked on mobile. Left side: large image (interior shot). Right side: feature list with icons.

**Features (confirmed real):**
1. **Separate Entrances** — "Dedicated men's and women's entrances for privacy and flow" + icon
2. **Climate Controlled** — "Air conditioning and heating for year-round comfort" + icon  
3. **Flushing Toilets & Running Water** — "Real plumbing, not chemicals. Running water sinks." + icon
4. **LED Mirrors & Lighting** — "Soft, flattering LED lighting throughout" + icon
5. **Bluetooth Sound System** — "Set the mood with your own playlist" + icon

**Animation:** Icons are Lottie-style or CSS animated — each animates in when scrolled into view (staggered). Feature text fades up alongside.

**CTA at bottom:** `See the full experience →` (links to gallery)

#### 3.1.4 "How It Works" Section — 3-Step Process

Overline: `SIMPLE & SEAMLESS`  
Headline: `From Quote to Setup in Three Steps`

```
[1. GET YOUR QUOTE]          [2. WE DELIVER & SET UP]       [3. ENJOY YOUR EVENT]
Gold number "01"              Gold number "02"                Gold number "03"
Icon: calculator              Icon: truck                     Icon: party/champagne
"Use our instant quote        "We handle everything —         "Focus on your guests.
calculator or call us.        delivery, setup, stocking,      We handle the rest.
No obligation."               and pickup."                    Spotless guaranteed."
```

**Layout:** Horizontal on desktop (connected by a thin gold line), vertical on mobile
**Animation:** Steps reveal one-by-one as user scrolls, connected line "draws" between them

#### 3.1.5 Social Proof / Trust Section

**Option A: Stats Bar** (horizontal strip, light background for contrast break)
```
┌──────────────────────────────────────────────────────────┐
│  🎖️ VETERAN     📍 FREE DELIVERY     ⭐ 5.0 RATED       │  
│    OWNED         WITHIN 50 MI         EVERY EVENT        │
│                                                           │
│  🎪 250+         ❄️ CLIMATE          🚿 RUNNING          │
│    EVENTS         CONTROLLED          WATER              │
└──────────────────────────────────────────────────────────┘
```
Numbers animate (count up from 0) when scrolled into view.

**Option B: Testimonial Carousel** (below stats bar)
- Dark background, cream/gold text
- Large quotation mark in gold (decorative)
- Testimonial text in `--font-accent` (Cormorant Garamond), italic, large
- Client name, event type, city below
- Auto-rotates every 6 seconds, manual arrows
- **IMPORTANT:** Replace current generic testimonials with real ones as soon as possible. Include note: "Placeholder testimonials — replace with real client quotes and photos from actual events"

#### 3.1.6 Event Types Grid

Overline: `PERFECT FOR EVERY OCCASION`  
Headline: `Your Event, Elevated`

**Layout:** Grid of 5 cards, each linking to its dedicated event landing page.

```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  [Wedding img]  │ │ [Corporate img] │ │ [Birthday img]  │
│                 │ │                 │ │                 │
│   WEDDINGS      │ │   CORPORATE     │ │   BIRTHDAYS &   │
│                 │ │   EVENTS        │ │   GRADUATIONS   │
│   Learn More →  │ │   Learn More →  │ │   Learn More →  │
└─────────────────┘ └─────────────────┘ └─────────────────┘
      ┌─────────────────┐ ┌─────────────────┐
      │ [Festival img]  │ │ [Quinceañera]   │
      │                 │ │                 │
      │   FESTIVALS &   │ │  QUINCEAÑERAS   │
      │   CONCERTS      │ │  & CULTURAL     │
      │   Learn More →  │ │   Learn More →  │
      └─────────────────┘ └─────────────────┘
```

- Each card: dark background, full-bleed image with dark gradient overlay from bottom
- Event type name in white Playfair Display
- Hover: image zooms slightly, gold border appears, overlay lightens
- Mobile: horizontal scroll carousel or 2-column grid
- **Image note:** Use stock images initially for event types (wedding venue, corporate setting, etc.), replace with real event photos over time. Add `/* TODO: Replace with real event photos */` comments.

#### 3.1.7 Service Area Section

Overline: `PROUDLY SERVING CENTRAL CALIFORNIA`  
Headline: `Based in Fresno. Available Throughout the Valley.`

- **Interactive map:** Embed a styled Google Map (dark theme) showing the 150-mile service radius from Fresno
- **Or:** Custom SVG map of Central California with cities highlighted in gold dots
- **City list:** Fresno, Clovis, Visalia, Bakersfield, Merced, Modesto, Madera, Hanford, Tulare, Porterville, Stockton, Lemoore
- **CTA:** "Don't see your city? We probably serve your area. [Contact us →]"
- **Note:** "Free delivery within 50 miles of Fresno"

#### 3.1.8 Final CTA Section

Full-width, dark background with subtle gold gradient overlay.

```
Overline: READY TO ELEVATE YOUR EVENT?
Headline: Get Your Instant Quote
Subtext: Free, no-obligation estimate in under 60 seconds.

[GET YOUR FREE QUOTE →]        [CALL (559) 663-0356]

Small: "Veteran-owned • Free delivery within 50 miles"
```

#### 3.1.9 Footer (Global Component)

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo]                                                       │
│ Luxury bathroom trailer rentals for weddings, corporate      │
│ events, and special occasions in Fresno and Central CA.      │
│ 🎖️ Veteran-Owned Business                                   │
│                                                              │
│ QUICK LINKS        EVENTS             CONTACT                │
│ Home               Weddings           (559) 663-0356         │
│ About              Corporate          upscaleouthouse@gmail  │
│ Gallery            Birthdays          Fresno, California     │
│ Quote              Festivals                                 │
│ FAQ                Quinceañeras       FOLLOW US              │
│ Blog                                  IG  FB  TT             │
│                                                              │
│ ─── gold divider line ───                                    │
│ © 2026 Upscale Outhouse. All rights reserved.                │
│ Privacy Policy | Terms of Service          [ES | EN]         │
└─────────────────────────────────────────────────────────────┘
```

- Social icons: Instagram (linked), Facebook (placeholder URL), TikTok (placeholder URL), Google Business (once set up)
- **Schema markup:** LocalBusiness JSON-LD in footer (see SEO section)

---

### 3.2 ABOUT PAGE (`/about`)

#### Header
Overline: `OUR STORY`  
Headline: `Built on Service. Driven by Excellence.`  
Subtext: `Veteran-owned and operated, bringing luxury and dignity to outdoor events throughout Central California.`

#### Content Sections

**Section 1: Origin Story**
- Two-column layout: Left = large photo (team photo or founder photo), Right = story text
- Copy direction: Founded by three friends from the Central Valley who saw a gap in the market. As veterans, they bring military-grade discipline and attention to detail to every rental. The mission: ensure event restrooms match the quality of the events they serve.
- Tone: Personal, warm, confident — not corporate

**Section 2: "Why We're Different" — Values Grid**
Three large cards:
1. **Military Precision** — "Every delivery is on time. Every trailer is spotless. Every detail is checked twice."
2. **Community Roots** — "Born and raised in the Central Valley. We know this community because we ARE this community."  
3. **No Compromises** — "We don't do 'good enough.' Our trailers feature real plumbing, real climate control, and real luxury."

**Section 3: By The Numbers** (animated counters)
```
[XXX+] Events Served  |  [5.0] Star Rating  |  [150] Mile Service Radius  |  [250+] Guest Capacity
```

**Section 4: Meet the Team** (optional, if photos available)
- Simple grid of headshots with name + role
- If no team photos available yet, skip this section entirely — don't use stock photos for team members

**Section 5: CTA**
Same final CTA block as homepage.

---

### 3.3 GALLERY PAGE (`/gallery`)

This page must feel like walking through a luxury hotel's portfolio. NOT a basic grid of thumbnails.

#### Header
Overline: `SEE FOR YOURSELF`  
Headline: `The Upscale Outhouse Experience`  
Subtext: `Every detail designed for your guests' comfort.`

#### Filter Tabs
```
[ALL]  [EXTERIOR]  [INTERIOR]  [EVENTS]  [FLOORPLAN]
```
Gold underline on active tab. Framer Motion `layoutId` for smooth tab indicator animation.

#### Gallery Grid
- Masonry-style layout (varied image sizes for visual interest)
- Each image: dark card with subtle border, caption below (location, event type, date)
- Click/tap opens full-screen lightbox with:
  - Swipe navigation between images
  - Pinch-to-zoom on mobile
  - Caption overlay at bottom
  - Close button (X) top-right
  - Keyboard navigation (left/right arrows, Escape to close)

#### Video Section
Below the photo grid:
```
Overline: TAKE A TOUR
Headline: Walk Through Our Luxury Trailer
[Embedded video player — YouTube or self-hosted]
```
- Custom video player skin (dark with gold controls) if self-hosted
- If YouTube, use `lite-youtube-embed` package for performance (doesn't load YouTube iframe until clicked)
- Space for 2-3 videos

#### Three.js 3D Model Section (Future Enhancement)
```
Overline: EXPLORE IN 3D
Headline: Interactive Trailer Tour
[3D model viewer — rotate, zoom, click hotspots]
```

**Implementation approach:**
- **Phase 1 (launch):** Show a premium placeholder — a slowly auto-rotating carousel of exterior photos with a "3D Tour Coming Soon" badge
- **Phase 2 (post-launch):** Commission a 3D model from photos using a service like Matterport, Sketchfab, or a freelance 3D modeler. Integrate with `@react-three/fiber` and `@react-three/drei`
- **Desktop:** Full interactive 3D (rotate with mouse, scroll to zoom, click doors to "open" and see interior)
- **Mobile:** Swipeable 360° photo carousel (graceful degradation — same wow, zero lag)

**Three.js Technical Notes:**
```
Dependencies: 
  - three (r128 or compatible)
  - @react-three/fiber
  - @react-three/drei (for OrbitControls, Environment, etc.)
  
Performance:
  - Lazy-load entire Three.js bundle (dynamic import)
  - Show loading skeleton with gold shimmer while loading
  - Cap at 30fps on mobile to save battery
  - Use compressed glTF/GLB format for the 3D model
  - Texture resolution: 2048x2048 max (1024x1024 on mobile)
  - Enable frustum culling and LOD (Level of Detail)
```

---

### 3.4 INTERACTIVE QUOTE CALCULATOR (`/quote`)

This is the conversion centerpiece. It must feel like configuring a luxury product, not filling out a form.

#### UX Flow

```
STEP 1: Event Details
  → Event type selector (cards with icons, not a dropdown)
  → Guest count slider (animated, gold handle, shows recommendation text)
  → Event duration (single day / multi-day toggle + day count)

STEP 2: Date & Location  
  → Custom calendar component (dark theme, gold accents)
     → Shows real-time availability (green = available, red = booked)
     → Blocked dates pulled from backend/Google Calendar
  → Location input with Google Places autocomplete
  → Auto-calculates distance from Fresno and delivery fee

STEP 3: Your Information (LEAD GATE)
  → Name (required)
  → Email (required)  
  → Phone (required)
  → "How did you hear about us?" (optional dropdown)
  → Privacy notice: "We'll never spam you. Your info is used only for this quote."

STEP 4: Your Quote
  → Animated reveal of pricing breakdown:
     Base rental: $XXX
     Delivery fee: $XX (XX miles from Fresno)
     Duration: X days × $XX/day
     ──────────────
     Estimated total: $XXX - $XXX
  → "This is an estimate. Final pricing confirmed upon booking."
  → [CONFIRM BOOKING REQUEST →] button
  → [CALL TO DISCUSS →] secondary button
```

#### Visual Design
- Each step gets its own "slide" with Framer Motion page transitions
- Gold progress bar at top showing Step 1/2/3/4
- Dark background, gold accents on interactive elements
- Guest count slider: large, tactile, gold handle, number displays big above it
- Calendar: custom-built, dark theme, today highlighted, available dates in green, booked in red with line-through
- Price reveal: numbers "count up" from $0 to final price with easing

#### Technical Implementation

```typescript
// Pricing logic (pseudocode — replace with actual rates from dad)
interface PricingConfig {
  baseRate: number;              // e.g., $750 per day
  perMileRate: number;           // e.g., $3 per mile beyond 50 miles
  freeDeliveryRadius: number;    // 50 miles
  multiDayDiscount: number;      // e.g., 15% off per additional day
  eventTypeMultiplier: {         // adjust base rate by event type
    wedding: 1.0,
    corporate: 1.0,
    birthday: 0.9,
    festival: 1.1,
    quinceanera: 1.0,
  };
}

// Distance calculation
// Use Google Maps Distance Matrix API or Haversine formula
// Origin: Fresno, CA (36.7378, -119.7871)

// Availability
// Option A: Google Calendar API integration (recommended)
// Option B: Simple JSON file with blocked dates (MVP approach)
// Option C: Supabase/Firebase database for real-time availability
```

#### Backend Requirements
- **API Route:** `/api/quote` — receives form data, calculates price, sends notification
- **Email notification:** Send admin email + SMS when new quote submitted (use Resend or SendGrid for email, Twilio for SMS)
- **CRM integration:** Store lead in a simple database (Supabase recommended for free tier + real-time) or integrate with HubSpot/Pipedrive free CRM
- **Lead data to store:** name, email, phone, event type, date, guest count, location, distance, calculated price, timestamp, source ("How did you hear about us?")

---

### 3.5 CONTACT PAGE (`/contact`)

#### Header
Overline: `GET IN TOUCH`  
Headline: `Let's Make Your Event Unforgettable`

#### Layout: Two-column

**Left column — Contact Methods:**
```
📞 CALL US
(559) 663-0356
Tap to call • Available 7 days a week

📧 EMAIL US  
upscaleouthouse@gmail.com
We respond within 2 hours

📍 BASED IN
Fresno, California
Serving the entire Central Valley

📸 FOLLOW US
Instagram: @upscale_outhouse
Facebook: [placeholder]
TikTok: [placeholder]
```

**Right column — Contact Form:**
```
Name *
Email *
Phone *
Event Type (dropdown)
Event Date (date picker)
Message
[SEND MESSAGE →]
```

- Form submits to same `/api/contact` route
- Triggers admin email + SMS notification
- Success state: gold checkmark animation + "We'll be in touch within 2 hours!"

#### Below: Embedded Google Map
- Dark-themed Google Map (use Snazzy Maps dark style)
- Centered on Fresno with 150-mile radius circle overlay
- Custom gold map marker on Fresno

---

### 3.6 EVENT LANDING PAGES (`/events/[type]`)

Each event page is a standalone landing page optimized for its specific SEO keywords. They share a template but have UNIQUE content, imagery, and copy.

#### Template Structure

```
[Hero — full-width image relevant to event type]
  Overline: LUXURY RESTROOMS FOR [EVENT TYPE]
  Headline: [Unique headline per event type]
  Subtext: [Unique subtext]
  [GET YOUR QUOTE →]

[Why section — unique to each event type]
  3-4 reasons why luxury restrooms matter for THIS specific event type

[Feature highlights — same across all, but reframed for context]
  Climate control, running water, etc. — but explained in context of the event

[Social proof — testimonials specific to this event type]
  Filter testimonials by event type

[Photo gallery — filtered to this event type]
  3-6 photos from this type of event (if available)

[FAQ — unique to event type]
  4-6 questions specific to this event type

[CTA — same structure, unique headline]
  "Ready to book for your [event type]?"
  [GET YOUR QUOTE →]
```

#### Per-Page Content Direction

**`/events/weddings`**
- SEO keywords: "luxury restroom trailer wedding Fresno," "wedding bathroom rental Central California," "portable restroom wedding venue"
- Headline: "Your Wedding Deserves Better Than a Porta Potty"
- Angle: Focus on guest experience, matching the elegance of the venue, photo-worthy facilities
- Unique FAQ: "Can the trailer be decorated to match my wedding theme?" "How far from the reception should the trailer be placed?" "Do you offer bridal suite features?"

**`/events/corporate`**
- SEO keywords: "corporate event restroom rental Fresno," "luxury portable bathroom corporate event," "business event restroom trailer"
- Headline: "Professional Facilities for Professional Events"
- Angle: Reflect company standards, impress clients and VIPs, no detail overlooked
- Unique FAQ: "Can you accommodate multi-day corporate retreats?" "Do you offer branding/signage on the trailer?"

**`/events/birthday-graduation`**
- SEO keywords: "party bathroom rental Fresno," "birthday party portable restroom," "graduation party restroom trailer"
- Headline: "Make Your Celebration Truly Complete"
- Angle: Backyard parties deserve nice facilities, surprise and delight guests, make hosting stress-free
- Unique FAQ: "Is the trailer suitable for a backyard?" "What if I have a smaller gathering?"

**`/events/festivals`**
- SEO keywords: "festival restroom trailer rental," "concert portable bathroom Central California," "event restroom trailer festivals"
- Headline: "Festival-Ready. Crowd-Proven. Always Clean."
- Angle: High-capacity, durability, VIP experience at outdoor events
- Unique FAQ: "How many guests can one trailer serve at a festival?" "Do you provide attendant service for multi-day events?"

**`/events/quinceanera`**
- SEO keywords: "quinceañera bathroom rental Fresno," "luxury restroom quinceañera," "baño portátil de lujo quinceañera"
- Headline: "Celebra con Elegancia" / "Celebrate in Elegance"
- Angle: This is a milestone celebration that deserves premium facilities, bilingual content on this page especially
- **IMPORTANT:** This page should have FULL Spanish translation toggle more prominently featured, and default Spanish-language SEO content as well for bilingual indexing
- Unique FAQ: "¿El tráiler tiene capacidad para fiestas grandes?" / "Do you serve large parties?" etc.

---

### 3.7 FAQ PAGE (`/faq`)

#### Header
Overline: `COMMON QUESTIONS`  
Headline: `Everything You Need to Know`

#### Accordion Layout
- Categories: General, Booking & Pricing, Delivery & Setup, The Trailer, Events
- Each question is an expandable accordion with smooth height animation
- Gold "+" icon rotates to "×" when expanded
- **Schema markup:** Every Q&A pair wrapped in FAQPage schema (see SEO section)

#### Questions to Include
(Carry over existing FAQs from current site + add new ones)

**General:**
- What is a luxury restroom trailer?
- How is this different from a porta potty?
- Is Upscale Outhouse veteran-owned?
- What areas do you serve?

**Booking & Pricing:**
- How far in advance should I book?
- What is included in the rental price?
- What is the cancellation policy?
- Is the $100 deposit refundable?
- Do you offer multi-day discounts?

**Delivery & Setup:**
- Do I need a water hookup?
- Do I need a power source?
- How much space is needed?
- How long does setup take?
- Is delivery really free within 50 miles?

**The Trailer:**
- How many guests can it accommodate?
- Is it climate controlled?
- Does it have running water?
- Is there a sound system?
- Are there separate men's and women's sections?

**Events:**
- Is the trailer suitable for weddings?
- Can it handle corporate events?
- Do you serve festivals and large events?
- Can the trailer be placed on grass/dirt?

---

### 3.8 BLOG (`/blog` and `/blog/[slug]`)

#### Blog Index Page
- Grid of blog post cards (image, title, excerpt, date, read time)
- Category filters: Tips, Events, Behind the Scenes, Industry
- Pagination (10 posts per page)

#### Blog Post Template
- Full-width hero image
- Title (H1), date, read time, category
- Rich content area (MDX or CMS-powered)
- Author bio at bottom
- Related posts section
- CTA banner mid-article and at end: "Planning an event? Get your instant quote →"

#### Initial Blog Post Ideas (SEO Content Strategy)
Write these posts to target long-tail keywords:

1. **"Luxury Restroom Trailer vs. Porta Potty: What's the Real Difference?"**
   - Target: "luxury restroom vs porta potty," "fancy portable bathroom"
   
2. **"How Many Portable Restrooms Do I Need for My Wedding?"**
   - Target: "how many portable restrooms wedding," "wedding bathroom calculator"

3. **"The Complete Guide to Outdoor Wedding Planning in Central California"**
   - Target: "outdoor wedding Fresno," "wedding venues Central Valley"

4. **"What to Expect When You Rent a Luxury Restroom Trailer"**
   - Target: "luxury restroom trailer rental experience," "what is a restroom trailer"

5. **"5 Things Event Planners Forget (And How to Avoid Them)"**
   - Target: "event planning checklist," "event planner tips restroom"

6. **"Why Veteran-Owned Businesses Deliver Better Service"**
   - Target: "veteran-owned business," "veteran event services"

7. **"Quinceañera Planning Guide: Everything You Need for the Perfect Celebration"**
   - Target: "quinceañera planning guide Fresno," "quinceañera checklist"

8. **"Festival Season Is Coming: How to Keep Your Guests Comfortable"**
   - Target: "festival restroom rental," "outdoor event comfort tips"

#### Blog CMS Recommendation
- **Option A (simple):** MDX files in the repo — write posts as Markdown, no external CMS needed
- **Option B (non-technical friendly):** Integrate Contentful, Sanity, or Notion as a headless CMS so your dad can write posts without touching code
- **Recommendation:** Start with MDX, migrate to a CMS later if needed

---

## 4. SEO Strategy

### 4.1 Technical SEO

#### Meta Tags (per page)
Every page must have unique, keyword-optimized:
- `<title>` — max 60 characters, primary keyword first
- `<meta name="description">` — max 155 characters, include CTA language
- `<meta name="keywords">` — include 5-8 relevant keywords
- Open Graph tags (og:title, og:description, og:image) for social sharing
- Twitter Card tags

**Example for homepage:**
```html
<title>Luxury Restroom Trailer Rental Fresno CA | Upscale Outhouse</title>
<meta name="description" content="Premium luxury bathroom trailer rental for weddings, corporate events & parties in Fresno & Central California. Veteran-owned. Free delivery within 50 miles. Get an instant quote." />
```

**Example for weddings page:**
```html
<title>Wedding Restroom Trailer Rental Fresno | Luxury Portable Bathroom | Upscale Outhouse</title>
<meta name="description" content="Elevate your wedding with a luxury restroom trailer. Climate-controlled, running water, LED lighting. Serving Fresno, Clovis, Visalia & Central CA. Free quote." />
```

#### Schema Markup (JSON-LD)

**LocalBusiness Schema (every page, in layout):**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Upscale Outhouse",
  "description": "Luxury portable restroom trailer rentals for weddings, corporate events, and special occasions in Fresno and Central California.",
  "url": "https://www.upscaleouthouse.com",
  "telephone": "+15596630356",
  "email": "upscaleouthouse@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Fresno",
    "addressRegion": "CA",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 36.7378,
    "longitude": -119.7871
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 36.7378,
      "longitude": -119.7871
    },
    "geoRadius": "241000"
  },
  "priceRange": "$$",
  "image": "https://www.upscaleouthouse.com/images/og-image.jpg",
  "sameAs": [
    "https://www.instagram.com/upscale_outhouse/"
  ],
  "openingHours": "Mo-Su 07:00-22:00",
  "founder": {
    "@type": "Person",
    "name": "[Founder Name]"
  },
  "award": "Veteran-Owned Business"
}
```

**FAQPage Schema (on FAQ page):**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How many guests can the luxury trailer accommodate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our luxury trailer comfortably serves events with up to 250+ guests."
      }
    }
    // ... repeat for each FAQ
  ]
}
```

**Service Schema (on event landing pages):**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Luxury Restroom Trailer Rental",
  "provider": { "@type": "LocalBusiness", "name": "Upscale Outhouse" },
  "areaServed": "Central California",
  "description": "Premium luxury portable restroom trailer rental for weddings..."
}
```

### 4.2 Image SEO
- Every image: descriptive `alt` text with keywords
- File naming convention: `luxury-restroom-trailer-wedding-fresno-01.webp`
- Use Next.js `<Image>` component for automatic optimization
- Generate WebP format, serve with `srcset` for responsive sizes
- Include image metadata (title, description) for Google Image Search indexing

### 4.3 Performance SEO (Core Web Vitals)
- **LCP target:** < 2.5 seconds (preload hero image, optimize fonts)
- **FID target:** < 100ms (minimize JavaScript, code-split aggressively)
- **CLS target:** < 0.1 (set explicit dimensions on all images/videos, reserve space for dynamic content)
- **Font loading:** Use `font-display: swap` and preload critical fonts
- **Image loading:** Lazy-load everything below the fold, blur-up placeholders
- **JS bundle:** Code-split Three.js (dynamic import), tree-shake Framer Motion

### 4.4 Sitemap & Robots
- Auto-generate `sitemap.xml` with `next-sitemap` package
- Include all pages, blog posts, event landing pages
- Submit to Google Search Console
- `robots.txt`: Allow all crawlers, disallow `/api/` routes

### 4.5 Google Business Profile Setup Guide
**This is NOT part of the website build but is CRITICAL for local SEO. Include this as a separate action item:**

1. Go to google.com/business and claim "Upscale Outhouse"
2. Set category: "Portable Toilet Supplier" + "Party Equipment Rental Service"
3. Add business description with keywords
4. Upload 10+ high-quality photos (interior, exterior, at events)
5. Set service area (150-mile radius from Fresno)
6. Add all services offered
7. Request reviews from every past client
8. Post weekly updates (Google Business Posts)
9. Respond to every review within 24 hours
10. Add FAQ directly to the profile

---

## 5. Technical Architecture

### 5.1 Next.js App Structure

```
/app
  /layout.tsx                    # Root layout (header, footer, fonts, analytics)
  /page.tsx                      # Homepage
  /about/page.tsx                # About page
  /gallery/page.tsx              # Gallery page
  /quote/page.tsx                # Quote calculator
  /contact/page.tsx              # Contact page
  /faq/page.tsx                  # FAQ page
  /blog/page.tsx                 # Blog index
  /blog/[slug]/page.tsx          # Blog post
  /events
    /weddings/page.tsx
    /corporate/page.tsx
    /birthday-graduation/page.tsx
    /festivals/page.tsx
    /quinceanera/page.tsx
  /privacy/page.tsx
  /terms/page.tsx
  /api
    /quote/route.ts              # Quote submission + price calculation
    /contact/route.ts            # Contact form submission
    /availability/route.ts       # Calendar availability check
    /send-notification/route.ts  # Admin email/SMS notification
  /globals.css                   # CSS variables, reset, global styles
  /components
    /layout
      Header.tsx
      Footer.tsx
      MobileMenu.tsx
      LanguageToggle.tsx
    /ui
      Button.tsx
      Card.tsx
      SectionDivider.tsx
      GoldShimmer.tsx
      AnimatedCounter.tsx
      Accordion.tsx
      Lightbox.tsx
    /home
      HeroParallax.tsx
      FeatureShowcase.tsx
      HowItWorks.tsx
      TestimonialCarousel.tsx
      EventTypesGrid.tsx
      ServiceAreaMap.tsx
    /quote
      QuoteWizard.tsx
      EventTypeSelector.tsx
      GuestCountSlider.tsx
      DurationSelector.tsx
      AvailabilityCalendar.tsx
      LocationInput.tsx
      PriceReveal.tsx
    /gallery
      GalleryGrid.tsx
      FilterTabs.tsx
      VideoPlayer.tsx
      ThreeDViewer.tsx           # Lazy-loaded Three.js component
    /seo
      JsonLd.tsx                 # Renders schema markup
      MetaTags.tsx
  /lib
    /pricing.ts                  # Pricing calculation logic
    /distance.ts                 # Haversine distance calculation
    /notifications.ts            # Email + SMS sending logic
    /translations.ts             # i18n translation strings
  /content
    /blog                        # MDX blog posts
    /translations
      /en.json                   # English strings
      /es.json                   # Spanish strings
  /public
    /images
      /gallery                   # Trailer photos
      /events                    # Event-type images
      /icons                     # Custom SVG icons
      /og                        # Open Graph social images
    /fonts                       # Self-hosted font files (if not using Google Fonts CDN)
    /models                      # 3D model files (GLB/glTF)
```

### 5.2 Key Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "framer-motion": "^11.0.0",
    "gsap": "^3.12.0",
    "@react-three/fiber": "^8.0.0",
    "@react-three/drei": "^9.0.0",
    "three": "^0.160.0",
    "next-intl": "^3.0.0",
    "resend": "^3.0.0",
    "@supabase/supabase-js": "^2.0.0",
    "next-sitemap": "^4.0.0",
    "sharp": "^0.33.0",
    "embla-carousel-react": "^8.0.0",
    "react-hook-form": "^7.0.0",
    "zod": "^3.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

### 5.3 Spanish Translation Implementation

Use `next-intl` for internationalization:

- Default locale: `en`
- Supported locales: `en`, `es`
- URL strategy: Same URLs with language toggle (no `/es/` prefix — keeps SEO simpler)
- Store selected language in cookie
- Translation files: `/content/translations/en.json` and `/content/translations/es.json`
- **Quinceañera page:** Should have SEO-optimized Spanish meta tags in addition to English
- **Priority:** Translate all UI elements, navigation, CTAs, and key selling copy. Blog posts remain English-only initially.

### 5.4 CRM & Notification Integration

**Lead flow:**
```
User submits quote form
  → API route validates data (Zod schema)
  → Calculate price (pricing.ts)
  → Store lead in Supabase
  → Send admin email notification (Resend)
  → Send admin SMS notification (Twilio)
  → Return price estimate to frontend
  → Show success animation
```

**Supabase Table: `leads`**
```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_date DATE,
  event_end_date DATE,
  guest_count TEXT,
  duration_days INTEGER,
  location TEXT,
  distance_miles NUMERIC,
  estimated_price_low NUMERIC,
  estimated_price_high NUMERIC,
  source TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.5 Availability Calendar

**Recommended approach:** Google Calendar API integration
- Your dad manages availability through his existing Google Calendar
- Mark booked dates on Google Calendar
- API route `/api/availability` fetches events from Google Calendar
- Frontend calendar component shows green (available) and red (booked)
- Cache results for 15 minutes (ISR or in-memory) to reduce API calls

**Fallback:** If Google Calendar integration is too complex for MVP, use a simple JSON file or Supabase table with blocked dates that can be manually updated.

---

## 6. Performance Budget

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 2.5s | Preload hero image, optimize fonts, use `next/image` |
| FID | < 100ms | Code-split Three.js, minimize main bundle |
| CLS | < 0.1 | Explicit image dimensions, font-display: swap |
| Total JS bundle | < 200KB (initial) | Dynamic imports, tree-shaking |
| Hero image | < 200KB | WebP, responsive srcset, blur placeholder |
| Three.js chunk | < 500KB | Lazy-loaded, only on gallery page |
| Font files | < 100KB total | Subset fonts, woff2 format |
| Time to Interactive | < 3.5s | Defer non-critical JS |
| Lighthouse Score | > 90 (all categories) | Follow all above strategies |

---

## 7. Mobile-First Design Rules

Since 70%+ of traffic will be mobile:

1. **Design mobile FIRST, then scale up to desktop** — every component starts as a mobile wireframe
2. **Touch targets:** Minimum 44x44px for all interactive elements
3. **Thumb zone:** Primary CTAs in the bottom 60% of the screen
4. **No hover-only interactions** — everything must work with tap
5. **Sticky mobile CTA bar:** At bottom of screen on mobile: `[CALL]  [GET QUOTE]` — always accessible
6. **Font sizes:** Never below 16px for body text (prevents iOS zoom)
7. **Images:** Serve smaller sizes on mobile via `srcset`
8. **Three.js → Photo carousel** on mobile (graceful degradation)
9. **Parallax → Simple fade** on mobile (performance)
10. **Form inputs:** Use appropriate `inputmode` attributes (`tel`, `email`, `numeric`)
11. **Test on:** iPhone SE (smallest), iPhone 15 Pro Max (largest), Samsung Galaxy S24, iPad

---

## 8. Accessibility (ADA Compliance)

- Semantic HTML throughout (proper heading hierarchy, landmarks, nav, main, footer)
- ARIA labels on all interactive elements
- Keyboard navigation for all features (tab order, focus styles, escape to close modals)
- Color contrast: minimum 4.5:1 ratio for text (gold on dark meets this)
- Alt text on every image
- Skip-to-content link
- Focus visible styles (gold outline)
- Reduced motion: respect `prefers-reduced-motion` media query — disable all animations
- Screen reader announcements for dynamic content (quote calculator steps, form validation)

---

## 9. Security

- HTTPS enforced (Vercel handles this)
- CSP headers (Content Security Policy)
- Rate limiting on API routes (prevent spam submissions)
- Honeypot field on forms (invisible field — if filled, it's a bot)
- reCAPTCHA v3 on quote and contact forms (invisible, no user friction)
- Input sanitization on all form fields
- Environment variables for all API keys (never client-side)
- CORS configured for API routes

---

## 10. Analytics & Tracking

**Google Analytics 4:**
- Track page views, scroll depth, button clicks
- Custom events: "quote_started," "quote_completed," "phone_call_clicked," "gallery_viewed"
- Conversion tracking: quote form submissions as primary conversion
- Set up Google Search Console and link to GA4

**Event tracking to implement:**
```
- hero_cta_clicked (which CTA)
- quote_step_completed (step number)
- quote_submitted (with event type, guest count)
- phone_number_clicked (from which page)
- gallery_image_viewed (image name)
- gallery_video_played
- event_page_viewed (which event type)
- language_toggled (en/es)
- blog_post_read (post slug, scroll depth)
- faq_expanded (question text)
```

---

## 11. Pre-Launch Checklist

- [ ] All pages built and responsive (mobile + tablet + desktop)
- [ ] All images optimized (WebP, srcset, alt text, lazy loading)
- [ ] Quote calculator functional with real pricing
- [ ] Contact form functional with email/SMS notifications
- [ ] Calendar showing real availability
- [ ] Schema markup validated (Google Rich Results Test)
- [ ] Sitemap generated and submitted to Google Search Console
- [ ] Google Analytics 4 installed and events tracking
- [ ] Lighthouse scores > 90 all categories
- [ ] Spanish translation toggle functional
- [ ] All social links working (Instagram live, FB/TikTok placeholder)
- [ ] reCAPTCHA configured
- [ ] Favicon and OG images set
- [ ] 404 page designed (on-brand, with CTA back to homepage)
- [ ] Google Business Profile created and optimized (separate task)
- [ ] Robots.txt configured
- [ ] All placeholder content clearly marked with TODO comments
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Form validation working (client + server side)
- [ ] Error states designed for all forms
- [ ] Loading states designed for all async operations

---

## 12. Post-Launch Roadmap

### Month 1: Content
- [ ] Publish 4 blog posts (target long-tail SEO keywords)
- [ ] Collect and add real client testimonials with photos
- [ ] Replace stock/placeholder event images with real event photos
- [ ] Set up and optimize Google Business Profile
- [ ] Request reviews from all past clients

### Month 2: Enhancement
- [ ] Commission 3D trailer model for Three.js viewer
- [ ] Add video testimonials from clients
- [ ] Build out service area pages for top cities (Bakersfield, Visalia, Merced, Modesto) if SEO data supports it
- [ ] A/B test quote calculator flow (test different lead gates)
- [ ] Set up Google Ads campaign (if budget allows)

### Month 3: Growth
- [ ] Publish 4 more blog posts
- [ ] Integrate with wedding directories (The Knot, WeddingWire)
- [ ] Add more event photos to gallery as events happen
- [ ] Review analytics data and optimize underperforming pages
- [ ] Consider adding live chat widget if lead volume justifies it
- [ ] Expand fleet section when second trailer is acquired (add fleet/models page)

---

## 13. Competitor Advantages This Plan Creates

| Feature | Upscale Outhouse (New) | Royal Restrooms | Privy Chambers | Showbiz Restrooms |
|---------|----------------------|-----------------|----------------|-------------------|
| Interactive quote calculator | ✅ Instant pricing | ❌ Form only | ❌ Form only | ❌ Form only |
| 3D trailer tour | ✅ Three.js | ❌ | ❌ | ❌ |
| Event-type landing pages | ✅ 5 pages | ✅ | ❌ | ✅ |
| Spanish translation | ✅ Full toggle | ❌ | ❌ | ❌ |
| Real-time availability | ✅ Calendar | ❌ | ❌ | ❌ |
| FAQ schema markup | ✅ | ❌ | ❌ | ❌ |
| Blog content engine | ✅ | ❌ | ❌ | ❌ |
| Parallax hero experience | ✅ GSAP + Framer | ❌ | ❌ | ❌ |
| Mobile-first design | ✅ | Partial | Partial | Partial |
| Lead capture + CRM | ✅ Supabase + Twilio | Unknown | Unknown | Unknown |

---

## 14. Copy Style Guide

### Voice & Tone
- **Confident, not arrogant:** "We deliver excellence" not "We're the best in the world"
- **Warm, not corporate:** "Let's make your event unforgettable" not "Contact our team for service inquiries"
- **Specific, not vague:** "Flushing toilets with running water" not "Premium amenities"
- **Veteran pride, not military jargon:** "Military precision and attention to detail" not "HOOAH we're operators"

### Words to USE
- Luxury, premium, elegant, upscale, elevated
- Experience, comfort, sophistication
- Spotless, immaculate, pristine
- Seamless, effortless, stress-free
- Veteran-owned, proudly serving

### Words to AVOID
- Porta potty (except in SEO context: "not a porta potty")
- Cheap, affordable, budget (this is a luxury brand)
- Toilet (use "restroom" or "facilities")
- Outhouse (except in brand name — the name is ironic/clever, don't lean into it literally)
- Basic, standard, regular

---

*End of Redesign Plan — v1.0*
*Created for Upscale Outhouse by Claude Opus 4.6*
*Hand this document to Claude Code in VS Code for implementation.*
