import { Resend } from 'resend';

// --- CONFIGURATION ---
// Replace this with the actual URL of your hosted logo (PNG/JPG)
// If you don't have one hosted yet, we can use a text fallback in the HTML
const LOGO_URL = 'https://placehold.co/400x150/1c1c1c/D4AF37?text=UPSCALE+OUTHOUSE'; 

// Colors
const COLOR_BG_MAIN = '#f3f4f6'; // Light grey outer background for contrast
const COLOR_BG_CARD = '#ffffff'; // White card for content
const COLOR_ACCENT = '#D4AF37'; // Luxury Gold
const COLOR_TEXT_MAIN = '#1f2937'; // Dark Grey for readability
const COLOR_TEXT_MUTED = '#6b7280'; // Light Grey for labels
const COLOR_SUCCESS = '#059669'; // Emerald Green for "Paid"

// Lazily initialize Resend
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

const EMAIL_FROM_RAW = process.env.EMAIL_FROM || 'invoices@upscaleouthouse.com';
const FROM_EMAIL = `Upscale Outhouse <${EMAIL_FROM_RAW}>`;
const REPLY_TO = 'upscaleouthouse@gmail.com';
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'upscaleouthouse@gmail.com';
const BUSINESS_PHONE = process.env.BUSINESS_PHONE || '(559) 663-0356';

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

// --- UTILS ---
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
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

// --- TEMPLATES ---

export async function sendCustomerConfirmationEmail(data: BookingEmailData) {
  const balanceDue = data.totalAmount - data.depositAmount;
  const eventDateRange = data.startDate.toDateString() === data.endDate.toDateString()
    ? formatDate(data.startDate)
    : `${formatDate(data.startDate)} – ${formatDate(data.endDate)}`;

  // The "Luxury Card" Template
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
  <style>
    /* Reset & clients adjustments */
    body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    /* Mobile styles */
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 0 !important; }
      .content-wrap { padding: 20px !important; }
      .mobile-stack { display: block !important; width: 100% !important; }
      .mobile-padding { padding-left: 0 !important; padding-top: 10px !important; }
    }
  </style>
