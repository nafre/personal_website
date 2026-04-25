# Portfolio Content Migration

All content data needed to rebuild this portfolio in a new Astro project.
Copy `src/data/content.js`, `src/content.config.ts`, blog posts, and public assets.
Metadata hardcoded in `Layout.astro` is listed separately at the bottom.

---

## 1. `src/data/content.js`

```js
// Single source of truth for portfolio content.

export const site = {
  name: 'Mohamed Erfan',
  role: 'Software Engineer',
  location: 'Kuala Lumpur, Malaysia',
  email: 'erfansiraj97@gmail.com',
  shortBio: "I design and build the systems you don't see, but rely on every day.",
  longBio: [
    "Six years ago I wrote my first production Java service. Since then I've been in the backend trenches of fintech — four years building Guidewire's localized insurance platform across APAC, and now working on Mastercard's payment processor at Endava. The common thread: systems where failure isn't an option.",
    "My best work lives where engineering rigor meets product thinking: APIs that are easy to reason about, services that hold under load, and codebases the next team can actually maintain. I've led a team through a full release cycle and mentored engineers along the way. I write things down.",
  ],
  focus: 'Backend, design systems',
  availability: 'Available for full-time roles — Q3 2026',
  photo: '/images/avatar.jpg',
  socials: {
    github: 'https://github.com/nafre/',
    linkedin: 'https://www.linkedin.com/in/mohderfan/',
    email: 'mailto:erfansiraj97@gmail.com',
  },
}

export const projects = [
  {
    title: 'Guidewire Insurance Suite',
    tagline: 'P&C insurance platform built for APAC compliance',
    description:
      "Localized Guidewire's P&C insurance suite for Australia and New Zealand — implementing GST, regional compliance, and language requirements. Led a team of six through a full release cycle, shipping software relied on by insurers managing substantial risk portfolios.",
    tags: ['Java', 'CI/CD', 'TeamCity'],
    year: '2023',
    link: 'https://www.guidewire.com/resources/blog/technology/new-features-for-go-australia-in-garmisch',
    linkText: 'Read More',
    accent: 'from-indigo-500/20 to-sky-500/10',
    accentGradient: 'from-indigo-500 via-indigo-400 to-sky-400',
  },
  {
    title: 'Mastercard Payment Gateway Services',
    tagline: "The payment processor at the core of Mastercard's gateway",
    description:
      "Building the payment processor service at the heart of Mastercard's gateway infrastructure — the critical path between a cardholder's tap and their bank. Handles millions of transactions daily, coordinating validation across services before routing to the acquirer.",
    tags: ['Java', 'Spring Boot', 'Oracle SQL', 'Jenkins', 'Kafka'],
    year: '2025',
    link: 'https://www.mastercard.com/gateway.html',
    linkText: 'Read More',
    accent: 'from-emerald-500/20 to-teal-500/10',
    accentGradient: 'from-emerald-500 via-teal-400 to-cyan-400',
  },
]

export const experience = [
  {
    company: 'Endava',
    role: 'Software Engineer',
    period: '2025 — Present',
    summary:
      "Building Mastercard's payment processor service — the critical path that validates transactions and routes them to the acquirer. Designed for millions of daily transactions, zero tolerance for downtime.",
  },
  {
    company: 'Guidewire Software',
    role: 'Full-stack Software Engineer',
    period: '2021 — 2025',
    summary:
      "Built and maintained Guidewire's localized P&C insurance platform for Australia and New Zealand — regional compliance, GST implementation, and multiple POC cycles. Led a team of six through a full release.",
  },
  {
    company: 'Juris Technologies',
    role: 'Software Engineer',
    period: '2020 — 2021',
    summary:
      'Built loan management systems for banks and licensed lenders — core credit and collections infrastructure for financial institutions.',
  },
  {
    company: 'Universiti Sains Malaysia',
    role: 'B.Sc. Computer Science',
    period: '2016 — 2020',
    summary: 'Focus on software engineering, systems design and architecture.',
  },
]

export const skills = [
  { group: 'Languages',       items: ['Java', 'TypeScript', 'JavaScript', 'SQL'] },
  { group: 'Frontend',        items: ['React', 'Next.js', 'Tailwind', 'Vite'] },
  { group: 'Backend & Infra', items: ['Spring Boot', 'PostgreSQL', 'Kafka', 'Docker'] },
  { group: 'Craft',           items: ['System design', 'API design', 'Design systems', 'Mentoring'] },
  { group: 'A.I.',            items: ['Github Copilot', 'Claude Code', 'OpenAI Codex'] },
]

export const stats = {
  careerStartYear: 2020,
  projects: { value: '10+', label: 'projects across 3 industries' },
  scale:    { value: '1M+', label: 'users on production systems' },
}

export const navLinks = [
  { href: '#about',      label: 'About' },
  { href: '#work',       label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills',     label: 'Skills' },
  { href: '#contact',    label: 'Contact' },
  { href: '/blog',       label: 'Blog' },
]
```

