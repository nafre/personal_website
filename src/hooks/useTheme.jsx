import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({ theme: 'light', toggle: () => {}, setTheme: () => {}, colorTheme: 'electric-indigo' })

export function ThemeProvider({ children }) {
  const [colorTheme] = useState(() => {
    if (typeof window === 'undefined') return 'electric-indigo'
    try { return sessionStorage.getItem('colorTheme') || 'electric-indigo' } catch (_) { return 'electric-indigo' }
  })

  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'light' || stored === 'dark') return stored
    } catch (_) { /* localStorage unavailable (e.g. private browsing) */ }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const applyTheme = useCallback((next) => {
    const root = document.documentElement
    if (next === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    try {
      localStorage.setItem('theme', next)
    } catch (_) { /* localStorage unavailable (e.g. private browsing) */ }
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])

  const setTheme = useCallback((next) => setThemeState(next), [])
  const toggle = useCallback(
    () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  )

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle, colorTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
