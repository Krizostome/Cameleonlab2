'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { PROJECTS, type Project } from '../../data/projects'

/* ═══════════════════════════════════════════════════════════════════ */
/*  Data helpers                                                      */
/* ═══════════════════════════════════════════════════════════════════ */

const FEATURED = PROJECTS.find((p) => p.featured) ?? PROJECTS[0]
const SECONDARY = PROJECTS.filter((p) => p.id !== FEATURED.id).slice(0, 5)
const ONLINE_PROJECTS = [
  {
    id: 'online-1',
    name: 'PayFlow Africa',
    logo: '💳',
    description: 'Paiement mobile pour PME africaines',
    url: '#',
    color: '#00E87A',
  },
  {
    id: 'online-2',
    name: 'EduAfrique',
    logo: '🎓',
    description: 'Plateforme e-learning francophone',
    url: '#',
    color: '#8B5CF6',
  },
  {
    id: 'online-3',
    name: 'QuickDeli',
    logo: '🍔',
    description: 'Livraison à domicile Abidjan',
    url: '#',
    color: '#F59E0B',
  },
  {
    id: 'online-4',
    name: 'Clinique Santé Plus',
    logo: '🏥',
    description: 'Site vitrine médical Dakar',
    url: '#',
    color: '#EF4444',
  },
  {
    id: 'online-5',
    name: 'AgroGold',
    logo: '🌾',
    description: 'Export agro-industriel Bénin',
    url: '#',
    color: '#10B981',
  },
  {
    id: 'online-6',
    name: 'StockPro',
    logo: '📦',
    description: 'Gestion de stock hors-ligne',
    url: '#',
    color: '#3B82F6',
  },
]

/* ═══════════════════════════════════════════════════════════════════ */
/*  Custom hooks                                                      */
/* ═══════════════════════════════════════════════════════════════════ */

function useMouseTilt(ref: React.RefObject<HTMLElement | null>, intensity = 4) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springConfig = { stiffness: 120, damping: 20, mass: 0.5 }
  const rX = useSpring(rotateX, springConfig)
  const rY = useSpring(rotateY, springConfig)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      rotateY.set(x * intensity)
      rotateX.set(-y * intensity)
    }
    const onLeave = () => {
      rotateY.set(0)
      rotateX.set(0)
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref, intensity, rotateX, rotateY])

  return { rotateX: rX, rotateY: rY }
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Header                                                            */
/* ═══════════════════════════════════════════════════════════════════ */

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="relative z-10 mb-16 md:mb-24"
    >
      {/* Badge */}
      <motion.div variants={itemVariants} className="mb-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#00E87A]/20 bg-[#00E87A]/5 px-4 py-1.5 text-xs font-medium tracking-wide text-[#00E87A] backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00E87A] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00E87A]" />
          </span>
          Nos Réalisations
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        variants={itemVariants}
        className="mb-6 max-w-4xl font-['Outfit'] text-4xl font-bold leading-[1.1] tracking-tight text-[#071510] dark:text-[#F0FAF4] md:text-5xl lg:text-6xl"
      >
        Des projets qui transforment des{' '}
        <span className="text-glow text-[#00E87A]">idées</span> en expériences
        digitales
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="max-w-xl font-['Satoshi'] text-base font-light leading-relaxed text-[#374151] dark:text-[#9CA3AF] md:text-lg"
      >
        Nous créons des solutions numériques performantes qui répondent à des
        besoins réels.
      </motion.p>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Featured Project                                                  */
/* ═══════════════════════════════════════════════════════════════════ */

