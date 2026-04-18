import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { experience } from '../data/content.js'

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative py-24 sm:py-32"
    >
      <div className="container-narrow">
        <Reveal>
          <p className="section-eyebrow">Experience</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="experience-heading"
            className="mt-4 max-w-2xl font-display text-display-lg font-semibold tracking-tight text-balance"
          >
            Where I've built things.
          </h2>
        </Reveal>

        <ol className="timeline">
          {experience.map((item, i) => (
            <Reveal
              key={item.company + item.period}
              as="li"
              delay={i * 0.05}
              className="relative pl-8 pb-10 last:pb-0"
            >
              {/* Timeline dot with glow ring */}
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-1.5 inline-flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-accent dark:border-ink-900"
                style={{ boxShadow: '0 0 0 3px rgba(var(--color-accent-rgb), 0.2)' }}
                initial={{ scale: 0 }}
                whileInView={{ scale: [0, 1.3, 1] }}
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-base font-medium tracking-tight">
                  <span className="text-ink-900 dark:text-ink-50">{item.role}</span>
                  <span className="mx-2 text-ink-300 dark:text-ink-600">·</span>
                  <span className="text-ink-600 dark:text-ink-300">{item.company}</span>
                </h3>
                <span className="text-xs uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
                  {item.period}
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                {item.summary}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
