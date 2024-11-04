import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {format} from 'date-fns'
import MarkdownIt from 'markdown-it'

const postsDirectory = path.join(process.cwd(), 'posts')
const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true
})

export interface Post {
    id: string
    title: string
    date: string
    category: string
    content: string
    excerpt: string
}

export function getAllPosts(): Post[] {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const id = fileName.replace(/\.md$/, '')
            const fullPath = path.join(postsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const {data, content} = matter(fileContents)
            const postDate = new Date(data.date)

            const excerpt = content.split('\n').slice(0, 3).join('\n')

            return {
                id,
                title: data.title,
                rawDate: postDate, // 添加原始日期用于排序
                date: format(new Date(data.date), 'yyyy年MM月dd日'),
                category: data.category,
                content: md.render(content),
                excerpt: md.render(excerpt)
            }
        }).sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime())
}

export function getPostById(id: string): Post | null {
    try {
        const fullPath = path.join(postsDirectory, `${id}.md`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const {data, content} = matter(fileContents)

        return {
            id,
            title: data.title,
            date: format(new Date(data.date), 'yyyy年MM月dd日'),
            category: data.category,
            content: md.render(content),
            excerpt: ''
        }
    } catch {
        return null
    }
}

// 添加获取分类统计的函数
export function getCategoryStats() {
    const posts = getAllPosts()
    return posts.reduce((acc, post) => {
        const {category} = post
        acc[category] = (acc[category] || 0) + 1
        return acc
    }, {} as Record<string, number>)
}
