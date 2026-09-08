import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { formatINR } from '../lib/format'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('salary-calculator')!

export const Route = createFileRoute('/salary-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/salary-calculator' }),
  component: Page,
})

const slabs = [
  { upto: 400000, rate: 0 },
  { upto: 800000, rate: 5 },
  { upto: 1200000, rate: 10 },
  { upto: 1600000, rate: 15 },
  { upto: 2000000, rate: 20 },
  { upto: 2400000, rate: 25 },
  { upto: Infinity, rate: 30 },
]

function estimateAnnualTax(taxableIncome: number) {
  if (taxableIncome <= 1200000) return 0
  let tax = 0
  let last = 0
  for (const slab of slabs) {
    if (taxableIncome > last) {
      tax += (Math.min(taxableIncome, slab.upto) - last) * (slab.rate / 100)
      last = slab.upto
    }
  }
  return tax * 1.04
}

function Page() {
  const [ctc, setCtc] = useState('1200000')
  const [bonus, setBonus] = useState('0')

  const { basic, epf, professionalTax, incomeTax, monthlyInHand, annualInHand } = useMemo(() => {
    const c = parseFloat(ctc) || 0
    const b = parseFloat(bonus) || 0
    const fixedCtc = Math.max(c - b, 0)
    const basicAnnual = fixedCtc * 0.5
    const epfAnnual = Math.min(basicAnnual * 0.12, 21600)
    const professionalTaxAnnual = 2400
    const taxableIncome = Math.max(fixedCtc - 75000 - epfAnnual, 0)
    const incomeTaxAnnual = estimateAnnualTax(taxableIncome)
    const annualInHand = fixedCtc - epfAnnual - professionalTaxAnnual - incomeTaxAnnual + b
    return {
      basic: basicAnnual / 12,
      epf: epfAnnual / 12,
      professionalTax: professionalTaxAnnual / 12,
      incomeTax: incomeTaxAnnual / 12,
      monthlyInHand: annualInHand / 12,
      annualInHand,
    }
  }, [ctc, bonus])

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter your annual CTC (Cost to Company) as mentioned in your offer letter.</p>
          <p>2. Enter any fixed annual bonus component included in your CTC.</p>
          <p>3. View your estimated monthly in-hand salary after EPF, professional tax and income tax deductions.</p>
        </>
      }
      formula={
        <>
          <p>In-hand salary = CTC − Employer PF − Employee PF − Professional Tax − Income Tax</p>
          <p>
            This calculator assumes Basic Salary is 50% of fixed CTC, Employee EPF contribution
            is 12% of basic (capped at ₹21,600/year), professional tax of ₹200/month (varies by
            state), and income tax is estimated using FY 2025-26 new regime slabs with the
            ₹75,000 standard deduction.
          </p>
        </>
      }
      faqs={[
        { question: 'What is the difference between CTC and in-hand salary?', answer: 'CTC (Cost to Company) is the total amount a company spends on an employee including benefits and employer contributions. In-hand salary is what actually gets credited to your bank account after all deductions.' },
        { question: 'Why is my in-hand salary lower than CTC / 12?', answer: 'CTC includes components like employer PF contribution, gratuity and other benefits that are not paid to you directly, plus deductions like employee PF, professional tax and income tax reduce your take-home pay.' },
        { question: 'Is professional tax the same in every state?', answer: 'No, professional tax varies by state and is capped at different maximum amounts. This calculator uses a common estimate of ₹200/month; check your specific state slab for exact figures.' },
        { question: 'Does this calculator account for HRA exemption?', answer: 'No, this is a simplified estimate assuming the new tax regime. Use the HRA Calculator and Income Tax Calculator together for a more precise old-regime estimate.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        <Field label="Annual CTC" suffix="₹" type="number" min={0} value={ctc} onChange={(e) => setCtc(e.target.value)} />
        <Field label="Annual Bonus (included in CTC)" suffix="₹" type="number" min={0} value={bonus} onChange={(e) => setBonus(e.target.value)} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ResultStat label="Basic Salary (Monthly)" value={formatINR(basic)} />
        <ResultStat label="Employee PF (Monthly)" value={formatINR(epf)} />
        <ResultStat label="Income Tax (Monthly)" value={formatINR(incomeTax)} />
        <ResultStat label="Professional Tax (Monthly)" value={formatINR(professionalTax)} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResultStat label="Monthly In-Hand Salary" value={formatINR(monthlyInHand)} highlight />
        <ResultStat label="Annual In-Hand Salary" value={formatINR(annualInHand)} />
      </div>
    </CalcLayout>
  )
}
