// src/components/SidebarContent.tsx
"use client"
import {usePathname} from 'next/navigation'
import Link from 'next/link'
import {siteConfig} from '@/lib/constants'

export default function SidebarContent({
                                           children,
                                           categoryStats
                                       }: {
    children: React.ReactNode
    categoryStats: Record<string, number>
}) {
    const pathname = usePathname()
    const showSidebar = !pathname?.startsWith('/posts/')

    return (
        <div className={`layout ${showSidebar ? 'with-sidebar' : 'full-width'}`}>
            <main className="main-content">
                {children}
            </main>
            {showSidebar && (
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
            )}
        </div>
    )
}
