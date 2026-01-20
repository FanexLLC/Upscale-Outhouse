# Upscale Outhouse - Build Plan

## How to Use This Document

This is your **step-by-step guide** to building the Upscale Outhouse website. 

**Rules for Claude Code (and yourself):**
1. Complete ONE phase at a time
2. Don't start the next phase until the checkpoint passes
3. Test everything before moving on
4. If something breaks, fix it before adding more

**When starting a Claude Code session, say:**
> "Read the docs folder. We're on Phase [X] of BUILD_PLAN.md. Help me complete it."

---

## Pre-Work: Account Setup

Before writing any code, you need these accounts. **Do this first.**

### Required Accounts (Set up now)

| Service | URL | What You Need | Est. Time |
|---------|-----|---------------|-----------|
| **GitHub** | github.com | Free account for code storage | 5 min |
| **Vercel** | vercel.com | Free account, connect to GitHub | 5 min |
| **Supabase** | supabase.com | Free tier database | 10 min |

### Required Accounts (Set up in Phase 4)

| Service | URL | What You Need | Est. Time |
|---------|-----|---------------|-----------|
| **Stripe** | stripe.com | Business account (test mode first) | 15 min |
| **Resend** | resend.com | Free tier for emails | 10 min |

### Required Accounts (Set up in Phase 5)

| Service | URL | What You Need | Est. Time |
|---------|-----|---------------|-----------|
| **Google Cloud** | console.cloud.google.com | For Maps + Calendar APIs | 20 min |

### Domain (You have this)
- Domain: upscaleouthouse.com
- You'll connect this to Vercel in Phase 2

---

## Phase 1: Foundation (Days 1-2)

### Goal
Get a basic Next.js site running locally with your brand colors. Nothing fancy—just proof the setup works.

### What You're Building
- Empty Next.js project with TypeScript
- Tailwind CSS configured with your brand colors
- A single homepage that says "Upscale Outhouse - Coming Soon"
- Runs locally on your computer

### Steps

1. **Create the project**
```bash
npx create-next-app@14 upscale-outhouse --typescript --tailwind --eslint --app --use-npm
cd upscale-outhouse
```

2. **Configure your brand colors in `tailwind.config.ts`**
```javascript
// Add to theme.extend.colors:
colors: {
  gold: {
    DEFAULT: '#D4AF37',
    light: '#F4E5A5',
    olive: '#8B7F3C',
  },
  charcoal: '#2D3748',
  cream: '#F7FAFC',
}
```

3. **Replace the homepage content** (`app/page.tsx`)
- Black background
- Gold "Upscale Outhouse" text
- "Coming Soon" message
- Your phone number

4. **Run it locally**
```bash
npm run dev
```

### Checkpoint ✓
- [ ] Browser shows your "Coming Soon" page at localhost:3000
- [ ] Colors match your brand (black background, gold text)
- [ ] No errors in the terminal

### Don't Proceed Until
You can see your branded "Coming Soon" page in the browser.

---

## Phase 2: Deploy & Go Live (Day 3)

### Goal
Get your "Coming Soon" page live on the internet at upscaleouthouse.com.

### Why This Early?
- Proves your deployment pipeline works
- You have something real to show people
- Catches hosting issues before you've built a lot

