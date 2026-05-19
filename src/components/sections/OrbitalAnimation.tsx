import { useEffect, useMemo, useState } from 'react'

/* ───────────────────────────────────────────────────────────────────── */
/*  Types                                                                */
/* ───────────────────────────────────────────────────────────────────── */

interface OrbitNode {
  name: string
  iconPath: string
}

interface OrbitConfig {
  radius: number
  nodes: OrbitNode[]
  duration: number
  direction: 'cw' | 'ccw'
}

/* ───────────────────────────────────────────────────────────────────── */
/*  Data — icons loaded from public/images/                              */
/* ───────────────────────────────────────────────────────────────────── */

const ORBITS: OrbitConfig[] = [
  {
    radius: 105,
    duration: 20,
    direction: 'cw',
    nodes: [
      { name: 'React', iconPath: '/images/React.svg' },
      { name: 'Node.js', iconPath: '/images/Node.js.svg' },
      { name: 'TypeScript', iconPath: '/images/TypeScript.svg' },
      { name: 'Git', iconPath: '/images/Git.svg' },
      { name: 'Figma', iconPath: '/images/Figma.svg' },
    ],
  },
  {
    radius: 158,
    duration: 30,
    direction: 'ccw',
    nodes: [
      { name: 'Next.js', iconPath: '/images/Next.js.svg' },
      { name: 'Laravel', iconPath: '/images/Laravel.svg' },
      { name: 'Docker', iconPath: '/images/Docker.svg' },
      { name: 'Vue.js', iconPath: '/images/Vue.js.svg' },
      { name: 'MongoDB', iconPath: '/images/MongoDB.svg' },
    ],
  },
  {
    radius: 215,
    duration: 45,
    direction: 'cw',
    nodes: [
      { name: 'PostgreSQL', iconPath: '/images/PostgresSQL.svg' },
      { name: 'MySQL', iconPath: '/images/MySQL.svg' },
      { name: 'Vercel', iconPath: '/images/Vercel.svg' },
      { name: 'Firebase', iconPath: '/images/Firebase.svg' },
      { name: 'Flutter', iconPath: '/images/Flutter.svg' },
    ],
  },
]

/* ───────────────────────────────────────────────────────────────────── */
/*  Helpers                                                              */
/* ───────────────────────────────────────────────────────────────────── */

function useWindowWidth() {
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return width
}

function getResponsiveRadius(base: number, width: number) {
  if (width < 640) return Math.round(base * 0.48)
  if (width < 768) return Math.round(base * 0.6)
  if (width < 1024) return Math.round(base * 0.75)
  if (width < 1280) return Math.round(base * 0.88)
  return base
}

/* ───────────────────────────────────────────────────────────────────── */
/*  Component                                                            */
/* ───────────────────────────────────────────────────────────────────── */

export default function OrbitalAnimation() {
  const width = useWindowWidth()
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const orbits = useMemo(() => {
    return ORBITS.map((o) => ({
      ...o,
      radius: reducedMotion ? 0 : getResponsiveRadius(o.radius, width),
    }))
  }, [width, reducedMotion])

  const containerSize = useMemo(() => {
    if (width < 640) return 300
    if (width < 768) return 360
    if (width < 1024) return 420
    if (width < 1280) return 500
    return 560
  }, [width])

  return (
    <div
      className="relative mx-auto select-none"
      style={{
        width: containerSize,
        height: containerSize,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Technologies utilisées par CameleonLab"
      role="img"
    >
      {/* ── Anneaux ── */}
      {orbits.map((orbit, orbitIdx) => {
        const spinClass = orbit.direction === 'cw' ? 'orbit-spin-cw' : 'orbit-spin-ccw'

        return (
          <div
            key={orbitIdx}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: orbit.radius * 2,
              height: orbit.radius * 2,
              marginLeft: -orbit.radius,
              marginTop: -orbit.radius,
              border: '1px solid rgba(0,232,122,0.08)',
              boxShadow: '0 0 20px rgba(0,232,122,0.03), inset 0 0 20px rgba(0,232,122,0.02)',
              animation: reducedMotion
                ? 'none'
                : `${spinClass} ${orbit.duration}s linear infinite`,
              animationPlayState: paused ? 'paused' : 'running',
              willChange: 'transform',
            }}
          >
            {orbit.nodes.map((node, nodeIdx) => {
              const angle = (360 / orbit.nodes.length) * nodeIdx
              const counterSpinClass = orbit.direction === 'cw' ? 'orbit-spin-ccw' : 'orbit-spin-cw'

              return (
                <div
                  key={nodeIdx}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `rotate(${angle}deg) translateX(${orbit.radius}px)`,
                    willChange: 'transform',
                  }}
                >
                  <div
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                      animation: reducedMotion
                        ? 'none'
                        : `${counterSpinClass} ${orbit.duration}s linear infinite`,
                      animationPlayState: paused ? 'paused' : 'running',
                      willChange: 'transform',
                    }}
                  >
                    <div
                      className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/70 shadow-sm backdrop-blur-md transition-all duration-300 ease-out hover:scale-125 hover:border-[#00E87A]/40 hover:bg-white hover:shadow-[0_0_24px_rgba(0,232,122,0.25)] dark:border-white/5 dark:bg-[#071510]/70 dark:hover:bg-[#071510] dark:hover:shadow-[0_0_24px_rgba(0,232,122,0.35)] sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-14 lg:w-14"
                      title={node.name}
                      role="img"
                      aria-label={node.name}
                    >
                      <div className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          background: 'radial-gradient(circle, rgba(0,232,122,0.15) 0%, transparent 70%)',
                        }}
                      />
                      <div className="relative z-10 flex h-full w-full items-center justify-center p-1.5 sm:p-2">
                        <img
                          src={node.iconPath}
                          alt={node.name}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}

      {/* ── Logo centre ── */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#00E87A]/20 bg-white/80 shadow-[0_0_30px_rgba(0,232,122,0.1)] backdrop-blur-md transition-transform duration-500 hover:scale-105 dark:bg-[#071510]/80 md:h-20 md:w-20 lg:h-[88px] lg:w-[88px]">
          <img
            src="/logo-cameleon.png"
            alt="CameleonLab"
            width={80}
            height={80}
            className="h-10 w-10 object-contain md:h-12 md:w-12 lg:h-14 lg:w-14"
            loading="eager"
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 hover:opacity-100"
            style={{
              boxShadow: '0 0 40px rgba(0,232,122,0.2), inset 0 0 20px rgba(0,232,122,0.05)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
