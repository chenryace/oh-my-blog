"use client";
import { useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationLoading() {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isInitialMount = useRef(true);
    const loadingTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // 跳过首次挂载
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // 监听页面切换和搜索参数变化（包括分页）
        setIsLoading(true);

        // 清除之前的超时
        if (loadingTimeout.current) {
            clearTimeout(loadingTimeout.current);
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 250); // 250毫秒的加载效果

        loadingTimeout.current = timer;

        return () => {
            if (loadingTimeout.current) {
                clearTimeout(loadingTimeout.current);
            }
        };
    }, [pathname, searchParams]);

    // 监听所有链接点击，立即显示loading
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');

            if (!link) return;

            // 检查是否是内部链接
            const href = link.getAttribute('href');
            if (!href || href.startsWith('http') || href.startsWith('//') || href.startsWith('#')) {
                return;
            }

            // 检查是否是当前页面
            const currentUrl = window.location.pathname + window.location.search;
            const targetUrl = href;

            if (currentUrl === targetUrl || link.getAttribute('aria-disabled') === 'true') {
                return;
            }

            // 立即显示loading
            setIsLoading(true);

            // 安全网：如果5秒后还在loading，强制关闭
            if (loadingTimeout.current) {
                clearTimeout(loadingTimeout.current);
            }
            loadingTimeout.current = setTimeout(() => {
                setIsLoading(false);
            }, 5000);
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
            if (loadingTimeout.current) {
                clearTimeout(loadingTimeout.current);
            }
        };
    }, []);

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