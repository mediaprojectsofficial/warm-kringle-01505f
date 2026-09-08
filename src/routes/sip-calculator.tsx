import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { formatINR } from '../lib/format'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('sip-calculator')!

export const Route = createFileRoute('/sip-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/sip-calculator' }),
  component: SipCalculatorPage,
})

function SipCalculatorPage() {
  const [monthly, setMonthly] = useState('10000')
  const [rate, setRate] = useState('12')
  const [years, setYears] = useState('10')

  const { invested, futureValue, gains, yearly } = useMemo(() => {
    const p = parseFloat(monthly) || 0
    const annualRate = parseFloat(rate) || 0
    const n = (parseFloat(years) || 0) * 12
    const i = annualRate / 12 / 100
    if (p <= 0 || n <= 0) return { invested: 0, futureValue: 0, gains: 0, yearly: [] }

    const yearly: { year: number; invested: number; value: number }[] = []
    let fv = 0
    for (let m = 1; m <= n; m++) {
      fv = (fv + p) * (1 + i)
      if (m % 12 === 0) {
        yearly.push({ year: m / 12, invested: p * m, value: fv })
      }
    }
    const invested = p * n
    return { invested, futureValue: fv, gains: fv - invested, yearly }
  }, [monthly, rate, years])

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter the amount you plan to invest every month via SIP.</p>
          <p>2. Enter the expected annual rate of return of the mutual fund scheme.</p>
          <p>3. Enter the investment duration in years.</p>
          <p>4. View the total invested amount, wealth gained and maturity value.</p>
        </>
      }
      formula={
        <>
          <p>SIP future value uses the compounding future value of a series (annuity) formula:</p>
          <p className="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">
            FV = P &times; [(1+i)^n − 1] / i &times; (1+i)
          </p>
          <p>Where P is the monthly investment, i is the monthly rate of return, and n is the number of months.</p>
        </>
      }
      faqs={[
        { question: 'How does a SIP calculator work?', answer: 'It projects the future value of your recurring monthly mutual fund investments by compounding each installment at the expected monthly rate of return until maturity.' },
        { question: 'Is the SIP return guaranteed?', answer: 'No. Mutual fund SIP returns depend on market performance and are never guaranteed. The rate entered here is only an assumption for estimation.' },
        { question: 'What is a good expected return to assume?', answer: 'Equity mutual funds in India have historically returned 10-14% annually over the long term, though past performance does not guarantee future returns.' },
        { question: 'What is rupee cost averaging?', answer: 'SIPs buy more units when prices are low and fewer when prices are high, averaging out your purchase cost over time and reducing timing risk.' },
        { question: 'Can I increase my SIP amount later?', answer: 'Yes, a Step-up SIP lets you increase your monthly investment periodically. This calculator assumes a constant monthly investment for simplicity.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-3">
        <Field label="Monthly Investment" suffix="₹" type="number" min={0} value={monthly} onChange={(e) => setMonthly(e.target.value)} />
        <Field label="Expected Return (p.a.)" suffix="%" type="number" min={0} step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        <Field label="Investment Period" suffix="Years" type="number" min={0} value={years} onChange={(e) => setYears(e.target.value)} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ResultStat label="Total Invested" value={formatINR(invested)} />
        <ResultStat label="Estimated Returns" value={formatINR(gains)} />
        <ResultStat label="Maturity Value" value={formatINR(futureValue)} highlight />
      </div>

      {yearly.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <p className="p-4 pb-0 text-sm font-semibold text-slate-800">Year-wise Growth</p>
          <table className="mt-2 w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-400">
                <th className="px-4 py-2">Year</th>
                <th className="px-4 py-2">Invested</th>
                <th className="px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {yearly.map((row) => (
                <tr key={row.year} className="border-b border-slate-100">
                  <td className="px-4 py-2">{row.year}</td>
                  <td className="px-4 py-2">{formatINR(row.invested)}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full bg-emerald-600"
                          style={{ width: `${Math.min((row.value / (yearly[yearly.length - 1].value || 1)) * 100, 100)}%` }}
                        />
                      </div>
                      {formatINR(row.value)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </CalcLayout>
  )
}
