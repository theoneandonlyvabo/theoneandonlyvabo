import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LogoStrip from './components/LogoStrip'
import About from './components/About'
import PhotoGrid from './components/PhotoGrid'
import Projects from './components/Projects'
import Skills from './components/Skills'
import OperatingSystem from './components/OperatingSystem'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <LogoStrip />
      <About />
      <PhotoGrid />
      <Projects />
      <Skills />
      <OperatingSystem />
      <section style={{
        borderTop: '1px solid var(--line)',
        padding: 'var(--space-xl) var(--space-lg)',
      }}>
        <div style={{ border: '1px solid var(--line)', height: '120px' }} />
      </section>
      <Contact />
      <Footer />
    </>
  )
}
