import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { calculateDistance } from '@/lib/google-maps';
import { calculateQuote, PRICING } from '@/lib/pricing';
import { EventType } from '@prisma/client';

// Force Node.js runtime for API compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Map form event types to Prisma enum
const eventTypeMap: Record<string, EventType> = {
  wedding: 'WEDDING',
  corporate: 'CORPORATE',
  birthday: 'BIRTHDAY',
  graduation: 'GRADUATION',
  other: 'OTHER',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      // Event details
      startDate,
      endDate,
      startTime,
      endTime,
      eventType,
      guestCount,
      hasWaterHookup,
      hasPowerAvailable,
      eventLocation,
      additionalDetails,
      // Location coordinates (from Places autocomplete)
      eventLat,
      eventLng,
      eventCity,
      eventState,
      eventZip,
      // Contact info
      fullName,
      email,
      phone,
    } = body;

    // Validate required fields
    if (!startDate || !endDate || !startTime || !endTime || !eventType || !guestCount || !eventLocation) {
      return NextResponse.json(
        { error: 'Missing required event details' },
        { status: 400 }
      );
    }

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required contact information' },
        { status: 400 }
      );
    }

    // Calculate distance and delivery fee
    let distanceResult = null;
    if (eventLat && eventLng) {
      distanceResult = await calculateDistance(eventLat, eventLng);

      // Check if outside service area
      if (!distanceResult.isWithinServiceArea) {
        return NextResponse.json(
          {
            error: 'Outside service area',
            message: distanceResult.errorMessage,
            distanceMiles: distanceResult.distanceMiles,
          },
          { status: 400 }
        );
      }
    }

    // Fetch pricing settings from database
    const pricingSetting = await prisma.setting.findUnique({
      where: { key: 'pricing' },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pricingConfig = pricingSetting?.value as any;
    const weekdayPrice = pricingConfig?.weekdayPrice ?? pricingConfig?.baseRate ?? PRICING.WEEKDAY_RATE;
    const weekendPrice = pricingConfig?.weekendPrice ?? pricingConfig?.baseRate ?? PRICING.WEEKEND_RATE;
    const multiDayDiscounts = pricingConfig?.multiDayDiscounts;

    // Calculate pricing with weekday/weekend rates and multi-day discounts
    const quoteCalc = calculateQuote(
      new Date(startDate),
      new Date(endDate),
      distanceResult?.distanceMiles,
      weekdayPrice,
      weekendPrice,
      multiDayDiscounts
    );

    // Map event type to enum
    const prismaEventType = eventTypeMap[eventType] || 'OTHER';

    // Get client info for metadata
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Create quote in database
    const quote = await prisma.quote.create({
      data: {
        // Event details
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        startTime,
        endTime,
        eventType: prismaEventType,
        guestCount,
        hasWaterHookup: hasWaterHookup || false,
        hasPowerAvailable: hasPowerAvailable || false,
        additionalDetails: additionalDetails || null,

        // Location
        eventAddress: eventLocation,
        eventCity: eventCity || null,
        eventState: eventState || null,
        eventZip: eventZip || null,
        eventLat: eventLat || null,
        eventLng: eventLng || null,

        // Contact info
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,

        // Pricing
        numberOfDays: quoteCalc.numberOfDays,
        distanceMiles: distanceResult?.distanceMiles || null,
        baseRental: quoteCalc.baseRental,
        discountPercent: quoteCalc.discountPercent,
        discountAmount: quoteCalc.discountAmount,
        rentalAfterDiscount: quoteCalc.rentalAfterDiscount,
        deliveryFee: quoteCalc.deliveryFee,
        totalAmount: quoteCalc.subtotal,
        depositAmount: PRICING.DEPOSIT_AMOUNT,

        // Metadata
        ipAddress,
        userAgent,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return NextResponse.json({
      success: true,
      quoteId: quote.id,
      quote: {
        id: quote.id,
        numberOfDays: quoteCalc.numberOfDays,
        weekdayCount: quoteCalc.weekdayCount,
        weekendCount: quoteCalc.weekendCount,
        weekdayRate: quoteCalc.weekdayRate,
        weekendRate: quoteCalc.weekendRate,
        baseRental: quoteCalc.baseRental,
        discountPercent: quoteCalc.discountPercent,
        discountAmount: quoteCalc.discountAmount,
        rentalAfterDiscount: quoteCalc.rentalAfterDiscount,
        deliveryFee: quoteCalc.deliveryFee,
        deliveryFeeNote: quoteCalc.deliveryFeeNote,
        distanceMiles: distanceResult?.distanceMiles || null,
        totalAmount: quoteCalc.subtotal,
        depositDue: PRICING.DEPOSIT_AMOUNT,
        balanceDue: quoteCalc.balanceDue,
      },
    });
  } catch (error) {
    console.error('Quote creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create quote' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve a quote by ID (public — returns limited fields only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const quoteId = searchParams.get('id');

    if (!quoteId) {
      return NextResponse.json(
        { error: 'Quote ID is required' },
        { status: 400 }
      );
    }

    const quote = await prisma.quote.findUnique({
      where: { id: quoteId },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        startTime: true,
        endTime: true,
        eventType: true,
        guestCount: true,
        eventAddress: true,
        eventCity: true,
        eventState: true,
        customerName: true,
        customerEmail: true,
        customerPhone: true,
        numberOfDays: true,
        baseRental: true,
        discountPercent: true,
        discountAmount: true,
        rentalAfterDiscount: true,
        deliveryFee: true,
        totalAmount: true,
        depositAmount: true,
        status: true,
        convertedToBooking: true,
      },
    });

    if (!quote) {
      return NextResponse.json(
        { error: 'Quote not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ quote });
  } catch (error) {
    console.error('Quote retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve quote' },
      { status: 500 }
    );
  }
}
