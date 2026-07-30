import {
  BadgeCheck,
  BarChart3,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Flag,
  ImageIcon,
  LoaderCircle,
  LockKeyhole,
  MessageSquareReply,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsUp,
  UploadCloud,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Reveal } from '@/components/Reveal'
import {
  PROOF_CATEGORIES,
  REVIEW_SERVICES,
  type ApprovedReviewsResponse,
  type PublicReview,
  type ReviewStats,
} from '@/lib/reviews'

type LegacyTestimonial = {
  quote: string
  name: string
  role: string
  result: string
}

type ProofUpload = {
  file: File
  preview: string
  alt: string
  category: string
}

const emptyStats: ReviewStats = {
  total: 0,
  average: 0,
  verified: 0,
  proofBacked: 0,
  distribution: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
}

export function ClientProofReviews({ legacyTestimonials }: { legacyTestimonials: LegacyTestimonial[] }) {
  const [reviews, setReviews] = useState<PublicReview[]>([])
  const [stats, setStats] = useState<ReviewStats>(emptyStats)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [service, setService] = useState('')
  const [rating, setRating] = useState('')
  const [verified, setVerified] = useState(false)
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const loadReviews = useCallback(async () => {
    setLoading(true)
    setLoadError('')
    const params = new URLSearchParams({ page: String(page), pageSize: '9', sort })
    if (service) params.set('service', service)
    if (rating) params.set('rating', rating)
    if (verified) params.set('verified', 'true')
    try {
      const response = await fetch(`/api/reviews/approved?${params}`)
      if (!response.ok) throw new Error('Reviews are temporarily unavailable.')
      const data = await response.json() as ApprovedReviewsResponse
      setReviews(data.reviews)
      setStats(data.stats)
      setTotalPages(data.totalPages)
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Reviews are temporarily unavailable.')
    } finally {
      setLoading(false)
    }
  }, [page, rating, service, sort, verified])

  useEffect(() => {
    void loadReviews()
  }, [loadReviews])

  useEffect(() => {
    setPage(1)
  }, [service, rating, verified, sort])

  useEffect(() => {
    const existing = document.getElementById('client-proof-schema')
    existing?.remove()
    if (!stats.total) return
    const script = document.createElement('script')
    script.id = 'client-proof-schema'
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Trustman Kareem Performance Advertising',
      url: `${window.location.origin}/#client-proof`,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: stats.average,
        reviewCount: stats.total,
        bestRating: 5,
        worstRating: 1,
      },
      review: reviews.map((review) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: review.clientName },
        datePublished: review.approvedAt || review.submittedAt,
        name: review.projectTitle,
        reviewBody: review.reviewText || review.projectTitle,
        reviewRating: { '@type': 'Rating', ratingValue: review.rating, bestRating: 5, worstRating: 1 },
      })),
    })
    document.head.appendChild(script)
    return () => script.remove()
  }, [reviews, stats])

  return (
    <section id="client-proof" className="section-wash scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1fr_.78fr] lg:items-end">
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-gold">
                <ShieldCheck className="h-4 w-4" /> Client proof
              </div>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Proof that can be <span className="text-gradient-gold">inspected.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-fg">
                Every published review passes private moderation. Verified submissions connect a real client photo, service timeline, and project evidence without exposing sensitive campaign data.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <button type="button" onClick={() => setFormOpen(true)} className="luxury-button">
                <Camera className="h-4 w-4" /> Add your proof review
              </button>
              <a href="#review-feed" className="inline-flex items-center justify-center gap-2 border border-line/80 bg-background/45 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-fg transition-colors hover:border-gold/50 hover:text-gold">
                Browse proof <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px border border-line/60 bg-line/60 sm:grid-cols-2 lg:grid-cols-4">
          <ProofMetric icon={Star} value={stats.total ? stats.average.toFixed(1) : '—'} label="Average rating" detail={stats.total ? `${stats.total} published reviews` : 'Awaiting first verified review'} />
          <ProofMetric icon={BadgeCheck} value={String(stats.verified)} label="Verified clients" detail="Email and project checked" />
          <ProofMetric icon={ImageIcon} value={String(stats.proofBacked)} label="Proof-backed" detail="Optimized image evidence" />
          <ProofMetric icon={LockKeyhole} value="Private" label="Moderation standard" detail="EXIF stripped before storage" />
        </div>
        {stats.total ? (
          <div className="mt-px grid gap-px border border-line/60 bg-line/60 sm:grid-cols-5">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3 bg-background/70 px-4 py-3 text-xs text-muted-fg">
                <span className="flex items-center gap-1 text-gold">{star}<Star className="h-3 w-3 fill-gold" /></span>
                <progress aria-label={`${star} star reviews`} value={stats.distribution[String(star) as keyof typeof stats.distribution]} max={stats.total} className="h-1.5 min-w-0 flex-1 accent-gold" />
                <span>{stats.distribution[String(star) as keyof typeof stats.distribution]}</span>
              </div>
            ))}
          </div>
        ) : null}

        <div id="review-feed" className="mt-14 scroll-mt-28">
          <div className="flex flex-col gap-5 border-y border-line/60 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-gold" />
              <div>
                <h3 className="font-display text-xl font-bold">Verified review feed</h3>
                <p className="mt-1 text-xs text-muted-fg">Filter by project type, rating, or verification status.</p>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:flex">
              <select aria-label="Filter by service" value={service} onChange={(event) => setService(event.target.value)} className="review-control">
                <option value="">All services</option>
                {REVIEW_SERVICES.map((item) => <option key={item}>{item}</option>)}
              </select>
              <select aria-label="Filter by rating" value={rating} onChange={(event) => setRating(event.target.value)} className="review-control">
                <option value="">All ratings</option>
                <option value="5">5 stars</option>
                <option value="4">4+ stars</option>
                <option value="3">3+ stars</option>
              </select>
              <select aria-label="Sort reviews" value={sort} onChange={(event) => setSort(event.target.value)} className="review-control">
                <option value="newest">Newest</option>
                <option value="highest">Highest rated</option>
                <option value="helpful">Most helpful</option>
              </select>
              <label className="flex min-h-11 cursor-pointer items-center gap-2 border border-line/70 bg-background/55 px-3 text-xs text-muted-fg transition-colors hover:border-gold/40">
                <input type="checkbox" checked={verified} onChange={(event) => setVerified(event.target.checked)} className="accent-gold" /> Verified only
              </label>
            </div>
          </div>

          {loading ? <ReviewSkeleton /> : null}
          {!loading && loadError ? (
            <div className="mt-8 flex items-center gap-3 border border-rose-400/20 bg-rose-400/5 p-5 text-sm text-rose-200">
              <CircleAlert className="h-5 w-5" /> {loadError}
            </div>
          ) : null}
          {!loading && !loadError && reviews.length ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {reviews.map((review, index) => (
                <Reveal key={review.id} delay={(index % 3) * 80}>
                  <ReviewCard review={review} onChanged={loadReviews} />
                </Reveal>
              ))}
            </div>
          ) : null}
          {!loading && !loadError && !reviews.length ? (
            <LegacyProof testimonials={legacyTestimonials} filtered={Boolean(service || rating || verified)} onSubmit={() => setFormOpen(true)} />
          ) : null}

          {totalPages > 1 ? (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button type="button" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="review-page-button" aria-label="Previous review page"><ChevronLeft className="h-4 w-4" /></button>
              <span className="text-xs uppercase tracking-[0.18em] text-muted-fg">Page {page} of {totalPages}</span>
              <button type="button" disabled={page === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} className="review-page-button" aria-label="Next review page"><ChevronRight className="h-4 w-4" /></button>
            </div>
          ) : null}
        </div>
      </div>
      {formOpen ? <ReviewSubmissionDialog onClose={() => setFormOpen(false)} onSubmitted={loadReviews} /> : null}
    </section>
  )
}

