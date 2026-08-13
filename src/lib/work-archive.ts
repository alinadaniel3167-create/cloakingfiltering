/**
 * The working archive: real platform screenshots from delivered engagements.
 *
 * Every entry points at a file in `public/work/`. Images are captured from live
 * accounts, so anything that identifies a client or exposes infrastructure is
 * cropped or redacted before it lands in `public/` — note it in `caption` when
 * that happens, rather than quietly editing the pixels.
 */

export const workCategories = ['Paid Media', 'Tracking & Infrastructure', 'Store & SEO'] as const

export type WorkCategory = (typeof workCategories)[number]

export type WorkItem = {
  slug: string
  image: string
  /** Intrinsic size — set on the <img> so the grid never reflows on load. */
  width: number
  height: number
  alt: string
  title: string
  platform: string
  category: WorkCategory
  period: string
  caption: string
  metrics?: { label: string; value: string }[]
}

export const workArchive: WorkItem[] = [
  {
    slug: 'google-ads-search-scale',
    image: '/work/google-ads-search-scale.jpg',
    width: 1000,
    height: 2164,
    alt: 'Google Ads search keywords report showing a $3,000 daily budget and $63,907 total cost',
    title: 'Search at a $3,000 daily budget',
    platform: 'Google Ads',
    category: 'Paid Media',
    period: 'Aug 2026',
    caption:
      'Keyword-level view of a US search build. Four head terms carry the account, each reported on its own cost and click volume rather than averaged into a campaign total — which is the only way to see which term is actually paying for the others.',
    metrics: [
      { label: 'Spend', value: '$63.9K' },
      { label: 'Clicks', value: '36,380' },
      { label: 'Impressions', value: '597K' },
    ],
  },
  {
    slug: 'meta-ads-campaigns',
    image: '/work/meta-ads-campaigns.jpg',
    width: 1400,
    height: 406,
    alt: 'Meta Ads Manager campaign table showing South Africa and UAE campaigns with cost per result and frequency',
    title: 'Campaign structure split by market',
    platform: 'Meta Ads Manager',
    category: 'Paid Media',
    period: 'Mar 2025',
    caption:
      'Parallel campaigns split by geo and budget tier so cost per purchase reads per market instead of blended. Frequency held between 1.1 and 1.4 across the set, which keeps creative fatigue out of the numbers.',
    metrics: [
      { label: 'Cost / result', value: '$4.59–$9.22' },
      { label: 'Frequency', value: '1.12–1.34' },
      { label: 'Markets', value: 'ZA · UAE' },
    ],
  },
  {
    slug: 'push-network-campaigns',
    image: '/work/push-network-campaigns.jpg',
    width: 1400,
    height: 855,
    alt: 'Push advertising network dashboard listing active campaigns for USA, India and France with per-geo bids',
    title: 'Multi-geo push campaign set',
    platform: 'Push network',
    category: 'Paid Media',
    period: 'Ongoing',
    caption:
      'Country-split campaigns with the bid set per geo rather than globally — $0.01 where the inventory is cheap, $0.15 where it converts. At this end of the market, bid discipline is most of the margin.',
    metrics: [
      { label: 'Impressions', value: '535K' },
      { label: 'Clicks', value: '42K' },
      { label: 'Bid range', value: '$0.01–$0.15' },
    ],
  },
  {
    slug: 'rollerads-campaigns',
    image: '/work/rollerads-campaigns.jpg',
    width: 1400,
    height: 786,
    alt: 'RollerAds campaigns dashboard with fifteen campaigns in moderation across OnClick, Push, In-Page Push and Calendar formats',
    title: 'Format spread across one offer',
    platform: 'RollerAds',
    category: 'Paid Media',
    period: 'Aug',
    caption:
      'Fifteen campaigns queued across OnClick, Push, In-Page Push and Calendar placements, each on its own bid model — CPA, CPM, SmartCPC — so no single format ends up setting the price for the rest.',
    metrics: [
      { label: 'Campaigns', value: '15' },
      { label: 'Formats', value: '4' },
      { label: 'Bid models', value: 'CPA · CPM · SmartCPC' },
    ],
  },
  {
    slug: 'bid-optimizer',
    image: '/work/bid-optimizer.jpg',
    width: 1400,
    height: 752,
    alt: 'Campaign optimizer showing per-subscriber-list micro bidding with winrate and eCPA columns',
    title: 'Micro-bidding by subscriber list',
    platform: 'Optimizer',
    category: 'Paid Media',
    period: '2021 → ongoing',
    caption:
      'Per-list bidding on a broadband offer. Lists that convert get a custom bid, the rest get paused. Winrate and eCPA are the only two columns that decide it — everything else is noise at this granularity.',
    metrics: [
      { label: 'Lists managed', value: '12+' },
      { label: 'Best winrate', value: '88.08%' },
      { label: 'eCPC', value: '$0.008–$0.009' },
    ],
  },
  {
    slug: 'keitaro-clicks-log',
    image: '/work/keitaro-clicks-log.jpg',
    width: 1400,
    height: 1012,
    alt: 'Keitaro click log listing TikTok traffic from Brazilian states and cities with OS, browser and connection type',
    title: 'Click-level logging: TikTok into Brazil',
    platform: 'Keitaro',
    category: 'Tracking & Infrastructure',
    period: 'Live',
    caption:
      'Every click stored with source, state, city, OS, browser and connection type. This is what makes traffic quality arguable after the fact instead of guessed at — and what a filtering rule gets written against.',
    metrics: [
      { label: 'Clicks logged', value: '128' },
      { label: 'Source', value: 'TikTok' },
      { label: 'Geo depth', value: 'State + city' },
    ],
  },
  {
    slug: 'keitaro-domain-setup',
    image: '/work/keitaro-domain-setup.jpg',
    width: 1400,
    height: 600,
    alt: 'Keitaro domain management screen showing a campaign domain registered through Namecheap with HTTPS-only enabled',
    title: 'Tracker domains on HTTPS-only',
    platform: 'Keitaro · Namecheap',
    category: 'Tracking & Infrastructure',
    period: 'Live',
    caption:
      'Campaign domain attached to the tracker with HTTPS-only enforced, mid DNS propagation. The server address is redacted — publishing a live tracker IP is an invitation, not a credential.',
  },
  {
    slug: 'dns-nameservers',
    image: '/work/dns-nameservers.jpg',
    width: 1400,
    height: 1050,
    alt: 'DigitalOcean domain records panel showing three NS records delegating a campaign domain',
    title: 'Nameserver delegation',
    platform: 'DigitalOcean DNS',
    category: 'Tracking & Infrastructure',
    period: 'Live',
    caption:
      'NS records delegating the campaign domain to DigitalOcean so records move on my schedule instead of the registrar’s — with MX preserved first, because pointing nameservers before mail records is how a domain loses its email.',
  },
  {
    slug: 'grooming-store-build',
    image: '/work/grooming-store-build.jpg',
    width: 268,
    height: 1080,
    alt: 'Full-page view of a men’s grooming e-commerce storefront with category sections, product grids and an email capture footer',
    title: 'Grooming storefront, front to footer',
    platform: 'Shopify',
    category: 'Store & SEO',
    period: '2024',
    caption:
      'A full storefront build in one scroll: hero, category split across devices and grooming essentials, two product grids, a trust row and email capture. Every block earns its place on the way to the cart.',
  },
  {
    slug: 'shopify-seo-optimized',
    image: '/work/shopify-seo-optimized.jpg',
    width: 1200,
    height: 856,
    alt: 'StoreSEO product list showing eight jewellery products marked optimized with a score of 97 each',
    title: 'Catalogue-wide product SEO',
    platform: 'StoreSEO · Shopify',
    category: 'Store & SEO',
    period: '2024',
    caption:
      'Focus keyword, title and meta written per product and scored across the catalogue rather than on the hero SKUs alone — three pages deep, every row sitting at 97.',
    metrics: [
      { label: 'Score', value: '97 / 100' },
      { label: 'Coverage', value: 'Full catalogue' },
      { label: 'Depth', value: '3 pages' },
    ],
  },
  {
    slug: 'search-console-verified',
    image: '/work/search-console-verified.jpg',
    width: 1400,
    height: 621,
    alt: 'Google Search Console confirming domain ownership auto-verified through the domain name provider',
    title: 'Search Console verified at DNS level',
    platform: 'Google Search Console',
    category: 'Store & SEO',
    period: '2026',
    caption:
      'Property verified through the domain name provider rather than by file upload, so verification survives a theme change, a replatform, or anyone clearing the storefront root.',
  },
]

export const workByCategory = (category: WorkCategory) => workArchive.filter(item => item.category === category)

/**
 * The four used for the home-page strip. Picked by hand rather than sliced off
 * the front: thumbnails crop to 16/10 from the top, so the tall phone captures
 * would show nothing but a status bar.
 */
export const featuredWork = ['meta-ads-campaigns', 'keitaro-clicks-log', 'rollerads-campaigns', 'shopify-seo-optimized']
  .map(slug => workArchive.find(item => item.slug === slug))
  .filter((item): item is WorkItem => Boolean(item))
