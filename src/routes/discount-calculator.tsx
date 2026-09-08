import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { formatINR } from '../lib/format'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('discount-calculator')!

export const Route = createFileRoute('/discount-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/discount-calculator' }),
  component: Page,
})

function Page() {
  const [price, setPrice] = useState('2000')
  const [discount, setDiscount] = useState('25')

  const { savedAmount, finalPrice } = useMemo(() => {
    const p = parseFloat(price) || 0
    const d = parseFloat(discount) || 0
    const savedAmount = (p * d) / 100
    return { savedAmount, finalPrice: p - savedAmount }
  }, [price, discount])

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter the original (marked) price of the product.</p>
          <p>2. Enter the discount percentage being offered.</p>
          <p>3. View the amount you save and the final price to pay.</p>
        </>
      }
      formula={
        <>
          <p className="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">
            Discount Amount = Price &times; (Discount % / 100)<br />
            Final Price = Price − Discount Amount
          </p>
        </>
      }
      faqs={[
        { question: 'How do I calculate the final price after a discount?', answer: 'Multiply the original price by the discount percentage divided by 100 to get the amount saved, then subtract that from the original price.' },
        { question: 'How do I calculate discount on multiple items?', answer: 'Enter the total original price of all items combined for a combined discount, or calculate each item individually for itemized savings.' },
        { question: 'Does this include GST or additional taxes?', answer: 'No, this calculates the discount on the base price only. Add applicable GST separately using the GST Calculator if needed.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        <Field label="Original Price" suffix="₹" type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} />
        <Field label="Discount" suffix="%" type="number" min={0} max={100} value={discount} onChange={(e) => setDiscount(e.target.value)} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResultStat label="You Save" value={formatINR(savedAmount)} />
        <ResultStat label="Final Price" value={formatINR(finalPrice)} highlight />
      </div>
    </CalcLayout>
  )
}