function ProofMetric({ icon: Icon, value, label, detail }: { icon: typeof Star; value: string; label: string; detail: string }) {
  return (
    <div className="bg-background/70 p-5 sm:p-6">
      <div className="flex items-center justify-between"><Icon className="h-5 w-5 text-gold" /><span className="font-display text-2xl font-bold text-gold">{value}</span></div>
      <div className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-fg">{label}</div>
      <div className="mt-2 text-xs text-muted-fg">{detail}</div>
    </div>
  )
}

function ReviewCard({ review, onChanged }: { review: PublicReview; onChanged: () => Promise<void> }) {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [replyOpen, setReplyOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const markHelpful = async () => {
    const voterKey = getVoterKey()
    const body = new FormData()
    body.set('voterKey', voterKey)
    const response = await fetch(`/api/reviews/${review.id}/helpful`, { method: 'POST', body })
    const result = await response.json() as { alreadyCounted?: boolean }
    setNotice(result.alreadyCounted ? 'Your vote was already counted.' : 'Marked as helpful.')
    if (!result.alreadyCounted) await onChanged()
  }

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#client-proof`
    if (navigator.share) await navigator.share({ title: `${review.clientName}'s project review`, text: review.reviewText || review.projectTitle, url })
    else {
      await navigator.clipboard.writeText(url)
      setNotice('Review link copied.')
    }
  }

  return (
    <article className={`flex h-full flex-col border bg-background/55 p-5 transition-colors hover:border-gold/35 sm:p-6 ${review.featured ? 'border-gold/45 shadow-glow' : 'border-line/60'}`}>
      <div className="flex items-start gap-4">
        <img src={review.avatarUrl} alt={review.avatarAlt} width={64} height={64} loading="lazy" className="h-16 w-16 shrink-0 rounded-full border border-gold/35 object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-display text-lg font-bold">{review.clientName}</h3>
            {review.verified ? <TrustBadge icon={BadgeCheck} label="Verified client" /> : null}
            {review.featured ? <TrustBadge icon={Sparkles} label="Top review" /> : null}
          </div>
          <p className="mt-1 truncate text-xs text-muted-fg">{review.business || review.service}</p>
          <div className="mt-2 flex items-center gap-2"><Stars rating={review.rating} /><span className="text-[10px] uppercase tracking-wider text-muted-fg">{formatDate(review.approvedAt || review.submittedAt)}</span></div>
        </div>
      </div>

      <div className="mt-5 border-y border-line/60 py-4">
        <div className="text-[10px] uppercase tracking-[0.18em] text-gold">{review.service}</div>
        <h4 className="mt-2 font-display text-xl font-bold">{review.projectTitle}</h4>
        {review.reviewText ? <p className="mt-3 text-sm leading-6 text-muted-fg">“{review.reviewText}”</p> : null}
        <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-fg">
          {review.photoVerified ? <span className="proof-chip"><Camera className="h-3 w-3" /> Photo verified</span> : null}
          {review.proofAttached ? <span className="proof-chip"><ImageIcon className="h-3 w-3" /> Proof attached</span> : null}
          <span className="proof-chip"><Check className="h-3 w-3" /> Completed {formatProjectDate(review.projectDate)}</span>
        </div>
      </div>

      {review.media.length ? (
        <div className="mt-5 grid grid-cols-3 gap-2">
          {review.media.slice(0, 3).map((media, index) => (
            <button key={media.id} type="button" onClick={() => setLightbox(index)} className="group relative aspect-[4/3] overflow-hidden border border-line/60 bg-secondary/30 text-left">
              <img src={media.url} alt={media.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-background/85 px-2 py-1 text-[8px] uppercase tracking-wider text-fg opacity-0 transition-opacity group-hover:opacity-100">{media.category}</span>
              {index === 2 && review.media.length > 3 ? <span className="absolute inset-0 flex items-center justify-center bg-background/70 font-display text-xl font-bold text-gold">+{review.media.length - 3}</span> : null}
            </button>
          ))}
        </div>
      ) : null}

      {review.replies.map((reply) => (
        <div key={reply.id} className="mt-5 border-l-2 border-gold/45 bg-gold/5 p-4">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-gold">{reply.isOwner ? <BadgeCheck className="h-3.5 w-3.5" /> : null}{reply.authorName}</div>
          <p className="mt-2 text-sm leading-6 text-muted-fg">{reply.body}</p>
        </div>
      ))}

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-6 text-xs text-muted-fg">
        <button type="button" onClick={() => void markHelpful()} className="review-action"><ThumbsUp className="h-3.5 w-3.5" /> Helpful {review.helpfulCount ? `(${review.helpfulCount})` : ''}</button>
        <button type="button" onClick={() => setReplyOpen((open) => !open)} className="review-action"><MessageSquareReply className="h-3.5 w-3.5" /> Reply</button>
        <button type="button" onClick={() => void share()} className="review-action"><Share2 className="h-3.5 w-3.5" /> Share</button>
        <button type="button" onClick={() => setReportOpen((open) => !open)} className="review-action ml-auto"><Flag className="h-3.5 w-3.5" /> Report</button>
      </div>
      {replyOpen ? <InlineActionForm endpoint={`/api/reviews/${review.id}/reply`} fields={[['authorName', 'Your name'], ['body', 'Add a respectful reply']]} onDone={(message) => { setNotice(message); setReplyOpen(false) }} /> : null}
      {reportOpen ? <InlineActionForm endpoint={`/api/reviews/${review.id}/report`} fields={[['reason', 'Why should this be reviewed?']]} onDone={() => { setNotice('Report received for moderation.'); setReportOpen(false) }} /> : null}
      {notice ? <p role="status" className="mt-3 text-xs text-gold">{notice}</p> : null}
      {lightbox !== null ? <Lightbox review={review} startIndex={lightbox} onClose={() => setLightbox(null)} /> : null}
    </article>
  )
}

function TrustBadge({ icon: Icon, label }: { icon: typeof BadgeCheck; label: string }) {
  return <span className="inline-flex items-center gap-1 border border-gold/25 bg-gold/8 px-1.5 py-1 text-[8px] uppercase tracking-[0.12em] text-gold"><Icon className="h-3 w-3" />{label}</span>
}

function Stars({ rating, interactive = false, onChange }: { rating: number; interactive?: boolean; onChange?: (rating: number) => void }) {
  return (
    <div className="flex gap-1" role={interactive ? 'radiogroup' : undefined} aria-label={interactive ? 'Star rating' : `${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => interactive ? (
        <button key={star} type="button" role="radio" aria-checked={rating === star} aria-label={`${star} stars`} onClick={() => onChange?.(star)} className="p-1 text-gold transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"><Star className={`h-7 w-7 ${star <= rating ? 'fill-gold' : 'fill-transparent'}`} /></button>
      ) : <Star key={star} className={`h-3.5 w-3.5 text-gold ${star <= rating ? 'fill-gold' : 'fill-transparent'}`} />)}
    </div>
  )
}

function LegacyProof({ testimonials, filtered, onSubmit }: { testimonials: LegacyTestimonial[]; filtered: boolean; onSubmit: () => void }) {
  if (filtered) return <EmptyReviewState title="No reviews match these filters" body="Clear one or more filters, or be the first client to add matching proof." onSubmit={onSubmit} />
  return (
    <div className="mt-8">
      <div className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-muted-fg"><span className="h-px w-10 bg-gold/45" /> Curated client statements from the original portfolio</div>
      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.name} className="border border-line/60 bg-background/50 p-7">
            <Stars rating={5} />
            <blockquote className="mt-5 font-display text-xl leading-relaxed">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-line/60 pt-5"><div><div className="font-semibold">{testimonial.name}</div><div className="mt-1 text-sm text-muted-fg">{testimonial.role}</div></div><div className="text-sm font-bold text-gold">{testimonial.result}</div></figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-4 text-xs leading-5 text-muted-fg">These legacy statements remain separate from the verified, image-backed review feed. New reviews are published only after moderation.</p>
    </div>
  )
}

function EmptyReviewState({ title, body, onSubmit }: { title: string; body: string; onSubmit: () => void }) {
  return <div className="mt-8 border border-dashed border-line bg-background/35 px-6 py-14 text-center"><ImageIcon className="mx-auto h-8 w-8 text-gold/70" /><h3 className="mt-5 font-display text-2xl font-bold">{title}</h3><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-fg">{body}</p><button type="button" onClick={onSubmit} className="luxury-button mt-6"><UploadCloud className="h-4 w-4" /> Add proof</button></div>
}

function ReviewSkeleton() {
  return <div className="mt-8 grid gap-5 lg:grid-cols-3">{Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-[430px] animate-pulse border border-line/60 bg-[linear-gradient(110deg,rgba(16,30,52,.45),rgba(28,45,70,.55),rgba(16,30,52,.45))]" />)}</div>
}

function ReviewSubmissionDialog({ onClose, onSubmitted }: { onClose: () => void; onSubmitted: () => Promise<void> }) {
  const titleId = useId()
  const avatarInput = useRef<HTMLInputElement>(null)
  const proofInput = useRef<HTMLInputElement>(null)
  const [rating, setRating] = useState(5)
  const [avatar, setAvatar] = useState<ProofUpload | null>(null)
  const [proofs, setProofs] = useState<ProofUpload[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', close)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', close)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const setAvatarFile = (file?: File) => {
    if (!file) return
    if (avatar) URL.revokeObjectURL(avatar.preview)
    setAvatar({ file, preview: URL.createObjectURL(file), alt: '', category: 'Client portrait' })
  }

  const addProofFiles = (files: FileList | File[]) => {
    const next = Array.from(files).slice(0, 5 - proofs.length).map((file) => ({ file, preview: URL.createObjectURL(file), alt: '', category: PROOF_CATEGORIES[0] }))
    setProofs((current) => [...current, ...next])
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!avatar || !proofs.length) {
      setStatus('error')
      setMessage('Add one client photo and at least one proof image.')
      return
    }
    setStatus('sending')
    setMessage('')
    const form = new FormData(event.currentTarget)
    form.set('rating', String(rating))
    form.set('avatar', avatar.file)
    form.set('avatarAlt', avatar.alt)
    proofs.forEach((proof) => {
      form.append('proofImages', proof.file)
      form.append('proofAlt', proof.alt)
      form.append('proofCategory', proof.category)
    })
    form.set('consent', form.get('consent') ? 'true' : 'false')
    form.set('captchaToken', await getCaptchaToken())
    try {
      const response = await fetch('/api/reviews/submit', { method: 'POST', body: form })
      const result = await response.json() as { message?: string; error?: string }
      if (!response.ok) throw new Error(result.error || 'The review could not be submitted.')
      setStatus('done')
      setMessage(result.message || 'Review received for moderation.')
      await onSubmitted()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'The review could not be submitted.')
    }
  }

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-background/92 p-3 backdrop-blur-xl sm:p-6" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <div className="mx-auto my-4 max-w-5xl border border-gold/25 bg-[#050b16] shadow-luxury sm:my-8">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-line/70 bg-[#050b16]/95 p-5 backdrop-blur sm:p-7">
          <div><div className="text-[10px] uppercase tracking-[0.22em] text-gold">Private submission portal</div><h2 id={titleId} className="mt-2 font-display text-2xl font-bold sm:text-3xl">Add your client proof review</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-fg">Uploads are optimized, stripped of embedded metadata, and held privately until approval.</p></div>
          <button type="button" onClick={onClose} className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center border border-line text-muted-fg transition-colors hover:border-gold/50 hover:text-gold" aria-label="Close review form"><X className="h-5 w-5" /></button>
        </div>

        {status === 'done' ? (
          <div className="px-6 py-20 text-center sm:px-10"><BadgeCheck className="mx-auto h-12 w-12 text-gold" /><h3 className="mt-6 font-display text-3xl font-bold">Submission secured.</h3><p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-fg">{message}</p><button type="button" onClick={onClose} className="luxury-button mt-8">Return to client proof</button></div>
        ) : (
          <form onSubmit={(event) => void submit(event)} className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[1fr_.85fr]">
            <div className="space-y-5">
              <FormSection number="01" title="Client and project">
                <div className="grid gap-4 sm:grid-cols-2">
                  <ReviewField name="clientName" label="Client name" required />
                  <ReviewField name="email" type="email" label="Email for verification" required />
                  <ReviewField name="business" label="Business or website" />
                  <label className="review-label">Service used<select name="service" required className="review-input"><option value="">Select a service</option>{REVIEW_SERVICES.map((item) => <option key={item}>{item}</option>)}</select></label>
                  <ReviewField name="projectTitle" label="Project title" required />
                  <ReviewField name="projectDate" type="date" label="Date of service" required />
                  <ReviewField name="completionTimeline" label="Completion timeline" placeholder="Example: 12 days" />
                </div>
              </FormSection>

              <FormSection number="02" title="Rating and review">
                <div><span className="review-label">Overall rating</span><Stars rating={rating} interactive onChange={setRating} /></div>
                <label className="review-label">Written review <span className="normal-case tracking-normal text-muted-fg">(optional)</span><textarea name="reviewText" rows={6} maxLength={1800} className="review-input resize-y" placeholder="Describe the work, communication, and measurable outcome." /></label>
              </FormSection>
            </div>

            <div className="space-y-5">
              <FormSection number="03" title="Photo and proof">
                <input ref={avatarInput} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => setAvatarFile(event.target.files?.[0])} />
                <button type="button" onClick={() => avatarInput.current?.click()} className="review-dropzone w-full">
                  {avatar ? <img src={avatar.preview} alt="Client photo preview" className="mx-auto h-24 w-24 rounded-full border border-gold/40 object-cover" /> : <Camera className="mx-auto h-8 w-8 text-gold" />}
                  <span className="mt-4 block font-semibold">{avatar ? 'Replace client photo' : 'Upload client photo'}</span>
                  <span className="mt-1 block text-xs text-muted-fg">JPG, PNG, or WebP · 2MB maximum</span>
                </button>
                {avatar ? <input value={avatar.alt} onChange={(event) => setAvatar({ ...avatar, alt: event.target.value })} className="review-input" placeholder="Photo alt text, e.g. Client portrait" aria-label="Client photo alt text" /> : null}

                <input ref={proofInput} type="file" multiple accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => { if (event.target.files) addProofFiles(event.target.files); event.target.value = '' }} />
                <div
                  className="review-dropzone mt-4"
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => { event.preventDefault(); addProofFiles(event.dataTransfer.files) }}
                >
                  <UploadCloud className="mx-auto h-8 w-8 text-gold" /><span className="mt-4 block font-semibold">Drop project proof here</span><span className="mt-1 block text-xs text-muted-fg">Up to 5 images · 5MB each</span><button type="button" onClick={() => proofInput.current?.click()} className="mt-4 border border-gold/35 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold hover:bg-gold/10">Choose files</button>
                </div>
                <div className="space-y-3">
                  {proofs.map((proof, index) => (
                    <div key={`${proof.file.name}-${index}`} className="grid gap-3 border border-line/60 bg-background/45 p-3 sm:grid-cols-[72px_1fr_auto]">
                      <img src={proof.preview} alt="Proof preview" className="h-[72px] w-[72px] object-cover" />
                      <div className="space-y-2"><input value={proof.alt} onChange={(event) => setProofs((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, alt: event.target.value } : item))} className="review-input py-2" placeholder="Describe this image for accessibility" /><select value={proof.category} onChange={(event) => setProofs((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, category: event.target.value } : item))} className="review-input py-2">{PROOF_CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select></div>
                      <button type="button" onClick={() => { URL.revokeObjectURL(proof.preview); setProofs((items) => items.filter((_, itemIndex) => itemIndex !== index)) }} className="h-9 w-9 text-muted-fg hover:text-rose-300" aria-label={`Remove ${proof.file.name}`}><X className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              </FormSection>

              <label className="flex items-start gap-3 border border-line/60 bg-background/45 p-4 text-xs leading-5 text-muted-fg"><input type="checkbox" name="consent" required className="mt-1 accent-gold" /><span>I confirm this is my authentic experience and consent to publication of my name, photo, rating, review, and uploaded proof after moderation. Private email and technical metadata are never published.</span></label>
              {message ? <div role="alert" className={`border p-4 text-sm ${status === 'error' ? 'border-rose-400/25 bg-rose-400/5 text-rose-200' : 'border-gold/25 bg-gold/5 text-gold'}`}>{message}</div> : null}
              <button type="submit" disabled={status === 'sending'} className="luxury-button w-full disabled:cursor-wait disabled:opacity-60">{status === 'sending' ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Securing submission</> : <><Send className="h-4 w-4" /> Submit for verification</>}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

function FormSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <fieldset className="border border-line/60 bg-background/30 p-4 sm:p-5"><legend className="px-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold"><span className="mr-2 text-muted-fg">{number}</span>{title}</legend><div className="mt-2 space-y-4">{children}</div></fieldset>
}

function ReviewField({ name, label, type = 'text', required = false, placeholder }: { name: string; label: string; type?: string; required?: boolean; placeholder?: string }) {
  return <label className="review-label">{label}<input name={name} type={type} required={required} placeholder={placeholder} className="review-input" /></label>
}

function InlineActionForm({ endpoint, fields, onDone }: { endpoint: string; fields: Array<[string, string]>; onDone: (message: string) => void }) {
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  return (
    <form className="mt-4 space-y-3 border border-line/60 bg-background/55 p-4" onSubmit={async (event) => {
      event.preventDefault(); setSending(true); setError('')
      const response = await fetch(endpoint, { method: 'POST', body: new FormData(event.currentTarget) })
      const result = await response.json() as { message?: string; error?: string }
      setSending(false)
      if (!response.ok) setError(result.error || 'The request could not be sent.')
      else onDone(result.message || 'Received for moderation.')
    }}>
      {fields.length === 1 ? <textarea name={fields[0][0]} required rows={3} className="review-input" placeholder={fields[0][1]} /> : <><input name={fields[0][0]} required className="review-input" placeholder={fields[0][1]} /><textarea name={fields[1][0]} required rows={3} className="review-input" placeholder={fields[1][1]} /></>}
      {error ? <p className="text-xs text-rose-300">{error}</p> : null}
      <button type="submit" disabled={sending} className="border border-gold/35 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold hover:bg-gold/10 disabled:opacity-50">{sending ? 'Sending' : 'Submit'}</button>
    </form>
  )
}

function Lightbox({ review, startIndex, onClose }: { review: PublicReview; startIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex)
  const media = review.media[index]
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') setIndex((value) => (value - 1 + review.media.length) % review.media.length)
      if (event.key === 'ArrowRight') setIndex((value) => (value + 1) % review.media.length)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose, review.media.length])
  if (!media) return null
  return <div className="fixed inset-0 z-[90] flex items-center justify-center bg-background/96 p-4 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Project proof gallery"><button type="button" onClick={onClose} className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-line text-fg hover:border-gold/50 hover:text-gold" aria-label="Close gallery"><X className="h-5 w-5" /></button><button type="button" onClick={() => setIndex((value) => (value - 1 + review.media.length) % review.media.length)} className="absolute left-3 flex h-11 w-11 items-center justify-center border border-line bg-background/70 text-fg hover:border-gold/50 sm:left-8" aria-label="Previous image"><ChevronLeft className="h-5 w-5" /></button><figure className="max-w-5xl"><img src={media.url} alt={media.alt} className="max-h-[78vh] max-w-full object-contain" /><figcaption className="mt-4 text-center"><div className="text-xs uppercase tracking-[0.18em] text-gold">{media.category}</div><p className="mt-2 text-sm text-muted-fg">{media.alt}</p></figcaption></figure><button type="button" onClick={() => setIndex((value) => (value + 1) % review.media.length)} className="absolute right-3 flex h-11 w-11 items-center justify-center border border-line bg-background/70 text-fg hover:border-gold/50 sm:right-8" aria-label="Next image"><ChevronRight className="h-5 w-5" /></button></div>
}

function getVoterKey() {
  const existing = window.localStorage.getItem('review-voter-key')
  if (existing) return existing
  const value = window.crypto.randomUUID()
  window.localStorage.setItem('review-voter-key', value)
  return value
}

async function getCaptchaToken() {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined
  if (!siteKey) return ''
  type Grecaptcha = { ready: (callback: () => void) => void; execute: (key: string, options: { action: string }) => Promise<string> }
  const getClient = () => (window as typeof window & { grecaptcha?: Grecaptcha }).grecaptcha
  if (!getClient()) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Anti-spam protection could not load.'))
      document.head.appendChild(script)
    })
  }
  const client = getClient()
  if (!client) return ''
  await new Promise<void>((resolve) => client.ready(resolve))
  return client.execute(siteKey, { action: 'review_submit' })
}

const formatDate = (value: string) => new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(value))
const formatProjectDate = (value: string) => new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`))

export function ReviewSummaryBadge() {
  const [stats, setStats] = useState<ReviewStats | null>(null)
  useEffect(() => {
    void fetch('/api/reviews/approved?pageSize=1')
      .then((response) => response.ok ? response.json() as Promise<ApprovedReviewsResponse> : null)
      .then((data) => setStats(data?.stats ?? null))
      .catch(() => undefined)
  }, [])
  if (!stats?.total) return null
  return <a href="#client-proof" className="mt-5 inline-flex items-center gap-3 border border-gold/25 bg-background/50 px-3 py-2 text-xs text-muted-fg backdrop-blur transition-colors hover:border-gold/50 hover:text-gold"><span className="flex"><Star className="h-3.5 w-3.5 fill-gold text-gold" /></span><strong className="text-fg">{stats.average.toFixed(1)}</strong> from {stats.total} verified review{stats.total === 1 ? '' : 's'}<ChevronRight className="h-3.5 w-3.5" /></a>
}
