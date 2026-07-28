import { createFileRoute } from '@tanstack/react-router'
import { PolicyPage } from '@/components/PolicyPage'
import { SITE_URL } from '@/lib/site'

export const Route = createFileRoute('/responsible-advertising')({
  head: () => ({
    meta: [
      { title: 'Responsible Advertising Principles — Trustman Kareem' },
      { name: 'description', content: 'Principles for responsible traffic filtering, localization, measurement, landing-page delivery, and performance advertising.' },
      { property: 'og:title', content: 'Responsible Advertising Principles — Trustman Kareem' },
      { property: 'og:description', content: 'How traffic-quality and localization systems should protect data without deceiving people or platforms.' },
    ],
    links: [{ rel: 'canonical', href: SITE_URL + '/responsible-advertising' }],
  }),
  component: ResponsibleAdvertising,
})

const sections = [
  {
    title: 'The purpose of filtering',
    paragraphs: ['Traffic filtering should improve security, data quality, relevance, and operational control. Appropriate uses include blocking known bots and fraud, protecting analytics, managing unsupported locations, applying legitimate eligibility rules, and delivering language or currency that helps a real visitor understand the offer.'],
  },
  {
    title: 'A consistent core offer',
    paragraphs: ['The advertiser, product, claims, pricing, material terms, required disclosures, and intended customer action should remain materially consistent across legitimate visitor experiences and platform review. Localization may improve comprehension, but it should not hide the commercial purpose or replace the offer with a misleading version.'],
  },
  {
    title: 'Prohibited practices',
    paragraphs: ['Services should not be used to conceal unlawful or unsupported offers, evade enforcement, show reviewers a materially different business, fabricate social proof, impersonate independent publishers, bypass geographic restrictions without authority, or collect information without an appropriate basis and disclosure.'],
  },
  {
    title: 'Evidence before claims',
    paragraphs: ['Performance claims, testimonials, comparisons, and case-study numbers should be accurate, supportable, and presented with enough context to avoid creating a false expectation. Important limitations, eligibility conditions, recurring charges, risks, and customer obligations should be visible before conversion.'],
  },
  {
    title: 'Monitoring and accountability',
    paragraphs: ['Campaign systems should be monitored for broken pages, tracking errors, invalid traffic, inconsistent content, customer complaints, refund patterns, and policy changes. Material issues should be corrected or paused rather than hidden. Clients remain responsible for approving their offer, claims, fulfillment, and legal requirements.'],
  },
  {
    title: 'Right to decline work',
    paragraphs: ['Projects may be declined or ended when the offer, intended routing, claims, data practices, or requested tactics conflict with these principles, applicable law, or platform requirements. Short-term performance does not justify misleading customers or concealing material facts.'],
  },
]

function ResponsibleAdvertising() {
  return <PolicyPage eyebrow="Operating Standard" title="Filter bad traffic. Never hide the truth." intro="These principles define how traffic-quality, localization, and performance systems should be designed and operated." updated="July 15, 2026" sections={sections} />
}
