import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { type WorkCategory, workArchive, workCategories } from '@/lib/work-archive'

type Filter = 'All' | WorkCategory

const filters: Filter[] = ['All', ...workCategories]

export function ProofGallery() {
  const [filter, setFilter] = useState<Filter>('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const items = filter === 'All' ? workArchive : workArchive.filter(item => item.category === filter)
  const active = openIndex === null ? null : items[openIndex]

  const step = useCallback(
    (direction: 1 | -1) =>
      setOpenIndex(current => (current === null ? null : (current + direction + items.length) % items.length)),
    [items.length],
  )

  useEffect(() => {
    if (active === null) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenIndex(null)
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }

    // The lightbox covers the page, so the document behind it must not scroll.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [active, step])

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {filters.map(option => (
          <button
            key={option}
            type="button"
            onClick={() => {
              setFilter(option)
              setOpenIndex(null)
            }}
            aria-pressed={filter === option}
            className={
              filter === option
                ? 'border border-accent/50 bg-accent/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent'
                : 'border border-line/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg transition-colors hover:border-accent/30 hover:text-fg'
            }
          >
            {option}
            <span className="ml-2 text-muted-fg/70">
              {option === 'All' ? workArchive.length : workArchive.filter(item => item.category === option).length}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item.slug} delay={(index % 3) * 70}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="proof-card group h-full w-full text-left"
              aria-label={`View ${item.title} full size`}
            >
              <div className="proof-card-media">
                <img src={item.image} alt={item.alt} loading="lazy" width={item.width} height={item.height} />
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-accent/30 bg-background/85 text-accent opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <Maximize2 className="h-3.5 w-3.5" />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em]">
                  <span className="text-accent">{item.platform}</span>
                  <span className="text-muted-fg">{item.period}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug">{item.title}</h3>

                {item.metrics && (
                  <dl className="mt-4 grid grid-cols-3 gap-px border border-line/60 bg-line/60">
                    {item.metrics.map(metric => (
                      <div key={metric.label} className="bg-background/70 px-2 py-3 text-center">
                        <dt className="text-[9px] uppercase tracking-wider text-muted-fg">{metric.label}</dt>
                        <dd className="mt-1 font-display text-sm font-bold text-accent">{metric.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                <p className="mt-4 text-sm leading-6 text-muted-fg">{item.caption}</p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-md"
          onClick={() => setOpenIndex(null)}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line/60 px-5 py-4 sm:px-8">
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                {active.platform} <span className="text-muted-fg">· {active.period}</span>
              </div>
              <h2 className="mt-1 truncate font-display text-lg font-bold">{active.title}</h2>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg sm:block">
                {openIndex! + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={event => {
                  event.stopPropagation()
                  step(-1)
                }}
                aria-label="Previous"
                className="flex h-10 w-10 items-center justify-center border border-line/70 text-muted-fg transition-colors hover:border-accent/40 hover:text-accent"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={event => {
                  event.stopPropagation()
                  step(1)
                }}
                aria-label="Next"
                className="flex h-10 w-10 items-center justify-center border border-line/70 text-muted-fg transition-colors hover:border-accent/40 hover:text-accent"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center border border-accent/40 bg-accent/10 text-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-5 sm:p-8" onClick={event => event.stopPropagation()}>
            <img
              src={active.image}
              alt={active.alt}
              width={active.width}
              height={active.height}
              /* Never upscale: the full-page store capture is only 268px wide and
                 stretching it to the container would turn it to mush. */
              style={{ maxWidth: Math.min(active.width, 1024) }}
              className="mx-auto block h-auto w-full border border-line/70 bg-card"
            />
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-6 text-muted-fg">{active.caption}</p>
          </div>
        </div>
      )}
    </>
  )
}
