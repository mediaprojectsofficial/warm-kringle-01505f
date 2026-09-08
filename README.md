# Indian Calculator Hub

A fast, mobile-responsive collection of 20 free financial, tax, health and everyday calculators
built for Indian users — EMI, SIP, Income Tax (new vs old regime), GST, HRA, BMI, Age, Calorie
and more. Built to be Google AdSense-ready with SEO structured data, a sitemap, and legal/trust
pages.

## Key Technologies

- [TanStack Start](https://tanstack.com/start) (file-based routing + SSR) on React 19
- [Tailwind CSS 4](https://tailwindcss.com/) for styling
- [Vite 7](https://vitejs.dev/) for the build
- [Netlify Forms](https://docs.netlify.com/forms/setup/) for the contact form
- Deployed on [Netlify](https://www.netlify.com/)

## Features

- 20 dedicated calculator pages, each with real-time results, a breakdown table, a "how to use"
  guide, a formula explanation, an FAQ accordion and related-calculator links
- Homepage with search and category filtering across all calculators
- JSON-LD structured data (`WebApplication`, `FAQPage`, `BreadcrumbList`, `Organization`,
  `WebSite`) on every page for rich search results
- Auto-generated `sitemap.xml`, plus `robots.txt` and `ads.txt`
- AdSense-ready ad slots (header, in-content, sidebar, footer) with policy-safe spacing
- Privacy Policy, Terms & Conditions, Disclaimer, About and Contact pages
- Fully responsive, accessible (keyboard-navigable, ARIA-labelled) design

## Running Locally

```bash
npm install
npm run dev
```

This starts the Vite dev server (see `package.json` for the exact port). To emulate the full
Netlify platform (forms, redirects, etc.) locally instead, use:

```bash
netlify dev --port 8889
```

## Building

```bash
npm run build
```

Outputs a production build to `dist/client`, deployed automatically by Netlify per
`netlify.toml`.

See [AGENTS.md](./AGENTS.md) for the full project structure, calculator list and conventions.
