'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    if (supabase) {
      await supabase.auth.signOut()
    }
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      className="w-full px-4 py-2 border border-neutral-200 text-sm font-medium rounded text-neutral-600 hover:bg-neutral-50 transition-colors"
    >
      Sign out
    </button>
  )
}
