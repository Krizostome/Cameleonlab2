"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, useInView, Variants } from "framer-motion"

/* ═══════════════════════════════════════════════════════════════════ */
/*  Inline brand icons                                                 */
/* ═══════════════════════════════════════════════════════════════════ */

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const TwitterIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const InstagramIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const BehanceIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 3h6a4 4 0 0 1 4 4 4 4 0 0 1-4 4H3V3z" />
    <path d="M3 11h7a4 4 0 0 1 4 4 4 4 0 0 1-4 4H3v-8z" />
    <path d="M15 4h6" />
    <path d="M15 20a4 4 0 1 1 6-3.47" />
  </svg>
)

/* ═══════════════════════════════════════════════════════════════════ */
/*  Types & Data                                                       */
/* ═══════════════════════════════════════════════════════════════════ */

interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  social: {
    twitter?: string
    linkedin?: string
    behance?: string
    instagram?: string
  }
}

const MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Chadrack",
    role: "Director of Photography",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQFnmLdpZW78yA/profile-displayphoto-scale_200_200/B4DZvM8NB2JMAY-/0/1768669895649?e=2147483647&v=beta&t=5VGAB-2gYupLNaHvJHECollR25THd-3oR5wngGlQiY4",
    social: { twitter: "#", linkedin: "#", behance: "#" },
  },
  {
    id: "2",
    name: "Mak VieSainte",
    role: "Founder",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2vnSxNNVGZV2MXRjlGELl-NgLl5kXdpDR6A&s",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: "3",
    name: "Osiris Balonga",
    role: "Lead Front-End",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQGVqrPPAGHtoQ/profile-displayphoto-scale_200_200/B4DZwhAkjaHwAY-/0/1770080338529?e=2147483647&v=beta&t=q-_6p1VCJ8NN8eHj9zUFwJZds_XpKez9Hy14SAIDp4M",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: "4",
    name: "Jacques",
    role: "Product Owner",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQE-Z7-S1LSYNQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1724143166545?e=2147483647&v=beta&t=6IPCwgOzblGt4p2fEdnY74gMbLyRHii5Ite3A39qQsY",
    social: { linkedin: "#" },
  },
  {
    id: "5",
    name: "Riche Makso",
    role: "CTO — Product Designer",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQEkTAbZLlSrLg/profile-displayphoto-scale_200_200/B4DZoHdu8BGgAY-/0/1761061833315?e=2147483647&v=beta&t=Rg1dBTvq9X2heyhuhBwG2DsEkG65v0vQ35hF2FSeYns",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: "6",
    name: "Jemima",
    role: "UI/UX Designer",
    image: "https://i.pravatar.cc/400?img=16",
    social: { instagram: "#" },
  },
]

/* ═══════════════════════════════════════════════════════════════════ */
/*  Framer Motion variants                                             */
/* ═══════════════════════════════════════════════════════════════════ */

const headerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const headerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Subtle floating particles                                          */
/* ═══════════════════════════════════════════════════════════════════ */

