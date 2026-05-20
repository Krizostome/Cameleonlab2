"use client"

import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowLeft, ArrowRight, ExternalLink, Target, Lightbulb, Cpu, BarChart3, Users, Calendar, FolderOpen } from "lucide-react"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { PROJECTS } from "../data/projects"

gsap.registerPlugin(ScrollTrigger)

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = PROJECTS.find((p) => p.slug === slug)
  const allProjects = PROJECTS
  const currentIndex = allProjects.findIndex((p) => p.slug === slug)
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length]
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length]

  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  useEffect(() => {
    if (!project || !containerRef.current) return
    if (typeof window === "undefined") return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(heroRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out" })
      }
      gsap.fromTo(".detail-section", { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "expo.out",
        scrollTrigger: { trigger: ".detail-section", start: "top 85%", once: true },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [project])

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#F7FFF9] pt-24 dark:bg-[#060C0A]">
          <h1 className="font-['Outfit'] text-4xl font-bold text-[#071510] dark:text-[#F0FAF4]">Projet introuvable</h1>
          <p className="mt-4 font-['Satoshi'] text-[#374151]">Ce projet n'existe pas.</p>
          <Link to="/portfolio" className="mt-8 inline-flex items-center gap-2 text-[#00E87A] hover:underline">
            <ArrowLeft className="h-4 w-4" /> Voir tous les projets
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  const getServiceIcon = (label: string) => {
    if (label.includes("Stratégie")) return <Target className="h-5 w-5" />
    if (label.includes("UX") || label.includes("Design")) return <Lightbulb className="h-5 w-5" />
    if (label.includes("Développement") || label.includes("Dev")) return <Cpu className="h-5 w-5" />
    if (label.includes("SEO")) return <BarChart3 className="h-5 w-5" />
    return <FolderOpen className="h-5 w-5" />
  }

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-[#F7FFF9] dark:bg-[#060C0A]">
        <div ref={containerRef}>
          {/* ═══════════════════════════════════════════ */}
          {/*  HERO PROJET                               */}
          {/* ═══════════════════════════════════════════ */}
          <section ref={heroRef} className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-16">
            {/* Halo — light */}
            <div
              className="pointer-events-none absolute right-0 top-0 block h-[500px] w-[500px] -translate-y-1/4 translate-x-1/4 rounded-full opacity-[0.06] dark:hidden"
              style={{ background: "radial-gradient(ellipse, rgba(0,232,122,0.6) 0%, transparent 65%)", filter: "blur(100px)" }}
            />
            {/* Halo — dark */}
            <div
              className="pointer-events-none absolute right-0 top-0 hidden h-[500px] w-[500px] -translate-y-1/4 translate-x-1/4 rounded-full opacity-[0.08] dark:block"
              style={{ background: "radial-gradient(ellipse, rgba(0,232,122,0.5) 0%, transparent 65%)", filter: "blur(100px)" }}
            />

            {/* Grain */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                mixBlendMode: "overlay",
              }}
            />

            <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
              {/* Retour */}
              <Link
                to="/portfolio"
                className="mb-8 inline-flex items-center gap-2 font-['Satoshi'] text-sm font-medium uppercase tracking-wider text-[#00E87A] transition-opacity hover:opacity-70"
              >
                <ArrowLeft className="h-4 w-4" />
                Projets
              </Link>

              {/* Tags + Title */}
              <div className="mb-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#00E87A]/20 bg-[#00E87A]/5 px-3 py-1 font-['Satoshi'] text-[10px] font-semibold uppercase tracking-wider text-[#00E87A]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1
                className="mb-6 max-w-4xl font-['Outfit'] font-black text-[#071510] dark:text-[#F0FAF4]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05 }}
              >
                {project.title}
              </h1>

              <p className="mb-10 max-w-2xl font-['Satoshi'] text-lg font-light leading-relaxed text-[#374151]">
                {project.fullDescription}
              </p>

              {/* Meta Row */}
              <div className="flex flex-wrap gap-x-8 gap-y-4 border-t border-[#00E87A]/10 pt-6">
                <div className="flex items-center gap-2 text-[#374151] dark:text-[#9CA3AF]">
                  <Users className="h-4 w-4 text-[#00E87A]" />
                  <span className="font-['Satoshi'] text-sm font-medium">{project.client}</span>
                </div>
                <div className="flex items-center gap-2 text-[#374151] dark:text-[#9CA3AF]">
                  <Calendar className="h-4 w-4 text-[#00E87A]" />
                  <span className="font-['Satoshi'] text-sm font-medium">{project.year}</span>
                </div>
                <div className="flex items-center gap-2 text-[#374151] dark:text-[#9CA3AF]">
                  <FolderOpen className="h-4 w-4 text-[#00E87A]" />
                  <span className="font-['Satoshi'] text-sm font-medium capitalize">{project.category}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Image */}
          <section className="relative mx-auto max-w-6xl px-6 md:px-10 pb-16 md:pb-24">
            <div
              ref={imageRef}
              className={`relative overflow-hidden rounded-2xl border border-[#00E87A]/10 bg-[#F0FAF4] transition-all duration-700 dark:bg-[#071510] ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={project.image}
                alt={project.imageAlt}
                className="h-auto w-full object-cover"
                onLoad={() => setImageLoaded(true)}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#F7FFF9]/50 to-transparent dark:from-[#060C0A]/50" />
            </div>
          </section>

          {/* ═══════════════════════════════════════════ */}
          {/*  CONTENU PROJET                            */}
          {/* ═══════════════════════════════════════════ */}
          <section className="relative mx-auto max-w-5xl px-6 md:px-10 pb-24">
            {/* Équation */}
            {project.equation && (
              <div className="detail-section mb-16 text-center">
                <div className="mx-auto inline-block rounded-2xl border border-[#00E87A]/10 bg-white/70 px-8 py-6 backdrop-blur-sm dark:bg-[#071510]/70">
                  <div className="flex flex-wrap items-center justify-center gap-4 font-['Satoshi'] text-lg text-[#00E87A] md:text-xl">
                    {project.equation.map((item, i) => (
                      <span key={i} className={i % 2 === 1 ? "text-[#071510]/40 dark:text-[#F0FAF4]/40" : ""}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Challenge + Solution */}
            <div className="detail-section mb-16 grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-[#00E87A]/10 bg-white/70 p-6 dark:bg-[#071510]/50 md:p-8">
                <div className="mb-4 flex items-center gap-2 font-['Satoshi'] text-sm font-bold uppercase tracking-wider text-[#00E87A]">
                  <Lightbulb className="h-4 w-4" />
                  Le défi
                </div>
                <p className="font-['Satoshi'] text-base font-light leading-relaxed text-[#374151] dark:text-[#9CA3AF]">{project.challenge}</p>
              </div>
              <div className="rounded-2xl border border-[#00E87A]/10 bg-white/70 p-6 dark:bg-[#071510]/50 md:p-8">
                <div className="mb-4 flex items-center gap-2 font-['Satoshi'] text-sm font-bold uppercase tracking-wider text-[#00E87A]">
                  <Target className="h-4 w-4" />
                  Notre solution
                </div>
                <p className="font-['Satoshi'] text-base font-light leading-relaxed text-[#374151] dark:text-[#9CA3AF]">{project.solution}</p>
              </div>
            </div>

            {/* Résultats */}
            {project.results.length > 0 && (
              <div className="detail-section mb-16">
                <h2 className="mb-8 font-['Outfit'] text-2xl font-bold text-[#071510] dark:text-[#F0FAF4] md:text-3xl">Résultats</h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {project.results.map((r) => (
                    <div
                      key={r.label}
                      className="group rounded-2xl border border-[#00E87A]/10 bg-white/70 p-6 transition-all duration-300 hover:border-[#00E87A]/30 dark:bg-[#071510]/50"
                    >
                      <span className="font-['Satoshi'] text-3xl font-bold text-[#00E87A] md:text-4xl">{r.value}</span>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="font-['Satoshi'] text-[11px] font-semibold uppercase tracking-wider text-[#374151] dark:text-[#9CA3AF]">
                          {r.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services */}
            {project.services && project.services.length > 0 && (
              <div className="detail-section mb-16">
                <h2 className="mb-8 font-['Outfit'] text-2xl font-bold text-[#071510] dark:text-[#F0FAF4] md:text-3xl">Services fournis</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.services.map((service) => (
                    <div
                      key={service}
                      className="flex items-center gap-3 rounded-xl border border-[#00E87A]/10 bg-white/60 px-4 py-3 dark:bg-[#071510]/40"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#00E87A]/20 text-[#00E87A]">
                        {getServiceIcon(service)}
                      </span>
                      <span className="font-['Satoshi'] text-sm font-medium text-[#071510] dark:text-[#F0FAF4]">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Interne + Externe */}
            <div className="detail-section flex flex-wrap items-center gap-4 pt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#00E87A] px-6 py-3 font-['Satoshi'] text-sm font-semibold uppercase tracking-wider text-[#071510] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,232,122,0.4)]"
              >
                Démarrer un projet <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="/portfolio"
                onClick={(e) => {
                  e.preventDefault()
                  window.open("https://cameleonlab.fr", "_blank")
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[#00E87A]/20 px-6 py-3 font-['Satoshi'] text-sm font-semibold uppercase tracking-wider text-[#00E87A] transition-all duration-300 hover:border-[#00E87A]/40 hover:bg-[#00E87A]/5"
              >
                Visiter le site <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </section>

          {/* ═══════════════════════════════════════════ */}
          {/*  NAVIGATION PROJETS                        */}
          {/* ═══════════════════════════════════════════ */}
          <nav className="border-t border-[#00E87A]/10 bg-[#F7FFF9] py-12 dark:bg-[#060C0A]">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10">
              <Link
                to={`/portfolio/${prevProject.slug}`}
                className="group flex flex-col items-start gap-1 font-['Satoshi'] text-sm font-semibold uppercase tracking-wider text-[#00E87A] transition-opacity hover:opacity-70"
              >
                <span className="flex items-center gap-2 text-[10px] text-[#374151] dark:text-[#9CA3AF]">
                  <ArrowLeft className="h-3 w-3" /> Précédent
                </span>
                <span className="max-w-[140px] truncate font-['Satoshi'] text-xs font-medium text-[#071510] group-hover:text-[#00E87A] dark:text-[#F0FAF4]">
                  {prevProject.title}
                </span>
              </Link>

              <Link
                to={`/portfolio/${nextProject.slug}`}
                className="group flex flex-col items-end gap-1 font-['Satoshi'] text-sm font-semibold uppercase tracking-wider text-[#00E87A] transition-opacity hover:opacity-70"
              >
                <span className="flex items-center gap-2 text-[10px] text-[#374151] dark:text-[#9CA3AF]">
                  Suivant <ArrowRight className="h-3 w-3" />
                </span>
                <span className="max-w-[140px] truncate font-['Satoshi'] text-xs font-medium text-[#071510] group-hover:text-[#00E87A] dark:text-[#F0FAF4]">
                  {nextProject.title}
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  )
}
