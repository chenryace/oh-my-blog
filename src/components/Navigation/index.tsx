"use client";
import React from "react";
import styles from "./navigation.module.css";
import {Archive, Home, Link as LinkIcon, Tag, User} from "lucide-react";
import {siteConfig} from "@/lib/constants";
import Link from "next/link";
import {usePathname} from "next/navigation";
// 从framer-motion导入所需的组件
import { motion } from "framer-motion";
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
        <motion.nav
            className={styles.nav}
            animate={{y: 0, opacity: 1}}
            transition={{type: "spring", stiffness: 300, damping: 30}}
        >
            {siteConfig.nav.map(item => {
                const Icon = IconMap[item.icon as IconName];
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        scroll={false}
                        className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                    >
                        <motion.div
                            className={styles.iconWrapper}
                            whileTap={{scale: 0.9}}
                            whileHover={{scale: 1.1}}
                            transition={{duration: 0.2}}
                        >
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
                        </motion.div>
                    </Link>
                );
            })}
        </motion.nav>
    );
}
