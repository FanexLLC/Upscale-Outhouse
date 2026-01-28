UPSCALE OUTHOUSE SITEWIDE PAGE POLISH PLAN
Purpose
Apply the same premium, consistent design system to every page (not just the home page). Work one task at a time. After each task: run locally, visually verify at 390px, 768px, 1280px, then commit.

How to use this file with Claude
- Only run ONE task at a time.
- Copy the “CLAUDE PROMPT” for the current task into Claude.
- Claude must stop after finishing that single task.

Operating rules for Claude
- Do not change brand colors unless a task explicitly says so.
- Use the same spacing/typography rules across pages.
- Avoid large refactors. Prefer small, safe edits.
- Keep routing and content meaning the same.
- Keep accessibility basics: focus states, headings, labels, alt text.
- After each task, output:
  1) Files changed
  2) Manual tests
  3) Diff style summary
  4) Next step reminder

Definition of done for every task
- Builds without errors
- Looks good on mobile, tablet, desktop
- No broken layout or overflow
- Commit created

GLOBAL DESIGN STANDARDS (APPLY EVERYWHERE)
Typography
- Use the sitewide Next Font already set in Task 01 from the homepage plan.
- Headings:
  - Page H1: text-4xl md:text-5xl font-extrabold tracking-tight
  - Section H2: text-3xl md:text-4xl font-bold
  - Section H3: text-xl font-semibold
- Body: text-base md:text-lg leading-relaxed
- Muted: text-charcoal/70 or text-cream/80 depending on background

Spacing
- Page top/bottom: py-24 for light pages, py-28 for dark pages
- Section spacing: mb-12 to mb-16 for intros
- Buttons height: py-4, consistent rounding (rounded-lg or rounded-2xl, pick one and stick with it)

Wrappers
- Use one wrapper everywhere:
  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

Card style (default)
- rounded-2xl
- p-8
- border border-charcoal/10 (on light) or border-gold/20 (on dark)
- shadow-md hover:shadow-lg transition

Form style (default)
- Inputs:
  - w-full
  - rounded-lg
  - border border-charcoal/20
  - px-4 py-3
  - focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
- Labels: text-sm font-medium
- Help text: text-sm text-charcoal/60
- Error text: text-sm text-red-600 (if you have errors)

Buttons
- Primary:
  bg-gold text-charcoal-dark hover:bg-gold-light shadow-lg hover:shadow-xl
- Secondary:
  border-2 border-charcoal/20 hover:bg-charcoal/5 (light pages)
  border-2 border-cream/80 hover:bg-cream hover:text-charcoal-dark (dark pages)
- Add focus-visible rings to all clickable buttons/links:
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2

PAGE INVENTORY (WHAT WE WILL POLISH)
This plan assumes you have these routes (adjust if your repo differs):
- /quote
- /gallery
- /about
- /contact
If you also have /services or /faq, apply the same pattern.

TASK LIST OVERVIEW (DO IN ORDER)
Task A01  Audit: list actual pages and their file paths (no code changes)
Task A02  Shared PageHeader component (title + subtitle + optional CTA)
Task A03  Shared Card + Section wrappers (optional, minimal)
Task Q01  Quote page: premium layout + form styling + trust sidebar
Task Q02  Quote page: validation UX polish (only if you already validate)
Task G01  Gallery page: responsive grid + consistent aspect ratios + lightbox polish (if present)
Task AB01 About page: hero + story sections + trust blocks + photos
Task C01  Contact page: layout + contact cards + map embed (optional)
Task S01  Sitewide: consistent link/button focus states + hover states
Task S02  Sitewide: remove any remaining inconsistent padding / widths
Task S03  Lighthouse pass: obvious performance wins

START HERE

TASK A01  Audit routes and file paths (NO CODE CHANGES)
Goal
Identify exactly which pages exist and where they live, so we target the right files.

Steps for Claude
1. Inspect the repository structure.
2. List all routes in the app router:
   - app/page.tsx (home)
   - app/quote/page.tsx
   - app/gallery/page.tsx
   - app/about/page.tsx
   - app/contact/page.tsx
   (or any other folders found)
3. For each page, note:
   - file path
   - main components imported (if obvious)
4. Output a short table:
   Route | File path | Key components

Definition of done
- A complete list of real pages and paths
- No code changes

TASK A01 CLAUDE PROMPT
Copy below into Claude:

Task A01 only. Audit the repo and list every page route and its file path (App Router). Do not edit any code.
Output: Route | File path | Key components used.

Stop after you output the audit.

END TASK A01 CLAUDE PROMPT

TASK A02  Create shared PageHeader component
Goal
Standardize the top of every page with a reusable header block.

Component spec
File: components/ui/PageHeader.tsx (or similar)
Props:
- title: string
- subtitle?: string
- variant?: "light" | "dark" (controls text colors)
- primaryCta?: { label: string; href: string }
- secondaryCta?: { label: string; href: string }

Layout
- Title and subtitle on left
- CTAs on right (desktop), stacked under on mobile
- Use consistent spacing and the wrapper class

Then apply it on:
- /quote
- /gallery
- /about
- /contact

