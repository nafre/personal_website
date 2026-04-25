import { useState, useEffect } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { site, stats, navLinks } from '../data/content.js'
import { heroStagger, fadeUp, stagger } from '../lib/motion'

/* ─── Icons ─────────────────────────────────────────────────── */
const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
)

/* ─── Count-up hook ──────────────────────────────────────────── */
function useCountUp(target: number, duration = 900, trigger = true, skip = false) {
  const [count, setCount] = useState(skip ? target : 0)
  useEffect(() => {
    if (skip || !trigger) { setCount(target); return }
    const startTime = performance.now()
    let rafId: number
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [target, duration, trigger, skip])
  return count
}

/* ─── Typewriter hook ────────────────────────────────────────── */
function useTypewriter(words: string[], speed = 75, pause = 2200, skip = false) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(skip ? words[0].length : 0)
  const [deleting, setDeleting] = useState(false)
  const [cursorOn, setCursorOn] = useState(true)

  useEffect(() => {
    if (skip) return
    const t = setInterval(() => setCursorOn(c => !c), 530)
    return () => clearInterval(t)
  }, [skip])

  useEffect(() => {
    if (skip) return
    const current = words[index]
    if (!deleting && subIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (deleting && subIndex === 0) {
      setDeleting(false)
      setIndex(i => (i + 1) % words.length)
      return
    }
    const t = setTimeout(
      () => setSubIndex(s => s + (deleting ? -1 : 1)),
      deleting ? speed / 2 : speed
    )
    return () => clearTimeout(t)
  }, [subIndex, deleting, index, words, speed, pause, skip])

  return { text: words[index].slice(0, subIndex), cursorOn }
}

/* ─── Syntax-highlight helpers for terminal card ────────────── */
const C = {
  kw:   'var(--color-accent)',
  str:  'var(--color-success)',
  bool: 'var(--color-accent-2)',
  muted: 'var(--color-muted)',
  text: 'var(--color-text)',
}

function CodeLine({ comment, keyword, name, op }: {
  comment?: string; keyword?: string; name?: string; op?: string
}) {
  return (
    <div>
      {comment  && <span style={{ color: C.muted }}>{comment}</span>}
      {keyword  && <span style={{ color: C.kw }}>{keyword}</span>}
      {name     && <span style={{ color: C.text }}>{name}</span>}
      {op       && <span style={{ color: C.muted }}>{op}</span>}
    </div>
  )
}

function CodeProp({ k, v, type }: { k: string; v: string; type: 'str' | 'arr' | 'bool' }) {
  const valColor = type === 'str' ? C.str : type === 'bool' ? C.bool : C.muted
  return (
    <div style={{ paddingLeft: '1.5rem' }}>
      <span style={{ color: C.text }}>{k}</span>
      <span style={{ color: C.muted }}>: </span>
      <span style={{ color: valColor }}>{v}</span>
      <span style={{ color: C.muted }}>,</span>
    </div>
  )
}

/* ─── Terminal card ──────────────────────────────────────────── */
function TerminalCard() {
  return (
    <div className="terminal-card" aria-hidden="true">
      <div className="terminal-card-header">
        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444', flexShrink: 0 }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#f59e0b', flexShrink: 0 }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#22c55e', flexShrink: 0 }} />
        <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
          engineer.config.ts
        </span>
      </div>
      <div style={{ padding: '1.25rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', lineHeight: 1.9 }}>
        <CodeLine comment="// backend engineer · KL" />
        <CodeLine keyword="const" name=" config" op=" = {" />
        <CodeProp k="name"       v={'"Mohamed Erfan"'}         type="str" />
        <CodeProp k="role"       v={'"Software Engineer"'}     type="str" />
        <CodeProp k="company"    v={'"Endava · Mastercard"'}   type="str" />
        <CodeProp k="stack"      v={'["Java", "Spring Boot", "Kafka"]'} type="arr" />
        <CodeProp k="focus"      v={'"Payment Infrastructure"'} type="str" />
        <CodeProp k="experience" v={'"6+ years"'}              type="str" />
        <CodeProp k="available"  v="true"                      type="bool" />
        <CodeLine op="}" />
      </div>
    </div>
  )
}

