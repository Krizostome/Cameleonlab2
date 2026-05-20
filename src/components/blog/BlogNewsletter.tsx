'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function BlogNewsletter() {
  const sectionRef = useScrollReveal<HTMLElement>({ y: 30, duration: 0.9, blur: true })
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section ref={sectionRef} className="relative bg-[#F7FFF9] dark:bg-[#060C0A] py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl border border-[#00E87A]/15 bg-[#F0FAF4]/40 dark:bg-[#071510]/60 p-8 md:p-12 lg:p-16 backdrop-blur-xl"
        >
          {/* Animated background glows */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.08, 0.15, 0.08],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -left-20 -top-20 h-64 w-64 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0,232,122,0.3), transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.06, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0,122,61,0.3), transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
            {/* Floating particles */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                }}
                className="absolute rounded-full bg-[#00E87A]"
                style={{
                  width: 3 + i,
                  height: 3 + i,
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                  filter: 'blur(1px)',
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            

            <h2 className="mb-4 font-['Outfit'] text-2xl font-bold text-[#071510] dark:text-[#F0FAF4] md:text-4xl">
              Restez inspiré
            </h2>
            <p className="mb-8 max-w-md font-['Satoshi'] text-sm leading-relaxed text-[#374151] dark:text-[#9CA3AF] md:text-base">
              Recevez nos meilleurs articles, tutoriels et insights directement dans votre boîte mail. 
              Pas de spam, juste du contenu de qualité.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 rounded-full bg-[#00E87A]/10 px-6 py-3 text-[#00E87A] font-['Satoshi'] font-medium"
              >
                <Sparkles className="h-4 w-4" />
                Merci ! Vous êtes inscrit à notre newsletter.
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="w-full rounded-full border border-[#00E87A]/20 bg-[#F7FFF9] dark:bg-[#060C0A]/80 px-5 py-3.5 font-['Satoshi'] text-sm text-[#071510] dark:text-[#F0FAF4] placeholder:text-[#374151]/60 outline-none transition-all focus:border-[#00E87A]/50 focus:ring-2 focus:ring-[#00E87A]/10"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#00E87A] px-6 py-3.5 font-['Satoshi'] text-sm font-extrabold text-[#071510] transition-all hover:shadow-[0_0_24px_rgba(0,232,122,0.3)] disabled:opacity-60"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="h-4 w-4 rounded-full border-2 border-[#071510] border-t-transparent"
                    />
                  ) : (
                    <>
                      <span>S'inscrire</span>
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </motion.button>
              </form>
            )}

            <p className="mt-4 font-['Satoshi'] text-[11px] text-[#374151]/70">
              En vous inscrivant, vous acceptez notre politique de confidentialité.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