Task A02 definition of done
- Component created
- At least two pages using it
- No visual regressions

TASK A02 CLAUDE PROMPT
Task A02 only: create a reusable PageHeader component and apply it to at least /quote and /gallery.

Requirements:
- Create components/ui/PageHeader.tsx with props title, subtitle, variant, primaryCta, secondaryCta
- Use consistent typography and spacing based on Global Design Standards
- Apply to /quote and /gallery pages
- Do not change page content besides moving the title/subtitle/CTAs into PageHeader
- Output files changed, diff summary, manual test checklist

Stop after Task A02.

END TASK A02 CLAUDE PROMPT

TASK Q01  Quote page premium layout + form styling
Goal
Make /quote look like a premium service quote page.

Layout
- Two column on desktop:
  Left: form
  Right: trust sidebar card
- One column on mobile

Trust sidebar content
- Veteran-owned
- Free delivery within 50 miles
- Climate controlled
- Hot/cold running water
- Fast response

Form styling
- Apply consistent input, label, and button styling
- Ensure spacing between fields is consistent (gap-4 or gap-6)
- Ensure submit button is prominent and full width on mobile

Task Q01 definition of done
- Form looks clean, consistent, and premium
- No broken submit behavior

TASK Q01 CLAUDE PROMPT
Task Q01 only: redesign /quote page layout and form styling to match premium standards.

Requirements:
- Two-column layout on desktop (form + trust sidebar card)
- One-column on mobile
- Apply consistent Tailwind form styles (inputs, labels, focus rings)
- Keep existing fields and submission logic unchanged
- Add a trust sidebar card with 4-5 bullet points
- Output files changed, diff summary, manual test checklist

Stop after Task Q01.

END TASK Q01 CLAUDE PROMPT

TASK G01  Gallery page: premium grid + consistency
Goal
Make /gallery feel like a luxury brand gallery.

Steps
- Use responsive grid:
  1 column mobile
  2 columns small screens
  3 columns desktop
- Enforce consistent aspect ratio per tile (example: aspect-[4/3] or aspect-video)
- Add subtle hover effects:
  scale-105, shadow increase, border highlight
- If lightbox exists, ensure it works and looks clean. If not, do not add one yet.

TASK G01 CLAUDE PROMPT
Task G01 only: improve /gallery page layout with a premium responsive grid and consistent image tiles.

Requirements:
- Replace any uneven layout with a consistent grid
- Enforce consistent aspect ratio per image tile
- Add subtle hover polish
- Do not add new dependencies
- Output files changed, diff summary, manual test checklist

Stop after Task G01.

END TASK G01 CLAUDE PROMPT

TASK AB01  About page: premium structure
Goal
Make /about read like a real business brand page.

Recommended sections
- PageHeader: About Upscale Outhouse
- Story: 2-column with photo
- What we believe: 3 cards (cleanliness, reliability, guest experience)
- What you get: short bullet list
- CTA block: Get a quote and phone

TASK AB01 CLAUDE PROMPT
Task AB01 only (About page): restructure /about into premium sections using existing copy.

Requirements:
- Use PageHeader
- Add 2-column story section (text + image) if images exist
- Add 3 card values section
- Add final CTA block
- Do not invent brand claims you cannot support
- Output files changed, diff summary, manual test checklist

Stop after Task AB01.

END TASK AB01 CLAUDE PROMPT

TASK C01  Contact page: contact cards + optional map
Goal
Make /contact feel trustworthy and easy.

Layout
- Left: contact info cards (phone, email, service area)
- Right: simple form or map card (pick what you already have)

If you embed a map
- Put it in a card with rounded corners
- Ensure responsive and not huge on mobile

TASK C01 CLAUDE PROMPT
Task C01 only: upgrade /contact layout with premium contact cards and optional map embed if appropriate.

Requirements:
- Use PageHeader
- Add clean contact cards
- Keep form submission logic unchanged
- Output files changed, diff summary, manual test checklist

Stop after Task C01.

END TASK C01 CLAUDE PROMPT

SITEWIDE TASKS (DO THESE AFTER PAGES LOOK GOOD)

TASK S01  Focus and hover states
- Add focus-visible rings to all buttons and important links
- Ensure hover states are consistent

TASK S01 CLAUDE PROMPT
Task S01 only: add consistent focus-visible and hover states to sitewide buttons/links.

Requirements:
- Update shared button/link styles where they live
- Do not change layout
- Verify keyboard navigation is visible
- Output files changed, diff summary, manual test checklist

Stop after Task S01.

END TASK S01 CLAUDE PROMPT

TASK S03  Lighthouse quick pass
- Reduce huge images
- Ensure non-hero images lazy load
- Confirm no console errors

TASK S03 CLAUDE PROMPT
Task S03 only: do a quick performance pass with safe changes (no risky refactors).

Requirements:
- Optimize obvious image sizing
- Ensure lazy loading for non-hero images
- Remove unused imports/components if safe
- Output files changed, diff summary, manual test checklist

Stop after Task S03.

END TASK S03 CLAUDE PROMPT

END
