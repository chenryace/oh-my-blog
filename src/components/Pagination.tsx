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

    const renderPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        // 调整起始页面，确保显示足够的页码
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        // 如果不是从第1页开始，显示第1页和省略号
        if (startPage > 1) {
            pages.push(
                <Link
                    key={1}
                    href={getPageUrl(1)}
                    className={`pagination-number ${currentPage === 1 ? 'active' : ''}`}
                    prefetch={false}
                    onClick={() => handlePageClick(1)}
                >
                    1
                </Link>
            );
            if (startPage > 2) {
                pages.push(<span key="dots1" className="pagination-dots">...</span>);
            }
        }

        // 显示页码范围
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Link
                    key={i}
                    href={getPageUrl(i)}
                    className={`pagination-number ${currentPage === i ? 'active' : ''}`}
                    prefetch={false}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </Link>
            );
        }

        // 如果不是到最后一页，显示省略号和最后一页
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<span key="dots2" className="pagination-dots">...</span>);
            }
            pages.push(
                <Link
                    key={totalPages}
                    href={getPageUrl(totalPages)}
                    className={`pagination-number ${currentPage === totalPages ? 'active' : ''}`}
                    prefetch={false}
                    onClick={() => handlePageClick(totalPages)}
                >
                    {totalPages}
                </Link>
            );
        }

        return pages;
    };

    const handlePageClick = (page: number) => {
        router.push(getPageUrl(page));
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
