// src/lib/posts.server.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {format} from 'date-fns'
import {cache} from 'react'

const POSTS_PER_PAGE = 4 // 每页显示文章数量

const postsDirectory = path.join(process.cwd(), 'posts')

// 内存缓存
let postsCache: Post[] | null = null
let categoryStatsCache: Record<string, number> | null = null
let lastCacheUpdate = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存时间

interface Post {
    id: string
    title: string
    date: string
    category: string
    excerpt: string
    content?: string
}

// 使用 React cache 优化数据获取
export const getAllPosts = cache(() => {
    const now = Date.now()
    if (postsCache && now - lastCacheUpdate < CACHE_DURATION) {
        return postsCache
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const posts = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const id = fileName.replace(/\.md$/, '')
            const fullPath = path.join(postsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const {data, content} = matter(fileContents)

            return {
                id,
                title: data.title,
                date: format(new Date(data.date), 'yyyy年MM月dd日'),
                category: data.category,
                excerpt: content.split('\n').slice(0, 3).join('\n')
            }
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    postsCache = posts
    lastCacheUpdate = now
    return posts
})

// 使用 React cache 优化分类统计
export const getCategoryStats = cache(() => {
    if (categoryStatsCache) {
        return categoryStatsCache
    }

    const posts = getAllPosts()
    const stats = posts.reduce((acc, post) => {
        acc[post.category] = (acc[post.category] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    categoryStatsCache = stats
    return stats
})


export interface PaginatedPosts {
    posts: Post[]
    pagination: {
        currentPage: number
        totalPages: number
        totalPosts: number
    }
}

// 获取分页的文章列表
export const getPaginatedPosts = cache((page: number = 1): PaginatedPosts => {
    const allPosts = getAllPosts()
    const totalPosts = allPosts.length
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

    // 确保页码在有效范围内
    const validPage = Math.max(1, Math.min(page, totalPages))

    // 计算当前页的文章
    const startIndex = (validPage - 1) * POSTS_PER_PAGE
    const endIndex = startIndex + POSTS_PER_PAGE
    const posts = allPosts.slice(startIndex, endIndex)

    return {
        posts,
        pagination: {
            currentPage: validPage,
            totalPages,
            totalPosts
        }
    }
})
