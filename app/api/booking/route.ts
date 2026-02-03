import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createCheckoutSession } from '@/lib/stripe';
import { PRICING } from '@/lib/pricing';
import { sendCustomerConfirmationEmail, sendOwnerNotificationEmail } from '@/lib/email';
import { createCalendarEvent, isCalendarConfigured } from '@/lib/google-calendar';

// Force Node.js runtime (not Edge) for Stripe compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quoteId, promoCode } = body;

    if (!quoteId) {
      return NextResponse.json(
        { error: 'Quote ID is required' },
        { status: 400 }
      );
    }

    // Validate promo code if provided
    let validPromoCode: {
      id: string;
      code: string;
      discountType: 'PERCENTAGE' | 'FULL_BYPASS';
      discountPercent: number | null;
    } | null = null;

    if (promoCode) {
      const promo = await prisma.promoCode.findUnique({
        where: { code: promoCode.toUpperCase() },
      });

      if (promo && promo.isActive) {
        // Check expiration
        if (!promo.expiresAt || new Date(promo.expiresAt) > new Date()) {
          // Check max uses
          if (!promo.maxUses || promo.currentUses < promo.maxUses) {
            validPromoCode = {
              id: promo.id,
              code: promo.code,
              discountType: promo.discountType,
              discountPercent: promo.discountPercent,
            };
          }
        }
      }
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
        const depositAmountToCharge = existingBooking.depositAmount;

        // If deposit is already zero, bypass payment
        if (depositAmountToCharge <= 0) {
          await prisma.booking.update({
            where: { id: existingBooking.id },
            data: {
              depositPaid: true,
              depositPaidAt: new Date(),
              status: 'CONFIRMED',
            },
          });

          await prisma.quote.updateMany({
            where: { bookingId: existingBooking.id },
            data: { status: 'PAID' },
          });

          try {
            const emailData = {
              bookingId: existingBooking.id,
              customerName: existingBooking.customerName,
              customerEmail: existingBooking.customerEmail,
              customerPhone: existingBooking.customerPhone,
              eventAddress: existingBooking.eventAddress,
              eventCity: existingBooking.eventCity,
              eventState: existingBooking.eventState,
              startDate: existingBooking.startDate,
              endDate: existingBooking.endDate,
              startTime: existingBooking.startTime,
              endTime: existingBooking.endTime,
              eventType: existingBooking.eventType,
              guestCount: existingBooking.guestCount,
              hasWaterHookup: existingBooking.hasWaterHookup,
              numberOfDays: existingBooking.numberOfDays,
              baseRental: existingBooking.baseRental,
              discountPercent: existingBooking.discountPercent,
              discountAmount: existingBooking.discountAmount,
              deliveryFee: existingBooking.deliveryFee,
              totalAmount: existingBooking.totalAmount,
              depositAmount: depositAmountToCharge,
            };

            await Promise.all([
              sendCustomerConfirmationEmail(emailData),
              sendOwnerNotificationEmail(emailData),
            ]);
          } catch (emailError) {
            console.error('Failed to send bypass confirmation emails:', emailError);
          }

          if (isCalendarConfigured()) {
            try {
              const calendarEventData = {
                bookingId: existingBooking.id,
                customerName: existingBooking.customerName,
                customerEmail: existingBooking.customerEmail,
                customerPhone: existingBooking.customerPhone,
                eventAddress: existingBooking.eventAddress,
                eventCity: existingBooking.eventCity,
                eventState: existingBooking.eventState,
                eventZip: existingBooking.eventZip,
                startDate: existingBooking.startDate,
                endDate: existingBooking.endDate,
                startTime: existingBooking.startTime,
                endTime: existingBooking.endTime,
                eventType: existingBooking.eventType,
                guestCount: existingBooking.guestCount,
                hasWaterHookup: existingBooking.hasWaterHookup,
                numberOfDays: existingBooking.numberOfDays,
                totalAmount: existingBooking.totalAmount,
                depositAmount: depositAmountToCharge,
                depositPaid: true,
                balancePaid: existingBooking.balancePaid,
                additionalDetails: existingBooking.additionalDetails,
              };

              const googleEventId = await createCalendarEvent(calendarEventData);
              if (googleEventId) {
                await prisma.booking.update({
                  where: { id: existingBooking.id },
                  data: { googleEventId },
                });
              }
            } catch (calendarError) {
              console.error('Failed to create bypass calendar event:', calendarError);
            }
          }

          return NextResponse.json({
            success: true,
            bypassed: true,
            bookingId: existingBooking.id,
          });
        }

        // Create new checkout session for existing unpaid booking
        const session = await createCheckoutSession({
          bookingId: existingBooking.id,
          customerEmail: existingBooking.customerEmail,
          customerName: existingBooking.customerName,
          eventDate: existingBooking.startDate.toISOString().split('T')[0],
          totalAmount: existingBooking.totalAmount,
          depositAmount: depositAmountToCharge,
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

    // Calculate promo discount (applies to total only)
    const baseDeposit = PRICING.DEPOSIT_AMOUNT;
    const isPercentPromo = validPromoCode?.discountType === 'PERCENTAGE';
    const rawPromoPercent = isPercentPromo ? (validPromoCode?.discountPercent || 0) : 0;
    const promoPercent = Math.min(Math.max(rawPromoPercent, 0), 1);
    const maxPromoDiscount = Math.max(0, quote.totalAmount - baseDeposit);
    const totalPromoDiscount = isPercentPromo
      ? Math.min(Math.round(quote.totalAmount * promoPercent * 100) / 100, maxPromoDiscount)
      : 0;
    const adjustedTotalAmount = Math.max(
      0,
      Math.round((quote.totalAmount - totalPromoDiscount) * 100) / 100
    );

    // Determine if payment should be bypassed (FULL_BYPASS only)
    const bypassPayment = validPromoCode?.discountType === 'FULL_BYPASS';

    // Deposit stays at the full amount for percentage promos
    const bookingDepositAmount = baseDeposit;
    const bookingTotalAmount = isPercentPromo ? adjustedTotalAmount : quote.totalAmount;

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
        hasPowerAvailable: quote.hasPowerAvailable,
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
        totalAmount: bookingTotalAmount,
        depositAmount: bookingDepositAmount,

        // Promo code tracking
        promoCodeUsed: validPromoCode?.code || null,
        promoDiscount: validPromoCode?.discountType === 'PERCENTAGE'
          ? totalPromoDiscount
          : (validPromoCode?.discountType === 'FULL_BYPASS' ? baseDeposit : 0),

        // Status - if bypassed, mark as confirmed with deposit "paid"
        status: bypassPayment ? 'CONFIRMED' : 'PENDING',
        depositPaid: bypassPayment,
        depositPaidAt: bypassPayment ? new Date() : null,
      },
    });

    // Increment promo code usage if used
    if (validPromoCode) {
      await prisma.promoCode.update({
        where: { id: validPromoCode.id },
        data: { currentUses: { increment: 1 } },
      });
    }

    // Update quote to mark as converted
    await prisma.quote.update({
      where: { id: quoteId },
      data: {
        convertedToBooking: true,
        bookingId: booking.id,
        status: bypassPayment ? 'PAID' : 'CONVERTED',
      },
    });

    // If payment is bypassed, send confirmation and return success without Stripe
    if (bypassPayment) {
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

        await Promise.all([
          sendCustomerConfirmationEmail(emailData),
          sendOwnerNotificationEmail(emailData),
        ]);
      } catch (emailError) {
        console.error('Failed to send bypass confirmation emails:', emailError);
      }

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
            await prisma.booking.update({
              where: { id: booking.id },
              data: { googleEventId },
            });
          }
        } catch (calendarError) {
          console.error('Failed to create bypass calendar event:', calendarError);
        }
      }

      return NextResponse.json({
        success: true,
        bypassed: true,
        bookingId: booking.id,
      });
    }

    // Create Stripe Checkout session
    const session = await createCheckoutSession({
      bookingId: booking.id,
      customerEmail: booking.customerEmail,
      customerName: booking.customerName,
      eventDate: booking.startDate.toISOString().split('T')[0],
      totalAmount: booking.totalAmount,
      depositAmount: booking.depositAmount,
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
