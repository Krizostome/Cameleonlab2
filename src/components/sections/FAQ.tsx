"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Plus, ArrowRight } from "lucide-react"

// Register GSAP plugin safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// ─── TYPES ───────────────────────────────────────────────────────

interface FAQItem {
  id: string
  number: string
  question: string
  answer: string
  category: "budget" | "process" | "technique" | "support"
}

interface FAQAccordionItemProps {
  item: FAQItem
  index: number
  isOpen: boolean
  onToggle: () => void
}

// ─── DATA ────────────────────────────────────────────────────────

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-01",
    number: "01",
    question: "Combien coûte la création d'un site web ?",
    answer:
      "Le tarif dépend de la complexité du projet. Un site vitrine démarre à partir de 800 €, une application sur-mesure peut aller au-delà de 5 000 €. Nous établissons toujours un devis gratuit et détaillé après un premier échange — sans engagement.",
    category: "budget",
  },
  {
    id: "faq-02",
    number: "02",
    question: "Quel est le délai moyen pour livrer un projet ?",
    answer:
      "Un site vitrine est livré en 3 à 5 semaines. Une application mobile ou un projet complexe prend 6 à 12 semaines. Nous travaillons par sprints avec des points de validation réguliers pour que vous suiviez l'avancement en temps réel.",
    category: "process",
  },
  {
    id: "faq-03",
    number: "03",
    question: "Comment se déroule un projet avec CameleonLab ?",
    answer:
      "En 4 étapes : Découverte (brief, objectifs, personas) → Conception (maquettes Figma, charte) → Développement (code, intégration, tests) → Lancement et suivi (mise en ligne, analytics, optimisations J+30).",
    category: "process",
  },
  {
    id: "faq-04",
    number: "04",
    question: "Quelles technologies utilisez-vous ?",
    answer:
      "Nous travaillons principalement avec React / Next.js, TypeScript, Node.js, React Native pour le mobile, et Figma pour le design. Le choix technique est toujours guidé par les besoins réels du projet, pas par les tendances.",
    category: "technique",
  },
  {
    id: "faq-05",
    number: "05",
    question: "Mon site sera-t-il optimisé pour le SEO ?",
    answer:
      "Oui, systématiquement. Chaque projet intègre les bases du SEO technique : balises meta, structure de titres, Core Web Vitals, sitemap XML, données structurées Schema.org. Nous proposons aussi un accompagnement SEO continu en option.",
    category: "technique",
  },
  {
    id: "faq-06",
    number: "06",
    question: "Proposez-vous la maintenance après livraison ?",
    answer:
      "Absolument. Nous proposons des contrats de maintenance mensuelle : mises à jour de sécurité, corrections de bugs, évolutions mineures et reporting mensuel. Vous choisissez la formule adaptée à votre budget.",
    category: "support",
  },
  {
    id: "faq-07",
    number: "07",
    question: "Pouvez-vous refondre un site existant ?",
    answer:
      "Oui, c'est même l'un de nos points forts. Nous auditons d'abord votre site actuel (design, performances, SEO, UX) avant de proposer une refonte ciblée. On ne refait pas pour refaire — on améliore ce qui en vaut la peine.",
    category: "process",
  },
  {
    id: "faq-08",
    number: "08",
    question: "Travaillez-vous avec des clients hors de votre ville ?",
    answer:
      "Tout à fait. La grande majorité de nos clients sont à distance. Nous utilisons des outils collaboratifs (Figma, Notion, Slack, Loom) pour que la distance ne soit jamais un frein. Réunions en visio, livrables clairs, communication async efficace.",
    category: "support",
  },
]

const STATS = [
  { value: "< 24h", label: "Délai de réponse" },
  { value: "98%", label: "Clients satisfaits" },
  { value: "30+", label: "Projets livrés" },
]

// ─── UTILS ───────────────────────────────────────────────────────

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

// ─── ACCORDION ITEM ──────────────────────────────────────────────

