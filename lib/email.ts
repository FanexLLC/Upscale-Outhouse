import { Resend } from 'resend';

// Lazily initialize Resend to avoid build-time errors
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

const FROM_EMAIL = process.env.BUSINESS_EMAIL || 'noreply@upscaleouthouse.com';
const OWNER_EMAIL = process.env.OWNER_EMAIL || process.env.BUSINESS_EMAIL || 'info@upscaleouthouse.com';
const BUSINESS_PHONE = process.env.BUSINESS_PHONE || '(559) 555-1234';

interface BookingEmailData {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventAddress: string;
  eventCity?: string | null;
  eventState?: string | null;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  eventType: string;
  guestCount: string;
  hasWaterHookup: boolean;
  numberOfDays: number;
  baseRental: number;
  discountPercent: number;
  discountAmount: number;
  deliveryFee: number;
  totalAmount: number;
  depositAmount: number;
}

function formatDate(date: Date): string {
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

// Send confirmation email to customer after payment
export async function sendCustomerConfirmationEmail(data: BookingEmailData) {
  const balanceDue = data.totalAmount - data.depositAmount;
  const eventDateRange = data.startDate.toDateString() === data.endDate.toDateString()
    ? formatDate(data.startDate)
    : `${formatDate(data.startDate)} - ${formatDate(data.endDate)}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #1a1a1a; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #2D3748; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color: #D4AF37; padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #2D3748; font-size: 28px; font-weight: bold;">Upscale Outhouse</h1>
              <p style="margin: 10px 0 0 0; color: #2D3748; font-size: 14px;">Luxury Restroom Trailer Rentals</p>
            </td>
          </tr>

          <!-- Confirmation Message -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #D4AF37; font-size: 24px;">Booking Confirmed!</h2>
              <p style="margin: 0 0 20px 0; color: #F7FAFC; font-size: 16px; line-height: 1.6;">
                Dear ${data.customerName},
              </p>
              <p style="margin: 0 0 20px 0; color: #F7FAFC; font-size: 16px; line-height: 1.6;">
                Thank you for choosing Upscale Outhouse! Your booking has been confirmed and your deposit has been received.
              </p>

              <!-- Booking ID -->
              <div style="background-color: #1a1a1a; border-radius: 8px; padding: 15px; margin-bottom: 30px;">
                <p style="margin: 0; color: #D4AF37; font-size: 14px;">Booking Reference</p>
                <p style="margin: 5px 0 0 0; color: #F7FAFC; font-size: 18px; font-family: monospace;">${data.bookingId}</p>
              </div>

              <!-- Event Details -->
              <h3 style="margin: 0 0 15px 0; color: #D4AF37; font-size: 18px; border-bottom: 1px solid #D4AF37; padding-bottom: 10px;">Event Details</h3>
              <table width="100%" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 8px 0; color: #a0aec0; font-size: 14px;">Date:</td>
                  <td style="padding: 8px 0; color: #F7FAFC; font-size: 14px; text-align: right;">${eventDateRange}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #a0aec0; font-size: 14px;">Time:</td>
                  <td style="padding: 8px 0; color: #F7FAFC; font-size: 14px; text-align: right;">${data.startTime} - ${data.endTime}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #a0aec0; font-size: 14px;">Event Type:</td>
                  <td style="padding: 8px 0; color: #F7FAFC; font-size: 14px; text-align: right;">${formatEventType(data.eventType)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #a0aec0; font-size: 14px;">Location:</td>
                  <td style="padding: 8px 0; color: #F7FAFC; font-size: 14px; text-align: right;">${data.eventAddress}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #a0aec0; font-size: 14px;">Water Hookup:</td>
                  <td style="padding: 8px 0; color: #F7FAFC; font-size: 14px; text-align: right;">${data.hasWaterHookup ? 'Yes' : 'No'}</td>
                </tr>
              </table>

              <!-- Payment Summary -->
              <h3 style="margin: 0 0 15px 0; color: #D4AF37; font-size: 18px; border-bottom: 1px solid #D4AF37; padding-bottom: 10px;">Payment Summary</h3>
              <table width="100%" style="margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #a0aec0; font-size: 14px;">Rental (${data.numberOfDays} day${data.numberOfDays > 1 ? 's' : ''}):</td>
                  <td style="padding: 8px 0; color: #F7FAFC; font-size: 14px; text-align: right;">${formatCurrency(data.baseRental)}</td>
                </tr>
                ${data.discountAmount > 0 ? `
                <tr>
                  <td style="padding: 8px 0; color: #48bb78; font-size: 14px;">Multi-day Discount (${data.discountPercent}%):</td>
                  <td style="padding: 8px 0; color: #48bb78; font-size: 14px; text-align: right;">-${formatCurrency(data.discountAmount)}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; color: #a0aec0; font-size: 14px;">Delivery Fee:</td>
                  <td style="padding: 8px 0; color: #F7FAFC; font-size: 14px; text-align: right;">${data.deliveryFee > 0 ? formatCurrency(data.deliveryFee) : 'Free'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #F7FAFC; font-size: 16px; font-weight: bold; border-top: 1px solid #4a5568;">Total:</td>
                  <td style="padding: 12px 0; color: #F7FAFC; font-size: 16px; font-weight: bold; text-align: right; border-top: 1px solid #4a5568;">${formatCurrency(data.totalAmount)}</td>
                </tr>
              </table>

              <!-- Payment Status -->
              <div style="background-color: #1a1a1a; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <table width="100%">
                  <tr>
                    <td style="color: #48bb78; font-size: 14px;">Deposit Paid:</td>
                    <td style="color: #48bb78; font-size: 14px; text-align: right; font-weight: bold;">${formatCurrency(data.depositAmount)}</td>
                  </tr>
                  <tr>
                    <td style="padding-top: 10px; color: #D4AF37; font-size: 16px; font-weight: bold;">Balance Due on Delivery:</td>
                    <td style="padding-top: 10px; color: #D4AF37; font-size: 16px; text-align: right; font-weight: bold;">${formatCurrency(balanceDue)}</td>
                  </tr>
                </table>
              </div>

              <!-- What's Next -->
              <h3 style="margin: 0 0 15px 0; color: #D4AF37; font-size: 18px;">What's Next?</h3>
              <ul style="margin: 0 0 30px 0; padding-left: 20px; color: #F7FAFC; font-size: 14px; line-height: 1.8;">
                <li>We'll contact you 48 hours before your event to confirm delivery details</li>
                <li>Please ensure the delivery location is accessible for our trailer</li>
                <li>The balance of ${formatCurrency(balanceDue)} is due upon delivery</li>
                <li>We accept cash or card for the remaining balance</li>
              </ul>

              <!-- Contact -->
              <div style="background-color: #D4AF37; border-radius: 8px; padding: 20px; text-align: center;">
                <p style="margin: 0 0 10px 0; color: #2D3748; font-size: 14px; font-weight: bold;">Questions? Contact us!</p>
                <p style="margin: 0; color: #2D3748; font-size: 14px;">Phone: ${BUSINESS_PHONE}</p>
                <p style="margin: 5px 0 0 0; color: #2D3748; font-size: 14px;">Email: ${FROM_EMAIL}</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 20px 30px; text-align: center;">
              <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                Upscale Outhouse | Fresno, California<br>
                Veteran-Owned Luxury Restroom Trailer Rentals
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const { data: emailData, error } = await getResend().emails.send({
    from: `Upscale Outhouse <${FROM_EMAIL}>`,
    to: [data.customerEmail],
    subject: `Booking Confirmed - ${formatEventType(data.eventType)} on ${formatDate(data.startDate)}`,
    html,
  });

  if (error) {
    console.error('Failed to send customer confirmation email:', error);
    throw error;
  }

  return emailData;
}

// Send notification email to owner about new booking
export async function sendOwnerNotificationEmail(data: BookingEmailData) {
  const balanceDue = data.totalAmount - data.depositAmount;
  const eventDateRange = data.startDate.toDateString() === data.endDate.toDateString()
    ? formatDate(data.startDate)
    : `${formatDate(data.startDate)} - ${formatDate(data.endDate)}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Notification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #2D3748; padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #D4AF37; font-size: 24px; font-weight: bold;">New Booking!</h1>
              <p style="margin: 10px 0 0 0; color: #F7FAFC; font-size: 14px;">A deposit has been received</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <!-- Booking ID -->
              <div style="background-color: #f0f0f0; border-radius: 8px; padding: 15px; margin-bottom: 30px; border-left: 4px solid #D4AF37;">
                <p style="margin: 0; color: #666; font-size: 12px; text-transform: uppercase;">Booking ID</p>
                <p style="margin: 5px 0 0 0; color: #2D3748; font-size: 16px; font-family: monospace; font-weight: bold;">${data.bookingId}</p>
              </div>

              <!-- Customer Info -->
              <h3 style="margin: 0 0 15px 0; color: #2D3748; font-size: 16px; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Customer Information</h3>
              <table width="100%" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #2D3748; font-size: 14px; font-weight: bold;">${data.customerName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Email:</td>
                  <td style="padding: 8px 0; color: #2D3748; font-size: 14px;"><a href="mailto:${data.customerEmail}" style="color: #2563eb;">${data.customerEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Phone:</td>
                  <td style="padding: 8px 0; color: #2D3748; font-size: 14px;"><a href="tel:${data.customerPhone}" style="color: #2563eb;">${data.customerPhone}</a></td>
                </tr>
              </table>

              <!-- Event Details -->
              <h3 style="margin: 0 0 15px 0; color: #2D3748; font-size: 16px; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Event Details</h3>
              <table width="100%" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px; width: 120px;">Date:</td>
                  <td style="padding: 8px 0; color: #2D3748; font-size: 14px; font-weight: bold;">${eventDateRange}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Time:</td>
                  <td style="padding: 8px 0; color: #2D3748; font-size: 14px;">${data.startTime} - ${data.endTime}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Event Type:</td>
                  <td style="padding: 8px 0; color: #2D3748; font-size: 14px;">${formatEventType(data.eventType)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Guests:</td>
                  <td style="padding: 8px 0; color: #2D3748; font-size: 14px;">${data.guestCount}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Location:</td>
                  <td style="padding: 8px 0; color: #2D3748; font-size: 14px;">${data.eventAddress}${data.eventCity ? `, ${data.eventCity}` : ''}${data.eventState ? `, ${data.eventState}` : ''}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Water Hookup:</td>
                  <td style="padding: 8px 0; color: #2D3748; font-size: 14px;">${data.hasWaterHookup ? 'Yes' : 'No'}</td>
                </tr>
              </table>

              <!-- Payment Summary -->
              <h3 style="margin: 0 0 15px 0; color: #2D3748; font-size: 16px; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Payment Summary</h3>
              <table width="100%" style="margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Rental (${data.numberOfDays} days):</td>
                  <td style="padding: 8px 0; color: #2D3748; font-size: 14px; text-align: right;">${formatCurrency(data.baseRental)}</td>
                </tr>
                ${data.discountAmount > 0 ? `
                <tr>
                  <td style="padding: 8px 0; color: #16a34a; font-size: 14px;">Discount (${data.discountPercent}%):</td>
                  <td style="padding: 8px 0; color: #16a34a; font-size: 14px; text-align: right;">-${formatCurrency(data.discountAmount)}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Delivery Fee:</td>
                  <td style="padding: 8px 0; color: #2D3748; font-size: 14px; text-align: right;">${data.deliveryFee > 0 ? formatCurrency(data.deliveryFee) : 'Free'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #2D3748; font-size: 16px; font-weight: bold; border-top: 2px solid #e5e5e5;">Total:</td>
                  <td style="padding: 12px 0; color: #2D3748; font-size: 16px; font-weight: bold; text-align: right; border-top: 2px solid #e5e5e5;">${formatCurrency(data.totalAmount)}</td>
                </tr>
              </table>

              <!-- Payment Status -->
              <div style="background-color: #dcfce7; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <table width="100%">
                  <tr>
                    <td style="color: #16a34a; font-size: 14px; font-weight: bold;">Deposit Received:</td>
                    <td style="color: #16a34a; font-size: 18px; text-align: right; font-weight: bold;">${formatCurrency(data.depositAmount)}</td>
                  </tr>
                </table>
              </div>

              <div style="background-color: #fef3c7; border-radius: 8px; padding: 20px;">
                <table width="100%">
                  <tr>
                    <td style="color: #92400e; font-size: 14px; font-weight: bold;">Balance Due on Delivery:</td>
                    <td style="color: #92400e; font-size: 18px; text-align: right; font-weight: bold;">${formatCurrency(balanceDue)}</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f5f5f5; padding: 20px 30px; text-align: center;">
              <p style="margin: 0; color: #666; font-size: 12px;">
                This is an automated notification from Upscale Outhouse booking system.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const { data: emailData, error } = await getResend().emails.send({
    from: `Upscale Outhouse System <${FROM_EMAIL}>`,
    to: [OWNER_EMAIL],
    subject: `New Booking: ${data.customerName} - ${formatEventType(data.eventType)} on ${formatDate(data.startDate)}`,
    html,
  });

  if (error) {
    console.error('Failed to send owner notification email:', error);
    throw error;
  }

  return emailData;
}
