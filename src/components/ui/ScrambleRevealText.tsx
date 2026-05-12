'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/** Futuristic character pool for scramble effect */
const SCRAMBLE_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?+=<>[]{}|/'

function getRandomChar(): string {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
}

/** Find all character indices that belong to a given word (case-insensitive) */
function getWordIndices(text: string, word: string): number[] {
  const start = text.toLowerCase().indexOf(word.toLowerCase())
  if (start === -1) return []
  return Array.from({ length: word.length }, (_, i) => start + i)
}

export interface ScrambleRevealTextProps {
  /** Full text string to reveal */
  text: string
  /** Additional CSS classes for the container */
  className?: string
  /** Delay before animation starts (seconds) */
  delay?: number
  /** Duration of the scramble phase */
  scrambleDuration?: number
  /** Duration of the blur-reveal phase */
  revealDuration?: number
  /** Callback fired when the whole animation completes */
  onComplete?: () => void
  /** Words that should receive the subtle beige glow */
  glowWords?: string[]
  /** Words that should receive the animated gold gradient */
  gradientWords?: string[]
}

/**
 * Typography component that reveals text through a futuristic scramble effect
 * followed by a blur-to-sharp reveal with a subtle upward drift.
 *
 * Each character is rendered as its own span so that glow and gradient
 * styles can be applied selectively without triggering React re-renders
 * during the animation (GSAP updates textContent directly).
 */
export default function ScrambleRevealText({
  text,
  className = '',
  delay = 0,
  scrambleDuration = 1.5,
  revealDuration = 0.8,
  onComplete,
  glowWords = [],
  gradientWords = [],
}: ScrambleRevealTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const charRefs = useRef<(HTMLSpanElement | null)[]>(new Array(text.length).fill(null))

  // Resolve indices for special styling
  const glowIndices = new Set<number>()
  glowWords.forEach((w) => getWordIndices(text, w).forEach((i) => glowIndices.add(i)))

  const gradientIndices = new Set<number>()
  gradientWords.forEach((w) => getWordIndices(text, w).forEach((i) => gradientIndices.add(i)))

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // ── Reduced motion: instant final state ──
      if (prefersReduced) {
        gsap.set(containerRef.current, { opacity: 1, filter: 'blur(0px)', y: 0 })
        charRefs.current.forEach((span, i) => {
          if (span) span.textContent = text[i] === ' ' ? '\u00A0' : text[i]
        })
        onComplete?.()
        return
      }

      const proxy = { progress: 0 }
      const totalChars = text.length

      // ── Initial state: invisible, blurred, shifted down ──
      gsap.set(containerRef.current, {
        opacity: 0,
        filter: 'blur(12px)',
        y: 30,
      })

      // ── Master timeline for this line ──
      const tl = gsap.timeline({
        delay,
        onComplete,
      })

      // Phase 1: scramble letters while slightly fading in
      const scrambleTween = gsap.to(proxy, {
        progress: 1,
        duration: scrambleDuration,
        ease: 'power3.inOut',
        onUpdate: () => {
          const resolved = Math.floor(proxy.progress * totalChars)
          charRefs.current.forEach((span, i) => {
            if (!span) return
            const original = text[i]
            if (original === ' ') {
              span.textContent = '\u00A0'
            } else if (i < resolved) {
              span.textContent = original
            } else {
              span.textContent = getRandomChar()
            }
          })
        },
        onComplete: () => {
          // Lock in final characters
          charRefs.current.forEach((span, i) => {
            if (span) span.textContent = text[i] === ' ' ? '\u00A0' : text[i]
          })
        },
      })

      // Fade to half-opacity during scramble so the effect is visible
      tl.to(
        containerRef.current,
        { opacity: 0.5, duration: scrambleDuration * 0.35, ease: 'power3.out' },
        0
      )
      tl.add(scrambleTween, 0)

      // Phase 2: blur reveal — sharp, bright, settled
      tl.to(
        containerRef.current,
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: revealDuration,
          ease: 'power3.out',
        },
        `+=${scrambleDuration * 0.08}`
      )
    }, containerRef)

    return () => {
      ctx.revert()
    }
  }, [text, delay, scrambleDuration, revealDuration, onComplete])

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{ willChange: 'transform, opacity, filter' }}
      aria-label={text}
    >
      {text.split('').map((char, i) => {
        const isGlow = glowIndices.has(i)
        const isGradient = gradientIndices.has(i)
        return (
          <span
            key={i}
            ref={(el) => {
              charRefs.current[i] = el
            }}
            className={`inline-block ${isGlow ? 'text-glow' : ''} ${isGradient ? 'letter-gradient' : ''}`}
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {'\u00A0'}
          </span>
        )
      })}
    </span>
  )
}
