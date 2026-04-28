export const prerender = false

import type { APIRoute } from 'astro'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

const ContactSchema = z.object({
  name:    z.string().min(1, 'Name is required').max(100).trim(),
  email:   z.email('Invalid email address').max(254),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000).trim(),
  website: z.string().max(0).optional(), // honeypot — must be empty
})

const supabase = createClient(
  import.meta.env.SUPABASE_URL as string,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY as string,
  { auth: { persistSession: false } }
)

async function hashIP(ip: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip))
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export const POST: APIRoute = async ({ request }) => {
  const json = (body: object, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })

  // 1. Origin validation — blocks cross-origin POST requests
  const origin = request.headers.get('origin') ?? ''
  if (origin !== import.meta.env.CONTACT_ALLOWED_ORIGIN) {
    return new Response(null, { status: 403 })
  }

  // 2. Parse body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid request body' }, 400)
  }

  // 3. Honeypot check — silent discard so bots don't learn they were detected
  const raw = body as Record<string, unknown>
  if (raw.website && String(raw.website).length > 0) {
    return json({ ok: true }, 200)
  }

  // 4. Server-side validation with Zod
  const result = ContactSchema.safeParse(body)
  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {}
    for (const issue of result.error.issues) {
      const key = String(issue.path[0] ?? '_')
      if (!fieldErrors[key]) fieldErrors[key] = []
      fieldErrors[key].push(issue.message)
    }
    return json({ errors: fieldErrors }, 422)
  }

  // 5. Extract and hash IP — never store raw IP (privacy / GDPR)
  const rawIP = (request.headers.get('x-forwarded-for') ?? '127.0.0.1')
    .split(',')[0]
    .trim()
  const hashed_ip = await hashIP(rawIP)

  // 6. Rate limiting: max 3 submissions per IP per 15-minute window
  //    Runs against the DB so it works correctly across serverless instances
  const { count, error: countError } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('hashed_ip', hashed_ip)
    .gte('created_at', new Date(Date.now() - 15 * 60 * 1000).toISOString())

  if (countError) {
    return json({ error: 'Service unavailable' }, 503)
  }

  if ((count ?? 0) >= 3) {
    return new Response(JSON.stringify({ error: 'Too many requests. Please wait 15 minutes.' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': '900',
      },
    })
  }

  // 7. Insert submission
  const { error: insertError } = await supabase
    .from('contact_submissions')
    .insert({
      name: result.data.name,
      email: result.data.email,
      message: result.data.message,
      hashed_ip,
    })

  if (insertError) {
    return json({ error: 'Failed to save your message. Please try again.' }, 500)
  }

  return json({ ok: true }, 201)
}
