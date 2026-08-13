import { useEffect, useRef, useState } from 'react'
import { TELEGRAM_URL } from '@/lib/site'

const STORAGE_KEY = 'telegram-cta-position'
const EDGE_GAP = 12
const HEADER_OFFSET = 86
const DRAG_THRESHOLD = 4

function readSavedPosition() {
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function savePosition(position: number) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(position))
  } catch {}
}

function clampPosition(position: number, height: number) {
  const maximumPosition = Math.max(
    HEADER_OFFSET,
    window.innerHeight - height - EDGE_GAP,
  )

  return Math.min(Math.max(position, HEADER_OFFSET), maximumPosition)
}

function TelegramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="relative h-7 w-7 -translate-x-0.5 fill-current"
    >
      <path d="M23.91 3.79 20.3 20.84c-.27 1.21-.98 1.51-1.98.94l-5.5-4.05-2.65 2.55c-.29.29-.54.54-1.11.54l.39-5.61L19.66 6c.44-.39-.1-.61-.68-.22L6.36 13.72.92 12.02c-1.18-.37-1.2-1.18.25-1.75L22.44 2.08c.98-.36 1.84.24 1.47 1.71Z" />
    </svg>
  )
}

export function FloatingTelegramCta() {
  const widgetRef = useRef<HTMLAnchorElement>(null)
  const pointerStartRef = useRef(0)
  const positionStartRef = useRef(0)
  const movedRef = useRef(false)
  const suppressClickRef = useRef(false)
  const [position, setPosition] = useState<number | null>(null)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const widget = widgetRef.current
    if (!widget) return

    const savedPosition = readSavedPosition()
    const storedPosition = savedPosition === null ? NaN : Number(savedPosition)
    const initialPosition = Number.isFinite(storedPosition)
      ? storedPosition
      : window.innerHeight * 0.58

    setPosition(clampPosition(initialPosition, widget.offsetHeight))
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const widget = widgetRef.current
      if (!widget) return

      setPosition((current) =>
        current === null
          ? current
          : clampPosition(current, widget.offsetHeight),
      )
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const startDragging = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    const widget = widgetRef.current
    if (!widget) return

    pointerStartRef.current = event.clientY
    positionStartRef.current = widget.getBoundingClientRect().top
    movedRef.current = false
    suppressClickRef.current = false
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
  }

  const moveWidget = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const widget = widgetRef.current
    if (!dragging || !widget) return

    const distance = event.clientY - pointerStartRef.current
    if (Math.abs(distance) >= DRAG_THRESHOLD) {
      movedRef.current = true
    }

    if (movedRef.current) {
      setPosition(
        clampPosition(positionStartRef.current + distance, widget.offsetHeight),
      )
    }
  }

  const stopDragging = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!dragging) return

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    suppressClickRef.current = movedRef.current
    setDragging(false)

    const finalPosition = widgetRef.current?.getBoundingClientRect().top
    if (finalPosition !== undefined) {
      savePosition(finalPosition)
    }
  }

  const cancelDragging = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    movedRef.current = false
    suppressClickRef.current = true
    setDragging(false)
  }

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!suppressClickRef.current) return

    event.preventDefault()
    suppressClickRef.current = false
  }

  const moveWithKeyboard = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return

    const widget = widgetRef.current
    if (!widget) return

    event.preventDefault()
    const direction = event.key === 'ArrowUp' ? -24 : 24
    const nextPosition = clampPosition(
      (position ?? widget.getBoundingClientRect().top) + direction,
      widget.offsetHeight,
    )

    setPosition(nextPosition)
    savePosition(nextPosition)
  }

  return (
    <a
      ref={widgetRef}
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      aria-label="Chat on Telegram. Drag up or down to move this button."
      title="Chat on Telegram — drag to move"
      onClick={handleClick}
      onDragStart={(event) => event.preventDefault()}
      onPointerDown={startDragging}
      onPointerMove={moveWidget}
      onPointerUp={stopDragging}
      onPointerCancel={cancelDragging}
      onKeyDown={moveWithKeyboard}
      className={`group fixed right-3 z-[60] flex h-16 w-16 touch-none select-none items-center justify-center rounded-full border-2 border-accent/70 bg-[#229ed9] text-white shadow-[0_12px_42px_rgba(34,158,217,0.38)] outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:right-5 ${dragging ? 'cursor-grabbing scale-95' : 'cursor-ns-resize'}`}
      style={{ top: position ?? '58vh' }}
    >
      <span className="pointer-events-none absolute right-full mr-3 hidden translate-x-1 whitespace-nowrap border border-line/70 bg-background/95 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-fg opacity-0 shadow-luxury backdrop-blur-xl transition-[opacity,transform] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
        Chat on Telegram
      </span>
      <span className="absolute inset-1 rounded-full border border-white/25" />
      <TelegramIcon />
      <span className="absolute right-0.5 top-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-accent" />
    </a>
  )
}
