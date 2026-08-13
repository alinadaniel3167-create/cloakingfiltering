import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { CampaignShowcase } from '@/components/CampaignShowcase'
import { ClientProofReviews } from '@/components/ClientProofReviews'
import { Reveal } from '@/components/Reveal'
import { caseStudies } from '@/lib/case-studies'
import { SITE_URL } from '@/lib/site'
import { workArchive } from '@/lib/work-archive'

export const Route = createFileRoute('/case-studies/')({
  head: () => ({
    meta: [
      { title: 'Case Studies — Trustman Elite' },
      {
        name: 'description',
        content:
          'Redacted case studies from real performance campaigns: verticals, durations, spend, ROAS, and revenue. Crypto prop trading, nutra affiliate, and DTC ecommerce at scale.',
      },
      { property: 'og:title', content: 'Case Studies — Trustman Elite' },
      {
        property: 'og:description',
        content:
          'Real numbers from real campaigns — names redacted. ROAS, spend, and revenue across verticals.',
      },
    ],
    links: [{ rel: 'canonical', href: SITE_URL + '/case-studies' }],
  }),
  component: CaseStudiesIndex,
})

const testimonials = [
  { quote: 'The campaign audit gave us a clear plan, cleaner reporting, and a much stronger launch sequence.', name: 'Marcus Chen', role: 'Growth Lead, Financial Services', result: '3.1x ROAS', service: 'Campaign audit', rating: 5 },
  { quote: 'The filtering infrastructure reduced low-quality traffic and gave us the stability to scale past our previous ceiling.', name: 'Elena Voss', role: 'Founder, DTC Commerce', result: '-41% invalid traffic', service: 'Cloaking & filtering', rating: 5 },
  { quote: 'Our landing pages became faster, clearer, and much better aligned with the intent behind each campaign.', name: 'Daniel Brooks', role: 'Marketing Director, SaaS', result: '+68% conversion rate', service: 'Landing page optimization', rating: 5 },
  { quote: 'The domain and infrastructure rebuild removed recurring launch friction and made every deployment easier to manage.', name: 'Sofia Martins', role: 'Operations Lead, Mobile Apps', result: '99.9% uptime', service: 'Domain & infrastructure', rating: 5 },
  { quote: 'Weekly optimization decisions became more disciplined, and spend moved toward the audiences producing real value.', name: 'Omar Rahman', role: 'Media Buyer, Gaming', result: '-34% cost per lead', service: 'Media buying', rating: 5 },
  { quote: 'The team translated a complex international funnel into a simple, measurable system across several markets.', name: 'Claire Bennett', role: 'Commercial Lead, Travel', result: '5 markets launched', service: 'Other', rating: 5 },
]

function CaseStudiesIndex() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:pt-24">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] text-accent-deep">
            The receipts
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight md:text-6xl">
            Case studies, <span className="text-accent-gradient">redacted</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-fg">
            Every campaign below is real. I'll show you the vertical, the duration,
            the spend, the ROAS, and the revenue — never the client. Discretion is
            the strategy.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 90}>
              <Link
                to="/case-studies/$slug"
                params={{ slug: c.slug }}
                className="group flex h-full flex-col panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-accent-deep">
                  {c.vertical}
                </span>
                <h2 className="mt-3 font-serif text-xl font-semibold leading-snug transition-colors group-hover:text-accent">
                  {c.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-fg">
                  {c.teaser}
                </p>
                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-line pt-5">
                  <Metric label="ROAS" value={c.roas} />
                  <Metric label="Spend" value={c.spend} />
                  <Metric label="Revenue" value={c.revenue} />
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-accent">
                  Read the breakdown
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CampaignShowcase />

      <section className="border-y border-line/60 py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <Link
              to="/proof"
              className="group flex flex-col gap-5 border border-accent/20 bg-[linear-gradient(110deg,rgba(201,242,77,.06),rgba(17,22,20,.9))] p-6 transition-colors hover:border-accent/45 sm:flex-row sm:items-center sm:justify-between sm:p-8"
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Working archive</div>
                <h2 className="mt-3 font-display text-2xl font-bold">
                  The case studies above are written up. The archive is raw.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-fg">
                  {workArchive.length} screen captures straight from the accounts — Google Ads and Meta campaign tables,
                  push and native buying, Keitaro click logs, tracker DNS, Shopify builds and catalogue SEO.
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
                Open archive <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <ClientProofReviews legacyTestimonials={testimonials} />
    </>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-serif text-base font-bold text-accent">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.12em] text-muted-fg">
        {label}
      </div>
    </div>
  )
}
