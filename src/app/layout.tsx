// src/app/layout.tsx
import {Suspense} from "react";
import "./globals.css";
import {siteConfig} from "@/lib/constants";
import Navigation from "@/components/Navigation";
import {getCategoryStats} from "@/lib/posts.server";
import Link from "next/link";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.title}`
    },
    description: siteConfig.description
};

// 将分类数据组件改为客户端组件
function CategorySidebar({categoryStats}: { categoryStats: Record<string, number> }) {
    return (
        <aside className="sidebar">
            <div className="widget">
                <h3>分类</h3>
                <ul>
                    {siteConfig.categories.map(category => (
                        <li key={category.slug}>
                            <Link href={`/category/${category.slug}`}
                                  prefetch={true}
                                  className="transition-colors hover:text-primary">
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
                            <a href={friend.url}
                               className="transition-colors hover:text-primary">
                                {friend.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

// 使用 parallel routes 来优化数据加载
export default async function RootLayout({
                                             children
                                         }: {
    children: React.ReactNode
}) {
    // 预先获取分类数据
    const categoryStats = await getCategoryStats();

    return (
        <html lang="zh-CN">
        <body>
        <div className="container">
            <header className="fixed top-0 w-full bg-white z-10 shadow-sm">
                <h1>{siteConfig.title}</h1>
                <p>{siteConfig.description}</p>
            </header>
            <Navigation/>
            <div className="layout with-sidebar pt-[header-height]">
                <main className="main-content">
                    <Suspense fallback={
                        <div className="loading-skeleton animate-pulse">
                            <div className="h-32 bg-gray-200 rounded-md mb-4"/>
                            <div className="h-32 bg-gray-200 rounded-md"/>
                        </div>
                    }>
                        {children}
                    </Suspense>
                </main>
                <Suspense fallback={
                    <div className="sidebar-skeleton animate-pulse">
                        <div className="h-48 bg-gray-200 rounded-md mb-4"/>
                        <div className="h-32 bg-gray-200 rounded-md"/>
                    </div>
                }>
                    <CategorySidebar categoryStats={categoryStats}/>
                </Suspense>
            </div>
            <footer>
                <p>{siteConfig.footer}</p>
            </footer>
        </div>
        </body>
        </html>
    );
}
