// 监控冷启动影响的简单脚本
// 可以在本地运行或通过 GitHub Actions 运行

const monitorColdStart = async () => {
    const sites = [
        'https://blog.qfdk.me',
        'https://blog.qfdk.me/posts/2024-12-16',
        'https://blog.qfdk.me/api/health'
    ];

    for (const site of sites) {
        const start = Date.now();
        try {
            const response = await fetch(site);
            const end = Date.now();
            const duration = end - start;
            
            console.log(`${site}: ${response.status} - ${duration}ms`);
            
            // 如果响应时间超过3秒，可能是冷启动
            if (duration > 3000) {
                console.warn(`⚠️  Potential cold start: ${site} took ${duration}ms`);
            }
        } catch (error) {
            console.error(`❌ Error: ${site} - ${error.message}`);
        }
        
        // 间隔1秒
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
};

// 如果是Node.js环境就运行
if (typeof require !== 'undefined') {
    monitorColdStart();
}