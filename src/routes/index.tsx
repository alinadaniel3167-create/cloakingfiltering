import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  BarChart3,
  Bitcoin,
  Check,
  Clock3,
  FlaskConical,
  Gamepad2,
  Eye,
  Gauge,
  Globe2,
  Layers3,
  PhoneCall,
  Send,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import { ContactForms } from '@/components/ContactForms'
import { CampaignShowcase } from '@/components/CampaignShowcase'
import { ClientProofReviews, ReviewSummaryBadge } from '@/components/ClientProofReviews'
import { Faq } from '@/components/Faq'
import { Reveal } from '@/components/Reveal'
import { RoiCalculator } from '@/components/RoiCalculator'
import { SITE_URL, TELEGRAM_URL } from '@/lib/site'

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

const process = [
  ['01', 'Audit', 'Deep-dive your funnel, creatives, and ad accounts. Identify leak points and growth ceilings.'],
  ['02', 'Filter Architecture', 'Build a server-side cloaking and filtering layer for bot control, fraud reduction, geo delivery, and policy-aware routing.'],
  ['03', 'Geo Deploy', 'Launch transparent geo-specific landing variants with consistent offers, localized language, currency, and eligibility.'],
  ['04', 'Live Monitor', 'Monitor traffic quality, bot signals, network health, landing consistency, and conversion tracking with rapid alerts.'],
  ['05', 'Scale', 'Scale the cleanest traffic and strongest customer cohorts with documented performance and compliance guardrails.'],
]

const verticals: Array<{
  icon: LucideIcon
  eyebrow: string
  title: string
  body: string
  niches: string[]
}> = [
  {
    icon: ShoppingBag,
    eyebrow: 'Commerce',
    title: 'E-commerce & Consumer Products',
    body: 'Cloaking and traffic filtering keep bots and invalid clicks out of full-funnel acquisition, giving products sharper positioning, cleaner attribution, and market-specific landing experiences.',
    niches: ['DTC & retail', 'Beauty & apparel', 'Electronics', 'Subscription offers'],
  },
  {
    icon: Bitcoin,
    eyebrow: 'Digital Assets',
    title: 'Crypto, Web3 & Financial Offers',
    body: 'Cloaking and filtering drive geo-aware campaign systems for lawful, supportable offers, with accurate risk language, eligibility controls, and measurable lead quality.',
    niches: ['Crypto platforms', 'Web3 products', 'Prop trading', 'Fintech lead generation'],
  },
  {
    icon: Gamepad2,
    eyebrow: 'Gaming',
    title: 'Regulated Gambling & Gaming',
    body: 'Age-gated, location-aware cloaking and filtering for licensed operators and gaming brands, built around jurisdiction and platform requirements.',
    niches: ['Licensed sportsbooks', 'Online casino', 'Social gaming', 'Gaming subscriptions'],
  },
  {
    icon: FlaskConical,
    eyebrow: 'Wellness',
    title: 'Peptides, Nutra & CBD',
    body: 'Cloaking and traffic filtering underpin careful campaign architecture for legally marketable wellness products, including claims review, audience qualification, and regional restrictions.',
    niches: ['Peptide brands', 'Nutraceuticals', 'CBD products', 'Health subscriptions'],
  },
  {
    icon: PhoneCall,
    eyebrow: 'Lead Generation',
    title: 'Travel, Calls & Service Funnels',
    body: 'Cloaking and filtering qualify lead and call generation for transparent service businesses with clear identity, pricing context, consent, and customer support.',
    niches: ['Flights & travel', 'Home services', 'Insurance leads', 'Legitimate tech support'],
  },
  {
    icon: Smartphone,
    eyebrow: 'Mobile',
    title: 'Apps, Push & Native Acquisition',
    body: 'Mobile-first cloaking and filtering for funnels and campaign scripts designed around informed opt-in, responsive landing pages, and accurate conversion measurement.',
    niches: ['iOS & Android apps', 'Opt-in push', 'Native ads', 'Mobile subscriptions'],
  },
]

