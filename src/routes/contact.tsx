import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { pageHead } from '../lib/seo'

export const Route = createFileRoute('/contact')({
  head: () =>
    pageHead({
      title: 'Contact Us',
      description: 'Get in touch with the Indian Calculator Hub team for feedback, questions or partnership queries.',
      path: '/contact',
    }),
  component: ContactPage,
})

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&')
}

function ContactPage() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '', 'bot-field': '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...fields }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
      <p className="mt-3 text-sm text-slate-600">
        Have a question, feedback, or a calculator request? Fill out the form below or email us
        at <a href="mailto:hello@indiancalculatorhub.com" className="text-emerald-700 underline">hello@indiancalculatorhub.com</a>.
      </p>

      {status === 'done' ? (
        <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-800">
          Thanks for reaching out! We'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Don't fill this out: <input name="bot-field" value={fields['bot-field']} onChange={handleChange} />
            </label>
          </p>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
            <input id="name" name="name" required value={fields.name} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
            <input id="email" name="email" type="email" required value={fields.email} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-700">Subject</label>
            <input id="subject" name="subject" value={fields.subject} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
            <textarea id="message" name="message" required rows={5} value={fields.message} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'error' && <p className="text-sm text-red-600">Something went wrong. Please try emailing us directly.</p>}
        </form>
      )}
    </div>
  )
}
