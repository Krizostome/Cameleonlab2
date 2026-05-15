'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const springConfig = { stiffness: 80, damping: 25, mass: 0.8 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 150)
      mouseY.set(e.clientY - 150)
    }

    const handleMouseLeave = () => {
      mouseX.set(-200)
      mouseY.set(-200)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={glowRef}
      style={{ x, y }}
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      aria-hidden="true"
    >
      <div
        className="absolute h-[300px] w-[300px] rounded-full opacity-30 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0,232,122,0.15) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />
    </motion.div>
  )
}
