import { Link } from '@tanstack/react-router'
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Gauge,
  Globe2,
  Monitor,
  Smartphone,
  Target,
  TrendingUp,
} from 'lucide-react'
import { Reveal } from '@/components/Reveal'

const improvements = [
  'Responsive landing variants for mobile and desktop',
  'Bot and invalid-traffic filtering before attribution',
  'Consistent offer, claims, pricing, and disclosures',
  'Geo-aware language, currency, and eligibility details',
]

const dashboardMetrics = [
  { label: 'Blended ROAS', value: '7.1x', change: '90 days', icon: TrendingUp },
  { label: 'Reported revenue', value: '$2.4M', change: 'portfolio', icon: CircleDollarSign },
  { label: 'Peak daily spend', value: '$41K', change: 'scaled', icon: Target },
]

export function CampaignShowcase() {
  return (
    <section id="work" className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_.8fr]">
            <div>
              <div className="section-badge"><Activity className="h-3 w-3" /> Selected Work</div>
              <h2 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                A Campaign Rebuilt For <span className="text-gold-gradient">Clean Scale</span>
              </h2>
            </div>
            <div className="lg:pb-2">
              <p className="max-w-xl leading-7 text-muted-fg">
                An anonymized portfolio example showing how traffic validation, responsive landing design, and clearer campaign measurement work together.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em]">
                <span className="border border-gold/25 bg-gold/5 px-3 py-2 text-gold">Anonymized case</span>
                <span className="border border-line/70 px-3 py-2 text-muted-fg">Meta + Google</span>
                <span className="border border-line/70 px-3 py-2 text-muted-fg">Tier-1 markets</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
          <Reveal className="min-w-0">
            <article className="overflow-hidden border border-line/70 bg-[#040b14] shadow-luxury">
              <div className="flex items-center justify-between border-b border-line/70 bg-[#07111d] px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b5f]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#eebc4a]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#52c77a]" />
                </div>
                <div className="hidden rounded-full border border-line/70 bg-background/50 px-5 py-1.5 text-[10px] tracking-[0.16em] text-muted-fg sm:block">
                  CAMPAIGN CONTROL / LIVE VIEW
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live
                </div>
              </div>

              <div className="grid lg:grid-cols-[.82fr_1.18fr]">
                <div className="border-b border-line/70 p-5 sm:p-7 lg:border-b-0 lg:border-r">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-fg">Before</div>
                      <h3 className="mt-2 font-display text-2xl font-bold">Leaky funnel</h3>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center border border-rose-400/20 bg-rose-400/5 text-rose-300">
                      <Gauge className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-7 overflow-hidden border border-line/70 bg-[#e9e5db] text-[#17202a] opacity-80">
                    <div className="flex items-center gap-1.5 border-b border-black/10 bg-[#d7d2c7] px-3 py-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
                      <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
                      <span className="ml-2 text-[8px] text-black/40">generic-offer.page</span>
                    </div>
                    <div className="p-5">
                      <div className="h-2 w-16 bg-black/15" />
                      <div className="mt-5 h-4 w-4/5 bg-black/25" />
                      <div className="mt-2 h-4 w-3/5 bg-black/25" />
                      <div className="mt-5 space-y-2">
                        <div className="h-2 w-full bg-black/10" />
                        <div className="h-2 w-11/12 bg-black/10" />
                        <div className="h-2 w-4/5 bg-black/10" />
                      </div>
                      <div className="mt-6 h-8 w-28 bg-[#59616a]" />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <Stat label="Attribution" value="Unstable" tone="bad" />
                    <Stat label="Traffic quality" value="Unverified" tone="bad" />
                  </div>
                  <p className="mt-5 text-sm leading-6 text-muted-fg">
                    One generic page, weak mobile hierarchy, mixed traffic quality, and unreliable attribution made scaling decisions expensive.
                  </p>
                </div>

                <div className="relative overflow-hidden bg-[radial-gradient(circle_at_80%_15%,rgba(238,188,74,.15),transparent_30%),#030912] p-5 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-gold">After</div>
                      <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Responsive conversion system</h3>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-fg">
                      <Monitor className="h-4 w-4 text-gold" /> Desktop
                      <span className="text-line">/</span>
                      <Smartphone className="h-4 w-4 text-gold" /> Mobile
                    </div>
                  </div>

                  <div className="relative mt-7 min-h-[330px] sm:min-h-[370px]">
                    <div className="absolute inset-x-0 top-0 overflow-hidden border border-gold/20 bg-[#07111d] shadow-[0_25px_70px_rgba(0,0,0,.45)] sm:right-12">
                      <div className="flex items-center justify-between border-b border-line/70 px-3 py-2">
                        <div className="flex items-center gap-2 text-[8px] uppercase tracking-wider text-muted-fg"><Globe2 className="h-3 w-3 text-gold" /> US / EN / USD</div>
                        <div className="text-[8px] text-emerald-400">Traffic verified</div>
                      </div>
                      <div className="grid min-h-[235px] items-center gap-5 p-5 sm:grid-cols-[1.1fr_.9fr] sm:p-6">
                        <div>
                          <div className="text-[8px] font-bold uppercase tracking-[0.22em] text-gold">Funded trading, rebuilt</div>
                          <div className="mt-3 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">Trade with more capital. Keep more upside.</div>
                          <div className="mt-3 max-w-xs text-[10px] leading-5 text-muted-fg">Clear qualification details, localized pricing, consistent terms, and fast mobile performance.</div>
                          <div className="mt-5 inline-flex bg-gold-gradient px-4 py-2 text-[9px] font-bold uppercase tracking-wider text-background">Check eligibility</div>
                        </div>
                        <div className="hidden border border-line/70 bg-background/60 p-4 sm:block">
                          <div className="flex items-center justify-between text-[8px] text-muted-fg"><span>Account growth</span><span className="text-emerald-400">+184%</span></div>
                          <div className="mt-5 flex h-24 items-end gap-2">
                            {[30, 42, 38, 55, 64, 78, 92].map((height, index) => (
                              <span key={height} className={index === 6 ? 'flex-1 bg-gold' : 'flex-1 bg-gold/25'} style={{ height: `${height}%` }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 right-0 w-[42%] min-w-[145px] max-w-[190px] rounded-[1.4rem] border border-gold/35 bg-[#02060d] p-2 shadow-[0_25px_70px_rgba(0,0,0,.65)]">
                      <div className="overflow-hidden rounded-[1rem] border border-line/70 bg-[#07111d]">
                        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-line" />
                        <div className="px-3 pb-4 pt-5">
                          <div className="text-[7px] uppercase tracking-[0.2em] text-gold">Qualified visitor</div>
                          <div className="mt-2 font-display text-base font-bold leading-tight text-white">A faster path to funded trading.</div>
                          <div className="mt-3 h-20 bg-[radial-gradient(circle_at_70%_25%,rgba(238,188,74,.3),transparent_35%),linear-gradient(145deg,#0d2744,#06101b)]" />
                          <div className="mt-3 space-y-1.5"><div className="h-1.5 w-full bg-white/10" /><div className="h-1.5 w-4/5 bg-white/10" /></div>
                          <div className="mt-4 bg-gold-gradient px-2 py-2 text-center text-[7px] font-bold uppercase tracking-wider text-background">Start assessment</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={120} className="min-w-0">
            <aside className="flex h-full flex-col border border-line/70 bg-secondary/25 p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gold">90-day snapshot</div>
                  <h3 className="mt-2 font-display text-2xl font-bold">Performance pulse</h3>
                </div>
                <CircleDollarSign className="h-8 w-8 text-gold/70" />
              </div>

              <div className="mt-7 space-y-3">
                {dashboardMetrics.map(({ label, value, change, icon: Icon }) => (
                  <div key={label} className="flex items-center justify-between border border-line/60 bg-background/45 p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center bg-gold/8 text-gold"><Icon className="h-4 w-4" /></span>
                      <div><div className="text-[10px] uppercase tracking-wider text-muted-fg">{label}</div><div className="mt-1 font-display text-xl font-bold">{value}</div></div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400">{change}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 border-t border-line/60 pt-6">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-fg">What changed</div>
                <ul className="mt-4 space-y-3">
                  {improvements.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-muted-fg">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-gold" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-8">
                <Link to="/case-studies/$slug" params={{ slug: 'crypto-prop-trading-scale' }} className="luxury-button w-full">
                  Read full case study <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-3 text-center text-[10px] leading-5 text-muted-fg">
                  Client identity is redacted. Interface visuals are a representative reconstruction of the workflow.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value, tone }: { label: string; value: string; tone: 'bad' | 'good' }) {
  return (
    <div className="border border-line/60 bg-background/45 p-3">
      <div className="text-[9px] uppercase tracking-wider text-muted-fg">{label}</div>
      <div className={`mt-1 font-display text-xl font-bold ${tone === 'bad' ? 'text-rose-300' : 'text-emerald-400'}`}>{value}</div>
    </div>
  )
}
