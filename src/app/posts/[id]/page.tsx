// src/app/posts/[id]/page.tsx
import styles from "./post.module.css";
import {getAllPosts, getPostById} from "@/lib/posts.server";
import {notFound} from "next/navigation";
import {categoryNames} from "@/lib/constants";
import {Metadata} from "next";
import 'highlight.js/styles/atom-one-dark-reasonable.css';

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
        <div className="max-w-3xl mx-auto px-4">
            <article className={styles.article}>
                <header>
                    <h1 className={styles.title}>{post.title}</h1>
                    <div className={styles.meta}>
                        <time dateTime={post.date}>发布于 {post.date}</time>
                        {post.category && (
                            <>
                                <span className="mx-2">|</span>
                                <span>分类：{categoryNames[post.category]}</span>
                            </>
                        )}
                    </div>
                </header>

                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{__html: post.content}}
                />
            </article>
        </div>
    );
}
