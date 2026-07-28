import { Link, createFileRoute } from '@tanstack/react-router'
import { Reveal } from '@/components/Reveal'
import { CloakReveal } from '@/components/CloakReveal'
import { SITE_URL } from '@/lib/site'

export const Route = createFileRoute('/playbook')({
  head: () => ({
    meta: [
      { title: '2026 Cloaker Playbook — Trustman Elite' },
      {
        name: 'description',
        content:
          'The 2026 Cloaker Playbook: valuable cloaking and traffic filtering for bot control, fraud reduction, localization, measurement, and durable paid-media growth.',
      },
      {
        property: 'og:title',
        content: '2026 Cloaker Playbook — Trustman Elite',
      },
      {
        property: 'og:description',
        content:
          'A clear, current guide to transparent landing pages, responsible localization, and durable paid-media operations in 2026.',
      },
    ],
    links: [{ rel: 'canonical', href: SITE_URL + '/playbook' }],
  }),
  component: Playbook,
})

const PLAYS = [
  {
    n: '01',
    title: 'Filter bad traffic, not the truth',
    body: 'Valuable cloaking starts with traffic quality. Filter bots, known fraud, invalid requests, and unsupported locations while keeping the core product, claims, pricing, and terms consistent for legitimate visitors and platform review.',
  },
  {
    n: '02',
    title: 'Make the landing page self-explanatory',
    body: 'A real visitor should immediately understand the advertiser, the offer, the expected action, and any important conditions. Use clear navigation, working contact details, accurate testimonials, visible disclosures, and policies written for people rather than hidden behind vague marketing language.',
  },
  {
    n: '03',
    title: 'Use filtering to improve relevance',
    body: 'Geo, language, device, and campaign intent can shape currency, examples, layout, and calls to action. Keep the underlying offer consistent, provide a sensible default, and let visitors correct region or language when automated detection gets it wrong.',
  },
  {
    n: '04',
    title: 'Build operational trust before scale',
    body: 'Verify domains and business details, keep billing and account ownership stable, document approvals, and increase spend only when conversion quality and customer support can keep pace. Monitoring should pause broken pages, tracking failures, or policy-sensitive changes — not hide them.',
  },
  {
    n: '05',
    title: 'Localize the full customer experience',
    body: 'Translate more than the headline. Match currency, taxes, shipping, eligibility, support hours, legal disclosures, and proof to the market you serve. Remove claims or features that are unavailable in a region instead of presenting an offer the visitor cannot actually receive.',
  },
  {
    n: '06',
    title: 'Optimize for durable customer value',
    body: 'Read CTR and short-term ROAS alongside refunds, chargebacks, lead quality, retention, and support complaints. A campaign that converts through confusion is not a winner. Scale the variants that attract informed customers and remain accurate after every creative or offer change.',
  },
]

const NOTES = [
  'Meta: keep the ad, destination, business identity, and post-click experience aligned. Review every landing-page change with the same care as a new creative.',
  'Google Ads: do not show different content to review systems. Use transparent redirects only for legitimate purposes, and keep the final destination functional and consistent.',
  'TikTok Ads: make landing pages mobile-ready, truthful, and complete. The product, price, claims, and required disclosures should match the ad that brought the visitor there.',
  'Native networks: clearly label advertorial or sponsored formats, avoid imitating independent journalism, and confirm the current network and market rules before launch.',
]

function Playbook() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-5 pb-8 pt-16 md:pt-24">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] text-gold-deep">
            Strategy · 8 min · Updated July 2026
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            The 2026{' '}
            <span className="text-gradient-gold">Cloaker Playbook</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-fg">
            Cloaking and filtering are valuable when they protect analytics,
            reduce bots and invalid traffic, support localization, and deliver
            consistent offers responsibly. This guide explains how to use that
            infrastructure without confusing visitors or deceiving reviewers.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-10">
        <Reveal>
          <CloakReveal
            safeLabel="Core experience"
            moneyLabel="Localized variant"
            safe={{
              tag: 'The shared foundation',
              title: 'A page built for clarity',
              body: 'The advertiser, offer, pricing, terms, disclosures, and next step are clear to every visitor. Nothing important depends on who is checking the page.',
            }}
            money={{
              tag: 'The relevant variation',
              title: 'A page adapted responsibly',
              body: 'Language, currency, examples, and layout match the visitor while the core offer and claims remain consistent. Personalization improves comprehension instead of hiding intent.',
            }}
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-10">
        <div className="space-y-5">
          {PLAYS.map((p, i) => (
            <Reveal key={p.n} delay={(i % 2) * 80}>
              <article className="panel p-6 md:p-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-3xl font-bold text-line">
                    {p.n}
                  </span>
                  <h2 className="font-serif text-xl font-semibold text-gold md:text-2xl">
                    {p.title}
                  </h2>
                </div>
                <p className="mt-3 leading-relaxed text-muted-fg">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-10">
        <Reveal>
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            2026 platform principles
          </h2>
        </Reveal>
        <ul className="mt-8 space-y-4">
          {NOTES.map((note, i) => (
            <Reveal key={i} delay={i * 70} as="li">
              <div className="flex gap-4 border-l-2 border-gold/40 pl-4">
                <p className="text-muted-fg">{note}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <Reveal>
          <div className="panel flex flex-col items-start gap-4 p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-serif text-2xl font-semibold">
                Want a clearer, more durable funnel?
              </h2>
              <p className="mt-2 text-muted-fg">
                Start with an audit of message clarity, localization, tracking,
                and policy risk.
              </p>
            </div>
            <Link
              to="/audit"
              className="shrink-0 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-all hover:shadow-glow"
            >
              Get a free audit
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
