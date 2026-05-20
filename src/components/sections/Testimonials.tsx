"use client"

import React from "react"
import Marquee from "../ui/3d-testimonials"

// ─── DATA ────────────────────────────────────────────────────────

interface TestimonialData {
  name: string
  username: string
  body: string
  img: string
  country: string
  rating: 4 | 5
}

const TESTIMONIALS: TestimonialData[] = [
  {
    name: "Thomas Laurent",
    username: "@thomas.laurent",
    body: "CameleonLab a livré notre site en 3 semaines, exactement comme promis. ROI visible en 2 mois.",
    img: "",
    country: "France 🇫🇷",
    rating: 5,
  },
  {
    name: "Aminata Touré",
    username: "@aminata.toure",
    body: "Le branding qu'ils ont créé nous a permis de décrocher 3 nouveaux contrats internationaux.",
    img: "",
    country: "Côte d'Ivoire 🇨🇮",
    rating: 5,
  },
  {
    name: "Marc Dubois",
    username: "@marc.dubois",
    body: "Notre app mobile dépasse 4.8 étoiles sur le store. Un travail remarquable de bout en bout.",
    img: "",
    country: "Sénégal 🇸🇳",
    rating: 5,
  },
  {
    name: "Clara Bernard",
    username: "@clara.bernard",
    body: "Réactivité, qualité, délais tenus. Je recommande CameleonLab sans hésitation.",
    img: "",
    country: "Bénin 🇧🇯",
    rating: 5,
  },
  {
    name: "Antoine Rousseau",
    username: "@antoine.rousseau",
    body: "Ils ont capturé l'essence de ma marque avec une finesse et une sensibilité exceptionnelles.",
    img: "",
    country: "Canada 🇨🇦",
    rating: 5,
  },
  {
    name: "Koffi Mensah",
    username: "@koffi.mensah",
    body: "L'équipe a su transformer nos idées complexes en une expérience utilisateur fluide et intuitive.",
    img: "",
    country: "Togo 🇹🇬",
    rating: 4,
  },
  {
    name: "Sophie Moreau",
    username: "@sophie.moreau",
    body: "Notre e-commerce a vu ses conversions augmenter de 40 % en 3 mois. Un résultat spectaculaire.",
    img: "",
    country: "France 🇫🇷",
    rating: 5,
  },
  {
    name: "Fatou Ndiaye",
    username: "@fatou.ndiaye",
    body: "Un accompagnement stratégique et créatif qui a transformé notre présence digitale de fond en comble.",
    img: "",
    country: "Sénégal 🇸🇳",
    rating: 5,
  },
  {
    name: "Jean-Baptiste Ahouanvo",
    username: "@jb.ahouanvo",
    body: "Professionnalisme, écoute et excellence technique. CameleonLab est le partenaire idéal.",
    img: "",
    country: "Bénin 🇧🇯",
    rating: 4,
  },
]

// ─── SUB-COMPONENTS ──────────────────────────────────────────────

