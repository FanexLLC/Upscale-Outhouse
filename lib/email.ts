import { Resend } from 'resend';
import { formatTimeRange } from './time';

// --- CONFIGURATION ---
// BRAND COLORS
const C_HEADER_TOP    = '#2C2C2C';    // Lighter Charcoal (Gradient Start)
const C_HEADER_BOT    = '#1a1a1a';    // Darker Charcoal (Gradient End)
const C_BODY_BG       = '#f4f4f5';    // Light Grey (Document Background)
const C_PAPER         = '#ffffff';    // White (The "Bond Paper")
const C_GOLD          = '#D4AF37';    // Metallic Gold (Accent)
const C_TEXT_DARK     = '#111827';    // Near Black (Primary Text)
const C_TEXT_GREY     = '#6b7280';    // Muted Grey (Labels)
const C_BORDER        = '#e5e7eb';    // Light Border

// FONTS
const F_SERIF = "Georgia, 'Times New Roman', Times, serif";
const F_SANS  = "'Helvetica Neue', Helvetica, Arial, sans-serif";

// --- SETUP ---
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

// --- UTILITIES ---

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
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

function formatBookingRef(id: string): string {
  if (!id) return 'REF-PENDING';
  const clean = id.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  return clean.length > 8 
    ? '#' + clean.slice(-8) 
    : '#' + clean;
}

// --- EMAIL TEMPLATES ---

export async function sendCustomerConfirmationEmail(data: BookingEmailData) {
  const balanceDue = data.totalAmount - data.depositAmount;
  const eventDateRange = data.startDate.toDateString() === data.endDate.toDateString()
    ? formatDate(data.startDate)
    : `${formatDate(data.startDate)} – ${formatDate(data.endDate)}`;
  
  const bookingRef = formatBookingRef(data.bookingId);

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
  <style>
    body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; }
    /* Mobile Responsive Logic */
    @media only screen and (max-width: 640px) {
      .container { width: 100% !important; max-width: 100% !important; }
      .content-wrap { padding: 20px !important; }
      .mobile-block { display: block !important; width: 100% !important; padding-left: 0 !important; padding-right: 0 !important; margin-bottom: 20px !important; }
    }
  </style>
