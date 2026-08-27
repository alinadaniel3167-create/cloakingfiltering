import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Camera, Layers3, ShieldCheck } from 'lucide-react'
import { ProofGallery } from '@/components/ProofGallery'
import { Reveal } from '@/components/Reveal'
import { SectionTitle } from '@/components/SectionTitle'
import { SITE_URL, TELEGRAM_URL } from '@/lib/site'
import { workArchive, workCategories, workPlatforms } from '@/lib/work-archive'

export const Route = createFileRoute('/proof')({
  head: () => ({
    meta: [
      { title: 'Working Archive — Trustman Kareem' },
      {
        name: 'description',
        content:
          'Unretouched platform screenshots from delivered work: Google Ads and Meta campaign builds, push and native network buying, keyword and conversion tracking setup, Keitaro click-level tracking, antidetect browser and proxy isolation, DNS and tracker infrastructure, Shopify storefronts, catalogue SEO and Search Console performance.',
      },
      { property: 'og:title', content: 'Working Archive — Trustman Kareem' },
      {
        property: 'og:description',
        content:
          'Screenshots straight from the accounts — campaign structure, click logs, tracker infrastructure and store builds.',
      },
      { property: 'og:image', content: `${SITE_URL}/work/keitaro-filter-decisions.jpg` },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/proof` }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          name: 'Working archive — delivered campaign and infrastructure work',
          url: `${SITE_URL}/proof`,
          image: workArchive.map(item => ({
            '@type': 'ImageObject',
            contentUrl: `${SITE_URL}${item.image}`,
            name: item.title,
            description: item.caption,
            width: item.width,
            height: item.height,
          })),
        }),
      },
    ],
  }),
  component: Proof,
})

const summary = [
  { label: 'Platforms', value: String(workPlatforms.length) },
  { label: 'Captures', value: String(workArchive.length) },
  { label: 'Disciplines', value: String(workCategories.length) },
]

function Proof() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line/60 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_.85fr] lg:items-center">
            <Reveal>
              <SectionTitle as="h1" icon={Camera} label="Working Archive" title="The Accounts," accent="Not The Mockups" />
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-fg">
                Most portfolios in this industry show rendered dashboards. These are screen captures from live accounts —
                campaign tables mid-flight, click logs with the geo columns still open, DNS records mid-propagation.
                Client names, server addresses and licence keys are cropped or blacked out; nothing else is retouched.
              </p>
              <dl className="mt-9 flex flex-wrap gap-px border border-line/60 bg-line/60">
                {summary.map(item => (
                  <div key={item.label} className="flex-1 bg-background px-5 py-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg">{item.label}</dt>
                    <dd className="mt-1 font-display text-2xl font-bold text-accent">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={120}>
              <figure className="niche-figure">
                <img
                  src="/work/keitaro-filter-decisions.jpg"
                  alt="Keitaro click log with the filter and page columns open, showing US mobile carrier traffic routed to the offer page while VPN and proxy clicks are routed to the white page"
                  width={1280}
                  height={638}
                  className="w-full"
                />
                <figcaption className="border-t border-line/60 bg-card/60 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-fg">
                  Keitaro · 113 clicks, one flight · carrier traffic <span className="text-accent">→ Offer</span> · VPN /
                  proxy → White
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-10 flex flex-col gap-6 border-b border-line/60 pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionTitle icon={Layers3} label="Captures" title="Filter By" accent="Discipline" />
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-fg">
                Select any capture to open it full size. Arrow keys move through the set, Escape closes it.
              </p>
            </div>
          </Reveal>
          <ProofGallery />
        </div>
      </section>

      <section className="section-wash py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-6 border border-accent/20 bg-[linear-gradient(110deg,rgba(201,242,77,.07),rgba(17,22,20,.85)_45%,rgba(17,22,20,.98))] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex gap-4">
                <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <h2 className="font-display text-xl font-bold">What is not in this archive.</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-fg">
                    Scareware and fake system-lock pages, support-line impersonation, and any creative built to mislead a
                    person rather than qualify them. Work like that exists in this industry and it is not published here
                    because it is not taken on. The engagement boundaries on the markets page are the same ones applied
                    to the archive.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/case-studies" className="luxury-button whitespace-nowrap">
                  Read the case studies <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="luxury-button-outline whitespace-nowrap">
                  Ask about a build <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
