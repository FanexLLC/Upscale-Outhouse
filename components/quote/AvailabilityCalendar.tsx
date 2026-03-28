'use client';

import { useState, useEffect, useCallback } from 'react';

interface UnavailableDate {
  date: string;
  reason: 'booked' | 'blocked';
}

interface AvailabilityCalendarProps {
  selectedStart: string | null;
  selectedEnd: string | null;
  isRange: boolean;
  numberOfDays: number;
  onSelectDate: (date: string) => void;
  onSelectRange: (start: string, end: string) => void;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function formatDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return formatDateStr(d.getFullYear(), d.getMonth(), d.getDate());
}

function isSameDay(a: string, b: string): boolean {
  return a === b;
}

function isInRange(date: string, start: string | null, end: string | null): boolean {
  if (!start || !end) return false;
  return date >= start && date <= end;
}

export default function AvailabilityCalendar({
  selectedStart,
  selectedEnd,
  isRange,
  numberOfDays,
  onSelectDate,
  onSelectRange,
}: AvailabilityCalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [unavailable, setUnavailable] = useState<UnavailableDate[]>([]);
  const [loading, setLoading] = useState(false);

  const todayStr = formatDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  const fetchAvailability = useCallback(async (year: number, month: number) => {
    setLoading(true);
    try {
      const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
      const res = await fetch(`/api/availability?month=${monthStr}`);
      if (res.ok) {
        const data = await res.json();
        setUnavailable(data.unavailableDates || []);
      }
    } catch {
      // Silently fail — calendar still usable
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAvailability(viewYear, viewMonth);
  }, [viewYear, viewMonth, fetchAvailability]);

  const unavailableSet = new Set(unavailable.map((d) => d.date));

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Build the calendar grid
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const handleDayClick = (dateStr: string) => {
    if (unavailableSet.has(dateStr)) return;
    if (dateStr < todayStr) return;

    if (isRange) {
      const endStr = addDays(dateStr, numberOfDays - 1);
      onSelectRange(dateStr, endStr);
    } else {
      onSelectDate(dateStr);
    }
  };

  const cells: React.ReactNode[] = [];

  // Empty cells for offset
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(<div key={`empty-${i}`} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = formatDateStr(viewYear, viewMonth, day);
    const isUnavailable = unavailableSet.has(dateStr);
    const isPast = dateStr < todayStr;
    const isToday = isSameDay(dateStr, todayStr);
    const isSelectedStart = selectedStart ? isSameDay(dateStr, selectedStart) : false;
    const isSelectedEnd = selectedEnd ? isSameDay(dateStr, selectedEnd) : false;
    const isSelected = isSelectedStart || isSelectedEnd;
    const inRange = isRange && isInRange(dateStr, selectedStart, selectedEnd) && !isSelected;
    const isDisabled = isUnavailable || isPast;

    let className = 'relative w-full aspect-square flex items-center justify-center rounded-lg text-sm font-body transition-all duration-150 ';

    if (isDisabled) {
      className += 'text-text-muted/40 cursor-not-allowed';
      if (isUnavailable && !isPast) {
        className += ' line-through text-error/50';
      }
    } else if (isSelected) {
      className += 'bg-gold-primary text-bg-primary font-semibold cursor-pointer';
    } else if (inRange) {
      className += 'bg-gold-primary/20 text-gold-light cursor-pointer';
    } else {
      className += 'text-text-primary hover:bg-gold-primary/10 cursor-pointer';
    }

    if (isToday && !isSelected) {
      className += ' ring-1 ring-gold-primary';
    }

    cells.push(
      <button
        key={dateStr}
        type="button"
        disabled={isDisabled}
        onClick={() => handleDayClick(dateStr)}
        className={className}
        aria-label={`${MONTH_NAMES[viewMonth]} ${day}, ${viewYear}${isUnavailable ? ' (unavailable)' : ''}`}
      >
        {day}
      </button>
    );
  }

  // Can't go to past months
  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  return (
    <div className="bg-bg-secondary rounded-card border border-[rgba(201,168,76,0.15)] p-4 sm:p-6">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goToPrevMonth}
          disabled={!canGoPrev}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-text-secondary hover:text-gold-primary hover:bg-bg-elevated transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h3 className="font-display text-h4 text-text-primary">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </h3>
        <button
          type="button"
          onClick={goToNextMonth}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-text-secondary hover:text-gold-primary hover:bg-bg-elevated transition-colors"
          aria-label="Next month"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="text-center text-text-muted text-xs font-body py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {loading ? (
          <div className="col-span-7 py-12 text-center text-text-muted text-sm">
            Loading availability...
          </div>
        ) : (
          cells
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-gold-dark/20">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <div className="w-3 h-3 rounded bg-gold-primary" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <div className="w-3 h-3 rounded ring-1 ring-gold-primary" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <div className="w-3 h-3 rounded bg-error/30" />
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
}
