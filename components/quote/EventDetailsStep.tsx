'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import type { WizardData, EventType } from './QuoteWizard';

interface EventDetailsStepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
  onNext: () => void;
}

const EVENT_TYPES: { value: EventType; label: string; icon: React.ReactNode }[] = [
  {
    value: 'wedding',
    label: 'Wedding',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    value: 'corporate',
    label: 'Corporate',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
  },
  {
    value: 'birthday',
    label: 'Birthday / Graduation',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12 8.25a2.25 2.25 0 01-2.25-2.25V4.5c0-.232.188-.42.42-.42h3.66c.232 0 .42.188.42.42v1.5A2.25 2.25 0 0112 8.25z" />
      </svg>
    ),
  },
  {
    value: 'festival',
    label: 'Festival / Concert',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
  },
  {
    value: 'quinceanera',
    label: 'Quinceañera',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
];

function getGuestRecommendation(count: number): string {
  if (count < 100) return 'Perfect for our single trailer';
  if (count <= 200) return 'Ideal capacity for one luxury trailer';
  return 'Contact us for multi-unit options';
}

export default function EventDetailsStep({ data, updateData, onNext }: EventDetailsStepProps) {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!data.eventType) {
      setError('Please select an event type');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div className="space-y-10">
      {/* Event Type Selector */}
      <div>
        <h2 className="font-display text-h3 text-text-primary mb-2">What&apos;s the occasion?</h2>
        <p className="text-text-secondary text-body mb-6">Select your event type to get started.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {EVENT_TYPES.map((type) => {
            const isSelected = data.eventType === type.value;
            return (
              <Card
                key={type.value}
                hover
                className={`!p-4 cursor-pointer text-center transition-all duration-200 min-h-[100px] flex flex-col items-center justify-center ${
                  isSelected
                    ? '!border-gold-primary !bg-gold-primary/10 shadow-gold'
                    : ''
                }`}
                onClick={() => {
                  updateData({ eventType: type.value });
                  setError('');
                }}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    updateData({ eventType: type.value });
                    setError('');
                  }
                }}
              >
                <div className={`mb-2 ${isSelected ? 'text-gold-primary' : 'text-text-secondary'}`}>
                  {type.icon}
                </div>
                <span className={`text-sm font-body font-medium ${isSelected ? 'text-gold-primary' : 'text-text-primary'}`}>
                  {type.label}
                </span>
              </Card>
            );
          })}
        </div>
        {error && <p className="text-error text-sm mt-2">{error}</p>}
      </div>

      {/* Guest Count Slider */}
      <div>
        <h3 className="font-display text-h4 text-text-primary mb-6">How many guests?</h3>
        <div className="text-center mb-4">
          <span className="font-display text-h2 text-gold-primary">{data.guestCount}</span>
          <span className="text-text-secondary text-body ml-2">guests</span>
        </div>

        <div className="px-2">
          <input
            type="range"
            min={25}
            max={500}
            step={25}
            value={data.guestCount}
            onChange={(e) => updateData({ guestCount: parseInt(e.target.value) })}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-bg-elevated
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold-primary
              [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(201,168,76,0.4)] [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gold-light
              [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-gold-primary [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gold-light
              [&::-moz-range-thumb]:cursor-pointer"
            style={{
              background: `linear-gradient(to right, #C9A84C 0%, #C9A84C ${((data.guestCount - 25) / (500 - 25)) * 100}%, #1A1A1A ${((data.guestCount - 25) / (500 - 25)) * 100}%, #1A1A1A 100%)`,
            }}
            aria-label="Guest count"
          />
          <div className="flex justify-between text-text-muted text-xs mt-1">
            <span>25</span>
            <span>500</span>
          </div>
        </div>

        <p className="text-text-secondary text-sm text-center mt-3">
          {getGuestRecommendation(data.guestCount)}
        </p>
      </div>

      {/* Duration Toggle */}
      <div>
        <h3 className="font-display text-h4 text-text-primary mb-4">Event duration</h3>

        <div className="flex items-center gap-1 bg-bg-elevated rounded-lg p-1 w-fit">
          <button
            type="button"
            onClick={() => updateData({ isMultiDay: false, numberOfDays: 1 })}
            className={`px-5 py-2.5 rounded-md text-sm font-body font-medium transition-all duration-200 min-h-[44px] ${
              !data.isMultiDay
                ? 'bg-gold-primary text-bg-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Single Day
          </button>
          <button
            type="button"
            onClick={() => updateData({ isMultiDay: true, numberOfDays: 2 })}
            className={`px-5 py-2.5 rounded-md text-sm font-body font-medium transition-all duration-200 min-h-[44px] ${
              data.isMultiDay
                ? 'bg-gold-primary text-bg-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Multi-Day
          </button>
        </div>

        {data.isMultiDay && (
          <div className="mt-4 flex items-center gap-3">
            <label className="text-text-secondary text-sm font-body">Number of days:</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateData({ numberOfDays: Math.max(2, data.numberOfDays - 1) })}
                className="w-10 h-10 rounded-lg bg-bg-elevated border border-gold-dark/30 text-text-primary flex items-center justify-center hover:border-gold-primary transition-colors"
                aria-label="Decrease days"
              >
                &minus;
              </button>
              <span className="font-display text-h4 text-gold-primary w-10 text-center">
                {data.numberOfDays}
              </span>
              <button
                type="button"
                onClick={() => updateData({ numberOfDays: Math.min(14, data.numberOfDays + 1) })}
                className="w-10 h-10 rounded-lg bg-bg-elevated border border-gold-dark/30 text-text-primary flex items-center justify-center hover:border-gold-primary transition-colors"
                aria-label="Increase days"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Next Button */}
      <div className="pt-2">
        <Button variant="primary" size="lg" onClick={handleNext} className="w-full sm:w-auto">
          Continue to Date & Location
        </Button>
      </div>
    </div>
  );
}
