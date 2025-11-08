// Vercel 冷启动优化策略

// 1. 预热关键路径
export const warmupCriticalPaths = async () => {
    // 预加载关键数据，避免冷启动时重复计算
    if (typeof window === 'undefined') {
        try {
            // 预热文章列表缓存
            const { getAllPosts } = await import('./posts.server');
            await getAllPosts();
        } catch (error) {
            console.warn('Warmup failed:', error);
        }
    }
};

// 2. 轻量级依赖加载
export const optimizeImports = () => {
    // 延迟导入非关键依赖
    const lazyShiki = () => import('shiki');
    const lazyMarkdown = () => import('markdown-it');

    return {
        lazyShiki,
        lazyMarkdown
    };
};

// 3. 减少冷启动时间的构建优化
export const buildOptimizations = {
    // 在 next.config.ts 中使用
    experimental: {
        outputFileTracingIncludes: {
            // 确保 posts 目录在部署中可用
            '/': ['./posts/**/*'],
        },
        // 减少bundle大小
        bundlePagesRouterDependencies: true,
    }
};

// 4. 简单的健康检查端点（可选）
export const createHealthCheck = () => {
    // 如果需要外部ping，可以创建 /api/health 端点
    return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        cached: process.env.NODE_ENV === 'production'
    };
};