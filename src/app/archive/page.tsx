// src/app/archive/page.tsx
import styles from './archive.module.css'
import {getAllPosts} from '@/lib/posts'

export default function ArchivePage() {
    const posts = getAllPosts();

    // 按年份组织文章
    const postsByYear = posts.reduce((acc, post) => {
        // 尝试从日期中提取年份
        let year;
        try {
            const date = new Date(post.date.replace(/-/g, '/'));
            year = date.getFullYear();
            if (isNaN(year)) {
                year = new Date().getFullYear(); // 如果解析失败，使用当前年份
            }
        } catch (e) {
            year = new Date().getFullYear();
            console.log(e);
        }

        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(post);
        return acc;
    }, {} as Record<number, typeof posts>);

    // 获取年份并降序排序
    const years = Object.keys(postsByYear)
        .map(Number)
        .sort((a, b) => b - a);

    return (
        <article className={styles.article}>
            <h1 className={styles.title}>归档</h1>

            <div className={styles.timeline}>
                {years.map(year => (
                    <div key={year} className={styles.yearGroup}>
                        <h2 className={styles.year}>
                            {year}
                            <span className={styles.count}>
                                ({postsByYear[year].length})
                            </span>
                        </h2>
                        <ul className={styles.posts}>
                            {postsByYear[year]
                                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                .map(post => (
                                    <li key={post.id} className={styles.post}>
                                        <a href={`/posts/${post.id}`} className={styles.postTitle}>
                                            {post.title}
                                        </a>
                                        <span className={styles.date}>
                                            {post.date}
                                        </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ))}
            </div>
        </article>
    );
}
