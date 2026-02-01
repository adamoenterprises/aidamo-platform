'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface CheckoutButtonProps {
  disabled?: boolean
}

export function CheckoutButton({ disabled }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [email, setEmail] = useState('')
  const [authMessage, setAuthMessage] = useState<string | null>(null)

  const handleClick = async () => {
    if (disabled) return

    const supabase = createClient()
    if (!supabase) {
      return
    }

    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      // User is signed in, redirect to checkout
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const { url, error } = await response.json()

      if (error) {
        alert(error)
        setLoading(false)
        return
      }

      window.location.href = url
    } else {
      // Show auth form
      setShowAuth(true)
      setLoading(false)
    }
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()

    const supabase = createClient()
    if (!supabase) {
      setAuthMessage('Authentication not configured')
      return
    }

    setLoading(true)
    setAuthMessage(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback?checkout=true`,
      },
    })

    if (error) {
      setAuthMessage(error.message)
    } else {
      setAuthMessage('Check your email for the login link. After signing in, you\'ll be taken to checkout.')
    }

    setLoading(false)
  }

  if (showAuth) {
    return (
      <div className="w-full max-w-sm mx-auto">
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-600 mb-2">
              Enter your email to continue
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          {authMessage && (
            <p className="text-sm text-neutral-600">{authMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-3 bg-neutral-900 text-white text-sm font-medium rounded hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Continue'}
          </button>

          <button
            type="button"
            onClick={() => setShowAuth(false)}
            className="w-full text-sm text-neutral-500 hover:text-neutral-700"
          >
            Cancel
          </button>
        </form>
      </div>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || disabled}
      className={`px-8 py-3 text-sm font-medium rounded transition-colors disabled:opacity-50 ${
        disabled
          ? 'bg-neutral-400 text-white cursor-not-allowed'
          : 'bg-neutral-900 text-white hover:bg-neutral-800'
      }`}
    >
      {loading ? 'Loading...' : 'Access for $35/month'}
    </button>
  )
}
