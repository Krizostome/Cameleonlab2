"use client"

import React, { useMemo } from "react"
import { motion, Variants, useReducedMotion } from "framer-motion"

/* ═══════════════════════════════════════════════════════════════════ */
/*  FloatingPath — organic SVG path that drifts gently                */
/* ═══════════════════════════════════════════════════════════════════ */

function FloatingPath({
  d,
  color,
  delay,
  duration,
  xRange,
  yRange,
}: {
  d: string
  color: string
  delay: number
  duration: number
  xRange: number
  yRange: number
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="0.8"
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 0.35, 0.2, 0.4, 0.15, 0.3, 0],
        x: [0, xRange * 0.6, -xRange * 0.3, xRange * 0.8, 0],
        y: [0, -yRange * 0.4, yRange * 0.6, -yRange * 0.2, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ willChange: "transform, opacity" }}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  FloatingPathsBackground — cinematic organic motion                */
/* ═══════════════════════════════════════════════════════════════════ */

function FloatingPathsBackground() {
  const paths = useMemo(
    () => [
      {
        d: "M-200,300 C-50,100 150,500 400,250 S800,50 1100,300 S1500,550 1800,200 S2200,400 2500,150",
        color: "#00E87A",
        delay: 0,
        duration: 28,
        xRange: 30,
        yRange: 20,
      },
      {
        d: "M-100,500 C100,300 300,700 600,450 S1000,200 1300,500 S1700,750 2000,350 S2400,600 2700,250",
        color: "#00C060",
        delay: 3,
        duration: 34,
        xRange: -25,
        yRange: 25,
      },
      {
        d: "M-150,150 C50,350 250,50 500,300 S900,550 1200,200 S1600,50 1900,350 S2300,600 2600,150",
        color: "#00E87A",
        delay: 6,
        duration: 30,
        xRange: 20,
        yRange: -15,
      },
      {
        d: "M-50,600 C150,400 350,800 650,500 S1050,250 1350,600 S1750,850 2050,400 S2450,650 2750,300",
        color: "#E6FFF2",
        delay: 9,
        duration: 36,
        xRange: -35,
        yRange: 18,
      },
      {
        d: "M-250,400 C-50,200 150,600 450,350 S850,100 1150,450 S1550,700 1850,300 S2250,550 2550,200",
        color: "#007A3D",
        delay: 12,
        duration: 32,
        xRange: 28,
        yRange: 22,
      },
      {
        d: "M0,200 C200,50 400,400 700,150 S1100,350 1400,100 S1800,450 2100,200 S2500,500 2800,150",
        color: "#00C060",
        delay: 15,
        duration: 26,
        xRange: -20,
        yRange: -18,
      },
      {
        d: "M-180,550 C20,350 220,750 520,450 S920,200 1220,550 S1620,800 1920,350 S2320,600 2620,250",
        color: "#00E87A",
        delay: 18,
        duration: 38,
        xRange: 22,
        yRange: 16,
      },
      {
        d: "M-80,100 C120,300 320,0 620,250 S1020,500 1320,150 S1720,50 2020,400 S2420,650 2720,200",
        color: "#E6FFF2",
        delay: 21,
        duration: 30,
        xRange: -28,
        yRange: 20,
      },
    ],
    []
  )

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 2400 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {paths.map((p, i) => (
        <FloatingPath key={i} {...p} />
      ))}
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  LetterReveal — cinematic letter-by-letter text reveal             */
/* ═══════════════════════════════════════════════════════════════════ */

function LetterReveal({
  text,
  className,
  baseDelay = 0,
}: {
  text: string
  className?: string
  baseDelay?: number
}) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return <span className={className}>{text}</span>
  }

  const words = text.split(" ")

  const letterVariant: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: baseDelay + i * 0.025,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  let globalIndex = 0

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => {
            const idx = globalIndex++
            return (
              <motion.span
                key={ci}
                custom={idx}
                variants={letterVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="inline-block"
                style={{ willChange: "transform, opacity, filter" }}
              >
                {char}
              </motion.span>
            )
          })}
          {wi < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Main CTA Section                                                   */
/* ═══════════════════════════════════════════════════════════════════ */

export default function CTASection() {
  const shouldReduce = useReducedMotion()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const buttonHover = {
    y: -3,
    scale: 1.02,
    transition: { type: "spring" as const, stiffness: 400, damping: 20 },
  }

  return (
    <section
      role="region"
      aria-labelledby="cta-title"
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#F7FFF9] dark:bg-[#060C0A]"
    >
      {/* ── Floating Paths Background ── */}
      <div className="absolute inset-0 opacity-40">
        <FloatingPathsBackground />
      </div>

      {/* ── Radial glow behind content ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,232,122,0.08) 0%, rgba(0,232,122,0.02) 40%, transparent 70%)",
        }}
      />

      {/* ── Subtle grain texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 md:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        {/* Label */}
        <motion.p
          variants={itemVariants}
          className="font-['Satoshi'] text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#00E87A]/80 mb-6 md:mb-8"
        >
          Devis Gratuit Sous 48h
        </motion.p>

        {/* Main Title — Letter reveal */}
        <h2
          id="cta-title"
          className="font-['Outfit'] font-extrabold text-[#071510] dark:text-[#F0FAF4] leading-[1.05] mb-8 md:mb-10"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)" }}
        >
          <LetterReveal text="Vous avez un projet en tête ?" />
        </h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="font-['Satoshi'] font-light text-[#374151] dark:text-[#9CA3AF] max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-12 md:mb-14"
        >
          Décrivez votre projet et recevez une estimation personnalisée.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          {/* Primary button */}
          <motion.a
            href="/contact"
            whileHover={shouldReduce ? {} : buttonHover}
            whileTap={shouldReduce ? {} : { scale: 0.98 }}
            className="relative inline-flex items-center justify-center px-10 py-4 rounded-full font-['Satoshi'] font-semibold text-[14px] tracking-wide text-[#071510] dark:text-[#F0FAF4] bg-[#00E87A] overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(0,232,122,0.35)] w-full sm:w-auto"
          >
            <span className="relative z-10">Parlons-en ensemble</span>
            {/* Shimmer */}
            <motion.span
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
                width: "40%",
              }}
              animate={{ x: ["-150%", "300%"] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "linear",
              }}
            />
          </motion.a>

          {/* Secondary button — glassmorphism */}
          <motion.a
            href="#portfolio"
            whileHover={shouldReduce ? {} : buttonHover}
            whileTap={shouldReduce ? {} : { scale: 0.98 }}
            className="inline-flex items-center justify-center px-10 py-4 rounded-full font-['Satoshi'] font-semibold text-[14px] tracking-wide text-[#071510] dark:text-[#F0FAF4] border border-[#00E87A]/40 bg-[#071510]/[0.04] dark:bg-[#F0FAF4]/[0.04] backdrop-blur-md hover:bg-[#00E87A]/10 hover:border-[#00E87A]/70 transition-all duration-300 w-full sm:w-auto"
          >
            Voir nos réalisations
          </motion.a>
        </motion.div>

        {/* Trust micro-copy */}
        <motion.p
          variants={itemVariants}
          className="mt-10 md:mt-12 font-['Satoshi'] text-[11px] text-[#374151] dark:text-[#9CA3AF]/60 tracking-wide"
        >
          Sans engagement, réponse garantie sous 48h.
        </motion.p>
      </motion.div>
    </section>
  )
}
