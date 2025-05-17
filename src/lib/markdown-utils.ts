import type MarkdownIt from "markdown-it";

// 单独导入需要的语言，减少bundle大小
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import bash from "highlight.js/lib/languages/bash";
import shell from "highlight.js/lib/languages/shell";
import css from "highlight.js/lib/languages/css";
import markdown from "highlight.js/lib/languages/markdown";

// 注册语言
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('css', css);
hljs.registerLanguage('markdown', markdown);

// 单例模式，确保只创建一个parser实例
let markdownParserInstance: MarkdownIt | null = null;

// 添加图片优化的正则表达式工具
const IMG_REGEX = /<img\s+([^>]*?)src="([^"]+)"([^>]*?)>/gi;

// 创建优化的图片标签，使用Next.js的Image组件
const optimizeImages = (html: string): string => {
    return html.replace(IMG_REGEX, (match, prefix, src) => {
        // 提取宽度和高度，如果有的话
        const widthMatch = match.match(/width=["'](\d+)["']/i);
        const heightMatch = match.match(/height=["'](\d+)["']/i);
        const altMatch = match.match(/alt=["']([^"']*)["']/i);

        const width = widthMatch ? parseInt(widthMatch[1], 10) : 800;
        const height = heightMatch ? parseInt(heightMatch[1], 10) : 450;
        const alt = altMatch ? altMatch[1] : '';

        // 构建优化的图片标签，保留原始的响应式样式
        return `<img src="${src}" alt="${alt}" width="${width}" height="${height}" style="max-width:100%;height:auto;" loading="lazy" decoding="async" />`;
    });
};

export const createMarkdownParser = async (): Promise<MarkdownIt> => {
    // 如果实例已存在，直接返回
    if (markdownParserInstance) {
        return markdownParserInstance;
    }

    const MarkdownIt = (await import("markdown-it")).default;

    markdownParserInstance = new MarkdownIt({
        html: true,
        breaks: true,
        linkify: true,
        highlight: (str, lang) => {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(str, {
                        language: lang,
                        ignoreIllegals: true
                    }).value;
                } catch (e) {
                    console.warn(`Highlight error: ${e}`);
                }
            }
            return ""; // 使用默认的转义
        }
    });

    // 渲染内容时自动优化图片标签
    const originalRender = markdownParserInstance.render.bind(markdownParserInstance);
    markdownParserInstance.render = (src: string) => {
        const renderedHtml = originalRender(src);
        return optimizeImages(renderedHtml);
    };

    return markdownParserInstance;
};

// 提取文章摘要的工具函数
export function extractExcerpt(content: string, maxLength: number = 150): string {
    // 按行分割内容
    const lines = content.split("\n");

    // 找到第一个不是空行且不是标题的段落
    const firstParagraph = lines.find(line => {
        const trimmedLine = line.trim();
        return trimmedLine.length > 0 && !trimmedLine.startsWith("#");
    });

    // 如果找到段落，截取适当长度
    if (firstParagraph) {
        const cleaned = firstParagraph.trim();
        return cleaned.length > maxLength
            ? cleaned.substring(0, maxLength) + "..."
            : cleaned;
    }

    // 如果没找到合适的段落，返回空字符串
    return "";
}
