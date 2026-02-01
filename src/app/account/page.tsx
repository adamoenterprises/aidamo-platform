import { redirect } from 'next/navigation'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import { SignOutButton } from '@/components/sign-out-button'
import { ManageBillingButton } from '@/components/manage-billing-button'

export default async function AccountPage() {
  // If Supabase is not configured, redirect
  if (!isSupabaseConfigured()) {
    redirect('/?message=Supabase not configured')
  }

  const supabase = await createClient()
  if (!supabase) {
    redirect('/?message=Authentication not available')
  }

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/?message=Please sign in to continue')
  }

  const adminClient = createAdminClient()
  let profile = null

  if (adminClient) {
    const { data } = await adminClient
      .from('profiles')
      .select('subscription_status, stripe_customer_id')
      .eq('id', user.id)
      .single()
    profile = data
  }

  const isActive = profile?.subscription_status === 'active'

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium tracking-tight">
            AIDAMO
          </Link>
          <div className="flex items-center gap-4">
            {isActive && (
              <Link
                href="/access"
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Access
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="pt-32 pb-12 px-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-light tracking-tight mb-8">Account</h1>

          <div className="space-y-6">
            {/* Email */}
            <div>
              <p className="text-sm text-neutral-500 mb-1">Email</p>
              <p className="text-sm">{user.email}</p>
            </div>

            {/* Subscription Status */}
            <div>
              <p className="text-sm text-neutral-500 mb-1">Subscription</p>
              <p className="text-sm">
                {isActive ? (
                  <span className="text-green-700">Active</span>
                ) : (
                  <span className="text-neutral-500">Inactive</span>
                )}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-6 space-y-3">
              {profile?.stripe_customer_id && (
                <ManageBillingButton />
              )}

              {!isActive && (
                <Link
                  href="/"
                  className="block w-full px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded text-center hover:bg-neutral-800 transition-colors"
                >
                  Subscribe
                </Link>
              )}

              <SignOutButton />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
