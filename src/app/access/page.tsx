'use client'

import { useEffect, useRef } from 'react'

export default function AccessPage() {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null)

  useEffect(() => {
    // Keep screen awake during voice calls
    async function requestWakeLock() {
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request('screen')
        }
      } catch {
        // Wake lock request failed (e.g. low battery)
      }
    }

    requestWakeLock()

    // Re-acquire wake lock when page becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestWakeLock()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Configure Delphi
    ;(window as any).delphi = { ...(window as any).delphi }
    ;(window as any).delphi.page = {
      config: 'b2562f71-9f94-4057-8e8f-c16f4b28e8cc',
      container: {
        width: '100%',
        height: '800px',
      },
    }

    // Load the Delphi loader script
    const existing = document.getElementById('delphi-page-bootstrap')
    if (!existing) {
      const script = document.createElement('script')
      script.id = 'delphi-page-bootstrap'
      script.src = 'https://embed.delphi.ai/loader.js'
      script.async = true
      document.body.appendChild(script)
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      wakeLockRef.current?.release()
      const bootstrap = document.getElementById('delphi-page-bootstrap')
      if (bootstrap) bootstrap.remove()
    }
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/">
            <img src="/logo-dark.png" alt="AIDAMO" className="h-6" width="121" height="24" />
          </a>
        </div>
      </header>

      {/* Content */}
      <div className="pt-20 pb-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Delphi Embed Container */}
          <div id="delphi-container" className="w-full min-h-[800px]" />
        </div>
      </div>

      {/* Delphi config script — must be a real <script> tag so the loader can find it via getElementById */}
      <script
        id="delphi-page-script"
        dangerouslySetInnerHTML={{ __html: '' }}
      />
    </main>
  )
}
