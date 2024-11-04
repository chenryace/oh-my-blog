// src/lib/posts.server.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {format} from 'date-fns'
import {cache} from 'react'

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

// 获取单篇文章的优化函数
export const getPostById = cache((id: string) => {
    const posts = getAllPosts()
    const post = posts.find(p => p.id === id)

    if (!post) {
        return null
    }

    // 只在需要时才读取完整内容
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const {data, content} = matter(fileContents)

    return {
        ...post,
        content
    }
})
