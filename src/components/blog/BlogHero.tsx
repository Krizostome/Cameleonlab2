'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

function AnimatedLetter({ char, index, total }: { char: string; index: number; total: number }) {
  const isSpace = char === ' '
  const isAccent = ['I', 'A', 't', 'a'].includes(char)

  return (
    <motion.span
      initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.6,
        delay: 0.3 + index * 0.04,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={`inline-block ${isSpace ? 'w-[0.3em]' : ''} ${
        isAccent ? 'text-[#00E87A]' : 'text-[#071510] dark:text-[#F0FAF4]'
      }`}
      style={{ willChange: 'transform, opacity, filter' }}
    >
      {isSpace ? '\u00A0' : char}
    </motion.span>
  )
}

function AnimatedTitle({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <AnimatedLetter key={i} char={char} index={i} total={text.length} />
      ))}
    </span>
  )
}

export default function BlogHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  // Mouse-driven parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 50, damping: 20, mass: 1 }
  const moveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)
  const moveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.registerPlugin()

    const ctx = gsap.context(() => {
      // Subtitle fade up
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0, filter: 'blur(6px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, delay: 1.2, ease: 'power3.out' }
        )
      }

      // Tags stagger
      if (tagsRef.current) {
        const tags = tagsRef.current.querySelectorAll('span')
        gsap.fromTo(
          tags,
          { y: 20, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, delay: 1.5, ease: 'back.out(1.7)' }
        )
      }

      // Glow pulse
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.15,
          scale: 1.1,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      // Floating particles
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll('.particle')
        particles.forEach((particle, i) => {
          gsap.to(particle, {
            y: `random(-30, 30)`,
            x: `random(-20, 20)`,
            opacity: `random(0.3, 0.8)`,
            duration: `random(3, 6)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.3,
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const tags = ['articles', 'tutoriels', 'design', 'développement', 'innovation digitale']

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#F7FFF9] dark:bg-[#060C0A] pt-24 pb-16 md:min-h-[80vh]"
      aria-label="Hero Blog"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated radial gradient background */}
      <motion.div
        style={{ x: moveX, y: moveY }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '800px',
            height: '600px',
            background: 'radial-gradient(ellipse, rgba(0,232,122,0.08) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </motion.div>

      {/* Secondary glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute right-1/4 bottom-1/4"
        style={{
          width: '400px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(0,122,61,0.12) 0%, transparent 60%)',
          filter: 'blur(60px)',
          opacity: 0.08,
        }}
      />

      {/* Animated lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-[20%] top-0 h-full w-px"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(0,232,122,0.08), transparent)',
          }}
        />
        <div
          className="absolute left-[50%] top-0 h-full w-px"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(0,232,122,0.05), transparent)',
          }}
        />
        <div
          className="absolute left-[80%] top-0 h-full w-px"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(0,232,122,0.08), transparent)',
          }}
        />
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="pointer-events-none absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full bg-[#00E87A]"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.4,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 md:px-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 flex items-center gap-3"
        >
          <div className="h-px w-8 bg-[#00E87A]/40" />
          <span className="font-['Satoshi'] text-xs font-medium uppercase tracking-[0.2em] text-[#374151] dark:text-[#F0FAF4]/80">
            Blog CameleonLab
          </span>
          <div className="h-px w-8 bg-[#00E87A]/40" />
        </motion.div>

        {/* Title */}
        <h1 className="mb-6 text-center">
          <AnimatedTitle
            text="Insights"
            className="block font-['Outfit'] text-5xl font-bold leading-[1.1] md:text-7xl lg:text-8xl"
          />
          <AnimatedTitle
            text="& Articles"
            className="block font-['Outfit'] text-5xl font-bold leading-[1.1] md:text-7xl lg:text-8xl"
          />
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mb-10 max-w-xl text-center font-['Satoshi'] text-base font-light leading-relaxed text-[#374151] dark:text-[#F0FAF4]/75 md:text-lg opacity-0"
          style={{ willChange: 'transform, opacity, filter' }}
        >
          Plongez dans nos réflexions sur le design, le développement et l'innovation digitale. 
          Des insights concrets pour transformer vos projets.
        </p>

        {/* Tags */}
        <div ref={tagsRef} className="flex flex-wrap items-center justify-center gap-2.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#00E87A]/20 bg-[#00E87A]/5 px-4 py-1.5 font-['Satoshi'] text-xs font-medium text-[#00E87A] backdrop-blur-sm dark:bg-[#00E87A]/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Scroll indicator */}
        
      </div>
    </section>
  )
}
