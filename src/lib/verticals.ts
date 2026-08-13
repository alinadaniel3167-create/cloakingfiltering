import {
  Bitcoin,
  FlaskConical,
  Gamepad2,
  PhoneCall,
  ShoppingBag,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'

export type Vertical = {
  slug: string
  icon: LucideIcon
  eyebrow: string
  title: string
  /** One sentence. Used on the home-page teaser cards. */
  body: string
  /** Longer read for the /markets collection page. */
  detail: string
  image: string
  alt: string
  niches: string[]
  /** What the engagement actually covers in this vertical. */
  handles: string[]
}

export const verticals: Vertical[] = [
  {
    slug: 'commerce',
    icon: ShoppingBag,
    eyebrow: 'Commerce',
    title: 'E-commerce & Consumer Products',
    body: 'Bots and invalid clicks stay out of the funnel, so attribution stays clean and every market sees the right landing variant.',
    detail:
      'Consumer brands live or die on blended ROAS, and most of the leak is upstream of the checkout. Invalid clicks are filtered before they touch analytics, catalogue and creative are matched to the market, and budget follows the cohorts that actually repeat.',
    image: '/niches/commerce.jpg',
    alt: 'Retail shopping bags arranged on a dark surface',
    niches: ['DTC & retail', 'Beauty & apparel', 'Electronics', 'Subscriptions'],
    handles: ['Catalogue and feed hygiene', 'Currency and shipping variants', 'Repeat-purchase cohort reporting'],
  },
  {
    slug: 'crypto',
    icon: Bitcoin,
    eyebrow: 'Digital Assets',
    title: 'Crypto, Web3 & Financial Offers',
    body: 'Geo-aware delivery for lawful offers, with accurate risk language, eligibility rules and measurable lead quality.',
    detail:
      'Financial offers carry the heaviest eligibility rules of any vertical. Delivery is scoped to the markets where the product is lawful, risk language is carried through every variant rather than buried, and lead quality is scored past the signup so spend follows funded accounts, not form fills.',
    image: '/niches/crypto.jpg',
    alt: 'Candlestick trading chart on a dark screen',
    niches: ['Crypto platforms', 'Web3 products', 'Prop trading', 'Fintech leads'],
    handles: ['Jurisdiction eligibility rules', 'Risk disclosure in every variant', 'Funded-account lead scoring'],
  },
  {
    slug: 'gaming',
    icon: Gamepad2,
    eyebrow: 'Gaming',
    title: 'Regulated Gambling & Gaming',
    body: 'Age-gated, location-aware filtering built around each jurisdiction and the network reviewing the campaign.',
    detail:
      'Every licensed market has its own rules on who may see an advert and what it may promise. Age gates and location checks run server-side before the page renders, and creative is versioned per jurisdiction so one campaign does not carry another market’s claims.',
    image: '/niches/gaming.jpg',
    alt: 'Neon-lit slot machines on a casino floor',
    niches: ['Licensed sportsbooks', 'Online casino', 'Social gaming', 'Subscriptions'],
    handles: ['Age and location gating', 'Per-jurisdiction creative sets', 'Responsible-play messaging'],
  },
  {
    slug: 'wellness',
    icon: FlaskConical,
    eyebrow: 'Wellness',
    title: 'Peptides, Nutra & CBD',
    body: 'Careful campaign architecture for legally marketable products: claims review, audience qualification, regional limits.',
    detail:
      'The constraint here is the claim, not the traffic. Copy is reviewed against what the product may lawfully say in each region, audiences are qualified before they reach an offer, and restricted markets are excluded at the delivery layer instead of being cleaned up after a rejection.',
    image: '/niches/wellness.jpg',
    alt: 'Blister packs of tablets and capsules',
    niches: ['Peptide brands', 'Nutraceuticals', 'CBD products', 'Health plans'],
    handles: ['Claims review per region', 'Audience qualification steps', 'Restricted-market exclusion'],
  },
  {
    slug: 'leadgen',
    icon: PhoneCall,
    eyebrow: 'Lead Generation',
    title: 'Travel, Calls & Service Funnels',
    body: 'Qualified lead and call flows for service businesses with clear identity, pricing context and recorded consent.',
    detail:
      'Call and form funnels are judged on what happens after the click. Who is calling and on whose behalf is stated up front, pricing context sits with the offer rather than behind it, consent is recorded, and lead quality is fed back from the sales floor into the buying decisions.',
    image: '/niches/leadgen.jpg',
    alt: 'Aircraft wing above clouds at sunset',
    niches: ['Flights & travel', 'Home services', 'Insurance leads', 'Tech support'],
    handles: ['Caller identity and consent', 'Routing and call-quality scoring', 'Closed-loop CRM feedback'],
  },
  {
    slug: 'mobile',
    icon: Smartphone,
    eyebrow: 'Mobile',
    title: 'Apps, Push & Native Acquisition',
    body: 'Mobile-first funnels designed around informed opt-in, fast responsive pages and accurate install tracking.',
    detail:
      'Mobile buying is won on page weight and measurement. Landing variants are built to render on a mid-range handset over mobile data, push opt-in is asked for in context rather than forced, and install and post-install events are reconciled so the reported CPI matches reality.',
    image: '/niches/mobile.jpg',
    alt: 'Smartphone home screen showing application icons',
    niches: ['iOS & Android', 'Opt-in push', 'Native ads', 'Subscriptions'],
    handles: ['Sub-second mobile page loads', 'Contextual push opt-in', 'Install and event reconciliation'],
  },
]
