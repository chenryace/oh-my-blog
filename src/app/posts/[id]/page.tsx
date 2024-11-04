// src/app/posts/[id]/page.tsx
import styles from './post.module.css'
import {getAllPosts, getPostById} from '@/lib/posts'
import {notFound} from 'next/navigation'
import {categoryNames} from "@/lib/constants";

interface Props {
    params: { id: string }
}

export async function generateStaticParams() {
    const posts = getAllPosts()
    return posts.map((post) => ({
        id: post.id,
    }))
}

export default async function Post({params}: Props) {
    const post = getPostById((await params).id)

    if (!post) {
        notFound()
    }

    return (
        <article className={styles.article}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
                发布于 {post.date} | 分类：{categoryNames[post.category]}
            </div>
            <div
                className={styles.content}
                dangerouslySetInnerHTML={{__html: post.content}}
            />
        </article>
    )
}
