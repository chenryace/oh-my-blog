// app/page.tsx
import Pagination from "@/components/Pagination";
import ArticleCard from "@/components/ArticleCard";
import {getPaginatedPosts} from "@/lib/posts.server";

import {Suspense} from 'react';

export default async function Home({searchParams}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const page = Number((await searchParams).page) || 1;
    const {posts, pagination} = await getPaginatedPosts(page);

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                {posts.map(post => (
                    <ArticleCard key={post.id} {...post} />
                ))}
                <Pagination {...pagination} />
            </Suspense>
        </div>
    );
}
