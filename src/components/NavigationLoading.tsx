"use client";
import { useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationLoading() {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isInitialMount = useRef(true);

    useEffect(() => {
        // 跳过首次挂载
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // 监听页面切换和搜索参数变化（包括分页）
        setIsLoading(true);

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 250); // 250毫秒的加载效果

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    if (!isLoading) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '20px',
            zIndex: 9999
        }}>
            <div style={{
                position: 'relative',
                width: '48px',
                height: '48px'
            }}>
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'conic-gradient(from 0deg, transparent, #007acc)',
                    animation: 'spin 1.2s linear infinite'
                }} />
                <div style={{
                    position: 'absolute',
                    top: '4px',
                    left: '4px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'white'
                }} />
            </div>
            <div style={{
                color: '#333',
                fontSize: '16px',
                fontWeight: '500',
                opacity: '0.8'
            }}>
                载入中...
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    :root[class~="dark"] div {
                        background: rgba(26, 26, 26, 0.8) !important;
                    }
                `
            }} />
        </div>
    );
}