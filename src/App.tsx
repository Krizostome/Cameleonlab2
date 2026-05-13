import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Marquee from './components/sections/Marquee'
import Services from './components/sections/Services'
import Portfolio from './components/sections/Portfolio'
import Process from './components/sections/Process'
import StackTechnologique from './components/sections/StackTechnologique'
import Testimonials from './components/sections/Testimonials'

function App() {
  return (
    <div className="min-h-screen bg-warm-black">
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <Portfolio />
      <Process />
      <StackTechnologique />
      <Testimonials />
    </div>
  )
}

export default App
