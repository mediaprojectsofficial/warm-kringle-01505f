import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'

export const Route = createFileRoute('/about')({
  head: () =>
    pageHead({
      title: 'About Us',
      description: 'Learn about Indian Calculator Hub, our mission to make financial and health planning simple for every Indian.',
      path: '/about',
    }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">About Indian Calculator Hub</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600">
        <p>
          Indian Calculator Hub was built with a simple goal: make everyday financial, tax,
          health and utility calculations fast, accurate and free for every Indian. Whether
          you're planning a home loan EMI, comparing SIP returns, filing your income tax, or
          simply checking your BMI, our 20 calculators are designed to give you clear answers
          in seconds.
        </p>
        <p>
          We built each calculator using the standard formulas followed by RBI-regulated banks,
          the Income Tax Department and recognized health authorities, so you can trust the
          numbers you see. Every calculator also includes a plain-language explanation of the
          underlying formula and how to use it, because we believe financial literacy should be
          accessible to everyone.
        </p>
        <p>
          Indian Calculator Hub does not collect personal financial data - all calculations run
          directly in your browser and nothing you enter is stored on our servers. We are
          independent and not affiliated with any bank, mutual fund or government body; all
          results are estimates for informational purposes only.
        </p>
        <p>
          Have feedback or a calculator you'd like us to add? Reach out via our{' '}
          <a href="/contact" className="text-emerald-700 underline">
            Contact page
          </a>
          .
        </p>
      </div>
    </div>
  )
}
