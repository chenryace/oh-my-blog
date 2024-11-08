// app/page.tsx
import Pagination from "@/components/Pagination";
import ArticleCard from "@/components/ArticleCard";
import {getPaginatedPosts} from "@/lib/posts.server";

export default async function Home({params}: { params: { page?: string } }) {
    const page = Number(params.page) || 1;
    const {posts, pagination} = await getPaginatedPosts(page);

    return (
        <div>
            {posts.map(post => (
                <ArticleCard key={post.id} {...post} />
            ))}
            <Pagination {...pagination} />
        </div>
    );
}
