import { randomUUID } from 'node:crypto'
import type { Config, Context } from '@netlify/functions'
import { db } from '../../db/index.js'
import { reviewMedia, reviews } from '../../db/schema.js'
import {
  cleanText,
  createVerification,
  getRecentSubmissionCounts,
  hasBlockedLanguage,
  hashValue,
  json,
  processImage,
  requestFingerprint,
  sendVerification,
  uploadStore,
  validateOrigin,
  verifyCaptcha,
} from './_lib/reviews.mjs'

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405)
  if (!validateOrigin(req)) return json({ error: 'Invalid request origin.' }, 403)

  const form = await req.formData()
  const clientName = cleanText(form.get('clientName'), 80)
  const email = cleanText(form.get('email'), 160).toLowerCase()
  const business = cleanText(form.get('business'), 160)
  const service = cleanText(form.get('service'), 80)
  const projectTitle = cleanText(form.get('projectTitle'), 120)
  const projectDate = cleanText(form.get('projectDate'), 10)
  const completionTimeline = cleanText(form.get('completionTimeline'), 80)
  const reviewText = cleanText(form.get('reviewText'), 1800)
  const avatarAlt = cleanText(form.get('avatarAlt'), 140) || `Portrait of ${clientName}`
  const rating = Number(cleanText(form.get('rating'), 1))
  const consent = form.get('consent') === 'true'
  const avatar = form.get('avatar')
  const proofFiles = form.getAll('proofImages').filter((entry): entry is File => entry instanceof File && entry.size > 0)
  const proofAlts = form.getAll('proofAlt').map((entry) => cleanText(entry, 160))
  const proofCategories = form.getAll('proofCategory').map((entry) => cleanText(entry, 80) || 'Campaign Performance')

  if (!clientName || !email || !service || !projectTitle || !projectDate || !Number.isInteger(rating) || rating < 1 || rating > 5 || !consent) {
    return json({ error: 'Complete every required field and accept the publication consent.' }, 400)
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) return json({ error: 'Enter a valid email address.' }, 400)
  if (!(avatar instanceof File) || avatar.size === 0) return json({ error: 'A client photo is required.' }, 400)
  if (proofFiles.length < 1 || proofFiles.length > 5) return json({ error: 'Attach between one and five proof images.' }, 400)
  if (hasBlockedLanguage(`${projectTitle} ${reviewText}`)) return json({ error: 'The submission requires manual review before it can be accepted.' }, 400)

  const captchaToken = cleanText(form.get('captchaToken'), 4096)
  if (!(await verifyCaptcha(captchaToken, context.ip))) return json({ error: 'The anti-spam check did not pass. Please try again.' }, 400)

  const emailHash = hashValue(email)
  const ipHash = requestFingerprint(context.ip)
  const recent = await getRecentSubmissionCounts(emailHash, ipHash)
  if (recent.email >= 1) return json({ error: 'This email has already submitted a review in the last 30 days.' }, 429)
  if (recent.ip >= 3) return json({ error: 'Too many reviews were submitted from this network today.' }, 429)

  const storedKeys: string[] = []
  try {
    const avatarUpload = await processImage(avatar, 'avatar')
    storedKeys.push(avatarUpload.key)
    const proofUploads = []
    for (const proofFile of proofFiles) {
      const upload = await processImage(proofFile, 'proof')
      storedKeys.push(upload.key)
      proofUploads.push(upload)
    }

    const reviewId = randomUUID()
    await db.transaction(async (tx) => {
      await tx.insert(reviews).values({
        id: reviewId,
        clientName,
        email,
        emailHash,
        business: business || null,
        service,
        projectTitle,
        projectDate,
        completionTimeline: completionTimeline || null,
        rating,
        reviewText: reviewText || null,
        avatarKey: avatarUpload.key,
        avatarAlt,
        proofAttached: true,
        consent,
        ipHash,
      })
      await tx.insert(reviewMedia).values(proofUploads.map((upload, position) => ({
        id: randomUUID(),
        reviewId,
        blobKey: upload.key,
        contentType: upload.contentType,
        altText: proofAlts[position] || `${projectTitle} proof image ${position + 1}`,
        category: proofCategories[position] || 'Campaign Performance',
        position,
        byteSize: upload.byteSize,
      })))
    })

    const token = await createVerification(reviewId)
    const verificationSent = await sendVerification(email, clientName, token, req)
    return json({
      ok: true,
      message: verificationSent
        ? 'Review received. Check your email to verify it before moderation.'
        : 'Review received for private verification and moderation.',
    }, 201)
  } catch (error) {
    await Promise.all(storedKeys.map((key) => uploadStore.delete(key)))
    return json({ error: error instanceof Error ? error.message : 'The review could not be submitted.' }, 400)
  }
}

export const config: Config = {
  path: '/api/reviews/submit',
}
