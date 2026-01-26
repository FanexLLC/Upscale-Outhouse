import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { constructWebhookEvent } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import { sendCustomerConfirmationEmail, sendOwnerNotificationEmail } from '@/lib/email';
import { createCalendarEvent, isCalendarConfigured } from '@/lib/google-calendar';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    console.error('Missing stripe-signature header');
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET environment variable');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = constructWebhookEvent(body, signature, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutExpired(session);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const bookingId = session.client_reference_id;

  if (!bookingId) {
    console.error('No booking ID in checkout session');
    return;
  }

  console.log(`Processing successful payment for booking: ${bookingId}`);

  // Update booking status
  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      depositPaid: true,
      depositPaidAt: new Date(),
      stripePaymentId: session.payment_intent as string,
      stripeCustomerId: session.customer as string | null,
      status: 'CONFIRMED',
    },
  });

  console.log(`Booking ${bookingId} marked as confirmed with deposit paid`);

  // Send confirmation emails
  try {
    const emailData = {
      bookingId: booking.id,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      eventAddress: booking.eventAddress,
      eventCity: booking.eventCity,
      eventState: booking.eventState,
      startDate: booking.startDate,
      endDate: booking.endDate,
      startTime: booking.startTime,
      endTime: booking.endTime,
      eventType: booking.eventType,
      guestCount: booking.guestCount,
      hasWaterHookup: booking.hasWaterHookup,
      numberOfDays: booking.numberOfDays,
      baseRental: booking.baseRental,
      discountPercent: booking.discountPercent,
      discountAmount: booking.discountAmount,
      deliveryFee: booking.deliveryFee,
      totalAmount: booking.totalAmount,
      depositAmount: booking.depositAmount,
    };

    // Send both emails in parallel
    await Promise.all([
      sendCustomerConfirmationEmail(emailData),
      sendOwnerNotificationEmail(emailData),
    ]);

    console.log(`Confirmation emails sent for booking ${bookingId}`);
  } catch (emailError) {
    // Log email error but don't fail the webhook
    console.error('Failed to send confirmation emails:', emailError);
  }

  // Create Google Calendar event
  if (isCalendarConfigured()) {
    try {
      const calendarEventData = {
        bookingId: booking.id,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        customerPhone: booking.customerPhone,
        eventAddress: booking.eventAddress,
        eventCity: booking.eventCity,
        eventState: booking.eventState,
        eventZip: booking.eventZip,
        startDate: booking.startDate,
        endDate: booking.endDate,
        startTime: booking.startTime,
        endTime: booking.endTime,
        eventType: booking.eventType,
        guestCount: booking.guestCount,
        hasWaterHookup: booking.hasWaterHookup,
        numberOfDays: booking.numberOfDays,
        totalAmount: booking.totalAmount,
        depositAmount: booking.depositAmount,
        depositPaid: true,
        balancePaid: booking.balancePaid,
        additionalDetails: booking.additionalDetails,
      };

      const googleEventId = await createCalendarEvent(calendarEventData);

      if (googleEventId) {
        // Store the Google Calendar event ID in the booking
        await prisma.booking.update({
          where: { id: bookingId },
          data: { googleEventId },
        });
        console.log(`Google Calendar event created for booking ${bookingId}: ${googleEventId}`);
      }
    } catch (calendarError) {
      // Log calendar error but don't fail the webhook
      console.error('Failed to create Google Calendar event:', calendarError);
    }
  } else {
    console.log('Google Calendar not configured - skipping event creation');
  }
}

async function handleCheckoutExpired(session: Stripe.Checkout.Session) {
  const bookingId = session.client_reference_id;

  if (!bookingId) {
    console.error('No booking ID in expired checkout session');
    return;
  }

  console.log(`Checkout session expired for booking: ${bookingId}`);

  // Check if the booking was never paid
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (booking && !booking.depositPaid) {
    // Optionally mark the booking as cancelled or leave it as pending
    // For now, we'll leave it as pending so the user can try again
    console.log(`Booking ${bookingId} checkout expired but not cancelled - user can retry`);
  }
}
