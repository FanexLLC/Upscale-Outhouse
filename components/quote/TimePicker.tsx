'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { formatTimeDisplay } from '@/lib/time';

interface TimePickerProps {
  label: string;
  value: string | null;
  onChange: (value: string) => void;
  times: string[];
  helperText?: string;
  error?: string;
}

export default function TimePicker({
  label,
  value,
  onChange,
  times,
  helperText,
  error,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const selectedRef = useRef<HTMLLIElement>(null);

  const displayValue = value ? formatTimeDisplay(value) : 'Select time';

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Scroll selected item into view when opening
  useEffect(() => {
    if (open && selectedRef.current && listRef.current) {
      selectedRef.current.scrollIntoView({ block: 'center' });
    }
  }, [open]);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    },
    [],
  );

  const handleSelect = (t: string) => {
    onChange(t);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      <label className="block text-sm font-medium text-cream/90 mb-2">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full px-4 py-3 bg-charcoal-dark border rounded-lg text-left shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal ${
          error
            ? 'border-red-500 ring-1 ring-red-500/30'
            : open
              ? 'border-gold ring-2 ring-gold/30'
              : 'border-charcoal-light hover:border-gold/30'
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex items-center justify-between">
          <span className={value ? 'text-cream' : 'text-cream/50'}>
            {displayValue}
          </span>
          <svg
            className={`h-4 w-4 text-cream/50 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute z-50 mt-1.5 w-full max-h-60 overflow-y-auto rounded-xl border border-charcoal-light/30 bg-charcoal-dark shadow-xl ring-1 ring-black/10 scrollbar-thin"
        >
          {times.map((t) => {
            const isSelected = t === value;
            return (
              <li
                key={t}
                ref={isSelected ? selectedRef : undefined}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(t)}
                className={`px-4 py-2.5 cursor-pointer text-sm transition-colors ${
                  isSelected
                    ? 'bg-gold/20 text-gold font-medium'
                    : 'text-cream hover:bg-gold/10 hover:text-gold'
                }`}
              >
                {formatTimeDisplay(t)}
              </li>
            );
          })}
        </ul>
      )}

      {error && <p className="text-red-400 text-sm mt-1.5">{error}</p>}
      {helperText && !error && (
        <p className="text-cream/40 text-xs mt-1.5">{helperText}</p>
      )}
    </div>
  );
}
