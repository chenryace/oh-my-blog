"use client";
import React from "react";
import styles from "./navigation.module.css";
// 按需导入图标以减少bundle大小
import Archive from "lucide-react/dist/esm/icons/archive";
import Home from "lucide-react/dist/esm/icons/home";
import LinkIcon from "lucide-react/dist/esm/icons/link";
import Tag from "lucide-react/dist/esm/icons/tag";
import User from "lucide-react/dist/esm/icons/user";
import {siteConfig} from "@/lib/constants";
import Link from "next/link";
import {usePathname} from "next/navigation";

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

    return (
        <nav className={styles.nav}>
            {siteConfig.nav.map(item => {
                const Icon = IconMap[item.icon as IconName];
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                    >
                        <div className={styles.iconWrapper}>
                            <Icon size={18} className={styles.icon} />
                            <span className={styles.label}>{item.label}</span>
                            {isActive && <div className={styles.activeIndicator} />}
                        </div>
                    </Link>
                );
            })}
        </nav>
    );
}
