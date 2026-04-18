import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, Check, Send } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { site } from '../data/content.js'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function update(k) {
    return (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    // Demo UX only — wire to your own backend / Formspree / Resend later.
    setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'someone'}`)
      const body = encodeURIComponent(
        `${form.message}\n\n— ${form.name || ''}${form.email ? ` (${form.email})` : ''}`,
      )
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
      setStatus('sent')
    }, 500)
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative py-24 sm:py-32">
      <div className="container-narrow">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Reveal>
              <p className="section-eyebrow">Contact</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="contact-heading"
                className="mt-4 font-display text-display-lg font-semibold tracking-tight text-balance"
              >
                Let's work together.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-ink-600 dark:text-ink-300">
                I read every message. Whether it's a contract, a role, or just to say hello — drop
                me a line.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-3">
              <a href={site.socials.email} aria-label="Email" className="icon-link">
                <Mail size={16} />
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="icon-link"
              >
                <Github size={16} />
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="icon-link"
              >
                <Linkedin size={16} />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="md:col-span-3">
            <form
              onSubmit={onSubmit}
              className="relative overflow-hidden rounded-2xl border border-ink-100/80 bg-white shadow-soft dark:border-ink-800 dark:bg-ink-800/60 dark:shadow-soft-dark"
            >
              {/* Inner top light — simulates elevation */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
              />
              <div className="p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id="name"
                    label="Name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={update('name')}
                  />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-[0.16em] text-ink-500 dark:text-ink-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    className="form-input resize-y"
                    placeholder="Tell me what you're working on…"
                  />
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <p className="text-xs text-ink-500 dark:text-ink-400">
                    Or just email{' '}
                    <a className="link-subtle" href={site.socials.email}>
                      {site.email}
                    </a>
                  </p>
                  <button type="submit" className="btn-primary" disabled={status === 'sending'}>
                    <AnimatePresence mode="wait" initial={false}>
                      {status === 'sent' ? (
                        <motion.span
                          key="sent"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="inline-flex items-center gap-2"
                        >
                          <Check size={16} /> Sent
                        </motion.span>
                      ) : (
                        <motion.span
                          key="send"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="inline-flex items-center gap-2"
                        >
                          Send message
                          <Send size={14} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({ id, label, type, value, onChange, required, autoComplete }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium uppercase tracking-[0.16em] text-ink-500 dark:text-ink-400"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className="form-input"
      />
    </div>
  )
}
