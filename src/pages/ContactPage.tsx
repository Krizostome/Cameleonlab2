'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import ContactWizard from '../components/wizard/ContactWizard'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const wizardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (prefersReduced) return

      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2,
          }
        )
      }

      if (wizardRef.current) {
        gsap.fromTo(
          wizardRef.current,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.4,
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-[#F7FFF9] dark:bg-[#060C0A]">
      <Navbar />

      <section
        ref={sectionRef}
        className="relative min-h-screen pt-28 md:pt-32 pb-20 md:pb-28 overflow-hidden"
      >
        {/* Background glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none opacity-60"
          style={{
            background:
              'radial-gradient(circle, rgba(0,232,122,0.06) 0%, rgba(0,232,122,0.02) 40%, transparent 70%)',
          }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,232,122,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,232,122,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          

          {/* Header */}
          <div ref={titleRef} className="text-center mb-12 md:mb-16">
          

            <h1
              className="font-['Outfit'] font-extrabold text-[#071510] dark:text-[#F0FAF4] leading-[1.1] mb-5"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Configurons votre projet ensemble
            </h1>

            <p className="font-['Satoshi'] text-[#374151] dark:text-[#9CA3AF] max-w-xl mx-auto text-base md:text-lg leading-relaxed">
              Un formulaire intelligent pour comprendre vos besoins et vous proposer la meilleure solution.
            </p>
          </div>

          {/* Wizard Card */}
          <div
            ref={wizardRef}
            className="relative rounded-3xl glass-premium p-6 md:p-10 lg:p-12"
            style={{ willChange: 'transform, opacity' }}
          >
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 0%, rgba(0,232,122,0.06) 0%, transparent 60%)',
              }}
            />

            <div className="relative z-10">
              <ContactWizard />
            </div>
          </div>

          {/* Trust micro-copy */}
          <div className="mt-10 md:mt-12 text-center">
            <p className="font-['Satoshi'] text-[11px] text-[#374151] dark:text-[#9CA3AF]/60 tracking-wide">
              Réponse sous 24h · Devis gratuit · Sans engagement
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
