import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface UseScrollRevealOptions {
  threshold?: number
  stagger?: number
  y?: number
  x?: number
  scale?: number
  duration?: number
  delay?: number
  ease?: string
  start?: string
  blur?: boolean
}

export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
) {
  const ref = useRef<T>(null)

  const {
    y = 40,
    x = 0,
    scale = 1,
    duration = 0.8,
    stagger = 0.12,
    ease = 'power3.out',
    start = 'top 85%',
    blur = false,
  } = options

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.registerPlugin(ScrollTrigger)

    const el = ref.current
    if (!el) return

    const children = el.querySelectorAll<HTMLElement>('[data-reveal]')
    const targets = children.length > 0 ? children : [el]

    const fromVars: gsap.TweenVars = {
      y,
      x,
      opacity: 0,
      scale: scale !== 1 ? scale : undefined,
      filter: blur ? 'blur(8px)' : undefined,
    }

    const toVars: gsap.TweenVars = {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: blur ? 'blur(0px)' : undefined,
      duration,
      stagger: children.length > 1 ? stagger : 0,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
    }

    // Clean undefined values
    Object.keys(fromVars).forEach((key) => {
      if (fromVars[key] === undefined) delete fromVars[key]
    })

    const tween = gsap.fromTo(targets, fromVars, toVars)

    return () => {
      tween.kill()
    }
  }, [y, x, scale, duration, stagger, ease, start, blur])

  return ref
}

export function useParallax<T extends HTMLElement>(speed: number = 0.3) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.registerPlugin(ScrollTrigger)

    const el = ref.current
    if (!el) return

    const tween = gsap.to(el, {
      y: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      tween.kill()
    }
  }, [speed])

  return ref
}
