import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link href="/" className="text-sm font-medium tracking-tight">
            AIDAMO
          </Link>
        </div>
      </header>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-light tracking-tight mb-8">Terms of Service</h1>

          <div className="prose prose-neutral prose-sm">
            <p className="text-neutral-600 leading-relaxed mb-6">
              Last updated: January 2025
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">Service Description</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Aidamo provides AI-based negotiation support and preparation tools.
              The service is provided on a subscription basis.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">Subscription and Billing</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Subscriptions are billed monthly at the current rate. You may cancel
              at any time through your account settings. Cancellation takes effect
              at the end of the current billing period.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">Acceptable Use</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              You agree to use the service for lawful purposes only. You may not
              share your account credentials or use the service in ways that
              violate applicable laws or regulations.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">Disclaimer</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              The service provides general guidance and is not a substitute for
              professional legal, financial, or business advice. Use of the service
              is at your own discretion and risk.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">Limitation of Liability</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              To the maximum extent permitted by law, Aidamo shall not be liable
              for any indirect, incidental, or consequential damages arising from
              your use of the service.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">Changes to Terms</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              We reserve the right to modify these terms at any time. Continued use
              of the service after changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">Contact</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              For questions about these terms, please contact us at legal@aidamo.ai.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
