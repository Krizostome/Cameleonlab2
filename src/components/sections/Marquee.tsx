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
 * Blends seamlessly with the site's warm-black palette.
 */
export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      className="relative overflow-hidden bg-[#1A1410] py-6 md:py-8"
      aria-label="Bande défilante"
    >
      {/* Seamless top separator — barely visible warm line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5EDD6]/[0.06] to-transparent"
        aria-hidden="true"
      />
      {/* Seamless bottom separator */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#F5EDD6]/[0.06] to-transparent"
        aria-hidden="true"
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
          animation: 'marquee-scroll 13s linear infinite',
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
                    className="inline-block cursor-default select-none px-6 font-inter text-sm font-medium uppercase tracking-[0.15em] text-[#FAF6EE]/60 md:px-10 md:text-base"
                    onMouseEnter={() => setHoveredIndex(globalIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    animate={{
                      color:
                        hoveredIndex === globalIndex
                          ? '#C8A96E'
                          : '#FAF6EE99',
                      textShadow:
                        hoveredIndex === globalIndex
                          ? '0 0 24px rgba(200, 169, 110, 0.45), 0 0 48px rgba(200, 169, 110, 0.15)'
                          : '0 0 0px rgba(200, 169, 110, 0)',
                    }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    {item}
                  </motion.span>
                  <span
                    className="mx-2 h-1.5 w-1.5 rounded-full bg-[#C8A96E]/40 md:mx-4"
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