const caseStudies = [
  ['E-Commerce DTC', '12.4x', '$1.8M', 'Traffic filtering and localized funnel variants supported a scale from $2K → $60K/day in 21 days.'],
  ['Financial Offers', '8.7x', '$920K', 'Policy-aware filtering reduced invalid traffic and helped lower reported CPL by 63%.'],
  ['Crypto / Web3', '15.2x', '$2.4M', 'Geo-specific cloaked delivery kept the core offer consistent while improving relevance across Tier-1 markets.'],
]

const pricing = [
  {
    name: 'Starter Audit',
    price: '$950',
    cadence: 'one-time',
    desc: 'A focused diagnostic for early-stage teams and operators preparing to scale.',
    features: ['Full funnel + ad account audit', 'Filtering and compliance assessment', '30-day growth roadmap', '60-minute strategy call'],
    cta: 'Book Audit',
  },
  {
    name: 'Growth Deploy',
    price: '$4,800',
    cadence: 'from · one-time',
    desc: 'A complete filtering and localized delivery foundation without enterprise-level overhead.',
    features: ['Custom filtering architecture', 'Geo-variant landing pages (3)', 'Traffic-quality monitoring', '45-day optimization window', 'Priority Telegram support'],
    cta: 'Start a Project',
    featured: true,
  },
  {
    name: 'Managed Scale',
    price: '$7,500',
    cadence: 'from · monthly',
    desc: 'Ongoing media buying and traffic-quality management for established campaigns ready to grow.',
    features: ['Everything in Growth', 'Dedicated campaign lead', 'Daily traffic-quality monitoring', 'Weekly optimization sprints', 'Monthly strategy review'],
    cta: 'Discuss Scale',
  },
]

const testimonials = [
  { quote: 'The campaign audit gave us a clear plan, cleaner reporting, and a much stronger launch sequence.', name: 'Marcus Chen', role: 'Growth Lead, Financial Services', result: '3.1x ROAS', service: 'Campaign audit', rating: 5 },
  { quote: 'The filtering infrastructure reduced low-quality traffic and gave us the stability to scale past our previous ceiling.', name: 'Elena Voss', role: 'Founder, DTC Commerce', result: '-41% invalid traffic', service: 'Cloaking & filtering', rating: 5 },
  { quote: 'Our landing pages became faster, clearer, and much better aligned with the intent behind each campaign.', name: 'Daniel Brooks', role: 'Marketing Director, SaaS', result: '+68% conversion rate', service: 'Landing page optimization', rating: 5 },
  { quote: 'The domain and infrastructure rebuild removed recurring launch friction and made every deployment easier to manage.', name: 'Sofia Martins', role: 'Operations Lead, Mobile Apps', result: '99.9% uptime', service: 'Domain & infrastructure', rating: 5 },
  { quote: 'Weekly optimization decisions became more disciplined, and spend moved toward the audiences producing real value.', name: 'Omar Rahman', role: 'Media Buyer, Gaming', result: '-34% cost per lead', service: 'Media buying', rating: 5 },
  { quote: 'The team translated a complex international funnel into a simple, measurable system across several markets.', name: 'Claire Bennett', role: 'Commercial Lead, Travel', result: '5 markets launched', service: 'Other', rating: 5 },
]

