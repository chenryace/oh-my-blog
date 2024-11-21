import type MarkdownIt from "markdown-it";
import hljs from "highlight.js";
// 预加载你需要的语言
import "highlight.js/lib/languages/java";
import "highlight.js/lib/languages/javascript";
import "highlight.js/lib/languages/bash";
import "highlight.js/lib/languages/shell";

export const createMarkdownParser = async (): Promise<MarkdownIt> => {
    const MarkdownIt = (await import("markdown-it")).default;

    const parser = new MarkdownIt({
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
                    console.log(e);
                }
            }
            return ""; // 使用默认的转义
        }
    });

    return parser;
};
