import { Link, createFileRoute } from '@tanstack/react-router'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { SITE_URL } from '@/lib/site'

const TITLE = 'Cloaking & Traffic Filtering on TikTok: A 2026 Guide'
const DESC =
  'A practical guide to valuable cloaking and traffic filtering for TikTok: bot control, fraud reduction, localization, landing consistency, and reliable measurement.'

export const Route = createFileRoute('/guides/tiktok-ads-cloaking')({
  head: () => {
    const url = `${SITE_URL}/guides/tiktok-ads-cloaking`
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: TITLE,
      description: DESC,
      dateModified: '2026-07-15',
      author: { '@type': 'Person', name: 'Investor Trustman Kareem' },
      publisher: {
        '@type': 'Organization',
        name: 'Trustman — Elite Performance Strategist',
      },
      mainEntityOfPage: url,
      about: 'Cloaking and traffic filtering for TikTok advertising',
    }
    return {
      meta: [
        { title: `${TITLE} — Trustman Elite` },
        { name: 'description', content: DESC },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: TITLE },
        { property: 'og:description', content: DESC },
        { property: 'og:url', content: url },
        { name: 'twitter:title', content: TITLE },
        { name: 'twitter:description', content: DESC },
      ],
      links: [{ rel: 'canonical', href: url }],
      scripts: [
        { type: 'application/ld+json', children: JSON.stringify(jsonLd) },
      ],
    }
  },
  component: Guide,
})

const CHECKLIST = [
  'Filter known bots, invalid requests, and obvious automation.',
  'Document every routing rule and the business reason behind it.',
  'Keep the same core offer, claims, pricing, and terms for review and visitors.',
  'Use geo and language signals only to improve legitimate localization.',
  'Provide a safe default when a traffic signal is missing or uncertain.',
  'Test the complete mobile landing experience before increasing spend.',
  'Monitor filtered volume so valid customers are not excluded accidentally.',
  'Measure qualified customers, refunds, and retention alongside ROAS.',
]

