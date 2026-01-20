# Product Requirements Document (PRD)
# Upscale Outhouse - Luxury Bathroom Trailer Rental Website

## Executive Summary

Build a modern, full-featured website for Upscale Outhouse, a luxury bathroom trailer rental business based in Fresno, California. The site will enable customers to get instant quotes, book trailers, and pay online, while providing the business owner with a comprehensive admin panel for managing operations.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router) + React + TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL (via Supabase or Neon) |
| Authentication | NextAuth.js |
| Payments | Stripe (Checkout + Invoicing API) |
| Email | Resend or SendGrid |
| Calendar | Google Calendar API |
| Maps/Distance | Google Maps Distance Matrix API |
| Hosting | Vercel |
| Admin Panel | Custom-built with Next.js |

---

## Site Structure

### Public Pages

1. **Home Page** (`/`)
   - Hero section with compelling imagery
   - Value proposition highlights
   - Featured services/trailer overview
   - Call-to-action buttons (Get Quote, Learn More)
   - Testimonials section
   - Contact information

2. **About Us Page** (`/about`)
   - Company story and mission
   - Team introduction (optional)
   - Service area map
   - Why choose Upscale Outhouse

3. **Gallery Page** (`/gallery`)
   - High-quality images of trailers (interior/exterior)
   - Image lightbox for full-screen viewing
   - Optional video tour embed

4. **Quote/Booking Page** (`/quote`)
   - Multi-step quote form
   - Real-time price calculation
   - Booking calendar with availability
   - Stripe payment integration

### Protected Pages

5. **Admin Dashboard** (`/admin`)
   - Requires authentication
   - Booking management
   - User activity logs
   - KPI dashboard
   - Calendar view

---

## Core Features

### 1. Instant Quote Calculator

**Pricing Logic:**
- Base rate: **$450/day** (same for weekdays and weekends)
- Delivery: **Free within 50 miles** of 93704 (Fresno, CA)
- Distance fee: **$2/mile** beyond 50 miles
- Multi-day discounts (optional, configurable)

**Quote Form Fields:**
- Event date(s) - date picker with calendar
- Event location - address input with autocomplete
- Number of days needed
- Contact information (name, email, phone)

**Calculation Display:**
```
Rental: $450 x 3 days = $1,350
Delivery (75 miles): 25 miles x $2 = $50
───────────────────────────────
Subtotal: $1,400
Deposit Due Now: $100
Balance Due Before Event: $1,300
```

### 2. Booking System

**Flow:**
1. Customer fills quote form
2. System calculates price instantly
3. Customer reviews quote
4. Customer enters payment details
5. Stripe processes $100 deposit
6. Booking confirmed
7. Invoices sent automatically
8. Booking added to Google Calendar

**Availability:**
- Calendar shows blocked dates
- Prevents double-booking
- Buffer days between bookings (configurable)

### 3. Payment Integration (Stripe)

**Features:**
- Secure checkout via Stripe Checkout
- $100 deposit collected at booking
- Automatic invoice generation
- Invoice sent to customer AND owner
- Remainder payment tracking
- Refund handling capability

**Stripe Products:**
- Deposit payment ($100 fixed)
- Balance payment (calculated amount)

### 4. Automated Invoicing

**Triggers:**
- On booking: Send deposit invoice/receipt
- Before event: Send balance due reminder
- After payment: Send final receipt

**Recipients:**
- Customer email
- Owner email (upscaleouthouse@[domain].com)

**Invoice Contents:**
- Booking details (dates, location)
- Itemized pricing breakdown
- Payment status
- Company branding

### 5. Google Calendar Integration

**On Booking Confirmation:**
- Create calendar event automatically
- Event title: "Upscale Outhouse - [Customer Name]"
- Event date(s): Rental period
- Event description: Full booking details
- Event location: Delivery address

### 6. Admin Panel

**Dashboard (`/admin`)**
- Total bookings (month/year)
- Revenue metrics
- Upcoming bookings list
- Recent activity feed

**Bookings Management (`/admin/bookings`)**
- List all bookings with filters
- View booking details
- Update booking status
- Mark payments received
- Cancel/reschedule bookings

**Calendar View (`/admin/calendar`)**
- Visual calendar with bookings
- Drag-and-drop rescheduling (optional)
- Block out dates manually

