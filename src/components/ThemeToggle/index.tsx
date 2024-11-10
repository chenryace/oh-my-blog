// components/ThemeToggle/index.tsx
"use client";

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {Moon, Sun} from "lucide-react";
import styles from "./style.module.css";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const {systemTheme, theme, setTheme} = useTheme();  // 添加 systemTheme

    useEffect(() => {
        setMounted(true);
    }, []);

    // 获取当前实际的主题
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (!mounted) {
        return null;
    }

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
