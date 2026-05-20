'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useIsMobile } from '../../hooks/useIsMobile'

/* ═══════════════════════════════════════════════════════════════════ */
/*  Inline SVG icons — brand marks                                    */
/* ═══════════════════════════════════════════════════════════════════ */

function ReactIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="-11 -11 22 22" className={className} fill="none">
      <circle r="1.8" fill="#61DAFB" />
      <ellipse rx="9.5" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" />
      <ellipse rx="9.5" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60)" />
      <ellipse rx="9.5" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120)" />
    </svg>
  )
}

function NextjsIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} text-[#071510] dark:text-[#F0FAF4]`} fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 5.5l6.5 8.5V7.5h1v9h-1.5l-6.5-8.5v8.5h-1.5v-9h1.5z" />
    </svg>
  )
}

function TypeScriptIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <path d="M14.5 16.5v1.2c-.4.2-.9.3-1.4.3-.6 0-1.1-.2-1.5-.5-.4-.3-.5-.8-.5-1.3 0-.3.1-.6.2-.8.2-.2.4-.4.7-.6.3-.2.7-.3 1.1-.4.3-.1.6-.2.8-.3.2-.1.3-.2.3-.4 0-.2-.1-.3-.2-.4-.1-.1-.3-.1-.5-.1-.4 0-.8.1-1.1.4l-.9-.9c.5-.4 1.1-.6 1.9-.6.7 0 1.3.2 1.7.5.4.3.6.8.6 1.4 0 .4-.1.7-.3 1-.2.2-.5.4-.8.6-.3.2-.7.3-1.2.4-.4.1-.7.2-.8.3-.2.1-.2.2-.2.4 0 .2.1.3.2.4.1.1.3.1.6.1.4 0 .8-.1 1.2-.4l.8.9zM18 12.5h-1.5v-1.2H21v1.2h-1.5v4.8H18v-4.8z" fill="white" />
    </svg>
  )
}

function TailwindIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M4 12c1.5-3 3.5-5 6.5-5s3 4 6.5 4 5-2 6.5-4" stroke="#38B2AC" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 16c1.5-3 3.5-5 6.5-5s3 4 6.5 4 5-2 6.5-4" stroke="#38B2AC" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function NodejsIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M12 2l10 6v8l-10 6L2 16V8z" fill="#339933" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
        N
      </text>
    </svg>
  )
}

function LaravelIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 52" className={className} fill="none">
      <path
        d="M49.626 11.564c-.005-.001-.01-.003-.014-.005a.072.072 0 00-.025-.01c-.003 0-.007 0-.01-.002L31.512 5.478a.19.19 0 00-.155.035.185.185 0 00-.07.143v9.092c0 .073.04.14.105.173a.19.19 0 00.193-.01l5.44-3.272a.184.184 0 01.185 0 .185.185 0 01.093.16v16.284a.185.185 0 01-.093.16.19.19 0 01-.185 0l-5.44-3.27a.189.189 0 00-.193-.012.188.188 0 00-.105.174v9.091c0 .072.04.14.105.173.055.028.12.03.176.005l18.065-6.07a.188.188 0 00.12-.176V11.758a.186.186 0 00-.106-.175.19.19 0 00-.04-.02zM.538 5.582c-.006.002-.012.004-.017.007a.073.073 0 00-.025.01c-.003.001-.006.002-.009.003L.47 5.61l-.003.003-.01.007-.003.004-.005.007-.003.005-.005.007-.003.006-.004.007-.003.007-.003.007-.003.008-.002.007-.003.008-.002.008-.002.009-.002.008-.002.01-.002.009-.001.01-.002.01-.001.01-.001.01-.001.011v.01l-.001.011v21.986c0 .06.03.115.08.146l.01.006.01.005.01.004.01.003.01.003.01.002.011.002.01.001.011.001.01.001h.011l18.05 2.997a.19.19 0 00.155-.035.185.185 0 00.07-.143V21.34a.185.185 0 00-.105-.174.19.19 0 00-.193.012l-5.44 3.27a.185.185 0 01-.185 0 .185.185 0 01-.093-.16V8.004a.185.185 0 01.093-.16.19.19 0 01.185 0l5.44 3.272a.188.188 0 00.193.012.188.188 0 00.105-.174V2.763a.185.185 0 00-.08-.148L.644 5.58a.19.19 0 00-.106.002z"
        fill="#FF2D20"
      />
      <path
        d="M24.518 5.478a.19.19 0 00-.155.035.185.185 0 00-.07.143v9.092c0 .073.04.14.105.173a.19.19 0 00.193-.01l5.44-3.272a.184.184 0 01.185 0 .185.185 0 01.093.16v16.284a.185.185 0 01-.093.16.19.19 0 01-.185 0l-5.44-3.27a.189.189 0 00-.193-.012.188.188 0 00-.105.174v9.091c0 .072.04.14.105.173.055.028.12.03.176.005l18.065-6.07a.188.188 0 00.12-.176V11.758a.186.186 0 00-.106-.175.19.19 0 00-.04-.02l-.014-.005a.072.072 0 00-.025-.01c-.003 0-.007 0-.01-.002L24.518 5.478z"
        fill="#FF2D20"
      />
    </svg>
  )
}

function ExpressIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} text-[#071510] dark:text-[#F0FAF4]`}>
      <text x="12" y="15" textAnchor="middle" fill="currentColor" fontSize="6.5" fontWeight="700" fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif" letterSpacing="0.3">
        express
      </text>
    </svg>
  )
}

function MysqlIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <ellipse cx="12" cy="6" rx="7" ry="2.5" stroke="#4479A1" strokeWidth="1.5" fill="#4479A1" fillOpacity="0.15" />
      <path d="M5 6v11c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V6" stroke="#4479A1" strokeWidth="1.5" />
      <path d="M5 11.5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5" stroke="#4479A1" strokeWidth="1.5" />
    </svg>
  )
}

function FlutterIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M12.35 2L5.1 14.45l3.1 5.3L18.6 7.1 12.35 2z" fill="#02569B" />
      <path d="M15.2 19.75l-3.1-5.3H7.3l3.1 5.3h4.8z" fill="#02569B" />
      <path d="M12.35 14.45L9.25 9.15H4.45l3.1 5.3h4.8z" fill="#13B9FD" />
      <path d="M18.6 7.1l3.1 5.3h-4.8l-1.55-2.65 3.25-2.65z" fill="#13B9FD" />
    </svg>
  )
}

function ElectronIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="1.8" fill="#47848F" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke="#47848F" strokeWidth="1.2" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke="#47848F" strokeWidth="1.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke="#47848F" strokeWidth="1.2" transform="rotate(120 12 12)" />
      <circle cx="17" cy="7.5" r="1.1" fill="#9FEAF9" />
      <circle cx="5" cy="16" r="1.1" fill="#9FEAF9" />
    </svg>
  )
}

function FigmaIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <circle cx="7" cy="5" r="3.5" fill="#F24E1E" />
      <circle cx="15" cy="5" r="3.5" fill="#FF7262" />
      <circle cx="7" cy="12" r="3.5" fill="#A259FF" />
      <circle cx="15" cy="12" r="3.5" fill="#0ACF83" />
      <circle cx="7" cy="19" r="3.5" fill="#1ABCFE" />
    </svg>
  )
}

function AdobeXdIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect width="24" height="24" rx="4" fill="#470137" />
      <text x="12" y="17" textAnchor="middle" fill="#FF61F6" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
        Xd
      </text>
    </svg>
  )
}

function PhotoshopIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect width="24" height="24" rx="4" fill="#001E36" />
      <text x="12" y="17" textAnchor="middle" fill="#31A8FF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
        Ps
      </text>
    </svg>
  )
}

function VercelIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} text-[#071510] dark:text-[#F0FAF4]`} fill="currentColor">
      <path d="M12 2L2 22h20L12 2z" />
    </svg>
  )
}

function FirebaseIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M12 2s-2 4-2 8c0 2 1 3 2 3s2-1 2-3c0-4-2-8-2-8z" fill="#FFA000" />
      <path d="M12 13c-1 0-2 1-2 2.5 0 3 2 6.5 2 6.5s2-3.5 2-6.5c0-1.5-1-2.5-2-2.5z" fill="#FFCA28" />
    </svg>
  )
}

function DockerIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M22.3 10.5c-.1-.1-.3-.1-.4 0-1 .6-2.1.9-3.3.9-.4 0-.8 0-1.2-.1-.1 0-.2-.1-.2-.2v-1.4c0-.3-.2-.5-.5-.5H3.5c-.3 0-.5.2-.5.5v8.5c0 .3.2.5.5.5h1.5c.3 0 .5-.2.5-.5v-.5h1v.5c0 .3.2.5.5.5h1.5c.3 0 .5-.2.5-.5v-.5h1v.5c0 .3.2.5.5.5h1.5c.3 0 .5-.2.5-.5v-.5h1v.5c0 .3.2.5.5.5h1.5c.3 0 .5-.2.5-.5v-.5h1v.5c0 .3.2.5.5.5h1.5c.3 0 .5-.2.5-.5v-.5h1v.5c0 .3.2.5.5.5h1.5c.3 0 .5-.2.5-.5v-3.5c.1 0 .3-.1.4-.1.3-.1.5-.4.5-.7 0-.4-.3-.7-.7-.7zM6 15.5H5v-1.5h1v1.5zm0-2.5H5v-1.5h1V13zm2.5 2.5h-1v-1.5h1v1.5zm0-2.5h-1v-1.5h1V13zm2.5 2.5h-1v-1.5h1v1.5zm0-2.5h-1v-1.5h1V13zm2.5 2.5h-1v-1.5h1v1.5zm0-2.5h-1v-1.5h1V13z" fill="#2496ED" />
      <path d="M23.5 9.5c-.1-.1-.2-.1-.3 0-.4.2-.8.4-1.2.5-.1 0-.2 0-.3-.1-.2-.2-.4-.3-.6-.5-.1-.1-.1-.2-.1-.3 0-.5-.2-1-.5-1.4-.1-.1-.2-.1-.3-.1-.5.1-1 .4-1.3.8-.1.1-.2.1-.3.1-.4-.1-.8-.1-1.2-.1-.4 0-.8.1-1.2.2-.1 0-.2 0-.2-.1-.3-.4-.8-.7-1.3-.8-.1 0-.2 0-.3.1-.3.4-.5.9-.5 1.4 0 .1 0 .2-.1.3-.2.2-.4.4-.6.5-.1.1-.2.1-.3.1-.4-.1-.8-.3-1.2-.5-.1 0-.2-.1-.3 0-.2.1-.3.3-.3.5 0 .2.1.4.3.5 1.3.7 2.8 1.1 4.3 1.1 1.5 0 3-.4 4.3-1.1.2-.1.3-.3.3-.5 0-.2-.1-.4-.3-.5z" fill="#2496ED" opacity="0.6" />
    </svg>
  )
}

function GithubIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} text-[#071510] dark:text-[#F0FAF4]`} fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Data                                                               */
/* ═══════════════════════════════════════════════════════════════════ */

interface Tech {
  name: string
  icon: React.ReactNode
  description: string
  category: string
  size: 'sm' | 'md' | 'lg'
}

const TECHS: Tech[] = [
  { name: 'React', icon: <ReactIcon />, description: 'Bibliothèque JavaScript pour interfaces utilisateur dynamiques et réactives.', category: 'Frontend', size: 'lg' },
  { name: 'Next.js', icon: <NextjsIcon />, description: 'Framework React pour applications web performantes avec rendu hybride.', category: 'Frontend', size: 'md' },
  { name: 'TypeScript', icon: <TypeScriptIcon />, description: 'Superset JavaScript typé pour un code plus robuste et maintenable.', category: 'Frontend', size: 'lg' },
  { name: 'Tailwind CSS', icon: <TailwindIcon />, description: 'Framework CSS utility-first pour un design rapide et cohérent.', category: 'Frontend', size: 'md' },
  { name: 'Node.js', icon: <NodejsIcon />, description: 'Runtime JavaScript côté serveur pour des applications scalables.', category: 'Backend', size: 'lg' },
  { name: 'Laravel', icon: <LaravelIcon />, description: 'Framework PHP élégant pour le développement web rapide et structuré.', category: 'Backend', size: 'md' },
  { name: 'Express', icon: <ExpressIcon />, description: 'Framework web minimaliste et flexible pour Node.js.', category: 'Backend', size: 'sm' },
  { name: 'MySQL', icon: <MysqlIcon />, description: 'Système de gestion de base de données relationnelle open-source.', category: 'Backend', size: 'sm' },
  { name: 'Flutter', icon: <FlutterIcon />, description: 'Framework UI pour applications mobiles multiplateformes performantes.', category: 'Mobile', size: 'md' },
  { name: 'Electron', icon: <ElectronIcon />, description: 'Framework pour applications desktop multiplateformes avec web technologies.', category: 'Mobile', size: 'md' },
  { name: 'Figma', icon: <FigmaIcon />, description: 'Outil de design collaboratif basé sur le cloud.', category: 'Design', size: 'lg' },
  { name: 'Adobe XD', icon: <AdobeXdIcon />, description: 'Outil de conception d\'expériences utilisateur et de prototypes.', category: 'Design', size: 'sm' },
  { name: 'Photoshop', icon: <PhotoshopIcon />, description: 'Logiciel de retouche d\'image et de création graphique professionnel.', category: 'Design', size: 'sm' },
  { name: 'Vercel', icon: <VercelIcon />, description: 'Plateforme de déploiement et d\'hébergement pour le front-end.', category: 'DevOps', size: 'sm' },
  { name: 'Firebase', icon: <FirebaseIcon />, description: 'Plateforme de développement d\'applications avec backend intégré.', category: 'DevOps', size: 'md' },
  { name: 'Docker', icon: <DockerIcon />, description: 'Plateforme de conteneurisation pour le déploiement portable.', category: 'DevOps', size: 'lg' },
  { name: 'GitHub', icon: <GithubIcon />, description: 'Plateforme de gestion de code source et de collaboration.', category: 'DevOps', size: 'lg' },
]

/* ═══════════════════════════════════════════════════════════════════ */
/*  Hexagon geometry                                                   */
/* ═══════════════════════════════════════════════════════════════════ */

const HEX_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

const HEX_SIZES = {
  sm: { outer: { w: 72, h: 62 }, inner: { w: 68, h: 58 } },
  md: { outer: { w: 88, h: 76 }, inner: { w: 84, h: 72 } },
  lg: { outer: { w: 104, h: 90 }, inner: { w: 100, h: 86 } },
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Tech Modal (mobile)                                                */
/* ═══════════════════════════════════════════════════════════════════ */

function TechModal({ tech, onClose }: { tech: Tech; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const dims = HEX_SIZES.lg

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-6 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        className="relative w-full max-w-sm rounded-2xl border border-[rgba(0,232,122,0.2)] bg-[#F7FFF9] dark:bg-[#071510] p-6 shadow-2xl"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#071510]/80 dark:text-[#F0FAF4]/80 transition-colors hover:bg-[rgba(0,232,122,0.1)] hover:text-[#00E87A]"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Hexagon logo */}
        <div className="mb-5 flex justify-center">
          <div
            className="relative flex items-center justify-center"
            style={{ width: dims.outer.w, height: dims.outer.h, clipPath: HEX_CLIP, background: 'rgba(0,232,122,0.15)' }}
          >
            <div
              className="flex items-center justify-center bg-white/82 dark:bg-[#071510]"
              style={{ width: dims.inner.w, height: dims.inner.h, clipPath: HEX_CLIP }}
            >
              {tech.icon}
            </div>
          </div>
        </div>

        {/* Name */}
        <h3 className="mb-2 text-center font-['Outfit'] text-2xl font-bold text-[#071510] dark:text-[#F0FAF4]">
          {tech.name}
        </h3>

        {/* Category badge */}
        <div className="mb-4 flex justify-center">
          <span className="inline-block rounded-full border border-[rgba(0,232,122,0.2)] bg-[rgba(0,232,122,0.08)] px-3 py-1 font-['Satoshi'] text-[10px] font-medium uppercase tracking-[0.15em] text-[#00E87A]">
            {tech.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-center font-['Satoshi'] text-sm leading-relaxed text-[#071510]/75 dark:text-[#F0FAF4]/75">
          {tech.description}
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Tech Grid Item                                                     */
/* ═══════════════════════════════════════════════════════════════════ */

function TechGridItem({
  tech,
  index,
  onSelect,
}: {
  tech: Tech
  index: number
  onSelect: (tech: Tech) => void
}) {
  const dims = HEX_SIZES[tech.size]

  return (
    <motion.div
      className="group relative flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Floating micro-animation wrapper */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 4 + (index % 3) * 0.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.15,
        }}
      >
        <button
          className="relative flex cursor-pointer items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E87A]/50"
          onClick={() => onSelect(tech)}
          aria-label={`${tech.name} — ${tech.category}`}
        >
          {/* Outer hexagon (border) */}
          <div
            className="relative flex items-center justify-center transition-colors duration-300 group-hover:bg-[rgba(0,232,122,0.3)]"
            style={{
              width: dims.outer.w,
              height: dims.outer.h,
              clipPath: HEX_CLIP,
              background: 'rgba(0,232,122,0.12)',
            }}
          >
            {/* Inner hexagon (fill) */}
            <div
              className="flex items-center justify-center bg-white/82 dark:bg-[#071510] transition-colors duration-300 group-hover:bg-[#F0FAF4] dark:group-hover:bg-[#0a1812]"
              style={{
                width: dims.inner.w,
                height: dims.inner.h,
                clipPath: HEX_CLIP,
              }}
            >
              {tech.icon}
            </div>
          </div>

          {/* Glow effect on hover */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              filter: 'drop-shadow(0 0 16px rgba(0,232,122,0.35))',
              clipPath: HEX_CLIP,
            }}
          />
        </button>
      </motion.div>

      {/* Desktop tooltip */}
      <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 hidden w-56 -translate-x-1/2 md:group-hover:block">
        <div className="relative rounded-xl border border-[rgba(0,232,122,0.15)] bg-[#F7FFF9] dark:bg-[#071510]/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="mb-1 font-inter text-sm font-semibold text-[#071510] dark:text-[#F0FAF4]">
            {tech.name}
          </div>
          <p className="mb-2.5 text-xs leading-relaxed text-[#071510]/75 dark:text-[#F0FAF4]/75">
            {tech.description}
          </p>
          <span className="inline-block rounded-full border border-[rgba(0,232,122,0.2)] bg-[rgba(0,232,122,0.08)] px-2 py-0.5 font-['Satoshi'] text-[10px] font-medium uppercase tracking-[0.15em] text-[#00E87A]">
            {tech.category}
          </span>

          {/* Arrow */}
          <div
            className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent"
            style={{ borderTopColor: 'rgba(33,26,22,0.95)' }}
          />
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Main Section                                                       */
/* ═══════════════════════════════════════════════════════════════════ */

export default function StackTechnologique() {
  const [selectedTech, setSelectedTech] = useState<Tech | null>(null)
  const isMobile = useIsMobile()

  const handleSelect = useCallback((tech: Tech) => {
    if (isMobile) {
      setSelectedTech(tech)
    }
  }, [isMobile])

  return (
    <section
      id="stack"
      className="relative overflow-hidden bg-[#F7FFF9] dark:bg-[#060C0A] py-16 md:py-20 lg:py-24"
      aria-label="Stack technologique"
    >
      {/* Subtle radial halo */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.05]"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,232,122,0.5) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Ultra subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,232,122,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,232,122,0.3) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        {/* Label */}
        <motion.span
          className="mb-6 inline-flex items-center gap-3 font-['Satoshi'] text-xs font-medium uppercase tracking-[0.2em] text-[#00E87A]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="h-px w-6 bg-[#00E87A]" />
          Notre stack
        </motion.span>

        {/* Title */}
        <motion.h2
          className="mb-6 max-w-4xl font-['Outfit'] text-4xl font-bold leading-tight text-[#071510] dark:text-[#F0FAF4] md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          Nos technologies
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="mb-16 max-w-xl font-['Satoshi'] text-base leading-relaxed text-[#071510]/80 dark:text-[#F0FAF4]/80 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
        >
          Les outils et technologies qui propulsent nos projets.
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 md:gap-x-6 md:gap-y-10">
          {TECHS.map((tech, i) => (
            <TechGridItem
              key={tech.name}
              tech={tech}
              index={i}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* Mobile Modal */}
      <AnimatePresence>
        {selectedTech && (
          <TechModal
            tech={selectedTech}
            onClose={() => setSelectedTech(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
