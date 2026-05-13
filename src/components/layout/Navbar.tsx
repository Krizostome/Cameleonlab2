'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ThemeToggle from '../ui/ThemeToggle'

/** Navigation link descriptor */
interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'À propos', href: '#about' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Sticky premium navigation bar for CameleonLab.
 * Features entrance animations, scroll-driven glass background,
 * mobile hamburger with GSAP morphing, and a shimmering CTA.
 */
export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const shimmerRef = useRef<HTMLSpanElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const bar1Ref = useRef<HTMLSpanElement>(null)
  const bar2Ref = useRef<HTMLSpanElement>(null)
  const bar3Ref = useRef<HTMLSpanElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileOpenRef = useRef(mobileOpen)
  mobileOpenRef.current = mobileOpen

  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      // ── Entrance animation: fadeSlideDown with stagger ──
      if (!prefersReduced) {
        const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        entranceTl.fromTo(
          logoRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 }
        )

        if (linksRef.current) {
          const linkItems = linksRef.current.querySelectorAll<HTMLAnchorElement>('a')
          entranceTl.fromTo(
            linkItems,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
            '-=0.5'
          )
        }

        entranceTl.fromTo(
          ctaRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
      }

      // ── ScrollTrigger: glass background on scroll ──
      if (!prefersReduced && navRef.current) {
        gsap.to(navRef.current, {
          scrollTrigger: {
            trigger: navRef.current,
            start: 'top top',
            end: '+=80',
            scrub: false,
            toggleActions: 'play none none reverse',
          },
          backgroundColor: 'rgba(26, 20, 16, 0.8)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottomColor: 'rgba(232, 213, 163, 1)',
          duration: 0.35,
          ease: 'power2.out',
        })
      } else if (navRef.current) {
        // For reduced motion: instant switch via CSS class on scroll listener
        const onScroll = () => {
          if (window.scrollY > 40) {
            navRef.current!.style.backgroundColor = 'rgba(26, 20, 16, 0.8)'
            navRef.current!.style.backdropFilter = 'blur(24px)'
            navRef.current!.style.borderBottomColor = 'rgba(232, 213, 163, 1)'
          } else {
            navRef.current!.style.backgroundColor = 'transparent'
            navRef.current!.style.backdropFilter = 'blur(0px)'
            navRef.current!.style.borderBottomColor = 'transparent'
          }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
      }

      // ── CTA shimmer loop ──
      if (!prefersReduced && shimmerRef.current) {
        gsap.fromTo(
          shimmerRef.current,
          { x: '-100%' },
          {
            x: '300%',
            duration: 2.5,
            repeat: -1,
            ease: 'none',
          }
        )
      }
    }, navRef)

    return () => {
      ctx.revert()
    }
  }, [])

  // ── Mobile hamburger GSAP morph ──
  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (mobileOpen) {
        // Animate to X
        if (!prefersReduced) {
          gsap.to(bar1Ref.current, { rotate: 45, y: 6, duration: 0.3, ease: 'power2.out' })
          gsap.to(bar2Ref.current, { opacity: 0, duration: 0.2, ease: 'power2.out' })
          gsap.to(bar3Ref.current, { rotate: -45, y: -6, duration: 0.3, ease: 'power2.out' })
          gsap.fromTo(
            mobileMenuRef.current,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' }
          )
        } else {
          gsap.set(bar1Ref.current, { rotate: 45, y: 6 })
          gsap.set(bar2Ref.current, { opacity: 0 })
          gsap.set(bar3Ref.current, { rotate: -45, y: -6 })
          gsap.set(mobileMenuRef.current, { height: 'auto', opacity: 1 })
        }
      } else {
        // Revert to hamburger
        if (!prefersReduced) {
          gsap.to(bar1Ref.current, { rotate: 0, y: 0, duration: 0.3, ease: 'power2.out' })
          gsap.to(bar2Ref.current, { opacity: 1, duration: 0.2, ease: 'power2.out' })
          gsap.to(bar3Ref.current, { rotate: 0, y: 0, duration: 0.3, ease: 'power2.out' })
          gsap.to(mobileMenuRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power3.inOut' })
        } else {
          gsap.set(bar1Ref.current, { rotate: 0, y: 0 })
          gsap.set(bar2Ref.current, { opacity: 1 })
          gsap.set(bar3Ref.current, { rotate: 0, y: 0 })
          gsap.set(mobileMenuRef.current, { height: 0, opacity: 0 })
        }
      }
    }, hamburgerRef)

    return () => ctx.revert()
  }, [mobileOpen])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-colors duration-300"
      style={{ backgroundColor: 'transparent' }}
      aria-label="Navigation principale"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        {/* Logo */}
        <a
          ref={logoRef}
          href="/"
          className="flex items-center gap-2 opacity-0"
          style={{ willChange: 'transform, opacity' }}
        >
          <span className="font-bricolage text-xl font-bold tracking-tight text-[#071510] dark:text-[#F0FAF4] md:text-2xl">
            CameleonLab
          </span>
        </a>

        {/* Desktop links */}
        <div
          ref={linksRef}
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link-underline font-dm-sans text-sm font-medium text-[#071510]/90 dark:text-[#F0FAF4]/90 transition-colors hover:text-[#00E87A]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Theme toggle — desktop */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        {/* CTA */}
        <button
          ref={ctaRef}
          className="relative hidden overflow-hidden rounded-full bg-[#00E87A] px-6 py-2.5 font-bricolage text-sm font-extrabold text-[#071510] dark:text-[#F0FAF4] md:block opacity-0"
          style={{ willChange: 'transform, opacity' }}
          onClick={() => window.location.href = '#contact'}
        >
          <span className="relative z-10">Démarrer un projet</span>
          <span
            ref={shimmerRef}
            className="pointer-events-none absolute inset-0 block"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
              width: '40%',
            }}
          />
        </button>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <span
            ref={bar1Ref}
            className="block h-0.5 w-6 bg-[#00E87A]"
            style={{ willChange: 'transform' }}
          />
          <span
            ref={bar2Ref}
            className="block h-0.5 w-6 bg-[#00E87A]"
            style={{ willChange: 'opacity' }}
          />
          <span
            ref={bar3Ref}
            className="block h-0.5 w-6 bg-[#00E87A]"
            style={{ willChange: 'transform' }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className="overflow-hidden md:hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="flex flex-col gap-4 px-6 pb-6 pt-5 bg-[#F7FFF9]/95 dark:bg-[#060C0A]/95 backdrop-blur-xl border-t border-black/10 dark:border-white/10 rounded-b-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-dm-sans text-base font-medium text-[#071510]/90 dark:text-[#F0FAF4]/90 transition-colors hover:text-[#00E87A]"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-[#071510]/60 dark:text-[#F0FAF4]/60 font-dm-sans">Thème</span>
            <ThemeToggle />
          </div>
          <button
            className="mt-2 w-full rounded-full bg-[#00E87A] px-6 py-3 font-bricolage text-sm font-extrabold text-[#071510] dark:text-[#F0FAF4]"
            onClick={() => {
              setMobileOpen(false)
              window.location.href = '#contact'
            }}
          >
            Démarrer un projet
          </button>
        </div>
      </div>
    </nav>
  )
}
