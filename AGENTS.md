# AGENTS.md

Overview of this project for developers and AI agents working on the codebase.

## Project

A dark-themed portfolio / lead-gen site for a performance advertising strategist ("Investor Trustman Kareem"). It is a mostly content-driven marketing site built on TanStack Start with a small amount of interactivity (ROI calculator, animated reveals, contact forms). There is no application database — content lives in typed TypeScript modules under `src/lib/`.

## Tech stack

TanStack Start v1 · React 19 · TanStack Router v1 (file-based routing) · TanStack Query v5 · Vite 7 · Tailwind CSS v4 · TypeScript 5 (strict). Deployed on Netlify (Cloudflare Workers runtime) via `@netlify/vite-plugin-tanstack-start`.

## Directory structure

```
public/
  __forms.html        # Static skeleton so Netlify detects the "audit-request" form at build time
  robots.txt
  llms.txt            # AI-crawler summary of pages + guides
  og.png              # 1200x630 social card (brand fonts + palette)
  niches/*.jpg        # One photograph per vertical, 1200x675 (Unsplash license)
  work/*.jpg          # Real platform screenshots behind /proof (see work-archive.ts)
src/
  components/         # Reusable UI + effect components (see below)
  lib/
    case-studies.ts   # Case-study content + getCaseStudy(slug) lookup
    verticals.ts      # The six markets: copy, photo, chips — shared by / and /markets
    work-archive.ts   # The working archive: screenshot metadata, categories, featuredWork
    site.ts           # Site-wide constants (URL, Telegram, email, owner)
    query.ts          # Shared QueryClient singleton
  routes/
    __root.tsx        # HTML shell, fonts, global meta/OG/Twitter, Organization JSON-LD,
                      # QueryClientProvider, header, footer, 404 + error components
    index.tsx         # Home — teasers only; depth lives on the pages below
    services.tsx      # /services (service detail, process, filtering reveal, ROI, pricing, FAQ)
    markets.tsx       # /markets (six-vertical collection + ItemList JSON-LD)
    proof.tsx         # /proof (working archive of real screenshots + ImageGallery JSON-LD)
    audit.tsx         # /audit
    playbook.tsx      # /playbook
    case-studies/
      index.tsx       # /case-studies (+ CampaignShowcase and ClientProofReviews)
      $slug.tsx       # /case-studies/:slug (loader + notFound + Article JSON-LD)
    guides/
      tiktok-ads-cloaking.tsx
    sitemap[.]xml.ts  # /sitemap.xml dynamic server route ([.] escapes the literal dot)
  router.tsx          # createRouter with { queryClient } context
  styles.css          # Tailwind v4 @theme tokens, keyframes, utilities
```

## Page structure

The home page is a set of teasers — hero, about, three service cards, three of the six
markets, three results, field notes, contact. Anything longer than a teaser belongs on a
collection page (`/services`, `/markets`, `/case-studies`) and gets linked from the home
page, not appended to it. Keep it that way when adding content.

## Components (`src/components/`)

- **Reveal** — scroll-in fade/slide via IntersectionObserver; `as` prop for element type, `delay` for stagger.
- **SectionTitle** — badge + heading pair used by every section; `as="h1"` for the one page-level heading.
- **Counter** — number counts up (easeOutExpo) when scrolled into view; supports `decimals`, `prefix`, `suffix`.
- **Marquee** — seamless infinite horizontal scroll, pauses on hover.
- **Particles** — ambient drifting accent flecks, injected client-side after mount (SSR-safe).
- **CursorGlow** — accent glow that trails the pointer; disabled on touch / reduced-motion. Mounted once in the root.
- **CloakReveal** — thematic toggle switching a panel between a "reviewer/safe" view and a "traffic/money" view.
- **FilteringReveal** — drag-to-compare validation/delivery panels on `/services`; stacks on small screens.
- **ProofGallery** — filterable screenshot grid on `/proof` with a keyboard-driven lightbox (Esc, arrows) and body-scroll lock.
- **Faq** — accessible single-open accordion (`aria-expanded` / `aria-controls`).
- **RoiCalculator** — three labeled range sliders projecting incremental revenue.
- **ContactForms** — Telegram (composes + copies a message, opens the chat) and Email (Netlify Form) side by side.

## Conventions

- **Styling**: Tailwind utility classes only; theme tokens defined in `styles.css` under `@theme` (`background`, `card`, `secondary`, `accent`, `ember`, `fg`, `muted-fg`, `line`, fonts, glow shadows). Reusable patterns via `@layer utilities` (`.panel`, `.text-accent-gradient`, `.accent-rule`, `.duotone`) plus the `.niche-card` / `.niche-figure` photo system. No CSS-in-JS.
- **Imports**: use the `@/` alias for `src/*`.
- **TypeScript**: strict, with `noUnusedLocals` / `noUnusedParameters` on — remove unused imports/params or the build fails.
- **Motion**: animate `transform`/`opacity` only; a `prefers-reduced-motion` block in `styles.css` neutralizes animations.
- **SEO**: every route defines its own `head()` with title, description, OG/Twitter tags, and a canonical link. JSON-LD is emitted via `head().scripts` (Organization on root, Article/TechArticle on content pages). One `<h1>` per page.
- **Icons**: inline SVG with `currentColor` — no emoji in UI.

## Non-obvious decisions

- **QueryClient is a module singleton** (`src/lib/query.ts`), imported both into the router context and the root shell's `QueryClientProvider`. This avoids relying on route-context access inside `shellComponent` and keeps the provider unambiguous under SSR. There are no live queries yet; the provider is in place for future data needs.
- **Root uses `shellComponent`** (not `component` + `<Outlet />`). The shell receives `children`, which is the rendered route tree; `notFoundComponent` and `errorComponent` on the root render inside it.
- **Netlify Forms + SSR**: the React form in `ContactForms.tsx` submits via `fetch` to `/__forms.html` (the static skeleton), NOT to `/` — in SSR apps `fetch('/')` is swallowed by the server function. The form name `audit-request` and every field must stay in sync between the component and `public/__forms.html`. The feature is activated via a marker at `.netlify/features/netlify-forms`; re-run the netlify-forms skill's `enable.cjs` if that marker is lost.
- **Content is code**: case studies and page copy are hardcoded in typed modules, not a CMS or database — deliberate for a small, fast, single-owner site.
- **The working archive is evidence, not decoration**: `public/work/*.jpg` are captures from live accounts. Crop or redact anything identifying a client or exposing infrastructure (server IPs, tracker hosts) *before* the file lands in `public/`, and say so in that entry's `caption` rather than editing pixels silently. Creative categories the site refuses on `/markets` — scareware, system-lock pages, support-line impersonation — stay out of the archive too, whatever gets uploaded.

## Editing content

- Add or edit a case study in `src/lib/case-studies.ts` (the index, dynamic page, sitemap, and `llms.txt` all read from it — remember to update `llms.txt` and `public/__forms.html` by hand as they are static).
- Add a screenshot to the working archive by dropping the processed file in `public/work/` and appending an entry to `src/lib/work-archive.ts`; `/proof`, its JSON-LD, and the home-page strip all read from that array.
- Update contact details in `src/lib/site.ts`.

## Build / dev

`npm run dev` (Vite, port 3000) or `netlify dev --port 8889` for platform emulation. `npm run build` outputs to `dist/client`. Do not commit `src/routeTree.gen.ts` edits by hand — it is generated by the router plugin.
