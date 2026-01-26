FILE NAME
UpscaleOuthouse_ClaudeCode_TODO.txt

ROLE
You are Claude Code working inside my Upscale Outhouse website repo.
Goal: finish polish and UX upgrades. Site already works. Do not break current flows.

WORK RULES
1) Do one task at a time. No batching.
2) After each task:
   - show the exact files changed
   - explain what changed in 3 to 6 short bullets
   - run the required checks
   - confirm acceptance criteria are met
3) If acceptance criteria are not met, keep iterating on that same task.
4) Do not move to the next task until I say “approved”.
5) Do not use em dashes anywhere in UI copy.
6) Improve typography across the site. Use consistent fonts, sizes, weights, spacing.
7) Keep animations tasteful and fast. No heavy effects that slow the site.

BASELINE CHECKS (RUN FIRST)
A) Install and run
   - npm install
   - npm run dev
B) Identify framework and structure
   - confirm if this is Next.js App Router or Pages Router
   - list key routes for: Home, Gallery, Get a Quote, Contact, Admin
C) Confirm where branding assets live
   - logo file path
   - primary colors used
D) After confirming, stop and report back with:
   - route file paths
   - component file paths for header and footer
   - where testimonials and gallery data live (hardcoded, JSON, CMS, etc.)

GLOBAL DESIGN UPGRADES (APPLY GRADUALLY, NOT ALL AT ONCE)
When working on each page, align it to a clean system:
- font family: one primary, one optional accent
- headings: consistent scale (H1, H2, H3)
- body text: readable line height
- buttons: consistent radius, hover, focus states
- spacing: consistent section padding
Do not do a big refactor. Touch only what is needed per task.

TASK 1: HEADER LOGO FIX
Problem
- Logo looks see through and sits on a white square block in the header.

Requirements
- Header background and logo placement must look intentional.
- No ugly white square behind the logo.
- Logo should render crisp on light and dark backgrounds.
- Header should remain responsive.

Implementation steps
1) Find header component and the logo element.
2) Identify why the logo sits on a white square:
   - wrong image file with built in white background
   - image container has background set
   - Next Image has styling issues
3) Fix by one of these approaches:
   - use transparent PNG or SVG version of logo
   - remove background from wrapper container
   - set correct sizing and object-fit
4) Verify on mobile and desktop widths.

Acceptance criteria
- No white square behind logo.
- Logo looks clean on header.
- Header layout does not jump on load.
- Lighthouse or basic performance is not worse.

Checks
- npm run dev and verify header on all pages
- run any existing lint or typecheck scripts if present

STOP AFTER TASK 1 AND WAIT FOR “approved”.

TASK 2: FOOTER AND CONTACT LINKS
Problems
- Footer email must be upscaleouthouse@gmail.com
- Instagram link must go to the correct account: upscale_outhouse
- Must be fixed in both footer and contact page

Implementation steps
1) Find footer component and update email text and mailto link.
2) Update Instagram href to the correct URL:
   - https://www.instagram.com/upscale_outhouse/
3) Find contact page Instagram link and make it match.
4) Confirm the link opens correctly.

Acceptance criteria
- Footer shows upscaleouthouse@gmail.com and mailto works.
- Instagram link opens the correct profile from footer and contact page.

STOP AFTER TASK 2 AND WAIT FOR “approved”.

TASK 3: HOME PAGE SECTION 1 HERO POLISH
Goal
- Make letters pop.
- Put a photo to the side.
- Hero lines must be the focal point.
- Photo can be side image instead of full background.

Implementation steps
1) Locate home page hero section component.
2) Change layout to a 2 column hero on desktop:
   - left: headline, subhead, primary CTA
   - right: image that supports the headline
3) Add typographic punch:
   - stronger H1 weight
   - tighter letter spacing if needed
   - highlight one key phrase with a brand accent
4) Keep mobile stacked with image below or above headline.

Acceptance criteria
- H1 looks premium and readable.
- Hero copy is the focal point.
- Image complements, does not overwhelm.
- Mobile layout looks clean.

STOP AFTER TASK 3 AND WAIT FOR “approved”.

TASK 4: HOME PAGE SECTION 2 INTERACTIVE BLURBS
Goal
- Make word blurbs more interactive and fun.
- Carousel behavior with arrows and optional auto-rotate.
- Better fonts across the site.
- No em dashes in blurb copy.

Implementation steps
1) Find section 2 content and current layout.
2) Convert to a carousel:
   - left and right arrows
   - dots or progress indicator
   - auto-rotate every 5 to 7 seconds
   - pause on hover and on focus
3) Add a small motion transition between slides.
4) Ensure keyboard accessibility:
   - arrows focusable
   - left and right key support if feasible
5) Replace any em dashes in all carousel text.

Acceptance criteria
- Carousel works on desktop and mobile.
- Arrows work and feel smooth.
- Auto-rotate works and pauses on hover.
- Typography looks better than before.
- No em dashes in that section.

STOP AFTER TASK 4 AND WAIT FOR “approved”.

TASK 5: HOME PAGE SECTION 4 TESTIMONIALS UPGRADE
Goal
- Make testimonials less boring.
- Increase from 3 to 5 or 6.
- Make it more interactive.

Implementation steps
1) Find testimonials data source.
2) Expand to 5 or 6 entries.
3) Improve presentation:
   - cards with rating stars or simple icons
   - customer name and event type
   - optional location
4) Add interaction:
   - carousel or scroll snap slider
   - subtle hover lift
5) Keep it fast and clean.

Acceptance criteria
- 5 to 6 testimonials visible via slider or carousel.
- Section feels modern and interactive.
- No layout shift.

