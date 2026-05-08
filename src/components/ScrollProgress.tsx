import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function ScrollProgress() {
  const prefersReduced = useReducedMotion()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (prefersReduced) return
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [prefersReduced])

  if (prefersReduced) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress * 100}%`,
          background: 'linear-gradient(to right, var(--color-accent), var(--color-accent-2))',
          transition: 'width 0.08s linear',
        }}
      />
    </div>
  )
}
