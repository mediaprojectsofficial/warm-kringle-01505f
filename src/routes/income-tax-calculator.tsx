import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { formatINR } from '../lib/format'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('income-tax-calculator')!

export const Route = createFileRoute('/income-tax-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/income-tax-calculator' }),
  component: Page,
})

function slabTax(income: number, slabs: { upto: number; rate: number }[]) {
  let tax = 0
  let lastLimit = 0
  for (const slab of slabs) {
    if (income > lastLimit) {
      const taxable = Math.min(income, slab.upto) - lastLimit
      tax += taxable * (slab.rate / 100)
      lastLimit = slab.upto
    }
  }
  return tax
}

// FY 2025-26 (AY 2026-27) new regime slabs
const newRegimeSlabs = [
  { upto: 400000, rate: 0 },
  { upto: 800000, rate: 5 },
  { upto: 1200000, rate: 10 },
  { upto: 1600000, rate: 15 },
  { upto: 2000000, rate: 20 },
  { upto: 2400000, rate: 25 },
  { upto: Infinity, rate: 30 },
]

// FY 2025-26 old regime slabs (unchanged, below 60 years)
const oldRegimeSlabs = [
  { upto: 250000, rate: 0 },
  { upto: 500000, rate: 5 },
  { upto: 1000000, rate: 20 },
  { upto: Infinity, rate: 30 },
]

function computeRegimeTax(taxableIncome: number, slabs: typeof newRegimeSlabs, rebateLimit: number) {
  let tax = slabTax(taxableIncome, slabs)
  if (taxableIncome <= rebateLimit) {
    tax = 0
  }
  const cess = tax * 0.04
  return { tax, cess, total: tax + cess }
}

function Page() {
  const [ctc, setCtc] = useState('1200000')
  const [deductions, setDeductions] = useState('150000')

  const { newRegime, oldRegime, taxableNew, taxableOld } = useMemo(() => {
    const gross = parseFloat(ctc) || 0
    const otherDeductions = parseFloat(deductions) || 0

    const taxableNew = Math.max(gross - 75000, 0) // standard deduction only
    const taxableOld = Math.max(gross - 50000 - otherDeductions, 0)

    const newRegime = computeRegimeTax(taxableNew, newRegimeSlabs, 1200000)
    const oldRegime = computeRegimeTax(taxableOld, oldRegimeSlabs, 500000)

    return { newRegime, oldRegime, taxableNew, taxableOld }
  }, [ctc, deductions])

  const better = newRegime.total <= oldRegime.total ? 'New Regime' : 'Old Regime'
  const savings = Math.abs(newRegime.total - oldRegime.total)

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter your gross annual income (salary before deductions).</p>
          <p>2. Enter your total eligible deductions (80C, 80D, HRA, home loan interest, etc.) - only used for the old regime.</p>
          <p>3. Compare your tax liability under the new vs old regime and pick the lower one.</p>
        </>
      }
      formula={
        <>
          <p>Tax is computed by applying FY 2025-26 (AY 2026-27) slab rates progressively to taxable income, then adding 4% health &amp; education cess.</p>
          <p className="rounded-lg bg-slate-50 p-3 text-xs text-slate-700">
            New regime: ₹0-4L nil, 4-8L @5%, 8-12L @10%, 12-16L @15%, 16-20L @20%, 20-24L @25%, above 24L @30%. Standard deduction ₹75,000. Full rebate (tax = 0) if taxable income &le; ₹12L.
          </p>
          <p className="rounded-lg bg-slate-50 p-3 text-xs text-slate-700">
            Old regime: ₹0-2.5L nil, 2.5-5L @5%, 5-10L @20%, above 10L @30%. Standard deduction ₹50,000. Rebate up to ₹12,500 if taxable income &le; ₹5L.
          </p>
        </>
      }
      faqs={[
        { question: 'Which tax regime is better - new or old?', answer: 'It depends on how many deductions you claim. The new regime has lower slab rates but fewer exemptions, while the old regime allows deductions like 80C, 80D and HRA. This calculator compares both for your numbers.' },
        { question: 'Is the new tax regime the default now?', answer: 'Yes, from FY 2023-24 onwards the new tax regime is the default. You must explicitly opt for the old regime while filing your return if it benefits you more.' },
        { question: 'What is the standard deduction for FY 2025-26?', answer: 'Salaried individuals get a standard deduction of ₹75,000 under the new regime and ₹50,000 under the old regime.' },
        { question: 'What is the 87A rebate?', answer: 'Section 87A gives a full tax rebate (reducing tax to zero) if your taxable income is within ₹12,00,000 under the new regime, or ₹5,00,000 under the old regime.' },
        { question: 'Does this calculator account for HRA and other exemptions?', answer: 'Enter your total eligible deductions and exemptions (including HRA) in the deductions field to get an accurate old regime comparison. The new regime does not allow most exemptions.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        <Field label="Gross Annual Income" suffix="₹" type="number" min={0} value={ctc} onChange={(e) => setCtc(e.target.value)} />
        <Field label="Total Deductions (80C, 80D, HRA etc.)" suffix="₹" type="number" min={0} value={deductions} onChange={(e) => setDeductions(e.target.value)} hint="Only applies to the old regime" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-800">New Regime</p>
          <p className="mt-1 text-xs text-slate-500">Taxable Income: {formatINR(taxableNew)}</p>
          <p className="mt-3 text-2xl font-bold text-slate-900">{formatINR(newRegime.total)}</p>
          <p className="text-xs text-slate-500">incl. {formatINR(newRegime.cess)} cess</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-800">Old Regime</p>
          <p className="mt-1 text-xs text-slate-500">Taxable Income: {formatINR(taxableOld)}</p>
          <p className="mt-3 text-2xl font-bold text-slate-900">{formatINR(oldRegime.total)}</p>
          <p className="text-xs text-slate-500">incl. {formatINR(oldRegime.cess)} cess</p>
        </div>
      </div>

      <div className="mt-4">
        <ResultStat label={`${better} saves you`} value={formatINR(savings)} highlight />
      </div>
    </CalcLayout>
  )
}
