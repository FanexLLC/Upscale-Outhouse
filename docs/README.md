# Upscale Outhouse

Luxury Bathroom Trailer Rental Website for Upscale Outhouse - serving Fresno and Central California.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL via Supabase
- **Authentication:** NextAuth.js
- **Payments:** Stripe
- **Email:** Resend
- **Maps:** Google Maps Distance Matrix API
- **Calendar:** Google Calendar API

## Getting Started

### 1. Clone and Install

```bash
npm install
```

### 2. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Required environment variables:

- `DATABASE_URL` - Supabase PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your site URL (http://localhost:3000 for dev)
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `GOOGLE_MAPS_API_KEY` - Google Maps API key
- `RESEND_API_KEY` - Resend API key

### 3. Database Setup

Generate Prisma client and push schema to database:

```bash
npm run db:generate
npm run db:push
```

### 4. Create Admin User

Run this in your database or via Prisma Studio:

```sql
INSERT INTO "User" (id, email, password, role, name)
VALUES (
  gen_random_uuid(),
  'admin@upscaleouthouse.com',
  '$2a$10$yourhashedpassword', -- Use bcrypt to hash
  'ADMIN',
  'Admin'
);
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
upscale-outhouse/
├── app/
│   ├── (public)/           # Public pages (Home, About, Gallery, etc.)
│   ├── admin/              # Admin panel pages
│   ├── api/                # API routes
│   ├── booking/            # Booking confirmation pages
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── forms/              # Form components
│   ├── layout/             # Header, Footer
│   └── admin/              # Admin-specific components
├── lib/
│   ├── db.ts               # Prisma client
│   ├── stripe.ts           # Stripe utilities
│   ├── email.ts            # Email utilities
│   ├── pricing.ts          # Pricing calculations
│   ├── google-maps.ts      # Google Maps utilities
│   ├── google-calendar.ts  # Google Calendar utilities
│   └── utils.ts            # General utilities
├── prisma/
│   └── schema.prisma       # Database schema
└── types/
    └── index.ts            # TypeScript types
```

## Features

### Public Site

- **Home Page** - Hero, features, testimonials, service area
- **About Page** - Company story, values, FAQ
- **Gallery Page** - Photo gallery with lightbox
- **Contact Page** - Contact form and info
- **Quote Page** - 3-step booking form with instant pricing

### Admin Panel

- **Dashboard** - KPIs, upcoming bookings, recent activity
- **Bookings** - Manage all bookings with filters and search
- **Calendar** - Visual calendar view of bookings
- **Activity** - Activity log and audit trail
- **Settings** - Business configuration

### Booking Flow

1. Customer enters event details (dates, location, type)
2. Customer provides contact information
3. System calculates price based on:
   - $450/day base rate
   - Multi-day discounts (10% for 3-4 days, 15% for 5+ days)
   - Delivery fee ($2/mile beyond 50 miles)
4. Customer pays $100 deposit via Stripe
5. Confirmation email sent to customer and owner
6. Event added to Google Calendar

## Pricing Configuration

| Setting | Value |
|---------|-------|
| Daily Rate | $450 |
| Free Delivery | Within 50 miles |
| Delivery Fee | $2/mile beyond 50 miles |
| Max Distance | 150 miles |
| Deposit | $100 (non-refundable) |
| 3-4 Day Discount | 10% |
| 5+ Day Discount | 15% |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Stripe Webhook

Set up webhook endpoint in Stripe Dashboard:
- Endpoint: `https://yourdomain.com/api/webhook/stripe`
- Events: `checkout.session.completed`

## Brand Colors

| Color | Hex |
|-------|-----|
| Primary Gold | #D4AF37 |
| Secondary Gold | #F4E5A5 |
| Charcoal | #2D3748 |
| Dark Charcoal | #1A202C |
| Cream | #F7FAFC |
| Accent Green-Gold | #8B7F3C |

## License

Private - All rights reserved.
