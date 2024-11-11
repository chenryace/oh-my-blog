// src/app/about/page.tsx
import styles from "./about.module.css";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "关于",
    description: "了解更多关于我的信息"
};

export default function AboutPage() {
    return (
        <div className={styles.cv}>
            {/* 头部信息 */}
            <header className={styles.header}>
                <div className={styles.basicInfo}>
                    <h1 className={styles.name}>qfdk 👨‍💻</h1>
                    <h2 className={styles.title}>全栈开发工程师</h2>
                </div>
                <div className={styles.contact}>
                    <div>🌍 巴黎</div>
                    <div>
                        <a href="mailto:qfdk2010@gmail.com">✉️ qfdk2010#gmail.com</a>
                    </div>
                    <div>
                        <a href="https://github.com/qfdk" target="_blank" rel="noopener noreferrer">
                            🔗 github.com/qfdk
                        </a>
                    </div>
                </div>
            </header>

            {/* 主要内容 */}
            <main className={styles.main}>
                <div className={styles.column}>
                    {/* 技术概览 */}
                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>🛠️ 技术概览</h3>
                        <div className={styles.skillCategories}>
                            <div className={styles.skillCategory}>
                                <h4>👨‍💻 开发语言</h4>
                                <p>Scala • Java • C/C++ • JavaScript • TypeScript • Shell • PHP</p>
                            </div>
                            <div className={styles.skillCategory}>
                                <h4>🎨 前端开发</h4>
                                <p>React • Vue • Angular • HTML5 • CSS3 • Next.js</p>
                            </div>
                            <div className={styles.skillCategory}>
                                <h4>⚡ 后端技术</h4>
                                <p>Node.js • Spring Boot • Express • NestJS</p>
                            </div>
                            <div className={styles.skillCategory}>
                                <h4>🚀 DevOps</h4>
                                <p>Docker • Kubernetes • Jenkins • GitLab CI/CD • Ansible • Terraform</p>
                            </div>
                            <div className={styles.skillCategory}>
                                <h4>📊 数据技术</h4>
                                <p>Elasticsearch • Apache Spark • Hadoop • Solr/Lucene • ELK Stack</p>
                            </div>
                            <div className={styles.skillCategory}>
                                <h4>💾 数据库</h4>
                                <p>MySQL • MongoDB • Redis • Oracle • PostgreSQL</p>
                            </div>
                        </div>
                    </section>

                    {/* 专业技能 */}
                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>💪 专业领域</h3>
                        <ul className={styles.expertiseList}>
                            <li>🌐 分布式系统设计和开发</li>
                            <li>⚡ 高性能Web应用架构</li>
                            <li>🔄 DevOps实践和工具链搭建</li>
                            <li>📈 大数据处理和分析</li>
                            <li>🔍 搜索引擎和日志分析系统</li>
                            <li>🔗 微服务架构设计和实现</li>
                        </ul>
                    </section>

                    {/* 兴趣爱好 */}
                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>❤️ 兴趣爱好</h3>
                        <ul className={styles.expertiseList}>
                            <li>🏃‍♂️ 徒步旅行</li>
                            <li>🌍 探索自然风光</li>
                            <li>📚 技术阅读</li>
                            <li>🎵 音乐欣赏</li>
                        </ul>
                    </section>

                    {/* 个人简介 */}
                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>👋 个人简介</h3>
                        <p className={styles.bio}>
                            热爱技术，专注于全栈开发和DevOps实践。擅长分布式系统设计和大数据处理，
                            对新技术保持浓厚兴趣。在工作之余热衷于户外运动，特别是徒步旅行，
                            享受探索自然的乐趣。✨
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
