import { createFileRoute, Link } from '@tanstack/react-router'
import { getUser, handleAuthCallback, login, logout, type User } from '@netlify/identity'
import {
  BadgeCheck,
  Check,
  Download,
  EyeOff,
  ImageIcon,
  LoaderCircle,
  LogOut,
  MessageSquareReply,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SITE_URL } from '@/lib/site'

export const Route = createFileRoute('/admin/reviews')({
  head: () => ({
    meta: [
      { title: 'Review Moderation — Trustman Kareem' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/admin/reviews` }],
  }),
  component: ReviewAdmin,
})

type AdminReview = {
  id: string
  clientName: string
  email: string
  business: string | null
  service: string
  projectTitle: string
  projectDate: string
  completionTimeline: string | null
  rating: number
  reviewText: string | null
  status: string
  verified: boolean
  featured: boolean
  helpfulCount: number
  avatarUrl: string
  avatarAlt: string
  submittedAt: string
  moderationNotes: string | null
  media: Array<{ id: string; url: string; altText: string; category: string }>
}

type PendingReply = { id: string; reviewId: string; authorName: string; body: string; submittedAt: string }
type ReviewReport = { id: string; reviewId: string; reason: string; createdAt: string }
type AdminResponse = {
  reviews: AdminReview[]
  pendingReplies: PendingReply[]
  reports: ReviewReport[]
  analytics: { total: number; approved: number; average: number; helpful: number; trustScore: number; currentMonth: number; monthlyGrowth: number; topServices: Array<{ service: string; count: number }> }
}

const emptyAdminResponse: AdminResponse = {
  reviews: [],
  pendingReplies: [],
  reports: [],
  analytics: { total: 0, approved: 0, average: 0, helpful: 0, trustScore: 0, currentMonth: 0, monthlyGrowth: 0, topServices: [] },
}

function ReviewAdmin() {
  const [user, setUser] = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)
  const [authError, setAuthError] = useState('')
  const isAdmin = useMemo(() => Boolean(user && Array.isArray(user.appMetadata?.roles) && user.appMetadata.roles.includes('admin')), [user])

  useEffect(() => {
    void (async () => {
      try {
        await handleAuthCallback()
        setUser(await getUser())
      } catch (error) {
        setAuthError(error instanceof Error ? error.message : 'Authentication could not be completed.')
      } finally {
        setAuthReady(true)
      }
    })()
  }, [])

  if (!authReady) return <AdminLoading label="Checking admin access" />
  if (!user) return <AdminLogin error={authError} onLogin={setUser} />
  if (!isAdmin) return <AccessDenied user={user} onLogout={async () => { await logout(); setUser(null) }} />
  return <ModerationDashboard user={user} onLogout={async () => { await logout(); setUser(null) }} />
}

function AdminLogin({ error, onLogin }: { error: string; onLogin: (user: User) => void }) {
  const [message, setMessage] = useState(error)
  const [sending, setSending] = useState(false)
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg items-center px-5 py-20">
      <form className="w-full border border-gold/25 bg-panel/80 p-7 shadow-luxury sm:p-9" onSubmit={async (event) => {
        event.preventDefault(); setSending(true); setMessage('')
        const form = new FormData(event.currentTarget)
        try {
          const signedIn = await login(String(form.get('email')), String(form.get('password')))
          onLogin(signedIn)
        } catch (loginError) {
          setMessage(loginError instanceof Error ? loginError.message : 'Login failed.')
        } finally {
          setSending(false)
        }
      }}>
        <ShieldCheck className="h-9 w-9 text-gold" />
        <div className="mt-6 text-[10px] uppercase tracking-[0.22em] text-gold">Protected moderation</div>
        <h1 className="mt-3 font-display text-4xl font-bold">Review admin</h1>
        <p className="mt-4 text-sm leading-6 text-muted-fg">Sign in with an invited Netlify Identity account carrying the <code>admin</code> role.</p>
        <label className="review-label mt-7">Email<input name="email" type="email" required autoComplete="email" className="review-input" /></label>
        <label className="review-label mt-4">Password<input name="password" type="password" required autoComplete="current-password" className="review-input" /></label>
        {message ? <p className="mt-4 border border-rose-400/20 bg-rose-400/5 p-3 text-xs text-rose-200">{message}</p> : null}
        <button type="submit" disabled={sending} className="luxury-button mt-6 w-full disabled:opacity-50">{sending ? <><LoaderCircle className="h-4 w-4 animate-spin" /> Signing in</> : 'Open moderation'}</button>
      </form>
    </main>
  )
}

function AccessDenied({ user, onLogout }: { user: User; onLogout: () => Promise<void> }) {
  return <main className="mx-auto max-w-xl px-5 py-24 text-center"><X className="mx-auto h-10 w-10 text-rose-300" /><h1 className="mt-6 font-display text-4xl font-bold">Admin role required</h1><p className="mt-4 text-sm leading-6 text-muted-fg">{user.email} is authenticated but does not have review moderation access. Add the <code>admin</code> role in Netlify Identity.</p><button type="button" onClick={() => void onLogout()} className="luxury-button-outline mt-7"><LogOut className="h-4 w-4" /> Sign out</button></main>
}

function ModerationDashboard({ user, onLogout }: { user: User; onLogout: () => Promise<void> }) {
  const [status, setStatus] = useState('pending')
  const [data, setData] = useState<AdminResponse>(emptyAdminResponse)
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const response = await fetch(`/api/reviews/admin?status=${encodeURIComponent(status)}`)
    if (response.status === 401) {
      setMessage('Your admin session expired. Sign in again.')
      setLoading(false)
      return
    }
    const result = await response.json() as AdminResponse & { error?: string }
    if (!response.ok) setMessage(result.error || 'Moderation data could not load.')
    else setData(result)
    setSelected([])
    setLoading(false)
  }, [status])

  useEffect(() => { void load() }, [load])

  const action = async (actionName: string, ids = selected) => {
    if (!ids.length) return
    setMessage('')
    const response = await fetch('/api/reviews/admin', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action: actionName, ids }),
    })
    const result = await response.json() as { error?: string }
    if (!response.ok) setMessage(result.error || 'The moderation action failed.')
    else {
      setMessage('Moderation action completed.')
      await load()
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 border-b border-line/60 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div><div className="text-[10px] uppercase tracking-[0.22em] text-gold">Client proof operations</div><h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Review moderation</h1><p className="mt-3 text-sm text-muted-fg">Signed in as {user.email}</p></div>
        <div className="flex flex-wrap gap-3"><a href="/api/reviews/admin/export" className="luxury-button-outline"><Download className="h-4 w-4" /> Export CSV</a><Link to="/" className="luxury-button-outline">View site</Link><button type="button" onClick={() => void onLogout()} className="luxury-button-outline"><LogOut className="h-4 w-4" /> Sign out</button></div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <AdminMetric icon={ImageIcon} label="Total reviews" value={String(data.analytics.total)} />
        <AdminMetric icon={Star} label="Average rating" value={data.analytics.average ? data.analytics.average.toFixed(1) : '—'} />
        <AdminMetric icon={ShieldCheck} label="Trust score" value={`${data.analytics.trustScore}%`} />
        <AdminMetric icon={Sparkles} label="This month" value={`${data.analytics.currentMonth}`} detail={`${data.analytics.monthlyGrowth >= 0 ? '+' : ''}${data.analytics.monthlyGrowth}% vs prior`} />
        <AdminMetric icon={MessageSquareReply} label="Engagement" value={String(data.analytics.helpful)} detail="Helpful votes" />
      </div>

      <div className="mt-10 flex flex-col gap-4 border-y border-line/60 py-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-2">{['pending', 'approved', 'hidden', 'rejected'].map((item) => <button key={item} type="button" onClick={() => setStatus(item)} className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${status === item ? 'border-gold bg-gold/10 text-gold' : 'border-line text-muted-fg hover:border-gold/40'}`}>{item}</button>)}</div>
        <div className="flex flex-wrap gap-2"><AdminAction icon={Check} label="Approve" disabled={!selected.length} onClick={() => void action('approve')} /><AdminAction icon={Sparkles} label="Feature" disabled={!selected.length} onClick={() => void action('feature')} /><AdminAction icon={EyeOff} label="Hide" disabled={!selected.length} onClick={() => void action('hide')} /><AdminAction icon={Trash2} label="Delete" danger disabled={!selected.length} onClick={() => { if (window.confirm('Permanently delete the selected reviews and proof media?')) void action('delete') }} /></div>
      </div>
      {message ? <p role="status" className="mt-5 border border-gold/20 bg-gold/5 p-4 text-sm text-gold">{message}</p> : null}

      {loading ? <AdminLoading label="Loading moderation queue" /> : (
        <div className="mt-7 space-y-5">
          {!data.reviews.length ? <div className="border border-dashed border-line p-14 text-center text-sm text-muted-fg">No {status} reviews.</div> : null}
          {data.reviews.map((review) => (
            <article key={review.id} className="grid gap-6 border border-line/60 bg-background/50 p-5 lg:grid-cols-[auto_1fr_280px] lg:p-6">
              <input type="checkbox" aria-label={`Select ${review.clientName}`} checked={selected.includes(review.id)} onChange={(event) => setSelected((items) => event.target.checked ? [...items, review.id] : items.filter((id) => id !== review.id))} className="mt-1 h-4 w-4 accent-gold" />
              <div>
                <div className="flex flex-wrap items-center gap-3"><img src={review.avatarUrl} alt={review.avatarAlt} className="h-14 w-14 rounded-full border border-gold/35 object-cover" /><div><div className="flex items-center gap-2"><h2 className="font-display text-xl font-bold">{review.clientName}</h2>{review.verified ? <BadgeCheck className="h-4 w-4 text-gold" /> : null}</div><p className="mt-1 text-xs text-muted-fg">{review.email} · {review.business || 'No business supplied'}</p></div></div>
                <div className="mt-5 flex flex-wrap items-center gap-3"><span className="text-[10px] uppercase tracking-[0.16em] text-gold">{review.service}</span><span className="text-xs text-muted-fg">{review.projectDate}</span><div className="flex">{Array.from({ length: 5 }, (_, index) => <Star key={index} className={`h-3.5 w-3.5 text-gold ${index < review.rating ? 'fill-gold' : ''}`} />)}</div></div>
                <h3 className="mt-3 font-display text-2xl font-bold">{review.projectTitle}</h3>
                {review.reviewText ? <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-fg">{review.reviewText}</p> : null}
                <div className="mt-4 text-xs text-muted-fg">Submitted {new Date(review.submittedAt).toLocaleString()}</div>
                {review.status === 'approved' ? <OwnerResponseForm reviewId={review.id} /> : null}
              </div>
              <div className="grid grid-cols-2 gap-2 self-start">
                {review.media.map((media) => <a key={media.id} href={media.url} target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden border border-line/60"><img src={media.url} alt={media.altText} className="h-full w-full object-cover transition-transform group-hover:scale-105" /><span className="absolute inset-x-0 bottom-0 bg-background/85 p-1 text-center text-[8px] uppercase tracking-wider">{media.category}</span></a>)}
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <ModerationList title="Pending replies" empty="No replies are awaiting moderation." items={data.pendingReplies.map((reply) => ({ id: reply.id, eyebrow: reply.authorName, body: reply.body, meta: `Review ${reply.reviewId.slice(0, 8)} · ${new Date(reply.submittedAt).toLocaleDateString()}` }))} approve={(id) => void action('approveReply', [id])} reject={(id) => void action('rejectReply', [id])} />
        <ModerationList title="Open reports" empty="No reviews are currently reported." items={data.reports.map((report) => ({ id: report.id, eyebrow: 'Reported review', body: report.reason, meta: `Review ${report.reviewId.slice(0, 8)} · ${new Date(report.createdAt).toLocaleDateString()}` }))} approve={(id) => void action('resolveReport', [id])} />
      </div>
    </main>
  )
}

function AdminMetric({ icon: Icon, label, value, detail }: { icon: typeof ImageIcon; label: string; value: string; detail?: string }) {
  return <div className="border border-line/60 bg-background/50 p-5"><div className="flex items-center justify-between"><Icon className="h-5 w-5 text-gold" /><span className="font-display text-3xl font-bold text-gold">{value}</span></div><div className="mt-5 text-xs uppercase tracking-[0.16em] text-muted-fg">{label}</div>{detail ? <div className="mt-2 text-[10px] text-muted-fg">{detail}</div> : null}</div>
}

function OwnerResponseForm({ reviewId }: { reviewId: string }) {
  const [message, setMessage] = useState('')
  return <form className="mt-5 flex flex-col gap-2 border-l border-gold/35 pl-4 sm:flex-row" onSubmit={async (event) => {
    event.preventDefault()
    const response = await fetch(`/api/reviews/${reviewId}/reply`, { method: 'POST', body: new FormData(event.currentTarget) })
    const result = await response.json() as { message?: string; error?: string }
    setMessage(response.ok ? result.message || 'Response published.' : result.error || 'Response failed.')
    if (response.ok) event.currentTarget.reset()
  }}><input name="body" required className="review-input mt-0 flex-1" placeholder="Publish an owner response" /><button type="submit" className="border border-gold/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-gold hover:bg-gold/10">Respond</button>{message ? <span className="self-center text-xs text-gold">{message}</span> : null}</form>
}

function AdminAction({ icon: Icon, label, onClick, disabled, danger = false }: { icon: typeof Check; label: string; onClick: () => void; disabled: boolean; danger?: boolean }) {
  return <button type="button" onClick={onClick} disabled={disabled} className={`inline-flex items-center gap-2 border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${danger ? 'border-rose-400/30 text-rose-300 hover:bg-rose-400/10' : 'border-line text-muted-fg hover:border-gold/40 hover:text-gold'}`}><Icon className="h-3.5 w-3.5" />{label}</button>
}

function ModerationList({ title, empty, items, approve, reject }: { title: string; empty: string; items: Array<{ id: string; eyebrow: string; body: string; meta: string }>; approve: (id: string) => void; reject?: (id: string) => void }) {
  return <section className="border border-line/60 bg-background/45 p-5"><h2 className="font-display text-2xl font-bold">{title}</h2><div className="mt-5 space-y-3">{!items.length ? <p className="text-sm text-muted-fg">{empty}</p> : items.map((item) => <div key={item.id} className="border border-line/60 p-4"><div className="text-[10px] uppercase tracking-[0.16em] text-gold">{item.eyebrow}</div><p className="mt-2 text-sm leading-6 text-muted-fg">{item.body}</p><div className="mt-3 text-[10px] text-muted-fg">{item.meta}</div><div className="mt-4 flex gap-2"><button type="button" onClick={() => approve(item.id)} className="border border-gold/35 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-gold hover:bg-gold/10">Approve / Resolve</button>{reject ? <button type="button" onClick={() => reject(item.id)} className="border border-rose-400/25 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-rose-300 hover:bg-rose-400/10">Reject</button> : null}</div></div>)}</div></section>
}

function AdminLoading({ label }: { label: string }) {
  return <div className="flex min-h-[45vh] items-center justify-center gap-3 text-sm text-muted-fg"><LoaderCircle className="h-5 w-5 animate-spin text-gold" /> {label}</div>
}
