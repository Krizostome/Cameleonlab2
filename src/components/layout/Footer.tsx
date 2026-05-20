"use client"

import React, { useState } from "react"
import { Link, useLocation } from 'react-router-dom'
import { motion, Variants, useReducedMotion } from "framer-motion"

/* ═══════════════════════════════════════════════════════════════════ */
/*  Inline brand icons (lucide-react v1 dropped these)               */
/* ═══════════════════════════════════════════════════════════════════ */

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
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

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
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

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
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

const BehanceIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
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

const MailIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
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
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const PhoneIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MapPinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
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
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

/* ═══════════════════════════════════════════════════════════════════ */
/*  Data                                                               */
/* ═══════════════════════════════════════════════════════════════════ */

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Navigation",
    links: [
      { label: "Accueil", href: "/" },
      { label: "À propos", href: "#about" },
      { label: "Blog", href: "/blog" },
      { label: "Services", href: "#services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Processus", href: "#process" },
      { label: "Équipe", href: "#team" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Design", href: "#" },
      { label: "Développement Web", href: "#" },
      { label: "Mobile App", href: "#" },
      { label: "Branding", href: "#" },
      { label: "SEO", href: "#" },
      { label: "UX/UI", href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "hello@cameleonlab.com", href: "mailto:hello@cameleonlab.com" },
      { label: "+33 6 12 34 56 78", href: "tel:+33612345678" },
      { label: "Cotonou, Bénin", href: "#" },
    ],
  },
]

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "Behance", href: "#", Icon: BehanceIcon },
  { label: "Twitter / X", href: "#", Icon: TwitterIcon },
]

/* ═══════════════════════════════════════════════════════════════════ */
/*  Framer Motion variants                                             */
/* ═══════════════════════════════════════════════════════════════════ */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  FooterLinkItem                                                     */
/* ═══════════════════════════════════════════════════════════════════ */

