'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Eye, Heart } from 'lucide-react'
import type { BlogPost } from '../../types/blog'

const LIKED_KEY = 'cameleonlab-liked-posts'

function getLikedPosts(): string[] {
  try {
    return JSON.parse(localStorage.getItem(LIKED_KEY) || '[]') as string[]
  } catch {
    return []
  }
}

function isPostLiked(postId: string): boolean {
  return getLikedPosts().includes(postId)
}

function togglePostLike(postId: string): boolean {
  const liked = getLikedPosts()
  const idx = liked.indexOf(postId)
  if (idx === -1) {
    liked.push(postId)
    localStorage.setItem(LIKED_KEY, JSON.stringify(liked))
    return true
  } else {
    liked.splice(idx, 1)
    localStorage.setItem(LIKED_KEY, JSON.stringify(liked))
    return false
  }
}

function formatCount(n: number): string {
  if (n >= 1000) {
    const k = n / 1000
    return (k % 1 === 0 ? k.toFixed(0) : k.toFixed(1).replace('.0', '')) + 'k'
  }
  return n.toString()
}

interface ArticleMetaProps {
  post: BlogPost
  variant?: 'card' | 'row'
  showDate?: boolean
}

export default function ArticleMeta({ post, variant = 'card', showDate = false }: ArticleMetaProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setLiked(isPostLiked(post.id))
  }, [post.id])

  const handleLike = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const nowLiked = togglePostLike(post.id)
      setLiked(nowLiked)
      setLikeCount((prev) => (nowLiked ? prev + 1 : prev - 1))
    },
    [post.id]
  )

  const isRow = variant === 'row'

  return (
    <div className={`flex flex-wrap items-center gap-2 ${isRow ? 'mb-2' : 'mb-3'}`}>
      {/* Category badge */}
      <span
        className={`rounded-full bg-[#00E87A]/8 font-['Satoshi'] font-medium uppercase tracking-wider text-[#00E87A] ${
          isRow ? 'px-2.5 py-0.5 text-[10px]' : 'px-3 py-1 text-[10px]'
        }`}
      >
        {post.category}
      </span>

      {/* Read time */}
      <span
        className={`flex items-center gap-1 font-['Satoshi'] text-[#374151] ${
          isRow ? 'text-[10px]' : 'text-[11px]'
        }`}
      >
        <Clock className="h-3 w-3" />
        {post.readTime}
      </span>

      {/* Date */}
      {showDate && (
        <span className="font-['Satoshi'] text-[10px] text-[#374151]">
          {new Date(post.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      )}

      {/* Divider dot */}
      <span className="hidden h-1 w-1 rounded-full bg-[#6B7280]/30 sm:block" />

      {/* Views */}
      <motion.span
        className={`flex items-center gap-1 font-['Satoshi'] text-[#374151] transition-colors duration-300 hover:text-[#00E87A]/70 ${
          isRow ? 'text-[10px]' : 'text-[11px]'
        }`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Eye className="h-3 w-3" />
        <AnimatePresence mode="wait">
          {isClient && (
            <motion.span
              key={post.views}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {formatCount(post.views)} vues
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>

      {/* Likes */}
      <motion.button
        type="button"
        onClick={handleLike}
        className={`group flex items-center gap-1 font-['Satoshi'] transition-colors duration-300 ${
          liked ? 'text-[#00E87A]' : 'text-[#374151] hover:text-[#00E87A]'
        } ${isRow ? 'text-[10px]' : 'text-[11px]'}`}
        whileTap={{ scale: 0.85 }}
        aria-label={liked ? 'Retirer le like' : 'Aimer cet article'}
      >
        <motion.div
          animate={liked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Heart
            className={`h-3 w-3 transition-all duration-300 ${
              liked ? 'fill-[#00E87A]' : 'fill-transparent'
            }`}
            strokeWidth={1.8}
          />
        </motion.div>
        <AnimatePresence mode="wait">
          {isClient && (
            <motion.span
              key={likeCount}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {formatCount(likeCount)} likes
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
