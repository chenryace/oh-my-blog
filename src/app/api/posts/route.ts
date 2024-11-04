// src/app/api/posts/route.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {format} from 'date-fns'
import {NextResponse} from 'next/server'

const postsDirectory = path.join(process.cwd(), 'posts')

export async function GET() {
    try {
        const posts = getAllPosts()
        const stats = getCategoryStats(posts)
        return NextResponse.json({posts, categoryStats: stats})
    } catch (error) {
        return NextResponse.json({error: 'Failed to load posts'}, {status: 500})
    }
}

function getAllPosts() {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const id = fileName.replace(/\.md$/, '')
            const fullPath = path.join(postsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const {data, content} = matter(fileContents)
            const excerpt = content.split('\n').slice(0, 3).join('\n')

            return {
                id,
                title: data.title,
                date: format(new Date(data.date), 'yyyy年MM月dd日'),
                category: data.category,
                excerpt
            }
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function getCategoryStats(posts: any[]) {
    return posts.reduce((acc, post) => {
        acc[post.category] = (acc[post.category] || 0) + 1
        return acc
    }, {} as Record<string, number>)
}
