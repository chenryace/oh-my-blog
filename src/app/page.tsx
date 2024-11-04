import {getAllPosts} from '@/lib/posts'
import ArticleCard from '@/components/ArticleCard'

export default function Home() {
    const posts = getAllPosts()

    return (
        <>
            {posts.map((post) => (
                <ArticleCard key={post.id} {...post} />
            ))}
        </>
    )
}
