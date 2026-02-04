export function formatTimeDisplay(time?: string | null): string {
  if (!time) return '';

  const raw = time.trim();
  if (!raw) return '';

  const upper = raw.toUpperCase();

  // Match "H:MM AM" or "HH:MM PM" (minutes optional)
  const ampmMatch = upper.match(/^(\d{1,2})(?::(\d{1,2}))?\s*(AM|PM)$/);
  if (ampmMatch) {
    const hour = parseInt(ampmMatch[1], 10);
    const minutes = (ampmMatch[2] ?? '00').padStart(2, '0');
    const ampm = ampmMatch[3];
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }

  // Match 24-hour "HH:MM" or "H:MM" (minutes optional)
  const time24Match = upper.match(/^(\d{1,2})(?::(\d{1,2}))?$/);
  if (time24Match) {
    const hour = parseInt(time24Match[1], 10);
    const minutes = (time24Match[2] ?? '00').padStart(2, '0');
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }

  return raw;
}

export function formatTimeRange(start?: string | null, end?: string | null): string {
  const startDisplay = formatTimeDisplay(start);
  const endDisplay = formatTimeDisplay(end);

  if (startDisplay && endDisplay) return `${startDisplay} - ${endDisplay}`;
  return startDisplay || endDisplay || '';
}
