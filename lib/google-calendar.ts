import { google, calendar_v3 } from 'googleapis';

// Lazily initialize the Google Calendar client
let calendarClient: calendar_v3.Calendar | null = null;

function getCalendarClient(): calendar_v3.Calendar {
  if (!calendarClient) {
    const privateKey = process.env.GOOGLE_CALENDAR_PRIVATE_KEY;
    const clientEmail = process.env.GOOGLE_CALENDAR_CLIENT_EMAIL;

    if (!privateKey || !clientEmail) {
      throw new Error(
        'Google Calendar credentials not configured. Set GOOGLE_CALENDAR_PRIVATE_KEY and GOOGLE_CALENDAR_CLIENT_EMAIL environment variables.'
      );
    }

    // Create JWT auth client with service account credentials
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey.replace(/\\n/g, '\n'), // Handle escaped newlines in env var
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    calendarClient = google.calendar({ version: 'v3', auth });
  }

  return calendarClient;
}

function getCalendarId(): string {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) {
    throw new Error(
      'GOOGLE_CALENDAR_ID environment variable is not set. This should be the calendar ID to create events in.'
    );
  }
  return calendarId;
}

export interface BookingEventData {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventAddress: string;
  eventCity?: string | null;
  eventState?: string | null;
  eventZip?: string | null;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  eventType: string;
  guestCount: string;
  hasWaterHookup: boolean;
  numberOfDays: number;
  totalAmount: number;
  depositAmount: number;
  depositPaid: boolean;
  balancePaid: boolean;
  additionalDetails?: string | null;
}

function formatEventType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

function parseTime(timeStr: string): { hours: number; minutes: number } {
  // Handle formats like "10:00 AM", "2:30 PM", "14:00"
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

function buildEventDescription(data: BookingEventData): string {
  const balanceDue = data.totalAmount - data.depositAmount;
  const location = [data.eventAddress, data.eventCity, data.eventState, data.eventZip]
    .filter(Boolean)
    .join(', ');

  let description = `UPSCALE OUTHOUSE BOOKING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 BOOKING DETAILS
Booking ID: ${data.bookingId}
Event Type: ${formatEventType(data.eventType)}
Duration: ${data.numberOfDays} day${data.numberOfDays > 1 ? 's' : ''}
Time: ${data.startTime} - ${data.endTime}
Guests: ${data.guestCount}
Water Hookup: ${data.hasWaterHookup ? 'Yes' : 'No'}

📍 DELIVERY LOCATION
${location}

👤 CUSTOMER INFORMATION
Name: ${data.customerName}
Email: ${data.customerEmail}
Phone: ${data.customerPhone}

💰 PAYMENT STATUS
Total: ${formatCurrency(data.totalAmount)}
Deposit (${formatCurrency(data.depositAmount)}): ${data.depositPaid ? '✅ PAID' : '⏳ Pending'}
Balance (${formatCurrency(balanceDue)}): ${data.balancePaid ? '✅ PAID' : '⏳ Due on delivery'}`;

  if (data.additionalDetails) {
    description += `

📝 ADDITIONAL NOTES
${data.additionalDetails}`;
  }

  return description;
}

/**
 * Create a Google Calendar event for a confirmed booking
 */
export async function createCalendarEvent(data: BookingEventData): Promise<string | null> {
  try {
    const calendar = getCalendarClient();
    const calendarId = getCalendarId();

    // Parse start and end times
    const startTime = parseTime(data.startTime);
    const endTime = parseTime(data.endTime);

    // Create start datetime (startDate with startTime)
    const startDateTime = new Date(data.startDate);
    startDateTime.setHours(startTime.hours, startTime.minutes, 0, 0);

    // Create end datetime (endDate with endTime)
    const endDateTime = new Date(data.endDate);
    endDateTime.setHours(endTime.hours, endTime.minutes, 0, 0);

    // Build location string
    const location = [data.eventAddress, data.eventCity, data.eventState, data.eventZip]
      .filter(Boolean)
      .join(', ');

    // Create the event
    const event: calendar_v3.Schema$Event = {
      summary: `Upscale Outhouse - ${data.customerName} (${formatEventType(data.eventType)})`,
      location,
      description: buildEventDescription(data),
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/Los_Angeles', // Fresno timezone
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      colorId: '9', // Blue color for bookings
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 60 }, // 1 hour before
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
    });

    console.log(`Created Google Calendar event: ${response.data.id}`);
    return response.data.id || null;
  } catch (error) {
    console.error('Failed to create Google Calendar event:', error);
    // Don't throw - calendar integration should not break the booking flow
    return null;
  }
}

