import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Marquee from './components/sections/Marquee'
import Services from './components/sections/Services'

function App() {
  return (
    <div className="min-h-screen bg-warm-black">
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
    </div>
  )
}

export default App
