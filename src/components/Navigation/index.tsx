"use client";
import React from "react";
import styles from "./navigation.module.css";
import {Archive, Home, Link as LinkIcon, Tag, User} from "lucide-react";
import {siteConfig} from "@/lib/constants";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {motion} from "framer-motion";

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
        <motion.nav
            className={styles.nav}
            initial={{y: -20, opacity: 0}}
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
                                <motion.div
                                    className={styles.activeIndicator}
                                    layoutId="activeIndicator"
                                    transition={{duration: 0.3}}
                                />
                            )}
                        </motion.div>
                    </Link>
                );
            })}
        </motion.nav>
    );
}
