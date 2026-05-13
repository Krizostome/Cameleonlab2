import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Marquee from './components/sections/Marquee'
import Services from './components/sections/Services'
import Portfolio from './components/sections/Portfolio'
import Process from './components/sections/Process'
import StackTechnologique from './components/sections/StackTechnologique'
import Testimonials from './components/sections/Testimonials'
import Team from './components/sections/Team'
import FAQ from './components/sections/FAQ'
import CTASection from './components/sections/CTA'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#F7FFF9] dark:bg-[#060C0A]">
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <Portfolio />
      <Process />
      <StackTechnologique />
      <Team />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App
