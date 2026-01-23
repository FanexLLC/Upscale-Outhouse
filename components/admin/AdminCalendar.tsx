"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  customerName: string;
  eventType: string;
  status: string;
}

interface BlockedDate {
  id: string;
  date: string;
  reason: string | null;
  createdAt: string;
}

interface AdminCalendarProps {
  bookings: Booking[];
  blockedDates: BlockedDate[];
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function AdminCalendar({
  bookings,
  blockedDates,
}: AdminCalendarProps) {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isBlocking, setIsBlocking] = useState(false);
  const [blockReason, setBlockReason] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const getBookingsForDate = (date: Date) => {
    const dateStr = formatDateKey(date);
    return bookings.filter((b) => {
      const start = new Date(b.startDate).toISOString().split("T")[0];
      const end = new Date(b.endDate).toISOString().split("T")[0];
      return dateStr >= start && dateStr <= end;
    });
  };

  const isDateBlocked = (date: Date) => {
    const dateStr = formatDateKey(date);
    return blockedDates.some(
      (b) => new Date(b.date).toISOString().split("T")[0] === dateStr
    );
  };

  const getBlockedReason = (date: Date) => {
    const dateStr = formatDateKey(date);
    const blocked = blockedDates.find(
      (b) => new Date(b.date).toISOString().split("T")[0] === dateStr
    );
    return blocked?.reason || null;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleBlockDate = async () => {
    if (!selectedDate) return;

    setIsBlocking(true);
    try {
      const response = await fetch("/api/admin/blocked-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate.toISOString(),
          reason: blockReason || null,
        }),
      });

      if (response.ok) {
        router.refresh();
        setSelectedDate(null);
        setBlockReason("");
      }
    } catch (error) {
      console.error("Failed to block date:", error);
    } finally {
      setIsBlocking(false);
    }
  };

  const handleUnblockDate = async () => {
    if (!selectedDate) return;

    setIsBlocking(true);
    try {
      const dateStr = formatDateKey(selectedDate);
      const blocked = blockedDates.find(
        (b) => new Date(b.date).toISOString().split("T")[0] === dateStr
      );

      if (blocked) {
        const response = await fetch(
          `/api/admin/blocked-dates/${blocked.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          router.refresh();
          setSelectedDate(null);
        }
      }
    } catch (error) {
      console.error("Failed to unblock date:", error);
    } finally {
      setIsBlocking(false);
    }
  };

  const renderCalendarDays = () => {
    const days = [];

    // Empty cells for days before the first of the month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateBookings = getBookingsForDate(date);
      const blocked = isDateBlocked(date);
      const isToday = formatDateKey(date) === formatDateKey(new Date());
      const isSelected =
        selectedDate && formatDateKey(date) === formatDateKey(selectedDate);

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(date)}
          className={`h-24 p-1 border-b border-r border-gray-200 cursor-pointer transition-colors ${
            blocked ? "bg-red-50" : "bg-white hover:bg-gray-50"
          } ${isSelected ? "ring-2 ring-gold ring-inset" : ""}`}
        >
          <div className="flex items-center justify-between mb-1">
            <span
              className={`text-sm font-medium ${
                isToday
                  ? "bg-gold text-white w-6 h-6 rounded-full flex items-center justify-center"
                  : "text-gray-700"
              }`}
            >
              {day}
            </span>
            {blocked && (
              <span className="text-xs text-red-600 font-medium">Blocked</span>
            )}
          </div>
          <div className="space-y-1 overflow-hidden">
            {dateBookings.slice(0, 2).map((booking) => (
              <Link
                key={booking.id}
                href={`/admin/bookings/${booking.id}`}
                onClick={(e) => e.stopPropagation()}
                className={`block text-xs px-1 py-0.5 rounded truncate ${
                  booking.status === "CONFIRMED"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {booking.customerName}
              </Link>
            ))}
            {dateBookings.length > 2 && (
              <span className="text-xs text-gray-500">
                +{dateBookings.length - 2} more
              </span>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Calendar */}
      <div className="lg:col-span-3 bg-white rounded-lg shadow">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
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
            </button>
            <h2 className="text-xl font-semibold text-charcoal">
              {MONTHS[month]} {year}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <button
            onClick={goToToday}
            className="px-4 py-2 text-sm font-medium text-gold hover:bg-gold/10 rounded-lg transition-colors"
          >
            Today
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b">
          {DAYS.map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-gray-500 bg-gray-50"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">{renderCalendarDays()}</div>

        {/* Legend */}
        <div className="flex items-center gap-6 p-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-100 rounded" />
            <span className="text-sm text-gray-600">Confirmed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-100 rounded" />
            <span className="text-sm text-gray-600">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-50 rounded border border-red-200" />
            <span className="text-sm text-gray-600">Blocked</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Selected Date Info */}
        {selectedDate && (
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-charcoal mb-4">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h3>

            {/* Bookings for selected date */}
            {getBookingsForDate(selectedDate).length > 0 ? (
              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-gray-500">Bookings:</p>
                {getBookingsForDate(selectedDate).map((booking) => (
                  <Link
                    key={booking.id}
                    href={`/admin/bookings/${booking.id}`}
                    className="block p-2 border rounded-lg hover:border-gold transition-colors"
                  >
                    <p className="font-medium text-charcoal">
                      {booking.customerName}
                    </p>
                    <p className="text-sm text-gray-500">{booking.eventType}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mb-4">
                No bookings for this date
              </p>
            )}

            {/* Block/Unblock actions */}
            {isDateBlocked(selectedDate) ? (
              <div>
                {getBlockedReason(selectedDate) && (
                  <p className="text-sm text-gray-600 mb-2">
                    Reason: {getBlockedReason(selectedDate)}
                  </p>
                )}
                <button
                  onClick={handleUnblockDate}
                  disabled={isBlocking}
                  className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isBlocking ? "Unblocking..." : "Unblock Date"}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  placeholder="Reason (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none text-sm"
                />
                <button
                  onClick={handleBlockDate}
                  disabled={isBlocking}
                  className="w-full px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isBlocking ? "Blocking..." : "Block Date"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Upcoming Bookings */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-charcoal mb-4">
            Upcoming Bookings
          </h3>
          {bookings
            .filter((b) => new Date(b.startDate) >= new Date())
            .sort(
              (a, b) =>
                new Date(a.startDate).getTime() -
                new Date(b.startDate).getTime()
            )
            .slice(0, 5)
            .map((booking) => (
              <Link
                key={booking.id}
                href={`/admin/bookings/${booking.id}`}
                className="block p-2 mb-2 border rounded-lg hover:border-gold transition-colors"
              >
                <p className="font-medium text-charcoal text-sm">
                  {booking.customerName}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(booking.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </Link>
            ))}
          {bookings.filter((b) => new Date(b.startDate) >= new Date())
            .length === 0 && (
            <p className="text-sm text-gray-500">No upcoming bookings</p>
          )}
        </div>
      </div>
    </div>
  );
}
