// src/app/about/layout.tsx
import styles from './layout.module.css'
import React from "react";

export default function AboutLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.paper}>
                    {children}
                </div>
            </div>
        </div>
    )
}
