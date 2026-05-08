import { useState, useEffect, useRef, useCallback } from 'react'
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion } from 'framer-motion'
import { site } from '../data/content.js'

type Command = {
  id: string
  label: string
  hint?: string
  group: string
  action: () => void
}

const kbdStyle: React.CSSProperties = {
  fontSize: '0.6875rem',
  background: 'var(--color-bg-muted)',
  border: '1px solid var(--color-border)',
  borderRadius: '0.25rem',
  padding: '0.1rem 0.35rem',
  fontFamily: 'var(--font-mono)',
  color: 'var(--color-subtle)',
}

const SearchIcon = () => (
  <svg
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    style={{ color: 'var(--color-muted)', flexShrink: 0 }}
  >
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const scrollToSection = useCallback((id: string) => {
    setOpen(false)
    if (window.location.pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top, behavior: 'smooth' })
    })
  }, [])

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(site.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
    setOpen(false)
  }, [])

  const toggleTheme = useCallback(() => {
    const isDark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    window.dispatchEvent(new Event('theme-updated'))
    setOpen(false)
  }, [])

  const commands: Command[] = [
    { id: 'about',      label: 'Go to About',     group: 'Navigate', action: () => scrollToSection('about') },
    { id: 'work',       label: 'Go to Work',       group: 'Navigate', action: () => scrollToSection('work') },
    { id: 'experience', label: 'Go to Experience', group: 'Navigate', action: () => scrollToSection('experience') },
    { id: 'skills',     label: 'Go to Skills',     group: 'Navigate', action: () => scrollToSection('skills') },
    { id: 'contact',    label: 'Go to Contact',    group: 'Navigate', action: () => scrollToSection('contact') },
    { id: 'blog',       label: 'Open Blog',        group: 'Navigate', action: () => { setOpen(false); window.location.href = '/blog' } },
    { id: 'uses',       label: 'Open /uses',       group: 'Navigate', action: () => { setOpen(false); window.location.href = '/uses' } },
    { id: 'copy-email', label: 'Copy Email Address', hint: site.email, group: 'Actions', action: copyEmail },
    { id: 'github',     label: 'Open GitHub',      group: 'Actions', action: () => { setOpen(false); window.open(site.socials.github, '_blank') } },
    { id: 'linkedin',   label: 'Open LinkedIn',    group: 'Actions', action: () => { setOpen(false); window.open(site.socials.linkedin, '_blank') } },
    { id: 'theme',      label: 'Toggle Theme',     group: 'Actions', action: toggleTheme },
  ]

  const filtered = query.trim()
    ? commands.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.hint?.toLowerCase().includes(query.toLowerCase())
      )
    : commands

  useEffect(() => { setSelected(0) }, [query])

  // Keyboard shortcut to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Focus input on open
  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  // Scroll selected item into view
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const item = list.querySelector<HTMLElement>('[data-selected="true"]')
    item?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected(i => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      filtered[selected]?.action()
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  // Group while preserving insertion order
  const groups: Record<string, Command[]> = {}
  for (const cmd of filtered) {
    if (!groups[cmd.group]) groups[cmd.group] = []
    groups[cmd.group].push(cmd)
  }

  return (
    <LazyMotion features={domAnimation} strict>
      {/* "Copied!" toast */}
      <AnimatePresence>
        {copied && (
          <m.div
            key="copy-toast"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            aria-live="polite"
            style={{
              position: 'fixed',
              bottom: '1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10002,
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.5rem 1.125rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--color-success)',
              boxShadow: 'var(--shadow-md)',
              whiteSpace: 'nowrap',
            }}
          >
            Email copied to clipboard
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <m.div
              key="cp-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'color-mix(in srgb, black 55%, transparent)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                zIndex: 10000,
              }}
            />

            {/* Palette */}
            <m.div
              key="cp-panel"
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.97 }}
              animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-label="Command palette"
              aria-modal="true"
              onKeyDown={onKeyDown}
              style={{
                position: 'fixed',
                top: '18%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'min(560px, calc(100vw - 2rem))',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 10001,
                overflow: 'hidden',
              }}
            >
              {/* Search input */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.875rem 1rem',
                borderBottom: '1px solid var(--color-border)',
              }}>
                <SearchIcon />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Type a command or search…"
                  aria-label="Search commands"
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    fontSize: '0.9375rem',
                    color: 'var(--color-text)',
                    fontFamily: 'inherit',
                  }}
                />
                <kbd style={kbdStyle}>esc</kbd>
              </div>

              {/* Results */}
              <div ref={listRef} style={{ maxHeight: '22rem', overflowY: 'auto', padding: '0.375rem' }}>
                {filtered.length === 0 ? (
                  <p style={{
                    textAlign: 'center',
                    color: 'var(--color-subtle)',
                    padding: '1.75rem',
                    fontSize: '0.875rem',
                  }}>
                    No results for "{query}"
                  </p>
                ) : Object.entries(groups).map(([group, cmds]) => (
                  <div key={group}>
                    <p style={{
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-subtle)',
                      padding: '0.5rem 0.625rem 0.2rem',
                    }}>
                      {group}
                    </p>
                    {cmds.map(cmd => {
                      const globalIdx = filtered.indexOf(cmd)
                      const isSelected = globalIdx === selected
                      return (
                        <button
                          key={cmd.id}
                          data-selected={isSelected}
                          onClick={cmd.action}
                          onMouseEnter={() => setSelected(globalIdx)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: '0.5rem 0.625rem',
                            borderRadius: 'var(--radius-md)',
                            border: 'none',
                            backgroundColor: isSelected
                              ? 'color-mix(in srgb, var(--color-accent) 10%, transparent)'
                              : 'transparent',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'background-color 0.1s',
                          }}
                        >
                          <span style={{
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: isSelected ? 'var(--color-accent)' : 'var(--color-text)',
                          }}>
                            {cmd.label}
                          </span>
                          {cmd.hint && (
                            <span style={{
                              fontSize: '0.75rem',
                              color: 'var(--color-subtle)',
                              fontFamily: 'var(--font-mono)',
                              marginLeft: '0.75rem',
                              flexShrink: 0,
                            }}>
                              {cmd.hint}
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>

              {/* Footer hints */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.5rem 0.875rem',
                borderTop: '1px solid var(--color-border)',
                fontSize: '0.6875rem',
                color: 'var(--color-subtle)',
              }}>
                <span><kbd style={kbdStyle}>↑↓</kbd> navigate</span>
                <span><kbd style={kbdStyle}>↵</kbd> select</span>
                <span><kbd style={kbdStyle}>esc</kbd> close</span>
                <span style={{ marginLeft: 'auto' }}><kbd style={kbdStyle}>⌘K</kbd></span>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}
