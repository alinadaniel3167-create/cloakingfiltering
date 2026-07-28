import { Link, createFileRoute } from '@tanstack/react-router'
import { Reveal } from '@/components/Reveal'
import { caseStudies } from '@/lib/case-studies'
import { SITE_URL } from '@/lib/site'

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

function CaseStudiesIndex() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:pt-24">
      <Reveal>
        <span className="text-xs uppercase tracking-[0.25em] text-gold-deep">
          The receipts
        </span>
        <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight md:text-6xl">
          Case studies, <span className="text-gradient-gold">redacted</span>
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
              className="group flex h-full flex-col panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-glow"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-gold-deep">
                {c.vertical}
              </span>
              <h2 className="mt-3 font-serif text-xl font-semibold leading-snug transition-colors group-hover:text-gold">
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
              <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-gold">
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
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-serif text-base font-bold text-gold">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.12em] text-muted-fg">
        {label}
      </div>
    </div>
  )
}
