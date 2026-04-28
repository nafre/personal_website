import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { site } from '../data/content.js'
import { fadeUp, fadeLeft, stagger } from '../lib/motion'

const MapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const BriefcaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="16"/>
    <line x1="10" y1="14" x2="14" y2="14"/>
  </svg>
)

const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/>
    <circle cx="7.5" cy="7.5" r="1.5"/>
  </svg>
)

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

export default function About() {
  const prefersReduced = useReducedMotion()

  const sectionVariants = prefersReduced ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : fadeUp
  const containerVariants = prefersReduced ? { hidden: {}, show: {} } : stagger(0.1)
  const itemVariants = prefersReduced ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : fadeLeft

  const sidebarItems = [
    { icon: <BriefcaseIcon />, label: 'Role', value: site.role },
    { icon: <MapIcon />, label: 'Location', value: site.location },
    { icon: <TagIcon />, label: 'Focus', value: site.focus },
    { icon: <EmailIcon />, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  ]

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        id="about"
        style={{
          padding: '6rem 1.5rem',
          backgroundColor: 'var(--color-bg-muted)',
        }}
      >
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <m.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            style={{ marginBottom: '3rem' }}
          >
            <span className="section-label">About</span>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2rem)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--color-text)',
              }}
            >
              Background
            </h2>
          </m.div>

          <div
            style={{
              display: 'grid',
              gap: '3rem',
            }}
            className="md:grid-cols-[1fr_280px]"
          >
            {/* Bio */}
            <m.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              {site.photo && (
                <m.div variants={itemVariants} style={{ marginBottom: '0.5rem' }}>
                  <img
                    src={site.photo}
                    alt={site.name}
                    width={80}
                    height={80}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '5rem',
                      height: '5rem',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--color-border)',
                    }}
                  />
                </m.div>
              )}
              {site.longBio.map((paragraph, i) => (
                <m.p
                  key={i}
                  variants={itemVariants}
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: 'var(--color-muted)',
                  }}
                >
                  {paragraph}
                </m.p>
              ))}
            </m.div>

            {/* Sidebar */}
            <m.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                {sidebarItems.map(({ icon, label, value, href }) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--color-accent)',
                        marginTop: '0.125rem',
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </span>
                    <div>
                      <p
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: 'var(--color-subtle)',
                          marginBottom: '0.125rem',
                        }}
                      >
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          style={{
                            fontSize: '0.875rem',
                            color: 'var(--color-accent)',
                            textDecoration: 'none',
                            fontWeight: 500,
                          }}
                        >
                          {value}
                        </a>
                      ) : (
                        <p
                          style={{
                            fontSize: '0.875rem',
                            color: 'var(--color-text)',
                            fontWeight: 500,
                          }}
                        >
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  )
}
