import { createFileRoute } from '@tanstack/react-router'
import { calculators } from '../lib/calc-data'

const SITE_URL = 'https://indiancalculatorhub.netlify.app'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          '/',
          '/about',
          '/contact',
          '/blog',
          '/blog/how-sip-works',
          '/blog/new-vs-old-tax-regime',
          '/privacy-policy',
          '/terms',
          '/disclaimer',
        ]
        const calcPaths = calculators.map((c) => `/${c.slug}`)
        const allPaths = [...staticPaths, ...calcPaths]

        const urls = allPaths
          .map(
            (path) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
          )
          .join('\n')

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

        return new Response(xml, {
          headers: { 'Content-Type': 'application/xml' },
        })
      },
    },
  },
})
