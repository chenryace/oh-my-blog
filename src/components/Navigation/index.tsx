import React from 'react';
import styles from './Navigation.module.css';
import {Archive, Home, Link as LinkIcon, Tag, User} from 'lucide-react'

import {siteConfig} from '@/lib/constants'
import Link from "next/link";

const IconMap = {
    Home,
    Archive,
    Tag,
    User,
    Link: LinkIcon
} as const

type IconName = keyof typeof IconMap

export default function Navigation() {
    return (
        <nav className={styles.nav}>
            {siteConfig.nav.map(item => {
                const Icon = IconMap[item.icon as IconName]
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={styles.navItem}
                    >
                        <Icon
                            size={18}
                            className={styles.icon}
                        />
                        <span className={styles.label}>
                            {item.label}
                        </span>
                    </Link>
                )
            })}
        </nav>
    )
}
