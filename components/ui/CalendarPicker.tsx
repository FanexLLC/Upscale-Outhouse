'use client';

import { useState, useEffect, useCallback } from 'react';

interface UnavailableDate {
  date: string;
  reason: 'booked' | 'blocked';
}

interface CalendarPickerProps {
  selectedDate: string;
  onSelect: (date: string) => void;
  minDate?: string;
  label: string;
  error?: string;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarPicker({
  selectedDate,
  onSelect,
  minDate,
  label,
  error,
}: CalendarPickerProps) {
  const today = new Date();
  const initialMonth = selectedDate
    ? new Date(selectedDate + 'T00:00:00')
    : minDate
      ? new Date(minDate + 'T00:00:00')
      : today;

  const [viewYear, setViewYear] = useState(initialMonth.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialMonth.getMonth());
  const [unavailableDates, setUnavailableDates] = useState<UnavailableDate[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch unavailable dates for the displayed month
  const fetchAvailability = useCallback(async (year: number, month: number) => {
    const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
    setLoading(true);
    try {
      const res = await fetch(`/api/availability?month=${monthStr}`);
      if (res.ok) {
        const data = await res.json();
        setUnavailableDates(data.unavailableDates || []);
      }
    } catch {
      // Silently fail - calendar still works without availability data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAvailability(viewYear, viewMonth);
  }, [viewYear, viewMonth, fetchAvailability]);

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  // Build calendar grid
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const unavailableSet = new Set(unavailableDates.map((d) => d.date));

  const formatDateStr = (day: number) => {
    return `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isDateDisabled = (day: number) => {
    const dateStr = formatDateStr(day);
    // Past or before minDate
    if (minDate && dateStr < minDate) return true;
    // Unavailable (booked or blocked)
    if (unavailableSet.has(dateStr)) return true;
    return false;
  };

  const isDateBooked = (day: number) => {
    const dateStr = formatDateStr(day);
    return unavailableSet.has(dateStr);
  };

  const isDatePast = (day: number) => {
    const dateStr = formatDateStr(day);
    if (minDate && dateStr < minDate) return true;
    return false;
  };

  const isSelected = (day: number) => {
    return formatDateStr(day) === selectedDate;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // Can we go to previous month?
  const canGoPrev = () => {
    if (!minDate) return true;
    const minD = new Date(minDate + 'T00:00:00');
    const prevMonthEnd = new Date(viewYear, viewMonth, 0);
    return prevMonthEnd >= minD;
  };

  return (
    <div>
      <label className="block text-cream/90 font-medium mb-2">{label}</label>
      <div className={`bg-charcoal-dark border rounded-lg p-4 ${error ? 'border-red-500' : 'border-charcoal-light'}`}>
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={goToPrevMonth}
            disabled={!canGoPrev()}
            className="p-1 text-cream/70 hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous month"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <span className="text-cream font-semibold text-sm">
            {monthNames[viewMonth]} {viewYear}
            {loading && <span className="ml-2 text-cream/40 text-xs">Loading...</span>}
          </span>
          <button
            type="button"
            onClick={goToNextMonth}
            className="p-1 text-cream/70 hover:text-gold transition-colors"
            aria-label="Next month"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="text-center text-cream/50 text-xs font-medium py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before the 1st */}
          {Array.from({ length: firstDayOfMonth }, (_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const disabled = isDateDisabled(day);
            const booked = isDateBooked(day);
            const past = isDatePast(day);
            const selected = isSelected(day);

            return (
              <button
                key={day}
                type="button"
                disabled={disabled}
                onClick={() => onSelect(formatDateStr(day))}
                className={`
                  aspect-square flex items-center justify-center rounded text-sm font-medium transition-all
                  ${selected
                    ? 'bg-gold text-charcoal-dark ring-2 ring-gold/50'
                    : booked
                      ? 'bg-red-500/20 text-red-400 cursor-not-allowed line-through'
                      : past
                        ? 'text-cream/20 cursor-not-allowed'
                        : 'text-cream bg-green-500/10 border border-green-500/20 hover:bg-gold/20 hover:text-gold cursor-pointer'
                  }
                `}
                aria-label={`${monthNames[viewMonth]} ${day}${booked ? ', booked' : past ? ', unavailable' : ', available'}`}
                aria-disabled={disabled}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-charcoal-light/50 text-xs text-cream/50">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-green-500/10 border border-green-500/20" />
            Available
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-500/20" />
            Booked
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-gold" />
            Selected
          </div>
        </div>
      </div>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