const faqs = [
  { q: 'What do cloaking and filtering mean in this portfolio?', a: 'They mean a server-side delivery and traffic-quality layer used to block bots and known fraud, apply legitimate geo or language rules, protect analytics, and serve relevant variants while keeping the core offer, claims, pricing, and terms consistent.' },
  { q: 'Is cloaking safe for my ad accounts?', a: 'It can be valuable when it supports security, localization, privacy, and transparent content delivery within platform policies. It should not be used to deceive reviewers or show them a materially different offer.' },
  { q: 'Which ad networks do you support?', a: 'Facebook/Meta, Google Ads, TikTok, Taboola, Outbrain, MGID, native push networks, and other major buying platforms. Each filtering setup is designed around the network’s technical requirements and current advertising policies.' },
  { q: 'What verticals do you work with?', a: 'E-commerce, crypto and Web3, regulated gambling and gaming, peptides, nutra, CBD, travel and flight offers, mobile apps, opt-in push, native media, and legitimate call-driven services. Every engagement is reviewed for legality, platform suitability, accurate claims, and customer safety.' },
  { q: 'Do you run replica products, BSOD pages, or deceptive tech-support campaigns?', a: 'No. Counterfeit or replica goods, scareware or BSOD simulations, forced notification prompts, impersonation, deceptive call flows, and reviewer-evasion cloaking are outside the operating standard. The portfolio focuses on lawful offers, transparent customer journeys, and traffic-quality infrastructure.' },
  { q: 'Do you offer refunds?', a: 'Initial strategy audits are non-refundable. Managed services include a 14-day performance guarantee — if benchmarks are not met, we refund the management fee.' },
  { q: 'How fast can you launch?', a: 'A standard cloaking and filtering deployment usually takes 5–7 business days. Larger custom builds with multiple markets and integrations typically take 10–14 days.' },
  { q: 'What geos do you cover?', a: 'Global. We deploy geo-specific landing variants for Tier-1, Tier-2, and Tier-3 markets simultaneously.' },
]

const insights = [
  ['Strategy', '8 min', 'The 2026 Cloaker Playbook', 'How valuable cloaking and filtering improve traffic quality, localization, measurement, and durable paid-media growth.', '/playbook'],
  ['Networks', '6 min', 'Traffic Filtering on TikTok', 'A 2026 guide to bot control, fraud reduction, localized delivery, landing consistency, and customer-quality measurement.', '/guides/tiktok-ads-cloaking'],
  ['Markets', '5 min', 'Filtering for Global Markets', 'How geo rules, language, currency, eligibility, and traffic validation support responsible international scale.', '/case-studies'],
] as const

