"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import PortfolioGrid from "../components/sections/PortfolioGrid"
import { PROJECTS } from "../data/projects"

gsap.registerPlugin(ScrollTrigger)

/* ── Stats du hero ── */
const STATS = [
  { value: 9, suffix: "+", label: "Projets livrés" },
  { value: 5, suffix: "", label: "Catégories" },
  { value: 100, suffix: "%", label: "Satisfaction" },
]

const TITLE_WORDS = ["Ce", "que", "nous", "avons", "construit."]

/**
 * Page Portfolio principale — hero animé + grille masonry avec filtres
 * Couleurs CameleonLab vert néon, support dark mode.
 */
export default function PortfolioPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const statNumberRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  /**
   * @animation Hero GSAP — séquence d'entrée (label, titre mot-par-mot, sous-titre, stats countUp)
   * @note Utilise gsap.context() + ctx.revert() pour le nettoyage.
   * @note Bails out si prefers-reduced-motion ou SSR.
   */
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!sectionRef.current) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    /* Réduit motion : rendre tout visible immédiatement, pas d'animation */
    if (prefersReduced) {
      if (labelRef.current) {
        labelRef.current.style.opacity = "1"
        labelRef.current.style.transform = "none"
      }
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = "1"
        subtitleRef.current.style.transform = "none"
      }
      if (titleRef.current) {
        titleRef.current.querySelectorAll(".hero-word").forEach((w) => {
          ;(w as HTMLElement).style.clipPath = "inset(0% 0 0 0)"
          ;(w as HTMLElement).style.opacity = "1"
        })
      }
      statNumberRefs.current.forEach((el, i) => {
        if (el) el.textContent = STATS[i].value + STATS[i].suffix
      })
      return
    }

    const ctx = gsap.context(() => {
      /* 1. Label fadeUp (y:20→0, opacity 0→1, delay 0.2s, durée 0.6s) */
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "expo.out" }
        )
      }

      /* 2. Titre mot par mot — clipPath reveal (inset 100% → 0%) */
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".hero-word")
        gsap.fromTo(
          words,
          { clipPath: "inset(100% 0 0 0)", opacity: 0 },
          {
            clipPath: "inset(0% 0 0 0)",
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "expo.out",
            delay: 0.4,
          }
        )
      }

      /* 3. Sous-titre fadeUp (delay 0.9s) */
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.9, ease: "expo.out" }
        )
      }

      /* 4. Stats countUp — chaque valeur animée avec ScrollTrigger */
      statNumberRefs.current.forEach((el, i) => {
        if (!el) return
        const { value, suffix } = STATS[i]
        const obj = { val: 0 }

        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: "power2.out",
          delay: 1.1 + i * 0.15,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 90%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <Navbar />

      <main>
        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  HERO SECTION                                              */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section
          ref={sectionRef}
          className="relative overflow-hidden bg-[#F7FFF9] py-24 dark:bg-[#060C0A] md:py-32 lg:py-40"
          aria-label="Hero portfolio"
        >
          {/* Grille de points vert néon */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08] dark:opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #00E87A 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Halo radial centre */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] dark:opacity-[0.06]"
            style={{
              background:
                "radial-gradient(ellipse, rgba(0,232,122,0.4) 0%, transparent 70%)",
              filter: "blur(90px)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
            <div className="flex flex-col items-center text-center">
              {/* Label */}
              <span
                ref={labelRef}
                className="mb-6 inline-flex items-center gap-3 font-bricolage text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00E87A] opacity-0"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                <span className="h-px w-6 bg-[#00E87A]" />
                Nos réalisations
                <span className="h-px w-6 bg-[#00E87A]" />
              </span>

              {/* Titre — clamp(2rem, 8vw, 6rem), adapté clair/sombre */}
              <h1
                ref={titleRef}
                className="mb-6 max-w-4xl font-playfair font-black text-[#071510] dark:text-[#F0FAF4]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 8vw, 6rem)",
                  lineHeight: 1.05,
                }}
              >
                {TITLE_WORDS.map((word, i) => (
                  <span
                    key={i}
                    className="hero-word mr-[0.2em] inline-block"
                    style={{ clipPath: "inset(100% 0 0 0)" }}
                  >
                    {word}
                  </span>
                ))}
              </h1>

              {/* Sous-titre */}
              <p
                ref={subtitleRef}
                className="mb-14 max-w-lg font-dm-sans text-base font-light leading-relaxed text-[#4B5563] opacity-0 dark:text-[#F0FAF4]/60 md:text-lg"
              >
                De l&apos;idée au produit livré — voici quelques projets qui illustrent
                notre façon de travailler.
              </p>

              {/* Stats animées */}
              <div
                ref={statsRef}
                className="flex flex-wrap items-center justify-center gap-8 md:gap-14"
              >
                {STATS.map((stat, i) => (
                  <div key={stat.label} className="flex flex-col items-center">
                    <span
                      ref={(el) => (statNumberRefs.current[i] = el)}
                      className="font-dm-mono text-3xl font-bold text-[#00E87A] md:text-4xl"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      0{stat.suffix}
                    </span>
                    <span className="mt-1 font-dm-sans text-[11px] font-medium uppercase tracking-wider text-[#6B7280] dark:text-[#F0FAF4]/60">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  GRILLE + FILTRES                                          */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <PortfolioGrid projects={PROJECTS} />
      </main>

      <Footer />
    </>
  )
}
