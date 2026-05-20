'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface Project {
  id: number
  image: string
  title: string
  description: string
  categories: string[]
  link: string
}

const PROJECTS: Project[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    title: 'Aura Finance',
    description:
      'Plateforme de gestion financière avec tableau de bord temps réel et visualisations de données avancées pour une expérience utilisateur premium.',
    categories: ['Web', 'Branding'],
    link: '#',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    title: 'Nomad Travel',
    description:
      'Application mobile immersive pour voyageurs avec cartographie interactive, réservations instantanées et storytelling visuel.',
    categories: ['Mobile', 'Branding'],
    link: '#',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1555421689-49263376da7a?w=800&q=80',
    title: 'Lumière Studio',
    description:
      'Site vitrine cinématographique pour un studio de production vidéo avec transitions WebGL et navigation expérimentale.',
    categories: ['Web', 'SEO'],
    link: '#',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    title: 'DataPulse',
    description:
      'SaaS analytics avec design system complet, intégration temps réel et interface no-code pour dashboards personnalisés.',
    categories: ['Web', 'Mobile'],
    link: '#',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    title: 'Élixir Brand',
    description:
      'Refonte identitaire complète incluant stratégie de marque, direction artistique et déclinaison digitale sur tous les points de contact.',
    categories: ['Branding', 'SEO'],
    link: '#',
  },
]

const FILTERS = ['Tous', 'Web', 'Mobile', 'Branding', 'SEO']

type CardPosition = 'active' | 'prev' | 'next' | 'hidden'

function getCardPosition(index: number, activeIndex: number, len: number): CardPosition {
  if (len <= 1) return 'active'

  const diff = ((index - activeIndex) % len + len) % len
  let dist = diff
  if (dist > len / 2) dist = diff - len

  if (dist === 0) return 'active'
  if (dist === 1 || dist === -(len - 1)) return 'next'
  if (dist === -1 || dist === len - 1) return 'prev'
  return 'hidden'
}

const variants = {
  active: {
    scale: 1,
    x: '0%',
    y: 0,
    rotateY: 0,
    opacity: 1,
  },
  prev: {
    scale: 0.9,
    x: '-14%',
    y: -8,
    rotateY: 10,
    opacity: 0.45,
  },
  next: {
    scale: 0.9,
    x: '14%',
    y: -8,
    rotateY: -10,
    opacity: 0.45,
  },
  hidden: {
    scale: 0.82,
    x: '0%',
    y: -20,
    rotateY: 0,
    opacity: 0,
  },
}

