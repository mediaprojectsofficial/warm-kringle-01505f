import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { calculators, categoryLabels, type CalcCategory } from '../lib/calc-data'
import AdSlot from '../components/site/AdSlot'
import { pageHead } from '../lib/seo'

type Search = { category?: CalcCategory; q?: string }

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): Search => ({
    category: search.category as CalcCategory | undefined,
    q: search.q as string | undefined,
  }),
  head: () =>
    pageHead({
      title: 'Indian Calculator Hub - Free Financial, Health & Everyday Calculators',
      description:
        '20 free, fast and accurate calculators for Indian users - EMI, SIP, Income Tax, GST, BMI, Age and more. No signup required.',
      path: '/',
    }),
  component: Home,
})

const categories = Object.keys(categoryLabels) as CalcCategory[]

function Home() {
  const { category, q } = Route.useSearch()
  const navigate = Route.useNavigate()
  const [query, setQuery] = useState(q ?? '')

  const filtered = useMemo(() => {
    return calculators.filter((c) => {
      const matchesCategory = !category || c.category === category
      const matchesQuery =
        !query ||
        c.shortTitle.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Indian Calculator Hub',
    url: 'https://indiancalchub.online',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://indiancalchub.online/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />

      <section className="border-b border-slate-200 bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            20 Free Calculators, Built for India
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
            EMI, SIP, Income Tax, GST, BMI and more &mdash; fast, accurate and mobile-friendly
            calculators with Indian Rupee (₹) formatting and FY 2026-27 tax rules.
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            <label htmlFor="calc-search" className="sr-only">
              Search calculators
            </label>
            <input
              id="calc-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                navigate({ search: (prev) => ({ ...prev, q: e.target.value || undefined }) })
              }}
              placeholder="Search calculators e.g. EMI, BMI, GST..."
              className="w-full rounded-full border border-slate-300 px-5 py-3 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => navigate({ search: (prev) => ({ ...prev, category: undefined }) })}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                !category ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => navigate({ search: (prev) => ({ ...prev, category: cat }) })}
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                  category === cat ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <AdSlot variant="header" className="mb-8" />

        <h2 className="sr-only">All Calculators</h2>
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-slate-500">
            No calculators match your search. Try a different keyword.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((c) => (
              <Link
                key={c.slug}
                to={`/${c.slug}`}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
              >
                <span className="inline-block w-fit rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                  {categoryLabels[c.category]}
                </span>
                <p className="mt-3 text-base font-bold text-slate-900 group-hover:text-emerald-700">
                  {c.shortTitle}
                </p>
                <p className="mt-1 flex-1 text-sm text-slate-500">{c.description}</p>
                <span className="mt-4 text-sm font-semibold text-emerald-700">Calculate &rarr;</span>
              </Link>
            ))}
          </div>
        )}

        <AdSlot variant="footer" className="mt-10" />
      </div>
    </div>
  )
}
