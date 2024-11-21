import {unstable_cache} from "next/cache";
import fs from "fs/promises"; // 改用 promises API
import path from "path";
import matter from "gray-matter";
import type MarkdownIt from "markdown-it";
import {createMarkdownParser} from "@/lib/markdown-utils";

let md: MarkdownIt | null = null;

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}年${month}月${day}日`;
};

const getMarkdownParser = async () => {
    if (!md) {
        md = await createMarkdownParser();
    }
    return md;
};

const POSTS_PER_PAGE = 4;
const postsDirectory = path.join(process.cwd(), "posts");

// 基础文章获取函数 - 添加缓存
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
                    return {
                        id,
                        title: data.title,
                        date: formatDate(new Date(data.date)),
                        category: data.category,
                        excerpt: content.split("\n").slice(0, 3).join("\n"),
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
        revalidate: 3600,  // 1小时缓存
        tags: ["posts"]    // 添加标签便于手动清除
    }
);

// 获取所有文章
export const getAllPosts = unstable_cache(
    async () => fetchAllPosts(),
    ["all-posts"],
    {
        revalidate: 300,   // 5分钟缓存
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

// 分页获取文章
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
    ["paginated-posts"],
    {
        revalidate: 300,
        tags: ["posts"]
    }
);

// 获取单篇文章
export const getPostById = unstable_cache(
    async (id: string) => {
        try {
            const fullPath = path.join(postsDirectory, `${id}.md`);
            const fileContents = await fs.readFile(fullPath, "utf8");
            const {data, content} = matter(fileContents);
            const md = await getMarkdownParser();
            return {
                id,
                title: data.title,
                date: formatDate(new Date(data.date)),
                category: data.category,
                content: md.render(content),
                excerpt: ""
            };
        } catch {
            return null;
        }
    },
    ["post"],
    {revalidate: 300}
);

// 通过分类获取文章
export const getPostsByCategory = unstable_cache(
    async (category: string) => {
        const allPosts = await getAllPosts();
        return allPosts.filter(post => post.category === category);
    },
    ["posts-by-category"],
    {
        revalidate: 300,
        tags: ["posts", "categories"]
    }
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