function FooterLinkItem({ href, children }: { href: string; children: React.ReactNode }) {
  const { pathname } = useLocation()
  const isExternal = href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')
  const isRoute = href.startsWith('/')
  const isAnchor = href.startsWith('#')

  const className =
    'group inline-flex items-center gap-1.5 text-[#071510]/75 dark:text-[#F0FAF4]/75 hover:text-[#00E87A] transition-all duration-300 text-sm'

  const inner = (
    <>
      <span className="relative">
        {children}
        <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-[#00E87A] transition-all duration-300 group-hover:w-full" />
      </span>
      <motion.span className="inline-block opacity-0 -translate-x-1 text-[#00E87A] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
        →
      </motion.span>
    </>
  )

  if (isExternal) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    )
  }

  if (isRoute) {
    return (
      <Link to={href} className={className}>
        {inner}
      </Link>
    )
  }

  // Anchor link
  if (pathname === '/') {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    )
  }

  return (
    <Link to={`/${href}`} className={className}>
      {inner}
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  SocialIcon                                                         */
/* ═══════════════════════════════════════════════════════════════════ */

function SocialIcon({
  href,
  label,
  Icon,
}: {
  href: string
  label: string
  Icon: React.FC<{ className?: string }>
}) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      whileHover={{ scale: 1.12, rotate: 4 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 bg-[#071510]/[0.03] dark:bg-[#F0FAF4]/[0.03] flex items-center justify-center text-[#071510]/80 dark:text-[#F0FAF4]/80 hover:text-[#00E87A] hover:border-[#00E87A]/40 hover:bg-[#00E87A]/10 transition-colors duration-300"
    >
      <Icon className="w-4 h-4" />
    </motion.a>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Main Footer                                                        */
/* ═══════════════════════════════════════════════════════════════════ */

export default function Footer() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail("")
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <footer className="relative bg-[#F7FFF9] dark:bg-[#060C0A] overflow-hidden">
      {/* ── Decorative giant text ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-['Outfit'] font-black text-[#071510]/[0.04] dark:text-[#F0FAF4]/[0.035] whitespace-nowrap"
          style={{ fontSize: "clamp(4.5rem, 12.6vw, 11.7rem)" }}
        >
          CAMELEONLAB
        </span>
      </div>

      {/* ── Radial glow ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,232,122,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Grain texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Top decorative line ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[#00E87A]/20 to-transparent" />
      </div>

      {/* ── Main content ── */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
      >
        {/* Branding + Nav grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Branding + Newsletter column */}
          <motion.div variants={itemVariants} className="lg:col-span-6">
            <a
              href="#"
              className="inline-block font-['Outfit'] font-bold text-2xl md:text-3xl text-[#071510] dark:text-[#F0FAF4] mb-4 tracking-tight"
            >
              cameleon<span className="text-[#00E87A]">lab</span>
            </a>
            <p className="text-[#071510]/80 dark:text-[#F0FAF4]/80 text-sm leading-relaxed max-w-md mb-6">
              Nous créons des expériences digitales modernes, élégantes et mémorables.
            </p>
            <div className="flex items-center gap-3 mb-10">
              {SOCIAL_LINKS.map((social) => (
                <SocialIcon
                  key={social.label}
                  href={social.href}
                  label={social.label}
                  Icon={social.Icon}
                />
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#00E87A] mb-4 font-['Satoshi'] font-semibold">
                Restons connectés
              </h3>
              <p className="text-[#071510]/80 dark:text-[#F0FAF4]/80 text-sm leading-relaxed mb-4 max-w-md">
                Recevez nos actualités, inspirations et conseils digitaux directement dans votre boîte mail.
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Saisissez votre adresse email..."
                    className="w-full px-4 py-2.5 rounded-lg bg-[#071510]/[0.04] dark:bg-[#F0FAF4]/[0.04] border border-black/10 dark:border-white/10 text-[#071510] dark:text-[#F0FAF4] text-sm placeholder:text-[#374151] dark:text-[#9CA3AF]/50 focus:outline-none focus:border-[#00E87A]/40 focus:bg-[#00E87A]/[0.04] transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2.5 rounded-lg bg-[#00E87A] text-[#071510] dark:text-[#F0FAF4] font-['Satoshi'] font-semibold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,232,122,0.25)] transition-shadow duration-300"
                >
                  {submitted ? "✓" : "OK"}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Navigation columns */}
          {FOOTER_COLUMNS.map((column) => (
            <motion.div
              key={column.title}
              variants={columnVariants}
              className="lg:col-span-2"
            >
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#00E87A] mb-5 font-['Satoshi'] font-semibold">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLinkItem href={link.href}>{link.label}</FooterLinkItem>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ── Contact info row ── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-8 border-t border-black/10 dark:border-white/10"
        >
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="mailto:hello@cameleonlab.com"
              className="flex items-center gap-2 text-[#071510]/40 dark:text-[#F0FAF4]/40 hover:text-[#00E87A] transition-colors duration-300 text-sm"
            >
              <MailIcon className="w-4 h-4" />
              <span>hello@cameleonlab.com</span>
            </a>
            <a
              href="tel:+33612345678"
              className="flex items-center gap-2 text-[#071510]/40 dark:text-[#F0FAF4]/40 hover:text-[#00E87A] transition-colors duration-300 text-sm"
            >
              <PhoneIcon className="w-4 h-4" />
              <span>+33 6 12 34 56 78</span>
            </a>
            <span className="flex items-center gap-2 text-[#071510]/40 dark:text-[#F0FAF4]/40 text-sm">
              <MapPinIcon className="w-4 h-4" />
              <span>Cotonou, Bénin</span>
            </span>
          </div>

          <p className="text-[#071510]/25 dark:text-[#F0FAF4]/25 text-xs font-['Satoshi'] tracking-wide">
            © {new Date().getFullYear()} CameleonLab. Tous droits réservés.
          </p>
        </motion.div>

        {/* ── Bottom decorative line ── */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-[#00E87A]/10 to-transparent" />

        {/* ── Legal links ── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-6 mt-6"
        >
          {["Mentions légales", "Politique de confidentialité", "CGV"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[#071510]/25 dark:text-[#F0FAF4]/25 hover:text-[#00E87A]/70 transition-colors duration-300 text-xs tracking-wide"
            >
              {item}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </footer>
  )
}
