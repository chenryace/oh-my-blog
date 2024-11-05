import {getPaginatedPosts} from '@/lib/posts.server'
import ArticleCard from '@/components/ArticleCard'
import React from "react";
import Pagination from "@/components/Pagination";

interface HomePageProps {
    searchParams: { page?: string }
}

export default async function HomePage({searchParams}: HomePageProps) {
    const currentPage = Number((await searchParams).page) || 1
    const {posts, pagination} = getPaginatedPosts(currentPage)

    return (
        <>
            <div className="space-y-4">
                {posts.map(post => (
                    <ArticleCard key={post.id}  {...post} />
                ))}
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                />
            </div>

        </>
    )
}
