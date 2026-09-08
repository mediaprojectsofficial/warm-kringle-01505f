import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../lib/seo'

export const Route = createFileRoute('/privacy-policy')({
  head: () =>
    pageHead({
      title: 'Privacy Policy',
      description: 'Privacy Policy for Indian Calculator Hub - how we handle cookies, data and third-party advertising.',
      path: '/privacy-policy',
    }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="mt-2 text-xs text-slate-400">Last updated: September 2026</p>

      <div className="mt-6 space-y-6 text-sm leading-relaxed text-slate-600">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">1. Introduction</h2>
          <p className="mt-2">
            Indian Calculator Hub ("we", "us", "our") respects your privacy. This Privacy Policy
            explains what information we collect, how it is used, and your rights regarding
            that information when you use our website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">2. Information We Collect</h2>
          <p className="mt-2">
            All calculator inputs (loan amounts, salary figures, health data, etc.) are
            processed entirely within your browser and are never transmitted to or stored on our
            servers. If you submit our Contact form, we collect the name, email address and
            message you provide, solely to respond to your inquiry.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">3. Cookies &amp; Tracking Technologies</h2>
          <p className="mt-2">
            We use cookies and similar technologies to operate the site, remember preferences,
            analyze traffic (via tools such as Google Analytics) and serve relevant
            advertisements. You can control or disable cookies through your browser settings,
            though some site features may not function correctly without them.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">4. Third-Party Advertising (Google AdSense)</h2>
          <p className="mt-2">
            We use Google AdSense to display advertisements. Google and its partners may use
            cookies (including the DoubleClick cookie) to serve ads based on your prior visits
            to this and other websites. You may opt out of personalized advertising by visiting{' '}
            <a href="https://adssettings.google.com" className="text-emerald-700 underline">
              Google Ads Settings
            </a>
            , or by visiting{' '}
            <a href="https://www.aboutads.info" className="text-emerald-700 underline">
              www.aboutads.info
            </a>
            . Third-party vendors, including Google, use cookies to serve ads based on your
            visits to this site and other sites on the internet.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">5. Analytics</h2>
          <p className="mt-2">
            We may use Google Analytics or similar services to understand site usage patterns.
            These services may collect information such as your IP address, browser type and
            pages visited. This data is used in aggregate and is not linked to your calculator
            inputs.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">6. Data Security</h2>
          <p className="mt-2">
            We take reasonable measures to protect any information you voluntarily provide (such
            as through the Contact form). However, no method of transmission over the internet
            is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">7. Children's Privacy</h2>
          <p className="mt-2">
            Our site is not directed at children under 13, and we do not knowingly collect
            personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">8. Your Rights &amp; GDPR</h2>
          <p className="mt-2">
            If you are located in the European Economic Area, you have the right to access,
            correct, or request deletion of any personal data we hold about you (such as contact
            form submissions). Contact us to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">9. Changes to This Policy</h2>
          <p className="mt-2">
            We may update this Privacy Policy from time to time. Continued use of the site after
            changes are posted constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">10. Contact Us</h2>
          <p className="mt-2">
            For privacy-related questions, please reach us via our{' '}
            <a href="/contact" className="text-emerald-700 underline">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
