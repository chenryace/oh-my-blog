import {unstable_cache} from "next/cache";
import fs from "fs/promises"; // 改用 promises API
import path from "path";
import matter from "gray-matter";
import {createMarkdownParser, extractExcerpt} from "@/lib/markdown-utils";

// 优化的日期格式化函数
const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}年${month}月${day}日`;
};


const POSTS_PER_PAGE = 4;
const postsDirectory = path.join(process.cwd(), "posts");

// 基础文章获取函数 - 优化缓存和加载策略
const fetchAllPosts = unstable_cache(
    async () => {
        const fileNames = await fs.readdir(postsDirectory);
        const posts = await Promise.all(
            fileNames
                .filter(fileName => fileName.endsWith(".md"))
                .map(async fileName => {
                    const id = fileName.replace(/\.md$/, "");
                    const fullPath = path.join(postsDirectory, fileName);
                    const fileContents = await fs.readFile(fullPath, "utf8");
                    const {data, content} = matter(fileContents);

                    // 使用共享的 extractExcerpt 函数
                    return {
                        id,
                        title: data.title,
                        date: formatDate(new Date(data.date)),
                        category: data.category,
                        excerpt: extractExcerpt(content),
                        rawDate: data.date
                    };
                })
        );
        return posts.sort((a, b) =>
            new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime()
        );
    },
    ["raw-posts"],
    {
        revalidate: 1800, // 降低到半小时，平衡性能和新鲜度
        tags: ["posts"]
    }
);

// 获取所有文章 - 优化缓存时间
export const getAllPosts = unstable_cache(
    async () => fetchAllPosts(),
    ["all-posts"],
    {
        revalidate: 3600, // 降低到1小时，确保内容更新及时显示
        tags: ["posts"]
    }
);

// 获取分类统计
export const getCategoryStats = unstable_cache(
    async () => {
        const posts = await getAllPosts();
        return posts.reduce((acc, post) => {
            acc[post.category] = (acc[post.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    },
    ["category-stats"],
    {
        revalidate: 300,
        tags: ["categories"]
    }
);

// 分页获取文章 - 优化缓存策略
export const getPaginatedPosts = unstable_cache(
    async (page: number = 1) => {
        
        const allPosts = await getAllPosts();
        const totalPosts = allPosts.length;
        const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

        // 确保页码在有效范围内
        const validPage = Math.max(1, Math.min(page, totalPages));
        const startIndex = (validPage - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;

        const paginatedPosts = allPosts.slice(startIndex, endIndex);

        return {
            posts: paginatedPosts,
            pagination: {
                currentPage: validPage,
                totalPages,
                totalPosts
            }
        };
    },
    // 使用页码作为缓存键的一部分
    (page) => [`paginated-posts-${page}`],
    {
        revalidate: 3600, // 1小时缓存
        tags: ["posts"]
    }
);

// 获取单篇文章 - 全面优化版本
export const getPostById = unstable_cache(
    async (id: string) => {
        try {
            const fullPath = path.join(postsDirectory, `${id}.md`);
            const fileContents = await fs.readFile(fullPath, "utf8");
            const {data, content} = matter(fileContents);

            // 直接使用优化的 createMarkdownParser 函数
            const parser = await createMarkdownParser();
            const renderedContent = await parser.render(content);

            return {
                id,
                title: data.title,
                date: formatDate(new Date(data.date)),
                category: data.category,
                content: renderedContent,
                excerpt: extractExcerpt(content)
            };
        } catch (error) {
            console.error("Error in getPostById:", error);
            return null;
        }
    },
    // 使用文章ID作为缓存键的一部分
    (id) => [`post-${id}`],
    {revalidate: 3600} // 降低到一小时，和其他缓存时间保持一致
);

// 添加预获取函数用于静态生成
export async function generateStaticParams() {
    const posts = await getAllPosts();
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

    // 只预生成前3页和最新10篇文章
    return {
        pages: Array.from({length: Math.min(3, totalPages)}, (_, i) => ({
            page: (i + 1).toString()
        })),
        posts: posts.slice(0, 10).map(post => ({
            id: post.id
        }))
    };
}
