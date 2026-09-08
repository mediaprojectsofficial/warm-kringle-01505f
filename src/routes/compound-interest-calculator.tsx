import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat, Select } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { formatINR } from '../lib/format'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('compound-interest-calculator')!

export const Route = createFileRoute('/compound-interest-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/compound-interest-calculator' }),
  component: Page,
})

const freqOptions = [
  { value: '1', label: 'Annually' },
  { value: '2', label: 'Half-Yearly' },
  { value: '4', label: 'Quarterly' },
  { value: '12', label: 'Monthly' },
]

function Page() {
  const [principal, setPrincipal] = useState('100000')
  const [rate, setRate] = useState('8')
  const [years, setYears] = useState('5')
  const [freq, setFreq] = useState('1')

  const { maturity, interest, yearly } = useMemo(() => {
    const p = parseFloat(principal) || 0
    const r = parseFloat(rate) || 0
    const t = parseFloat(years) || 0
    const n = parseFloat(freq) || 1
    if (p <= 0 || t <= 0) return { maturity: 0, interest: 0, yearly: [] }
    const maturity = p * Math.pow(1 + r / (n * 100), n * t)
    const yearly: { year: number; value: number }[] = []
    for (let y = 1; y <= Math.ceil(t); y++) {
      yearly.push({ year: y, value: p * Math.pow(1 + r / (n * 100), n * Math.min(y, t)) })
    }
    return { maturity, interest: maturity - p, yearly }
  }, [principal, rate, years, freq])

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter the principal amount you want to invest.</p>
          <p>2. Enter the annual interest rate and how frequently it compounds.</p>
          <p>3. Enter the investment duration in years to see the maturity value.</p>
        </>
      }
      formula={
        <>
          <p>Compound interest grows your principal by adding interest back into the balance each period:</p>
          <p className="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">A = P &times; (1 + r/n)^(n&times;t)</p>
          <p>Where P is principal, r is the annual interest rate, n is the compounding frequency per year, and t is time in years.</p>
        </>
      }
      faqs={[
        { question: 'What is compound interest?', answer: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods, causing your money to grow faster than with simple interest.' },
        { question: 'How does compounding frequency affect returns?', answer: 'The more frequently interest compounds (monthly vs annually), the higher the effective return, since interest is added to the principal more often.' },
        { question: 'Is this formula accurate for all investments?', answer: 'It applies to any investment or deposit that compounds at a fixed rate. For market-linked investments like mutual funds, actual returns vary and are not guaranteed.' },
        { question: "What's the difference between compound and simple interest?", answer: 'Simple interest is calculated only on the principal, while compound interest is calculated on the principal plus previously earned interest, resulting in exponential growth over time.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        <Field label="Principal Amount" suffix="₹" type="number" min={0} value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        <Field label="Annual Interest Rate" suffix="%" type="number" min={0} step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        <Field label="Time Period" suffix="Years" type="number" min={0} value={years} onChange={(e) => setYears(e.target.value)} />
        <Select label="Compounding Frequency" value={freq} onChange={setFreq} options={freqOptions} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResultStat label="Total Interest Earned" value={formatINR(interest)} />
        <ResultStat label="Maturity Value" value={formatINR(maturity)} highlight />
      </div>

      {yearly.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <p className="p-4 pb-0 text-sm font-semibold text-slate-800">Year-wise Growth</p>
          <table className="mt-2 w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-400">
                <th className="px-4 py-2">Year</th>
                <th className="px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {yearly.map((row) => (
                <tr key={row.year} className="border-b border-slate-100">
                  <td className="px-4 py-2">{row.year}</td>
                  <td className="px-4 py-2">{formatINR(row.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </CalcLayout>
  )
}
