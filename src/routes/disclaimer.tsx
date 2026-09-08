import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'

export const Route = createFileRoute('/disclaimer')({
  head: () =>
    pageHead({
      title: 'Disclaimer',
      description: 'Disclaimer for Indian Calculator Hub - calculators are for estimation purposes only and do not constitute financial, tax or medical advice.',
      path: '/disclaimer',
    }),
  component: DisclaimerPage,
})

function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Disclaimer</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600">
        <p>
          The calculators, tools and content provided on Indian Calculator Hub are for general
          informational and educational purposes only. They are designed to give quick,
          approximate estimates using standard, publicly available formulas (RBI EMI formulas,
          Income Tax Department slab rates, WHO health formulas, etc.).
        </p>
        <p>
          <strong>Not Financial, Tax, Legal or Medical Advice.</strong> Nothing on this site
          constitutes financial, investment, tax, legal or medical advice. Calculations shown
          (including EMI, SIP, income tax, HRA, BMI, calorie needs and others) are estimates
          based on the inputs you provide and standard assumptions, and may differ from actual
          figures determined by your bank, employer, the Income Tax Department, or a qualified
          professional.
        </p>
        <p>
          <strong>No Guarantee of Accuracy.</strong> While we strive to keep formulas and tax
          slabs up to date (currently reflecting FY 2025-26 rules where applicable), interest
          rates, tax laws and health guidelines change periodically. We do not guarantee that
          the information is complete, accurate, or current at all times.
        </p>
        <p>
          <strong>Consult a Professional.</strong> Before making any financial, investment, tax
          or health decision, please consult a certified financial advisor, chartered
          accountant, or medical professional as appropriate.
        </p>
        <p>
          <strong>No Liability.</strong> Indian Calculator Hub and its owners shall not be held
          liable for any loss or damage arising from reliance on information or calculations
          provided on this site.
        </p>
        <p>
          By using this website, you acknowledge and accept this disclaimer in full.
        </p>
      </div>
    </div>
  )
}
