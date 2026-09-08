export type CalcCategory = 'finance' | 'tax' | 'health' | 'utility'

export interface CalcMeta {
  slug: string
  title: string
  shortTitle: string
  category: CalcCategory
  description: string
  keywords: string[]
}

export const categoryLabels: Record<CalcCategory, string> = {
  finance: 'Finance & Loan',
  tax: 'Tax & Salary',
  health: 'Health & Fitness',
  utility: 'Everyday Utility',
}

export const calculators: CalcMeta[] = [
  {
    slug: 'emi-calculator',
    title: 'EMI Calculator - Home, Car & Personal Loan',
    shortTitle: 'EMI Calculator',
    category: 'finance',
    description:
      'Calculate your monthly EMI, total interest and amortization schedule for home, car or personal loans.',
    keywords: ['emi calculator', 'home loan emi', 'car loan emi'],
  },
  {
    slug: 'sip-calculator',
    title: 'SIP Calculator - Mutual Fund SIP Returns',
    shortTitle: 'SIP Calculator',
    category: 'finance',
    description:
      'Estimate the future value of your monthly SIP investments with compounding mutual fund returns.',
    keywords: ['sip calculator', 'mutual fund sip', 'sip returns'],
  },
  {
    slug: 'compound-interest-calculator',
    title: 'Compound Interest Calculator',
    shortTitle: 'Compound Interest',
    category: 'finance',
    description:
      'Calculate compound interest on your investment with flexible compounding frequency.',
    keywords: ['compound interest calculator', 'ci calculator'],
  },
  {
    slug: 'simple-interest-calculator',
    title: 'Simple Interest Calculator',
    shortTitle: 'Simple Interest',
    category: 'finance',
    description: 'Calculate simple interest and total repayment amount on a loan or deposit.',
    keywords: ['simple interest calculator', 'si calculator'],
  },
  {
    slug: 'fd-calculator',
    title: 'FD Calculator - Fixed Deposit Maturity',
    shortTitle: 'FD Calculator',
    category: 'finance',
    description: 'Calculate maturity value and interest earned on your bank fixed deposit.',
    keywords: ['fd calculator', 'fixed deposit calculator'],
  },
  {
    slug: 'rd-calculator',
    title: 'RD Calculator - Recurring Deposit Maturity',
    shortTitle: 'RD Calculator',
    category: 'finance',
    description: 'Calculate the maturity amount of your monthly recurring deposit (RD).',
    keywords: ['rd calculator', 'recurring deposit calculator'],
  },
  {
    slug: 'ppf-calculator',
    title: 'PPF Calculator - Public Provident Fund',
    shortTitle: 'PPF Calculator',
    category: 'finance',
    description:
      'Estimate the maturity value of your PPF account based on yearly contributions.',
    keywords: ['ppf calculator', 'public provident fund calculator'],
  },
  {
    slug: 'nps-calculator',
    title: 'NPS Calculator - National Pension System',
    shortTitle: 'NPS Calculator',
    category: 'finance',
    description:
      'Estimate your NPS retirement corpus and expected monthly pension at retirement.',
    keywords: ['nps calculator', 'national pension scheme calculator'],
  },
  {
    slug: 'lumpsum-calculator',
    title: 'Lumpsum Investment Calculator',
    shortTitle: 'Lumpsum Calculator',
    category: 'finance',
    description:
      'Calculate the future value of a one-time lumpsum mutual fund investment.',
    keywords: ['lumpsum calculator', 'lumpsum investment calculator'],
  },
  {
    slug: 'cagr-calculator',
    title: 'CAGR Calculator - Compound Annual Growth Rate',
    shortTitle: 'CAGR Calculator',
    category: 'finance',
    description: 'Calculate the compound annual growth rate (CAGR) of your investment.',
    keywords: ['cagr calculator', 'compound annual growth rate'],
  },
  {
    slug: 'income-tax-calculator',
    title: 'Income Tax Calculator FY 2025-26 (New vs Old Regime)',
    shortTitle: 'Income Tax Calculator',
    category: 'tax',
    description:
      'Compare tax liability under the new and old tax regimes for FY 2025-26 (AY 2026-27).',
    keywords: ['income tax calculator', 'new vs old tax regime', 'tax calculator india'],
  },
  {
    slug: 'gst-calculator',
    title: 'GST Calculator',
    shortTitle: 'GST Calculator',
    category: 'tax',
    description: 'Calculate GST amount and total price - add or remove GST from any amount.',
    keywords: ['gst calculator', 'gst calculation india'],
  },
  {
    slug: 'hra-calculator',
    title: 'HRA Calculator - House Rent Allowance Exemption',
    shortTitle: 'HRA Calculator',
    category: 'tax',
    description:
      'Calculate your tax-exempt HRA amount based on salary, rent paid and city of residence.',
    keywords: ['hra calculator', 'hra exemption calculator'],
  },
  {
    slug: 'salary-calculator',
    title: 'In-Hand Salary Calculator - CTC to Take Home',
    shortTitle: 'Salary Calculator',
    category: 'tax',
    description:
      'Convert your CTC into monthly in-hand salary after PF, professional tax and income tax.',
    keywords: ['in hand salary calculator', 'ctc calculator', 'take home salary calculator'],
  },
  {
    slug: 'bmi-calculator',
    title: 'BMI Calculator - Body Mass Index',
    shortTitle: 'BMI Calculator',
    category: 'health',
    description: 'Calculate your Body Mass Index (BMI) and check your weight category.',
    keywords: ['bmi calculator', 'body mass index calculator'],
  },
  {
    slug: 'age-calculator',
    title: 'Age Calculator',
    shortTitle: 'Age Calculator',
    category: 'health',
    description: 'Calculate your exact age in years, months and days from your date of birth.',
    keywords: ['age calculator', 'date of birth age calculator'],
  },
  {
    slug: 'calorie-calculator',
    title: 'Calorie Calculator - Daily Calorie Needs',
    shortTitle: 'Calorie Calculator',
    category: 'health',
    description:
      'Estimate your daily calorie requirement based on age, gender, weight and activity level.',
    keywords: ['calorie calculator', 'daily calorie needs calculator'],
  },
  {
    slug: 'percentage-calculator',
    title: 'Percentage Calculator',
    shortTitle: 'Percentage Calculator',
    category: 'utility',
    description: 'Calculate percentages, percentage increase/decrease and percentage of a number.',
    keywords: ['percentage calculator', 'percent calculator'],
  },
  {
    slug: 'discount-calculator',
    title: 'Discount Calculator',
    shortTitle: 'Discount Calculator',
    category: 'utility',
    description: 'Calculate the final sale price and amount saved after a percentage discount.',
    keywords: ['discount calculator', 'sale price calculator'],
  },
  {
    slug: 'date-difference-calculator',
    title: 'Date Difference Calculator',
    shortTitle: 'Date Difference',
    category: 'utility',
    description: 'Calculate the number of days, months and years between two dates.',
    keywords: ['date difference calculator', 'days between dates calculator'],
  },
]

export function getCalcBySlug(slug: string): CalcMeta | undefined {
  return calculators.find((c) => c.slug === slug)
}

export function getRelatedCalculators(slug: string, count = 4): CalcMeta[] {
  const current = getCalcBySlug(slug)
  if (!current) return []
  const sameCategory = calculators.filter(
    (c) => c.slug !== slug && c.category === current.category,
  )
  const others = calculators.filter(
    (c) => c.slug !== slug && c.category !== current.category,
  )
  return [...sameCategory, ...others].slice(0, count)
}
