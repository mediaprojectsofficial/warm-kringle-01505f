import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { formatINR } from '../lib/format'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('simple-interest-calculator')!

export const Route = createFileRoute('/simple-interest-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/simple-interest-calculator' }),
  component: Page,
})

function Page() {
  const [principal, setPrincipal] = useState('100000')
  const [rate, setRate] = useState('8')
  const [years, setYears] = useState('5')

  const { interest, total } = useMemo(() => {
    const p = parseFloat(principal) || 0
    const r = parseFloat(rate) || 0
    const t = parseFloat(years) || 0
    const interest = (p * r * t) / 100
    return { interest, total: p + interest }
  }, [principal, rate, years])

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter the principal amount.</p>
          <p>2. Enter the annual interest rate.</p>
          <p>3. Enter the time period in years to get total interest and repayment amount.</p>
        </>
      }
      formula={
        <>
          <p>Simple interest is calculated only on the original principal for the entire duration:</p>
          <p className="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">SI = (P &times; R &times; T) / 100</p>
          <p>Where P is principal, R is the annual rate of interest, and T is the time in years.</p>
        </>
      }
      faqs={[
        { question: 'What is simple interest?', answer: 'Simple interest is interest calculated only on the original principal amount, not on any interest accumulated over time.' },
        { question: 'Where is simple interest used?', answer: 'It is commonly used for short-term loans, certain personal loans, and some fixed-term deposit schemes offered by NBFCs.' },
        { question: 'How is simple interest different from compound interest?', answer: 'Simple interest grows linearly since it ignores previously earned interest, while compound interest grows exponentially by reinvesting interest each period.' },
        { question: 'Is the formula the same for all loan types?', answer: 'Yes, the simple interest formula SI = (P × R × T) / 100 applies universally whenever interest is not compounded.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-3">
        <Field label="Principal Amount" suffix="₹" type="number" min={0} value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        <Field label="Annual Interest Rate" suffix="%" type="number" min={0} step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        <Field label="Time Period" suffix="Years" type="number" min={0} value={years} onChange={(e) => setYears(e.target.value)} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResultStat label="Simple Interest" value={formatINR(interest)} />
        <ResultStat label="Total Repayment Amount" value={formatINR(total)} highlight />
      </div>
    </CalcLayout>
  )
}
