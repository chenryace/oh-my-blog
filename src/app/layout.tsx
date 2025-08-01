// src/app/layout.tsx
import {Suspense} from "react";
// 移除globals.css，完全使用内联CSS避免阻塞渲染
import {siteConfig} from "@/lib/constants";
import Navigation from "@/components/Navigation";
import {getCategoryStats} from "@/lib/posts.server";
import {Metadata} from "next";
import Loading from "@/components/Loading";
import {Providers} from "@/components/Providers";
import {ThemeToggle} from "@/components/ThemeToggle";
import CategorySidebar from "@/components/CategorySidebar";

import {Inter} from "next/font/google";

// 最简字体配置
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "700"]
});

export const metadata: Metadata = {
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.title}`
    },
    description: siteConfig.description,
    metadataBase: new URL('https://blog.qfdk.me'),
    // 添加其他元数据提高性能
    other: {
        'apple-mobile-web-app-capable': 'yes',
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
        <html lang="zh-CN" suppressHydrationWarning className={inter.className}>
        <head>
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            
            {/* 内联所有关键CSS避免阻塞 */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    :root{--primary-color:#333;--primary-hover:#000;--bg-color:#f5f5f5;--meta-color:#666;--article-bg:white;--nav-bg:white;--shadow:0 2px 5px rgba(0,0,0,0.1);}
                    :root[class~="dark"]{--primary-color:#e1e1e1;--primary-hover:#ffffff;--bg-color:#1a1a1a;--meta-color:#9ca3af;--article-bg:#1e293b;--nav-bg:#1e293b;--shadow:0 2px 5px rgba(0,0,0,0.2);}
                    *{margin:0;padding:0;box-sizing:border-box;}
                    html{scroll-behavior:smooth;}
                    body{font-family:${inter.style.fontFamily},-apple-system,sans-serif;line-height:1.6;background:var(--bg-color);color:var(--primary-color);transition:background-color 0.3s,color 0.3s;}
                    .container{max-width:960px;margin:0 auto;padding:20px;}
                    header{text-align:center;padding:1rem 0;position:relative;}
                    header h1{font-size:2.5rem;margin-bottom:0.5rem;font-weight:700;color:var(--primary-color);}
                    header p{color:var(--meta-color);}
                    .layout{margin:20px 0;}
                    .layout.with-sidebar{display:grid;grid-template-columns:1fr 250px;gap:20px;}
                    .article{background:var(--article-bg);padding:25px;border-radius:4px;box-shadow:var(--shadow);margin-bottom:20px;}
                    /* 修复特殊页面article容器的margin */
                    [class*="archive_article"],[class*="friends_article"]{margin:0!important;}
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
                    
                    /* 归档页面样式 */
                    .timeline{position:relative;padding-left:2.5rem;}
                    .timeline::before{content:'';position:absolute;left:11px;top:0;height:100%;width:2px;background-color:#eee;}
                    :root[class~="dark"] .timeline::before{background-color:#374151;}
                    .yearGroup{position:relative;margin-bottom:2rem;}
                    .year{position:relative;font-size:24px;font-weight:500;color:var(--primary-color);margin-bottom:1.5rem;padding-bottom:0.5rem;border-bottom:1px solid #eee;display:flex;align-items:center;gap:12px;}
                    .year::before{content:'';position:absolute;width:16px;height:16px;border:3px solid #666;border-radius:50%;background:var(--article-bg);left:-39px;top:50%;transform:translateY(-50%);}
                    :root[class~="dark"] .year{border-bottom-color:#374151;}
                    :root[class~="dark"] .year::before{border-color:#9ca3af;}
                    .monthGroup{margin-bottom:1.5rem;}
                    .month{position:relative;font-size:18px;font-weight:500;color:var(--primary-color);margin-bottom:1rem;display:flex;align-items:center;gap:8px;}
                    .month::before{content:'';position:absolute;width:10px;height:10px;background:#666;border-radius:50%;left:-33px;top:50%;transform:translateY(-50%);}
                    :root[class~="dark"] .month::before{background:#9ca3af;}
                    .count{font-size:14px;color:var(--meta-color);font-weight:normal;}
                    .posts{list-style:none;padding:0;margin:0;}
                    .post{position:relative;padding:0.5rem 0 0.5rem 1rem;display:flex;align-items:center;}
                    .post::before{content:'';position:absolute;width:6px;height:6px;background:#ccc;border-radius:50%;left:-31px;top:50%;transform:translateY(-50%);}
                    :root[class~="dark"] .post::before{background:#4b5563;}
                    .postTitle{display:flex;align-items:center;gap:1rem;color:var(--primary-color);text-decoration:none;transition:color 0.2s;line-height:1.5;}
                    .postTitle:hover{color:var(--primary-hover);}
                    .date{color:var(--meta-color);font-size:14px;min-width:48px;}
                    
                    /* 友情链接页面样式 */
                    .intro{margin-bottom:2rem;text-align:center;}
                    .intro p{margin-bottom:0.5rem;color:var(--meta-color);}
                    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem;}
                    .card{display:block;background:var(--article-bg);border-radius:8px;box-shadow:var(--shadow);padding:1.5rem;text-decoration:none;transition:transform 0.2s,box-shadow 0.2s;}
                    .card:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,0.15);}
                    :root[class~="dark"] .card:hover{box-shadow:0 4px 12px rgba(0,0,0,0.3);}
                    .name{font-size:1.2rem;font-weight:600;color:var(--primary-color);margin-bottom:0.5rem;}
                    .description{color:var(--meta-color);font-size:0.9rem;line-height:1.4;}
                    
                    /* 文章页面样式 */
                    .title{font-size:1.75rem;font-weight:bold;color:var(--primary-color);margin-bottom:16px;line-height:1.4;}
                    .meta{font-size:14px;color:var(--meta-color);margin-bottom:16px;}
                    .content{color:#444;line-height:1.8;font-size:16px;}
                    :root[class~="dark"] .content{color:#d1d5db;}
                    .content h2{font-size:1.5rem;font-weight:500;color:var(--primary-color);margin:24px 0 16px;padding-bottom:8px;border-bottom:1px solid #eee;}
                    :root[class~="dark"] .content h2{border-bottom-color:#374151;}
                    .content h3{font-size:1.25rem;font-weight:500;color:var(--primary-color);margin:20px 0 12px;}
                    .content a{color:#0066cc;text-decoration:none;word-wrap:break-word;}
                    :root[class~="dark"] .content a{color:#60a5fa;}
                    .content a:hover{text-decoration:underline;}
                    .content ul,.content ol{padding-left:20px;margin-bottom:16px;}
                    .content li{margin-bottom:8px;}
                    .content img{max-width:100%;height:auto;margin:1.5rem 0;border-radius:4px;display:block;}
                    .content pre{background:#f6f8fa;border-radius:4px;padding:8px;margin:14px 0;overflow-x:auto;}
                    :root[class~="dark"] .content pre{background:#171717;}
                    .content code{background:rgba(40,44,52,0.05);padding:0.2rem 0.4rem;border-radius:4px;font-size:0.875em;}
                    :root[class~="dark"] .content code{background:rgba(255,255,255,0.1);}
                    .content blockquote{border-left:4px solid #ddd;margin:20px 0;padding-left:16px;color:var(--meta-color);font-style:italic;}
                    :root[class~="dark"] .content blockquote{border-left-color:#4b5563;}
                    
                    @media(max-width:768px){.container{padding:10px;}header{padding:20px 0;}header h1{font-size:2em;}.layout.with-sidebar{display:block;}.grid{grid-template-columns:1fr;}.timeline{padding-left:1.5rem;}.year::before{left:-29px;}.month::before{left:-23px;}.post::before{left:-21px;}}
                `
            }} />
            
            {/* 延迟加载非关键CSS */}
            <script dangerouslySetInnerHTML={{
                __html: `
                    window.addEventListener('load', function() {
                        const link = document.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = '/globals.css';
                        document.head.appendChild(link);
                    });
                `
            }} />
            
        </head>
        <body suppressHydrationWarning>
        <Providers>
            <div className="container">
                <header>
                    <h1>{siteConfig.title}</h1>
                    <p>{siteConfig.description}</p>
                    <div style={{position:'absolute',right:'1rem',top:'1rem'}}>
                        <ThemeToggle/>
                    </div>
                </header>
                <Navigation/>

                <div className="layout with-sidebar">
                    <Suspense fallback={<Loading/>}>
                        {children}
                    </Suspense>
                    <Suspense fallback={<SidebarSkeleton/>}>
                        <SidebarWrapper/>
                    </Suspense>
                </div>

                <footer>
                    <p>{siteConfig.footer}</p>
                </footer>
            </div>
        </Providers>
        </body>
        </html>
    );
}
