import { useState } from 'react'
import { Eye, Globe2, ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { SectionTitle } from '@/components/SectionTitle'

/** Drag-to-compare on pointer devices, stacked cards on small screens. */
export function FilteringReveal() {
  return (
    <>
      <section className="px-5 py-20 sm:px-6 md:hidden">
        <Reveal>
          <div className="text-center">
            <SectionTitle icon={Eye} label="Filtering Reveal" title="How Filtering Protects" accent="Traffic Quality" centered />
            <p className="mt-4 text-sm leading-6 text-muted-fg">The same two stages, built for smaller screens.</p>
          </div>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg space-y-4">
          <Reveal>
            <article className="border border-[#4c5c3e]/20 bg-[#f1f1ec] p-6 text-[#1b211c]">
              <div className="flex items-center justify-between gap-3">
                <div className="text-[10px] font-bold uppercase tracking-[.2em] text-[#4c5c3e]">01 / Validate</div>
                <ShieldCheck className="h-5 w-5 text-[#4c5c3e]" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold leading-tight">Invalid requests are filtered before they damage campaign data.</h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">Bot, fraud, and traffic-quality controls protect analytics and reduce wasted spend.</p>
            </article>
          </Reveal>
          <Reveal delay={80}>
            <article className="border border-accent/25 bg-[radial-gradient(circle_at_85%_20%,rgba(201,242,77,.2),transparent_35%),linear-gradient(145deg,#101a12,#0a0d0b)] p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="text-[10px] font-bold uppercase tracking-[.2em] text-accent">02 / Deliver</div>
                <Globe2 className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-white">Qualified visitors receive a relevant, responsive experience.</h3>
              <p className="mt-4 text-sm leading-6 text-muted-fg">Language, currency, and layout adapt while the offer, claims, pricing, and terms stay consistent.</p>
            </article>
          </Reveal>
        </div>
      </section>
      <div className="hidden md:block">
        <CloakComparison />
      </div>
    </>
  )
}

function CloakComparison() {
  const [position, setPosition] = useState(52)

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <SectionTitle icon={Eye} label="Filtering Reveal" title="How Filtering Protects" accent="Traffic Quality" centered />
            <p className="mt-4 text-muted-fg">Drag the divider: invalid traffic on one side, the qualified visitor experience on the other.</p>
          </div>
        </Reveal>
        <Reveal delay={120} className="mt-14">
          <div className="relative h-[430px] overflow-hidden border border-line/60 shadow-luxury">
            <div className="absolute inset-0 bg-[#f1f1ec] p-8 text-[#1b211c]">
              <div className="text-xs font-bold uppercase tracking-[.22em] text-[#4c5c3e]">Traffic Validation Layer</div>
              <div className="mt-16 max-w-lg font-display text-4xl font-bold">Bots, known fraud, and invalid requests are filtered before they damage the data.</div>
              <p className="mt-5 max-w-md text-sm leading-6 text-slate-600">Server-side rules protect analytics, reduce wasted spend, and keep campaign decisions grounded in higher-quality traffic.</p>
              <div className="mt-8 inline-flex rounded-full border border-[#4c5c3e]/30 px-4 py-2 text-xs font-semibold text-[#4c5c3e]">Filtered &amp; Monitored</div>
            </div>
            <div
              className="absolute inset-y-0 right-0 overflow-hidden bg-[radial-gradient(circle_at_70%_30%,rgba(201,242,77,.23),transparent_35%),linear-gradient(145deg,#101a12,#0a0d0b)]"
              style={{ width: `${100 - position}%` }}
            >
              <div className="absolute right-0 top-0 h-full w-[1100px] p-8 text-right">
                <div className="text-xs font-bold uppercase tracking-[.22em] text-accent">Qualified Visitor Experience</div>
                <div className="ml-auto mt-16 max-w-lg font-display text-4xl font-bold text-white">A relevant page for the visitor's market and intent.</div>
                <p className="ml-auto mt-5 max-w-md text-sm leading-6 text-muted-fg">Language, currency, examples, and layout can adapt while the core offer, claims, pricing, and terms remain consistent.</p>
                <div className="mt-8 inline-flex bg-accent-gradient px-4 py-2 text-xs font-bold text-background">Localized Landing Variant</div>
              </div>
            </div>
            <div className="absolute inset-y-0 w-px bg-accent shadow-[0_0_25px_rgba(201,242,77,.8)]" style={{ left: `${position}%` }}>
              <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent bg-background font-bold text-accent">⇆</div>
            </div>
            <input
              aria-label="Compare filtered traffic controls and the qualified visitor experience"
              type="range"
              min="12"
              max="88"
              value={position}
              onChange={event => setPosition(Number(event.target.value))}
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
            <div className="absolute bottom-5 left-5 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700">Filtered Traffic</div>
            <div className="absolute bottom-5 right-5 bg-background/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">Qualified Visitor</div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
