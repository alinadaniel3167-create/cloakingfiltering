import { useEffect, useRef } from 'react'

/**
 * A soft accent glow that trails the cursor on pointer-capable devices.
 * Renders nothing meaningful on touch / reduced-motion. Position is driven
 * imperatively via transform to stay off the React render path.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches) {
      el.style.display = 'none'
      return
    }
    el.style.opacity = '0'

    let raf = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      el.style.opacity = '1'
    }
    const loop = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}
