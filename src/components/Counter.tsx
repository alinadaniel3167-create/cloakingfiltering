import { useEffect, useRef, useState } from 'react'

interface CounterProps {
  to: number
  /** digits after the decimal point */
  decimals?: number
  prefix?: string
  suffix?: string
  durationMs?: number
  className?: string
}

/**
 * Animates a number from 0 to `to` the first time it enters the viewport.
 * Uses requestAnimationFrame with an easeOutExpo curve.
 */
export function Counter({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
  durationMs = 1600,
  className = '',
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / durationMs, 1)
          const eased = 1 - Math.pow(2, -10 * t)
          setValue(to * (t === 1 ? 1 : eased))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [to, durationMs])

  const display = value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
