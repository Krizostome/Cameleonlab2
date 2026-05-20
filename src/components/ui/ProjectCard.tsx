"use client"

import { useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import type { Project } from "../../data/projects"

export interface ProjectCardProps {
  project: Project
  index: number
  className?: string
}

export default function ProjectCard({ project, index, className = "" }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const bottomInfoRef = useRef<HTMLDivElement>(null)

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches

  useEffect(() => {
    if (prefersReduced) return
    if (!overlayRef.current) return
    gsap.set(overlayRef.current, { clipPath: "inset(100% 0 0 0)" })
    return () => { gsap.killTweensOf(overlayRef.current) }
  }, [prefersReduced])

  const handleMouseEnter = () => {
    if (prefersReduced || isTouchDevice) return
    if (!overlayRef.current || !bottomInfoRef.current) return
    gsap.to(overlayRef.current, { clipPath: "inset(0% 0 0 0)", duration: 0.55, ease: "expo.inOut" })
    gsap.to(bottomInfoRef.current, { opacity: 0, y: 12, duration: 0.35, ease: "power2.out" })
  }

  const handleMouseLeave = () => {
    if (prefersReduced || isTouchDevice) return
    if (!overlayRef.current || !cardRef.current || !bottomInfoRef.current) return
    gsap.to(overlayRef.current, { clipPath: "inset(100% 0 0 0)", duration: 0.45, ease: "expo.inOut" })
    gsap.to(bottomInfoRef.current, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" })
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReduced || isTouchDevice) return
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const xVal = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const yVal = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    gsap.to(cardRef.current, {
      rotateY: xVal * 4, rotateX: -yVal * 4, transformPerspective: 900,
      ease: "power2.out", duration: 0.5,
    })
  }

  return (
    <Link
      ref={cardRef}
      to={`/portfolio/${project.slug}`}
      className={`project-card group relative block overflow-hidden rounded-2xl ${className}`}
      style={{ cursor: isTouchDevice ? "pointer" : "none", transformStyle: "preserve-3d", willChange: "transform" }}
      aria-label={`Voir le projet ${project.title}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Image */}
      <div className="relative h-full w-full">
        <img
          src={project.image}
          alt={project.imageAlt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading={index < 4 ? "eager" : "lazy"}
        />
      </div>

      {/* Permanent gradient bottom */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(6,12,10,0.92) 0%, rgba(6,12,10,0.4) 40%, transparent 65%)" }}
      />

      {/* Hover overlay reveal */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 flex flex-col justify-end p-5 md:p-6"
        style={{
          background: "linear-gradient(to top, rgba(6,12,10,0.98) 0%, rgba(6,12,10,0.85) 55%, rgba(6,12,10,0.5) 100%)",
          clipPath: "inset(100% 0 0 0)",
        }}
      >
        <p className="mb-4 font-['Satoshi'] text-sm font-light leading-relaxed text-[#F0FAF4]/80">
          {project.description}
        </p>
        <div className="mb-4 flex flex-wrap gap-4">
          {project.results.slice(0, 2).map((r) => (
            <div key={r.label} className="flex flex-col">
              <span className="font-['Satoshi'] text-lg font-bold text-[#00E87A]">{r.value}</span>
              <span className="font-['Satoshi'] text-[10px] uppercase tracking-wider text-[#F0FAF4]/50">{r.label}</span>
            </div>
          ))}
        </div>
        <span className="inline-flex items-center gap-2 font-['Satoshi'] text-xs font-semibold uppercase tracking-wider text-[#00E87A]">
          Voir le projet <span>→</span>
        </span>
      </div>

      {/* Project number */}
      <div className="pointer-events-none absolute left-4 top-4 font-['Satoshi'] text-2xl font-bold text-[#00E87A] opacity-80 md:text-3xl">
        {project.number}
      </div>

      {/* Tags */}
      <div className="pointer-events-none absolute right-4 top-4 flex gap-1.5">
        {project.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#00E87A]/25 bg-[#060C0A]/50 px-2.5 py-1 font-['Satoshi'] text-[10px] font-semibold uppercase tracking-wider text-[#00E87A] backdrop-blur-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom info */}
      <div ref={bottomInfoRef} className="pointer-events-none absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 md:p-6">
        <p className="mb-1 font-['Satoshi'] text-[11px] font-medium uppercase tracking-wider text-[#00E87A]">
          {project.client}
        </p>
        <h3 className="font-['Outfit'] text-xl font-bold text-[#F0FAF4] md:text-2xl">
          {project.title}
        </h3>
      </div>
    </Link>
  )
}
