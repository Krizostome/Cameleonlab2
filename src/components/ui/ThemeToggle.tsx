"use client"

import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useTheme } from "../../context/ThemeContext"

/* ── Sun icon ── */
const SunIcon = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
)

/* ── Moon icon ── */
const MoonIcon = ({ className }: { className?: string }) => (
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
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
)

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const prefersReduced = useReducedMotion()
  const isDark = theme === "dark"

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      className="relative flex h-8 w-14 items-center rounded-full border border-black/8 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.04] p-1 backdrop-blur-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#00E87A]/40"
      style={{
        boxShadow: isDark
          ? "inset 0 1px 2px rgba(0,0,0,0.3), 0 0 12px rgba(0,232,122,0.1)"
          : "inset 0 1px 2px rgba(0,0,0,0.05), 0 0 12px rgba(0,232,122,0.08)",
      }}
    >
      <motion.div
        className="relative flex h-6 w-6 items-center justify-center rounded-full"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #00E87A, #00C060)"
            : "linear-gradient(135deg, #FFD700, #FFA500)",
          boxShadow: isDark
            ? "0 0 10px rgba(0,232,122,0.4)"
            : "0 0 10px rgba(255,215,0,0.3)",
        }}
        animate={{
          x: isDark ? 0 : 24,
          rotate: isDark ? 0 : 360,
        }}
        transition={
          prefersReduced
            ? { duration: 0 }
            : { type: "spring", stiffness: 500, damping: 30 }
        }
      >
        {isDark ? (
          <MoonIcon className="h-3.5 w-3.5 text-[#071510] dark:text-[#F0FAF4]" />
        ) : (
          <SunIcon className="h-3.5 w-3.5 text-[#071510] dark:text-[#F0FAF4]" />
        )}
      </motion.div>
    </button>
  )
}
