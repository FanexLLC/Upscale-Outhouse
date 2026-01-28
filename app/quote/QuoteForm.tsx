'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  formatCurrency,
  formatDate,
  formatPhoneNumber,
  getDiscountLabel,
  isValidEmail,
  isValidPhone,
} from '@/lib/pricing';
import CalendarPicker from '@/components/ui/CalendarPicker';

// Event type options
const EVENT_TYPES = [
  { value: '', label: 'Select event type' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'birthday', label: 'Birthday Party' },
  { value: 'graduation', label: 'Graduation' },
  { value: 'other', label: 'Other' },
];

// Guest count options
const GUEST_COUNTS = [
  { value: '', label: 'Expected number of guests' },
  { value: '1-50', label: '1-50 guests' },
  { value: '51-100', label: '51-100 guests' },
  { value: '101-200', label: '101-200 guests' },
  { value: '200+', label: '200+ guests' },
];

// Time options - hourly
const TIME_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Select time' },
];
for (let hour = 6; hour <= 23; hour++) {
  const value = `${hour.toString().padStart(2, '0')}:00`;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  TIME_OPTIONS.push({ value, label: `${displayHour}:00 ${ampm}` });
}

// Form data interface
interface FormData {
  // Step 1: Event Details
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  eventType: string;
  guestCount: string;
  hasWaterHookup: boolean;
  hasPowerAvailable: boolean;
  eventLocation: string;
  additionalDetails: string;
  // Location details from Places API
  eventLat: number | null;
  eventLng: number | null;
  eventCity: string;
  eventState: string;
  eventZip: string;
  // Step 2: Contact Info
  fullName: string;
  email: string;
  phone: string;
}

// Quote response from API
interface QuoteResponse {
  quoteId: string;
  quote: {
    id: string;
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
    distanceMiles: number | null;
    totalAmount: number;
    depositDue: number;
    balanceDue: number;
  };
}

// Validation errors interface
interface ValidationErrors {
  [key: string]: string;
}

const initialFormData: FormData = {
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  eventType: '',
  guestCount: '',
  hasWaterHookup: false,
  hasPowerAvailable: false,
  eventLocation: '',
  additionalDetails: '',
  eventLat: null,
  eventLng: null,
  eventCity: '',
  eventState: '',
  eventZip: '',
  fullName: '',
  email: '',
  phone: '',
};

// Declare google types
declare global {
  interface Window {
    google: typeof google;
    initGoogleMaps: () => void;
  }
}

