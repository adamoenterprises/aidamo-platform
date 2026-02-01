'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface AuthModalProps {
  mode: 'signin' | 'signup'
  disabled?: boolean
}

export function AuthModal({ mode, disabled }: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const supabase = createClient()
    if (!supabase) {
      setMessage('Authentication not configured')
      return
    }

    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Check your email for the login link.')
    }

    setLoading(false)
  }

  const handleClick = () => {
    if (disabled) return
    setIsOpen(true)
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`text-sm transition-colors ${
          disabled
            ? 'text-neutral-400 cursor-not-allowed'
            : 'text-neutral-600 hover:text-neutral-900'
        }`}
      >
        {mode === 'signin' ? 'Sign in' : 'Sign up'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-white rounded-lg p-8 w-full max-w-sm mx-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl font-medium mb-6">Sign in</h2>

            <form onSubmit={handleSubmit}>
              <label className="block text-sm text-neutral-600 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                placeholder="you@example.com"
              />

              {message && (
                <p className="mt-4 text-sm text-neutral-600">{message}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send magic link'}
              </button>
            </form>

            <p className="mt-6 text-xs text-neutral-500 text-center">
              We&apos;ll send you a magic link to sign in.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
