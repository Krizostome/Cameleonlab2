'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const ITEMS = [
  'Web Design',
  'Mobile App',
  'Branding',
  'SEO',
  'UX/UI',
  'E-commerce',
  'Web Design',
  'Mobile App',
  'Branding',
  'SEO',
]

/**
 * Premium infinite marquee band separating Hero and Services.
 * Features GPU-optimized translateX, pause-on-hover, subtle glow,
 * motion blur during scroll, and grain texture.
 */
export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      className="relative overflow-hidden border-y border-[#E8D5A3]/30 bg-[#F5EDD6] py-6 md:py-8"
      aria-label="Bande défilante"
    >
      {/* Subtle grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Marquee track */}
      <div
        ref={trackRef}
        className="relative flex w-max will-change-transform"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false)
          setHoveredIndex(null)
        }}
        style={{
          animation: 'marquee-scroll 22s linear infinite',
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {/* Duplicate items 4 times for seamless infinite loop */}
        {Array.from({ length: 4 }).map((_, repeatIdx) => (
          <div key={repeatIdx} className="flex items-center shrink-0">
            {ITEMS.map((item, i) => {
              const globalIndex = repeatIdx * ITEMS.length + i
              return (
                <div key={globalIndex} className="flex items-center shrink-0">
                  <motion.span
                    className="inline-block px-6 font-inter text-sm font-medium uppercase tracking-[0.15em] text-[#1A1410] md:px-10 md:text-base cursor-default select-none"
                    onMouseEnter={() => setHoveredIndex(globalIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    animate={{
                      textShadow:
                        hoveredIndex === globalIndex
                          ? '0 0 24px rgba(200, 169, 110, 0.45)'
                          : '0 0 0px rgba(200, 169, 110, 0)',
                    }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    {item}
                  </motion.span>
                  <span
                    className="mx-2 h-1.5 w-1.5 rounded-full md:mx-4"
                    style={{ backgroundColor: 'rgba(200, 169, 110, 0.6)' }}
                    aria-hidden="true"
                  />
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* CSS keyframe for infinite scroll */}
      <style>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}
