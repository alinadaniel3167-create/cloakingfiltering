# Trustman — Elite Performance Strategist

A premium, dark-themed personal portfolio and lead-generation site for **Investor Trustman Kareem**, a performance advertising strategist specializing in compliance-aware cloaking, traffic filtering, bot and fraud reduction, geo-targeted funnels, localization, affiliate scaling, and managed media buying.

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start v1 |
| Frontend | React 19, TanStack Router v1 |
| Data/queries | TanStack Query v5 |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 (`src/styles.css`) |
| Fonts | Playfair Display (serif headings) + Inter (body), via Google Fonts |
| Forms | Netlify Forms |
| Language | TypeScript 5 (strict) |
| Deployment | Netlify (Cloudflare Workers runtime) |

## Design

Near-black canvas (`#0a0a0a`) with a warm gold primary (`#d4af5f`), layered gradient meshes, a fine grain overlay, floating gold particles, a cursor-tracking glow, and gold-glow shadows on hover. Serif display type paired with a clean sans body. The voice throughout is operator-to-operator: real campaigns, real numbers, names redacted.

## Pages

- `/` — Home: cloaking and filtering value, services, process, traffic-quality comparison, results, pricing, case-study teasers, calculator, contact forms, and FAQs.
- `/audit` — Free audit of cloaking, traffic filtering, funnels, measurement, and media buying with a 30-day growth roadmap.
- `/playbook` — The 2026 Cloaker Playbook, focused on bot filtering, fraud reduction, transparent landing pages, localization, and durable paid-media operations.
- `/case-studies` — Index of redacted case studies (vertical, duration, spend, ROAS, revenue).
- `/case-studies/$slug` — Dynamic case-study pages driven by `src/lib/case-studies.ts`.
- `/guides/tiktok-ads-cloaking` — 2026 guide to valuable cloaking and traffic filtering for TikTok campaigns.
- `/sitemap.xml` — Dynamic sitemap server route.

Plus `public/robots.txt` and `public/llms.txt` (an AI-crawler summary of the site).

## Running locally

```bash
npm install
npm run dev        # Vite dev server on http://localhost:3000
```

Or with the Netlify CLI for platform emulation (Forms, etc.):

```bash
netlify dev --port 8889
```

> **Note:** Netlify Forms submissions only work on a deployed site / deploy preview, not in local dev.

## Telegram form notifications

Strategy audit submissions are stored in Netlify Forms and forwarded to Telegram by a form-submission event function. Configure `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as Netlify environment variables. The bot must be allowed to send messages to the configured chat.

## Building

```bash
npm run build      # Production build (output in dist/client)
```

## Contact

Telegram — [@Frank_7766](https://t.me/Frank_7766)
