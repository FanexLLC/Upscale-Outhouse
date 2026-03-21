// Pricing configuration
export const PRICING = {
  HOURLY_RATE: 100,           // $100/hour for events under 4 hours
  HOURLY_THRESHOLD: 4,        // Hours threshold — at or above this, use daily flat rate
  DAILY_FLAT_RATE: 650,       // $650 flat rate per day (4+ hours)
  DEPOSIT_AMOUNT: 100,
  FREE_DELIVERY_MILES: 50,
  DELIVERY_RATE_PER_MILE: 2,
  MAX_DELIVERY_MILES: 150,
} as const;

// Multi-day discount tiers
export const DISCOUNTS = {
  STANDARD: { minDays: 1, maxDays: 2, discount: 0 },
  THREE_FOUR_DAYS: { minDays: 3, maxDays: 4, discount: 0.10 },
  FIVE_PLUS_DAYS: { minDays: 5, maxDays: Infinity, discount: 0.15 },
} as const;

export interface QuoteCalculation {
  numberOfDays: number;
  totalHours: number;
  isHourlyRate: boolean;
  hourlyRate: number;
  dailyRate: number;
  baseRental: number;
  rentalDescription: string;
  discountPercent: number;
  discountAmount: number;
  rentalAfterDiscount: number;
  deliveryFee: number;
  deliveryFeeNote: string;
  subtotal: number;
  depositDue: number;
  balanceDue: number;
}

/**
 * Calculate the number of days between two dates (inclusive)
 */
export function calculateDays(startDate: Date, endDate: Date): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, diffDays);
}

/**
 * Calculate event hours from start/end times (24h format "HH:MM").
 * If endTime is earlier than startTime (e.g. ends after midnight), wraps around.
 */
export function calculateHours(startTime: string, endTime: string): number {
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  const startMinutes = startH * 60 + (startM || 0);
  let endMinutes = endH * 60 + (endM || 0);
  // Handle wrapping past midnight (e.g. 22:00 to 01:00)
  if (endMinutes <= startMinutes) {
    endMinutes += 24 * 60;
  }
  return (endMinutes - startMinutes) / 60;
}

/**
 * Get the discount percentage based on number of days
 * Accepts optional custom discount rates from admin settings
 */
export function getDiscountPercent(
  days: number,
  customDiscounts?: { days3to4?: number; days5plus?: number }
): number {
  const days5PlusDiscount = customDiscounts?.days5plus !== undefined
    ? customDiscounts.days5plus / 100
    : DISCOUNTS.FIVE_PLUS_DAYS.discount;
  const days3to4Discount = customDiscounts?.days3to4 !== undefined
    ? customDiscounts.days3to4 / 100
    : DISCOUNTS.THREE_FOUR_DAYS.discount;

  if (days >= DISCOUNTS.FIVE_PLUS_DAYS.minDays) {
    return days5PlusDiscount;
  }
  if (days >= DISCOUNTS.THREE_FOUR_DAYS.minDays) {
    return days3to4Discount;
  }
  return DISCOUNTS.STANDARD.discount;
}

/**
 * Get discount label for display
 */
export function getDiscountLabel(
  days: number,
  customDiscounts?: { days3to4?: number; days5plus?: number }
): string {
  const days5PlusPercent = customDiscounts?.days5plus ?? 15;
  const days3to4Percent = customDiscounts?.days3to4 ?? 10;

  if (days >= 5) return `${days5PlusPercent}% multi-day discount`;
  if (days >= 3) return `${days3to4Percent}% multi-day discount`;
  return '';
}

/**
 * Calculate the full quote based on event details.
 *
 * Pricing model:
 * - Single-day event under 4 hours: $100/hour
 * - Single-day event 4+ hours: $650 flat rate
 * - Multi-day event: $650 per day (with multi-day discounts)
 */
export function calculateQuote(
  startDate: Date,
  endDate: Date,
  startTime: string,
  endTime: string,
  distanceMiles?: number,
  multiDayDiscounts?: { days3to4?: number; days5plus?: number },
): QuoteCalculation {
  const numberOfDays = calculateDays(startDate, endDate);
  const totalHours = calculateHours(startTime, endTime);

  const hourlyRate = PRICING.HOURLY_RATE;
  const dailyRate = PRICING.DAILY_FLAT_RATE;

  let baseRental: number;
  let isHourlyRate: boolean;
  let rentalDescription: string;

  if (numberOfDays === 1 && totalHours < PRICING.HOURLY_THRESHOLD) {
    // Under 4 hours on a single day — charge hourly
    isHourlyRate = true;
    baseRental = Math.ceil(totalHours) * hourlyRate;
    rentalDescription = `${Math.ceil(totalHours)} ${Math.ceil(totalHours) === 1 ? 'hour' : 'hours'} × $${hourlyRate}/hr`;
  } else {
    // 4+ hours or multi-day — flat daily rate
    isHourlyRate = false;
    baseRental = numberOfDays * dailyRate;
    rentalDescription = numberOfDays === 1
      ? `Full day flat rate`
      : `${numberOfDays} days × $${dailyRate}/day`;
  }

  // Multi-day discount (only applies to daily rate bookings)
  const discountPercent = isHourlyRate ? 0 : getDiscountPercent(numberOfDays, multiDayDiscounts);
  const discountAmount = baseRental * discountPercent;
  const rentalAfterDiscount = baseRental - discountAmount;

  // Delivery fee calculation
  let deliveryFee = 0;
  let deliveryFeeNote = 'Calculated at checkout';

  if (distanceMiles !== undefined) {
    if (distanceMiles > PRICING.MAX_DELIVERY_MILES) {
      deliveryFeeNote = `Outside service area (${PRICING.MAX_DELIVERY_MILES} mile max)`;
    } else if (distanceMiles <= PRICING.FREE_DELIVERY_MILES) {
      deliveryFee = 0;
      deliveryFeeNote = 'Free delivery (within 50 miles)';
    } else {
      const chargeableMiles = distanceMiles - PRICING.FREE_DELIVERY_MILES;
      deliveryFee = chargeableMiles * PRICING.DELIVERY_RATE_PER_MILE;
      deliveryFeeNote = `${chargeableMiles} miles × $${PRICING.DELIVERY_RATE_PER_MILE}/mile`;
    }
  }

  const subtotal = rentalAfterDiscount + deliveryFee;
  const depositDue = PRICING.DEPOSIT_AMOUNT;
  const balanceDue = subtotal - depositDue;

  return {
    numberOfDays,
    totalHours,
    isHourlyRate,
    hourlyRate,
    dailyRate,
    baseRental,
    rentalDescription,
    discountPercent,
    discountAmount,
    rentalAfterDiscount,
    deliveryFee,
    deliveryFeeNote,
    subtotal,
    depositDue,
    balanceDue,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Format phone number for display (XXX) XXX-XXXX
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (at least 10 digits)
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10;
}
