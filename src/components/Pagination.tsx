'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter();
    // 如果只有一页，不显示分页
    if (totalPages <= 1) {
        return null;
    }

    const getPageUrl = (page: number) => {
        return page === 1 ? '/' : `/?page=${page}`;
    };

    const handlePageClick = (page: number) => {
        if (page === currentPage) {
            return;
        }
        router.push(getPageUrl(page));
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

        const createPageButton = (page: number) => (
            <button
                key={`page-${page}`}
                type="button"
                onClick={() => handlePageClick(page)}
                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                aria-current={currentPage === page ? 'page' : undefined}
                disabled={currentPage === page}
            >
                {page}
            </button>
        );

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
                    className="pagination-nav"
                    prefetch={false}
                >
                    ← 上一页
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
                    className="pagination-nav"
                    prefetch={false}
                >
                    下一页 →
                </Link>
            )}
        </div>
    );
}
