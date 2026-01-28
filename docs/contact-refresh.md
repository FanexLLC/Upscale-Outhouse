# Upscale Outhouse – Contact Page Refresh (Claude Plan)

Goal
- Make /contact match the premium look of the updated site.
- Remove the “Business Hours” block (low value and can confuse).
- Fix the service area map so it actually shows.
- Make the page elegant and mobile-first.
- Keep existing contact info and form logic intact.

Non-negotiable rules
- Do ONE task at a time. Stop after each task.
- Do not add new dependencies unless a task explicitly allows it.
- Keep the existing Tailwind palette (gold/charcoal/cream).
- Keep routing and any working form submission logic unchanged.
- Accessibility:
  - labels tied to inputs
  - button focus rings
  - keyboard-friendly interactions
  - correct heading order

Assumptions (adjust if repo differs)
- Route: /contact
- File: app/contact/page.tsx
- Phone: (559) 663-0356 -> tel:+15596630356
- Email: upscaleouthouse@gmail.com -> mailto:upscaleouthouse@gmail.com
- Service area: Fresno base + 150 miles + free delivery within 50 miles

Design standards to match home
- Wrapper: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Light sections: py-24
- Card style: rounded-2xl border border-charcoal/10 shadow-md hover:shadow-lg transition
- Primary button: bg-gold text-charcoal-dark hover:bg-gold-light shadow-lg hover:shadow-xl
- Focus ring: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2
- Form input:
  - w-full rounded-lg border border-charcoal/20 px-4 py-3
  - focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold

Target page structure (final)

1) Premium header
- Title: Contact
- Subtitle: “Get a fast quote or ask a question. We respond quickly.”
- CTAs:
  - Primary: Get an Instant Quote -> /quote
  - Secondary: Call (559) 663-0356 -> tel:+15596630356

2) Mobile-first “Quick Contact” cards (top priority)
On mobile: stacked cards
On desktop: 3 columns
Cards:
- Call Us
  - phone number
  - helper text: “Tap to call”
- Email
  - email address
  - helper: “Tap to email”
- Service Area
  - “Based in Fresno. Serving within 150 miles.”
  - badge line: “Free delivery within 50 miles of Fresno”

3) Contact form (premium)
- Place under the contact cards
- Keep current fields and submission logic
- Improve spacing and typography only
- Add reassurance line under submit button:
  “No obligation. Fast response.”

4) Map / Service Area visual (fixed)
- Put the map in its own card below the form or beside it on desktop
- It must render consistently on mobile and desktop

Map options (choose one, in this order)
Option A (preferred): Google Maps embed iframe (reliable, no API key)
- iframe embed with a query like “Fresno, CA”
- title attribute for accessibility
- rounded container with overflow-hidden
- visible height (example: h-[320px] md:h-[420px])

Option B: Service Area card (fallback if iframe embed is blocked)
- Clean city list + service radius copy, no map

Important
- Remove the Business Hours block entirely.

Implementation plan (do in order)

TASK C00 – Audit current /contact (NO CODE CHANGES)
Claude should:
- Open the /contact page file(s)
- Identify:
  - current layout sections
  - where Business Hours are rendered
  - how the map is implemented and why it’s blank
- Output:
  - exact file path(s)
  - what should be removed
  - what should be kept

Definition of done
- Audit only. No edits.

CLAUDE PROMPT (TASK C00)
Audit only. Do not edit code.
Find the file(s) that render /contact and explain:
- what components/sections exist
- where Business Hours block is
- how the map is implemented and why it may be blank
Stop after the audit.

END PROMPT

TASK C01 – Rebuild layout to premium (remove Business Hours, keep map as-is for now)
Goal
Get the page feeling premium even before the map fix.

Claude should:
- Update app/contact/page.tsx (or the actual route file):
  - Add premium header block with CTAs
  - Add 3 “Quick Contact” cards (Call, Email, Service Area)
  - Keep the form logic the same but apply premium spacing and consistent input styles
  - Remove the Business Hours block completely
- Do not change the map implementation yet (map fix is Task C02)

Manual test
- Looks premium on mobile first
- Call and email links work
- Form still submits (or still triggers the same handler)
- No Business Hours section

CLAUDE PROMPT (TASK C01)
Task C01 only: Premium redesign of /contact layout.
- Target file: the page file for /contact (likely app/contact/page.tsx)
- Add premium header block (title, subtitle, CTAs to /quote and tel:+15596630356)
- Add “Quick Contact” cards (Call, Email, Service Area) with mobile-first stacking
- Remove the Business Hours block completely
- Keep existing form fields and submission logic unchanged, but apply premium form styles and spacing
- Do NOT fix the map yet
After changes, output:
1) files changed
2) diff-style summary
3) manual test checklist (390/768/1280)
Stop after Task C01.

END PROMPT

TASK C02 – Fix the service area map so it displays
Goal
Map shows reliably for all users.

Claude should:
- Replace the current broken map with a reliable embed.
- Use Option A: iframe Google Maps embed.

Implementation details
- Put the iframe inside a card container:
  - rounded-2xl overflow-hidden
  - border border-charcoal/10
  - shadow-md
- Ensure explicit height classes on a wrapper div:
  - h-[320px] md:h-[420px]
- Ensure iframe fills:
  - className="w-full h-full"
- Add loading="lazy"
- Add referrerPolicy="no-referrer-when-downgrade"
- Add title="Service area map"

If there is already a map component
- Remove it if it’s not working
- Replace with the iframe version

Manual test
- Map appears on mobile and desktop
- No console errors
- Scrolling works fine

CLAUDE PROMPT (TASK C02)
Task C02 only: Fix the /contact service area map so it renders reliably.
- Replace the existing broken map with a Google Maps iframe embed (no API key required)
- Put the iframe in a premium card container (rounded-2xl, overflow-hidden, border, shadow)
- Ensure fixed heights (h-[320px] md:h-[420px]) so it cannot collapse
- Keep the rest of the page unchanged
After changes, output:
1) files changed
2) diff-style summary
3) manual test checklist (390/768/1280)
Stop after Task C02.

END PROMPT

TASK C03 – Micro-polish (mobile elegance)
Goal
Small touches that make it feel expensive.

Claude should:
- Ensure spacing rhythm matches home (py-24, consistent section gaps)
- Ensure buttons match home styles and are full width on mobile
- Add subtle helper text:
  - Under phone: “Tap to call”
  - Under email: “Tap to email”
- Ensure link styling is consistent:
  - text-gold hover:text-gold-light font-medium

Manual test
- Looks elegant and intentional on mobile
- Nothing feels cramped
- Clear next action

CLAUDE PROMPT (TASK C03)
Task C03 only: Micro-polish /contact for mobile elegance.
- Standardize spacing and headings
- Improve card spacing and helper text
- Ensure CTA buttons are consistent and full width on mobile
- No new dependencies
After changes, output:
1) files changed
2) diff-style summary
3) manual test checklist (390/768/1280)
Stop after Task C03.

END PROMPT

Notes
- If you already created a shared PageHeader component, use it.
- If not, implement a simple header section that matches the home page style.
