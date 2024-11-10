// components/ThemeToggle/index.tsx
"use client";

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import { Sun, Moon } from "lucide-react";
import styles from './style.module.css';

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const {theme, setTheme} = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`${styles.switch} ${theme === 'dark' ? styles.dark : ''}`}
            aria-label="Toggle theme"
        >
            <span className={styles.slider}>
                {theme === 'dark' ? (
                    <Moon size={12} className={styles.icon} />
                ) : (
                    <Sun size={12} className={styles.icon} />
                )}
            </span>
        </button>
    );
}