function StarRating({ rating }: { rating: 4 | 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note ${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "text-[#00E87A]" : "text-[#374151] dark:text-[#9CA3AF]/40"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00E87A]/15 text-xs font-bold text-[#00E87A] ring-1 ring-[#00E87A]/20">
      {initials}
    </div>
  )
}

function TestimonialCard({ data }: { data: TestimonialData }) {
  return (
    <div className="relative w-full rounded-2xl border border-[rgba(0,232,122,0.15)] bg-white/82 dark:bg-[#071510]/90 p-5 backdrop-blur-sm">
      {/* Subtle top glow line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-[rgba(0,232,122,0.4)] to-transparent opacity-60" />

      <div className="flex flex-col gap-3.5">
        <StarRating rating={data.rating} />

        <p className="font-['Satoshi'] text-sm leading-relaxed text-[#071510] dark:text-[#E6FFF2]/90">
          &ldquo;{data.body}&rdquo;
        </p>

        <div className="flex items-center gap-3 pt-1">
          <Avatar name={data.name} />
          <div className="min-w-0">
            <p className="truncate font-['Satoshi'] text-sm font-semibold text-[#071510] dark:text-[#F0FAF4]">
              {data.name}
            </p>
            <p className="truncate font-['Satoshi'] text-xs text-[#374151] dark:text-[#9CA3AF]">
              {data.username} · {data.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN SECTION ────────────────────────────────────────────────

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#F7FFF9] dark:bg-[#060C0A] py-14 md:py-18 lg:py-20"
      aria-label="Témoignages clients"
    >
      {/* Ambient radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(231,211,177,0.35)_0%,transparent_70%)] opacity-[0.04] blur-[100px]" />

      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <span className="mb-4 inline-block font-['Satoshi'] text-[11px] uppercase tracking-[0.2em] text-[#00E87A]/70">
            — Ce que disent nos clients
          </span>
          <h2 className="mb-4 font-['Outfit'] text-4xl font-bold text-[#071510] dark:text-[#F0FAF4] md:text-5xl lg:text-6xl">
            Ils nous font confiance.
          </h2>
          <p className="mx-auto max-w-xl font-['Satoshi'] text-base font-light leading-relaxed text-[#374151] dark:text-[#9CA3AF] md:text-lg">
            Des résultats concrets, des clients satisfaits — partout dans le monde.
          </p>
        </div>

        {/* 3D Marquee Block */}
        <div className="relative overflow-hidden rounded-3xl border border-[rgba(0,232,122,0.08)] bg-[rgba(230,255,242,0.02)] h-[380px] md:h-[480px] md:[perspective:400px]">
          {/* Top fade mask */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-[#F7FFF9] dark:from-[#060C0A] to-transparent md:h-24" />
          {/* Bottom fade mask */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-[#F7FFF9] dark:from-[#060C0A] to-transparent md:h-24" />
          {/* Left fade mask (desktop) */}
          <div className="pointer-events-none absolute left-0 top-0 z-20 hidden h-full w-12 bg-gradient-to-r from-[#F7FFF9] dark:from-[#060C0A] to-transparent md:block" />
          {/* Right fade mask (desktop) */}
          <div className="pointer-events-none absolute right-0 top-0 z-20 hidden h-full w-12 bg-gradient-to-l from-[#F7FFF9] dark:from-[#060C0A] to-transparent md:block" />

          {/* Inner 3D transformed grid */}
          <div className="flex h-full flex-row gap-3 p-3 md:gap-4 md:p-4 md:[transform:translateX(-80px)_translateZ(-80px)_rotateX(18deg)_rotateY(-8deg)_rotateZ(18deg)] md:[transform-style:preserve-3d]">
            {/* Mobile: 2 columns */}
            <div className="flex h-full w-full flex-row gap-3 md:hidden">
              <div className="flex h-full flex-1 flex-col">
                <Marquee vertical pauseOnHover duration={30} className="h-full">
                  {TESTIMONIALS.map((t) => (
                    <TestimonialCard key={t.name} data={t} />
                  ))}
                </Marquee>
              </div>
              <div className="flex h-full flex-1 flex-col">
                <Marquee vertical reverse pauseOnHover duration={26} className="h-full">
                  {TESTIMONIALS.map((t) => (
                    <TestimonialCard key={`${t.name}-rev`} data={t} />
                  ))}
                </Marquee>
              </div>
            </div>

            {/* Desktop: 4 columns */}
            <div className="hidden h-full w-full flex-row gap-4 md:flex">
              <div className="flex h-full w-[240px] flex-col lg:w-[260px]">
                <Marquee vertical pauseOnHover duration={35} className="h-full">
                  {TESTIMONIALS.map((t) => (
                    <TestimonialCard key={t.name} data={t} />
                  ))}
                </Marquee>
              </div>
              <div className="flex h-full w-[240px] flex-col lg:w-[260px]">
                <Marquee vertical reverse pauseOnHover duration={28} className="h-full">
                  {TESTIMONIALS.map((t) => (
                    <TestimonialCard key={`${t.name}-rev`} data={t} />
                  ))}
                </Marquee>
              </div>
              <div className="flex h-full w-[240px] flex-col lg:w-[260px]">
                <Marquee vertical pauseOnHover duration={32} className="h-full">
                  {TESTIMONIALS.map((t) => (
                    <TestimonialCard key={t.name} data={t} />
                  ))}
                </Marquee>
              </div>
              <div className="flex h-full w-[240px] flex-col lg:w-[260px]">
                <Marquee vertical reverse pauseOnHover duration={25} className="h-full">
                  {TESTIMONIALS.map((t) => (
                    <TestimonialCard key={`${t.name}-rev`} data={t} />
                  ))}
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
