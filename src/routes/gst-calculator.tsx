import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat, Select } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { formatINR } from '../lib/format'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('gst-calculator')!

export const Route = createFileRoute('/gst-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/gst-calculator' }),
  component: Page,
})

const gstRates = [
  { value: '0', label: '0%' },
  { value: '5', label: '5%' },
  { value: '12', label: '12%' },
  { value: '18', label: '18%' },
  { value: '28', label: '28%' },
]

function Page() {
  const [amount, setAmount] = useState('10000')
  const [rate, setRate] = useState('18')
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive')

  const { baseAmount, gstAmount, totalAmount } = useMemo(() => {
    const a = parseFloat(amount) || 0
    const r = parseFloat(rate) || 0
    if (mode === 'exclusive') {
      const gstAmount = (a * r) / 100
      return { baseAmount: a, gstAmount, totalAmount: a + gstAmount }
    }
    const baseAmount = (a * 100) / (100 + r)
    return { baseAmount, gstAmount: a - baseAmount, totalAmount: a }
  }, [amount, rate, mode])

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter the amount and select whether it already includes GST or not.</p>
          <p>2. Select the applicable GST slab rate (0%, 5%, 12%, 18% or 28%).</p>
          <p>3. View the base price, GST amount and total price instantly.</p>
        </>
      }
      formula={
        <>
          <p>To add GST to a base price:</p>
          <p className="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">GST Amount = Base Price &times; (Rate / 100)</p>
          <p>To remove GST from a GST-inclusive price:</p>
          <p className="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">Base Price = Total Price &times; 100 / (100 + Rate)</p>
        </>
      }
      faqs={[
        { question: 'What are the current GST slab rates in India?', answer: 'India has five main GST slabs: 0%, 5%, 12%, 18% and 28%, applied depending on the category of goods or services.' },
        { question: 'What is the difference between CGST, SGST and IGST?', answer: 'For intra-state sales, GST is split equally into CGST (Central) and SGST (State). For inter-state sales, IGST (Integrated GST) is charged, equal to the combined CGST+SGST rate.' },
        { question: 'How do I remove GST from a total price?', answer: 'Use the "GST Inclusive" mode - it divides the total price by (1 + GST rate/100) to find the original base price before GST.' },
        { question: 'Is GST calculation the same for all states?', answer: 'Yes, GST rates are uniform across India for a given product or service category, unlike the older VAT system which varied by state.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-3">
        <Field label="Amount" suffix="₹" type="number" min={0} value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Select label="GST Rate" value={rate} onChange={setRate} options={gstRates} />
        <Select
          label="Amount Type"
          value={mode}
          onChange={(v) => setMode(v as 'exclusive' | 'inclusive')}
          options={[
            { value: 'exclusive', label: 'GST Exclusive (add GST)' },
            { value: 'inclusive', label: 'GST Inclusive (remove GST)' },
          ]}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ResultStat label="Base Price" value={formatINR(baseAmount)} />
        <ResultStat label="GST Amount" value={formatINR(gstAmount)} />
        <ResultStat label="Total Price" value={formatINR(totalAmount)} highlight />
      </div>
    </CalcLayout>
  )
}
