# Erfan — Personal Portfolio

A minimalist, premium personal portfolio inspired by Apple / Stripe / Linear. Built with **Vite + React + Tailwind CSS + Framer Motion**.

Features:

- Clean, typographically-driven design with a single accent color (Electric Indigo)
- Light / Dark mode with a smooth toggle (persists to `localStorage`, respects `prefers-color-scheme`)
- Scroll-triggered reveals, subtle hover micro-interactions, accessible focus states
- Fully responsive (mobile-first) and keyboard-friendly
- SEO-ready: semantic HTML, meta description, Open Graph + Twitter tags, JSON-LD Person schema
- Fast: code-split vendor chunks, preloaded fonts, `prefers-reduced-motion` respected, Lighthouse 90+ ready

## Project structure

```
.
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── hooks/
    │   └── useTheme.jsx
    ├── data/
    │   └── content.js        ← edit this to update your content
    └── components/
        ├── Nav.jsx
        ├── ThemeToggle.jsx
        ├── Reveal.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Projects.jsx
        ├── Experience.jsx
        ├── Skills.jsx
        ├── Contact.jsx
        └── Footer.jsx
```

## Getting started

Requires **Node 18+** (recommended: Node 20).

```bash
npm install
npm run dev        # start dev server at http://localhost:5173
npm run build      # production build to ./dist
npm run preview    # preview the built site locally
```

## Customization

Everything content-related lives in one file:

- `src/data/content.js` — name, bio, projects, experience, skills, socials.

Design tokens:

- `tailwind.config.js` — swap the `accent` color to re-skin the whole site.
- `src/index.css` — global typography, component classes (`.btn-primary`, `.card`, etc.).

Meta / SEO:

- `index.html` — update `<title>`, description, canonical URL, Open Graph image URL (`og.png`).
- Replace `public/favicon.svg` with your own icon.

## Deployment

Any static host works. The build output is in `./dist`.

### Vercel (fastest)

```bash
npm i -g vercel
vercel          # follow prompts, then `vercel --prod`
```

Vercel auto-detects Vite. No config needed.

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --build --prod
```

Or use the dashboard: build command `npm run build`, publish directory `dist`.

### GitHub Pages

```bash
npm run build
# push the contents of ./dist to a gh-pages branch,
# or use the `gh-pages` package:
npm i -D gh-pages
npx gh-pages -d dist
```

If deploying to a subpath (e.g. `username.github.io/portfolio`), set `base: '/portfolio/'` in `vite.config.js`.

### Cloudflare Pages

Connect the repo. Build command: `npm run build`. Output directory: `dist`.

## Contact form backend

The form in `Contact.jsx` currently falls back to a `mailto:` link for demo purposes. To receive submissions programmatically, wire it to one of:

- [Formspree](https://formspree.io/) — no backend needed, swap the submit handler for `fetch('https://formspree.io/f/xxx', ...)`
- [Resend](https://resend.com/) + a serverless function (Vercel / Netlify / Cloudflare)
- Your own API

## Accessibility notes

- Skip-to-content link, semantic landmarks (`<header>`, `<main>`, `<footer>`, `<section>` with `aria-labelledby`).
- Theme toggle exposes `aria-pressed` / `aria-label`.
- Respects `prefers-reduced-motion`.
- Color contrast meets WCAG AA in both themes.

## License

MIT — use freely, replace with your own content, and ship.