STOP AFTER TASK 5 AND WAIT FOR “approved”.

TASK 6: GALLERY PAGE CENTERPIECE UPGRADE
Goal
- Photos need more life.
- Gallery is the centerpiece.
- Use a carousel or something that pops.

Implementation steps
1) Locate gallery page.
2) Implement an interactive gallery:
   Option A: main large image with thumbnail strip below
   Option B: carousel with swipe, arrows, and fullscreen modal
3) Add lightbox modal:
   - click image to open
   - next and previous
   - escape to close
4) Optimize images:
   - correct sizes
   - lazy loading
   - avoid huge downloads

Acceptance criteria
- Gallery looks premium.
- Images load fast.
- Lightbox works smoothly.
- Mobile swipe works if implemented.

STOP AFTER TASK 6 AND WAIT FOR “approved”.

TASK 7: GALLERY VIDEO TOUR EMBED FOR YOUTUBE SHORTS
Given link
https://youtube.com/shorts/HUH7S3XYHLQ?feature=share

Goal
- Embed should match vertical shorts format.

Implementation steps
1) Add a “Video Tour” section on gallery page or where it currently exists.
2) Use responsive container with vertical aspect ratio:
   - 9:16
3) Use YouTube embed format for shorts.
4) Ensure it is responsive and does not overflow on mobile.

Acceptance criteria
- Video displays in a vertical frame.
- No weird cropping.
- Looks good on mobile and desktop.

STOP AFTER TASK 7 AND WAIT FOR “approved”.

TASK 8: GET A QUOTE PAGE EVENT DETAILS CLEANUP
Problems
- Event details section needs cleanup.
- Calendar needs better UX for start and end times.
- Time intervals should be 15 minutes, not 1 minute.
- Add 2 new boxes:
  1) Is water available for the restroom within 100 feet?
  2) Is power available for the restroom within 100 feet?
- Calendar should show booked dates in red and available in green.

Implementation steps
1) Locate quote form component and calendar picker.
2) Replace time picker interval:
   - enforce 15 minute steps
   - update UI labels
3) Add the two new yes or no fields:
   - store with quote data
4) Improve event details layout:
   - group fields
   - add helper text where needed
   - align spacing and typography
5) Calendar availability:
   - determine data source for booked dates
   - fetch booked ranges and mark them red
   - mark available dates green
   - prevent selecting booked dates if possible

Acceptance criteria
- Time selection only moves in 15 minute increments.
- Two new fields exist with exact wording above.
- Event details section looks clean and modern.
- Booked dates are red and not selectable.
- Available dates show green styling.

STOP AFTER TASK 8 AND WAIT FOR “approved”.

TASK 9: STORE QUOTES EVEN WITHOUT CHECKOUT
Goal
- Quotes must be stored even if user does not complete payment.
- Quotes should show in admin panel.

Implementation steps
1) Identify current quote flow:
   - when quote is created
   - where it is saved today
2) Create a quote record at form submit or when quote is generated.
3) Store status:
   - status = “created” or “abandoned” when no payment
   - status = “paid” when payment succeeds
4) Ensure no duplicate spam:
   - if same user re-quotes, update latest quote or create new with timestamp
5) Confirm data lands in database.

Acceptance criteria
- Creating a quote saves a record without requiring checkout.
- Quote includes contact info and event details.
- Quote status updates to paid on successful payment.

STOP AFTER TASK 9 AND WAIT FOR “approved”.

TASK 10: ADMIN PANEL QUOTES PAGE
Goal
- Add an admin page to see quotes, including those that did not complete payment.
- Provide a way to reach out.

Implementation steps
1) Add a new admin route: Quotes
2) Table columns:
   - name
   - email
   - phone (if collected)
   - event date
   - start time and end time
   - location or venue (if collected)
   - water within 100 feet (yes or no)
   - power within 100 feet (yes or no)
   - total price quoted
   - status (created, abandoned, paid)
   - created date
3) Add filters:
   - status dropdown
   - date range
4) Add quick actions:
   - copy email
   - mailto link
   - view details modal

Acceptance criteria
- Admin can view all quotes.
- Can filter abandoned quotes.
- Contact actions work.

STOP AFTER TASK 10 AND WAIT FOR “approved”.

TASK 11: ADMIN PANEL WEEKDAY VS WEEKEND PRICING
Goal
- Add a way to set weekday price and weekend price.
- For now default both to 450.

Implementation steps
1) Identify where pricing is configured.
2) Add two config values:
   - weekdayPrice
   - weekendPrice
3) Add admin UI to update them.
4) Update quote calculation logic:
   - weekend defined as Friday, Saturday, Sunday unless otherwise specified
5) Persist values in database or config store.
6) Keep both default 450.

Acceptance criteria
- Admin can change weekday and weekend pricing.
- Quote uses correct pricing based on selected date.
- Defaults are both 450.

STOP AFTER TASK 11 AND WAIT FOR “approved”.

FINAL QA CHECKLIST (ONLY AFTER ALL TASKS ARE APPROVED)
- Run lint and typecheck if present.
- Test these flows end to end:
  - Home page interactions
  - Gallery images and video
  - Get a quote form, time picker, calendar availability
  - Create quote without payment and confirm admin sees it
  - Complete payment and confirm quote status updates
  - Contact page links
- Confirm no em dashes appear in UI copy.
- Confirm typography is consistent across major pages.

OUTPUT FORMAT AFTER EACH TASK
- Files changed: list paths
- Summary: 3 to 6 bullets
- Commands run and results
- Screens checked: list pages and viewports
- Acceptance criteria: pass or fail with notes
- Ask me for “approved” before moving on