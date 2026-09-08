import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { formatINR } from '../lib/format'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('ppf-calculator')!

export const Route = createFileRoute('/ppf-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/ppf-calculator' }),
  component: Page,
})

function Page() {
  const [yearly, setYearly] = useState('150000')
  const [rate, setRate] = useState('7.1')
  const [years, setYears] = useState('15')

  const { invested, maturity, interest, schedule } = useMemo(() => {
    const p = parseFloat(yearly) || 0
    const r = parseFloat(rate) || 0
    const n = parseFloat(years) || 0
    if (p <= 0 || n <= 0) return { invested: 0, maturity: 0, interest: 0, schedule: [] }
    let balance = 0
    const schedule: { year: number; deposit: number; interest: number; balance: number }[] = []
    for (let y = 1; y <= n; y++) {
      balance += p
      const yearInterest = balance * (r / 100)
      balance += yearInterest
      schedule.push({ year: y, deposit: p, interest: yearInterest, balance })
    }
    return { invested: p * n, maturity: balance, interest: balance - p * n, schedule }
  }, [yearly, rate, years])

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter the amount you plan to deposit into your PPF account each year (max ₹1,50,000).</p>
          <p>2. Enter the current PPF interest rate (set quarterly by the Government of India).</p>
          <p>3. Enter the number of years - the standard PPF lock-in is 15 years.</p>
        </>
      }
      formula={
        <>
          <p>PPF interest is compounded annually and credited at the end of each financial year:</p>
          <p className="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">
            Balance(y) = [Balance(y-1) + Deposit] &times; (1 + r)
          </p>
          <p>Where r is the annual PPF interest rate, currently set by the Ministry of Finance each quarter.</p>
        </>
      }
      faqs={[
        { question: 'What is the current PPF interest rate?', answer: 'The PPF interest rate is set by the Government of India every quarter. Enter the latest published rate for the most accurate estimate.' },
        { question: 'What is the maximum PPF deposit per year?', answer: 'You can deposit a minimum of ₹500 and a maximum of ₹1,50,000 per financial year into a PPF account.' },
        { question: 'Is PPF interest and maturity amount taxable?', answer: 'No, PPF enjoys EEE (Exempt-Exempt-Exempt) tax status - contributions, interest earned, and maturity proceeds are all tax-free.' },
        { question: 'What is the PPF lock-in period?', answer: 'PPF has a mandatory 15-year lock-in period, extendable in blocks of 5 years. Partial withdrawals are allowed from the 7th year onwards.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-3">
        <Field label="Yearly Investment" suffix="₹" type="number" min={0} max={150000} value={yearly} onChange={(e) => setYearly(e.target.value)} />
        <Field label="Interest Rate (p.a.)" suffix="%" type="number" min={0} step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} />
        <Field label="Duration" suffix="Years" type="number" min={0} value={years} onChange={(e) => setYears(e.target.value)} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ResultStat label="Total Investment" value={formatINR(invested)} />
        <ResultStat label="Interest Earned" value={formatINR(interest)} />
        <ResultStat label="Maturity Value" value={formatINR(maturity)} highlight />
      </div>

      {schedule.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <p className="p-4 pb-0 text-sm font-semibold text-slate-800">Year-wise Balance</p>
          <table className="mt-2 w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-400">
                <th className="px-4 py-2">Year</th>
                <th className="px-4 py-2">Deposit</th>
                <th className="px-4 py-2">Interest</th>
                <th className="px-4 py-2">Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.year} className="border-b border-slate-100">
                  <td className="px-4 py-2">{row.year}</td>
                  <td className="px-4 py-2">{formatINR(row.deposit)}</td>
                  <td className="px-4 py-2">{formatINR(row.interest)}</td>
                  <td className="px-4 py-2">{formatINR(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </CalcLayout>
  )
}
