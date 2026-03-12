'use client'

import Link from 'next/link'
import { useState, FormEvent } from 'react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, honeypot }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong.')
      }

      setStatus('success')
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/logo-dark.png" alt="AIDAMO" className="h-[17px]" />
          </Link>
          <a
            href="/access"
            className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Access
          </a>
        </div>
      </header>

      {/* Content */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-md mx-auto">
          {status === 'success' ? (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center mx-auto mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-light tracking-tight mb-4">Thank you</h1>
              <p className="text-neutral-600 leading-relaxed">
                Thanks for submitting your enquiry, a member of our Enterprise Team will be in touch.
              </p>
              <Link
                href="/"
                className="inline-block mt-8 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                Back to home
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-light tracking-tight mb-2">Contact Sales</h1>
              <p className="text-neutral-500 mb-8">
                Get in touch with our Enterprise Team.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot — hidden from users, catches bots */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute opacity-0 h-0 w-0 pointer-events-none"
                  aria-hidden="true"
                />

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-shadow"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-shadow"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Company Name
                  </label>
                  <input
                    id="company"
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-2.5 rounded border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-shadow"
                    placeholder="Your company"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-600">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full px-8 py-3 bg-neutral-900 text-white text-sm font-medium rounded hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
