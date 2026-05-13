"use client"

import React, { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"

/* ═══════════════════════════════════════════════════════════════════ */
/*  Inline brand icons (lucide-react v1 dropped these)               */
/* ═══════════════════════════════════════════════════════════════════ */

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const TwitterIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const InstagramIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const BehanceIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 3h6a4 4 0 0 1 4 4 4 4 0 0 1-4 4H3V3z" />
    <path d="M3 11h7a4 4 0 0 1 4 4 4 4 0 0 1-4 4H3v-8z" />
    <path d="M15 4h6" />
    <path d="M15 20a4 4 0 1 1 6-3.47" />
  </svg>
)

/* ═══════════════════════════════════════════════════════════════════ */
/*  Types                                                              */
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

/* ═══════════════════════════════════════════════════════════════════ */
/*  Data                                                               */
/* ═══════════════════════════════════════════════════════════════════ */

const MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Chadrack",
    role: "Director of Photography",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQFnmLdpZW78yA/profile-displayphoto-scale_200_200/B4DZvM8NB2JMAY-/0/1768669895649?e=2147483647&v=beta&t=5VGAB-2gYupLNaHvJHECollR25THd-3oR5wngGlQiY4",
    social: { twitter: "#", linkedin: "#", behance: "#" },
  },
  {
    id: "2",
    name: "Mak VieSainte",
    role: "Founder",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2vnSxNNVGZV2MXRjlGELl-NgLl5kXdpDR6A&s",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: "3",
    name: "Osiris Balonga",
    role: "Lead Front-End",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQGVqrPPAGHtoQ/profile-displayphoto-scale_200_200/B4DZwhAkjaHwAY-/0/1770080338529?e=2147483647&v=beta&t=q-_6p1VCJ8NN8eHj9zUFwJZds_XpKez9Hy14SAIDp4M",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: "4",
    name: "Jacques",
    role: "Product Owner",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQE-Z7-S1LSYNQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1724143166545?e=2147483647&v=beta&t=6IPCwgOzblGt4p2fEdnY74gMbLyRHii5Ite3A39qQsY",
    social: { linkedin: "#" },
  },
  {
    id: "5",
    name: "Riche Makso",
    role: "CTO — Product Designer",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQEkTAbZLlSrLg/profile-displayphoto-scale_200_200/B4DZoHdu8BGgAY-/0/1761061833315?e=2147483647&v=beta&t=Rg1dBTvq9X2heyhuhBwG2DsEkG65v0vQ35hF2FSeYns",
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
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const headerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const photoGridContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.25 },
  },
}

const photoCardVariant: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const listContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.4 },
  },
}

