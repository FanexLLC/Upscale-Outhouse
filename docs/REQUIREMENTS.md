# Upscale Outhouse - Detailed Requirements
## Gathered from Interview Session

---

## Branding & Design

### Brand Assets
- **Status:** Use existing assets (logo, colors, fonts)
- **Feel:** Professional & Trustworthy

### Color Palette
| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Gold | #D4AF37 | Logo, laurel wreath, primary accents |
| Secondary Gold | #F4E5A5 | Highlights, softer accents |
| Dark Gray/Charcoal | #2D3748 | Backgrounds, trailer exterior match |
| White/Off-White | #F7FAFC | Clean contrast, backgrounds |
| Accent Olive/Green-Gold | #8B7F3C | Decorative flourishes |

### Design Notes
- Military-meets-luxury aesthetic
- Gold laurel wreath gives veteran/distinguished feel
- Elegant script and monogram create upscale vibe
- Public site: Dark/gold elegant theme
- Admin panel: Light/clean professional theme

---

## Business Configuration

### Fleet
- **Current:** Single trailer operation
- **Future-proof for:** Multiple trailers/inventory expansion

### Target Market
- All event types: Weddings, Corporate, Private parties

### Pricing Structure
| Item | Price |
|------|-------|
| Daily Rate | $450 (same weekday/weekend) |
| Free Delivery | Within 50 miles of 93704 (Fresno, CA) |
| Distance Fee | $2/mile beyond 50 miles |
| Maximum Distance | 150 miles |
| Deposit | $100 (fixed, non-refundable) |
| Balance | Collected on delivery (in person) |

### Multi-Day Discounts
| Duration | Discount |
|----------|----------|
| 1-2 days | No discount |
| 3-4 days | 10% off |
| 5+ days | 15% off |

### Booking Rules
- **Minimum Lead Time:** 48 hours
- **Buffer Days:** None required (back-to-back bookings OK)
- **Cancellation:** Reschedule online only; cancellations require direct contact
- **Deposit Refund:** Non-refundable

---

## Quote/Booking Flow

### Form Structure (3 Steps)
1. **Step 1: Event Details**
   - Event date range (date range picker)
   - Event time (start time and end time)
   - Event type (dropdown)
   - Expected guests (dropdown)
   - Water hookup available? (checkbox - informational only)
   - Event location (address with Google autocomplete)
   - Additional details (free text)

2. **Step 2: Contact Information**
   - Full name
   - Email address
   - Phone number

3. **Step 3: Review & Pay**
   - Display calculated quote
   - Itemized pricing breakdown
   - Deposit payment via Stripe

### Form Behavior
- **Contact Required:** Must provide contact info before seeing quote
- **Price Display:** Show on review step (not real-time updates)
- **Unavailable Dates:** Suggest nearest available alternatives

### Dropdowns

**Event Types:**
- Wedding
- Corporate
- Birthday
- Graduation
- Other

**Guest Count Ranges:**
- 1-50
- 51-100
- 101-200
- 200+

---

## Calendar & Availability

### Display
- Color-coded status:
  - Green: Available
  - Red: Booked
  - Yellow: Pending

### Date Selection
- Date range picker (click start, then end on same calendar)

### Google Calendar Integration
- Create new dedicated business calendar
- Auto-create events on booking confirmation

---

## Pages & Content

### Public Pages

**Home Page (`/`)**
- Hero section with trailer imagery
- Value proposition highlights
- Featured services overview
- Call-to-action buttons
- Testimonials section (have reviews ready)
- Contact information (phone, email, contact form)

**About Page (`/about`)**
- Company story (draft placeholder copy)
- Why choose Upscale Outhouse
- FAQ section
- Service area map

**Gallery Page (`/gallery`)**
- High-quality photos (ready to use)
- Image lightbox for full-screen viewing
- Video section (placeholder for future content)

**Quote Page (`/quote`)**
- 3-step booking form
- Availability calendar
- Stripe payment integration

**Contact Page (`/contact`)**
- Contact form for inquiries
- Phone number
- Email address
- Business hours (if applicable)

**Legal Pages**
- Terms of Service (generate template)
- Privacy Policy (generate template)

### Admin Pages

**Dashboard (`/admin`)**
- Full analytics suite:
  - Total revenue (month/year)
  - Number of bookings
  - Quote-to-booking conversion rate
  - Average booking value
  - Popular dates/months
- Upcoming bookings list
- Recent activity feed

**Bookings (`/admin/bookings`)**
- List all bookings with filters
- View booking details
- Update booking status
- Mark payments received
- Cancel/reschedule bookings

**Calendar (`/admin/calendar`)**
- Visual calendar with bookings
- Block out dates manually
- Drag-and-drop rescheduling (optional)

**Activity (`/admin/activity`)**
- Quote requests log
- Booking conversions
- User actions log

**Settings (`/admin/settings`)**
- Update pricing
- Configure delivery zones
- Email notification settings
- Business information

---

## Notifications

### Customer Emails
- **On Booking:** Detailed confirmation with:
  - Full booking details
  - Receipt for deposit
  - What to expect next
  - Event details summary

### Admin Notifications
- **New Booking:** Email notification
- **SMS:** Skip for now (email only initially)

### No Customer Portal
- Customers receive email updates only
- No login/account system needed

---

## Technical Stack

### Services
| Service | Choice |
|---------|--------|
| Framework | Next.js 14 (App Router) |
| Database | Supabase (PostgreSQL) |
| Payments | Stripe (Checkout) |
| Email | Resend |
| Maps | Google Maps (Places + Distance Matrix) |
| Calendar | Google Calendar API |
| Hosting | Vercel |
| Domain | upscaleouthouse.com |

### Service Accounts Needed
- [ ] Stripe account
- [ ] Supabase project
- [ ] Google Cloud project (Maps + Calendar APIs)
- [ ] Resend account
- [ ] Vercel account

### Future-Proofing
Architecture should support:
- Multiple trailers/inventory management
- Online balance payments
- Customer accounts (optional later)

---

## Admin Users

- **Initial:** Owner account
- **Support for:** 1-2 additional admin users
- **Role System:** Simple (admin only for now, can expand)

---

## Social & Contact

### Contact Methods Displayed
- Phone number
- Email address
- Contact form

### Social Media
- Instagram only (link to profile)

---

## Mobile & Accessibility

### Mobile Experience
- Equal priority desktop/mobile
- Fully responsive design

### Accessibility
- Standard WCAG best practices
- Proper color contrast
- Alt text for images
- Keyboard navigation support

---

## Key Concerns & Priorities

1. **Payment Security/Reliability** - Must work flawlessly
2. **Customer Booking Experience** - Smooth and professional
3. **Simple Admin Management** - Easy to use daily

---

## Assets Available

- [x] Logo and brand colors
- [x] Professional trailer photos (interior/exterior)
- [x] Customer testimonials
- [ ] About Us content (need placeholder)
- [ ] Video content (planning to create)
- [x] Domain (upscaleouthouse.com)
