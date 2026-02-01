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
            <p className="text-neutral-600 leading-relaxed mb-6">
              Last updated: January 2025
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">Information We Collect</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              We collect information you provide directly, including your email address
              when you create an account and payment information when you subscribe.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              We use your information to provide and maintain our service, process
              payments, and communicate with you about your account.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">Data Security</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              We implement appropriate security measures to protect your personal
              information. Payment processing is handled by Stripe.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">Third-Party Services</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              We use third-party services including Stripe for payments and Supabase
              for authentication and data storage.
            </p>

            <h2 className="text-lg font-medium mt-8 mb-4">Contact</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              For privacy-related inquiries, please contact us at privacy@aidamo.ai.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
