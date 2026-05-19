'use client'

import { useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import BlogHero from '../components/blog/BlogHero'
import FeaturedArticle from '../components/blog/FeaturedArticle'
import RecentArticles from '../components/blog/RecentArticles'
import BlogNewsletter from '../components/blog/BlogNewsletter'
import AllArticles from '../components/blog/AllArticles'
import CursorGlow from '../components/blog/CursorGlow'
import { BLOG_POSTS, CATEGORIES, TAGS } from '../data/blog-data'

export default function BlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const featuredPost = BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0]
  const recentPosts = BLOG_POSTS.filter((p) => p.id !== featuredPost.id).slice(0, 6)
  const allPosts = BLOG_POSTS.filter((p) => p.id !== featuredPost.id)

  return (
    <>
      <CursorGlow />
      <Navbar />
      <main className="min-h-screen bg-[#F7FFF9] dark:bg-[#060C0A]">
        <BlogHero />
        <FeaturedArticle post={featuredPost} />
        <RecentArticles posts={recentPosts.slice(0, 3)} />
        <BlogNewsletter />
        <AllArticles posts={allPosts} categories={CATEGORIES} tags={TAGS} />
      </main>
      <Footer />
    </>
  )
}
