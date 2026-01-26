import Stripe from 'stripe';

// Initialize Stripe with the secret key
// Note: We use a function to lazily initialize to avoid build-time errors
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not set');
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
      maxNetworkRetries: 3,
    });
  }
  return stripeInstance;
}

// Deposit amount in cents for Stripe
export const DEPOSIT_AMOUNT_CENTS = 100; // $1.00 — TODO: change back to 10000 after test

// Create a Stripe Checkout session for the deposit
export async function createCheckoutSession({
  bookingId,
  customerEmail,
  customerName,
  eventDate,
  totalAmount,
}: {
  bookingId: string;
  customerEmail: string;
  customerName: string;
  eventDate: string;
  totalAmount: number;
}) {
  const stripe = getStripe();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: customerEmail,
    client_reference_id: bookingId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Upscale Outhouse Rental Deposit',
            description: `Booking deposit for ${customerName} - Event date: ${eventDate}. Total rental: $${totalAmount.toFixed(2)}. Balance due on delivery.`,
          },
          unit_amount: DEPOSIT_AMOUNT_CENTS,
        },
        quantity: 1,
      },
    ],
    metadata: {
      bookingId,
      customerName,
      customerEmail,
      eventDate,
      totalAmount: totalAmount.toString(),
    },
    success_url: `${baseUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
    cancel_url: `${baseUrl}/quote?cancelled=true&booking_id=${bookingId}`,
  });

  return session;
}

// Retrieve a Stripe Checkout session
export async function getCheckoutSession(sessionId: string) {
  const stripe = getStripe();
  return stripe.checkout.sessions.retrieve(sessionId);
}

// Construct and verify Stripe webhook event
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
  webhookSecret: string
) {
  const stripe = getStripe();
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
