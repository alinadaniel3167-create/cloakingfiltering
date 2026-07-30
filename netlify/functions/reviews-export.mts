import type { Config } from '@netlify/functions'
import { desc } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { reviews } from '../../db/schema.js'
import { getAdmin, json } from './_lib/reviews.mjs'

const csvCell = (value: unknown) => `"${String(value ?? '').replaceAll('"', '""')}"`

export default async (req: Request) => {
  const admin = await getAdmin()
  if (!admin) return json({ error: 'Admin access required.' }, 401)
  const rows = await db.select().from(reviews).orderBy(desc(reviews.submittedAt))
  const headers = ['id', 'status', 'client_name', 'email', 'business', 'service', 'project_title', 'project_date', 'rating', 'verified', 'featured', 'helpful_count', 'submitted_at']
  const lines = rows.map((row) => [row.id, row.status, row.clientName, row.email, row.business, row.service, row.projectTitle, row.projectDate, row.rating, row.verified, row.featured, row.helpfulCount, row.submittedAt.toISOString()].map(csvCell).join(','))
  return new Response([headers.join(','), ...lines].join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="client-proof-reviews.csv"',
      'Cache-Control': 'no-store',
    },
  })
}

export const config: Config = {
  path: '/api/reviews/admin/export',
}
