// components/ThemeToggle/index.tsx
"use client";

import {useTheme} from "next-themes";
import {useHasMounted} from "@/hooks/useHasMounted";
import {Moon, Sun} from "lucide-react";
import styles from "./style.module.css";

export function ThemeToggle() {
    // 使用共享的useHasMounted钩子防止水合不匹配
    const hasMounted = useHasMounted();
    const {systemTheme, theme, setTheme} = useTheme();

    // 初始渲染时显示骨架，不显示图标避免水合不匹配
    if (!hasMounted) {
        return (
            <button
                className={`${styles.switch}`}
                aria-label="Toggle theme"
                aria-hidden="true"
            >
                <span className={styles.slider}></span>
            </button>
        );
    }

    // 仅在客户端渲染后确定当前主题
    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
        <button
            onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
            className={`${styles.switch} ${currentTheme === "dark" ? styles.dark : ""}`}
            aria-label="Toggle theme"
        >
            <span className={styles.slider}>
                {currentTheme === "dark" ? (
                    <Moon size={12} className={styles.icon}/>
                ) : (
                    <Sun size={12} className={styles.icon}/>
                )}
            </span>
        </button>
    );
}
