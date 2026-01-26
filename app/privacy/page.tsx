import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Upscale Outhouse luxury bathroom trailer rentals.',
};

export default function PrivacyPage() {
  return (
    <section className="py-20 bg-charcoal-dark">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-gold max-w-none space-y-6 text-cream/80">
          <p className="text-sm text-cream/60">Last updated: January 2025</p>

          <h2 className="text-2xl font-semibold text-gold mt-8">1. Information We Collect</h2>
          <p>
            When you request a quote or make a booking with Upscale Outhouse, we collect the
            following information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Event address and location</li>
            <li>Event details (date, type, guest count)</li>
            <li>Payment information (processed securely through Stripe)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gold mt-8">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process your booking and provide our services</li>
            <li>Communicate with you about your rental</li>
            <li>Send booking confirmations and reminders</li>
            <li>Process payments</li>
            <li>Improve our services</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gold mt-8">3. Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may
            share your information with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payment processors (Stripe) to complete transactions</li>
            <li>Email service providers to send confirmations</li>
            <li>Service providers who assist in our operations</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gold mt-8">4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information.
            Payment information is processed securely through Stripe and is never stored on
            our servers.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-8">5. Cookies</h2>
          <p>
            Our website may use cookies to enhance your browsing experience. You can choose
            to disable cookies through your browser settings, though this may affect some
            website functionality.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-8">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gold mt-8">7. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible
            for the privacy practices of these external sites.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-8">8. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under 18. We do not knowingly
            collect personal information from children.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-8">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any
            changes by posting the new policy on this page and updating the &quot;Last updated&quot;
            date.
          </p>

          <h2 className="text-2xl font-semibold text-gold mt-8">10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <ul className="list-none space-y-1">
            <li>Email: upscaleouthouse@gmail.com</li>
            <li>Phone: (559) 663-0356</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
