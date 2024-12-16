"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./template.module.css";

const animations = [
    "fadeUp",
    "fadeDown",
    "fadeLeft",
    "fadeRight",
    "zoomIn",
    "rotateIn"
] as const;

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // 将随机动画的逻辑移到组件外部
    const getRandomAnimation = () => {
        // 首页使用 zoomIn，其他页面随机选择动画
        return pathname === "/" ? "zoomIn" :
            animations[Math.floor(Math.random() * animations.length)];
    };

    // 使用 useState 的初始化函数，确保动画只在组件挂载时计算一次
    const [animation] = useState(getRandomAnimation);

    return (
        <div className={`${styles.pageWrapper} ${styles[animation]}`}>
            {children}
        </div>
    );
}
