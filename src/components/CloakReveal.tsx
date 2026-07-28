import { useState } from 'react'

interface CloakRevealProps {
  safeLabel?: string
  moneyLabel?: string
  safe: {
    title: string
    body: string
    tag: string
  }
  money: {
    title: string
    body: string
    tag: string
  }
}

/** Compares a protected core experience with a responsible localized variant. */
export function CloakReveal({
  safeLabel = 'Protected core',
  moneyLabel = 'Localized variant',
  safe,
  money,
}: CloakRevealProps) {
  const [showMoney, setShowMoney] = useState(false)
  const active = showMoney ? money : safe

  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <div className="flex items-center gap-2 text-xs text-muted-fg">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono tracking-tight">/offer</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={showMoney}
          aria-label="Toggle between the protected core and localized variant"
          onClick={() => setShowMoney((v) => !v)}
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em]"
        >
          <span className={showMoney ? 'text-muted-fg' : 'text-gold'}>
            {safeLabel}
          </span>
          <span className="relative h-5 w-10 rounded-full border border-gold/40 bg-ink-800">
            <span
              className="absolute top-0.5 h-3.5 w-3.5 rounded-full bg-gold transition-transform duration-300"
              style={{
                transform: showMoney ? 'translateX(22px)' : 'translateX(3px)',
              }}
            />
          </span>
          <span className={showMoney ? 'text-gold' : 'text-muted-fg'}>
            {moneyLabel}
          </span>
        </button>
      </div>

      <div className="relative">
        <div
          key={showMoney ? 'money' : 'safe'}
          className="relative overflow-hidden px-6 py-8"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/10 to-transparent"
            style={{ animation: 'shimmer 0.9s ease-out' }}
          />
          <span
            className={`inline-block rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${
              showMoney
                ? 'border-gold/50 text-gold'
                : 'border-line text-muted-fg'
            }`}
          >
            {active.tag}
          </span>
          <h4 className="mt-4 font-serif text-2xl font-semibold">
            {active.title}
          </h4>
          <p className="mt-3 max-w-xl leading-relaxed text-muted-fg">
            {active.body}
          </p>
        </div>
      </div>
    </div>
  )
}
