// src/app/layout.tsx
import {Suspense} from "react";
import "./globals.css";
import {siteConfig} from "@/lib/constants";
import Navigation from "@/components/Navigation";
import {getCategoryStats} from "@/lib/posts.server";
import {Metadata} from "next";
import CategorySidebar from "@/components/CategorySidebar";
import Loading from "@/components/Loading";
import {Providers} from "@/components/Providers";
import {ThemeToggle} from "@/components/ThemeToggle";

export const metadata: Metadata = {
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.title}`
    },
    description: siteConfig.description
};

// 分离侧边栏获取数据的逻辑
const SidebarWrapper = async () => {
    const categoryStats = await getCategoryStats();
    return <CategorySidebar categoryStats={categoryStats}/>;
};

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh-CN" suppressHydrationWarning>
        <body className="min-h-screen antialiased" suppressHydrationWarning>
        <Providers>
            <div className="container transition-colors duration-300">
                <header className="py-8 text-center relative border-b dark:border-gray-800 bg-background">
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
                    <Suspense fallback={
                        <div className="sidebar-skeleton animate-pulse">
                            <div className="h-48 bg-muted rounded-md mb-4"/>
                            <div className="h-32 bg-muted rounded-md"/>
                        </div>}>
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
