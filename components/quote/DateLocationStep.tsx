'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Button from '@/components/ui/Button';
import AvailabilityCalendar from './AvailabilityCalendar';
import TimePicker from './TimePicker';
import type { WizardData } from './QuoteWizard';

interface DateLocationStepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

// Generate time slots from 6:00 to 23:00 in 30-min increments
function generateTimes(): string[] {
  const times: string[] = [];
  for (let h = 6; h <= 23; h++) {
    times.push(`${String(h).padStart(2, '0')}:00`);
    if (h < 23) times.push(`${String(h).padStart(2, '0')}:30`);
  }
  return times;
}

const TIME_SLOTS = generateTimes();

export default function DateLocationStep({ data, updateData, onNext, onBack }: DateLocationStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [distanceLoading, setDistanceLoading] = useState(false);
  const [placesLoaded, setPlacesLoaded] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Try to initialize Google Places Autocomplete
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey || !inputRef.current) return;

    // Check if Google Maps is already loaded
    if (window.google?.maps?.places) {
      initAutocomplete();
      return;
    }

    // Load the Google Maps script
    const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    if (existingScript) {
      existingScript.addEventListener('load', initAutocomplete);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initAutocomplete;
    document.head.appendChild(script);

    function initAutocomplete() {
      if (!inputRef.current || !window.google?.maps?.places) return;
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'us' },
        fields: ['formatted_address', 'geometry', 'address_components'],
      });
      autocompleteRef.current.addListener('place_changed', handlePlaceSelect);
      setPlacesLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlaceSelect = useCallback(() => {
    const place = autocompleteRef.current?.getPlace();
    if (!place?.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    let city: string | null = null;
    let state: string | null = null;
    let zip: string | null = null;

    if (place.address_components) {
      for (const component of place.address_components) {
        if (component.types.includes('locality')) city = component.long_name;
        if (component.types.includes('administrative_area_level_1')) state = component.short_name;
        if (component.types.includes('postal_code')) zip = component.long_name;
      }
    }

    updateData({
      eventLocation: place.formatted_address || '',
      eventLat: lat,
      eventLng: lng,
      eventCity: city,
      eventState: state,
      eventZip: zip,
    });

    // Calculate distance
    calculateDistance(lat, lng);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateData]);

  const calculateDistance = async (lat: number, lng: number) => {
    setDistanceLoading(true);
    try {
      // We'll compute on the client side using a simple approach:
      // The Fresno coordinates from the business location
      const fresnoLat = 36.7378;
      const fresnoLng = -119.7871;

      // Haversine formula for approximate distance
      const R = 3959; // Earth's radius in miles
      const dLat = ((lat - fresnoLat) * Math.PI) / 180;
      const dLng = ((lng - fresnoLng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((fresnoLat * Math.PI) / 180) *
          Math.cos((lat * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = Math.round(R * c);

      let fee = 0;
      if (distance > 50) {
        fee = (distance - 50) * 2;
      }

      updateData({
        distanceMiles: distance,
        deliveryFee: fee,
      });
    } catch {
      // Distance calc failed — no big deal
    } finally {
      setDistanceLoading(false);
    }
  };

  const handleDateSelect = (date: string) => {
    updateData({ startDate: date, endDate: date });
  };

  const handleRangeSelect = (start: string, end: string) => {
    updateData({ startDate: start, endDate: end });
  };

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!data.startDate) {
      newErrors.date = 'Please select a date';
    }
    if (!data.eventLocation.trim()) {
      newErrors.location = 'Please enter your event location';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    onNext();
  };

  return (
    <div className="space-y-10">
      {/* Calendar Section */}
      <div>
        <h2 className="font-display text-h3 text-text-primary mb-2">
          {data.isMultiDay ? 'Select your start date' : 'Pick your date'}
        </h2>
        <p className="text-text-secondary text-body mb-6">
          {data.isMultiDay
            ? `We'll reserve ${data.numberOfDays} consecutive days starting from your selection.`
            : 'Choose the date for your event.'}
        </p>

        <AvailabilityCalendar
          selectedStart={data.startDate}
          selectedEnd={data.endDate}
          isRange={data.isMultiDay}
          numberOfDays={data.numberOfDays}
          onSelectDate={handleDateSelect}
          onSelectRange={handleRangeSelect}
        />

        {data.startDate && (
          <p className="text-gold-primary text-sm mt-3 font-body">
            {data.isMultiDay && data.endDate
              ? `Selected: ${data.startDate} to ${data.endDate}`
              : `Selected: ${data.startDate}`}
          </p>
        )}
        {errors.date && <p className="text-error text-sm mt-2">{errors.date}</p>}
      </div>

      {/* Time Selection */}
      <div>
        <h3 className="font-display text-h4 text-text-primary mb-4">Event times</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TimePicker
            label="Start Time"
            value={data.startTime}
            onChange={(val) => updateData({ startTime: val })}
            times={TIME_SLOTS}
          />
          <TimePicker
            label="End Time"
            value={data.endTime}
            onChange={(val) => updateData({ endTime: val })}
            times={TIME_SLOTS}
          />
        </div>
      </div>

      {/* Location Input */}
      <div>
        <h3 className="font-display text-h4 text-text-primary mb-4">Event location</h3>
        <div>
          <label className="block text-text-secondary text-sm font-body mb-1">
            Event address
          </label>
          <input
            ref={inputRef}
            type="text"
            value={placesLoaded ? undefined : data.eventLocation}
            defaultValue={placesLoaded ? data.eventLocation : undefined}
            onChange={
              placesLoaded
                ? undefined
                : (e) => updateData({ eventLocation: e.target.value, eventLat: null, eventLng: null, distanceMiles: null, deliveryFee: null })
            }
            placeholder="Enter event address"
            className={`w-full bg-bg-elevated border rounded-lg px-4 py-3 text-white font-body placeholder:text-text-muted/50 transition-colors focus:border-gold-primary focus:outline-none focus:ring-1 focus:ring-gold-primary/30 ${
              errors.location ? 'border-error' : 'border-gold-dark/30'
            }`}
          />
          {errors.location && <p className="text-error text-sm mt-1">{errors.location}</p>}
        </div>

        {/* Distance / Delivery info */}
        {distanceLoading && (
          <p className="text-text-muted text-sm mt-2">Calculating distance...</p>
        )}
        {!distanceLoading && data.distanceMiles !== null && (
          <div className="mt-3 p-3 rounded-lg bg-bg-elevated border border-gold-dark/20">
            {data.distanceMiles <= 50 ? (
              <p className="text-success text-sm font-body flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Free delivery ({data.distanceMiles} miles — within 50 miles)
              </p>
            ) : data.distanceMiles <= 150 ? (
              <p className="text-gold-primary text-sm font-body">
                {data.distanceMiles} miles — ${data.deliveryFee} delivery fee
              </p>
            ) : (
              <p className="text-error text-sm font-body">
                {data.distanceMiles} miles — outside our 150-mile service area. Please call us to discuss.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button variant="ghost" size="md" onClick={onBack}>
          &larr; Back
        </Button>
        <Button variant="primary" size="lg" onClick={handleNext} className="flex-1 sm:flex-initial">
          Continue to Your Info
        </Button>
      </div>
    </div>
  );
}
