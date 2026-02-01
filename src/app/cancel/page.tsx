import Link from 'next/link'

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-light tracking-tight mb-4">
          Checkout cancelled
        </h1>
        <p className="text-neutral-600 mb-8">
          No charges were made.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-neutral-900 text-white text-sm font-medium rounded hover:bg-neutral-800 transition-colors"
        >
          Return home
        </Link>
      </div>
    </main>
  )
}
