import { createFileRoute } from '@tanstack/react-router'
import { PolicyPage } from '@/components/PolicyPage'
import { SITE_URL } from '@/lib/site'

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [
      { title: 'Privacy Policy — Trustman Kareem' },
      { name: 'description', content: 'How Trustman Kareem collects, uses, protects, and retains information submitted through this website.' },
      { property: 'og:title', content: 'Privacy Policy — Trustman Kareem' },
      { property: 'og:description', content: 'A clear explanation of how inquiry information is handled on trustman.elite.' },
    ],
    links: [{ rel: 'canonical', href: SITE_URL + '/privacy' }],
  }),
  component: Privacy,
})

const sections = [
  {
    title: 'Information collected',
    paragraphs: ['Information is collected when you submit the strategy-audit form or contact Trustman through a linked communication platform.'],
    items: ['Name and business email address', 'Business or brand name', 'Monthly advertising budget range', 'Project goals and any information included in your message', 'Basic technical information recorded by hosting and security providers to deliver and protect the website'],
  },
  {
    title: 'How information is used',
    paragraphs: ['Inquiry information is used to evaluate fit, prepare a useful response, communicate about the requested service, prevent abuse, and maintain the security of the website. It is not used to add you to an unrelated mailing list or send unsolicited promotions.'],
  },
  {
    title: 'Form processing and service providers',
    paragraphs: ['Website inquiries are processed through Netlify Forms. If you choose Telegram or another external platform, that provider processes your communication under its own privacy terms. Information may also be handled by essential hosting, security, and professional service providers only when needed to operate the business or comply with law.'],
  },
  {
    title: 'Sharing and sale of information',
    paragraphs: ['Personal information is not sold. It may be disclosed when required by law, to protect legal rights or website security, or to service providers acting on behalf of the business under appropriate confidentiality expectations.'],
  },
  {
    title: 'Retention and security',
    paragraphs: ['Inquiry information is retained only for as long as reasonably necessary to respond, maintain business records, resolve disputes, and meet legal obligations. Reasonable administrative and technical safeguards are used, but no internet transmission or storage system can be guaranteed completely secure.'],
  },
  {
    title: 'Your choices',
    paragraphs: ['You may request access, correction, or deletion of the personal information associated with your inquiry, subject to legal and recordkeeping requirements. Use the website contact form and clearly describe your request.'],
  },
]

function Privacy() {
  return <PolicyPage eyebrow="Privacy" title="Your information deserves clear boundaries." intro="This policy explains what the website collects, why it is collected, and how inquiry information is handled." updated="July 15, 2026" sections={sections} />
}
