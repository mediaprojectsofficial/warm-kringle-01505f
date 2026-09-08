import { createFileRoute, Link } from '@tanstack/react-router'
import { pageHead } from '../../lib/seo'

export const Route = createFileRoute('/blog/new-vs-old-tax-regime')({
  head: () =>
    pageHead({
      title: 'New vs Old Tax Regime: Which Should You Choose in FY 2025-26?',
      description: 'A detailed comparison of the new and old income tax regimes in India to help you decide which one saves you more tax.',
      path: '/blog/new-vs-old-tax-regime',
    }),
  component: Post,
})

function Post() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs font-semibold uppercase text-emerald-700">Tax Planning</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">
        New vs Old Tax Regime: Which Should You Choose in FY 2025-26?
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600">
        <p>
          Since the Union Budget 2023, India has had two parallel income tax regimes for
          individuals: the new regime (now the default) with lower slab rates but almost no
          exemptions, and the old regime with higher rates but many deductions such as 80C,
          80D and HRA.
        </p>
        <h2 className="text-lg font-semibold text-slate-900">New Regime Slabs (FY 2025-26)</h2>
        <p>
          Under the new regime, income up to ₹4,00,000 is tax-free, followed by 5% up to ₹8L,
          10% up to ₹12L, 15% up to ₹16L, 20% up to ₹20L, 25% up to ₹24L, and 30% beyond that.
          A standard deduction of ₹75,000 applies, and a full tax rebate makes tax liability
          zero for taxable income up to ₹12,00,000.
        </p>
        <h2 className="text-lg font-semibold text-slate-900">Old Regime Slabs</h2>
        <p>
          The old regime taxes income up to ₹2,50,000 at nil, 5% up to ₹5L, 20% up to ₹10L, and
          30% beyond that, with a ₹50,000 standard deduction. It allows deductions such as
          Section 80C (up to ₹1.5L for PPF, ELSS, etc.), 80D (health insurance), and HRA
          exemption for salaried employees who pay rent.
        </p>
        <h2 className="text-lg font-semibold text-slate-900">Which One Should You Pick?</h2>
        <p>
          If you claim large deductions (home loan interest, 80C investments, HRA), the old
          regime may still work out cheaper. If you have few deductions, the new regime's lower
          rates usually win. The only way to know for sure is to compute both for your exact
          numbers.
        </p>
        <p>
          Use our{' '}
          <Link to="/income-tax-calculator" className="text-emerald-700 underline">
            Income Tax Calculator
          </Link>{' '}
          to compare your tax liability side-by-side under both regimes in seconds.
        </p>
      </div>
    </article>
  )
}
