import { memo } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { projects } from '../data/content.js'

export default function Projects() {
  return (
    <section id="work" aria-labelledby="work-heading" className="relative py-24 sm:py-32">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="section-eyebrow">Selected work</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="work-heading"
                className="mt-4 max-w-2xl font-display text-display-lg font-semibold tracking-tight text-balance"
              >
                Projects I've put real care into.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <a href="#contact" className="link-subtle text-sm">
              Want to see more? Ask me →
            </a>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProjectCard project={p} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const ProjectCard = memo(function ProjectCard({ project }) {
  return (
    <a
      href={project.link}
      target="_blank"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 ease-smooth hover:-translate-y-1.5 hover:shadow-glow-accent dark:bg-ink-800/60 dark:shadow-soft-dark dark:hover:shadow-glow-accent-dark"
      aria-label={`${project.title} — ${project.tagline}`}
    >
      {/* Gradient card border via ::before (from .card pattern but inlined for flex layout) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
        style={{
          padding: '1px',
          background: 'linear-gradient(145deg, rgba(99,102,241,0.14), rgba(17,17,17,0.05) 40%, rgba(139,92,246,0.09))',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Colored gradient header band — 6px signature stripe */}
      <div
        aria-hidden="true"
        className={`h-1.5 w-full flex-shrink-0 bg-gradient-to-r ${project.accentGradient}`}
      />

      {/* Card body */}
      <div className="relative flex h-full flex-col p-6">
        {/* Accent wash — subtle top-right glow */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${project.accent} opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-90`}
        />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
              <span className="text-xs text-ink-500 dark:text-ink-400">{project.year}</span>
            </div>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{project.tagline}</p>
          </div>
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white dark:border-ink-700 dark:text-ink-300"
          >
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>

        <p className="relative mt-5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {project.description}
        </p>

        <ul className="relative mt-6 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>

        <span className="relative mt-6 inline-flex items-center gap-1 text-sm font-medium text-ink-900 dark:text-ink-100">
          <span className="relative">
            {project.linkText}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100"
            />
          </span>
        </span>
      </div>
    </a>
  )
})
