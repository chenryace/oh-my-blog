// src/app/page.tsx
import {getPaginatedPosts} from "@/lib/posts.server";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";

interface HomeProps {
    params: { page?: string };
    searchParams: { page?: string };
}

const PostsList = async ({page}: { page: number }) => {
    const {posts, pagination} = await getPaginatedPosts(page);
    
    // 预取下一页数据
    if (pagination.currentPage < pagination.totalPages) {
        void getPaginatedPosts(pagination.currentPage + 1);
    }

    if (!posts.length) {
        return <div>没有找到文章</div>;
    }

    return (
        <>
            <div>
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
            <PostsList page={page}/>
        </>
    );
}
