'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import ScrambleRevealText from '../ui/ScrambleRevealText'
import OrbitalAnimation from './OrbitalAnimation'

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
 * Features orbital tech animation, mesh gradient background, glassmorphism,
 * scramble-text reveal, blur-to-sharp typography, subtle 3D mouse parallax,
 * and count-up stats.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaGroupRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const ctaShimmerRef = useRef<HTMLSpanElement>(null)
  const textColRef = useRef<HTMLDivElement>(null)

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
        delay: 0,
        defaults: { ease: 'power3.out' },
      })

      // Text column entrance
      if (textColRef.current) {
        entranceTl.fromTo(
          textColRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.2
        )
      }

      // Subtitle fadeUp
      if (subtitleRef.current) {
        entranceTl.fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35 },
          0.9
        )
      }

      // CTAs fadeUp with stagger
      if (ctaGroupRef.current) {
        const ctas = ctaGroupRef.current.querySelectorAll<HTMLElement>('button, a')
        entranceTl.fromTo(
          ctas,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.05 },
          1.1
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7FFF9] dark:bg-[#060C0A] pb-16 pt-28 md:pt-32"
      aria-label="Accueil"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  Mesh Gradient Background                                       */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="mesh-blob mesh-blob-1 absolute rounded-full opacity-40 blur-[100px]"
          style={{
            width: '50vw',
            height: '50vw',
            top: '-10%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 70%)',
          }}
        />
        <div
          className="mesh-blob mesh-blob-2 absolute rounded-full opacity-30 blur-[100px]"
          style={{
            width: '45vw',
            height: '45vw',
            top: '20%',
            right: '-15%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
          }}
        />
        <div
          className="mesh-blob mesh-blob-3 absolute rounded-full opacity-25 blur-[100px]"
          style={{
            width: '40vw',
            height: '40vw',
            bottom: '-10%',
            left: '30%',
            background: 'radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 70%)',
          }}
        />
        <div
          className="mesh-blob mesh-blob-4 absolute rounded-full opacity-20 blur-[100px]"
          style={{
            width: '35vw',
            height: '35vw',
            bottom: '10%',
            right: '20%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          }}
        />
      </div>

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
            'radial-gradient(circle, rgba(0,232,122,0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, black 40%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 50% at 50% 40%, black 40%, transparent 80%)',
        }}
      />

      {/* Halo behind title */}
      <div
        ref={haloRef}
        className="pointer-events-none absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2 rounded-full lg:left-[30%]"
        style={{
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(0,232,122,0.12) 0%, transparent 70%)',
          opacity: 0.06,
          filter: 'blur(60px)',
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  Main Content                                                   */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-6 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        {/* ── Text Column ── */}
        <div ref={textColRef} className="flex w-full flex-col items-center text-center lg:max-w-xl lg:items-start lg:text-left opacity-0">

          {/* Title with mouse-driven 3D depth */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              x: moveX,
              y: moveY,
              transformStyle: 'preserve-3d',
            }}
            className="mb-6"
          >
            <h1 className="text-elegant-shadow">
              <ScrambleRevealText
                text="NOUS TRANSFORMONS VOS IDÉES EN"
                className="block font-['Outfit'] text-2xl font-bold text-[#071510] dark:text-[#F0FAF4] sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
                delay={0}
                scrambleDuration={0.6}
                revealDuration={0.4}
                glowWords={['IDÉES']}
                gradientWords={['IDÉES']}
              />
              <ScrambleRevealText
                text="PRODUITS NUMÉRIQUES PERFORMANTS"
                className="block font-['Outfit'] text-2xl font-bold text-[#071510] dark:text-[#F0FAF4] sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
                delay={0.05}
                scrambleDuration={0.9}
                revealDuration={0.4}
                glowWords={['PERFORMANTS']}
                gradientWords={['PERFORMANTS']}
              />
            </h1>
          </motion.div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mb-8 max-w-lg font-['Satoshi'] text-base font-light leading-relaxed text-[#374151] dark:text-[#9CA3AF] md:text-lg opacity-0"
            style={{ willChange: 'transform, opacity' }}
          >
            Nous concevons des expériences digitales sur mesure qui propulsent
            votre marque vers de nouveaux sommets.
          </p>

          {/* CTAs */}
          <div
            ref={ctaGroupRef}
            className="mb-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <button
              className="relative overflow-hidden rounded-full bg-[#00E87A] px-8 py-3.5 font-['Satoshi'] text-sm font-extrabold text-[#071510] dark:text-[#F0FAF4] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => (window.location.href = '/contact')}
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
              className="rounded-full border border-[#00E87A] px-8 py-3.5 font-['Satoshi'] text-sm font-bold text-[#071510] dark:text-[#F0FAF4] transition-colors hover:bg-[#00E87A]/10"
            >
              Voir nos réalisations
            </a>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid w-full max-w-md grid-cols-3 gap-4 border-t border-[#00E87A]/10 pt-6 sm:gap-6 sm:pt-8 lg:max-w-sm"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <span
                  data-count={stat.value}
                  className="block font-['Satoshi'] text-2xl font-bold text-[#00E87A] md:text-3xl"
                >
                  0
                </span>
                <span className="mt-1 block font-['Satoshi'] text-[10px] font-medium uppercase tracking-widest text-[#374151] dark:text-[#9CA3AF]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Orbital Animation Column ── */}
        <div className="flex w-full items-center justify-center lg:w-auto lg:justify-end">
          <OrbitalAnimation />
        </div>
      </div>
    </section>
  )
}
