import type { FormSubmittedEvent } from '@netlify/functions'

const FORM_NAME = 'audit-request'
const TELEGRAM_MESSAGE_LIMIT = 4000

function clean(value: string | undefined, maxLength: number) {
  return (value ?? '').trim().slice(0, maxLength)
}

function buildMessage(data: Record<string, string>) {
  const name = clean(data.name, 120)
  const email = clean(data.email, 200)
  const business = clean(data.business, 200)
  const budget = clean(data.budget, 100)
  const message = clean(data.message, 2400)

  return [
    'New strategy audit request',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Business: ${business}`,
    `Monthly ad budget: ${budget}`,
    '',
    'Project goal:',
    message,
  ].join('\n').slice(0, TELEGRAM_MESSAGE_LIMIT)
}

async function formSubmitted(event: FormSubmittedEvent) {
  const formName = event.data['form-name'] ?? event.data.form_name

  if (formName && formName !== FORM_NAME) return
  if (event.data['bot-field']) return

  const botToken = Netlify.env.get('TELEGRAM_BOT_TOKEN')
  const chatId = Netlify.env.get('TELEGRAM_CHAT_ID')

  if (!botToken || !chatId) {
    throw new Error('Telegram form notifications are not configured')
  }

  const requiredFields = ['name', 'email', 'business', 'budget', 'message'] as const
  if (requiredFields.some((field) => !clean(event.data[field], 1))) {
    throw new Error('Telegram form notification is missing required fields')
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildMessage(event.data),
      disable_web_page_preview: true,
    }),
  })

  if (!response.ok) {
    throw new Error(`Telegram notification failed with status ${response.status}`)
  }
}

export default { formSubmitted }
