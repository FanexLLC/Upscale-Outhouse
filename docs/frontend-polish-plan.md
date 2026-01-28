UPSCALE OUTHOUSE FRONTEND POLISH PLAN
Purpose
Make the site look premium and consistent. Work one task at a time. Do not start the next task until the previous task is complete, committed, and visually verified.

How to use this file with Claude
1. Open this file and copy the current task prompt into Claude.
2. Claude should only do the current task. No extra refactors.
3. After Claude finishes, you will run the app locally, visually verify on desktop and mobile widths, then commit.
4. Then move to the next task.

Operating rules for Claude
- Make the smallest change that completes the task.
- Keep existing brand colors. Do not change the palette unless asked.
- Keep routing and page content the same unless the task says to change it.
- Prefer reusable components only when it reduces duplication. Avoid big architecture rewrites.
- Maintain accessibility basics: semantic headings, button focus states, alt text.
- Use Next.js Image for new work when practical, but do not do a sitewide migration unless a task says so.
- After each task, output:
  A. Files changed list
  B. What to test manually
  C. A short diff style summary
  D. Any follow ups needed

Definition of done for every task
- Builds without errors
- Looks good on:
  1. Mobile width 390px
  2. Tablet width 768px
  3. Desktop width 1280px
- No layout shift or broken spacing
- Commit message created

PROJECT CONTEXT
Stack
- Next.js App Router
- Tailwind CSS
- Custom palette: gold, charcoal, cream
Primary goals
- Premium look
- Consistent spacing and typography
- Reduce “template” feel
- Fix any obvious UI bugs

TASK LIST OVERVIEW (DO IN ORDER)
Task 01  Typography system (Next Font, remove Arial)
Task 02  Global spacing system (section padding, container consistency)
Task 03  Hero trust row + hero polish (badge row under hero paragraph)
Task 04  Replace FeaturesCarousel with a premium features grid (cards + icons)
Task 05  Upgrade Trailer Overview checklist layout (2 column grid + styled checks)
Task 06  Fix testimonials initials bug + redesign testimonials as premium cards (no carousel)
Task 07  Service area section enhancement (add visual map block or clean list, move free delivery up)
Task 08  CTA section conversion polish (secondary CTA, reassurance, focus states)
Task 09  Header and footer polish (sticky header, structured footer columns)
Task 10  Image quality and consistency pass (aspect ratios, Next Image where easy)
Task 11  Accessibility and UX pass (focus rings, tap targets, contrast)
Task 12  Performance pass (lazy loading, image sizing, lighthouse basics)

START HERE

TASK 01  Typography system
Goal
Replace Arial with a modern, premium font using next/font. Apply it sitewide.

Constraints
- Do not change colors
- Do not change layout yet
- Do not add new dependencies beyond Next.js built ins

Steps for Claude
1. Locate app/layout.tsx (or equivalent). Confirm App Router is being used.
2. Implement next/font/google with Inter or DM Sans.
   Preferred: Inter
3. Apply the font to the body using className.
4. Remove the hard coded Arial font from app/globals.css.
5. Ensure no other font overrides exist that fight the new font.

Manual test
- Run npm run dev
- Reload home page and at least one other page
- Confirm text visibly changes from Arial to modern sans
- Confirm no hydration warnings

Output requirements
- Tell me exactly which files you changed
- Provide the exact code changes

When done, stop. Do not proceed to Task 02.

TASK 01 CLAUDE PROMPT
Copy everything below into Claude:

You are editing a Next.js App Router site. Task 01 only: implement a sitewide modern font using next/font and remove the Arial override.

Requirements:
- Use Inter from next/font/google unless Inter is already in use.
- Update app/layout.tsx to load the font and apply it to the body.
- Remove the explicit Arial font-family rule from app/globals.css.
- Do not change colors, layout, or any other components.
- After changes, provide:
  1) files changed
  2) code diff style summary
  3) manual testing checklist

Proceed now.

END TASK 01 CLAUDE PROMPT

TASK 02  Global spacing system
Goal
Make spacing consistent across all major sections on the home page.

Target standards
- Light sections: py-24
- Dark sections: py-28
- Keep consistent max width and horizontal padding wrappers

Steps for Claude
1. On app/page.tsx, find all <section> blocks.
2. Standardize padding:
   - bg-cream and bg-cream-dark sections: py-24
   - bg-charcoal-dark sections: py-28
   - Keep hero as is for now unless it is obviously inconsistent.
3. Standardize wrappers:
   Use one wrapper class everywhere:
   max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
4. Ensure headings and intro paragraphs have consistent spacing:
   - section heading mb-4
   - section intro mb-12 to mb-16

Manual test
- Scroll the home page and confirm rhythm is even
- No section feels cramped or too tall

Task 02 Claude prompt is at the bottom of this file. Do not do Task 02 until Task 01 is committed.

TASK 03  Hero trust row + hero polish
Goal
Add a trust row under the hero paragraph and ensure CTAs align well on mobile and desktop.

Trust row content
- Veteran-owned
- Free delivery within 50 miles
- Climate controlled
- Hot and cold running water

Steps for Claude
1. Insert a small UL under the hero paragraph and above the CTA buttons.
2. Style it as small, muted text with wrapping.
3. Ensure spacing feels premium:
   Paragraph mb-6 or mb-8
   Trust row mb-8 to mb-10
