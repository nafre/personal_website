import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'

const SYMBOLS = ['{', '}', '(', ')', '<', '>', '/', '0', '1', ';', '+', '-', '*', '=', '.']
const COUNT = 35

// Simple LCG for deterministic pseudo-random values — stable across SSR/hydration
function lcg(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

interface SymbolDef {
  symbol: string
  top: string
  left: string
  fontSize: string
  opacity: number
  duration: number
  delay: number
}

function buildSymbols(): SymbolDef[] {
  const rand = lcg(42)
  return Array.from({ length: COUNT }, (_, i) => ({
    symbol: SYMBOLS[Math.floor(rand() * SYMBOLS.length)],
    top: `${5 + rand() * 90}%`,
    left: `${3 + rand() * 94}%`,
    fontSize: `${0.75 + rand() * 0.875}rem`,
    opacity: 0.08 + rand() * 0.12,
    duration: 4 + rand() * 5,
    delay: -(rand() * 8),
  }))
}

const symbols = buildSymbols()

export default function CodeSymbols() {
  const prefersReduced = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <LazyMotion features={domAnimation} strict>
        {symbols.map((s, i) =>
          prefersReduced ? (
            <span
              key={i}
              style={{
                position: 'absolute',
                top: s.top,
                left: s.left,
                fontSize: s.fontSize,
                opacity: s.opacity,
                color: 'var(--color-accent)',
                fontFamily: 'var(--font-mono)',
                userSelect: 'none',
                lineHeight: 1,
              }}
            >
              {s.symbol}
            </span>
          ) : (
            <m.span
              key={i}
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: s.duration,
                delay: s.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                top: s.top,
                left: s.left,
                fontSize: s.fontSize,
                opacity: s.opacity,
                color: 'var(--color-accent)',
                fontFamily: 'var(--font-mono)',
                userSelect: 'none',
                lineHeight: 1,
              }}
            >
              {s.symbol}
            </m.span>
          )
        )}
      </LazyMotion>
    </div>
  )
}
