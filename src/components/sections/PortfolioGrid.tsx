"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import gsap from "gsap"
import { Flip } from "gsap/Flip"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { Project } from "../../data/projects"
import ProjectCard from "../ui/ProjectCard"

/* ─────────────────────────────────────────────────────────────────── */
/*  PortfolioGrid — grille masonry avec filtres GSAP Flip           */
/*  • Filtres par catégorie avec compteur                           */
/*  • Animation Flip au changement de filtre                       */
/*  • Scroll reveal stagger initial                                 */
/*  • Support dark mode / reduced-motion / touch device            */
/* ─────────────────────────────────────────────────────────────────── */

gsap.registerPlugin(Flip, ScrollTrigger)

const FILTERS = [
  { value: "all", label: "Tous" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "branding", label: "Branding" },
  { value: "seo", label: "SEO" },
  { value: "ecommerce", label: "E-commerce" },
]

interface PortfolioGridProps {
  /** Liste complète des projets */
  projects: Project[]
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const gridRef = useRef<HTMLDivElement>(null)
  const initialRevealDone = useRef(false)

  /** Compte les projets par catégorie */
  const getCount = useCallback(
    (value: string) =>
      value === "all" ? projects.length : projects.filter((p) => p.category === value).length,
    [projects]
  )

  /**
   * @animation Scroll reveal initial — fadeUp stagger sur chaque carte
   * @trigger Quand la grille entre à 80% dans le viewport
   * @note Joué une seule fois (once: true) via un flag réf.
   */
  useEffect(() => {
    if (initialRevealDone.current) return
    if (!gridRef.current) return
    if (typeof window === "undefined") return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      initialRevealDone.current = true
      if (gridRef.current) {
        gridRef.current.querySelectorAll(".project-card").forEach((card) => {
          ;(card as HTMLElement).style.opacity = "1"
          ;(card as HTMLElement).style.transform = "none"
        })
      }
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger: { amount: 0.6, from: "start" },
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
          onComplete: () => {
            initialRevealDone.current = true
          },
        }
      )
    }, gridRef)

    return () => ctx.revert()
  }, [])

  /**
   * @animation Filtre avec GSAP Flip — réordonne / entre / sort les cartes
   * @trigger Clic sur un bouton de filtre
   * @param filter Valeur du filtre à appliquer
   */
  const handleFilter = (filter: string) => {
    if (!gridRef.current) return

    const state = Flip.getState(gridRef.current.querySelectorAll(".project-card"))

    setActiveFilter(filter)
    const newFiltered =
      filter === "all" ? projects : projects.filter((p) => p.category === filter)
    setFilteredProjects(newFiltered)

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.7,
        ease: "expo.inOut",
        stagger: 0.05,
        absolute: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" }
          ),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in" }),
      })
    })
  }

  return (
    <section className="relative bg-[#F7FFF9] py-16 dark:bg-[#060C0A] md:py-20 lg:py-24">
      {/* Texture grain subtile */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* ── Barre de filtres ── */}
        <div className="mb-10 md:mb-14" role="group" aria-label="Filtres par catégorie">
          <p
            className="mb-4 font-bricolage text-[11px] font-semibold uppercase tracking-[0.22em] text-[#071510]/50 dark:text-[#F0FAF4]/50"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Filtrer par :
          </p>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:overflow-visible">
            {FILTERS.map((f) => {
              const count = getCount(f.value)
              const isActive = activeFilter === f.value

              return (
                <button
                  key={f.value}
                  onClick={() => handleFilter(f.value)}
                  aria-pressed={isActive}
                  className={`
                    shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold transition-all duration-300
                    ${
                      isActive
                        ? "bg-[#00E87A] text-[#071510] shadow-[0_4px_14px_rgba(0,232,122,0.4)]"
                        : "border border-[#00E87A]/10 bg-white/60 text-[#071510]/50 hover:border-[#00E87A]/30 hover:text-[#071510]/80 dark:bg-[#071510]/40 dark:text-[#F0FAF4]/50 dark:hover:border-[#00E87A]/30 dark:hover:text-[#F0FAF4]/80"
                    }
                  `}
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  {f.label} ({count})
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Compteur projets ── */}
        <div className="mb-6 text-right">
          <span className="font-dm-sans text-xs text-[#071510]/50 dark:text-[#F0FAF4]/50">
            {filteredProjects.length} projet{filteredProjects.length > 1 ? "s" : ""} affiché
            {filteredProjects.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* ── Grille masonry ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          {filteredProjects.map((project, index) => {
            /*
              Taille responsive des cartes :
              - large : 2 colonnes sur md+, aspect-[3/2] mobile / aspect-[16/10] desktop
              - medium : 1 colonne, aspect-[3/2] mobile / aspect-[4/5] desktop
              - small : 1 colonne, aspect-[3/2] mobile / aspect-[3/4] desktop
            */
            const sizeClasses =
              project.size === "large"
                ? "md:col-span-2 aspect-[3/2] md:aspect-[16/10]"
                : project.size === "medium"
                ? "aspect-[3/2] md:aspect-[4/5]"
                : "aspect-[3/2] md:aspect-[3/4]"

            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                className={sizeClasses}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
