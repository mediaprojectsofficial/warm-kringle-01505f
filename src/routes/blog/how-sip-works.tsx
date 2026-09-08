import { createFileRoute, Link } from '@tanstack/react-router'
import { pageHead } from '../../lib/seo'

export const Route = createFileRoute('/blog/how-sip-works')({
  head: () =>
    pageHead({
      title: 'How SIP Works: A Complete Guide to Systematic Investment Plans',
      description: 'Understand how monthly SIP investments compound over time, rupee cost averaging, and how to estimate your returns.',
      path: '/blog/how-sip-works',
    }),
  component: Post,
})

function Post() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs font-semibold uppercase text-emerald-700">Investing</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">
        How SIP Works: A Complete Guide to Systematic Investment Plans
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600">
        <p>
          A Systematic Investment Plan (SIP) lets you invest a fixed amount into a mutual fund
          scheme at regular intervals - usually monthly - instead of investing a large lumpsum
          at once. It has become one of the most popular ways for Indians to build long-term
          wealth through equity and debt mutual funds.
        </p>
        <h2 className="text-lg font-semibold text-slate-900">How Compounding Works in a SIP</h2>
        <p>
          Each installment you invest starts earning returns from the day it is invested. Over
          time, the returns themselves start generating further returns - this is the power of
          compounding. The longer your investment horizon, the larger the share of your final
          corpus that comes from compounding rather than your own contributions.
        </p>
        <h2 className="text-lg font-semibold text-slate-900">Rupee Cost Averaging</h2>
        <p>
          Since a SIP invests a fixed amount every month regardless of the market price (NAV),
          you automatically buy more units when the market is down and fewer units when the
          market is up. This averages out your purchase cost over time and removes the pressure
          of trying to "time the market."
        </p>
        <h2 className="text-lg font-semibold text-slate-900">Estimating Your SIP Returns</h2>
        <p>
          You can estimate the future value of your SIP using our{' '}
          <Link to="/sip-calculator" className="text-emerald-700 underline">SIP Calculator</Link>
          . Simply enter your monthly investment amount, expected annual return and investment
          duration to see a year-by-year growth projection.
        </p>
        <h2 className="text-lg font-semibold text-slate-900">Key Takeaways</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>SIPs make investing a disciplined, automated habit.</li>
          <li>Returns are market-linked and not guaranteed - equity SIPs can be volatile in the short term.</li>
          <li>Staying invested for the long term (7-10+ years) typically smooths out volatility.</li>
          <li>Step-up SIPs let you increase your investment amount as your income grows.</li>
        </ul>
      </div>
    </article>
  )
}
