import { redirect } from 'next/navigation'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import Script from 'next/script'

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
      <div className="pt-20 pb-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Delphi Embed Container */}
          <div id="delphi-container" className="w-full min-h-[800px]" />
        </div>
      </div>

      {/* Delphi Scripts */}
      <Script id="delphi-page-script" strategy="afterInteractive">
        {`
          window.delphi = {...(window.delphi ?? {}) };
          window.delphi.page = {
            config: "b2562f71-9f94-4057-8e8f-c16f4b28e8cc",
            overrides: {
              landingPage: "OVERVIEW",
            },
            container: {
              width: "100%",
              height: "800px",
            },
          };
        `}
      </Script>
      <Script
        id="delphi-page-bootstrap"
        src="https://embed.delphi.ai/loader.js"
        strategy="afterInteractive"
      />
    </main>
  )
}
