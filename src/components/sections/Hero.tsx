'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import ScrambleRevealText from '../ui/ScrambleRevealText'

/** Stat item shape */
interface StatItem {
  value: string
  label: string
}

const STATS: StatItem[] = [
  { value: '50+', label: 'Projets livrés' },
  { value: '98%', label: 'Satisfaction' },
  { value: '3 ans', label: 'Expérience' },
]

/**
 * Premium Hero section for CameleonLab.
 * Features a futuristic scramble-text reveal, blur-to-sharp typography,
 * subtle 3D mouse parallax via Framer Motion, and count-up stats.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaGroupRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const ctaShimmerRef = useRef<HTMLSpanElement>(null)

  // ── Framer Motion: mouse-driven subtle 3D depth ──
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 60, damping: 20, mass: 0.8 }
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [2, -2]),
    springConfig
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-2, 2]),
    springConfig
  )
  const moveX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-6, 6]),
    springConfig
  )
  const moveY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-6, 6]),
    springConfig
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
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

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // ── Halo pulse behind title ──
      if (!prefersReduced && haloRef.current) {
        gsap.to(haloRef.current, {
          opacity: 0.12,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      // ── Master entrance timeline ──
      const entranceTl = gsap.timeline({
        delay: 0.1,
        defaults: { ease: 'power3.out' },
      })

      // Badge fadeUp
      if (badgeRef.current) {
        entranceTl.fromTo(
          badgeRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.2
        )
      }

      // Subtitle fadeUp — waits for title scramble to finish (~3.0s)
      if (subtitleRef.current) {
        entranceTl.fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          3.0
        )
      }

      // CTAs fadeUp with stagger
      if (ctaGroupRef.current) {
        const ctas = ctaGroupRef.current.querySelectorAll<HTMLElement>('button, a')
        entranceTl.fromTo(
          ctas,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          3.2
        )
      }

      // ── CTA shimmer loop ──
      if (!prefersReduced && ctaShimmerRef.current) {
        gsap.fromTo(
          ctaShimmerRef.current,
          { x: '-100%' },
          { x: '300%', duration: 2.5, repeat: -1, ease: 'none' }
        )
      }

      // ── Stats countUp with ScrollTrigger ──
      if (statsRef.current) {
        const statEls = statsRef.current.querySelectorAll<HTMLSpanElement>('[data-count]')
        if (prefersReduced) {
          statEls.forEach((el) => {
            const target = el.getAttribute('data-count') ?? '0'
            el.textContent = target
          })
        } else {
          statEls.forEach((el) => {
            const target = el.getAttribute('data-count') ?? '0'
            const numeric = parseFloat(target.replace(/[^0-9.]/g, ''))
            const suffix = target.replace(/[0-9.]/g, '')
            const isFloat = target.includes('.')

            ScrollTrigger.create({
              trigger: el,
              start: 'top 85%',
              once: true,
              onEnter: () => {
                const obj = { val: 0 }
                gsap.to(obj, {
                  val: numeric,
                  duration: 2,
                  ease: 'expo.out',
                  snap: isFloat ? undefined : { val: 1 },
                  onUpdate: () => {
                    const formatted = isFloat
                      ? obj.val.toFixed(1)
                      : Math.round(obj.val).toString()
                    el.textContent = formatted + suffix
                  },
                })
              },
            })
          })
        }
      }
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-warm-black pb-16 pt-24"
      aria-label="Accueil"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Dot grid masked in ellipse */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(200,169,110,0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black 40%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 50% at 50% 40%, black 40%, transparent 80%)',
        }}
      />

      {/* Halo behind title */}
      <div
        ref={haloRef}
        className="pointer-events-none absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(200,169,110,0.12) 0%, transparent 70%)',
          opacity: 0.06,
          filter: 'blur(60px)',
        }}
      />

      <div
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 md:px-10"
        style={{ perspective: '1200px' }}
      >
        {/* Badge */}
        <span
          ref={badgeRef}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 font-dm-sans text-xs font-medium uppercase tracking-widest text-gold opacity-0"
          style={{ willChange: 'transform, opacity' }}
        >
          <span className="h-px w-4 bg-gold" />
          Agence digitale &amp; innovation
        </span>

        {/* Title with mouse-driven 3D depth */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            x: moveX,
            y: moveY,
            transformStyle: 'preserve-3d',
          }}
          className="mb-8 text-center"
        >
          <h1 className="text-elegant-shadow">
            <ScrambleRevealText
              text="Votre vision,"
              className="block font-playfair text-5xl font-bold text-off-white md:text-7xl lg:text-8xl"
              delay={0.5}
              scrambleDuration={1.5}
              revealDuration={0.8}
              glowWords={['vision']}
              gradientWords={['Vi']}
            />
            <ScrambleRevealText
              text="notre transformation."
              className="block font-playfair text-5xl font-bold text-off-white md:text-7xl lg:text-8xl"
              delay={0.9}
              scrambleDuration={1.8}
              revealDuration={0.8}
              glowWords={['transformation']}
              gradientWords={['tra']}
            />
          </h1>
        </motion.div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mb-10 max-w-xl text-center font-dm-sans text-base font-light leading-relaxed text-beige-grey md:text-lg opacity-0"
          style={{ willChange: 'transform, opacity' }}
        >
          Nous concevons des expériences digitales sur mesure qui propulsent
          votre marque vers de nouveaux sommets.
        </p>

        {/* CTAs */}
        <div
          ref={ctaGroupRef}
          className="mb-20 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            className="relative overflow-hidden rounded-full bg-gold px-8 py-3.5 font-bricolage text-sm font-extrabold text-warm-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => (window.location.href = '#contact')}
          >
            <span className="relative z-10">Démarrer un projet</span>
            <span
              ref={ctaShimmerRef}
              className="pointer-events-none absolute inset-0 block"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
                width: '40%',
              }}
            />
          </button>
          <a
            href="#portfolio"
            className="rounded-full border border-gold px-8 py-3.5 font-bricolage text-sm font-bold text-off-white transition-colors hover:bg-gold/10"
          >
            Voir nos réalisations
          </a>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid w-full max-w-2xl grid-cols-3 gap-6 border-t border-gold/10 pt-8"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <span
                data-count={stat.value}
                className="block font-dm-mono text-2xl font-bold text-gold md:text-3xl"
              >
                0
              </span>
              <span className="mt-1 block font-dm-sans text-[10px] font-medium uppercase tracking-widest text-beige-grey">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
