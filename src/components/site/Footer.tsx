import { Link } from '@tanstack/react-router'
import { calculators, categoryLabels, type CalcCategory } from '../../lib/calc-data'

export default function Footer() {
  const categories = Object.keys(categoryLabels) as CalcCategory[]

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-base font-bold text-white">
                ₹
              </span>
              <span className="text-base font-bold text-slate-900">Indian Calculator Hub</span>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Free, fast and accurate financial, health and everyday calculators built for
              Indian users.
            </p>
            <div className="mt-4 flex gap-3" aria-label="Social links">
              <a
                href="https://twitter.com"
                aria-label="Follow us on Twitter"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-emerald-700"
              >
                𝕏
              </a>
              <a
                href="https://facebook.com"
                aria-label="Follow us on Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-emerald-700"
              >
                f
              </a>
              <a
                href="https://instagram.com"
                aria-label="Follow us on Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-emerald-700"
              >
                ig
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">Categories</h2>
            <ul className="mt-3 space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link to="/" search={{ category: cat }} className="text-sm text-slate-500 hover:text-emerald-700">
                    {categoryLabels[cat]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">Popular Calculators</h2>
            <ul className="mt-3 space-y-2">
              {calculators.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link to={`/${c.slug}`} className="text-sm text-slate-500 hover:text-emerald-700">
                    {c.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">Company</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-slate-500 hover:text-emerald-700">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-slate-500 hover:text-emerald-700">Contact Us</Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-slate-500 hover:text-emerald-700">Blog</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-sm text-slate-500 hover:text-emerald-700">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-slate-500 hover:text-emerald-700">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-sm text-slate-500 hover:text-emerald-700">Disclaimer</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Indian Calculator Hub. All rights reserved. All
            calculators are provided for estimation and educational purposes only and do not
            constitute financial, tax or medical advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
