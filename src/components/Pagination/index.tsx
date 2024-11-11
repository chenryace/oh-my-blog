"use client";

import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import {useCallback} from "react";
import styles from "./pagination.module.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({currentPage, totalPages}: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageUrl = useCallback((pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }, [pathname, searchParams]);

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 7; // 最多显示7个页码

        let startPage = Math.max(1, currentPage - 3);
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // 调整startPage以确保显示正确数量的页码
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // 显示第一页
        if (startPage > 1) {
            pages.push(
                <Link
                    key={1}
                    href={createPageUrl(1)}
                    className={styles.pageBtn}
                >
                    1
                </Link>
            );
            if (startPage > 2) {
                pages.push(
                    <span key="dotsStart" className={styles.dots}>
                        ...
                    </span>
                );
            }
        }

        // 显示中间页码
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Link
                    key={i}
                    href={createPageUrl(i)}
                    className={`${styles.pageBtn} ${currentPage === i ? styles.active : ""}`}
                >
                    {i}
                </Link>
            );
        }

        // 显示最后一页
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <span key="dotsEnd" className={styles.dots}>
                        ...
                    </span>
                );
            }
            pages.push(
                <Link
                    key={totalPages}
                    href={createPageUrl(totalPages)}
                    className={`${styles.pageBtn} ${currentPage === totalPages ? styles.active : ""}`}
                >
                    {totalPages}
                </Link>
            );
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                {currentPage > 1 && (
                    <Link
                        href={createPageUrl(currentPage - 1)}
                        className={styles.button}
                    >
                        上一页
                    </Link>
                )}

                <div className={styles.pageContainer}>
                    {renderPageNumbers()}
                </div>

                {currentPage < totalPages && (
                    <Link
                        href={createPageUrl(currentPage + 1)}
                        className={styles.button}
                    >
                        下一页
                    </Link>
                )}
            </div>
        </div>
    );
}
