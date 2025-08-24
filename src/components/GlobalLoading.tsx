"use client";
import { useEffect, useState } from 'react';

export default function GlobalLoading() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // 页面切换后显示过渡遮罩
        const showTransition = () => {
            setLoading(true);
            
            // 短暂显示遮罩，让内容出现更平滑
            setTimeout(() => {
                setLoading(false);
            }, 250);
        };

        // 组件挂载时显示过渡效果
        showTransition();

        return () => {
            setLoading(false);
        };
    }, []);

    if (!loading) return null;

    return (
        <div 
            className="global-loading-overlay" 
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255, 255, 255, 0.8)',
                zIndex: 9999,
                backdropFilter: 'blur(2px)',
                pointerEvents: 'none'
            }}
        >
            <style dangerouslySetInnerHTML={{
                __html: `
                    .global-loading-overlay {
                        animation: fadeOut 250ms ease-out forwards;
                    }
                    :root[class~="dark"] .global-loading-overlay {
                        background: rgba(26, 26, 26, 0.8) !important;
                    }
                    @keyframes fadeOut {
                        0% { opacity: 1; }
                        100% { opacity: 0; }
                    }
                `
            }} />
        </div>
    );
}