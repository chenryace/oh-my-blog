// src/app/layout.tsx
import {Suspense} from "react";
// 移除globals.css，完全使用内联CSS避免阻塞渲染
import {siteConfig} from "@/lib/constants";
import Navigation from "@/components/Navigation";
import {getCategoryStats} from "@/lib/posts.server";
import {Metadata} from "next";
import {ThemeToggle} from "@/components/ThemeToggle";
import CategorySidebar from "@/components/CategorySidebar";

// 移除Google字体，直接使用系统字体栈

export const metadata: Metadata = {
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.title}`
    },
    description: siteConfig.description,
    metadataBase: new URL('https://blog.qfdk.me'),
    // 添加其他元数据提高性能
    other: {
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'format-detection': 'telephone=no',
    }
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
    ]
};

// 分离侧边栏获取数据的逻辑，使用React.cache优化数据获取
const SidebarWrapper = async () => {
    const categoryStats = await getCategoryStats();
    // 使用key属性帮助React识别这个组件实例，避免不必要的重新渲染
    return <CategorySidebar key="sidebar" categoryStats={categoryStats}/>;
};

const SidebarSkeleton = () => {
    return (
        <aside className="w-64 p-6 space-y-8 border-r border-gray-200 dark:border-gray-800 min-h-screen">
            {/* 分类标题骨架 */}
            <div className="mb-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16 animate-pulse"/>
            </div>

            {/* 分类列表骨架 */}
            <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                        <div
                            className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"
                            style={{width: `${Math.random() * 30 + 60}%`}}
                        />
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-6 animate-pulse"/>
                    </div>
                ))}
            </div>

            {/* 友情链接标题骨架 */}
            <div className="mt-8 mb-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-20 animate-pulse"/>
            </div>

            {/* 友情链接列表骨架 */}
            <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"
                        style={{width: `${Math.random() * 20 + 70}%`}}
                    />
                ))}
            </div>
        </aside>
    );
};

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh-CN" suppressHydrationWarning>
        <head>
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            
            {/* 优化DNS预解析 - 减少不必要的外部资源 */}
            {process.env.NODE_ENV === 'production' && (
                <>
                    {/* 仅保留必要的DNS预解析 */}
                    <link rel="dns-prefetch" href="https://vitals.vercel-analytics.com" />
                    <link rel="preconnect" href="https://vitals.vercel-analytics.com" crossOrigin="anonymous" />
                </>
            )}
            
            {/* 主题初始化脚本 - 必须在所有CSS之前执行以防止闪动 */}
            <script dangerouslySetInnerHTML={{
                __html: `
                    (function() {
                        try {
                            var theme = localStorage.getItem('theme');
                            if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                                document.documentElement.classList.add('dark');
                            }
                        } catch(e) {}
                    })();
                `
            }} />
            
            {/* iOS Safari 收藏夹图标 */}
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            
            {/* 内联关键CSS避免阻塞 - 压缩版本 */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    :root{--primary-color:#333;--primary-hover:#000;--bg-color:#f5f5f5;--meta-color:#666;--article-bg:white;--nav-bg:white;--shadow:0 2px 5px rgba(0,0,0,0.1);}
                    :root[class~="dark"]{--primary-color:#e1e1e1;--primary-hover:#ffffff;--bg-color:#1a1a1a;--meta-color:#9ca3af;--article-bg:#1e293b;--nav-bg:#1e293b;--shadow:0 2px 5px rgba(0,0,0,0.2);}
                    *{margin:0;padding:0;box-sizing:border-box;}
                    html{scroll-behavior:smooth;overflow-y:scroll;}
                    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;line-height:1.6;background:var(--bg-color);color:var(--primary-color);transition:background-color 0.3s,color 0.3s;margin:0;padding:0;}
                    .container{max-width:960px;margin:0 auto;padding:20px;}
                    header{text-align:center;padding:16px 0;position:relative;min-height:100px;display:flex;flex-direction:column;justify-content:center;align-items:center;}
                    header h1{font-size:2.5rem;margin:0 0 8px 0;padding:0;font-weight:700;color:var(--primary-color);line-height:1.2;}
                    header p{color:var(--meta-color);line-height:1.4;margin:0;padding:0;font-size:1rem;}
                    .layout{margin:20px 0;}
                    .layout.with-sidebar{display:grid;grid-template-columns:1fr 250px;gap:20px;}
                    .article{background:var(--article-bg);padding:25px;border-radius:4px;box-shadow:var(--shadow);margin-bottom:20px;}
                    .article h2 a{color:var(--primary-color);text-decoration:none;}
                    .article .meta{color:var(--meta-color);font-size:0.9em;margin:10px 0 15px;}
                    .read-more{text-align:right;margin-top:15px;}
                    .read-more a{color:var(--primary-color);text-decoration:none;font-weight:500;display:inline-flex;align-items:center;}
                    .read-more a::after{content:' →';transition:transform 0.2s;}
                    .read-more a:hover::after{transform:translateX(3px);}
                    .widget{background:var(--article-bg);padding:20px;border-radius:4px;box-shadow:var(--shadow);margin-bottom:20px;}
                    .widget h3{color:var(--primary-color);font-size:1em;margin-bottom:15px;}
                    .widget ul{list-style:none;}
                    .widget li{margin-bottom:10px;}
                    .widget a{color:var(--meta-color);text-decoration:none;transition:color 0.2s;}
                    .widget a:hover{color:var(--primary-hover);}
                    footer{text-align:center;padding:20px 0;color:var(--meta-color);font-size:0.9em;}
                    @media(max-width:768px){.container{padding:10px;}header{padding:20px 0;}header h1{font-size:2em;}.layout.with-sidebar{display:block;}}
                `
            }} />
            
        </head>
        <body>
        <div id="__next">
            <div className="container">
                <header>
                    <Navigation/>
                    <h1>{siteConfig.title}</h1>
                    <p>{siteConfig.description}</p>
                    <ThemeToggle/>
                </header>
                <main>
                    <div className="layout with-sidebar">
                        <div>
                            {children}
                        </div>
                        <aside>
                            <Suspense fallback={<SidebarSkeleton/>}>
                                <SidebarWrapper/>
                            </Suspense>
                        </aside>
                    </div>
                </main>
                <footer>
                    <p>&copy; {new Date().getFullYear()} {siteConfig.author}. All rights reserved.</p>
                </footer>
            </div>
        </div>
        </body>
        </html>
    )
}
