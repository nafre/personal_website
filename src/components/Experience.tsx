import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { experience } from '../data/content.js'
import { fadeUp, fadeLeft, stagger, dotReveal, lineReveal } from '../lib/motion'

export default function Experience() {
  const prefersReduced = useReducedMotion()

  const headingVariants = prefersReduced ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : fadeUp
  const containerVariants = prefersReduced ? { hidden: {}, show: {} } : stagger(0.12)
  const itemVariants = prefersReduced ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : fadeLeft
  const dotVariants = prefersReduced ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : dotReveal
  const lineVariants = prefersReduced ? { hidden: { scaleY: 1 }, show: { scaleY: 1 } } : lineReveal

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        id="experience"
        style={{
          padding: '6rem 1.5rem',
          backgroundColor: 'var(--color-bg-muted)',
        }}
      >
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <m.div
            variants={headingVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            style={{ marginBottom: '3rem' }}
          >
            <span className="section-label">Experience</span>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--color-text)',
              }}
            >
              Career timeline
            </h2>
          </m.div>

          {/* Wrapper holds the animated line + list as siblings */}
          <div style={{ position: 'relative', maxWidth: '48rem' }}>
            {/* Vertical line — draws in top→bottom */}
            <m.div
              aria-hidden="true"
              variants={lineVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              style={{
                position: 'absolute',
                left: '0.6875rem',
                top: '1.5rem',
                bottom: '1.5rem',
                width: '1px',
                backgroundColor: 'var(--color-border)',
                transformOrigin: 'top',
                pointerEvents: 'none',
              }}
            />

            <m.ol
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {experience.map((item, index) => (
                <m.li
                  key={`${item.company}-${index}`}
                  variants={itemVariants}
                  style={{
                    position: 'relative',
                    paddingLeft: '2.5rem',
                    paddingBottom: index < experience.length - 1 ? '2rem' : 0,
                  }}
                >
                  {/* Timeline dot — scales in via dotReveal variant */}
                  <m.span
                    aria-hidden="true"
                    variants={dotVariants}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '1.125rem',
                      width: '1.375rem',
                      height: '1.375rem',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-surface)',
                      border: '2px solid var(--color-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxSizing: 'border-box',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-accent)',
                        display: 'block',
                      }}
                    />
                  </m.span>

                  {/* Content card */}
                  <div
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-xl)',
                      padding: '1.25rem 1.5rem',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        flexWrap: 'wrap',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: 'var(--color-text)',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {item.company}
                        </p>
                        <p
                          style={{
                            fontSize: '0.8125rem',
                            color: 'var(--color-accent)',
                            fontWeight: 500,
                            marginTop: '0.125rem',
                          }}
                        >
                          {item.role}
                        </p>
                      </div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--color-subtle)',
                          fontWeight: 500,
                          backgroundColor: 'var(--color-bg-muted)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '999px',
                          padding: '0.2rem 0.625rem',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.period}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-muted)',
                        lineHeight: 1.7,
                      }}
                    >
                      {item.summary}
                    </p>
                  </div>
                </m.li>
              ))}
            </m.ol>
          </div>
        </div>
      </section>
    </LazyMotion>
  )
}
