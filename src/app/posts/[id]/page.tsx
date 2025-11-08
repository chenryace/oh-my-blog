// src/app/posts/[id]/page.tsx
import {getAllPosts, getPostById} from "@/lib/posts.server";
import {notFound} from "next/navigation";
import {categoryNames} from "@/lib/constants";
import {Metadata} from "next";
// 移除highlight.js CSS，使用layout.tsx中的自定义样式

// 修复 generateMetadata
export async function generateMetadata({params}: { params: { id: string } }): Promise<Metadata> {
    const post = await getPostById((await params).id);

    if (!post) {
        return {
            title: "Post Not Found"
        };
    }

    return {
        title: post.title,
        description: post.excerpt || post.title
    };
}

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        id: post.id
    }));
}

export default async function Post({params}: { params: { id: string } }) {
    const post = await getPostById((await params).id);

    if (!post) {
        notFound();
    }

    return (
        <article className="article article-single">
            <header>
                <h1 className="title">{post.title}</h1>
                <div className="meta">
                    <time dateTime={post.date}>发布于 {post.date}</time>
                    {post.category && (
                        <>
                            <span style={{margin: '0 8px'}}>|</span>
                            <span>分类：{categoryNames[post.category]}</span>
                        </>
                    )}
                </div>
            </header>

            <div
                className="content"
                dangerouslySetInnerHTML={{__html: post.content}}
                suppressHydrationWarning
            />
        </article>
    );
}
