import { ThemeProvider } from '../hooks/useTheme'
import Nav from './Nav'

export default function NavIsland() {
  return (
    <ThemeProvider>
      <Nav />
    </ThemeProvider>
  )
}
