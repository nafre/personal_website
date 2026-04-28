import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { projects } from '../data/content.js'
import { fadeUp, fadeScale, stagger, cardHover } from '../lib/motion'

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6"/>
    <path d="M10 14 21 3"/>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
  </svg>
)

export default function Projects() {
  const prefersReduced = useReducedMotion()

  const headingVariants = prefersReduced ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : fadeUp
  const containerVariants = prefersReduced ? { hidden: {}, show: {} } : stagger(0.1)
  const cardVariants = prefersReduced ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : fadeScale

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        id="work"
        style={{ padding: '6rem 1.5rem' }}
      >
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <m.div
            variants={headingVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            style={{ marginBottom: '3rem' }}
          >
            <span className="section-label">Work</span>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2rem)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--color-text)',
              }}
            >
              Selected projects
            </h2>
          </m.div>

          <m.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 28rem), 1fr))',
              gap: '1.5rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {projects.map((project) => (
              <m.li
                key={project.title}
                variants={cardVariants}
              >
                <m.article
                  whileHover={prefersReduced ? {} : cardHover}
                  className="card-shine project-card"
                  style={{
                    height: '100%',
                    borderRadius: 'var(--radius-xl)',
                    backgroundColor: 'var(--color-surface)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'default',
                  }}
                >
                  {/* Top gradient stripe */}
                  <div
                    className={`bg-gradient-to-r ${project.accentGradient}`}
                    style={{ height: '4px', flexShrink: 0 }}
                  />

                  {/* Card body */}
                  <div
                    style={{
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      flexGrow: 1,
                    }}
                  >
                    {/* Header row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <div>
                        <h3
                          style={{
                            fontSize: '1.0625rem',
                            fontWeight: 600,
                            letterSpacing: '-0.01em',
                            color: 'var(--color-text)',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {project.title}
                        </h3>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--color-accent)', fontWeight: 500 }}>
                          {project.tagline}
                        </p>
                      </div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--color-subtle)',
                          fontWeight: 500,
                          flexShrink: 0,
                          marginTop: '0.125rem',
                        }}
                      >
                        {project.year}
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-muted)',
                        lineHeight: 1.7,
                        flexGrow: 1,
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                      {project.tags.map((tag) => (
                        <span key={tag} className="chip">{tag}</span>
                      ))}
                    </div>

                    {/* CTA */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: 'var(--color-accent)',
                        textDecoration: 'none',
                        marginTop: '0.25rem',
                        transition: 'gap 0.2s ease',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = '0.5rem' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = '0.375rem' }}
                    >
                      {project.linkText}
                      <ExternalLinkIcon />
                    </a>
                  </div>
                </m.article>
              </m.li>
            ))}
          </m.ul>
        </div>
      </section>
    </LazyMotion>
  )
}
