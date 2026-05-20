'use client'

import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Tag, Mail, MapPin } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import ArticleMeta from './ArticleMeta'
import type { BlogPost, Category } from '../../types/blog'

interface ArticleListProps {
  posts: BlogPost[]
  categories: Category[]
  tags: string[]
}

function ArticleRow({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group relative flex gap-5 border-b border-[#00E87A]/8 py-6 transition-all duration-300 hover:pl-2 md:gap-6 md:py-8"
      >
      {/* Thumbnail */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl md:h-24 md:w-24">
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#00E87A]/0 transition-colors duration-300 group-hover:bg-[#00E87A]/10" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center">
        <ArticleMeta post={post} variant="row" showDate />

        <h3 className="mb-2 font-['Outfit'] text-base font-bold leading-snug text-[#071510] dark:text-[#F0FAF4] transition-colors group-hover:text-[#00E87A] md:text-lg">
          {post.title}
        </h3>

        <p className="mb-2 hidden font-['Satoshi'] text-sm leading-relaxed text-[#374151] dark:text-[#9CA3AF] line-clamp-2 sm:block">
          {post.excerpt}
        </p>
      </div>

      {/* Read button */}
      <div className="hidden items-center sm:flex">
        <motion.div
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#00E87A]/20 text-[#00E87A] opacity-0 transition-all group-hover:opacity-100 group-hover:bg-[#00E87A]/10"
          whileHover={{ scale: 1.1 }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </div>

      {/* Border glow on hover */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-[#00E87A]/30 transition-all duration-500 group-hover:w-full" />
      </Link>
    </motion.article>
  )
}

function Sidebar({ categories, tags, popularPosts }: { categories: Category[]; tags: string[]; popularPosts: BlogPost[] }) {
  const sidebarRef = useRef<HTMLDivElement>(null)

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      {/* Categories */}
      <div className="mb-8 rounded-2xl border border-[#00E87A]/10 bg-[#F0FAF4]/30 dark:bg-[#071510]/40 p-6 backdrop-blur-sm">
        <h3 className="mb-4 flex items-center gap-2 font-['Satoshi'] text-sm font-bold text-[#071510] dark:text-[#F0FAF4]">
          <Tag className="h-4 w-4 text-[#00E87A]" />
          Catégories
        </h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={`#category-${cat.name}`}
              className="group flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-[#00E87A]/5"
            >
              <span className="font-['Satoshi'] text-sm text-[#374151] dark:text-[#9CA3AF] group-hover:text-[#00E87A] transition-colors">
                {cat.name}
              </span>
              <span className="rounded-full bg-[#00E87A]/10 px-2 py-0.5 font-['Satoshi'] text-[10px] text-[#00E87A]">
                {cat.count}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Popular posts */}
      <div className="mb-8 rounded-2xl border border-[#00E87A]/10 bg-[#F0FAF4]/30 dark:bg-[#071510]/40 p-6 backdrop-blur-sm">
        <h3 className="mb-4 flex items-center gap-2 font-['Satoshi'] text-sm font-bold text-[#071510] dark:text-[#F0FAF4]">
          <TrendingUp className="h-4 w-4 text-[#00E87A]" />
          Populaires
        </h3>
        <div className="flex flex-col gap-4">
          {popularPosts.map((post, i) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-[#00E87A]/10 font-['Satoshi'] text-[10px] font-bold text-[#00E87A]">
                {i + 1}
              </span>
              <div>
                <h4 className="font-['Satoshi'] text-sm font-medium leading-snug text-[#071510] dark:text-[#F0FAF4] group-hover:text-[#00E87A] transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <span className="mt-1 block font-['Satoshi'] text-[10px] text-[#374151]">
                  {post.readTime} de lecture
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mb-8 rounded-2xl border border-[#00E87A]/10 bg-[#F0FAF4]/30 dark:bg-[#071510]/40 p-6 backdrop-blur-sm">
        <h3 className="mb-4 font-['Satoshi'] text-sm font-bold text-[#071510] dark:text-[#F0FAF4]">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <a
              key={tag}
              href={`#tag-${tag}`}
              className="rounded-full border border-[#00E87A]/15 bg-[#00E87A]/5 px-3 py-1 font-['Satoshi'] text-[11px] text-[#374151] transition-all hover:border-[#00E87A]/30 hover:text-[#00E87A] hover:bg-[#00E87A]/10"
            >
              {tag}
            </a>
          ))}
        </div>
      </div>

      {/* CTA Card */}
      <div className="rounded-2xl border border-[#00E87A]/20 bg-[#071510] p-6 text-center dark:bg-[#071510]/80">
        <h3 className="mb-2 font-['Satoshi'] text-base font-bold text-[#F0FAF4]">
          Un projet en tête ?
        </h3>
        <p className="mb-5 font-['Satoshi'] text-xs leading-relaxed text-[#374151]">
          Discutons de votre vision et construisons ensemble quelque chose d'exceptionnel.
        </p>
        <motion.a
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00E87A] px-5 py-2.5 font-['Satoshi'] text-xs font-extrabold text-[#071510] transition-all hover:shadow-[0_0_20px_rgba(0,232,122,0.3)]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Mail className="h-3.5 w-3.5" />
          Nous contacter
        </motion.a>
      </div>

      {/* Mini contact */}
      <div className="mt-8 rounded-2xl border border-[#00E87A]/10 bg-[#F0FAF4]/30 dark:bg-[#071510]/40 p-6 backdrop-blur-sm">
        <h3 className="mb-3 font-['Satoshi'] text-sm font-bold text-[#071510] dark:text-[#F0FAF4]">
          CameleonLab
        </h3>
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#00E87A]" />
          <span className="font-['Satoshi'] text-xs text-[#374151]">
            Agence digitale créative<br />
            Design & Développement sur mesure
          </span>
        </div>
      </div>
    </aside>
  )
}

export default function AllArticles({ posts, categories, tags }: ArticleListProps) {
  const sectionRef = useScrollReveal<HTMLElement>({ y: 30, duration: 0.8 })
  const popularPosts = posts.filter((p) => p.popular).slice(0, 3)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 5
  const totalPages = Math.ceil(posts.length / postsPerPage)
  const currentPosts = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  useEffect(() => {
    const el = document.getElementById('all-articles')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [currentPage])

  return (
    <section
      ref={sectionRef}
      id="all-articles"
      className="relative bg-[#F7FFF9] dark:bg-[#060C0A] py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div data-reveal className="mb-12">
          <span className="mb-2 block font-['Satoshi'] text-xs font-medium uppercase tracking-[0.2em] text-[#00E87A]">
            Archives
          </span>
          <h2 className="font-['Outfit'] text-3xl font-bold text-[#071510] dark:text-[#F0FAF4] md:text-4xl">
            Tous les articles
          </h2>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Article list */}
          <div className="flex-1">
            <div className="flex flex-col">
              {currentPosts.map((post, index) => (
                <ArticleRow key={post.id} post={post} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#00E87A]/15 text-[#374151] transition-all hover:border-[#00E87A]/40 hover:text-[#00E87A] disabled:opacity-30"
                >
                  ←
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-['Satoshi'] text-sm font-medium transition-all ${
                      currentPage === i + 1
                        ? 'bg-[#00E87A] text-[#071510] shadow-[0_0_16px_rgba(0,232,122,0.25)]'
                        : 'border border-[#00E87A]/15 text-[#374151] hover:border-[#00E87A]/40 hover:text-[#00E87A]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#00E87A]/15 text-[#374151] transition-all hover:border-[#00E87A]/40 hover:text-[#00E87A] disabled:opacity-30"
                >
                  →
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <Sidebar categories={categories} tags={tags} popularPosts={popularPosts} />
          </div>
        </div>
      </div>
    </section>
  )
}