/**
 * Update an existing Google Calendar event
 */
export async function updateCalendarEvent(
  eventId: string,
  data: BookingEventData
): Promise<boolean> {
  try {
    const calendar = getCalendarClient();
    const calendarId = getCalendarId();

    // Parse start and end times
    const startTime = parseTime(data.startTime);
    const endTime = parseTime(data.endTime);

    // Create start datetime
    const startDateTime = new Date(data.startDate);
    startDateTime.setHours(startTime.hours, startTime.minutes, 0, 0);

    // Create end datetime
    const endDateTime = new Date(data.endDate);
    endDateTime.setHours(endTime.hours, endTime.minutes, 0, 0);

    // Build location string
    const location = [data.eventAddress, data.eventCity, data.eventState, data.eventZip]
      .filter(Boolean)
      .join(', ');

    const event: calendar_v3.Schema$Event = {
      summary: `Upscale Outhouse - ${data.customerName} (${formatEventType(data.eventType)})`,
      location,
      description: buildEventDescription(data),
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/Los_Angeles',
      },
    };

    await calendar.events.update({
      calendarId,
      eventId,
      requestBody: event,
    });

    console.log(`Updated Google Calendar event: ${eventId}`);
    return true;
  } catch (error) {
    console.error('Failed to update Google Calendar event:', error);
    return false;
  }
}

/**
 * Mark a calendar event as completed (change color and update title)
 */
export async function markEventCompleted(eventId: string): Promise<boolean> {
  try {
    const calendar = getCalendarClient();
    const calendarId = getCalendarId();

    // Get the existing event first
    const existingEvent = await calendar.events.get({
      calendarId,
      eventId,
    });

    if (!existingEvent.data) {
      console.error('Event not found for completion:', eventId);
      return false;
    }

    // Update the event to show it's completed
    await calendar.events.patch({
      calendarId,
      eventId,
      requestBody: {
        summary: `✅ ${existingEvent.data.summary}`,
        colorId: '10', // Green color for completed
      },
    });

    console.log(`Marked Google Calendar event as completed: ${eventId}`);
    return true;
  } catch (error) {
    console.error('Failed to mark calendar event as completed:', error);
    return false;
  }
}

/**
 * Mark a calendar event as cancelled
 */
export async function markEventCancelled(eventId: string): Promise<boolean> {
  try {
    const calendar = getCalendarClient();
    const calendarId = getCalendarId();

    // Get the existing event first
    const existingEvent = await calendar.events.get({
      calendarId,
      eventId,
    });

    if (!existingEvent.data) {
      console.error('Event not found for cancellation:', eventId);
      return false;
    }

    // Update the event to show it's cancelled
    await calendar.events.patch({
      calendarId,
      eventId,
      requestBody: {
        summary: `❌ CANCELLED - ${existingEvent.data.summary?.replace(/^(✅\s*|❌\s*CANCELLED\s*-\s*)/i, '')}`,
        colorId: '11', // Red color for cancelled
      },
    });

    console.log(`Marked Google Calendar event as cancelled: ${eventId}`);
    return true;
  } catch (error) {
    console.error('Failed to mark calendar event as cancelled:', error);
    return false;
  }
}

/**
 * Delete a calendar event
 */
export async function deleteCalendarEvent(eventId: string): Promise<boolean> {
  try {
    const calendar = getCalendarClient();
    const calendarId = getCalendarId();

    await calendar.events.delete({
      calendarId,
      eventId,
    });

    console.log(`Deleted Google Calendar event: ${eventId}`);
    return true;
  } catch (error) {
    console.error('Failed to delete Google Calendar event:', error);
    return false;
  }
}

/**
 * Get events from Google Calendar for a date range
 * Useful for checking availability or syncing blocked dates
 */
export async function getCalendarEvents(
  startDate: Date,
  endDate: Date
): Promise<calendar_v3.Schema$Event[]> {
  try {
    const calendar = getCalendarClient();
    const calendarId = getCalendarId();

    const response = await calendar.events.list({
      calendarId,
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    return response.data.items || [];
  } catch (error) {
    console.error('Failed to get Google Calendar events:', error);
    return [];
  }
}

/**
 * Check if Google Calendar is properly configured
 */
export function isCalendarConfigured(): boolean {
  return !!(
    process.env.GOOGLE_CALENDAR_PRIVATE_KEY &&
    process.env.GOOGLE_CALENDAR_CLIENT_EMAIL &&
    process.env.GOOGLE_CALENDAR_ID
  );
}
