import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat, Select } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { formatNumber } from '../lib/format'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('calorie-calculator')!

export const Route = createFileRoute('/calorie-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/calorie-calculator' }),
  component: Page,
})

const activityLevels = [
  { value: '1.2', label: 'Sedentary (little or no exercise)' },
  { value: '1.375', label: 'Light activity (1-3 days/week)' },
  { value: '1.55', label: 'Moderate activity (3-5 days/week)' },
  { value: '1.725', label: 'Very active (6-7 days/week)' },
  { value: '1.9', label: 'Extremely active (athlete)' },
]

function Page() {
  const [gender, setGender] = useState('male')
  const [age, setAge] = useState('30')
  const [height, setHeight] = useState('170')
  const [weight, setWeight] = useState('65')
  const [activity, setActivity] = useState('1.55')

  const { bmr, maintenance, lose, gain } = useMemo(() => {
    const a = parseFloat(age) || 0
    const h = parseFloat(height) || 0
    const w = parseFloat(weight) || 0
    const factor = parseFloat(activity) || 1.2
    if (a <= 0 || h <= 0 || w <= 0) return { bmr: 0, maintenance: 0, lose: 0, gain: 0 }
    const bmr = gender === 'male' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161
    const maintenance = bmr * factor
    return { bmr, maintenance, lose: maintenance - 500, gain: maintenance + 500 }
  }, [gender, age, height, weight, activity])

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter your gender, age, height and weight.</p>
          <p>2. Select your typical weekly activity level.</p>
          <p>3. View your BMR and daily calorie needs to maintain, lose or gain weight.</p>
        </>
      }
      formula={
        <>
          <p>This calculator uses the Mifflin-St Jeor equation to estimate Basal Metabolic Rate (BMR):</p>
          <p className="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">
            Men: BMR = 10W + 6.25H − 5A + 5<br />
            Women: BMR = 10W + 6.25H − 5A − 161
          </p>
          <p>Where W is weight in kg, H is height in cm, and A is age in years. Total Daily Energy Expenditure (TDEE) = BMR &times; Activity Factor.</p>
        </>
      }
      faqs={[
        { question: 'What is BMR?', answer: 'Basal Metabolic Rate (BMR) is the number of calories your body needs at rest to maintain basic functions like breathing and circulation.' },
        { question: 'How many calories should I cut to lose weight?', answer: 'A deficit of about 500 calories per day from your maintenance calories typically leads to roughly 0.5 kg of weight loss per week.' },
        { question: 'Is this calculator accurate for everyone?', answer: 'It provides a good estimate for most adults using the widely-used Mifflin-St Jeor equation, but individual metabolism can vary due to genetics, muscle mass and health conditions.' },
        { question: 'Should I eat exactly the recommended calories every day?', answer: 'These are estimates meant as a starting guideline. Monitor your weight over a few weeks and adjust intake as needed to reach your goal.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        <Select
          label="Gender"
          value={gender}
          onChange={setGender}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
        />
        <Field label="Age" suffix="Years" type="number" min={0} value={age} onChange={(e) => setAge(e.target.value)} />
        <Field label="Height" suffix="cm" type="number" min={0} value={height} onChange={(e) => setHeight(e.target.value)} />
        <Field label="Weight" suffix="kg" type="number" min={0} value={weight} onChange={(e) => setWeight(e.target.value)} />
        <Select label="Activity Level" value={activity} onChange={setActivity} options={activityLevels} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ResultStat label="BMR" value={`${formatNumber(bmr, 0)} kcal/day`} />
        <ResultStat label="Maintenance Calories" value={`${formatNumber(maintenance, 0)} kcal/day`} highlight />
        <ResultStat label="To Lose Weight" value={`${formatNumber(lose, 0)} kcal/day`} />
        <ResultStat label="To Gain Weight" value={`${formatNumber(gain, 0)} kcal/day`} />
      </div>
    </CalcLayout>
  )
}