function FeaturedProject({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { rotateX, rotateY } = useMouseTilt(imageContainerRef, 6)

  // Floating animation values
  const floatY = useMotionValue(0)
  const floatX = useMotionValue(0)

  useEffect(() => {
    let raf: number
    let start: number | null = null
    const duration = 6000
    const animate = (t: number) => {
      if (!start) start = t
      const p = (t - start) / duration
      floatY.set(Math.sin(p * Math.PI * 2) * 8)
      floatX.set(Math.cos(p * Math.PI * 2) * 4)
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [floatX, floatY])

  const springFloatY = useSpring(floatY, { stiffness: 40, damping: 15 })
  const springFloatX = useSpring(floatX, { stiffness: 40, damping: 15 })

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      className="relative z-10 mb-20 md:mb-28"
    >
      {/* Subtle halo behind featured */}
      <div
        className="pointer-events-none absolute -left-[10%] -top-[10%] h-[80%] w-[50%] rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(0,232,122,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left column: info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col"
        >
          <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-[#00E87A]/20 bg-[#00E87A]/5 px-3 py-1 font-['Satoshi'] text-[10px] font-semibold uppercase tracking-widest text-[#00E87A]">
            {project.category}
          </span>

          <h3 className="mb-4 font-['Outfit'] text-3xl font-bold text-[#071510] dark:text-[#F0FAF4] md:text-4xl lg:text-5xl">
            {project.title}
          </h3>

          <p className="mb-6 max-w-md font-['Satoshi'] text-base leading-relaxed text-[#374151] dark:text-[#9CA3AF]">
            {project.fullDescription}
          </p>

          {/* Features */}
          <ul className="mb-6 space-y-2">
            {project.services?.slice(0, 4).map((svc) => (
              <li
                key={svc}
                className="flex items-center gap-2 font-['Satoshi'] text-sm text-[#071510]/80 dark:text-[#F0FAF4]/80"
              >
                <span className="h-1 w-1 rounded-full bg-[#00E87A]" />
                {svc}
              </li>
            ))}
          </ul>

          {/* Technologies */}
          <div className="mb-8 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-[#00E87A]/15 bg-[#00E87A]/5 px-2.5 py-1 font-['Satoshi'] text-[11px] font-medium text-[#00E87A]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="mb-8 flex gap-6">
            {project.results.map((r) => (
              <div key={r.label} className="flex flex-col">
                <span className="font-['Satoshi'] text-2xl font-bold text-[#00E87A]">
                  {r.value}
                </span>
                <span className="font-['Satoshi'] text-[10px] uppercase tracking-wider text-[#374151] dark:text-[#9CA3AF]">
                  {r.label}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={`/portfolio/${project.slug}`}
              className="group inline-flex items-center gap-2 rounded-full bg-[#00E87A] px-6 py-3 font-['Satoshi'] text-sm font-extrabold text-[#071510] transition-all hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(0,232,122,0.35)] active:scale-[0.98]"
            >
              Voir le projet
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to={`/portfolio/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#071510]/10 px-6 py-3 font-['Satoshi'] text-sm font-bold text-[#071510] transition-colors hover:bg-[#071510]/5 dark:border-[#F0FAF4]/10 dark:text-[#F0FAF4] dark:hover:bg-[#F0FAF4]/5"
            >
              Étude de cas
            </Link>
          </div>
        </motion.div>

        {/* Right column: mockups */}
        <motion.div
          ref={imageContainerRef}
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.19, 1, 0.22, 1] }}
          className="relative flex items-center justify-center"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              x: springFloatX,
              y: springFloatY,
              transformStyle: 'preserve-3d',
            }}
            className="relative w-full max-w-lg"
          >
            {/* Desktop mockup */}
            <div className="relative z-10 overflow-hidden rounded-2xl border border-[#00E87A]/10 bg-[#071510] shadow-[0_24px_80px_rgba(0,0,0,0.35)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
              <div className="flex items-center gap-1.5 border-b border-[#00E87A]/10 bg-[#0a1a14] px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="h-auto w-full object-cover transition-transform duration-[8s] ease-out hover:scale-105"
                  loading="eager"
                />
                {/* Subtle overlay gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060C0A]/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Mobile mockup floating */}
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-6 -right-4 z-20 w-28 overflow-hidden rounded-xl border border-[#00E87A]/15 bg-[#071510] shadow-[0_16px_48px_rgba(0,0,0,0.4)] md:-right-8 md:w-36"
              style={{ transform: 'translateZ(40px)' }}
            >
              <div className="flex items-center justify-center gap-1 border-b border-[#00E87A]/10 bg-[#0a1a14] py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00E87A]/40" />
              </div>
              <img
                src={project.image}
                alt={`${project.imageAlt} mobile`}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Decorative glow */}
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl bg-[#00E87A]/5 blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Bento Grid Card                                                   */
/* ═══════════════════════════════════════════════════════════════════ */

function BentoCard({
  project,
  index,
  className = '',
  isLarge = false,
}: {
  project: Project
  index: number
  className?: string
  isLarge?: boolean
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  const { rotateX, rotateY } = useMouseTilt(cardRef, 5)

  // Intersection observer for center focus
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFocused(entry.isIntersecting && entry.intersectionRatio > 0.6)
      },
      { threshold: [0.4, 0.6, 0.8] }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.19, 1, 0.22, 1],
      }}
      className={className}
    >
      <Link
        ref={cardRef}
        to={`/portfolio/${project.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#00E87A]/10 bg-[var(--bg-card)] transition-all duration-500 hover:border-[#00E87A]/30 hover:shadow-[0_8px_40px_rgba(0,232,122,0.12)]"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${isLarge ? 'h-56 sm:h-64 md:h-72 lg:h-80' : 'h-48 sm:h-52 md:h-56'}`}>
          <img
            src={project.image}
            alt={project.imageAlt}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060C0A]/90 via-[#060C0A]/20 to-transparent" />

          {/* Category badge */}
          <div className="absolute left-4 top-4">
            <span className="rounded-full border border-[#00E87A]/20 bg-[#060C0A]/50 px-3 py-1 font-['Satoshi'] text-[10px] font-semibold uppercase tracking-widest text-[#00E87A] backdrop-blur-sm">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative flex flex-1 flex-col p-5 md:p-6">
          <h4 className="mb-1.5 font-['Outfit'] text-lg font-bold text-[#071510] dark:text-[#F0FAF4] md:text-xl">
            {project.title}
          </h4>
          <p className="mb-3 line-clamp-2 font-['Satoshi'] text-sm leading-relaxed text-[#374151] dark:text-[#9CA3AF]">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-[#00E87A]/10 bg-[#00E87A]/5 px-2 py-0.5 font-['Satoshi'] text-[10px] font-medium text-[#00E87A]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Link */}
          <span className="mt-auto inline-flex items-center gap-1.5 font-['Satoshi'] text-xs font-semibold text-[#00E87A] transition-transform duration-300 group-hover:translate-x-1">
            Voir le projet <ArrowRight className="h-3 w-3" />
          </span>
        </div>

        {/* Glow border on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              boxShadow: 'inset 0 0 0 1px rgba(0,232,122,0.2), 0 0 30px rgba(0,232,122,0.08)',
            }}
          />
        </div>

        {/* Focus state (center screen) */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: isFocused
              ? '0 0 60px rgba(0,232,122,0.1), inset 0 0 0 1px rgba(0,232,122,0.15)'
              : '0 0 0px rgba(0,232,122,0)',
          }}
          transition={{ duration: 0.6 }}
        />
      </Link>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Bento Grid                                                        */
/* ═══════════════════════════════════════════════════════════════════ */

function BentoGrid({ projects }: { projects: Project[] }) {
  // Layout: 3 columns x 2 rows, all cards same height
  const p1 = projects[0]
  const p2 = projects[1]
  const p3 = projects[2]
  const p4 = projects[3]
  const p5 = projects[4]

  return (
    <div className="relative z-10 mb-24 md:mb-32">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {p1 && (
          <div>
            <BentoCard project={p1} index={0} className="h-full" isLarge />
          </div>
        )}
        {p2 && (
          <div>
            <BentoCard project={p2} index={1} className="h-full" />
          </div>
        )}
        {p3 && (
          <div>
            <BentoCard project={p3} index={2} className="h-full" />
          </div>
        )}
        {p4 && (
          <div>
            <BentoCard project={p4} index={3} className="h-full" />
          </div>
        )}
        {p5 && (
          <div>
            <BentoCard project={p5} index={4} className="h-full" />
          </div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Online Projects Row                                               */
/* ═══════════════════════════════════════════════════════════════════ */

function OnlineProjectsRow() {
  const rowRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rowRef, { once: true, margin: '-80px' })

  const items = useMemo(() => [...ONLINE_PROJECTS, ...ONLINE_PROJECTS], [])
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [scrollStart, setScrollStart] = useState(0)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!rowRef.current) return
    setIsDragging(true)
    setDragStart(e.clientX)
    setScrollStart(rowRef.current.scrollLeft)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !rowRef.current) return
      const dx = e.clientX - dragStart
      rowRef.current.scrollLeft = scrollStart - dx
    },
    [isDragging, dragStart, scrollStart]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    const el = rowRef.current
    if (!el) return
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }
    // Loop check after wheel
    if (el.scrollLeft >= el.scrollWidth / 2) {
      el.scrollLeft = 0
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft = el.scrollWidth / 2
    }
  }, [])

  // Touch support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!rowRef.current) return
    setIsDragging(true)
    setDragStart(e.touches[0].clientX)
    setScrollStart(rowRef.current.scrollLeft)
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || !rowRef.current) return
      const dx = e.touches[0].clientX - dragStart
      rowRef.current.scrollLeft = scrollStart - dx
    },
    [isDragging, dragStart, scrollStart]
  )

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Auto-scroll (very slow)
  useEffect(() => {
    const el = rowRef.current
    if (!el || isDragging) return
    let raf: number
    const speed = 0.4
    const step = () => {
      el.scrollLeft += speed
      // Loop when reaching half (duplicated content)
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [isDragging])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className="relative z-10"
    >
      <h3 className="mb-8 font-['Outfit'] text-2xl font-bold text-[#071510] dark:text-[#F0FAF4] md:text-3xl">
        Découvrir d'autres projets
      </h3>

      <div
        ref={rowRef}
        className="scrollbar-hide relative -mx-6 flex cursor-grab gap-5 overflow-x-auto px-6 py-4 active:cursor-grabbing md:-mx-10 md:px-10"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      >
        <div ref={innerRef} className="flex shrink-0 gap-5">
          {items.map((item, idx) => (
            <a
              key={`${item.id}-${idx}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-[280px] shrink-0 flex-col gap-4 rounded-2xl border border-[#00E87A]/10 bg-[var(--bg-card)] p-5 transition-all duration-500 hover:scale-[1.02] hover:border-[#00E87A]/25 hover:shadow-[0_0_30px_rgba(0,232,122,0.1)]"
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-elevated)] text-xl">
                    {item.logo}
                  </span>
                  <div>
                    <h4 className="font-['Satoshi'] text-sm font-bold text-[#071510] dark:text-[#F0FAF4]">
                      {item.name}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 font-['Satoshi'] text-[10px] font-medium text-[#00E87A]">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00E87A]" />
                      En ligne
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="font-['Satoshi'] text-xs leading-relaxed text-[#374151] dark:text-[#9CA3AF]">
                {item.description}
              </p>

              {/* CTA */}
              <span className="mt-auto inline-flex items-center gap-1.5 font-['Satoshi'] text-xs font-semibold text-[#00E87A] transition-transform duration-300 group-hover:translate-x-1">
                Visiter le site
                <ExternalLink className="h-3 w-3" />
              </span>

              {/* Hover glow border */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${item.color}33`,
                  }}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Main Section                                                      */
/* ═══════════════════════════════════════════════════════════════════ */

export default function NosRealisations() {
  return (
    <section
      id="realisations"
      className="relative overflow-hidden bg-[#F7FFF9] py-20 dark:bg-[#060C0A] md:py-28 lg:py-32"
      aria-label="Nos Réalisations"
    >
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  Background effects                                            */}
      {/* ═══════════════════════════════════════════════════════════════ */}

      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Subtle mesh glow */}
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(0,232,122,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full opacity-20 blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeader />
        <FeaturedProject project={FEATURED} />
        <BentoGrid projects={SECONDARY} />
        <OnlineProjectsRow />
      </div>
    </section>
  )
}
