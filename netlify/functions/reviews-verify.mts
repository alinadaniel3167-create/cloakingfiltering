import type { Config, Context } from '@netlify/functions'
import { and, eq, gt, isNull } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { reviews, reviewVerificationTokens } from '../../db/schema.js'
import { hashValue } from './_lib/reviews.mjs'

export default async (req: Request, context: Context) => {
  const tokenHash = hashValue(context.params.token)
  const [token] = await db.select().from(reviewVerificationTokens).where(and(
    eq(reviewVerificationTokens.tokenHash, tokenHash),
    isNull(reviewVerificationTokens.usedAt),
    gt(reviewVerificationTokens.expiresAt, new Date()),
  )).limit(1)
  const origin = Netlify.env.get('URL') || new URL(req.url).origin
  if (!token) return Response.redirect(`${origin}/?review=verification-expired#client-proof`, 302)
  await db.transaction(async (tx) => {
    await tx.update(reviewVerificationTokens).set({ usedAt: new Date() }).where(eq(reviewVerificationTokens.id, token.id))
    await tx.update(reviews).set({ verified: true, updatedAt: new Date() }).where(eq(reviews.id, token.reviewId))
  })
  return Response.redirect(`${origin}/?review=verified#client-proof`, 302)
}

export const config: Config = {
  path: '/api/reviews/verify/:token',
}