**User Activity (`/admin/activity`)**
- Quote requests log
- Booking conversions
- Page views (optional analytics)

**Settings (`/admin/settings`)**
- Update pricing
- Configure delivery zones
- Email notification settings
- Business information

---

## Database Schema

### Tables

```
users
├── id (uuid, primary key)
├── email (string, unique)
├── password_hash (string)
├── role (enum: admin, customer)
├── created_at (timestamp)
└── updated_at (timestamp)

bookings
├── id (uuid, primary key)
├── customer_name (string)
├── customer_email (string)
├── customer_phone (string)
├── event_address (string)
├── event_city (string)
├── event_state (string)
├── event_zip (string)
├── start_date (date)
├── end_date (date)
├── num_days (integer)
├── distance_miles (decimal)
├── rental_amount (decimal)
├── delivery_fee (decimal)
├── total_amount (decimal)
├── deposit_amount (decimal)
├── deposit_paid (boolean)
├── balance_paid (boolean)
├── stripe_payment_id (string)
├── stripe_invoice_id (string)
├── google_event_id (string)
├── status (enum: pending, confirmed, completed, cancelled)
├── created_at (timestamp)
└── updated_at (timestamp)

quotes
├── id (uuid, primary key)
├── customer_email (string)
├── event_address (string)
├── start_date (date)
├── end_date (date)
├── calculated_total (decimal)
├── converted_to_booking (boolean)
├── booking_id (uuid, foreign key)
├── created_at (timestamp)
└── ip_address (string)

activity_logs
├── id (uuid, primary key)
├── action_type (string)
├── description (string)
├── user_id (uuid, nullable)
├── booking_id (uuid, nullable)
├── metadata (jsonb)
└── created_at (timestamp)

settings
├── key (string, primary key)
├── value (jsonb)
└── updated_at (timestamp)
```

---

## API Endpoints

### Public APIs
- `POST /api/quote` - Calculate quote
- `POST /api/booking` - Create booking
- `POST /api/webhook/stripe` - Stripe webhooks
- `GET /api/availability` - Check date availability

### Protected APIs (Admin)
- `GET /api/admin/bookings` - List bookings
- `GET /api/admin/bookings/[id]` - Get booking details
- `PATCH /api/admin/bookings/[id]` - Update booking
- `DELETE /api/admin/bookings/[id]` - Cancel booking
- `GET /api/admin/stats` - Dashboard KPIs
- `GET /api/admin/activity` - Activity logs
- `GET/POST /api/admin/settings` - Manage settings

---

## Third-Party Integrations

### 1. Stripe Setup
- Create Stripe account
- Set up webhook endpoints
- Configure invoice templates
- Enable Stripe Checkout

### 2. Google Calendar Setup
- Create Google Cloud project
- Enable Calendar API
- Set up OAuth2 credentials
- Configure service account

### 3. Google Maps Setup
- Enable Distance Matrix API
- Enable Places API (autocomplete)
- Set up API key with restrictions

### 4. Email Service Setup
- Configure Resend or SendGrid
- Set up email templates
- Verify sending domain

---

## Project Structure

```
upscale-outhouse/
├── app/
│   ├── (public)/
│   │   ├── page.tsx              # Home
│   │   ├── about/page.tsx        # About Us
│   │   ├── gallery/page.tsx      # Gallery
│   │   └── quote/page.tsx        # Quote/Booking
│   ├── admin/
│   │   ├── layout.tsx            # Admin layout
│   │   ├── page.tsx              # Dashboard
│   │   ├── bookings/page.tsx     # Bookings list
│   │   ├── calendar/page.tsx     # Calendar view
│   │   ├── activity/page.tsx     # Activity logs
│   │   └── settings/page.tsx     # Settings
│   ├── api/
│   │   ├── quote/route.ts
│   │   ├── booking/route.ts
│   │   ├── availability/route.ts
│   │   ├── webhook/stripe/route.ts
│   │   └── admin/...
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                       # Reusable UI components
│   ├── forms/                    # Form components
│   ├── admin/                    # Admin components
│   └── layout/                   # Layout components
├── lib/
│   ├── db.ts                     # Database client
│   ├── stripe.ts                 # Stripe utilities
│   ├── google-calendar.ts        # Calendar utilities
│   ├── google-maps.ts            # Maps/distance utilities
│   ├── email.ts                  # Email utilities
│   └── utils.ts                  # General utilities
├── prisma/
│   └── schema.prisma             # Database schema
├── public/
│   └── images/                   # Static images
├── .env.local                    # Environment variables
├── package.json
└── README.md
```

