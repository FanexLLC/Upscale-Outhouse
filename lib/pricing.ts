// Pricing configuration
export const PRICING = {
  BASE_DAILY_RATE: 450,
  WEEKDAY_RATE: 450,
  WEEKEND_RATE: 450,
  DEPOSIT_AMOUNT: 1,
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
  weekdayCount: number;
  weekendCount: number;
  weekdayRate: number;
  weekendRate: number;
  baseRental: number;
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
 * Check if a date falls on a weekend (Friday, Saturday, or Sunday)
 */
export function isWeekendDay(date: Date): boolean {
  const day = date.getDay(); // 0=Sun, 1=Mon, ..., 5=Fri, 6=Sat
  return day === 0 || day === 5 || day === 6;
}

/**
 * Count weekday and weekend days in a date range (inclusive)
 */
export function countDayTypes(startDate: Date, endDate: Date): { weekdays: number; weekends: number } {
  const start = new Date(startDate);
  const end = new Date(endDate);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  let weekdays = 0;
  let weekends = 0;
  const current = new Date(start);

  while (current <= end) {
    if (isWeekendDay(current)) {
      weekends++;
    } else {
      weekdays++;
    }
    current.setDate(current.getDate() + 1);
  }

  // Ensure at least 1 total day
  if (weekdays + weekends === 0) {
    if (isWeekendDay(start)) {
      weekends = 1;
    } else {
      weekdays = 1;
    }
  }

  return { weekdays, weekends };
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
 * Get the discount percentage based on number of days
 */
export function getDiscountPercent(days: number): number {
  if (days >= DISCOUNTS.FIVE_PLUS_DAYS.minDays) {
    return DISCOUNTS.FIVE_PLUS_DAYS.discount;
  }
  if (days >= DISCOUNTS.THREE_FOUR_DAYS.minDays) {
    return DISCOUNTS.THREE_FOUR_DAYS.discount;
  }
  return DISCOUNTS.STANDARD.discount;
}

/**
 * Get discount label for display
 */
export function getDiscountLabel(days: number): string {
  if (days >= 5) return '15% multi-day discount';
  if (days >= 3) return '10% multi-day discount';
  return '';
}

/**
 * Calculate the full quote based on event details
 * Supports separate weekday/weekend pricing
 */
export function calculateQuote(
  startDate: Date,
  endDate: Date,
  distanceMiles?: number,
  weekdayPrice?: number,
  weekendPrice?: number
): QuoteCalculation {
  const numberOfDays = calculateDays(startDate, endDate);
  const { weekdays, weekends } = countDayTypes(startDate, endDate);

  const effectiveWeekdayRate = weekdayPrice ?? PRICING.WEEKDAY_RATE;
  const effectiveWeekendRate = weekendPrice ?? PRICING.WEEKEND_RATE;

  const baseRental = (weekdays * effectiveWeekdayRate) + (weekends * effectiveWeekendRate);

  const discountPercent = getDiscountPercent(numberOfDays);
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
    weekdayCount: weekdays,
    weekendCount: weekends,
    weekdayRate: effectiveWeekdayRate,
    weekendRate: effectiveWeekendRate,
    baseRental,
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