</head>
<body style="background-color: ${COLOR_BG_MAIN}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: ${COLOR_TEXT_MAIN};">
  
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: ${COLOR_BG_MAIN}; padding: 40px 0;">
    <tr>
      <td align="center">
        
        <table role="presentation" class="container" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: ${COLOR_BG_CARD}; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-top: 6px solid ${COLOR_ACCENT};">
          
          <tr>
            <td align="center" style="padding: 40px 0 20px 0;">
              <img src="${LOGO_URL}" alt="Upscale Outhouse" width="250" style="max-width: 80%; height: auto; display: block; font-family: serif; font-size: 24px; color: ${COLOR_TEXT_MAIN};" border="0">
              <p style="margin: 10px 0 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: ${COLOR_TEXT_MUTED};">Luxury Restroom Trailers</p>
            </td>
          </tr>

          <tr>
            <td class="content-wrap" style="padding: 20px 50px 40px 50px; text-align: center;">
              <h1 style="margin: 0 0 15px; font-size: 26px; font-weight: 300; color: ${COLOR_TEXT_MAIN};">Your Event is Secured.</h1>
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: ${COLOR_TEXT_MUTED};">
                Dear ${data.customerName},<br>
                Thank you for choosing Upscale Outhouse. We have received your deposit and your luxury trailer is officially reserved for the dates below.
              </p>
              
              <div style="display: inline-block; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 10px 20px;">
                <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: ${COLOR_TEXT_MUTED};">Booking Reference</span>
                <span style="display: block; font-size: 18px; font-family: monospace; font-weight: 700; color: ${COLOR_TEXT_MAIN}; letter-spacing: 2px;">#${data.bookingId}</span>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 50px;">
              <div style="height: 1px; width: 100%; background-color: #e5e7eb;"></div>
            </td>
          </tr>

          <tr>
            <td class="content-wrap" style="padding: 40px 50px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td class="mobile-stack" valign="top" width="48%" style="padding-bottom: 20px;">
                    <h3 style="margin: 0 0 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: ${COLOR_ACCENT}; font-weight: bold;">Event Details</h3>
                    <p style="margin: 0 0 8px; font-size: 14px; color: ${COLOR_TEXT_MAIN};">
                      <strong style="color: ${COLOR_TEXT_MUTED}; display: inline-block; width: 50px;">Date:</strong> ${eventDateRange}
                    </p>
                    <p style="margin: 0 0 8px; font-size: 14px; color: ${COLOR_TEXT_MAIN};">
                      <strong style="color: ${COLOR_TEXT_MUTED}; display: inline-block; width: 50px;">Time:</strong> ${data.startTime} - ${data.endTime}
                    </p>
                    <p style="margin: 0 0 8px; font-size: 14px; color: ${COLOR_TEXT_MAIN};">
                      <strong style="color: ${COLOR_TEXT_MUTED}; display: inline-block; width: 50px;">Type:</strong> ${formatEventType(data.eventType)}
                    </p>
                    <p style="margin: 0; font-size: 14px; color: ${COLOR_TEXT_MAIN};">
                       <strong style="color: ${COLOR_TEXT_MUTED}; display: inline-block; width: 50px;">Water:</strong> ${data.hasWaterHookup ? 'Yes' : 'No'}
                    </p>
                  </td>
                  
                  <td class="mobile-stack" width="4%"></td>

                  <td class="mobile-stack mobile-padding" valign="top" width="48%">
                    <h3 style="margin: 0 0 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: ${COLOR_ACCENT}; font-weight: bold;">Location</h3>
                    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: ${COLOR_TEXT_MAIN};">
                      ${data.eventAddress}<br>
                      ${data.eventCity ? data.eventCity : ''}${data.eventState ? ', ' + data.eventState : ''}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 30px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="margin: 0 0 20px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: ${COLOR_TEXT_MAIN}; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Payment Summary</h3>
                    
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding-bottom: 8px; font-size: 14px; color: ${COLOR_TEXT_MUTED};">Rental (${data.numberOfDays} days)</td>
                        <td align="right" style="padding-bottom: 8px; font-size: 14px; color: ${COLOR_TEXT_MAIN};">${formatCurrency(data.baseRental)}</td>
                      </tr>
                      ${data.discountAmount > 0 ? `
                      <tr>
                        <td style="padding-bottom: 8px; font-size: 14px; color: ${COLOR_SUCCESS};">Preferred Client Discount</td>
                        <td align="right" style="padding-bottom: 8px; font-size: 14px; color: ${COLOR_SUCCESS};">-${formatCurrency(data.discountAmount)}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding-bottom: 8px; font-size: 14px; color: ${COLOR_TEXT_MUTED};">Delivery & Setup</td>
                        <td align="right" style="padding-bottom: 8px; font-size: 14px; color: ${COLOR_TEXT_MAIN};">${data.deliveryFee > 0 ? formatCurrency(data.deliveryFee) : 'Complimentary'}</td>
                      </tr>
                      
                      <tr>
                        <td colspan="2" style="padding: 15px 0;"><div style="height: 1px; background-color: #e2e8f0;"></div></td>
                      </tr>
                      <tr>
                        <td style="font-size: 16px; font-weight: bold; color: ${COLOR_TEXT_MAIN};">Total Amount</td>
                        <td align="right" style="font-size: 16px; font-weight: bold; color: ${COLOR_TEXT_MAIN};">${formatCurrency(data.totalAmount)}</td>
                      </tr>
                      <tr>
                        <td style="padding-top: 8px; font-size: 14px; color: ${COLOR_SUCCESS}; font-weight: 500;">Deposit Paid (Thank You)</td>
                        <td align="right" style="padding-top: 8px; font-size: 14px; color: ${COLOR_SUCCESS}; font-weight: 500;">-${formatCurrency(data.depositAmount)}</td>
                      </tr>
                      <tr>
                        <td style="padding-top: 15px; font-size: 16px; color: ${COLOR_TEXT_MAIN}; font-weight: bold;">Balance Due Upon Delivery</td>
                        <td align="right" style="padding-top: 15px; font-size: 20px; color: ${COLOR_ACCENT}; font-weight: bold;">${formatCurrency(balanceDue)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="content-wrap" style="padding: 0 50px 40px; text-align: center;">
               <h4 style="margin: 0 0 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: ${COLOR_TEXT_MUTED};">What Happens Next?</h4>
               <p style="margin: 0; font-size: 14px; color: ${COLOR_TEXT_MUTED}; line-height: 1.6;">
                 We will contact you 48 hours prior to your event to confirm final delivery logistics. Please ensure the drop-off location is accessible. The remaining balance of <strong>${formatCurrency(balanceDue)}</strong> is due upon arrival.
               </p>
            </td>
          </tr>

          <tr>
            <td style="background-color: #1f2937; padding: 30px; text-align: center;">
              <p style="margin: 0 0 10px; font-size: 16px; font-weight: bold; color: #ffffff;">Upscale Outhouse</p>
              <p style="margin: 0 0 20px; font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px;">Veteran-Owned & Operated</p>
              
              <p style="margin: 0; font-size: 12px; color: #6b7280;">
                <a href="tel:${BUSINESS_PHONE}" style="color: #D4AF37; text-decoration: none;">${BUSINESS_PHONE}</a> &bull; 
                <a href="mailto:${REPLY_TO}" style="color: #D4AF37; text-decoration: none;">${REPLY_TO}</a>
              </p>
              <p style="margin: 20px 0 0; font-size: 11px; color: #4b5563;">
                Fresno, California
              </p>
            </td>
          </tr>

        </table>
        <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
          &copy; ${new Date().getFullYear()} Upscale Outhouse. All rights reserved.
        </p>

      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const subject = `Booking Confirmed: ${formatEventType(data.eventType)} on ${formatDate(data.startDate)}`;

  const { data: emailData, error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: [data.customerEmail],
    replyTo: REPLY_TO,
    subject,
    html,
  });

  if (error) {
    console.error('Failed to send customer confirmation email:', error);
    throw error;
  }
  return emailData;
}


// Send notification email to owner (Simplified but clean)
export async function sendOwnerNotificationEmail(data: BookingEmailData) {
  const balanceDue = data.totalAmount - data.depositAmount;
  const eventDateRange = data.startDate.toDateString() === data.endDate.toDateString()
    ? formatDate(data.startDate)
    : `${formatDate(data.startDate)} - ${formatDate(data.endDate)}`;

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="border-left: 4px solid ${COLOR_ACCENT}; padding-left: 15px; margin-bottom: 20px;">
    <h2 style="margin: 0; color: #1f2937;">New Booking Received</h2>
    <p style="margin: 5px 0 0; color: #666;">Deposit processed successfully.</p>
  </div>
  
  <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
    <strong>Booking ID:</strong> ${data.bookingId}<br>
    <strong>Customer:</strong> ${data.customerName} (<a href="tel:${data.customerPhone}">${data.customerPhone}</a>)<br>
    <strong>Dates:</strong> ${eventDateRange}<br>
    <strong>Location:</strong> ${data.eventAddress}
  </div>

  <table width="100%" style="border-collapse: collapse;">
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 10px 0;">Total Value</td>
      <td align="right" style="font-weight: bold;">${formatCurrency(data.totalAmount)}</td>
    </tr>
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 10px 0; color: green;">Deposit Paid</td>
      <td align="right" style="color: green; font-weight: bold;">+${formatCurrency(data.depositAmount)}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; color: #d97706;">Balance Due (at delivery)</td>
      <td align="right" style="color: #d97706; font-weight: bold;">${formatCurrency(balanceDue)}</td>
    </tr>
  </table>
  
  <p style="margin-top: 30px; font-size: 12px; color: #888;">
    Check dashboard for full details.
  </p>
</body>
</html>
  `;

  const subject = `[NEW BOOKING] ${data.customerName} - ${eventDateRange}`;

  const { data: emailData, error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: [OWNER_EMAIL],
    replyTo: REPLY_TO,
    subject,
    html,
  });

  if (error) {
    console.error('Failed to send owner notification email:', error);
    throw error;
  }
  return emailData;
}