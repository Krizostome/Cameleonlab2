import { useCallback, useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { ArrowUpRight } from 'lucide-react'

/* ───────────────────────────────────────────────────────────────────── */
/*  Data — icons are loaded from public/images/                          */
/* ───────────────────────────────────────────────────────────────────── */

interface TechItem {
  name: string
  description: string
  iconPath: string | null
  iconSizeClass: string
  color: string
}

const TECHS: TechItem[] = [
  {
    name: 'React',
    description:
      "Développement d'interfaces utilisateur dynamiques, performantes et réactives avec une architecture moderne orientée composants.",
    iconPath: '/images/React.svg',
    iconSizeClass: 'w-9 h-9',
    color: '#61DAFB',
  },
  {
    name: 'Laravel',
    description:
      "Création d'applications web robustes, sécurisées et évolutives avec une architecture backend moderne et élégante.",
    iconPath: '/images/Laravel.svg',
    iconSizeClass: 'w-9 h-9',
    color: '#FF2D20',
  },
  {
    name: 'TypeScript',
    description:
      "Code typé, maintenable et sans erreurs en production pour des projets d'envergure avec une qualité enterprise.",
    iconPath: '/images/TypeScript.svg',
    iconSizeClass: 'w-10 h-10',
    color: '#3178C6',
  },
  {
    name: 'JavaScript',
    description:
      "Langage fondamental du web moderne pour des applications interactives riches, rapides et compatibles universellement.",
    iconPath: '/images/JavaScript.svg',
    iconSizeClass: 'w-10 h-10',
    color: '#F7DF1E',
  },
  {
    name: 'Next.js',
    description:
      'React full-stack avec rendu hybride SSR/SSG, performances optimales et architecture orientée production.',
    iconPath: '/images/Next.js.svg',
    iconSizeClass: 'w-10 h-10',
    color: '#F0FAF4',
  },
  {
    name: 'Node.js',
    description:
      'APIs rapides et temps réel côté serveur avec un écosystème mature et une scalabilité horizontale éprouvée.',
    iconPath: '/images/Node.js.svg',
    iconSizeClass: 'w-10 h-10',
    color: '#339933',
  },
  {
    name: 'Vue.js',
    description:
      'Framework progressif et accessible pour des interfaces réactives, légères et facilement intégrables dans n\'importe quel projet.',
    iconPath: '/images/Vue.js.svg',
    iconSizeClass: 'w-10 h-10',
    color: '#42B883',
  },
  {
    name: 'Docker',
    description:
      'Conteneurisation des applications pour faciliter le déploiement, assurer une isolation parfaite et garantir la scalabilité.',
    iconPath: '/images/Docker.svg',
    iconSizeClass: 'w-11 h-11',
    color: '#2496ED',
  },
  {
    name: 'PostgreSQL',
    description:
      'Base de données relationnelle avancée, fiable et open-source idéale pour les applications complexes et exigeantes.',
    iconPath: '/images/PostgresSQL.svg',
    iconSizeClass: 'w-10 h-10',
    color: '#4169E1',
  },
  {
    name: 'MySQL',
    description:
      'Solution relationnelle éprouvée pour vos données structurées, avec une performance optimale et une fiabilité reconnue.',
    iconPath: '/images/MySQL.svg',
    iconSizeClass: 'w-10 h-10',
    color: '#00758F',
  },
  {
    name: 'MongoDB',
    description:
      'Flexibilité des données avec la base NoSQL documentaire leader, parfaite pour les architectures modernes et agiles.',
    iconPath: '/images/MongoDB.svg',
    iconSizeClass: 'w-9 h-9',
    color: '#47A248',
  },
  {
    name: 'Vercel',
    description:
      'Déploiement instantané, previews automatiques et edge network global pour des performances web optimales.',
    iconPath: '/images/Vercel.svg',
    iconSizeClass: 'w-11 h-11',
    color: '#F0FAF4',
  },
  {
    name: 'Git',
    description:
      'Versioning professionnel, collaboration fluide en équipe et traçabilité complète de chaque évolution du projet.',
    iconPath: '/images/Git.svg',
    iconSizeClass: 'w-10 h-10',
    color: '#F05032',
  },
  {
    name: 'Figma',
    description:
      'Design collaboratif en temps réel, prototypes interactifs et systèmes de design cohérents de bout en bout.',
    iconPath: '/images/Figma.svg',
    iconSizeClass: 'w-9 h-9',
    color: '#F24E1E',
  },
  {
    name: 'Flutter',
    description:
      'Applications mobiles cross-platform avec un seul codebase, performances natives et interfaces fluides sur iOS et Android.',
    iconPath: '/images/Flutter.svg',
    iconSizeClass: 'w-9 h-9',
    color: '#02569B',
  },
  {
    name: 'Firebase',
    description:
      'Backend as a service avec authentification, base de données temps réel, stockage et hosting pour un développement rapide.',
    iconPath: '/images/Firebase.svg',
    iconSizeClass: 'w-10 h-10',
    color: '#FFCA28',
  },
  {
    name: 'Python',
    description:
      'Langage polyvalent pour l\'IA, le data engineering et les backends robustes avec une syntaxe claire et un écosystème riche.',
    iconPath: '/images/Python.svg',
    iconSizeClass: 'w-10 h-10',
    color: '#3776AB',
  },
  {
    name: 'WordPress',
    description:
      'CMS leader mondial pour des sites vitrines, blogs et e-commerce personnalisables avec des milliers d\'extensions.',
    iconPath: '/images/WordPress.svg',
    iconSizeClass: 'w-10 h-10',
    color: '#21759B',
  },
]

/* ───────────────────────────────────────────────────────────────────── */
/*  Card Component                                                       */
/* ───────────────────────────────────────────────────────────────────── */

function TechCard({
  tech,
  index,
  isCenter,
}: {
  tech: TechItem
  index: number
  isCenter: boolean
}) {
  const { iconPath, iconSizeClass, color, name, description } = tech

  return (
    <div
      className={[
        'group relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[28px] border p-7 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] sm:p-8',
        'border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] shadow-[0_8px_32px_rgba(0,0,0,0.06)]',
        'dark:border-white/5 dark:from-white/[0.05] dark:to-transparent',
        'hover:-translate-y-2 hover:scale-[1.02] hover:border-[#00E87A]/25 hover:shadow-[0_20px_60px_rgba(0,232,122,0.10)] dark:hover:shadow-[0_20px_60px_rgba(0,232,122,0.14)]',
        isCenter
          ? 'scale-[1.04] border-[#00E87A]/15 shadow-[0_12px_40px_rgba(0,232,122,0.08)] dark:shadow-[0_12px_40px_rgba(0,232,122,0.10)]'
          : 'opacity-80 hover:opacity-100',
        'float-card',
      ].join(' ')}
      style={{
        width: 'clamp(260px, 70vw, 320px)',
        height: 'clamp(380px, 55vh, 440px)',
        animationDelay: `${index * 0.55}s`,
      }}
    >
      {/* Glow radial discret derrière le logo */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full opacity-20 blur-[50px] transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
      />

      {/* Logo */}
      <div className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/60 shadow-sm backdrop-blur-md transition-transform duration-500 group-hover:scale-110 dark:border-white/5 dark:bg-[#071510]/60 sm:h-16 sm:w-16">
        {iconPath ? (
          <img
            src={iconPath}
            alt={name}
            className={`${iconSizeClass} object-contain`}
            loading="lazy"
          />
        ) : (
          <span className="font-['Outfit'] text-lg font-bold text-[#00E87A]">
            {name.charAt(0)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col">
        <h3 className="mb-2 font-['Outfit'] text-xl font-bold text-[#071510] dark:text-[#F0FAF4] sm:text-2xl">
          {name}
        </h3>
        <p className="mb-6 font-['Satoshi'] text-sm leading-relaxed text-[#374151] dark:text-[#9CA3AF]">
          {description}
        </p>

        <button className="group/btn inline-flex w-fit items-center gap-1.5 rounded-full border border-[#00E87A]/20 bg-[#00E87A]/5 px-4 py-2 text-xs font-semibold text-[#00E87A] transition-all duration-300 hover:bg-[#00E87A]/10 hover:pr-5">
          En savoir plus
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>
      </div>

      {/* Bordure glow animée au hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px ${color}20, 0 0 40px ${color}10`,
        }}
      />
    </div>
  )
}

/* ───────────────────────────────────────────────────────────────────── */
/*  Infinite Marquee Hook                                                */
/* ───────────────────────────────────────────────────────────────────── */

function useInfiniteMarquee(itemCount: number) {
  const trackRef = useRef<HTMLDivElement>(null)
  const setRef = useRef<HTMLDivElement>(null)
  const pos = useRef(0)
  const speed = useRef(0.35)
  const targetSpeed = useRef(0.35)
  const isDragging = useRef(false)
  const lastX = useRef(0)
  const setWidth = useRef(0)
  const rafId = useRef<number | null>(null)
  const interactionTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [centerIndex, setCenterIndex] = useState(-1)

  const setInteracting = useCallback(() => {
    targetSpeed.current = 0.08
    if (interactionTimer.current) clearTimeout(interactionTimer.current)
    interactionTimer.current = setTimeout(() => {
      targetSpeed.current = 0.35
    }, 900)
  }, [])

  /* ── Compute card closest to center ── */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const computeCenter = () => {
      const cards = track.querySelectorAll<HTMLElement>('.tech-card')
      if (!cards.length) return
      const centerX = window.innerWidth / 2
      let closestIdx = 0
      let closestDist = Infinity
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect()
        const cardCenter = rect.left + rect.width / 2
        const dist = Math.abs(cardCenter - centerX)
        if (dist < closestDist) {
          closestDist = dist
          closestIdx = i % itemCount
        }
      })
      setCenterIndex(closestIdx)
    }

    const rafLoop = () => {
      computeCenter()
      requestAnimationFrame(rafLoop)
    }
    const id = requestAnimationFrame(rafLoop)
    return () => cancelAnimationFrame(id)
  }, [itemCount])

  useEffect(() => {
    const track = trackRef.current
    const setEl = setRef.current
    if (!track || !setEl) return

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const updateWidth = () => {
      setWidth.current = setEl.scrollWidth
    }
    updateWidth()

    const resizeObs = new ResizeObserver(updateWidth)
    resizeObs.observe(setEl)

    const animate = () => {
      speed.current = lerp(speed.current, targetSpeed.current, 0.04)
      pos.current -= speed.current

      const w = setWidth.current
      if (w > 0) {
        if (pos.current <= -w) pos.current += w
        else if (pos.current > 0) pos.current -= w
      }

      track.style.transform = `translate3d(${pos.current}px, 0, 0)`
      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)

    /* ── Drag / Touch ── */
    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true
      lastX.current = e.clientX
      track.style.cursor = 'grabbing'
      setInteracting()
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return
      const dx = e.clientX - lastX.current
      pos.current += dx * 1.6
      lastX.current = e.clientX
      setInteracting()
    }
    const onPointerUp = () => {
      isDragging.current = false
      track.style.cursor = 'grab'
    }

    /* ── Wheel ── */
    const onWheel = (e: WheelEvent) => {
      pos.current -= e.deltaY * 0.6
      setInteracting()
    }

    track.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    track.addEventListener('wheel', onWheel, { passive: true })

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      track.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      track.removeEventListener('wheel', onWheel)
      resizeObs.disconnect()
      if (interactionTimer.current) clearTimeout(interactionTimer.current)
    }
  }, [itemCount, setInteracting])

  return { trackRef, setRef, centerIndex }
}

/* ───────────────────────────────────────────────────────────────────── */
/*  Section                                                              */
/* ───────────────────────────────────────────────────────────────────── */

export default function TechExpertise() {
  const sectionRef = useScrollReveal<HTMLElement>({
    y: 30,
    duration: 0.7,
    stagger: 0.1,
    start: 'top 88%',
  })

  const { trackRef, setRef, centerIndex } = useInfiniteMarquee(TECHS.length)

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F7FFF9] py-24 dark:bg-[#060C0A] md:py-32"
      aria-label="Technologies et expertises"
    >
      {/* ── Halo background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04] blur-[120px]"
          style={{ background: 'radial-gradient(circle, #00E87A, transparent 70%)' }}
        />
      </div>

      {/* ── Grain overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* ── Header ── */}
      <div className="relative z-10 mx-auto mb-16 max-w-7xl px-6 text-center md:px-10" data-reveal>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00E87A]/15 bg-[#00E87A]/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-[#00E87A]">
          Notre stack
        </div>
        <h2 className="mb-4 font-['Outfit'] text-3xl font-bold text-[#071510] dark:text-[#F0FAF4] sm:text-4xl md:text-5xl">
          Technologies & Expertises
        </h2>
        <p className="mx-auto max-w-xl font-['Satoshi'] text-base font-light text-[#374151] dark:text-[#9CA3AF] md:text-lg">
          Un écosystème technologique moderne et cohérent pour donner vie à vos projets les plus ambitieux.
        </p>
      </div>

      {/* ── Marquee ── */}
      <div className="relative z-10" data-reveal>
        {/* Fade masks left / right */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#F7FFF9] to-transparent dark:from-[#060C0A] sm:w-24 md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#F7FFF9] to-transparent dark:from-[#060C0A] sm:w-24 md:w-32" />

        <div className="overflow-hidden py-4">
          <div
            ref={trackRef}
            className="flex cursor-grab select-none"
            style={{ willChange: 'transform' }}
          >
            {/* First set */}
            <div ref={setRef} className="flex gap-5 px-3 sm:gap-6 sm:px-4">
              {TECHS.map((tech, i) => (
                <div key={`a-${tech.name}`} className="tech-card">
                  <TechCard tech={tech} index={i} isCenter={i === centerIndex} />
                </div>
              ))}
            </div>
            {/* Second set (duplicate for seamless loop) */}
            <div className="flex gap-5 px-3 sm:gap-6 sm:px-4">
              {TECHS.map((tech, i) => (
                <div key={`b-${tech.name}`} className="tech-card">
                  <TechCard tech={tech} index={i + TECHS.length} isCenter={i === centerIndex} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
