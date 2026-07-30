import { randomUUID } from 'node:crypto'
import type { Config, Context } from '@netlify/functions'
import { and, eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { reviewReplies, reviews } from '../../db/schema.js'
import { cleanText, getAdmin, hasBlockedLanguage, json, validateOrigin } from './_lib/reviews.mjs'

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405)
  if (!validateOrigin(req)) return json({ error: 'Invalid request origin.' }, 403)
  const reviewId = context.params.id
  const form = await req.formData()
  const body = cleanText(form.get('body'), 700)
  const admin = await getAdmin()
  const authorName = admin ? 'Trustman Kareem' : cleanText(form.get('authorName'), 80)
  if (!authorName || body.length < 3) return json({ error: 'Add your name and a meaningful reply.' }, 400)
  if (hasBlockedLanguage(body)) return json({ error: 'This reply cannot be submitted.' }, 400)
  const [review] = await db.select({ id: reviews.id }).from(reviews).where(and(eq(reviews.id, reviewId), eq(reviews.status, 'approved'))).limit(1)
  if (!review) return json({ error: 'Review not found.' }, 404)

  await db.insert(reviewReplies).values({
    id: randomUUID(),
    reviewId,
    authorName,
    body,
    isOwner: Boolean(admin),
    status: admin ? 'approved' : 'pending',
    approvedAt: admin ? new Date() : null,
  })
  return json({ ok: true, message: admin ? 'Response published.' : 'Reply received for moderation.' }, 201)
}

export const config: Config = {
  path: '/api/reviews/:id/reply',
}
