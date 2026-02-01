import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium tracking-tight">
            Aidamo
          </Link>
          <a
            href="/access"
            className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Access
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            Aidamo
          </h1>
          <p className="text-lg text-neutral-600 mb-12">
            Access Alex Adamo&apos;s Negotiation Intelligence
          </p>
          <a
            href="/access"
            className="inline-block px-8 py-3 bg-neutral-900 text-white text-sm font-medium rounded hover:bg-neutral-800 transition-colors"
          >
            Try Now for Free
          </a>
        </div>
      </section>

      {/* What this is */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-medium mb-4">What this is</h2>
          <p className="text-neutral-600 leading-relaxed">
            AI-based negotiation support and preparation, built on Alex Adamo&apos;s methodology.
            Use it to prepare for negotiations, stress-test your strategy, role-play difficult
            conversations, or debrief after important meetings.
          </p>
        </div>
      </section>

      {/* What it's not */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-medium mb-4">What it&apos;s not</h2>
          <p className="text-neutral-600 leading-relaxed">
            No generic advice. No guesswork. Every response is grounded in your specific
            situation, constraints, and goals.
          </p>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-medium mb-4">Use cases</h2>
          <p className="text-neutral-600 leading-relaxed">
            You can use Aidamo to role-play important meetings, prepare negotiations,
            debrief difficult conversations, and regain clarity under pressure. It will
            not offer solutions without context and will challenge incomplete thinking,
            because its guidance is only as good as the information you provide.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-medium mb-4">How it works</h2>
          <p className="text-neutral-600 leading-relaxed">
            It asks questions first, then responds. No assumptions. The conversation begins
            with understanding your context before providing any guidance.
          </p>
        </div>
      </section>

      {/* Who is Alex Adamo */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-medium mb-4">Who is Alex Adamo</h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            Alex Adamo is the Chief Negotiator at The Commercialiser®, a C-Level negotiation advisory
            firm managing a $6.5 billion deal portfolio. A trained behavioural anthropologist,
            his science-driven methodology draws from neuroscience, game theory, and behavioural
            economics to help CEOs and their teams maximise high-stakes deals.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            Aidamo encodes this methodology into an AI system that thinks the way Alex does:
            asking the right questions, identifying leverage points, and stress-testing
            strategies before you walk into the room.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <a
            href="/access"
            className="inline-block px-8 py-3 bg-neutral-900 text-white text-sm font-medium rounded hover:bg-neutral-800 transition-colors"
          >
            Try Now for Free
          </a>
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
