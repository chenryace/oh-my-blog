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
            '每周学习总结',
            '城市漫步随想',
            '咖啡馆写作时光',
            '居家生活日记',
            '新技能学习笔记',
            '户外探险记录'
        ];

        this.categories = ['life', 'reading', 'tech', 'travel'];

        this.intros = [
            '今天想要记录一些特别的事情，',
            '生活中总有一些值得分享的时刻，',
            '又到了写日志的时间，',
            '回想这段时间的经历，',
            '最近发生了很多有趣的事，'
        ];

        this.mainPoints = [
            '这段时间工作特别忙，但依然保持着学习的热情。学习是一个持续的过程，需要保持耐心和专注。',
            '周末和朋友们一起去远足，看到了很多美丽的风景。大自然总能给我们带来惊喜和感动。',
            '最近去体验了一家新开的餐厅，从装修到菜品都很用心。美食总能带给人愉悦的心情。',
            '生活中难免会遇到挫折和挑战，但保持积极乐观的心态很重要。每个困难都是成长的机会。',
            '养成了规律运动的习惯，感觉整个人的状态都不一样了。坚持确实能带来改变。',
            '读完了一本很有启发的书，书中的故事引发了很多思考。阅读真的能够开阔视野。',
            '最近参加了一个有趣的活动，认识了很多志同道合的朋友。社交圈的扩展带来了新的视角。',
            '尝试学习了一项新技能，虽然开始时很困难，但慢慢就能体会到其中的乐趣。',
            '整理了一下近期的照片，回顾过去的点点滴滴，感觉时光飞逝却又充实。',
            '这段时间的天气特别好，常常会出去散步，感受城市的变化和生活的节奏。'
        ];

        this.reflections = [
            '经过这次经历，让我明白了坚持的重要性。',
            '回顾这段时光，收获满满。',
            '这些体验让我对生活有了新的认识。',
            '希望未来能有更多这样的美好时刻。',
            '生活中的每一天都值得珍惜。'
        ];

        this.conclusions = [
            '让我们继续保持热爱生活的心态，记录每一个精彩瞬间。',
            '期待下一次的分享，继续记录生活中的点点滴滴。',
            '愿我们都能在平凡的日子里发现不平凡。',
            '感谢有这样的机会和大家分享我的故事。',
            '让我们一起期待未来的精彩。'
        ];

        this.usedTitles = new Set();
        this.usedCombinations = new Set();
    }

    generateRandomDate() {
        const start = new Date(2024, 0, 1);
        const end = new Date(2024, 11, 31);
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
            .toISOString()
            .split('T')[0];
    }

    getRandomUnique(array) {
        const availableItems = array.filter(item => !this.usedTitles.has(item));
        if (availableItems.length === 0) {
            throw new Error('No more unique items available');
        }
        const item = availableItems[Math.floor(Math.random() * availableItems.length)];
        this.usedTitles.add(item);
        return item;
    }

    generateUniqueContent() {
        const intro = this.intros[Math.floor(Math.random() * this.intros.length)];
        const mainPointsCount = Math.floor(Math.random() * 2) + 2; // 2-3 个主要段落
        const selectedMainPoints = [];

        // 确保主要段落不重复
        const availableMainPoints = [...this.mainPoints];
        for (let i = 0; i < mainPointsCount; i++) {
            const index = Math.floor(Math.random() * availableMainPoints.length);
            selectedMainPoints.push(availableMainPoints.splice(index, 1)[0]);
        }

        const reflection = this.reflections[Math.floor(Math.random() * this.reflections.length)];
        const conclusion = this.conclusions[Math.floor(Math.random() * this.conclusions.length)];

        return `${intro}\n\n${selectedMainPoints.join('\n\n')}\n\n${reflection}\n\n${conclusion}`;
    }

    generatePost() {
        try {
            const title = this.getRandomUnique(this.titles);
            const date = this.generateRandomDate();
            const category = this.categories[Math.floor(Math.random() * this.categories.length)];
            const content = this.generateUniqueContent();

            return `---
title: ${title}
date: ${date}
category: ${category}
---

${content}`;
        } catch (error) {
            throw new Error('无法生成更多唯一的文章');
        }
    }

    async generateMultiplePosts(count, outputDir = 'posts') {
        try {
            // 检查请求的文章数量是否超过可能的唯一组合数
            if (count > this.titles.length) {
                throw new Error(`最多只能生成 ${this.titles.length} 篇唯一的文章`);
            }

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

            console.log(`Successfully generated ${count} unique blog posts in ${outputDir} directory`);
        } catch (error) {
            console.error('Error generating blog posts:', error);
        }
    }

    // 重置已使用的标题，允许重新生成
    reset() {
        this.usedTitles.clear();
        this.usedCombinations.clear();
    }
}

// 使用示例
const generator = new BlogGenerator();

// 生成10篇博客文章
generator.generateMultiplePosts(10).then(() => {
    console.log('All posts have been generated!');
});
