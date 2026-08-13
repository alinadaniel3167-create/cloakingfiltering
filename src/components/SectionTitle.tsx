import type { LucideIcon } from 'lucide-react'

export function SectionTitle({
  icon: Icon,
  label,
  title,
  accent,
  centered = false,
  as: Heading = 'h2',
}: {
  icon: LucideIcon
  label: string
  title: string
  accent: string
  centered?: boolean
  /** Page-level headings pass "h1" — one per page. */
  as?: 'h1' | 'h2'
}) {
  return (
    <div className={centered ? 'flex flex-col items-center' : ''}>
      <div className="section-badge">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <Heading className="mt-6 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
        {title} <span className="text-accent-gradient">{accent}</span>
      </Heading>
    </div>
  )
}
