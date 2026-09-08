import { Link } from '@tanstack/react-router'
import type { CalcMeta } from '../../lib/calc-data'

export default function RelatedCalculators({ items }: { items: CalcMeta[] }) {
  if (items.length === 0) return null
  return (
    <section aria-labelledby="related-heading" className="mt-10">
      <h2 id="related-heading" className="text-lg font-bold text-slate-900">
        Related Calculators
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((c) => (
          <Link
            key={c.slug}
            to={`/${c.slug}`}
            className="rounded-lg border border-slate-200 bg-white p-4 transition hover:border-emerald-300 hover:shadow-sm"
          >
            <p className="text-sm font-semibold text-slate-800">{c.shortTitle}</p>
            <p className="mt-1 text-xs text-slate-500">{c.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
