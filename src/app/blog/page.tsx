import Link from 'next/link'
import { Metadata } from 'next'
import { getAllPosts } from './posts'

export const metadata: Metadata = {
  title: 'Blog | AIDAMO',
  description: 'Insights on negotiation strategy, AI-powered deal preparation, and enterprise negotiation intelligence.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/logo-dark.png" alt="AIDAMO" className="h-6" width="121" height="24" />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-sm text-neutral-900 font-medium">
              Blog
            </Link>
            <a
              href="/access"
              className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Access
            </a>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-medium mb-2">Blog</h1>
          <p className="text-neutral-500 mb-12">
            Negotiation strategy, methodology, and insights.
          </p>

          <div className="space-y-12">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h2 className="text-lg font-medium group-hover:text-neutral-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-neutral-500 mt-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            ))}

            {posts.length === 0 && (
              <p className="text-neutral-400">Coming soon.</p>
            )}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-neutral-500">© 2026 AIDAMO</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
