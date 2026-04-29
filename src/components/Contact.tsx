import { useState, useRef } from 'react'
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion } from 'framer-motion'
import { site, contact } from '../data/content.js'
import { fadeUp, stagger } from '../lib/motion'

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

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '0.75rem 1rem',
  fontSize: '0.9375rem',
  color: 'var(--color-text)',
  backgroundColor: 'var(--color-surface)',
  border: `1px solid ${hasError ? 'var(--color-error)' : 'var(--color-border)'}`,
  borderRadius: 'var(--radius-md)',
  outline: 'none',
  transition: 'border-color 0.2s',
  fontFamily: 'inherit',
})

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: 'var(--color-text)',
  marginBottom: '0.375rem',
}

const fieldErrorStyle: React.CSSProperties = {
  fontSize: '0.8125rem',
  color: 'var(--color-error)',
  marginTop: '0.25rem',
}

export default function Contact() {
  const prefersReduced = useReducedMotion()

  const containerVariants = prefersReduced ? { hidden: {}, show: {} } : stagger(0.1)
  const itemVariants = prefersReduced ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : fadeUp

  const [formState, setFormState] = useState<FormState>('idle')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [serverError, setServerError] = useState('')

  const nameRef    = useRef<HTMLInputElement>(null)
  const emailRef   = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const honeypotRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    setFieldErrors({})
    setServerError('')
    setFormState('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    nameRef.current?.value ?? '',
          email:   emailRef.current?.value ?? '',
          message: messageRef.current?.value ?? '',
          website: honeypotRef.current?.value ?? '',
        }),
      })

      if (res.status === 201) {
        setFormState('success')
        if (nameRef.current)    nameRef.current.value = ''
        if (emailRef.current)   emailRef.current.value = ''
        if (messageRef.current) messageRef.current.value = ''
        return
      }

      if (res.status === 422) {
        const data = await res.json()
        setFieldErrors(data.errors ?? {})
        setFormState('idle')
        return
      }

      if (res.status === 429) {
        setServerError(contact.errors.rateLimit)
        setFormState('error')
        return
      }

      setServerError(contact.errors.generic)
      setFormState('error')
    } catch {
      setServerError(contact.errors.network)
      setFormState('error')
    }
  }

  const isSubmitting = formState === 'submitting'

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
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center' }}>
              <m.span variants={itemVariants} className="section-label">
                Contact
              </m.span>

              <m.h2
                variants={itemVariants}
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text)',
                  lineHeight: 1.2,
                  marginTop: '0.25rem',
                }}
              >
                {contact.heading}
              </m.h2>

              <m.p
                variants={itemVariants}
                style={{
                  fontSize: '1rem',
                  color: 'var(--color-muted)',
                  lineHeight: 1.75,
                  marginTop: '0.75rem',
                }}
              >
                {contact.tagline}
              </m.p>
            </div>

            {/* Form */}
            <m.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              noValidate
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginTop: '0.5rem',
              }}
            >
              {/* Honeypot — invisible to humans, filled by bots */}
              <input
                ref={honeypotRef}
                type="text"
                name="website"
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  opacity: 0,
                  pointerEvents: 'none',
                }}
              />

              {/* Name */}
              <div>
                <label htmlFor="contact-name" style={labelStyle}>Name</label>
                <input
                  ref={nameRef}
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  maxLength={100}
                  required
                  disabled={isSubmitting}
                  aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                  aria-invalid={!!fieldErrors.name}
                  style={inputStyle(!!fieldErrors.name)}
                />
                {fieldErrors.name && (
                  <span id="contact-name-error" role="alert" style={fieldErrorStyle}>
                    {fieldErrors.name[0]}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" style={labelStyle}>Email</label>
                <input
                  ref={emailRef}
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  disabled={isSubmitting}
                  aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                  aria-invalid={!!fieldErrors.email}
                  style={inputStyle(!!fieldErrors.email)}
                />
                {fieldErrors.email && (
                  <span id="contact-email-error" role="alert" style={fieldErrorStyle}>
                    {fieldErrors.email[0]}
                  </span>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" style={labelStyle}>Message</label>
                <textarea
                  ref={messageRef}
                  id="contact-message"
                  name="message"
                  rows={5}
                  maxLength={5000}
                  required
                  disabled={isSubmitting}
                  aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                  aria-invalid={!!fieldErrors.message}
                  style={{
                    ...inputStyle(!!fieldErrors.message),
                    resize: 'vertical',
                    minHeight: '7.5rem',
                  }}
                />
                {fieldErrors.message && (
                  <span id="contact-message-error" role="alert" style={fieldErrorStyle}>
                    {fieldErrors.message[0]}
                  </span>
                )}
              </div>

              {/* Server-level error with email fallback */}
              <AnimatePresence>
                {formState === 'error' && serverError && (
                  <m.p
                    key="server-error"
                    variants={itemVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    role="alert"
                    aria-live="polite"
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-error)',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-error)',
                      backgroundColor: 'color-mix(in srgb, var(--color-error) 8%, transparent)',
                    }}
                  >
                    {serverError}{' '}
                    <a
                      href={site.socials.email}
                      style={{
                        color: 'inherit',
                        fontWeight: 600,
                        textUnderlineOffset: '3px',
                      }}
                    >
                      Email me at {site.email} instead.
                    </a>
                  </m.p>
                )}
              </AnimatePresence>

              {/* Submit button + email fallback */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <m.button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  whileHover={prefersReduced || isSubmitting ? {} : { scale: 1.03 }}
                  whileTap={prefersReduced || isSubmitting ? {} : { scale: 0.98 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: 'var(--color-bg)',
                    backgroundColor: 'var(--color-accent)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 1.75rem',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.65 : 1,
                    transition: 'opacity 0.2s',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        style={{ animation: 'spin 0.8s linear infinite' }}
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      {contact.buttons.sending}
                    </>
                  ) : (
                    contact.buttons.submit
                  )}
                </m.button>

                <a
                  href={site.socials.email}
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
                >
                  {contact.fallback}
                </a>
              </div>
            </m.form>

            {/* Success state */}
            <AnimatePresence>
              {formState === 'success' && (
                <m.div
                  key="success"
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  role="status"
                  aria-live="polite"
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--color-success)',
                    padding: '0.875rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-success)',
                    backgroundColor: 'color-mix(in srgb, var(--color-success) 8%, transparent)',
                    fontWeight: 500,
                  }}
                >
                  {contact.success}
                </m.div>
              )}
            </AnimatePresence>

            {/* Social links */}
            <m.div
              variants={itemVariants}
              style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'center',
                marginTop: '0.25rem',
              }}
            >
              {[
                { href: site.socials.github,   label: 'GitHub',   icon: <GitHubIcon /> },
                { href: site.socials.linkedin,  label: 'LinkedIn', icon: <LinkedInIcon /> },
              ].map(({ href, label, icon }) => (
                <m.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
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

      {/* Spinner keyframe — scoped to this component's mount point */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </LazyMotion>
  )
}
