import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { formatINR } from '../lib/format'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('lumpsum-calculator')!

export const Route = createFileRoute('/lumpsum-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/lumpsum-calculator' }),
  component: Page,
})

function Page() {
  const [amount, setAmount] = useState('100000')
  const [rate, setRate] = useState('12')
  const [years, setYears] = useState('10')

  const { futureValue, gains, yearly } = useMemo(() => {
    const p = parseFloat(amount) || 0
    const r = parseFloat(rate) || 0
    const t = parseFloat(years) || 0
    if (p <= 0 || t <= 0) return { futureValue: 0, gains: 0, yearly: [] }
    const yearly: { year: number; value: number }[] = []
    for (let y = 1; y <= Math.ceil(t); y++) {
      yearly.push({ year: y, value: p * Math.pow(1 + r / 100, Math.min(y, t)) })
    }
    const futureValue = p * Math.pow(1 + r / 100, t)
    return { futureValue, gains: futureValue - p, yearly }
  }, [amount, rate, years])

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter the one-time lumpsum amount you want to invest.</p>
          <p>2. Enter the expected annual rate of return.</p>
          <p>3. Enter the investment duration to see the projected future value.</p>
        </>
      }
      formula={
        <>
          <p>Lumpsum investments grow using standard annual compounding:</p>
          <p className="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">FV = P &times; (1 + r)^t</p>
          <p>Where P is the invested amount, r is the expected annual rate of return, and t is the investment duration in years.</p>
        </>
      }
      faqs={[
        { question: 'What is a lumpsum investment?', answer: 'A lumpsum investment is a one-time investment of a large amount into a mutual fund or other instrument, as opposed to investing smaller amounts periodically via SIP.' },
        { question: 'Is lumpsum better than SIP?', answer: 'Lumpsum can generate higher returns when markets are rising, but carries more timing risk. SIP averages purchase cost over time and reduces this risk, making it suitable for volatile markets.' },
        { question: 'Are the projected returns guaranteed?', answer: 'No, this is only an estimate based on the rate you enter. Actual mutual fund and market-linked returns fluctuate and are never guaranteed.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-3">
        <Field label="Lumpsum Amount" suffix="₹" type="number" min={0} value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Field label="Expected Return (p.a.)" suffix="%" type="number" min={0} step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        <Field label="Investment Period" suffix="Years" type="number" min={0} value={years} onChange={(e) => setYears(e.target.value)} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResultStat label="Estimated Gains" value={formatINR(gains)} />
        <ResultStat label="Future Value" value={formatINR(futureValue)} highlight />
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
