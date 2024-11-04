// src/app/layout.tsx
import {Suspense} from 'react'
import './globals.css'
import {siteConfig} from '@/lib/constants'
import Navigation from '@/components/Navigation'
import {getCategoryStats} from '@/lib/posts.server'
import Link from "next/link";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.title}`
    },
    description: siteConfig.description,
}

// 异步获取分类数据的组件
async function CategorySidebar() {
    const [categoryStats] = await Promise.all([getCategoryStats()])

    return (
        <aside className="sidebar">
            <div className="widget">
                <h3>分类</h3>
                <ul>
                    {siteConfig.categories.map(category => (
                        <li key={category.slug}>
                            <Link href={`/category/${category.slug}`}>
                                {category.name} ({categoryStats[category.slug] || 0})
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="widget">
                <h3>友情链接</h3>
                <ul>
                    {siteConfig.friends.map(friend => (
                        <li key={friend.url}>
                            <a href={friend.url}>{friend.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}

// 使用 loading.tsx 来优化加载体验
export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh-CN">
        <body>
        <div className="container">
            <header>
                <h1>{siteConfig.title}</h1>
                <p>{siteConfig.description}</p>
            </header>
            <Navigation/>
            <div className="layout with-sidebar">
                <main className="main-content">
                    <Suspense fallback={<div className="loading-skeleton"/>}>
                        {children}
                    </Suspense>
                </main>
                <Suspense fallback={<div className="sidebar-skeleton"/>}>
                    <CategorySidebar/>
                </Suspense>
            </div>
            <footer>
                <p>{siteConfig.footer}</p>
            </footer>
        </div>
        </body>
        </html>
    )
}
