import { Icons } from '@/components/icons';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="h-8 w-8 text-primary" />
            <span className="font-bold text-lg">VastraShuddhi</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </header>
      <main className="container mx-auto max-w-3xl flex-1 py-12 px-4">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy for VastraShuddhi Laundry</h1>
        <p className="text-muted-foreground mb-8">Last updated: February 2026</p>

        <div className="space-y-8 text-foreground">
          <p>
            VastraShuddhi Laundry (“we”, “our”, “us”) uses the WhatsApp Cloud API provided by Meta to communicate with customers regarding laundry services such as order pickup, delivery updates, payment confirmations, and support.
          </p>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
            <p>We may collect the following information:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
              <li>Phone numbers</li>
              <li>Message content sent via WhatsApp</li>
              <li>Customer name (if shared via WhatsApp profile)</li>
              <li>Order-related details voluntarily shared by the user</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">2. How We Use Information</h2>
            <p>The collected information is used only to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
              <li>Respond to customer messages</li>
              <li>Provide laundry service updates (pickup, delivery, payment)</li>
              <li>Offer customer support</li>
              <li>Improve service communication</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">3. Data Sharing</h2>
            <p>
              We do not sell, rent, or share personal data with third parties. Data is only processed through WhatsApp (Meta) infrastructure as required for message delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">4. Data Retention</h2>
            <p>
              Messages and related data are retained only for as long as necessary to provide the service and resolve customer requests.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">5. Data Security</h2>
            <p>
              We take reasonable steps to protect user data from unauthorized access or disclosure.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">6. User Consent</h2>
            <p>
              By messaging VastraShuddhi Laundry on WhatsApp, users consent to the collection and use of information as described in this policy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">7. Contact Information</h2>
            <p>
              If you have any questions about this Privacy Policy or data usage, contact us at:
            </p>
            <p>
              📧 <a href="mailto:adityamali33@gmail.com" className="text-primary hover:underline">adityamali33@gmail.com</a>
            </p>
          </section>
        </div>
      </main>
       <footer className="py-6 border-t">
        <div className="container text-center text-muted-foreground text-sm">
             <p>&copy; {new Date().getFullYear()} VastraShuddhi. All rights reserved. | <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link></p>
        </div>
      </footer>
    </div>
  );
}
