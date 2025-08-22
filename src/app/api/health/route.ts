import { NextResponse } from 'next/server';

// 简单的健康检查端点，可用于外部监控服务ping
export async function GET() {
    return NextResponse.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV
    });
}

// 预热端点（可选）
export async function POST() {
    try {
        // 预热关键数据
        const { getAllPosts } = await import('@/lib/posts.server');
        await getAllPosts();
        
        return NextResponse.json({
            status: 'warmed',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return NextResponse.json(
            { status: 'error', error: 'Warmup failed' },
            { status: 500 }
        );
    }
}