import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LogoStrip from './components/LogoStrip'
import Projects from './components/Projects'
import About from './components/About'
import PhotoGrid from './components/PhotoGrid'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <LogoStrip />
      <About />
      <PhotoGrid />
      <Projects />
    </>
  )
}