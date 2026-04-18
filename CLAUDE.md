# CLAUDE.md — Portfolio Project Guide

React 18 + Vite + Tailwind CSS + Framer Motion. Single-page portfolio, no client-side routing — hash anchors only (`#work`, `#about`, etc.).

## File Map

| File | Role |
|------|------|
| `src/data/content.js` | **Single source of truth for all site content** — edit here first |
| `src/App.jsx` | Root layout; sets section order |
| `src/components/index.js` | Barrel export for all components |
| `src/components/Nav.jsx` | Fixed nav bar with scroll progress bar and mobile menu |
| `src/components/Hero.jsx` | Landing fold: headline, stats, availability badge, animated orbs |
| `src/components/About.jsx` | Bio + sidebar info card; reads `site.longBio` (array of paragraphs) |
| `src/components/Projects.jsx` | Project cards grid; maps `projects[]` |
| `src/components/Experience.jsx` | Animated timeline; maps `experience[]` |
| `src/components/Skills.jsx` | Skill group cards; maps `skills[]` |
| `src/components/Contact.jsx` | Contact form (mailto: fallback) + social links |
| `src/components/Footer.jsx` | Copyright + social links |
| `src/components/Reveal.jsx` | Reusable scroll-triggered fade-up wrapper (Framer Motion) |
| `src/components/ThemeToggle.jsx` | Dark/light mode toggle button |
| `src/hooks/useTheme.jsx` | ThemeContext provider + `useTheme()` hook; persists to localStorage |
| `src/index.css` | Global styles + all reusable component classes (`@layer components`) |
| `tailwind.config.js` | Design tokens: colors, fonts, shadows, animations |
| `index.html` | SEO meta, Open Graph, JSON-LD Person schema, FOUC prevention script |

## Content Updates

**ALL visible text, links, and data live in `src/data/content.js`.** Go there for any content change. The components read from it — don't edit components for content.

### Common task recipes

- **Add a project** → append an object to `projects[]` in `content.js`, copy the shape of an existing entry
- **Update email** → change `site.email` and `site.socials.email` in `content.js`, then also update the JSON-LD block in `index.html` (email field and sameAs URLs) — these are not auto-synced
- **Change job / availability** → update `experience[]` and `site.availability` in `content.js`; update `worksFor` in `index.html` JSON-LD
- **Add a skill** → append to the relevant `items[]` in `skills[]`
- **Add a nav link** → append to `navLinks[]` in `content.js`
- **Change accent color** → update `tailwind.config.js` `colors.accent.*`, then grep for `#6366F1`, `#818CF8`, `#4F46E5`, and `rgba(99, 102, 241` in `index.css` and replace those raw values

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
| `.form-input` | Styled text input with accent focus glow |
| `.icon-link` | 40px circular social icon with gradient fill on hover |
| `.timeline` | Vertical timeline list container with gradient left border |
| `.accent-underline` | Animated shimmer gradient text (used in Hero headline) |
| `.grid-dotted` | Subtle dot-grid background pattern |
| `.orb-a/b/c` | Floating animated gradient orbs (Hero section) |

## Design Tokens (`tailwind.config.js`)

- **Primary accent**: `colors.accent.DEFAULT` = `#6366F1` (Electric Indigo)
- **Dark accent**: `colors.accent.soft` = `#818CF8`; `colors.accent.deep` = `#4F46E5`
- **Neutrals**: `colors.ink.*` (ink-50 → ink-950)
- **Fonts**: `font-sans` = Inter, `font-display` = Bricolage Grotesque, `font-mono` = JetBrains Mono
- **Dark mode**: class-based (`darkMode: 'class'`); toggled by adding/removing `dark` on `<html>`

## Known Intentional Choices

- **Contact form uses `mailto:` fallback** — no backend; form `onSubmit` fires `window.location.href = mailto:...`. This is intentional.
- **`"lint": "echo lint"` stub** — ESLint is not configured. Run `npm run lint` will echo a message, not lint.
- **Social links may be bare root URLs** — `site.socials.github` / `site.socials.linkedin` in `content.js` may be placeholder root URLs if not yet filled in.
- **Per-project gradient strings** — `accent` and `accentGradient` fields on each project in `content.js` are intentional per-project Tailwind gradient classes, not global tokens.
- **JSON-LD in `index.html` is static** — it is not read from `content.js` at build time. Must be updated manually when name, email, employer, or social links change.
