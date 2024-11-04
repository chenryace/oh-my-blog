// src/app/about/page.tsx
import styles from './about.module.css'
import type {Metadata} from 'next'

export const metadata: Metadata = {
    title: '关于',
    description: '了解更多关于我的信息',
}
export default function About() {
    return (
        <article className={styles.article}>
            <header className={styles.header}>
                <h1 className={styles.title}>关于我</h1>
            </header>

            <div className={styles.content}>
                <section className={styles.section}>
                    <p>Hey，我是 qfdk 👋</p>
                    <p>一名全栈开发工程师，目前在巴黎工作。</p>
                </section>

                <section className={styles.section}>
                    <h2>专业技能</h2>

                    <div className={styles.skills}>
                        <div className={styles.skillGroup}>
                            <h3>🚀 新技术应用</h3>
                            <p>Node.js, AngularJS, Apache Spark, Apache Hadoop, Apache Solr/Lucene</p>
                        </div>

                        <div className={styles.skillGroup}>
                            <h3>💻 编程语言</h3>
                            <p>Scala, C/C++, Shell (bash), HTML5, CSS3, PHP, JSP, SQL, Java, C#, XML</p>
                        </div>

                        <div className={styles.skillGroup}>
                            <h3>📐 开发方法论</h3>
                            <p>Merise, UML</p>
                        </div>

                        <div className={styles.skillGroup}>
                            <h3>🛠️ 开发工具</h3>
                            <p>Oracle/Developer 2000, Windev, Maple, Eclipse, Visual Studio, Pack Office Windows,
                                Photoshop</p>
                        </div>

                        <div className={styles.skillGroup}>
                            <h3>🗄️ 数据库</h3>
                            <p>Oracle, MySQL, SQL Server, MongoDB, Redis</p>
                        </div>

                        <div className={styles.skillGroup}>
                            <h3>⚡ 系统与网络</h3>
                            <p>Linux, Windows, 局域网 (Ethernet, Wifi), IIS, Apache</p>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2>联系方式</h2>
                    <ul className={styles.contact}>
                        <li>
                            <span>📌 GitHub:</span>
                            <a href="https://github.com/qfdk" target="_blank" rel="noopener noreferrer">
                                @qfdk
                            </a>
                        </li>
                        <li>
                            <span>📮 Email:</span>
                            <a href="mailto:qfdk2010@gmail.com">
                                qfdk2010#gmail.com
                            </a>
                        </li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>关于本站</h2>
                    <p>
                        这里主要记录我的技术笔记、生活随笔及一些有趣的想法。
                        源码已在 GitHub 开源，欢迎参考。
                    </p>
                </section>
            </div>
        </article>
    )
}
