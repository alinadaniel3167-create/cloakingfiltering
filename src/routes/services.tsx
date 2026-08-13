import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Check, Gauge, Layers3, ShieldCheck, Sparkles, TrendingUp, Zap } from 'lucide-react'
import { Faq } from '@/components/Faq'
import { FilteringReveal } from '@/components/FilteringReveal'
import { Reveal } from '@/components/Reveal'
import { RoiCalculator } from '@/components/RoiCalculator'
import { SectionTitle } from '@/components/SectionTitle'
import { SITE_URL, TELEGRAM_URL } from '@/lib/site'

export const Route = createFileRoute('/services')({
  head: () => ({
    meta: [
      { title: 'Services & Pricing — Trustman Kareem' },
      {
        name: 'description',
        content:
          'Cloaking and traffic filtering for paid media, localized landing variants, and managed media buying — with the five-stage process, pricing tiers and answers to the questions operators ask first.',
      },
      { property: 'og:title', content: 'Services & Pricing — Trustman Kareem' },
      {
        property: 'og:description',
        content:
          'Traffic-quality infrastructure, geo-targeted funnels and managed media buying. Defined deliverables at every tier.',
      },
      { property: 'og:image', content: `${SITE_URL}/hero-bg.jpg` },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/services` }],
  }),
  component: Services,
})

const process = [
  ['01', 'Audit', 'Funnel, creatives and ad accounts reviewed for leak points and growth ceilings.'],
  ['02', 'Filter Architecture', 'A server-side layer for bot control, fraud reduction and policy-aware routing.'],
  ['03', 'Geo Deploy', 'Localized landing variants with consistent offers, currency and eligibility.'],
  ['04', 'Live Monitor', 'Traffic quality, network health and conversion tracking watched with fast alerts.'],
  ['05', 'Scale', 'Budget moves to the cleanest traffic and strongest customer cohorts.'],
]

const pricing = [
  {
    name: 'Starter Audit',
    price: '$750',
    cadence: 'one-time',
    desc: 'A focused diagnostic for operators preparing to scale.',
    features: ['Full funnel + ad account audit', 'Filtering and compliance assessment', '30-day growth roadmap', '60-minute strategy call'],
    cta: 'Book Audit',
  },
  {
    name: 'Growth Deploy',
    price: '$4,200',
    cadence: 'from · one-time',
    desc: 'A full filtering and localized delivery foundation, without enterprise overhead.',
    features: ['Custom filtering architecture', 'Geo-variant landing pages (3)', 'Traffic-quality monitoring', '45-day optimization window', 'Priority Telegram support'],
    cta: 'Start a Project',
    featured: true,
  },
  {
    name: 'Managed Scale',
    price: '$6,500',
    cadence: 'from · monthly',
    desc: 'Ongoing media buying and traffic-quality management for live campaigns.',
    features: ['Everything in Growth', 'Dedicated campaign lead', 'Daily traffic-quality monitoring', 'Weekly optimization sprints', 'Monthly strategy review'],
    cta: 'Discuss Scale',
  },
]

const faqs = [
  { q: 'What do cloaking and filtering mean here?', a: 'A server-side delivery layer that blocks bots and known fraud, applies legitimate geo and language rules, protects analytics, and serves relevant variants — while the offer, claims, pricing and terms stay identical.' },
  { q: 'Is it safe for my ad accounts?', a: 'It is, when it supports security, localization and privacy within platform policy. It is not used to deceive reviewers or show them a materially different offer.' },
  { q: 'Which networks do you support?', a: 'Meta, Google Ads, TikTok, Taboola, Outbrain, MGID, push networks and other major platforms. Each setup is built around that network’s technical and policy requirements.' },
  { q: 'What do you not work on?', a: 'No counterfeit or replica goods, scareware or BSOD pages, forced notification prompts, impersonation, deceptive call flows, or cloaking designed to evade reviewers.' },
  { q: 'How fast can you launch?', a: 'A standard deployment takes 5–7 business days. Multi-market builds with custom integrations take 10–14.' },
  { q: 'Do you offer refunds?', a: 'Audits are non-refundable. Managed services carry a 14-day performance guarantee — if benchmarks are missed, the management fee is refunded.' },
]

function Services() {
  return (
    <>
      <section className="border-b border-line/60 pt-28 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <Reveal>
            <SectionTitle as="h1" icon={Sparkles} label="Services" title="What It Takes To" accent="Scale Cleanly" />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-fg">
              Two engagements, both built for operators already spending. Everything below is the detail behind them —
              the process, the pricing, and the questions people ask before they commit.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.55fr_.8fr]">
            <Reveal>
              <article className="group relative overflow-hidden border border-accent/25 bg-card/80 p-8 shadow-luxury sm:p-10">
                <div className="absolute right-0 top-0 h-48 w-48 bg-accent/10 blur-3xl" />
                <div className="relative grid gap-10 md:grid-cols-[1fr_.8fr]">
                  <div>
                    <div className="icon-box"><ShieldCheck /></div>
                    <h2 className="mt-7 font-display text-3xl font-bold">Cloaking &amp; Filtering for Paid Traffic</h2>
                    <p className="mt-2 text-sm uppercase tracking-[0.2em] text-accent">Traffic quality, localization &amp; delivery control</p>
                    <p className="mt-5 leading-7 text-muted-fg">
                      Infrastructure built around your offer and traffic source: bots and invalid traffic filtered out, geo
                      and language rules applied, analytics protected, relevant landing variants delivered.
                    </p>
                  </div>
                  <div className="flex flex-col justify-between gap-7">
                    <ul className="space-y-4">
                      {['Bot and fraud filtering', 'Multi-network compatibility', 'Traffic-quality monitoring', 'Geo-targeted landing variants'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm"><Check className="h-4 w-4 text-accent" />{item}</li>
                      ))}
                    </ul>
                    <Link to="/audit" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
                      Request assessment <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
            <Reveal delay={120}>
              <article className="flex h-full min-h-80 flex-col justify-end border border-line/60 bg-[linear-gradient(145deg,rgba(45,66,38,.55),rgba(9,13,10,.85))] p-8">
                <Layers3 className="h-9 w-9 text-accent" />
                <h2 className="mt-7 font-display text-2xl font-bold">Advanced Cloaking &amp; Filtering Systems</h2>
                <p className="mt-4 text-sm leading-6 text-muted-fg">
                  Server-side systems for traffic validation, fraud reduction, localization and global delivery.
                </p>
                <div className="mt-8 text-[10px] uppercase tracking-[0.22em] text-accent">[ Valuable Filtering · Transparent Delivery · Better Data ]</div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="process" className="section-wash scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <SectionTitle icon={Gauge} label="Process" title="From Audit To" accent="Scale" centered />
              <p className="mt-4 text-muted-fg">Five stages, repeatable on every account.</p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border border-line/60 bg-line/60 md:grid-cols-5">
            {process.map(([step, title, body], index) => (
              <Reveal key={step} delay={index * 80} className="bg-background">
                <article className="group h-full p-7 transition-colors hover:bg-secondary/40">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-muted-fg">Step <span className="text-accent">{step}</span></div>
                  <div className="mt-8 font-display text-5xl font-bold text-accent/20 transition-colors group-hover:text-accent/45">{step}</div>
                  <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted-fg">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FilteringReveal />

      <section id="pricing" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <SectionTitle icon={Sparkles} label="Pricing" title="Built For Every" accent="Growth Stage" centered />
              <p className="mx-auto mt-4 max-w-xl text-muted-fg">Defined deliverables at every tier. Staged payments available on larger builds.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
            {pricing.map((tier, index) => (
              <Reveal key={tier.name} delay={index * 90}>
                <article className={`pricing-card ${tier.featured ? 'featured' : ''}`}>
                  {tier.featured && <div className="absolute right-5 top-0 -translate-y-1/2 bg-accent-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-background">Most Popular</div>}
                  <div className="text-xs uppercase tracking-[0.25em] text-accent">{tier.name}</div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold text-accent-gradient">{tier.price}</span>
                    <span className="text-xs text-muted-fg">{tier.cadence}</span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-fg">{tier.desc}</p>
                  <ul className="mt-7 flex-1 space-y-3">
                    {tier.features.map(feature => (
                      <li key={feature} className="flex items-start gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{feature}</li>
                    ))}
                  </ul>
                  <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className={tier.featured ? 'luxury-button mt-9' : 'luxury-button-outline mt-9'}>
                    {tier.cta}<ArrowRight className="h-4 w-4" />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wash py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <SectionTitle icon={TrendingUp} label="ROI Calculator" title="Model Your" accent="Upside" centered />
              <p className="mt-4 text-muted-fg">Estimate the impact using your current numbers.</p>
            </div>
          </Reveal>
          <Reveal delay={120} className="mt-12"><RoiCalculator /></Reveal>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <SectionTitle icon={Zap} label="FAQ" title="Common" accent="Questions" centered />
              <p className="mt-4 text-muted-fg">Straight answers, no fluff.</p>
            </div>
          </Reveal>
          <Reveal delay={120} className="mt-12"><Faq items={faqs} /></Reveal>
          <Reveal delay={160}>
            <div className="mt-12 flex flex-col items-center gap-4 border-t border-line/60 pt-10 sm:flex-row sm:justify-between">
              <p className="text-sm text-muted-fg">Still deciding? Start with the free audit — no cost, no pitch.</p>
              <Link to="/audit" className="luxury-button whitespace-nowrap">Claim my audit <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
