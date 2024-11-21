import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    // 优化生产构建
    experimental: {
        optimizeCss: true, // 优化 CSS
        optimizePackageImports: ["@/components"] // 优化组件导入
    },
    // 启用压缩
    compress: true,
    typescript: {
        ignoreBuildErrors: true
    },
    transpilePackages: ["markdown-it"]
};

export default nextConfig;
