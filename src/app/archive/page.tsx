// src/app/archive/page.tsx
import {AwaitedReactNode, Key, ReactElement, ReactNode, ReactPortal} from 'react';
import styles from './archive.module.css'
import {getAllPosts} from '@/lib/posts.server'

// 按年份和月份组织文章
interface Post {
    id: string;
    title: string;
    date: string;
}

interface PostWithDay extends Post {
    day: number;
}

interface PostsByMonth {
    [month: string]: PostWithDay[];
}

interface PostsByYear {
    [year: number]: PostsByMonth;
}

export default function ArchivePage() {
    const posts = getAllPosts();
    const postsByYear = posts.reduce<PostsByYear>((acc, post) => {
        // 解析中文格式的日期
        let year: number, month: number, day: number;
        try {
            // 从 "2024年11月04日" 格式解析日期
            const matches = post.date.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
            if (matches) {
                [, year, month, day] = matches.map(Number);  // 直接用 map 转换成数字
            } else {
                throw new Error('Invalid date format');
            }
        } catch (e) {
            const now = new Date();
            year = now.getFullYear();
            month = now.getMonth() + 1;
            day = now.getDate();
            console.log('Date parsing error:', e);
        }

        if (!acc[year]) {
            acc[year] = {};
        }

        const monthKey = month.toString().padStart(2, '0');
        if (!acc[year][monthKey]) {
            acc[year][monthKey] = [];
        }

        acc[year][monthKey].push({...post, day});
        return acc;
    }, {});

    // 获取年份并降序排序
    const years = Object.keys(postsByYear)
        .map(Number)
        .sort((a, b) => b - a);

    // 月份名称映射
    const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月'];

    return (
        <article className={styles.article}>
            <h1 className={styles.title}>归档</h1>

            <div className={styles.timeline}>
                {years.map(year => (
                    <div key={year} className={styles.yearGroup}>
                        <h2 className={styles.year}>
                            {year} 年
                            <span className={styles.count}>
                                ({Object.values(postsByYear[year]).flat().length}篇)
                            </span>
                        </h2>
                        {Object.keys(postsByYear[year])
                            .sort((a, b) => b.localeCompare(a)) // 月份降序排序
                            .map(month => (
                                <div key={`${year}-${month}`} className={styles.monthGroup}>
                                    <h3 className={styles.month}>
                                        {monthNames[parseInt(month) - 1]}
                                        <span className={styles.count}>
                                            ({postsByYear[year][month].length}篇)
                                        </span>
                                    </h3>
                                    <ul className={styles.posts}>
                                        {postsByYear[year][month]
                                            .sort((a: { day: number; }, b: { day: number; }) => b.day - a.day)
                                            .map((post: {
                                                id: Key | null | undefined;
                                                day: { toString: () => string; };
                                                title: string | number | bigint | boolean | ReactElement | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined;
                                            }) => (
                                                <li key={post.id} className={styles.post}>
                                                    <a href={`/posts/${post.id}`} className={styles.postTitle}>
                                                        <span
                                                            className={styles.date}>{post.day.toString().padStart(2, '0')}日</span>
                                                        {post.title}
                                                    </a>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </article>
    );
}