const listItemVariant: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const socialIconVariant: Variants = {
  hidden: { opacity: 0, y: 6, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.04,
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: { opacity: 0, y: 4, scale: 0.9, transition: { duration: 0.2 } },
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  PhotoCard                                                          */
/* ═══════════════════════════════════════════════════════════════════ */

function PhotoCard({
  member,
  isActive,
  isDimmed,
  onHover,
  onLeave,
}: {
  member: TeamMember
  isActive: boolean
  isDimmed: boolean
  onHover: () => void
  onLeave: () => void
}) {
  return (
    <motion.div
      variants={photoCardVariant}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={[
        "group relative overflow-hidden rounded-2xl cursor-pointer will-change-transform",
        isDimmed ? "opacity-40" : "opacity-100",
      ].join(" ")}
    >
      <img
        src={member.image}
        alt={`Portrait de ${member.name}`}
        loading="lazy"
        className={[
          "w-full aspect-[3/4] object-cover transition-all duration-700 ease-out",
          isActive
            ? "grayscale-0 brightness-100 scale-105"
            : "grayscale brightness-[0.65] scale-100",
        ].join(" ")}
      />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#F7FFF9]/60 dark:from-[#060C0A]/60 via-transparent to-transparent pointer-events-none" />

      {/* Socials — revealed on active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-x-0 bottom-0 p-4 flex items-center gap-3"
          >
            {member.social.twitter && (
              <motion.a
                href={member.social.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label={`Twitter de ${member.name}`}
                custom={0}
                variants={socialIconVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-8 h-8 rounded-full bg-[#071510]/10 dark:bg-[#F0FAF4]/10 backdrop-blur-sm flex items-center justify-center text-[#071510] dark:text-[#F0FAF4] hover:text-[#00E87A] hover:bg-[#00E87A]/20 transition-colors duration-200"
              >
                <TwitterIcon className="w-3.5 h-3.5" />
              </motion.a>
            )}
            {member.social.linkedin && (
              <motion.a
                href={member.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={`LinkedIn de ${member.name}`}
                custom={1}
                variants={socialIconVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-8 h-8 rounded-full bg-[#071510]/10 dark:bg-[#F0FAF4]/10 backdrop-blur-sm flex items-center justify-center text-[#071510] dark:text-[#F0FAF4] hover:text-[#00E87A] hover:bg-[#00E87A]/20 transition-colors duration-200"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </motion.a>
            )}
            {member.social.behance && (
              <motion.a
                href={member.social.behance}
                target="_blank"
                rel="noreferrer"
                aria-label={`Behance de ${member.name}`}
                custom={2}
                variants={socialIconVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-8 h-8 rounded-full bg-[#071510]/10 dark:bg-[#F0FAF4]/10 backdrop-blur-sm flex items-center justify-center text-[#071510] dark:text-[#F0FAF4] hover:text-[#00E87A] hover:bg-[#00E87A]/20 transition-colors duration-200"
              >
                <BehanceIcon className="w-3.5 h-3.5" />
              </motion.a>
            )}
            {member.social.instagram && (
              <motion.a
                href={member.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label={`Instagram de ${member.name}`}
                custom={3}
                variants={socialIconVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-8 h-8 rounded-full bg-[#071510]/10 dark:bg-[#F0FAF4]/10 backdrop-blur-sm flex items-center justify-center text-[#071510] dark:text-[#F0FAF4] hover:text-[#00E87A] hover:bg-[#00E87A]/20 transition-colors duration-200"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </motion.a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  MemberRow                                                          */
/* ═══════════════════════════════════════════════════════════════════ */

function MemberRow({
  member,
  isActive,
  isDimmed,
  onHover,
  onLeave,
}: {
  member: TeamMember
  isActive: boolean
  isDimmed: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const socials = [
    member.social.twitter && { key: "twitter", href: member.social.twitter, label: `Twitter de ${member.name}`, Icon: TwitterIcon },
    member.social.linkedin && { key: "linkedin", href: member.social.linkedin, label: `LinkedIn de ${member.name}`, Icon: LinkedinIcon },
    member.social.behance && { key: "behance", href: member.social.behance, label: `Behance de ${member.name}`, Icon: BehanceIcon },
    member.social.instagram && { key: "instagram", href: member.social.instagram, label: `Instagram de ${member.name}`, Icon: InstagramIcon },
  ].filter(Boolean) as { key: string; href: string; label: string; Icon: React.FC<{ className?: string }> }[]

  return (
    <motion.div
      variants={listItemVariant}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={[
        "flex items-center gap-4 py-5 border-b border-black/10 dark:border-white/10 cursor-pointer",
        isDimmed ? "opacity-40" : "opacity-100",
      ].join(" ")}
    >
      {/* Animated indicator */}
      <motion.span
        className="w-4 h-3 rounded-sm flex-shrink-0"
        animate={{
          backgroundColor: isActive ? "#00E87A" : "rgba(0, 232, 122, 0.3)",
          scale: isActive ? 1.08 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />

      {/* Name + role */}
      <div className="flex-1 min-w-0">
        <motion.h4
          className="text-base md:text-lg"
          style={{ fontFamily: "Bricolage Grotesque", fontWeight: 600 }}
          animate={{ color: isActive ? "#071510" : "rgba(7, 21, 16, 0.55)" }}
          transition={{ duration: 0.3 }}
        >
          {member.name}
        </motion.h4>
        <p
          className="text-[11px] uppercase tracking-[0.18em] text-[#4B5563] dark:text-[#6B7280] mt-0.5"
          style={{ fontFamily: "DM Sans", fontWeight: 400 }}
        >
          {member.role}
        </p>
      </div>

      {/* Social icons */}
      <div className="flex items-center gap-0.5">
        <AnimatePresence mode="popLayout">
          {isActive &&
            socials.map((s, i) => (
              <motion.a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                custom={i}
                variants={socialIconVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="p-1.5 rounded-md text-[#4B5563] dark:text-[#6B7280] hover:text-[#00E87A] hover:bg-[#00E87A]/10 transition-colors duration-200"
              >
                <s.Icon className="w-3.5 h-3.5" />
              </motion.a>
            ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Team section (export default)                                      */
/* ═══════════════════════════════════════════════════════════════════ */

export default function Team() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section
      role="region"
      aria-labelledby="team-title"
      className="bg-[#F7FFF9] dark:bg-[#060C0A] py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headerContainer}
        >
          <motion.p
            variants={headerItem}
            className="font-['Bricolage_Grotesque'] text-[11px] uppercase tracking-[0.2em] text-[#00E87A] mb-4"
          >
            — L'équipe derrière vos projets
          </motion.p>
          <motion.h2
            id="team-title"
            variants={headerItem}
            className="font-['Playfair_Display'] font-extrabold text-[#071510] dark:text-[#F0FAF4] mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Des passionnés à votre service.
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="font-['DM_Sans'] font-light text-[#4B5563] dark:text-[#6B7280] max-w-xl mx-auto text-center text-base md:text-lg leading-relaxed"
          >
            Une équipe soudée, créative et engagée — chaque projet est traité
            avec la même exigence.
          </motion.p>
        </motion.div>

        {/* ── Content grid ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Photo mosaic */}
          <motion.div
            className="w-full lg:w-3/5 flex md:grid md:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={photoGridContainer}
          >
            {MEMBERS.map((member, i) => {
              const isActive = hoveredId === member.id
              const isDimmed = hoveredId !== null && !isActive
              const offsetClass =
                i % 3 === 1
                  ? "md:mt-[68px]"
                  : i % 3 === 2
                    ? "md:mt-[32px]"
                    : ""

              return (
                <div
                  key={member.id}
                  className={[
                    "snap-center shrink-0 w-[45%] min-w-[150px] md:w-auto md:min-w-0 md:snap-none md:shrink",
                    offsetClass,
                  ].join(" ")}
                >
                  <PhotoCard
                    member={member}
                    isActive={isActive}
                    isDimmed={isDimmed}
                    onHover={() => setHoveredId(member.id)}
                    onLeave={() => setHoveredId(null)}
                  />
                </div>
              )
            })}
          </motion.div>

          {/* Member list */}
          <motion.div
            className="w-full lg:w-2/5 flex flex-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={listContainer}
          >
            {MEMBERS.map((member) => {
              const isActive = hoveredId === member.id
              const isDimmed = hoveredId !== null && !isActive
              return (
                <MemberRow
                  key={member.id}
                  member={member}
                  isActive={isActive}
                  isDimmed={isDimmed}
                  onHover={() => setHoveredId(member.id)}
                  onLeave={() => setHoveredId(null)}
                />
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
