'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button 
                className="theme-toggle" 
                aria-label="Toggle theme"
                style={{ visibility: 'hidden' }}
            >
                <span>🌙</span>
                <span>切换主题</span>
            </button>
        );
    }

    return (
        <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
        >
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span>切换主题</span>
        </button>
    );
}