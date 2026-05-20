'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Search, Palette, Cog, Rocket, ChevronDown, MousePointerClick, ChevronRight } from 'lucide-react'

interface ProcessStep {
  id: number
  icon: React.ElementType
  title: string
  description: string
  points: string[]
}

const STEPS: ProcessStep[] = [
  {
    id: 1,
    icon: Search,
    title: 'Découverte',
    description:
      "Nous plongeons au cœur de votre univers pour comprendre vos enjeux, votre audience et vos objectifs. Cette phase fondatrice garantit que chaque décision future s'appuie sur des données solides et une vision partagée.",
    points: [
      'Analyse approfondie de vos besoins',
      'Brief client stratégique',
      'Définition des objectifs et KPIs',
      'Étude concurrentielle et positionnement',
    ],
  },
  {
    id: 2,
    icon: Palette,
    title: 'Conception',
    description:
      "À partir des insights recueillis, nous élaborons l'architecture et le design de votre projet. Chaque pixel est pensé pour créer une expérience intuitive, esthétique et alignée avec votre identité de marque.",
    points: [
      'Wireframes et architecture UX',
      'Direction artistique et UI design',
      'Prototypage interactif haute fidélité',
      'Validation itérative avec le client',
    ],
  },
  {
    id: 3,
    icon: Cog,
    title: 'Développement',
    description:
      'Nous transformons les maquettes en code performant et scalable. Notre approche technique rigoureuse assure un produit robuste, sécurisé et optimisé pour tous les appareils.',
    points: [
      'Développement front-end & back-end',
      'Intégration CMS et APIs tierces',
      'Tests qualité et validation responsive',
      'Optimisation des performances Core Web Vitals',
    ],
  },
  {
    id: 4,
    icon: Rocket,
    title: 'Lancement',
    description:
      'Le grand jour arrive. Nous déployons votre projet avec précision et vous accompagnons dans la prise en main. Le suivi post-lancement assure une croissance continue.',
    points: [
      'Déploiement et mise en ligne sécurisée',
      'Formation et documentation complète',
      'Suivi post-lancement et analytics',
      'Itérations basées sur les retours utilisateurs',
    ],
  },
]

function getOrbitalPosition(index: number, radiusPercent: number) {
  const angle = (index * 90 - 90) * (Math.PI / 180)
  return {
    x: 50 + Math.cos(angle) * radiusPercent,
    y: 50 + Math.sin(angle) * radiusPercent,
  }
}

