import { redirect } from 'next/navigation'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'

export default async function AccessPage() {
  // If Supabase is not configured, redirect (middleware should handle this, but be safe)
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
  if (!adminClient) {
    redirect('/?message=Service not available')
  }

  const { data: profile } = await adminClient
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single()

  if (profile?.subscription_status !== 'active') {
    redirect('/?message=Active subscription required')
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium tracking-tight">
            AIDAMO
          </Link>
          <Link
            href="/account"
            className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Account
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-light tracking-tight mb-8 text-center">
            Alex Aidamo
          </h1>

          {/* Delphi Embed Container */}
          <div className="w-full min-h-[600px] border border-neutral-200 rounded-lg bg-neutral-50">
            {/*
              ============================================
              PASTE DELPHI EMBED CODE HERE
              ============================================

              Replace this placeholder with your Delphi embed code.
              The embed should fill this container.

              Example:
              <iframe
                src="https://www.delphi.ai/embed/your-clone-id"
                width="100%"
                height="600"
                frameBorder="0"
              />
              ============================================
            */}
            <div id="delphi-embed" className="w-full h-full min-h-[600px] flex items-center justify-center">
              <p className="text-neutral-400 text-sm">Delphi embed will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
