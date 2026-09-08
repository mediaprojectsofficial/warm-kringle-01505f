import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { formatINR, formatNumber } from '../lib/format'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('emi-calculator')!

export const Route = createFileRoute('/emi-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/emi-calculator' }),
  component: EmiCalculatorPage,
})

function calculateEmi(principal: number, annualRate: number, tenureMonths: number) {
  const monthlyRate = annualRate / 12 / 100
  if (monthlyRate === 0) {
    const emi = principal / tenureMonths
    return { emi, totalPayment: principal, totalInterest: 0 }
  }
  const factor = Math.pow(1 + monthlyRate, tenureMonths)
  const emi = (principal * monthlyRate * factor) / (factor - 1)
  const totalPayment = emi * tenureMonths
  const totalInterest = totalPayment - principal
  return { emi, totalPayment, totalInterest }
}

function buildSchedule(principal: number, annualRate: number, tenureMonths: number, emi: number) {
  const monthlyRate = annualRate / 12 / 100
  let balance = principal
  const rows: { month: number; principal: number; interest: number; balance: number }[] = []
  for (let m = 1; m <= tenureMonths; m++) {
    const interest = balance * monthlyRate
    const principalPaid = Math.min(emi - interest, balance)
    balance = Math.max(balance - principalPaid, 0)
    rows.push({ month: m, principal: principalPaid, interest, balance })
  }
  return rows
}

function EmiCalculatorPage() {
  const [principal, setPrincipal] = useState('2500000')
  const [rate, setRate] = useState('8.5')
  const [tenureYears, setTenureYears] = useState('20')

  const { emi, totalPayment, totalInterest, schedule } = useMemo(() => {
    const p = parseFloat(principal) || 0
    const r = parseFloat(rate) || 0
    const months = (parseFloat(tenureYears) || 0) * 12
    if (p <= 0 || months <= 0) return { emi: 0, totalPayment: 0, totalInterest: 0, schedule: [] }
    const result = calculateEmi(p, r, months)
    const schedule = buildSchedule(p, r, months, result.emi)
    return { ...result, schedule }
  }, [principal, rate, tenureYears])

  const yearlySchedule = useMemo(() => {
    const years: { year: number; principal: number; interest: number; balance: number }[] = []
    schedule.forEach((row, idx) => {
      const yearIndex = Math.floor(idx / 12)
      if (!years[yearIndex]) {
        years[yearIndex] = { year: yearIndex + 1, principal: 0, interest: 0, balance: row.balance }
      }
      years[yearIndex].principal += row.principal
      years[yearIndex].interest += row.interest
      years[yearIndex].balance = row.balance
    })
    return years
  }, [schedule])

  const principalPct = totalPayment > 0 ? (parseFloat(principal) / totalPayment) * 100 : 0

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter your loan amount (principal) in rupees.</p>
          <p>2. Enter the annual interest rate offered by your bank or NBFC.</p>
          <p>3. Enter the loan tenure in years.</p>
          <p>4. Your monthly EMI, total interest and full amortization schedule update instantly.</p>
        </>
      }
      formula={
        <>
          <p>
            EMI is calculated using the standard reducing-balance formula used by Indian banks:
          </p>
          <p className="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">
            EMI = P &times; r &times; (1+r)^n / [(1+r)^n − 1]
          </p>
          <p>
            Where P is the principal loan amount, r is the monthly interest rate (annual rate
            &divide; 12 &divide; 100), and n is the loan tenure in months.
          </p>
        </>
      }
      faqs={[
        {
          question: 'How is EMI calculated for home, car and personal loans?',
          answer:
            'All EMIs use the same reducing-balance formula: EMI = P × r × (1+r)^n / [(1+r)^n − 1], where P is the loan amount, r is the monthly interest rate and n is the tenure in months. Only the typical interest rate and tenure differ by loan type.',
        },
        {
          question: 'Is this EMI calculator accurate?',
          answer:
            'Yes, it uses the exact reducing-balance formula used by RBI-regulated banks and NBFCs. Actual EMI may vary slightly due to processing fees, rounding conventions or floating interest rates.',
        },
        {
          question: 'What is an amortization schedule?',
          answer:
            'It is a month-by-month (or year-by-year) breakdown showing how much of each EMI goes toward principal repayment versus interest, and the remaining loan balance.',
        },
        {
          question: 'Does a longer tenure reduce my EMI?',
          answer:
            'Yes, a longer tenure reduces the monthly EMI but increases the total interest paid over the life of the loan. A shorter tenure means higher EMI but lower total interest.',
        },
        {
          question: 'Can I prepay my loan to reduce interest?',
          answer:
            'Yes, most Indian lenders allow partial or full prepayment. Prepaying early in the tenure saves more interest since the outstanding principal is higher in the initial years.',
        },
        {
          question: 'Does this include processing fees or insurance?',
          answer:
            'No, this calculator only computes the principal and interest based EMI. Add any processing fee, GST or insurance premium separately as charged by your lender.',
        },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        <Field
          label="Loan Amount"
          suffix="₹"
          type="number"
          min={0}
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="2500000"
        />
        <Field
          label="Interest Rate (per annum)"
          suffix="%"
          type="number"
          min={0}
          step="0.01"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="8.5"
        />
        <Field
          label="Loan Tenure"
          suffix="Years"
          type="number"
          min={0}
          value={tenureYears}
          onChange={(e) => setTenureYears(e.target.value)}
          placeholder="20"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ResultStat label="Monthly EMI" value={formatINR(emi)} highlight />
        <ResultStat label="Total Interest Payable" value={formatINR(totalInterest)} />
        <ResultStat label="Total Payment (Principal + Interest)" value={formatINR(totalPayment)} />
      </div>

      {totalPayment > 0 && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-800">Principal vs Interest</p>
          <div className="mt-3 flex h-4 w-full overflow-hidden rounded-full bg-slate-100" role="img" aria-label={`Principal ${formatNumber(principalPct)}%, Interest ${formatNumber(100 - principalPct)}%`}>
            <div className="h-full bg-emerald-600" style={{ width: `${principalPct}%` }} />
            <div className="h-full bg-amber-400" style={{ width: `${100 - principalPct}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span><span className="inline-block h-2 w-2 rounded-full bg-emerald-600" /> Principal ({formatNumber(principalPct)}%)</span>
            <span><span className="inline-block h-2 w-2 rounded-full bg-amber-400" /> Interest ({formatNumber(100 - principalPct)}%)</span>
          </div>
        </div>
      )}

      {yearlySchedule.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <p className="p-4 pb-0 text-sm font-semibold text-slate-800">Yearly Amortization Schedule</p>
          <table className="mt-2 w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-400">
                <th className="px-4 py-2">Year</th>
                <th className="px-4 py-2">Principal Paid</th>
                <th className="px-4 py-2">Interest Paid</th>
                <th className="px-4 py-2">Balance</th>
              </tr>
            </thead>
            <tbody>
              {yearlySchedule.map((row) => (
                <tr key={row.year} className="border-b border-slate-100">
                  <td className="px-4 py-2">{row.year}</td>
                  <td className="px-4 py-2">{formatINR(row.principal)}</td>
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
