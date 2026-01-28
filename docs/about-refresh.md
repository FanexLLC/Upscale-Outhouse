# Upscale Outhouse – About Page Refresh (Claude Plan)

Goal
- Make /about match the premium look of the updated site (home).
- Replace the placeholder photo with about-us.jpg.
- Make the FAQ look high-quality (accordion, premium spacing, clean cards).
- Keep claims consistent with existing site copy (veteran-owned, Fresno, 150 miles, free delivery 50 miles, etc.).

Non‑negotiable rules
- Do ONE task at a time. Stop after each task.
- Do not add new dependencies unless a task explicitly allows it.
- Keep the existing Tailwind color palette (gold/charcoal/cream).
- Keep routing and core page content meaning the same.
- Keep accessibility: headings in order, focus states, keyboard-friendly FAQ.

Assumptions (adjust if repo differs)
- Route: /about
- File: app/about/page.tsx
- Image: public/images/about-us.jpg (you will add this file)

Design standards to match home
- Wrapper: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Light sections: py-24
- Dark sections (if used): py-28
- Card style: rounded-2xl border border-charcoal/10 shadow-md hover:shadow-lg transition
- Primary button: bg-gold text-charcoal-dark hover:bg-gold-light shadow-lg hover:shadow-xl
- Secondary button: border-2 border-charcoal/20 hover:bg-charcoal/5
- Focus ring: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2

Target page structure (final)
1) PageHeader (premium)
- Title: About Upscale Outhouse
- Subtitle: Veteran-owned and operated, bringing luxury and dignity to outdoor events throughout Central California.
- CTAs:
  - Primary: Get an Instant Quote -> /quote
  - Secondary: Call (559) 663-0356 -> tel:+15596630356

2) Story + Photo (2-column)
Left column
- Section title: Our Story
- 2–3 short paragraphs (reuse existing copy; tighten line breaks)
Right column
- Image: /images/about-us.jpg
- Image treatment:
  - rounded-2xl
  - border border-charcoal/10
  - shadow-lg
  - aspect-[4/3] or aspect-video (whichever looks best with your image)

3) “Why Choose Us” as premium cards (3 cards)
- Grid: 1 column mobile, 3 columns desktop
- Cards:
  - Quality: “Immaculate trailers maintained to the highest standards for every event.”
  - Reliability: “On-time delivery and pickup so your event stays on schedule.”
  - Service: “Friendly, professional service from booking to pickup.”

4) Service Area block (clean, not a plain list)
- Title: Service Area
- Short sentence (reuse existing): based in Fresno, serve within 150 miles
- Cities displayed as “pills” or a clean 2-column list:
  Fresno, Clovis, Visalia, Bakersfield, Merced, Modesto, Madera, Hanford
- Highlight line:
  “Free delivery within 50 miles of Fresno” as a small gold-accent badge

5) FAQ (premium accordion)
- Title: Frequently Asked Questions
- Use an accordion component:
  - One item open at a time
  - Click target is full width
  - Chevron rotates when open
  - Keyboard accessible (button)
  - Smooth spacing transitions
- Keep the same questions and answers you already have

6) Bottom CTA
- Title: Ready to Book?
- Copy: “Get an instant quote for your upcoming event.”
- Button: Get Your Free Quote -> /quote
- Optional: phone link under button

Implementation plan (do in order)

TASK A00 – Add the team photo to public folder (manual step)
You do this, not Claude.
- Add: about-us.jpg to your repo at:
  public/images/about-us.jpg

Definition of done
- The image exists and loads at /images/about-us.jpg in the browser.

TASK A01 – Restructure /about to match the premium layout (no FAQ changes yet)
Claude should:
- Update app/about/page.tsx:
  - Add premium header section
  - Convert Story section to a 2-column layout and render about-us.jpg in the right column
  - Convert “Why Choose Us” into a 3-card grid
  - Convert Service Area list into pills or 2-column list with a highlighted “Free delivery” line
- Keep FAQ section as-is for now (we do it in Task A02)
- Keep copy consistent; tighten spacing and line breaks only

Manual test
- /about renders with no placeholder text
- Image shows properly
- Mobile stacks cleanly
- Desktop layout aligns with the home page feel

CLAUDE PROMPT (TASK A01)
Task A01 only: Update the /about page layout to match the premium site style.
- Target file: app/about/page.tsx (or the file that renders /about)
- Add a premium header block (title, subtitle, CTAs to /quote and tel:+15596630356)
- Make “Our Story” a 2-column section with the image /images/about-us.jpg on the right (rounded-2xl, border, shadow)
- Convert “Why Choose Us” into a 3-card grid using the card style
- Improve “Service Area” layout (pills or 2-column list) and highlight “Free delivery within 50 miles of Fresno”
- Do not change the FAQ yet
After changes, output:
1) files changed
2) diff-style summary
3) manual test checklist (390/768/1280)
Stop after Task A01.

END PROMPT

TASK A02 – Replace FAQ with a premium accordion
Claude should:
- Build a small accordion component local to the page OR create components/ui/Accordion.tsx (only if it reduces clutter).
- Accordion requirements:
  - Each question is a button (type=button)
  - focus-visible ring
  - Chevron icon rotates
  - Only one open at a time
  - Accessible: aria-expanded, aria-controls
- Use the existing FAQ questions/answers verbatim.

Manual test
- Click opens/closes correctly
- Keyboard: Tab focuses questions, Enter/Space toggles
- No layout shift glitches

CLAUDE PROMPT (TASK A02)
Task A02 only: Redesign the FAQ on /about into a premium accordion.
- Keep the same FAQ questions and answers
- Make each FAQ item a card (rounded-2xl, border, padding, subtle shadow on hover)
- Use a button for the header row with chevron rotate
- One item open at a time
- Add focus-visible rings and aria attributes
- Do not change other /about sections unless needed for spacing
After changes, output:
1) files changed
2) diff-style summary
3) manual test checklist (390/768/1280)
Stop after Task A02.

END PROMPT

TASK A03 – Micro polish pass (small details only)
Claude should:
- Ensure section spacing matches home (py-24, consistent mb-12/mb-16)
- Ensure heading sizes match home
- Ensure CTA buttons match home styles and are full width on mobile

Manual test
- Looks like a high-quality brand page
- CTA stands out but still premium

CLAUDE PROMPT (TASK A03)
Task A03 only: Micro-polish the /about page.
- Standardize spacing and heading sizes
- Improve button consistency and mobile stacking
- No new dependencies
After changes, output:
1) files changed
2) diff-style summary
3) manual test checklist (390/768/1280)
Stop after Task A03.

END PROMPT

Notes
- Current /about content includes: veteran-owned positioning, Fresno base, 150-mile service area, free delivery within 50 miles, and the existing FAQ topics. Keep those consistent.
