// src/app/layout.tsx
import {Suspense} from "react";
import "./globals.css";
import {siteConfig} from "@/lib/constants";
import Navigation from "@/components/Navigation";
import {getCategoryStats} from "@/lib/posts.server";
import {Metadata} from "next";
import Loading from "@/components/Loading";
import {Providers} from "@/components/Providers";
import {ThemeToggle} from "@/components/ThemeToggle";
import CategorySidebar from "@/components/CategorySidebar";

import {Inter} from "next/font/google";

// 优化字体加载，只加载必要的字重
const inter = Inter({
    subsets: ["latin"],
    display: "swap", // 保持font-display: swap
    weight: ["400", "700"],
    preload: true,
    fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
    variable: '--font-inter', // 添加CSS变量
    adjustFontFallback: false // 禁用Next.js的字体fallback调整，避免布局偏移
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
            {/* 预连接到关键域名 */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            
            {/* DNS预解析 */}
            <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
            <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
            
            {/* 预加载关键资源 */}
            <link rel="preload" href="/favicon.ico" as="image" type="image/x-icon" />
            
            {/* PWA相关配置 - 异步加载不影响首屏 */}
            <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
            
            {/* Apple Touch Icon */}
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            
            {/* iOS PWA配置 */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="qfdk's Blog" />
            
            {/* Android PWA配置 */}
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="application-name" content="qfdk's Blog" />
            
            {/* 资源优先级提示 */}
            <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            
            {/* 关键CSS内联 - 首屏渲染优化 */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    /* 关键首屏样式 */
                    *{margin:0;padding:0;box-sizing:border-box;}
                    html{scroll-behavior:smooth;}
                    body{font-family:${inter.style.fontFamily},-apple-system,BlinkMacSystemFont,sans-serif;line-height:1.6;background:var(--bg-color,#f5f5f5);color:var(--primary-color,#333);transition:background-color 0.2s,color 0.2s;}
                    .container{max-width:960px;margin:0 auto;padding:20px;}
                    header{text-align:center;padding:2rem 0;}
                    h1{font-size:2.5rem;margin-bottom:0.5rem;font-weight:700;}
                    .layout{display:grid;grid-template-columns:1fr 250px;gap:20px;margin:20px 0;}
                    @media(max-width:768px){.layout{display:block;}.container{padding:10px;}}
                    /* 骨架屏样式 */
                    .loading-skeleton{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:4px;min-height:200px;}
                    @keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
                `
            }} />
            
            {/* 性能监控脚本 - 异步加载，不阻塞首屏 */}
            <script async dangerouslySetInnerHTML={{
                __html: `
                    // 延迟执行，确保不阻塞首屏渲染
                    requestIdleCallback ? requestIdleCallback(initVitals) : setTimeout(initVitals, 0);
                    
                    function initVitals() {
                        if (typeof window === 'undefined') return;
                        
                        function vitals(metric) {
                            const body = JSON.stringify(metric);
                            const url = '/api/vitals';
                            if (navigator.sendBeacon) {
                                navigator.sendBeacon(url, body);
                            } else {
                                fetch(url, {method: 'POST', body, keepalive: true}).catch(() => {});
                            }
                        }
                        
                        // 动态导入web-vitals，避免阻塞
                        import('web-vitals').then(({onCLS, onFID, onFCP, onLCP, onTTFB}) => {
                            onCLS(vitals);
                            onFID(vitals);
                            onFCP(vitals);
                            onLCP(vitals);
                            onTTFB(vitals);
                        }).catch(() => {});
                    }
                `
            }} />
        </head>
        <body className="min-h-screen antialiased" suppressHydrationWarning>
        <Providers>
            <div className="container transition-colors duration-300">
                <header className="py-8 text-center relative dark:border-gray-800 bg-background">
                    <div className="max-w-4xl mx-auto px-4">
                        <h1 className="text-3xl font-bold mb-2">
                            {siteConfig.title}
                        </h1>
                        <p className="text-muted-foreground">
                            {siteConfig.description}
                        </p>
                    </div>
                    <div className="absolute right-4 top-4">
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

                <footer className="py-8 text-center border-t dark:border-gray-800 bg-background">
                    <p className="text-muted-foreground">{siteConfig.footer}</p>
                </footer>
            </div>
        </Providers>
        </body>
        </html>
    );
}
