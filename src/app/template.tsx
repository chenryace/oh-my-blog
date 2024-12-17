"use client";

import {useState} from "react";
import {usePathname} from "next/navigation";
import styles from "./template.module.css";

const animations = [
    "fadeUp",
    "fadeDown",
    "fadeLeft",
    "fadeRight",
    "zoomIn",
    "rotateIn"
] as const;

export default function Template({children}: { children: React.ReactNode }) {
    const pathname = usePathname();

    // 使用确定性的方式选择动画
    const getAnimation = () => {
        if (pathname === "/") return "";

        // 使用 pathname 来确定使用哪个动画
        // 对于相同的 pathname 会始终返回相同的动画
        const index = pathname.split("").reduce((acc, char) => {
            return (acc + char.charCodeAt(0)) % animations.length;
        }, 0);

        return animations[index];
    };

    const [animation] = useState(getAnimation);

    return (
        <div
            className={`${styles.pageWrapper} ${animation ? styles[animation] : ""}`}
            suppressHydrationWarning
        >
            {children}
        </div>
    );
}
