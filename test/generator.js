const fs = require('fs').promises;
const path = require('path');

class BlogGenerator {
    constructor() {
        this.titles = [
            '周末去爬山的体验',
            '学习编程的第一天',
            '记一次旅行',
            '我的读书笔记',
            '生活中的小确幸',
            '这是一个平凡的日子',
            '美食探店记录',
            '运动健身小结',
            '音乐会观后感',
            '每周学习总结'
        ];

        this.categories = ['life', 'reading', 'tech', 'travel'];

        this.paragraphs = [
            '今天是一个特别的日子，想要记录下来这些美好的时刻。生活中处处都有值得感恩的事情，我们要学会发现。',
            '时间过得真快，转眼间已经到了年末。回顾这一年的经历，有欢笑也有泪水，这些都是人生中珍贵的记忆。',
            '最近工作特别忙，但还是要保持学习的热情。学习是一个持续的过程，需要我们保持耐心和专注。',
            '周末的时候和朋友们一起去远足，看到了很多美丽的风景。大自然总能给我们带来惊喜。',
            '今天尝试了一家新开的餐厅，菜品的口感和环境都很不错。美食总能带给人愉悦的心情。',
            '生活中难免会遇到各种挑战，但保持积极乐观的心态很重要。每个困难都是成长的机会。',
            '最近养成了运动的习惯，感觉整个人的状态都变好了。坚持运动真的能带来很多改变。',
            '今天读完了一本很喜欢的书，书中的故事让我产生了很多思考。阅读能够开阔视野，丰富内心。'
        ];
    }

    generateRandomDate() {
        const start = new Date(2024, 0, 1);
        const end = new Date(2024, 11, 31);
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
            .toISOString()
            .split('T')[0];
    }

    generatePost() {
        const title = this.titles[Math.floor(Math.random() * this.titles.length)];
        const date = this.generateRandomDate();
        const category = this.categories[Math.floor(Math.random() * this.categories.length)];

        // 生成正文段落
        const numParagraphs = Math.floor(Math.random() * 4) + 2; // 2-5段
        const content = this.paragraphs
            .sort(() => Math.random() - 0.5)
            .slice(0, numParagraphs)
            .join('\n\n');

        return `---
title: ${title}
date: ${date}
category: ${category}
---

${content}

## 总结

生活需要记录，需要分享，这样才能留下更多美好的回忆。
`;
    }

    async generateMultiplePosts(count, outputDir = 'posts') {
        try {
            // 确保输出目录存在
            await fs.mkdir(outputDir, {recursive: true});

            // 生成多篇文章
            for (let i = 1; i <= count; i++) {
                const content = this.generatePost();
                const fileName = `post-${i.toString().padStart(3, '0')}.md`;
                const filePath = path.join(outputDir, fileName);

                await fs.writeFile(filePath, content, 'utf-8');
                console.log(`Generated: ${fileName}`);
            }

            console.log(`Successfully generated ${count} blog posts in ${outputDir} directory`);
        } catch (error) {
            console.error('Error generating blog posts:', error);
        }
    }
}

// 使用示例
const generator = new BlogGenerator();

// 生成10篇博客文章
generator.generateMultiplePosts(10).then(() => {
    console.log('All posts have been generated!');
});
