import type {NextConfig} from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

// 启用Bundle Analyzer
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

// 基础配置
const nextConfig: NextConfig = {
    // 优化生产构建
    experimental: {
        optimizePackageImports: ["@/components"], // 优化组件导入
        scrollRestoration: true, // 启用滚动恢复
    },
    // 添加webpack配置优化
    webpack: (config, { dev, isServer }) => {
        // 仅在生产构建和客户端时应用优化
        if (!dev && !isServer) {
            // 增加摇树优化
            config.optimization.usedExports = true;

            // 减小包体积的配置
            if (config.optimization && config.optimization.splitChunks) {
                config.optimization.splitChunks.cacheGroups = {
                    ...config.optimization.splitChunks.cacheGroups,
                    // 确保框架代码被分离
                    framework: {
                        test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
                        name: 'framework',
                        priority: 40,
                    },

                    // 拆分highlight.js
                    highlight: {
                        test: /[\\/]node_modules[\\/]highlight\.js[\\/]/,
                        name: 'highlight',
                        priority: 30,
                    },
                };
            }
        }
        return config;
    },
    // 外部依赖包
    serverExternalPackages: ["highlight.js", "markdown-it"],
    // 启用压缩和优化
    compress: true,
    
    // 静态文件缓存优化
    async headers() {
        return [
            {
                source: '/_next/static/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/favicon.ico',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400',
                    },
                ],
            },
            {
                source: '/manifest.json',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=604800', // 7天缓存
                    },
                ],
            },
            {
                source: '/(apple-touch-icon|icon-.*)\.png',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable', // 1年缓存
                    },
                ],
            },
        ];
    },
    // TypeScript配置
    typescript: {
        ignoreBuildErrors: true,
    },
    // 图片优化配置 - Vercel已内置优化
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        minimumCacheTTL: 60 * 60 * 24 * 7, // 7天缓存
    },
    // 禁用 Powered by 头部
    poweredByHeader: false,
    // 启用严格模式
    reactStrictMode: true,
    // 设置现代JavaScript输出
    compiler: {
        // 移除所有console语句
        removeConsole: process.env.NODE_ENV === "production",
    },
};

// 导出带分析器的配置
export default bundleAnalyzer(nextConfig);
