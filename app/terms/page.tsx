import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Upscale Outhouse',
  description: 'Terms of Service for Upscale Outhouse luxury bathroom trailer rentals.',
};

export default function TermsPage() {
  return (
    <section className="py-20 bg-charcoal-dark">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gold mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-gold max-w-none space-y-6 text-cream/80">
          <p className="text-sm text-cream/60">Last updated: January 2025</p>

          <h2 className="text-2xl font-semibold text-gold mt-8">1. Agreement to Terms</h2>
          <p>
            By booking a rental with Upscale Outhouse, you agree to these Terms of Service.
            Please read them carefully before making a reservation.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-8">2. Booking and Payment</h2>
          <p>
            A $100 non-refundable deposit is required to secure your rental date. The remaining
            balance is due upon delivery of the trailer. We accept major credit cards and cash.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-8">3. Pricing</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Base rental rate: $450 per day</li>
            <li>Free delivery within 50 miles of Fresno, CA (93704)</li>
            <li>Delivery fee: $2 per mile beyond 50 miles</li>
            <li>Maximum service radius: 150 miles</li>
            <li>Multi-day discounts: 10% off for 3-4 days, 15% off for 5+ days</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gold mt-8">4. Cancellation Policy</h2>
          <p>
            The $100 deposit is non-refundable. If you need to cancel your reservation, please
            contact us as soon as possible. We may be able to reschedule your booking to a
            different date subject to availability.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-8">5. Rental Period</h2>
          <p>
            The rental period begins at the scheduled delivery time and ends at the scheduled
            pickup time. Extensions may be available subject to availability and additional fees.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-8">6. Site Requirements</h2>
          <p>
            You are responsible for ensuring the delivery location meets the following requirements:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Flat, level surface approximately 25 feet long and 10 feet wide</li>
            <li>Vehicle access for delivery and pickup</li>
            <li>Clear path to the placement location</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gold mt-8">7. Care and Use</h2>
          <p>
            You agree to use the trailer in a responsible manner and for its intended purpose only.
            Any damage beyond normal wear and tear will be the responsibility of the renter and
            may result in additional charges.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-8">8. Liability</h2>
          <p>
            Upscale Outhouse is not liable for any injuries, accidents, or damages that occur
            during the rental period, except where caused by our negligence. Users assume all
            risk associated with the use of the rental equipment.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-8">9. Weather</h2>
          <p>
            Rentals proceed rain or shine unless extreme weather conditions make delivery unsafe.
            In such cases, we will work with you to reschedule.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-8">10. Contact</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <ul className="list-none space-y-1">
            <li>Email: info@upscaleouthouse.com</li>
            <li>Phone: (559) 123-4567</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
