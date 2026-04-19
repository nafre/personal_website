import { useState } from 'react'
import Reveal from './Reveal.jsx'
import { site, experience } from '../data/content.js'

export default function About() {
  const [imgLoaded, setImgLoaded] = useState(false)
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-24 sm:py-32"
    >
      <div className="container-narrow">
        <Reveal>
          <p className="section-eyebrow">About</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="about-heading"
            className="mt-4 max-w-2xl font-display text-display-lg font-semibold tracking-tight text-balance"
          >
            How I work, and what I care about.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 md:grid-cols-5">
          <Reveal delay={0.1} x={-20} className="md:col-span-3 space-y-5 text-ink-600 dark:text-ink-300">
            {site.longBio.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-pretty">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.2} x={20} className="md:col-span-2">
            {site.photo && (
              <div className="mb-6 flex justify-center md:justify-start">
                <div className="relative h-36 w-36">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-violet-500 p-0.5">
                    <div className="h-full w-full rounded-full bg-white dark:bg-ink-900" />
                  </div>
                  {!imgLoaded && (
                    <div className="absolute inset-0.5 rounded-full bg-ink-200 dark:bg-ink-700 animate-pulse" />
                  )}
                  <img
                    src={site.photo}
                    alt={site.name}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setImgLoaded(true)}
                    className={`absolute inset-0.5 h-[calc(100%-4px)] w-[calc(100%-4px)] rounded-full object-cover object-top transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                </div>
              </div>
            )}
            <dl className="card space-y-4 bg-white/60 backdrop-blur-sm dark:bg-ink-800/40">
              {[
                { k: 'Based in', v: site.location },
                { k: 'Focus', v: site.focus },
                { k: 'Currently', v: experience[0].role + ' at ' + experience[0].company },
                { k: 'Email', v: site.email, href: site.socials.email },
              ].map((row) => (
                <div
                  key={row.k}
                  className="flex items-baseline justify-between gap-4 border-b border-ink-100 pb-4 last:border-b-0 last:pb-0 dark:border-ink-800"
                >
                  <dt className="text-xs uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
                    {row.k}
                  </dt>
                  <dd className="text-right text-sm text-ink-900 dark:text-ink-100">
                    {row.href ? (
                      <a className="link-subtle text-ink-900 dark:text-ink-100" href={row.href}>
                        {row.v}
                      </a>
                    ) : (
                      row.v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
