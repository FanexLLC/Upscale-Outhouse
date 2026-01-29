'use client';

import { useState, useEffect, useCallback } from 'react';

interface UnavailableDate {
  date: string;
  reason: 'booked' | 'blocked';
}

interface CalendarPickerProps {
  /** Single-date mode */
  selectedDate?: string;
  onSelect?: (date: string) => void;
  /** Range mode */
  startDate?: string;
  endDate?: string;
  onRangeSelect?: (start: string, end: string) => void;
  minDate?: string;
  label?: string;
  error?: string;
  /** Second error shown below (for end date) */
  endError?: string;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Format "YYYY-MM-DD" → "Jan 15, 2026" */
function formatUS(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${MONTH_SHORT[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`;
}

export default function CalendarPicker({
  selectedDate,
  onSelect,
  startDate,
  endDate,
  onRangeSelect,
  minDate,
  label,
  error,
  endError,
}: CalendarPickerProps) {
  const isRange = !!onRangeSelect;

  const today = new Date();
  const refDate = startDate || selectedDate || minDate;
  const initialMonth = refDate
    ? new Date(refDate + 'T00:00:00')
    : today;

  const [viewYear, setViewYear] = useState(initialMonth.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialMonth.getMonth());
  const [unavailableDates, setUnavailableDates] = useState<UnavailableDate[]>([]);
  const [loading, setLoading] = useState(false);
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  // Track click count for range: 0 = nothing selected, 1 = start selected, 2 = range complete
  const [rangeStep, setRangeStep] = useState<number>(() => {
    if (!isRange) return 0;
    if (startDate && endDate) return 2;
    if (startDate) return 1;
    return 0;
  });

  // Sync rangeStep when props change externally
  useEffect(() => {
    if (!isRange) return;
    if (startDate && endDate) setRangeStep(2);
    else if (startDate) setRangeStep(1);
    else setRangeStep(0);
  }, [isRange, startDate, endDate]);

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
    if (minDate && dateStr < minDate) return true;
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

  // Range helpers
  const isStart = (dateStr: string) => isRange && dateStr === startDate;
  const isEnd = (dateStr: string) => isRange && dateStr === endDate;
  const isInRange = (dateStr: string) => {
    if (!isRange || !startDate) return false;
    const end = endDate || hoverDate;
    if (!end) return false;
    const effectiveStart = startDate <= end ? startDate : end;
    const effectiveEnd = startDate <= end ? end : startDate;
    return dateStr > effectiveStart && dateStr < effectiveEnd;
  };
  const isSelected = (dateStr: string) => {
    if (isRange) return isStart(dateStr) || isEnd(dateStr);
    return dateStr === selectedDate;
  };

  const handleDayClick = (dateStr: string) => {
    if (!isRange) {
      onSelect?.(dateStr);
      return;
    }

    if (rangeStep === 0 || rangeStep === 2) {
      // First click or reset: set start
      onRangeSelect?.(dateStr, '');
      setRangeStep(1);
    } else {
      // Second click: set end
      if (dateStr >= (startDate || '')) {
        onRangeSelect?.(startDate || '', dateStr);
      } else {
        // Clicked before start — make it the new start, old start becomes end
        onRangeSelect?.(dateStr, startDate || '');
      }
      setRangeStep(2);
      setHoverDate(null);
    }
  };

  const handleDayHover = (dateStr: string) => {
    if (isRange && rangeStep === 1) {
      setHoverDate(dateStr);
    }
  };

  const canGoPrev = () => {
    if (!minDate) return true;
    const minD = new Date(minDate + 'T00:00:00');
    const prevMonthEnd = new Date(viewYear, viewMonth, 0);
    return prevMonthEnd >= minD;
  };

  const hasError = !!error || !!endError;

  return (
    <div className="max-w-sm mx-auto">
      {label && <label className="block text-sm font-medium text-cream/90 mb-2">{label}</label>}

      {/* Selected range display */}
      {isRange && (
        <div className="flex items-center gap-2 mb-2">
          <div className={`flex-1 rounded-lg border px-2.5 py-1.5 text-xs ${startDate ? 'border-gold/40 text-cream' : 'border-charcoal-light text-cream/40'}`}>
            <span className="text-cream/50 text-[10px] block leading-tight">Start</span>
            {startDate ? formatUS(startDate) : 'Select'}
          </div>
          <svg className="h-3 w-3 text-cream/30 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
          <div className={`flex-1 rounded-lg border px-2.5 py-1.5 text-xs ${endDate ? 'border-gold/40 text-cream' : 'border-charcoal-light text-cream/40'}`}>
            <span className="text-cream/50 text-[10px] block leading-tight">End</span>
            {endDate ? formatUS(endDate) : 'Select'}
          </div>
        </div>
      )}

      <div className={`bg-charcoal-dark border rounded-xl p-3 shadow-sm transition-all ${hasError ? 'border-red-500 ring-1 ring-red-500/30' : 'border-charcoal-light hover:border-gold/20'}`}>
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={goToPrevMonth}
            disabled={!canGoPrev()}
            className="p-1 rounded-lg text-cream/70 hover:text-gold hover:bg-gold/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Previous month"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <span className="text-cream font-semibold text-xs">
            {MONTH_NAMES[viewMonth]} {viewYear}
            {loading && <span className="ml-1.5 text-cream/40 text-[10px]">Loading...</span>}
          </span>
          <button
            type="button"
            onClick={goToNextMonth}
            className="p-1 rounded-lg text-cream/70 hover:text-gold hover:bg-gold/10 transition-all"
            aria-label="Next month"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-0.5 mb-0.5">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="text-center text-cream/50 text-[10px] font-medium py-0.5">
              {day}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-0.5">
          {/* Empty cells for days before the 1st */}
          {Array.from({ length: firstDayOfMonth }, (_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dateStr = formatDateStr(day);
            const disabled = isDateDisabled(day);
            const booked = isDateBooked(day);
            const past = isDatePast(day);
            const selected = isSelected(dateStr);
            const inRange = isInRange(dateStr);
            const start = isStart(dateStr);
            const end = isEnd(dateStr);

            let dayClass = '';
            if (selected) {
              dayClass = 'bg-gold text-charcoal-dark ring-1 ring-gold/50 font-bold';
            } else if (inRange) {
              dayClass = 'bg-gold/15 text-gold';
            } else if (booked) {
              dayClass = 'bg-red-500/20 text-red-400 cursor-not-allowed line-through';
            } else if (past) {
              dayClass = 'text-cream/20 cursor-not-allowed';
            } else {
              dayClass = 'text-cream bg-green-500/10 border border-green-500/20 hover:bg-gold/20 hover:text-gold cursor-pointer';
            }

            // Rounded corners for range endpoints
            let roundClass = 'rounded-sm';
            if (start && (endDate || hoverDate)) roundClass = 'rounded-l rounded-r-[2px]';
            else if (end) roundClass = 'rounded-r rounded-l-[2px]';
            else if (inRange) roundClass = 'rounded-[2px]';

            return (
              <button
                key={day}
                type="button"
                disabled={disabled}
                onClick={() => handleDayClick(dateStr)}
                onMouseEnter={() => handleDayHover(dateStr)}
                className={`aspect-square flex items-center justify-center text-xs font-medium transition-all ${roundClass} ${dayClass}`}
                aria-label={`${MONTH_NAMES[viewMonth]} ${day}${booked ? ', booked' : past ? ', unavailable' : selected ? ', selected' : inRange ? ', in range' : ', available'}`}
                aria-disabled={disabled}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-2 pt-2 border-t border-charcoal-light/30 text-[10px] text-cream/50">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-green-500/10 border border-green-500/20" />
            Available
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-red-500/20" />
            Booked
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-gold" />
            Selected
          </div>
          {isRange && (
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-sm bg-gold/15" />
              In range
            </div>
          )}
        </div>
      </div>

      {error && <p className="text-red-400 text-sm mt-1.5">{error}</p>}
      {endError && <p className="text-red-400 text-sm mt-1">{endError}</p>}
    </div>
  );
}
