import type { Config } from '@netlify/functions'
import { and, desc, eq, gte, sql, type SQL } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { reviews } from '../../db/schema.js'
import { json, loadReviewRelations } from './_lib/reviews.mjs'

export default async (req: Request) => {
  if (req.method !== 'GET') return json({ error: 'Method not allowed.' }, 405)
  const params = new URL(req.url).searchParams
  const page = Math.max(1, Number(params.get('page')) || 1)
  const pageSize = Math.min(24, Math.max(1, Number(params.get('pageSize')) || 9))
  const service = params.get('service')?.slice(0, 80)
  const rating = Number(params.get('rating'))
  const verifiedOnly = params.get('verified') === 'true'
  const sort = params.get('sort') || 'newest'

  const conditions: SQL[] = [eq(reviews.status, 'approved')]
  if (service) conditions.push(eq(reviews.service, service))
  if (Number.isInteger(rating) && rating > 0) conditions.push(gte(reviews.rating, rating))
  if (verifiedOnly) conditions.push(eq(reviews.verified, true))
  const where = and(...conditions)
  const order = sort === 'highest'
    ? [desc(reviews.featured), desc(reviews.rating), desc(reviews.approvedAt)]
    : sort === 'helpful'
      ? [desc(reviews.featured), desc(reviews.helpfulCount), desc(reviews.approvedAt)]
      : [desc(reviews.featured), desc(reviews.approvedAt), desc(reviews.submittedAt)]

  const [rows, countRows, statsRows] = await Promise.all([
    db.select().from(reviews).where(where).orderBy(...order).limit(pageSize).offset((page - 1) * pageSize),
    db.select({ count: sql<number>`count(*)::int` }).from(reviews).where(where),
    db.select({
      total: sql<number>`count(*)::int`,
      average: sql<number>`coalesce(round(avg(${reviews.rating})::numeric, 1), 0)::float`,
      verified: sql<number>`count(*) filter (where ${reviews.verified} = true)::int`,
      proofBacked: sql<number>`count(*) filter (where ${reviews.proofAttached} = true)::int`,
      one: sql<number>`count(*) filter (where ${reviews.rating} = 1)::int`,
      two: sql<number>`count(*) filter (where ${reviews.rating} = 2)::int`,
      three: sql<number>`count(*) filter (where ${reviews.rating} = 3)::int`,
      four: sql<number>`count(*) filter (where ${reviews.rating} = 4)::int`,
      five: sql<number>`count(*) filter (where ${reviews.rating} = 5)::int`,
    }).from(reviews).where(eq(reviews.status, 'approved')),
  ])

  const relations = await loadReviewRelations(rows.map((row) => row.id))
  const publicRows = rows.map((row) => ({
    id: row.id,
    clientName: row.clientName,
    business: row.business,
    service: row.service,
    projectTitle: row.projectTitle,
    projectDate: row.projectDate,
    completionTimeline: row.completionTimeline,
    rating: row.rating,
    reviewText: row.reviewText,
    avatarUrl: `/api/review-media/${row.avatarKey}`,
    avatarAlt: row.avatarAlt,
    verified: row.verified,
    photoVerified: row.photoVerified,
    proofAttached: row.proofAttached,
    featured: row.featured,
    helpfulCount: row.helpfulCount,
    submittedAt: row.submittedAt.toISOString(),
    approvedAt: row.approvedAt?.toISOString() ?? null,
    media: relations.media.filter((item) => item.reviewId === row.id).map((item) => ({
      id: item.id,
      url: `/api/review-media/${item.blobKey}`,
      alt: item.altText,
      category: item.category,
      contentType: item.contentType,
    })),
    replies: relations.replies.filter((reply) => reply.reviewId === row.id).map((reply) => ({
      id: reply.id,
      authorName: reply.authorName,
      body: reply.body,
      isOwner: reply.isOwner,
      submittedAt: reply.submittedAt.toISOString(),
    })),
  }))
  const stats = statsRows[0]
  const total = countRows[0]?.count ?? 0

  return json({
    reviews: publicRows,
    stats: {
      total: stats?.total ?? 0,
      average: stats?.average ?? 0,
      verified: stats?.verified ?? 0,
      proofBacked: stats?.proofBacked ?? 0,
      distribution: {
        '1': stats?.one ?? 0,
        '2': stats?.two ?? 0,
        '3': stats?.three ?? 0,
        '4': stats?.four ?? 0,
        '5': stats?.five ?? 0,
      },
    },
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  })
}

export const config: Config = {
  path: '/api/reviews/approved',
}
