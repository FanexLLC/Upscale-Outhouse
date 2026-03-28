'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import type { WizardData } from './QuoteWizard';

interface ContactInfoStepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const contactSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z
    .string()
    .min(10, 'Valid phone number is required')
    .regex(/[\d\s\-().+]+/, 'Valid phone number is required'),
  referralSource: z.string().optional(),
  honeypot: z.string().max(0), // Must be empty
});

type ContactFormData = z.infer<typeof contactSchema>;

const REFERRAL_OPTIONS = [
  { value: '', label: 'Select one (optional)' },
  { value: 'google', label: 'Google Search' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'friend', label: 'Friend / Family' },
  { value: 'planner', label: 'Wedding Planner' },
  { value: 'venue', label: 'Event Venue' },
  { value: 'other', label: 'Other' },
];

const inputClass =
  'w-full bg-bg-elevated border border-gold-dark/30 rounded-lg px-4 py-3 text-white font-body placeholder:text-text-muted/50 transition-colors focus:border-gold-primary focus:outline-none focus:ring-1 focus:ring-gold-primary/30';
const inputErrorClass =
  'w-full bg-bg-elevated border border-error rounded-lg px-4 py-3 text-white font-body placeholder:text-text-muted/50 transition-colors focus:border-error focus:outline-none focus:ring-1 focus:ring-error/30';
const labelClass = 'block text-text-secondary text-sm font-body mb-1';

export default function ContactInfoStep({ data, updateData, onNext, onBack }: ContactInfoStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      referralSource: data.referralSource,
      honeypot: '',
    },
  });

  const onSubmit = (formData: ContactFormData) => {
    // Honeypot check
    if (formData.honeypot) return;

    updateData({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      referralSource: formData.referralSource || '',
    });
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-display text-h3 text-text-primary mb-2">Almost There!</h2>
        <p className="text-text-secondary text-body">
          Enter your details to see your personalized quote.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Name */}
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full Name <span className="text-error">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Jane Smith"
            className={errors.fullName ? inputErrorClass : inputClass}
            {...register('fullName')}
          />
          {errors.fullName && (
            <p className="text-error text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-error">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="jane@example.com"
            className={errors.email ? inputErrorClass : inputClass}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-error text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-error">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="(559) 555-0123"
            className={errors.phone ? inputErrorClass : inputClass}
            {...register('phone')}
          />
          {errors.phone && (
            <p className="text-error text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Referral Source */}
        <div>
          <label htmlFor="referralSource" className={labelClass}>
            How did you hear about us?
          </label>
          <select
            id="referralSource"
            className={inputClass + ' appearance-none cursor-pointer'}
            {...register('referralSource')}
          >
            {REFERRAL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-bg-elevated text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Honeypot */}
        <div
          className="opacity-0 absolute -z-10"
          style={{ position: 'absolute', left: '-9999px' }}
          aria-hidden="true"
        >
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register('honeypot')}
          />
        </div>

        {/* Privacy Notice */}
        <p className="text-text-muted text-small">
          We&apos;ll never spam you. Your info is used only for this quote.
        </p>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button variant="ghost" size="md" onClick={onBack} type="button">
            &larr; Back
          </Button>
          <Button variant="primary" size="lg" type="submit" className="flex-1 sm:flex-initial">
            See My Quote
          </Button>
        </div>
      </form>
    </div>
  );
}