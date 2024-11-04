// src/components/Navigation.tsx
"use client"
import Link from 'next/link'
import {Archive, Home, Link as LinkIcon, Tag, User} from 'lucide-react'
import {siteConfig} from '@/lib/constants'

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
        <nav>
            {siteConfig.nav.map(item => {
                const Icon = IconMap[item.icon as IconName]
                return (
                    <Link key={item.href} href={item.href} className="nav-item">
                        <Icon size={18}/>
                        <span>{item.label}</span>
                    </Link>
                )
            })}
        </nav>
    )
}