/* ─── Component ─────────────────────────────────────────────── */
const SPECIALTIES = ['Fintech & Payments', 'System Architecture', 'API Design', 'Backend Infrastructure']

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const currentYear = new Date().getFullYear()
  const yearsOfExp = currentYear - stats.careerStartYear

  const [countTrigger, setCountTrigger] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setCountTrigger(true), 550)
    return () => clearTimeout(t)
  }, [])

  const yearsCount    = useCountUp(yearsOfExp, 900, countTrigger, !!prefersReduced)
  const projectsCount = useCountUp(10, 700, countTrigger, !!prefersReduced)

  const { text: specialty, cursorOn } = useTypewriter(SPECIALTIES, 75, 2200, !!prefersReduced)

  const containerVariants     = prefersReduced ? { hidden: {}, show: {} } : heroStagger
  const itemVariants          = prefersReduced ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : fadeUp
  const statsContainerVariants = prefersReduced ? { hidden: {}, show: {} } : stagger(0.1, 0)

  const terminalVariants = prefersReduced
    ? itemVariants
    : {
        hidden: { opacity: 0, x: 30 },
        show:   { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] } },
      }

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        style={{
          position: 'relative',
          minHeight: 'calc(100dvh - 4rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem 1.5rem 4rem',
          overflow: 'hidden',
        }}
      >
        {/* Dot grid texture */}
        {!prefersReduced && <div aria-hidden="true" className="hero-dot-grid" />}

        {/* Ambient gradient blobs */}
        {!prefersReduced && (
          <>
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-15%',
                left: '-8%',
                width: '55%',
                height: '65%',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 70%)',
                filter: 'blur(48px)',
                animation: 'hero-blob-1 12s ease-in-out infinite',
                pointerEvents: 'none',
                willChange: 'transform',
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: '-10%',
                right: '-5%',
                width: '45%',
                height: '55%',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, color-mix(in srgb, var(--color-accent-2) 14%, transparent), transparent 70%)',
                filter: 'blur(56px)',
                animation: 'hero-blob-2 15s ease-in-out infinite',
                pointerEvents: 'none',
                willChange: 'transform',
              }}
            />
          </>
        )}

        <div style={{ maxWidth: '72rem', margin: '0 auto', width: '100%', position: 'relative' }}>
          <div className="hero-layout">

            {/* ── Left column: text content ── */}
            <m.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {/* Availability badge */}
              <m.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: 'var(--color-success)',
                    backgroundColor: 'color-mix(in srgb, var(--color-success) 10%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--color-success) 25%, transparent)',
                    borderRadius: '999px',
                    padding: '0.3rem 0.875rem',
                  }}
                >
                  <span className="pulse-dot" aria-hidden="true" />
                  {site.availability}
                </span>
              </m.div>

              {/* Name */}
              <m.h1
                variants={itemVariants}
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  color: 'var(--color-text)',
                  marginBottom: '0.75rem',
                }}
              >
                {site.name}
              </m.h1>

              {/* Role + typewriter specialty */}
              <m.p
                variants={itemVariants}
                style={{
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  marginBottom: '1.5rem',
                  minHeight: '2em',
                }}
              >
                <span className="gradient-text">{site.role}</span>
                <span style={{ color: 'var(--color-muted)' }}>
                  {' · '}{specialty}
                  {!prefersReduced && (
                    <span
                      style={{
                        opacity: cursorOn ? 1 : 0,
                        transition: 'opacity 0.1s',
                        color: 'var(--color-accent)',
                        marginLeft: '1px',
                      }}
                    >|</span>
                  )}
                </span>
              </m.p>

              {/* Short bio */}
              <m.p
                variants={itemVariants}
                style={{
                  fontSize: '1.0625rem',
                  color: 'var(--color-muted)',
                  lineHeight: 1.8,
                  maxWidth: '42rem',
                  marginBottom: '2rem',
                }}
              >
                {site.shortBio}
              </m.p>

              {/* Social links + CTA */}
              <m.div
                variants={itemVariants}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '3rem',
                  flexWrap: 'wrap',
                }}
              >
                {[
                  { href: site.socials.github, label: 'GitHub', icon: <GitHubIcon /> },
                  { href: site.socials.linkedin, label: 'LinkedIn', icon: <LinkedInIcon /> },
                  { href: site.socials.email, label: 'Email', icon: <EmailIcon /> },
                ].map(({ href, label, icon }) => (
                  <m.a
                    key={href}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    aria-label={label}
                    whileHover={prefersReduced ? {} : { scale: 1.08, borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
                    whileTap={prefersReduced ? {} : { scale: 0.95 }}
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
                    }}
                  >
                    {icon}
                  </m.a>
                ))}

                <m.a
                  href={navLinks.find((l) => l.href === '/#work')?.href ?? '/#work'}
                  className="btn-glow"
                  whileHover={prefersReduced ? {} : { opacity: 0.88, scale: 1.02 }}
                  whileTap={prefersReduced ? {} : { scale: 0.97 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--color-bg)',
                    backgroundColor: 'var(--color-accent)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.6rem 1.25rem',
                    textDecoration: 'none',
                    border: '1px solid transparent',
                  }}
                >
                  View my work
                </m.a>
              </m.div>

              {/* Stats */}
              <m.dl
                variants={statsContainerVariants}
                style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}
              >
                {[
                  { display: `${yearsCount}+`, label: 'years of experience' },
                  { display: `${projectsCount}+`, label: stats.projects.label },
                  { display: stats.scale.value, label: stats.scale.label },
                ].map(({ display, label }) => (
                  <m.div
                    key={label}
                    variants={itemVariants}
                    style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}
                  >
                    <dt
                      style={{
                        fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        color: 'var(--color-text)',
                        lineHeight: 1,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {display}
                    </dt>
                    <dd style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', fontWeight: 500 }}>
                      {label}
                    </dd>
                  </m.div>
                ))}
              </m.dl>
            </m.div>

            {/* ── Right column: terminal card ── */}
            <m.div
              className="hero-terminal-col"
              variants={terminalVariants}
              initial="hidden"
              animate="show"
              style={{ display: 'none' }}
            >
              <TerminalCard />
            </m.div>

          </div>
        </div>

        {/* Scroll-down indicator */}
        {!prefersReduced && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'var(--color-subtle)',
            }}
            className="scroll-indicator"
          >
            <ChevronDownIcon />
          </div>
        )}
      </section>
    </LazyMotion>
  )
}
