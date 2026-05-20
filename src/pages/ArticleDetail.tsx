"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Link as LinkIcon,
  Heart,
  ChevronUp,
  BookOpen,
  Tag,
  TrendingUp,
} from "lucide-react"
import { BLOG_POSTS, CATEGORIES } from "../data/blog-data"
import type { BlogPost } from "../types/blog"

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════════════ */
/*  Inline social icons (lucide-react v1 compatibility)               */
/* ═══════════════════════════════════════════════════════════════════ */

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)


function ShareDropdown({ title, url }: { title: string; url: string }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const shareLinks = [
    {
      label: "Twitter",
      icon: TwitterIcon,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      label: "LinkedIn",
      icon: LinkedinIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "Facebook",
      icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
  ]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#00E87A]/15 text-[#374151] transition-all hover:border-[#00E87A]/40 hover:text-[#00E87A] hover:bg-[#00E87A]/5"
        aria-label="Partager l'article"
      >
        <Share2 className="h-4 w-4" />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-[#00E87A]/10 bg-[#F7FFF9] dark:bg-[#071510] p-2 shadow-[0_12px_40px_rgba(0,0,0,0.15)] backdrop-blur-xl z-50"
        >
          {shareLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#071510] dark:text-[#F0FAF4] transition-colors hover:bg-[#00E87A]/10"
            >
              <s.icon className="h-4 w-4 text-[#00E87A]" />
              {s.label}
            </a>
          ))}
          <button
            onClick={handleCopy}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#071510] dark:text-[#F0FAF4] transition-colors hover:bg-[#00E87A]/10"
          >
            <LinkIcon className="h-4 w-4 text-[#00E87A]" />
            {copied ? "Lien copié !" : "Copier le lien"}
          </button>
        </motion.div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Like / Clap button                                                */
/* ═══════════════════════════════════════════════════════════════════ */

function ClapButton({ initialLikes }: { initialLikes: number }) {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(initialLikes)

  const handleClick = () => {
    setLiked((p) => {
      setCount((c) => (p ? c - 1 : c + 1))
      return !p
    })
  }

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.85 }}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-300 ${
        liked
          ? "border-[#00E87A]/40 bg-[#00E87A]/10 text-[#00E87A]"
          : "border-[#00E87A]/15 text-[#374151] hover:border-[#00E87A]/30 hover:text-[#00E87A]"
      }`}
    >
      <Heart className={`h-4 w-4 transition-all ${liked ? "fill-[#00E87A]" : ""}`} />
      <span className="font-['Satoshi'] text-xs font-medium">{count}</span>
    </motion.button>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Reading progress bar                                              */
/* ═══════════════════════════════════════════════════════════════════ */

function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, pct)))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="fixed left-0 top-0 z-[100] h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-[#00E87A] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%`, boxShadow: "0 0 8px rgba(0,232,122,0.5)" }}
      />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Back to top                                                       */
/* ═══════════════════════════════════════════════════════════════════ */

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#00E87A]/20 bg-[#F7FFF9]/90 dark:bg-[#060C0A]/90 text-[#00E87A] shadow-lg backdrop-blur-xl transition-colors hover:bg-[#00E87A]/10"
      aria-label="Retour en haut"
    >
      <ChevronUp className="h-5 w-5" />
    </motion.button>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Article content renderer                                          */
/* ═══════════════════════════════════════════════════════════════════ */

