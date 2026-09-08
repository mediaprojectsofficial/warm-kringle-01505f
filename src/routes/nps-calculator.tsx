import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { formatINR } from '../lib/format'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('nps-calculator')!

export const Route = createFileRoute('/nps-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/nps-calculator' }),
  component: Page,
})

function Page() {
  const [age, setAge] = useState('30')
  const [monthly, setMonthly] = useState('5000')
  const [rate, setRate] = useState('10')
  const [annuityPct, setAnnuityPct] = useState('40')
  const [annuityRate, setAnnuityRate] = useState('6')

  const { corpus, invested, lumpsum, annuityCorpus, monthlyPension } = useMemo(() => {
    const currentAge = parseFloat(age) || 0
    const p = parseFloat(monthly) || 0
    const r = parseFloat(rate) || 0
    const months = Math.max((60 - currentAge) * 12, 0)
    const i = r / 12 / 100
    let corpus = 0
    for (let m = 1; m <= months; m++) {
      corpus = (corpus + p) * (1 + i)
    }
    const invested = p * months
    const aPct = parseFloat(annuityPct) || 0
    const annuityCorpus = corpus * (aPct / 100)
    const lumpsum = corpus - annuityCorpus
    const aRate = parseFloat(annuityRate) || 0
    const monthlyPension = (annuityCorpus * (aRate / 100)) / 12
    return { corpus, invested, lumpsum, annuityCorpus, monthlyPension }
  }, [age, monthly, rate, annuityPct, annuityRate])

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter your current age and monthly NPS contribution.</p>
          <p>2. Enter the expected annual return until retirement at age 60.</p>
          <p>3. Enter what percentage of the corpus you'll use to buy an annuity, and the expected annuity rate.</p>
          <p>4. View your total retirement corpus, lump sum withdrawal and estimated monthly pension.</p>
        </>
      }
      formula={
        <>
          <p>The NPS corpus grows using monthly compounding on contributions until retirement age 60:</p>
          <p className="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">Corpus = &Sigma; contributions compounded monthly at expected rate</p>
          <p>
            At retirement, by regulation at least 40% of the corpus must be used to purchase an
            annuity, which pays a monthly pension. The remaining amount can be withdrawn as a
            lump sum (tax-free up to 60% of the corpus).
          </p>
        </>
      }
      faqs={[
        { question: 'What is the minimum annuity purchase requirement in NPS?', answer: 'As per PFRDA rules, at least 40% of the accumulated NPS corpus must be used to purchase an annuity at retirement, which provides a regular monthly pension.' },
        { question: 'Is the NPS maturity amount taxable?', answer: 'Up to 60% of the corpus can be withdrawn tax-free as a lump sum. The annuity purchase amount is not taxed at withdrawal, but the monthly pension received is taxable as income.' },
        { question: 'What returns can I expect from NPS equity funds?', answer: 'NPS equity (Scheme E) has historically delivered 10-12% annually over the long term, though returns are market-linked and not guaranteed.' },
        { question: 'Can I change my NPS contribution amount?', answer: 'Yes, NPS allows flexible contributions above the minimum required amount, and you can change the amount or fund allocation periodically.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        <Field label="Current Age" suffix="Years" type="number" min={18} max={59} value={age} onChange={(e) => setAge(e.target.value)} />
        <Field label="Monthly Contribution" suffix="₹" type="number" min={0} value={monthly} onChange={(e) => setMonthly(e.target.value)} />
        <Field label="Expected Return (p.a.)" suffix="%" type="number" min={0} step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        <Field label="Annuity Purchase" suffix="%" type="number" min={40} max={100} value={annuityPct} onChange={(e) => setAnnuityPct(e.target.value)} hint="Minimum 40% as per PFRDA rules" />
        <Field label="Expected Annuity Rate" suffix="%" type="number" min={0} step="0.1" value={annuityRate} onChange={(e) => setAnnuityRate(e.target.value)} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ResultStat label="Total Investment" value={formatINR(invested)} />
        <ResultStat label="Retirement Corpus" value={formatINR(corpus)} highlight />
        <ResultStat label="Lump Sum Withdrawal" value={formatINR(lumpsum)} />
        <ResultStat label="Estimated Monthly Pension" value={formatINR(monthlyPension)} />
      </div>
      <p className="mt-3 text-xs text-slate-500">Annuity corpus used to purchase pension plan: {formatINR(annuityCorpus)}</p>
    </CalcLayout>
  )
}
