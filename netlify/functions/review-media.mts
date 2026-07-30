import type { Config } from '@netlify/functions'
import { uploadStore } from './_lib/reviews.mjs'

export default async (_req: Request, context: { params: Record<string, string> }) => {
  const key = context.params.key
  if (!/^[a-f0-9-]+\.webp$/.test(key)) return new Response('Not found', { status: 404 })
  const image = await uploadStore.get(key, { type: 'arrayBuffer' })
  if (!(image instanceof ArrayBuffer)) return new Response('Not found', { status: 404 })
  return new Response(image, {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

export const config: Config = {
  path: '/api/review-media/:key',
}