function WordReveal({ text }: { text: string }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            delay: i * 0.04,
            ease: [0.19, 1, 0.22, 1],
          }}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </>
  )
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const [activeIndex, setActiveIndex] = useState(0)
  const [filter, setFilter] = useState('Tous')

  const filteredProjects = useMemo(() => {
    if (filter === 'Tous') return PROJECTS
    return PROJECTS.filter((p) => p.categories.includes(filter))
  }, [filter])

  useEffect(() => {
    setActiveIndex(0)
  }, [filter])

  const currentProject = filteredProjects[activeIndex] || filteredProjects[0]

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length)
  }, [filteredProjects.length])

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)
  }, [filteredProjects.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev])

  // Autoplay
  useEffect(() => {
    if (filteredProjects.length <= 1) return
    const interval = setInterval(() => {
      goNext()
    }, 6000)
    return () => clearInterval(interval)
  }, [goNext, filteredProjects.length])

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative overflow-hidden bg-[#F7FFF9] dark:bg-[#060C0A] py-16 md:py-20 lg:py-24"
      aria-label="Portfolio"
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Floating gradient */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,232,122,0.05) 0%, transparent 60%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="mb-16 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end"
        >
          <div>
            <span className="mb-3 inline-block font-['Satoshi'] text-xs font-medium uppercase tracking-[0.25em] text-[#00E87A]/70">
              — Projets sélectionnés
            </span>
            <h2 className="font-['Outfit'] text-4xl font-bold text-[#071510] dark:text-[#F0FAF4] md:text-5xl lg:text-6xl">
              Nos <span className="text-glow text-[#00E87A]">réalisations</span>
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 font-['Satoshi'] text-sm font-medium text-[#071510]/80 dark:text-[#F0FAF4]/80 transition-colors hover:text-[#00E87A]"
          >
            Voir tout
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="mb-12 flex flex-wrap gap-3"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-5 py-2 font-['Satoshi'] text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                filter === f
                  ? 'border-[#00E87A]/50 bg-[#00E87A]/10 text-[#00E87A] shadow-[0_0_20px_rgba(0,232,122,0.1)]'
                  : 'border-[#00E87A]/10 text-[#071510]/80 dark:text-[#F0FAF4]/80 hover:border-[#00E87A]/30 hover:text-[#071510]/80 dark:text-[#F0FAF4]/80'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Content Split */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="relative mx-auto aspect-[4/3] w-full max-w-lg lg:max-w-none"
            style={{ perspective: '1200px' }}
          >
            {/* Depth shadow */}
            <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[#00E87A]/[0.03] blur-3xl" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#00E87A]/10" />

            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              {filteredProjects.map((project, idx) => {
                const position = getCardPosition(idx, activeIndex, filteredProjects.length)
                const zIndex =
                  position === 'active' ? 30 : position === 'prev' || position === 'next' ? 20 : 10
                const isActive = position === 'active'

                return (
                  <motion.div
                    key={project.id}
                    className="absolute inset-0 rounded-2xl"
                    initial={false}
                    animate={variants[position]}
                    transition={{
                      duration: 0.7,
                      ease: [0.19, 1, 0.32, 1],
                    }}
                    style={{ transformStyle: 'preserve-3d', zIndex }}
                  >
                    <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-white/82 dark:bg-[#071510] shadow-2xl shadow-black/20 dark:shadow-black/40 border border-white/10">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Bottom gradient overlay with project info */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071510]/80 via-[#071510]/20 to-transparent" />

                      {/* Active slide info overlay */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
                          >
                            <div className="flex flex-wrap gap-2 mb-3">
                              {project.categories.map((cat) => (
                                <span
                                  key={cat}
                                  className="rounded-full border border-[#00E87A]/30 bg-[#00E87A]/10 px-2.5 py-0.5 font-['Satoshi'] text-[10px] font-medium uppercase tracking-wider text-[#00E87A] backdrop-blur-sm"
                                >
                                  {cat}
                                </span>
                              ))}
                            </div>
                            <h4 className="font-['Outfit'] text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                              {project.title}
                            </h4>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Light reflection */}
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, transparent 100%)',
                        }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col justify-center"
          >
            {/* Slide counter */}
            <div className="mb-8 flex items-center gap-4">
              <span className="font-['Outfit'] text-5xl font-bold text-[#00E87A]/20 dark:text-[#00E87A]/15 md:text-6xl">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col">
                <span className="font-['Satoshi'] text-xs uppercase tracking-wider text-[#071510]/40 dark:text-[#F0FAF4]/40">
                  Projet
                </span>
                <span className="font-['Satoshi'] text-xs text-[#071510]/40 dark:text-[#F0FAF4]/40">
                  sur {String(filteredProjects.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${filter}-${activeIndex}`}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              >
                <div className="mb-5 flex flex-wrap gap-2">
                  {currentProject.categories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full border border-[#00E87A]/20 bg-[#00E87A]/5 px-3 py-1 font-['Satoshi'] text-[10px] font-medium uppercase tracking-wider text-[#00E87A]"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <h3 className="mb-5 font-['Outfit'] text-3xl font-bold text-[#071510] dark:text-[#F0FAF4] md:text-4xl lg:text-[2.75rem] leading-tight">
                  <WordReveal text={currentProject.title} />
                </h3>

                <p className="mb-10 font-['Satoshi'] text-base leading-relaxed text-[#071510]/75 dark:text-[#F0FAF4]/75 max-w-md">
                  <WordReveal text={currentProject.description} />
                </p>

                <a
                  href={currentProject.link}
                  className="group/link inline-flex items-center gap-3 rounded-full bg-[#00E87A] px-7 py-3.5 font-['Satoshi'] text-sm font-semibold text-[#071510] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,232,122,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Voir le projet</span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#071510]/10 transition-transform duration-300 group-hover/link:translate-x-0.5">
                    <ArrowRight className="h-3 w-3 text-[#071510]" />
                  </span>
                </a>
              </motion.div>
            </AnimatePresence>

            {/* Elegant separator */}
            <div className="my-10 h-px w-full bg-gradient-to-r from-[#00E87A]/20 via-[#00E87A]/10 to-transparent" />

            {/* Navigation */}
            <div className="flex items-center gap-5">
              <button
                onClick={goPrev}
                aria-label="Projet précédent"
                className="group/btn flex h-14 w-14 items-center justify-center rounded-full border border-[#00E87A]/20 bg-[#00E87A]/[0.02] transition-all duration-300 hover:border-[#00E87A]/50 hover:bg-[#00E87A]/5 hover:shadow-[0_0_24px_rgba(0,232,122,0.12)]"
              >
                <ArrowLeft className="h-5 w-5 text-[#071510]/80 dark:text-[#F0FAF4]/80 transition-colors group-hover/btn:text-[#00E87A]" />
              </button>
              <button
                onClick={goNext}
                aria-label="Projet suivant"
                className="group/btn flex h-14 w-14 items-center justify-center rounded-full border border-[#00E87A]/20 bg-[#00E87A]/[0.02] transition-all duration-300 hover:border-[#00E87A]/50 hover:bg-[#00E87A]/5 hover:shadow-[0_0_24px_rgba(0,232,122,0.12)]"
              >
                <ArrowRight className="h-5 w-5 text-[#071510]/80 dark:text-[#F0FAF4]/80 transition-colors group-hover/btn:text-[#00E87A]" />
              </button>

              <div className="ml-auto flex items-center gap-3">
                {filteredProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? 'h-2 w-8 bg-[#00E87A]'
                        : 'h-2 w-2 bg-[#071510]/15 dark:bg-[#F0FAF4]/15 hover:bg-[#071510]/30 dark:hover:bg-[#F0FAF4]/30'
                    }`}
                    aria-label={`Aller au projet ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
