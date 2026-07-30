import { createHash, randomBytes, randomUUID } from 'node:crypto'
import { getStore } from '@netlify/blobs'
import { getUser } from '@netlify/identity'
import { and, desc, eq, gte, inArray, sql } from 'drizzle-orm'
import sharp from 'sharp'
import { db } from '../../../db/index.js'
import {
  reviewMedia,
  reviewReplies,
  reviews,
  reviewVerificationTokens,
} from '../../../db/schema.js'

export const uploadStore = getStore({ name: 'client-proof-media', consistency: 'strong' })

export const json = (data: unknown, status = 200) => Response.json(data, {
  status,
  headers: {
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  },
})

export const cleanText = (value: FormDataEntryValue | null, max: number) => {
  if (typeof value !== 'string') return ''
  return value.replace(/<[^>]*>/g, '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max)
}

export const hashValue = (value: string) => createHash('sha256').update(value).digest('hex')

export const requestFingerprint = (ip: string, value = '') => {
  const salt = Netlify.env.get('REVIEW_HASH_SALT') || 'trustman-review-fingerprint'
  return hashValue(`${salt}:${ip}:${value}`)
}

export const validateOrigin = (req: Request) => {
  const origin = req.headers.get('origin')
  if (!origin) return true
  const requestUrl = new URL(req.url)
  const originUrl = new URL(origin)
  return originUrl.host === requestUrl.host || originUrl.hostname === 'localhost'
}

export const hasBlockedLanguage = (value: string) => {
  const normalized = value.toLowerCase()
  return ['buy followers', 'crypto recovery agent', 'guaranteed account unban'].some((phrase) => normalized.includes(phrase))
}

export const verifyCaptcha = async (token: string, ip: string) => {
  const secret = Netlify.env.get('REVIEW_RECAPTCHA_SECRET')
  if (!secret) return true
  if (!token) return false
  const body = new URLSearchParams({ secret, response: token, remoteip: ip })
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', { method: 'POST', body })
  const result = await response.json() as { success?: boolean; score?: number; action?: string }
  return Boolean(result.success && (result.score ?? 0) >= 0.5 && (!result.action || result.action === 'review_submit'))
}

const scanUpload = async (file: File) => {
  const endpoint = Netlify.env.get('REVIEW_SCAN_WEBHOOK_URL')
  if (!endpoint) return true
  const body = new FormData()
  body.set('file', file)
  const response = await fetch(endpoint, { method: 'POST', body })
  if (!response.ok) return false
  const result = await response.json() as { safe?: boolean }
  return result.safe === true
}

export const processImage = async (file: File, kind: 'avatar' | 'proof') => {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    throw new Error('Only JPG, PNG, and WebP images are accepted.')
  }
  const maxBytes = kind === 'avatar' ? 2_000_000 : 5_000_000
  if (file.size > maxBytes) throw new Error(kind === 'avatar' ? 'Client photo must be 2MB or smaller.' : 'Each proof image must be 5MB or smaller.')
  if (!(await scanUpload(file))) throw new Error('An upload did not pass the security scan.')

  const input = Buffer.from(await file.arrayBuffer())
  const image = sharp(input, { failOn: 'error', limitInputPixels: 40_000_000 }).rotate()
  const output = kind === 'avatar'
    ? await image.resize(240, 240, { fit: 'cover', position: 'attention' }).webp({ quality: 84 }).toBuffer()
    : await image.resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toBuffer()

  const key = `${randomUUID()}.webp`
  await uploadStore.set(key, output)
  return { key, contentType: 'image/webp', byteSize: output.byteLength }
}

export const getAdmin = async () => {
  const user = await getUser()
  const roles = user?.appMetadata?.roles
  return user && Array.isArray(roles) && roles.includes('admin') ? user : null
}

export const createVerification = async (reviewId: string) => {
  const token = randomBytes(32).toString('hex')
  await db.insert(reviewVerificationTokens).values({
    id: randomUUID(),
    reviewId,
    tokenHash: hashValue(token),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })
  return token
}

export const sendVerification = async (email: string, clientName: string, token: string, req: Request) => {
  const endpoint = Netlify.env.get('REVIEW_EMAIL_WEBHOOK_URL')
  if (!endpoint) return false
  const baseUrl = Netlify.env.get('URL') || new URL(req.url).origin
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      type: 'review-verification',
      to: email,
      clientName,
      verifyUrl: `${baseUrl}/api/reviews/verify/${token}`,
    }),
  })
  return response.ok
}

export const removeReviewMedia = async (reviewId: string) => {
  const media = await db.select({ blobKey: reviewMedia.blobKey }).from(reviewMedia).where(eq(reviewMedia.reviewId, reviewId))
  await Promise.all(media.map(({ blobKey }) => uploadStore.delete(blobKey)))
  const [review] = await db.select({ avatarKey: reviews.avatarKey }).from(reviews).where(eq(reviews.id, reviewId)).limit(1)
  if (review) await uploadStore.delete(review.avatarKey)
}

export const getRecentSubmissionCounts = async (emailHash: string, ipHash: string) => {
  const emailSince = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const ipSince = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const [emailCount, ipCount] = await Promise.all([
    db.select({ count: sql<number>`count(*)::int` }).from(reviews).where(and(eq(reviews.emailHash, emailHash), gte(reviews.submittedAt, emailSince))),
    db.select({ count: sql<number>`count(*)::int` }).from(reviews).where(and(eq(reviews.ipHash, ipHash), gte(reviews.submittedAt, ipSince))),
  ])
  return { email: emailCount[0]?.count ?? 0, ip: ipCount[0]?.count ?? 0 }
}

export const loadReviewRelations = async (reviewIds: string[]) => {
  if (!reviewIds.length) return { media: [], replies: [] }
  const [media, replies] = await Promise.all([
    db.select().from(reviewMedia).where(inArray(reviewMedia.reviewId, reviewIds)).orderBy(reviewMedia.position),
    db.select().from(reviewReplies).where(and(inArray(reviewReplies.reviewId, reviewIds), eq(reviewReplies.status, 'approved'))).orderBy(desc(reviewReplies.submittedAt)),
  ])
  return { media, replies }
}
