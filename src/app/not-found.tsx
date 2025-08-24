'use client';

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="article" style={{ textAlign: 'center', padding: '60px 25px' }}>
            <h1 style={{ fontSize: '4rem', margin: '0 0 20px', color: 'var(--primary-color)' }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 15px', color: 'var(--primary-color)' }}>页面未找到</h2>
            <p style={{ color: 'var(--meta-color)', marginBottom: '30px' }}>抱歉，您访问的页面不存在。</p>
            <Link 
                href="/" 
                className="read-more"
                style={{ 
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: 'var(--primary-color)',
                    color: 'var(--bg-color)',
                    textDecoration: 'none',
                    borderRadius: '4px',
                }}
            >
                返回首页
            </Link>
        </div>
    );
}
