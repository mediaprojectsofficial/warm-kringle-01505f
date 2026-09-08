import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('date-difference-calculator')!

export const Route = createFileRoute('/date-difference-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/date-difference-calculator' }),
  component: Page,
})

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

function Page() {
  const [start, setStart] = useState('2025-01-01')
  const [end, setEnd] = useState(todayIso())

  const result = useMemo(() => {
    const s = new Date(start)
    const e = new Date(end)
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return null
    const [from, to] = s <= e ? [s, e] : [e, s]

    let years = to.getFullYear() - from.getFullYear()
    let months = to.getMonth() - from.getMonth()
    let days = to.getDate() - from.getDate()
    if (days < 0) {
      months -= 1
      days += new Date(to.getFullYear(), to.getMonth(), 0).getDate()
    }
    if (months < 0) {
      years -= 1
      months += 12
    }

    const totalDays = Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))
    return { years, months, days, totalDays, totalWeeks: Math.floor(totalDays / 7) }
  }, [start, end])

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter the start date.</p>
          <p>2. Enter the end date.</p>
          <p>3. View the exact difference in years, months, days, weeks and total days.</p>
        </>
      }
      formula={
        <>
          <p>
            The calculator finds the calendar difference between the two dates (accounting for
            varying month lengths and leap years) and also computes the raw total number of
            days between them.
          </p>
        </>
      }
      faqs={[
        { question: 'How is the difference between two dates calculated?', answer: 'The calculator subtracts the earlier date from the later date, adjusting for calendar month lengths and leap years to give an accurate years, months and days breakdown, plus a total day count.' },
        { question: 'Does the calculator handle leap years?', answer: 'Yes, the total days figure automatically accounts for leap years since it is based on actual calendar dates.' },
        { question: 'Can I use this to count days until a future event?', answer: 'Yes, enter today\'s date as the start date and the future event date as the end date to count down the days remaining.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        <Field label="Start Date" type="date" value={start} onChange={(e) => setStart(e.target.value)} />
        <Field label="End Date" type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
      </div>

      {result && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ResultStat label="Years, Months, Days" value={`${result.years}y ${result.months}m ${result.days}d`} highlight />
          <ResultStat label="Total Days" value={result.totalDays.toLocaleString('en-IN')} />
          <ResultStat label="Total Weeks" value={result.totalWeeks.toLocaleString('en-IN')} />
          <ResultStat label="Total Months (approx.)" value={String(result.years * 12 + result.months)} />
        </div>
      )}
    </CalcLayout>
  )
}
