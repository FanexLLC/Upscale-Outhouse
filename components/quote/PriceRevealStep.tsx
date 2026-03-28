'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import OverlineLabel from '@/components/ui/OverlineLabel';
import GoldShimmer from '@/components/ui/GoldShimmer';
import type { WizardData } from './QuoteWizard';

interface PriceRevealStepProps {
  data: WizardData;
  onBack: () => void;
}

interface QuoteResult {
  id: string;
  rentalDescription: string;
  baseRental: number;
  discountPercent: number;
  discountAmount: number;
  rentalAfterDiscount: number;
  deliveryFee: number;
  deliveryFeeNote: string;
  distanceMiles: number | null;
  totalAmount: number;
  depositDue: number;
  balanceDue: number;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export default function PriceRevealStep({ data, onBack }: PriceRevealStepProps) {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    fetchQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchQuote = async () => {
    setLoading(true);
    setError('');

    try {
      const body = {
        startDate: data.startDate,
        endDate: data.endDate || data.startDate,
        startTime: data.startTime,
        endTime: data.endTime,
        eventType: data.eventType,
        guestCount: data.guestCount,
        hasWaterHookup: false,
        hasPowerAvailable: false,
        eventLocation: data.eventLocation,
        eventLat: data.eventLat,
        eventLng: data.eventLng,
        eventCity: data.eventCity,
        eventState: data.eventState,
        eventZip: data.eventZip,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
      };

      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || result.message || 'Failed to generate quote');
        return;
      }

      setQuote({
        id: result.quote.id,
        rentalDescription: result.quote.rentalDescription,
        baseRental: result.quote.baseRental,
        discountPercent: result.quote.discountPercent,
        discountAmount: result.quote.discountAmount,
        rentalAfterDiscount: result.quote.rentalAfterDiscount,
        deliveryFee: result.quote.deliveryFee,
        deliveryFeeNote: result.quote.deliveryFeeNote,
        distanceMiles: result.quote.distanceMiles,
        totalAmount: result.quote.totalAmount,
        depositDue: result.quote.depositDue,
        balanceDue: result.quote.balanceDue,
      });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    setConfirming(true);
    // The quote is already saved in the API call above.
    // This just signals the user's intent to confirm.
    // In a real integration, this could trigger an email or update the booking status.
    await new Promise((resolve) => setTimeout(resolve, 800));
    setConfirmed(true);
    setConfirming(false);
  };

  // Loading State
  if (loading) {
    return (
      <div className="space-y-6 py-8">
        <div className="text-center mb-8">
          <OverlineLabel>Calculating Your Quote</OverlineLabel>
          <h2 className="font-display text-h3 text-text-primary mt-3">
            Crunching the numbers...
          </h2>
        </div>
        <div className="space-y-4 max-w-md mx-auto">
          <GoldShimmer height={24} />
          <GoldShimmer height={24} width="80%" />
          <GoldShimmer height={24} width="60%" />
          <GoldShimmer height={48} className="mt-4" />
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="text-center py-8 space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-error/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-error" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h2 className="font-display text-h3 text-text-primary">Something went wrong</h2>
        <p className="text-text-secondary text-body">{error}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="ghost" size="md" onClick={onBack}>
            &larr; Go Back
          </Button>
          <Button variant="primary" size="md" onClick={fetchQuote}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Confirmed State
  if (confirmed) {
    return (
      <div className="text-center py-12 space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-gold-primary/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-gold-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="font-display text-h2 text-text-primary">Thank You!</h2>
        <p className="text-text-secondary text-body max-w-md mx-auto">
          We&apos;ll be in touch within 2 hours to confirm your booking details and next steps.
        </p>
        <div className="pt-4">
          <Button variant="phone" size="lg" href="tel:+15596630356">
            (559) 663-0356
          </Button>
        </div>
      </div>
    );
  }

  // Quote Display
  if (!quote) return null;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <OverlineLabel>Your Personalized Quote</OverlineLabel>
        <h2 className="font-display text-h2 text-text-primary mt-3">
          Here&apos;s Your Estimate
        </h2>
      </div>

      {/* Price Breakdown */}
      <Card hover={false} className="!p-6 sm:!p-8">
        <div className="space-y-4">
          {/* Base Rental */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-text-primary font-body font-medium">Base rental</p>
              <p className="text-text-muted text-sm">{quote.rentalDescription}</p>
            </div>
            <span className="text-text-primary font-body font-medium">
              {formatCurrency(quote.baseRental)}
            </span>
          </div>

          {/* Discount */}
          {quote.discountAmount > 0 && (
            <div className="flex justify-between items-start">
              <div>
                <p className="text-success font-body font-medium">
                  Multi-day discount ({Math.round(quote.discountPercent * 100)}%)
                </p>
              </div>
              <span className="text-success font-body font-medium">
                &minus;{formatCurrency(quote.discountAmount)}
              </span>
            </div>
          )}

          {/* Delivery Fee */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-text-primary font-body font-medium">Delivery fee</p>
              <p className="text-text-muted text-sm">{quote.deliveryFeeNote}</p>
            </div>
            <span className="text-text-primary font-body font-medium">
              {quote.deliveryFee === 0 ? 'Free' : formatCurrency(quote.deliveryFee)}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-gold-dark/30 my-2" />

          {/* Total */}
          <div className="flex justify-between items-center">
            <p className="text-text-primary font-body font-semibold text-lg">Estimated total</p>
            <span className="font-display text-h3 text-gold-primary">
              {formatCurrency(quote.totalAmount)}
            </span>
          </div>

          <div className="h-px bg-gold-dark/15" />

          {/* Deposit / Balance */}
          <div className="flex justify-between items-center">
            <p className="text-text-secondary font-body text-sm">Deposit due to reserve</p>
            <span className="text-text-secondary font-body">
              {formatCurrency(quote.depositDue)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-text-secondary font-body text-sm">Balance due at event</p>
            <span className="text-text-secondary font-body">
              {formatCurrency(quote.balanceDue)}
            </span>
          </div>
        </div>
      </Card>

      {/* Disclaimer */}
      <p className="text-text-muted text-small text-center">
        This is an estimate. Final pricing confirmed upon booking.
      </p>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <Button
          variant="primary"
          size="lg"
          onClick={handleConfirm}
          disabled={confirming}
          className="w-full"
        >
          {confirming ? 'Submitting...' : 'CONFIRM BOOKING REQUEST'}
        </Button>
        <Button variant="phone" size="lg" href="tel:+15596630356" className="w-full justify-center">
          CALL TO DISCUSS
        </Button>
      </div>

      {/* Back link */}
      <div className="text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-text-muted text-sm hover:text-text-secondary transition-colors"
        >
          &larr; Go back and adjust
        </button>
      </div>
    </div>
  );
}