import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { isHoneypotTriggered, checkRateLimit } from '@/lib/security';
import { Resend } from 'resend';

// Force Node.js runtime for API compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// --- Resend setup (reuses same pattern as lib/email.ts) ---
let resendInstance: Resend | null = null;

function getResend(): Resend {
  if (!resendInstance) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

const FROM_EMAIL = `Upscale Outhouse <${process.env.EMAIL_FROM || 'invoices@upscaleouthouse.com'}>`;
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'upscaleouthouse@gmail.com';

// --- Validation schema ---
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  eventType: z
    .enum(['wedding', 'corporate', 'birthday', 'festival', 'quinceanera', 'other'])
    .optional(),
  eventDate: z.string().datetime({ offset: true }).optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()),
  message: z.string().max(2000, 'Message must be under 2000 characters').optional(),
  honeypot: z.string().optional(),
});

// Rate limit: 3 submissions per email per hour
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot check — silently reject bots
    if (isHoneypotTriggered(body.honeypot)) {
      return NextResponse.json(
        { success: true, message: "We'll be in touch within 2 hours!" },
        { status: 200 }
      );
    }

    // Validate input
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map((e: z.ZodIssue) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    const { name, email, phone, eventType, eventDate, message } = parsed.data;

    // Rate limiting by email
    const rateCheck = checkRateLimit(
      `contact:${email.toLowerCase()}`,
      RATE_LIMIT_MAX,
      RATE_LIMIT_WINDOW_MS
    );
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          errors: [
            {
              field: 'email',
              message: 'Too many submissions. Please try again later.',
            },
          ],
        },
        { status: 429 }
      );
    }

    // Get client IP
    const ipAddress =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Store in database
    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone,
        eventType: eventType || null,
        eventDate: eventDate ? new Date(eventDate) : null,
        message: message || null,
        ipAddress,
      },
    });

    // Send admin notification email
    try {
      const eventInfo = [
        eventType ? `Event Type: ${eventType}` : null,
        eventDate ? `Event Date: ${eventDate}` : null,
      ]
        .filter(Boolean)
        .join('<br>');

      await getResend().emails.send({
        from: FROM_EMAIL,
        to: [OWNER_EMAIL],
        replyTo: email,
        subject: `[CONTACT FORM] New message from ${name}`,
        html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-left: 5px solid #D4AF37;">
  <h2 style="margin-top: 0; color: #111827;">New Contact Form Submission</h2>

  <div style="background: #f9fafb; padding: 15px; margin: 20px 0; border-radius: 4px;">
    <strong>Name:</strong> ${name}<br>
    <strong>Email:</strong> <a href="mailto:${email}">${email}</a><br>
    <strong>Phone:</strong> <a href="tel:${phone}">${phone}</a>
  </div>

  ${eventInfo ? `<div style="margin-bottom: 20px;">${eventInfo}</div>` : ''}

  ${message ? `<div style="background: #fff; border: 1px solid #e5e7eb; padding: 15px; border-radius: 4px;"><strong>Message:</strong><br><br>${message.replace(/\n/g, '<br>')}</div>` : '<p style="color: #6b7280;"><em>No message included.</em></p>'}
</div>
        `.trim(),
      });
    } catch (emailError) {
      // Log but don't fail the request — the submission is already saved
      console.error('Failed to send contact notification email:', emailError);
    }

    return NextResponse.json(
      { success: true, message: "We'll be in touch within 2 hours!" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, errors: [{ field: 'general', message: 'Something went wrong. Please try again.' }] },
      { status: 500 }
    );
  }
}