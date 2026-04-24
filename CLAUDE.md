# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Astro 5 + React 18 + Tailwind CSS + Framer Motion. Portfolio site with file-based routing and an MDX blog via Astro Content Collections. Static sections are `.astro` components; interactive sections (Nav, Hero) are React islands hydrated with `client:load`.

## Commands

```bash
npm run dev       # start dev server (localhost:4321)
npm run build     # production build → dist/
npm run preview   # serve the dist/ build locally
npm run lint      # run ESLint on src/
```

## File Map

### Layouts & Pages

| File | Role |
|------|------|
| `src/layouts/Layout.astro` | Base layout: `<head>`, SEO meta, Open Graph, JSON-LD, FOUC script, fonts, NavIsland, Footer, scroll-reveal script |
| `src/layouts/BlogLayout.astro` | Blog post layout: extends Layout, adds back link, post header, prose wrapper |
| `src/pages/index.astro` | Portfolio home page; mounts all section components |
| `src/pages/blog/index.astro` | Blog listing page; reads all non-draft posts from Content Collection |
| `src/pages/blog/[slug].astro` | Individual blog post page; renders MDX via `render()` |

### Content & Data

| File | Role |
|------|------|
| `src/data/content.js` | **Single source of truth for all site content** — edit here first |
| `src/content.config.ts` | Astro Content Collection schema for blog posts (title, description, date, tags, draft) |
| `src/content/blog/` | Blog posts as `.mdx` files — drop a file here to publish |

### Components — Astro (static, zero JS)

| File | Role |
|------|------|
| `src/components/About.astro` | Bio + sidebar info card; reads `site.longBio` |
| `src/components/Projects.astro` | Project cards grid; maps `projects[]` |
| `src/components/Experience.astro` | Timeline; maps `experience[]` |
| `src/components/Skills.astro` | Skill group cards; maps `skills[]` |
| `src/components/Contact.astro` | Social link buttons (mailto + LinkedIn) |
| `src/components/Footer.astro` | Copyright + social links |

### Components — React islands (ship JS, hydrate on client)

| File | Role |
|------|------|
| `src/components/NavIsland.jsx` | Wraps `Nav` + `ThemeProvider`; used in Layout as `<NavIsland client:load />` |
| `src/components/Nav.jsx` | Fixed nav bar: scroll progress bar (Framer Motion spring), mobile menu with AnimatePresence |
| `src/components/Hero.jsx` | Landing fold: staggered entrance animations, animated orbs, stats |
| `src/components/ThemeToggle.jsx` | Dark/light toggle; animated icon swap via AnimatePresence |
| `src/components/Reveal.jsx` | Scroll-triggered fade-up wrapper (Framer Motion `whileInView`) — used only by Hero |

### Hooks & Styles

| File | Role |
|------|------|
| `src/hooks/useTheme.jsx` | ThemeContext provider + `useTheme()` hook; persists to localStorage; SSR-safe |
| `src/index.css` | Global styles + all reusable component classes (`@layer components`) + `[data-reveal]` animation rules |
| `tailwind.config.js` | Design tokens: colors, fonts, shadows, animations; `@tailwindcss/typography` plugin |

## Content Updates

**ALL visible text, links, and data live in `src/data/content.js`.** Go there for any content change.

### Common task recipes

- **Add a blog post** → create `src/content/blog/my-post.mdx` with the frontmatter shape below; it appears automatically in `/blog`
- **Add a project** → append an object to `projects[]` in `content.js`, copy the shape of an existing entry
- **Update email** → change `site.email` and `site.socials.email` in `content.js`, then also update the JSON-LD block in `src/layouts/Layout.astro` — these are not auto-synced
- **Change job / availability** → update `experience[]` and `site.availability` in `content.js`; update `worksFor` in the JSON-LD block in `Layout.astro`
- **Add a skill** → append to the relevant `items[]` in `skills[]`
- **Add a nav link** → append to `navLinks[]` in `content.js`; use a hash anchor (`#work`) for portfolio sections or a path (`/blog`) for pages
- **Change accent color** → update `tailwind.config.js` `colors.accent.*`, then grep for `#6366F1`, `#818CF8`, `#4F46E5`, and `rgba(99, 102, 241` in `index.css` and replace those raw values

