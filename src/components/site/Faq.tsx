import { useState } from 'react'

export interface FaqItem {
  question: string
  answer: string
}

export default function Faq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const panelId = `faq-panel-${index}`
        const buttonId = `faq-button-${index}`
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold text-slate-800 hover:text-emerald-700"
              >
                <span>{item.question}</span>
                <span aria-hidden="true" className="text-slate-400">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
              <p className="px-4 pb-4 text-sm leading-relaxed text-slate-600">{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
