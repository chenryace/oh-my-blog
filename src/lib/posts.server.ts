// src/lib/posts.server.ts
import { unstable_cache } from 'next/cache';
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {format} from "date-fns";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true
});

const POSTS_PER_PAGE = 4;
const postsDirectory = path.join(process.cwd(), "posts");

// 基础文章获取函数
const fetchAllPosts = () => {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
        .filter(fileName => fileName.endsWith(".md"))
        .map(fileName => {
            const id = fileName.replace(/\.md$/, "");
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const {data, content} = matter(fileContents);

            return {
                id,
                title: data.title,
                date: format(new Date(data.date), "yyyy年MM月dd日"),
                category: data.category,
                excerpt: content.split("\n").slice(0, 3).join("\n")
            };
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// 使用 unstable_cache 包装获取所有文章
export const getAllPosts = unstable_cache(
    async () => fetchAllPosts(),
    ['all-posts'],
    { revalidate: 300 } // 5分钟缓存
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
    ['category-stats'],
    { revalidate: 300 }
);

// 分页获取文章
export const getPaginatedPosts = unstable_cache(
    async (page: number = 1) => {
        const allPosts = await getAllPosts();
        const totalPosts = allPosts.length;
        const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
        const validPage = Math.max(1, Math.min(page, totalPages));
        const startIndex = (validPage - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;

        return {
            posts: allPosts.slice(startIndex, endIndex),
            pagination: {
                currentPage: validPage,
                totalPages,
                totalPosts
            }
        };
    },
    ['paginated-posts'],
    { revalidate: 300 }
);

// 获取单篇文章
export const getPostById = unstable_cache(
    async (id: string) => {
        try {
            const fullPath = path.join(postsDirectory, `${id}.md`);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const {data, content} = matter(fileContents);

            return {
                id,
                title: data.title,
                date: format(new Date(data.date), "yyyy年MM月dd日"),
                category: data.category,
                content: md.render(content),
                excerpt: ""
            };
        } catch {
            return null;
        }
    },
    ['post-by-id'],
    { revalidate: 300 }
);

// 添加预获取函数用于静态生成
export async function generateStaticParams() {
    const posts = await getAllPosts();
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

    return {
        // 预生成首页和分页
        pages: Array.from({ length: totalPages }, (_, i) => ({
            page: (i + 1).toString()
        })),
        // 预生成所有文章页
        posts: posts.map(post => ({
            id: post.id
        }))
    };
}
