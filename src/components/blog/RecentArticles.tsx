'use client'

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import ArticleMeta from './ArticleMeta'
import type { BlogPost } from '../../types/blog'

interface RecentArticlesProps {
  posts: BlogPost[]
}

function ArticleCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      data-reveal
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#F0FAF4]/50 dark:bg-[#071510]/50 border border-[#00E87A]/8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-12px_rgba(0,232,122,0.12)] hover:border-[#00E87A]/25"
      >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#060C0A]/30 to-transparent z-10" />
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Category badge */}
        <div className="absolute left-4 top-4 z-20">
          <span className="rounded-full bg-[#00E87A]/90 px-3 py-1 font-['Satoshi'] text-[10px] font-medium uppercase tracking-wider text-[#071510] backdrop-blur-sm">
            {post.category}
          </span>
        </div>
        {/* Glow border on hover */}
        <div className="absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(0,232,122,0.2)',
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <ArticleMeta post={post} variant="card" />

        <h3 className="mb-3 font-['Outfit'] text-lg font-bold leading-snug text-[#071510] dark:text-[#F0FAF4] group-hover:text-[#00E87A] transition-colors duration-300">
          {post.title}
        </h3>

        <p className="mb-6 flex-1 font-['Satoshi'] text-sm leading-relaxed text-[#374151] dark:text-[#9CA3AF] line-clamp-3">
          {post.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 border-t border-[#00E87A]/10 pt-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="h-8 w-8 rounded-full object-cover ring-2 ring-[#00E87A]/15"
            loading="lazy"
          />
          <div>
            <span className="block font-['Satoshi'] text-xs font-medium text-[#071510] dark:text-[#F0FAF4]">
              {post.author.name}
            </span>
            <span className="block font-['Satoshi'] text-[10px] text-[#374151]">
              {new Date(post.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>
      </Link>
    </motion.article>
  )
}

export default function RecentArticles({ posts }: RecentArticlesProps) {
  const sectionRef = useScrollReveal<HTMLElement>({ y: 30, duration: 0.8 })

  return (
    <section ref={sectionRef} className="relative bg-[#F7FFF9] dark:bg-[#060C0A] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div data-reveal className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-2 block font-['Satoshi'] text-xs font-medium uppercase tracking-[0.2em] text-[#00E87A]">
              Récents
            </span>
            <h2 className="font-['Outfit'] text-3xl font-bold text-[#071510] dark:text-[#F0FAF4] md:text-4xl">
              Articles récents
            </h2>
          </div>
          <motion.a
            href="#all-articles"
            className="group inline-flex items-center gap-2 font-['Satoshi'] text-sm font-medium text-[#00E87A] transition-colors hover:text-[#00C060]"
            whileHover={{ x: 4 }}
          >
            Voir tous les articles
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <ArticleCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
