export interface CaseStudyMetric {
  label: string
  value: string
}

export interface CaseStudy {
  slug: string
  vertical: string
  title: string
  teaser: string
  duration: string
  spend: string
  roas: string
  revenue: string
  network: string
  geos: string
  challenge: string
  approach: { title: string; body: string }[]
  results: CaseStudyMetric[]
  testimonial?: { quote: string; attribution: string }
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'crypto-prop-trading-scale',
    vertical: 'Crypto / Prop Trading',
    title: 'Scaling a prop-trading offer to $2.4M in 90 days',
    teaser:
      'A funded-trader offer stuck at $30K/day broke through to seven figures a month after its cloaking, traffic-filtering, and geo-routing architecture was rebuilt.',
    duration: '90 days',
    spend: '$338K',
    roas: '7.1x',
    revenue: '$2.4M',
    network: 'Meta + Google',
    geos: 'Tier-1 (US, CA, UK, AU)',
    challenge:
      'The operator had a converting funnel but unreliable traffic quality, inconsistent geo delivery, and weak visibility into bot and datacenter activity. Every scale attempt made attribution less trustworthy and cash flow more difficult to predict.',
    approach: [
      {
        title: 'Rebuilt cloaking and filtering from the request layer up',
        body: 'Replaced the off-the-shelf script with server-side traffic validation, bot and datacenter filtering, consistent offer delivery, and cleaner conversion measurement.',
      },
      {
        title: 'Segmented traffic by geo and intent',
        body: 'Split Tier-1 geos into dedicated funnel variants with appropriate language, currency, eligibility details, and proof while keeping the underlying offer and terms consistent.',
      },
      {
        title: 'Introduced traffic-quality and spend guardrails',
        body: 'Used controlled budget ramps, invalid-traffic alerts, landing consistency checks, and measurement thresholds so spend increased only when the data remained reliable.',
      },
      {
        title: 'Tightened the offer-to-creative feedback loop',
        body: 'Daily creative iteration against cohort ROAS, not vanity CTR — winners scaled, losers cut inside 24 hours.',
      },
    ],
    results: [
      { label: 'Total revenue', value: '$2.4M' },
      { label: 'Blended ROAS', value: '7.1x' },
      { label: 'Ad spend', value: '$338K' },
      { label: 'Peak daily spend', value: '$41K' },
      { label: 'Campaign stability', value: '3.5x longer' },
      { label: 'Time to break-even', value: 'Day 6' },
    ],
    testimonial: {
      quote:
        'We went from praying our accounts survived the week to scaling on schedule. The difference was infrastructure, not luck.',
      attribution: 'Operator, funded-trader offer (name redacted)',
    },
  },
  {
    slug: 'nutra-affiliate-peak-roas',
    vertical: 'Nutra / Affiliate',
    title: 'An affiliate nutra campaign hitting 18.2x peak ROAS',
    teaser:
      'Native + TikTok traffic on a supplement offer used filtering and localized delivery to reach 18.2x peak ROAS during the strongest scale window.',
    duration: '120 days',
    spend: '$196K',
    roas: '18.2x peak',
    revenue: '$1.9M',
    network: 'Native + TikTok',
    geos: 'US, DE, BR (localized)',
    challenge:
      'A solo affiliate had a strong angle but mixed traffic quality, incomplete localization, and one generic landing experience across three very different markets. The team could not separate offer problems from invalid traffic or market mismatch.',
    approach: [
      {
        title: 'Filtered traffic with localized advertorial variants',
        body: 'Applied bot and invalid-traffic controls, then delivered US, German, and Brazilian variants with market-appropriate language, proof, pricing, and disclosures.',
      },
      {
        title: 'TikTok traffic-quality system',
        body: 'Combined server-side filtering, verified tracking, mobile landing QA, and pacing rules that kept campaign decisions focused on qualified traffic and real conversion quality.',
      },
      {
        title: 'Cohort-level quality analysis',
        body: 'Compared valid traffic, customer intent, refunds, and ROAS by market and creative cohort, then shifted budget toward the combinations producing stronger margin.',
      },
    ],
    results: [
      { label: 'Peak ROAS', value: '18.2x' },
      { label: 'Blended ROAS', value: '9.7x' },
      { label: 'Total revenue', value: '$1.9M' },
      { label: 'Ad spend', value: '$196K' },
      { label: 'Winning geos', value: '3 localized' },
      { label: 'Landing pages tested', value: '47' },
    ],
    testimonial: {
      quote:
        'I stopped losing accounts and started compounding. The localized variants alone doubled my conversion rate in Germany.',
      attribution: 'Affiliate operator, nutra vertical (name redacted)',
    },
  },
  {
    slug: 'dtc-ecom-incremental-growth',
    vertical: 'DTC / Ecommerce',
    title: 'Driving +$58M incremental revenue for a DTC brand',
    teaser:
      'A nine-figure ecommerce brand plateaued on Meta; a rebuilt geo-funnel architecture and disciplined media buying added $58M in incremental revenue over the engagement.',
    duration: '14 months',
    spend: '$11.4M',
    roas: '5.1x incremental',
    revenue: '+$58M',
    network: 'Meta + Google + TikTok',
    geos: 'US, CA, UK, EU',
    challenge:
      'The brand had scaled to eight figures but Meta efficiency was collapsing — CAC climbing, ROAS drifting toward break-even. Their in-house team was optimizing inside a broken account structure and couldn\'t see where the leak was.',
    approach: [
      {
        title: 'Restructured the account and geo architecture',
        body: 'Rebuilt campaign structure around clean geo and audience separation so budget flowed to the cohorts that actually returned, instead of averaging performance across everything.',
      },
      {
        title: 'Landing variants matched to traffic temperature',
        body: 'Cold prospecting, warm retargeting, and returning-customer traffic each hit purpose-built pages — no more one-size funnel diluting conversion.',
      },
      {
        title: 'Incrementality-first measurement',
        body: 'Held out geos to measure true incremental lift rather than platform-reported ROAS, then reallocated spend toward channels that actually moved the P&L.',
      },
      {
        title: 'Managed media buying across three platforms',
        body: 'Day-to-day buying, budget pacing, and creative rotation run as a single coordinated operation across Meta, Google, and TikTok.',
      },
    ],
    results: [
      { label: 'Incremental revenue', value: '+$58M' },
      { label: 'Incremental ROAS', value: '5.1x' },
      { label: 'Ad spend managed', value: '$11.4M' },
      { label: 'CAC reduction', value: '-31%' },
      { label: 'Engagement length', value: '14 months' },
      { label: 'Platforms', value: '3 coordinated' },
    ],
    testimonial: {
      quote:
        'We thought we\'d hit our ceiling. Turned out we\'d hit the ceiling of our account structure. Rebuilt, the numbers moved fast.',
      attribution: 'Head of Growth, DTC brand (name redacted)',
    },
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}