### Blog post frontmatter

```mdx
---
title: "Post title"
description: "One sentence summary shown in the listing card."
date: 2026-04-24
tags: ["backend", "kafka"]
draft: false          # set true to hide from listing + disable static route
---

MDX content here...
```

## Scroll Animations

- **React sections** (Hero): use Framer Motion `whileInView` via `<Reveal>` wrapper
- **Astro sections** (all others): use `data-reveal` and `data-reveal-delay="<ms>"` HTML attributes; a single `IntersectionObserver` in `Layout.astro` adds the `.revealed` class when elements enter the viewport; CSS in `index.css` handles the transition

```html
<!-- basic fade-up -->
<h2 data-reveal>Heading</h2>

<!-- staggered with delay -->
<p data-reveal data-reveal-delay="100">Paragraph</p>
```

## CSS Class Vocabulary (`src/index.css`)

| Class | Description |
|-------|-------------|
| `.container-narrow` | Max-width 5xl centered section wrapper |
| `.container-wide` | Max-width 6xl centered section wrapper |
| `.section-eyebrow` | Gradient pill badge for section labels |
| `.heading-display` | Display font class for large headings |
| `.btn` | Base button (shared by all button variants) |
| `.btn-primary` | Indigo→violet gradient button with shimmer sweep |
| `.btn-outline` | Transparent button with gradient border |
| `.btn-ghost` | Text-only button |
| `.card` | White/dark card with gradient border and soft shadow |
| `.chip` | Accent-tinted tag pill (used for skill and project tags) |
| `.hairline` | 1px horizontal divider between sections |
| `.nav-link` | Nav anchor with animated gradient underline on hover |
| `.icon-link` | 40px circular social icon with gradient fill on hover |
| `.timeline` | Vertical timeline list container with gradient left border |
| `.accent-underline` | Animated shimmer gradient text (used in Hero headline) |
| `.grid-dotted` | Subtle dot-grid background pattern |
| `.orb-a/b/c` | Floating animated gradient orbs (Hero section) |
| `[data-reveal]` | Scroll-reveal base state (opacity 0, translateY 16px) |
| `[data-reveal].revealed` | Scroll-reveal visible state (opacity 1, no transform) |

## Design Tokens (`tailwind.config.js`)

- **Primary accent**: `colors.accent.DEFAULT` = `#6366F1` (Electric Indigo)
- **Dark accent**: `colors.accent.soft` = `#818CF8`; `colors.accent.deep` = `#4F46E5`
- **Neutrals**: `colors.ink.*` (ink-50 → ink-900)
- **Fonts**: `font-sans` = Inter, `font-display` = Bricolage Grotesque, `font-mono` = JetBrains Mono
- **Dark mode**: class-based (`darkMode: 'class'`); toggled by adding/removing `dark` on `<html>`
- **Typography**: `@tailwindcss/typography` — blog post content uses `prose dark:prose-invert`

## Known Intentional Choices

- **React islands are isolated** — `NavIsland.jsx` wraps `Nav` with `ThemeProvider` because Astro islands don't share React context. If you add another component that needs `useTheme`, it must either live inside `NavIsland` or get its own `ThemeProvider` wrapper.
- **Contact is static links only** — `Contact.astro` renders mailto and LinkedIn anchor tags; no form, no backend.
- **ESLint is configured** — `eslint src` runs via `npm run lint`; config is in `eslint.config.js`.
- **Social links may be bare root URLs** — `site.socials.github` / `site.socials.linkedin` in `content.js` may be placeholder root URLs if not yet filled in.
- **Per-project gradient strings** — `accent` and `accentGradient` fields on each project in `content.js` are intentional per-project Tailwind gradient classes, not global tokens.
- **JSON-LD in `Layout.astro` is static** — it is not read from `content.js` at build time. Must be updated manually when name, email, employer, or social links change.
- **FOUC prevention script uses `is:inline`** — this stops Astro from bundling/deferring it; it must run synchronously before first paint to set dark mode and colour palette CSS variables.
