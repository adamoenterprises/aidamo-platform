import Link from 'next/link'

export default function App() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium tracking-tight">
            AIDAMO
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-light tracking-tight mb-4">App</h1>
          <p className="text-neutral-600 leading-relaxed mb-12">
            Access AIDAMO instantly from your home screen, just like a native app.
          </p>

          <div className="space-y-8">
            {/* iPhone */}
            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
              <h2 className="font-medium mb-4">iPhone / iPad</h2>
              <ol className="text-neutral-600 space-y-3">
                <li className="flex gap-3">
                  <span className="font-medium text-neutral-900">1.</span>
                  <span>Open <strong>aidamo.ai</strong> in Safari</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-neutral-900">2.</span>
                  <span>Tap the <strong>Share</strong> button (square with arrow)</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-neutral-900">3.</span>
                  <span>Scroll down and tap <strong>Add to Home Screen</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-neutral-900">4.</span>
                  <span>Tap <strong>Add</strong> in the top right</span>
                </li>
              </ol>
            </div>

            {/* Android */}
            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
              <h2 className="font-medium mb-4">Android</h2>
              <ol className="text-neutral-600 space-y-3">
                <li className="flex gap-3">
                  <span className="font-medium text-neutral-900">1.</span>
                  <span>Open <strong>aidamo.ai</strong> in Chrome</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-neutral-900">2.</span>
                  <span>Tap the <strong>menu</strong> (three dots)</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-neutral-900">3.</span>
                  <span>Tap <strong>Add to Home screen</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="font-medium text-neutral-900">4.</span>
                  <span>Tap <strong>Add</strong> to confirm</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-neutral-500">© 2026 Aidamo</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Terms
            </Link>
            <Link href="/install" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              App
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