### Steps

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit - coming soon page"
git remote add origin https://github.com/YOUR_USERNAME/upscale-outhouse.git
git push -u origin main
```

2. **Connect to Vercel**
- Go to vercel.com
- Import your GitHub repository
- Deploy (takes ~2 minutes)

3. **Connect your domain**
- In Vercel dashboard → Settings → Domains
- Add upscaleouthouse.com
- Follow DNS instructions (update at your domain registrar)

### Checkpoint ✓
- [ ] Site is live at your Vercel URL (something.vercel.app)
- [ ] DNS is configured (may take up to 48 hours to propagate)
- [ ] upscaleouthouse.com shows your Coming Soon page

### Don't Proceed Until
Your site is accessible on the internet.

---

## Phase 3: Static Pages (Days 4-7)

### Goal
Build all the public-facing pages with real content. No database, no forms—just beautiful, static pages.

### What You're Building
- Homepage with hero, features, testimonials
- About page with FAQ
- Gallery page with your photos
- Contact page with info (form comes later)

### Asset Prep (Before Coding)

You need to gather:
- [ ] Your logo file (PNG with transparent background preferred)
- [ ] 6-10 high-quality trailer photos
- [ ] 3-5 customer testimonials (name, event type, quote)
- [ ] Your Instagram handle
- [ ] Business phone number
- [ ] Business email address

Put these in the `public/images/` folder.

### Steps

1. **Create layout components**
- Header with navigation (Home, About, Gallery, Quote, Contact)
- Footer with contact info and Instagram link
- Mobile-responsive menu

2. **Build Homepage** (`app/page.tsx`)
- Hero section with background image and CTA buttons
- "Why Choose Us" features section
- Trailer overview section
- Testimonials carousel/grid
- Call-to-action section

3. **Build About Page** (`app/about/page.tsx`)
- Company story (veteran-owned, luxury service)
- Service area description (Fresno, 150-mile radius)
- FAQ section (6-8 common questions)

4. **Build Gallery Page** (`app/gallery/page.tsx`)
- Photo grid layout
- Lightbox for full-screen viewing
- Placeholder for future video

5. **Build Contact Page** (`app/contact/page.tsx`)
- Phone number (clickable on mobile)
- Email address
- Business hours
- Instagram link
- Static "Get a Quote" link to /quote page
- (Form will be added in Phase 6)

6. **Build Legal Pages**
- Terms of Service (`app/terms/page.tsx`)
- Privacy Policy (`app/privacy/page.tsx`)

7. **Test on mobile**
- Use browser dev tools to test different screen sizes
- Test on your actual phone

### Checkpoint ✓
- [ ] All 6 pages load without errors
- [ ] All your real photos display
- [ ] Navigation works between all pages
- [ ] Site looks good on mobile
- [ ] Deploy to Vercel and verify live site

### Don't Proceed Until
Your static site looks professional and all pages work.

---

## Phase 4: Quote Calculator - Frontend Only (Days 8-10)

### Goal
Build the 3-step quote form that calculates prices. No payments yet—just the form and math.

### What You're Building
- Step 1: Event details form
- Step 2: Contact information form  
- Step 3: Quote review (shows calculated price)
- Price calculation happens in the browser (no database)

### Steps

1. **Create the quote page structure** (`app/quote/page.tsx`)
- Step indicator (1 of 3, 2 of 3, 3 of 3)
- Navigation between steps
- Form state management

2. **Build Step 1: Event Details**
- Date range picker (start date, end date)
- Time inputs (start time, end time)
- Event type dropdown (Wedding, Corporate, Birthday, Graduation, Other)
- Guest count dropdown (1-50, 51-100, 101-200, 200+)
- Water hookup checkbox
- Event location (text input for now—Google autocomplete comes in Phase 5)
- Additional details textarea

3. **Build Step 2: Contact Information**
- Full name (required)
- Email (required, validated)
- Phone number (required, formatted)

4. **Build Step 3: Quote Review**
- Display all entered information
- Calculate and show pricing:
  - Base rental: $450 × days
  - Multi-day discount (10% for 3-4 days, 15% for 5+ days)
  - Delivery fee placeholder (will be calculated by distance later)
  - Total
  - Deposit due: $100
  - Balance due on delivery
- "Proceed to Payment" button (disabled for now)
- "Edit Details" button to go back

5. **Create pricing utility** (`lib/pricing.ts`)
```typescript
// Calculates quote based on:
// - Number of days
// - Distance (placeholder for now)
// - Multi-day discounts
```

### Checkpoint ✓
- [ ] Can complete all 3 steps of the form
- [ ] Validation works (required fields, email format)
- [ ] Price calculates correctly for different scenarios:
  - [ ] 1 day = $450
  - [ ] 3 days = $450 × 3 × 0.90 = $1,215 (10% off)
  - [ ] 5 days = $450 × 5 × 0.85 = $1,912.50 (15% off)
- [ ] Can go back and edit previous steps
- [ ] Mobile-friendly
- [ ] Deploy and test on live site

### Don't Proceed Until
The quote form works end-to-end with correct pricing math.

---

## Phase 5: Database + Google APIs (Days 11-14)

### Goal
Save quotes to database. Add real distance calculation and address autocomplete.

### Account Setup Required
1. **Supabase** - Create project, get connection string
2. **Google Cloud** - Enable Maps JavaScript API, Places API, Distance Matrix API

### What You're Building
- Database to store quotes
- Google Places autocomplete for addresses
- Google Distance Matrix for delivery fee calculation
- Availability calendar that shows booked dates

### Steps

1. **Set up Supabase**
- Create new project
- Get database connection string
- Add to `.env.local`

2. **Set up Prisma**
```bash
npm install prisma @prisma/client
npx prisma init
```

3. **Create database schema** (`prisma/schema.prisma`)
- Quotes table
- Bookings table (for later)
- Settings table (for later)

4. **Push schema to database**
```bash
npx prisma db push
```

5. **Set up Google Cloud**
- Create project
- Enable APIs: Maps JavaScript, Places, Distance Matrix
- Create API key with restrictions
- Add to `.env.local`

6. **Add address autocomplete**
- Replace text input with Google Places autocomplete
- Capture full address components

7. **Add distance calculation**
- Call Distance Matrix API from your address to event location
- Calculate delivery fee: $0 under 50 miles, $2/mile after
- Enforce 150-mile maximum (show error if too far)

8. **Create API endpoint** (`app/api/quote/route.ts`)
- Receives quote form data
- Calculates distance
- Calculates final price
- Saves to database
- Returns quote ID

9. **Update Step 3 to call API**
- Submit quote to API
- Display calculated price from server
- Show delivery fee breakdown

10. **Create availability check**
- Query database for booked dates
- Show unavailable dates in red on date picker
- Suggest alternatives if date is taken

### Environment Variables Needed
```env
DATABASE_URL="postgresql://..."
GOOGLE_MAPS_API_KEY="..."
```

### Checkpoint ✓
- [ ] Address autocomplete works
- [ ] Distance calculates correctly from Fresno
- [ ] Delivery fee shows correctly:
  - [ ] 30 miles = $0 (free)
  - [ ] 75 miles = $50 (25 miles × $2)
  - [ ] 160 miles = Error (too far)
- [ ] Quote saves to database (check in Supabase dashboard)
- [ ] Booked dates show as unavailable
- [ ] Deploy and test live

### Don't Proceed Until
Quotes are saving to your database with correct pricing.

---

## Phase 6: Payments with Stripe (Days 15-18)

### Goal
Accept the $100 deposit via Stripe. Send confirmation emails.

### Account Setup Required
1. **Stripe** - Create account, get test API keys
2. **Resend** - Create account, verify your domain

### What You're Building
- Stripe Checkout for $100 deposit
- Success page after payment
- Confirmation email to customer
- Notification email to you

### Steps

1. **Set up Stripe**
- Create account
- Get test API keys (pk_test_... and sk_test_...)
- Add to `.env.local`

2. **Install Stripe**
```bash
npm install stripe @stripe/stripe-js
```

3. **Create booking API** (`app/api/booking/route.ts`)
- Receives quote ID
- Creates Stripe Checkout session
- Returns checkout URL

4. **Update quote form**
- "Proceed to Payment" creates booking
- Redirects to Stripe Checkout

5. **Create success page** (`app/booking/success/page.tsx`)
- Shows confirmation message
- Displays booking details
- What to expect next

6. **Set up Stripe webhooks**
- Create webhook endpoint (`app/api/webhook/stripe/route.ts`)
- Handle `checkout.session.completed` event
- Update booking status in database

7. **Set up Resend**
- Create account
- Verify upscaleouthouse.com domain
- Get API key

8. **Create email templates**
- Customer confirmation email
- Owner notification email

9. **Send emails on successful payment**
- Trigger from webhook handler

### Environment Variables Needed
```env
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
RESEND_API_KEY="re_..."
```

### Testing Payment Flow
Use Stripe test cards:
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002

### Checkpoint ✓
- [ ] "Proceed to Payment" redirects to Stripe
- [ ] Can complete payment with test card
- [ ] Redirects to success page after payment
- [ ] Booking status updates in database
- [ ] Customer receives confirmation email
- [ ] You receive notification email
- [ ] Test on live site (still in Stripe test mode)

### Don't Proceed Until
Full payment flow works with test cards and emails send.

---

## Phase 7: Admin Panel (Days 19-23)

### Goal
Build a protected admin area where you can manage bookings.

### What You're Building
- Login page
- Dashboard with key metrics
- Bookings list and detail view
- Calendar view of bookings
- Settings page

### Steps

1. **Set up authentication**
```bash
npm install next-auth bcryptjs
```

2. **Create admin user**
- Add User table to schema
- Create seed script for your admin account

3. **Create login page** (`app/admin/login/page.tsx`)
- Email and password form
- Redirect to dashboard on success

4. **Create admin layout** (`app/admin/layout.tsx`)
- Sidebar navigation
- Protected route (redirect to login if not authenticated)

5. **Build Dashboard** (`app/admin/page.tsx`)
- Total revenue this month/year
- Number of bookings
- Upcoming bookings (next 7 days)
- Recent activity

6. **Build Bookings page** (`app/admin/bookings/page.tsx`)
- List all bookings
- Filter by status (pending, confirmed, completed, cancelled)
- Search by customer name
- Click to view details

7. **Build Booking detail page** (`app/admin/bookings/[id]/page.tsx`)
- All booking information
- Customer contact info
- Payment status
- Update status buttons
- Mark balance as paid

8. **Build Calendar page** (`app/admin/calendar/page.tsx`)
- Month view calendar
- Bookings shown on their dates
- Click date to see details
- Block out dates manually

9. **Build Settings page** (`app/admin/settings/page.tsx`)
- Update pricing
- Update delivery radius
- Email settings

### Checkpoint ✓
- [ ] Can log in with admin credentials
- [ ] Cannot access admin pages without logging in
- [ ] Dashboard shows correct stats
- [ ] Can view all bookings
- [ ] Can update booking status
- [ ] Calendar displays bookings
- [ ] Settings save correctly
- [ ] Deploy and test live

### Don't Proceed Until
You can manage your business through the admin panel.

---

## Phase 8: Google Calendar Integration (Days 24-26)

### Goal
Automatically create Google Calendar events when bookings are confirmed.

### Account Setup Required
- Google Cloud service account (or OAuth)
- Dedicated calendar for bookings

### What You're Building
- Calendar event creation on booking
- Event includes all booking details
- Sync blocked dates from calendar

### Steps

1. **Create Google Calendar**
- Create new calendar "Upscale Outhouse Bookings"
- Share with service account

2. **Set up Google Calendar API**
- Enable Calendar API in Google Cloud
- Create service account
- Download credentials JSON
- Add to environment

3. **Create calendar utility** (`lib/google-calendar.ts`)
- Function to create event
- Function to list events (for availability)

4. **Update webhook handler**
- Create calendar event on successful payment
- Event title: "Upscale Outhouse - [Customer Name]"
- Event description: Full booking details
- Event location: Delivery address

5. **Update availability check**
- Also check Google Calendar for blocked dates
- Admin-blocked dates show as unavailable

### Environment Variables Needed
```env
GOOGLE_CALENDAR_ID="..."
GOOGLE_CALENDAR_CREDENTIALS="..."
```

### Checkpoint ✓
- [ ] Booking creates Google Calendar event
- [ ] Event has correct dates and details
- [ ] Admin-blocked dates show as unavailable in booking form
- [ ] Test with real booking flow

### Don't Proceed Until
Calendar events create automatically.

---

## Phase 9: Polish & Launch (Days 27-30)

### Goal
Final testing, optimizations, and launch preparation.

### Tasks

1. **Full end-to-end testing**
- [ ] Complete booking flow as customer
- [ ] Verify all emails received
- [ ] Verify calendar event created
- [ ] Verify admin can see booking

2. **Mobile testing**
- [ ] Test all pages on actual phone
- [ ] Test quote form on mobile
- [ ] Test payment flow on mobile

3. **Performance**
- [ ] Run Lighthouse audit
- [ ] Optimize images
- [ ] Fix any performance issues

4. **SEO**
- [ ] Page titles and descriptions
- [ ] Open Graph images
- [ ] Sitemap

5. **Security review**
- [ ] All API routes protected appropriately
- [ ] No sensitive data exposed
- [ ] HTTPS working

6. **Switch Stripe to production**
- [ ] Complete Stripe account verification
- [ ] Switch to live API keys
- [ ] Test with real payment (refund yourself)

7. **Final deploy**
- [ ] Deploy to production
- [ ] Verify everything works on live domain

### Launch Checklist ✓
- [ ] Site loads at upscaleouthouse.com
- [ ] All pages work correctly
- [ ] Quote form calculates correctly
- [ ] Payment processes successfully
- [ ] Emails send to customer and admin
- [ ] Calendar events create
- [ ] Admin panel fully functional
- [ ] Site works on mobile
- [ ] Stripe in production mode

---

## Phase 10: Post-Launch (Ongoing)

### First Week
- Monitor for errors
- Check emails are delivering
- Respond to first real bookings
- Gather feedback

### First Month
- Review analytics
- Identify any UX issues
- Consider adding testimonials from new customers
- Add video content when ready

### Future Enhancements (Not Now)
These are in the REQUIREMENTS.md for future:
- Multiple trailers/inventory
- Online balance payments
- SMS notifications
- Customer accounts

---

## Quick Reference: Environment Variables

Create `.env.local` with:

```env
# Database (Phase 5)
DATABASE_URL="postgresql://..."

