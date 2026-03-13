import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '../posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: `${post.title} | AIDAMO Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      url: `https://aidamo.ai/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/logo-dark.png" alt="AIDAMO" className="h-6" width="121" height="24" />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
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

      <article className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <Link href="/blog" className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors">
            ← Back to blog
          </Link>

          <time className="block text-sm text-neutral-400 mt-8">{post.date}</time>
          <h1 className="text-2xl font-medium mt-2 mb-8">{post.title}</h1>

          <div
            className="prose prose-neutral max-w-none prose-headings:font-medium prose-p:text-neutral-600 prose-p:leading-relaxed prose-li:text-neutral-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

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
