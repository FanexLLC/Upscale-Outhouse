// Sync existing confirmed bookings to Google Calendar
// Run with: npx tsx scripts/sync-calendar.ts

import { config } from 'dotenv';
config({ path: '.env.local' });

import { PrismaClient } from '@prisma/client';
import { google } from 'googleapis';

const prisma = new PrismaClient();

async function syncBookingsToCalendar() {
  console.log('Syncing confirmed bookings to Google Calendar...\n');

  const privateKey = process.env.GOOGLE_CALENDAR_PRIVATE_KEY;
  const clientEmail = process.env.GOOGLE_CALENDAR_CLIENT_EMAIL;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!privateKey || !clientEmail || !calendarId) {
    console.error('Missing Google Calendar credentials');
    process.exit(1);
  }

  // Create auth client
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  const calendar = google.calendar({ version: 'v3', auth });

  // Find confirmed bookings without a Google Calendar event
  const bookings = await prisma.booking.findMany({
    where: {
      status: 'CONFIRMED',
      googleEventId: null,
    },
  });

  console.log(`Found ${bookings.length} booking(s) without calendar events\n`);

  for (const booking of bookings) {
    console.log(`Processing: ${booking.customerName} - ${booking.eventType}`);

    try {
      // Parse times
      const startTime = parseTime(booking.startTime);
      const endTime = parseTime(booking.endTime);

      const startDateTime = new Date(booking.startDate);
      startDateTime.setHours(startTime.hours, startTime.minutes, 0, 0);

      const endDateTime = new Date(booking.endDate);
      endDateTime.setHours(endTime.hours, endTime.minutes, 0, 0);

      const location = [booking.eventAddress, booking.eventCity, booking.eventState, booking.eventZip]
        .filter(Boolean)
        .join(', ');

      const balanceDue = booking.totalAmount - booking.depositAmount;

      const description = `UPSCALE OUTHOUSE BOOKING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 BOOKING DETAILS
Booking ID: ${booking.id}
Event Type: ${booking.eventType}
Duration: ${booking.numberOfDays} day(s)
Time: ${booking.startTime} - ${booking.endTime}
Guests: ${booking.guestCount}
Water Hookup: ${booking.hasWaterHookup ? 'Yes' : 'No'}

📍 DELIVERY LOCATION
${location}

👤 CUSTOMER INFORMATION
Name: ${booking.customerName}
Email: ${booking.customerEmail}
Phone: ${booking.customerPhone}

💰 PAYMENT STATUS
Total: $${booking.totalAmount.toFixed(2)}
Deposit ($${booking.depositAmount.toFixed(2)}): ${booking.depositPaid ? '✅ PAID' : '⏳ Pending'}
Balance ($${balanceDue.toFixed(2)}): ${booking.balancePaid ? '✅ PAID' : '⏳ Due on delivery'}`;

      const event = await calendar.events.insert({
        calendarId,
        requestBody: {
          summary: `Upscale Outhouse - ${booking.customerName} (${booking.eventType})`,
          location,
          description,
          start: {
            dateTime: startDateTime.toISOString(),
            timeZone: 'America/Los_Angeles',
          },
          end: {
            dateTime: endDateTime.toISOString(),
            timeZone: 'America/Los_Angeles',
          },
          colorId: '9',
        },
      });

      // Update booking with Google Event ID
      await prisma.booking.update({
        where: { id: booking.id },
        data: { googleEventId: event.data.id },
      });

      console.log(`  ✓ Created event: ${event.data.id}\n`);
    } catch (error) {
      console.error(`  ✗ Failed: ${error instanceof Error ? error.message : error}\n`);
    }
  }

  console.log('Done!');
  await prisma.$disconnect();
}

function parseTime(timeStr: string): { hours: number; minutes: number } {
  const time = timeStr.trim().toUpperCase();
  let hours = 0;
  let minutes = 0;

  if (time.includes('AM') || time.includes('PM')) {
    const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/);
    if (match) {
      hours = parseInt(match[1], 10);
      minutes = parseInt(match[2], 10);
      if (match[3] === 'PM' && hours !== 12) hours += 12;
      if (match[3] === 'AM' && hours === 12) hours = 0;
    }
  } else {
    const match = time.match(/(\d{1,2}):(\d{2})/);
    if (match) {
      hours = parseInt(match[1], 10);
      minutes = parseInt(match[2], 10);
    }
  }

  return { hours, minutes };
}

syncBookingsToCalendar();
