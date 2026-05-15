export interface Author {
  name: string
  avatar: string
  role: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  tags: string[]
  author: Author
  date: string
  readTime: string
  views: number
  likes: number
  featured?: boolean
  popular?: boolean
}

export interface Category {
  name: string
  count: number
}
