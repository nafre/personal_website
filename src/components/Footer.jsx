import { site } from '../data/content.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-ink-100 py-10 dark:border-ink-800">
      {/* Gradient top rule */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-200/80 to-transparent dark:via-ink-700/60"
      />
      <div className="container-wide flex flex-col items-center justify-between gap-4 text-sm text-ink-500 dark:text-ink-400 sm:flex-row">
        <p>
          © {year} {site.name}. Built with care.
        </p>
        <div className="flex items-center gap-5">
          <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="link-subtle">
            GitHub
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-subtle"
          >
            LinkedIn
          </a>
          <a href={site.socials.email} className="link-subtle">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
