# Supabase Setup — Contact Form

The API at `src/pages/api/contact.ts` is already written — it just needs a Supabase project and three environment variables.

---

## Step 1 — Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **New project**, give it a name (e.g. `personal-website`), choose a region, set a database password, then click **Create new project**.
3. Wait ~1 minute for provisioning to finish.

---

## Step 2 — Create the `contact_submissions` table

In your Supabase dashboard go to **SQL Editor** and run this:

```sql
create table contact_submissions (
  id         bigserial primary key,
  name       text        not null,
  email      text        not null,
  message    text        not null,
  hashed_ip  text        not null,
  created_at timestamptz not null default now()
);

-- Index used by the rate-limit query (hashed_ip + created_at)
create index on contact_submissions (hashed_ip, created_at);

-- Disable public read/write — only the service role key (used server-side) can insert
alter table contact_submissions enable row level security;
```

No RLS policies are needed because the service role key bypasses RLS entirely. The table is locked down from the public.

---

## Step 3 — Grab your credentials

In the Supabase dashboard go to **Project Settings → API**:

| What you need | Where to find it |
|---|---|
| `SUPABASE_URL` | "Project URL" field |
| `SUPABASE_SERVICE_ROLE_KEY` | Under "Project API keys" → **service_role** (click reveal) |

> **Never expose the service role key on the client side.** It's only used in the server-side API route.

---

## Step 4 — Set up environment variables

**For local development**, create a `.env` file in the project root (already in `.gitignore`):

```ini
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Must match your local dev origin exactly
CONTACT_ALLOWED_ORIGIN=http://localhost:4321
```

**For Vercel (production)**, go to your Vercel project → **Settings → Environment Variables** and add all three:

| Key | Value |
|---|---|
| `SUPABASE_URL` | your project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | your service role key |
| `CONTACT_ALLOWED_ORIGIN` | `https://erfan.dev` |

---

## Step 5 — Test it

```bash
npm run dev
```

Fill out the contact form and submit. Then check **Supabase → Table Editor → contact_submissions** — your row should appear with the name, email, message, and a hashed IP.

To verify rate limiting works, submit 3 times from the same IP — the 4th attempt should return a 429 error and show the "Too many requests" message on the form.

---

## What the API does (quick reference)

| Check | Purpose |
|---|---|
| Origin check | Rejects requests not from `CONTACT_ALLOWED_ORIGIN` (CSRF protection) |
| Honeypot | Silently discards bot submissions that fill the hidden `website` field |
| Zod validation | Enforces field lengths and email format server-side |
| Rate limiting | Max 3 submissions per hashed IP per 15 minutes, checked against the DB |
| IP hashing | SHA-256 hashes the IP before storing — no raw PII in the database |
