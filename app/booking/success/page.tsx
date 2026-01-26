'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface BookingDetails {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventAddress: string;
  eventCity: string | null;
  eventState: string | null;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  eventType: string;
  guestCount: string;
  numberOfDays: number;
  totalAmount: number;
  depositAmount: number;
  depositPaid: boolean;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

function formatEventType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
}

function LoadingState() {
  return (
    <main className="min-h-screen bg-charcoal-dark py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-charcoal rounded-xl border border-gold/20 p-8 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-gold border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-cream/70">Loading your booking details...</p>
        </div>
      </div>
    </main>
  );
}

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('booking_id');
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooking() {
      if (!bookingId) {
        setError('No booking ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/booking?id=${bookingId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch booking');
        }

        setBooking(data.booking);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load booking details');
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !booking) {
    return (
      <main className="min-h-screen bg-charcoal-dark py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-charcoal rounded-xl border border-red-500/30 p-8 text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-cream mb-2">Something went wrong</h1>
            <p className="text-cream/70 mb-6">{error || 'Unable to load booking details'}</p>
            <Link
              href="/quote"
              className="inline-block px-6 py-3 bg-gold text-charcoal-dark rounded-lg font-semibold hover:bg-gold-light transition-colors"
            >
              Start New Quote
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const balanceDue = booking.totalAmount - booking.depositAmount;
  const eventDateRange = booking.startDate === booking.endDate
    ? formatDate(booking.startDate)
    : `${formatDate(booking.startDate)} - ${formatDate(booking.endDate)}`;

  return (
    <main className="min-h-screen bg-charcoal-dark py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gold mb-2">Booking Confirmed!</h1>
          <p className="text-cream/70">Thank you for choosing Upscale Outhouse</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-charcoal rounded-xl border border-gold/20 overflow-hidden">
          {/* Booking ID */}
          <div className="bg-charcoal-dark px-6 py-4 border-b border-gold/20">
            <p className="text-cream/60 text-sm">Booking Reference</p>
            <p className="text-gold font-mono text-lg">{booking.id}</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Event Details */}
            <div>
              <h2 className="text-lg font-semibold text-gold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Event Details
              </h2>
              <div className="bg-charcoal-dark rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-cream/60">Date</span>
                  <span className="text-cream">{eventDateRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/60">Time</span>
                  <span className="text-cream">{booking.startTime} - {booking.endTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/60">Event Type</span>
                  <span className="text-cream">{formatEventType(booking.eventType)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/60">Location</span>
                  <span className="text-cream text-right max-w-[60%]">
                    {booking.eventAddress}
                    {booking.eventCity && `, ${booking.eventCity}`}
                    {booking.eventState && `, ${booking.eventState}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div>
              <h2 className="text-lg font-semibold text-gold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Payment Summary
              </h2>
              <div className="bg-charcoal-dark rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-cream/60">Total Amount</span>
                  <span className="text-cream">{formatCurrency(booking.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-green-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Deposit Paid
                  </span>
                  <span>{formatCurrency(booking.depositAmount)}</span>
                </div>
                <div className="border-t border-gold/20 pt-3 flex justify-between text-gold font-semibold">
                  <span>Balance Due on Delivery</span>
                  <span>{formatCurrency(balanceDue)}</span>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div>
              <h2 className="text-lg font-semibold text-gold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What&apos;s Next?
              </h2>
              <div className="bg-gold/10 rounded-lg p-4">
                <ul className="space-y-3 text-cream/90">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>A confirmation email has been sent to <strong>{booking.customerEmail}</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>We&apos;ll contact you 48 hours before your event to confirm delivery details</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Please ensure the delivery location is accessible for our trailer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>The balance of <strong>{formatCurrency(balanceDue)}</strong> is due upon delivery (cash or card accepted)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-charcoal-dark rounded-lg p-4 text-center">
              <p className="text-cream/70 mb-2">Questions about your booking?</p>
              <p className="text-cream">
                Call us at <a href="tel:+15596630356" className="text-gold hover:underline">(559) 663-0356</a>
                {' '}or email{' '}
                <a href="mailto:upscaleouthouse@gmail.com" className="text-gold hover:underline">upscaleouthouse@gmail.com</a>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-charcoal-dark px-6 py-4 border-t border-gold/20 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 border border-gold/50 text-gold rounded-lg font-medium hover:bg-gold/10 transition-colors text-center"
            >
              Return Home
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-gold text-charcoal-dark rounded-lg font-semibold hover:bg-gold-light transition-colors text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <BookingSuccessContent />
    </Suspense>
  );
}
