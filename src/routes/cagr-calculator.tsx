import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import CalcLayout from '../components/site/CalcLayout'
import { Field, ResultStat } from '../components/site/Field'
import { getCalcBySlug } from '../lib/calc-data'
import { formatNumber } from '../lib/format'
import { pageHead } from '../lib/seo'

const meta = getCalcBySlug('cagr-calculator')!

export const Route = createFileRoute('/cagr-calculator')({
  head: () => pageHead({ title: meta.title, description: meta.description, path: '/cagr-calculator' }),
  component: Page,
})

function Page() {
  const [initial, setInitial] = useState('100000')
  const [final, setFinal] = useState('180000')
  const [years, setYears] = useState('3')

  const { cagr, absoluteReturn } = useMemo(() => {
    const i = parseFloat(initial) || 0
    const f = parseFloat(final) || 0
    const t = parseFloat(years) || 0
    if (i <= 0 || t <= 0) return { cagr: 0, absoluteReturn: 0 }
    const cagr = (Math.pow(f / i, 1 / t) - 1) * 100
    const absoluteReturn = ((f - i) / i) * 100
    return { cagr, absoluteReturn }
  }, [initial, final, years])

  return (
    <CalcLayout
      meta={meta}
      howToUse={
        <>
          <p>1. Enter the initial value of your investment.</p>
          <p>2. Enter the final (current) value of the investment.</p>
          <p>3. Enter the number of years held to calculate the compound annual growth rate.</p>
        </>
      }
      formula={
        <>
          <p>CAGR measures the smoothed annual growth rate of an investment over a period of time:</p>
          <p className="rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700">CAGR = [(Final Value / Initial Value)^(1/n) − 1] &times; 100</p>
          <p>Where n is the number of years the investment was held.</p>
        </>
      }
      faqs={[
        { question: 'What is CAGR?', answer: 'CAGR (Compound Annual Growth Rate) is the mean annual growth rate of an investment over a specified period longer than one year, assuming profits are reinvested each year.' },
        { question: 'Why use CAGR instead of absolute return?', answer: 'CAGR smooths out year-to-year volatility into a single annualized rate, making it easier to compare investments held for different time periods.' },
        { question: 'Is CAGR the same as actual annual return?', answer: 'No, CAGR is a hypothetical smoothed rate. Actual year-on-year returns of an investment usually fluctuate above and below the CAGR figure.' },
      ]}
    >
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-3">
        <Field label="Initial Investment Value" suffix="₹" type="number" min={0} value={initial} onChange={(e) => setInitial(e.target.value)} />
        <Field label="Final Value" suffix="₹" type="number" min={0} value={final} onChange={(e) => setFinal(e.target.value)} />
        <Field label="Duration" suffix="Years" type="number" min={0} value={years} onChange={(e) => setYears(e.target.value)} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResultStat label="Absolute Return" value={`${formatNumber(absoluteReturn)}%`} />
        <ResultStat label="CAGR" value={`${formatNumber(cagr)}%`} highlight />
      </div>
    </CalcLayout>
  )
}
