import { prisma } from "@/lib/db";
import Link from "next/link";

// Prevent static generation - render on demand only
export const dynamic = "force-dynamic";

async function getDashboardStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const [
    totalBookings,
    monthlyRevenue,
    yearlyRevenue,
    upcomingBookings,
    pendingBookings,
    recentBookings,
  ] = await Promise.all([
    // Total confirmed bookings
    prisma.booking.count({
      where: { status: { in: ["CONFIRMED", "COMPLETED"] } },
    }),
    // Monthly revenue
    prisma.booking.aggregate({
      where: {
        status: { in: ["CONFIRMED", "COMPLETED"] },
        depositPaidAt: { gte: startOfMonth },
      },
      _sum: { totalAmount: true },
    }),
    // Yearly revenue
    prisma.booking.aggregate({
      where: {
        status: { in: ["CONFIRMED", "COMPLETED"] },
        depositPaidAt: { gte: startOfYear },
      },
      _sum: { totalAmount: true },
    }),
    // Upcoming bookings (next 7 days)
    prisma.booking.findMany({
      where: {
        status: "CONFIRMED",
        startDate: { gte: now, lte: nextWeek },
      },
      orderBy: { startDate: "asc" },
      take: 5,
    }),
    // Pending bookings
    prisma.booking.count({
      where: { status: "PENDING" },
    }),
    // Recent bookings
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return {
    totalBookings,
    monthlyRevenue: monthlyRevenue._sum.totalAmount || 0,
    yearlyRevenue: yearlyRevenue._sum.totalAmount || 0,
    upcomingBookings,
    pendingBookings,
    recentBookings,
  };
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function getStatusBadgeColor(status: string) {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-800";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "COMPLETED":
      return "bg-blue-100 text-blue-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="text-3xl font-bold text-charcoal mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Monthly Revenue</p>
              <p className="text-2xl font-bold text-charcoal">
                {formatCurrency(stats.monthlyRevenue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Yearly Revenue</p>
              <p className="text-2xl font-bold text-charcoal">
                {formatCurrency(stats.yearlyRevenue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <p className="text-2xl font-bold text-charcoal">
                {stats.totalBookings}
              </p>
            </div>
            <div className="w-12 h-12 bg-gold-light rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gold-olive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-charcoal">
                {stats.pendingBookings}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Bookings */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-charcoal">
                Upcoming Bookings
              </h2>
              <Link
                href="/admin/bookings"
                className="text-sm text-gold hover:text-gold-olive"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            {stats.upcomingBookings.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No upcoming bookings in the next 7 days
              </p>
            ) : (
              <div className="space-y-4">
                {stats.upcomingBookings.map((booking) => (
                  <Link
                    key={booking.id}
                    href={`/admin/bookings/${booking.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-gold transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-charcoal">
                          {booking.customerName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(booking.startDate)} - {booking.eventType}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-charcoal">
                Recent Activity
              </h2>
              <Link
                href="/admin/bookings"
                className="text-sm text-gold hover:text-gold-olive"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            {stats.recentBookings.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No recent bookings
              </p>
            ) : (
              <div className="space-y-4">
                {stats.recentBookings.map((booking) => (
                  <Link
                    key={booking.id}
                    href={`/admin/bookings/${booking.id}`}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        booking.status === "CONFIRMED"
                          ? "bg-green-500"
                          : booking.status === "PENDING"
                          ? "bg-yellow-500"
                          : booking.status === "COMPLETED"
                          ? "bg-blue-500"
                          : "bg-red-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-charcoal">
                        {booking.customerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatCurrency(booking.totalAmount)} -{" "}
                        {formatDate(booking.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
