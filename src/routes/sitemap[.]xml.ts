import { createFileRoute } from '@tanstack/react-router'
import { caseStudies } from '@/lib/case-studies'
import { SITE_URL } from '@/lib/site'

const STATIC_PATHS = [
  { path: '/', priority: '1.0', freq: 'weekly' },
  { path: '/services', priority: '0.9', freq: 'monthly' },
  { path: '/markets', priority: '0.9', freq: 'monthly' },
  { path: '/audit', priority: '0.9', freq: 'monthly' },
  { path: '/case-studies', priority: '0.8', freq: 'weekly' },
  { path: '/proof', priority: '0.8', freq: 'monthly' },
  { path: '/playbook', priority: '0.8', freq: 'monthly' },
  { path: '/guides/tiktok-ads-cloaking', priority: '0.7', freq: 'monthly' },
  { path: '/privacy', priority: '0.3', freq: 'yearly' },
  { path: '/terms', priority: '0.3', freq: 'yearly' },
  { path: '/responsible-advertising', priority: '0.6', freq: 'yearly' },
]

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () => {
        const urls = [
          ...STATIC_PATHS.map(
            (p) =>
              `  <url>\n    <loc>${SITE_URL}${p.path}</loc>\n    <changefreq>${p.freq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`,
          ),
          ...caseStudies.map(
            (c) =>
              `  <url>\n    <loc>${SITE_URL}/case-studies/${c.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
          ),
        ].join('\n')

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

        return new Response(xml, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        })
      },
    },
  },
})
