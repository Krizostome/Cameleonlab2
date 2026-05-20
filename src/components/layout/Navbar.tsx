'use client'

import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import ThemeToggle from '../ui/ThemeToggle'

/** Navigation link descriptor */
interface NavLinkItem {
  label: string
  href: string
  isRoute?: boolean
}

const NAV_LINKS: NavLinkItem[] = [
  { label: 'À propos', href: '#about' },
  { label: 'Blog', href: '/blog', isRoute: true },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '/portfolio', isRoute: true },
  { label: 'Contact', href: '/contact', isRoute: true },
]

/**
 * Smart NavLink: uses <Link> for routes, <a> for anchors.
 * On non-home pages, anchor links navigate back to home with hash.
 */
function SmartNavLink({
  link,
  onClick,
  className,
}: {
  link: NavLinkItem
  onClick?: () => void
  className: string
}) {
  const { pathname } = useLocation()

  if (link.isRoute) {
    return (
      <Link to={link.href} className={className} onClick={onClick}>
        {link.label}
      </Link>
    )
  }

  if (pathname === '/') {
    return (
      <a href={link.href} className={className} onClick={onClick}>
        {link.label}
      </a>
    )
  }

  return (
    <Link to={`/${link.href}`} className={className} onClick={onClick}>
      {link.label}
    </Link>
  )
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const shimmerRef = useRef<HTMLSpanElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const bar1Ref = useRef<HTMLSpanElement>(null)
  const bar2Ref = useRef<HTMLSpanElement>(null)
  const bar3Ref = useRef<HTMLSpanElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const mobileOpenRef = useRef(mobileOpen)
  mobileOpenRef.current = mobileOpen

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        entranceTl.fromTo(logoRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        if (linksRef.current) {
          const linkItems = linksRef.current.querySelectorAll<HTMLElement>('a')
          entranceTl.fromTo(linkItems, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, '-=0.5')
        }
        entranceTl.fromTo(ctaRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
      }

      if (!prefersReduced && shimmerRef.current) {
        gsap.fromTo(shimmerRef.current, { x: '-100%' }, { x: '300%', duration: 2.5, repeat: -1, ease: 'none' })
      }
    }, navRef)

    return () => {
      window.removeEventListener('scroll', onScroll)
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (mobileOpen) {
        if (!prefersReduced) {
          gsap.to(bar1Ref.current, { rotate: 45, y: 6, duration: 0.3, ease: 'power2.out' })
          gsap.to(bar2Ref.current, { opacity: 0, duration: 0.2, ease: 'power2.out' })
          gsap.to(bar3Ref.current, { rotate: -45, y: -6, duration: 0.3, ease: 'power2.out' })
          gsap.fromTo(mobileMenuRef.current, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' })
        } else {
          gsap.set(bar1Ref.current, { rotate: 45, y: 6 })
          gsap.set(bar2Ref.current, { opacity: 0 })
          gsap.set(bar3Ref.current, { rotate: -45, y: -6 })
          gsap.set(mobileMenuRef.current, { height: 'auto', opacity: 1 })
        }
      } else {
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

  const linkClass = 'nav-link-underline font-["Outfit"] text-sm font-medium text-[#071510]/90 dark:text-[#F0FAF4]/90 transition-colors hover:text-[#00E87A]'

  return (
    <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${scrolled ? 'bg-[#F7FFF9]/80 dark:bg-[#060C0A]/80 backdrop-blur-xl border-[#00E87A]/20' : 'bg-transparent border-transparent'}`} aria-label="Navigation principale">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        {/* Logo */}
        <Link ref={logoRef} to="/" className="flex items-center gap-2 opacity-0" style={{ willChange: 'transform, opacity' }}>
          <span className="font-['Outfit'] text-xl font-bold tracking-tight text-[#071510] dark:text-[#F0FAF4] md:text-2xl">CameleonLab</span>
        </Link>

        {/* Desktop links */}
        <div ref={linksRef} className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <SmartNavLink key={link.href + link.label} link={link} className={linkClass} />
          ))}
        </div>

        {/* Theme toggle — desktop */}
        <div className="hidden md:block"><ThemeToggle /></div>

        {/* CTA */}
          <Link ref={ctaRef} to="/contact" className="relative hidden overflow-hidden rounded-full bg-[#00E87A] px-6 py-2.5 font-['Outfit'] text-sm font-extrabold text-[#071510] dark:text-[#F0FAF4] md:block opacity-0" style={{ willChange: 'transform, opacity' }}>
          <span className="relative z-10">Démarrer un projet</span>
          <span ref={shimmerRef} className="pointer-events-none absolute inset-0 block" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)', width: '40%' }} />
        </Link>

        {/* Mobile hamburger */}
        <button ref={hamburgerRef} className="flex flex-col gap-1.5 md:hidden" onClick={() => setMobileOpen((prev) => !prev)} aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={mobileOpen} aria-controls="mobile-menu">
          <span ref={bar1Ref} className="block h-0.5 w-6 bg-[#00E87A]" style={{ willChange: 'transform' }} />
          <span ref={bar2Ref} className="block h-0.5 w-6 bg-[#00E87A]" style={{ willChange: 'opacity' }} />
          <span ref={bar3Ref} className="block h-0.5 w-6 bg-[#00E87A]" style={{ willChange: 'transform' }} />
        </button>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" ref={mobileMenuRef} className="overflow-hidden md:hidden" style={{ height: 0, opacity: 0 }}>
        <div className="flex flex-col gap-4 px-6 pb-6 pt-5 bg-[#F7FFF9]/95 dark:bg-[#060C0A]/95 backdrop-blur-xl border-t border-black/10 dark:border-white/10 rounded-b-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
          {NAV_LINKS.map((link) => (
            <SmartNavLink key={link.href + link.label} link={link} className="font-['Outfit'] text-base font-medium text-[#071510]/90 dark:text-[#F0FAF4]/90 transition-colors hover:text-[#00E87A]" onClick={() => setMobileOpen(false)} />
          ))}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-[#071510]/75 dark:text-[#F0FAF4]/75 font-['Satoshi']">Thème</span>
            <ThemeToggle />
          </div>
          <Link to="/contact" className="mt-2 w-full rounded-full bg-[#00E87A] px-6 py-3 font-['Outfit'] text-sm font-extrabold text-[#071510] dark:text-[#F0FAF4] text-center block" onClick={() => setMobileOpen(false)}>
            Démarrer un projet
          </Link>
        </div>
      </div>
    </nav>
  )
}
