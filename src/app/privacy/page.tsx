import Link from 'next/link'

export default function PrivacyPage() {
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
          <h1 className="text-2xl font-light tracking-tight mb-8">Privacy Policy</h1>

          <div className="prose prose-neutral prose-sm">
            <p className="text-neutral-600 leading-relaxed mb-8">
              Last updated: February 2026
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-neutral-600 leading-relaxed mb-2">
              We collect limited information necessary to provide access to the service, including:
            </p>
            <ul className="text-neutral-600 leading-relaxed mb-4 list-disc list-inside space-y-1">
              <li>Email address</li>
              <li>Account and usage metadata</li>
              <li>Conversation content submitted by users</li>
            </ul>
            <p className="text-neutral-600 leading-relaxed mb-8">
              We do not require personal profile data beyond what is needed for authentication and service operation.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">2. How We Use Information</h2>
            <p className="text-neutral-600 leading-relaxed mb-2">
              Information is used solely to:
            </p>
            <ul className="text-neutral-600 leading-relaxed mb-4 list-disc list-inside space-y-1">
              <li>Provide and operate the service</li>
              <li>Maintain and improve system performance</li>
              <li>Communicate with users regarding access and service updates</li>
            </ul>
            <p className="text-neutral-600 leading-relaxed mb-8">
              We do not sell personal data.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">3. Conversation Data</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              User interactions may be processed and stored by third-party infrastructure and AI service providers in order to deliver the service.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              Users should not submit confidential, regulated, or highly sensitive information.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">4. Data Security</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              We apply reasonable administrative and technical safeguards appropriate to an early-stage system.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              No system can be guaranteed to be completely secure.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">5. Third-Party Services</h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              AIDAMO relies on third-party providers for hosting, authentication, analytics, and AI processing. These providers operate under their own privacy and security policies.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">6. Enterprise & Professional Use</h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              Nothing in this policy is intended to restrict professional, enterprise, pilot, or internal evaluation use, provided such use complies with applicable internal policies and regulations.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">7. Contact</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Privacy inquiries may be directed to:<br />
              <a href="mailto:privacy@aidamo.ai" className="text-neutral-900 hover:underline">privacy@aidamo.ai</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
