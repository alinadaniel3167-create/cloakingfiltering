import { Link, createFileRoute } from '@tanstack/react-router'
import { Reveal } from '@/components/Reveal'
import { ContactForms } from '@/components/ContactForms'
import { SITE_URL } from '@/lib/site'

export const Route = createFileRoute('/audit')({
  head: () => ({
    meta: [
      { title: 'Free Funnel Audit — Trustman Elite' },
      {
        name: 'description',
        content:
          'Request a free funnel audit and 30-day growth roadmap covering cloaking, traffic filtering, funnel architecture, account structure, measurement, and media buying.',
      },
      { property: 'og:title', content: 'Free Funnel Audit — Trustman Elite' },
      {
        property: 'og:description',
        content:
          'A free teardown of your funnel and a 30-day growth roadmap for high-budget operators.',
      },
    ],
    links: [{ rel: 'canonical', href: SITE_URL + '/audit' }],
  }),
  component: Audit,
})

const DELIVERABLES = [
  {
    title: 'Cloaking, filtering & compliance review',
    body: 'How well your setup filters bots and invalid traffic, protects analytics, applies legitimate geo rules, and keeps the core offer consistent across landing variants.',
  },
  {
    title: 'Funnel & geo teardown',
    body: 'A page-by-page look at your funnel against traffic temperature and geo — where conversion is bleeding.',
  },
  {
    title: 'Account structure analysis',
    body: 'Whether your campaign architecture is averaging away your winners and hiding your real CAC.',
  },
  {
    title: '30-day growth roadmap',
    body: 'A prioritized, dated plan: what to fix first, what to build, and where the next 20–60% of ROAS lives.',
  },
]

const STEPS = [
  'Send your numbers — vertical, platforms, spend, and current ROAS.',
  'I review your funnel and accounts within a few business days.',
  'You get a written teardown plus a 30-day roadmap on a short call.',
  'Implement it yourself, or we scope a managed engagement.',
]

function Audit() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-5 pb-8 pt-16 text-center md:pt-24">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-gold">
            No cost · No pitch
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 font-serif text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            A free funnel audit,
            <br />
            <span className="text-gradient-gold">then a 30-day roadmap.</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-fg">
            I'll review your cloaking, filtering, funnel, account structure,
            measurement, and buying — then hand you a dated plan for the next
            month of growth. Whether we work together after is entirely up to
            you.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <a
            href="#audit-form"
            className="mt-8 inline-block rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:shadow-glow-lg"
          >
            Claim my audit
          </a>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {DELIVERABLES.map((d, i) => (
            <Reveal key={d.title} delay={(i % 2) * 90}>
              <div className="panel h-full p-6 md:p-7">
                <div className="mb-3 font-serif text-2xl font-bold text-line">
                  0{i + 1}
                </div>
                <h2 className="font-serif text-xl font-semibold text-gold">
                  {d.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-fg">
                  {d.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-12">
        <Reveal>
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            How it works
          </h2>
        </Reveal>
        <ol className="mt-8 space-y-4">
          {STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 70} as="li">
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-sm font-semibold text-gold">
                  {i + 1}
                </span>
                <p className="pt-1 text-muted-fg">{s}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section id="audit-form" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16">
        <Reveal>
          <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
            Request your audit
          </h2>
          <p className="mt-3 max-w-xl text-muted-fg">
            Send one focused brief for a confidential review. Telegram remains
            available if you prefer a faster conversation.
          </p>
        </Reveal>
        <div className="mt-10">
          <ContactForms />
        </div>
        <Reveal delay={120}>
          <p className="mt-8 text-center text-sm text-muted-fg">
            Not ready?{' '}
            <Link to="/case-studies" className="text-gold hover:underline">
              See what the roadmaps have produced
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </>
  )
}
