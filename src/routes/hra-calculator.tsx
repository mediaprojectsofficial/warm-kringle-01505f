import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat, Select } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { formatINR } from '../lib/format'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('hra-calculator')!

export const Route = createFileRoute('/hra-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/hra-calculator' }),
  component: Page,
})

function Page() {
  const [basic, setBasic] = useState('50000')
  const [hraReceived, setHraReceived] = useState('20000')
  const [rentPaid, setRentPaid] = useState('18000')
  const [metro, setMetro] = useState('metro')

  const { exemption, taxableHra } = useMemo(() => {
    const b = parseFloat(basic) || 0
    const h = parseFloat(hraReceived) || 0
    const r = parseFloat(rentPaid) || 0
    const rentMinus10Pct = Math.max(r - 0.1 * b, 0)
    const pctOfBasic = metro === 'metro' ? 0.5 * b : 0.4 * b
    const exemption = Math.max(Math.min(h, rentMinus10Pct, pctOfBasic), 0)
    return { exemption, taxableHra: Math.max(h - exemption, 0) }
  }, [basic, hraReceived, rentPaid, metro])

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter your monthly basic salary (+ dearness allowance, if applicable).</p>
          <p>2. Enter the HRA you actually receive from your employer each month.</p>
          <p>3. Enter the actual monthly rent you pay and whether you live in a metro city.</p>
          <p>4. View your tax-exempt HRA amount and the taxable portion.</p>
        </>
      }
      formula={
        <>
          <p>HRA exemption under Section 10(13A) is the minimum of these three amounts:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Actual HRA received from employer</li>
            <li>Rent paid minus 10% of basic salary</li>
            <li>50% of basic salary (metro cities) or 40% (non-metro cities)</li>
          </ul>
        </>
      }
      faqs={[
        { question: 'Which cities count as metro for HRA exemption?', answer: 'Delhi, Mumbai, Kolkata and Chennai are classified as metro cities, entitling you to a higher 50% of basic salary limit. All other cities use the 40% limit.' },
        { question: 'Can I claim HRA exemption under the new tax regime?', answer: 'No, the HRA exemption is only available under the old tax regime. The new regime does not allow this exemption.' },
        { question: 'Do I need rent receipts to claim HRA exemption?', answer: "Yes, you typically need rent receipts, and a rent agreement plus the landlord's PAN if annual rent exceeds ₹1,00,000, to claim HRA exemption." },
        { question: 'Can I claim HRA if I live in my own house?', answer: 'No, HRA exemption is only available if you actually pay rent for accommodation. If you own the house you live in, you cannot claim this exemption.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        <Field label="Basic Salary (Monthly)" suffix="₹" type="number" min={0} value={basic} onChange={(e) => setBasic(e.target.value)} />
        <Field label="HRA Received (Monthly)" suffix="₹" type="number" min={0} value={hraReceived} onChange={(e) => setHraReceived(e.target.value)} />
        <Field label="Rent Paid (Monthly)" suffix="₹" type="number" min={0} value={rentPaid} onChange={(e) => setRentPaid(e.target.value)} />
        <Select
          label="City Type"
          value={metro}
          onChange={setMetro}
          options={[
            { value: 'metro', label: 'Metro (Delhi, Mumbai, Kolkata, Chennai)' },
            { value: 'non-metro', label: 'Non-Metro' },
          ]}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResultStat label="Tax-Exempt HRA (Monthly)" value={formatINR(exemption)} highlight />
        <ResultStat label="Taxable HRA (Monthly)" value={formatINR(taxableHra)} />
      </div>
    </CalcLayout>
  )
}
