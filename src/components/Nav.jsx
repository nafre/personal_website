import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle.jsx'
import { navLinks, site } from '../data/content.js'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-smooth ${
        scrolled
          ? 'backdrop-blur-md bg-white/70 dark:bg-ink-900/60 border-b border-ink-100 dark:border-ink-800'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Scroll progress bar — indigo→violet gradient */}
      <motion.div
        aria-hidden="true"
        style={{
          scaleX,
          transformOrigin: 'left',
          background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 60%, #A78BFA 100%)',
        }}
        className="absolute inset-x-0 top-0 h-[2px] pointer-events-none"
      />
      <nav
        className="container-wide flex h-16 items-center justify-between"
        aria-label="Primary"
      >
        {/* Logo — gradient mark */}
        <a
          href="#top"
          className="group inline-flex items-center gap-2.5 text-sm font-medium tracking-tight"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              boxShadow: '0 2px 8px rgba(99, 102, 241, 0.4)',
            }}
          >
            <span className="font-display text-sm font-semibold leading-none text-white">E</span>
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex" role="menubar">
          {navLinks.map((l) => (
            <li key={l.href} role="none">
              <a href={l.href} role="menuitem" className="nav-link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden btn-primary md:inline-flex"
          >
            Get in touch
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-800 md:hidden dark:border-ink-700 dark:text-ink-100"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-ink-100 bg-white/95 backdrop-blur dark:border-ink-800 dark:bg-ink-900/95"
          >
            <ul className="container-wide flex flex-col gap-1 py-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base text-ink-800 hover:bg-ink-50 dark:text-ink-100 dark:hover:bg-ink-800"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Get in touch
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
