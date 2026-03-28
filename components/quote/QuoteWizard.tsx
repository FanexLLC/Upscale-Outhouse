'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import EventDetailsStep from './EventDetailsStep';
import DateLocationStep from './DateLocationStep';
import ContactInfoStep from './ContactInfoStep';
import PriceRevealStep from './PriceRevealStep';

export type EventType = 'wedding' | 'corporate' | 'birthday' | 'festival' | 'quinceanera';

export interface WizardData {
  // Step 1
  eventType: EventType | null;
  guestCount: number;
  isMultiDay: boolean;
  numberOfDays: number;

  // Step 2
  startDate: string | null; // YYYY-MM-DD
  endDate: string | null;   // YYYY-MM-DD
  startTime: string;
  endTime: string;
  eventLocation: string;
  eventLat: number | null;
  eventLng: number | null;
  eventCity: string | null;
  eventState: string | null;
  eventZip: string | null;
  distanceMiles: number | null;
  deliveryFee: number | null;

  // Step 3
  fullName: string;
  email: string;
  phone: string;
  referralSource: string;
  honeypot: string;
}

const initialData: WizardData = {
  eventType: null,
  guestCount: 100,
  isMultiDay: false,
  numberOfDays: 1,
  startDate: null,
  endDate: null,
  startTime: '10:00',
  endTime: '16:00',
  eventLocation: '',
  eventLat: null,
  eventLng: null,
  eventCity: null,
  eventState: null,
  eventZip: null,
  distanceMiles: null,
  deliveryFee: null,
  fullName: '',
  email: '',
  phone: '',
  referralSource: '',
  honeypot: '',
};

const STEPS = [
  { label: 'Event Details', number: 1 },
  { label: 'Date & Location', number: 2 },
  { label: 'Your Info', number: 3 },
  { label: 'Your Quote', number: 4 },
];

export default function QuoteWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<WizardData>(initialData);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const prefersReducedMotion = useReducedMotion();

  const updateData = useCallback((updates: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const stepContent = (
    <>
      {currentStep === 1 && (
        <EventDetailsStep data={data} updateData={updateData} onNext={goNext} />
      )}
      {currentStep === 2 && (
        <DateLocationStep data={data} updateData={updateData} onNext={goNext} onBack={goBack} />
      )}
      {currentStep === 3 && (
        <ContactInfoStep data={data} updateData={updateData} onNext={goNext} onBack={goBack} />
      )}
      {currentStep === 4 && (
        <PriceRevealStep data={data} onBack={goBack} />
      )}
    </>
  );

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className={`flex flex-col items-center flex-1 ${
                step.number <= currentStep ? 'text-gold-primary' : 'text-text-muted'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-semibold mb-1.5 transition-all duration-300 ${
                  step.number < currentStep
                    ? 'bg-gold-primary text-bg-primary'
                    : step.number === currentStep
                      ? 'border-2 border-gold-primary text-gold-primary bg-transparent'
                      : 'border border-text-muted/30 text-text-muted bg-transparent'
                }`}
              >
                {step.number < currentStep ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span className="text-xs font-body hidden sm:block">{step.label}</span>
            </div>
          ))}
        </div>
        {/* Progress track */}
        <div className="flex gap-1.5">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                step.number <= currentStep
                  ? 'bg-gradient-to-r from-gold-primary to-gold-light'
                  : 'bg-bg-elevated'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="relative">
        {prefersReducedMotion ? (
          <div key={currentStep}>{stepContent}</div>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: direction * 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' as const }}
            >
              {stepContent}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
