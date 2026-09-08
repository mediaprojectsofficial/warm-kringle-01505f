import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'

export const Route = createFileRoute('/terms')({
  head: () =>
    pageHead({
      title: 'Terms & Conditions',
      description: 'Terms and Conditions for using Indian Calculator Hub calculators and content.',
      path: '/terms',
    }),
  component: TermsPage,
})

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Terms &amp; Conditions</h1>
      <p className="mt-2 text-xs text-slate-400">Last updated: September 2026</p>

      <div className="mt-6 space-y-6 text-sm leading-relaxed text-slate-600">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">1. Acceptance of Terms</h2>
          <p className="mt-2">
            By accessing or using Indian Calculator Hub, you agree to be bound by these Terms
            &amp; Conditions. If you do not agree, please discontinue use of the site.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">2. Use of Calculators</h2>
          <p className="mt-2">
            All calculators are provided free of charge for personal, informational and
            educational use. Results are estimates only and must not be treated as professional
            financial, tax, legal or medical advice. See our{' '}
            <a href="/disclaimer" className="text-emerald-700 underline">Disclaimer</a> for details.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">3. Intellectual Property</h2>
          <p className="mt-2">
            All content, design, logos and text on this site are the property of Indian
            Calculator Hub unless otherwise stated. You may not reproduce or redistribute our
            content without prior written permission.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">4. Third-Party Advertising</h2>
          <p className="mt-2">
            This site displays advertisements served by Google AdSense and may in the future
            include affiliate links to third-party financial products. We are not responsible
            for the content, accuracy or practices of third-party advertisers or affiliate
            partners.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">5. Limitation of Liability</h2>
          <p className="mt-2">
            Indian Calculator Hub, its owners and contributors shall not be liable for any
            direct, indirect, incidental or consequential damages arising from the use of, or
            inability to use, any calculator or content on this site.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">6. Changes to the Service</h2>
          <p className="mt-2">
            We reserve the right to modify, suspend or discontinue any part of the site at any
            time without prior notice.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">7. Governing Law</h2>
          <p className="mt-2">
            These Terms are governed by the laws of India. Any disputes shall be subject to the
            exclusive jurisdiction of Indian courts.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-slate-900">8. Contact</h2>
          <p className="mt-2">
            Questions about these Terms can be sent via our{' '}
            <a href="/contact" className="text-emerald-700 underline">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
