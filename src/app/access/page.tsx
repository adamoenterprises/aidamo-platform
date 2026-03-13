'use client'

import { useEffect } from 'react'

export default function AccessPage() {
  useEffect(() => {
    // Configure Delphi
    ;(window as any).delphi = {
      ...(window as any).delphi,
      page: {
        config: 'b2562f71-9f94-4057-8e8f-c16f4b28e8cc',
        overrides: {
          landingPage: 'OVERVIEW',
        },
        container: {
          width: '100%',
          height: 'calc(100vh - 57px)',
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
      document.body.appendChild(script)
    }

    return () => {
      const bootstrap = document.getElementById('delphi-page-bootstrap')
      if (bootstrap) bootstrap.remove()
    }
  }, [])

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/">
            <img src="/logo-dark.png" alt="AIDAMO" className="h-6" width="121" height="24" />
          </a>
        </div>
      </header>

      <div className="flex-1" style={{ height: 'calc(100vh - 57px)' }}>
        <div id="delphi-page-script" style={{ width: '100%', height: '100%' }} />
      </div>
    </main>
  )
}
