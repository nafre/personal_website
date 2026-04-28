# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run preview   # Preview production build locally
npm run check     # Astro TypeScript/component type checking
```

No lint or test scripts exist.

## Architecture

**Stack:** Astro 6 (SSG) + React islands + Tailwind CSS v4 + Framer Motion + TypeScript

**Routing:**
- `/` — `src/pages/index.astro` (single-page portfolio)
- `/blog` — blog listing
- `/blog/[...slug]` — MDX posts from `src/content/blog/`

**Component hydration strategy** (in `src/pages/index.astro`):
- `client:load` — `Nav`, `Hero` (need immediate interactivity)
- `client:visible` — `About`, `Projects`, `Experience`, `Contact` (animate on scroll)
- `client:only="react"` — `Skills`, `CodeSymbols` (client-only rendering; no SSR)

**Content:** All portfolio text, projects, experience, skills, and nav links live in `src/data/content.js` — the single source of truth. Edit this file to change any site content.

**Animation:** Reusable Framer Motion variants are centralized in `src/lib/motion.ts`. Import from there rather than defining inline variants. All animated components use `LazyMotion` with `domAnimation` and respect `prefers-reduced-motion` via `useReducedMotion()`.

**Design tokens:** Defined as CSS custom properties in `src/styles/global.css` (`--color-bg`, `--color-accent`, `--radius-sm`, `--shadow-md`, etc.). Dark mode uses the `.dark` class on `<html>` and a parallel set of token overrides. Use these tokens rather than hardcoded values.

**Dark mode:** Initialized by an inline `<script>` in `src/layouts/Layout.astro` that runs before paint (reads `localStorage` + `prefers-color-scheme`). `Nav.tsx` syncs React state from the DOM after hydration to avoid hydration mismatch — this pattern must be preserved for any component that reads theme state.

**Icons:** Use Iconify IDs (`'mdi:*'` or `'simple-icons:*'`) and the `@iconify/react` `Icon` component. Icon data is stored in `src/data/content.js` alongside each skill item.

**SEO + JSON-LD:** Managed entirely in `src/layouts/Layout.astro`. Blog posts use `src/layouts/BlogLayout.astro`.
