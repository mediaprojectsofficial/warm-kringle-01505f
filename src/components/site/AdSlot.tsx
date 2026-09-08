interface AdSlotProps {
  variant?: 'header' | 'in-content' | 'sidebar' | 'footer'
  className?: string
}

const labels: Record<string, string> = {
  header: 'Advertisement',
  'in-content': 'Advertisement',
  sidebar: 'Advertisement',
  footer: 'Advertisement',
}

const sizeClasses: Record<string, string> = {
  header: 'min-h-[90px]',
  'in-content': 'min-h-[120px]',
  sidebar: 'min-h-[250px]',
  footer: 'min-h-[90px]',
}

/**
 * Placeholder AdSense ad unit slot. Replace the inner comment with the real
 * <ins class="adsbygoogle"> unit and data-ad-slot id once approved.
 */
export default function AdSlot({ variant = 'in-content', className = '' }: AdSlotProps) {
  return (
    <div
      className={`flex w-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-400 ${sizeClasses[variant]} ${className}`}
      role="complementary"
      aria-label="Advertisement space"
      data-ad-slot={variant}
    >
      {labels[variant]}
      {/* AdSense unit goes here: <ins class="adsbygoogle" data-ad-client="ca-pub-XXXXXXXXXXXXXXX" data-ad-slot="XXXXXXXXXX" /> */}
    </div>
  )
}
