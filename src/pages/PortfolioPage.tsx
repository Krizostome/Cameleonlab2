"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import PortfolioGrid from "../components/sections/PortfolioGrid"
import { PROJECTS } from "../data/projects"

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 9, suffix: "+", label: "Projets livrés" },
  { value: 5, suffix: "", label: "Catégories" },
  { value: 100, suffix: "%", label: "Satisfaction" },
]

const TITLE_WORDS = ["Ce", "que", "nous", "avons", "construit."]

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

  /** Animations hero GSAP */
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!sectionRef.current) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      /* 1. Label fadeUp */
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "expo.out" }
        )
      }

      /* 2. Titre mot par mot — clipPath reveal */
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

      /* 3. Sous-titre fadeUp */
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.9, ease: "expo.out" }
        )
      }

      /* 4. Stats countUp */
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
        {/*  HERO SECTION — palette beige doré                         */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section
          ref={sectionRef}
          className="relative overflow-hidden bg-[#1A1410] py-24 md:py-32 lg:py-40"
          aria-label="Hero portfolio"
        >
          {/* Grille de points beige */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #C8A96E 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Halo radial centre */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
            style={{
              background:
                "radial-gradient(ellipse, rgba(200,169,110,0.6) 0%, transparent 70%)",
              filter: "blur(90px)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
            <div className="flex flex-col items-center text-center">
              {/* Label */}
              <span
                ref={labelRef}
                className="mb-6 inline-flex items-center gap-3 font-bricolage text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C8A96E] opacity-0"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              >
                <span className="h-px w-6 bg-[#C8A96E]" />
                Nos réalisations
                <span className="h-px w-6 bg-[#C8A96E]" />
              </span>

              {/* Titre */}
              <h1
                ref={titleRef}
                className="mb-6 max-w-4xl font-playfair font-black text-[#FAF6EE]"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(3rem, 8vw, 6rem)",
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
                className="mb-14 max-w-lg font-dm-sans text-base font-light leading-relaxed text-[#7C6E5A] opacity-0 md:text-lg"
              >
                De l'idée au produit livré — voici quelques projets qui illustrent
                notre façon de travailler.
              </p>

              {/* Stats */}
              <div
                ref={statsRef}
                className="flex flex-wrap items-center justify-center gap-8 md:gap-14"
              >
                {STATS.map((stat, i) => (
                  <div key={stat.label} className="flex flex-col items-center">
                    <span
                      ref={(el) => (statNumberRefs.current[i] = el)}
                      className="font-dm-mono text-3xl font-bold text-[#C8A96E] md:text-4xl"
                      style={{ fontFamily: "'Satoshi', sans-serif" }}
                    >
                      0{stat.suffix}
                    </span>
                    <span className="mt-1 font-dm-sans text-[11px] font-medium uppercase tracking-wider text-[#FAF6EE]/60">
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
