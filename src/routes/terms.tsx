import { createFileRoute } from '@tanstack/react-router'
import { PolicyPage } from '@/components/PolicyPage'
import { SITE_URL } from '@/lib/site'

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: [
      { title: 'Terms of Use — Trustman Kareem' },
      { name: 'description', content: 'Terms governing use of the Trustman Kareem website, content, inquiries, and performance advertising services.' },
      { property: 'og:title', content: 'Terms of Use — Trustman Kareem' },
      { property: 'og:description', content: 'Website and service terms for trustman.elite.' },
    ],
    links: [{ rel: 'canonical', href: SITE_URL + '/terms' }],
  }),
  component: Terms,
})

const sections = [
  {
    title: 'Website purpose',
    paragraphs: ['This website provides general information about performance advertising strategy, traffic-quality systems, localization, audits, and managed services. Viewing the website or submitting an inquiry does not create a client relationship. A service relationship begins only through a separate written agreement.'],
  },
  {
    title: 'No guaranteed results',
    paragraphs: ['Advertising and business outcomes depend on many factors outside any strategist’s control, including the offer, market, budget, platform decisions, creative quality, competition, tracking, customer experience, and execution. Examples and case studies describe specific circumstances and do not guarantee the same result for another business.'],
  },
  {
    title: 'Lawful and responsible use',
    paragraphs: ['You agree not to use the website, recommendations, or services for unlawful activity, fraud, deceptive advertising, platform-review evasion, impersonation, unauthorized data collection, or materially misleading content. Traffic filtering and localization must preserve the truth of the offer and follow applicable laws and platform requirements.'],
  },
  {
    title: 'Client responsibilities',
    paragraphs: ['Clients remain responsible for the legality, accuracy, substantiation, fulfillment, pricing, disclosures, customer support, and platform compliance of their products, services, advertisements, and landing pages. Clients must provide accurate information and maintain the permissions needed for any accounts, data, creative, or systems they supply.'],
  },
  {
    title: 'Content and intellectual property',
    paragraphs: ['Unless otherwise stated, the website design, copy, guides, frameworks, and original materials belong to Trustman Kareem and may not be copied, republished, sold, or presented as another party’s work without permission. Reasonable linking and brief quotation with attribution are permitted.'],
  },
  {
    title: 'Third-party services and changes',
    paragraphs: ['Links to advertising platforms, messaging services, and other third parties are provided for convenience. Their availability, policies, and content are outside this website’s control. These terms may be updated when services, laws, or operating practices change; the date shown on this page identifies the latest version.'],
  },
]

function Terms() {
  return <PolicyPage eyebrow="Terms" title="Clear expectations create better partnerships." intro="These terms explain the boundaries for using this website and engaging with the services described here." updated="July 15, 2026" sections={sections} />
}