# NextAuth (Phase 7)
NEXTAUTH_SECRET="generate-random-string"
NEXTAUTH_URL="https://upscaleouthouse.com"

# Stripe (Phase 6)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Google Maps (Phase 5)
GOOGLE_MAPS_API_KEY="..."

# Google Calendar (Phase 8)
GOOGLE_CALENDAR_ID="..."
GOOGLE_CALENDAR_CREDENTIALS="..."

# Email (Phase 6)
RESEND_API_KEY="re_..."

# Business Config
BUSINESS_EMAIL="info@upscaleouthouse.com"
BUSINESS_PHONE="(559) XXX-XXXX"
BUSINESS_LOCATION_ZIP="93704"
```

---

## Troubleshooting

### "npm run dev" doesn't work
- Make sure you're in the project folder
- Try `npm install` first
- Check for error messages

### Vercel deploy fails
- Check build logs in Vercel dashboard
- Make sure all environment variables are set
- Check for TypeScript errors locally first

### Stripe webhooks not working
- Use Stripe CLI for local testing
- Check webhook signing secret is correct
- Verify endpoint URL is correct in Stripe dashboard

### Emails not sending
- Verify domain in Resend
- Check API key is correct
- Check spam folder

### Google APIs not working
- Verify API is enabled in Google Cloud
- Check API key restrictions
- Verify billing is set up (even for free tier)

---

## Getting Help

When asking Claude Code for help:

1. Tell it which phase you're on
2. Describe what you're trying to do
3. Share the exact error message
4. Don't let it skip ahead or build everything at once

Good prompt:
> "I'm on Phase 4, Step 2. I'm building the event details form. The date picker isn't showing. Here's the error: [error]. Help me fix this specific issue."

Bad prompt:
> "Build my whole website"

---

## Remember

- **Slow is smooth, smooth is fast**
- **Working beats complete**
- **Test before you add more**
- **Ask questions when stuck**

You've got this, Robbie. One phase at a time. 🎖️
