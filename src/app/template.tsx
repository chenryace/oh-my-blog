// src/app/template.tsx
'use client';

import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import styles from './template.module.css';

// 定义动画类型
const animations = [
    'fadeUp',
    'fadeDown',
    'fadeLeft',
    'fadeRight',
    'zoomIn',
    'rotateIn'
] as const;

export default function Template({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [animation, setAnimation] = useState<string>('fadeUp');

    useEffect(() => {
        // 随机选择一个动画
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        setAnimation(randomAnimation);
    }, [pathname]);

    return (
        <div className={`${styles.pageWrapper} ${styles[animation]}`}>
            {children}
        </div>
    );
}
