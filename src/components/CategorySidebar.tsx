// components/CategorySidebar.tsx
"use client";
import Link from "next/link";
import {memo} from "react";
import {siteConfig} from "@/lib/constants";

interface CategorySidebarProps {
    categoryStats: Record<string, number>;
}

function CategorySidebar({categoryStats}: CategorySidebarProps) {
    return (
        <aside className="sidebar">
            <div className="widget">
                <h3>分类</h3>
                <ul>
                    {siteConfig.categories.map(category => (
                        <li key={category.slug}>
                            <Link href={`/category/${category.slug}`}
                                  prefetch={true}
                                  className="transition-colors hover:text-primary">
                                {category.name} ({categoryStats[category.slug] || 0})
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="widget">
                <h3>友情链接</h3>
                <ul>
                    {siteConfig.friends.map(friend => (
                        <li key={friend.url}>
                            <a href={friend.url}
                               className="transition-colors hover:text-primary">
                                {friend.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

// 自定义比较函数，只比较分类统计对象而不是每个属性
function arePropsEqual(prevProps: CategorySidebarProps, nextProps: CategorySidebarProps) {
    // 检查长度是否相同
    const prevKeys = Object.keys(prevProps.categoryStats);
    const nextKeys = Object.keys(nextProps.categoryStats);
    
    if (prevKeys.length !== nextKeys.length) {
        return false;
    }
    
    // 检查每个键对应的值是否相同
    return prevKeys.every(key => prevProps.categoryStats[key] === nextProps.categoryStats[key]);
}

// 使用memo包装组件，提高渲染性能
export default memo(CategorySidebar, arePropsEqual);
