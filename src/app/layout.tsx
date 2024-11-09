// src/app/layout.tsx
import {Suspense} from "react";
import "./globals.css";
import {siteConfig} from "@/lib/constants";
import Navigation from "@/components/Navigation";
import {getCategoryStats} from "@/lib/posts.server";
import {Metadata} from "next";
import CategorySidebar from "@/components/CategorySidebar";
import Loading from "@/components/Loading";

export const metadata: Metadata = {
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.title}`
    },
    description: siteConfig.description
};

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
                    <Loading/>
                    {/*<Suspense fallback={<Loading/>}>*/}
                    {/*    {children}*/}
                    {/*</Suspense>*/}
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
