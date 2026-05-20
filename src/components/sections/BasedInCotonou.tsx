'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CheckCircle2, MapPin, ArrowRight } from 'lucide-react'

const SERVICES = [
  'Sites web premium & performants',
  'Branding & identité visuelle',
  'SEO local & visibilité Google',
  'Applications web & mobile modernes',
]

const TAGS = [
  'Cotonou',
  'Startups',
  'Business',
  'Branding',
  'Web Design',
  'SEO',
  'Afrique',
]

export default function BasedInCotonou() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F7FFF9] dark:bg-[#060C0A] py-16 md:py-20 lg:py-24"
      aria-label="Basé à Cotonou"
    >
      {/* ── Grain texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* ── Radial glow ── */}
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,232,122,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-1/4 h-[400px] w-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,122,61,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── Decorative lines ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[12%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[#00E87A]/[0.04] to-transparent" />
        <div className="absolute right-[18%] top-0 h-full w-px bg-gradient-to-b from-transparent via-[#00E87A]/[0.04] to-transparent" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#00E87A]/[0.02] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ═══════════════════════════════════════════ */}
          {/*  IMAGE                                    */}
          {/* ═══════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -50, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="relative order-1 lg:order-1"
          >
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-[#00E87A]/10 bg-white dark:bg-[#071510] transition-all duration-500 hover:border-[#00E87A]/20">
              {/* Image with parallax */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.div style={{ y: imageY }} className="h-[115%] w-full">
                  <img
                    src="/images/amazone.jpg"
                    alt="Cotonou, Bénin — place de l'amazone"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </motion.div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#F7FFF9]/50 via-[#F7FFF9]/10 to-transparent dark:from-[#060C0A]/50 dark:via-[#060C0A]/10 dark:to-transparent" />
              </div>

              {/* Glow border on hover */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  boxShadow:
                    'inset 0 0 0 1px rgba(0,232,122,0.12), 0 0 60px rgba(0,232,122,0.06)',
                }}
              />
            </div>

            {/* Floating location pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="absolute -bottom-5 left-6 right-6 sm:left-8 sm:right-auto"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00E87A]/20 bg-white/90 dark:bg-[#071510]/90 px-4 py-2 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                <MapPin className="h-3.5 w-3.5 text-[#00E87A]" />
                <span className="font-['Satoshi'] text-xs text-[#071510]/90 dark:text-[#F0FAF4]/90">
                  Cotonou, République du Bénin
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ═══════════════════════════════════════════ */}
          {/*  CONTENT                                  */}
          {/* ═══════════════════════════════════════════ */}
          <div className="order-2 flex flex-col lg:order-2">
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="mb-5 inline-flex items-center gap-2 self-start rounded-full border border-[#00E87A]/20 bg-[#00E87A]/5 px-4 py-1.5 font-['Satoshi'] text-[11px] font-medium uppercase tracking-wider text-[#00E87A] backdrop-blur-sm"
            >
              <MapPin className="h-3 w-3" />
              Cotonou, Bénin
            </motion.span>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="mb-6 font-['Outfit'] text-3xl font-bold leading-[1.15] text-[#071510] dark:text-[#F0FAF4] md:text-4xl lg:text-[2.75rem]"
            >
              Une agence digitale basée à{' '}
              <span className="text-[#00E87A]">Cotonou.</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="mb-4 font-['Satoshi'] text-base leading-relaxed text-[#374151] dark:text-[#F0FAF4]/80 md:text-lg"
            >
              Nous accompagnons les entreprises, marques et startups africaines avec des
              expériences digitales modernes, rapides et mémorables.
            </motion.p>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="mb-8 font-['Satoshi'] text-sm leading-relaxed text-[#374151] dark:text-[#F0FAF4]/80 md:text-base"
            >
              Depuis Cotonou, nous créons des sites web, identités visuelles et solutions
              digitales qui aident les entreprises à grandir avec une image plus forte, plus
              crédible et plus professionnelle.
            </motion.p>

            {/* List */}
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.35 },
                },
              }}
              className="mb-10 flex flex-col gap-3.5"
            >
              {SERVICES.map((item) => (
                <motion.li
                  key={item}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
                    },
                  }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    className="h-5 w-5 flex-shrink-0 text-[#00E87A]"
                    strokeWidth={1.5}
                  />
                  <span className="font-['Satoshi'] text-sm text-[#071510]/80 dark:text-[#F0FAF4]/80 md:text-[0.95rem]">
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Tags */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.55 },
                },
              }}
              className="mb-10 flex flex-wrap gap-2"
            >
              {TAGS.map((tag) => (
                <motion.span
                  key={tag}
                  variants={{
                    hidden: { opacity: 0, scale: 0.85, y: 6 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
                    },
                  }}
                  whileHover={{
                    scale: 1.06,
                    borderColor: 'rgba(0, 232, 122, 0.4)',
                    color: '#00E87A',
                    backgroundColor: 'rgba(0, 232, 122, 0.1)',
                    transition: { duration: 0.2 },
                  }}
                  className="cursor-default rounded-full border border-[#00E87A]/15 bg-[#00E87A]/5 px-3.5 py-1.5 font-['Satoshi'] text-[11px] text-[#071510]/75 dark:text-[#F0FAF4]/80"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a
              href="#portfolio"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{
                x: 4,
                boxShadow: '0 0 30px rgba(0,232,122,0.12)',
                transition: { duration: 0.25 },
              }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 self-start rounded-full border border-[#00E87A]/30 bg-[#00E87A]/10 dark:bg-[#00E87A]/8 px-7 py-3.5 font-['Satoshi'] text-sm font-semibold text-[#00E87A] backdrop-blur-sm transition-colors duration-300 hover:border-[#00E87A]/50 hover:bg-[#00E87A]/20 dark:hover:bg-[#00E87A]/15"
            >
              <span>Découvrir nos projets</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
