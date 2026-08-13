import { Reveal } from '@/components/Reveal'

type PolicySection = {
  title: string
  paragraphs: string[]
  items?: string[]
}

export function PolicyPage({ eyebrow, title, intro, updated, sections }: { eyebrow: string; title: string; intro: string; updated: string; sections: PolicySection[] }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line/60 px-5 pb-16 pt-20 md:pb-20 md:pt-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 bg-accent/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl">
          <Reveal><div className="section-badge">{eyebrow}</div></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">{title}</h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-fg">{intro}</p>
            <p className="mt-5 text-xs uppercase tracking-[0.2em] text-accent">Last updated {updated}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 md:py-20">
        <div className="space-y-12">
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={(index % 2) * 70}>
              <article className="border-l border-accent/35 pl-6 sm:pl-8">
                <div className="text-[10px] uppercase tracking-[0.24em] text-muted-fg">Section {String(index + 1).padStart(2, '0')}</div>
                <h2 className="mt-3 font-display text-2xl font-bold text-accent sm:text-3xl">{section.title}</h2>
                <div className="mt-5 space-y-4 text-sm leading-7 text-muted-fg sm:text-base">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.items && (
                    <ul className="space-y-3 pt-1">
                      {section.items.map((item) => <li key={item} className="flex gap-3"><span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-accent" />{item}</li>)}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 border border-line/60 bg-secondary/30 p-7 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <h2 className="font-display text-2xl font-bold">Questions about this policy?</h2>
              <p className="mt-2 text-sm leading-6 text-muted-fg">Send a private inquiry and include the policy section you want clarified.</p>
            </div>
            <a href="/#contact" className="luxury-button-outline mt-5 shrink-0 sm:mt-0">Contact Trustman</a>
          </div>
        </Reveal>
      </section>
    </>
  )
}
