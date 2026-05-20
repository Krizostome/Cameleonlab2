'use client'

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import type { BlogPost } from '../../types/blog'

interface FeaturedArticleProps {
  post: BlogPost
}

export default function FeaturedArticle({ post }: FeaturedArticleProps) {
  const sectionRef = useScrollReveal<HTMLElement>({ y: 30, duration: 0.9, blur: true })
  const imageRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} className="relative bg-[#F7FFF9] dark:bg-[#060C0A] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section label */}
        <div data-reveal className="mb-10 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#00E87A]/20" />
          <span className="font-['Satoshi'] text-xs font-medium uppercase tracking-[0.2em] text-[#374151]">
            Article à la une
          </span>
          <div className="h-px flex-1 bg-[#00E87A]/20" />
        </div>

        {/* Featured card */}
        <div
          data-reveal
          className="group relative overflow-hidden rounded-2xl bg-[#F0FAF4]/60 dark:bg-[#071510]/60 border border-[#00E87A]/10 backdrop-blur-sm lg:flex"
        >
          {/* Image side */}
          <div
            ref={imageRef}
            className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:w-[55%]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#060C0A]/40 to-transparent z-10 lg:bg-gradient-to-r" />
            <motion.img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.7 }}
            />
            {/* Glow overlay on hover */}
            <div className="absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(0,232,122,0.08), transparent 60%)',
              }}
            />
          </div>

          {/* Content side */}
          <div className="flex flex-1 flex-col justify-center p-8 md:p-12 lg:p-14">
            {/* Category & read time */}
            <div className="mb-5 flex items-center gap-4">
              <span className="rounded-full bg-[#00E87A]/10 px-3 py-1 font-['Satoshi'] text-[11px] font-medium uppercase tracking-wider text-[#00E87A]">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 font-['Satoshi'] text-xs text-[#374151]">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime} de lecture
              </span>
            </div>

            {/* Title */}
            <h2 className="mb-5 font-['Outfit'] text-2xl font-bold leading-tight text-[#071510] dark:text-[#F0FAF4] md:text-3xl lg:text-4xl group-hover:text-[#00E87A] transition-colors duration-300">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="mb-8 font-['Satoshi'] text-sm leading-relaxed text-[#374151] dark:text-[#9CA3AF] md:text-base">
              {post.excerpt}
            </p>

            {/* Author & date */}
            <div className="mb-8 flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-[#00E87A]/20"
                loading="lazy"
              />
              <div>
                <span className="block font-['Satoshi'] text-sm font-medium text-[#071510] dark:text-[#F0FAF4]">
                  {post.author.name}
                </span>
                <span className="block font-['Satoshi'] text-xs text-[#374151]">
                  {new Date(post.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {/* CTA */}
            <Link to={`/blog/${post.slug}`}>
              <motion.span
                className="group/btn inline-flex items-center gap-2 rounded-full bg-[#00E87A] px-6 py-3 font-['Satoshi'] text-sm font-extrabold text-[#071510] transition-all hover:shadow-[0_0_24px_rgba(0,232,122,0.3)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Lire l'article</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
