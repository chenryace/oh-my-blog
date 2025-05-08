import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    // 优化生产构建
    experimental: {
        optimizeCss: true, // 优化 CSS
        optimizePackageImports: ["@/components"], // 优化组件导入
        scrollRestoration: true, // 启用滚动恢复
    },
    // 启用压缩
    compress: true,
    typescript: {
        ignoreBuildErrors: true
    },
    transpilePackages: ["markdown-it"],
    // 图片优化配置 - Vercel已内置优化
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        minimumCacheTTL: 60 * 60 * 24 * 7, // 7天缓存
    },
    // 优化JS代码
    swcMinify: true,
    // 优化字体加载
    optimizeFonts: true,
    // 启用HTTP2 Push预加载
    poweredByHeader: false,
    // Vercel特定优化
    reactStrictMode: true
};

export default nextConfig;
