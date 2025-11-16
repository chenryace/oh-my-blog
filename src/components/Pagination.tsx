'use client';

import Link from 'next/link';
import {useState} from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const [isNavigating, setIsNavigating] = useState(false);
    const [targetPage, setTargetPage] = useState<number | null>(null);

    // 如果只有一页，不显示分页
    if (totalPages <= 1) {
        return null;
    }

    const getPageUrl = (page: number) => {
        return page === 1 ? '/' : `/?page=${page}`;
    };

    const handleNavigation = (page: number) => {
        if (page === currentPage || isNavigating) {
            return;
        }
        setIsNavigating(true);
        setTargetPage(page);
        // 视觉反馈后自动重置（防止状态卡住）
        setTimeout(() => {
            setIsNavigating(false);
            setTargetPage(null);
        }, 2000);
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        // 调整起始页面，确保显示足够的页码
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        const createPageButton = (page: number) => {
            const isActive = currentPage === page;
            const isLoading = isNavigating && targetPage === page;

            return (
                <Link
                    key={`page-${page}`}
                    href={getPageUrl(page)}
                    onClick={(e) => {
                        if (isActive || isNavigating) {
                            e.preventDefault();
                            return;
                        }
                        handleNavigation(page);
                    }}
                    className={`pagination-number ${isActive ? 'active' : ''} ${isLoading ? 'loading' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    aria-disabled={isActive || isNavigating}
                    prefetch={false}
                >
                    {isLoading ? '...' : page}
                </Link>
            );
        };

        // 如果不是从第1页开始，显示第1页和省略号
        if (startPage > 1) {
            pages.push(createPageButton(1));
            if (startPage > 2) {
                pages.push(<span key="dots1" className="pagination-dots">...</span>);
            }
        }

        // 显示页码范围
        for (let i = startPage; i <= endPage; i++) {
            pages.push(createPageButton(i));
        }

        // 如果不是到最后一页，显示省略号和最后一页
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<span key="dots2" className="pagination-dots">...</span>);
            }
            pages.push(createPageButton(totalPages));
        }

        return pages;
    };

    return (
        <div className="pagination">
            {/* 上一页 */}
            {currentPage > 1 && (
                <Link
                    href={getPageUrl(currentPage - 1)}
                    className={`pagination-nav ${isNavigating && targetPage === currentPage - 1 ? 'loading' : ''}`}
                    onClick={() => handleNavigation(currentPage - 1)}
                    aria-disabled={isNavigating}
                    prefetch={false}
                >
                    {isNavigating && targetPage === currentPage - 1 ? '...' : '← 上一页'}
                </Link>
            )}

            {/* 页码 */}
            <div className="pagination-numbers">
                {renderPageNumbers()}
            </div>

            {/* 下一页 */}
            {currentPage < totalPages && (
                <Link
                    href={getPageUrl(currentPage + 1)}
                    className={`pagination-nav ${isNavigating && targetPage === currentPage + 1 ? 'loading' : ''}`}
                    onClick={() => handleNavigation(currentPage + 1)}
                    aria-disabled={isNavigating}
                    prefetch={false}
                >
                    {isNavigating && targetPage === currentPage + 1 ? '...' : '下一页 →'}
                </Link>
            )}
        </div>
    );
}
