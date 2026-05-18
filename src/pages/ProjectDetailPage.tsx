"use client"

import { useEffect, useRef, useMemo } from "react"
import { useParams, Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { PROJECTS } from "../data/projects"

gsap.registerPlugin(ScrollTrigger)

/* ── Helper : extrait un nombre d'une chaîne et anime un compteur ── */
function animateCountUp(el: HTMLElement, targetStr: string) {
  const match = targetStr.match(/([0-9\s,.]+)/)
  if (!match) {
    gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" })
    return
  }

  const raw = match[1].replace(/\s/g, "").replace(/,/g, ".")
  const num = parseFloat(raw)
  if (isNaN(num)) {
    gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" })
    return
  }

  const isInt = Number.isInteger(num)
  const obj = { val: 0 }

  gsap.to(obj, {
    val: num,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 85%", once: true },
    onUpdate: () => {
      const formatted = isInt ? Math.round(obj.val).toLocaleString("fr-FR") : obj.val.toFixed(1)
      el.textContent = targetStr.replace(match[1], formatted)
    },
  })
}

/**
 * Page détail d'un projet — hero plein écran, infos, résultats visuels,
 * navigation suivant/précédent, CTA retour portfolio.
 * Couleurs CameleonLab vert néon, support dark mode.
 */
export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  const projectIndex = useMemo(() => PROJECTS.findIndex((p) => p.slug === slug), [slug])
  const project = projectIndex >= 0 ? PROJECTS[projectIndex] : null

  const prevProject =
    projectIndex >= 0 ? PROJECTS[(projectIndex - 1 + PROJECTS.length) % PROJECTS.length] : null
  const nextProject =
    projectIndex >= 0 ? PROJECTS[(projectIndex + 1) % PROJECTS.length] : null

  const heroRef = useRef<HTMLElement>(null)
  const infoRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const metricValueRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  /**
   * @animation Animations GSAP au montage — hero fadeUp stagger, infos slide-in,
   * métriques countUp, navigation slide depuis bas.
   * @note Bails out si prefers-reduced-motion ou projet introuvable.
   */
  useEffect(() => {
    if (typeof window === "undefined") return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return
    if (!project) return

    const ctx = gsap.context(() => {
      /* A) Hero — fadeUp stagger (titre, meta, badge) */
      const heroEls = heroRef.current?.querySelectorAll(".hero-animate")
      if (heroEls) {
        gsap.fromTo(
          heroEls,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "expo.out", delay: 0.2 }
        )
      }

      /* B) Infos — fadeIn depuis la gauche (col gauche) et la droite (col droite) */
      if (infoRef.current) {
        const leftCol = infoRef.current.querySelector(".info-left")
        const rightCol = infoRef.current.querySelector(".info-right")
        if (leftCol) {
          gsap.fromTo(leftCol, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.9, ease: "expo.out", delay: 0.4 })
        }
        if (rightCol) {
          gsap.fromTo(rightCol, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.9, ease: "expo.out", delay: 0.5 })
        }
      }

      /* C) Métriques visuelles — countUp GSAP ScrollTrigger */
      metricValueRefs.current.forEach((el) => {
        if (!el) return
        const target = el.dataset.value || ""
        animateCountUp(el, target)
      })

      /* D) Navigation — slide depuis bas au scroll */
      if (navRef.current) {
        gsap.fromTo(
          navRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: navRef.current, start: "top 90%", once: true },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [project])

  /* ── État projet introuvable ── */
  if (!project) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center bg-[#060C0A]">
          <div className="text-center">
            <h1 className="mb-4 font-playfair text-3xl text-[#F0FAF4]">Projet introuvable</h1>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 font-bricolage text-sm font-semibold text-[#00E87A]"
            >
              <ArrowLeft className="h-4 w-4" />
              Tous les projets
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main>
        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  A) HERO PROJECT                                           */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <img src={project.image} alt={project.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#060C0A]/60" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12 md:px-10 md:pb-16 lg:pb-20">
            <span
              className="hero-animate mb-4 inline-block w-fit rounded-full border border-[#00E87A]/40 bg-[#060C0A]/60 px-4 py-1.5 font-bricolage text-[11px] font-semibold uppercase tracking-[0.15em] text-[#00E87A] backdrop-blur-sm"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              {project.category}
            </span>

            <h1
              className="hero-animate mb-6 max-w-3xl font-playfair font-black text-[#F0FAF4]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </h1>

            <div className="hero-animate flex flex-wrap items-center gap-4 md:gap-6">
              <span className="font-dm-mono text-sm font-medium text-[#F0FAF4]/80" style={{ fontFamily: "'DM Mono', monospace" }}>
                {project.client}
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-[#00E87A]/50 md:block" />
              <span className="font-dm-mono text-sm text-[#F0FAF4]/60" style={{ fontFamily: "'DM Mono', monospace" }}>
                {project.year}
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-[#00E87A]/50 md:block" />
              <span className="font-dm-mono text-sm text-[#F0FAF4]/60" style={{ fontFamily: "'DM Mono', monospace" }}>
                {project.duration}
              </span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  B) INFOS PROJET                                           */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section ref={infoRef} className="bg-[#F7FFF9] py-16 dark:bg-[#060C0A] md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
              {/* ── Col gauche : description + technologies ── */}
              <div className="info-left">
                <h2
                  className="mb-6 font-playfair text-2xl font-bold text-[#071510] dark:text-[#F0FAF4] md:text-3xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  À propos du projet
                </h2>
                <p className="mb-8 font-dm-sans text-base font-light leading-relaxed text-[#071510]/60 dark:text-[#F0FAF4]/60">
                  {project.fullDescription}
                </p>

                <div className="mb-6">
                  <h3
                    className="mb-3 font-bricolage text-xs font-semibold uppercase tracking-[0.2em] text-[#071510]/50 dark:text-[#F0FAF4]/50"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[#00E87A]/20 bg-white px-3 py-1 font-dm-sans text-xs font-medium text-[#00E87A] dark:border-[#00E87A]/20 dark:bg-[#071510]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Col droite : résultats chiffrés + métadonnées ── */}
              <div className="info-right">
                <h2
                  className="mb-6 font-playfair text-2xl font-bold text-[#071510] dark:text-[#F0FAF4] md:text-3xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Résultats
                </h2>

                <div className="mb-8 grid grid-cols-2 gap-4">
                  {project.results.map((r, i) => (
                    <div
                      key={r.label}
                      className="rounded-xl border border-[#00E87A]/10 bg-white p-5 transition-shadow duration-300 hover:shadow-lg dark:border-[#00E87A]/10 dark:bg-[#071510]"
                    >
                      <span
                        ref={(el) => (metricValueRefs.current[i] = el)}
                        data-value={r.value}
                        className="mb-1 block font-dm-mono text-2xl font-bold text-[#00E87A] md:text-3xl"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {r.value}
                      </span>
                      <span className="font-dm-sans text-[11px] font-medium uppercase tracking-wider text-[#071510]/50 dark:text-[#F0FAF4]/50">
                        {r.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 rounded-xl border border-[#00E87A]/10 bg-white p-6 dark:border-[#00E87A]/10 dark:bg-[#071510]">
                  <div className="flex justify-between border-b border-[#00E87A]/10 pb-3 dark:border-[#00E87A]/10">
                    <span className="font-dm-sans text-xs font-medium uppercase tracking-wider text-[#071510]/50 dark:text-[#F0FAF4]/50">
                      Client
                    </span>
                    <span className="font-dm-sans text-sm font-medium text-[#071510] dark:text-[#F0FAF4]">
                      {project.client}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#00E87A]/10 pb-3 dark:border-[#00E87A]/10">
                    <span className="font-dm-sans text-xs font-medium uppercase tracking-wider text-[#071510]/50 dark:text-[#F0FAF4]/50">
                      Année
                    </span>
                    <span className="font-dm-mono text-sm text-[#071510] dark:text-[#F0FAF4]" style={{ fontFamily: "'DM Mono', monospace" }}>
                      {project.year}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-dm-sans text-xs font-medium uppercase tracking-wider text-[#071510]/50 dark:text-[#F0FAF4]/50">
                      Durée
                    </span>
                    <span className="font-dm-mono text-sm text-[#071510] dark:text-[#F0FAF4]" style={{ fontFamily: "'DM Mono', monospace" }}>
                      {project.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  C) SECTION RÉSULTATS VISUELS                              */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="bg-[#F7FFF9] py-16 dark:bg-[#060C0A] md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <h2
              className="mb-12 text-center font-playfair text-2xl font-bold text-[#071510] dark:text-[#F0FAF4] md:text-3xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Impact mesurable
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.results.map((r, i) => (
                <div
                  key={r.label}
                  className="flex flex-col items-center rounded-xl border border-[#00E87A]/15 bg-white p-8 text-center transition-colors duration-300 hover:border-[#00E87A]/30 dark:bg-[#071510]"
                >
                  <span
                    ref={(el) => {
                      if (!metricValueRefs.current[i + 3]) metricValueRefs.current[i + 3] = el
                    }}
                    data-value={r.value}
                    className="mb-2 block font-dm-mono text-4xl font-bold text-[#00E87A] md:text-5xl"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {r.value}
                  </span>
                  <span className="font-dm-sans text-xs font-medium uppercase tracking-wider text-[#071510]/50 dark:text-[#F0FAF4]/50">
                    {r.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  D) NAVIGATION PROJET SUIVANT/PRÉCÉDENT                    */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section ref={navRef} className="bg-[#F7FFF9] py-16 dark:bg-[#060C0A] md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
              {prevProject && (
                <Link
                  to={`/portfolio/${prevProject.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-xl md:w-5/12"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={prevProject.image}
                      alt={prevProject.title}
                      className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#060C0A]/40" />
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <ArrowLeft className="h-4 w-4 text-[#00E87A] transition-transform duration-300 group-hover:-translate-x-1" />
                    <div>
                      <span className="block font-dm-sans text-[10px] font-medium uppercase tracking-wider text-[#071510]/50 dark:text-[#F0FAF4]/50">
                        Projet précédent
                      </span>
                      <span
                        className="font-playfair text-lg font-bold text-[#071510] transition-colors group-hover:text-[#00E87A] dark:text-[#F0FAF4]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {prevProject.title}
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {nextProject && (
                <Link
                  to={`/portfolio/${nextProject.slug}`}
                  className="group relative flex flex-col items-end overflow-hidden rounded-xl md:w-5/12"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <img
                      src={nextProject.image}
                      alt={nextProject.title}
                      className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#060C0A]/40" />
                  </div>
                  <div className="mt-4 flex items-center gap-3 text-right">
                    <div>
                      <span className="block font-dm-sans text-[10px] font-medium uppercase tracking-wider text-[#071510]/50 dark:text-[#F0FAF4]/50">
                        Projet suivant
                      </span>
                      <span
                        className="font-playfair text-lg font-bold text-[#071510] transition-colors group-hover:text-[#00E87A] dark:text-[#F0FAF4]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {nextProject.title}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#00E87A] transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/*  E) CTA RETOUR PORTFOLIO                                   */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section className="bg-[#F7FFF9] pb-16 text-center dark:bg-[#060C0A] md:pb-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 rounded-full bg-[#00E87A] px-8 py-3.5 font-bricolage text-sm font-semibold text-[#071510] transition-all duration-300 hover:bg-[#00c96a] hover:shadow-[0_8px_24px_rgba(0,232,122,0.3)]"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Voir tous les projets
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
