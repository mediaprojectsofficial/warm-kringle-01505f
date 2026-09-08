export function formatINR(value: number, maxDecimals = 0): string {
  if (!isFinite(value)) return '₹0'
  return (
    '₹' +
    value.toLocaleString('en-IN', {
      maximumFractionDigits: maxDecimals,
      minimumFractionDigits: 0,
    })
  )
}

export function formatNumber(value: number, maxDecimals = 2): string {
  if (!isFinite(value)) return '0'
  return value.toLocaleString('en-IN', { maximumFractionDigits: maxDecimals })
}

export function round2(value: number): number {
  return Math.round(value * 100) / 100
}
