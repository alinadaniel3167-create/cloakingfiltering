import { useMemo, useState } from 'react'

const money = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)

export function RoiCalculator() {
  const [budget, setBudget] = useState(25_000)
  const [roas, setRoas] = useState(8)
  const projection = useMemo(
    () => ({
      revenue: budget * roas,
      profit: budget * roas - budget,
      annual: budget * roas * 12,
    }),
    [budget, roas],
  )

  return (
    <div className="grid overflow-hidden border border-line/60 bg-card/70 shadow-luxury lg:grid-cols-2">
      <div className="p-7 sm:p-10">
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Inputs</div>
        <div className="mt-9 space-y-10">
          <Slider
            id="roi-budget"
            label="Monthly Ad Budget"
            value={budget}
            min={2_000}
            max={250_000}
            step={1_000}
            display={money(budget)}
            minLabel="$2K"
            maxLabel="$250K"
            onChange={setBudget}
          />
          <Slider
            id="roi-roas"
            label="Target ROAS"
            value={roas}
            min={2}
            max={18}
            step={0.5}
            display={`${roas}x`}
            minLabel="2x baseline"
            maxLabel="18x elite"
            onChange={setRoas}
          />
        </div>
      </div>
      <div className="relative flex flex-col justify-center border-t border-line/60 bg-[radial-gradient(circle_at_70%_20%,rgba(238,188,74,.14),transparent_35%),rgba(2,24,63,.36)] p-7 sm:p-10 lg:border-l lg:border-t-0">
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Projection</div>
        <div className="mt-7 text-xs uppercase tracking-[0.18em] text-muted-fg">Projected Monthly Revenue</div>
        <div className="mt-2 font-display text-[clamp(2.25rem,6vw,3.75rem)] font-bold leading-none text-gold-gradient">{money(projection.revenue)}</div>
        <div className="mt-9 grid grid-cols-2 gap-6 border-t border-line/60 pt-7">
          <div><div className="text-xs text-muted-fg">Net Profit</div><div className="mt-1 font-display text-2xl font-bold">{money(projection.profit)}</div></div>
          <div><div className="text-xs text-muted-fg">Annualized</div><div className="mt-1 font-display text-2xl font-bold">{money(projection.annual)}</div></div>
        </div>
        <p className="mt-8 text-xs leading-5 text-muted-fg">Projections are based on historical client benchmarks. Actual results depend on offer, vertical, and creative strategy.</p>
      </div>
    </div>
  )
}

function Slider({ id, label, value, min, max, step, display, minLabel, maxLabel, onChange }: { id: string; label: string; value: number; min: number; max: number; step: number; display: string; minLabel: string; maxLabel: string; onChange: (value: number) => void }) {
  const percentage = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="mb-3 flex items-end justify-between gap-4"><label htmlFor={id} className="text-sm text-muted-fg">{label}</label><span className="font-display text-2xl font-bold text-gold">{display}</span></div>
      <input id={id} aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="h-1.5 w-full cursor-pointer appearance-none outline-none focus-visible:ring-2 focus-visible:ring-gold/50 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-gold [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold" style={{ background: `linear-gradient(90deg, #eebc4a ${percentage}%, #142234 ${percentage}%)` }} />
      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-muted-fg"><span>{minLabel}</span><span>{maxLabel}</span></div>
    </div>
  )
}
