import Reveal from './Reveal.jsx'
import { skills } from '../data/content.js'

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative py-24 sm:py-32">
      <div className="container-wide">
        <Reveal>
          <p className="section-eyebrow">Skills</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="skills-heading"
            className="mt-4 max-w-2xl font-display text-display-lg font-semibold tracking-tight text-balance"
          >
            Tools I reach for.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.06}>
              <div className="card h-full hover:-translate-y-1 hover:shadow-glow-accent dark:hover:shadow-glow-accent-dark">
                <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
                  {group.group}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-lg border border-ink-100 bg-ink-50/60 px-2.5 py-1 text-xs text-ink-800 transition-colors duration-200 hover:border-accent hover:text-accent dark:border-ink-700 dark:bg-ink-800/60 dark:text-ink-100 dark:hover:text-accent-soft"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
