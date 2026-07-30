import { randomUUID } from 'node:crypto'
import type { Config, Context } from '@netlify/functions'
import { and, eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { reviewReports, reviews } from '../../db/schema.js'
import { cleanText, json, requestFingerprint, validateOrigin } from './_lib/reviews.mjs'

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405)
  if (!validateOrigin(req)) return json({ error: 'Invalid request origin.' }, 403)
  const reviewId = context.params.id
  const form = await req.formData()
  const reason = cleanText(form.get('reason'), 300)
  if (reason.length < 5) return json({ error: 'Tell us why this review should be checked.' }, 400)
  const [review] = await db.select({ id: reviews.id }).from(reviews).where(and(eq(reviews.id, reviewId), eq(reviews.status, 'approved'))).limit(1)
  if (!review) return json({ error: 'Review not found.' }, 404)
  try {
    await db.insert(reviewReports).values({
      id: randomUUID(),
      reviewId,
      reporterHash: requestFingerprint(context.ip),
      reason,
    })
  } catch {
    return json({ ok: true, alreadyReported: true })
  }
  return json({ ok: true })
}

export const config: Config = {
  path: '/api/reviews/:id/report',
}
