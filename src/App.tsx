import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Marquee from './components/sections/Marquee'
import Services from './components/sections/Services'
import Stats from './components/sections/Stats'
import Portfolio from './components/sections/Portfolio'
import Process from './components/sections/Process'

function App() {
  return (
    <div className="min-h-screen bg-warm-black">
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <Stats />
      <Portfolio />
      <Process />
    </div>
  )
}

export default App
