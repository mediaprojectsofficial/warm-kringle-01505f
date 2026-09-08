import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat, Select } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { formatINR } from '../lib/format'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('fd-calculator')!

export const Route = createFileRoute('/fd-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/fd-calculator' }),
  component: Page,
})

const freqOptions = [
  { value: '1', label: 'Annually' },
  { value: '4', label: 'Quarterly (most banks)' },
  { value: '12', label: 'Monthly' },
]

function Page() {
  const [principal, setPrincipal] = useState('100000')
  const [rate, setRate] = useState('7')
  const [years, setYears] = useState('5')
  const [freq, setFreq] = useState('4')

  const { maturity, interest } = useMemo(() => {
    const p = parseFloat(principal) || 0
    const r = parseFloat(rate) || 0
    const t = parseFloat(years) || 0
    const n = parseFloat(freq) || 4
    if (p <= 0 || t <= 0) return { maturity: 0, interest: 0 }
    const maturity = p * Math.pow(1 + r / (n * 100), n * t)
    return { maturity, interest: maturity - p }
  }, [principal, rate, years, freq])

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter the deposit amount you plan to invest in the FD.</p>
          <p>2. Enter the annual interest rate offered by your bank.</p>
          <p>3. Select the compounding frequency and tenure to see the maturity value.</p>
        </>
      }
      formula={
        <>
          <p>Fixed deposits use the standard compound interest formula:</p>
          <p className="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">A = P &times; (1 + r/n)^(n&times;t)</p>
          <p>Most Indian banks compound FD interest quarterly. Senior citizens typically get 0.25%-0.50% higher rates.</p>
        </>
      }
      faqs={[
        { question: 'How is FD interest compounded in India?', answer: 'Most Indian banks compound fixed deposit interest quarterly, though some offer monthly or annual compounding options depending on the scheme.' },
        { question: 'Is FD interest taxable?', answer: 'Yes, FD interest is fully taxable as per your income tax slab. Banks deduct TDS if interest income exceeds ₹40,000 (₹50,000 for senior citizens) in a financial year.' },
        { question: 'Can I withdraw an FD before maturity?', answer: 'Yes, premature withdrawal is allowed but usually attracts a penalty of 0.5%-1% reduction in the applicable interest rate.' },
        { question: 'Do senior citizens get higher FD rates?', answer: 'Yes, most banks offer an additional 0.25% to 0.50% interest rate on fixed deposits for senior citizens.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        <Field label="Deposit Amount" suffix="₹" type="number" min={0} value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        <Field label="Annual Interest Rate" suffix="%" type="number" min={0} step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        <Field label="Tenure" suffix="Years" type="number" min={0} value={years} onChange={(e) => setYears(e.target.value)} />
        <Select label="Compounding Frequency" value={freq} onChange={setFreq} options={freqOptions} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResultStat label="Interest Earned" value={formatINR(interest)} />
        <ResultStat label="Maturity Value" value={formatINR(maturity)} highlight />
      </div>
    </CalcLayout>
  )
}