export default function Process() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const currentStep = STEPS[active]

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative overflow-hidden bg-[#F7FFF9] dark:bg-[#060C0A] py-16 md:py-20 lg:py-24"
      aria-label="Notre processus"
    >
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Radial halo */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(0,232,122,0.04) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="mb-6 text-center"
        >
          <span className="mb-3 inline-block font-['Satoshi'] text-xs font-medium uppercase tracking-[0.25em] text-[#00E87A]/70">
            — Notre méthode
          </span>
          <h2 className="font-['Outfit'] text-4xl font-bold text-[#071510] dark:text-[#F0FAF4] md:text-5xl lg:text-6xl">
            Comment on <span className="text-glow text-[#00E87A]">travaille</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          className="mx-auto mb-16 max-w-xl text-center font-['Satoshi'] text-base leading-relaxed text-[#071510]/80 dark:text-[#F0FAF4]/80 md:mb-20"
        >
          Un processus simple, clair et efficace.
        </motion.p>

        {/* Hint text for desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 hidden items-center justify-center gap-2 text-center lg:flex"
        >
          <MousePointerClick className="h-4 w-4 text-[#00E87A]/60" />
          <span className="font-['Satoshi'] text-xs text-[#071510]/40 dark:text-[#F0FAF4]/40">
            Cliquez sur une étape pour explorer
          </span>
        </motion.div>

        {/* ─── DESKTOP : Circle + Content ─── */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left: Orbital Circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="relative mx-auto aspect-square w-full max-w-[480px]"
          >
            {/* Rotating dashed ring */}
            <div
              className="absolute inset-[8%] rounded-full border border-dashed border-[#00E87A]/15"
              style={{ animation: 'spin 35s linear infinite' }}
            />

            {/* Static subtle ring */}
            <div className="absolute inset-[8%] rounded-full border border-[#00E87A]/8" />

            {/* Center number */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.06, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="pointer-events-none select-none font-['Outfit'] text-[10rem] font-bold text-[#00E87A] md:text-[12rem]"
                >
                  0{active + 1}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* ─── Orbital icons — circle + label séparés pour un centrage parfait ─── */}
            {STEPS.map((step, i) => {
              const pos = getOrbitalPosition(i, 40)
              const isActive = i === active
              const Icon = step.icon

              return (
                <div
                  key={step.id}
                  className="absolute"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Bouton icône — centré exactement sur le point orbital */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + i * 0.1,
                      ease: [0.19, 1, 0.22, 1],
                    }}
                    onClick={() => setActive(i)}
                    className="flex cursor-pointer items-center justify-center rounded-full border transition-all duration-500 hover:scale-105"
                    style={{
                      width: '72px',
                      height: '72px',
                      borderColor: isActive ? 'rgba(0,232,122,0.6)' : 'rgba(0,232,122,0.15)',
                      backgroundColor: isActive ? 'rgba(0,232,122,0.12)' : 'rgba(0,232,122,0.03)',
                      boxShadow: isActive
                        ? '0 0 30px rgba(0,232,122,0.25), 0 0 60px rgba(0,232,122,0.1)'
                        : 'none',
                    }}
                    aria-label={`Étape ${step.id} : ${step.title}`}
                  >
                    <Icon
                      className={`h-6 w-6 transition-colors duration-300 ${isActive ? 'text-[#00E87A]' : 'text-[#071510]/80 dark:text-[#F0FAF4]/80'}`}
                    />
                  </motion.button>

                  {/* Label — positionné en dessous du cercle, centré horizontalement */}
                  <span
                    className={`absolute left-1/2 mt-2.5 block -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-0.5 font-['Satoshi'] text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? 'bg-[#00E87A]/15 text-[#00E87A] opacity-100'
                        : 'text-[#071510]/80 opacity-80 dark:text-[#F0FAF4]/80'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              )
            })}

            {/* ─── Flèches directionnelles entre les étapes (sens horaire) ─── */}
            {[0, 1, 2, 3].map((arrowIndex) => {
              /* Calcul de l'angle médian entre deux icônes consécutives */
              const midAngle = (arrowIndex * 90 - 45) * (Math.PI / 180)
              const x = 50 + Math.cos(midAngle) * 40
              const y = 50 + Math.sin(midAngle) * 40
              /* Rotation pour que la flèche suive la tangente du cercle */
              const rotation = arrowIndex * 90 - 45 + 90
              const isNextArrow = arrowIndex === active

              return (
                <div
                  key={`arrow-${arrowIndex}`}
                  className="pointer-events-none absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <ChevronRight
                    className={`h-3.5 w-3.5 transition-all duration-500 ${isNextArrow ? 'text-[#00E87A]' : 'text-[#00E87A]/20'}`}
                    style={{ transform: `rotate(${rotation}deg)` }}
                  />
                </div>
              )
            })}
          </motion.div>

          {/* Right: Content Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="relative"
          >
            {/* Large background number */}
            <div className="pointer-events-none absolute -right-6 -top-16 select-none font-['Outfit'] text-[12rem] font-bold leading-none text-[#00E87A] opacity-[0.04] md:text-[16rem]">
              0{active + 1}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              >
                <div className="mb-4 inline-flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#00E87A]/30 bg-[#00E87A]/10">
                    <currentStep.icon className="h-4 w-4 text-[#00E87A]" />
                  </span>
                  <span className="font-['Satoshi'] text-xs font-medium uppercase tracking-[0.2em] text-[#00E87A]/70">
                    Étape 0{active + 1}
                  </span>
                </div>

                <h3 className="mb-5 font-['Outfit'] text-3xl font-bold text-[#071510] dark:text-[#F0FAF4] md:text-4xl">
                  {currentStep.title}
                </h3>

                <p className="mb-8 font-['Satoshi'] text-base leading-relaxed text-[#071510]/75 dark:text-[#F0FAF4]/75">
                  {currentStep.description}
                </p>

                <ul className="space-y-3">
                  {currentStep.points.map((point, idx) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: idx * 0.06,
                        ease: [0.19, 1, 0.22, 1],
                      }}
                      className="flex items-start gap-3 font-['Satoshi'] text-sm text-[#071510]/80 dark:text-[#F0FAF4]/80"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00E87A]/70" />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* Step dots */}
            <div className="mt-12 flex gap-3">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active
                      ? 'w-8 bg-[#00E87A]'
                      : 'w-2 bg-[#071510]/15 dark:bg-[#F0FAF4]/15 hover:bg-[#071510]/30 dark:bg-[#F0FAF4]/30'
                  }`}
                  aria-label={`Aller à l'étape ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── MOBILE : Vertical Timeline Accordion ─── */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent" />

            <div className="space-y-4">
              {STEPS.map((step, i) => {
                const isActive = i === active
                const Icon = step.icon

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + i * 0.1,
                      ease: [0.19, 1, 0.22, 1],
                    }}
                  >
                    <button
                      onClick={() => setActive(isActive ? -1 : i)}
                      className="relative z-10 flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 md:p-5"
                      style={{
                        borderColor: isActive
                          ? 'rgba(0,232,122,0.25)'
                          : 'rgba(0,232,122,0.08)',
                        backgroundColor: isActive
                          ? 'rgba(0,232,122,0.05)'
                          : 'transparent',
                      }}
                    >
                      {/* Icon circle */}
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300"
                        style={{
                          borderColor: isActive
                            ? 'rgba(0,232,122,0.5)'
                            : 'rgba(0,232,122,0.2)',
                          backgroundColor: isActive
                            ? 'rgba(0,232,122,0.12)'
                            : 'rgba(0,232,122,0.03)',
                        }}
                      >
                        <Icon
                          className={`h-4 w-4 transition-colors duration-300 ${isActive ? 'text-[#00E87A]' : 'text-[#071510]/80 dark:text-[#F0FAF4]/80'}`}
                        />
                      </span>

                      {/* Title & number */}
                      <div className="flex-1">
                        <span className="block font-['Satoshi'] text-[10px] font-medium uppercase tracking-wider text-[#00E87A]/60">
                          Étape 0{step.id}
                        </span>
                        <span className="block font-['Outfit'] text-lg font-semibold text-[#071510] dark:text-[#F0FAF4]">
                          {step.title}
                        </span>
                      </div>

                      {/* Chevron */}
                      <ChevronDown
                        className="h-4 w-4 shrink-0 text-[#071510]/40 dark:text-[#F0FAF4]/40 transition-transform duration-300"
                        style={{
                          transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </button>

                    {/* Expandable content */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.19, 1, 0.32, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-2 pt-3 md:px-5">
                            <p className="mb-5 font-['Satoshi'] text-sm leading-relaxed text-[#071510]/75 dark:text-[#F0FAF4]/75">
                              {step.description}
                            </p>
                            <ul className="space-y-2.5">
                              {step.points.map((point) => (
                                <li
                                  key={point}
                                  className="flex items-start gap-3 font-['Satoshi'] text-sm text-[#071510]/80 dark:text-[#F0FAF4]/80"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00E87A]/60" />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
