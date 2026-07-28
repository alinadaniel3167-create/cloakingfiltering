import { useEffect, useRef } from 'react'

interface ParticlesProps {
  count?: number
  className?: string
}

/**
 * Ambient field of slow-drifting gold flecks. Purely decorative, rendered
 * client-side after mount so SSR output stays clean. Positions are seeded
 * deterministically per index so there's no layout jump.
 */
export function Particles({ count = 22, className = '' }: ParticlesProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = ref.current
    if (!host) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const frag = document.createDocumentFragment()
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('span')
      const size = 1 + ((i * 37) % 3)
      const left = (i * 53) % 100
      const duration = 16 + ((i * 17) % 20)
      const delay = -((i * 31) % 24)
      dot.style.cssText = `position:absolute;bottom:-10px;left:${left}%;width:${size}px;height:${size}px;border-radius:9999px;background:rgba(212,175,95,0.65);box-shadow:0 0 6px rgba(212,175,95,0.5);animation:drift ${duration}s linear ${delay}s infinite;`
      frag.appendChild(dot)
    }
    host.appendChild(frag)
    return () => {
      host.innerHTML = ''
    }
  }, [count])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    />
  )
}
