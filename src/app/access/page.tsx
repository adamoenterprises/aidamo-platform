'use client'

import { useEffect } from 'react'

export default function AccessPage() {
  useEffect(() => {
    // Configure Delphi
    ;(window as any).delphi = {
      ...(window as any).delphi,
      page: {
        config: 'b2562f71-9f94-4057-8e8f-c16f4b28e8cc',
        container: {
          width: '100%',
          height: '800px',
        },
      },
    }

    // Load the Delphi loader script
    const existing = document.getElementById('delphi-page-bootstrap')
    if (!existing) {
      const script = document.createElement('script')
      script.id = 'delphi-page-bootstrap'
      script.src = 'https://embed.delphi.ai/loader.js'
      script.async = true

      const configScript = document.getElementById('delphi-page-script')
      if (configScript?.parentNode) {
        configScript.parentNode.insertBefore(script, configScript.nextSibling)
      } else {
        document.body.appendChild(script)
      }
    }

    // Keep screen awake during voice calls
    let wakeLock: any = null
    async function requestWakeLock() {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await (navigator as any).wakeLock.request('screen')
        }
      } catch (e) {
        // Wake lock request failed
      }
    }
    requestWakeLock()

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestWakeLock()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (wakeLock) wakeLock.release()
      const bootstrap = document.getElementById('delphi-page-bootstrap')
      if (bootstrap) bootstrap.remove()
    }
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/">
            <img src="/logo-dark.png" alt="AIDAMO" className="h-6" width="121" height="24" />
          </a>
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div id="delphi-container" className="w-full min-h-[800px]" />
        </div>
      </div>

      {/* Delphi config script — the loader looks for this by ID */}
      <script
        id="delphi-page-script"
        dangerouslySetInnerHTML={{ __html: '' }}
      />
    </main>
  )
}
