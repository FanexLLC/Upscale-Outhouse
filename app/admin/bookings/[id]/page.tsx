import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import BookingActions from "@/components/admin/BookingActions";

// Prevent static generation - render on demand only
export const dynamic = "force-dynamic";

async function getBooking(id: string) {
  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  if (!booking) {
    notFound();
  }

  return booking;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
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

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = await getBooking(id);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/bookings"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-charcoal">Booking Details</h1>
          <p className="text-gray-500 text-sm">ID: {booking.id}</p>
        </div>
        <span
          className={`px-4 py-2 text-sm font-semibold rounded-full ${getStatusBadgeColor(
            booking.status
          )}`}
        >
          {booking.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-charcoal mb-4">
              Customer Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-charcoal">
                  {booking.customerName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a
                  href={`mailto:${booking.customerEmail}`}
                  className="font-medium text-gold hover:text-gold-olive"
                >
                  {booking.customerEmail}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <a
                  href={`tel:${booking.customerPhone}`}
                  className="font-medium text-gold hover:text-gold-olive"
                >
                  {booking.customerPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-charcoal mb-4">
              Event Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Event Type</p>
                <p className="font-medium text-charcoal">{booking.eventType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Guest Count</p>
                <p className="font-medium text-charcoal">
                  {booking.guestCount}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium text-charcoal">
                  {formatDate(booking.startDate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End Date</p>
                <p className="font-medium text-charcoal">
                  {formatDate(booking.endDate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium text-charcoal">
                  {booking.startTime} - {booking.endTime}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium text-charcoal">
                  {booking.numberOfDays} day{booking.numberOfDays > 1 ? "s" : ""}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Water Hookup</p>
                <p className="font-medium text-charcoal">
                  {booking.hasWaterHookup ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Power Available</p>
                <p className="font-medium text-charcoal">
                  {booking.hasPowerAvailable ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-charcoal mb-4">
              Delivery Location
            </h2>
            <div className="space-y-2">
              <p className="font-medium text-charcoal">
                {booking.eventAddress}
              </p>
              {(booking.eventCity || booking.eventState || booking.eventZip) && (
                <p className="text-gray-600">
                  {[booking.eventCity, booking.eventState, booking.eventZip]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              )}
              {booking.distanceMiles && (
                <p className="text-sm text-gray-500">
                  {booking.distanceMiles.toFixed(1)} miles from base
                </p>
              )}
            </div>
            {booking.eventLat && booking.eventLng && (
              <a
                href={`https://www.google.com/maps?q=${booking.eventLat},${booking.eventLng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-gold hover:text-gold-olive"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Open in Google Maps
              </a>
            )}
          </div>

          {/* Additional Details */}
          {booking.additionalDetails && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-charcoal mb-4">
                Additional Details
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap">
                {booking.additionalDetails}
              </p>
            </div>
          )}

          {/* Notes */}
          {booking.notes && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-charcoal mb-4">
                Internal Notes
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap">
                {booking.notes}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-charcoal mb-4">
              Pricing
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Rental</span>
                <span className="font-medium">
                  {formatCurrency(booking.baseRental)}
                </span>
              </div>
              {booking.discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({booking.discountPercent}%)</span>
                  <span>-{formatCurrency(booking.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">After Discount</span>
                <span className="font-medium">
                  {formatCurrency(booking.rentalAfterDiscount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">
                  {formatCurrency(booking.deliveryFee)}
                </span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-semibold text-charcoal">Total</span>
                <span className="font-bold text-charcoal">
                  {formatCurrency(booking.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-charcoal mb-4">
              Payment Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-charcoal">Deposit</p>
                  <p className="text-sm text-gray-500">
                    {formatCurrency(booking.depositAmount)}
                  </p>
                </div>
                {booking.depositPaid ? (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Paid
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                    Pending
                  </span>
                )}
              </div>
              {booking.depositPaidAt && (
                <p className="text-xs text-gray-500">
                  Paid on {formatDateTime(booking.depositPaidAt)}
                </p>
              )}

              <div className="border-t pt-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-charcoal">Balance</p>
                  <p className="text-sm text-gray-500">
                    {formatCurrency(
                      booking.totalAmount - booking.depositAmount
                    )}
                  </p>
                </div>
                {booking.balancePaid ? (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Paid
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                    Due on Delivery
                  </span>
                )}
              </div>
              {booking.balancePaidAt && (
                <p className="text-xs text-gray-500">
                  Paid on {formatDateTime(booking.balancePaidAt)}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <BookingActions booking={booking} />

          {/* Metadata */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-charcoal mb-4">
              Metadata
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Created</span>
                <span className="text-charcoal">
                  {formatDateTime(booking.createdAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Updated</span>
                <span className="text-charcoal">
                  {formatDateTime(booking.updatedAt)}
                </span>
              </div>
              {booking.stripePaymentId && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Stripe ID</span>
                  <span className="text-charcoal font-mono text-xs">
                    {booking.stripePaymentId.substring(0, 20)}...
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
