"use client";

import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import {useCallback} from "react";

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
                    className="text-[#595959] dark:text-[#9ca3af] no-underline min-w-8 h-8 flex items-center justify-center border border-[#d9d9d9] dark:border-[#374151] rounded transition-all duration-200 bg-white dark:bg-[#1f2937] hover:text-[#262626] dark:hover:text-[#e5e7eb] hover:border-[#8c8c8c] dark:hover:border-[#4b5563] hover:bg-[#fafafa] dark:hover:bg-[#374151] active:translate-y-[1px]"
                >
                    1
                </Link>
            );
            if (startPage > 2) {
                pages.push(
                    <span key="dotsStart" className="text-[#8c8c8c] dark:text-[#9ca3af] px-[0.2rem]">
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
                    className={`text-[#595959] dark:text-[#9ca3af] no-underline min-w-8 h-8 flex items-center justify-center border border-[#d9d9d9] dark:border-[#374151] rounded transition-all duration-200 bg-white dark:bg-[#1f2937] hover:text-[#262626] dark:hover:text-[#e5e7eb] hover:border-[#8c8c8c] dark:hover:border-[#4b5563] hover:bg-[#fafafa] dark:hover:bg-[#374151] active:translate-y-[1px] ${currentPage === i ? 'text-[#262626] dark:text-[#e5e7eb] bg-[#f0f0f0] dark:bg-[#374151] border-[#d9d9d9] dark:border-[#4b5563] font-medium hover:text-[#262626] dark:hover:text-[#e5e7eb] hover:bg-[#f0f0f0] dark:hover:bg-[#374151] hover:border-[#8c8c8c] dark:hover:border-[#4b5563]' : ''}`}
                >
                    {i}
                </Link>
            );
        }

        // 显示最后一页
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <span key="dotsEnd" className="text-[#8c8c8c] dark:text-[#9ca3af] px-[0.2rem]">
                        ...
                    </span>
                );
            }
            pages.push(
                <Link
                    key={totalPages}
                    href={createPageUrl(totalPages)}
                    className={`text-[#595959] dark:text-[#9ca3af] no-underline min-w-8 h-8 flex items-center justify-center border border-[#d9d9d9] dark:border-[#374151] rounded transition-all duration-200 bg-white dark:bg-[#1f2937] hover:text-[#262626] dark:hover:text-[#e5e7eb] hover:border-[#8c8c8c] dark:hover:border-[#4b5563] hover:bg-[#fafafa] dark:hover:bg-[#374151] active:translate-y-[1px] ${currentPage === totalPages ? 'text-[#262626] dark:text-[#e5e7eb] bg-[#f0f0f0] dark:bg-[#374151] border-[#d9d9d9] dark:border-[#4b5563] font-medium hover:text-[#262626] dark:hover:text-[#e5e7eb] hover:bg-[#f0f0f0] dark:hover:bg-[#374151] hover:border-[#8c8c8c] dark:hover:border-[#4b5563]' : ''}`}
                >
                    {totalPages}
                </Link>
            );
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="w-full py-8">
            <div className="flex justify-center items-center gap-8 md:gap-8 sm:gap-4">
                {currentPage > 1 && (
                    <Link
                        href={createPageUrl(currentPage - 1)}
                        className="text-[#595959] dark:text-[#9ca3af] no-underline text-sm py-2 px-[1.2rem] border border-[#d9d9d9] dark:border-[#374151] rounded transition-all duration-200 bg-white dark:bg-[#1f2937] font-medium hover:text-[#262626] dark:hover:text-[#e5e7eb] hover:border-[#8c8c8c] dark:hover:border-[#4b5563] hover:bg-[#fafafa] dark:hover:bg-[#374151] active:translate-y-[1px]"
                    >
                        上一页
                    </Link>
                )}

                <div className="flex gap-2 items-center md:flex sm:hidden">
                    {renderPageNumbers()}
                </div>

                {currentPage < totalPages && (
                    <Link
                        href={createPageUrl(currentPage + 1)}
                        className="text-[#595959] dark:text-[#9ca3af] no-underline text-sm py-2 px-[1.2rem] border border-[#d9d9d9] dark:border-[#374151] rounded transition-all duration-200 bg-white dark:bg-[#1f2937] font-medium hover:text-[#262626] dark:hover:text-[#e5e7eb] hover:border-[#8c8c8c] dark:hover:border-[#4b5563] hover:bg-[#fafafa] dark:hover:bg-[#374151] active:translate-y-[1px]"
                    >
                        下一页
                    </Link>
                )}
            </div>
        </div>
    );
}
