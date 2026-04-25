import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { site } from '../data/content.js'
import { fadeUp, stagger, iconHover } from '../lib/motion'

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

export default function Contact() {
  const prefersReduced = useReducedMotion()

  const containerVariants = prefersReduced ? { hidden: {}, show: {} } : stagger(0.1)
  const itemVariants = prefersReduced ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : fadeUp

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        id="contact"
        style={{
          padding: '6rem 1.5rem',
          backgroundColor: 'var(--color-bg-muted)',
        }}
      >
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            style={{
              maxWidth: '40rem',
              margin: '0 auto',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
            }}
          >
            <m.span variants={itemVariants} className="section-label">
              Contact
            </m.span>

            <m.h2
              variants={itemVariants}
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--color-text)',
                lineHeight: 1.2,
              }}
            >
              Let&apos;s work together.
            </m.h2>

            <m.p
              variants={itemVariants}
              style={{
                fontSize: '1rem',
                color: 'var(--color-muted)',
                lineHeight: 1.75,
                maxWidth: '32rem',
              }}
            >
              I&apos;m open to backend, fintech, and payments opportunities. If you&apos;re building
              something where reliability matters, let&apos;s talk.
            </m.p>

            <m.a
              variants={itemVariants}
              href={site.socials.email}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: 'var(--color-bg)',
                backgroundColor: 'var(--color-accent)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1.75rem',
                textDecoration: 'none',
                marginTop: '0.5rem',
                transition: 'opacity 0.2s',
              }}
              whileHover={prefersReduced ? {} : { scale: 1.03 }}
              whileTap={prefersReduced ? {} : { scale: 0.98 }}
            >
              <EmailIcon />
              {site.email}
            </m.a>

            <m.div
              variants={itemVariants}
              style={{
                display: 'flex',
                gap: '0.75rem',
                marginTop: '0.25rem',
              }}
            >
              {[
                { href: site.socials.github, label: 'GitHub', icon: <GitHubIcon /> },
                { href: site.socials.linkedin, label: 'LinkedIn', icon: <LinkedInIcon /> },
              ].map(({ href, label, icon }) => (
                <m.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={prefersReduced ? {} : iconHover}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'var(--color-accent)'
                    el.style.borderColor = 'var(--color-accent)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'var(--color-muted)'
                    el.style.borderColor = 'var(--color-border)'
                  }}
                >
                  {icon}
                </m.a>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
