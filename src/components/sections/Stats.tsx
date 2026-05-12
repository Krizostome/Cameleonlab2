'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

interface StatMetric {
  value: number
  suffix: string
  label: string
}

const METRICS: StatMetric[] = [
  { value: 50, suffix: '+', label: 'Projets' },
  { value: 98, suffix: '%', label: 'Satisfaction' },
  { value: 15, suffix: '+', label: 'Technologies' },
  { value: 3, suffix: ' ans', label: 'XP' },
]

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

function useCountUp(target: number, duration = 2, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    let raf: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const rawProgress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const eased = easeOutExpo(rawProgress)
      setCount(Math.round(eased * target))
      if (rawProgress < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])

  return count
}

function StatCard({ metric, index }: { metric: StatMetric; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCountUp(metric.value, 2.2, isInView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.19, 1, 0.22, 1],
      }}
      className="group relative flex flex-col items-center justify-center px-4 py-10 md:py-14"
    >
      <motion.span
        className="relative z-10 font-dm-mono text-6xl font-black text-gold md:text-7xl lg:text-8xl"
        whileHover={{
          scale: 1.02,
          textShadow: '0 0 40px rgba(200,169,110,0.4), 0 0 80px rgba(200,169,110,0.2)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {count}
        {metric.suffix}
      </motion.span>

      <span className="mt-4 text-center font-dm-sans text-xs font-medium uppercase tracking-[0.2em] text-off-white/80">
        {metric.label}
      </span>
    </motion.div>
  )
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-warm-black py-24 md:py-32 lg:py-40"
      aria-label="Chiffres clés"
    >
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Soft radial depth */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '800px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(200,169,110,0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <motion.div
        style={{ y }}
        className="relative z-10 mx-auto max-w-7xl px-6 md:px-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="mb-16 text-center md:mb-20"
        >
          <span className="mb-4 inline-block font-dm-sans text-xs font-medium uppercase tracking-[0.25em] text-gold/70">
            — Nos chiffres
          </span>
          <h2 className="font-playfair text-4xl font-bold text-off-white md:text-5xl lg:text-6xl">
            Impact en <span className="text-glow text-gold">chiffres</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric, index) => (
            <div key={metric.label} className="relative">
              <StatCard metric={metric} index={index} />
              {/* Vertical divider — desktop only */}
              {index < METRICS.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-2/3 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/20 to-transparent lg:block" />
              )}
              {/* Horizontal divider — mobile/tablet */}
              {index < METRICS.length - 1 && (
                <div className="absolute bottom-0 left-1/2 block h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/15 to-transparent lg:hidden" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
