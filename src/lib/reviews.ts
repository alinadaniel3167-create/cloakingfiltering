export const REVIEW_SERVICES = [
  'Cloaking & filtering',
  'Media buying',
  'Campaign audit',
  'Domain & infrastructure',
  'Landing page optimization',
  'Other',
] as const

export const PROOF_CATEGORIES = [
  'Analytics / Results',
  'Design Deliverable',
  'Website / Development',
  'Campaign Performance',
  'Before / After',
] as const

export type ReviewMediaItem = {
  id: string
  url: string
  alt: string
  category: string
  contentType: string
}

export type ReviewReply = {
  id: string
  authorName: string
  body: string
  isOwner: boolean
  submittedAt: string
}

export type PublicReview = {
  id: string
  clientName: string
  business: string | null
  service: string
  projectTitle: string
  projectDate: string
  completionTimeline: string | null
  rating: number
  reviewText: string | null
  avatarUrl: string
  avatarAlt: string
  verified: boolean
  photoVerified: boolean
  proofAttached: boolean
  featured: boolean
  helpfulCount: number
  submittedAt: string
  approvedAt: string | null
  media: ReviewMediaItem[]
  replies: ReviewReply[]
}

export type ReviewStats = {
  total: number
  average: number
  distribution: Record<'1' | '2' | '3' | '4' | '5', number>
  verified: number
  proofBacked: number
}

export type ApprovedReviewsResponse = {
  reviews: PublicReview[]
  stats: ReviewStats
  page: number
  pageSize: number
  totalPages: number
}