export default function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [quoteResult, setQuoteResult] = useState<QuoteResponse | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Load Google Maps script
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setGoogleLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load Google Maps script');
        // Still allow form to work without autocomplete
      };
      document.head.appendChild(script);
    } else if (window.google) {
      setGoogleLoaded(true);
    }
  }, []);

  // Initialize Places Autocomplete
  useEffect(() => {
    if (googleLoaded && inputRef.current && !autocompleteRef.current) {
      try {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: 'us' },
          fields: ['address_components', 'formatted_address', 'geometry', 'place_id'],
          types: ['address'],
        });

        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current?.getPlace();
          if (place && place.formatted_address && place.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            // Parse address components
            let city = '';
            let state = '';
            let zip = '';

            if (place.address_components) {
              for (const component of place.address_components) {
                if (component.types.includes('locality')) {
                  city = component.long_name;
                } else if (component.types.includes('administrative_area_level_1')) {
                  state = component.short_name;
                } else if (component.types.includes('postal_code')) {
                  zip = component.long_name;
                }
              }
            }

            setFormData((prev) => ({
              ...prev,
              eventLocation: place.formatted_address || '',
              eventLat: lat,
              eventLng: lng,
              eventCity: city,
              eventState: state,
              eventZip: zip,
            }));

            // Clear location error
            setErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors.eventLocation;
              return newErrors;
            });
          }
        });
      } catch (error) {
        console.error('Failed to initialize Google Places Autocomplete:', error);
      }
    }
  }, [googleLoaded]);

  // Update form field
  const updateField = useCallback((field: keyof FormData, value: string | boolean | number | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    setErrors((prev) => {
      if (prev[field]) {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      }
      return prev;
    });
  }, []);

  // Get minimum date (48 hours from now)
  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().split('T')[0];
  };

  // Validate Step 1
  const validateStep1 = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }
    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }
    if (!formData.eventType) {
      newErrors.eventType = 'Event type is required';
    }
    if (!formData.guestCount) {
      newErrors.guestCount = 'Guest count is required';
    }
    if (!formData.eventLocation.trim()) {
      newErrors.eventLocation = 'Event location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 2
  const validateStep2 = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (10 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit quote to API
  const submitQuote = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: formData.startDate,
          endDate: formData.endDate,
          startTime: formData.startTime,
          endTime: formData.endTime,
          eventType: formData.eventType,
          guestCount: formData.guestCount,
          hasWaterHookup: formData.hasWaterHookup,
          hasPowerAvailable: formData.hasPowerAvailable,
          eventLocation: formData.eventLocation,
          additionalDetails: formData.additionalDetails,
          eventLat: formData.eventLat,
          eventLng: formData.eventLng,
          eventCity: formData.eventCity,
          eventState: formData.eventState,
          eventZip: formData.eventZip,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to create quote');
      }

      setQuoteResult(data);
      setCurrentStep(3);
    } catch (error) {
      console.error('Quote submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to create quote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle next step
  const handleNext = async () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      await submitQuote();
    }
  };

  // Handle previous step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSubmitError(null);
      setPaymentError(null);
    }
  };

  // Handle payment - redirect to Stripe Checkout
  const handlePayment = async () => {
    if (!quoteResult?.quoteId) return;

    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quoteId: quoteResult.quoteId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking');
      }

      // Redirect to Stripe Checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(error instanceof Error ? error.message : 'Failed to process payment. Please try again.');
      setIsProcessingPayment(false);
    }
  };

  // Input classes
  const inputClass = (field: string) =>
    `w-full px-4 py-3 bg-charcoal-dark border rounded-lg text-cream placeholder-cream/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-colors ${
      errors[field] ? 'border-red-500' : 'border-charcoal-light'
    }`;

  const labelClass = 'block text-cream/90 font-medium mb-2';
  const errorClass = 'text-red-400 text-sm mt-1';

  return (
    <div className="bg-charcoal rounded-xl border border-gold/20 overflow-hidden">
      {/* Step Indicator */}
      <div className="bg-charcoal-dark px-6 py-4 border-b border-gold/20">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  currentStep >= step
                    ? 'bg-gold text-charcoal-dark'
                    : 'bg-charcoal-light text-cream/50'
                }`}
              >
                {currentStep > step ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              {step < 3 && (
                <div
                  className={`w-16 md:w-24 h-1 mx-2 rounded ${
                    currentStep > step ? 'bg-gold' : 'bg-charcoal-light'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between max-w-md mx-auto mt-2 text-sm">
          <span className={currentStep >= 1 ? 'text-gold' : 'text-cream/50'}>Event Details</span>
          <span className={currentStep >= 2 ? 'text-gold' : 'text-cream/50'}>Contact Info</span>
          <span className={currentStep >= 3 ? 'text-gold' : 'text-cream/50'}>Review Quote</span>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 md:p-8">
        {/* Step 1: Event Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gold">Event Details</h2>

            {/* Schedule Group */}
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-wider text-cream/50 font-medium border-b border-charcoal-light/50 pb-2">
                Schedule
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CalendarPicker
                  label="Start Date *"
                  selectedDate={formData.startDate}
                  onSelect={(date) => updateField('startDate', date)}
                  minDate={getMinDate()}
                  error={errors.startDate}
                />
                <CalendarPicker
                  label="End Date *"
                  selectedDate={formData.endDate}
                  onSelect={(date) => updateField('endDate', date)}
                  minDate={formData.startDate || getMinDate()}
                  error={errors.endDate}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Start Time *</label>
                  <select
                    value={formData.startTime}
                    onChange={(e) => updateField('startTime', e.target.value)}
                    className={inputClass('startTime')}
                  >
                    {TIME_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.startTime && <p className={errorClass}>{errors.startTime}</p>}
                </div>
                <div>
                  <label className={labelClass}>End Time *</label>
                  <select
                    value={formData.endTime}
                    onChange={(e) => updateField('endTime', e.target.value)}
                    className={inputClass('endTime')}
                  >
                    {TIME_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.endTime && <p className={errorClass}>{errors.endTime}</p>}
                </div>
              </div>
            </div>

            {/* Event Info Group */}
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-wider text-cream/50 font-medium border-b border-charcoal-light/50 pb-2">
                Event Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Event Type *</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => updateField('eventType', e.target.value)}
                    className={inputClass('eventType')}
                  >
                    {EVENT_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.eventType && <p className={errorClass}>{errors.eventType}</p>}
                </div>
                <div>
                  <label className={labelClass}>Expected Guests *</label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => updateField('guestCount', e.target.value)}
                    className={inputClass('guestCount')}
                  >
                    {GUEST_COUNTS.map((count) => (
                      <option key={count.value} value={count.value}>
                        {count.label}
                      </option>
                    ))}
                  </select>
                  {errors.guestCount && <p className={errorClass}>{errors.guestCount}</p>}
                </div>
              </div>
            </div>

            {/* Site Requirements Group */}
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-wider text-cream/50 font-medium border-b border-charcoal-light/50 pb-2">
                Site Requirements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    Is water available within 100 feet?
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => updateField('hasWaterHookup', true)}
                      className={`flex-1 px-4 py-3 rounded-lg font-medium border transition-colors ${
                        formData.hasWaterHookup
                          ? 'bg-gold/20 border-gold text-gold'
                          : 'bg-charcoal-dark border-charcoal-light text-cream/60 hover:border-gold/30'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('hasWaterHookup', false)}
                      className={`flex-1 px-4 py-3 rounded-lg font-medium border transition-colors ${
                        !formData.hasWaterHookup
                          ? 'bg-gold/20 border-gold text-gold'
                          : 'bg-charcoal-dark border-charcoal-light text-cream/60 hover:border-gold/30'
                      }`}
                    >
                      No
                    </button>
                  </div>
                  <p className="text-cream/40 text-xs mt-1">Required for restroom operation</p>
                </div>
                <div>
                  <label className={labelClass}>
                    Is power available within 100 feet?
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => updateField('hasPowerAvailable', true)}
                      className={`flex-1 px-4 py-3 rounded-lg font-medium border transition-colors ${
                        formData.hasPowerAvailable
                          ? 'bg-gold/20 border-gold text-gold'
                          : 'bg-charcoal-dark border-charcoal-light text-cream/60 hover:border-gold/30'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('hasPowerAvailable', false)}
                      className={`flex-1 px-4 py-3 rounded-lg font-medium border transition-colors ${
                        !formData.hasPowerAvailable
                          ? 'bg-gold/20 border-gold text-gold'
                          : 'bg-charcoal-dark border-charcoal-light text-cream/60 hover:border-gold/30'
                      }`}
                    >
                      No
                    </button>
                  </div>
                  <p className="text-cream/40 text-xs mt-1">Required for climate control and lighting</p>
                </div>
              </div>
            </div>

            {/* Location Group */}
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-wider text-cream/50 font-medium border-b border-charcoal-light/50 pb-2">
                Location
              </h3>
              <div>
                <label className={labelClass}>Event Location *</label>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Start typing an address..."
                  value={formData.eventLocation}
                  onChange={(e) => {
                    updateField('eventLocation', e.target.value);
                    if (formData.eventLat) {
                      updateField('eventLat', null);
                      updateField('eventLng', null);
                    }
                  }}
                  className={inputClass('eventLocation')}
                />
                {errors.eventLocation && <p className={errorClass}>{errors.eventLocation}</p>}
                {formData.eventLat && formData.eventLng ? (
                  <p className="text-green-400 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Address verified - delivery fee will be calculated
                  </p>
                ) : (
                  <p className="text-cream/50 text-sm mt-1">
                    Select an address from the dropdown to calculate delivery fee
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass}>Additional Details</label>
                <textarea
                  placeholder="Any special requests or information we should know..."
                  value={formData.additionalDetails}
                  onChange={(e) => updateField('additionalDetails', e.target.value)}
                  rows={3}
                  className={inputClass('additionalDetails')}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Contact Information */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gold mb-6">Contact Information</h2>

            <div>
              <label className={labelClass}>Full Name *</label>
              <input
                type="text"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                className={inputClass('fullName')}
              />
              {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
            </div>

            <div>
              <label className={labelClass}>Email Address *</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className={inputClass('email')}
              />
              {errors.email && <p className={errorClass}>{errors.email}</p>}
            </div>

            <div>
              <label className={labelClass}>Phone Number *</label>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className={inputClass('phone')}
              />
              {errors.phone && <p className={errorClass}>{errors.phone}</p>}
            </div>

            <p className="text-cream/50 text-sm">
              Your information is secure and will only be used to contact you about your booking.
            </p>

            {submitError && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-400 text-sm">{submitError}</p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Quote Review */}
        {currentStep === 3 && quoteResult && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gold mb-6">Review Your Quote</h2>

            {/* Event Summary */}
            <div className="bg-charcoal-dark rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-gold border-b border-gold/20 pb-2">Event Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-cream/60">Dates:</span>
                  <p className="text-cream">
                    {formData.startDate && formatDate(new Date(formData.startDate))}
                    {formData.startDate !== formData.endDate && (
                      <> to {formData.endDate && formatDate(new Date(formData.endDate))}</>
                    )}
                  </p>
                </div>
                <div>
                  <span className="text-cream/60">Time:</span>
                  <p className="text-cream">{formData.startTime} - {formData.endTime}</p>
                </div>
                <div>
                  <span className="text-cream/60">Event Type:</span>
                  <p className="text-cream capitalize">{formData.eventType}</p>
                </div>
                <div>
                  <span className="text-cream/60">Guests:</span>
                  <p className="text-cream">{formData.guestCount}</p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-cream/60">Location:</span>
                  <p className="text-cream">{formData.eventLocation}</p>
                  {quoteResult.quote.distanceMiles && (
                    <p className="text-cream/50 text-xs mt-1">
                      ({quoteResult.quote.distanceMiles} miles from Fresno)
                    </p>
                  )}
                </div>
                <div>
                  <span className="text-cream/60">Water within 100 ft:</span>
                  <p className={formData.hasWaterHookup ? 'text-green-400' : 'text-red-400'}>
                    {formData.hasWaterHookup ? 'Yes' : 'No'}
                  </p>
                </div>
                <div>
                  <span className="text-cream/60">Power within 100 ft:</span>
                  <p className={formData.hasPowerAvailable ? 'text-green-400' : 'text-red-400'}>
                    {formData.hasPowerAvailable ? 'Yes' : 'No'}
                  </p>
                </div>
                {formData.additionalDetails && (
                  <div className="md:col-span-2">
                    <span className="text-cream/60">Additional Details:</span>
                    <p className="text-cream">{formData.additionalDetails}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Summary */}
            <div className="bg-charcoal-dark rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-gold border-b border-gold/20 pb-2">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-cream/60">Name:</span>
                  <p className="text-cream">{formData.fullName}</p>
                </div>
                <div>
                  <span className="text-cream/60">Email:</span>
                  <p className="text-cream">{formData.email}</p>
                </div>
                <div>
                  <span className="text-cream/60">Phone:</span>
                  <p className="text-cream">{formatPhoneNumber(formData.phone)}</p>
                </div>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="bg-charcoal-dark rounded-lg p-6">
              <h3 className="font-semibold text-gold border-b border-gold/20 pb-2 mb-4">
                Price Breakdown
              </h3>
              <div className="space-y-3 text-sm">
                {quoteResult.quote.weekdayRate === quoteResult.quote.weekendRate ? (
                  <div className="flex justify-between text-cream">
                    <span>
                      Rental ({quoteResult.quote.numberOfDays} {quoteResult.quote.numberOfDays === 1 ? 'day' : 'days'} x {formatCurrency(quoteResult.quote.weekdayRate)})
                    </span>
                    <span>{formatCurrency(quoteResult.quote.baseRental)}</span>
                  </div>
                ) : (
                  <>
                    {quoteResult.quote.weekdayCount > 0 && (
                      <div className="flex justify-between text-cream">
                        <span>
                          Weekday rental ({quoteResult.quote.weekdayCount} {quoteResult.quote.weekdayCount === 1 ? 'day' : 'days'} x {formatCurrency(quoteResult.quote.weekdayRate)})
                        </span>
                        <span>{formatCurrency(quoteResult.quote.weekdayCount * quoteResult.quote.weekdayRate)}</span>
                      </div>
                    )}
                    {quoteResult.quote.weekendCount > 0 && (
                      <div className="flex justify-between text-cream">
                        <span>
                          Weekend rental ({quoteResult.quote.weekendCount} {quoteResult.quote.weekendCount === 1 ? 'day' : 'days'} x {formatCurrency(quoteResult.quote.weekendRate)})
                        </span>
                        <span>{formatCurrency(quoteResult.quote.weekendCount * quoteResult.quote.weekendRate)}</span>
                      </div>
                    )}
                  </>
                )}

                {quoteResult.quote.discountPercent > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>{getDiscountLabel(quoteResult.quote.numberOfDays)}</span>
                    <span>-{formatCurrency(quoteResult.quote.discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-cream">
                  <span>Delivery fee</span>
                  <span>
                    {quoteResult.quote.deliveryFee > 0
                      ? formatCurrency(quoteResult.quote.deliveryFee)
                      : 'Free'}
                  </span>
                </div>
                {quoteResult.quote.deliveryFeeNote && (
                  <p className="text-cream/50 text-xs ml-4">
                    {quoteResult.quote.deliveryFeeNote}
                  </p>
                )}

                <div className="border-t border-gold/20 pt-3 mt-3">
                  <div className="flex justify-between text-cream font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(quoteResult.quote.totalAmount)}</span>
                  </div>
                </div>

                <div className="bg-gold/10 rounded-lg p-4 mt-4">
                  <div className="flex justify-between text-gold font-bold text-lg mb-2">
                    <span>Deposit Due Now</span>
                    <span>{formatCurrency(quoteResult.quote.depositDue)}</span>
                  </div>
                  <div className="flex justify-between text-cream/70 text-sm">
                    <span>Balance due on delivery</span>
                    <span>{formatCurrency(quoteResult.quote.balanceDue)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote ID */}
            <p className="text-cream/50 text-sm text-center">
              Quote ID: <span className="text-cream font-mono">{quoteResult.quoteId}</span>
            </p>

            {/* Payment Error */}
            {paymentError && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-400 text-sm">{paymentError}</p>
              </div>
            )}

            {/* Terms Notice */}
            <p className="text-cream/50 text-sm text-center">
              By proceeding, you agree to our{' '}
              <a href="/terms" className="text-gold hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-gold hover:underline">Privacy Policy</a>.
              The $100 deposit is non-refundable.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gold/20">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="px-6 py-3 border border-gold/50 text-gold rounded-lg font-medium hover:bg-gold/10 transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-8 py-3 bg-gold text-charcoal-dark rounded-lg font-semibold hover:bg-gold-light shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Calculating...
                </>
              ) : (
                'Continue'
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePayment}
              disabled={isProcessingPayment}
              className="px-8 py-3 bg-gold text-charcoal-dark rounded-lg font-semibold hover:bg-gold-light shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              {isProcessingPayment ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Proceed to Payment
                </>
              )}
            </button>
          )}
        </div>

        {/* Secure payment note */}
        {currentStep === 3 && (
          <p className="text-center text-cream/40 text-sm mt-4 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure payment powered by Stripe
          </p>
        )}
      </div>
    </div>
  );
}
