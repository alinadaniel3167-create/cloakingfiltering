import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { Reveal } from '@/components/Reveal'
import { getCaseStudy } from '@/lib/case-studies'
import { SITE_URL } from '@/lib/site'

export const Route = createFileRoute('/case-studies/$slug')({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug)
    if (!study) throw notFound()
    return study
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const url = `${SITE_URL}/case-studies/${loaderData.slug}`
    const articleJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: loaderData.title,
      description: loaderData.teaser,
      articleSection: loaderData.vertical,
      author: {
        '@type': 'Person',
        name: 'Investor Trustman Kareem',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Trustman — Elite Performance Strategist',
      },
      mainEntityOfPage: url,
    }
    return {
      meta: [
        { title: `${loaderData.title} — Trustman Elite` },
        { name: 'description', content: loaderData.teaser },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: loaderData.title },
        { property: 'og:description', content: loaderData.teaser },
        { property: 'og:url', content: url },
        { name: 'twitter:title', content: loaderData.title },
        { name: 'twitter:description', content: loaderData.teaser },
      ],
      links: [{ rel: 'canonical', href: url }],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(articleJsonLd),
        },
      ],
    }
  },
  component: CaseStudyPage,
})

function CaseStudyPage() {
  const study = Route.useLoaderData()

  return (
    <article className="mx-auto max-w-4xl px-5 pb-16 pt-12 md:pt-16">
      <Reveal>
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-1.5 text-sm text-muted-fg transition-colors hover:text-accent"
        >
          <span>←</span> All case studies
        </Link>
      </Reveal>

      <header className="mt-6">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] text-accent-deep">
            {study.vertical}
          </span>
          <h1 className="mt-3 font-serif text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            {study.title}
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-fg">
            <Fact label="Duration" value={study.duration} />
            <Fact label="Network" value={study.network} />
            <Fact label="Geos" value={study.geos} />
          </div>
        </Reveal>
      </header>

      {/* Headline metrics */}
      <Reveal delay={120}>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <BigStat label="Spend" value={study.spend} />
          <BigStat label="ROAS" value={study.roas} />
          <BigStat label="Revenue" value={study.revenue} accent />
          <BigStat label="Vertical" value={study.vertical.split(' / ')[0]} />
        </div>
      </Reveal>

      {/* Challenge */}
      <Reveal>
        <section className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-accent">
            The challenge
          </h2>
          <p className="mt-4 leading-relaxed text-fg/90">{study.challenge}</p>
        </section>
      </Reveal>

      {/* Approach */}
      <section className="mt-14">
        <Reveal>
          <h2 className="font-serif text-2xl font-semibold text-accent">
            The approach
          </h2>
        </Reveal>
        <div className="mt-6 space-y-4">
          {study.approach.map((a, i) => (
            <Reveal key={i} delay={(i % 2) * 70}>
              <div className="panel p-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-xl font-bold text-line">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif text-lg font-semibold">{a.title}</h3>
                </div>
                <p className="mt-2 leading-relaxed text-muted-fg">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Results grid */}
      <section className="mt-14">
        <Reveal>
          <h2 className="font-serif text-2xl font-semibold text-accent">
            The results
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {study.results.map((r, i) => (
              <div key={i} className="bg-panel p-6 text-center">
                <div className="font-serif text-2xl font-bold text-accent-gradient">
                  {r.value}
                </div>
                <div className="mt-1.5 text-xs uppercase tracking-[0.12em] text-muted-fg">
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Testimonial */}
      {study.testimonial && (
        <Reveal>
          <blockquote className="mt-14 panel p-8">
            <p className="font-serif text-xl italic leading-relaxed text-fg md:text-2xl">
              "{study.testimonial.quote}"
            </p>
            <footer className="mt-4 text-sm text-accent-deep">
              — {study.testimonial.attribution}
            </footer>
          </blockquote>
        </Reveal>
      )}

      {/* CTA */}
      <Reveal>
        <div className="mt-14 panel flex flex-col items-start gap-4 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold">
              Your numbers could be next.
            </h2>
            <p className="mt-2 text-muted-fg">
              Same infrastructure, tuned to your offer.
            </p>
          </div>
          <Link
            to="/audit"
            className="luxury-button shrink-0"
          >
            Get a free audit
          </Link>
        </div>
      </Reveal>
    </article>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <span>
      <span className="text-accent-deep">{label}:</span> {value}
    </span>
  )
}

function BigStat({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="panel p-5 text-center">
      <div
        className={`font-serif text-2xl font-bold ${
          accent ? 'text-accent-gradient' : 'text-fg'
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-muted-fg">
        {label}
      </div>
    </div>
  )
}
