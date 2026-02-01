'use client'

import { useState } from 'react'

export function ManageBillingButton() {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)

    const response = await fetch('/api/stripe/create-portal', {
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
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full px-4 py-2 border border-neutral-200 text-sm font-medium rounded text-neutral-600 hover:bg-neutral-50 transition-colors disabled:opacity-50"
    >
      {loading ? 'Loading...' : 'Manage Billing'}
    </button>
  )
}
