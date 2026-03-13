export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  keywords: string[]
}

// Add new posts here — newest first
const posts: BlogPost[] = [
  // Example structure — ready for content:
  // {
  //   slug: 'how-to-prepare-for-a-high-stakes-negotiation',
  //   title: 'How to Prepare for a High-Stakes Negotiation',
  //   date: '2026-03-15',
  //   excerpt: 'Most negotiators walk in underprepared. Here is a framework for enterprise deal preparation.',
  //   content: `Your markdown content here...`,
  //   keywords: ['negotiation preparation', 'enterprise negotiation', 'deal strategy'],
  // },
]

export function getAllPosts(): BlogPost[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}