---

## 2. `src/content.config.ts`

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    date:        z.coerce.date(),
    tags:        z.array(z.string()).default([]),
    draft:       z.boolean().default(false),
  }),
});

export const collections = { blog };
```

---

## 3. Blog posts — `src/content/blog/`

### `hello-world.mdx`

```mdx
---
title: "Hello, World"
description: "First post — a brief note on why I started writing."
date: 2026-04-24
tags: ["meta"]
draft: false
---

Every engineer eventually starts a blog. Here's mine.

I'll be writing about backend engineering, distributed systems, and the occasional lesson learned the hard way in production. No promises on cadence — just when I have something worth saying.

## What to expect

- Deep dives on topics I'm working through at the time
- Post-mortems and incident analyses (sanitised)
- Book and paper notes on systems design

Stay tuned.
```

---

## 4. Public assets — `public/`

Copy these files as-is into the new project's `public/` directory:

| File | Purpose |
|------|---------|
| `public/images/avatar.jpg` | Profile photo used in the About section |
| `public/favicon.svg` | Site favicon |
| `public/robots.txt` | Crawler rules |
| `public/sitemap.xml` | Update the domain if the URL changes |

---

## 5. Layout metadata (hardcoded — not in `content.js`)

These values live in `Layout.astro` and must be set manually in the new project's base layout.

| Field | Value |
|-------|-------|
| Default `<title>` | `Mohamed Erfan — Backend Engineer \| Fintech, Payments & Insurance Infrastructure` |
| `meta description` | `Mohamed Erfan is a backend engineer in Kuala Lumpur with 6+ years in fintech — building Mastercard's payment gateway and Guidewire's APAC insurance platform. Specialises in Java, Spring Boot, Kafka, and distributed systems at scale.` |
| `og:image` | `https://erfan.dev/og.png` |
| `og:image:alt` | `Mohamed Erfan — Backend Engineer portfolio` |
| `twitter:image:alt` | `Mohamed Erfan — Backend Engineer portfolio` |
| Canonical URL | `https://erfan.dev/` |
| JSON-LD `jobTitle` | `Software Engineer` |
| JSON-LD `email` | `mailto:erfansiraj97@gmail.com` |
| JSON-LD `addressLocality` | `Kuala Lumpur` |
| JSON-LD `addressCountry` | `MY` |
| JSON-LD `worksFor` | `Endava` |
| JSON-LD `alumniOf` | `Universiti Sains Malaysia` |
| JSON-LD `sameAs[0]` | `https://github.com/nafre/` |
| JSON-LD `sameAs[1]` | `https://www.linkedin.com/in/mohderfan/` |

---

## 6. New project setup checklist

```
npm create astro@latest
```

- [ ] Copy `src/data/content.js`
- [ ] Copy `src/content.config.ts`
- [ ] Copy `src/content/blog/hello-world.mdx`
- [ ] Copy `public/images/avatar.jpg`
- [ ] Copy `public/favicon.svg`
- [ ] Copy `public/robots.txt`
- [ ] Copy `public/sitemap.xml`
- [ ] Set layout metadata from section 5 above
- [ ] Update canonical URL and `sitemap.xml` if the domain changes
