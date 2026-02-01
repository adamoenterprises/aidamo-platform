import Link from 'next/link'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'
import { AuthModal } from '@/components/auth-modal'
import { CheckoutButton } from '@/components/checkout-button'
import { DevModeBanner } from '@/components/dev-mode-banner'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()
  const user = supabase ? (await supabase.auth.getUser()).data.user : null
  const isPreviewMode = !isSupabaseConfigured()

  return (
    <main className="min-h-screen">
      {/* Dev Mode Banner */}
      {isPreviewMode && <DevModeBanner />}

      {/* Header */}
      <header className={`fixed ${isPreviewMode ? 'top-10' : 'top-0'} left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-100`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-medium tracking-tight">AIDAMO</span>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/access"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Access
                </Link>
                <Link
                  href="/account"
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Account
                </Link>
              </>
            ) : (
              <AuthModal mode="signin" disabled={isPreviewMode} />
            )}
          </div>
        </div>
      </header>

      {/* Message Banner */}
      {params.message && (
        <div className={`fixed ${isPreviewMode ? 'top-26' : 'top-16'} left-0 right-0 z-40 bg-neutral-100 border-b border-neutral-200`}>
          <div className="max-w-5xl mx-auto px-6 py-3">
            <p className="text-sm text-neutral-600">{params.message}</p>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className={`${isPreviewMode ? 'pt-48' : 'pt-40'} pb-20 px-6`}>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            ALEX AIDAMO
          </h1>
          <p className="text-lg text-neutral-600 mb-12">
            Direct access to Alex Adamo&apos;s negotiation methodology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {user ? (
              <Link
                href="/access"
                className="px-8 py-3 bg-neutral-900 text-white text-sm font-medium rounded hover:bg-neutral-800 transition-colors"
              >
                Enter
              </Link>
            ) : (
              <CheckoutButton disabled={isPreviewMode} />
            )}
          </div>
        </div>
      </section>

      {/* What this is */}
      <section className="py-20 px-6 border-t border-neutral-100">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-medium mb-4">What this is</h2>
          <p className="text-neutral-600 leading-relaxed">
            AI-based negotiation support and preparation, built on Alex Adamo&apos;s methodology.
            Use it to prepare for negotiations, stress-test your strategy, role-play difficult
            conversations, or debrief after important meetings.
          </p>
        </div>
      </section>

      {/* What it's not */}
      <section className="py-20 px-6 border-t border-neutral-100">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-medium mb-4">What it&apos;s not</h2>
          <p className="text-neutral-600 leading-relaxed">
            No generic advice. No guesswork. Every response is grounded in your specific
            situation, constraints, and goals.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 border-t border-neutral-100">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-medium mb-4">How it works</h2>
          <p className="text-neutral-600 leading-relaxed">
            It asks questions first, then responds. No assumptions. The conversation begins
            with understanding your context before providing any guidance.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-neutral-100">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-neutral-600 mb-6">$35/month. Cancel anytime.</p>
          {user ? (
            <Link
              href="/access"
              className="inline-block px-8 py-3 bg-neutral-900 text-white text-sm font-medium rounded hover:bg-neutral-800 transition-colors"
            >
              Enter
            </Link>
          ) : (
            <CheckoutButton disabled={isPreviewMode} />
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-neutral-500">© 2025 Aidamo</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
