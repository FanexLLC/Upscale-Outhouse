# Upscale Outhouse – Quote Page Revamp (Claude Plan)

Source page
- https://www.upscaleouthouse.com/quote

Primary problems to fix
- Calendar feels clunky and visually basic.
- Start Time and End Time dropdowns feel low quality, especially on mobile/iOS.
- “Select” style dropdowns for event type and guests feel generic.
- Overall page needs premium polish and better mobile UX.

Non-negotiable rules
- Do ONE task at a time. Stop after each task.
- Do not break the existing quote logic, pricing logic, or stepper flow.
- Do not add new dependencies unless a task explicitly allows it.
- Keep brand palette (gold/charcoal/cream) and match the home page polish.
- Accessibility: keyboard friendly, focus rings, labels, aria attributes.

Assumptions (adjust if repo differs)
- Route: /quote
- File: app/quote/page.tsx (or app/quote/page.jsx)
- You already have a multi-step form:
  Event Details -> Contact Info -> Review Quote

Design standards to match home
- Wrapper: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Light sections: py-24
- Card: rounded-2xl border border-charcoal/10 shadow-md
- Primary button: bg-gold text-charcoal-dark hover:bg-gold-light shadow-lg hover:shadow-xl
- Focus ring: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2
- Field spacing: gap-4 (mobile) / gap-6 (desktop)
- Labels: text-sm font-medium text-charcoal-dark
- Help text: text-sm text-charcoal/60

Target UX (what “revamped” means)
- Calendar: a premium date-range picker with clear range highlight and booked/available states.
- Time picker: fast, high-quality time selection:
  - scrollable list (not native select)
  - automatically prevents invalid ranges
  - great on mobile
- Event type + guests: “pill buttons” or premium combobox (not plain select)
- Mobile: clearer progression and better action placement.

Implementation plan (do in order)

## TASK Q00 – Audit current quote implementation (NO CODE CHANGES)
Goal
Find the exact components and logic to avoid breaking anything.

Claude steps
1) Locate the /quote page file and any components it uses (calendar, selects, stepper, pricing).
2) Identify:
   - which date picker library/component is in use (if any)
   - how booked dates are fetched/stored (if any)
   - how start/end times are stored (string, Date, minutes, etc.)
   - how validation works (if any)
3) Output:
   - file paths
   - what to keep
   - what to replace

Definition of done
- Audit only. No edits.

CLAUDE PROMPT (TASK Q00)
Audit only. Do not edit code.
Find the /quote page implementation and list:
- file paths
- current date picker approach
- current time fields approach
- where validation and pricing logic live
Stop after the audit.

END PROMPT

## TASK Q01 – Premium styling pass (safe, no behavior change)
Goal
Make the form look premium everywhere without touching business logic.

Minimum required changes
- Inputs and textareas:
  w-full rounded-lg border border-charcoal/20 px-4 py-3 bg-white
  focus-visible:ring-2 focus-visible:ring-gold
- Consistent card padding: p-6 md:p-8
- Buttons: match home
- Add focus-visible rings everywhere

Definition of done
- Visual upgrade only, no logic changes.

CLAUDE PROMPT (TASK Q01)
Task Q01 only: Premium styling pass for the quote form UI.
- Do not change any state shape or logic
- Standardize input/textarea styles, label styles, spacing, card padding, buttons, and focus states
- Keep functionality identical
Output files changed, diff summary, manual test checklist. Stop.

END PROMPT

## TASK Q02 – Replace Start Time and End Time selects with a premium TimePicker component
Goal
No more native “Select time” dropdown. Make it feel modern and fast.

Required behavior
- Trigger looks like an input
- Opens popover with scrollable time list (6:00 AM to 11:00 PM)
- Tap to select, close on select
- End time must be after start time
  - If start changes and end is invalid, auto-set end to start + 1 hour

Implementation constraints
- Prefer NO new deps.
- If the repo already uses shadcn/radix/headlessui, use the existing popover primitives.
- Otherwise implement a simple popover with absolute positioning.

Component spec
File: components/quote/TimePicker.tsx
Props:
- label: string
- value: string | null
- onChange: (value: string) => void
- times: string[]
- helperText?: string