function ParticleField() {
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.25 + 0.05,
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background: "#00E87A",
            boxShadow: `0 0 ${p.size * 4}px ${p.size * 2}px rgba(0,232,122,${p.opacity * 0.4})`,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Center glowing orb                                                 */
/* ═══════════════════════════════════════════════════════════════════ */

function CenterOrb() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
      <div
        className="rounded-full"
        style={{
          width: 140,
          height: 140,
          background: "radial-gradient(circle, rgba(0,232,122,0.18) 0%, rgba(0,232,122,0.04) 50%, transparent 70%)",
          filter: "blur(20px)",
          animation: "pulse-orb 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0 m-auto rounded-full border border-[#00E87A]/10"
        style={{
          width: 100,
          height: 100,
          animation: "spin-slow 20s linear infinite",
        }}
      />
      <div
        className="absolute inset-0 m-auto rounded-full border border-[#00E87A]/5"
        style={{
          width: 160,
          height: 160,
          animation: "spin-slow 30s linear infinite reverse",
        }}
      />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Orbit depth helpers                                                */
/* ═══════════════════════════════════════════════════════════════════ */

function getCardDepth(rotation: number, index: number, total: number) {
  const step = 360 / total
  const raw = ((index * step + rotation) % 360 + 360) % 360
  const dist = raw > 180 ? 360 - raw : raw
  return dist / 180 // 0 = front, 1 = back
}

function getCardIsFront(rotation: number, index: number, total: number) {
  const step = 360 / total
  const raw = ((index * step + rotation) % 360 + 360) % 360
  const dist = raw > 180 ? 360 - raw : raw
  return dist < 30
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  3D Orbit Card                                                      */
/* ═══════════════════════════════════════════════════════════════════ */

const OrbitCard = React.memo(function OrbitCard({
  member,
  index,
  total,
  rotation,
  radius,
  isHovered,
  onHover,
  onLeave,
}: {
  member: TeamMember
  index: number
  total: number
  rotation: number
  radius: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const step = 360 / total
  const cardAngle = index * step

  const depth = getCardDepth(rotation, index, total)
  const isFront = getCardIsFront(rotation, index, total)

  const scale = 1 - depth * 0.18 + (isFront ? 0.10 : 0)
  const blur = depth * 3.5
  const brightness = 1 - depth * 0.45 + (isFront ? 0.18 : 0)
  const opacity = 1 - depth * 0.55
  const zIndex = Math.round((1 - depth) * 100)

  const socials = [
    member.social.twitter && { key: "twitter", href: member.social.twitter, Icon: TwitterIcon },
    member.social.linkedin && { key: "linkedin", href: member.social.linkedin, Icon: LinkedinIcon },
    member.social.behance && { key: "behance", href: member.social.behance, Icon: BehanceIcon },
    member.social.instagram && { key: "instagram", href: member.social.instagram, Icon: InstagramIcon },
  ].filter(Boolean) as { key: string; href: string; Icon: React.FC<{ className?: string }> }[]

  return (
    <div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        transformStyle: "preserve-3d",
        transform: `translate(-50%, -50%) rotateY(${cardAngle}deg) translateZ(${radius}px)`,
        zIndex,
        opacity,
        filter: `blur(${blur}px) brightness(${brightness})`,
        transition: "opacity 0.4s ease, filter 0.4s ease",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="relative group cursor-pointer"
        style={{
          transform: `scale(${scale})`,
          transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          transformStyle: "preserve-3d",
        }}
        whileHover={{ translateZ: 30 }}
      >
        {/* Glow border on frontmost */}
        {isFront && (
          <div
            className="absolute -inset-[1px] rounded-[28px] pointer-events-none"
            style={{
              background: "linear-gradient(180deg, rgba(0,232,122,0.35) 0%, transparent 60%)",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "1px",
              borderRadius: "28px",
              opacity: 0.7,
              animation: "pulse-glow 3s ease-in-out infinite",
            }}
          />
        )}

        {/* Card body */}
        <div
          className="relative w-[210px] md:w-[240px] rounded-[24px] overflow-hidden backdrop-blur-xl bg-white/50 dark:bg-white/[0.03] border border-[#00E87A]/12"
          style={{
            boxShadow: isFront
              ? "0 24px 64px rgba(0,0,0,0.2), 0 0 40px rgba(0,232,122,0.06), inset 0 1px 0 rgba(255,255,255,0.1)"
              : "0 16px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
            transition: "box-shadow 0.5s ease",
          }}
        >
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={member.image}
              alt={`Portrait de ${member.name}`}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:brightness-110 group-hover:scale-105"
              style={{
                filter: isHovered || isFront ? "grayscale(0) brightness(1.05)" : "grayscale(0.35) brightness(0.85)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F7FFF9]/60 dark:from-[#060C0A]/70 via-transparent to-transparent" />

            {/* Green glow overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 80%, rgba(0,232,122,0.10) 0%, transparent 60%)",
              }}
            />
          </div>

          {/* Text content */}
          <div className="relative p-4 md:p-5">
            <h4
              className="text-[#071510] dark:text-[#F0FAF4] font-bold text-base md:text-lg leading-tight"
              style={{ fontFamily: "Satoshi, sans-serif" }}
            >
              {member.name}
            </h4>
            <p
              className="text-[#374151] text-[10px] md:text-[11px] uppercase tracking-[0.18em] mt-1"
              style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 400 }}
            >
              {member.role}
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#374151] dark:text-[#9CA3AF] hover:text-[#00E87A] hover:bg-[#00E87A]/10 transition-colors duration-200 bg-black/[0.04] dark:bg-white/[0.04] border border-[#00E87A]/10"
                >
                  <s.Icon className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
})

/* ═══════════════════════════════════════════════════════════════════ */
/*  Mobile / Tablet touch slider card                                  */
/* ═══════════════════════════════════════════════════════════════════ */

function SliderCard({ member }: { member: TeamMember }) {
  const socials = [
    member.social.twitter && { key: "twitter", href: member.social.twitter, Icon: TwitterIcon },
    member.social.linkedin && { key: "linkedin", href: member.social.linkedin, Icon: LinkedinIcon },
    member.social.behance && { key: "behance", href: member.social.behance, Icon: BehanceIcon },
    member.social.instagram && { key: "instagram", href: member.social.instagram, Icon: InstagramIcon },
  ].filter(Boolean) as { key: string; href: string; Icon: React.FC<{ className?: string }> }[]

  return (
    <div className="snap-center shrink-0 w-[78vw] max-w-[320px]">
      <div
        className="rounded-[24px] overflow-hidden bg-white/80 dark:bg-white/[0.03] backdrop-blur-xl"
        style={{
          border: "1px solid rgba(0,232,122,0.12)",
          boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
        }}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={member.image}
            alt={`Portrait de ${member.name}`}
            loading="lazy"
            className="w-full h-full object-cover grayscale-[0.3] brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071510]/50 dark:from-[#060C0A]/80 via-transparent to-transparent" />
        </div>
        <div className="p-5">
          <h4
            className="text-[#071510] dark:text-[#F0FAF4] font-bold text-lg"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            {member.name}
          </h4>
          <p
            className="text-[#374151] text-[11px] uppercase tracking-[0.18em] mt-1"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            {member.role}
          </p>
          <div className="flex items-center gap-2 mt-3">
            {socials.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#374151] hover:text-[#00E87A] transition-colors"
                style={{
                  background: "rgba(0,232,122,0.06)",
                  border: "1px solid rgba(0,232,122,0.1)",
                }}
              >
                <s.Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Navigation arrow button                                            */
/* ═══════════════════════════════════════════════════════════════════ */

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right"
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Tourner vers la gauche" : "Tourner vers la droite"}
      className="absolute top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-[#00E87A] hover:text-[#F0FAF4] hover:bg-[#00E87A]/20 transition-all duration-300 group"
      style={{
        left: direction === "left" ? "2%" : undefined,
        right: direction === "right" ? "2%" : undefined,
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(0,232,122,0.15)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:scale-110"
      >
        {direction === "left" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Main Team Section                                                  */
/* ═══════════════════════════════════════════════════════════════════ */

export default function Team() {
  const [rotation, setRotation] = useState(0)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [isHoveringSection, setIsHoveringSection] = useState(false)
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop")
  const [isGrabbing, setIsGrabbing] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showHint, setShowHint] = useState(true)

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  /* ── Drag / Inertia refs ── */
  const angleRef = useRef(0)
  const velocityRef = useRef(0)
  const isDraggingRef = useRef(false)
  const isUserInteractingRef = useRef(false)
  const lastXRef = useRef(0)
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* Responsive detection */
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth
      if (w < 768) setDeviceType("mobile")
      else if (w < 1024) setDeviceType("tablet")
      else setDeviceType("desktop")
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  /* ── Orbit physics loop ── */
  useEffect(() => {
    if (deviceType === "mobile") return
    const baseSpeed = deviceType === "tablet" ? 0.12 : 0.18
    const friction = 0.96

    const animate = () => {
      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.02) {
          angleRef.current += velocityRef.current
          velocityRef.current *= friction
        } else {
          velocityRef.current = 0
          if (!isUserInteractingRef.current) {
            const speed = isHoveringSection ? baseSpeed * 0.25 : baseSpeed
            angleRef.current += speed
          }
        }
      }
      setRotation(angleRef.current)
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isHoveringSection, deviceType])

  /* ── Pointer interactions ── */
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (deviceType === "mobile") return
    isDraggingRef.current = true
    isUserInteractingRef.current = true
    setIsGrabbing(true)
    if (!hasInteracted) {
      setHasInteracted(true)
      setShowHint(false)
    }
    lastXRef.current = e.clientX
    velocityRef.current = 0
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [deviceType, hasInteracted])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (deviceType === "mobile") return
    if (!isDraggingRef.current) return
    const deltaX = e.clientX - lastXRef.current
    lastXRef.current = e.clientX
    const sensitivity = 0.18
    const deltaRotation = deltaX * sensitivity
    angleRef.current += deltaRotation
    velocityRef.current = deltaRotation
    setRotation(angleRef.current)
  }, [deviceType])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (deviceType === "mobile") return
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsGrabbing(false)
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {}
    resumeTimerRef.current = setTimeout(() => {
      isUserInteractingRef.current = false
    }, 2500)
  }, [deviceType])

  /* ── Arrow navigation ── */
  const rotateLeft = useCallback(() => {
    isUserInteractingRef.current = true
    if (!hasInteracted) {
      setHasInteracted(true)
      setShowHint(false)
    }
    velocityRef.current = 0
    const step = 360 / MEMBERS.length
    const target = angleRef.current - step
    const start = angleRef.current
    const diff = target - start
    const duration = 600
    const startTime = performance.now()

    const animateArrow = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      angleRef.current = start + diff * eased
      setRotation(angleRef.current)
      if (progress < 1) {
        requestAnimationFrame(animateArrow)
      } else {
        resumeTimerRef.current = setTimeout(() => {
          isUserInteractingRef.current = false
        }, 2500)
      }
    }
    requestAnimationFrame(animateArrow)
  }, [hasInteracted])

  const rotateRight = useCallback(() => {
    isUserInteractingRef.current = true
    if (!hasInteracted) {
      setHasInteracted(true)
      setShowHint(false)
    }
    velocityRef.current = 0
    const step = 360 / MEMBERS.length
    const target = angleRef.current + step
    const start = angleRef.current
    const diff = target - start
    const duration = 600
    const startTime = performance.now()

    const animateArrow = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      angleRef.current = start + diff * eased
      setRotation(angleRef.current)
      if (progress < 1) {
        requestAnimationFrame(animateArrow)
      } else {
        resumeTimerRef.current = setTimeout(() => {
          isUserInteractingRef.current = false
        }, 2500)
      }
    }
    requestAnimationFrame(animateArrow)
  }, [hasInteracted])

  /* Mouse parallax */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (deviceType === "mobile" || isDraggingRef.current) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    }
  }, [deviceType])

  const parallaxRotateX = isGrabbing ? 0 : mouseRef.current.y * -3
  const parallaxRotateY = isGrabbing ? 0 : mouseRef.current.x * 4

  const radius = deviceType === "tablet" ? 260 : 420
  const total = MEMBERS.length

  /* Inline keyframes for this component */
  useEffect(() => {
    const styleId = "team-orbit-keyframes"
    if (document.getElementById(styleId)) return
    const style = document.createElement("style")
    style.id = styleId
    style.textContent = `
      @keyframes float-particle {
        0% { transform: translateY(0) translateX(0); opacity: 0.3; }
        50% { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
        100% { transform: translateY(0) translateX(0); opacity: 0.3; }
      }
      @keyframes pulse-orb {
        0%, 100% { transform: scale(1); opacity: 0.6; }
        50% { transform: scale(1.15); opacity: 1; }
      }
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes pulse-glow {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 0.9; }
      }
      @keyframes hint-float {
        0%, 100% { transform: translateX(0); opacity: 0.6; }
        50% { transform: translateX(6px); opacity: 1; }
      }
    `
    document.head.appendChild(style)
    return () => {
      const el = document.getElementById(styleId)
      if (el) document.head.removeChild(el)
    }
  }, [])

  const show3D = deviceType === "desktop" || deviceType === "tablet"

  return (
    <section
      ref={sectionRef}
      id="team"
      role="region"
      aria-labelledby="team-title"
      className="relative min-h-screen bg-[#F7FFF9] dark:bg-[#060C0A] overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringSection(true)}
      onMouseLeave={() => setIsHoveringSection(false)}
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 z-0">
        {/* Grain texture via SVG noise */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
        {/* Radial green halo */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "80%",
            height: "80%",
            background: "radial-gradient(circle, rgba(0,232,122,0.06) 0%, transparent 60%)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />
        {/* Atmospheric vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.08) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      <ParticleField />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6 lg:px-8 py-14 md:py-18 lg:py-20">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerContainer}
        >
          <motion.p
            variants={headerItem}
            className="font-['Satoshi'] text-[11px] uppercase tracking-[0.22em] text-[#00E87A] mb-4"
          >
            — L'équipe derrière vos projets digitaux
          </motion.p>
          <motion.h2
            id="team-title"
            variants={headerItem}
            className="font-['Outfit'] font-extrabold text-[#071510] dark:text-[#F0FAF4] mb-5"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", lineHeight: 1.1 }}
          >
            Des passionnés à votre service.
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="font-['Satoshi'] font-light text-[#374151] dark:text-[#9CA3AF] max-w-xl mx-auto text-base md:text-lg leading-relaxed"
          >
            Designers, développeurs et créatifs passionnés qui construisent des expériences mémorables.
          </motion.p>
        </motion.div>

        {/* ── 3D Orbit (Desktop + Tablet) ── */}
        {show3D && (
          <div
            className="relative w-full select-none"
            style={{
              height: deviceType === "tablet" ? 520 : 680,
              perspective: deviceType === "tablet" ? 900 : 1200,
              touchAction: "none",
              cursor: isGrabbing ? "grabbing" : "grab",
            }}
          >
            {/* Drag/swipe hint */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 z-30 pointer-events-none"
              style={{ top: "-28px" }}
              initial={{ opacity: 0, y: 10 }}
              animate={showHint ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] uppercase tracking-widest text-[#00E87A]/80"
                style={{
                  background: "rgba(0,232,122,0.06)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(0,232,122,0.12)",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" style={{ animation: "hint-float 2s ease-in-out infinite" }}>
                  <path d="M7 11v 4a3 3 0 0 0 6 0v-4" />
                  <path d="M12 7v8" />
                  <path d="M9 10h6" />
                </svg>
                <span>Glissez pour explorer</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" style={{ animation: "hint-float 2s ease-in-out infinite reverse" }}>
                  <path d="M18 8L22 12L18 16" />
                  <path d="M6 8L2 12L6 16" />
                </svg>
              </div>
            </motion.div>

            {/* Navigation arrows */}
            <ArrowButton direction="left" onClick={rotateLeft} />
            <ArrowButton direction="right" onClick={rotateRight} />

            {/* Main orbit container */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${parallaxRotateX}deg) rotateY(${parallaxRotateY}deg)`,
                transition: "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Carousel inner */}
              <div
                className="relative"
                style={{
                  width: 1,
                  height: 1,
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${rotation}deg)`,
                }}
              >
                <CenterOrb />

                {MEMBERS.map((member, i) => (
                  <OrbitCard
                    key={member.id}
                    member={member}
                    index={i}
                    total={total}
                    rotation={rotation}
                    radius={radius}
                    isHovered={hoveredId === member.id}
                    onHover={() => setHoveredId(member.id)}
                    onLeave={() => setHoveredId(null)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Mobile Slider ── */}
        {!show3D && (
          <motion.div
            className="w-full overflow-x-auto flex gap-5 pb-8 pt-4 px-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Spacer for first card centering */}
            <div className="snap-center shrink-0 w-[11vw]" />
            {MEMBERS.map((member) => (
              <SliderCard key={member.id} member={member} />
            ))}
            {/* Spacer for last card centering */}
            <div className="snap-center shrink-0 w-[11vw]" />
          </motion.div>
        )}
      </div>
    </section>
  )
}
