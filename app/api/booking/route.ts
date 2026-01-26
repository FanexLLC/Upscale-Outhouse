import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createCheckoutSession } from '@/lib/stripe';
import { PRICING } from '@/lib/pricing';

// Force Node.js runtime (not Edge) for Stripe compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quoteId } = body;

    if (!quoteId) {
      return NextResponse.json(
        { error: 'Quote ID is required' },
        { status: 400 }
      );
    }

    // Fetch the quote
    const quote = await prisma.quote.findUnique({
      where: { id: quoteId },
    });

    if (!quote) {
      return NextResponse.json(
        { error: 'Quote not found' },
        { status: 404 }
      );
    }

    // Check if quote is expired
    if (quote.expiresAt && new Date() > quote.expiresAt) {
      return NextResponse.json(
        { error: 'This quote has expired. Please create a new quote.' },
        { status: 400 }
      );
    }

    // Check if quote was already converted to booking
    if (quote.convertedToBooking && quote.bookingId) {
      // Fetch existing booking
      const existingBooking = await prisma.booking.findUnique({
        where: { id: quote.bookingId },
      });

      if (existingBooking && !existingBooking.depositPaid) {
        // Create new checkout session for existing unpaid booking
        const session = await createCheckoutSession({
          bookingId: existingBooking.id,
          customerEmail: existingBooking.customerEmail,
          customerName: existingBooking.customerName,
          eventDate: existingBooking.startDate.toISOString().split('T')[0],
          totalAmount: existingBooking.totalAmount,
        });

        return NextResponse.json({
          success: true,
          checkoutUrl: session.url,
          bookingId: existingBooking.id,
        });
      }

      return NextResponse.json(
        { error: 'This quote has already been converted to a paid booking.' },
        { status: 400 }
      );
    }

    // Check date availability
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        status: { in: ['PENDING', 'CONFIRMED'] },
        depositPaid: true,
        OR: [
          {
            AND: [
              { startDate: { lte: quote.startDate } },
              { endDate: { gte: quote.startDate } },
            ],
          },
          {
            AND: [
              { startDate: { lte: quote.endDate } },
              { endDate: { gte: quote.endDate } },
            ],
          },
          {
            AND: [
              { startDate: { gte: quote.startDate } },
              { endDate: { lte: quote.endDate } },
            ],
          },
        ],
      },
    });

    if (conflictingBooking) {
      return NextResponse.json(
        { error: 'These dates are no longer available. Please select different dates.' },
        { status: 409 }
      );
    }

    // Create booking from quote
    const booking = await prisma.booking.create({
      data: {
        // Event details
        startDate: quote.startDate,
        endDate: quote.endDate,
        startTime: quote.startTime,
        endTime: quote.endTime,
        eventType: quote.eventType,
        guestCount: quote.guestCount,
        hasWaterHookup: quote.hasWaterHookup,
        additionalDetails: quote.additionalDetails,

        // Location
        eventAddress: quote.eventAddress,
        eventCity: quote.eventCity,
        eventState: quote.eventState,
        eventZip: quote.eventZip,
        eventLat: quote.eventLat,
        eventLng: quote.eventLng,

        // Customer info
        customerName: quote.customerName,
        customerEmail: quote.customerEmail,
        customerPhone: quote.customerPhone,

        // Pricing
        numberOfDays: quote.numberOfDays,
        distanceMiles: quote.distanceMiles,
        baseRental: quote.baseRental,
        discountPercent: quote.discountPercent,
        discountAmount: quote.discountAmount,
        rentalAfterDiscount: quote.rentalAfterDiscount,
        deliveryFee: quote.deliveryFee,
        totalAmount: quote.totalAmount,
        depositAmount: PRICING.DEPOSIT_AMOUNT,

        // Status
        status: 'PENDING',
        depositPaid: false,
      },
    });

    // Update quote to mark as converted
    await prisma.quote.update({
      where: { id: quoteId },
      data: {
        convertedToBooking: true,
        bookingId: booking.id,
        status: 'CONVERTED',
      },
    });

    // Create Stripe Checkout session
    const session = await createCheckoutSession({
      bookingId: booking.id,
      customerEmail: booking.customerEmail,
      customerName: booking.customerName,
      eventDate: booking.startDate.toISOString().split('T')[0],
      totalAmount: booking.totalAmount,
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
      bookingId: booking.id,
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve a booking by ID (public — returns limited fields only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('id');

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        customerName: true,
        customerEmail: true,
        customerPhone: true,
        eventAddress: true,
        eventCity: true,
        eventState: true,
        startDate: true,
        endDate: true,
        startTime: true,
        endTime: true,
        eventType: true,
        guestCount: true,
        numberOfDays: true,
        totalAmount: true,
        depositAmount: true,
        depositPaid: true,
        status: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Booking retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve booking' },
      { status: 500 }
    );
  }
}