function FAQAccordionItem({ item, index, isOpen, onToggle }: FAQAccordionItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const answerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)

  /**
   * GSAP height animation for accordion open/close.
   * Uses gsap.set height:"auto" + gsap.from height:0 — never max-height CSS.
   */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const answer = answerRef.current
      if (!answer) return

      if (isOpen) {
        // Measure and animate from 0 to auto height
        gsap.set(answer, { height: "auto" })
        const fullHeight = answer.offsetHeight
        gsap.fromTo(
          answer,
          { height: 0 },
          {
            height: fullHeight,
            duration: prefersReducedMotion() ? 0 : 0.55,
            ease: "expo.inOut",
            clearProps: "height",
          }
        )

        // Fade in text with slight Y translation
        const textEl = answer.querySelector("p")
        if (textEl) {
          gsap.fromTo(
            textEl,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: prefersReducedMotion() ? 0 : 0.4,
              delay: 0.15,
              ease: "power2.out",
            }
          )
        }

        // Icon rotation
        if (iconRef.current) {
          gsap.to(iconRef.current, {
            rotation: 45,
            duration: prefersReducedMotion() ? 0 : 0.35,
            ease: "back.out(1.7)",
          })
        }

        // Number pulse scale
        if (numberRef.current) {
          gsap.fromTo(
            numberRef.current,
            { scale: 1 },
            {
              scale: 1.3,
              duration: 0.2,
              yoyo: true,
              repeat: 1,
              ease: "power2.out",
            }
          )
        }
      } else {
        // Collapse to 0 height
        gsap.to(answer, {
          height: 0,
          duration: prefersReducedMotion() ? 0 : 0.45,
          ease: "expo.inOut",
        })

        // Icon rotation back
        if (iconRef.current) {
          gsap.to(iconRef.current, {
            rotation: 0,
            duration: prefersReducedMotion() ? 0 : 0.3,
            ease: "power2.inOut",
          })
        }
      }
    }, itemRef)

    return () => ctx.revert()
  }, [isOpen])

  /**
   * Hover line animation — scaleX from 0 to 1
   */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = itemRef.current
      const line = lineRef.current
      if (!el || !line) return

      const onEnter = () => {
        gsap.to(line, {
          scaleX: 1,
          duration: 0.4,
          ease: "power2.out",
        })
      }
      const onLeave = () => {
        gsap.to(line, {
          scaleX: 0,
          duration: 0.3,
          ease: "power2.in",
        })
      }

      el.addEventListener("mouseenter", onEnter)
      el.addEventListener("mouseleave", onLeave)

      return () => {
        el.removeEventListener("mouseenter", onEnter)
        el.removeEventListener("mouseleave", onLeave)
      }
    }, itemRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={itemRef}
      role="listitem"
      className="group relative"
    >
      {/* Animated progress line on hover */}
      <div
        ref={lineRef}
        className="pointer-events-none absolute left-0 top-0 h-full w-0.5 origin-top bg-[#00E87A]"
        style={{ transform: "scaleY(0)" }}
        aria-hidden="true"
      />

      {/* Question button */}
      <button
        id={`faq-btn-${item.id}`}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        className="flex w-full items-start gap-4 py-6 text-left transition-colors duration-300 hover:bg-white/82 dark:bg-[#071510]/40 md:gap-6 md:py-7"
      >
        {/* Number */}
        <span
          ref={numberRef}
          className={`mt-0.5 shrink-0 font-['Satoshi'] text-sm font-medium transition-colors duration-300 md:text-base ${
            isOpen ? "text-[#00E87A]" : "text-[#374151] dark:text-[#9CA3AF] group-hover:text-[#00E87A]"
          }`}
        >
          {item.number}
        </span>

        {/* Question text */}
        <span
          className={`flex-1 font-['Satoshi'] text-[15px] font-bold leading-snug transition-colors duration-300 md:text-lg ${
            isOpen ? "text-[#071510] dark:text-[#F0FAF4]" : "text-[#071510]/80 dark:text-[#F0FAF4]/80 group-hover:text-[#071510] dark:text-[#F0FAF4]"
          }`}
        >
          {item.question}
        </span>

        {/* Plus / Close icon */}
        <span
          ref={iconRef}
          className={`mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-300 md:h-9 md:w-9 ${
            isOpen
              ? "border-[#00E87A] bg-[#00E87A] text-[#071510] dark:text-[#F0FAF4]"
              : "border-[#4B5563]/40 dark:border-[#6B7280]/40 text-[#374151] dark:text-[#9CA3AF] group-hover:border-[#00E87A]/60 group-hover:text-[#00E87A]"
          }`}
          aria-hidden="true"
        >
          <Plus className="h-4 w-4 md:h-5 md:w-5" />
        </span>
      </button>

      {/* Answer panel — height animated by GSAP, never max-height CSS */}
      <div
        id={`faq-answer-${item.id}`}
        ref={answerRef}
        role="region"
        aria-labelledby={`faq-btn-${item.id}`}
        className="overflow-hidden"
        style={{ height: isOpen ? undefined : 0 }}
      >
        <div className="pb-6 pl-10 pr-12 md:pb-7 md:pl-[3.25rem] md:pr-16">
          <p className="font-['Satoshi'] text-sm leading-relaxed text-[#374151] dark:text-[#9CA3AF] md:text-base">
            {item.answer}
          </p>
        </div>
      </div>

      {/* Separator line */}
      <div
        className="h-px w-full bg-[#00C060]/15"
        aria-hidden="true"
      />
    </div>
  )
}

