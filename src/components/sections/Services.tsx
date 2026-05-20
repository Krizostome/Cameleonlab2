'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Service {
  icon: string
  title: string
  description: string
}

const SERVICES: Service[] = [
  {
    icon: '⬡',
    title: 'Web Design & Développement',
    description:
      'Des sites web sur mesure alliant esthétique impeccable et performances techniques de pointe.',
  },
  {
    icon: '◉',
    title: 'Applications Mobile iOS & Android',
    description:
      'Applications natives et cross-platform fluides, intuitives et scalables pour vos utilisateurs.',
  },
  {
    icon: '✦',
    title: 'Branding & Identité Visuelle',
    description:
      'Construisez une marque forte et mémorable avec une identité visuelle cohérente et impactante.',
  },
  {
    icon: '▲',
    title: 'SEO & Stratégie Digitale',
    description:
      'Optimisez votre visibilité et attirez un trafic qualifié grâce à une stratégie SEO sur mesure.',
  },
]

/**
 * Premium Services section with cinematic scroll reveals,
 * mouse-following glow, parallax depth, and ultra-smooth hover states.
 */
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // ── Mouse position for radial glow ──
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 30 })
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // ── Label entrance ──
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: labelRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      // ── Title word-by-word blur reveal ──
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll<HTMLSpanElement>('.word')
        gsap.fromTo(
          words,
          {
            y: 60,
            opacity: 0,
            filter: 'blur(10px)',
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.0,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }

      // ── Cards staggered entrance ──
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll<HTMLDivElement>('.service-card')
        gsap.fromTo(
          cards,
          {
            y: 60,
            opacity: 0,
            scale: 0.9,
            filter: 'blur(10px)',
            rotateX: 8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            rotateX: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }

      // ── CTA entrance ──
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        )
      }

      // ── Floating gradient blur gentle drift ──
      if (!prefersReduced) {
        const blobs = sectionRef.current?.querySelectorAll<HTMLDivElement>('.blob')
        blobs?.forEach((blob, i) => {
          gsap.to(blob, {
            y: '+=20',
            x: '+=10',
            duration: 4 + i,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Build title word spans
  const titleText = "Des solutions qui s'adaptent à votre business."
  const titleWords = titleText.split(' ')

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-[#F7FFF9] dark:bg-[#060C0A] py-16 md:py-20 lg:py-24"
      aria-label="Nos services"
      onMouseMove={handleMouseMove}
    >
      {/* Subtle radial halo */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,232,122,0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Ultra subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,232,122,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,232,122,0.3) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Mouse-following glow */}
      <motion.div
        ref={glowRef}
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full opacity-0 transition-opacity duration-500"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(0,232,122,0.08) 0%, transparent 70%)',
          opacity: hoveredCard !== null ? 0.6 : 0,
        }}
      />

      {/* Floating gradient blobs */}
      <div
        className="blob pointer-events-none absolute left-[10%] top-[20%] h-64 w-64 rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, rgba(0,232,122,0.5), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="blob pointer-events-none absolute right-[15%] bottom-[15%] h-72 w-72 rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, rgba(232,213,163,0.5), transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* Label */}
        <span
          ref={labelRef}
          className="mb-6 inline-flex items-center gap-3 font-['Satoshi'] text-xs font-medium uppercase tracking-[0.2em] text-[#00E87A] opacity-0"
        >
          <span className="h-px w-6 bg-[#00E87A]" />
          Ce que nous faisons
        </span>

        {/* Title */}
        <h2
          ref={titleRef}
          className="mb-16 max-w-4xl font-['Outfit'] text-4xl font-bold leading-tight text-[#071510] dark:text-[#F0FAF4] md:text-5xl lg:text-6xl"
          style={{ perspective: '800px' }}
        >
          {titleWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em] opacity-0">
              {word}
            </span>
          ))}
        </h2>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          style={{ perspective: '1000px' }}
        >
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              className="service-card group relative rounded-[20px] border border-[#00E87A]/10 bg-[#F7FFF9] dark:bg-[#071510] p-7 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:scale-[1.02] hover:border-t-[#00E87A]/60 hover:bg-[#F0FAF4] dark:hover:bg-[#0a1812] hover:shadow-[0_12px_40px_rgba(0,232,122,0.18)] md:p-8"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity, filter',
              }}
            >
              {/* Light sweep on hover */}
              <div
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                aria-hidden="true"
              >
                <div
                  className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[rgba(0,232,122,0.03)] to-transparent transition-transform duration-1000 group-hover:translate-x-[250%]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.23,1,0.32,1)' }}
                />
              </div>

              {/* Icon */}
              <div className="mb-5 inline-flex items-center justify-center text-2xl text-[#00E87A] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-12 md:text-3xl">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="mb-3 font-['Outfit'] text-lg font-semibold text-[#071510] dark:text-[#F0FAF4] md:text-xl">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mb-6 font-['Satoshi'] text-sm leading-relaxed text-[#374151] dark:text-[#9CA3AF]">
                {service.description}
              </p>

              {/* Link */}
              <a
                href="#"
                className="inline-flex items-center gap-2 font-['Satoshi'] text-sm font-medium text-[#00E87A] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1"
              >
                En savoir plus
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-16 flex justify-center opacity-0">
          <a
            href="#"
            className="group inline-flex items-center gap-3 rounded-full border border-[#00E87A]/30 px-8 py-3.5 font-['Satoshi'] text-sm font-bold text-[#071510] dark:text-[#F0FAF4] transition-all duration-300 hover:border-[#00E87A]/60 hover:bg-[#00E87A]/5 hover:shadow-[0_0_24px_rgba(0,232,122,0.15)]"
          >
            Voir tous nos services
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
