import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import NosRealisations from './components/sections/NosRealisations'
import BasedInCotonou from './components/sections/BasedInCotonou'
import Services from './components/sections/Services'
import Process from './components/sections/Process'
import TechExpertise from './components/sections/TechExpertise'
import Testimonials from './components/sections/Testimonials'
import Team from './components/sections/Team'
import FAQ from './components/sections/FAQ'
import CTASection from './components/sections/CTA'
import Footer from './components/layout/Footer'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'
import ArticleDetail from './pages/ArticleDetail'
import PortfolioPage from './pages/PortfolioPage'
import ProjectDetailPage from './pages/ProjectDetailPage'

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <NosRealisations />
      <TechExpertise />
      <BasedInCotonou />
      <Services />
      <Process />
      <Team />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F7FFF9] dark:bg-[#060C0A]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticleDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
