import { Nav, Hero, About, Projects, Experience, Skills, Contact, Footer } from './components/index.js'

export default function App() {
  return (
    <>
      <Nav />
      <main id="main" className="relative">
        <Hero />
        <div className="hairline" aria-hidden="true" />
        <About />
        <div className="hairline" aria-hidden="true" />
        <Projects />
        <div className="hairline" aria-hidden="true" />
        <Experience />
        <div className="hairline" aria-hidden="true" />
        <Skills />
        <div className="hairline" aria-hidden="true" />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
