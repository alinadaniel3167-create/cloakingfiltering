import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core'

export const reviews = pgTable(
  'reviews',
  {
    id: text().primaryKey(),
    clientName: text('client_name').notNull(),
    email: text().notNull(),
    emailHash: text('email_hash').notNull(),
    business: text(),
    service: text().notNull(),
    projectTitle: text('project_title').notNull(),
    projectDate: text('project_date').notNull(),
    completionTimeline: text('completion_timeline'),
    rating: integer().notNull(),
    reviewText: text('review_text'),
    avatarKey: text('avatar_key').notNull(),
    avatarAlt: text('avatar_alt').notNull(),
    status: text().notNull().default('pending'),
    verified: boolean().notNull().default(false),
    photoVerified: boolean('photo_verified').notNull().default(false),
    proofAttached: boolean('proof_attached').notNull().default(false),
    featured: boolean().notNull().default(false),
    helpfulCount: integer('helpful_count').notNull().default(0),
    consent: boolean().notNull(),
    ipHash: text('ip_hash').notNull(),
    moderationNotes: text('moderation_notes'),
    submittedAt: timestamp('submitted_at', { withTimezone: true }).notNull().defaultNow(),
    approvedAt: timestamp('approved_at', { withTimezone: true }),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('reviews_status_submitted_idx').on(table.status, table.submittedAt),
    index('reviews_email_submitted_idx').on(table.emailHash, table.submittedAt),
    index('reviews_ip_submitted_idx').on(table.ipHash, table.submittedAt),
    index('reviews_service_idx').on(table.service),
  ],
)

export const reviewMedia = pgTable(
  'review_media',
  {
    id: text().primaryKey(),
    reviewId: text('review_id').notNull().references(() => reviews.id, { onDelete: 'cascade' }),
    blobKey: text('blob_key').notNull().unique(),
    contentType: text('content_type').notNull(),
    altText: text('alt_text').notNull(),
    category: text().notNull(),
    position: integer().notNull(),
    byteSize: integer('byte_size').notNull(),
  },
  (table) => [index('review_media_review_idx').on(table.reviewId, table.position)],
)

export const reviewReplies = pgTable(
  'review_replies',
  {
    id: text().primaryKey(),
    reviewId: text('review_id').notNull().references(() => reviews.id, { onDelete: 'cascade' }),
    authorName: text('author_name').notNull(),
    body: text().notNull(),
    isOwner: boolean('is_owner').notNull().default(false),
    status: text().notNull().default('pending'),
    submittedAt: timestamp('submitted_at', { withTimezone: true }).notNull().defaultNow(),
    approvedAt: timestamp('approved_at', { withTimezone: true }),
  },
  (table) => [index('review_replies_review_idx').on(table.reviewId, table.status)],
)

export const reviewHelpfulVotes = pgTable(
  'review_helpful_votes',
  {
    reviewId: text('review_id').notNull().references(() => reviews.id, { onDelete: 'cascade' }),
    voterHash: text('voter_hash').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.reviewId, table.voterHash] }),
  ],
)

export const reviewReports = pgTable(
  'review_reports',
  {
    id: text().primaryKey(),
    reviewId: text('review_id').notNull().references(() => reviews.id, { onDelete: 'cascade' }),
    reporterHash: text('reporter_hash').notNull(),
    reason: text().notNull(),
    status: text().notNull().default('open'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('review_reports_unique_reporter_idx').on(table.reviewId, table.reporterHash),
    index('review_reports_status_idx').on(table.status),
  ],
)

export const reviewVerificationTokens = pgTable(
  'review_verification_tokens',
  {
    id: text().primaryKey(),
    reviewId: text('review_id').notNull().references(() => reviews.id, { onDelete: 'cascade' }).unique(),
    tokenHash: text('token_hash').notNull().unique(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    usedAt: timestamp('used_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('review_tokens_expiry_idx').on(table.expiresAt)],
)
