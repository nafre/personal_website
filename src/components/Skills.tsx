import { Icon } from '@iconify/react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { skills } from '../data/content.js'
import { fadeUp, fadeScale, stagger, getReducedVariants } from '../lib/motion'

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

export default function Skills() {
  const prefersReduced = useReducedMotion()

  const headingVariants = getReducedVariants(fadeUp, !!prefersReduced)
  const cardVariants = getReducedVariants(fadeScale, !!prefersReduced)

  return (
    <LazyMotion features={domAnimation} strict>
      <section id="skills" style={{ padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

          {/* Section heading */}
          <m.div
            variants={headingVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            style={{ marginBottom: '3rem' }}
          >
            <span className="section-label">Skills</span>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2rem)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--color-text)',
              }}
            >
              Tools &amp; technologies
            </h2>
          </m.div>

          {/* Category groups */}
          {skills.map((group) => (
            <div key={group.group} style={{ marginBottom: '2.5rem' }}>
              <p
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-muted)',
                  marginBottom: '0.875rem',
                }}
              >
                {group.group}
              </p>

              <m.div
                variants={stagger(0.05)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}
              >
                {group.items.map((item) => {
                  const rgb = hexToRgb(item.color)
                  return (
                    <m.div
                      key={item.name}
                      variants={cardVariants}
                      whileHover={prefersReduced ? {} : { y: -3 }}
                      transition={{ duration: 0.18 }}
                      className="skill-tech-card"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        minWidth: '9rem',
                      }}
                    >
                      <div
                        style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: `rgba(${rgb}, 0.12)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon
                          icon={item.icon}
                          style={{ color: item.color, fontSize: '1.375rem' }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: '0.9375rem',
                          fontWeight: 500,
                          color: 'var(--color-text)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.name}
                      </span>
                    </m.div>
                  )
                })}
              </m.div>
            </div>
          ))}
        </div>
      </section>
    </LazyMotion>
  )
}