// ─── MAIN FAQ SECTION ────────────────────────────────────────────

export default function FAQ() {
  const [openId, setOpenId] = useState<string>("faq-01")

  const sectionRef = useRef<HTMLElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const accordionRef = useRef<HTMLDivElement>(null)
  const bgNumberRef = useRef<HTMLSpanElement>(null)

  const handleToggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? "" : id))
  }, [])

  /**
   * Scroll reveal — left column title + CTA
   */
  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      if (!leftColRef.current) return
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: leftColRef.current,
            start: "top 80%",
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /**
   * Scroll reveal — accordion items staggered
   */
  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      if (!accordionRef.current) return
      const items = accordionRef.current.querySelectorAll("[role='listitem']")
      gsap.fromTo(
        items,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: accordionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /**
   * Parallax — decorative background "FAQ" number
   */
  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      if (!bgNumberRef.current || !sectionRef.current) return
      gsap.to(bgNumberRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="faq"
      role="region"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-[#F7FFF9] dark:bg-[#060C0A] py-12 md:py-16 lg:py-20"
    >
      {/* Decorative background "FAQ" number */}
      <span
        ref={bgNumberRef}
        className="pointer-events-none absolute -left-4 top-24 select-none font-['Outfit'] text-[180px] font-black leading-none text-[#E6FFF2]/[0.03] md:top-32 md:text-[280px] lg:left-8 lg:text-[380px]"
        aria-hidden="true"
      >
        FAQ
      </span>

      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        {/* Layout split */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[380px_1fr] lg:gap-20">
          {/* LEFT COLUMN — sticky on desktop */}
          <div ref={leftColRef} className="lg:sticky lg:top-28 lg:self-start">
            {/* Label */}
            <span className="mb-4 inline-block font-['Satoshi'] text-[11px] uppercase tracking-[0.2em] text-[#00E87A]/70">
              — Questions fréquentes
            </span>

            {/* Title */}
            <h2
              id="faq-title"
              className="mb-6 font-['Outfit'] text-4xl font-bold leading-[1.1] text-[#071510] dark:text-[#F0FAF4] md:text-5xl lg:text-[3.25rem]"
            >
              Tout ce que vous{" "}
              <span className="text-[#00E87A]">voulez savoir.</span>
            </h2>

            {/* Subtitle */}
            <p className="mb-8 max-w-sm font-['Satoshi'] text-base font-light leading-relaxed text-[#374151] dark:text-[#9CA3AF] md:text-lg">
              Vous ne trouvez pas la réponse ? Notre équipe vous répond en moins de 24h ouvrées.
            </p>

            {/* CTA Contact */}
            <a
              href="/contact"
              className="group mb-12 inline-flex w-full items-center justify-center gap-3 rounded-full border border-[#00E87A]/30 bg-[#00E87A]/10 px-7 py-3.5 font-['Satoshi'] text-sm font-semibold text-[#00E87A] backdrop-blur-sm transition-all duration-300 hover:border-[#00E87A] hover:bg-[#00E87A] hover:text-[#071510] dark:text-[#F0FAF4] lg:w-auto"
            >
              Poser une question
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Quick stats — hidden on mobile */}
            <div className="hidden flex-wrap gap-8 lg:flex">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="font-['Satoshi'] text-2xl font-medium text-[#071510] dark:text-[#F0FAF4]">
                    {stat.value}
                  </span>
                  <span className="font-['Satoshi'] text-xs text-[#374151] dark:text-[#9CA3AF]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — accordion */}
          <div ref={accordionRef} role="list" aria-label="Questions fréquentes">
            {FAQ_ITEMS.map((item, index) => (
              <FAQAccordionItem
                key={item.id}
                item={item}
                index={index}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