Definition of done
- Time pickers look premium and work correctly on mobile and desktop.

CLAUDE PROMPT (TASK Q02)
Task Q02 only: Replace Start Time and End Time dropdowns with a premium TimePicker popover list.
- Create components/quote/TimePicker.tsx
- Use a trigger that looks like an input
- Popover contains scrollable list of times (6:00 AM to 11:00 PM)
- On select, close popover and set value
- Enforce end > start:
  - If start changes and end is invalid, auto-set end to start + 1 hour
- Do not change any other quote logic
Output files changed, diff summary, manual test checklist. Stop.

END PROMPT

## TASK Q03 – Upgrade calendar to a premium date-range experience
Goal
Make start/end selection feel like one cohesive range picker.

Required UI
- One calendar view supporting range selection (start + end)
- Clear range highlight styling
- Booked dates disabled and visibly distinct
- Compact legend

Required behavior
- First click sets start date
- Second click sets end date (>= start)
- Third click resets to new start date
- End date cannot be before start
- If start moves past end, clear or adjust end

Constraints
- Prefer the calendar you already use, but improve styling and interactions.
- Do not add a new calendar library unless explicitly approved.

Definition of done
- Calendar feels premium and intuitive.

CLAUDE PROMPT (TASK Q03)
Task Q03 only: Upgrade the calendar to a premium date-range picker.
- Use the current calendar component/library if present
- Implement cohesive range selection (start/end)
- Improve styling: clearer range highlight, selected day, hover states, disabled booked dates
- Keep booked/available logic intact
Output files changed, diff summary, manual test checklist. Stop.

END PROMPT

## TASK Q04 – Replace Event Type and Guests selects with premium controls
Goal
Remove “generic select” feel and make it mobile-fast.

Event Type
- Pill buttons grid:
  Wedding, Corporate Event, Birthday Party, Graduation, Other
Guests
- Pill buttons:
  1–50, 51–100, 101–200, 200+

Constraints
- Keep the same stored values used by pricing/logic.

Definition of done
- Looks premium and is faster to use.

CLAUDE PROMPT (TASK Q04)
Task Q04 only: Replace Event Type and Guests dropdowns with premium pill controls.
- Keep the same underlying stored values used by pricing/logic
- Add responsive pill grids with clear active/inactive styling
- Do not change anything else
Output files changed, diff summary, manual test checklist. Stop.

END PROMPT

## TASK Q05 – Mobile-first navigation polish
Goal
Make it feel like a high-end checkout on mobile.

Add
- Sticky bottom action bar on mobile for Continue/Back
- Add bottom padding so the bar never covers fields
- Compact step indicator on mobile (current step + 1/3)

Definition of done
- Mobile is smooth, CTA always visible, no overlap.

CLAUDE PROMPT (TASK Q05)
Task Q05 only: Improve mobile navigation for the quote flow.
- Add sticky bottom Continue/Back bar on mobile
- Ensure no overlap with form fields
- Keep desktop layout unchanged
Output files changed, diff summary, manual test checklist. Stop.

END PROMPT

## TASK Q06 – Micro polish and trust improvements
Goal
Make page feel trustworthy and premium.

Add
- Small trust strip under header:
  Veteran-owned • Free delivery within 50 miles • Climate controlled • Hot & cold water
- Ensure “Why Choose” sidebar matches site card style and icon sizing
- Ensure phone link is prominent and tappable

Definition of done
- Cohesive premium feel.

CLAUDE PROMPT (TASK Q06)
Task Q06 only: Micro-polish the quote page.
- Add a compact trust strip under header
- Ensure sidebar card styling matches site
- Improve small spacing/typography and tap targets
No logic changes. Output files changed, diff summary, manual test checklist. Stop.

END PROMPT

Testing checklist (after each task)
- Mobile (390px)
  - Easy date selection
  - Fast time selection
  - Controls feel premium
- Tablet (768px)
  - Layout not cramped
- Desktop (1280px)
  - Sidebar aligns
- Validation
  - End time always after start time
  - End date always after start date
- No console errors
