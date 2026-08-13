import { Link } from '@tanstack/react-router'
import { Check, LockKeyhole, Send } from 'lucide-react'
import { useState } from 'react'
import { TELEGRAM_URL } from '@/lib/site'

type FormFields = {
  name: string
  email: string
  business: string
  budget: string
  message: string
  'bot-field': string
}

const EMPTY_FIELDS: FormFields = {
  name: '',
  email: '',
  business: '',
  budget: '',
  message: '',
  'bot-field': '',
}

const FIT_POINTS = [
  'Confidential review of your current setup',
  'Clear priorities instead of a generic sales pitch',
  'A direct response with practical next steps',
]

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

export function ContactForms() {
  const [fields, setFields] = useState<FormFields>(EMPTY_FIELDS)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const updateField = (field: keyof FormFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }))
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'audit-request', ...fields }),
      })

      if (!response.ok) throw new Error('Request failed')

      setStatus('done')
      setFields(EMPTY_FIELDS)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="overflow-hidden border border-line/60 bg-card/70 shadow-luxury lg:grid lg:grid-cols-[0.72fr_1.28fr]">
      <aside className="relative overflow-hidden border-b border-line/60 bg-secondary/35 p-7 sm:p-10 lg:border-b-0 lg:border-r">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 bg-accent/10 blur-3xl" />
        <div className="relative">
          <div className="section-badge"><LockKeyhole className="h-3 w-3" /> Private Inquiry</div>
          <h3 className="mt-6 font-display text-3xl font-bold">Start with a focused strategy review.</h3>
          <p className="mt-4 text-sm leading-7 text-muted-fg">
            Share the essentials. Your brief is used only to assess fit, prepare useful recommendations, and respond to your request.
          </p>
          <ul className="mt-8 space-y-4">
            {FIT_POINTS.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-6">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/35 text-accent"><Check className="h-3 w-3" /></span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-10 border-t border-line/60 pt-6">
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-fg">Prefer a faster conversation?</div>
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="luxury-button-outline mt-4 w-full justify-center">
              Continue on Telegram <Send className="h-4 w-4" />
            </a>
          </div>
        </div>
      </aside>

      <form name="audit-request" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit} className="p-7 sm:p-10">
        <input type="hidden" name="form-name" value="audit-request" />
        <p className="hidden">
          <label htmlFor="contact-bot-field">Do not fill this out</label>
          <input id="contact-bot-field" name="bot-field" value={fields['bot-field']} onChange={(event) => updateField('bot-field', event.target.value)} />
        </p>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Request a Strategy Audit</div>
          <h3 className="mt-3 font-display text-3xl font-bold">Tell me what you are building.</h3>
          <p className="mt-3 text-sm leading-6 text-muted-fg">Fields marked with * are required.</p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <label htmlFor="contact-name" className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-fg">Full Name *</span>
            <input id="contact-name" name="name" autoComplete="name" required value={fields.name} onChange={(event) => updateField('name', event.target.value)} className="form-control" />
          </label>
          <label htmlFor="contact-email" className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-fg">Business Email *</span>
            <input id="contact-email" name="email" type="email" autoComplete="email" required value={fields.email} onChange={(event) => updateField('email', event.target.value)} className="form-control" />
          </label>
          <label htmlFor="contact-business" className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-fg">Business / Brand *</span>
            <input id="contact-business" name="business" autoComplete="organization" required value={fields.business} onChange={(event) => updateField('business', event.target.value)} className="form-control" />
          </label>
          <label htmlFor="contact-budget" className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-fg">Monthly Ad Budget *</span>
            <select id="contact-budget" name="budget" required value={fields.budget} onChange={(event) => updateField('budget', event.target.value)} className="form-control">
              <option value="" disabled>Select a range</option>
              <option value="Under $10,000">Under $10,000</option>
              <option value="$10,000–$50,000">$10,000–$50,000</option>
              <option value="$50,000–$250,000">$50,000–$250,000</option>
              <option value="$250,000+">$250,000+</option>
            </select>
          </label>
          <label htmlFor="contact-message" className="block sm:col-span-2">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-fg">Project Goal *</span>
            <textarea id="contact-message" name="message" rows={5} required value={fields.message} onChange={(event) => updateField('message', event.target.value)} placeholder="What are you scaling, what is blocking growth, and what outcome do you want?" className="form-control resize-none" />
          </label>
        </div>

        <div className="mt-7 flex flex-col gap-4 border-t border-line/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-xs leading-5 text-muted-fg">
            By submitting, you agree to the <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>. No mailing lists or unsolicited promotions.
          </p>
          <button disabled={status === 'sending'} type="submit" className="luxury-button shrink-0 disabled:opacity-60">
            {status === 'sending' ? 'Sending…' : 'Send Request'} <Send className="h-4 w-4" />
          </button>
        </div>

        <p aria-live="polite" className={`mt-4 text-sm ${status === 'error' ? 'text-red-400' : status === 'done' ? 'text-accent' : 'text-muted-fg'}`}>
          {status === 'done' ? 'Your request was saved successfully. A private Telegram alert is sent to Kareem for follow-up.' : status === 'error' ? 'The request could not be sent. Please continue on Telegram instead.' : 'Your information stays private and is reviewed only for this inquiry.'}
        </p>
      </form>
    </div>
  )
}
