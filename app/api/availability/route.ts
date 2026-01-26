import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCalendarEvents, isCalendarConfigured } from '@/lib/google-calendar';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month'); // Format: YYYY-MM
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // If checking specific date range availability
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Check for conflicting bookings
      const conflictingBookings = await prisma.booking.findMany({
        where: {
          status: {
            in: ['PENDING', 'CONFIRMED'],
          },
          OR: [
            {
              // Booking starts during requested period
              startDate: {
                gte: start,
                lte: end,
              },
            },
            {
              // Booking ends during requested period
              endDate: {
                gte: start,
                lte: end,
              },
            },
            {
              // Booking spans the entire requested period
              AND: [
                { startDate: { lte: start } },
                { endDate: { gte: end } },
              ],
            },
          ],
        },
        select: {
          id: true,
          startDate: true,
          endDate: true,
        },
      });

      // Check for blocked dates
      const blockedDates = await prisma.blockedDate.findMany({
        where: {
          date: {
            gte: start,
            lte: end,
          },
        },
      });

      // Also check Google Calendar for any manually blocked events
      let calendarBlockedCount = 0;
      if (isCalendarConfigured()) {
        try {
          const calendarEvents = await getCalendarEvents(start, end);
          // Count events that are marked as "BLOCKED" or similar admin-created blocks
          calendarBlockedCount = calendarEvents.filter(
            (event) => event.summary?.toLowerCase().includes('blocked') ||
                       event.summary?.toLowerCase().includes('unavailable')
          ).length;
        } catch (calError) {
          console.error('Failed to check Google Calendar for blocked dates:', calError);
        }
      }

      const isAvailable = conflictingBookings.length === 0 && blockedDates.length === 0 && calendarBlockedCount === 0;

      // If not available, find nearest available dates
      let suggestedDates: { startDate: Date; endDate: Date }[] = [];

      if (!isAvailable) {
        // Look for the next 3 available windows in the next 60 days
        const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        suggestedDates = await findAvailableDates(start, duration, 3);
      }

      return NextResponse.json({
        isAvailable,
        conflictingBookings: conflictingBookings.length,
        blockedDates: blockedDates.length,
        suggestedDates: suggestedDates.map((d) => ({
          startDate: d.startDate.toISOString().split('T')[0],
          endDate: d.endDate.toISOString().split('T')[0],
        })),
      });
    }

    // If getting unavailable dates for a month (for calendar display)
    if (month) {
      const [year, monthNum] = month.split('-').map(Number);
      const monthStart = new Date(year, monthNum - 1, 1);
      const monthEnd = new Date(year, monthNum, 0); // Last day of month

      // Get all bookings that overlap with this month
      const bookings = await prisma.booking.findMany({
        where: {
          status: {
            in: ['PENDING', 'CONFIRMED'],
          },
          OR: [
            {
              startDate: {
                gte: monthStart,
                lte: monthEnd,
              },
            },
            {
              endDate: {
                gte: monthStart,
                lte: monthEnd,
              },
            },
            {
              AND: [
                { startDate: { lte: monthStart } },
                { endDate: { gte: monthEnd } },
              ],
            },
          ],
        },
        select: {
          startDate: true,
          endDate: true,
          status: true,
        },
      });

      // Get blocked dates for this month
      const blockedDates = await prisma.blockedDate.findMany({
        where: {
          date: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
        select: {
          date: true,
          reason: true,
        },
      });

      // Build array of unavailable dates
      const unavailableDates: { date: string; reason: 'booked' | 'blocked' }[] = [];

      // Add booked dates
      for (const booking of bookings) {
        const current = new Date(booking.startDate);
        const end = new Date(booking.endDate);

        while (current <= end) {
          if (current >= monthStart && current <= monthEnd) {
            unavailableDates.push({
              date: current.toISOString().split('T')[0],
              reason: 'booked',
            });
          }
          current.setDate(current.getDate() + 1);
        }
      }

      // Add blocked dates
      for (const blocked of blockedDates) {
        unavailableDates.push({
          date: blocked.date.toISOString().split('T')[0],
          reason: 'blocked',
        });
      }

      return NextResponse.json({
        month,
        unavailableDates,
      });
    }

    return NextResponse.json(
      { error: 'Either month or startDate/endDate parameters are required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Availability check error:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
}

// Helper function to find available date windows
async function findAvailableDates(
  afterDate: Date,
  duration: number,
  count: number
): Promise<{ startDate: Date; endDate: Date }[]> {
  const results: { startDate: Date; endDate: Date }[] = [];
  const maxDaysToCheck = 60;
  let checkDate = new Date(afterDate);

  for (let i = 0; i < maxDaysToCheck && results.length < count; i++) {
    checkDate.setDate(checkDate.getDate() + 1);
    const potentialEnd = new Date(checkDate);
    potentialEnd.setDate(potentialEnd.getDate() + duration - 1);

    // Check if this window is available
    const conflicts = await prisma.booking.count({
      where: {
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
        OR: [
          {
            startDate: {
              gte: checkDate,
              lte: potentialEnd,
            },
          },
          {
            endDate: {
              gte: checkDate,
              lte: potentialEnd,
            },
          },
          {
            AND: [
              { startDate: { lte: checkDate } },
              { endDate: { gte: potentialEnd } },
            ],
          },
        ],
      },
    });

    const blockedCount = await prisma.blockedDate.count({
      where: {
        date: {
          gte: checkDate,
          lte: potentialEnd,
        },
      },
    });

    if (conflicts === 0 && blockedCount === 0) {
      results.push({
        startDate: new Date(checkDate),
        endDate: new Date(potentialEnd),
      });
      // Skip past this window to find the next one
      checkDate = new Date(potentialEnd);
    }
  }

  return results;
}
