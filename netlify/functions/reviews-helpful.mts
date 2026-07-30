import type { Config, Context } from '@netlify/functions'
import { and, eq, sql } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { reviewHelpfulVotes, reviews } from '../../db/schema.js'
import { cleanText, json, requestFingerprint, validateOrigin } from './_lib/reviews.mjs'

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405)
  if (!validateOrigin(req)) return json({ error: 'Invalid request origin.' }, 403)
  const reviewId = context.params.id
  const body = await req.formData()
  const voterKey = cleanText(body.get('voterKey'), 100)
  const voterHash = requestFingerprint(context.ip, voterKey)
  const [review] = await db.select({ id: reviews.id }).from(reviews).where(and(eq(reviews.id, reviewId), eq(reviews.status, 'approved'))).limit(1)
  if (!review) return json({ error: 'Review not found.' }, 404)

  try {
    await db.transaction(async (tx) => {
      await tx.insert(reviewHelpfulVotes).values({ reviewId, voterHash })
      await tx.update(reviews).set({ helpfulCount: sql`${reviews.helpfulCount} + 1`, updatedAt: new Date() }).where(eq(reviews.id, reviewId))
    })
  } catch {
    return json({ ok: true, alreadyCounted: true })
  }
  return json({ ok: true })
}

export const config: Config = {
  path: '/api/reviews/:id/helpful',
}
