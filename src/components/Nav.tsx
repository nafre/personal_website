import { useState, useEffect } from 'react'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion'
import { navLinks } from '../data/content.js'

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2" x2="12" y2="6"/>
    <line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
    <line x1="2" y1="12" x2="6" y2="12"/>
    <line x1="18" y1="12" x2="22" y2="12"/>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

export default function Nav() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Sync to the real theme after hydration (the inline script in Layout.astro
    // has already set the 'dark' class on <html> before React runs)
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    localStorage.setItem('theme', next)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false)
    if (!href.startsWith('/#')) return
    if (window.location.pathname !== '/') return
    const id = href.slice(2)
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    const NAV_HEIGHT = 64 // 4rem — keep in sync with nav height
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
    window.scrollTo({ top, behavior: 'smooth' })
    history.pushState(null, '', href)
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          backgroundColor: scrolled
            ? 'color-mix(in srgb, var(--color-bg) 85%, transparent)'
            : 'transparent',
          borderBottom: scrolled
            ? '1px solid var(--color-border)'
            : '1px solid transparent',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <nav
          aria-label="Primary"
          style={{
            maxWidth: '72rem',
            margin: '0 auto',
            padding: '0 1.5rem',
            height: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              display: 'flex',
              flexDirection: 'column',
              textDecoration: 'none',
              lineHeight: 1.2,
            }}
          >
            <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text)' }}>
              Mohamed Erfan
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 500 }}>
              Backend Engineer
            </span>
          </a>

          {/* Desktop nav */}
          <ul
            style={{
              alignItems: 'center',
              gap: '0.25rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
            className="hidden md:flex"
          >
            {navLinks.map((link) =>
              link.href === '/blog' ? (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--color-muted)',
                      textDecoration: 'none',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '999px',
                      border: '1px solid var(--color-border)',
                      transition: 'color 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = 'var(--color-accent)'
                      ;(e.target as HTMLElement).style.borderColor = 'var(--color-accent)'
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = 'var(--color-muted)'
                      ;(e.target as HTMLElement).style.borderColor = 'var(--color-border)'
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ) : (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--color-muted)',
                      textDecoration: 'none',
                      padding: '0.3rem 0.6rem',
                      borderRadius: 'var(--radius-md)',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--color-text)' }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--color-muted)' }}
                  >
                    {link.label}
                  </a>
                </li>
              )
            )}
          </ul>

          {/* Right side: theme toggle + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                color: 'var(--color-muted)',
                cursor: 'pointer',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <m.span
                  key={theme}
                  initial={{ opacity: 0, scale: 0.7, rotate: -30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.7, rotate: 30 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex' }}
                >
                  {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                </m.span>
              </AnimatePresence>
            </button>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                color: 'var(--color-muted)',
                cursor: 'pointer',
              }}
              className="flex md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <m.span
                  key={menuOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: 'flex' }}
                >
                  {menuOpen ? <CloseIcon /> : <MenuIcon />}
                </m.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '4rem',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 40,
              backgroundColor: 'var(--color-bg)',
              borderTop: '1px solid var(--color-border)',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              overflowY: 'auto',
            }}
            className="md:hidden"
          >
            {navLinks.map((link, i) => (
              <m.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  padding: '0.875rem 0',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'block',
                }}
              >
                {link.label}
              </m.a>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}
