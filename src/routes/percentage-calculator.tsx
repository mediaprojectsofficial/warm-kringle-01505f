import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { formatNumber } from '../lib/format'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('percentage-calculator')!

export const Route = createFileRoute('/percentage-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/percentage-calculator' }),
  component: Page,
})

function Page() {
  const [value, setValue] = useState('20')
  const [total, setTotal] = useState('200')
  const [oldValue, setOldValue] = useState('100')
  const [newValue, setNewValue] = useState('120')

  const percentOf = useMemo(() => {
    const v = parseFloat(value) || 0
    const t = parseFloat(total) || 0
    return t !== 0 ? (v / 100) * t : 0
  }, [value, total])

  const change = useMemo(() => {
    const o = parseFloat(oldValue) || 0
    const n = parseFloat(newValue) || 0
    if (o === 0) return { pct: 0, direction: 'none' }
    const pct = ((n - o) / o) * 100
    return { pct: Math.abs(pct), direction: pct >= 0 ? 'increase' : 'decrease' }
  }, [oldValue, newValue])

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Use "X% of Y" to find what a given percentage of a number equals.</p>
          <p>2. Use "Percentage Change" to find the percentage increase or decrease between two values.</p>
        </>
      }
      formula={
        <>
          <p className="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">X% of Y = (X / 100) &times; Y</p>
          <p className="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">% Change = [(New − Old) / Old] &times; 100</p>
        </>
      }
      faqs={[
        { question: 'How do I calculate what percentage one number is of another?', answer: 'Divide the part by the whole and multiply by 100: (Part / Whole) × 100. For example, 20 out of 200 is (20/200) × 100 = 10%.' },
        { question: 'How is percentage increase or decrease calculated?', answer: 'Subtract the old value from the new value, divide by the old value, then multiply by 100. A positive result is an increase, negative is a decrease.' },
        { question: 'Can percentage values be negative?', answer: 'The percentage change can be negative, indicating a decrease. A plain "X% of Y" calculation is always non-negative for positive inputs.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-800">X% of Y</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Field label="X (%)" type="number" value={value} onChange={(e) => setValue(e.target.value)} />
            <Field label="Y" type="number" value={total} onChange={(e) => setTotal(e.target.value)} />
          </div>
          <div className="mt-4">
            <ResultStat label="Result" value={formatNumber(percentOf)} highlight />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-800">Percentage Change</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Field label="Old Value" type="number" value={oldValue} onChange={(e) => setOldValue(e.target.value)} />
            <Field label="New Value" type="number" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
          </div>
          <div className="mt-4">
            <ResultStat label={`Percentage ${change.direction}`} value={`${formatNumber(change.pct)}%`} highlight />
          </div>
        </div>
      </div>
    </CalcLayout>
  )
}
