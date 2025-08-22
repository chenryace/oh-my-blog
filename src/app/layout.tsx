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
            
            {/* DNS预解析和预连接 - 加速外部资源加载 */}
            <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
            <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
            <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
            {process.env.NODE_ENV === 'production' && (
                <>
                    <link rel="dns-prefetch" href="https://vitals.vercel-analytics.com" />
                    <link rel="preconnect" href="https://vitals.vercel-analytics.com" crossOrigin="anonymous" />
                </>
            )}
            
            {/* 主题初始化脚本 - 必须在所有CSS之前执行以防止闪动 */}
            <script dangerouslySetInnerHTML={{
                __html: `
                    (function() {
                        var theme = localStorage.getItem('theme');
                        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                            document.documentElement.classList.add('dark');
                        }
                    })();
                `
            }} />
            
            {/* iOS Safari 收藏夹图标 */}
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon.png" />
            
            {/* 内联所有关键CSS避免阻塞 */}
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
                    
                    /* 标题样式优化 */
                    .content h1{font-size:2rem;font-weight:600;color:var(--primary-color);margin:32px 0 20px;padding-bottom:12px;border-bottom:2px solid #eee;}
                    .content h2{font-size:1.5rem;font-weight:500;color:var(--primary-color);margin:28px 0 16px;padding-bottom:8px;border-bottom:1px solid #eee;}
                    .content h3{font-size:1.25rem;font-weight:500;color:var(--primary-color);margin:24px 0 12px;}
                    .content h4{font-size:1.1rem;font-weight:500;color:var(--primary-color);margin:20px 0 10px;}
                    :root[class~="dark"] .content h1{border-bottom-color:#374151;}
                    :root[class~="dark"] .content h2{border-bottom-color:#374151;}
                    
                    .content a{color:#0066cc;text-decoration:none;word-wrap:break-word;border-bottom:1px solid transparent;transition:all 0.2s;}
                    .content a:hover{border-bottom-color:#0066cc;}
                    :root[class~="dark"] .content a{color:#60a5fa;}
                    :root[class~="dark"] .content a:hover{border-bottom-color:#60a5fa;}
                    
                    /* 列表样式优化 */
                    .content ul,.content ol{padding-left:24px;margin:16px 0;line-height:1.7;}
                    .content li{margin-bottom:8px;}
                    .content ul li::marker{color:#0066cc;}
                    .content ol li::marker{color:#0066cc;font-weight:500;}
                    :root[class~="dark"] .content ul li::marker{color:#60a5fa;}
                    :root[class~="dark"] .content ol li::marker{color:#60a5fa;}
                    
                    /* 图片样式优化 */
                    .content img{max-width:100%;height:auto;margin:2rem 0;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.1);display:block;}
                    :root[class~="dark"] .content img{box-shadow:0 4px 20px rgba(0,0,0,0.3);}
                    
                    /* 代码块样式优化 */
                    .content pre{background:#f8fafc;border-radius:8px;padding:16px;margin:20px 0;overflow-x:auto;border:1px solid #e2e8f0;position:relative;}
                    .content pre code{background:transparent;padding:0;color:#2d3748;font-family:'Monaco','Menlo','Ubuntu Mono',monospace;font-size:14px;line-height:1.5;}
                    :root[class~="dark"] .content pre{background:#1a202c;border-color:#2d3748;}
                    :root[class~="dark"] .content pre code{color:#e2e8f0;}
                    
                    /* 语法高亮主题 - 浅色主题 */
                    .content .hljs-keyword{color:#d73a49;font-weight:600;}
                    .content .hljs-string{color:#032f62;}
                    .content .hljs-comment{color:#6a737d;font-style:italic;}
                    .content .hljs-number{color:#005cc5;}
                    .content .hljs-function{color:#6f42c1;}
                    .content .hljs-variable{color:#e36209;}
                    .content .hljs-built_in{color:#005cc5;}
                    .content .hljs-attr{color:#005cc5;}
                    .content .hljs-tag{color:#22863a;}
                    .content .hljs-name{color:#22863a;}
                    .content .hljs-title{color:#6f42c1;font-weight:600;}
                    .content .hljs-meta{color:#6a737d;}
                    .content .hljs-literal{color:#005cc5;}
                    
                    /* 语法高亮主题 - 深色主题 */
                    :root[class~="dark"] .content .hljs-keyword{color:#ff7b72;font-weight:600;}
                    :root[class~="dark"] .content .hljs-string{color:#a5d6ff;}
                    :root[class~="dark"] .content .hljs-comment{color:#8b949e;font-style:italic;}
                    :root[class~="dark"] .content .hljs-number{color:#79c0ff;}
                    :root[class~="dark"] .content .hljs-function{color:#d2a8ff;}
                    :root[class~="dark"] .content .hljs-variable{color:#ffa657;}
                    :root[class~="dark"] .content .hljs-built_in{color:#79c0ff;}
                    :root[class~="dark"] .content .hljs-attr{color:#79c0ff;}
                    :root[class~="dark"] .content .hljs-tag{color:#7ee787;}
                    :root[class~="dark"] .content .hljs-name{color:#7ee787;}
                    :root[class~="dark"] .content .hljs-title{color:#d2a8ff;font-weight:600;}
                    :root[class~="dark"] .content .hljs-meta{color:#8b949e;}
                    :root[class~="dark"] .content .hljs-literal{color:#79c0ff;}
                    
                    /* 行内代码样式 */
                    .content :not(pre)>code{background:#f1f5f9;color:#e53e3e;padding:0.2rem 0.4rem;border-radius:4px;font-size:0.875em;font-weight:500;}
                    :root[class~="dark"] .content :not(pre)>code{background:#2d3748;color:#fc8181;}
                    
                    /* 引用块样式优化 */
                    .content blockquote{border-left:4px solid #0066cc;margin:24px 0;padding:16px 20px;background:#f8fafc;border-radius:0 8px 8px 0;color:var(--meta-color);font-style:italic;position:relative;}
                    .content blockquote::before{content:'"';font-size:3rem;color:#0066cc;position:absolute;top:-10px;left:10px;opacity:0.3;}
                    :root[class~="dark"] .content blockquote{border-left-color:#60a5fa;background:#1a202c;}
                    :root[class~="dark"] .content blockquote::before{color:#60a5fa;}
                    
                    /* 表格样式优化 */
                    .content table{width:100%;margin:24px 0;border-collapse:collapse;background:var(--article-bg);border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);}
                    .content table th{background:#f8fafc;color:#2d3748;font-weight:600;padding:12px 16px;text-align:left;border-bottom:2px solid #e2e8f0;}
                    .content table td{padding:12px 16px;border-bottom:1px solid #e2e8f0;}
                    .content table tr:hover{background:#f8fafc;}
                    :root[class~="dark"] .content table th{background:#2d3748;color:#e2e8f0;border-bottom-color:#4a5568;}
                    :root[class~="dark"] .content table td{border-bottom-color:#4a5568;}
                    :root[class~="dark"] .content table tr:hover{background:#2d3748;}
                    
                    /* 分割线样式 */
                    .content hr{border:none;height:2px;background:linear-gradient(90deg,#0066cc,#60a5fa,#0066cc);margin:32px 0;border-radius:1px;}
                    
                    @media(max-width:768px){
                        .container{padding:10px;}
                        header{padding:20px 0;}
                        header h1{font-size:2em;}
                        .layout.with-sidebar{display:block;}
                        .grid{grid-template-columns:1fr;}
                        .timeline{padding-left:1.5rem;}
                        .year::before{left:-29px;}
                        .month::before{left:-23px;}
                        .post::before{left:-21px;}
                        
                        /* 移动端markdown样式优化 */
                        .content{font-size:15px;line-height:1.7;}
                        .content pre{padding:12px;margin:16px 0;font-size:13px;border-radius:6px;}
                        .content h1{font-size:1.6rem;margin:24px 0 16px;}
                        .content h2{font-size:1.4rem;margin:20px 0 12px;}
                        .content h3{font-size:1.2rem;margin:16px 0 10px;}
                        .content img{margin:1.5rem 0;border-radius:6px;}
                        .content blockquote{padding:12px 16px;margin:16px 0;}
                        .content table{font-size:14px;}
                        .content table th,.content table td{padding:8px 10px;}
                        .content ul,.content ol{padding-left:20px;}
                    }
                `
            }} />
            
            {/* 已移除延迟加载，所有样式都内联以避免冲突 */}
            
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