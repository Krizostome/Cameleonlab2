'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════════ */
/*  Animation variants                                               */
/* ═══════════════════════════════════════════════════════════════════ */

const bezierEasing = [0.19, 1, 0.22, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: bezierEasing },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Section Header                                                   */
/* ═══════════════════════════════════════════════════════════════════ */

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="relative z-10 mb-20 text-center md:mb-28"
    >
      <motion.div variants={fadeUp} className="mb-6 inline-flex">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#00E87A]/20 bg-[#00E87A]/5 px-4 py-1.5 font-['Satoshi'] text-xs font-medium tracking-wide text-[#00E87A]">
          <span className="text-sm leading-none">+</span>
          Nos Réalisations
        </span>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="mx-auto mb-6 max-w-4xl font-['Outfit'] text-4xl font-bold leading-[1.1] tracking-tight text-[#071510] dark:text-[#F0FAF4] md:text-5xl lg:text-6xl"
      >
        Des projets concrets qui font la différence pour nos{' '}
        <span className="text-glow text-[#00E87A]">clients</span>
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mx-auto max-w-2xl font-['Satoshi'] text-base font-light leading-relaxed text-[#374151] dark:text-[#9CA3AF] md:text-lg"
      >
        Nous créons des solutions numériques performantes qui répondent à des
        besoins réels.
      </motion.p>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Featured Project                                                 */
/* ═══════════════════════════════════════════════════════════════════ */

function FeaturedProject() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      className="relative z-10 mb-16 md:mb-24"
    >
      <div className="group relative overflow-hidden rounded-[2rem] border border-[#00E87A]/8 bg-white/60 backdrop-blur-xl transition-all duration-700 hover:border-[#00E87A]/18 hover:shadow-[0_24px_80px_rgba(0,0,0,0.08)] dark:bg-white/[0.03] dark:hover:shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
        <div className="grid grid-cols-1 items-center gap-10 p-8 md:gap-12 md:p-12 lg:grid-cols-2 lg:p-16">
          {/* LEFT — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col"
          >
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#00E87A]/20 bg-[#00E87A]/5 px-3 py-1 font-['Satoshi'] text-[10px] font-semibold uppercase tracking-widest text-[#00E87A]">
              Solution E-commerce WhatsApp
            </span>

            <h3 className="mb-5 font-['Outfit'] text-3xl font-bold leading-tight text-[#071510] dark:text-[#F0FAF4] md:text-4xl lg:text-[2.6rem]">
              Hortensia AI – La digitalisation complète de votre business via WhatsApp
            </h3>

            <p className="mb-8 max-w-md font-['Satoshi'] text-base leading-relaxed text-[#374151] dark:text-[#9CA3AF]">
              Une plateforme tout-en-un qui transforme WhatsApp en un véritable
              canal de vente. Gestion de catalogue, paiements intégrés et
              assistance IA disponible 24h/24.
            </p>

            <ul className="mb-10 space-y-3">
              {[
                'Catalogue produits & services personnalisable',
                'Paiement intégré WhatsApp',
                'Chatbot IA 24/7',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 font-['Satoshi'] text-sm text-[#071510]/80 dark:text-[#F0FAF4]/80"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00E87A]/10">
                    <Check className="h-3 w-3 text-[#00E87A]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="#"
                className="group/btn inline-flex items-center gap-2 rounded-full bg-[#00E87A] px-7 py-3 font-['Satoshi'] text-sm font-extrabold text-[#071510] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(0,232,122,0.35)] active:scale-[0.98]"
              >
                En savoir plus
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </Link>
              <Link
                to="#"
                className="inline-flex items-center gap-2 rounded-full border border-[#071510]/10 px-7 py-3 font-['Satoshi'] text-sm font-bold text-[#071510] transition-all duration-300 hover:bg-[#071510]/5 dark:border-[#F0FAF4]/10 dark:text-[#F0FAF4] dark:hover:bg-[#F0FAF4]/5"
              >
                Étude de cas
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.35, ease: [0.19, 1, 0.22, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#00E87A]/10 bg-[#071510] shadow-[0_24px_80px_rgba(0,0,0,0.18)] transition-all duration-700 group-hover:shadow-[0_32px_96px_rgba(0,0,0,0.22)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.45)] dark:group-hover:shadow-[0_32px_96px_rgba(0,0,0,0.55)]">
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 border-b border-[#00E87A]/10 bg-[#0a1a14] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                <div className="ml-4 flex-1 rounded-md bg-white/5 px-3 py-0.5 text-center text-[10px] text-white/30">
                  hortensia.ai
                </div>
              </div>
              {/* Screenshot */}
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
                  alt="Interface Hortensia AI"
                  className="h-auto w-full object-cover transition-transform duration-[8s] ease-out group-hover:scale-[1.02]"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060C0A]/30 via-transparent to-transparent" />
              </div>
            </div>

            {/* Decorative subtle glow */}
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[#00E87A]/[0.03] blur-3xl" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Secondary Cards                                                  */
/* ═══════════════════════════════════════════════════════════════════ */

function SecondaryCards() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const cards = [
    {
      tag: 'Fintech',
      title: 'Souvtech Invest – Trouvez des financements adaptés à votre projet',
      description:
        'Plateforme de mise en relation entre investisseurs et entrepreneurs africains. Matching algorithmique et due diligence automatisée.',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      alt: 'Dashboard Souvtech Invest',
    },
    {
      tag: 'Services',
      title: 'Souv Patrimoine – Gestion et conseil patrimonial digitalisé',
      description:
        'Application web de conseil en gestion de patrimoine avec simulation de scenarii, rendez-vous en ligne et suivi documentaire sécurisé.',
      image:
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
      alt: 'Interface Souv Patrimoine',
    },
  ]

  return (
    <div ref={ref} className="relative z-10 mb-16 grid grid-cols-1 gap-8 md:mb-24 md:grid-cols-2 lg:gap-10">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: i * 0.15,
            ease: [0.19, 1, 0.22, 1],
          }}
        >
          <Link
            to="#"
            className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#00E87A]/8 bg-white/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#00E87A]/18 hover:shadow-[0_16px_56px_rgba(0,0,0,0.08)] dark:bg-white/[0.03] dark:hover:shadow-[0_16px_56px_rgba(0,0,0,0.22)]"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden sm:h-56 md:h-64">
              <img
                src={card.image}
                alt={card.alt}
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060C0A]/80 via-[#060C0A]/20 to-transparent" />

              <div className="absolute left-5 top-5">
                <span className="rounded-full border border-[#00E87A]/20 bg-[#060C0A]/50 px-3 py-1 font-['Satoshi'] text-[10px] font-semibold uppercase tracking-widest text-[#00E87A] backdrop-blur-sm">
                  {card.tag}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <h4 className="mb-2 font-['Outfit'] text-xl font-bold leading-snug text-[#071510] dark:text-[#F0FAF4] md:text-2xl">
                {card.title}
              </h4>
              <p className="mb-6 line-clamp-2 font-['Satoshi'] text-sm leading-relaxed text-[#374151] dark:text-[#9CA3AF]">
                {card.description}
              </p>

              <span className="mt-auto inline-flex items-center gap-2 font-['Satoshi'] text-sm font-semibold text-[#00E87A] transition-transform duration-300 group-hover:translate-x-1">
                Voir le site
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>

            {/* Hover glow border */}
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div
                className="absolute inset-0 rounded-[2rem]"
                style={{
                  boxShadow:
                    'inset 0 0 0 1px rgba(0,232,122,0.15), 0 0 40px rgba(0,232,122,0.06)',
                }}
              />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Combined Section: Gallery + More Projects                         */
/* ═══════════════════════════════════════════════════════════════════ */

function MoreProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const sites = [
    'site1.com',
    'site2.com',
    'site3.com',
    'site4.com',
    'site5.com',
    'site6.com',
    'site7.com',
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      className="relative z-10 mb-16 md:mb-24"
    >
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        {/* ── LEFT: Compact Gallery ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          className="order-2 lg:order-1"
        >
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {/* Row 1 */}
            <div className="group relative overflow-hidden rounded-xl border border-transparent bg-[#071510]/[0.04] transition-all duration-500 hover:scale-[1.04] hover:border-[#00E87A]/15 hover:bg-[#00E87A]/[0.05] hover:shadow-[0_0_20px_rgba(0,232,122,0.08)] dark:bg-white/[0.04] dark:hover:bg-[#00E87A]/[0.06]">
              <div className="aspect-square" />
            </div>
            <div className="group relative overflow-hidden rounded-xl border border-transparent bg-[#071510]/[0.04] transition-all duration-500 hover:scale-[1.04] hover:border-[#00E87A]/15 hover:bg-[#00E87A]/[0.05] hover:shadow-[0_0_20px_rgba(0,232,122,0.08)] dark:bg-white/[0.04] dark:hover:bg-[#00E87A]/[0.06]">
              <div className="aspect-square" />
            </div>
            <div className="group relative overflow-hidden rounded-xl border border-transparent bg-[#071510]/[0.04] transition-all duration-500 hover:scale-[1.04] hover:border-[#00E87A]/15 hover:bg-[#00E87A]/[0.05] hover:shadow-[0_0_20px_rgba(0,232,122,0.08)] dark:bg-white/[0.04] dark:hover:bg-[#00E87A]/[0.06]">
              <div className="aspect-square" />
            </div>
            {/* Row 2 */}
            <div className="group relative col-span-2 overflow-hidden rounded-xl border border-transparent bg-[#071510]/[0.04] transition-all duration-500 hover:scale-[1.04] hover:border-[#00E87A]/15 hover:bg-[#00E87A]/[0.05] hover:shadow-[0_0_20px_rgba(0,232,122,0.08)] dark:bg-white/[0.04] dark:hover:bg-[#00E87A]/[0.06]">
              <div className="aspect-[2/1]" />
            </div>
            <div className="group relative overflow-hidden rounded-xl border border-transparent bg-[#071510]/[0.04] transition-all duration-500 hover:scale-[1.04] hover:border-[#00E87A]/15 hover:bg-[#00E87A]/[0.05] hover:shadow-[0_0_20px_rgba(0,232,122,0.08)] dark:bg-white/[0.04] dark:hover:bg-[#00E87A]/[0.06]">
              <div className="aspect-square" />
            </div>
            {/* Row 3 */}
            <div className="group relative overflow-hidden rounded-xl border border-transparent bg-[#071510]/[0.04] transition-all duration-500 hover:scale-[1.04] hover:border-[#00E87A]/15 hover:bg-[#00E87A]/[0.05] hover:shadow-[0_0_20px_rgba(0,232,122,0.08)] dark:bg-white/[0.04] dark:hover:bg-[#00E87A]/[0.06]">
              <div className="aspect-square" />
            </div>
            <div className="group relative col-span-2 overflow-hidden rounded-xl border border-transparent bg-[#071510]/[0.04] transition-all duration-500 hover:scale-[1.04] hover:border-[#00E87A]/15 hover:bg-[#00E87A]/[0.05] hover:shadow-[0_0_20px_rgba(0,232,122,0.08)] dark:bg-white/[0.04] dark:hover:bg-[#00E87A]/[0.06]">
              <div className="aspect-[2/1]" />
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT: More Projects Content ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
          className="order-1 lg:order-2"
        >
          <h3 className="mb-5 font-['Outfit'] text-3xl font-bold leading-tight text-[#071510] dark:text-[#F0FAF4] md:text-4xl lg:text-[2.4rem]">
            Et bien d’autres projets web réalisés avec succès
          </h3>
          <p className="mb-8 max-w-lg font-['Satoshi'] text-base leading-relaxed text-[#374151] dark:text-[#9CA3AF]">
            De la landing page à la plateforme SaaS complexe, nous avons accompagné
            des dizaines de clients dans la création de solutions digitales sur
            mesure.
          </p>

          <ul className="mb-10 space-y-2.5">
            {sites.map((site) => (
              <li
                key={site}
                className="flex items-center justify-between rounded-xl border border-[#00E87A]/8 bg-white/40 px-4 py-2.5 transition-all duration-300 hover:border-[#00E87A]/20 dark:bg-white/[0.02]"
              >
                <span className="font-['Satoshi'] text-sm font-medium text-[#071510] dark:text-[#F0FAF4]">
                  {site}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-[#00E87A]" />
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[#00E87A] px-7 py-3 font-['Satoshi'] text-sm font-extrabold text-[#071510] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(0,232,122,0.35)] active:scale-[0.98]"
            >
              Discuter de votre projet
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Main Section                                                     */
/* ═══════════════════════════════════════════════════════════════════ */

export default function NosRealisations() {
  return (
    <section
      id="realisations"
      className="relative overflow-hidden bg-[#F7FFF9] py-24 dark:bg-[#060C0A] md:py-32 lg:py-40"
      aria-label="Nos Réalisations"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeader />
        <FeaturedProject />
        <SecondaryCards />
        <MoreProjectsSection />
      </div>
    </section>
  )
}