---

## Implementation Phases

### Phase 1: Foundation
- [ ] Initialize Next.js project with TypeScript
- [ ] Set up Tailwind CSS and base styling
- [ ] Create database schema with Prisma
- [ ] Set up PostgreSQL database
- [ ] Implement basic page layouts
- [ ] Create navigation component

### Phase 2: Public Pages
- [ ] Build Home page with hero and sections
- [ ] Build About Us page
- [ ] Build Gallery page with image lightbox
- [ ] Implement responsive design
- [ ] Add existing branding (logo, colors)

### Phase 3: Quote System
- [ ] Build quote form component
- [ ] Integrate Google Maps Places autocomplete
- [ ] Integrate Google Maps Distance Matrix API
- [ ] Implement pricing calculation logic
- [ ] Create availability calendar
- [ ] Build quote display component

### Phase 4: Booking & Payments
- [ ] Set up Stripe account and keys
- [ ] Implement Stripe Checkout
- [ ] Create booking flow
- [ ] Set up Stripe webhooks
- [ ] Implement invoice generation
- [ ] Configure email notifications

### Phase 5: Calendar Integration
- [ ] Set up Google Cloud project
- [ ] Implement Google Calendar API
- [ ] Auto-create events on booking
- [ ] Sync availability from calendar

### Phase 6: Admin Panel
- [ ] Implement admin authentication
- [ ] Build dashboard with KPIs
- [ ] Create bookings management interface
- [ ] Build calendar view
- [ ] Implement activity logging
- [ ] Create settings management

### Phase 7: Testing & Launch
- [ ] End-to-end testing
- [ ] Payment flow testing
- [ ] Mobile responsiveness testing
- [ ] Performance optimization
- [ ] Deploy to Vercel
- [ ] Configure custom domain

---

## Environment Variables Required

```env
# Database
DATABASE_URL=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Google
GOOGLE_MAPS_API_KEY=
GOOGLE_CALENDAR_CLIENT_ID=
GOOGLE_CALENDAR_CLIENT_SECRET=
GOOGLE_CALENDAR_REFRESH_TOKEN=

# Email
RESEND_API_KEY=

# Business Config
BUSINESS_EMAIL=
BUSINESS_LOCATION_ZIP=93704
```

---

## Verification & Testing Plan

1. **Quote System Testing**
   - Enter various addresses and verify distance calculation
   - Verify pricing calculates correctly
   - Test date selection and availability

2. **Payment Testing**
   - Use Stripe test mode
   - Complete full booking with test card
   - Verify deposit charged correctly
   - Confirm invoices received by both parties

3. **Calendar Testing**
   - Book a trailer and verify Google Calendar event created
   - Verify event details are accurate
   - Test availability blocking

4. **Admin Panel Testing**
   - Log in as admin
   - View and manage bookings
   - Verify KPIs calculate correctly
   - Test settings updates

5. **End-to-End Flow**
   - Complete full customer journey from homepage to booking
   - Verify all emails sent
   - Verify calendar updated
   - Verify admin can see new booking

---

## Business Configuration Summary

| Setting | Value |
|---------|-------|
| Base Location | 93704, Fresno, California |
| Daily Rate | $450 (weekdays and weekends) |
| Free Delivery Radius | 50 miles |
| Delivery Fee | $2/mile beyond 50 miles |
| Deposit Amount | $100 (fixed) |
| Payment Structure | Deposit at booking, balance before event |

---

## Success Criteria

- [ ] Customer can get instant quote in under 30 seconds
- [ ] Customer can complete booking and payment seamlessly
- [ ] Owner receives notification and invoice for every booking
- [ ] Bookings automatically appear in Google Calendar
- [ ] Admin can view all bookings and business metrics
- [ ] Site is mobile-responsive and fast-loading
- [ ] All payments processed securely through Stripe
