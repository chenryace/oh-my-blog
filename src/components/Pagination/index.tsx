// components/Pagination/index.tsx
'use client'

import Link from 'next/link'
import styles from './pagination.module.css'

interface PaginationProps {
    currentPage: number
    totalPages: number
}

export default function Pagination({currentPage, totalPages}: PaginationProps) {
    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                {currentPage > 1 ? (
                    <Link
                        href={`/?page=${currentPage - 1}`}
                        className={styles.button}
                    >
                        ← 上一页
                    </Link>
                ) : <div/>} {/* 空的div保持布局 */}

                {currentPage < totalPages && (
                    <Link
                        href={`/?page=${currentPage + 1}`}
                        className={styles.button}
                    >
                        下一页 →
                    </Link>
                )}
            </div>
        </div>
    )
}
