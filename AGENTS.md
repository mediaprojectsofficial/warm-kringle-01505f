# AGENTS.md

Overview of the project structure for developers and AI agents working on this codebase.

## Project Overview

**Indian Calculator Hub** — a collection of 20 financial, tax, health and everyday calculators
for Indian users, built as an SEO-optimized, AdSense-ready static/SSR site. Every calculator
has its own dedicated route with real Indian-standard formulas (RBI EMI formula, FY 2025-26 tax
slabs, WHO BMI ranges, Mifflin-St Jeor calorie equation, etc.), a "How to use" section, a
formula explanation, an FAQ accordion with `FAQPage` schema, and related-calculator links.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start (file-based routing, SSR) |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Forms | Netlify Forms (contact form) |
| Language | TypeScript 5.9 |
| Deployment | Netlify |

## Directory Structure

```
├── public/
│   ├── ads.txt              # AdSense ads.txt placeholder — update with real pub- ID
│   ├── robots.txt            # Points crawlers at /sitemap.xml
│   └── __forms.html          # Static skeleton so Netlify detects the React contact form at build time
├── src/
│   ├── lib/
│   │   ├── calc-data.ts      # Registry of all 20 calculators: slug, title, category, description
│   │   ├── format.ts         # INR currency / number formatting helpers
│   │   └── seo.ts            # pageHead() helper — title, meta description, OG/Twitter tags, canonical
│   ├── components/site/
│   │   ├── Header.tsx        # Site header, nav, category dropdown, mobile menu
│   │   ├── Footer.tsx        # Footer with quick links, categories, legal pages
│   │   ├── AdSlot.tsx         # Placeholder AdSense ad unit (header/in-content/sidebar/footer variants)
│   │   ├── CalcLayout.tsx    # Shared calculator page shell: breadcrumbs, JSON-LD schema
│   │   │                       (BreadcrumbList/WebApplication/FAQPage), ad slots, how-to-use,
│   │   │                       formula section, affiliate banner, FAQ, related calculators
│   │   ├── Faq.tsx            # Accordion FAQ component
│   │   ├── Field.tsx          # Form Field/Select/ResultStat primitives shared by all calculators
│   │   └── RelatedCalculators.tsx
│   └── routes/
│       ├── __root.tsx        # Root HTML shell, global meta, Header/Footer wrap, Organization schema
│       ├── index.tsx         # Homepage: search + category filter + calculator grid
│       ├── <slug>-calculator.tsx  # One file per calculator (20 total) — see below
│       ├── about.tsx / contact.tsx / privacy-policy.tsx / terms.tsx / disclaimer.tsx
│       ├── blog/              # index.tsx + long-form SEO articles
│       └── sitemap.xml.ts    # Server route generating sitemap.xml from calc-data.ts
```

## The 20 Calculators

Finance & Loan: `emi-calculator`, `sip-calculator`, `compound-interest-calculator`,
`simple-interest-calculator`, `fd-calculator`, `rd-calculator`, `ppf-calculator`,
`nps-calculator`, `lumpsum-calculator`, `cagr-calculator`.

Tax & Salary: `income-tax-calculator`, `gst-calculator`, `hra-calculator`, `salary-calculator`.

Health & Fitness: `bmi-calculator`, `age-calculator`, `calorie-calculator`.

Everyday Utility: `percentage-calculator`, `discount-calculator`, `date-difference-calculator`.

Each calculator route follows the same pattern: local `useState`/`useMemo` for inputs and
computed results, wrapped in `<CalcLayout>` which supplies SEO head tags (set via each route's
`head()` using `pageHead()`), schema markup, ad slots and the FAQ/related sections. To add a
21st calculator: add an entry to `src/lib/calc-data.ts`, then create
`src/routes/<slug>.tsx` following an existing calculator (e.g. `sip-calculator.tsx`) as a
template — the sitemap picks it up automatically.

## Conventions

- **Currency formatting**: always use `formatINR()` / `formatNumber()` from `src/lib/format.ts`
  — never hand-roll `toLocaleString`.
- **SEO**: every route sets `head: () => pageHead({ title, description, path })` — do not set
  raw `meta` arrays directly on new pages.
- **Ads**: use `<AdSlot variant="header|in-content|sidebar|footer" />` rather than embedding raw
  ad markup, so placement stays consistent with AdSense policy (adequate spacing, no
  accidental-click layouts). The real `<ins class="adsbygoogle">` unit and AdSense client/slot
  IDs still need to be filled in before going live (see comments in `AdSlot.tsx` and
  `__root.tsx`).
- **Formulas**: kept inline in each calculator route (not abstracted into a shared "engine")
  since each one is short and formula-specific; comments cite the source convention (RBI,
  Income Tax Department FY 2025-26 slabs, PFRDA, WHO, Mifflin-St Jeor) where non-obvious.

## Development Commands

```bash
npm run dev      # Start dev server (or: netlify dev --port 8889)
npm run build    # Production build
```

## Known Placeholders to Replace Before Production

- `public/ads.txt` — replace `pub-0000000000000000` with the real AdSense publisher ID.
- `src/routes/__root.tsx` — replace `ca-pub-XXXXXXXXXXXXXXX` in the AdSense script tag.
- `src/components/site/AdSlot.tsx` — insert the real `<ins class="adsbygoogle">` unit per slot.
- `src/lib/seo.ts` — `SITE_URL` should match the final production domain.
- Contact page email address and social links in `Footer.tsx`.
