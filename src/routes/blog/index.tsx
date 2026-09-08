import { createFileRoute, Link } from '@tanstack/react-router'
import { pageHead } from '../../lib/seo'

export const Route = createFileRoute('/blog/')({
  head: () =>
    pageHead({
      title: 'Blog - Financial & Health Guides',
      description: 'Long-form guides on SIP investing, income tax regimes, and personal finance in India.',
      path: '/blog',
    }),
  component: BlogIndex,
})

const posts = [
  {
    slug: 'how-sip-works',
    title: 'How SIP Works: A Complete Guide to Systematic Investment Plans',
    description: 'Understand how monthly SIP investments compound over time and why rupee cost averaging matters.',
  },
  {
    slug: 'new-vs-old-tax-regime',
    title: 'New vs Old Tax Regime: Which Should You Choose in FY 2025-26?',
    description: 'A detailed comparison of the new and old income tax regimes to help you decide which saves you more.',
  },
]

function BlogIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Blog</h1>
      <p className="mt-2 text-sm text-slate-600">In-depth guides on personal finance, tax and investing in India.</p>

      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-emerald-300 hover:shadow-sm"
          >
            <h2 className="text-lg font-bold text-slate-900">{post.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
