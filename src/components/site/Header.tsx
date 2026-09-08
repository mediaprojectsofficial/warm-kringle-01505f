import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { calculators, categoryLabels, type CalcCategory } from '../../lib/calc-data'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)

  const categories = Object.keys(categoryLabels) as CalcCategory[]

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2" aria-label="Indian Calculator Hub home">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-lg font-bold text-white"
            aria-hidden="true"
          >
            ₹
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Indian Calculator Hub
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          <Link to="/" className="text-sm font-medium text-slate-700 hover:text-emerald-700">
            Home
          </Link>
          <div className="relative">
            <button
              className="text-sm font-medium text-slate-700 hover:text-emerald-700"
              onClick={() => setCatOpen((v) => !v)}
              onBlur={() => setTimeout(() => setCatOpen(false), 150)}
              aria-expanded={catOpen}
              aria-haspopup="true"
            >
              Categories
            </button>
            {catOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to="/"
                    search={{ category: cat }}
                    className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    {categoryLabels[cat]}
                    <span className="ml-1 text-xs text-slate-400">
                      ({calculators.filter((c) => c.category === cat).length})
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/about" className="text-sm font-medium text-slate-700 hover:text-emerald-700">
            About
          </Link>
          <Link to="/blog" className="text-sm font-medium text-slate-700 hover:text-emerald-700">
            Blog
          </Link>
          <Link to="/contact" className="text-sm font-medium text-slate-700 hover:text-emerald-700">
            Contact
          </Link>
        </nav>

        <button
          className="rounded-md border border-slate-200 p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1">
            <Link to="/" className="rounded-md px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Home
            </Link>
            <Link to="/about" className="rounded-md px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              About
            </Link>
            <Link to="/blog" className="rounded-md px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Blog
            </Link>
            <Link to="/contact" className="rounded-md px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Contact
            </Link>
            <p className="mt-2 px-2 text-xs font-semibold uppercase text-slate-400">Categories</p>
            {categories.map((cat) => (
              <Link
                key={cat}
                to="/"
                search={{ category: cat }}
                className="rounded-md px-2 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                {categoryLabels[cat]}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
