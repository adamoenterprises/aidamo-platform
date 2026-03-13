'use client'

import { useState } from 'react'

export default function AccessPage() {
  const [loaded, setLoaded] = useState(false)

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/">
            <img src="/logo-dark.png" alt="AIDAMO" className="h-6" width="121" height="24" />
          </a>
        </div>
      </header>

      <div className="flex-1 relative bg-white">
        {/* Loading state shown until iframe is ready */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="animate-pulse text-neutral-400 text-sm">Loading...</div>
          </div>
        )}

        <iframe
          src="https://delphi.ai/embeddable/config/b2562f71-9f94-4057-8e8f-c16f4b28e8cc"
          allow="camera *; microphone *"
          onLoad={() => setLoaded(true)}
          style={{
            border: 'none',
            width: '100%',
            height: 'calc(100vh - 57px)',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      </div>
    </main>
  )
}