</head>
<body style="background-color: ${C_BODY_BG}; font-family: ${F_SANS}; color: ${C_TEXT_DARK}; margin: 0; padding: 0;">

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: ${C_BODY_BG};">
    <tr>
      <td align="center" style="padding: 40px 0;">
        
        <table role="presentation" class="container" width="640" cellspacing="0" cellpadding="0" border="0" style="background-color: ${C_PAPER}; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <tr>
            <td align="center" style="background: linear-gradient(180deg, ${C_HEADER_TOP} 0%, ${C_HEADER_BOT} 100%); padding: 50px 20px; border-bottom: 6px solid ${C_GOLD};">
              <h1 style="margin: 0; font-family: ${F_SERIF}; font-size: 32px; color: ${C_GOLD}; text-transform: uppercase; letter-spacing: 4px; font-weight: 400; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
                Upscale Outhouse
              </h1>
              <p style="margin: 10px 0 0; font-family: ${F_SANS}; font-size: 11px; color: #a3a3a3; text-transform: uppercase; letter-spacing: 3px;">
                Luxury Restroom Trailers
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color: #fcfcfc; border-bottom: 1px solid ${C_BORDER}; padding: 15px 40px;">
              <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: ${C_TEXT_GREY};">Booking Reference</td>
                  <td align="right" style="font-family: monospace; font-size: 16px; font-weight: bold; color: ${C_TEXT_DARK}; letter-spacing: 1px; background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px;">${bookingRef}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="content-wrap" style="padding: 40px 40px 20px 40px;">
              <h2 style="margin: 0 0 20px; font-family: ${F_SERIF}; font-size: 28px; color: ${C_TEXT_DARK}; font-weight: normal; border-bottom: 2px solid ${C_GOLD}; display: inline-block; padding-bottom: 5px;">
                Booking Confirmed
              </h2>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #4b5563;">
                Dear ${data.customerName},
              </p>
              <p style="margin: 0 0 0; font-size: 16px; line-height: 1.6; color: #4b5563;">
                We are pleased to confirm that your reservation is secured. We have received your deposit, and your luxury unit has been allocated for the following dates.
              </p>
            </td>
          </tr>

          <tr>
            <td class="content-wrap" style="padding: 0 40px 40px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td class="mobile-block" width="48%" valign="top" style="padding-right: 10px;">
                    <h3 style="font-family: ${F_SERIF}; font-size: 16px; color: ${C_TEXT_DARK}; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 0.5px; border-left: 3px solid ${C_GOLD}; padding-left: 10px;">Logistics</h3>
                    <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 8px; font-size: 14px; color: ${C_TEXT_GREY}; width: 60px;">Date:</td>
                        <td style="padding-bottom: 8px; font-size: 14px; color: ${C_TEXT_DARK}; font-weight: 500;">${eventDateRange}</td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 8px; font-size: 14px; color: ${C_TEXT_GREY};">Time:</td>
                        <td style="padding-bottom: 8px; font-size: 14px; color: ${C_TEXT_DARK}; font-weight: 500;">${formatTimeRange(data.startTime, data.endTime)}</td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 8px; font-size: 14px; color: ${C_TEXT_GREY};">Type:</td>
                        <td style="padding-bottom: 8px; font-size: 14px; color: ${C_TEXT_DARK}; font-weight: 500;">${formatEventType(data.eventType)}</td>
                      </tr>
                    </table>
                  </td>

                  <td class="mobile-block" width="48%" valign="top" style="padding-left: 10px;">
                    <h3 style="font-family: ${F_SERIF}; font-size: 16px; color: ${C_TEXT_DARK}; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 0.5px; border-left: 3px solid ${C_GOLD}; padding-left: 10px;">Location</h3>
                    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: ${C_TEXT_DARK};">
                      ${data.eventAddress}<br>
                      ${data.eventCity ? data.eventCity : ''}${data.eventState ? ', ' + data.eventState : ''}<br>
                      <span style="color: ${C_TEXT_GREY}; font-size: 13px;">Water Hookup: ${data.hasWaterHookup ? 'Yes' : 'No'}</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="content-wrap" style="padding: 0 40px 40px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #fafafa; border: 1px solid #eeeeee; border-radius: 4px;">
                <tr>
                  <td style="padding: 15px 20px; font-family: ${F_SERIF}; font-size: 16px; font-weight: bold; color: ${C_TEXT_DARK}; border-bottom: 1px solid #eeeeee;">Service Description</td>
                  <td align="right" style="padding: 15px 20px; font-family: ${F_SERIF}; font-size: 16px; font-weight: bold; color: ${C_TEXT_DARK}; border-bottom: 1px solid #eeeeee;">Amount</td>
                </tr>
                
                <tr>
                  <td style="padding: 15px 20px 5px; font-size: 14px; color: ${C_TEXT_DARK};">Luxury Restroom Trailer Rental (${data.numberOfDays} days)</td>
                  <td align="right" style="padding: 15px 20px 5px; font-size: 14px; color: ${C_TEXT_DARK};">${formatCurrency(data.baseRental)}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 20px 15px; font-size: 14px; color: ${C_TEXT_DARK};">Delivery, Setup & Pickup</td>
                  <td align="right" style="padding: 5px 20px 15px; font-size: 14px; color: ${C_TEXT_DARK};">${data.deliveryFee > 0 ? formatCurrency(data.deliveryFee) : 'Included'}</td>
                </tr>
                
                ${data.discountAmount > 0 ? `
                <tr>
                  <td style="padding: 5px 20px; font-size: 14px; color: #059669;">Preferred Client Discount</td>
                  <td align="right" style="padding: 5px 20px; font-size: 14px; color: #059669;">- ${formatCurrency(data.discountAmount)}</td>
                </tr>
                ` : ''}

                <tr>
                  <td colspan="2"><div style="height: 1px; background-color: #eeeeee; margin: 0 20px;"></div></td>
                </tr>
                
                <tr>
                  <td style="padding: 15px 20px 5px; font-size: 14px; color: ${C_TEXT_GREY};">Subtotal</td>
                  <td align="right" style="padding: 15px 20px 5px; font-size: 14px; color: ${C_TEXT_DARK}; font-weight: bold;">${formatCurrency(data.totalAmount)}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 20px; font-size: 14px; color: #059669;">Deposit Paid</td>
                  <td align="right" style="padding: 5px 20px; font-size: 14px; color: #059669;">- ${formatCurrency(data.depositAmount)}</td>
                </tr>
                <tr>
                  <td style="padding: 15px 20px; font-family: ${F_SERIF}; font-size: 18px; color: ${C_TEXT_DARK}; font-weight: bold;">Balance Due Upon Delivery</td>
                  <td align="right" style="padding: 15px 20px; font-family: ${F_SERIF}; font-size: 22px; color: ${C_GOLD}; font-weight: bold;">${formatCurrency(balanceDue)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px;">
              <table width="100%">
                <tr>
                  <td style="font-size: 12px; color: ${C_TEXT_GREY}; line-height: 1.6;">
                    <strong>Next Steps:</strong> We will contact you 48 hours prior to the event to confirm site accessibility. The remaining balance is due on arrival via cash or card.<br><br>
                    <strong>Upscale Outhouse</strong><br>
                    Fresno, California<br>
                    <a href="tel:${BUSINESS_PHONE}" style="color: ${C_TEXT_GREY}; text-decoration: underline;">${BUSINESS_PHONE}</a>
                  </td>
                  <td align="right" valign="top">
                    <div style="border: 1px solid ${C_GOLD}; padding: 8px 12px; display: inline-block;">
                       <span style="font-family: ${F_SERIF}; font-size: 10px; color: ${C_TEXT_DARK}; text-transform: uppercase; letter-spacing: 1px;">Veteran Owned</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <p style="text-align: center; margin-top: 20px; font-size: 12px; color: #9ca3af;">
          &copy; ${new Date().getFullYear()} Upscale Outhouse. All rights reserved.
        </p>

      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const subject = `Booking Confirmed: ${formatEventType(data.eventType)} (${formatBookingRef(data.bookingId)})`;

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

export async function sendOwnerNotificationEmail(data: BookingEmailData) {
  // Keep owner email simple but clean
  const balanceDue = data.totalAmount - data.depositAmount;
  const eventDateRange = data.startDate.toDateString() === data.endDate.toDateString()
    ? formatDate(data.startDate)
    : `${formatDate(data.startDate)} – ${formatDate(data.endDate)}`;
  
  const html = `
<!DOCTYPE html>
<html>
<body style="font-family: ${F_SANS}; color: ${C_TEXT_DARK}; background-color: #f3f4f6; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-left: 5px solid ${C_GOLD};">
    <h2 style="margin-top: 0; color: ${C_TEXT_DARK};">New Booking Received</h2>
    <p style="color: ${C_TEXT_GREY};">Booking ID: <strong style="color: ${C_TEXT_DARK}; font-family: monospace;">${formatBookingRef(data.bookingId)}</strong></p>
    
    <div style="background: #f9fafb; padding: 15px; margin: 20px 0;">
      <strong>Customer:</strong> ${data.customerName}<br>
      <strong>Phone:</strong> <a href="tel:${data.customerPhone}">${data.customerPhone}</a>
    </div>

    <div style="margin-bottom: 20px;">
      <strong>Event:</strong> ${formatEventType(data.eventType)}<br>
      <strong>Dates:</strong> ${eventDateRange}<br>
      <strong>Location:</strong> ${data.eventAddress}
    </div>

    <table width="100%" style="border-top: 1px solid #eee; padding-top: 10px;">
      <tr>
        <td>Deposit Paid</td>
        <td align="right" style="color: green; font-weight: bold;">+${formatCurrency(data.depositAmount)}</td>
      </tr>
      <tr>
        <td>Balance Due</td>
        <td align="right" style="color: ${C_GOLD}; font-weight: bold;">${formatCurrency(balanceDue)}</td>
      </tr>
    </table>
  </div>
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
