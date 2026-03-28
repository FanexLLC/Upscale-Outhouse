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
  const [quoteId, setQuoteId] = useState<string | null>(null);
  const [error, setError] = useState('');

  // Payment state
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Promo code state
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeValid, setPromoCodeValid] = useState(false);
  const [promoCodeValidating, setPromoCodeValidating] = useState(false);
  const [promoCodeMessage, setPromoCodeMessage] = useState<string | null>(null);
  const [promoCodeDiscount, setPromoCodeDiscount] = useState<{
    type: 'PERCENTAGE' | 'FULL_BYPASS' | 'FULL_DISCOUNT';
    percent?: number;
  } | null>(null);

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
        guestCount: String(data.guestCount),
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

      setQuoteId(result.quoteId);
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

  // Validate promo code
  const validatePromoCode = async () => {
    if (!promoCode.trim()) return;

    setPromoCodeValidating(true);
    setPromoCodeMessage(null);

    try {
      const res = await fetch('/api/promo-code/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode }),
      });

      const result = await res.json();

      if (result.valid) {
        setPromoCodeValid(true);
        setPromoCodeDiscount({
          type: result.discountType,
          percent: result.discountPercent,
        });
        setPromoCodeMessage(result.message);
      } else {
        setPromoCodeValid(false);
        setPromoCodeDiscount(null);
        setPromoCodeMessage(result.message);
      }
    } catch {
      setPromoCodeValid(false);
      setPromoCodeMessage('Failed to validate promo code');
    } finally {
      setPromoCodeValidating(false);
    }
  };

  // Clear promo code
  const clearPromoCode = () => {
    setPromoCode('');
    setPromoCodeValid(false);
    setPromoCodeMessage(null);
    setPromoCodeDiscount(null);
  };

  // Handle payment - redirect to Stripe Checkout or bypass for promo
  const handlePayment = async () => {
    if (!quoteId) return;

    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quoteId,
          promoCode: promoCodeValid ? promoCode : undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create booking');
      }

      // If promo code bypasses payment, redirect to success page
      if (result.bypassed) {
        window.location.href = `/booking/success?booking_id=${result.bookingId}`;
        return;
      }

      // Redirect to Stripe Checkout
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setPaymentError(err instanceof Error ? err.message : 'Failed to process payment. Please try again.');
      setIsProcessingPayment(false);
    }
  };

  // Promo calculations
  const baseDeposit = quote?.depositDue ?? 0;
  const baseTotal = quote?.totalAmount ?? 0;
  const promoPercent = promoCodeDiscount?.type === 'PERCENTAGE' ? (promoCodeDiscount.percent || 0) : 0;
  const isFullDiscount = promoCodeDiscount?.type === 'FULL_DISCOUNT';
  const isFullBypass = promoCodeDiscount?.type === 'FULL_BYPASS';

  const maxPromoDiscount = Math.max(0, baseTotal - baseDeposit);
  const promoDiscountTotal = promoPercent > 0
    ? Math.min(Math.round(baseTotal * promoPercent * 100) / 100, maxPromoDiscount)
    : 0;
  const displayPromoDiscountTotal = isFullDiscount ? baseTotal : promoDiscountTotal;
  const totalAfterPromo = isFullDiscount
    ? 0
    : Math.max(0, Math.round((baseTotal - promoDiscountTotal) * 100) / 100);
  const depositDueNow = (isFullBypass || isFullDiscount) ? 0 : baseDeposit;
  const balanceDueWithPromo = isFullDiscount
    ? 0
    : Math.max(0, Math.round((totalAfterPromo - baseDeposit) * 100) / 100);

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

          {/* Multi-day Discount */}
          {quote.discountAmount > 0 && (
            <div className="flex justify-between items-start">
              <p className="text-success font-body font-medium">
                Multi-day discount ({Math.round(quote.discountPercent * 100)}%)
              </p>
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

          {/* Promo Discount */}
          {((promoCodeDiscount?.type === 'PERCENTAGE' && promoDiscountTotal > 0) || isFullDiscount) && (
            <div className="flex justify-between items-start">
              <p className="text-success font-body font-medium">
                Promo discount ({isFullDiscount ? 100 : Math.round(promoPercent * 100)}%)
              </p>
              <span className="text-success font-body font-medium">
                &minus;{formatCurrency(displayPromoDiscountTotal)}
              </span>
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-gold-dark/30 my-2" />

          {/* Total */}
          <div className="flex justify-between items-center">
            <p className="text-text-primary font-body font-semibold text-lg">Total</p>
            <span className="font-display text-h3 text-gold-primary">
              {formatCurrency(totalAfterPromo)}
            </span>
          </div>

          <div className="h-px bg-gold-dark/15" />

          {/* Deposit / Balance */}
          <div className="bg-gold-primary/10 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gold-primary font-body font-bold text-lg">Deposit Due Now</p>
              <span className="text-gold-primary font-body font-bold text-lg">
                {formatCurrency(depositDueNow)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-text-secondary font-body text-sm">Balance due on delivery</p>
              <span className="text-text-secondary font-body">
                {formatCurrency(balanceDueWithPromo)}
              </span>
            </div>
            {(isFullBypass || isFullDiscount) && (
              <p className="text-text-muted text-xs mt-2">
                {isFullDiscount
                  ? 'Total and deposit are fully waived.'
                  : 'Deposit will be recorded as paid (cash/offline).'}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Quote ID */}
      <p className="text-text-muted text-sm text-center">
        Quote ID: <span className="text-text-secondary font-mono">{quoteId}</span>
      </p>

      {/* Promo Code */}
      <Card hover={false} className="!p-6">
        <h3 className="font-body font-semibold text-gold-primary border-b border-gold-primary/10 pb-2 mb-4">
          Promo Code
        </h3>
        {promoCodeValid ? (
          <div className="flex items-center justify-between bg-success/10 border border-success/30 rounded-lg p-3">
            <div>
              <p className="text-success font-medium">{promoCode.toUpperCase()}</p>
              <p className="text-success/70 text-sm">{promoCodeMessage}</p>
            </div>
            <button
              type="button"
              onClick={clearPromoCode}
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="Enter promo code"
                className="flex-1 px-4 py-2 bg-bg-primary border border-gold-dark/30 rounded-lg text-text-primary placeholder-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary font-body"
              />
              <button
                type="button"
                onClick={validatePromoCode}
                disabled={!promoCode.trim() || promoCodeValidating}
                className="px-4 py-2 bg-gold-primary/20 text-gold-primary border border-gold-primary/30 rounded-lg font-medium hover:bg-gold-primary/30 transition-colors disabled:opacity-50 font-body"
              >
                {promoCodeValidating ? 'Checking...' : 'Apply'}
              </button>
            </div>
            {promoCodeMessage && !promoCodeValid && (
              <p className="text-error text-sm">{promoCodeMessage}</p>
            )}
          </div>
        )}
      </Card>

      {/* Payment Error */}
      {paymentError && (
        <div className="bg-error/10 border border-error/50 rounded-lg p-4">
          <p className="text-error text-sm">{paymentError}</p>
        </div>
      )}

      {/* Terms */}
      <p className="text-text-muted text-sm text-center">
        By proceeding, you agree to our{' '}
        <a href="/terms" className="text-gold-primary hover:underline">Terms of Service</a>
        {' '}and{' '}
        <a href="/privacy" className="text-gold-primary hover:underline">Privacy Policy</a>.
        The $100 deposit is non-refundable.
      </p>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <Button
          variant="primary"
          size="lg"
          onClick={handlePayment}
          disabled={isProcessingPayment}
          className="w-full"
        >
          {isProcessingPayment ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Proceed to Payment
            </span>
          )}
        </Button>
        <Button variant="phone" size="lg" href="tel:+15596630356" className="w-full justify-center">
          CALL TO DISCUSS
        </Button>
      </div>

      {/* Secure payment note */}
      <p className="flex text-text-muted text-sm items-center justify-center gap-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Secure payment powered by Stripe
      </p>

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
