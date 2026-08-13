import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  BarChart3,
  Check,
  Clock3,
  Eye,
  Gauge,
  Globe2,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { ContactForms } from '@/components/ContactForms'
import { ReviewSummaryBadge } from '@/components/ClientProofReviews'
import { Reveal } from '@/components/Reveal'
import { SectionTitle } from '@/components/SectionTitle'
import { SITE_URL, TELEGRAM_URL } from '@/lib/site'
import { verticals } from '@/lib/verticals'
import { featuredWork, workArchive } from '@/lib/work-archive'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Trustman Kareem — Cloaking, Filtering & Media Buying' },
      {
        name: 'description',
        content:
          'Compliance-aware cloaking, traffic filtering, geo-targeted funnels, and managed media buying for e-commerce, crypto, regulated gaming, wellness, mobile, travel, and call-driven campaigns.',
      },
      {
        property: 'og:title',
        content:
          'Investor Trustman Kareem — Cloaking, Filtering & Performance Advertising',
      },
      {
        property: 'og:description',
        content:
          'Custom filtering systems, geo-targeted funnels, and managed media buying across specialist performance verticals, with clear compliance and traffic-quality standards.',
      },
      { property: 'og:image', content: `${SITE_URL}/hero-bg.jpg` },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/` }],
  }),
  component: Home,
})

const metrics = [
  ['1,200+', 'Campaigns Managed'],
  ['18x', 'Peak ROAS Achieved'],
  ['94%', 'Client Retention'],
  ['$45M+', 'Revenue Generated'],
]

const ticker = [
  'Campaign #4821 — Crypto / DE — 14.2x ROAS',
  'Campaign #4815 — DTC / US — $48K/day',
  'Campaign #4807 — Finance / UK — CPL -71%',
  'Campaign #4799 — Nutra / AU — 9.8x ROAS',
  'Campaign #4790 — E-com / CA — $22K profit / 24h',
  'Campaign #4783 — Crypto / SG — 17.4x ROAS',
]

const strengths: Array<{ icon: LucideIcon; label: string }> = [
  { icon: Target, label: 'Precision ROI' },
  { icon: TrendingUp, label: 'Rapid Scaling' },
  { icon: ShieldCheck, label: 'Cloaking & Filtering' },
  { icon: Globe2, label: 'Elite Network' },
]

const services: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: ShieldCheck,
    title: 'Cloaking & Filtering',
    body: 'A server-side layer that keeps bots, fraud and invalid clicks out of your campaign data.',
  },
  {
    icon: Globe2,
    title: 'Localized Funnels',
    body: 'Geo-aware landing variants — language, currency and eligibility change, the offer does not.',
  },
  {
    icon: Gauge,
    title: 'Managed Media Buying',
    body: 'Weekly optimization sprints that move budget toward the cleanest traffic and best cohorts.',
  },
]

const caseStudies = [
  ['E-Commerce DTC', '12.4x', '$1.8M', 'Filtering plus localized variants took daily spend from $2K to $60K in 21 days.'],
  ['Financial Offers', '8.7x', '$920K', 'Policy-aware filtering cut invalid traffic and lowered reported CPL by 63%.'],
  ['Crypto / Web3', '15.2x', '$2.4M', 'Geo-specific delivery held the offer constant while lifting relevance across Tier-1 markets.'],
]

const insights = [
  ['Strategy', '8 min', 'The 2026 Cloaker Playbook', '/playbook'],
  ['Networks', '6 min', 'Traffic Filtering on TikTok', '/guides/tiktok-ads-cloaking'],
  ['Markets', '5 min', 'Filtering for Global Markets', '/case-studies'],
] as const

function Home() {
  return (
    <>
      <section className="hero-bg relative min-h-[700px] overflow-hidden pt-20 sm:min-h-[760px] sm:pt-24">
        <img src="/hero-bg.jpg" alt="" aria-hidden="true" className="duotone absolute inset-0 h-full w-full object-cover object-center opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0d0b_0%,rgba(10,13,11,.9)_42%,rgba(10,13,11,.4)_78%,#0a0d0b_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,11,.25),rgba(10,13,11,.1)_55%,#0a0d0b)]" />
        <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-center gap-12 px-5 py-12 sm:min-h-[600px] sm:px-6 sm:py-16 lg:grid-cols-[1.35fr_.65fr] lg:px-8">
          <div className="max-w-4xl">
            <Reveal>
              <div className="section-badge"><Zap className="h-3 w-3" /> Performance Strategist</div>
              <h1 className="mt-7 max-w-3xl font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight min-[390px]:text-[2.9rem] sm:text-6xl lg:text-[4.5rem]">
                Cloaking &amp; Filtering<span className="hidden sm:inline"><br /></span> That Scales <span className="text-accent-gradient">Ad ROI</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-fg">
                Traffic-quality infrastructure, localized funnels and managed media buying for advertisers scaling on the toughest platforms.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="luxury-button">Book Strategy Call <Send className="h-4 w-4" /></a>
                <Link to="/case-studies" className="luxury-button-outline">View Results <TrendingUp className="h-4 w-4" /></Link>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-fg">
                <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> Confidential consultation</span>
                <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-accent" /> Clear next steps</span>
                <span className="inline-flex items-center gap-2"><Globe2 className="h-4 w-4 text-accent" /> Worldwide service</span>
              </div>
              <ReviewSummaryBadge />
            </Reveal>
          </div>
          <Reveal delay={160} className="hidden lg:block">
            <aside className="relative overflow-hidden border border-accent/25 bg-background/70 p-7 shadow-luxury backdrop-blur-xl">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">Private Strategy Desk</span>
                  <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_rgba(201,242,77,.9)]" />
                </div>
                <h2 className="mt-7 font-display text-2xl font-bold">Start with clarity, not a sales pitch.</h2>
                <p className="mt-4 text-sm leading-6 text-muted-fg">Share your offer, spend and growth constraint. You get a direct read on fit, scope and the next move.</p>
                <div className="mt-7 space-y-3 border-t border-line/60 pt-6">
                  {['Private one-to-one conversation', 'Scope and deliverables defined first', 'No obligation before mutual fit'].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm"><Check className="h-4 w-4 shrink-0 text-accent" />{item}</div>
                  ))}
                </div>
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="mt-7 flex items-center justify-between border border-accent/30 bg-accent/10 px-4 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent/15">
                  Open Telegram <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 border-y border-line/60 bg-background/55 px-6 backdrop-blur-md lg:grid-cols-4 lg:px-8">
          {metrics.map(([value, label]) => (
            <div key={label} className="border-line/60 px-4 py-7 text-center even:border-l lg:border-l lg:first:border-l-0">
              <div className="font-display text-3xl font-bold text-accent-gradient sm:text-4xl">{value}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="marquee overflow-hidden border-b border-line/60 bg-secondary/40 py-4">
        <div className="marquee-track gap-10 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] text-muted-fg">
          {[...ticker, ...ticker].map((item, index) => <span key={`${item}-${index}`} className="flex items-center gap-10"><span>{item}</span><span className="text-accent">●</span></span>)}
        </div>
      </div>

      <section id="about" className="relative scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
          <Reveal className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 border border-accent/15" />
            <img src="/kareem-logo.jpg" alt="Investor Trustman Kareem monogram" className="duotone relative aspect-square w-full object-cover shadow-luxury" />
            <div className="absolute -bottom-7 -right-5 border border-accent/30 bg-background/95 px-6 py-4 shadow-luxury">
              <span className="font-display text-3xl font-bold text-accent-gradient">07+</span>
              <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-fg">Years Scaling</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionTitle icon={Eye} label="About" title="Investor" accent="Trustman Kareem" />
            <p className="mt-8 text-lg leading-8 text-muted-fg">A performance strategist for founders, funds and category leaders — building the filtering, localization and measurement layer that lets paid media scale without surprises.</p>
            <p className="mt-5 leading-7 text-muted-fg">Server-side filtering, fraud control, geo-aware delivery and weekly optimization. The core offer never changes; every legitimate visitor simply gets a clearer version of it.</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {strengths.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 border border-line/60 bg-secondary/30 px-4 py-4 text-sm font-medium"><Icon className="h-4 w-4 text-accent" />{label}</div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="services" className="section-wash scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <SectionTitle icon={Sparkles} label="Services" title="Three Layers," accent="One System" />
                <p className="mt-5 max-w-xl text-muted-fg">Built for operators already spending. Full scope, process and pricing on the services page.</p>
              </div>
              <Link to="/services" className="luxury-button-outline whitespace-nowrap">Explore Services <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {services.map(({ icon: Icon, title, body }, index) => (
              <Reveal key={title} delay={index * 90}>
                <Link to="/services" className="group flex h-full flex-col border border-line/60 bg-secondary/25 p-7 transition-all hover:-translate-y-1 hover:border-accent/35">
                  <div className="icon-box"><Icon /></div>
                  <h3 className="mt-6 font-display text-xl font-bold">{title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-fg">{body}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent transition-transform group-hover:translate-x-1">
                    Details <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="markets" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <SectionTitle icon={Globe2} label="Markets Served" title="Specialist Experience Across" accent="Performance Verticals" />
                <p className="mt-5 max-w-xl text-muted-fg">Six verticals, one core of custom filtering. Three of them below.</p>
              </div>
              <Link to="/markets" className="luxury-button-outline whitespace-nowrap">All Six Markets <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {verticals.slice(0, 3).map(({ icon: Icon, eyebrow, title, body, image, alt, niches, slug }, index) => (
              <Reveal key={slug} delay={index * 90}>
                <Link to="/markets" hash={slug} className="niche-card group">
                  <div className="niche-card-media">
                    <img src={image} alt={alt} loading="lazy" width={1200} height={675} />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(10,13,11,.9))]" />
                    <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center border border-accent/30 bg-background/80 text-accent backdrop-blur-sm transition-transform duration-300 group-hover:-rotate-6">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{eyebrow}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold leading-tight">{title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted-fg">{body}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {niches.map(niche => <span key={niche} className="niche-chip">{niche}</span>)}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="results" className="section-wash scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <SectionTitle icon={BarChart3} label="Case Studies" title="Data That" accent="Speaks" centered />
              <p className="mt-4 text-muted-fg">Live campaign results, client names redacted.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {caseStudies.map(([vertical, roas, spend, copy], index) => (
              <Reveal key={vertical} delay={index * 100}>
                <article className="result-card">
                  <div className="text-xs uppercase tracking-[0.24em] text-accent">{vertical}</div>
                  <div className="mt-8 font-display text-5xl font-bold text-accent-gradient">{roas}</div>
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-fg">ROAS</div>
                  <div className="mt-8 border-t border-line/60 pt-6">
                    <div className="text-xs text-muted-fg">Ad Spend</div>
                    <div className="mt-1 font-display text-2xl font-bold">{spend}</div>
                  </div>
                  <p className="mt-6 text-sm leading-6 text-muted-fg">{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120} className="mt-12">
            {/* A thin strip of real captures — the depth lives on /proof, this is
                only here so the front page is not entirely self-reported numbers. */}
            <Link to="/proof" className="group block border border-line/60 bg-background/50 p-5 transition-colors hover:border-accent/35 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Working archive</div>
                  <p className="mt-2 text-sm text-muted-fg">
                    {workArchive.length} unretouched captures from the live accounts behind this work.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
                  Open archive <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {featuredWork.map(item => (
                  <span key={item.slug} className="proof-card-media border border-line/50">
                    <img src={item.image} alt={item.alt} loading="lazy" width={item.width} height={item.height} />
                  </span>
                ))}
              </div>
            </Link>
          </Reveal>
          <div className="mt-10 text-center">
            <Link to="/case-studies" className="luxury-button-outline">Selected work &amp; client proof <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section id="insights" className="py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line/60 pb-6">
              <h2 className="font-display text-2xl font-bold">Field notes</h2>
              <Link to="/playbook" className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent hover:underline">Read the playbook</Link>
            </div>
          </Reveal>
          <div className="grid gap-px bg-line/50 md:grid-cols-3">
            {insights.map(([tag, read, title, to], index) => (
              <Reveal key={title} delay={index * 80} className="bg-background">
                <Link to={to} className="group flex h-full flex-col justify-between gap-6 p-6 transition-colors hover:bg-secondary/30">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
                    <span className="text-accent">{tag}</span>
                    <span className="flex items-center gap-1 text-muted-fg"><Clock3 className="h-3 w-3" />{read}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold leading-snug transition-colors group-hover:text-accent">{title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <SectionTitle icon={Zap} label="Get In Touch" title="Ready To" accent="Scale?" centered />
              <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-fg">Share where the business stands and what is blocking growth. You get a direct read on fit and next steps.</p>
              <div className="mx-auto mt-7 flex max-w-3xl flex-wrap justify-center gap-3">
                <span className="trust-pill"><ShieldCheck className="h-3.5 w-3.5" /> Confidential brief</span>
                <span className="trust-pill"><Send className="h-3.5 w-3.5" /> Direct Telegram access</span>
                <span className="trust-pill"><Clock3 className="h-3.5 w-3.5" /> Clear response and next steps</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120} className="mt-12"><ContactForms /></Reveal>
        </div>
      </section>
    </>
  )
}
