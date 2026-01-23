import { prisma } from "@/lib/db";
import AdminCalendar from "@/components/admin/AdminCalendar";

async function getCalendarData() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const endOfYear = new Date(now.getFullYear() + 1, 11, 31);

  const [bookings, blockedDates] = await Promise.all([
    prisma.booking.findMany({
      where: {
        status: { in: ["CONFIRMED", "PENDING"] },
        startDate: { gte: startOfYear, lte: endOfYear },
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        customerName: true,
        eventType: true,
        status: true,
      },
    }),
    prisma.blockedDate.findMany({
      where: {
        date: { gte: startOfYear, lte: endOfYear },
      },
    }),
  ]);

  return { bookings, blockedDates };
}

export default async function CalendarPage() {
  const { bookings, blockedDates } = await getCalendarData();

  // Convert dates to ISO strings for client component
  const serializedBookings = bookings.map((b) => ({
    ...b,
    startDate: b.startDate.toISOString(),
    endDate: b.endDate.toISOString(),
  }));

  const serializedBlockedDates = blockedDates.map((d) => ({
    ...d,
    date: d.date.toISOString(),
    createdAt: d.createdAt.toISOString(),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-charcoal">Calendar</h1>
      </div>

      <AdminCalendar
        bookings={serializedBookings}
        blockedDates={serializedBlockedDates}
      />
    </div>
  );
}
