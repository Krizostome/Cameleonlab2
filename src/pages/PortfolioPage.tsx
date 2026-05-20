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

const TITLE_WORDS = ["Nos", "réalisations"]

export default function PortfolioPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const statNumberRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!sectionRef.current) return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.fromTo(labelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "expo.out" })
      }
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".hero-word")
        gsap.fromTo(words, { clipPath: "inset(100% 0 0 0)", opacity: 0 }, {
          clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 0.9, stagger: 0.1, ease: "expo.out", delay: 0.4,
        })
      }
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.9, ease: "expo.out" })
      }
      statNumberRefs.current.forEach((el, i) => {
        if (!el) return
        const { value, suffix } = STATS[i]
        const obj = { val: 0 }
        gsap.to(obj, {
          val: value, duration: 2, ease: "power2.out", delay: 1.1 + i * 0.15,
          scrollTrigger: { trigger: statsRef.current, start: "top 90%", once: true },
          onUpdate: () => { el.textContent = Math.round(obj.val) + suffix },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        {/* ═══════════════════════════════════════════ */}
        {/*  HERO PORTFOLIO                            */}
        {/* ═══════════════════════════════════════════ */}
        <section
          ref={sectionRef}
          className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#F7FFF9] pt-24 pb-16 dark:bg-[#060C0A] md:min-h-[85vh]"
          aria-label="Hero portfolio"
        >
          {/* Dot grid — light */}
          <div
            className="pointer-events-none absolute inset-0 block opacity-[0.04] dark:hidden"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(0,232,122,0.12) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {/* Dot grid — dark */}
          <div
            className="pointer-events-none absolute inset-0 hidden opacity-[0.06] dark:block"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(0,232,122,0.08) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Halo radial — light */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/3 block h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06] dark:hidden"
            style={{
              background: "radial-gradient(ellipse, rgba(0,232,122,0.6) 0%, transparent 70%)",
              filter: "blur(90px)",
            }}
          />
          {/* Halo radial — dark */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/3 hidden h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] dark:block"
            style={{
              background: "radial-gradient(ellipse, rgba(0,232,122,0.5) 0%, transparent 70%)",
              filter: "blur(90px)",
            }}
          />

          {/* Glow secondaire — light */}
          <div
            className="pointer-events-none absolute right-1/4 bottom-1/4 block h-[400px] w-[400px] rounded-full opacity-[0.04] dark:hidden"
            style={{
              background: "radial-gradient(ellipse, rgba(0,122,61,0.5) 0%, transparent 60%)",
              filter: "blur(80px)",
            }}
          />
          {/* Glow secondaire — dark */}
          <div
            className="pointer-events-none absolute right-1/4 bottom-1/4 hidden h-[400px] w-[400px] rounded-full opacity-[0.05] dark:block"
            style={{
              background: "radial-gradient(ellipse, rgba(0,122,61,0.4) 0%, transparent 60%)",
              filter: "blur(80px)",
            }}
          />

          {/* Lignes verticales — light */}
          <div className="pointer-events-none absolute inset-0 block overflow-hidden dark:hidden">
            {[20, 50, 80].map((p) => (
              <div
                key={p}
                className="absolute top-0 h-full w-px"
                style={{
                  left: `${p}%`,
                  background: `linear-gradient(to bottom, transparent, rgba(0,232,122,${p === 50 ? 0.06 : 0.1}), transparent)`,
                }}
              />
            ))}
          </div>
          {/* Lignes verticales — dark */}
          <div className="pointer-events-none absolute inset-0 hidden overflow-hidden dark:block">
            {[20, 50, 80].map((p) => (
              <div
                key={p}
                className="absolute top-0 h-full w-px"
                style={{
                  left: `${p}%`,
                  background: `linear-gradient(to bottom, transparent, rgba(0,232,122,${p === 50 ? 0.04 : 0.07}), transparent)`,
                }}
              />
            ))}
          </div>

          {/* Grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay",
            }}
          />

          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center md:px-10">
            {/* Label */}
            <span
              ref={labelRef}
              className="mb-6 inline-flex items-center gap-3 font-['Satoshi'] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00E87A] opacity-0"
            >
              <span className="h-px w-6 bg-[#00E87A]" />
              Portfolio
              <span className="h-px w-6 bg-[#00E87A]" />
            </span>

            {/* Titre */}
            <h1
              ref={titleRef}
              className="mb-6 max-w-4xl font-['Outfit'] font-black text-[#071510] dark:text-[#F0FAF4]"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 1.05 }}
            >
              {TITLE_WORDS.map((word, i) => (
                <span key={i} className="hero-word mr-[0.2em] inline-block" style={{ clipPath: "inset(100% 0 0 0)" }}>
                  {word}
                </span>
              ))}
            </h1>

            {/* Sous-titre */}
            <p
              ref={subtitleRef}
              className="mb-14 max-w-lg font-['Satoshi'] text-base font-light leading-relaxed text-[#374151] opacity-0 md:text-lg"
            >
              De l'idée au produit livré — voici quelques projets qui illustrent notre façon de travailler.
            </p>

            {/* Stats */}
            <div ref={statsRef} className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span
                    ref={(el) => { statNumberRefs.current[i] = el }}
                    className="font-['Satoshi'] text-3xl font-bold text-[#00E87A] md:text-4xl"
                  >
                    0{stat.suffix}
                  </span>
                  <span className="mt-1 font-['Satoshi'] text-[11px] font-medium uppercase tracking-wider text-[#071510]/75 dark:text-[#F0FAF4]/75">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PortfolioGrid projects={PROJECTS} />
      </main>
      <Footer />
    </>
  )
}
