interface MarqueeProps {
  items: string[]
  className?: string
}

/**
 * Infinite horizontal marquee. Duplicates the item list so the CSS
 * translateX(-50%) loop is seamless. Pauses on hover.
 */
export function Marquee({ items, className = '' }: MarqueeProps) {
  const row = [...items, ...items]
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className="marquee-track items-center gap-10 py-1">
        {row.map((item, i) => (
          <div key={i} className="flex shrink-0 items-center gap-10">
            <span className="whitespace-nowrap font-serif text-lg tracking-wide text-muted-fg">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-accent/50" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  )
}
