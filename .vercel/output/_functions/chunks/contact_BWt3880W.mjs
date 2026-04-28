import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

const prerender = false;
const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100).trim(),
  email: z.email("Invalid email address").max(254),
  message: z.string().min(10, "Message must be at least 10 characters").max(5e3).trim(),
  website: z.string().max(0).optional()
  // honeypot — must be empty
});
const supabase = createClient(
  undefined                            ,
  undefined                                         ,
  { auth: { persistSession: false } }
);
async function hashIP(ip) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
const POST = async ({ request }) => {
  const json = (body2, status) => new Response(JSON.stringify(body2), {
    status,
    headers: { "Content-Type": "application/json" }
  });
  const origin = request.headers.get("origin") ?? "";
  if (origin !== undefined                                      ) {
    return new Response(null, { status: 403 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }
  const raw = body;
  if (raw.website && String(raw.website).length > 0) {
    return json({ ok: true }, 200);
  }
  const result = ContactSchema.safeParse(body);
  if (!result.success) {
    const fieldErrors = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0] ?? "_");
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key].push(issue.message);
    }
    return json({ errors: fieldErrors }, 422);
  }
  const rawIP = (request.headers.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0].trim();
  const hashed_ip = await hashIP(rawIP);
  const { count, error: countError } = await supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("hashed_ip", hashed_ip).gte("created_at", new Date(Date.now() - 15 * 60 * 1e3).toISOString());
  if (countError) {
    return json({ error: "Service unavailable" }, 503);
  }
  if ((count ?? 0) >= 3) {
    return new Response(JSON.stringify({ error: "Too many requests. Please wait 15 minutes." }), {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": "900"
      }
    });
  }
  const { error: insertError } = await supabase.from("contact_submissions").insert({
    name: result.data.name,
    email: result.data.email,
    message: result.data.message,
    hashed_ip
  });
  if (insertError) {
    return json({ error: "Failed to save your message. Please try again." }, 500);
  }
  return json({ ok: true }, 201);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
