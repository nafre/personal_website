import { useEffect } from 'react'

const SEQUENCE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export function useKonami(onActivate: () => void) {
  useEffect(() => {
    let buffer: string[] = []
    const handler = (e: KeyboardEvent) => {
      buffer.push(e.key)
      buffer = buffer.slice(-SEQUENCE.length)
      if (buffer.join(',') === SEQUENCE.join(',')) {
        onActivate()
        buffer = []
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onActivate])
}
