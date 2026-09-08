import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { formatNumber } from '../lib/format'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('bmi-calculator')!

export const Route = createFileRoute('/bmi-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/bmi-calculator' }),
  component: Page,
})

function categoryFor(bmi: number) {
  if (bmi <= 0) return { label: '-', color: 'text-slate-500' }
  if (bmi < 18.5) return { label: 'Underweight', color: 'text-amber-600' }
  if (bmi < 25) return { label: 'Normal', color: 'text-emerald-600' }
  if (bmi < 30) return { label: 'Overweight', color: 'text-amber-600' }
  return { label: 'Obese', color: 'text-red-600' }
}

function Page() {
  const [height, setHeight] = useState('170')
  const [weight, setWeight] = useState('65')

  const { bmi, category } = useMemo(() => {
    const h = (parseFloat(height) || 0) / 100
    const w = parseFloat(weight) || 0
    if (h <= 0) return { bmi: 0, category: categoryFor(0) }
    const bmi = w / (h * h)
    return { bmi, category: categoryFor(bmi) }
  }, [height, weight])

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter your height in centimeters.</p>
          <p>2. Enter your weight in kilograms.</p>
          <p>3. View your BMI value and weight category instantly.</p>
        </>
      }
      formula={
        <>
          <p>BMI is calculated using the standard WHO formula:</p>
          <p className="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">BMI = Weight (kg) / [Height (m)]&sup2;</p>
        </>
      }
      faqs={[
        { question: 'What is a healthy BMI range?', answer: 'A BMI between 18.5 and 24.9 is generally considered normal/healthy for most adults, as per WHO guidelines.' },
        { question: 'Is BMI accurate for everyone?', answer: 'BMI is a general screening tool and does not account for muscle mass, bone density or body composition. Athletes and very muscular individuals may show a high BMI despite low body fat.' },
        { question: 'Is BMI different for men and women?', answer: 'The BMI formula itself is the same for men and women, though healthy fat percentage ranges differ slightly between genders.' },
        { question: 'How can I improve an unhealthy BMI?', answer: 'A combination of balanced diet, regular physical activity and consulting a healthcare professional is recommended to move toward a healthy BMI range.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        <Field label="Height" suffix="cm" type="number" min={0} value={height} onChange={(e) => setHeight(e.target.value)} />
        <Field label="Weight" suffix="kg" type="number" min={0} value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResultStat label="Your BMI" value={formatNumber(bmi, 1)} highlight />
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">Category</p>
          <p className={`mt-1 text-xl font-bold sm:text-2xl ${category.color}`}>{category.label}</p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-400">
              <th className="px-4 py-2">BMI Range</th>
              <th className="px-4 py-2">Category</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100"><td className="px-4 py-2">Below 18.5</td><td className="px-4 py-2 text-amber-600">Underweight</td></tr>
            <tr className="border-b border-slate-100"><td className="px-4 py-2">18.5 - 24.9</td><td className="px-4 py-2 text-emerald-600">Normal</td></tr>
            <tr className="border-b border-slate-100"><td className="px-4 py-2">25 - 29.9</td><td className="px-4 py-2 text-amber-600">Overweight</td></tr>
            <tr><td className="px-4 py-2">30 and above</td><td className="px-4 py-2 text-red-600">Obese</td></tr>
          </tbody>
        </table>
      </div>
    </CalcLayout>
  )
}
