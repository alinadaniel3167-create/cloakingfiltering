import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Check, Globe2, ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { SectionTitle } from '@/components/SectionTitle'
import { SITE_URL, TELEGRAM_URL } from '@/lib/site'
import { verticals } from '@/lib/verticals'

export const Route = createFileRoute('/markets')({
  head: () => ({
    meta: [
      { title: 'Markets Served — Trustman Kareem' },
      {
        name: 'description',
        content:
          'Six performance verticals served with custom filtering, localized funnels and managed media buying: e-commerce, crypto and financial offers, regulated gaming, wellness, travel and call funnels, and mobile app acquisition.',
      },
      { property: 'og:title', content: 'Markets Served — Trustman Kareem' },
      {
        property: 'og:description',
        content:
          'Specialist experience across six performance verticals, each with its own messaging, traffic sources and measurement.',
      },
      { property: 'og:image', content: `${SITE_URL}/niches/crypto.jpg` },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/markets` }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Performance advertising markets served',
          itemListElement: verticals.map((vertical, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: vertical.title,
            description: vertical.body,
          })),
        }),
      },
    ],
  }),
  component: Markets,
})

function Markets() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line/60 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[1fr_.62fr] lg:items-end">
              <div>
                <SectionTitle as="h1" icon={Globe2} label="Markets Served" title="Six Verticals," accent="One Filtering Core" />
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-fg">
                  Each market below has its own rules, traffic sources and definition of a good lead. The infrastructure
                  underneath is the same — what changes is the messaging, the eligibility logic and what gets measured.
                </p>
              </div>
              <div className="border-l border-accent/30 pl-6 text-sm leading-6 text-muted-fg">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Engagement standard</span>
                Restricted categories are reviewed case by case. The offer must be lawful, accurately represented and
                suitable for the market it runs in.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {verticals.map(({ icon: Icon, eyebrow, title, detail, image, alt, niches, handles, slug }, index) => (
          <section
            key={slug}
            id={slug}
            className="scroll-mt-28 border-b border-line/60 py-16 last:border-b-0 sm:py-20"
          >
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal className={index % 2 === 1 ? 'lg:order-2' : undefined}>
                <figure className="niche-figure group">
                  <div className="niche-card-media niche-card-media-tall">
                    <img src={image} alt={alt} loading="lazy" width={1200} height={675} />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,11,.15),rgba(10,13,11,.75))]" />
                    <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center border border-accent/30 bg-background/80 text-accent backdrop-blur-sm transition-transform duration-300 group-hover:-rotate-6">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                      {eyebrow}
                    </span>
                  </div>
                </figure>
              </Reveal>

              <Reveal delay={100}>
                <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-fg">
                  {String(index + 1).padStart(2, '0')} <span className="text-accent">/</span> {String(verticals.length).padStart(2, '0')}
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold leading-tight sm:text-3xl">{title}</h2>
                <p className="mt-5 leading-7 text-muted-fg">{detail}</p>
                <ul className="mt-7 space-y-3 border-t border-line/60 pt-6">
                  {handles.map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-2">
                  {niches.map(niche => (
                    <span key={niche} className="niche-chip">{niche}</span>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <section className="section-wash py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-6 border border-accent/20 bg-[linear-gradient(110deg,rgba(201,242,77,.07),rgba(17,22,20,.85)_45%,rgba(17,22,20,.98))] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex gap-4">
                <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <h2 className="font-display text-xl font-bold">Broad vertical capability. Clear professional boundaries.</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-fg">
                    No counterfeit goods, scareware, deceptive tech-support calls, forced push prompts, impersonation, or
                    cloaking meant to mislead platform reviewers.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="luxury-button whitespace-nowrap">
                  Discuss Your Niche <ArrowRight className="h-4 w-4" />
                </a>
                <Link to="/case-studies" className="luxury-button-outline whitespace-nowrap">
                  See Results <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
