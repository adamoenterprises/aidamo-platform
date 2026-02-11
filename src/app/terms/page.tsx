import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | AIDAMO',
  description: 'AIDAMO terms of service - usage terms and conditions.',
  alternates: {
    canonical: '/terms',
  },
}

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
            <p className="text-neutral-600 leading-relaxed mb-8">
              Last updated: February 2026
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">1. Service Description</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              AIDAMO provides an AI-based negotiation support and preparation tool designed to assist users in analysing situations, clarifying decisions, and exploring strategic considerations.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              The service is a decision-support interface only.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">2. No Professional Advice</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              AIDAMO does not provide legal, financial, medical, or professional advice. All outputs are informational and contextual in nature.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              Users remain solely responsible for decisions made based on use of the service.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">3. No Reliance</h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              You acknowledge that any use of information provided by AIDAMO is at your own discretion and risk.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">4. Acceptable Use</h2>
            <p className="text-neutral-600 leading-relaxed mb-2">
              You agree not to:
            </p>
            <ul className="text-neutral-600 leading-relaxed mb-8 list-disc list-inside space-y-1">
              <li>Misuse the service</li>
              <li>Attempt to reverse-engineer or exploit the system</li>
              <li>Share access credentials improperly</li>
              <li>Use the service for unlawful purposes</li>
            </ul>

            <h2 className="text-lg font-medium mt-8 mb-4">5. Usage Limits & Availability</h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              Access limits, message caps, features, and availability may change at any time as the system evolves.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">6. Early-Stage Disclosure</h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              AIDAMO is an early-stage and evolving system. Functionality, performance, and outputs may change without notice.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">7. Limitation of Liability</h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              To the maximum extent permitted by law, AIDAMO and its operators shall not be liable for any indirect, incidental, special, consequential, or economic damages arising from use of the service.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">8. Enterprise & Evaluation Use</h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              These terms do not prevent enterprise, professional, pilot, or internal evaluation use of the service, subject to appropriate internal controls.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">9. Changes to Terms</h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              We may update these terms from time to time. Continued use of the service constitutes acceptance of the updated terms.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">10. Contact</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              For questions regarding these terms:<br />
              <a href="mailto:legal@aidamo.ai" className="text-neutral-900 hover:underline">legal@aidamo.ai</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
