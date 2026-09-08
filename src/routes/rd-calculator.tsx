import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { formatINR } from '../lib/format'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('rd-calculator')!

export const Route = createFileRoute('/rd-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/rd-calculator' }),
  component: Page,
})

function Page() {
  const [monthly, setMonthly] = useState('5000')
  const [rate, setRate] = useState('6.5')
  const [months, setMonths] = useState('24')

  const { invested, maturity, interest } = useMemo(() => {
    const p = parseFloat(monthly) || 0
    const r = parseFloat(rate) || 0
    const n = parseFloat(months) || 0
    if (p <= 0 || n <= 0) return { invested: 0, maturity: 0, interest: 0 }
    const quarterlyRate = r / 400
    let maturity = 0
    for (let m = 1; m <= n; m++) {
      const quartersRemaining = (n - m + 1) / 3
      maturity += p * Math.pow(1 + quarterlyRate, quartersRemaining)
    }
    const invested = p * n
    return { invested, maturity, interest: maturity - invested }
  }, [monthly, rate, months])

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter the monthly deposit amount for your recurring deposit.</p>
          <p>2. Enter the annual interest rate offered by your bank.</p>
          <p>3. Enter the tenure in months to see the maturity value.</p>
        </>
      }
      formula={
        <>
          <p>Each monthly installment earns quarterly-compounded interest for the remaining tenure:</p>
          <p className="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">
            M = P &times; (1 + r/400)^(q) summed over each installment
          </p>
          <p>Where P is the monthly deposit, r is the annual interest rate and q is the number of quarters remaining until maturity for that installment - matching the RD interest convention used by Indian banks.</p>
        </>
      }
      faqs={[
        { question: 'How is RD interest calculated in India?', answer: 'Each monthly deposit is treated as a separate deposit and earns quarterly-compounded interest for the number of quarters remaining until the RD matures.' },
        { question: 'Is RD interest taxable?', answer: 'Yes, recurring deposit interest is taxable as per your income tax slab, and TDS applies if interest exceeds ₹40,000 (₹50,000 for senior citizens) in a year.' },
        { question: 'Can I miss an RD installment?', answer: 'Missing an installment usually attracts a small penalty per missed month, as specified by your bank, and may affect the final maturity amount.' },
        { question: 'What is the minimum RD tenure in India?', answer: 'Most Indian banks offer RD tenures ranging from 6 months to 10 years, with 6 months being the common minimum.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-3">
        <Field label="Monthly Deposit" suffix="₹" type="number" min={0} value={monthly} onChange={(e) => setMonthly(e.target.value)} />
        <Field label="Annual Interest Rate" suffix="%" type="number" min={0} step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        <Field label="Tenure" suffix="Months" type="number" min={0} value={months} onChange={(e) => setMonths(e.target.value)} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ResultStat label="Total Deposited" value={formatINR(invested)} />
        <ResultStat label="Interest Earned" value={formatINR(interest)} />
        <ResultStat label="Maturity Value" value={formatINR(maturity)} highlight />
      </div>
    </CalcLayout>
  )
}