function Home() {
  return (
    <>
      <section className="hero-bg relative min-h-[700px] overflow-hidden pt-20 sm:min-h-[760px] sm:pt-24">
        <img src="/hero-bg.jpg" alt="Gold-lit performance advertising workspace" className="absolute inset-0 h-full w-full object-cover object-center opacity-35" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#02060d_0%,rgba(2,6,13,.88)_40%,rgba(2,6,13,.3)_78%,#02060d_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,13,.2),rgba(2,6,13,.1)_55%,#02060d)]" />
        <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-center gap-12 px-5 py-12 sm:min-h-[600px] sm:px-6 sm:py-16 lg:grid-cols-[1.35fr_.65fr] lg:px-8">
          <div className="max-w-4xl">
            <Reveal>
              <div className="section-badge"><Zap className="h-3 w-3" /> Elite Performance Strategist</div>
              <h1 className="mt-7 max-w-4xl font-display text-[2.5rem] font-bold leading-[1.05] tracking-tight min-[390px]:text-[2.75rem] sm:text-6xl lg:text-[4.75rem]">
                Elite Cloaking, Filtering<span className="hidden sm:inline"><br /></span> &amp; Performance Advertising<span className="hidden sm:inline"><br /></span> <span className="text-gold-gradient">Solutions</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-fg sm:text-xl">
                Protecting traffic quality, localizing customer experiences, and scaling paid media with measurable performance and clear operating standards.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="luxury-button">Book Strategy Call <Send className="h-4 w-4" /></a>
                <a href="#results" className="luxury-button-outline">View Results <TrendingUp className="h-4 w-4" /></a>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-fg">
                <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> Confidential consultation</span>
                <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-gold" /> Clear next steps</span>
                <span className="inline-flex items-center gap-2"><Globe2 className="h-4 w-4 text-gold" /> Worldwide service</span>
              </div>
              <ReviewSummaryBadge />
            </Reveal>
          </div>
          <Reveal delay={160} className="hidden lg:block">
            <aside className="relative overflow-hidden border border-gold/25 bg-background/70 p-7 shadow-luxury backdrop-blur-xl">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">Private Strategy Desk</span>
                  <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_16px_rgba(238,188,74,.9)]" />
                </div>
                <h2 className="mt-7 font-display text-2xl font-bold">Start with clarity, not a sales pitch.</h2>
                <p className="mt-4 text-sm leading-6 text-muted-fg">Share your offer, current spend, and growth constraint. You receive a direct assessment of fit, scope, and the most practical next move.</p>
                <div className="mt-7 space-y-3 border-t border-line/60 pt-6">
                  {['Private one-to-one conversation', 'Scope and deliverables defined first', 'No obligation before mutual fit'].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm"><Check className="h-4 w-4 shrink-0 text-gold" />{item}</div>
                  ))}
                </div>
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="mt-7 flex items-center justify-between border border-gold/30 bg-gold/10 px-4 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold/15">
                  Open Telegram <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 border-y border-line/60 bg-background/55 px-6 backdrop-blur-md lg:grid-cols-4 lg:px-8">
          {metrics.map(([value, label]) => (
            <div key={label} className="border-line/60 px-4 py-7 text-center even:border-l lg:border-l lg:first:border-l-0">
              <div className="font-display text-3xl font-bold text-gold-gradient sm:text-4xl">{value}</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-fg sm:text-xs">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="marquee overflow-hidden border-b border-line/60 bg-secondary/40 py-4">
        <div className="marquee-track gap-10 whitespace-nowrap text-xs uppercase tracking-[0.18em] text-muted-fg">
          {[...ticker, ...ticker].map((item, index) => <span key={`${item}-${index}`} className="flex items-center gap-10"><span>{item}</span><span className="text-gold">●</span></span>)}
        </div>
      </div>

      <section id="about" className="relative py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
          <Reveal className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 border border-gold/15" />
            <img src="/kareem-logo.jpg" alt="Investor Trustman Kareem gold monogram" className="relative aspect-square w-full object-cover shadow-luxury" />
            <div className="absolute -bottom-7 -right-5 border border-gold/30 bg-background/95 px-6 py-4 shadow-luxury">
              <span className="font-display text-3xl font-bold text-gold-gradient">07+</span>
              <span className="ml-3 text-xs uppercase tracking-[0.2em] text-muted-fg">Years Scaling</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionTitle icon={Eye} label="About" title="Investor" gold="Trustman Kareem" />
            <p className="mt-8 text-lg leading-8 text-muted-fg">An elite digital marketing strategist specializing in performance advertising, compliance-aware cloaking, and traffic filtering. Trustman partners with founders, funds, and category leaders to protect traffic quality, localize customer journeys, and build systems that scale predictably.</p>
            <p className="mt-5 leading-7 text-muted-fg">Every campaign combines server-side filtering, bot and fraud controls, geo-aware delivery, audience intelligence, and continuous optimization. The core offer remains consistent while each legitimate visitor receives a clearer, more relevant experience.</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {strengths.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 border border-line/60 bg-secondary/30 px-4 py-4 text-sm font-medium"><Icon className="h-4 w-4 text-gold" />{label}</div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="services" className="section-wash py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal><div className="text-center"><SectionTitle icon={Sparkles} label="Services" title="Premium" gold="Solutions" centered /><p className="mt-4 text-muted-fg">High-value services engineered for serious operators.</p></div></Reveal>
          <div className="mt-16 grid gap-6 lg:grid-cols-[1.55fr_.8fr]">
            <Reveal>
              <article className="group relative overflow-hidden border border-gold/25 bg-card/80 p-8 shadow-luxury sm:p-10">
                <div className="absolute right-0 top-0 h-48 w-48 bg-gold/10 blur-3xl" />
                <div className="relative grid gap-10 md:grid-cols-[1fr_.8fr]">
                  <div><div className="icon-box"><ShieldCheck /></div><h3 className="mt-7 font-display text-3xl font-bold">Cloaking &amp; Filtering for Paid Traffic</h3><p className="mt-2 text-sm uppercase tracking-[0.2em] text-gold">Traffic quality, localization &amp; delivery control</p><p className="mt-5 leading-7 text-muted-fg">End-to-end infrastructure customized to your offer, vertical, and traffic source. Filter bots and invalid traffic, apply legitimate geo and language rules, protect analytics, and deliver relevant landing variants without changing the truth of the offer.</p></div>
                  <div className="flex flex-col justify-between gap-7"><ul className="space-y-4">{['Bot and fraud filtering', 'Multi-network compatibility', 'Traffic-quality monitoring', 'Geo-targeted landing variants'].map(item => <li key={item} className="flex items-center gap-3 text-sm"><Check className="h-4 w-4 text-gold" />{item}</li>)}</ul><a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold">Request assessment <ArrowRight className="h-4 w-4" /></a></div>
                </div>
              </article>
            </Reveal>
            <Reveal delay={120}>
              <article className="flex h-full min-h-80 flex-col justify-end border border-line/60 bg-[linear-gradient(145deg,rgba(20,44,85,.55),rgba(3,9,21,.85))] p-8">
                <Layers3 className="h-9 w-9 text-gold" /><h3 className="mt-7 font-display text-2xl font-bold">Advanced Cloaking &amp; Filtering Systems</h3><p className="mt-4 text-sm leading-6 text-muted-fg">Server-side infrastructure engineered for traffic validation, fraud reduction, localization, analytics protection, and global campaign delivery.</p><div className="mt-8 text-[10px] uppercase tracking-[0.22em] text-gold">[ Valuable Filtering · Transparent Delivery · Better Data ]</div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="verticals" className="relative overflow-hidden py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_.72fr] lg:items-end">
              <div>
                <SectionTitle icon={Globe2} label="Markets Served" title="Specialist Experience Across" gold="Performance Verticals" />
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted-fg sm:text-lg">
                  Buyers should recognize their niche immediately. Every vertical is served with the same core of custom cloaking and traffic filtering, paired with vertical-specific messaging, traffic-source strategy, localized delivery, measurement, and customer-quality controls.
                </p>
              </div>
              <div className="border-l border-gold/30 pl-6 text-sm leading-6 text-muted-fg">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.24em] text-gold">Engagement standard</span>
                Restricted categories are assessed case by case. The offer must be lawful, supportable, accurately represented, and suitable for the chosen market and network.
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
            {verticals.map(({ icon: Icon, eyebrow, title, body, niches }, index) => (
              <Reveal key={title} delay={(index % 3) * 80} className={index === 0 || index === 5 ? 'lg:col-span-7' : 'lg:col-span-5'}>
                <article className="group relative h-full overflow-hidden border border-line/60 bg-secondary/25 p-6 transition-all hover:-translate-y-1 hover:border-gold/35 sm:p-7">
                  <div className="absolute right-0 top-0 h-32 w-32 bg-gold/0 blur-3xl transition-colors group-hover:bg-gold/10" />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">{eyebrow}</div>
                        <h3 className="mt-3 max-w-xl font-display text-2xl font-bold leading-tight">{title}</h3>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/25 bg-gold/8 text-gold transition-transform group-hover:-rotate-3 group-hover:scale-105">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                    <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-fg">{body}</p>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {niches.map(niche => <span key={niche} className="border border-line/70 bg-background/55 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-fg/80">{niche}</span>)}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-5">
            <div className="grid gap-6 border border-gold/20 bg-[linear-gradient(110deg,rgba(238,188,74,.09),rgba(5,14,24,.82)_42%,rgba(5,14,24,.98))] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex gap-4">
                <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-gold" />
                <div>
                  <h3 className="font-display text-xl font-bold">Broad vertical capability. Clear professional boundaries.</h3>
                  <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-fg">No counterfeit or replica goods, scareware or BSOD simulations, deceptive tech-support calls, forced push-notification prompts, impersonation, or cloaking intended to mislead platform reviewers.</p>
                </div>
              </div>
              <a href="#contact" className="luxury-button-outline whitespace-nowrap">Discuss Your Niche <ArrowRight className="h-4 w-4" /></a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="process" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal><div className="text-center"><SectionTitle icon={Gauge} label="Process" title="From Audit To" gold="Scale" centered /><p className="mt-4 text-muted-fg">A repeatable five-stage system. No guesswork.</p></div></Reveal>
          <div className="mt-16 grid gap-px overflow-hidden border border-line/60 bg-line/60 md:grid-cols-5">
            {process.map(([step, title, body], index) => <Reveal key={step} delay={index * 80} className="bg-background"><article className="group h-full p-7 transition-colors hover:bg-secondary/40"><div className="text-[10px] uppercase tracking-[0.28em] text-muted-fg">Step <span className="text-gold">{step}</span></div><div className="mt-8 font-display text-5xl font-bold text-gold/20 transition-colors group-hover:text-gold/45">{step}</div><h3 className="mt-5 font-display text-xl font-bold">{title}</h3><p className="mt-4 text-sm leading-6 text-muted-fg">{body}</p></article></Reveal>)}
          </div>
        </div>
      </section>

      <ResponsiveCloakComparison />

      <CampaignShowcase />

      <section id="results" className="section-wash py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal><div className="text-center"><SectionTitle icon={BarChart3} label="Case Studies" title="Data That" gold="Speaks" centered /><p className="mt-4 text-muted-fg">Performance results from live campaigns across industries.</p></div></Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {caseStudies.map(([vertical, roas, spend, copy], index) => <Reveal key={vertical} delay={index * 100}><article className="result-card"><div className="text-xs uppercase tracking-[0.24em] text-gold">{vertical}</div><div className="mt-8 font-display text-5xl font-bold text-gold-gradient">{roas}</div><div className="text-xs uppercase tracking-[0.18em] text-muted-fg">ROAS</div><div className="mt-8 border-t border-line/60 pt-6"><div className="text-xs text-muted-fg">Ad Spend</div><div className="mt-1 font-display text-2xl font-bold">{spend}</div></div><p className="mt-6 text-sm leading-6 text-muted-fg">{copy}</p></article></Reveal>)}
          </div>
          <div className="mt-10 text-center"><Link to="/case-studies" className="luxury-button-outline">View all results <ArrowRight className="h-4 w-4" /></Link></div>
          <div className="mt-20 border-t border-line/60 pt-16">
            <Reveal><div className="text-center"><SectionTitle icon={TrendingUp} label="ROI Calculator" title="Model Your" gold="Upside" centered /><p className="mt-4 text-muted-fg">Estimate the potential impact using your current campaign numbers.</p></div></Reveal>
            <Reveal delay={120} className="mt-12"><RoiCalculator /></Reveal>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 sm:py-24"><div className="mx-auto max-w-7xl px-6 lg:px-8"><Reveal><div className="text-center"><SectionTitle icon={Sparkles} label="Pricing" title="Built For Every" gold="Growth Stage" centered /><p className="mx-auto mt-4 max-w-2xl text-muted-fg">Professional support at a practical entry point. Every tier has defined deliverables, and staged payments are available for larger deployments.</p></div></Reveal><div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">{pricing.map((tier, index) => <Reveal key={tier.name} delay={index * 90}><article className={`pricing-card ${tier.featured ? 'featured' : ''}`}>{tier.featured && <div className="absolute right-5 top-0 -translate-y-1/2 bg-gold-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-background">Most Popular</div>}<div className="text-xs uppercase tracking-[0.25em] text-gold">{tier.name}</div><div className="mt-4 flex items-baseline gap-2"><span className="font-display text-4xl font-bold text-gold-gradient">{tier.price}</span><span className="text-xs text-muted-fg">{tier.cadence}</span></div><p className="mt-4 text-sm leading-6 text-muted-fg">{tier.desc}</p><ul className="mt-7 flex-1 space-y-3">{tier.features.map(feature => <li key={feature} className="flex items-start gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{feature}</li>)}</ul><a href="#contact" className={tier.featured ? 'luxury-button mt-9' : 'luxury-button-outline mt-9'}>{tier.cta}<ArrowRight className="h-4 w-4" /></a></article></Reveal>)}</div></div></section>

      <ClientProofReviews legacyTestimonials={testimonials} />

      <section id="faq" className="py-20 sm:py-24"><div className="mx-auto max-w-4xl px-6 lg:px-8"><Reveal><div className="text-center"><SectionTitle icon={Zap} label="FAQ" title="Common" gold="Questions" centered /><p className="mt-4 text-muted-fg">Straight answers. No fluff.</p></div></Reveal><Reveal delay={120} className="mt-12"><Faq items={faqs} /></Reveal></div></section>

      <section id="insights" className="section-wash py-20"><div className="mx-auto max-w-6xl px-6 lg:px-8"><Reveal><div className="text-center"><SectionTitle icon={Eye} label="Insights" title="Field" gold="Notes" centered /><p className="mt-4 text-muted-fg">Three focused guides for planning safer, stronger campaigns.</p></div></Reveal><div className="mt-10 grid gap-5 md:grid-cols-3">{insights.map(([tag, read, title, excerpt, to], index) => <Reveal key={title} delay={index * 80}><Link to={to} className="group flex h-full flex-col border border-line/60 bg-secondary/30 p-6 transition-all hover:-translate-y-1 hover:border-gold/30"><div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em]"><span className="text-gold">{tag}</span><span className="flex items-center gap-1 text-muted-fg"><Clock3 className="h-3 w-3" />{read}</span></div><h3 className="mt-6 font-display text-xl font-bold leading-tight">{title}</h3><p className="mt-4 flex-1 text-sm leading-6 text-muted-fg">{excerpt}</p><span className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold transition-transform group-hover:translate-x-1">Read more <ArrowRight className="h-3.5 w-3.5" /></span></Link></Reveal>)}</div></div></section>

      <section id="contact" className="py-20 sm:py-24"><div className="mx-auto max-w-6xl px-6 lg:px-8"><Reveal><div className="text-center"><SectionTitle icon={Zap} label="Get In Touch" title="Ready To" gold="Scale?" centered /><p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-fg">Start with a confidential strategy conversation. Share where the business stands, what is blocking growth, and the outcome you want to create.</p><div className="mx-auto mt-7 flex max-w-3xl flex-wrap justify-center gap-3"><span className="trust-pill"><ShieldCheck className="h-3.5 w-3.5" /> Confidential brief</span><span className="trust-pill"><Send className="h-3.5 w-3.5" /> Direct Telegram access</span><span className="trust-pill"><Clock3 className="h-3.5 w-3.5" /> Clear response and next steps</span></div></div></Reveal><Reveal delay={120} className="mt-12"><ContactForms /></Reveal></div></section>
    </>
  )
}

function SectionTitle({ icon: Icon, label, title, gold, centered = false }: { icon: LucideIcon; label: string; title: string; gold: string; centered?: boolean }) {
  return <div className={centered ? 'flex flex-col items-center' : ''}><div className="section-badge"><Icon className="h-3 w-3" /> {label}</div><h2 className="mt-6 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{title} <span className="text-gold-gradient">{gold}</span></h2></div>
}

function ResponsiveCloakComparison() {
  return (
    <>
      <section className="px-5 py-20 sm:px-6 md:hidden">
        <Reveal>
          <div className="text-center">
            <SectionTitle icon={Eye} label="Filtering Reveal" title="How Filtering Protects" gold="Traffic Quality" centered />
            <p className="mt-4 text-sm leading-6 text-muted-fg">A clear two-stage view designed for smaller screens.</p>
          </div>
        </Reveal>
        <div className="mx-auto mt-10 max-w-lg space-y-4">
          <Reveal>
            <article className="border border-emerald-700/20 bg-[#f4f0e7] p-6 text-[#13212f]">
              <div className="flex items-center justify-between gap-3">
                <div className="text-[10px] font-bold uppercase tracking-[.2em] text-emerald-700">01 / Validate</div>
                <ShieldCheck className="h-5 w-5 text-emerald-700" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold leading-tight">Invalid requests are filtered before they damage campaign data.</h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">Bot, fraud, and traffic-quality controls protect analytics and reduce wasted spend.</p>
            </article>
          </Reveal>
          <Reveal delay={80}>
            <article className="border border-gold/25 bg-[radial-gradient(circle_at_85%_20%,rgba(238,188,74,.2),transparent_35%),linear-gradient(145deg,#051529,#02060d)] p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="text-[10px] font-bold uppercase tracking-[.2em] text-gold">02 / Deliver</div>
                <Globe2 className="h-5 w-5 text-gold" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-white">Qualified visitors receive a relevant, responsive experience.</h3>
              <p className="mt-4 text-sm leading-6 text-muted-fg">Language, currency, and layout adapt while the offer, claims, pricing, and terms stay consistent.</p>
            </article>
          </Reveal>
        </div>
      </section>
      <div className="hidden md:block"><CloakComparison /></div>
    </>
  )
}

function CloakComparison() {
  const [position, setPosition] = useState(52)
  return <section className="py-24"><div className="mx-auto max-w-6xl px-6 lg:px-8"><Reveal><div className="text-center"><SectionTitle icon={Eye} label="Filtering Reveal" title="How Filtering Protects" gold="Traffic Quality" centered /><p className="mt-4 text-muted-fg">Drag the divider to compare invalid traffic controls with the relevant experience delivered to a qualified visitor.</p></div></Reveal><Reveal delay={120} className="mt-14"><div className="relative h-[430px] overflow-hidden border border-line/60 shadow-luxury"><div className="absolute inset-0 bg-[#f4f0e7] p-8 text-[#13212f]"><div className="text-xs font-bold uppercase tracking-[.22em] text-emerald-700">Traffic Validation Layer</div><div className="mt-16 max-w-lg font-display text-4xl font-bold">Bots, known fraud, and invalid requests are filtered before they damage the data.</div><p className="mt-5 max-w-md text-sm leading-6 text-slate-600">Server-side rules protect analytics, reduce wasted spend, and keep campaign decisions grounded in higher-quality traffic.</p><div className="mt-8 inline-flex rounded-full border border-emerald-700/30 px-4 py-2 text-xs font-semibold text-emerald-700">Filtered &amp; Monitored</div></div><div className="absolute inset-y-0 right-0 overflow-hidden bg-[radial-gradient(circle_at_70%_30%,rgba(238,188,74,.23),transparent_35%),linear-gradient(145deg,#051529,#02060d)]" style={{ width: `${100 - position}%` }}><div className="absolute right-0 top-0 h-full w-[1100px] p-8 text-right"><div className="text-xs font-bold uppercase tracking-[.22em] text-gold">Qualified Visitor Experience</div><div className="ml-auto mt-16 max-w-lg font-display text-4xl font-bold text-white">A relevant page for the visitor's market and intent.</div><p className="ml-auto mt-5 max-w-md text-sm leading-6 text-muted-fg">Language, currency, examples, and layout can adapt while the core offer, claims, pricing, and terms remain consistent.</p><div className="mt-8 inline-flex bg-gold-gradient px-4 py-2 text-xs font-bold text-background">Localized Landing Variant</div></div></div><div className="absolute inset-y-0 w-px bg-gold shadow-[0_0_25px_rgba(238,188,74,.8)]" style={{ left: `${position}%` }}><div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-background font-bold text-gold">⇆</div></div><input aria-label="Compare filtered traffic controls and the qualified visitor experience" type="range" min="12" max="88" value={position} onChange={event => setPosition(Number(event.target.value))} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" /><div className="absolute bottom-5 left-5 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700">Filtered Traffic</div><div className="absolute bottom-5 right-5 bg-background/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">Qualified Visitor</div></div></Reveal></div></section>
}
