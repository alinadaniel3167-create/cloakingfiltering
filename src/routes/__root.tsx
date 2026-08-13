import {
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useRouter,
} from '@tanstack/react-router'
import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import { Menu, Send, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { CursorGlow } from '@/components/CursorGlow'
import { FloatingTelegramCta } from '@/components/FloatingTelegramCta'
import { queryClient } from '@/lib/query'
import {
  SITE_URL,
  TELEGRAM_URL,
  WHATSAPP_URL,
  X_URL,
} from '@/lib/site'

import '../styles.css'

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Trustman — Elite Performance Strategist',
  alternateName: 'Investor Trustman Kareem',
  url: SITE_URL,
  description:
    'Elite performance advertising strategist specializing in compliance-aware cloaking, traffic filtering, geo-targeted funnels, affiliate scaling, and managed media buying.',
  founder: { '@type': 'Person', name: 'Investor Trustman Kareem' },
  areaServed: 'Worldwide',
  knowsAbout: [
    'Compliance-aware ad cloaking',
    'Traffic filtering and fraud reduction',
    'Geo-targeted funnels',
    'Affiliate scaling',
    'Managed media buying',
    'Meta Ads',
    'Google Ads',
    'TikTok Ads',
    'Native advertising',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    url: TELEGRAM_URL,
    availableLanguage: 'English',
  },
  sameAs: [TELEGRAM_URL],
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Trustman — Elite Performance Strategist' },
      {
        name: 'description',
        content:
          'Performance marketing strategist for high-budget operators. Compliance-aware cloaking, traffic filtering, geo-targeted funnels, and managed media buying engineered for cleaner data and measurable growth.',
      },
      { name: 'theme-color', content: '#0a0d0b' },
      { name: 'author', content: 'Investor Trustman Kareem' },
      {
        name: 'keywords',
        content:
          'ad cloaking, traffic filtering, bot filtering, fraud prevention, geo-targeted funnels, affiliate scaling, media buying, performance marketing',
      },
      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Trustman Elite' },
      {
        property: 'og:title',
        content: 'Trustman — Elite Performance Strategist',
      },
      {
        property: 'og:description',
        content:
          'Real campaigns, real numbers, names redacted. Valuable cloaking, traffic filtering, localized funnels, and managed media buying built for cleaner traffic and measurable ROI.',
      },
      { property: 'og:url', content: SITE_URL },
      { property: 'og:image', content: `${SITE_URL}/og.png` },
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:title',
        content: 'Trustman — Elite Performance Strategist',
      },
      {
        name: 'twitter:description',
        content:
          'Performance advertising for high-budget operators. Cloaking, traffic filtering, localized funnels, and media buying tuned for traffic quality and ROI.',
      },
      { name: 'twitter:image', content: `${SITE_URL}/og.png` },
    ],
    links: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'alternate icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(orgJsonLd),
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
  errorComponent: RootError,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <CursorGlow />
          <SiteHeader />
          <FloatingTelegramCta />
          <main>{children}</main>
          <SiteFooter />
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  )
}

const NAV = [
  { href: '/#about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/markets', label: 'Markets' },
  { href: '/case-studies', label: 'Work' },
  { href: '/proof', label: 'Proof' },
  { href: '/playbook', label: 'Playbook' },
  { href: '/#contact', label: 'Contact' },
]

function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <img src="/kareem-logo.jpg" alt="" className="duotone h-9 w-9 border border-accent/40 object-cover sm:h-10 sm:w-10" />
          <span className="hidden font-display text-base font-bold tracking-[0.07em] text-fg min-[390px]:inline sm:text-lg">
            TRUSTMAN<span className="text-accent">.</span>KAREEM
          </span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-fg transition-colors hover:text-accent">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/audit" className="hidden border border-accent/40 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent transition-colors hover:bg-accent/10 sm:inline-flex">
            Free Audit
          </Link>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 bg-accent-gradient px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-background min-[470px]:inline-flex sm:px-5">
            <Send className="h-3.5 w-3.5" /> Book Call
          </a>
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center border border-line/70 bg-secondary/40 text-fg transition-colors hover:border-accent/50 hover:text-accent lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen ? (
        <div className="border-t border-line/60 bg-background/95 px-4 py-4 shadow-luxury backdrop-blur-xl lg:hidden">
          <nav className="mx-auto grid max-w-7xl grid-cols-2 gap-2 sm:grid-cols-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="border border-line/60 bg-secondary/25 px-4 py-3 text-xs uppercase tracking-[0.14em] text-muted-fg transition-colors hover:border-accent/40 hover:text-accent"
              >
                {item.label}
              </a>
            ))}
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="col-span-2 inline-flex items-center justify-center gap-2 bg-accent-gradient px-4 py-3 text-xs font-bold uppercase tracking-wider text-background sm:hidden"
            >
              <Send className="h-3.5 w-3.5" /> Book Strategy Call
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="relative border-t border-line/60 bg-[#070907]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 border-b border-line/60 pb-10 lg:grid-cols-[1.15fr_1fr_1fr]">
          <div>
            <Link to="/" className="font-display text-xl font-bold tracking-[0.08em]">
              TRUSTMAN<span className="text-accent">.</span>KAREEM
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-fg">
              Performance advertising, traffic-quality systems and localized funnels built for clearer data and responsible scale.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Explore</div>
            <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
              {NAV.map((item) => (
                <a key={item.href} href={item.href} className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-fg transition-colors hover:text-accent">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Standards &amp; Contact</div>
            <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
              <Link to="/privacy" className="text-xs text-muted-fg transition-colors hover:text-accent">Privacy</Link>
              <Link to="/terms" className="text-xs text-muted-fg transition-colors hover:text-accent">Terms</Link>
              <Link to="/responsible-advertising" className="text-xs text-muted-fg transition-colors hover:text-accent">Advertising Principles</Link>
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="text-xs text-muted-fg transition-colors hover:text-accent">Telegram</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-xs text-muted-fg transition-colors hover:text-accent">WhatsApp</a>
              <a href={X_URL} target="_blank" rel="noreferrer" className="text-xs text-muted-fg transition-colors hover:text-accent">X</a>
            </nav>
          </div>
        </div>
        <div className="pt-6 text-xs text-muted-fg">
          © {new Date().getFullYear()} Investor Trustman Kareem. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 text-center">
      <div className="font-serif text-[7rem] font-bold leading-none text-accent-gradient">
        404
      </div>
      <h1 className="mt-2 font-serif text-3xl font-semibold">
        This funnel went dark.
      </h1>
      <p className="mt-4 max-w-md text-muted-fg">
        That page was redacted, moved, or never existed. Let's get you back to
        something profitable.
      </p>
      <Link
        to="/"
        className="luxury-button mt-8"
      >
        Return home
      </Link>
    </div>
  )
}

function RootError({ error }: { error: Error }) {
  const router = useRouter()
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 text-center">
      <div className="font-serif text-6xl font-bold text-accent-gradient">
        Something broke.
      </div>
      <p className="mt-4 max-w-md text-muted-fg">
        A rare miss. The page hit an unexpected error while loading.
      </p>
      {error?.message ? (
        <pre className="mt-4 max-w-full overflow-x-auto border border-line bg-ink-800 px-4 py-3 text-left font-mono text-xs text-muted-fg">
          {error.message}
        </pre>
      ) : null}
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => router.invalidate()}
          className="luxury-button"
        >
          Retry
        </button>
        <Link
          to="/"
          className="luxury-button-outline"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