4. Do not change the headline wording.

Manual test
- Mobile: trust row wraps cleanly, no overflow
- Desktop: trust row sits under paragraph, above buttons

TASK 04  Replace FeaturesCarousel with premium features grid
Goal
Replace the carousel with a 6 item grid of cards that looks premium.

Design rules
- 1 column mobile, 2 columns tablet, 3 columns desktop
- Each card:
  - rounded-2xl
  - p-8
  - subtle border
  - soft shadow that increases on hover
- Use lucide-react icons if it is already installed. If not, use simple inline SVG or no icons. Do not add new dependencies without asking.
- Keep the same feature copy as the current carousel.

Implementation approach
A. Preferred: create a new component FeaturesGrid.tsx and use it on the home page.
B. Remove FeaturesCarousel from the home page.

Manual test
- Cards are equal height within rows
- Looks good on mobile and desktop

TASK 05  Upgrade Trailer Overview checklist layout
Goal
Make the checklist look designed and reduce vertical length.

Steps
1. Convert the UL into a responsive grid:
   grid-cols-1 on mobile
   grid-cols-2 on small screens and up
2. Replace the checkmark character with a styled badge:
   - small gold circle with a check
3. Ensure spacing and alignment are consistent.

TASK 06  Fix testimonials initials bug + redesign as premium cards
Goal
Remove the stray letters. Replace the carousel with 3 premium testimonial cards on the home page.

Steps
1. Identify the source of stray initials in TestimonialsCarousel and remove or properly style it.
2. Replace TestimonialsCarousel usage on home page with a static grid:
   - 1 column mobile
   - 3 columns desktop
3. Each card:
   - rounded-2xl
   - p-8
   - border
   - shadow
4. Use only the 3 strongest testimonials.
5. Add a short rating summary line above the cards.
6. Add a “View more” link if there is a reviews page. If not, omit.

TASK 07  Service area section enhancement
Goal
Improve trust and clarity with a clean layout and optional map embed.

Options
A. Add a simple embedded Google Map iframe in a card
B. Add a “Cities we serve” clean list in 2 columns
Do not do both unless it still looks clean.

Also
Move “Free delivery within 50 miles” into the hero trust row and shorten or remove it here.

TASK 08  CTA section conversion polish
Goal
Increase conversion while keeping premium feel.

Steps
1. Add a secondary CTA button on desktop:
   Call now
2. Add short reassurance text:
   No obligation. Fast response.
3. Add focus-visible rings to CTA buttons.

TASK 09  Header and footer polish
Goal
Make navigation and footer feel like a real business site.

Header
- Sticky on scroll
- Subtle bottom border
- Keep logo size consistent
- Add phone CTA visible on desktop

Footer
- 3 column layout on desktop:
  Quick links
  Service area
  Contact
- Ensure spacing matches the rest of the site

TASK 10  Image quality and consistency pass
Goal
Make images feel intentional and premium.

Steps
- Ensure consistent aspect ratios in cards and sections
- Add proper sizes attributes where needed
- Convert the hero and one other key image to next/image if it is easy

TASK 11  Accessibility and UX pass
Goal
Professional feel includes professional UX.

Checklist
- Focus states on all buttons and links
- Hover states consistent
- Tap targets at least 44px height
- Headings in correct order (h1 then h2, etc.)
- Alt text meaningful

TASK 12  Performance pass
Goal
Improve speed without breaking design.

Checklist
- Ensure images are optimized and not huge
- Lazy load non-hero images
- Remove unused components
- Quick Lighthouse pass and fix obvious issues

CLAUDE PROMPTS FOR LATER TASKS
Only use these after the previous task is committed.

TASK 02 CLAUDE PROMPT
You are editing the home page only. Task 02 only: standardize spacing and wrappers.

Requirements:
- In app/page.tsx, standardize section vertical padding:
  bg-cream and bg-cream-dark: py-24
  bg-charcoal-dark: py-28
- Standardize wrappers to max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Keep content the same, do not rewrite copy
- Provide files changed, diff summary, and manual test checklist

Proceed now.

TASK 03 CLAUDE PROMPT
Task 03 only: add a trust row under the hero paragraph and polish spacing.

Requirements:
- Insert a UL trust row under hero paragraph and above CTA buttons
- Use these items: Veteran-owned, Free delivery within 50 miles, Climate controlled, Hot and cold running water
- Ensure it wraps cleanly on mobile
- Provide files changed, diff summary, and manual test checklist

Proceed now.

TASK 04 CLAUDE PROMPT
Task 04 only: replace FeaturesCarousel on the home page with a premium features grid.

Requirements:
- Create a FeaturesGrid component and use it on the home page
- Remove FeaturesCarousel from the home page
- Use a responsive 1/2/3 column grid
- Cards must be premium styled (rounded-2xl, p-8, border, shadow, hover shadow)
- Do not add new dependencies unless already present
- Keep the same feature content as the carousel
- Provide files changed, diff summary, and manual test checklist

Proceed now.

TASK 06 CLAUDE PROMPT
Task 06 only: fix stray initials and replace TestimonialsCarousel with 3 static premium testimonial cards on home page.

Requirements:
- Remove or properly style any initials element causing stray letters
- Replace carousel with a static grid of 3 cards
- Add a rating summary line above the cards
- Provide files changed, diff summary, and manual test checklist

Proceed now.
