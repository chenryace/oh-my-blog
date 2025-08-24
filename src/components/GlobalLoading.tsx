"use client";
import { useEffect, useState } from 'react';

export default function GlobalLoading() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // 监听页面跳转
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');
            
            if (link && link.href) {
                const currentHost = window.location.origin;
                const linkHost = new URL(link.href).origin;
                
                // 只有内部链接才显示loading
                if (linkHost === currentHost && !link.href.includes('#')) {
                    setLoading(true);
                    
                    // 超时保护，防止loading卡住
                    setTimeout(() => {
                        setLoading(false);
                    }, 200);
                }
            }
        };

        // 监听页面加载完成
        const handleLoad = () => {
            setLoading(false);
        };

        document.addEventListener('click', handleClick);
        window.addEventListener('load', handleLoad);
        
        // 页面隐藏时也重置loading状态
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                setLoading(false);
            }
        });

        return () => {
            document.removeEventListener('click', handleClick);
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    if (!loading) return null;

    return (
        <div className="global-loading-overlay">
            <div className="global-loading-content">
                <div className="global-loading-spinner"></div>
                <p>加载中...</p>
            </div>
        </div>
    );
}