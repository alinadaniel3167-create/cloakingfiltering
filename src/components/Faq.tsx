import { useState } from 'react'

export interface FaqItem {
  q: string
  a: string
}

interface FaqProps {
  items: FaqItem[]
}

/**
 * Accessible accordion. Each row is a button controlling an associated
 * region; only one panel is open at a time.
 */
export function Faq({ items }: FaqProps) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="divide-y divide-line/80 overflow-hidden border border-line/60">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="bg-secondary/25">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left transition-colors hover:bg-secondary/50"
              >
                <span className="font-medium text-fg">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-xl text-accent transition-transform duration-300 ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              hidden={!isOpen}
              className="px-6 pb-7 pr-12 text-sm leading-relaxed text-muted-fg"
            >
              {item.a}
            </div>
          </div>
        )
      })}
    </div>
  )
}
