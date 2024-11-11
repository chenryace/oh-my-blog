// src/app/page.tsx
import {Suspense} from "react";
import {getPaginatedPosts} from "@/lib/posts.server";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import Loading from "@/components/Loading";

interface HomeProps {
    params: { page?: string };
    searchParams: { page?: string };
}

const PostsList = async ({page}: { page: number }) => {
    const {posts, pagination} = await getPaginatedPosts(page);

    if (!posts.length) {
        return <div>没有找到文章</div>;
    }

    return (
        <>
            <div className="space-y-4">
                {posts.map(post => (
                    <ArticleCard key={post.id} {...post} />
                ))}
            </div>
            <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
            />
        </>
    );
};

export default async function Home({searchParams}: HomeProps) {
    const page = Number((await searchParams).page) || 1;

    return (
        <>
            <Suspense key={page} fallback={<Loading/>}>
                <PostsList page={page}/>
            </Suspense>
        </>
    );
}
