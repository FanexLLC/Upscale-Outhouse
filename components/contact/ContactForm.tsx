'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '@/components/ui/Button';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  eventType: z.string().optional(),
  eventDate: z.string().optional(),
  message: z.string().max(2000, 'Message must be under 2000 characters').optional(),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const eventTypes = [
  { value: '', label: 'Select event type' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'birthday', label: 'Birthday / Graduation' },
  { value: 'festival', label: 'Festival' },
  { value: 'quinceanera', label: 'Quinceañera' },
  { value: 'other', label: 'Other' },
];

const inputClasses =
  'w-full bg-bg-elevated border border-gold-dark/30 rounded-lg px-4 py-3 text-white font-body text-body placeholder:text-text-muted focus:border-gold-primary focus:outline-none focus:ring-1 focus:ring-gold-primary transition-colors';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Client-side zod validation
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) return;

    // Honeypot filled = bot
    if (data.honeypot) return;

    setStatus('submitting');
    setServerError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          eventType: data.eventType || undefined,
          eventDate: data.eventDate || undefined,
          message: data.message || undefined,
          honeypot: data.honeypot,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
        const msg =
          result.errors?.[0]?.message || 'Something went wrong. Please try again.';
        setServerError(msg);
      }
    } catch {
      setStatus('error');
      setServerError('Network error. Please check your connection and try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-bg-secondary rounded-card p-2xl border border-[rgba(201,168,76,0.15)] text-center">
        <div className="w-16 h-16 mx-auto mb-lg rounded-full bg-gold-primary/10 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gold-primary animate-[scale-check_0.3s_ease-out]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-display text-h3 text-white mb-sm">Thank You!</h3>
        <p className="text-text-secondary text-body">
          We&apos;ll be in touch within 2 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-bg-secondary rounded-card p-xl border border-[rgba(201,168,76,0.15)] space-y-lg"
    >
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-small text-text-secondary mb-xs font-body">
          Name <span className="text-gold-primary">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your full name"
          className={inputClasses}
          {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } })}
        />
        {errors.name && (
          <p className="text-error text-sm mt-xs">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-small text-text-secondary mb-xs font-body">
          Email <span className="text-gold-primary">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className={inputClasses}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email' },
          })}
        />
        {errors.email && (
          <p className="text-error text-sm mt-xs">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-small text-text-secondary mb-xs font-body">
          Phone <span className="text-gold-primary">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="(559) 000-0000"
          className={inputClasses}
          {...register('phone', {
            required: 'Phone is required',
            minLength: { value: 10, message: 'Phone must be at least 10 digits' },
          })}
        />
        {errors.phone && (
          <p className="text-error text-sm mt-xs">{errors.phone.message}</p>
        )}
      </div>

      {/* Event Type */}
      <div>
        <label htmlFor="eventType" className="block text-small text-text-secondary mb-xs font-body">
          Event Type
        </label>
        <select
          id="eventType"
          className={inputClasses}
          {...register('eventType')}
        >
          {eventTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Event Date */}
      <div>
        <label htmlFor="eventDate" className="block text-small text-text-secondary mb-xs font-body">
          Event Date
        </label>
        <input
          id="eventDate"
          type="date"
          className={inputClasses}
          {...register('eventDate')}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-small text-text-secondary mb-xs font-body">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Tell us about your event..."
          className={`${inputClasses} resize-none`}
          {...register('message', { maxLength: { value: 2000, message: 'Message must be under 2000 characters' } })}
        />
        {errors.message && (
          <p className="text-error text-sm mt-xs">{errors.message.message}</p>
        )}
      </div>

      {/* Honeypot — hidden from real users */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('honeypot')}
        />
      </div>

      {/* Server error */}
      {status === 'error' && serverError && (
        <p className="text-error text-sm">{serverError}</p>
      )}

      {/* Submit */}
      <Button
        variant="primary"
        size="lg"
        type="submit"
        className="w-full"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending...' : 'SEND MESSAGE →'}
      </Button>
    </form>
  );
}
