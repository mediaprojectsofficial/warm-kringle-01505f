import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import Faq, { type FaqItem } from './Faq'
import AdSlot from './AdSlot'
import RelatedCalculators from './RelatedCalculators'
import { getRelatedCalculators, type CalcMeta } from '../../lib/calc-data'

const SITE_URL = 'https://indiancalchub.online'

interface CalcLayoutProps {
  meta: CalcMeta
  children: ReactNode
  howToUse: ReactNode
  formula: ReactNode
  faqs: FaqItem[]
}

export default function CalcLayout({ meta, children, howToUse, formula, faqs }: CalcLayoutProps) {
  const related = getRelatedCalculators(meta.slug)
  const pageUrl = `${SITE_URL}/${meta.slug}`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: meta.shortTitle, item: pageUrl },
    ],
  }

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.shortTitle,
    url: pageUrl,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    description: meta.description,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-500">
        <ol className="flex items-center gap-1">
          <li>
            <Link to="/" className="hover:text-emerald-700">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-slate-700" aria-current="page">
            {meta.shortTitle}
          </li>
        </ol>
      </nav>

      <AdSlot variant="header" className="mb-6" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <main>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {meta.shortTitle}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">{meta.description}</p>

          <div className="mt-6">{children}</div>

          <AdSlot variant="in-content" className="my-8" />

          <section aria-labelledby="how-to-use-heading" className="mt-8">
            <h2 id="how-to-use-heading" className="text-lg font-bold text-slate-900">
              How to Use This Calculator
            </h2>
            <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">{howToUse}</div>
          </section>

          <section aria-labelledby="formula-heading" className="mt-8">
            <h2 id="formula-heading" className="text-lg font-bold text-slate-900">
              Formula &amp; Explanation
            </h2>
            <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">{formula}</div>
          </section>

          <div className="my-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-sm font-semibold text-emerald-800">Compare Loan &amp; Investment Offers</p>
            <p className="mt-1 text-xs text-emerald-700">
              Compare interest rates from leading Indian banks and NBFCs before you decide.
              (Affiliate partner offers coming soon.)
            </p>
          </div>

          <section aria-labelledby="faq-heading" className="mt-8">
            <h2 id="faq-heading" className="text-lg font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-3">
              <Faq items={faqs} />
            </div>
          </section>

          <RelatedCalculators items={related} />
        </main>

        <aside className="space-y-6">
          <AdSlot variant="sidebar" className="lg:sticky lg:top-20" />
        </aside>
      </div>

      <AdSlot variant="footer" className="mt-10" />
    </div>
  )
}
