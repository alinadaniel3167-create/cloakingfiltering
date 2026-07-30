import type { Config } from '@netlify/functions'
import { and, desc, eq, gte, inArray, lt, sql } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { reviewReplies, reviewReports, reviews } from '../../db/schema.js'
import { getAdmin, json, loadReviewRelations, removeReviewMedia, validateOrigin } from './_lib/reviews.mjs'

const sendApprovalNotice = async (email: string, clientName: string) => {
  const endpoint = Netlify.env.get('REVIEW_EMAIL_WEBHOOK_URL')
  if (!endpoint) return
  const baseUrl = Netlify.env.get('URL') || ''
  await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ type: 'review-approved', to: email, clientName, reviewUrl: `${baseUrl}/#client-proof` }),
  })
}

export default async (req: Request) => {
  const admin = await getAdmin()
  if (!admin) return json({ error: 'Admin access required.' }, 401)

  if (req.method === 'GET') {
    const params = new URL(req.url).searchParams
    const status = params.get('status') || 'pending'
    const rows = await db.select().from(reviews).where(eq(reviews.status, status)).orderBy(desc(reviews.submittedAt)).limit(100)
    const relations = await loadReviewRelations(rows.map((row) => row.id))
    const monthStart = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1))
    const previousMonthStart = new Date(Date.UTC(monthStart.getUTCFullYear(), monthStart.getUTCMonth() - 1, 1))
    const [pendingReplies, reports, summaryRows, currentMonthRows, previousMonthRows, serviceRows] = await Promise.all([
      db.select().from(reviewReplies).where(eq(reviewReplies.status, 'pending')).orderBy(desc(reviewReplies.submittedAt)),
      db.select().from(reviewReports).where(eq(reviewReports.status, 'open')).orderBy(desc(reviewReports.createdAt)),
      db.select({
        total: sql<number>`count(*)::int`,
        approved: sql<number>`count(*) filter (where ${reviews.status} = 'approved')::int`,
        average: sql<number>`coalesce(round(avg(${reviews.rating}) filter (where ${reviews.status} = 'approved')::numeric, 1), 0)::float`,
        verified: sql<number>`count(*) filter (where ${reviews.status} = 'approved' and ${reviews.verified} = true)::int`,
        proofBacked: sql<number>`count(*) filter (where ${reviews.status} = 'approved' and ${reviews.proofAttached} = true)::int`,
        helpful: sql<number>`coalesce(sum(${reviews.helpfulCount}), 0)::int`,
      }).from(reviews),
      db.select({ count: sql<number>`count(*)::int` }).from(reviews).where(gte(reviews.submittedAt, monthStart)),
      db.select({ count: sql<number>`count(*)::int` }).from(reviews).where(and(gte(reviews.submittedAt, previousMonthStart), lt(reviews.submittedAt, monthStart))),
      db.select({ service: reviews.service, count: sql<number>`count(*)::int` }).from(reviews).groupBy(reviews.service).orderBy(desc(sql`count(*)`)).limit(5),
    ])
    const summary = summaryRows[0]
    const approved = summary?.approved ?? 0
    const trustScore = approved
      ? Math.round((((summary?.verified ?? 0) / approved) * 35) + (((summary?.proofBacked ?? 0) / approved) * 35) + (((summary?.average ?? 0) / 5) * 30))
      : 0
    const currentMonth = currentMonthRows[0]?.count ?? 0
    const previousMonth = previousMonthRows[0]?.count ?? 0
    return json({
      reviews: rows.map((row) => ({
        ...row,
        submittedAt: row.submittedAt.toISOString(),
        approvedAt: row.approvedAt?.toISOString() ?? null,
        updatedAt: row.updatedAt.toISOString(),
        avatarUrl: `/api/review-media/${row.avatarKey}`,
        media: relations.media.filter((item) => item.reviewId === row.id).map((item) => ({
          ...item,
          url: `/api/review-media/${item.blobKey}`,
        })),
      })),
      pendingReplies: pendingReplies.map((reply) => ({ ...reply, submittedAt: reply.submittedAt.toISOString() })),
      reports: reports.map((report) => ({ ...report, createdAt: report.createdAt.toISOString() })),
      analytics: {
        total: summary?.total ?? 0,
        approved,
        average: summary?.average ?? 0,
        helpful: summary?.helpful ?? 0,
        trustScore,
        currentMonth,
        monthlyGrowth: previousMonth ? Math.round(((currentMonth - previousMonth) / previousMonth) * 100) : currentMonth ? 100 : 0,
        topServices: serviceRows,
      },
    })
  }

  if (req.method !== 'PATCH') return json({ error: 'Method not allowed.' }, 405)
  if (!validateOrigin(req)) return json({ error: 'Invalid request origin.' }, 403)
  const body = await req.json() as { action?: string; ids?: string[]; notes?: string }
  const ids = Array.isArray(body.ids) ? body.ids.filter((id) => typeof id === 'string').slice(0, 100) : []
  if (!body.action || !ids.length) return json({ error: 'Choose an action and at least one item.' }, 400)

  if (body.action === 'approve') {
    const approvedRows = await db.select({ id: reviews.id, email: reviews.email, clientName: reviews.clientName }).from(reviews).where(inArray(reviews.id, ids))
    await db.update(reviews).set({
      status: 'approved',
      verified: true,
      photoVerified: true,
      approvedAt: new Date(),
      updatedAt: new Date(),
      moderationNotes: body.notes?.slice(0, 1000) || null,
    }).where(inArray(reviews.id, ids))
    await Promise.all(approvedRows.map((row) => sendApprovalNotice(row.email, row.clientName)))
  } else if (body.action === 'reject' || body.action === 'hide') {
    await db.update(reviews).set({ status: body.action === 'hide' ? 'hidden' : 'rejected', updatedAt: new Date(), moderationNotes: body.notes?.slice(0, 1000) || null }).where(inArray(reviews.id, ids))
  } else if (body.action === 'feature' || body.action === 'unfeature') {
    await db.update(reviews).set({ featured: body.action === 'feature', updatedAt: new Date() }).where(inArray(reviews.id, ids))
  } else if (body.action === 'delete') {
    await Promise.all(ids.map((id) => removeReviewMedia(id)))
    await db.delete(reviews).where(inArray(reviews.id, ids))
  } else if (body.action === 'approveReply' || body.action === 'rejectReply') {
    await db.update(reviewReplies).set({
      status: body.action === 'approveReply' ? 'approved' : 'rejected',
      approvedAt: body.action === 'approveReply' ? new Date() : null,
    }).where(inArray(reviewReplies.id, ids))
  } else if (body.action === 'resolveReport') {
    await db.update(reviewReports).set({ status: 'resolved' }).where(inArray(reviewReports.id, ids))
  } else {
    return json({ error: 'Unsupported moderation action.' }, 400)
  }

  const counts = await db.select({ status: reviews.status, count: sql<number>`count(*)::int` }).from(reviews).groupBy(reviews.status)
  return json({ ok: true, counts })
}

export const config: Config = {
  path: '/api/reviews/admin',
}
