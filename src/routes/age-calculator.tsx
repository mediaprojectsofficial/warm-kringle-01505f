import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('age-calculator')!

export const Route = createFileRoute('/age-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/age-calculator' }),
  component: Page,
})

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

function Page() {
  const [dob, setDob] = useState('2000-01-01')
  const [asOf, setAsOf] = useState(todayIso())

  const result = useMemo(() => {
    const birth = new Date(dob)
    const target = new Date(asOf)
    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || birth > target) return null

    let years = target.getFullYear() - birth.getFullYear()
    let months = target.getMonth() - birth.getMonth()
    let days = target.getDate() - birth.getDate()

    if (days < 0) {
      months -= 1
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0)
      days += prevMonth.getDate()
    }
    if (months < 0) {
      years -= 1
      months += 12
    }

    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
    return { years, months, days, totalDays }
  }, [dob, asOf])

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter your date of birth.</p>
          <p>2. Optionally change the "as of" date (defaults to today).</p>
          <p>3. View your exact age in years, months and days.</p>
        </>
      }
      formula={
        <>
          <p>
            Age is calculated by finding the difference between the target date and date of
            birth, carrying over borrowed days/months for calendar accuracy (accounting for
            varying month lengths and leap years).
          </p>
        </>
      }
      faqs={[
        { question: 'How is exact age calculated?', answer: 'It subtracts the date of birth from the target date, adjusting for calendar month lengths and leap years to give an accurate years, months and days breakdown.' },
        { question: 'Can I calculate age as of a future or past date?', answer: 'Yes, change the "as of" date field to any date to calculate age as it was, or will be, on that specific date.' },
        { question: 'Why do total days differ slightly from years×365?', answer: 'Because leap years add an extra day roughly every 4 years, so total days is more accurate than a simple years × 365 calculation.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        <Field label="Date of Birth" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        <Field label="Age as of" type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)} />
      </div>

      {result ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <ResultStat label="Years" value={String(result.years)} highlight />
          <ResultStat label="Months" value={String(result.months)} />
          <ResultStat label="Days" value={String(result.days)} />
          <ResultStat label="Total Days Lived" value={result.totalDays.toLocaleString('en-IN')} />
        </div>
      ) : (
        <p className="mt-6 text-sm text-red-600">Please enter a valid date of birth on or before the target date.</p>
      )}
    </CalcLayout>
  )
}