function ArticleContent({ content }: { content: string }) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    const ctx = gsap.context(() => {
      const elements = contentRef.current!.querySelectorAll<HTMLElement>(
        "p, h2, h3, ul, ol, blockquote, pre, .article-image"
      )
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        )
      })
    }, contentRef)
    return () => ctx.revert()
  }, [content])

  return (
    <div
      ref={contentRef}
      className="article-body"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Sidebar (desktop)                                                 */
/* ═══════════════════════════════════════════════════════════════════ */

function ArticleSidebar({
  currentPost,
  allPosts,
}: {
  currentPost: BlogPost
  allPosts: BlogPost[]
}) {
  const similar = allPosts
    .filter((p) => p.id !== currentPost.id && p.category === currentPost.category)
    .slice(0, 3)

  const popular = allPosts
    .filter((p) => p.id !== currentPost.id)
    .sort((a, b) => b.views - a.views)
    .slice(0, 3)

  return (
    <aside className="space-y-8">
      {/* Reading time + meta */}
      <div className="rounded-2xl border border-[#00E87A]/10 bg-[#F0FAF4]/30 dark:bg-[#071510]/40 p-6 backdrop-blur-sm">
        <h3 className="mb-4 flex items-center gap-2 font-['Satoshi'] text-sm font-bold text-[#071510] dark:text-[#F0FAF4]">
          <BookOpen className="h-4 w-4 text-[#00E87A]" />
          À propos
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-[#374151] dark:text-[#9CA3AF]">
            <Clock className="h-4 w-4 text-[#00E87A]" />
            <span>{currentPost.readTime} de lecture</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#374151] dark:text-[#9CA3AF]">
            <Calendar className="h-4 w-4 text-[#00E87A]" />
            <span>
              {new Date(currentPost.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#374151] dark:text-[#9CA3AF]">
            <Tag className="h-4 w-4 text-[#00E87A]" />
            <span>{currentPost.category}</span>
          </div>
        </div>
      </div>

      {/* Similar articles */}
      {similar.length > 0 && (
        <div className="rounded-2xl border border-[#00E87A]/10 bg-[#F0FAF4]/30 dark:bg-[#071510]/40 p-6 backdrop-blur-sm">
          <h3 className="mb-4 flex items-center gap-2 font-['Satoshi'] text-sm font-bold text-[#071510] dark:text-[#F0FAF4]">
            <Tag className="h-4 w-4 text-[#00E87A]" />
            Dans la même catégorie
          </h3>
          <div className="flex flex-col gap-4">
            {similar.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group flex gap-3"
              >
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-['Satoshi'] text-sm font-medium leading-snug text-[#071510] dark:text-[#F0FAF4] group-hover:text-[#00E87A] transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <span className="mt-1 block font-['Satoshi'] text-[10px] text-[#374151]">
                    {post.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Popular */}
      <div className="rounded-2xl border border-[#00E87A]/10 bg-[#F0FAF4]/30 dark:bg-[#071510]/40 p-6 backdrop-blur-sm">
        <h3 className="mb-4 flex items-center gap-2 font-['Satoshi'] text-sm font-bold text-[#071510] dark:text-[#F0FAF4]">
          <TrendingUp className="h-4 w-4 text-[#00E87A]" />
          Populaires
        </h3>
        <div className="flex flex-col gap-4">
          {popular.map((post, i) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-[#00E87A]/10 font-['Satoshi'] text-[10px] font-bold text-[#00E87A]">
                {i + 1}
              </span>
              <div>
                <h4 className="font-['Satoshi'] text-sm font-medium leading-snug text-[#071510] dark:text-[#F0FAF4] group-hover:text-[#00E87A] transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <span className="mt-1 block font-['Satoshi'] text-[10px] text-[#374151]">
                  {post.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="rounded-2xl border border-[#00E87A]/10 bg-[#F0FAF4]/30 dark:bg-[#071510]/40 p-6 backdrop-blur-sm">
        <h3 className="mb-4 font-['Satoshi'] text-sm font-bold text-[#071510] dark:text-[#F0FAF4]">
          Catégories
        </h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <span
              key={cat.name}
              className="rounded-full border border-[#00E87A]/15 bg-[#00E87A]/5 px-3 py-1 font-['Satoshi'] text-[11px] text-[#374151] transition-all hover:border-[#00E87A]/30 hover:text-[#00E87A] hover:bg-[#00E87A]/10 cursor-default"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>
    </aside>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Not found state                                                   */
/* ═══════════════════════════════════════════════════════════════════ */

function ArticleNotFound({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7FFF9] dark:bg-[#060C0A] px-6">
      <h1 className="mb-4 font-['Outfit'] text-4xl font-bold text-[#071510] dark:text-[#F0FAF4]">
        Article introuvable
      </h1>
      <p className="mb-8 max-w-md text-center font-['Satoshi'] text-[#374151]">
        L'article que vous recherchez n'existe pas ou a été déplacé.
      </p>
        <Link
        to="/blog"
        className="inline-flex items-center gap-2 rounded-full bg-[#00E87A] px-6 py-3 font-['Satoshi'] text-sm font-extrabold text-[#071510] transition-all hover:shadow-[0_0_24px_rgba(0,232,122,0.3)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Tous les articles
      </Link>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Main ArticleDetail Page                                           */
/* ═══════════════════════════════════════════════════════════════════ */

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  const heroRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const contentWrapRef = useRef<HTMLDivElement>(null)

  /* ── GSAP entrance & parallax ── */
  useEffect(() => {
    if (!post) return
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      // Hero image parallax
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
      }

      // Title fade + slide up
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 40, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            delay: 0.2,
          }
        )
      }

      // Meta fade
      if (metaRef.current) {
        gsap.fromTo(
          metaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.5 }
        )
      }

      // Content wrapper entrance
      if (contentWrapRef.current) {
        gsap.fromTo(
          contentWrapRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.7,
            scrollTrigger: {
              trigger: contentWrapRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [post, slug])

  const handleBack = useCallback(() => {
    navigate("/blog")
  }, [navigate])

  if (!post) {
    return <ArticleNotFound onBack={handleBack} />
  }

  const articleUrl = typeof window !== "undefined" ? `${window.location.origin}/blog/${post.slug}` : `https://cameleonlab.com/blog/${post.slug}`

  return (
    <div className="min-h-screen bg-[#F7FFF9] dark:bg-[#060C0A]">
      <ReadingProgress />

      {/* ── Minimal Header ── */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-transparent bg-[#F7FFF9]/80 dark:bg-[#060C0A]/80 backdrop-blur-xl transition-colors duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          
          <Link
            to="/"
            className="font-['Satoshi'] text-lg font-bold tracking-tight text-[#071510] dark:text-[#F0FAF4] md:text-xl"
          >
            CameleonLab
          </Link>
          <div className="w-20" />
        </div>
      </header>

      {/* ── Hero Section ── */}
      <div ref={heroRef} className="relative overflow-hidden pt-16">
        {/* Cover image */}
        <div className="relative mx-auto max-w-5xl px-6 md:px-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl md:rounded-3xl">
            <img
              ref={heroImageRef}
              src={post.coverImage}
              alt={post.title}
              className="h-[120%] w-full object-cover"
              style={{ willChange: "transform" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060C0A]/60 via-transparent to-transparent" />
            {/* Bottom glow line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00E87A]/30 to-transparent" />
          </div>
        </div>

        {/* Title + meta overlay */}
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-10 md:px-10 md:pt-14">
          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5 inline-flex items-center gap-3"
          >
            <span className="rounded-full bg-[#00E87A]/10 px-4 py-1.5 font-['Satoshi'] text-[11px] font-medium uppercase tracking-wider text-[#00E87A]">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 font-['Satoshi'] text-xs text-[#374151]">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </motion.div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="mb-8 font-['Outfit'] text-3xl font-bold leading-tight text-[#071510] dark:text-[#F0FAF4] md:text-5xl lg:text-6xl"
            style={{ willChange: "transform, opacity, filter" }}
          >
            {post.title}
          </h1>

          {/* Meta bar */}
          <div
            ref={metaRef}
            className="mb-10 flex flex-wrap items-center gap-4 border-y border-[#00E87A]/10 py-4"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-[#00E87A]/20"
              />
              <div>
                <span className="block font-['Satoshi'] text-sm font-medium text-[#071510] dark:text-[#F0FAF4]">
                  {post.author.name}
                </span>
                <span className="block font-['Satoshi'] text-xs text-[#374151]">
                  {post.author.role}
                </span>
              </div>
            </div>
            <div className="hidden h-6 w-px bg-[#00E87A]/15 sm:block" />
            <span className="font-['Satoshi'] text-xs text-[#374151]">
              {new Date(post.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <div className="ml-auto flex items-center gap-3">
              <ClapButton initialLikes={post.likes} />
              <ShareDropdown title={post.title} url={articleUrl} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Article body */}
          <div ref={contentWrapRef} className="flex-1 lg:max-w-[680px]">
            {post.content ? (
              <ArticleContent content={post.content} />
            ) : (
              <div className="space-y-6">
                <p className="font-['Satoshi'] text-lg leading-relaxed text-[#071510]/80 dark:text-[#F0FAF4]/80">
                  {post.excerpt}
                </p>
                <div className="rounded-xl border border-[#00E87A]/10 bg-[#00E87A]/[0.03] p-8 text-center">
                  <BookOpen className="mx-auto mb-3 h-8 w-8 text-[#00E87A]/50" />
                  <p className="font-['Satoshi'] text-sm text-[#374151]">
                    Le contenu complet de cet article sera bientôt disponible.
                  </p>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#00E87A]/15 bg-[#00E87A]/5 px-3 py-1 font-['Satoshi'] text-[11px] text-[#374151] transition-all hover:border-[#00E87A]/30 hover:text-[#00E87A]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author bio card */}
            <div className="mt-12 rounded-2xl border border-[#00E87A]/10 bg-[#F0FAF4]/30 dark:bg-[#071510]/40 p-6 md:p-8 backdrop-blur-sm">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-[#00E87A]/20"
                />
                <div>
                  <h4 className="font-['Satoshi'] text-base font-bold text-[#071510] dark:text-[#F0FAF4]">
                    {post.author.name}
                  </h4>
                  <p className="font-['Satoshi'] text-xs text-[#374151]">{post.author.role}</p>
                  <p className="mt-2 max-w-md font-['Satoshi'] text-sm leading-relaxed text-[#374151] dark:text-[#9CA3AF]">
                    Passionné(e) par la création d'expériences digitales mémorables.
                    Écrit régulièrement sur les tendances du web et du design.
                  </p>
                </div>
              </div>
            </div>

            {/* Share bar */}
            <div className="mt-10 flex items-center justify-between border-t border-[#00E87A]/10 pt-6">
              <span className="font-['Satoshi'] text-sm text-[#374151]">
                Partager cet article
              </span>
              <div className="flex items-center gap-2">
                {[
                  { icon: TwitterIcon, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(articleUrl)}`, label: "Twitter" },
                  { icon: LinkedinIcon, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`, label: "LinkedIn" },
                  { icon: FacebookIcon, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`, label: "Facebook" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#00E87A]/15 text-[#374151] transition-all hover:border-[#00E87A]/40 hover:text-[#00E87A] hover:bg-[#00E87A]/5"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block lg:w-80">
            <div className="sticky top-28">
              <ArticleSidebar currentPost={post} allPosts={BLOG_POSTS} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Next article suggestion ── */}
      <NextArticle currentPost={post} allPosts={BLOG_POSTS} />

      <BackToTop />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Next article suggestion                                           */
/* ═══════════════════════════════════════════════════════════════════ */

function NextArticle({ currentPost, allPosts }: { currentPost: BlogPost; allPosts: BlogPost[] }) {
  const currentIndex = allPosts.findIndex((p) => p.id === currentPost.id)
  const nextPost = allPosts[currentIndex + 1] || allPosts[0]
  if (!nextPost || nextPost.id === currentPost.id) return null

  return (
    <section className="border-t border-[#00E87A]/10 bg-[#F0FAF4]/20 dark:bg-[#071510]/20 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <span className="mb-4 block font-['Satoshi'] text-xs font-medium uppercase tracking-[0.2em] text-[#00E87A]">
          Article suivant
        </span>
        <Link to={`/blog/${nextPost.slug}`} className="group block">
          <h3 className="mb-4 font-['Outfit'] text-2xl font-bold leading-tight text-[#071510] dark:text-[#F0FAF4] transition-colors group-hover:text-[#00E87A] md:text-3xl">
            {nextPost.title}
          </h3>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-['Satoshi'] text-xs text-[#374151]">
              <Clock className="h-3.5 w-3.5" />
              {nextPost.readTime}
            </span>
            <span className="rounded-full bg-[#00E87A]/10 px-3 py-1 font-['Satoshi'] text-[10px] font-medium uppercase tracking-wider text-[#00E87A]">
              {nextPost.category}
            </span>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 font-['Satoshi'] text-sm font-medium text-[#00E87A] transition-all group-hover:gap-3">
            Lire l'article
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </div>
        </Link>
      </div>
    </section>
  )
}
