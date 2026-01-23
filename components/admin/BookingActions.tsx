"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Booking } from "@prisma/client";

interface BookingActionsProps {
  booking: Booking;
}

export default function BookingActions({ booking }: BookingActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const updateBooking = async (data: Record<string, unknown>) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to update booking");
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (status: string) => {
    if (confirm(`Are you sure you want to mark this booking as ${status}?`)) {
      updateBooking({ status });
    }
  };

  const handleBalancePaid = () => {
    if (confirm("Mark balance as paid?")) {
      updateBooking({ balancePaid: true, balancePaidAt: new Date().toISOString() });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-charcoal mb-4">Actions</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {/* Status Actions */}
        {booking.status === "PENDING" && (
          <button
            onClick={() => handleStatusChange("CONFIRMED")}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            Confirm Booking
          </button>
        )}

        {booking.status === "CONFIRMED" && (
          <button
            onClick={() => handleStatusChange("COMPLETED")}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Mark as Completed
          </button>
        )}

        {(booking.status === "PENDING" || booking.status === "CONFIRMED") && (
          <button
            onClick={() => handleStatusChange("CANCELLED")}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            Cancel Booking
          </button>
        )}

        {/* Balance Payment */}
        {booking.depositPaid && !booking.balancePaid && (
          <button
            onClick={handleBalancePaid}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-gold text-white font-medium rounded-lg hover:bg-gold-olive transition-colors disabled:opacity-50"
          >
            Mark Balance as Paid
          </button>
        )}

        {/* Contact Links */}
        <div className="pt-3 border-t space-y-2">
          <a
            href={`mailto:${booking.customerEmail}`}
            className="block w-full px-4 py-2 text-center border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Email Customer
          </a>
          <a
            href={`tel:${booking.customerPhone}`}
            className="block w-full px-4 py-2 text-center border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Call Customer
          </a>
        </div>
      </div>
    </div>
  );
}
