"use client";
import React, {useCallback} from "react";
import styles from "./navigation.module.css";
import {Archive, Home, Link as LinkIcon, Tag, User} from "lucide-react";
import {siteConfig} from "@/lib/constants";
import Link from "next/link";
import {usePathname} from "next/navigation";

import {useHasMounted} from "@/hooks/useHasMounted";

const IconMap = {
    Home,
    Archive,
    Tag,
    User,
    Link: LinkIcon
} as const;

type IconName = keyof typeof IconMap;

export default function Navigation() {
    const pathname = usePathname();
    const hasMounted = useHasMounted();
    
    // 链接预取函数
    const prefetchLink = useCallback((href: string) => {
        if (pathname !== href) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = href;
            document.head.appendChild(link);
        }
    }, [pathname]);

    // 如果还没有挂载，返回静态HTML版本
    if (!hasMounted) {
        return (
            <nav className={styles.nav}>
                {siteConfig.nav.map(item => {
                    const Icon = IconMap[item.icon as IconName];
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            scroll={false}
                            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                            onMouseEnter={() => prefetchLink(item.href)}
                        >
                            <div className={styles.iconWrapper}>
                                <Icon
                                    size={18}
                                    className={styles.icon}
                                />
                                <span className={styles.label}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <div className={styles.activeIndicator}/>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>
        );
    }

    return (
        <nav className={styles.nav}>
            {siteConfig.nav.map(item => {
                const Icon = IconMap[item.icon as IconName];
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        scroll={false}
                        className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                        onMouseEnter={() => prefetchLink(item.href)}
                    >
                        <div className={styles.iconWrapper}>
                            <Icon
                                size={18}
                                className={styles.icon}
                            />
                            <span className={styles.label}>
                                {item.label}
                            </span>
                            
                            {isActive && (
                                <div className={styles.activeIndicator} />
                            )}
                        </div>
                    </Link>
                );
            })}
        </nav>
    );
}
