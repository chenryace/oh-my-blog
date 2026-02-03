'use client';

import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
    return (
        <div className={`article ${styles.container}`}>
            <h1 className={styles.title}>404</h1>
            <h2 className={styles.subtitle}>页面未找到</h2>
            <p className={styles.message}>抱歉，您访问的页面不存在。</p>
            <Link 
                href="/" 
                className={styles.homeLink}
            >
                返回首页
            </Link>
        </div>
    );
}