function Guide() {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-20 pt-12 md:pt-16">
      <Reveal>
        <span className="text-xs uppercase tracking-[0.25em] text-gold-deep">
          Technical guide · Updated July 2026
        </span>
        <h1 className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Cloaking and traffic filtering on TikTok
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-fg">
          Valuable cloaking is a server-side traffic and content-delivery layer.
          It can reduce bot noise, protect campaign data, apply legitimate
          market rules, and deliver a more relevant landing experience to
          qualified visitors.
        </p>
        <p className="mt-5 border-l-2 border-gold/50 bg-gold/5 p-5 text-sm leading-7 text-muted-fg">
          Filtering should never be used to deceive platform review or hide a
          materially different offer. The advertiser, product, claims, pricing,
          terms, and required disclosures should remain consistent.
        </p>
      </Reveal>

      <Reveal>
        <nav
          aria-label="On this page"
          className="mt-10 border border-line bg-panel/40 p-5"
        >
          <div className="mb-3 text-xs uppercase tracking-[0.18em] text-gold-deep">
            On this page
          </div>
          <ol className="space-y-2 text-sm">
            <li>
              <a href="#value" className="text-fg hover:text-gold">
                1. Where cloaking and filtering create value
              </a>
            </li>
            <li>
              <a href="#quality" className="text-fg hover:text-gold">
                2. Build a traffic-quality layer
              </a>
            </li>
            <li>
              <a href="#localization" className="text-fg hover:text-gold">
                3. Deliver responsible localized variants
              </a>
            </li>
            <li>
              <a href="#measurement" className="text-fg hover:text-gold">
                4. Monitor filtering and customer quality
              </a>
            </li>
          </ol>
        </nav>
      </Reveal>

      <div className="mt-14 space-y-16">
        <Section
          id="value"
          title="1. Where cloaking and filtering create value"
        >
          <p>
            TikTok campaigns can attract fast, mixed-quality traffic. A
            filtering layer helps separate legitimate visitors from known bots,
            repeated invalid requests, datacenter automation, and traffic
            outside the markets an offer can actually serve.
          </p>
          <p>
            Cloaking also supports responsible content delivery. Language,
            currency, shipping, eligibility, examples, and page layout can adapt
            to a visitor's market while the underlying offer stays the same. The
            value comes from cleaner data and clearer customer experiences — not
            from hiding intent.
          </p>
          <Callout title="The operating rule">
            Filter traffic for security and relevance. Do not filter people
            based on whether they appear to be reviewing the campaign.
          </Callout>
        </Section>

        <Section id="quality" title="2. Build a traffic-quality layer">
          <p>
            Start with signals that have a defensible operational purpose: known
            bot patterns, rate limits, repeated invalid requests, unsupported
            countries, malicious automation, and traffic sources that violate
            the campaign's documented targeting rules.
          </p>
          <p>
            Use conservative defaults when confidence is low. Over-filtering can
            block real customers and distort reporting just as badly as bot
            traffic. Keep logs, review false positives, and make every rule easy
            to explain to the client, platform, and technical team.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['Protect', 'Bots and invalid traffic'],
              ['Preserve', 'Analytics and attribution'],
              ['Document', 'Rules and routing reasons'],
            ].map(([label, value]) => (
              <div
                key={label}
                className="border border-line/60 bg-panel/35 p-4"
              >
                <div className="text-[10px] uppercase tracking-[0.16em] text-gold">
                  {label}
                </div>
                <div className="mt-2 text-sm text-fg">{value}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="localization"
          title="3. Deliver responsible localized variants"
        >
          <p>
            Geo delivery should improve comprehension. Localize language,
            currency, taxes, support hours, proof, payment methods, and legal
            disclosures. Remove features or promises that are unavailable in a
            market instead of showing visitors an offer they cannot receive.
          </p>
          <p>
            Keep the advertiser identity, product, material claims, pricing
            logic, and terms consistent. Provide a sensible default and allow
            visitors to correct region or language when automated detection is
            wrong.
          </p>
        </Section>

        <Section
          id="measurement"
          title="4. Monitor filtering and customer quality"
        >
          <p>
            Report how much traffic is filtered, which rule caused the decision,
            and whether valid customers are being excluded. Traffic-quality data
            should sit beside spend, conversions, qualified leads, refunds,
            chargebacks, retention, and support demand.
          </p>
          <p>
            A valuable system makes decisions easier to audit. When filtered
            volume changes suddenly, pause and investigate before assuming the
            remaining traffic is more profitable. Scale only when both the
            acquisition metrics and downstream customer quality remain healthy.
          </p>
        </Section>
      </div>

      <Reveal>
        <section className="mt-16 border border-gold/30 bg-gold/5 p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-bold">
            Valuable cloaking and filtering checklist
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {CHECKLIST.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-6"
              >
                <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <div className="mt-16 border-t border-line pt-8">
          <h2 className="font-serif text-2xl font-bold">
            Need a cloaking and filtering assessment?
          </h2>
          <p className="mt-3 leading-7 text-muted-fg">
            Start with a review of traffic quality, filtering rules,
            localization, landing consistency, measurement, and platform-policy
            risk.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/audit" className="luxury-button">
              Request an audit
            </Link>
            <Link to="/playbook" className="luxury-button-outline">
              Read the 2026 playbook
            </Link>
          </div>
        </div>
      </Reveal>
    </article>
  )
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-serif text-2xl font-bold leading-tight text-gold md:text-3xl">
        {title}
      </h2>
      <div className="mt-5 space-y-5 text-[1.02rem] leading-8 text-muted-fg">
        {children}
      </div>
    </section>
  )
}

function Callout({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border-l-2 border-gold/60 bg-panel/40 p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
        {title}
      </div>
      <p className="mt-2 text-sm leading-7 text-fg">{children}</p>
    </div>
  )
}
