// src/app/friends/page.tsx
import styles from "./friends.module.css";
import {siteConfig} from "@/lib/constants";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "友情链接",
    description: "有趣的灵魂总是相互吸引"
};

export default function FriendsPage() {
    return (
        <article className={styles.article}>
            <h1 className={styles.title}>友情链接</h1>

            <div className={styles.intro}>
                <p>有趣的灵魂总是相互吸引</p>
                <p>欢迎交换友链 👋</p>
            </div>

            <div className={styles.grid}>
                {siteConfig.friends.map(friend => (
                    <a
                        key={friend.url}
                        href={friend.url}
                        className={styles.card}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className={styles.content}>
                            <div className={styles.info}>
                                <h2 className={styles.name}>{friend.name}</h2>
                                <p className={styles.description}>{friend.description}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/*<section className={styles.exchange}>*/}
            {/*    <h2>交换友链</h2>*/}
            {/*    <p>如果要交换友链，请按以下格式留言：</p>*/}
            {/*    <ul>*/}
            {/*        <li>名称：你的博客名称</li>*/}
            {/*        <li>简介：一句话介绍</li>*/}
            {/*        <li>链接：你的博客地址</li>*/}
            {/*    </ul>*/}
            {/*</section>*/}
        </article>
    );
}
