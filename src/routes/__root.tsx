import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import Header from '../components/site/Header'
import Footer from '../components/site/Footer'

import '../styles.css'

const SITE_URL = 'https://indiancalchub.online'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        title: 'Indian Calculator Hub - Free Financial, Health & Everyday Calculators',
      },
      {
        name: 'description',
        content:
          '20 free calculators for Indian users - EMI, SIP, Income Tax, GST, BMI, and more. Fast, accurate and mobile-friendly.',
      },
      { property: 'og:site_name', content: 'Indian Calculator Hub' },
      { name: 'theme-color', content: '#059669' },
    ],
    links: [{ rel: 'icon', href: '/favicon.png' }],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-slate-900">404 - Page Not Found</h1>
      <p className="mt-3 text-slate-600">
        The calculator or page you're looking for doesn't exist.
      </p>
      <a href="/" className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
        Go to Homepage
      </a>
    </div>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1428550393209506"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-emerald-600 focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <Header />
          <div id="main-content" className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Indian Calculator Hub',
              url: SITE_URL,
              logo: `${SITE_URL}/favicon.png`,
            }),
          }}
        />
        <Scripts />
      </body>
    </html>
  )
}
