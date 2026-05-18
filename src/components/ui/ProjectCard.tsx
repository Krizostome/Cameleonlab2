"use client"

import { useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import type { Project } from "../../data/projects"

/* ─────────────────────────────────────────────────────────────────── */
/*  ProjectCard — carte projet premium avec :                        */
/*  • Tilt 3D au mousemove (desktop uniquement)                     */
/*  • Overlay clip-path reveal au hover                             */
/*  • Curseur personnalisé « Voir »                                 */
/*  • Désactivé sur mobile (pointer: coarse)                        */
/*  • Couleurs CameleonLab vert néon, support dark mode.              */
/* ─────────────────────────────────────────────────────────────────── */

export interface ProjectCardProps {
  /** Projet à afficher */
  project: Project
  /** Index pour le lazy-loading (eager sur les 4 premiers) */
  index: number
  /** Classes Tailwind additionnelles (aspect ratio, colspan…) */
  className?: string
}

export default function ProjectCard({ project, index, className = "" }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const bottomInfoRef = useRef<HTMLDivElement>(null)

  /** Détection reduced-motion et touch device */
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches

  /**
   * Initialisation : positionne l'overlay clip-path hors champ.
   * @note Kill des tweens au unmount pour éviter les fuites mémoire.
   */
  useEffect(() => {
    if (prefersReduced) return
    if (!overlayRef.current) return

    gsap.set(overlayRef.current, { clipPath: "inset(100% 0 0 0)" })

    return () => {
      gsap.killTweensOf(overlayRef.current)
    }
  }, [prefersReduced])

  /**
   * @animation Overlay clip-path slide-up + fade-out texte bas + apparation curseur
   * @trigger mouseenter sur la carte (desktop uniquement)
   */
  const handleMouseEnter = () => {
    if (prefersReduced || isTouchDevice) return
    if (!overlayRef.current || !cursorDotRef.current || !bottomInfoRef.current) return

    gsap.to(overlayRef.current, {
      clipPath: "inset(0% 0 0 0)",
      duration: 0.55,
      ease: "expo.inOut",
    })

    gsap.to(bottomInfoRef.current, {
      opacity: 0,
      y: 16,
      duration: 0.4,
      ease: "power2.out",
    })

    gsap.to(cursorDotRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
    })
  }

  /**
   * @animation Overlay clip-path slide-down + fade-in texte bas + disparition curseur + reset tilt
   * @trigger mouseleave sur la carte (desktop uniquement)
   */
  const handleMouseLeave = () => {
    if (prefersReduced || isTouchDevice) return
    if (!overlayRef.current || !cardRef.current || !cursorDotRef.current || !bottomInfoRef.current) return

    gsap.to(overlayRef.current, {
      clipPath: "inset(100% 0 0 0)",
      duration: 0.45,
      ease: "expo.inOut",
    })

    gsap.to(bottomInfoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    })

    gsap.to(cursorDotRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.2,
    })

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    })
  }

  /**
   * @animation Tilt 3D (rotateX / rotateY) + curseur personnalisé suiveur
   * @trigger mousemove sur la carte (desktop uniquement)
   * @param e Événement souris React
   */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReduced || isTouchDevice) return
    if (!cardRef.current || !cursorDotRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const xVal = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const yVal = ((e.clientY - rect.top) / rect.height - 0.5) * 2

    gsap.to(cardRef.current, {
      rotateY: xVal * 5,
      rotateX: -yVal * 5,
      transformPerspective: 900,
      ease: "power2.out",
      duration: 0.5,
    })

    gsap.to(cursorDotRef.current, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      ease: "power3.out",
      duration: 0.4,
    })
  }

  return (
    <Link
      ref={cardRef}
      to={`/portfolio/${project.slug}`}
      className={`project-card group relative block overflow-hidden rounded-2xl ${className}`}
      style={{
        cursor: isTouchDevice ? "pointer" : "none",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      aria-label={`Voir le projet ${project.title}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* ── Image projet ── */}
      <div className="relative h-full w-full">
        <img
          src={project.image}
          alt={project.imageAlt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading={index < 4 ? "eager" : "lazy"}
        />
      </div>

      {/* ── Overlay gradient permanent bas ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(6,12,10,0.9) 0%, rgba(6,12,10,0.4) 40%, transparent 65%)",
        }}
      />

      {/* ── Overlay reveal au hover (clip-path) ── */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 flex flex-col justify-end p-5 md:p-6"
        style={{
          background:
            "linear-gradient(to top, rgba(6,12,10,0.98) 0%, rgba(6,12,10,0.85) 55%, rgba(6,12,10,0.5) 100%)",
          clipPath: "inset(100% 0 0 0)",
        }}
      >
        {/* Description révélée */}
        <p className="mb-4 font-dm-sans text-sm font-light leading-relaxed text-[#F0FAF4]/80">
          {project.description}
        </p>

        {/* Résultats chiffrés */}
        <div className="mb-4 flex flex-wrap gap-4">
          {project.results.slice(0, 2).map((r) => (
            <div key={r.label} className="flex flex-col">
              <span
                className="font-dm-mono text-lg font-bold text-[#00E87A]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {r.value}
              </span>
              <span className="font-dm-sans text-[10px] uppercase tracking-wider text-[#F0FAF4]/50">
                {r.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <span className="inline-flex items-center gap-2 font-bricolage text-xs font-semibold uppercase tracking-wider text-[#00E87A]">
          Voir le projet
          <span>→</span>
        </span>
      </div>

      {/* ── Numéro projet ── */}
      <div
        className="pointer-events-none absolute left-4 top-4 font-dm-mono text-2xl font-bold text-[#00E87A] opacity-80 md:text-3xl"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {project.number}
      </div>

      {/* ── Tags catégorie ── */}
      <div className="pointer-events-none absolute right-4 top-4 flex gap-1.5">
        {project.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#00E87A]/25 bg-[#060C0A]/50 px-2.5 py-1 font-bricolage text-[10px] font-semibold uppercase tracking-wider text-[#00E87A] backdrop-blur-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* ── Infos permanentes en bas ── */}
      <div
        ref={bottomInfoRef}
        className="pointer-events-none absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 md:p-6"
      >
        <p className="mb-1 font-dm-sans text-[11px] font-medium uppercase tracking-wider text-[#00E87A]">
          {project.client}
        </p>
        <h3
          className="font-playfair text-xl font-bold text-[#F0FAF4] md:text-2xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {project.title}
        </h3>
      </div>

      {/* ── Curseur personnalisé ── */}
      {!isTouchDevice && (
        <div
          ref={cursorDotRef}
          className="pointer-events-none absolute left-0 top-0 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#00E87A]/40 bg-[#060C0A]/80 text-[10px] font-semibold uppercase tracking-wider text-[#00E87A] opacity-0 backdrop-blur-sm"
          style={{ willChange: "transform, opacity" }}
        >
          Voir
        </div>
      )}
    </Link>
  )
}
